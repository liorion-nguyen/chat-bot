# Chatbot Widget - Dự án Nhúng ChatBot vào Website

## Tổng Quan Dự Án

Dự án xây dựng một widget chatbot có thể nhúng vào bất kỳ website nào thông qua iframe. Widget này tích hợp với Gemini AI để cung cấp khả năng trò chuyện thông minh với người dùng.

## ✅ Trạng Thái Dự Án: HOÀN THÀNH

Tất cả các tính năng chính đã được triển khai và sẵn sàng sử dụng!

## 🚀 Quick Start - Sử dụng ngay

**⚠️ BẢO MẬT:** Dự án giờ sử dụng **Server-Side API** mặc định để giấu API key!

### Setup Nhanh (5 phút):

1. **Cài đặt:**
   ```bash
   npm install
   ```

2. **Tạo `.env.local`:**
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Chạy:**
   ```bash
   npm run dev
   ```

4. **Test:** Mở `http://localhost:3000` và chat!

📖 **Chi tiết:** Xem `QUICKSTART.md` hoặc `SETUP_ENV.md`

---

### Cách 1: Truy cập trực tiếp qua URL

Bạn có thể sử dụng chatbot ngay lập tức bằng cách truy cập:

```
http://localhost:3000/chatwidget/chat?botName=AI Assistant
```

**Lưu ý:** Không cần `apiKey` parameter nữa! API key giờ được giấu an toàn trên server.

**Ví dụ đầy đủ:**

```
http://localhost:3000/chatwidget/chat?
  botName=Support Bot&
  welcomeMessage=Xin chào! Tôi có thể giúp gì cho bạn?&
  suggestions=Xin chào,Bạn có thể làm gì?,Giúp tôi&
  primaryColor=%234F46E5&
  position=bottom-right&
  language=vi&
  enableHistory=true
```

**🔒 Bảo mật:** API key KHÔNG cần truyền qua URL nữa! Nó được giữ an toàn trên server.

### Cách 2: Nhúng vào website khác (iframe)

```html
<iframe 
  src="http://your-domain.com/chatwidget/chat?botName=AI Bot"
  width="100%"
  height="100%"
  style="border: none; position: fixed; bottom: 0; right: 0; width: 450px; height: 700px; z-index: 9999;"
></iframe>
```

**🔒 Bảo mật:** Không cần `apiKey` parameter! API key được quản lý bởi server của bạn.

### Cách 3: Sử dụng trong React/Next.js

```tsx
import { ChatWidget } from '@/components/ChatWidget';

<ChatWidget config={{
  botName: 'AI Assistant',
  systemPrompt: 'You are a helpful assistant.',
  useServerApi: true, // ✅ Secure! (default)
  geminiApiKey: '', // Not needed with server API
  model: 'gemini-1.5-flash',
  enableHistory: true,
  language: 'auto',
}} />
```

**📖 Xem thêm:** 
- 🚀 `QUICKSTART.md` - Setup trong 5 phút
- 🔒 `SERVER_API_GUIDE.md` - Hướng dẫn Server API (BẢO MẬT!)
- ⚙️ `SETUP_ENV.md` - Cấu hình environment variables
- 📖 `CHATWIDGET_API.md` - Chi tiết về các tham số cấu hình
- 🌐 `EMBEDDING_GUIDE.md` - Hướng dẫn nhúng vào website
- 🎨 `FEATURES.md` - Tất cả tính năng

## Mô Tả Chức Năng

### 1. Giao Diện Widget
- **Icon ChatBot**: Một nút icon cố định (floating button) hiển thị ở góc màn hình
- **Chat Box**: Khi click vào icon, một hộp thoại chat sẽ xuất hiện
- **Responsive**: Widget phải hoạt động tốt trên mọi kích thước màn hình

### 2. Cấu Hình Iframe (Props/Parameters)
Widget nhận các thông số cấu hình khi được nhúng:

| Tham số | Kiểu dữ liệu | Mô tả |
|---------|--------------|-------|
| `botName` | string | Tên của chatbot hiển thị trong giao diện |
| `theme` | object/string | Cấu hình màu sắc, theme của chatbot |
| `suggestions` | string[] | Mảng các câu gợi ý hiển thị ban đầu |
| `systemPrompt` | string | Prompt hệ thống để định hướng chatbot |
| `useServerApi` | boolean | **true** = Server API (bảo mật), **false** = Client API |
| `geminiApiKey` | string | ⚠️ Chỉ dùng khi `useServerApi=false` (không khuyến nghị) |
| `enableHistory` | boolean | Bật/tắt conversation context |
| `language` | string | Ngôn ngữ trả lời: `auto`, `vi`, `en`, etc. |
| `botIconUrl` | string | URL avatar của bot trong chat messages |
| `enableSmartSuggestions` | boolean | **true** = Hiển thị 2 câu gợi ý sau mỗi câu trả lời (default: false) |

