'use client';

import { Message } from '@/types';
import MessageMarkdown from '@/components/MarkdownRenderer/MessageMarkdown';
import { Bot, User } from 'lucide-react';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  botName: string;
  userMessageBg?: string;
  botMessageBg?: string;
  botAvatarUrl?: string;
  primaryColor?: string;
  onSuggestionClick?: (suggestion: string) => void;
  showSuggestions?: boolean; // Control whether to show suggestions
}

export default function ChatMessage({ 
  message, 
  botName,
  userMessageBg = '#4F46E5',
  botMessageBg = '#F3F4F6',
  botAvatarUrl,
  primaryColor = '#4F46E5',
  onSuggestionClick,
  showSuggestions = true
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const hasSuggestions = !isUser && message.suggestions && message.suggestions.length > 0 && showSuggestions;
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div 
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden ${
          isUser ? 'bg-gray-700' : 'bg-gray-300'
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : botAvatarUrl ? (
          <Image
            src={botAvatarUrl}
            alt={`${botName} avatar`}
            width={32}
            height={32}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <Bot className="h-5 w-5 text-gray-700" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Name */}
        <span className="mb-1 text-xs font-medium text-gray-600">
          {isUser ? 'You' : botName}
        </span>

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 shadow-sm ${
            isUser ? 'text-white' : 'text-gray-800'
          }`}
          style={{ backgroundColor: isUser ? userMessageBg : botMessageBg }}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <MessageMarkdown content={message.content} />
            </div>
          )}
          
          {/* Streaming indicator */}
          {message.isStreaming && (
            <span className="ml-1 inline-flex items-center">
              <span className="animate-pulse">▋</span>
            </span>
          )}
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-gray-400">
          {message.timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>

        {/* Smart Suggestions (only for bot messages) */}
        {hasSuggestions && !message.isStreaming && (
          <div className="mt-2 flex flex-col gap-2">
            {message.suggestions!.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-transparent hover:shadow-md"
                style={{
                  borderColor: 'transparent',
                  '--hover-bg': primaryColor,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.backgroundColor = `${primaryColor}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs opacity-60">💡</span>
                  <span>{suggestion}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

