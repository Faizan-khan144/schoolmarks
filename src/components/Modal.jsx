import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export function Modal({ open, onClose, title, eyebrow, children, footer, size = "md", labelledBy }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    dialogRef.current?.focus()

    const onKeyDown = event => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`modal modal-${size}`}
        tabIndex={-1}
        onMouseDown={event => event.stopPropagation()}
      >
        {(title || eyebrow) && (
          <div className="modal-head">
            <div>
              {eyebrow && <span className="modal-eyebrow">{eyebrow}</span>}
              {title && <h3 id={labelledBy}>{title}</h3>}
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close dialog">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  )
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Delete", danger = true }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      eyebrow="CONFIRM ACTION"
      size="sm"
    >
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <button className="button button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className={`button ${danger ? "button-danger" : "button-primary"}`}
          onClick={onConfirm}
          autoFocus
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default Modal