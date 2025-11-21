# 🎨 Custom Icon Guide

## 📖 Tổng quan

Bạn có thể thay thế icon chatbot mặc định bằng logo/hình ảnh của riêng công ty/brand!

---

## 🚀 Quick Start

### React Component

```typescript
<ChatWidget config={{
  botIconUrl: 'https://example.com/logo.png',
  // ... other config
}} />
```

### URL Parameter

```
http://localhost:3000/chatwidget/chat?
  botName=Support&
  botIconUrl=https://example.com/logo.png&
  apiKey=YOUR_KEY
```

### Embedding Tool

1. Mở `http://localhost:3000/embed-builder.html`
2. Tìm field **"🎨 URL Icon ChatBot"**
3. Nhập URL của icon (ví dụ: `https://example.com/logo.png`)
4. Copy code!

---

## 📐 Icon Requirements

### Recommended Specifications

| Property | Recommended | Notes |
|----------|-------------|-------|
| **Format** | PNG, SVG, WebP, JPEG | PNG với transparent background là tốt nhất |
| **Size** | 128x128px - 512x512px | Minimum 64x64px |
| **Aspect Ratio** | 1:1 (Square) | Non-square images sẽ bị crop |
| **Background** | Transparent | Hoặc match với `primaryColor` |
| **File Size** | < 100KB | Để load nhanh |

### ✅ Good Examples

```
✓ https://example.com/logo-128.png (PNG, 128x128, transparent)
✓ https://cdn.company.com/icon.svg (SVG, scalable)
✓ https://i.imgur.com/abc123.webp (WebP, optimized)
```

### ❌ Bad Examples

```
✗ Too small: 32x32px (sẽ bị blur khi scale)
✗ Not square: 200x100px (sẽ bị crop)
✗ Too large: 5MB file size (load chậm)
✗ Wrong format: .ico, .bmp (không optimal)
```

---

## 🎯 Use Cases

### 1. Company Logo

```typescript
{
  botName: 'ABC Support',
  botIconUrl: 'https://abc.com/logo.png',
  theme: {
    primaryColor: '#FF6B00', // Brand color
  }
}
```

### 2. Product Mascot

```typescript
{
  botName: 'Mèo AI',
  botIconUrl: 'https://example.com/cat-mascot.png',
  welcomeMessage: 'Meo meo! 🐱'
}
```

### 3. Avatar Style

```typescript
{
  botName: 'Sarah - Sales',
  botIconUrl: 'https://example.com/sarah-avatar.jpg',
  systemPrompt: 'You are Sarah, a friendly sales representative.'
}
```

### 4. Emoji/Icon

```typescript
{
  botName: 'Quick Help',
  botIconUrl: 'https://em-content.zobj.net/thumbs/120/emoji/105/robot_1f916.png'
}
```

---

## 💡 Where to Host Icons?

### Option 1: Your Own Server

```
https://yourwebsite.com/assets/chatbot-icon.png
```

**Pros:**
- ✅ Full control
- ✅ No external dependencies

**Cons:**
- ⚠️ Need hosting
- ⚠️ Need to manage CORS

### Option 2: CDN Services

**Cloudinary:**
```
https://res.cloudinary.com/demo/image/upload/chatbot-icon.png
```

**imgix:**
```
https://demo.imgix.net/chatbot-icon.png?w=128&h=128
```

**Pros:**
- ✅ Fast loading
- ✅ Image optimization
- ✅ Automatic resizing

### Option 3: Public Image Hosts

**Imgur:**
```
https://i.imgur.com/abc123.png
```

**GitHub:**
```
https://raw.githubusercontent.com/user/repo/main/icon.png
```

**Pros:**
- ✅ Free
- ✅ Easy to use

**Cons:**
- ⚠️ Less reliable for production

---

## 🎨 Icon Design Tips

### 1. Simple & Recognizable

```
✓ Simple shapes, clear symbols
✗ Too detailed, complex illustrations
```

### 2. High Contrast

```
✓ Clear distinction from background
✗ Low contrast, hard to see
```

### 3. Consistent Branding

```
✓ Match your brand colors and style
✗ Random clipart that doesn't fit
```

### 4. Test on Different Backgrounds

```
✓ Works on light & dark backgrounds
✗ Only visible on one background color
```

---

## 🔧 Implementation Examples

### React with Dynamic Icon

