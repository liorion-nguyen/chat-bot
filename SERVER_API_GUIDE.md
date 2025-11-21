# 🔒 Server-Side API Guide

## 📖 Overview

**Server-side API** là phương thức **BẢO MẬT NHẤT** để tích hợp Gemini AI vào chatbot của bạn. Thay vì expose API key ra client-side, API key sẽ được giữ an toàn trên server.

---

## 🆚 Client-Side vs Server-Side

### ❌ Client-Side API (NOT Recommended)

```typescript
// API key VISIBLE trong browser!
config={{
  geminiApiKey: "AIza...xyz123", // ⚠️ Ai cũng có thể thấy!
  useServerApi: false
}}
```

**Risks:**
- ❌ API key exposed trong source code
- ❌ User có thể copy key và злоупотребить
- ❌ Không thể rate limit
- ❌ Không thể monitor usage
- ❌ Security risk!

---

### ✅ Server-Side API (RECOMMENDED)

```typescript
// API key ẨN an toàn trên server!
config={{
  geminiApiKey: "", // Không cần!
  useServerApi: true // ✅ Secure!
}}
```

**Benefits:**
- ✅ API key KHÔNG bao giờ exposed
- ✅ Bảo mật tối đa
- ✅ Rate limiting có thể
- ✅ Monitor usage tập trung
- ✅ Kiểm soát access
- ✅ Production-ready!

---

## 🚀 Setup Instructions

### Step 1: Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key (starts with `AIza...`)

---

### Step 2: Create `.env.local` File

Tạo file `.env.local` ở root của project:

```bash
# .env.local
GEMINI_API_KEY=AIzaSyC...your_actual_key_here
```

**⚠️ IMPORTANT:**
- File này sẽ **KHÔNG** được commit vào Git (đã có trong `.gitignore`)
- Key này CHỈ tồn tại trên server
- Client-side code KHÔNG BAO GIỜ thấy được key này

---

### Step 3: Configure ChatWidget

```typescript
import { ChatWidget } from '@/components/ChatWidget';

function MyApp() {
  return (
    <ChatWidget
      config={{
        botName: "Support Bot",
        systemPrompt: "You are a helpful assistant.",
        geminiApiKey: "", // ← Để trống!
        useServerApi: true, // ← Enable server API
        
        // Other configs...
        model: "gemini-1.5-flash",
        enableHistory: true,
        language: "auto",
      }}
    />
  );
}
```

---

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

**Done!** 🎉 API key giờ đã an toàn trên server!

---

## 🔧 How It Works

### Architecture:

```
┌─────────┐          ┌──────────┐          ┌────────────┐
│ Browser │  ────►   │ Next.js  │  ────►   │  Gemini    │
│ Client  │  (POST)  │  Server  │  (API)   │  API       │
└─────────┘          └──────────┘          └────────────┘
   No API             API Key               AI Response
   Key Here!          Stored Here           Returned
                      (.env.local)
```

### Request Flow:

1. **User sends message** → Browser
2. **Browser calls** → `/api/chat` (your Next.js server)
3. **Server reads** → `GEMINI_API_KEY` from `.env.local`
4. **Server calls** → Gemini API with key
5. **Server streams** → Response back to browser
6. **Browser displays** → AI response

**Key never leaves server!** 🔒

---

## 📁 Files Created

### 1. **`app/api/chat/route.ts`** - Server API Endpoint

```typescript
export async function POST(request: NextRequest) {
  // Get API key from SERVER environment
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Parse request from client
  const { message, conversationHistory, systemPrompt } = await request.json();
  
  // Call Gemini API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
    { /* ... */ }
  );
  
  // Stream response back to client
  return new Response(stream);
}
```

**Features:**
- ✅ Edge Runtime (fast!)
- ✅ Streaming support (real-time responses)
- ✅ Error handling
- ✅ Conversation history support
- ✅ Language configuration
- ✅ System prompt support

---

### 2. **`hooks/useGeminiServer.ts`** - Client Hook

```typescript
export function useGeminiServer({ model, systemPrompt, language }) {
  const sendMessage = async ({ message, conversationHistory, onStream }) => {
    // Call YOUR server API (not Gemini directly)
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversationHistory,
        systemPrompt,
        model,
        language,
      }),
    });
    
    // Handle streaming response
    // ...
  };
  
  return { sendMessage };
}
```

**Features:**
- ✅ Calls your Next.js API
- ✅ Handles streaming
- ✅ Error handling
- ✅ TypeScript support

---

## 🎯 Configuration Options

### `useServerApi` Parameter

| Value | Description | API Key Location | Security |
|-------|-------------|------------------|----------|
| `true` | Server-side API | `.env.local` | 🔒 Secure |
| `false` | Client-side API | `NEXT_PUBLIC_GEMINI_API_KEY` | ⚠️ Exposed |

### Example Configs:

#### Production (Recommended):

```typescript
config={{
  useServerApi: true,
  geminiApiKey: "", // Not needed
  model: "gemini-1.5-flash",
  // ...
}}
```

#### Development Only (Not Recommended):

