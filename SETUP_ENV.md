# ⚙️ Environment Setup Guide

## 📖 Quick Start

This guide will help you set up environment variables for the chatbot project.

---

## 🔑 Get Your Gemini API Key

### Step 1: Visit Google AI Studio

Go to: **https://makersuite.google.com/app/apikey**

### Step 2: Create API Key

1. Click **"Create API Key"**
2. Select your Google Cloud project (or create new)
3. Click **"Create API Key in existing project"**
4. Copy your API key (starts with `AIza...`)

**Example:**
```
AIzaSyC_abc123xyz789_example_key_here
```

⚠️ **Keep this key secret!** Don't share or commit to Git.

---

## 📁 Create Environment File

### For Local Development:

Create `.env.local` file in project root:

```bash
# Navigate to project root
cd chat-bot

# Create .env.local file
touch .env.local
```

### Add Your API Key:

Open `.env.local` and add:

```bash
# Gemini AI API Key (Server-side - SECURE!)
GEMINI_API_KEY=AIzaSyC_your_actual_api_key_here
```

**Replace** `AIzaSyC_your_actual_api_key_here` with your actual key!

---

## ✅ Verify Setup

### Step 1: Check File Structure

```
chat-bot/
├── .env.local          ← Your file here!
├── .gitignore          ← Should contain .env*.local
├── app/
├── components/
└── ...
```

### Step 2: Verify .gitignore

Open `.gitignore` and ensure it contains:

```gitignore
# local env files
.env*.local
```

This prevents committing your API key to Git! 🔒

### Step 3: Restart Dev Server

```bash
# Stop server (Ctrl+C if running)
# Start again
npm run dev
```

**Environment variables only load on server start!**

---

## 🎯 Configuration Modes

### ✅ Mode 1: Server-Side API (RECOMMENDED)

**File:** `.env.local`
```bash
GEMINI_API_KEY=your_key_here
```

**Config:**
```typescript
config={{
  useServerApi: true,  // ✅ Secure!
  geminiApiKey: "",    // Not needed
}}
```

**Benefits:**
- ✅ API key hidden on server
- ✅ Production-ready
- ✅ Most secure

---

### ⚠️ Mode 2: Client-Side API (DEV ONLY)

**File:** `.env.local`
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

**Config:**
```typescript
config={{
  useServerApi: false,  // ⚠️ Key will be exposed!
  geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
}}
```

**⚠️ WARNING:**
- ❌ API key visible in browser
- ❌ Anyone can copy it
- ❌ NOT for production!

---

## 🚀 Deployment Setup

### Vercel

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add variable:
   ```
   Name: GEMINI_API_KEY
   Value: AIzaSyC_your_key_here
   Environment: Production, Preview, Development
   ```
4. Click **Save**
5. Redeploy your project

---

### Netlify

1. Go to **Site Settings** → **Build & Deploy**
2. Scroll to **Environment**
3. Click **Edit variables**
4. Add:
   ```
   Key: GEMINI_API_KEY
   Value: AIzaSyC_your_key_here
   ```
5. Save and trigger redeploy

---

### Railway

1. Go to your project
2. Click **Variables** tab
3. Add variable:
   ```
   GEMINI_API_KEY=AIzaSyC_your_key_here
   ```
4. Redeploy

---

### Docker

**Option 1: Pass via command line**

```bash
docker run -e GEMINI_API_KEY=your_key your-image
```

**Option 2: Use .env file**

Create `.env` file:
```bash
GEMINI_API_KEY=your_key_here
```

Run with env file:
```bash
docker run --env-file .env your-image
```

**Option 3: docker-compose.yml**

```yaml
version: '3.8'
services:
  chatbot:
    image: your-chatbot-image
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
```

Run:
```bash
docker-compose up
```

---

## 🐛 Troubleshooting

### Problem: "API key not configured"

**Solutions:**

1. **Check file name:**
   ```bash
   # Should be .env.local (with dot!)
   ls -la | grep env
   ```

2. **Check variable name:**
   ```bash
   # Should be GEMINI_API_KEY
   cat .env.local
   ```

3. **Restart server:**
   ```bash
   # Environment variables load on server start
   npm run dev
   ```

