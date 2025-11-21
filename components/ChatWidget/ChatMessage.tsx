'use client';

import { useState } from 'react';
import { Message } from '@/types';
import MessageMarkdown from '@/components/MarkdownRenderer/MessageMarkdown';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, Edit2, X as XIcon, Check as CheckIcon } from 'lucide-react';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  botName: string;
  userMessageBg?: string;
  botMessageBg?: string;
  botAvatarUrl?: string;
  primaryColor?: string;
  onSuggestionClick?: (suggestion: string) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
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
  onEditMessage,
  showSuggestions = true
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const hasSuggestions = !isUser && message.suggestions && message.suggestions.length > 0 && showSuggestions;
  
  // Copy functionality
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);
  
  // Edit functionality
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReaction = (type: 'like' | 'dislike') => {
    if (reaction === type) {
      setReaction(null); // Remove reaction if clicking same button
    } else {
      setReaction(type);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(message.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() && editedContent !== message.content) {
      onEditMessage?.(message.id, editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };
  
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
          {isEditing ? (
            // Edit mode
            <div className="flex flex-col gap-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
                >
                  <CheckIcon className="h-3 w-3" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 rounded bg-gray-500 px-3 py-1 text-xs text-white hover:bg-gray-600"
                >
                  <XIcon className="h-3 w-3" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <>
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
              
              {/* Edited indicator */}
              {message.isEdited && (
                <span className="ml-2 text-xs italic opacity-60">(edited)</span>
              )}
            </>
          )}
        </div>

        {/* Action buttons row */}
        <div className="mt-1 flex items-center gap-2">
          {/* Timestamp */}
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>

          {/* Edit button (for user messages) */}
          {isUser && !message.isStreaming && !isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              title="Edit message"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          )}

          {/* Copy button (for bot messages) */}
          {!isUser && !message.isStreaming && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          {/* Reaction buttons (for bot messages) */}
          {!isUser && !message.isStreaming && (
            <div className="flex gap-1">
              <button
                onClick={() => handleReaction('like')}
                className={`rounded p-1 transition-all ${
                  reaction === 'like'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-400 hover:bg-gray-200 hover:text-green-600'
                }`}
                title="Like this response"
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleReaction('dislike')}
                className={`rounded p-1 transition-all ${
                  reaction === 'dislike'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-400 hover:bg-gray-200 hover:text-red-600'
                }`}
                title="Dislike this response"
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

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

