// Cloudflare Worker — 代理 SiliconFlow API 请求
export async function onRequest(context) {
  const { request } = context

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
  }

  // 处理 CORS 预检（浏览器跨域时自动发的 OPTIONS）
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 只处理 POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: '仅支持 POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = request.headers.get('X-API-Key')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: '缺少 API Key' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: '请求体解析失败' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages, model, temperature, max_tokens, stream } = body
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages 参数错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const upstreamBody = {
    model: model || 'deepseek-ai/DeepSeek-V3',
    messages,
    temperature: temperature ?? 0.7,
    max_tokens: max_tokens ?? 2048,
    stream: stream ?? true,
  }

  try {
    const upstreamRes = await fetch(
      'https://api.siliconflow.cn/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(upstreamBody),
      }
    )

    if (!upstreamRes.ok) {
      const errorText = await upstreamRes.text()
      return new Response(
        JSON.stringify({
          error: `SiliconFlow API 错误 (${upstreamRes.status})`,
          detail: errorText,
        }),
        {
          status: upstreamRes.status,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 流式转发 SSE
    return new Response(upstreamRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: '代理服务器内部错误',
        detail: err.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
