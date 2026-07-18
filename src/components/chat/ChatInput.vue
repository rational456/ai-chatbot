<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  send: [content: string]
}>()

const inputText = ref('')

const handleSend = () => {
  const text = inputText.value.trim()
  if (!text) return
  emit('send', text)
  inputText.value = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="chat-input-wrapper">
    <div class="chat-input-inner">
      <textarea
        v-model="inputText"
        class="input-area"
        placeholder="输入消息，Enter 发送，Shift+Enter 换行"
        rows="1"
        :disabled="disabled"
        @keydown="handleKeydown"
      />
      <button
        class="send-btn"
        :disabled="disabled || !inputText.trim()"
        @click="handleSend"
        title="发送 (Enter)"
      >
        发送
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input-wrapper {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
}

.chat-input-inner {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
}

.input-area {
  flex: 1;
  resize: none;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.15s;
  min-height: 88px;
  max-height: 300px;
}

.input-area:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.send-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 手机端 */
@media (max-width: 640px) {
  .chat-input-wrapper {
    padding: 12px 8px;
  }

  .chat-input-inner {
    gap: 8px;
  }

  .input-area {
    min-height: 48px;
    padding: 10px 12px;
    font-size: 14px;
  }

  .send-btn {
    padding: 10px 14px;
    font-size: 13px;
  }
}
</style>
