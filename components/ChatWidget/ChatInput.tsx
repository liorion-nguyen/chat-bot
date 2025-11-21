'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiButtonPosition, setEmojiButtonPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate emoji picker position based on button
  useEffect(() => {
    if (showEmojiPicker && emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();
      setEmojiButtonPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [showEmojiPicker]);

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

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = message.substring(0, cursorPos);
    const textAfter = message.substring(cursorPos);
    const newMessage = textBefore + emoji + textAfter;

    setMessage(newMessage);
    setShowEmojiPicker(false);

    // Set cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    }, 0);
  };

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-sm">
      {/* Input Container - Aligned Center */}
      <div className="flex items-center gap-2">
        {/* Text Input with Integrated Design */}
        <div className="flex-1 relative flex items-center">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ 
              maxHeight: '120px',
              minHeight: '44px',
              lineHeight: '1.5',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20, 0 1px 3px rgba(0, 0, 0, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }}
          />
          
          {/* Emoji Button - Inside Input, Vertically Centered */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <button
              ref={emojiButtonRef}
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 active:scale-95"
              aria-label="Add emoji"
              title="Add emoji"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Send Button - Modern Circular Design, Same Height as Input */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-sm"
          style={{ 
            backgroundColor: message.trim() ? primaryColor : '#D1D5DB',
          }}
          aria-label="Send message"
          title="Send message"
        >
          <Send className="h-5 w-5 text-white" style={{ transform: 'translateX(1px)' }} />
        </button>
      </div>
      
      {/* Footer Hint - Subtle */}
      <div className="mt-2.5 flex items-center justify-between px-1">
        <p className="text-xs text-gray-400">
          <span className="font-medium">Enter</span> to send • <span className="font-medium">Shift+Enter</span> for new line
        </p>
        {message.length > 0 && (
          <p className="text-xs text-gray-400">
            {message.length} chars
          </p>
        )}
      </div>

      {/* Emoji Picker Portal - Render outside ChatBox */}
      {showEmojiPicker && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop - Lower z-index */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 9998 }}
            onClick={() => setShowEmojiPicker(false)}
          />
          
          {/* Picker Panel - Higher z-index */}
          <div 
            className="fixed"
            style={{
              top: `${emojiButtonPosition.top - 10}px`,
              left: `${emojiButtonPosition.left}px`,
              transform: 'translate(-100%, -100%)',
              zIndex: 9999,
            }}
          >
            <EmojiPicker 
              onSelect={handleEmojiSelect} 
              onClose={() => setShowEmojiPicker(false)}
              primaryColor={primaryColor} 
            />
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

