# 🛠️ Interactive Embedding Tool

## 📖 Giới thiệu

Chúng tôi đã tạo một **Interactive Embedding Tool** - công cụ trực quan giúp bạn config và generate code nhúng chatbot một cách dễ dàng!

## 🚀 Cách sử dụng

### Option 1: Sử dụng Tool Online (Đơn giản nhất)

1. **Chạy development server:**
   ```bash
   npm run dev
   ```

2. **Mở trình duyệt và truy cập:**
   ```
   http://localhost:3000/embed-builder.html
   ```

3. **Configure chatbot của bạn:**
   - Điền thông tin bot (tên, tin nhắn chào, gợi ý...)
   - Chọn màu sắc và theme
   - Chọn vị trí hiển thị
   - Bật/tắt context awareness

4. **Copy code và nhúng vào website:**
   - Chọn tab phù hợp (URL / iframe / React)
   - Click "Copy" để copy code
   - Paste vào website của bạn

5. **Preview trực tiếp:**
   - Tool có live preview ngay trên trang
   - Click "Preview trong tab mới" để xem fullscreen

---

## 📋 Các Tab Available

### 🔗 Tab 1: Direct URL

**Khi nào dùng:**
- Test nhanh
- Share link cho người khác
- Tích hợp vào hệ thống khác qua URL

**Output:**
```
http://localhost:3000/chatwidget/chat?botName=AI%20Assistant&...
```

**Cách dùng:**
- Copy URL và mở trong browser
- Share link này cho teammates
- Sử dụng trong iframe

---

### 🖼️ Tab 2: iframe Embed

**Khi nào dùng:**
- Website HTML/PHP/WordPress
- Không có React/Next.js
- Muốn nhúng nhanh nhất

**Output:**
```html
<iframe 
  src="http://localhost:3000/chatwidget/chat?..."
  style="position: fixed; bottom: 0; right: 0; ..."
></iframe>
```

**Cách dùng:**
1. Copy toàn bộ code iframe
2. Paste vào HTML của website (trước `</body>`)
3. Done! Chatbot sẽ xuất hiện

**Ví dụ - WordPress:**
```php
<!-- Thêm vào footer.php -->
<?php wp_footer(); ?>
<iframe src="..."></iframe>
</body>
</html>
```

**Ví dụ - HTML thuần:**
```html
<!DOCTYPE html>
<html>
<body>
  <h1>My Website</h1>
  
  <!-- Chatbot iframe -->
  <iframe src="..."></iframe>
</body>
</html>
```

---

### ⚛️ Tab 3: React Component

**Khi nào dùng:**
- React/Next.js application
- Muốn control tốt hơn
- Cần customize nhiều

**Output:**
```tsx
import { ChatWidget } from '@/components/ChatWidget';

export default function MyPage() {
  const config = { ... };
  return <ChatWidget config={config} />;
}
```

**Cách dùng:**
1. Copy code
2. Paste vào component của bạn
3. Import ChatWidget component
4. Render trong JSX

---

### 🟢 Tab 4: Vue.js Component

**Khi nào dùng:**
- Vue 2 hoặc Vue 3 application
- Vuetify, Nuxt.js, Quasar
- Muốn tích hợp trong Vue ecosystem

**Output có 2 phiên bản:**

#### Composition API (Vue 3 - Recommended)
```vue
<template>
  <iframe :src="chatbotUrl" class="chatbot-widget"></iframe>
</template>

<script setup>
import { computed } from 'vue';
const chatbotUrl = computed(() => { ... });
</script>
```

#### Options API (Vue 2/3 - Classic)
```vue
<template>
  <iframe :src="chatbotUrl" class="chatbot-widget"></iframe>
</template>

<script>
export default {
  computed: {
    chatbotUrl() { ... }
  }
}
</script>
```

**Cách dùng:**
1. Copy code phù hợp với Vue version
2. Paste vào component (.vue file)
3. Import và sử dụng trong app

---

## ⚙️ Configuration Options

### 🤖 Basic Settings

| Field | Description | Example |
|-------|-------------|---------|
| **Tên Bot** | Tên hiển thị của chatbot | `AI Assistant`, `Support Bot` |
| **Tin nhắn chào** | Message đầu tiên | `Xin chào! Tôi có thể giúp gì?` |
| **Placeholder** | Text trong input field | `Nhập tin nhắn...` |
| **System Prompt** | Hướng dẫn cho AI | `Bạn là trợ lý thân thiện...` |
| **Gợi ý** | Suggestions (phân cách dấu phẩy) | `Hello, Help, More` |
| **AI Model** | Model sử dụng | `gemini-1.5-flash` |
| **API Key** | Gemini API key (optional) | `AIza...` |

### 🧠 Context Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Nhớ ngữ cảnh** | Bot nhớ cuộc hội thoại | `true` (enabled) |
| **Số tin nhắn nhớ** | Max messages in context | `20` |

**Khi nào bật Context:**
- ✅ Customer support (nhớ vấn đề khách)
- ✅ Tutoring (theo dõi tiến trình học)
- ✅ Conversation bots

**Khi nào tắt Context:**
- ❌ FAQ bots (câu hỏi độc lập)
- ❌ Simple command bots
- ❌ Privacy-sensitive apps

