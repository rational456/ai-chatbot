export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // /api/chat 代理
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const apiKey = request.headers.get('X-API-Key')
      if (!apiKey) {
        return new Response(JSON.stringify({ error: '缺少 API Key' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
      }
      const body = await request.json()
      const { messages, model, temperature, max_tokens, stream } = body
      const upstream = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model || 'deepseek-ai/DeepSeek-V3',
          messages,
          temperature: temperature ?? 0.7,
          max_tokens: max_tokens ?? 2048,
          stream: stream ?? true,
        }),
      })
      return new Response(upstream.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // 其余交给静态资源
    return env.ASSETS.fetch(request)
  },
}