4. **Check key format:**
   ```bash
   # Should start with AIza...
   # No quotes needed
   GEMINI_API_KEY=AIzaSyC123...
   ```

---

### Problem: "Key not found in production"

**Solutions:**

1. **Add to hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment
   - Railway: Variables tab

2. **Verify variable name:**
   - Should be `GEMINI_API_KEY` (not `NEXT_PUBLIC_...`)

3. **Redeploy:**
   - Changes to env vars require redeploy

---

### Problem: "Key works in dev but not production"

**Check:**

1. ✅ Environment variable set in hosting platform
2. ✅ Variable name matches (case-sensitive!)
3. ✅ Redeployed after adding variable
4. ✅ No typos in key
5. ✅ Key is active (not revoked)

---

## 🔒 Security Best Practices

### ✅ DO:

1. **Use `.env.local` for development**
   ```bash
   GEMINI_API_KEY=your_key
   ```

2. **Add to .gitignore**
   ```gitignore
   .env*.local
   ```

3. **Use server-side API**
   ```typescript
   useServerApi: true
   ```

4. **Store in hosting platform for production**
   - Vercel Environment Variables
   - Netlify Environment
   - Railway Variables

5. **Rotate keys periodically**
   - Every 3-6 months
   - After team member leaves
   - If compromised

---

### ❌ DON'T:

1. **Don't commit to Git**
   ```bash
   # NEVER do this!
   git add .env.local
   ```

2. **Don't use NEXT_PUBLIC_ in production**
   ```bash
   # This exposes key to browser!
   NEXT_PUBLIC_GEMINI_API_KEY=...
   ```

3. **Don't hardcode in source**
   ```typescript
   // NEVER do this!
   const apiKey = "AIzaSyC123...";
   ```

4. **Don't share keys**
   - Don't send via email
   - Don't post in chat
   - Don't include in screenshots

---

## 📋 Environment Variables Reference

### Server-Side (Secure)

| Variable | Purpose | Visibility | Usage |
|----------|---------|------------|-------|
| `GEMINI_API_KEY` | Gemini API key | Server only | Server API calls |

**Access in code:**
```typescript
const apiKey = process.env.GEMINI_API_KEY;
```

---

### Client-Side (Dev Only)

| Variable | Purpose | Visibility | Usage |
|----------|---------|------------|-------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini API key | ⚠️ Browser too! | Client API calls |

**Access in code:**
```typescript
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
```

⚠️ **WARNING:** Anything with `NEXT_PUBLIC_` is visible in browser!

---

## 🎯 Complete Setup Example

### 1. Create `.env.local`:

```bash
# Server-side API key (SECURE!)
GEMINI_API_KEY=AIzaSyDGpZXy...your_actual_key

# Optional: Client-side (DEV ONLY!)
# NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDGpZXy...your_actual_key
```

### 2. Update `.gitignore`:

```gitignore
# Environment files
.env*.local
.env
```

### 3. Configure ChatWidget:

```typescript
// app/page.tsx
const config = {
  botName: "AI Assistant",
  systemPrompt: "You are helpful.",
  geminiApiKey: "", // Empty when using server API
  useServerApi: true, // ✅ Secure mode!
  model: "gemini-1.5-flash",
};
```

### 4. Start Development:

```bash
npm run dev
```

### 5. Test:

```bash
# Open browser
http://localhost:3000

# Send a message
# Should work! ✅
```

---

## 📚 Related Documentation

- **SERVER_API_GUIDE.md** - Detailed server API info
- **CHATWIDGET_API.md** - Configuration options
- **FEATURES.md** - All chatbot features

---

## ✅ Setup Checklist

- [ ] Get Gemini API key from Google AI Studio
- [ ] Create `.env.local` file
- [ ] Add `GEMINI_API_KEY=your_key`
- [ ] Verify `.gitignore` includes `.env*.local`
- [ ] Set `useServerApi: true` in config
- [ ] Restart dev server
- [ ] Test chatbot functionality
- [ ] Add env var to hosting platform for production
- [ ] Deploy and test in production

**You're all set!** 🎉🚀

---

**Remember: Keep your API key secret and use server-side API in production!** 🔒

