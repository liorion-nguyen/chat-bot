# 🎨 Custom Bot Avatar Guide

## 📖 Overview

Bây giờ bạn có thể **customize avatar của bot trong chat messages** bằng cách cung cấp URL của riêng mình! Thay vì dùng icon `Bot` mặc định, bạn có thể dùng logo công ty hoặc avatar bot của bạn.

**⚠️ Lưu ý quan trọng**: 
- ✅ **Avatar trong tin nhắn**: Sử dụng custom URL
- ❌ **Icon mở/đóng chat** (góc màn hình): Giữ nguyên icon `MessageCircle` mặc định

---

## 🎯 Visual Comparison

### Default (No Custom Avatar):

```
Chat Messages:
┌───────────────────────────┐
│  [🤖] Bot Name            │  ← Bot icon (default)
│  └─ Hello! How can I...  │
└───────────────────────────┘

Corner Icon: 💬 (MessageCircle - không thay đổi)
```

### With Custom Avatar:

```
Chat Messages:
┌───────────────────────────┐
│  [🏢] Bot Name            │  ← Custom logo/avatar
│  └─ Hello! How can I...  │
└───────────────────────────┘

Corner Icon: 💬 (MessageCircle - vẫn giữ nguyên)
```

---

## ⚙️ Configuration

### Parameter Name: `botIconUrl`

**Type**: `string` (optional)  
**Default**: `""` (empty - sẽ dùng icon Bot mặc định)

**Applies to**: 
- ✅ Avatar trong tin nhắn của bot
- ✅ Avatar trong loading indicator
- ❌ KHÔNG áp dụng cho icon mở/đóng chat

---

## 🎯 Where to Use

### 1. **Direct URL Embedding**

```
https://yourdomain.com/chatwidget/chat?botIconUrl=https://example.com/bot-avatar.png
```

### 2. **Iframe Embedding**

```html
<iframe
  src="https://yourdomain.com/chatwidget/chat?botIconUrl=https://i.imgur.com/bot-avatar.png"
  style="position: fixed; bottom: 0; right: 0; width: 450px; height: 700px; border: none; z-index: 9999;"
></iframe>
```

### 3. **React Integration**

```tsx
import { ChatWidget } from '@/components/ChatWidget';

function MyApp() {
  return (
    <ChatWidget
      config={{
        botIconUrl: 'https://example.com/bot-avatar.png',
        botName: 'Support Bot',
        welcomeMessage: 'Hi! How can I help?',
        // ... other configs
      }}
    />
  );
}
```

### 4. **In Next.js App**

```tsx
<ChatWidget
  config={{
    botName: "Support Bot",
    welcomeMessage: "Hello! 👋",
    botIconUrl: "https://cdn.example.com/support-avatar.png",
    theme: {
      primaryColor: "#4F46E5",
    }
  }}
/>
```

---

## 🖼️ Avatar Requirements

### Recommended Specs:

- **Format**: PNG, JPG, SVG, WebP
- **Size**: 32x32px to 128x128px (optimal: 64x64px)
- **Shape**: Square (will be displayed in a circle)
- **Background**: Transparent or solid color
- **File size**: < 100KB for best performance

### Image URLs:

✅ **Supported**:
- `https://example.com/avatar.png`
- `https://i.imgur.com/abc123.png`
- `https://cdn.mycompany.com/bot-avatar.jpg`
- `https://avatars.githubusercontent.com/u/123456`
- `https://ui-avatars.com/api/?name=Bot&background=4F46E5`

❌ **Not Supported**:
- Relative paths: `/images/avatar.png`
- Base64 encoded images (too long for URL params)
- Local file paths: `C:/images/avatar.png`

---

## 🎨 What Gets Customized

### ✅ Custom Avatar Shows In:

#### 1. Bot Messages
```
[🏢] Support Bot: Hello! How can I help you today?
[🏢] Support Bot: Let me check that for you...
[🏢] Support Bot: Here's what I found...
```

#### 2. Loading Indicator
```
[🏢] ● ● ●  (typing animation với custom avatar)
```

### ❌ NOT Customized:

#### 1. Chat Open/Close Icon (góc màn hình)
```
┌─────────┐
│   💬   │  ← Vẫn là MessageCircle
└─────────┘
```

#### 2. User Avatar
```
[👤] You: My message here
```

---

## 💡 Use Cases

### 1. **Brand Consistency**

```
✅ Company logo trong chat messages
→ User nhận biết brand ngay
→ Professional, consistent branding

❌ Không thay đổi corner icon
→ Giữ UX standard và familiar
```

### 2. **Bot Personality**

```
😊 Friendly avatar → Bot approachable và thân thiện
🤖 Tech avatar → Bot intelligent và capable
👔 Professional → Bot formal và business-like
```

