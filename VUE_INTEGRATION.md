# 🟢 Vue.js Integration Guide

## 📖 Hướng dẫn tích hợp ChatBot Widget vào Vue.js

### 🎯 Tổng quan

ChatBot Widget có thể tích hợp vào Vue 2, Vue 3, Nuxt, Vuetify, và Quasar thông qua iframe embed.

---

## 🚀 Quick Start

### Vue 3 (Composition API) - Recommended

**App.vue:**
```vue
<template>
  <div id="app">
    <h1>My Vue App</h1>
    
    <!-- ChatBot Widget -->
    <iframe
      :src="chatbotUrl"
      class="chatbot-widget"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: 'Support Bot',
    welcomeMessage: 'Xin chào! Tôi có thể giúp gì?',
    apiKey: 'YOUR_API_KEY', // Hoặc dùng import.meta.env
  });
  
  return `http://localhost:3000/chatwidget/chat?${params.toString()}`;
});
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 450px;
  height: 700px;
  border: none;
  z-index: 9999;
}
</style>
```

---

### Vue 2/3 (Options API) - Classic

**App.vue:**
```vue
<template>
  <div id="app">
    <h1>My Vue App</h1>
    
    <!-- ChatBot Widget -->
    <iframe
      :src="chatbotUrl"
      class="chatbot-widget"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data() {
    return {
      config: {
        botName: 'Support Bot',
        welcomeMessage: 'Xin chào! Tôi có thể giúp gì?',
        apiKey: process.env.VUE_APP_GEMINI_API_KEY,
      }
    };
  },
  
  computed: {
    chatbotUrl() {
      const params = new URLSearchParams({
        botName: this.config.botName,
        welcomeMessage: this.config.welcomeMessage,
        apiKey: this.config.apiKey,
      });
      
      return `http://localhost:3000/chatwidget/chat?${params.toString()}`;
    }
  }
};
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 450px;
  height: 700px;
  border: none;
  z-index: 9999;
}
</style>
```

---

## 🎨 Advanced Configuration

### Reusable Component

**ChatBot.vue:**
```vue
<template>
  <iframe
    v-if="show"
    :src="chatbotUrl"
    :class="['chatbot-widget', positionClass]"
    @load="onLoad"
  ></iframe>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  botName: {
    type: String,
    default: 'AI Assistant'
  },
  theme: {
    type: Object,
    default: () => ({
      primaryColor: '#4F46E5',
      position: 'bottom-right'
    })
  },
  suggestions: {
    type: Array,
    default: () => ['Hello', 'Help', 'More']
  },
  apiKey: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: true
  }
});

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: props.botName,
    suggestions: props.suggestions.join(','),
    primaryColor: props.theme.primaryColor,
    position: props.theme.position,
    apiKey: props.apiKey,
  });
  
  return `http://localhost:3000/chatwidget/chat?${params.toString()}`;
});

const positionClass = computed(() => {
  return `position-${props.theme.position}`;
});

const onLoad = () => {
  console.log('ChatBot loaded');
};
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  width: 450px;
  height: 700px;
  border: none;
  z-index: 9999;
}

.position-bottom-right {
  bottom: 0;
  right: 0;
}

.position-bottom-left {
  bottom: 0;
  left: 0;
}

.position-top-right {
  top: 0;
  right: 0;
}

.position-top-left {
  top: 0;
  left: 0;
}
</style>
```

**Usage:**
```vue
<template>
  <div>
    <ChatBot
      bot-name="Support Team"
      :theme="{ primaryColor: '#10B981', position: 'bottom-right' }"
      :suggestions="['Track order', 'Returns', 'Help']"
      :api-key="apiKey"
    />
  </div>
</template>

<script setup>
import ChatBot from './components/ChatBot.vue';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
</script>
```

---

## 🔧 Nuxt.js Integration

### Nuxt 3

**components/ChatBot.vue:**
```vue
<template>
  <ClientOnly>
    <iframe
      :src="chatbotUrl"
      class="chatbot-widget"
    ></iframe>
  </ClientOnly>
</template>

<script setup>
const config = useRuntimeConfig();

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: 'AI Assistant',
    apiKey: config.public.geminiApiKey,
  });
  
  return `${config.public.chatbotBaseUrl}/chatwidget/chat?${params.toString()}`;
});
</script>
```

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      geminiApiKey: process.env.NUXT_PUBLIC_GEMINI_API_KEY,
      chatbotBaseUrl: process.env.NUXT_PUBLIC_CHATBOT_BASE_URL || 'http://localhost:3000'
    }
  }
})
```

**.env:**
```bash
NUXT_PUBLIC_GEMINI_API_KEY=your_api_key
NUXT_PUBLIC_CHATBOT_BASE_URL=https://your-chatbot-domain.com
```

---

## 🎨 Vuetify Integration

