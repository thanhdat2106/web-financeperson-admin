import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>()(
  devtools(
    (set) => ({
      toasts: [],

      addToast: (toast) => {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
        set(
          (state) => ({ toasts: [...state.toasts, { ...toast, id }] }),
          false,
          "toast/add"
        )
        setTimeout(() => {
          set(
            (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
            false,
            "toast/autoRemove"
          )
        }, 4000)
      },

      removeToast: (id) =>
        set(
          (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
          false,
          "toast/remove"
        ),
    }),
    { name: "ToastStore" }
  )
)

export function toast(type: ToastType, title: string, message?: string) {
  useToastStore.getState().addToast({ type, title, message })
}