### 3. **Department-Specific Bots**

```
Sales Bot: 💰 Avatar trong messages
Support Bot: 🛠️ Avatar trong messages
Marketing Bot: 📢 Avatar trong messages

Tất cả dùng 💬 cho corner icon → Consistent UX
```

### 4. **Multi-brand Support**

```
Brand A: Logo A trong messages
Brand B: Logo B trong messages
White-label: Generic icon

Corner icon: Luôn là 💬 → Uniform experience
```

---

## 🎯 Best Practices

### ✅ DO:

- ✅ Use high-quality images (at least 64x64px)
- ✅ Use square images (1:1 aspect ratio)
- ✅ Host on reliable CDN (fast loading)
- ✅ Use HTTPS URLs (security)
- ✅ Test on different backgrounds
- ✅ Keep file size small (< 100KB)
- ✅ Use recognizable branding
- ✅ Test avatar visibility at small size

### ❌ DON'T:

- ❌ Use very large images (> 500KB)
- ❌ Use animated GIFs (performance)
- ❌ Use HTTP URLs (security warning)
- ❌ Use very detailed logos (unreadable)
- ❌ Use text-heavy images (hard to read)
- ❌ Use non-square images (will be cropped)
- ❌ Use images with important edge details (may be cut)

---

## 🎨 Avatar Sources

### Free Avatar Resources:

1. **Your Company Logo**: Best for branding
2. **Flaticon**: https://www.flaticon.com/ (free icons)
3. **Noun Project**: https://thenounproject.com/ (icons)
4. **Imgur**: Free image hosting
5. **GitHub Avatars**: For open source projects
6. **UI Avatars**: https://ui-avatars.com/ (dynamic avatars)

### Example URLs:

```
# GitHub avatar
https://avatars.githubusercontent.com/u/9919?s=200&v=4

# Imgur hosted
https://i.imgur.com/abc123.png

# Your CDN
https://cdn.mycompany.com/bot-avatar.png

# UI Avatars (dynamic with initials)
https://ui-avatars.com/api/?name=Support+Bot&background=4F46E5&color=fff&size=128
```

---

## 🔧 Implementation Details

### How It Works:

**ChatMessage.tsx** checks if `botAvatarUrl` is provided:

```typescript
{isUser ? (
  // User avatar (không thay đổi)
  <User className="h-5 w-5 text-white" />
) : botAvatarUrl ? (
  // Custom bot avatar
  <Image
    src={botAvatarUrl}
    alt={`${botName} avatar`}
    width={32}
    height={32}
    className="h-full w-full object-cover"
    unoptimized
  />
) : (
  // Default bot icon
  <Bot className="h-5 w-5 text-gray-700" />
)}
```

### Avatar Properties:

- **Container**: `8x8` (32x32px) rounded circle
- **Image**: Fills container with `object-cover`
- **Alt text**: `{botName} avatar` for accessibility
- **Unoptimized**: Allows external URLs without Next.js optimization

---

## 🐛 Troubleshooting

### Problem: Avatar không hiển thị trong messages

**Solutions**:
1. ✅ Check URL có accessible không (mở trực tiếp trong browser)
2. ✅ Verify HTTPS (không phải HTTP)
3. ✅ Check CORS policy của image hosting
4. ✅ Try different image hosting (Imgur, Cloudinary)
5. ✅ Check browser console for errors
6. ✅ Verify image format (PNG, JPG, WebP)

### Problem: Avatar bị mờ/blur

**Solutions**:
1. ✅ Use larger image (ít nhất 64x64px, tốt nhất 128x128)
2. ✅ Use PNG thay vì JPG (better for logos)
3. ✅ Ensure high-quality source image
4. ✅ Test với SVG (scales perfectly)

### Problem: Avatar bị cắt hoặc méo

**Solutions**:
1. ✅ Use square image (1:1 ratio)
2. ✅ Add padding trong source image
3. ✅ Center important elements
4. ✅ Avoid important details near edges

### Problem: Avatar load chậm

**Solutions**:
1. ✅ Reduce file size (optimize/compress image)
2. ✅ Use CDN thay vì origin server
3. ✅ Use WebP format (smaller file size)
4. ✅ Consider image dimensions (64x64 is enough)

---

## 🔮 Advanced Customization

### 1. Dynamic Avatars Based on Bot State

```typescript
const getAvatarUrl = (botState: string) => {
  const avatars = {
    idle: 'https://cdn.example.com/bot-idle.png',
    thinking: 'https://cdn.example.com/bot-thinking.png',
    success: 'https://cdn.example.com/bot-success.png',
    error: 'https://cdn.example.com/bot-error.png',
  };
  return avatars[botState] || avatars.idle;
};
```

