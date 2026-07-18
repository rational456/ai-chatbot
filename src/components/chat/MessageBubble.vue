<script setup lang="ts">
import type { Message } from '@/types/index'
import StreamingText from '@/components/chat/StreamingText.vue'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="message-wrapper" :class="message.role === 'user' ? 'user' : 'assistant'">
    <div class="avatar">
      <svg v-if="message.role === 'user'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
        <path d="M8 14h8a4 4 0 0 1 4 4v2H4v-2a4 4 0 0 1 4-4z"/>
        <circle cx="9" cy="8" r="1" fill="currentColor" stroke="none"/>
        <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <div class="bubble">
      <StreamingText :content="message.content" />
      <span v-if="message.isStreaming" class="streaming-cursor">▍</span>
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.message-wrapper.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  background: #f0f0f0;
}

.message-wrapper.user .avatar {
  background: #dbeafe;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.6;
  font-size: 15px;
  position: relative;
}

.message-wrapper.user .bubble {
  background: #2563eb;
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.message-wrapper.assistant .bubble {
  background: #f3f4f6;
  color: #374151;
  border-bottom-left-radius: 4px;
}

.streaming-cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  color: inherit;
  margin-left: 2px;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* 手机端 */
@media (max-width: 640px) {
  .message-wrapper {
    padding: 12px 8px;
    gap: 6px;
  }

  .bubble {
    max-width: 85%;
    font-size: 14px;
  }

  .avatar {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .avatar svg {
    width: 16px;
    height: 16px;
  }
}
</style>
