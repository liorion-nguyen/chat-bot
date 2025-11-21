# 🚀 Quick Start Guide

Get your chatbot running in **5 minutes**!

---

## 📦 Step 1: Install Dependencies

```bash
npm install
```

---

## 🔑 Step 2: Get API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy your key (starts with `AIza...`)

---

## ⚙️ Step 3: Setup Environment

Create `.env.local` file in project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

**Replace** `your_api_key_here` with your actual API key!

---

## 🏃 Step 4: Run Development Server

```bash
npm run dev
```

Open: **http://localhost:3000**

---

## 💬 Step 5: Test Chatbot

1. You should see the chatbot icon in the bottom-right corner
2. Click the icon to open chat
3. Send a message: "Hello!"
4. Bot should respond! ✅

---

## 🎉 Done!

Your chatbot is now running! 

### Next Steps:

- 📖 Read **CHATWIDGET_API.md** for configuration options
- 🎨 Customize colors, text, and behavior
- 🚀 Deploy to Vercel/Netlify
- 📚 Read **FEATURES.md** for all features

---

## 🐛 Having Issues?

### Problem: Chatbot doesn't respond

**Solutions:**
1. Check `.env.local` file exists
2. Verify `GEMINI_API_KEY` is correct
3. Restart dev server: `npm run dev`
4. Check browser console for errors

---

### Problem: "API key not configured"

**Solutions:**
1. Create `.env.local` in project root
2. Add: `GEMINI_API_KEY=your_key`
3. Restart server

---

### Need More Help?

- 📖 **SETUP_ENV.md** - Detailed environment setup
- 🔒 **SERVER_API_GUIDE.md** - Server API configuration
- 📚 **README.md** - Full documentation

---

**Happy chatting!** 🎉💬✨

