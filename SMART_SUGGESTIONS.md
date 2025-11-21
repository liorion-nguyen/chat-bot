# 💡 Smart Follow-up Suggestions Feature

## 📖 Overview

**Smart Suggestions** tự động đề xuất **2 câu hỏi tiếp theo** phù hợp sau mỗi câu trả lời của bot. Feature này giúp:
- ✅ Guide user trong conversation
- ✅ Gợi ý câu hỏi liên quan
- ✅ Tăng engagement
- ✅ Cải thiện UX

---

## 🎯 How It Works

### Flow:

```
1. User: "What is AI?"
   ↓
2. Bot: "AI is artificial intelligence..."
   ↓
3. System generates 2 suggestions:
   💡 "How does AI learn?"
   💡 "What are AI applications?"
   ↓
4. User clicks suggestion → Sends as new message
```

---

## ⚙️ Configuration

### Enable/Disable:

```typescript
<ChatWidget
  config={{
    enableSmartSuggestions: true, // ← Enable feature
    // ... other configs
  }}
/>
```

| Value | Description |
|-------|-------------|
| `true` | Enable smart suggestions (2 AI-generated questions after each response) |
| `false` | Disable (default) |

---

## 🎨 Visual Example

### After Bot Response:

```
┌──────────────────────────────────┐
│ [🤖] AI Assistant                │
│ AI is artificial intelligence... │
│                                  │
│ 💡 How does AI learn?           │  ← Clickable
│ 💡 What are AI applications?    │  ← Clickable
└──────────────────────────────────┘
```

### User Clicks Suggestion:

```
→ Suggestion sent as user message
→ Bot responds
→ New suggestions generated
```

---

## 🔧 Technical Implementation

### 1. API Endpoint: `/api/suggestions`

```typescript
POST /api/suggestions
{
  "userMessage": "What is AI?",
  "botResponse": "AI is artificial intelligence...",
  "apiKey": "optional_api_key",
  "model": "gemini-1.5-flash",
  "language": "auto"
}

Response:
{
  "suggestions": [
    "How does AI learn?",
    "What are AI applications?"
  ]
}
```

---

### 2. Generation Logic:

**Prompt sent to Gemini:**

```
Based on this conversation:
User: "What is AI?"
Assistant: "AI is artificial intelligence..."

Generate EXACTLY 2 natural follow-up questions that the user might want to ask next.
The questions should:
- Be relevant to the conversation context
- Help the user explore the topic further
- Be concise (max 10 words each)
- Be phrased as if the user is asking them

Return ONLY the 2 questions, one per line.
```

**AI Response:**

```
How does AI learn from data?
What are real-world AI applications?
```

---

### 3. Message Structure:

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[]; // ← New field!
}
```

---

### 4. UI Component:

```typescript
// ChatMessage.tsx
{hasSuggestions && !message.isStreaming && (
  <div className="mt-2 flex flex-col gap-2">
    {message.suggestions!.map((suggestion, index) => (
      <button
        onClick={() => onSuggestionClick?.(suggestion)}
        className="hover:scale-[1.02] transition-all"
      >
        💡 {suggestion}
      </button>
    ))}
  </div>
)}
```

---

## 🎯 Use Cases

### 1. Customer Support

```
User: "How do I reset my password?"
Bot: "Go to Settings → Security → Reset Password"
  💡 "What if I forgot my email?"
  💡 "How to enable 2FA?"
```

### 2. E-commerce

```
User: "Tell me about this product"
Bot: "This is a premium laptop with..."
  💡 "What's the warranty period?"
  💡 "Are there any discounts?"
```

### 3. Education

```
User: "Explain photosynthesis"
Bot: "Photosynthesis is the process where..."
  💡 "What role does chlorophyll play?"
  💡 "How do plants use sunlight?"
```

### 4. Sales

```
User: "What are your pricing plans?"
Bot: "We have 3 plans: Free, Pro, Enterprise..."
  💡 "What's included in Pro plan?"
  💡 "Can I get a custom quote?"
```

---

## 🎨 Styling & Customization

### Default Style:

```typescript
// Hover effect with primary color
<button
  style={{
    borderColor: primaryColor,
    backgroundColor: `${primaryColor}10`,
  }}
>
  💡 {suggestion}
</button>
```

### Customize Look:

**Option 1: Change icon**

```typescript
// Replace 💡 with your icon
<span className="text-xs opacity-60">🔍</span>
```

**Option 2: Different layout**

```typescript
// Horizontal layout
<div className="flex flex-row gap-2">
  {suggestions.map(...)}
</div>
```

**Option 3: Custom colors**

```typescript
// Match your brand
<button
  style={{
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6',
    color: '#1e40af',
  }}
>
  {suggestion}
</button>
```

---

## ⚡ Performance Considerations

### Non-Blocking:

```typescript
// Suggestions generated AFTER bot response
onComplete: async (fullResponse) => {
  // 1. Update message with response ✅
  updateMessage(assistantMessage.id, { content: fullResponse });
  
  // 2. Generate suggestions (non-blocking) ✅
  generateSuggestions(userMessage, fullResponse, messageId);
  // User can continue chatting immediately!
};
```

### Timing:

```
Bot Response: 2-3 seconds
   ↓
User sees response immediately ✅
   ↓
Suggestions: +1-2 seconds (background)
   ↓
