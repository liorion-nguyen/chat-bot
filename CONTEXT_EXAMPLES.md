# 🧠 Conversation Context Examples

## Ví dụ thực tế về Context Awareness

### ✅ Example 1: Customer Support với History

**Config:**
```typescript
{
  enableHistory: true,
  maxHistoryMessages: 20,
  systemPrompt: 'You are a customer support agent for an e-commerce store.'
}
```

**Conversation:**
```
User: "Tôi muốn mua laptop"
Bot: "Chào bạn! Chúng tôi có nhiều dòng laptop từ gaming đến văn phòng. 
      Bạn dùng laptop cho mục đích gì?"

User: "Gaming"
Bot: "Tuyệt! Laptop gaming của chúng tôi có GPU mạnh mẽ. 
      Budget của bạn khoảng bao nhiêu?"

User: "Khoảng 30 triệu"
Bot: "Với budget 30 triệu, tôi recommend ASUS ROG Strix G15 
      (RTX 3060, Ryzen 7) hoặc MSI Katana GF66..."

User: "Cái đầu tiên có màu gì?"
Bot: "ASUS ROG Strix G15 có 2 màu: Eclipse Gray và Original Black."
     ^ Bot hiểu "cái đầu tiên" = ASUS ROG Strix G15
```

**Nếu disable history:**
```
User: "Cái đầu tiên có màu gì?"
Bot: "Xin lỗi, bạn đang hỏi về sản phẩm nào?"
     ^ Bot không biết context
```

---

### ✅ Example 2: Educational Tutor

**Config:**
```typescript
{
  enableHistory: true,
  maxHistoryMessages: 30,
  systemPrompt: 'You are a patient math tutor. Build on previous examples.',
  model: 'gemini-1.5-pro'
}
```

**Conversation:**
```
User: "Giải thích phương trình bậc 2 cho em"
Bot: "Phương trình bậc 2 có dạng ax² + bx + c = 0
      Ví dụ: x² - 5x + 6 = 0"

User: "Giải ví dụ đó"
Bot: "Với x² - 5x + 6 = 0:
      - a = 1, b = -5, c = 6
      - Δ = b² - 4ac = 25 - 24 = 1
      - x = (5 ± 1)/2
      - x₁ = 3, x₂ = 2"

User: "Nếu c = 8 thì sao?"
Bot: "Nếu thay c = 8, phương trình trở thành x² - 5x + 8 = 0
      - Δ = 25 - 32 = -7 < 0
      - Phương trình vô nghiệm!"
      ^ Bot nhớ phương trình gốc và chỉ thay c
```

---

### ✅ Example 3: Travel Planning

**Config:**
```typescript
{
  enableHistory: true,
  maxHistoryMessages: 25,
  systemPrompt: 'You are a travel advisor. Help plan trips step by step.'
}
```

**Conversation:**
```
User: "Tôi muốn đi du lịch Nhật tháng 3"
Bot: "Tháng 3 là mùa hoa anh đào! Bạn muốn đi mấy ngày?"

User: "7 ngày"
Bot: "7 ngày thì recommend:
      - Tokyo (3 ngày)
      - Kyoto (2 ngày)  
      - Osaka (2 ngày)"

User: "Chỗ nào có nhiều chùa?"
Bot: "Kyoto có hơn 1600 ngôi chùa! Nên đi:
      - Kinkaku-ji (Chùa Vàng)
      - Fushimi Inari
      - Kiyomizu-dera"

User: "Vé máy bay giá bao nhiêu?"
Bot: "Vé khứ hồi Hà Nội - Tokyo tháng 3 khoảng 12-15 triệu VNĐ"
     ^ Bot nhớ điểm đến (Nhật/Tokyo) và thời gian (tháng 3)
```

---

### ❌ Example 4: FAQ Bot KHÔNG nên dùng history

**Config:**
```typescript
{
  enableHistory: false,  // Mỗi câu độc lập
  systemPrompt: 'Answer questions briefly about our store hours and policies.'
}
```

**Conversation:**
```
User: "Mấy giờ mở cửa?"
Bot: "Chúng tôi mở cửa 8:00 - 22:00 hàng ngày."

User: "Có ship không?"
Bot: "Có, chúng tôi ship toàn quốc."

User: "Giá bao nhiêu?"
Bot: "Phí ship 30k nội thành, 50k ngoại thành."
```

**Tại sao không dùng history?**
- Mỗi câu hỏi độc lập
- Không cần context
- Tiết kiệm tokens
- Nhanh hơn

---

### ✅ Example 5: Troubleshooting Assistant

**Config:**
```typescript
{
  enableHistory: true,
  maxHistoryMessages: 15,
  systemPrompt: 'You are a tech support specialist. Debug issues step by step.'
}
```

**Conversation:**
```
User: "Máy tính không vào được Windows"
Bot: "Để tôi giúp bạn. Màn hình hiện gì?"

User: "Màn hình đen, không có gì"
Bot: "Bạn nghe thấy tiếng beep không?"

User: "Có, beep 3 tiếng"
Bot: "3 tiếng beep = lỗi RAM. Hãy thử:
      1. Tắt máy, rút điện
      2. Mở case, rút RAM
      3. Lau chân RAM bằng tẩy
      4. Lắp lại và thử"

User: "Đã làm rồi nhưng vẫn beep"
Bot: "Vậy thử từng thanh RAM một. Nếu vẫn beep với tất cả 
      thanh thì có thể slot RAM trên mainboard bị lỗi."
      ^ Bot nhớ toàn bộ quá trình debug
```

