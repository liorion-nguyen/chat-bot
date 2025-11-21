# 🚀 Quick Start - Sử dụng ChatBot ngay lập tức!

## Cách 1: Truy cập trực tiếp (Đơn giản nhất)

### Bước 1: Lấy API Key
1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập và tạo API key
3. Copy API key của bạn

### Bước 2: Chạy server
```bash
npm run dev
```

### Bước 3: Mở trình duyệt

**URL cơ bản:**
```
http://localhost:3000/chatwidget/chat?botName=AI Bot&apiKey=YOUR_API_KEY
```

**Thay `YOUR_API_KEY` bằng key của bạn!**

---

## 📝 Ví dụ URL đầy đủ

### Bot Hỗ Trợ Khách Hàng (Tiếng Việt)
```
http://localhost:3000/chatwidget/chat?botName=Trợ Lý Ảo&welcomeMessage=Xin chào! Tôi có thể giúp gì cho bạn?&systemPrompt=Bạn là trợ lý ảo thân thiện, trả lời bằng tiếng Việt&suggestions=Xin chào,Giới thiệu sản phẩm,Chính sách đổi trả,Liên hệ hỗ trợ&primaryColor=%230EA5E9&apiKey=YOUR_KEY
```

### Bot Giáo Dục
```
http://localhost:3000/chatwidget/chat?botName=Thầy Giáo AI&welcomeMessage=Chào em! Thầy có thể giúp em học gì hôm nay?&systemPrompt=Bạn là giáo viên dạy toán và khoa học, giải thích dễ hiểu&suggestions=Giải toán,Giải thích khái niệm,Bài tập,Câu hỏi khác&primaryColor=%2310B981&apiKey=YOUR_KEY
```

### Bot Bán Hàng
```
http://localhost:3000/chatwidget/chat?botName=Tư Vấn Bán Hàng&welcomeMessage=Xin chào! Hãy để tôi giúp bạn tìm sản phẩm phù hợp&systemPrompt=Bạn là nhân viên tư vấn bán hàng chuyên nghiệp&suggestions=Xem sản phẩm,So sánh giá,Ưu đãi hiện tại,Tư vấn mua hàng&primaryColor=%23F59E0B&apiKey=YOUR_KEY
```

---

## 🎨 Tùy chỉnh màu sắc

### Theme Xanh Lá (Green)
```
?primaryColor=%2310B981&userMessageBg=%2310B981
```

### Theme Tím (Purple)
```
?primaryColor=%238B5CF6&userMessageBg=%238B5CF6
```

### Theme Đỏ (Red)
```
?primaryColor=%23EF4444&userMessageBg=%23EF4444
```

### Theme Cam (Orange)
```
?primaryColor=%23F97316&userMessageBg=%23F97316
```

---

## 📍 Thay đổi vị trí Widget

```
?position=bottom-right   (góc phải dưới - mặc định)
?position=bottom-left    (góc trái dưới)
?position=top-right      (góc phải trên)
?position=top-left       (góc trái trên)
```

---

## 💡 Gợi ý tùy chỉnh

Thêm nhiều gợi ý (phân cách bằng dấu phẩy):

```
?suggestions=Xin chào,Giúp tôi,Sản phẩm nào tốt,Giá cả,Liên hệ
```

---

## 🔗 Nhúng vào Website

### HTML thuần (Static Website)
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <!-- ChatBot Widget -->
    <iframe 
        src="http://localhost:3000/chatwidget/chat?botName=Support&apiKey=YOUR_KEY"
        style="position: fixed; bottom: 0; right: 0; width: 450px; height: 700px; border: none; z-index: 9999;"
    ></iframe>
</body>
</html>
```

### WordPress
```html
<!-- Thêm vào footer.php hoặc sử dụng plugin "Insert Headers and Footers" -->
<iframe 
    src="http://your-domain.com/chatwidget/chat?botName=Support&apiKey=YOUR_KEY"
    style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 99999;"
