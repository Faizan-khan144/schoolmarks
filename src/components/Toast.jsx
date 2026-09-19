import { createContext, useContext, useCallback, useMemo, useRef, useState } from "react"
import { Check, CircleAlert, Info, X } from "lucide-react"

const ToastContext = createContext(null)

const variants = {
  success: { icon: Check, label: "Success" },
  error: { icon: CircleAlert, label: "Error" },
  info: { icon: Info, label: "Notice" }
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const remove = useCallback(id => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  const push = useCallback(
    (message, variant = "success", label) => {
      idRef.current += 1
      const id = idRef.current

      setToasts(current => [...current, { id, message, variant, label }])

      window.setTimeout(() => remove(id), 4200)
      return id
    },
    [remove]
  )

  const toast = useMemo(
    () => ({
      success: (message, label) => push(message, "success", label),
      error: (message, label) => push(message, "error", label),
      info: (message, label) => push(message, "info", label)
    }),
    [push]
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div className="toast-stack" aria-live="polite">
        {toasts.map(toastItem => {
          const variant = variants[toastItem.variant] || variants.info
          const Icon = variant.icon

          return (
            <div className={`toast toast-${toastItem.variant}`} key={toastItem.id}>
              <div className="toast-icon">
                <Icon size={16} strokeWidth={2.2} />
              </div>
              <div className="toast-copy">
                <strong>{toastItem.label || variant.label}</strong>
                <span>{toastItem.message}</span>
              </div>
              <button className="toast-close" onClick={() => remove(toastItem.id)} aria-label="Dismiss">
                <X size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastProvider