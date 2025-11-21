# 🌍 Multi-Language Configuration Guide

## 📖 Tổng quan

ChatBot Widget giờ hỗ trợ cấu hình ngôn ngữ trả lời! Bot có thể trả lời bằng nhiều ngôn ngữ khác nhau tùy theo cấu hình.

---

## 🚀 Quick Start

### React/Next.js

```typescript
<ChatWidget 
  config={{
    language: 'vi',  // Bot sẽ trả lời bằng tiếng Việt
    // ... other config
  }}
/>
```

### URL Query Parameter

```
http://localhost:3000/chatwidget/chat?
  botName=Support Bot&
  language=vi&
  apiKey=YOUR_KEY
```

---

## 🌐 Supported Languages

| Language | Code | Example |
|----------|------|---------|
| **Auto-detect** | `auto` | Bot tự chọn ngôn ngữ phù hợp |
| **Tiếng Việt** | `vi` | Bot trả lời 100% tiếng Việt |
| **English** | `en` | Bot responds in English |
| **中文 (Chinese)** | `zh` | 机器人用中文回答 |
| **日本語 (Japanese)** | `ja` | ボットが日本語で回答 |
| **한국어 (Korean)** | `ko` | 봇이 한국어로 응답 |
| **Français (French)** | `fr` | Le bot répond en français |
| **Deutsch (German)** | `de` | Bot antwortet auf Deutsch |
| **Español (Spanish)** | `es` | Bot responde en español |

---

## 💡 How It Works

### Auto Mode (`language: 'auto'`)
- Bot tự động phát hiện ngôn ngữ của câu hỏi
- Trả lời bằng cùng ngôn ngữ với user
- Linh hoạt cho multilingual users

**Example:**
```
User: "Hello, how are you?"
Bot: "I'm doing great! How can I help you today?"

User: "Xin chào"
Bot: "Xin chào! Tôi có thể giúp gì cho bạn?"
```

### Forced Language Mode
- Bot **bắt buộc** trả lời bằng ngôn ngữ đã chọn
- Không quan tâm ngôn ngữ của user
- Đảm bảo consistency

**Example với `language: 'vi'`:**
```
User: "Hello"
Bot: "Xin chào! Tôi có thể giúp gì cho bạn?"

User: "What is your name?"
Bot: "Tên tôi là AI Assistant. Tôi có thể giúp gì cho bạn?"
```

---

## 🎯 Use Cases

### 1. Vietnamese Support Bot

```typescript
const config = {
  botName: 'Trợ Lý CSKH',
  language: 'vi',
  systemPrompt: 'Bạn là nhân viên CSKH thân thiện và chuyên nghiệp.',
  suggestions: [
    'Tra cứu đơn hàng',
    'Chính sách đổi trả',
    'Liên hệ hỗ trợ'
  ],
  welcomeMessage: 'Xin chào! Tôi có thể giúp gì cho bạn?',
};
```

### 2. International Customer Support

```typescript
const config = {
  botName: 'Global Support',
  language: 'auto',  // Auto-detect user language
  systemPrompt: 'You are a global customer support agent.',
  suggestions: [
    'Track order',
    'Shipping info',
    'Returns'
  ],
};
```

### 3. Japanese Tech Support

```typescript
const config = {
  botName: 'テクニカルサポート',
  language: 'ja',
  systemPrompt: 'あなたは技術サポートスタッフです。',
  suggestions: [
    'トラブルシューティング',
    '製品情報',
    'お問い合わせ'
  ],
  welcomeMessage: 'こんにちは！どのようにお手伝いできますか？',
};
```

### 4. Multilingual Education Platform

```typescript
// English version
const configEN = {
  language: 'en',
  botName: 'Study Assistant',
  systemPrompt: 'You are an educational tutor.',
};

// Vietnamese version
const configVI = {
  language: 'vi',
  botName: 'Trợ Lý Học Tập',
  systemPrompt: 'Bạn là gia sư giáo dục.',
};

// User can switch between languages
<button onClick={() => setLang('en')}>English</button>
<button onClick={() => setLang('vi')}>Tiếng Việt</button>
```

---

## 🔧 Implementation Examples

### React with Language Switcher

```typescript
import { useState } from 'react';
import { ChatWidget } from '@/components/ChatWidget';

export default function App() {
  const [language, setLanguage] = useState('auto');

  const config = {
    botName: 'AI Assistant',
    language: language,
    geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    // ... other config
  };

  return (
    <div>
      {/* Language Switcher */}
      <div className="language-switcher">
        <button onClick={() => setLanguage('auto')}>Auto</button>
        <button onClick={() => setLanguage('vi')}>Tiếng Việt</button>
        <button onClick={() => setLanguage('en')}>English</button>
        <button onClick={() => setLanguage('ja')}>日本語</button>
      </div>

      <ChatWidget config={config} />
    </div>
  );
}
```

### URL with Language Parameter

```html
<!-- Vietnamese Bot -->
<iframe src="http://localhost:3000/chatwidget/chat?language=vi&botName=Trợ Lý"></iframe>

<!-- English Bot -->
<iframe src="http://localhost:3000/chatwidget/chat?language=en&botName=Assistant"></iframe>

<!-- Auto-detect -->
<iframe src="http://localhost:3000/chatwidget/chat?language=auto&botName=Bot"></iframe>
```