---

## 🎯 Best Practices

### ✅ Khi NÊN dùng History:

1. **Multi-turn conversations** (nhiều lượt hội thoại)
   ```
   User: "Giới thiệu iPhone 15"
   Bot: [explains...]
   User: "So với Samsung S24 thì sao?"  <- cần context
   ```

2. **Progressive assistance** (hỗ trợ từng bước)
   ```
   Troubleshooting, teaching, planning...
   ```

3. **Personalized recommendations** (gợi ý cá nhân hóa)
   ```
   User: "Tôi thích phim hành động"
   Bot: [recommends action movies]
   User: "Có gì mới không?" <- nhớ preference
   ```

### ❌ Khi KHÔNG NÊN dùng History:

1. **Independent queries** (câu hỏi độc lập)
   ```
   FAQ bots, command bots, status checkers
   ```

2. **Privacy-sensitive** (bảo mật cao)
   ```
   Medical info, financial data, personal records
   ```

3. **High-volume / cost-sensitive** (traffic cao / tiết kiệm chi phí)
   ```
   Simple bots with millions of users
   ```

---

## ⚙️ Tuning History Settings

### Conversation Length vs Token Cost

| History Messages | Tokens per Request | Best For |
|-----------------|-------------------|----------|
| 0 (disabled) | ~100 | FAQ, commands |
| 5 | ~500 | Quick support |
| 10 | ~1,000 | Standard chat |
| 20 | ~2,000 | Detailed support |
| 50 | ~5,000 | Tutoring, learning |

**Formula:**
```
Average tokens = (avgMessageLength × 2) × historyMessages
```

### Recommended Settings by Use Case

```typescript
// Customer Support
{ enableHistory: true, maxHistoryMessages: 20 }

// Sales Assistant  
{ enableHistory: true, maxHistoryMessages: 15 }

// Technical Support
{ enableHistory: true, maxHistoryMessages: 25 }

// Educational Tutor
{ enableHistory: true, maxHistoryMessages: 50 }

// FAQ Bot
{ enableHistory: false }

// Command Bot
{ enableHistory: false }
```

---

## 🔬 Testing Context Awareness

### Test Scenario 1: Pronouns

```
User: "Tell me about Paris"
Bot: "Paris is the capital of France..."

User: "What's the population there?"
✅ With history: "Paris has about 2.1 million people..."
❌ Without history: "Where are you asking about?"
```

### Test Scenario 2: Follow-up Questions

```
User: "Compare iPhone 15 and Samsung S24"
Bot: [comparison table]

User: "Which has better camera?"
✅ With history: "Between iPhone 15 and Samsung S24, the S24 has..."
❌ Without history: "Which phones are you comparing?"
```

### Test Scenario 3: Progressive Details

```
User: "Book a table"
Bot: "How many people?"
User: "4"
Bot: "What date?"
User: "Tomorrow"
Bot: "What time?"
User: "7pm"
✅ With history: Remembers 4 people, tomorrow, 7pm
❌ Without history: Can't remember previous answers
```

---

## 💻 Implementation Example

```typescript
// Component with configurable history
<ChatWidget 
  config={{
    botName: 'Support Bot',
    
    // Enable context awareness
    enableHistory: true,
    maxHistoryMessages: 20,
    
    systemPrompt: `You are a helpful assistant. 
    Use previous messages to provide contextual responses.`,
    
    // ... other config
  }}
/>
```

**URL version:**
```
/chatwidget/chat?
  botName=Support&
  enableHistory=true&
  maxHistoryMessages=20&
  apiKey=YOUR_KEY
```

---

## 📊 Performance Impact

### With History (enableHistory: true)

**Pros:**
- ✅ Better context understanding
- ✅ Natural conversations
- ✅ Smarter responses

**Cons:**
- ⚠️ Higher token usage (more cost)
- ⚠️ Slightly slower API calls
- ⚠️ More data sent

### Without History (enableHistory: false)

**Pros:**
- ✅ Lower cost (fewer tokens)
- ✅ Faster responses
- ✅ Better privacy

**Cons:**
- ❌ No context awareness
- ❌ Less natural conversations
- ❌ Repeated questions needed

---

## 🎓 Summary

| Use Case | Enable History | Max Messages | Why |
|----------|---------------|--------------|-----|
| Customer Support | ✅ Yes | 20 | Track customer issue |
| Sales Chat | ✅ Yes | 15 | Remember preferences |
| Tech Support | ✅ Yes | 25 | Multi-step debugging |
| Learning Tutor | ✅ Yes | 50 | Build on lessons |
| FAQ Bot | ❌ No | 0 | Independent questions |
| Status Checker | ❌ No | 0 | One-off queries |
| Privacy-sensitive | ❌ No | 0 | Data protection |

**Default recommendation:** `enableHistory: true, maxHistoryMessages: 20`

Works great for most use cases! 🎉

