import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { useToastStore, type ToastType } from "@/stores/toastStore"
import { cn } from "@/lib/utils"

const config: Record<ToastType, { icon: React.ElementType; bg: string; border: string; text: string }> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-800 dark:text-emerald-200",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/50",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-200",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
  },
}

export function Toaster() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((t) => {
        const c = config[t.type]
        const Icon = c.icon
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full fade-in duration-300",
              c.bg,
              c.border
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", c.text)} />
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-semibold", c.text)}>{t.title}</p>
              {t.message && (
                <p className={cn("text-xs mt-0.5 opacity-80", c.text)}>{t.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className={cn("shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity", c.text)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