```typescript
config={{
  useServerApi: false,
  geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  model: "gemini-1.5-flash",
  // ...
}}
```

---

## 🔒 Security Best Practices

### ✅ DO:

1. **Use Server API in production**
   ```typescript
   useServerApi: true
   ```

2. **Store key in `.env.local`**
   ```bash
   GEMINI_API_KEY=your_key_here
   ```

3. **Add `.env.local` to `.gitignore`**
   ```gitignore
   .env*.local
   ```

4. **Use environment variables in deployment**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Docker: Pass via `-e` flag or docker-compose

5. **Rotate keys regularly**
   - Generate new key every 3-6 months
   - Revoke old keys

---

### ❌ DON'T:

1. **Don't commit API keys to Git**
   ```bash
   # BAD!
   git add .env.local
   ```

2. **Don't use client-side API in production**
   ```typescript
   // BAD for production!
   useServerApi: false
   ```

3. **Don't hardcode keys**
   ```typescript
   // NEVER DO THIS!
   geminiApiKey: "AIzaSyC123..."
   ```

4. **Don't expose NEXT_PUBLIC_GEMINI_API_KEY**
   ```bash
   # This will be visible in browser!
   NEXT_PUBLIC_GEMINI_API_KEY=...
   ```

---

## 🚀 Deployment

### Vercel

1. Go to: Project Settings → Environment Variables
2. Add:
   ```
   Key: GEMINI_API_KEY
   Value: AIzaSyC...your_key
   ```
3. Redeploy

### Netlify

1. Site Settings → Build & Deploy → Environment
2. Add variable:
   ```
   GEMINI_API_KEY=AIzaSyC...your_key
   ```
3. Trigger deploy

### Docker

```dockerfile
# Pass via environment
docker run -e GEMINI_API_KEY=your_key your-image
```

Or use `docker-compose.yml`:

```yaml
services:
  chatbot:
    image: your-chatbot
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
```

---

## 🐛 Troubleshooting

### Problem: "Gemini API key not configured on server"

**Solution:**
1. Check `.env.local` exists in project root
2. Verify key name is `GEMINI_API_KEY` (not `NEXT_PUBLIC_...`)
3. Restart dev server: `npm run dev`
4. Check key is correct (starts with `AIza...`)

---

### Problem: "Failed to fetch" error

**Solution:**
1. Verify server is running
2. Check `/api/chat` endpoint exists
3. Open Network tab in DevTools
4. Check console for errors
5. Verify `useServerApi: true` in config

---

### Problem: API calls work in dev but not in production

**Solution:**
1. Add `GEMINI_API_KEY` to production environment variables
2. Redeploy application
3. Check deployment logs for errors
4. Verify environment variable is set in hosting platform

---

## 📊 Server API Features

### ✅ Supported:

- ✅ Streaming responses (real-time)
- ✅ Conversation history
- ✅ System prompts
- ✅ Multi-language support
- ✅ Model selection (flash, pro)
- ✅ Error handling
- ✅ Edge runtime (fast)

### 🔮 Coming Soon:

- 🔜 Rate limiting per user
- 🔜 Usage analytics
- 🔜 Custom authentication
- 🔜 Webhook support
- 🔜 Multiple AI providers

---

## 💡 Advanced Usage

### Custom Rate Limiting

Add to `app/api/chat/route.ts`:

```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // ... rest of code
}
```

---

### Usage Tracking

```typescript
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // ... handle request ...
  
  const duration = Date.now() - startTime;
  console.log(`Request took ${duration}ms`);
  
  // Log to analytics service
  await analytics.track({
    event: 'chat_message',
    duration,
    model,
    userId: request.headers.get('user-id'),
  });
}
```

---

### Custom Authentication

```typescript
export async function POST(request: NextRequest) {
  const authToken = request.headers.get('Authorization');
  
  if (!authToken || !isValidToken(authToken)) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // ... rest of code
}
```

---

## 🎉 Summary

### Why Server API?

| Feature | Client API | Server API |
|---------|-----------|------------|
| **Security** | ❌ Exposed | ✅ Hidden |
| **Rate Limiting** | ❌ No | ✅ Yes |
| **Usage Tracking** | ❌ Hard | ✅ Easy |
| **Production Ready** | ❌ No | ✅ Yes |
| **Cost Control** | ❌ No | ✅ Yes |
| **Recommended** | ❌ Dev only | ✅ Always |

---

## 📚 Related Documentation

- **CHATWIDGET_API.md** - All configuration options
- **EMBEDDING_GUIDE.md** - How to embed the widget
- **FEATURES.md** - All chatbot features
- **.env.local.example** - Environment variable template

---

## 🚀 Quick Start Checklist

- [ ] Create `.env.local` file
- [ ] Add `GEMINI_API_KEY=your_key`
- [ ] Set `useServerApi: true` in config
- [ ] Restart dev server
- [ ] Test chat functionality
- [ ] Deploy with environment variable set
- [ ] Verify working in production

**Your API key is now secure!** 🔒✨🎉

---

**Best practice: Always use server-side API in production!**

