<script setup lang="ts">
import type { Session } from '@/types/index'
import MessageList from '@/components/chat/MessageList.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import StopButton from '@/components/chat/StopButton.vue'

defineProps<{
  session: Session | null
  isStreaming: boolean
}>()

const emit = defineEmits<{
  send: [content: string]
  stop: []
}>()
</script>

<template>
  <div class="chat-view">
    <MessageList :messages="session?.messages ?? []" />
    <div class="input-area">
      <StopButton v-if="isStreaming" @click="emit('stop')" />
      <ChatInput :disabled="isStreaming" @send="emit('send', $event)" />
    </div>
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-area {
  position: relative;
}
</style>
