'use client';

import { MessageCircle, X, Bell } from 'lucide-react';

interface ChatIconProps {
  isOpen: boolean;
  onClick: () => void;
  primaryColor?: string;
  hasUnreadMessages?: boolean;
  unreadCount?: number;
}

export default function ChatIcon({ 
  isOpen, 
  onClick, 
  primaryColor = '#4F46E5', 
  hasUnreadMessages = false,
  unreadCount = 0
}: ChatIconProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl overflow-hidden"
      style={{ backgroundColor: primaryColor }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {/* Default MessageCircle Icon with rotation animation */}
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

      {/* Notification Badge - Only show when chat is closed and has unread messages */}
      {!isOpen && hasUnreadMessages && (
        <>
          {/* Badge with count */}
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
          
          {/* Pulsing ring for notification */}
          <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 animate-ping rounded-full bg-red-400 opacity-75" />
        </>
      )}

      {/* Bell icon indicator (alternative style) - subtle notification */}
      {!isOpen && hasUnreadMessages && (
        <div className="absolute top-0 right-0">
          <Bell className="h-3 w-3 text-yellow-300 animate-pulse" fill="currentColor" />
        </div>
      )}
    </button>
  );
}