### 3. Tích Hợp Gemini AI
- **API Communication**: Gửi tin nhắn người dùng đến Gemini API
- **Streaming Response**: Nhận phản hồi dạng stream (hiển thị từng ký tự một)
- **Context Management**: Quản lý ngữ cảnh hội thoại

### 4. Hiển Thị Tin Nhắn
- **Markdown Support**: Hỗ trợ hiển thị tin nhắn dạng markdown
- **Formatting**: Hỗ trợ bold, italic, code blocks, lists, links, etc.
- **Real-time Rendering**: Render markdown trong khi streaming

## Danh Sách Công Việc Cần Làm

### Phase 1: Thiết Lập Dự Án & Cấu Trúc
- [x] **1.1**: Cài đặt và cấu hình dependencies
  - Next.js (đã có)
  - TypeScript (đã có)
  - Thư viện markdown renderer (react-markdown hoặc marked)
  - Gemini AI SDK (@google/generative-ai)
  - CSS framework cho styling (Tailwind đã có)

- [x] **1.2**: Thiết kế cấu trúc thư mục
  ```
  /components
    /ChatWidget
      - ChatIcon.tsx          (Icon floating button)
      - ChatBox.tsx           (Hộp chat chính)
      - ChatMessage.tsx       (Component tin nhắn)
      - ChatInput.tsx         (Input nhập tin nhắn)
      - SuggestionChips.tsx   (Các gợi ý ban đầu)
    /MarkdownRenderer
      - MessageMarkdown.tsx   (Render markdown)
  /hooks
    - useChat.ts              (Logic chat)
    - useGemini.ts            (Tích hợp Gemini)
  /types
    - chat.types.ts           (TypeScript types)
    - config.types.ts         (Config types)
  /utils
    - themeUtils.ts           (Xử lý theme)
    - streamParser.ts         (Xử lý stream)
  ```

### Phase 2: Xây Dựng UI Components

- [x] **2.1**: Tạo ChatIcon Component
  - Thiết kế icon chatbot (SVG hoặc sử dụng icon library)
  - Vị trí floating (bottom-right corner)
  - Animation khi hover
  - Toggle state (open/close)

- [x] **2.2**: Xây dựng ChatBox Component
  - Layout: Header (tên bot) + Messages Area + Input Area
  - Animation slide in/out
  - Có thể minimize/maximize
  - Close button
  - Apply theme colors

- [x] **2.3**: Tạo ChatMessage Component
  - Phân biệt tin nhắn của user và bot
  - Avatar cho từng tin nhắn
  - Timestamp
  - Tích hợp markdown rendering
  - Loading indicator cho tin nhắn đang stream

- [x] **2.4**: Xây dựng ChatInput Component
  - Textarea với auto-resize
  - Send button
  - Disable khi đang chờ response
  - Enter để gửi, Shift+Enter để xuống dòng
  - Character limit (optional)

- [x] **2.5**: Tạo SuggestionChips Component
  - Hiển thị danh sách suggestions
  - Click vào suggestion để tự động gửi
  - Ẩn sau khi gửi tin nhắn đầu tiên
  - Responsive layout cho nhiều suggestions

### Phase 3: Tích Hợp Gemini AI

- [x] **3.1**: Setup Gemini SDK
  - Cài đặt @google/generative-ai
  - Tạo service/hook để khởi tạo Gemini client
  - Xử lý API key từ props

- [x] **3.2**: Implement Chat Logic
  - Tạo useChat hook để quản lý:
    - Message history
    - Sending state
    - Error handling
  - Lưu trữ conversation context

- [x] **3.3**: Implement Streaming Response
  - Sử dụng Gemini streaming API
  - Parse stream chunks
  - Update UI real-time khi nhận chunks
  - Xử lý khi stream hoàn tất
  - Error handling cho network issues

- [x] **3.4**: Apply System Prompt
  - Gửi systemPrompt cùng với user message
  - Maintain context trong conversation
  - Reset context khi cần

### Phase 4: Markdown Rendering

- [x] **4.1**: Cài đặt Markdown Library
  - Chọn thư viện: react-markdown hoặc marked + DOMPurify
  - Cấu hình syntax highlighting cho code blocks (react-syntax-highlighter)

- [x] **4.2**: Tạo MessageMarkdown Component
  - Custom styling cho các markdown elements
  - Support code blocks với syntax highlighting
  - Support tables, lists, links
  - Sanitize HTML để bảo mật

