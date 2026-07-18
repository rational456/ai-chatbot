import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages, model, temperature, max_tokens, stream } = req.body
  const apiKey = req.headers['x-api-key']

  if (!apiKey) {
    return res.status(401).json({ error: '缺少 API Key，请在设置页配置' })
  }
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages 参数错误' })
  }

  console.log(`[请求] 模型: ${model || '默认'}, 消息数: ${messages.length}`)

  const upstreamBody = {
    model: model || 'deepseek-ai/DeepSeek-V3',
    messages,
    temperature: temperature ?? 0.7,
    max_tokens: max_tokens ?? 2048,
    stream: stream ?? true,
  }

  try {
    const response = await axios.request({
      method: 'post',
      url: 'https://api.siliconflow.cn/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      data: upstreamBody,
      responseType: 'stream',
      timeout: 120000, // 2 分钟超时
    })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')

    let aborted = false

    // 客户端断开连接 → 中断上游请求
    req.on('close', () => {
      aborted = true
      response.data.destroy()
    })

    // 上游流数据
    response.data.on('data', (chunk) => {
      if (!aborted) {
        res.write(chunk)
      }
    })

    // 上游流结束
    response.data.on('end', () => {
      if (!res.writableEnded) {
        res.end()
      }
    })

    // 上游流错误
    response.data.on('error', (err) => {
      console.error(`[流转发错误] ${err.message}`)
      if (!res.headersSent) {
        res.status(500).json({ error: '流转发失败', detail: err.message })
      } else if (!res.writableEnded) {
        res.end()
      }
    })
  } catch (err) {
    if (err.response) {
      console.error(`[上游 API 错误] 状态码: ${err.response.status}`)
      return res.status(err.response.status).json({
        error: `SiliconFlow API 错误 (${err.response.status})`,
      })
    }
    if (err.code === 'ECONNRESET') {
      console.error('[连接重置] 客户端或上游断开连接')
      if (!res.headersSent) {
        return res.status(502).json({ error: '连接被重置' })
      }
      return
    }
    console.error(`[代理错误] ${err.message}`)
    if (!res.headersSent) {
      res.status(500).json({ error: '代理服务器内部错误', detail: err.message })
    }
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`✅ 代理服务器已启动: http://localhost:${PORT}`)
  console.log(`   转发目标: https://api.siliconflow.cn/v1/chat/completions`)
})
