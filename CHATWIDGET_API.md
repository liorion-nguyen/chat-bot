# ChatWidget API Documentation

## 📍 Widget Route

Access the chat widget at: `/chatwidget/chat`

The widget automatically displays when you navigate to this route with the appropriate query parameters.

## 🔧 Query Parameters

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `apiKey` | string | Gemini API Key (if not set in env) | `AIzaSy...` |

### Optional Parameters

#### Basic Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `botName` | string | `"AI Assistant"` | Name of the chatbot |
| `welcomeMessage` | string | `"Hi! How can I help you today?"` | Initial greeting message |
| `systemPrompt` | string | `"You are a helpful AI assistant..."` | System prompt for AI behavior |
| `placeholder` | string | `"Type your message..."` | Input field placeholder |
| `model` | string | `"gemini-1.5-flash"` | Gemini model to use (`gemini-1.5-flash` or `gemini-1.5-pro`) |
| `suggestions` | string | `"Hello!,How can you help me?,Tell me more"` | Comma-separated suggestions |
| `enableHistory` | boolean | `true` | Enable conversation context (bot remembers previous messages) |
| `maxHistoryMessages` | number | `20` | Maximum number of messages to include in context |

#### Theme Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `primaryColor` | string | `#4F46E5` | Primary color (buttons, header) |
| `secondaryColor` | string | `#818CF8` | Secondary accent color |
| `backgroundColor` | string | `#FFFFFF` | Page background color |
| `textColor` | string | `#1F2937` | Main text color |
| `userMessageBg` | string | `#4F46E5` | User message background |
| `botMessageBg` | string | `#F3F4F6` | Bot message background |
| `inputBg` | string | `#F9FAFB` | Input field background |
| `inputText` | string | `#111827` | Input text color |
| `borderColor` | string | `#E5E7EB` | Border color |
| `position` | string | `bottom-right` | Widget position: `bottom-right`, `bottom-left`, `top-right`, `top-left` |

## 📝 Usage Examples

### Example 1: Basic Usage

```
http://localhost:3000/chatwidget/chat?botName=Support Bot&apiKey=YOUR_API_KEY
```

### Example 2: Custom Theme

```
http://localhost:3000/chatwidget/chat?botName=Sales Assistant&primaryColor=%2310B981&userMessageBg=%2310B981&position=bottom-left&apiKey=YOUR_API_KEY
```

### Example 3: Full Configuration

```
http://localhost:3000/chatwidget/chat?botName=Customer Support&welcomeMessage=Welcome! How can we assist you?&systemPrompt=You are a customer support agent. Be helpful and professional.&suggestions=Check order status,Return policy,Contact us&primaryColor=%234F46E5&secondaryColor=%23818CF8&position=bottom-right&enableHistory=true&maxHistoryMessages=20&apiKey=YOUR_API_KEY
```

### Example 5: Without History (Single Message Mode)

```
http://localhost:3000/chatwidget/chat?botName=FAQ Bot&enableHistory=false&systemPrompt=Answer questions briefly without context&apiKey=YOUR_API_KEY
```

**Note:** When `enableHistory=false`, each message is independent and the bot won't remember previous conversation.

### Example 4: Dark Theme

```
http://localhost:3000/chatwidget/chat?botName=Night Bot&primaryColor=%238B5CF6&backgroundColor=%231F2937&textColor=%23F9FAFB&userMessageBg=%238B5CF6&botMessageBg=%23374151&inputBg=%23374151&inputText=%23F9FAFB&borderColor=%234B5563&apiKey=YOUR_API_KEY
```

## 🎨 Color Format

Colors should be URL-encoded hex values:
- `#4F46E5` → `%234F46E5`
- `#10B981` → `%2310B981`

Or use color names:
- `red`, `blue`, `green`, etc.

## 🔗 Embedding in iframe

You can embed the widget in any website using an iframe:

```html
<iframe 
  src="http://your-domain.com/chatwidget/chat?botName=AI Bot&apiKey=YOUR_KEY"
  width="100%"
  height="100%"
  style="border: none; position: fixed; bottom: 0; right: 0; width: 450px; height: 700px; z-index: 9999;"
></iframe>
```

## 🔒 Security Note

**⚠️ Important:** Passing the API key via URL is convenient for testing but **NOT recommended for production**. 

For production, you should:
1. Set `NEXT_PUBLIC_GEMINI_API_KEY` in environment variables
2. Or use a backend API proxy (see `EMBEDDING_GUIDE.md`)

## 📱 Responsive Behavior

The widget automatically adapts to:
- Mobile devices (optimized layout)
- Different screen sizes
- Different positions (corners)

## 🎯 Use Cases

### Use Case 1: Customer Support Widget

