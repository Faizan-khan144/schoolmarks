import React from "react"
import { CountUp } from "./Reveal"

export function StatCard({ eyebrow, value, suffix, detail, trend, trendType = "up", icon: Icon, animate = false }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-eyebrow">{eyebrow}</span>
        <span className="stat-card-icon">
          <Icon size={18} strokeWidth={1.8} />
        </span>
      </div>

      <div className="stat-card-value">
        {animate ? (
          <CountUp value={Number(value) || 0} suffix={suffix} />
        ) : (
          <>
            {value}
            {suffix}
          </>
        )}
      </div>

      <div className="stat-card-foot">
        {trend && (
          <span className={`stat-trend ${trendType === "down" ? "down" : ""}`}>
            {trend}
          </span>
        )}
        {detail && <span className="stat-card-detail">{detail}</span>}
      </div>
    </article>
  )
}

export default StatCard