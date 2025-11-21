import { useCallback } from 'react';
import { Message } from '@/types';

interface UseGeminiServerProps {
  apiKey?: string; // Optional: If not provided, server will use .env
  model?: string;
  systemPrompt?: string;
  language?: string;
}

interface SendMessageOptions {
  message: string;
  conversationHistory?: Message[];
  onStream?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to send messages to Gemini via server-side API
 * This keeps the API key secure on the server
 */
export function useGeminiServer({
  apiKey,
  model = 'gemini-1.5-flash',
  systemPrompt,
  language = 'auto',
}: UseGeminiServerProps) {
  const sendMessage = useCallback(
    async ({ message, conversationHistory = [], onStream, onComplete, onError }: SendMessageOptions) => {
      try {
        // Prepare conversation history (exclude streaming and id/timestamp)
        const history = conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        // Call our server-side API endpoint
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            conversationHistory: history,
            systemPrompt,
            model,
            language,
            apiKey, // Send API key to server (will be hidden from external clients)
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Failed to get reader from response body.');
        }

        let accumulatedContent = '';
        let buffer = '';
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            const line = buffer.substring(0, newlineIndex).trim();
            buffer = buffer.substring(newlineIndex + 1);

            if (line.startsWith('data:')) {
              const dataStr = line.substring(5).trim();
              
              // Check for done signal
              if (dataStr === '[DONE]') {
                continue;
              }

              try {
                const data = JSON.parse(dataStr);
                const chunkText = data.text || '';
                
                if (chunkText) {
                  accumulatedContent += chunkText;
                  if (onStream) {
                    onStream(chunkText);
                  }
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError, 'Line:', line);
              }
            }
          }
        }

        if (onComplete) {
          onComplete(accumulatedContent);
        }

        return accumulatedContent;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error occurred');
        if (onError) {
          onError(err);
        }
        throw err;
      }
    },
    [apiKey, model, systemPrompt, language]
  );

  return { sendMessage };
}

