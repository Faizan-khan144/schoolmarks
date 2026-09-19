export function Logo({ dark = false, compact = false }) {
  return (
    <span className={`logo ${dark ? "logo-dark" : ""} ${compact ? "logo-compact" : ""}`}>
      <span className="logo-mark">
        <img src="/logo/schoolmarks-logo.png" alt="SchoolMarks" width="22" height="22" />
      </span>
      {!compact && <strong>SchoolMarks</strong>}
    </span>
  )
}

export default Logo