import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet2,
  BarChart3,
  Wallet,
  FileText,
  Receipt,
  Target,
  Shield,
  Settings,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/authStore"
import { useSidebarStore } from "@/stores/sidebarStore"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navSections = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
      { icon: BarChart3, label: "Analytics", path: "/analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Building2, label: "Accounts", path: "/accounts" },
      { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
      { icon: Receipt, label: "Bills", path: "/bills" },
    ],
  },
  {
    label: "Finance",
    items: [
      { icon: Wallet, label: "Budget", path: "/budget" },
      { icon: Target, label: "Savings Goals", path: "/goals" },
      { icon: FileText, label: "Reports", path: "/reports" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Bell, label: "Notifications", path: "/notifications" },
      { icon: Shield, label: "Activity", path: "/audit" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
  },
]

export function Sidebar() {
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)
  const { isOpen, toggle } = useSidebarStore()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Wallet2 className="h-5 w-5" />
        </div>
        {isOpen && (
          <span className="text-lg font-bold tracking-tight">MyFinance</span>
        )}
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            {isOpen && (
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <Separator />

      <div className="p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border shadow-md"
        onClick={toggle}
      >
        {isOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>
    </aside>
  )
}
