# 🔑 API Key Configuration Options

## 📖 Overview

Bạn có **3 cách** để cung cấp Gemini API key cho chatbot. Chọn cách phù hợp với use case của bạn!

---

## 🎯 Option 1: Config Parameter (RECOMMENDED - Most Flexible)

### ✅ Best For:
- Multi-tenant applications (mỗi tenant có key riêng)
- Dynamic API key từ database
- API key management system
- Maximum flexibility

### How to Use:

```typescript
<ChatWidget
  config={{
    botName: "AI Assistant",
    geminiApiKey: "AIzaSyC...your_key_here", // ← Truyền qua config
    useServerApi: true, // ← Vẫn dùng server API (secure!)
    // ... other configs
  }}
/>
```

### Security Flow:

```
┌─────────┐          ┌──────────┐          ┌────────────┐
│ Your    │  Key →   │ Next.js  │  Key →   │  Gemini    │
│ Config  │          │  Server  │          │  API       │
└─────────┘          └──────────┘          └────────────┘
  (Dynamic)          (Middleware)           (AI Response)
```

**Key Points:**
- ✅ Key được gửi từ config → server → Gemini
- ✅ KHÔNG exposed trực tiếp từ browser → Gemini
- ✅ Server vẫn làm middleware để kiểm soát
- ✅ Linh hoạt nhất cho multi-tenant

---

## 🎯 Option 2: Environment Variable (Convenient)

### ✅ Best For:
- Single-tenant applications
- Simple deployments
- Development environment
- Khi không cần dynamic key

### How to Use:

**1. Create `.env.local`:**

```bash
GEMINI_API_KEY=AIzaSyC...your_key_here
```

**2. Use in config:**

```typescript
<ChatWidget
  config={{
    botName: "AI Assistant",
    geminiApiKey: "", // ← Để trống, server sẽ dùng .env
    useServerApi: true,
    // ... other configs
  }}
/>
```

### Security Flow:

```
┌─────────┐          ┌──────────┐          ┌────────────┐
│ Config  │  Empty   │ Next.js  │  Key →   │  Gemini    │
│ (empty) │  ────►   │ Server   │  (from   │  API       │
└─────────┘          │ .env     │  .env)   └────────────┘
                     └──────────┘
```

**Key Points:**
- ✅ Key ẨN hoàn toàn khỏi code
- ✅ Chỉ tồn tại trên server
- ✅ Convenient cho single-tenant
- ✅ Good for production

---

## 🎯 Option 3: Hybrid (Config + Env Fallback)

### ✅ Best For:
- Flexibility + convenience
- Development → production transition
- Optional override capability

### How to Use:

**1. Set fallback in `.env.local`:**

```bash
GEMINI_API_KEY=AIzaSyC...default_key
```

**2. Config with optional override:**

```typescript
<ChatWidget
  config={{
    botName: "AI Assistant",
    // Provide key nếu muốn override, hoặc để trống dùng .env
    geminiApiKey: userSpecificKey || "",
    useServerApi: true,
    // ... other configs
  }}
/>
```

### Logic:

```typescript
// Server checks in this order:
1. apiKey from config? → Use it
2. Else: GEMINI_API_KEY from .env? → Use it
3. Else: Return error
```

**Key Points:**
- ✅ Max flexibility
- ✅ Fallback mechanism
- ✅ Override when needed
- ✅ Default when not

---

## 📊 Comparison Table

| Feature | Option 1: Config | Option 2: Env | Option 3: Hybrid |
|---------|------------------|---------------|------------------|
| **Flexibility** | 🟢 High | 🟡 Low | 🟢 High |
| **Security** | 🟢 Good | 🟢 Best | 🟢 Good |
| **Multi-tenant** | 🟢 Yes | 🔴 No | 🟢 Yes |
| **Setup Complexity** | 🟡 Medium | 🟢 Easy | 🟡 Medium |
| **Dynamic Keys** | 🟢 Yes | 🔴 No | 🟢 Yes |
| **Production Ready** | 🟢 Yes | 🟢 Yes | 🟢 Yes |
| **Code Changes** | 🔴 Required | 🟢 None | 🟡 Optional |
| **Best For** | Multi-tenant | Single-tenant | Both |

---

## 💡 Use Case Examples

### Example 1: SaaS Platform (Multi-tenant)

```typescript
// Each customer has their own API key
const customerApiKey = await getCustomerApiKey(customerId);

<ChatWidget
  config={{
    geminiApiKey: customerApiKey, // ← From database
    useServerApi: true,
    botName: customer.companyName,
  }}
/>
```

---

### Example 2: Single Website

```bash
# .env.local
GEMINI_API_KEY=AIzaSyC...your_key
```

