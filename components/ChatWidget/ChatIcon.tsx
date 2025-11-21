'use client';

import { MessageCircle, X } from 'lucide-react';

interface ChatIconProps {
  isOpen: boolean;
  onClick: () => void;
  primaryColor?: string;
}

export default function ChatIcon({ isOpen, onClick, primaryColor = '#4F46E5' }: ChatIconProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      style={{ backgroundColor: primaryColor }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {/* Icon with rotation animation */}
      <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}>
        <MessageCircle className="h-6 w-6 text-white" />
      </div>
      
      {/* Close icon */}
      <div className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
        <X className="h-6 w-6 text-white" />
      </div>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: primaryColor }} />
      )}
    </button>
  );
}