### 2. User Language-Specific Avatars

```typescript
const botIconUrl = user.language === 'vi'
  ? 'https://cdn.example.com/bot-vi.png'
  : user.language === 'en'
  ? 'https://cdn.example.com/bot-en.png'
  : 'https://cdn.example.com/bot-default.png';
```

### 3. Department/Team-Specific Avatars

```typescript
const departmentAvatars = {
  sales: 'https://cdn.example.com/sales-bot.png',
  support: 'https://cdn.example.com/support-bot.png',
  billing: 'https://cdn.example.com/billing-bot.png',
  hr: 'https://cdn.example.com/hr-bot.png',
};

const botIconUrl = departmentAvatars[currentDepartment];
```

### 4. Time-Based Avatars

```typescript
const hour = new Date().getHours();
const botIconUrl = hour >= 6 && hour < 18
  ? 'https://cdn.example.com/bot-day.png'
  : 'https://cdn.example.com/bot-night.png';
```

### 5. User Tier-Based Avatars

```typescript
const tierAvatars = {
  free: 'https://cdn.example.com/bot-free.png',
  premium: 'https://cdn.example.com/bot-premium.png',
  enterprise: 'https://cdn.example.com/bot-enterprise.png',
};

const botIconUrl = tierAvatars[user.tier] || tierAvatars.free;
```

---

## 📊 Real-World Examples

### Example 1: Corporate Support Bot

```typescript
config={{
  botName: "Acme Support",
  botIconUrl: "https://cdn.acme.com/support-avatar.png",
  welcomeMessage: "Hi! I'm here to help with any questions."
}}
```

**Result**:
- Messages show Acme logo
- Professional branded experience
- Corner icon stays 💬 (familiar UX)

---

### Example 2: E-commerce Assistant

```typescript
config={{
  botName: "Shopping Assistant",
  botIconUrl: "https://cdn.shop.com/shopping-bot.png",
  welcomeMessage: "Let me help you find what you're looking for!"
}}
```

**Result**:
- Friendly shopping bag avatar
- Welcoming, helpful vibe
- Standard 💬 corner icon

---

### Example 3: Tech Support Bot

```typescript
config={{
  botName: "TechBot",
  botIconUrl: "https://cdn.techco.com/tech-avatar.png",
  welcomeMessage: "Ready to solve your tech issues!"
}}
```

**Result**:
- Technical/robotic avatar
- Competent, capable feel
- Minimal 💬 corner icon

---

### Example 4: Financial Advisor Bot

```typescript
config={{
  botName: "FinBot",
  botIconUrl: "https://cdn.fintech.com/advisor-avatar.png",
  welcomeMessage: "Let's discuss your financial goals."
}}
```

**Result**:
- Professional, trustworthy avatar
- Serious, expert impression
- Clean 💬 corner icon

---

## 🎉 Summary

### Key Points:

| Feature | Description |
|---------|-------------|
| 🎨 **Custom Avatar** | Logo/avatar trong chat messages |
| 💬 **Standard Icon** | Corner icon giữ MessageCircle |
| 🔗 **URL-based** | Simple HTTPS URL |
| 🎯 **Auto Fallback** | Default Bot icon nếu fail |
| 📱 **Responsive** | Great trên mọi device |
| 🖼️ **Format Flexible** | PNG, JPG, SVG, WebP |
| ⚡ **Performance** | Next.js Image optimization |
| 🔒 **Secure** | HTTPS required |

### Design Philosophy:

```
Corner Icon (💬):
→ Standard, familiar, minimal
→ Không distract
→ Consistent UX across all sites

Chat Avatar (🏢):
→ Branded, personalized
→ Builds trust và recognition
→ Contextual và meaningful
```

**Make your bot messages truly yours!** 🎨✨

---

## 📚 Related Documentation

- **CHATWIDGET_API.md** - All configuration parameters
- **EMBEDDING_GUIDE.md** - How to embed the widget
- **FEATURES.md** - All chatbot features
- **NOTIFICATION_BADGE.md** - Notification badge feature

---

## 🚀 Quick Start

### Step 1: Prepare Avatar Image
```
1. Create/find square image (64x64 or larger)
2. Upload to image hosting (Imgur, your CDN, etc.)
3. Get HTTPS URL
```

### Step 2: Configure Bot
```typescript
botIconUrl: "https://your-cdn.com/bot-avatar.png"
```

### Step 3: Test
```
1. Send message as user
2. Wait for bot response
3. Check avatar appears in bot messages ✅
4. Verify corner icon unchanged (💬) ✅
```

**Happy customizing!** 🚀🎨

