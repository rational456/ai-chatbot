<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Message } from '@/types/index'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import { useAutoScroll } from '@/composables/useAutoScroll'

const props = defineProps<{
  messages: Message[]
}>()

// 自动滚动
const listRef = ref<HTMLElement | null>(null)
const trigger = computed(() => ({
  length: props.messages.length,
  lastContent: props.messages[props.messages.length - 1]?.content ?? '',
}))

const { scrollToBottom, onScroll } = useAutoScroll(listRef, trigger)

// 新消息时强制滚到底部
onMounted(() => scrollToBottom())
</script>

<template>
  <div ref="listRef" class="message-list" @scroll="onScroll">
    <div v-if="messages.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <p class="empty-title">开始对话</p>
      <p class="empty-hint">在下方输入消息，与 AI 助手交流</p>
    </div>
    <MessageBubble
      v-for="msg in messages"
      :key="msg.id"
      :message="msg"
    />
  </div>
</template>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
}

.empty-hint {
  font-size: 14px;
  color: #9ca3af;
}
</style>
