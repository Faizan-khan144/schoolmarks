import React, { useEffect, useId, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"

const smoothPath = points => {
  if (points.length < 2) return ""

  let d = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] || points[index]
    const current = points[index]
    const next = points[index + 1]
    const afterNext = points[index + 2] || next

    const cp1x = current.x + (next.x - previous.x) / 6
    const cp1y = current.y + (next.y - previous.y) / 6
    const cp2x = next.x - (afterNext.x - current.x) / 6
    const cp2y = next.y - (afterNext.y - current.y) / 6

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
  }

  return d
}

export function LineChart({
  data = [],
  height = 180,
  color = "var(--green-600)",
  fill = true,
  showDots = true,
  showLabels = true,
  className = "",
  strokeWidth = 2.5
}) {
  const { ref, inView } = useInView({ threshold: 0.3 })
  const gradientId = useId()
  const pathRef = useRef(null)
  const [length, setLength] = useState(0)

  const width = 620
  const paddingX = 18
  const paddingTop = 14
  const paddingBottom = showLabels ? 26 : 10

  const values = data.map(datum => Number(datum.value) || 0)
  const min = Math.min(...values, 0)
  const max = Math.max(...values, 10)
  const span = Math.max(max - min, 1)

  const points = data.map((datum, index) => ({
    x: paddingX + (index / Math.max(data.length - 1, 1)) * (width - paddingX * 2),
    y: paddingTop + (1 - (Number(datum.value) - min) / span) * (height - paddingTop - paddingBottom)
  }))

  const line = smoothPath(points)
  const area = points.length
    ? `${line} L ${points[points.length - 1].x} ${height - paddingTop} L ${points[0].x} ${height - paddingTop} Z`
    : ""

  useEffect(() => {
    if (inView && pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [inView, line])

  const labelStep = Math.ceil(data.length / 6)

  return (
    <div className={`line-chart ${className}`} ref={ref}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ height }}
        role="img"
        aria-label="Line chart"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={paddingX} y1={height / 3} x2={width - paddingX} y2={height / 3} stroke="var(--line)" strokeWidth="1" />
        <line x1={paddingX} y1={(height * 2) / 3} x2={width - paddingX} y2={(height * 2) / 3} stroke="var(--line)" strokeWidth="1" />

        {fill && area && (
          <path d={area} fill={`url(#${gradientId})`} opacity={inView ? 1 : 0} className="chart-fade" />
        )}

        <path
          ref={pathRef}
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length || 9999}
          strokeDashoffset={(inView ? 0 : length || 9999).toFixed(1)}
          style={{ transition: "stroke-dashoffset 1.2s var(--ease-out)" }}
        />

        {showDots &&
          points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={length ? 3 : 0}
              fill="var(--surface)"
              stroke={color}
              strokeWidth="2"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s var(--ease-out) ${index * 0.06}s`
              }}
            />
          ))}
      </svg>

      {showLabels && (
        <div className="line-chart-labels">
          {data.map(
            (datum, index) =>
              index % labelStep === 0 && <span key={index}>{datum.label}</span>
          )}
        </div>
      )}
    </div>
  )
}

export function Sparkline({ data = [], color = "var(--green-600)", width = 120, height = 36 }) {
  const max = Math.max(...data.map(Number), 1)
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * (width - 4) + 2
      const y = height - 2 - (Number(value) / max) * (height - 6)
      return [x, y]
    })

  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0]} ${point[1]}`).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }} className="sparkline" aria-hidden="true">
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Bars({ data = [], height = 140, color = "var(--green-600)", className = "" }) {
  const { ref, inView } = useInView({ threshold: 0.35 })

  return (
    <div className={`chart-bars ${className}`} ref={ref} style={{ height }}>
      {data.map((datum, index) => (
        <div className="chart-bar-item" key={`${datum.label}-${index}`}>
          <span className="chart-bar-value">{datum.value}</span>
          <div className="chart-bar-track">
            <i
              className={inView ? "grow" : ""}
              style={{
                height: `${datum.value || 2}%`,
                background: color,
                transition: `height 0.9s var(--ease-out) ${index * 0.05}s`
              }}
            />
          </div>
          <span className="chart-bar-label">{datum.label}</span>
        </div>
      ))}
    </div>
  )
}

export function Ring({ value = 0, size = 120, stroke = 10, color = "var(--green-600)", track = "var(--charcoal-100)", label, sub }) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const [progress, setProgress] = useState(0)

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(Math.max(Number(value) || 0, 0), 100)

  useEffect(() => {
    if (inView) {
      const timer = window.setTimeout(() => setProgress(clamped), 120)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [inView, clamped])

  return (
    <div className="ring-wrap" ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-svg">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1.2s var(--ease-out)" }}
        />
      </svg>
      <div className="ring-center">
        {label && <strong>{label}</strong>}
        {sub && <span>{sub}</span>}
      </div>
    </div>
  )
}

export function ProgressBar({ value = 0, color = "var(--green-600)", showLabel = true }) {
  const { ref, inView } = useInView({ threshold: 0.5 })

  return (
    <div className="progress" ref={ref}>
      <div className="progress-track">
        <i
          style={{
            width: `${Math.min(Number(value) || 0, 100)}%`,
            background: color,
            transition: `width 1s var(--ease-out)`
          }}
          className={inView ? "grow" : ""}
        />
      </div>
      {showLabel && <span className="progress-label">{Math.round(Number(value) || 0)}%</span>}
    </div>
  )
}

export default LineChart