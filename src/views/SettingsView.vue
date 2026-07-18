<script setup lang="ts">
import { useRouter } from 'vue-router'
import SettingsForm from '@/components/settings/SettingsForm.vue'

const router = useRouter()
</script>

<template>
  <div class="settings-page">
    <div class="top-bar">
      <button class="back-btn" @click="router.push({ name: 'home' })">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>返回对话</span>
      </button>
    </div>
    <div class="form-wrapper">
      <SettingsForm />
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  height: 100%;
  overflow-y: auto;
}

.top-bar {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.back-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.form-wrapper {
  padding: 40px 24px;
}

@media (max-width: 640px) {
  .top-bar {
    padding: 12px 8px;
  }

  .form-wrapper {
    padding: 20px 12px;
  }
}
</style>
