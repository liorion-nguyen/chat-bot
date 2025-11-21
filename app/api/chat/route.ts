import { NextRequest } from 'next/server';

// Server-side API route to handle Gemini chat requests
// This keeps the API key secure on the server
export const runtime = 'edge'; // Use Edge Runtime for better performance

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  systemPrompt?: string;
  model?: string;
  language?: string;
}

const languageInstructions: Record<string, string> = {
  'auto': '',
  'vi': 'IMPORTANT: You MUST respond in Vietnamese. Do not use any other language.',
  'en': 'IMPORTANT: You MUST respond in English. Do not use any other language.',
  'zh': 'IMPORTANT: You MUST respond in Chinese. Do not use any other language.',
  'ja': 'IMPORTANT: You MUST respond in Japanese. Do not use any other language.',
  'ko': 'IMPORTANT: You MUST respond in Korean. Do not use any other language.',
  'fr': 'IMPORTANT: You MUST respond in French. Do not use any other language.',
  'de': 'IMPORTANT: You MUST respond in German. Do not use any other language.',
  'es': 'IMPORTANT: You MUST respond in Spanish. Do not use any other language.',
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequest & { apiKey?: string } = await request.json();
    const {
      message,
      conversationHistory = [],
      systemPrompt = '',
      model = 'gemini-1.5-flash',
      language = 'auto',
      apiKey: clientApiKey,
    } = body;

    // Get API key from request OR environment variable
    // Priority: 1. From request body, 2. From .env
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Gemini API key not provided. Please provide apiKey in config or set GEMINI_API_KEY in .env' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build system prompt with language instruction
    let fullSystemPrompt = systemPrompt;
    if (language && language !== 'auto' && languageInstructions[language]) {
      fullSystemPrompt = `${languageInstructions[language]}\n\n${systemPrompt}`;
    }

    // Convert conversation history to Gemini format
    const historyForGemini = conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Build request payload
    const requestPayload = {
      contents: [
        // System prompt (if provided)
        ...(fullSystemPrompt
          ? [
              { role: 'user', parts: [{ text: fullSystemPrompt }] },
              { role: 'model', parts: [{ text: 'OK.' }] },
            ]
          : []),
        // Conversation history
        ...historyForGemini,
        // Current message
        { role: 'user', parts: [{ text: message }] },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    };

    // Call Gemini API with streaming
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({
          error: `Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}`,
        }),
        { status: geminiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stream the response back to client
    const reader = geminiResponse.body?.getReader();
    if (!reader) {
      return new Response(
        JSON.stringify({ error: 'Failed to get reader from Gemini response' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a transform stream to forward SSE data
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
              const line = buffer.substring(0, newlineIndex).trim();
              buffer = buffer.substring(newlineIndex + 1);

              if (line.startsWith('data:')) {
                try {
                  const jsonStr = line.substring(5).trim();
                  if (jsonStr) {
                    const data = JSON.parse(jsonStr);
                    const chunkText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    
                    // Forward the SSE line to client
                    if (chunkText) {
                      controller.enqueue(
                        new TextEncoder().encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
                      );
                    }
                  }
                } catch (parseError) {
                  console.error('Error parsing SSE data:', parseError);
                }
              }
            }
          }

          // Send done signal
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    // Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

