import React from "react"
import { useInView, useCountUp } from "../hooks/useInView"

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  variant = "up",
  style
}) {
  const { ref, inView } = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}

export function CountUp({ value, decimals = 0, suffix = "", prefix = "", duration, className = "" }) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const number = useCountUp(value, { duration, decimals, start: inView })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {number.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  )
}

export default Reveal