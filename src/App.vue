<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <AppSidebar />
    </aside>
    <main class="main-content">
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
}

.sidebar {
  width: 280px;
  min-width: 280px;
  background: #f9fafb;
  color: #374151;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  transition: width 0.2s, min-width 0.2s;
}

.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

/* 平板：侧边栏收窄 */
@media (max-width: 768px) {
  .sidebar {
    width: 220px;
    min-width: 220px;
  }
}

/* 手机端：隐藏侧边栏，主区域全屏 */
@media (max-width: 640px) {
  .sidebar {
    display: none;
  }
}
</style>
