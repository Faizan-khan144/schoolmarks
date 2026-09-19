import React from "react"

export function PageHeader({ eyebrow, title, description, actions, className = "" }) {
  return (
    <div className={`page-header ${className}`}>
      <div className="page-header-copy">
        {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  )
}

export default PageHeader