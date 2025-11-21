'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  primaryColor?: string;
}

export default function ChatInput({ 
  onSend, 
  disabled = false, 
  placeholder = 'Type your message...', 
  primaryColor = '#4F46E5' 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{ 
            maxHeight: '120px',
            outline: `2px solid transparent`,
          }}
          onFocus={(e) => {
            e.target.style.outline = `2px solid ${primaryColor}`;
          }}
          onBlur={(e) => {
            e.target.style.outline = '2px solid transparent';
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: primaryColor }}
          aria-label="Send message"
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}

