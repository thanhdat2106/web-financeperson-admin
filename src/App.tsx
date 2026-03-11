import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useAuthStore } from "@/stores/authStore"
import { useThemeStore } from "@/stores/themeStore"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { LoginPage } from "@/pages/LoginPage"
import { RegisterPage } from "@/pages/RegisterPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { AccountsPage } from "@/pages/AccountsPage"
import { TransactionsPage } from "@/pages/TransactionsPage"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { BudgetPage } from "@/pages/BudgetPage"
import { ReportsPage } from "@/pages/ReportsPage"
import { BillsPage } from "@/pages/BillsPage"
import { NotificationsPage } from "@/pages/NotificationsPage"
import { AuditPage } from "@/pages/AuditPage"
import { SavingsGoalsPage } from "@/pages/SavingsGoalsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { useEffect, type ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

function AppRoutes() {
  const initAuth = useAuthStore((s) => s.initialize)
  const initTheme = useThemeStore((s) => s.initialize)

  useEffect(() => {
    initAuth()
    initTheme()
  }, [initAuth, initTheme])

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="goals" element={<SavingsGoalsPage />} />
        <Route path="bills" element={<BillsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
