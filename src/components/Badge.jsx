export function Badge({ children, tone = "neutral", dot = true }) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <i />}
      {children}
    </span>
  )
}

export function StatusPill({ status }) {
  const normalized = String(status || "").toLowerCase()
  const tone =
    normalized === "excellent" || normalized === "completed" || normalized === "present"
      ? "success"
      : normalized === "good" || normalized === "upcoming" || normalized === "online" || normalized === "late"
      ? "primary"
      : normalized === "attention" || normalized === "this week" || normalized === "warning"
      ? "warning"
      : normalized === "at risk" || normalized === "absent" || normalized === "fail"
      ? "danger"
      : "neutral"

  return <Badge tone={tone}>{status}</Badge>
}

export default Badge