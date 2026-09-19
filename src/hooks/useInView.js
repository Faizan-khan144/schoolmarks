import { useEffect, useRef, useState } from "react"

export function useInView({ threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries

        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}

export function useCountUp(target, { duration = 1200, decimals = 0, start = false } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const numericTarget = Number(target) || 0
    if (numericTarget <= 0) {
      setValue(0)
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setValue(numericTarget)
      return
    }

    let frame
    const startTime = performance.now()
    const from = 0

    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((from + (numericTarget - from) * eased).toFixed(decimals)))

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [target, duration, decimals, start])

  return value
}