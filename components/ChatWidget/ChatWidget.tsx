'use client';

import { useState, useEffect, useCallback } from 'react';
import ChatIcon from './ChatIcon';
import ChatBox from './ChatBox';
import { useChat } from '@/hooks/useChat';
import { useGemini } from '@/hooks/useGemini';
import { useGeminiServer } from '@/hooks/useGeminiServer';
import { ChatWidgetConfig, defaultConfig } from '@/types';
import { applyTheme, getPositionClasses, getChatBoxPositionClasses } from '@/utils/themeUtils';

interface ChatWidgetProps {
  config: ChatWidgetConfig;
}

export default function ChatWidget({ config }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Merge with default config
  const fullConfig = {
    ...defaultConfig,
    ...config,
    theme: { ...defaultConfig.theme, ...config.theme },
  } as ChatWidgetConfig;

  const {
    messages,
    isLoading,
    error,
    addMessage,
    updateMessage,
    setLoading,
    setError,
  } = useChat();

  // Use server-side API or client-side API based on config
  const useServerApi = fullConfig.useServerApi ?? true; // Default to server API for security

  const geminiClient = useGemini({
    apiKey: fullConfig.geminiApiKey || '',
    model: fullConfig.model,
    systemPrompt: fullConfig.systemPrompt,
    enableHistory: fullConfig.enableHistory,
    maxHistoryMessages: fullConfig.maxHistoryMessages,
    language: fullConfig.language,
  });

  const geminiServer = useGeminiServer({
    apiKey: fullConfig.geminiApiKey, // Pass API key to server
    model: fullConfig.model,
    systemPrompt: fullConfig.systemPrompt,
    language: fullConfig.language,
  });

  const { sendMessage } = useServerApi ? geminiServer : geminiClient;

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(fullConfig.theme);
  }, [fullConfig.theme]);

  // Generate smart follow-up suggestions
  const generateSuggestions = useCallback(
    async (userMessage: string, botResponse: string, messageId: string) => {
      if (!fullConfig.enableSmartSuggestions) return;

      try {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage,
            botResponse,
            apiKey: fullConfig.geminiApiKey,
            model: fullConfig.model,
            language: fullConfig.language,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.suggestions && data.suggestions.length > 0) {
            // Update message with suggestions
            updateMessage(messageId, {
              suggestions: data.suggestions,
            });
          }
        }
      } catch (error) {
        console.error('Failed to generate suggestions:', error);
        // Silently fail - suggestions are not critical
      }
    },
    [fullConfig.enableSmartSuggestions, fullConfig.geminiApiKey, fullConfig.model, fullConfig.language, updateMessage]
  );

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      // Add user message
      addMessage({
        role: 'user',
        content: messageText,
      });

      setLoading(true);
      setError(null);

      // Create placeholder for assistant message
      const assistantMessage = addMessage({
        role: 'assistant',
        content: '',
        isStreaming: true,
      });

      // If chat is closed when bot responds, increment unread count
      const checkAndIncrementUnread = () => {
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      };

      try {
        let accumulatedContent = '';

        await sendMessage({
          message: messageText,
          conversationHistory: messages, // Pass conversation history for context
          onStream: (chunk) => {
            accumulatedContent += chunk;
            updateMessage(assistantMessage.id, {
              content: accumulatedContent,
              isStreaming: true,
            });
          },
          onComplete: async (fullResponse) => {
            updateMessage(assistantMessage.id, {
              content: fullResponse,
              isStreaming: false,
            });
            setLoading(false);
            
            // Check if chat is closed and increment unread count
            checkAndIncrementUnread();

            // Generate smart follow-up suggestions (non-blocking)
            if (fullConfig.enableSmartSuggestions) {
              generateSuggestions(messageText, fullResponse, assistantMessage.id);
            }
          },
          onError: (err) => {
            setError(err.message);
            updateMessage(assistantMessage.id, {
              content: '⚠️ Sorry, I encountered an error. Please try again.',
              isStreaming: false,
            });
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    },
    [addMessage, updateMessage, setLoading, setError, sendMessage, isOpen, fullConfig.enableSmartSuggestions, generateSuggestions]
  );

  // Clear unread count when chat is opened
  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Opening chat - clear unread count
      setUnreadCount(0);
    }
  };

  const iconPositionClasses = getPositionClasses(fullConfig.theme.position);
  const chatBoxPositionClasses = getChatBoxPositionClasses(fullConfig.theme.position);

  return (
    <>
      {/* Chat Box - positioned separately above/below icon */}
      {isOpen && (
        <div className={`fixed z-50 animate-slide-up ${chatBoxPositionClasses}`}>
          <ChatBox
            botName={fullConfig.botName}
            messages={messages}
            suggestions={fullConfig.suggestions}
            onSendMessage={handleSendMessage}
            onClose={() => setIsOpen(false)}
            isLoading={isLoading}
            primaryColor={fullConfig.theme.primaryColor}
            userMessageBg={fullConfig.theme.userMessageBg}
            botMessageBg={fullConfig.theme.botMessageBg}
            welcomeMessage={fullConfig.welcomeMessage}
            botAvatarUrl={fullConfig.botIconUrl}
          />
        </div>
      )}

      {/* Chat Icon - always fixed at corner */}
      <div className={`fixed z-50 ${iconPositionClasses}`}>
        <ChatIcon
          isOpen={isOpen}
          onClick={handleToggleChat}
          primaryColor={fullConfig.theme.primaryColor}
          hasUnreadMessages={unreadCount > 0}
          unreadCount={unreadCount}
        />

        {/* Error Toast */}
        {error && (
          <div className="absolute bottom-20 right-0 max-w-sm rounded-lg bg-red-500 p-4 text-white shadow-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

