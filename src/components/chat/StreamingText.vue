<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps<{
  content: string
}>()

const html = computed(() => renderMarkdown(props.content))
</script>

<template>
  <div class="markdown-body" v-html="html" />
</template>

<style scoped>
/* GitHub 风格 Markdown 基础样式 */
.markdown-body {
  line-height: 1.75;
  word-break: break-word;
}

/* 标题 */
.markdown-body :deep(h1) { font-size: 1.5em; margin: 0.7em 0 0.4em; }
.markdown-body :deep(h2) { font-size: 1.3em; margin: 0.6em 0 0.3em; }
.markdown-body :deep(h3) { font-size: 1.1em; margin: 0.5em 0 0.3em; }

/* 段落 */
.markdown-body :deep(p) {
  margin: 0.4em 0;
}

/* 列表 */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.5em;
  margin: 0.3em 0;
}

.markdown-body :deep(li) {
  margin: 0.15em 0;
}

/* 代码块 */
.markdown-body :deep(pre) {
  margin: 0.6em 0;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  display: block;
  padding: 14px 16px;
  font-size: 0.9em;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace;
  line-height: 1.5;
}

/* 行内代码 */
.markdown-body :deep(code) {
  font-family: 'Fira Code', Consolas, monospace;
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  border-radius: 0;
}

/* 引用 */
.markdown-body :deep(blockquote) {
  margin: 0.5em 0;
  padding: 4px 12px;
  border-left: 3px solid #d1d5db;
  color: #6b7280;
}

/* 链接 */
.markdown-body :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

/* 表格 */
.markdown-body :deep(table) {
  border-collapse: collapse;
  margin: 0.5em 0;
  width: 100%;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #f9fafb;
  font-weight: 600;
}

/* 分隔线 */
.markdown-body :deep(hr) {
  margin: 0.8em 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* 粗体 / 斜体 */
.markdown-body :deep(strong) { font-weight: 600; }
.markdown-body :deep(em) { font-style: italic; }
</style>
