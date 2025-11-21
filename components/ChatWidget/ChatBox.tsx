'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { Message } from '@/types';

interface ChatBoxProps {
  botName: string;
  messages: Message[];
  suggestions: string[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isLoading: boolean;
  primaryColor?: string;
  userMessageBg?: string;
  botMessageBg?: string;
  welcomeMessage?: string;
  botAvatarUrl?: string;
}

export default function ChatBox({
  botName,
  messages,
  suggestions,
  onSendMessage,
  onClose,
  isLoading,
  primaryColor = '#4F46E5',
  userMessageBg,
  botMessageBg,
  welcomeMessage,
  botAvatarUrl,
}: ChatBoxProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Hide suggestions after first message
  useEffect(() => {
    if (messages.length > 0 && messages.some(m => m.role === 'user')) {
      setShowSuggestions(false);
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    onSendMessage(message);
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div 
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
      style={{ 
        width: '400px', 
        height: isMinimized ? '60px' : '600px',
        maxHeight: '85vh',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
          <h3 className="font-semibold">{botName}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content - only show when not minimized */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4"
          >
            {/* Welcome Message */}
            {messages.length === 0 && welcomeMessage && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-3xl">👋</span>
                </div>
                <p className="text-sm text-gray-600">{welcomeMessage}</p>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => {
              // Only show suggestions for the last assistant message
              const isLastAssistantMessage = 
                message.role === 'assistant' && 
                index === messages.length - 1;
              
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  botName={botName}
                  userMessageBg={userMessageBg}
                  botMessageBg={botMessageBg}
                  botAvatarUrl={botAvatarUrl}
                  primaryColor={primaryColor}
                  onSuggestionClick={handleSendMessage}
                  showSuggestions={isLastAssistantMessage}
                />
              );
            })}

            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 overflow-hidden">
                  {botAvatarUrl ? (
                    <Image
                      src={botAvatarUrl}
                      alt={`${botName} avatar`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs">🤖</span>
                  )}
                </div>
                <div className="flex items-center gap-1 rounded-2xl bg-gray-200 px-4 py-3">
                  <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions - show when no messages */}
          {showSuggestions && messages.length === 0 && suggestions.length > 0 && (
            <SuggestionChips
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              primaryColor={primaryColor}
            />
          )}

          {/* Input Area */}
          <ChatInput
            onSend={handleSendMessage}
            disabled={isLoading}
            placeholder="Type your message..."
            primaryColor={primaryColor}
          />
        </>
      )}
    </div>
  );
}

