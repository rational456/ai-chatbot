<script setup lang="ts">
import { useRouter } from 'vue-router'
import NewChatButton from '@/components/sidebar/NewChatButton.vue'
import SessionList from '@/components/sidebar/SessionList.vue'

const router = useRouter()
const emit = defineEmits<{ close: [] }>()

const goSettings = () => {
  router.push({ name: 'settings' })
  emit('close')
}
</script>

<template>
  <div class="app-sidebar">
    <div class="sidebar-header">
      <h1 class="app-title">AI 对话助手</h1>
    </div>
    <NewChatButton @created="emit('close')" />
    <SessionList @selected="emit('close')" />
    <div class="sidebar-footer">
      <button class="settings-btn" @click="goSettings">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 20px 16px 12px;
}

.app-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
}

.settings-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.settings-btn:hover {
  background: #f3f4f6;
  color: #374151;
}
</style>