```typescript
<ChatWidget
  config={{
    geminiApiKey: "", // ← Server uses .env
    useServerApi: true,
    botName: "Support Bot",
  }}
/>
```

---

### Example 3: Development → Production

```typescript
// Development: Use NEXT_PUBLIC for quick testing
// Production: Use server API with config/env

const isDev = process.env.NODE_ENV === 'development';

<ChatWidget
  config={{
    geminiApiKey: isDev 
      ? process.env.NEXT_PUBLIC_GEMINI_API_KEY 
      : "", // Use server .env in prod
    useServerApi: !isDev, // Server API in prod, client in dev
    botName: "Dev Bot",
  }}
/>
```

---

### Example 4: Premium Features

```typescript
// Free users: Shared API key (from .env)
// Premium users: Dedicated API key (from config)

const apiKey = user.isPremium 
  ? user.dedicatedApiKey 
  : ""; // Fallback to .env

<ChatWidget
  config={{
    geminiApiKey: apiKey,
    useServerApi: true,
    botName: user.isPremium ? "Premium AI" : "Free AI",
  }}
/>
```

---

## 🔒 Security Considerations

### All Options Use Server API:

**IMPORTANT:** Regardless of where the key comes from (config or .env), when `useServerApi: true`:

```
Browser → Next.js Server → Gemini API
         (Key stays here)
```

**Key NEVER goes:**
```
❌ Browser → Gemini API directly
```

---

### Option 1 (Config) Security:

```typescript
// ✅ GOOD: Server API
config={{
  geminiApiKey: "AIzaSyC...",
  useServerApi: true, // Key goes: Config → Server → Gemini
}}

// ⚠️ BAD: Direct API (DON'T USE IN PRODUCTION!)
config={{
  geminiApiKey: "AIzaSyC...",
  useServerApi: false, // Key goes: Config → Browser → Gemini (EXPOSED!)
}}
```

---

### Option 2 (Env) Security:

```bash
# ✅ GOOD: Server-only env
GEMINI_API_KEY=...

# ⚠️ BAD: Client-exposed env
NEXT_PUBLIC_GEMINI_API_KEY=...
```

---

## 🐛 Troubleshooting

### Error: "API key not provided"

**Means:** Both config AND .env are empty.

**Solutions:**
1. **Option A:** Provide key in config:
   ```typescript
   geminiApiKey: "AIzaSyC..."
   ```

2. **Option B:** Set in `.env.local`:
   ```bash
   GEMINI_API_KEY=AIzaSyC...
   ```

3. **Option C:** Both (hybrid)

---

### Error: "Invalid API key"

**Check:**
1. ✅ Key format starts with `AIza...`
2. ✅ No extra spaces or quotes
3. ✅ Key is active (not revoked)
4. ✅ Gemini API enabled in Google Cloud

---

### Key works in dev but not production

**Check:**
1. ✅ If using config: Ensure key passed correctly
2. ✅ If using .env: Set in hosting platform
3. ✅ Redeployed after adding env var
4. ✅ No typos in variable name

---

## 📝 Implementation Code

### Server API Route:

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { apiKey: clientApiKey, message, ... } = await request.json();
  
  // Priority: Config > Env
  const apiKey = clientApiKey || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return new Response('API key not provided', { status: 400 });
  }
  
  // Use the key...
}
```

### Client Hook:

```typescript
// hooks/useGeminiServer.ts
export function useGeminiServer({ apiKey, ... }) {
  const sendMessage = async ({ message, ... }) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        apiKey, // Send to server
        message,
        // ...
      }),
    });
    // ...
  };
}
```

---

## 🎯 Recommendations

### For Different Scenarios:

| Scenario | Recommended Option | Why |
|----------|-------------------|-----|
| **SaaS / Multi-tenant** | Option 1 (Config) | Each tenant has own key |
| **Single website** | Option 2 (Env) | Simple and secure |
| **E-commerce** | Option 3 (Hybrid) | Override for premium |
| **Development** | Option 2 (Env) | Quick setup |
| **Enterprise** | Option 1 (Config) | Key management system |
| **Open source** | Option 2 (Env) | Users provide own key |

---

## 🎉 Summary

### The Big Picture:

```
Option 1: Config → Server → Gemini (Flexible)
Option 2: .env → Server → Gemini (Simple)
Option 3: Config/Env → Server → Gemini (Best of both)
```

**All secure when `useServerApi: true`!** 🔒

**Choose based on your needs:**
- Need flexibility? → Option 1
- Want simplicity? → Option 2
- Want both? → Option 3

---

## 📚 Related Docs

- **SERVER_API_GUIDE.md** - Server API detailed guide
- **SETUP_ENV.md** - Environment setup
- **CHATWIDGET_API.md** - All config options

**Happy configuring!** 🚀🔑✨