Suggestions appear (subtle fade-in) ✅
```

### Error Handling:

```typescript
try {
  const suggestions = await generateSuggestions(...);
  updateMessage(messageId, { suggestions });
} catch (error) {
  // Silently fail - suggestions are not critical
  // Chat continues working normally
}
```

---

## 🌍 Multi-Language Support

Suggestions are generated in the **same language** as the conversation:

```typescript
// Vietnamese
User: "AI là gì?"
Bot: "AI là trí tuệ nhân tạo..."
  💡 "AI học như thế nào?"
  💡 "Ứng dụng AI là gì?"

// English
User: "What is AI?"
Bot: "AI is artificial intelligence..."
  💡 "How does AI work?"
  💡 "What are AI use cases?"
```

Language is auto-detected from config:

```typescript
config={{
  language: 'auto', // Auto-detect from conversation
  // or specify: 'vi', 'en', 'zh', etc.
}}
```

---

## 🐛 Troubleshooting

### Problem: Suggestions not showing

**Check:**
1. ✅ `enableSmartSuggestions: true` in config
2. ✅ API key is valid
3. ✅ Bot has finished responding (not streaming)
4. ✅ Network tab shows `/api/suggestions` call
5. ✅ No errors in console

---

### Problem: Suggestions in wrong language

**Solution:**

```typescript
config={{
  language: 'vi', // Force Vietnamese
  enableSmartSuggestions: true,
}}
```

---

### Problem: Suggestions take too long

**Reasons:**
- Gemini API latency (normal)
- Network issues

**Solutions:**
- Use faster model: `gemini-1.5-flash` (default)
- Show loading indicator (optional)
- Reduce `maxOutputTokens` in API

---

### Problem: Suggestions not relevant

**Improve quality:**

1. **Better conversation context:**
   ```typescript
   enableHistory: true, // Provides more context
   ```

2. **Adjust prompt** in `app/api/suggestions/route.ts`:
   ```typescript
   const suggestionPrompt = `
     ...
     The questions should:
     - Be highly specific to the topic
     - Be actionable
     - Lead to deeper understanding
   `;
   ```

3. **Use higher temperature:**
   ```typescript
   temperature: 0.9, // More creative
   ```

---

## 📊 Analytics & Tracking

### Track Suggestion Usage:

```typescript
onSuggestionClick={(suggestion) => {
  // Track analytics
  analytics.track('suggestion_clicked', {
    suggestion,
    messageId,
    conversationId,
  });
  
  // Send as message
  handleSendMessage(suggestion);
}}
```

### Metrics to Track:

- Click-through rate on suggestions
- Most clicked suggestions
- Suggestions that lead to longer conversations
- User satisfaction after using suggestions

---

## 🔮 Advanced Features

### 1. Contextual Suggestions:

```typescript
// Generate different suggestions based on user type
const suggestions = await generateSuggestions({
  userMessage,
  botResponse,
  userContext: {
    isPremium: user.isPremium,
    industry: user.industry,
    previousTopics: user.recentTopics,
  },
});
```

---

### 2. Personalized Suggestions:

```typescript
// Learn from user behavior
const suggestions = await generateSuggestions({
  ...params,
  userPreferences: {
    preferredTopics: ['pricing', 'features'],
    averageQuestionLength: 8, // words
  },
});
```

---

### 3. A/B Testing:

```typescript
// Test different suggestion strategies
const strategy = user.id % 2 === 0 ? 'exploratory' : 'focused';

config={{
  enableSmartSuggestions: true,
  suggestionStrategy: strategy,
}}
```

---

## 📈 Benefits

### For Users:

- ✅ Don't have to think of next question
- ✅ Discover relevant information faster
- ✅ Natural conversation flow
- ✅ Learn about available topics

### For Business:

- ✅ Higher engagement rates
- ✅ Longer conversation sessions
- ✅ Better product discovery
- ✅ Reduced bounce rate
- ✅ More qualified leads

---

## 🎉 Example Implementation

### Complete Setup:

```typescript
import { ChatWidget } from '@/components/ChatWidget';

export default function Page() {
  return (
    <ChatWidget
      config={{
        botName: "AI Assistant",
        systemPrompt: "You are a helpful assistant.",
        geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        
        // Enable smart suggestions ✅
        enableSmartSuggestions: true,
        
        // Better context for suggestions
        enableHistory: true,
        maxHistoryMessages: 10,
        
        // Language
        language: "auto",
        
        // Theme
        theme: {
          primaryColor: "#4F46E5",
          // ...
        },
      }}
    />
  );
}
```

---

## 📚 Related Files

- `app/api/suggestions/route.ts` - API endpoint
- `components/ChatWidget/ChatMessage.tsx` - UI display
- `components/ChatWidget/ChatWidget.tsx` - Logic
- `types/chat.types.ts` - Type definitions
- `types/config.types.ts` - Config options

---

## 🎯 Summary

| Feature | Description |
|---------|-------------|
| 💡 **Smart Suggestions** | 2 AI-generated follow-up questions |
| 🎯 **Contextual** | Based on current conversation |
| 🌍 **Multi-language** | Matches conversation language |
| ⚡ **Non-blocking** | Doesn't slow down chat |
| 🎨 **Customizable** | Styling matches your theme |
| 📊 **Trackable** | Analytics-ready |
| 🔧 **Configurable** | Easy to enable/disable |

**Make your chatbot conversations more engaging!** 💡✨🚀

---

**Try it now:**

```typescript
enableSmartSuggestions: true
```

