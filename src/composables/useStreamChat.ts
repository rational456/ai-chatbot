import { useSettingsStore } from '@/stores/settings'

interface StreamCallbacks {
  onChunk: (content: string) => void
  onDone: () => void
  onError: (error: string) => void
}

export async function streamChat(
  messages: Array<{ role: string; content: string }>,
  signal: AbortSignal,
  callbacks: StreamCallbacks
) {
  const settings = useSettingsStore()

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': settings.apiKey,
      },
      body: JSON.stringify({
        messages,
        model: settings.model,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
        stream: true,
      }),
      signal,
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: '未知错误' }))
      callbacks.onError(err.detail || err.error || `HTTP ${response.status}`)
      return
    }

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data:')) continue

        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') {
          callbacks.onDone()
          return
        }

        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta
          if (delta?.content) {
            callbacks.onChunk(delta.content)
          }
        } catch {
          // 忽略解析失败的行
        }
      }
    }

    callbacks.onDone()
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      callbacks.onDone() // 主动中断，正常结束
    } else {
      callbacks.onError(err instanceof Error ? err.message : '网络请求失败')
    }
  }
}
