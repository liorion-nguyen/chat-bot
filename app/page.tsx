'use client';

import { ChatWidget } from '@/components/ChatWidget';
import { ChatWidgetConfig } from '@/types';

export default function Home() {
  // Demo configuration
  const chatConfig: ChatWidgetConfig = {
    botName: 'AI Assistant',
    theme: {
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
    },
    suggestions: [
      'Hello! How can you help me?',
      'Tell me about yourself',
      'What can you do?',
      'Explain quantum computing',
    ],
    systemPrompt: 'You are a helpful AI assistant. Be concise, friendly, and informative.',
    geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '', // Can provide key via config
    placeholder: 'Type your message...',
    welcomeMessage: '👋 Hi there! How can I help you today?',
    model: 'gemini-1.5-flash',
    enableHistory: true, // Enable conversation context
    maxHistoryMessages: 20, // Remember last 20 messages
    language: 'auto', // Auto-detect language (or 'vi', 'en', etc.)
    useServerApi: true, // Use server-side API (more secure!)
    enableSmartSuggestions: true, // Enable smart follow-up questions after each response
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            AI ChatBot Widget
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Embeddable chatbot powered by Google Gemini AI
          </p>
          
          {/* Features Grid */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">🤖</div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered</h3>
              <p className="text-gray-600">
                Powered by Google Gemini AI for intelligent conversations
              </p>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold">Real-time Streaming</h3>
              <p className="text-gray-600">
                Watch responses appear character by character in real-time
              </p>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">🎨</div>
              <h3 className="mb-2 text-xl font-semibold">Customizable</h3>
              <p className="text-gray-600">
                Fully customizable themes, colors, and configurations
              </p>
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Try It Out!</h2>
            <p className="mb-4 text-gray-600">
              Click the chat icon in the bottom-right corner to start chatting with the AI assistant.
            </p>
            <div className="rounded-lg bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Make sure to add your Gemini API key in{' '}
                <code className="rounded bg-yellow-100 px-2 py-1">.env.local</code> as{' '}
                <code className="rounded bg-yellow-100 px-2 py-1">NEXT_PUBLIC_GEMINI_API_KEY</code>
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-gray-900 p-8 text-left shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-white">Usage Example</h3>
            <pre className="overflow-x-auto text-sm text-gray-300">
              <code>{`import { ChatWidget } from '@/components/ChatWidget';

const config = {
  botName: 'AI Assistant',
  theme: { primaryColor: '#4F46E5', ... },
  suggestions: ['Hello!', 'Help me'],
  systemPrompt: 'You are a helpful assistant',
  geminiApiKey: 'YOUR_API_KEY',
};

<ChatWidget config={config} />`}</code>
            </pre>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      <ChatWidget config={chatConfig} />
    </div>
  );
}
