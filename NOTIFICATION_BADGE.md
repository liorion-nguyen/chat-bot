# 🔔 Notification Badge Feature

## 📖 Tổng quan

Icon chatbot giờ có **notification badge** tự động! Khi có tin nhắn mới từ bot mà chat đang đóng, badge sẽ hiện để thu hút sự chú ý của user.

---

## ✨ Features

### 1. **Unread Count Badge**
- Badge đỏ với số lượng tin nhắn chưa đọc
- Hiển thị "9+" nếu có hơn 9 tin nhắn
- Animation bounce để thu hút attention

### 2. **Pulsing Ring**
- Vòng tròn pulse màu đỏ xung quanh badge
- Animation ping để highlight notification

### 3. **Bell Icon Indicator**
- Icon chuông nhỏ màu vàng ở góc
- Subtle indicator cho notification

### 4. **Auto Clear**
- Badge tự động clear khi user mở chat
- Reset về 0 khi user click vào icon

---

## 🎯 How It Works

### User Journey:

```
1. User gửi tin nhắn: "Hello"
   → Icon: Bình thường (không có badge)

2. Chat đang đóng, Bot trả lời: "Hi! How can I help?"
   → Icon: ⚠️ Badge xuất hiện! (1 tin nhắn chưa đọc)

3. Bot gửi thêm tin nhắn (chat vẫn đóng)
   → Icon: ⚠️ Badge tăng lên (2, 3, 4... tin nhắn)

4. User click vào icon để mở chat
   → Icon: Badge biến mất! (đã đọc)
```

---

## 🎨 Visual States

### State 1: No Unread Messages (Default)
```
┌─────────┐
│   💬   │  ← Normal icon
│         │
└─────────┘
```

### State 2: Has Unread Messages (Chat Closed)
```
┌─────────┐ 🔴 3
│   💬   │  ← Icon với badge "3"
│   🔔   │  ← Bell indicator
└─────────┘
  (pulse ring animation)
```

### State 3: Chat Open (Badge Hidden)
```
┌─────────┐
│    ✕   │  ← Close icon (no badge)
│         │
└─────────┘
```

---

## 🔧 Technical Implementation

### ChatIcon Component

```typescript
interface ChatIconProps {
  isOpen: boolean;
  hasUnreadMessages: boolean;  // ← NEW!
  unreadCount: number;          // ← NEW!
}

// Badge only shows when:
// 1. Chat is closed (!isOpen)
// 2. Has unread messages (hasUnreadMessages)
```

### ChatWidget Component

```typescript
// Track unread count
const [unreadCount, setUnreadCount] = useState(0);

// Increment when bot sends message AND chat is closed
onComplete: (fullResponse) => {
  if (!isOpen) {
    setUnreadCount(prev => prev + 1);
  }
}

// Clear when chat opens
const handleToggleChat = () => {
  setIsOpen(!isOpen);
  if (!isOpen) {
    setUnreadCount(0);  // Reset badge
  }
};
```

---

## 🎭 Badge Styles

### 1. Red Badge with Count
```typescript
<div className="... bg-red-500 animate-bounce">
  {unreadCount > 9 ? '9+' : unreadCount}
</div>
```

### 2. Pulsing Ring
```typescript
<span className="... animate-ping bg-red-400" />
```

### 3. Bell Icon
```typescript
<Bell className="... text-yellow-300 animate-pulse" fill="currentColor" />
```

---

## 🎨 Customization Ideas

### Change Badge Color

Modify in `ChatIcon.tsx`:

```typescript
// Red (default)
className="bg-red-500"

// Blue
className="bg-blue-500"

// Green
className="bg-green-500"

// Match primary color
style={{ backgroundColor: primaryColor }}
```

### Change Badge Position

```typescript
// Top-right (default)
className="-top-1 -right-1"

// Top-left
className="-top-1 -left-1"

// Bottom-right
className="-bottom-1 -right-1"
```

### Disable Bell Icon

Remove this section in `ChatIcon.tsx`:

```typescript
{/* Bell icon indicator (alternative style) */}
{!isOpen && hasUnreadMessages && (
  <div className="absolute top-0 right-0">
    <Bell className="..." />
  </div>
)}
```