```
/chatwidget/chat?
  botName=Support Team&
  welcomeMessage=Hi! How can we help you today?&
  systemPrompt=You are a customer support agent for an e-commerce company. Help users with orders, returns, and product questions.&
  suggestions=Track my order,Return policy,Product information,Contact human agent&
  primaryColor=%230EA5E9&
  apiKey=YOUR_KEY
```

### Use Case 2: Educational Tutor

```
/chatwidget/chat?
  botName=Math Tutor&
  welcomeMessage=Ready to learn math? Ask me anything!&
  systemPrompt=You are a patient math tutor. Explain concepts clearly and provide step-by-step solutions.&
  suggestions=Explain algebra,Help with calculus,Geometry basics,Practice problems&
  primaryColor=%2310B981&
  apiKey=YOUR_KEY
```

### Use Case 3: Sales Assistant

```
/chatwidget/chat?
  botName=Sales Assistant&
  welcomeMessage=Looking for the perfect product? I can help!&
  systemPrompt=You are a friendly sales assistant. Help customers find products and answer questions about features and pricing.&
  suggestions=Show me products,Compare features,Pricing info,Special offers&
  primaryColor=%23F59E0B&
  apiKey=YOUR_KEY
```

### Use Case 4: Healthcare Assistant

```
/chatwidget/chat?
  botName=Health Assistant&
  welcomeMessage=How can I help with your health questions today?&
  systemPrompt=You are a healthcare information assistant. Provide general health information but always recommend consulting professionals for medical advice.&
  suggestions=Symptoms checker,Healthy habits,Find a doctor,Medication info&
  primaryColor=%23EC4899&
  apiKey=YOUR_KEY
```

## 🛠️ Testing

### Test Different Configurations

Visit these URLs to test different setups:

**Default:**
```
http://localhost:3000/chatwidget/chat
```

**With Custom Bot Name:**
```
http://localhost:3000/chatwidget/chat?botName=My Custom Bot
```

**Different Position:**
```
http://localhost:3000/chatwidget/chat?position=bottom-left
```

**Custom Suggestions:**
```
http://localhost:3000/chatwidget/chat?suggestions=Hi there,What services do you offer?,I need help,Contact support
```

## 📊 URL Builder Tool

You can create a simple URL builder tool:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ChatWidget URL Builder</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    button { background: #4F46E5; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .result { background: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 20px; word-break: break-all; }
  </style>
</head>
<body>
  <h1>ChatWidget URL Builder</h1>
  
  <div class="form-group">
    <label>Bot Name:</label>
    <input type="text" id="botName" value="AI Assistant">
  </div>
  
  <div class="form-group">
    <label>Welcome Message:</label>
    <input type="text" id="welcomeMessage" value="Hi! How can I help you today?">
  </div>
  
  <div class="form-group">
    <label>Suggestions (comma-separated):</label>
    <input type="text" id="suggestions" value="Hello!,How can you help?,Tell me more">
  </div>
  
  <div class="form-group">
    <label>Primary Color:</label>
    <input type="color" id="primaryColor" value="#4F46E5">
  </div>
  
  <div class="form-group">
    <label>API Key:</label>
    <input type="text" id="apiKey" placeholder="Your Gemini API Key">
  </div>
  
  <button onclick="generateURL()">Generate URL</button>
  
  <div class="result" id="result" style="display:none;">
    <strong>Your Widget URL:</strong><br>
    <a id="generatedURL" href="#" target="_blank"></a>
  </div>
  
  <script>
    function generateURL() {
      const base = window.location.origin + '/chatwidget/chat';
      const params = new URLSearchParams({
        botName: document.getElementById('botName').value,
        welcomeMessage: document.getElementById('welcomeMessage').value,
        suggestions: document.getElementById('suggestions').value,
        primaryColor: document.getElementById('primaryColor').value,
        apiKey: document.getElementById('apiKey').value,
      });
      
      const fullURL = base + '?' + params.toString();
      document.getElementById('generatedURL').href = fullURL;
      document.getElementById('generatedURL').textContent = fullURL;
      document.getElementById('result').style.display = 'block';
    }
  </script>
</body>
</html>
```

## 🔍 Debugging

If the widget doesn't load:

1. Check browser console for errors
2. Verify API key is provided
3. Check if all color values are valid hex codes
4. Ensure URL encoding is correct
5. Test with default parameters first

## 📚 Related Documentation

- **Setup Guide:** See `SETUP_GUIDE.md` for installation and configuration
- **Embedding Guide:** See `EMBEDDING_GUIDE.md` for embedding options
- **Main README:** See `README.md` for project overview

## 💡 Tips

1. **URL Length:** Keep URLs under 2000 characters for compatibility
2. **Encoding:** Always URL-encode special characters
3. **Testing:** Test on different devices and browsers
4. **Performance:** Widget loads on-demand for better performance
5. **Caching:** Widget configuration is cached per session