### 🎨 Theme Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Màu chính** | Primary color (buttons, header) | `#4F46E5` (Indigo) |
| **Màu tin nhắn User** | User message background | `#4F46E5` |
| **Màu tin nhắn Bot** | Bot message background | `#F3F4F6` (Gray) |
| **Vị trí** | Widget position | `bottom-right` |

**Preset Themes:**

**Professional Blue:**
```
Primary: #4F46E5
User Msg: #4F46E5
Bot Msg: #F3F4F6
```

**Friendly Green:**
```
Primary: #10B981
User Msg: #10B981
Bot Msg: #F3F4F6
```

**Vibrant Purple:**
```
Primary: #8B5CF6
User Msg: #8B5CF6
Bot Msg: #F3F4F6
```

---

## 🎯 Use Cases & Examples

### Use Case 1: Customer Support

**Configuration:**
```
Tên Bot: "Support Team"
System Prompt: "You are a helpful customer support agent. Assist with orders, returns, and product questions."
Suggestions: "Track order, Return policy, Contact human, Product info"
Enable History: true (để nhớ vấn đề khách đang hỏi)
Position: bottom-right
```

### Use Case 2: E-commerce Sales

**Configuration:**
```
Tên Bot: "Shopping Assistant"
System Prompt: "You are a friendly sales assistant. Help customers find products and make purchase decisions."
Suggestions: "Show products, Compare items, Best deals, Checkout help"
Enable History: true
Primary Color: #10B981 (Green - friendly)
```

### Use Case 3: Educational Platform

**Configuration:**
```
Tên Bot: "Study Buddy"
System Prompt: "You are a patient tutor. Explain concepts clearly and provide examples."
Suggestions: "Explain topic, Practice problems, Quiz me, Study tips"
Enable History: true
Max History: 50 (nhớ nhiều để theo dõi lesson)
Model: gemini-1.5-pro (better quality for education)
```

### Use Case 4: FAQ Bot

**Configuration:**
```
Tên Bot: "FAQ Assistant"
System Prompt: "Answer questions briefly based on company policies and information."
Suggestions: "Store hours, Location, Pricing, Services"
Enable History: false (mỗi câu độc lập)
Primary Color: #2196F3 (Blue - professional)
```

---

## 🔐 Security Best Practices

### ⚠️ Development vs Production

**Development (Testing):**
```
✅ OK to include API key in URL
✅ Use for testing and demos
✅ Share with teammates
```

**Production (Live Website):**
```
❌ KHÔNG nên expose API key trong URL
✅ Set API key trong .env.local
✅ Hoặc dùng backend proxy
```

### 🛡️ Recommended Setup for Production

**Option A: Environment Variable**
```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

```html
<!-- Không cần apiKey trong URL -->
<iframe src="http://your-domain.com/chatwidget/chat?botName=Bot"></iframe>
```

**Option B: Backend Proxy (Best for security)**
See `EMBEDDING_GUIDE.md` for detailed implementation.

---

## 📱 Responsive Design

Widget tự động responsive:

| Device | Behavior |
|--------|----------|
| **Desktop** | Fixed position, 400px width |
| **Tablet** | Fixed position, 380px width |
| **Mobile** | Full width, slide from bottom |

---

## 🎨 Customization Tips

### Change Widget Size

**iframe method:**
```html
<iframe 
  src="..."
  style="
    width: 500px;      /* Tăng width */
    height: 800px;     /* Tăng height */
  "
></iframe>
```

### Hide Until User Clicks

```html
<button onclick="document.getElementById('chatbot').style.display='block'">
  Open Chat
</button>

<iframe 
  id="chatbot"
  src="..."
  style="display: none;"
></iframe>
```

### Multiple Bots on Same Page

```html
<!-- Support Bot -->
<iframe src="...?botName=Support&position=bottom-right"></iframe>

<!-- Sales Bot -->
<iframe src="...?botName=Sales&position=bottom-left"></iframe>
```

---

## 🐛 Troubleshooting

### Bot không hiện?
- ✅ Check API key đã đúng chưa
- ✅ Kiểm tra URL có encode đúng không
- ✅ Xem console có lỗi không (F12)

### iframe bị block?
- ✅ Check CORS settings
- ✅ Verify domain whitelist
- ✅ Use same-origin if possible

### Colors không hiện đúng?
- ✅ Hex colors phải có # ở đầu
- ✅ URL encode: `#4F46E5` → `%234F46E5`
- ✅ Hoặc dùng tool để generate

---

## 📚 Related Documentation

- **QUICK_START.md** - Quick setup guide
- **CHATWIDGET_API.md** - Complete API reference
- **EMBEDDING_GUIDE.md** - Advanced embedding
- **FEATURES.md** - All features overview
- **CONTEXT_EXAMPLES.md** - Context awareness examples

---

## 🎉 Quick Start

**Cách nhanh nhất để bắt đầu:**

1. Chạy `npm run dev`
2. Mở `http://localhost:3000/embed-builder.html`
3. Config bot của bạn
4. Copy code và paste vào website
5. Done! 🚀

**Questions?** Check docs hoặc open an issue!

---

## 💡 Pro Tips

1. **Test locally first:** Dùng embed-builder.html để test config trước khi deploy
2. **Save your configs:** Bookmark URL với config để dùng lại
3. **Use presets:** Copy/paste configs từ examples trong doc
4. **Monitor usage:** Check Gemini API quota để tránh over limit
5. **Update regularly:** Keep chatbot và dependencies up to date

**Happy Embedding! 🎊**

