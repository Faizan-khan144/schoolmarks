export function getInitials(name = "", limit = 2) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .join("")
    .slice(0, limit)
    .toUpperCase()
}

export function Avatar({ name, color, size = 34, className = "" }) {
  return (
    <span
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: color || "var(--primary-soft)",
        color: color ? "#ffffff" : "var(--green-800)"
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}

export default Avatar