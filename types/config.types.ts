export interface ChatWidgetTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  userMessageBg: string;
  botMessageBg: string;
  inputBg: string;
  inputText: string;
  borderColor: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export interface ChatWidgetConfig {
  botName: string;
  theme: ChatWidgetTheme;
  suggestions: string[];
  systemPrompt: string;
  geminiApiKey: string;
  placeholder?: string;
  welcomeMessage?: string;
  model?: string; // Default: gemini-1.5-flash (also available: gemini-1.5-pro)
  enableHistory?: boolean; // Enable conversation history context (default: true)
  maxHistoryMessages?: number; // Maximum number of messages to include in context (default: 20)
}

export const defaultTheme: ChatWidgetTheme = {
  primaryColor: '#4F46E5',
  secondaryColor: '#818CF8',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  userMessageBg: '#4F46E5',
  botMessageBg: '#F3F4F6',
  inputBg: '#F9FAFB',
  inputText: '#111827',
  borderColor: '#E5E7EB',
  position: 'bottom-right',
};

export const defaultConfig: Partial<ChatWidgetConfig> = {
  botName: 'AI Assistant',
  theme: defaultTheme,
  suggestions: ['Hello!', 'How can you help me?', 'Tell me more'],
  placeholder: 'Type your message...',
  welcomeMessage: 'Hi! How can I help you today?',
  model: 'gemini-1.5-flash',
  enableHistory: true,
  maxHistoryMessages: 20,
};