```typescript
import { useState } from 'react';
import { ChatWidget } from '@/components/ChatWidget';

export default function App() {
  const [iconUrl, setIconUrl] = useState('https://example.com/default.png');

  return (
    <div>
      {/* Icon Selector */}
      <select onChange={(e) => setIconUrl(e.target.value)}>
        <option value="https://example.com/default.png">Default</option>
        <option value="https://example.com/logo.png">Company Logo</option>
        <option value="https://example.com/mascot.png">Mascot</option>
      </select>

      <ChatWidget config={{ botIconUrl: iconUrl }} />
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <iframe :src="chatbotUrl" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const iconUrl = 'https://example.com/logo.png';

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: 'Support',
    botIconUrl: iconUrl,
    apiKey: 'YOUR_KEY',
  });
  return `http://localhost:3000/chatwidget/chat?${params}`;
});
</script>
```

### HTML iframe

```html
<iframe 
  src="http://localhost:3000/chatwidget/chat?botName=Support&botIconUrl=https://example.com/logo.png&apiKey=YOUR_KEY"
  style="position: fixed; bottom: 0; right: 0; width: 450px; height: 700px; border: none;"
></iframe>
```

---

## 🖼️ Icon Sources

### Free Icon Resources

1. **Flaticon**
   - https://www.flaticon.com/
   - Free & Premium icons
   - Multiple formats

2. **Icons8**
   - https://icons8.com/
   - Customizable colors
   - Direct CDN links

3. **Font Awesome**
   - https://fontawesome.com/
   - Icon fonts & SVGs
   - Large library

4. **Iconscout**
   - https://iconscout.com/
   - Free & Premium
   - High quality

### AI-Generated Icons

1. **DALL-E / Midjourney**
   - Generate custom mascots
   - Unique designs

2. **Canva**
   - Design custom logos
   - Templates available

---

## 🎭 Fallback Behavior

### If Icon URL fails to load:

```typescript
// Default icon will be shown
botIconUrl: 'https://broken-url.com/404.png'
// → Shows default MessageCircle icon
```

### No Icon URL provided:

```typescript
// Uses default icon
botIconUrl: undefined
// or
botIconUrl: ''
// → Shows default MessageCircle icon
```

---

## 🔒 CORS Considerations

If your icon doesn't load, check CORS settings:

### Server-side (Express.js example)

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});
```

### Next.js Image Domain

If using Next.js Image component, add to `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['example.com', 'cdn.company.com'],
  },
};
```

---

## 🎨 Advanced: SVG Icons

### Inline SVG (as Data URL)

```typescript
const svgIcon = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath d="M12 2L2 7l10 5 10-5-10-5z"/%3E%3C/svg%3E';

<ChatWidget config={{ botIconUrl: svgIcon }} />
```

### Benefits:
- ✅ No external request
- ✅ Scalable
- ✅ Small file size

---

## 📊 Before & After

### Default Icon
```
┌──────────┐
│    💬    │  ← Default MessageCircle icon
│          │
└──────────┘
```

### Custom Icon
```
┌──────────┐
│   🏢    │  ← Your company logo
│          │
└──────────┘
```

---

## 🐛 Troubleshooting

### Icon not showing?

**Check:**
1. ✅ URL is accessible (open in browser)
2. ✅ Image format is supported (PNG, SVG, JPEG, WebP)
3. ✅ No CORS errors (check console)
4. ✅ File size is reasonable (< 1MB)
5. ✅ URL is properly encoded

### Icon looks pixelated?

**Solution:**
- Use higher resolution (at least 128x128)
- Use SVG for perfect scaling
- Use 2x retina images (256x256 displayed at 128x128)

### Icon has wrong aspect ratio?

**Solution:**
- Crop to square (1:1 aspect ratio)
- Use `object-fit: cover` in CSS
- Pre-process image before uploading

---

## 📚 Related Documentation

- **CHATWIDGET_API.md** - Complete API reference
- **EMBEDDING_TOOL.md** - Embedding tool guide
- **FEATURES.md** - All features overview

---

## 🎉 Summary

✅ **Easy to customize** - Just provide a URL  
✅ **Supports all major formats** - PNG, SVG, JPEG, WebP  
✅ **Fallback to default** - If URL fails  
✅ **Works everywhere** - React, Vue, HTML iframe  
✅ **Perfect branding** - Use your company logo  

**Make your chatbot truly yours with a custom icon! 🎨✨**

