export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[]; // Smart follow-up suggestions (only for assistant messages)
  isEdited?: boolean; // Whether this message was edited
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type MessageRole = 'user' | 'assistant';