```vue
<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>My Vuetify App</h1>
      </v-container>
    </v-main>
    
    <!-- ChatBot Widget -->
    <iframe
      :src="chatbotUrl"
      class="chatbot-widget elevation-10"
    ></iframe>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';

const chatbotUrl = computed(() => {
  const params = new URLSearchParams({
    botName: 'Support Bot',
    primaryColor: '#1976D2', // Vuetify primary color
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  
  return `http://localhost:3000/chatwidget/chat?${params.toString()}`;
});
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 450px;
  height: 700px;
  border: none;
  z-index: 9999;
  border-radius: 8px 8px 0 0;
}
</style>
```

---

## 📱 Responsive Design

```vue
<template>
  <iframe
    :src="chatbotUrl"
    :class="chatbotClass"
  ></iframe>
</template>

<script setup>
import { computed } from 'vue';

const isMobile = computed(() => {
  return window.innerWidth < 768;
});

const chatbotClass = computed(() => {
  return isMobile.value ? 'chatbot-mobile' : 'chatbot-desktop';
});
</script>

<style scoped>
.chatbot-desktop {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 450px;
  height: 700px;
  border: none;
  z-index: 9999;
}

.chatbot-mobile {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 9999;
}
</style>
```

---

## 🎮 Show/Hide Control

```vue
<template>
  <div>
    <!-- Toggle Button -->
    <button @click="toggleChat" class="chat-toggle-btn">
      {{ showChat ? 'Close Chat' : 'Open Chat' }}
    </button>
    
    <!-- ChatBot Widget -->
    <Transition name="slide-up">
      <iframe
        v-if="showChat"
        :src="chatbotUrl"
        class="chatbot-widget"
      ></iframe>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};

const chatbotUrl = computed(() => {
  // ... generate URL
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.chat-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  z-index: 9998;
}
</style>
```

---

## 🔐 Environment Variables

### Vue 3 / Vite

**.env:**
```bash
VITE_GEMINI_API_KEY=your_api_key
VITE_CHATBOT_BASE_URL=http://localhost:3000
```

**Usage:**
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

### Vue 2 / Vue CLI

**.env:**
```bash
VUE_APP_GEMINI_API_KEY=your_api_key
VUE_APP_CHATBOT_BASE_URL=http://localhost:3000
```

**Usage:**
```javascript
const apiKey = process.env.VUE_APP_GEMINI_API_KEY;
```

---

## 🎯 Use Cases

### Customer Support Portal

```vue
<template>
  <div class="support-portal">
    <SupportTickets />
    
    <!-- Always-visible chat support -->
    <ChatBot
      bot-name="Support Team"
      :theme="{
        primaryColor: '#10B981',
        position: 'bottom-right'
      }"
      :suggestions="[
        'Check ticket status',
        'Create new ticket',
        'FAQ',
        'Contact agent'
      ]"
      :api-key="apiKey"
    />
  </div>
</template>
```

### E-commerce Product Page

```vue
<template>
  <div class="product-page">
    <ProductDetails :product="product" />
    
    <!-- Product-specific chatbot -->
    <ChatBot
      bot-name="Shopping Assistant"
      :system-prompt="`Help customers with ${product.name}. Answer questions about features, pricing, and shipping.`"
      :suggestions="[
        'Product details',
        'Shipping info',
        'Compare products',
        'Add to cart'
      ]"
      :api-key="apiKey"
    />
  </div>
</template>
```

---

## 💡 Pro Tips

### 1. Lazy Loading

```vue
<script setup>
import { defineAsyncComponent } from 'vue';

const ChatBot = defineAsyncComponent(() =>
  import('./components/ChatBot.vue')
);
</script>
```

### 2. Pinia State Management

```javascript
// stores/chatbot.js
import { defineStore } from 'pinia';

export const useChatbotStore = defineStore('chatbot', {
  state: () => ({
    isOpen: false,
    config: {
      botName: 'AI Assistant',
      theme: { primaryColor: '#4F46E5' }
    }
  }),
  
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
});
```

### 3. Vue Router Integration

```vue
<template>
  <ChatBot v-if="showChatOnRoute" />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showChatOnRoute = computed(() => {
  // Show only on specific routes
  return ['home', 'products', 'support'].includes(route.name);
});
</script>
```

---

## 🐛 Troubleshooting

### iframe not loading?
```vue
<!-- Add error handling -->
<iframe
  :src="chatbotUrl"
  @error="onError"
  @load="onLoad"
></iframe>

<script setup>
const onError = () => {
  console.error('ChatBot failed to load');
};

const onLoad = () => {
  console.log('ChatBot loaded successfully');
};
</script>
```

### CORS issues?
Make sure your chatbot domain allows embedding:
```javascript
// Server-side
res.setHeader('X-Frame-Options', 'ALLOW-FROM https://your-vue-app.com');
```

---

## 📚 Related Docs

- **EMBEDDING_TOOL.md** - Interactive tool usage
- **QUICK_START.md** - General quick start
- **CHATWIDGET_API.md** - Complete API reference

---

## 🎉 Ready to Use!

1. Choose Vue 2 or Vue 3 code
2. Copy into your component
3. Configure with your API key
4. Enjoy chatbot in your Vue app! 🚀

