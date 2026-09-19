import React from "react"

export function Field({ label, children, hint, className = "", required }) {
  return (
    <label className={`field ${className}`}>
      {label && (
        <span className="field-label">
          {label}
          {required && <em>*</em>}
        </span>
      )}
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}

export function Input(props) {
  return <input className="input" {...props} />
}

export function Select({ children, ...props }) {
  return (
    <span className="select-wrap">
      <select className="input select-input" {...props}>
        {children}
      </select>
    </span>
  )
}

export function TextArea(props) {
  return <textarea className="input textarea" {...props} />
}

export default Field