'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatWidget } from '@/components/ChatWidget';
import { ChatWidgetConfig, defaultTheme } from '@/types';

export default function ChatWidgetPage() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<ChatWidgetConfig | null>(null);

  useEffect(() => {
    // Parse query parameters
    const botName = searchParams.get('botName') || 'AI Assistant';
    const welcomeMessage = searchParams.get('welcomeMessage') || 'Hi! How can I help you today?';
    const systemPrompt = searchParams.get('systemPrompt') || 'You are a helpful AI assistant. Be concise, friendly, and informative.';
    const placeholder = searchParams.get('placeholder') || 'Type your message...';
    const model = searchParams.get('model') || 'gemini-2.5-flash-lite';
    const geminiApiKey = searchParams.get('apiKey') || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    
    // Parse history settings
    const enableHistory = searchParams.get('enableHistory') !== 'false'; // Default: true
    const maxHistoryMessages = parseInt(searchParams.get('maxHistoryMessages') || '20', 10);

    // Parse theme colors
    const primaryColor = searchParams.get('primaryColor') || defaultTheme.primaryColor;
    const secondaryColor = searchParams.get('secondaryColor') || defaultTheme.secondaryColor;
    const backgroundColor = searchParams.get('backgroundColor') || defaultTheme.backgroundColor;
    const textColor = searchParams.get('textColor') || defaultTheme.textColor;
    const userMessageBg = searchParams.get('userMessageBg') || defaultTheme.userMessageBg;
    const botMessageBg = searchParams.get('botMessageBg') || defaultTheme.botMessageBg;
    const inputBg = searchParams.get('inputBg') || defaultTheme.inputBg;
    const inputText = searchParams.get('inputText') || defaultTheme.inputText;
    const borderColor = searchParams.get('borderColor') || defaultTheme.borderColor;
    const position = (searchParams.get('position') as any) || 'bottom-right';

    // Parse suggestions (comma-separated)
    const suggestionsParam = searchParams.get('suggestions');
    const suggestions = suggestionsParam 
      ? suggestionsParam.split(',').map(s => s.trim())
      : ['Hello!', 'How can you help me?', 'Tell me more'];

    // Build config
    const widgetConfig: ChatWidgetConfig = {
      botName,
      theme: {
        primaryColor,
        secondaryColor,
        backgroundColor,
        textColor,
        userMessageBg,
        botMessageBg,
        inputBg,
        inputText,
        borderColor,
        position,
      },
      suggestions,
      systemPrompt,
      geminiApiKey,
      placeholder,
      welcomeMessage,
      model,
      enableHistory,
      maxHistoryMessages,
    };

    setConfig(widgetConfig);
  }, [searchParams]);

  if (!config) return null;

  return (
    <div className="h-screen w-full" style={{ backgroundColor: config.theme.backgroundColor }}>
      {/* Optional: Display config info */}

      {/* Chat Widget */}
      <ChatWidget config={config} />
    </div>
  );
}