></iframe>
```

### Shopify
```liquid
<!-- Thêm vào theme.liquid trước </body> -->
<iframe 
    src="http://your-domain.com/chatwidget/chat?botName=Sales&systemPrompt=You are a helpful sales assistant for our store&apiKey=YOUR_KEY"
    style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 99999;"
></iframe>
```

---

## 🛠️ Tất cả Query Parameters

| Parameter | Ví dụ | Mô tả |
|-----------|-------|-------|
| `botName` | `AI Assistant` | Tên bot |
| `welcomeMessage` | `Xin chào!` | Tin nhắn chào mừng |
| `systemPrompt` | `You are helpful...` | Hướng dẫn cho AI |
| `model` | `gemini-1.5-flash` | Model AI (xem bên dưới) |
| `suggestions` | `Hi,Help,More` | Gợi ý (phân cách dấu phẩy) |
| `primaryColor` | `%234F46E5` | Màu chính (hex có encode) |
| `userMessageBg` | `%234F46E5` | Màu tin nhắn user |
| `botMessageBg` | `%23F3F4F6` | Màu tin nhắn bot |
| `position` | `bottom-right` | Vị trí widget |
| `placeholder` | `Type message...` | Placeholder input |
| `apiKey` | `AIza...` | Gemini API Key |

### 🤖 Available Models

| Model | Speed | Quality | Cost | Use Case |
|-------|-------|---------|------|----------|
| `gemini-1.5-flash` | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | 💰 Low | Default, general chat |
| `gemini-1.5-pro` | ⚡⚡ Medium | ⭐⭐⭐⭐⭐ Excellent | 💰💰 Medium | Complex tasks, detailed responses |

**Mặc định:** `gemini-1.5-flash` (nhanh và miễn phí quota cao)

**Để thay đổi model:**
```
?model=gemini-1.5-pro
```

---

## ⚙️ Cấu hình môi trường (Recommended)

Thay vì truyền `apiKey` trong URL, tạo file `.env.local`:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Sau đó URL chỉ cần:
```
http://localhost:3000/chatwidget/chat?botName=AI Bot
```

---

## 📱 Responsive

Widget tự động điều chỉnh:
- Mobile: Full width, slide from bottom
- Tablet: 400px width
- Desktop: Fixed position

---

## 🎯 Use Cases

### 1. Customer Support
```
?botName=Support Team&systemPrompt=You are a customer support agent. Help with orders and products
```

### 2. Lead Generation
```
?botName=Sales Bot&systemPrompt=You are a sales assistant. Qualify leads and collect contact info
```

### 3. FAQ Bot
```
?botName=FAQ Bot&systemPrompt=Answer frequently asked questions about our company and services
```

### 4. Appointment Booking
```
?botName=Booking Assistant&systemPrompt=Help users book appointments. Collect name, date, and time preferences
```

---

## 🐛 Troubleshooting

### Widget không hiện?
- Kiểm tra API key đã đúng chưa
- Kiểm tra console có lỗi không (F12)
- Đảm bảo đã chạy `npm run dev`

### Bot không trả lời?
- Kiểm tra internet connection
- Verify API key tại Google AI Studio
- Kiểm tra console log

### Màu sắc không đúng?
- Màu hex phải được URL encode: `#4F46E5` → `%234F46E5`
- Hoặc dùng color names: `red`, `blue`, `green`

---

## 📚 Tài liệu đầy đủ

- **CHATWIDGET_API.md** - Chi tiết API và parameters
- **SETUP_GUIDE.md** - Cài đặt và cấu hình
- **EMBEDDING_GUIDE.md** - Hướng dẫn nhúng chi tiết
- **README.md** - Tổng quan dự án

---

## 💪 Ready to Go!

Bây giờ bạn đã có thể:
1. ✅ Sử dụng chatbot qua URL
2. ✅ Nhúng vào website bất kỳ
3. ✅ Tùy chỉnh theme và text
4. ✅ Deploy lên production

**Chúc bạn thành công! 🎉**

