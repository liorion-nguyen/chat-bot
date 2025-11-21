# 🎯 Features Overview - ChatBot Widget

## ✅ Core Features

### 1. 💬 Conversation History & Context Awareness

**NEW!** Bot có thể nhớ và hiểu ngữ cảnh cuộc hội thoại.

#### Cách hoạt động:
- Bot nhớ tối đa 20 tin nhắn gần nhất (mặc định, có thể tùy chỉnh)
- Khi bạn hỏi câu hỏi tiếp theo, bot hiểu dựa trên những gì đã nói trước đó
- Ví dụ:
  ```
  User: "Paris là thủ đô của nước nào?"
  Bot: "Paris là thủ đô của Pháp."
  
  User: "Dân số của nó là bao nhiêu?" (bot hiểu "nó" = Paris)
  Bot: "Paris có dân số khoảng 2.1 triệu người..."
  ```

#### Configuration:

**Enable/Disable History:**
```typescript
const config = {
  enableHistory: true, // true = nhớ context, false = mỗi câu độc lập
  maxHistoryMessages: 20, // số tin nhắn tối đa được nhớ
  // ... other config
};
```

**Via URL:**
```
?enableHistory=true&maxHistoryMessages=20
```

**Disable history (single-message mode):**
```
?enableHistory=false
```

#### Use Cases:

**✅ Nên bật history cho:**
- Customer support (nhớ vấn đề khách hàng đang hỏi)
- Educational tutoring (theo dõi tiến trình học)
- Conversation chatbots (trò chuyện tự nhiên)
- Troubleshooting assistants (debug từng bước)

**❌ Nên tắt history cho:**
- Simple FAQ bots (mỗi câu hỏi độc lập)
- Command bots (mỗi lệnh riêng biệt)
- Privacy-sensitive applications (không lưu context)

---

### 2. ⚡ Real-time Streaming

Responses hiển thị từng chữ một, giống ChatGPT.

```typescript
// Automatic streaming
onStream: (chunk) => {
  console.log('New text chunk:', chunk);
}
```

---

### 3. 🎨 Fully Customizable Themes

Tùy chỉnh màu sắc, vị trí, text hoàn toàn.

```typescript
theme: {
  primaryColor: '#4F46E5',
  userMessageBg: '#4F46E5',
  botMessageBg: '#F3F4F6',
  position: 'bottom-right',
  // ... many more options
}
```

**Preset Themes:**

**Professional Blue:**
```
?primaryColor=%234F46E5&userMessageBg=%234F46E5
```

**Friendly Green:**
```
?primaryColor=%2310B981&userMessageBg=%2310B981
```

**Vibrant Purple:**
```
?primaryColor=%238B5CF6&userMessageBg=%238B5CF6
```

---

### 4. 🗨️ Suggestion Chips

Gợi ý câu hỏi cho người dùng click nhanh.

```typescript
suggestions: [
  'Xin chào!',
  'Giới thiệu sản phẩm',
  'Liên hệ hỗ trợ',
]
```

**Via URL:**
```
?suggestions=Hello,Help me,Contact us,More info
```

---

### 5. 📝 Markdown Support

Bot có thể trả lời với định dạng rich text:

- **Bold**, *italic*, `code`
- Lists (bullet points, numbered)
- Code blocks with syntax highlighting
- Links, tables, blockquotes
- Headings

**Example:**
```markdown
Here's how to use it:

1. **Step 1**: Install the package
2. **Step 2**: Configure
3. **Step 3**: Run

\```javascript
npm install chatbot
\```
```

---

### 6. 🔄 Multiple AI Models

Switch between different Gemini models:

| Model | Speed | Quality | Use For |
|-------|-------|---------|---------|
| `gemini-1.5-flash` | ⚡⚡⚡ | ⭐⭐⭐ | General chat, fast responses |
| `gemini-1.5-pro` | ⚡⚡ | ⭐⭐⭐⭐⭐ | Complex reasoning, detailed answers |
| `gemini-2.5-flash-lite` | ⚡⚡⚡⚡ | ⭐⭐ | Ultra-fast, simple tasks |

```
?model=gemini-1.5-pro
```

---

### 7. 🎯 System Prompts

Define bot's personality and behavior:

```typescript
systemPrompt: 'You are a friendly customer support agent. Always be helpful and professional.'
```

**Examples:**

**Sales Bot:**
```
systemPrompt: 'You are a sales assistant. Help customers find products and answer questions about pricing.'
```

