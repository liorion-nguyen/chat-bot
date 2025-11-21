# Setup Guide - AI ChatBot Widget

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Project Structure

```
chat-bot/
├── app/
│   ├── page.tsx              # Main demo page
│   ├── layout.tsx
│   └── globals.css           # Global styles + animations
├── components/
│   ├── ChatWidget/
│   │   ├── ChatWidget.tsx    # Main widget component
│   │   ├── ChatIcon.tsx      # Floating chat icon
│   │   ├── ChatBox.tsx       # Chat box container
│   │   ├── ChatMessage.tsx   # Individual message
│   │   ├── ChatInput.tsx     # Message input field
│   │   ├── SuggestionChips.tsx # Suggestion chips
│   │   └── index.ts
│   └── MarkdownRenderer/
│       └── MessageMarkdown.tsx # Markdown renderer
├── hooks/
│   ├── useChat.ts            # Chat state management
│   └── useGemini.ts          # Gemini AI integration
├── types/
│   ├── chat.types.ts         # Chat-related types
│   ├── config.types.ts       # Configuration types
│   └── index.ts
└── utils/
    └── themeUtils.ts         # Theme utilities
```

## 🎨 Usage

### Basic Usage

```tsx
import { ChatWidget } from '@/components/ChatWidget';
import { ChatWidgetConfig } from '@/types';

const config: ChatWidgetConfig = {
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
    'Hello!',
    'How can you help me?',
    'Tell me about yourself',
  ],
  systemPrompt: 'You are a helpful AI assistant.',
  geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  welcomeMessage: 'Hi! How can I help you today?',
};

export default function MyPage() {
  return (
    <div>
      <h1>My Website</h1>
      <ChatWidget config={config} />
    </div>
  );
}
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `botName` | string | Yes | Name of the chatbot |
| `theme` | ThemeObject | Yes | Theme configuration |
| `suggestions` | string[] | Yes | Array of suggestion messages |
| `systemPrompt` | string | Yes | System prompt for AI |
| `geminiApiKey` | string | Yes | Gemini API key |
| `placeholder` | string | No | Input placeholder text |
| `welcomeMessage` | string | No | Initial welcome message |
| `model` | string | No | Gemini model (default: 'gemini-1.5-flash', also available: 'gemini-1.5-pro') |

### Theme Configuration

```typescript
interface ChatWidgetTheme {
  primaryColor: string;        // Main color for buttons, header
  secondaryColor: string;       // Secondary accent color
  backgroundColor: string;      // Background color
  textColor: string;            // Main text color
  userMessageBg: string;        // User message background
  botMessageBg: string;         // Bot message background
  inputBg: string;              // Input field background
  inputText: string;            // Input text color
  borderColor: string;          // Border colors
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}
```

## 🎯 Features

### ✅ Implemented

- [x] Floating chat icon with animations
- [x] Collapsible chat box
- [x] Real-time streaming responses from Gemini AI
- [x] Markdown rendering with syntax highlighting
- [x] Suggestion chips
- [x] Fully customizable themes
- [x] Responsive design
- [x] Auto-resize input field
- [x] Smooth animations
- [x] Error handling
- [x] Loading states
- [x] Minimize/maximize chat box

### 🔜 Future Enhancements

- [ ] Conversation history persistence (localStorage)
- [ ] Export chat history
- [ ] Voice input
- [ ] File attachments
- [ ] Multi-language support
- [ ] Emoji picker
- [ ] Dark mode toggle
- [ ] Custom avatar uploads
- [ ] Rate limiting
- [ ] Analytics integration

## 🔒 Security Notes

**Important:** The current implementation exposes the Gemini API key on the client side. For production use:

1. Create a backend API route to handle Gemini requests
2. Move API key to server-side environment variables
3. Implement rate limiting
4. Add authentication if needed

### Example API Route (Recommended for Production)

```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  const { message, systemPrompt } = await req.json();
  
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const result = await model.generateContentStream(
    systemPrompt ? `${systemPrompt}\n\nUser: ${message}` : message
  );
  
  // Stream the response
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(chunk.text());
      }
      controller.close();
    },
  });
  
  return new Response(stream);
}
```

## 🎨 Customization Examples

### Dark Theme

```typescript
const darkTheme = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#A78BFA',
  backgroundColor: '#1F2937',
  textColor: '#F9FAFB',
  userMessageBg: '#8B5CF6',
  botMessageBg: '#374151',
  inputBg: '#374151',
  inputText: '#F9FAFB',
  borderColor: '#4B5563',
  position: 'bottom-right',
};
```

### Green Theme

```typescript
const greenTheme = {
  primaryColor: '#10B981',
  secondaryColor: '#34D399',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  userMessageBg: '#10B981',
  botMessageBg: '#F3F4F6',
  inputBg: '#F9FAFB',
  inputText: '#111827',
  borderColor: '#E5E7EB',
  position: 'bottom-right',
};
```

## 🛠️ Troubleshooting

### Chat not responding?

1. Check if your Gemini API key is correctly set in `.env.local`
2. Verify the API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Check browser console for error messages
4. Ensure you have internet connection

### Styling issues?

1. Make sure Tailwind CSS is properly configured
2. Check if `globals.css` is imported in `layout.tsx`
3. Clear browser cache and reload

### Build errors?

1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Run `npm run build`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For questions or support, please open an issue on GitHub.

