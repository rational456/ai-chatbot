<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="stop-btn" @click="$emit('click')" title="停止生成">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
    <span>停止生成</span>
  </button>
</template>

<style scoped>
.stop-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  margin: 0 auto 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #6b7280;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.stop-btn:hover {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #ef4444;
}
</style>
