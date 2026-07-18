import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import type {ChatSettings} from '@/types/index'

export const useSettingsStore = defineStore('settings', () => {
    const apiKey = ref<string>('')
    const model = ref<string>('deepseek-ai/DeepSeek-V3')
    const temperature = ref<number>(0.7)
    const maxTokens = ref<number>(2048)

    const isConfigured = computed(() => apiKey.value.length > 0)

    const apiRequestConfig = computed(() => ({
        model: model.value,
        temperature: temperature.value,
        max_tokens: maxTokens.value,
    }))
    //更新设置
    const updateSettings = (partial: Partial<ChatSettings>) => {
        if (partial.apiKey !== undefined) apiKey.value = partial.apiKey
        if (partial.model !== undefined) model.value = partial.model
        if (partial.temperature !== undefined) temperature.value = partial.temperature
        if (partial.maxTokens !== undefined) maxTokens.value = partial.maxTokens
        saveToStorage()
    }
    //从 localStorage 恢复数据
    const loadFromStorage = () => {
        const stored = localStorage.getItem('chat_settings')
        if (stored) {
            const settings = JSON.parse(stored)
            apiKey.value = settings.apiKey || ''
            model.value = settings.model || 'deepseek-ai/DeepSeek-V3'
            temperature.value = settings.temperature || 0.7
            maxTokens.value = settings.maxTokens || 2048
        }
    }
    //保存到 localStorage
    const saveToStorage = () => {
        localStorage.setItem('chat_settings', JSON.stringify({
            apiKey: apiKey.value,
            model: model.value,
            temperature: temperature.value,
            maxTokens: maxTokens.value
        }))
    }
    loadFromStorage()
    return {
        apiKey,
        model,
        temperature,
        maxTokens,
        isConfigured,
        apiRequestConfig,
        updateSettings,
        loadFromStorage,
        saveToStorage
    }
})