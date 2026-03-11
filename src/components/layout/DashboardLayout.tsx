import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useSidebarStore } from "@/stores/sidebarStore"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const isOpen = useSidebarStore((s) => s.isOpen)

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <Header />
      <main
        className={cn(
          "transition-all duration-300 p-6",
          isOpen ? "ml-64" : "ml-[70px]"
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
