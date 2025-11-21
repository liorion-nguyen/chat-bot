'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Minimize2, Maximize2, Trash2 } from 'lucide-react';
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
  onClearMessages: () => void;
  onEditMessage: (messageId: string, newContent: string) => void;
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
  onClearMessages,
  onEditMessage,
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
      className="flex flex-col rounded-2xl bg-white shadow-2xl transition-all duration-300"
      style={{ 
        width: '400px', 
        height: isMinimized ? '60px' : '600px',
        maxHeight: '85vh',
        overflow: 'hidden',
      }}
    >
      {/* Header - Enhanced Design */}
      <div 
        className="relative flex items-center justify-between px-4 py-4 text-white shadow-md"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Left: Bot Info with Avatar */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Bot Avatar */}
          <div className="relative shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/30 shadow-lg">
              {botAvatarUrl ? (
                <Image
                  src={botAvatarUrl}
                  alt={`${botName} avatar`}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/10 backdrop-blur-sm">
                  <span className="text-xl">🤖</span>
                </div>
              )}
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white shadow-sm">
              <div className="h-full w-full rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          {/* Bot Name & Status */}
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="font-semibold text-base truncate">{botName}</h3>
            <div className="flex items-center gap-1.5">
              {/* <div className="h-1.5 w-1.5 rounded-full bg-green-400" /> */}
              <span className="text-xs text-white/90 font-medium">Online</span>
            </div>
          </div>
        </div>
        
        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {/* Clear messages button */}
          {messages.length > 0 && (
            <button
              onClick={onClearMessages}
              className="rounded-full p-2 transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
              aria-label="Clear messages"
              title="Clear all messages"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          
          {/* Minimize/Maximize button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-full p-2 transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
            aria-label="Close chat"
            title="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 from-white/5 to-transparent pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)' }} />
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
                  onEditMessage={onEditMessage}
                  showSuggestions={isLastAssistantMessage}
                />
              );
            })}

            {/* Typing indicator - Enhanced version */}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-3 animate-fade-in">
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
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-600">{botName}</span>
                  <div className="flex items-center gap-2 rounded-2xl bg-gray-200 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-gray-500">typing...</span>
                  </div>
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