### Vue.js with Language

```vue
<template>
  <div>
    <!-- Language Selector -->
    <select v-model="selectedLanguage">
      <option value="auto">Auto</option>
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>

    <!-- ChatBot -->
    <iframe :src="chatbotUrl"></iframe>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedLanguage = ref('auto');

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: 'AI Assistant',
    language: selectedLanguage.value,
    apiKey: 'YOUR_KEY',
  });
  return `http://localhost:3000/chatwidget/chat?${params}`;
});
</script>
```

---

## 🎨 Embedding Tool Support

Embedding tool đã được cập nhật với language selector!

### Cách sử dụng:

1. Mở `http://localhost:3000/embed-builder.html`
2. Tìm dropdown **"🌍 Ngôn ngữ trả lời"**
3. Chọn ngôn ngữ mong muốn:
   - Tự động (Auto)
   - Tiếng Việt (Vietnamese)
   - Tiếng Anh (English)
   - ... 9 ngôn ngữ khác
4. Copy generated code!

---

## 📊 Language Behavior

### With `language: 'auto'`

| User Input Language | Bot Response Language |
|---------------------|----------------------|
| English | English |
| Vietnamese | Vietnamese |
| Chinese | Chinese |
| Mixed | Detects primary language |

### With `language: 'vi'` (Forced)

| User Input Language | Bot Response Language |
|---------------------|----------------------|
| English | **Vietnamese** (forced) |
| Vietnamese | Vietnamese |
| Any language | **Vietnamese** (forced) |

---

## 💪 Best Practices

### 1. Match Language with Content

```typescript
// Vietnamese website
{
  language: 'vi',
  botName: 'Trợ Lý',
  welcomeMessage: 'Xin chào!',
  suggestions: ['Hỗ trợ', 'Liên hệ']
}

// English website
{
  language: 'en',
  botName: 'Assistant',
  welcomeMessage: 'Hello!',
  suggestions: ['Help', 'Contact']
}
```

### 2. Use Auto for Multilingual Sites

```typescript
// International e-commerce
{
  language: 'auto',  // Adapt to user
  systemPrompt: 'Help customers in their preferred language.',
}
```

### 3. Provide Language Switcher

```typescript
// Let users choose
<LanguageSelector onChange={setLanguage} />
<ChatWidget config={{ language }} />
```

### 4. Combine with System Prompt

```typescript
{
  language: 'vi',
  systemPrompt: `
    Bạn là trợ lý bán hàng chuyên nghiệp.
    Luôn lịch sự, nhiệt tình.
    Trả lời ngắn gọn, dễ hiểu.
  `
}
```

---

## 🔍 Technical Details

### How Language Enforcement Works

Language instruction is **prepended** to system prompt:

```typescript
// If language = 'vi'
const fullPrompt = `
  IMPORTANT: You MUST respond in Vietnamese (Tiếng Việt). 
  All your answers must be in Vietnamese language.
  
  ${userSystemPrompt}
`;
```

### Priority Order

1. **Language instruction** (highest priority)
2. **User system prompt**
3. **Conversation history**
4. **User message**

---

## 🌟 Advanced: Custom Language Instructions

You can modify language instructions in `types/config.types.ts`:

```typescript
export const languageInstructions: Record<string, string> = {
  'vi': 'IMPORTANT: You MUST respond in Vietnamese...',
  'en': 'IMPORTANT: You MUST respond in English...',
  // Add custom languages
  'tl': 'IMPORTANT: You MUST respond in Tagalog (Filipino)...',
  'th': 'IMPORTANT: You MUST respond in Thai...',
};
```

Then update type definition:

```typescript
language?: 'auto' | 'vi' | 'en' | 'zh' | ... | 'tl' | 'th';
```

---

## 🐛 Troubleshooting

### Bot not responding in correct language?

**Check:**
1. ✅ Language parameter được set đúng
2. ✅ System prompt không conflict với language instruction
3. ✅ API key valid và có quota

### Mixed language responses?

**Solution:**
- Dùng forced language mode thay vì `auto`
- Thêm language reminder vào system prompt:
  ```typescript
  systemPrompt: 'Remember: Always respond in Vietnamese'
  ```

### Language not enforced strongly enough?

**Solution:**
- Strengthen language instruction
- Add to both system prompt và welcome message
- Test with different prompts

---

## 📚 Related Documentation

- **FEATURES.md** - All features overview
- **CHATWIDGET_API.md** - Complete API reference
- **CONTEXT_EXAMPLES.md** - Context awareness examples
- **EMBEDDING_TOOL.md** - Embedding tool guide

---

## 🎉 Summary

✅ **9 ngôn ngữ được hỗ trợ**  
✅ **Auto-detect mode linh hoạt**  
✅ **Forced language mode đảm bảo consistency**  
✅ **Easy configuration via URL/React/Vue**  
✅ **Embedding tool integration**  

**Giờ chatbot của bạn có thể nói được nhiều thứ tiếng! 🌍✨**

