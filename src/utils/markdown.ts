import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  html: false,           // 禁止原始 HTML，防止 XSS
  breaks: true,          // 换行符 → <br>
  linkify: true,         // 自动识别链接
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(code, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch {
        // 高亮失败，走下面的普通 <pre>
      }
    }
    // 没有指定语言时也用 highlight.js 自动检测
    try {
      const result = hljs.highlightAuto(code)
      return (
        '<pre class="hljs"><code>' + result.value + '</code></pre>'
      )
    } catch {
      return '<pre><code>' + md.utils.escapeHtml(code) + '</code></pre>'
    }
  },
})

export function renderMarkdown(rawText: string): string {
  return md.render(rawText)
}
