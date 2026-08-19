import { ref, watch, nextTick, type Ref } from 'vue'

export function useAutoScroll(containerRef: Ref<HTMLElement | null>, trigger: Ref<unknown>) {
  const isNearBottom = ref(true)
  let userScrolledUp = false

  // 检查是否在底部附近
  const checkNearBottom = () => {
    const el = containerRef.value
    if (!el) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    isNearBottom.value = distance < 100
    if (isNearBottom.value) {
      userScrolledUp = false
    }
  }

  // 监听滚动事件
  const onScroll = () => {
    const el = containerRef.value
    if (!el) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    if (distance > 100) {
      userScrolledUp = true
    } else {
      userScrolledUp = false
    }
  }

  // 滚动到底部
  const scrollToBottom = (smooth = false) => {
    nextTick(() => {
      const el = containerRef.value
      if (!el) return
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? 'smooth' : 'instant',
      })
    })
  }

  // 当内容变化时，自动滚到底部
  watch(
    trigger,
    () => {
      if (!userScrolledUp) {
        scrollToBottom()
      }
    },
    { deep: true }
  )

  return { scrollToBottom, onScroll, isNearBottom }
}
