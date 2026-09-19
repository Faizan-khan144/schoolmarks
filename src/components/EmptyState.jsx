import React from "react"

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={22} strokeWidth={1.6} />
        </div>
      )}
      <strong>{title}</strong>
      {text && <p>{text}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}

export default EmptyState