<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const showKey = ref(false)

const apiKey = ref(settings.apiKey)
const model = ref(settings.model)
const temperature = ref(settings.temperature)
const maxTokens = ref(settings.maxTokens)

const models = [
  { value: 'deepseek-ai/DeepSeek-V3', label: 'DeepSeek-V3（推荐）' },
  { value: 'deepseek-ai/DeepSeek-R1', label: 'DeepSeek-R1' },
  { value: 'Qwen/Qwen2.5-7B-Instruct', label: 'Qwen2.5-7B' },
  { value: 'Qwen/Qwen2.5-72B-Instruct', label: 'Qwen2.5-72B' },
  { value: '01-ai/Yi-1.5-34B-Chat', label: 'Yi-1.5-34B' },
  { value: 'THUDM/glm-4-9b-chat', label: 'GLM-4-9B' },
]

const handleSave = () => {
  settings.updateSettings({
    apiKey: apiKey.value,
    model: model.value,
    temperature: temperature.value,
    maxTokens: maxTokens.value,
  })
  alert('设置已保存')
}

const statusText = settings.isConfigured ? '已配置 ✓' : '未配置'
</script>

<template>
  <div class="settings-form">
    <div class="form-header">
      <h2>设置</h2>
      <span class="status" :class="{ ready: settings.isConfigured }">
        {{ statusText }}
      </span>
    </div>

    <!-- API Key -->
    <div class="field">
      <label>API Key</label>
      <div class="key-input-wrap">
        <input
          v-model="apiKey"
          :type="showKey ? 'text' : 'password'"
          placeholder="sk-xxxxxxxx"
          class="input"
        />
        <button class="toggle-key" @click="showKey = !showKey">
          {{ showKey ? '隐藏' : '显示' }}
        </button>
      </div>
      <span class="hint">
        从
        <a href="https://cloud.siliconflow.cn/account/ak" target="_blank" rel="noopener">
          SiliconFlow API 管理
        </a>
        获取
      </span>
    </div>

    <!-- 模型选择 -->
    <div class="field">
      <label>模型</label>
      <select v-model="model" class="input">
        <option v-for="m in models" :key="m.value" :value="m.value">
          {{ m.label }}
        </option>
      </select>
    </div>

    <!-- Temperature -->
    <div class="field">
      <label>Temperature: {{ temperature }}</label>
      <div class="slider-row">
        <input
          v-model.number="temperature"
          type="range"
          min="0"
          max="2"
          step="0.1"
          class="slider"
        />
        <span class="range-label">0</span>
        <span class="range-label">2</span>
      </div>
      <span class="hint">越高越有创造性，越低越严谨</span>
    </div>

    <!-- Max Tokens -->
    <div class="field">
      <label>最大 Token 数</label>
      <input v-model.number="maxTokens" type="number" min="1" max="8192" class="input" />
      <span class="hint">单次回复的最大长度，范围 1–8192</span>
    </div>

    <button class="save-btn" @click="handleSave">保存设置</button>
  </div>
</template>

<style scoped>
.settings-form {
  max-width: 520px;
  margin: 0 auto;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.form-header h2 {
  font-size: 22px;
  color: #111827;
}

.status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: #fee2e2;
  color: #dc2626;
}

.status.ready {
  background: #dcfce7;
  color: #16a34a;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.key-input-wrap {
  display: flex;
  gap: 8px;
}

.key-input-wrap .input {
  flex: 1;
}

.toggle-key {
  flex-shrink: 0;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
}

.toggle-key:hover {
  background: #f3f4f6;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.slider {
  flex: 1;
  accent-color: #2563eb;
  height: 6px;
}

.range-label {
  font-size: 12px;
  color: #9ca3af;
}

.hint {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.hint a {
  color: #2563eb;
}

.save-btn {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.save-btn:hover {
  background: #1d4ed8;
}
</style>
