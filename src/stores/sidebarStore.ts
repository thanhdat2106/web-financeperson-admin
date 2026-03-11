import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const useSidebarStore = create<SidebarState>()(
  devtools(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen }), false, "sidebar/toggle"),
      open: () => set({ isOpen: true }, false, "sidebar/open"),
      close: () => set({ isOpen: false }, false, "sidebar/close"),
    }),
    { name: "SidebarStore" }
  )
)