### Custom Badge Style

```typescript
// Minimal style (just dot)
<div className="h-3 w-3 rounded-full bg-red-500" />

// Larger badge
<div className="h-6 w-6 ... text-xs">
  {unreadCount}
</div>

// With shadow
<div className="... shadow-2xl ring-2 ring-white">
  {unreadCount}
</div>
```

---

## 🎯 Use Cases

### 1. Customer Support

```
User đang browse trang khác
→ Bot gửi: "Có câu hỏi nào không?"
→ Badge hiện: User thấy notification
→ User quay lại và mở chat
```

### 2. Proactive Messages

```
Bot tự động gửi offer: "Sale 50% hôm nay!"
→ Badge hiện với "1"
→ Thu hút user attention
```

### 3. Multi-turn Conversation

```
User hỏi: "Giá sản phẩm?"
User minimize chat
Bot trả lời dài → Badge: "1"
Bot gửi thêm: "Cần thêm info?" → Badge: "2"
User mở lại → Badge clear
```

---

## 💡 Behavior Details

### When Badge Increments:

✅ Bot sends message  
✅ Chat is closed  
✅ Message is complete (not streaming)

### When Badge Clears:

✅ User opens chat  
✅ User clicks chat icon

### When Badge Does NOT Show:

❌ Chat is already open  
❌ No new messages from bot  
❌ User just sent a message

---

## 🐛 Edge Cases Handled

### Case 1: User sends message, then closes chat immediately
```
→ Badge does NOT show
→ Only shows when BOT responds
```

### Case 2: Multiple bot messages while closed
```
Message 1 → Badge: "1"
Message 2 → Badge: "2"
Message 3 → Badge: "3"
```

### Case 3: User opens and closes quickly
```
Open → Badge clears to "0"
Close → Badge stays "0" until new bot message
```

### Case 4: More than 9 messages
```
→ Badge shows "9+"
→ Prevents badge from being too large
```

---

## 🎨 Animation Details

### 1. Bounce Animation
```css
animate-bounce
/* Badge gently bounces up and down */
```

### 2. Ping Animation
```css
animate-ping
/* Pulsing ring expands outward */
```

### 3. Pulse Animation (Bell)
```css
animate-pulse
/* Bell icon fades in/out */
```

---

## 📊 Visual Comparison

### Before (No Notification Feature):
```
User không biết bot đã trả lời
→ Có thể bỏ lỡ tin nhắn quan trọng
→ Low engagement
```

### After (With Notification Badge):
```
User thấy badge đỏ với số "1"
→ Biết bot đã trả lời
→ Click để mở chat
→ Higher engagement! 📈
```

---

## 🔮 Future Enhancements

### Possible Additions:

1. **Sound Notification**
```typescript
// Play sound when badge appears
const notificationSound = new Audio('/notification.mp3');
notificationSound.play();
```

2. **Browser Notification**
```typescript
// Desktop notification
if (Notification.permission === 'granted') {
  new Notification('New message from bot!');
}
```

3. **Vibration (Mobile)**
```typescript
// Mobile vibration
if (navigator.vibrate) {
  navigator.vibrate(200);
}
```

4. **Custom Badge Colors per Theme**
```typescript
badgeColor: config.theme.badgeColor || '#EF4444'
```

5. **Different Badge Styles**
```typescript
badgeStyle: 'dot' | 'count' | 'pulse' | 'minimal'
```

---

## 🎉 Summary

✅ **Auto notification** when bot sends message  
✅ **Visual indicator** with count badge  
✅ **Multiple animations** (bounce, ping, pulse)  
✅ **Auto clear** when chat opens  
✅ **Handles edge cases** properly  
✅ **No configuration needed** - works automatically!  

**User sẽ không bao giờ bỏ lỡ tin nhắn từ bot nữa! 🔔✨**

---

## 📚 Related Files

- `components/ChatWidget/ChatIcon.tsx` - Badge rendering
- `components/ChatWidget/ChatWidget.tsx` - Badge logic
- `FEATURES.md` - All features overview

**The notification badge makes your chatbot more engaging and ensures users never miss important messages!** 🎯

