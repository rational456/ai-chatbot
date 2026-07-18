<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="app-shell">
    <!-- 移动端遮罩 -->
    <div
      v-if="sidebarOpen"
      class="overlay"
      @click="closeSidebar"
    />

    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ open: sidebarOpen, closed: !sidebarOpen }">
      <AppSidebar v-if="sidebarOpen" @close="closeSidebar" />
    </aside>

    <!-- 主区域 -->
    <main class="main-content">
      <!-- 收起/展开按钮 -->
      <button class="toggle-btn" @click="toggleSidebar" :title="sidebarOpen ? '收起侧边栏' : '展开侧边栏'">
        <svg v-if="sidebarOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <router-view />
    </main>
  </div>
</template>

<style>
*,*::before,*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,body,#app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #374151;
  background: #ffffff;
}
</style>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* ===== 遮罩（仅移动端） ===== */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 90;
}

/* ===== 侧边栏 ===== */
.sidebar {
  width: 280px;
  min-width: 280px;
  background: #f9fafb;
  color: #374151;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  z-index: 100;
  transition: width 0.2s, min-width 0.2s, opacity 0.2s;
  overflow: hidden;
}

.sidebar.closed {
  width: 0;
  min-width: 0;
  border-right: none;
}

/* ===== 主区域 ===== */
.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: relative;
}

/* ===== 收起/展开按钮 ===== */
.toggle-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 50;
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s;
}

.toggle-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

/* ===== 平板 ===== */
@media (max-width: 768px) {
  .sidebar:not(.closed) {
    width: 260px;
    min-width: 260px;
  }
}

/* ===== 手机端 ===== */
@media (max-width: 640px) {
  .overlay {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px !important;
    min-width: 280px !important;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar.closed {
    width: 0 !important;
    min-width: 0 !important;
    transform: translateX(-100%);
  }

  .toggle-btn {
    top: 6px;
    left: 6px;
  }
}
</style>
