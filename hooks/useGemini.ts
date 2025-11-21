import { useCallback } from 'react';
import { Message, languageInstructions } from '@/types';

interface UseGeminiProps {
  apiKey: string;
  model?: string;
  systemPrompt?: string;
  enableHistory?: boolean;
  maxHistoryMessages?: number;
  language?: string;
}

interface SendMessageOptions {
  message: string;
  conversationHistory?: Message[]; // Previous messages for context
  onStream?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export function useGemini({ 
  apiKey, 
  model = 'gemini-2.5-flash-lite', 
  systemPrompt,
  enableHistory = true,
  maxHistoryMessages = 20,
  language = 'auto'
}: UseGeminiProps) {
  const sendMessage = useCallback(
    async ({ message, conversationHistory = [], onStream, onComplete, onError }: SendMessageOptions) => {
      const controller = new AbortController();
      
      try {
        // Prepare the request payload
        const contents = [];
        
        // Build full system prompt with language instruction
        const languageInstruction = languageInstructions[language as keyof typeof languageInstructions] || '';
        const fullSystemPrompt = languageInstruction 
          ? `${languageInstruction}\n\n${systemPrompt || ''}`
          : systemPrompt;
        
        // Add system instruction if provided
        if (fullSystemPrompt) {
          contents.push({
            role: 'user',
            parts: [{ text: fullSystemPrompt }]
          });
          contents.push({
            role: 'model',
            parts: [{ text: 'Understood. I will follow these instructions.' }]
          });
        }
        
        // Add conversation history if enabled
        if (enableHistory && conversationHistory.length > 0) {
          // Get recent messages (excluding the streaming message being created)
          const recentHistory = conversationHistory
            .filter(msg => !msg.isStreaming) // Exclude currently streaming message
            .slice(-maxHistoryMessages); // Take only recent N messages
          
          for (const msg of recentHistory) {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            });
          }
        }
        
        // Add current user message
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const requestPayload = {
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        };

        // Call Gemini REST API directly with streaming
        // Using v1 (stable) instead of v1beta
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error (${response.status}): ${errorText}`);
        }

        // Read the stream
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (!reader) {
          throw new Error('Response body is not readable');
        }

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });
          
          // Parse SSE format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6); // Remove 'data: ' prefix
              
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                
                if (text) {
                  fullResponse += text;
                  if (onStream) {
                    onStream(text);
                  }
                }
              } catch (e) {
                // Skip invalid JSON lines
                console.warn('Failed to parse SSE data:', e);
              }
            }
          }
        }

        if (onComplete) {
          onComplete(fullResponse);
        }

        return fullResponse;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error occurred');
        if (onError) {
          onError(err);
        }
        throw err;
      }
    },
    [apiKey, model, systemPrompt, enableHistory, maxHistoryMessages, language]
  );

  return { sendMessage };
}

