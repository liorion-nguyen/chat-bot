'use client';

import { Message } from '@/types';
import MessageMarkdown from '@/components/MarkdownRenderer/MessageMarkdown';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  botName: string;
  userMessageBg?: string;
  botMessageBg?: string;
}

export default function ChatMessage({ 
  message, 
  botName,
  userMessageBg = '#4F46E5',
  botMessageBg = '#F3F4F6'
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div 
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-gray-700' : 'bg-gray-300'
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
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
      </div>
    </div>
  );
}