- [x] **4.3**: Streaming + Markdown
  - Render markdown trong khi streaming
  - Xử lý incomplete markdown gracefully
  - Update render khi có thêm content

### Phase 5: Theme & Customization

- [x] **5.1**: Thiết kế Theme System
  - Define theme interface:
    ```typescript
    interface Theme {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      userMessageBg: string;
      botMessageBg: string;
      // ... more
    }
    ```

- [x] **5.2**: Apply Theme Dynamically
  - Sử dụng CSS variables hoặc styled-components
  - Parse theme từ props
  - Apply vào tất cả components
  - Hỗ trợ light/dark mode

- [x] **5.3**: Default Theme
  - Tạo theme mặc định đẹp mắt
  - Responsive và accessible

### Phase 6: Iframe Integration

- [x] **6.1**: Tạo Embed Page (Route: `/chatwidget/chat`)
  - Route riêng cho iframe (ví dụ: `/embed`)
  - Nhận params từ URL hoặc postMessage
  - Parse configuration

- [x] **6.2**: Client-Side Script (Query Parameters)
  - Tạo embed script để website khác có thể nhúng:
    ```html
    <script src="your-domain/embed.js"></script>
    <script>
      ChatWidget.init({
        botName: "My Bot",
        theme: {...},
        suggestions: [...],
        systemPrompt: "...",
        geminiApiKey: "..."
      });
    </script>
    ```

- [x] **6.3**: Communication Protocol (URL Query Params)
  - Sử dụng postMessage để truyền config từ parent window
  - Security: Validate origin
  - Handle resize events

### Phase 7: Testing & Optimization

- [ ] **7.1**: Functional Testing
  - Test tất cả user interactions
  - Test với nhiều configurations khác nhau
  - Test streaming behavior
  - Test error scenarios

- [ ] **7.2**: Performance Optimization
  - Lazy load components
  - Optimize re-renders
  - Minimize bundle size
  - Cache conversation history

- [ ] **7.3**: Browser Compatibility
  - Test trên Chrome, Firefox, Safari, Edge
  - Mobile browsers
  - Test iframe trong các website khác nhau

- [ ] **7.4**: Accessibility
  - Keyboard navigation
  - ARIA labels
  - Screen reader support
  - Focus management

### Phase 8: Documentation & Deployment

- [ ] **8.1**: Viết Documentation
  - Hướng dẫn sử dụng
  - API reference cho các config options
  - Examples
  - Troubleshooting guide

- [ ] **8.2**: Deployment
  - Setup production build
  - Deploy lên hosting (Vercel, Netlify, etc.)
  - CDN cho embed script
  - Setup analytics (optional)

- [ ] **8.3**: Example Website
  - Tạo demo website
  - Showcase các tính năng
  - Different configuration examples

## Tech Stack Đề Xuất

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **AI Integration**: Google Gemini AI (@google/generative-ai)
- **Markdown**: react-markdown + react-syntax-highlighter
- **State Management**: React Hooks (useState, useReducer, useContext)
- **HTTP Client**: Fetch API (built-in)

## Cấu Trúc Config Mẫu

```typescript
interface ChatWidgetConfig {
  botName: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };
  suggestions: string[];
  systemPrompt: string;
  geminiApiKey: string;
  placeholder?: string;
  welcomeMessage?: string;
}
```

## Example Usage

```html
<!-- Nhúng vào website -->
<iframe 
  src="https://your-chatbot.com/embed?config=base64EncodedConfig"
  width="400"
  height="600"
  style="position: fixed; bottom: 20px; right: 20px; border: none; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
></iframe>
```

## Lưu Ý Quan Trọng

1. **Security**: 
   - Không lưu API key ở client-side trong production
   - Nên tạo proxy server để handle Gemini API calls
   - Validate và sanitize user input

2. **Rate Limiting**: 
   - Implement rate limiting để tránh abuse
   - Handle quota exceeded errors

3. **Privacy**: 
   - Không lưu trữ conversations nếu không cần thiết
   - GDPR compliance nếu target EU users

4. **Performance**: 
   - Optimize bundle size cho iframe
   - Lazy load heavy components
   - Use React.memo where appropriate

## Timeline Ước Tính

- **Phase 1-2**: 2-3 ngày (Setup + UI Components)
- **Phase 3-4**: 2-3 ngày (Gemini Integration + Markdown)
- **Phase 5-6**: 1-2 ngày (Theme + Iframe)
- **Phase 7-8**: 2-3 ngày (Testing + Deployment)

**Tổng**: 7-11 ngày làm việc (có thể điều chỉnh tùy độ phức tạp)  # chat-bot
