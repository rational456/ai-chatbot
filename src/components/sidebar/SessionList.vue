<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import SessionItem from '@/components/sidebar/SessionItem.vue'

const chatStore = useChatStore()
const emit = defineEmits<{ selected: [] }>()

const handleSelect = (sessionId: string) => {
  chatStore.setActiveSession(sessionId)
  emit('selected')
}

const handleDelete = (sessionId: string) => {
  chatStore.deleteSession(sessionId)
}
</script>

<template>
  <div class="session-list">
    <div v-if="chatStore.sortedSessions.length === 0" class="empty-hint">
      暂无对话记录
    </div>
    <SessionItem
      v-for="session in chatStore.sortedSessions"
      :key="session.id"
      :session="session"
      :is-active="session.id === chatStore.activeSessionId"
      @select="handleSelect"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>
.session-list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;
}

.empty-hint {
  padding: 24px 16px;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
}
</style>
