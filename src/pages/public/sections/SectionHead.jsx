export function SectionHead({ eyebrow, title, text, align = "center", light = false, children }) {
  return (
    <div className={`section-head ${align === "left" ? "is-left" : ""} ${light ? "is-light" : ""}`}>
      {eyebrow && (
        <span className="section-eyebrow">
          <i />
          {eyebrow}
        </span>
      )}
      {title && <h2>{title}</h2>}
      {text && <p className="section-lead">{text}</p>}
      {children}
    </div>
  )
}

export function Frame({ title = "schoolmarks.app/dashboard", children, className = "", toolbar }) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-address">{title}</span>
        {toolbar || <span className="browser-badge">Live</span>}
      </div>
      <div className="browser-body">{children}</div>
    </div>
  )
}

export function MiniNav({ items, active }) {
  return (
    <div className="mini-nav">
      {items.map(item => (
        <span key={item} className={item === active ? "active" : ""}>
          <i />
          {item}
        </span>
      ))}
    </div>
  )
}

export default SectionHead