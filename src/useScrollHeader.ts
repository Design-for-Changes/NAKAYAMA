import { useEffect, useRef } from 'react'

export function useScrollHeader(page: string) {
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    let previous = Math.max(0, window.scrollY)
    let distance = 0
    let frame = 0
    const element = header.current
    if (element) element.dataset.hidden = 'false'
    const update = () => {
      frame = 0
      const current = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - innerHeight))
      const delta = current - previous
      previous = current
      if (!element) return
      if (current < element.offsetHeight || document.querySelector('dialog[open]') || element.contains(document.activeElement)) {
        element.dataset.hidden = 'false'
        distance = 0
        return
      }
      if (delta === 0) return
      distance = Math.sign(distance) === Math.sign(delta) ? distance + delta : delta
      if (Math.abs(distance) >= 8) {
        element.dataset.hidden = distance > 0 ? 'true' : 'false'
        distance = 0
      }
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame) }
  }, [page])
  return header
}
