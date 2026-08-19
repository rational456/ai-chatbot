import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Session, Message } from '@/types/index'
import { streamChat } from '@/composables/useStreamChat'
import { useSettingsStore } from '@/stores/settings'

export const useChatStore = defineStore('chat', () => {
    const sessions = ref<Session[]>([])
    const activeSessionId = ref<string | null>(null)
    const isStreaming = ref<boolean>(false)
    const abortController = ref<AbortController | null>(null)
    const streamingMessageId = ref<string | null>(null)

    const currentSession = computed(() =>
        sessions.value.find(s => s.id === activeSessionId.value) ?? null
    )

    const sortedSessions = computed(() =>
        [...sessions.value].sort((a, b) => b.updatedAt - a.updatedAt)
    )

    const currentMessages = computed(() =>
        currentSession.value?.messages ?? []
    )

    // 创建新会话
    const createSession = (session: Session) => {
        sessions.value.push(session)
        activeSessionId.value = session.id
        saveToStorage()
    }

    // 删除会话
    const deleteSession = (sessionId: string) => {
        sessions.value = sessions.value.filter(s => s.id !== sessionId)
        if (activeSessionId.value === sessionId) {
            activeSessionId.value = sessions.value[0]?.id ?? null
        }
        saveToStorage()
    }

    // 设置当前会话
    const setActiveSession = (sessionId: string) => {
        activeSessionId.value = sessionId
    }

    // 发送消息,发起流式请求
    const sendMessage = async (content: string) => {
        const sessionId = activeSessionId.value
        if (!sessionId || isStreaming.value) return

        // 检查 API Key
        const settings = useSettingsStore()
        if (!settings.isConfigured) {
            alert('请先在设置页配置 API Key')
            return
        }

        //添加用户消息
        const userMsg: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: Date.now(),
        }
        const session = sessions.value.find(s => s.id === sessionId)
        if (!session) return
        session.messages.push(userMsg)
        session.updatedAt = Date.now()

        // 会话自动命名
        if (session.title === '新对话') {
            session.title = content.slice(0, 30) + (content.length > 30 ? '…' : '')
        }

        // 创建 AI 占位消息
        const aiMsg: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
            isStreaming: true,
        }
        session.messages.push(aiMsg)
        session.updatedAt = Date.now()

        //设置流式状态
        isStreaming.value = true
        streamingMessageId.value = aiMsg.id
        const ac = new AbortController()
        abortController.value = ac

        saveToStorage()

        //构建消息历史（最近 20 轮，不含当前 AI 占位消息）
        const history = session.messages
            .filter(m => m.id !== aiMsg.id)
            .slice(-40) // 最多 20 轮对话
            .map(m => ({ role: m.role, content: m.content }))

        //发起流式请求
        await streamChat(history, ac.signal, {
            onChunk(chunk: string) {
                const msg = sessions.value
                    .find(s => s.id === sessionId)
                    ?.messages.find(m => m.id === aiMsg.id)
                if (msg) {
                    msg.content += chunk
                }
            },
            onDone() {
                const msg = sessions.value
                    .find(s => s.id === sessionId)
                    ?.messages.find(m => m.id === aiMsg.id)
                if (msg) {
                    msg.isStreaming = false
                }
                isStreaming.value = false
                streamingMessageId.value = null
                abortController.value = null
                saveToStorage()
            },
            onError(error: string) {
                const msg = sessions.value
                    .find(s => s.id === sessionId)
                    ?.messages.find(m => m.id === aiMsg.id)
                if (msg) {
                    msg.content += `\n\n> ⚠️ 错误：${error}`
                    msg.isStreaming = false
                }
                isStreaming.value = false
                streamingMessageId.value = null
                abortController.value = null
                saveToStorage()
            },
        })
    }

    // 停止生成
    const stopGeneration = () => {
        if (abortController.value) {
            abortController.value.abort()
            abortController.value = null
        }
    }

    // localStorage
    const loadFromStorage = () => {
        try {
            const stored = localStorage.getItem('chat_sessions')
            if (stored) {
                sessions.value = JSON.parse(stored)
            }
        } catch { /* 数据损坏，忽略 */ }
    }

    const saveToStorage = () => {
        localStorage.setItem('chat_sessions', JSON.stringify(sessions.value))
    }

    loadFromStorage()

    // 清理：页面加载时把所有 isStreaming 重置
    for (const s of sessions.value) {
        for (const m of s.messages) {
            if (m.isStreaming) m.isStreaming = false
        }
    }

    return {
        sessions,
        activeSessionId,
        isStreaming,
        streamingMessageId,
        currentSession,
        sortedSessions,
        currentMessages,
        createSession,
        deleteSession,
        setActiveSession,
        sendMessage,
        stopGeneration,
        loadFromStorage,
        saveToStorage,
    }
})
