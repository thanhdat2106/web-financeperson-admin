import { create } from "zustand"
import { devtools } from "zustand/middleware"

type Theme = "light" | "dark" | "system"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  initialize: () => void
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (theme === "dark" || (theme === "system" && systemDark)) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    (set) => ({
      theme: "light",

      setTheme: (theme: Theme) => {
        localStorage.setItem("theme", theme)
        applyTheme(theme)
        set({ theme }, false, "theme/setTheme")
      },

      initialize: () => {
        const stored = localStorage.getItem("theme") as Theme | null
        const theme = stored ?? "light"
        applyTheme(theme)
        set({ theme }, false, "theme/initialize")
      },
    }),
    { name: "ThemeStore" }
  )
)
