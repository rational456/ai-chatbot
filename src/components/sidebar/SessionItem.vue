<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import type { Session } from '@/types/index'

const props = defineProps<{
  session: Session
  isActive: boolean
}>()

const emit = defineEmits<{
  select: [sessionId: string]
  delete: [sessionId: string]
}>()

const router = useRouter()
const chatStore = useChatStore()

const handleClick = () => {
  emit('select', props.session.id)
  chatStore.setActiveSession(props.session.id)
  router.push({ name: 'chat', params: { sessionId: props.session.id } })
}

const handleDelete = (e: Event) => {
  e.stopPropagation()
  emit('delete', props.session.id)
  chatStore.deleteSession(props.session.id)
  if (chatStore.activeSessionId === props.session.id) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="session-item" :class="{ active: isActive }" @click="handleClick">
    <span class="session-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </span>
    <span class="session-title">{{ session.title }}</span>
    <button class="delete-btn" @click="handleDelete" title="删除会话">×</button>
  </div>
</template>

<style scoped>
.session-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin: 0 8px 2px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}

.session-item:hover {
  background: #f3f4f6;
}

.session-item.active {
  background: #e5e7eb;
}

.session-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.session-title {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-btn {
  display: none;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #9ca3af;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}

.session-item:hover .delete-btn {
  display: block;
}

.delete-btn:hover {
  background: rgba(255, 80, 80, 0.25);
  color: #ff6b6b;
}
</style>
