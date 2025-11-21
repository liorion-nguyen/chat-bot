import { NextRequest } from 'next/server';

// API endpoint to generate follow-up suggestions based on conversation
export const runtime = 'edge';

interface SuggestionsRequest {
  userMessage: string;
  botResponse: string;
  apiKey?: string;
  model?: string;
  language?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SuggestionsRequest = await request.json();
    const {
      userMessage,
      botResponse,
      apiKey: clientApiKey,
      model = 'gemini-1.5-flash',
      language = 'auto',
    } = body;

    // Get API key from request OR environment
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create prompt to generate follow-up questions
    const languageInstruction = getLanguageInstruction(language);
    
    const suggestionPrompt = `${languageInstruction}

Based on this conversation:
User: "${userMessage}"
Assistant: "${botResponse}"

Generate EXACTLY 2 natural follow-up questions that the user might want to ask next. The questions should:
- Be relevant to the conversation context
- Help the user explore the topic further
- Be concise (max 10 words each)
- Be phrased as if the user is asking them

Return ONLY the 2 questions, one per line, without numbering or bullet points.`;

    const requestPayload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: suggestionPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.8, // Slightly higher for creative suggestions
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 150, // Short responses only
      },
    };

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
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
        JSON.stringify({ error: 'Failed to generate suggestions' }),
        { status: geminiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse the response to extract suggestions
    const suggestions = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 2); // Take only first 2

    return new Response(
      JSON.stringify({ suggestions }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Suggestions API error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    'auto': 'Generate follow-up questions in the same language as the conversation.',
    'vi': 'Generate follow-up questions in Vietnamese.',
    'en': 'Generate follow-up questions in English.',
    'zh': 'Generate follow-up questions in Chinese.',
    'ja': 'Generate follow-up questions in Japanese.',
    'ko': 'Generate follow-up questions in Korean.',
    'fr': 'Generate follow-up questions in French.',
    'de': 'Generate follow-up questions in German.',
    'es': 'Generate follow-up questions in Spanish.',
  };
  return instructions[language] || instructions['auto'];
}