**Tech Support:**
```
systemPrompt: 'You are a technical support engineer. Provide step-by-step solutions and be patient.'
```

**Teacher:**
```
systemPrompt: 'You are a patient teacher. Explain concepts clearly and provide examples.'
```

---

### 8. 📍 Flexible Positioning

Place widget anywhere:

```
position=bottom-right  (default)
position=bottom-left
position=top-right
position=top-left
```

---

### 9. 🌐 Easy Embedding

**Option 1: Direct URL**
```
http://your-domain.com/chatwidget/chat?botName=Bot&apiKey=KEY
```

**Option 2: iframe**
```html
<iframe src="..." style="..."></iframe>
```

**Option 3: React Component**
```tsx
<ChatWidget config={config} />
```

---

### 10. 📱 Responsive Design

Works on all devices:
- 📱 Mobile phones
- 💻 Tablets
- 🖥️ Desktop computers

---

## 🎛️ Advanced Features

### Context Management

Control how much context is sent:

```typescript
// Remember only last 10 messages
maxHistoryMessages: 10

// Remember more for complex conversations
maxHistoryMessages: 50

// No history (fastest, most private)
enableHistory: false
```

### Smart History Filtering

- Automatically excludes streaming/incomplete messages
- Only sends complete user-bot exchanges
- Optimizes API calls for cost efficiency

### Error Handling

Built-in error handling:
- Network failures
- API errors
- Rate limiting
- Invalid responses

```typescript
onError: (error) => {
  console.error('Chat error:', error);
  // Show user-friendly message
}
```

---

## 🔮 Coming Soon

Features in development:

- [ ] Conversation persistence (localStorage)
- [ ] Export chat history
- [ ] Voice input/output
- [ ] File attachments
- [ ] Multi-language auto-detection
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Bot avatar customization
- [ ] Custom CSS injection
- [ ] Webhook integrations

---

## 💡 Best Practices

### For Better Context Awareness:

1. **Enable history for conversational bots:**
   ```typescript
   enableHistory: true
   ```

2. **Adjust history size based on use case:**
   - Simple FAQ: `maxHistoryMessages: 5`
   - Support chat: `maxHistoryMessages: 20`
   - Learning tutor: `maxHistoryMessages: 50`

3. **Use clear system prompts:**
   ```typescript
   systemPrompt: 'You are helping with order tracking. Reference previous messages when relevant.'
   ```

### For Privacy & Performance:

1. **Disable history for sensitive data:**
   ```typescript
   enableHistory: false // No conversation stored
   ```

2. **Limit history for cost optimization:**
   ```typescript
   maxHistoryMessages: 10 // Fewer tokens sent
   ```

3. **Use appropriate models:**
   - High traffic: `gemini-1.5-flash` (fast, cheap)
   - Complex tasks: `gemini-1.5-pro` (better quality)

---

## 🎓 Example Configurations

### Customer Support Bot (with history)
```typescript
{
  botName: 'Support Team',
  enableHistory: true,
  maxHistoryMessages: 20,
  systemPrompt: 'You are a customer support agent. Help resolve issues step by step.',
  suggestions: ['Track order', 'Return policy', 'Contact human'],
}
```

### FAQ Bot (without history)
```typescript
{
  botName: 'FAQ Assistant',
  enableHistory: false,
  systemPrompt: 'Answer questions concisely based only on the current question.',
  suggestions: ['Hours', 'Location', 'Pricing', 'Services'],
}
```

### Learning Tutor (with long history)
```typescript
{
  botName: 'Math Tutor',
  enableHistory: true,
  maxHistoryMessages: 50, // Remember entire lesson
  systemPrompt: 'You are a patient math tutor. Build on previous examples.',
  model: 'gemini-1.5-pro', // Better for complex explanations
}
```

---

## 📊 Feature Comparison

| Feature | Free | What You Get |
|---------|------|--------------|
| Streaming | ✅ | Real-time responses |
| History | ✅ | Context awareness |
| Markdown | ✅ | Rich formatting |
| Custom themes | ✅ | Full branding |
| Multiple models | ✅ | Choose best fit |
| All positions | ✅ | Flexible placement |
| Suggestions | ✅ | Guided conversation |
| Mobile ready | ✅ | Works everywhere |

**100% Free & Open Source!** 🎉

---

## 📚 Related Docs

- **QUICK_START.md** - Get started in 5 minutes
- **CHATWIDGET_API.md** - Full API reference
- **SETUP_GUIDE.md** - Detailed installation
- **EMBEDDING_GUIDE.md** - Integration options

