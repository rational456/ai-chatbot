<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import type { Session } from '@/types/index'
import ChatView from '@/components/chat/ChatView.vue'

const props = defineProps<{
  sessionId?: string
}>()

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

watch(
  () => route.params.sessionId,
  (newId) => {
    if (newId && typeof newId === 'string') {
      chatStore.setActiveSession(newId)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.sessionId) {
    chatStore.setActiveSession(props.sessionId)
  }
})

const handleSend = (content: string) => {
  // 没有当前会话 → 自动创建一个再发消息
  if (!chatStore.activeSessionId) {
    const newSession: Session = {
      id: crypto.randomUUID(),
      title: '新对话',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    chatStore.createSession(newSession)
    // 同步 URL
    router.push({ name: 'chat', params: { sessionId: newSession.id } })
  }
  chatStore.sendMessage(content)
}

const handleStop = () => {
  chatStore.stopGeneration()
}
</script>

<template>
  <ChatView
    :session="chatStore.currentSession"
    :is-streaming="chatStore.isStreaming"
    @send="handleSend"
    @stop="handleStop"
  />
</template>
