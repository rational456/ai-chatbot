<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const sidebarOpen = ref(false)

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
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <AppSidebar @close="closeSidebar" />
    </aside>

    <!-- 主区域 -->
    <main class="main-content">
      <!-- 移动端汉堡按钮 -->
      <button class="menu-btn" @click="toggleSidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

/* ===== 遮罩 ===== */
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

/* ===== 汉堡按钮（默认隐藏） ===== */
.menu-btn {
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 50;
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
}

/* ===== 平板 ===== */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    min-width: 260px;
  }
}

/* ===== 手机端 ===== */
@media (max-width: 640px) {
  .menu-btn {
    display: block;
  }

  .overlay {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    min-width: 280px;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    padding-top: 44px;
  }
}
</style>
