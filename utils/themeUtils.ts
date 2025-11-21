import { ChatWidgetTheme } from '@/types';

export function applyTheme(theme: ChatWidgetTheme): void {
  const root = document.documentElement;
  
  root.style.setProperty('--chat-primary-color', theme.primaryColor);
  root.style.setProperty('--chat-secondary-color', theme.secondaryColor);
  root.style.setProperty('--chat-bg-color', theme.backgroundColor);
  root.style.setProperty('--chat-text-color', theme.textColor);
  root.style.setProperty('--chat-user-msg-bg', theme.userMessageBg);
  root.style.setProperty('--chat-bot-msg-bg', theme.botMessageBg);
  root.style.setProperty('--chat-input-bg', theme.inputBg);
  root.style.setProperty('--chat-input-text', theme.inputText);
  root.style.setProperty('--chat-border-color', theme.borderColor);
}

export function getPositionClasses(position: ChatWidgetTheme['position']): string {
  switch (position) {
    case 'bottom-right':
      return 'bottom-4 right-4';
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'top-right':
      return 'top-4 right-4';
    case 'top-left':
      return 'top-4 left-4';
    default:
      return 'bottom-4 right-4';
  }
}

export function getChatBoxPositionClasses(position: ChatWidgetTheme['position']): string {
  // ChatBox appears above icon for bottom positions, below for top positions
  switch (position) {
    case 'bottom-right':
      return 'bottom-20 right-4'; // 80px from bottom (icon height + padding)
    case 'bottom-left':
      return 'bottom-20 left-4';
    case 'top-right':
      return 'top-20 right-4'; // 80px from top
    case 'top-left':
      return 'top-20 left-4';
    default:
      return 'bottom-20 right-4';
  }
}

