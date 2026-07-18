<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useChatStore} from '@/stores/chat'
import type { Session } from '@/types'
const router = useRouter();
const chatStore = useChatStore();
const handleNewChat = () => {
  const newSession:Session ={
    id: crypto.randomUUID(),
    title: '新对话',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  chatStore.createSession(newSession)
  router.push({ name: 'chat', params: { sessionId: newSession.id } })
}
</script>

<template>
  <button class="new-chat-btn" @click="handleNewChat">
    <span class="icon">+</span>
    <span>新建对话</span> 
  </button>
</template>

<style scoped>
.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px 8px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.new-chat-btn:hover {
  background: #f3f4f6;
}

.icon {
  font-size: 18px;
  font-weight: 300;
}
</style>
