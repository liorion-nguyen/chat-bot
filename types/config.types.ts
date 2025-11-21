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
  geminiApiKey: string; // API key - can be provided via config OR .env file (GEMINI_API_KEY)
  placeholder?: string;
  welcomeMessage?: string;
  model?: string; // Default: gemini-1.5-flash (also available: gemini-1.5-pro)
  enableHistory?: boolean; // Enable conversation history context (default: true)
  maxHistoryMessages?: number; // Maximum number of messages to include in context (default: 20)
  language?: 'auto' | 'vi' | 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'de' | 'es'; // Response language (default: 'auto')
  botIconUrl?: string; // Custom avatar URL for bot messages (not corner icon)
  useServerApi?: boolean; // If true, uses server-side API (recommended). If false, calls Gemini directly from browser. Default: true
  enableSmartSuggestions?: boolean; // If true, generates 2 follow-up questions after each bot response (default: false)
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
  language: 'auto',
  useServerApi: true, // Default to server-side API for security
  enableSmartSuggestions: false, // Default to off (can be enabled by user)
};

// Language instructions for system prompt
export const languageInstructions: Record<string, string> = {
  'auto': '', // No language restriction
  'vi': 'IMPORTANT: You MUST respond in Vietnamese (Tiếng Việt). All your answers must be in Vietnamese language.',
  'en': 'IMPORTANT: You MUST respond in English. All your answers must be in English language.',
  'zh': 'IMPORTANT: You MUST respond in Chinese (中文). All your answers must be in Chinese language.',
  'ja': 'IMPORTANT: You MUST respond in Japanese (日本語). All your answers must be in Japanese language.',
  'ko': 'IMPORTANT: You MUST respond in Korean (한국어). All your answers must be in Korean language.',
  'fr': 'IMPORTANT: You MUST respond in French (Français). All your answers must be in French language.',
  'de': 'IMPORTANT: You MUST respond in German (Deutsch). All your answers must be in German language.',
  'es': 'IMPORTANT: You MUST respond in Spanish (Español). All your answers must be in Spanish language.',
};

