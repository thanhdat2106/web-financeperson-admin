export interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "credit" | "wallet" | "investment"
  balance: number
  institution: string
  lastFour: string
  color: string
  isActive: boolean
}

export interface Transaction {
  id: string
  accountId: string
  accountName: string
  type: "income" | "expense" | "transfer"
  category: string
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
  note?: string
}

export interface Budget {
  id: string
  category: string
  icon: string
  allocated: number
  spent: number
  period: string
  color: string
}

export interface Bill {
  id: string
  name: string
  category: string
  amount: number
  frequency: "weekly" | "monthly" | "quarterly" | "yearly"
  nextDueDate: string
  status: "active" | "paused" | "cancelled"
  autopay: boolean
  lastPaidDate?: string
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  icon: string
  color: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface DashboardMetrics {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  balanceChange: number
  incomeChange: number
  expenseChange: number
  savingsChange: number
}

export interface ChartData {
  month: string
  income: number
  expenses: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface AuditEntry {
  id: string
  action: string
  resource: string
  details: string
  timestamp: string
}

export interface AnalyticsData {
  spendingTrend: { month: string; amount: number }[]
  incomeVsExpenses: ChartData[]
  topCategories: CategoryData[]
  weeklySpending: { day: string; amount: number }[]
  savingsProgress: { month: string; saved: number; target: number }[]
  monthlyComparison: { month: string; current: number; previous: number }[]
}
