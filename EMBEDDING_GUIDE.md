# Embedding Guide - How to Embed ChatBot Widget in Any Website

## 📦 Method 1: Next.js/React Application

If your website is already using Next.js or React, you can directly use the component:

### Step 1: Copy Required Files

Copy these folders to your project:
```
- components/ChatWidget/
- components/MarkdownRenderer/
- hooks/
- types/
- utils/
```

### Step 2: Install Dependencies

```bash
npm install @google/generative-ai react-markdown react-syntax-highlighter remark-gfm lucide-react
npm install --save-dev @types/react-syntax-highlighter
```

### Step 3: Add CSS

Copy the chat widget styles from `app/globals.css` to your global CSS file.

### Step 4: Use the Component

```tsx
import { ChatWidget } from '@/components/ChatWidget';

<ChatWidget config={yourConfig} />
```

---

## 🌐 Method 2: Standalone Widget (For Any Website)

### For Production: Build as Standalone Widget

#### Step 1: Create Build Script

Create `scripts/build-widget.js`:

```javascript
const { build } = require('esbuild');

build({
  entryPoints: ['widget/index.tsx'],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'ChatWidget',
  outfile: 'public/chat-widget.js',
  external: [],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).catch(() => process.exit(1));
```

#### Step 2: Create Widget Entry Point

Create `widget/index.tsx`:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from '../components/ChatWidget';
import { ChatWidgetConfig } from '../types';
import '../app/globals.css';

interface ChatWidgetGlobal {
  init: (config: ChatWidgetConfig) => void;
  destroy: () => void;
}

let rootInstance: any = null;

const ChatWidgetAPI: ChatWidgetGlobal = {
  init(config: ChatWidgetConfig) {
    // Create container
    const container = document.createElement('div');
    container.id = 'ai-chatbot-widget';
    document.body.appendChild(container);

    // Render widget
    rootInstance = createRoot(container);
    rootInstance.render(<ChatWidget config={config} />);
  },

  destroy() {
    if (rootInstance) {
      rootInstance.unmount();
      const container = document.getElementById('ai-chatbot-widget');
      if (container) {
        container.remove();
      }
      rootInstance = null;
    }
  },
};

// Expose to window
(window as any).ChatWidget = ChatWidgetAPI;

export default ChatWidgetAPI;
```

#### Step 3: Build the Widget

```bash
npm run build-widget
```

#### Step 4: Embed in Any Website

Add this code to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <!-- Load the widget CSS -->
  <link rel="stylesheet" href="https://your-domain.com/chat-widget.css">
</head>
<body>
  <h1>Welcome to My Website</h1>
  
  <!-- Load the widget script -->
  <script src="https://your-domain.com/chat-widget.js"></script>
  
  <!-- Initialize the widget -->
  <script>
    ChatWidget.init({
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
        'How can you help?',
        'Tell me more',
      ],
      systemPrompt: 'You are a helpful assistant for our website.',
      geminiApiKey: 'YOUR_GEMINI_API_KEY',
      welcomeMessage: 'Hi! How can I help you today?',
    });
  </script>
</body>
</html>
```

---

## 🎯 Method 3: iframe Embedding

### Step 1: Create Embed Route

Create `app/embed/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { ChatWidget } from '@/components/ChatWidget';
import { ChatWidgetConfig } from '@/types';

export default function EmbedPage() {
  const [config, setConfig] = useState<ChatWidgetConfig | null>(null);

  useEffect(() => {
    // Listen for config from parent window
    window.addEventListener('message', (event) => {
      if (event.data.type === 'CHAT_WIDGET_CONFIG') {
        setConfig(event.data.config);
      }
    });

    // Request config from parent
    window.parent.postMessage({ type: 'CHAT_WIDGET_READY' }, '*');
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return <ChatWidget config={config} />;
}
```

### Step 2: Embed in Your Website

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>

  <!-- Embed iframe -->
  <iframe 
    id="chatbot-iframe"
    src="https://your-chatbot-domain.com/embed"
    style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 9999;
    "
  ></iframe>

  <script>
    const iframe = document.getElementById('chatbot-iframe');
    
    // Wait for iframe to be ready
    window.addEventListener('message', (event) => {
      if (event.data.type === 'CHAT_WIDGET_READY') {
        // Send configuration to iframe
        iframe.contentWindow.postMessage({
          type: 'CHAT_WIDGET_CONFIG',
          config: {
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
            suggestions: ['Hello!', 'Help me'],
            systemPrompt: 'You are a helpful assistant.',
            geminiApiKey: 'YOUR_API_KEY',
            welcomeMessage: 'Hi! How can I help?',
          }
        }, '*');
      }
    });
  </script>
</body>
</html>
```

---

## 🔐 Security Best Practices

### 1. Use Backend Proxy (Recommended)

**Never expose your Gemini API key on the client side in production.**

Create an API route:

```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { message, systemPrompt } = await req.json();
    
    // Validate origin (optional but recommended)
    const origin = req.headers.get('origin');
    const allowedOrigins = ['https://your-website.com'];
    
    if (!allowedOrigins.includes(origin || '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const fullPrompt = systemPrompt 
      ? `${systemPrompt}\n\nUser: ${message}` 
      : message;
    
    const result = await model.generateContentStream(fullPrompt);
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

Then modify `hooks/useGemini.ts` to use your API route instead.

### 2. Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/chat')) {
    const ip = request.ip || 'unknown';
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 10;
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }
    
    const requests = rateLimitMap.get(ip)!;
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
    
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
  }
  
  return NextResponse.next();
}
```

### 3. CORS Configuration

If using iframe from different domain:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/chat',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-website.com' },
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

---

## 📊 Analytics Integration (Optional)

Track chat interactions:

```typescript
// Add to ChatWidget.tsx
const trackEvent = (event: string, data?: any) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, data);
  }
  
  // Custom analytics
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ event, data }),
  });
};

// Track when chat opens
useEffect(() => {
  if (isOpen) {
    trackEvent('chat_opened');
  }
}, [isOpen]);

// Track messages
const handleSendMessage = (message: string) => {
  trackEvent('message_sent', { message_length: message.length });
  // ... rest of the code
};
```

---

## 🎨 Customization Tips

### Custom Icons

Replace icons in components with your own:

```tsx
// Instead of lucide-react icons
import { MessageCircle } from 'lucide-react';

// Use custom SVG or image
<img src="/your-icon.svg" alt="Chat" />
```

### Custom Styling

Override default styles:

```css
/* In your global CSS */
#ai-chatbot-widget {
  --chat-primary-color: #your-color;
  font-family: 'Your Font', sans-serif;
}
```

### Multiple Instances

If you need multiple chat widgets with different configs:

```tsx
<ChatWidget config={salesConfig} />
<ChatWidget config={supportConfig} />
```

---

## 📝 Complete Example Website

See `SETUP_GUIDE.md` for a complete working example.

## 🆘 Need Help?

- Check the troubleshooting section in `SETUP_GUIDE.md`
- Open an issue on GitHub
- Review the example code in `app/page.tsx`

