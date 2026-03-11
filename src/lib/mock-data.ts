import type {
  Account,
  Transaction,
  Budget,
  Bill,
  SavingsGoal,
  DashboardMetrics,
  ChartData,
  CategoryData,
  Notification,
  AuditEntry,
  AnalyticsData,
} from "@/types"

export const EXPENSE_CATEGORIES = [
  "Housing",
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Education",
  "Insurance",
  "Personal Care",
  "Travel",
  "Subscriptions",
  "Gifts & Donations",
  "Other",
] as const

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Rental Income",
  "Side Business",
  "Gifts",
  "Refunds",
  "Other Income",
] as const

export const mockAccounts: Account[] = [
  { id: "acc1", name: "Main Checking", type: "checking", balance: 8450.32, institution: "Chase Bank", lastFour: "4521", color: "#6366f1", isActive: true },
  { id: "acc2", name: "High-Yield Savings", type: "savings", balance: 25680.00, institution: "Marcus by Goldman", lastFour: "7834", color: "#10b981", isActive: true },
  { id: "acc3", name: "Credit Card", type: "credit", balance: -1245.67, institution: "Amex", lastFour: "3019", color: "#f43f5e", isActive: true },
  { id: "acc4", name: "Investment Portfolio", type: "investment", balance: 42350.80, institution: "Fidelity", lastFour: "9012", color: "#8b5cf6", isActive: true },
  { id: "acc5", name: "Digital Wallet", type: "wallet", balance: 320.50, institution: "PayPal", lastFour: "6677", color: "#06b6d4", isActive: true },
  { id: "acc6", name: "Emergency Fund", type: "savings", balance: 15000.00, institution: "Ally Bank", lastFour: "2244", color: "#eab308", isActive: true },
]

export const mockTransactions: Transaction[] = [
  { id: "t1", accountId: "acc1", accountName: "Main Checking", type: "income", category: "Salary", amount: 5200, description: "Monthly salary - March", date: "2025-03-01", status: "completed" },
  { id: "t2", accountId: "acc1", accountName: "Main Checking", type: "expense", category: "Housing", amount: 1650, description: "Rent payment", date: "2025-03-01", status: "completed" },
  { id: "t3", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Food & Dining", amount: 87.50, description: "Weekly groceries - Whole Foods", date: "2025-03-02", status: "completed" },
  { id: "t4", accountId: "acc1", accountName: "Main Checking", type: "expense", category: "Utilities", amount: 142.30, description: "Electric & gas bill", date: "2025-03-03", status: "completed" },
  { id: "t5", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Subscriptions", amount: 15.99, description: "Netflix subscription", date: "2025-03-03", status: "completed" },
  { id: "t6", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Transportation", amount: 45.00, description: "Gas station fill-up", date: "2025-03-04", status: "completed" },
  { id: "t7", accountId: "acc1", accountName: "Main Checking", type: "income", category: "Freelance", amount: 1200, description: "Web design project", date: "2025-03-05", status: "completed" },
  { id: "t8", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Entertainment", amount: 32.00, description: "Movie tickets + popcorn", date: "2025-03-05", status: "completed" },
  { id: "t9", accountId: "acc1", accountName: "Main Checking", type: "expense", category: "Healthcare", amount: 75.00, description: "Doctor visit copay", date: "2025-03-06", status: "completed" },
  { id: "t10", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Shopping", amount: 156.80, description: "New running shoes - Nike", date: "2025-03-06", status: "pending" },
  { id: "t11", accountId: "acc1", accountName: "Main Checking", type: "transfer", category: "Transfer", amount: 500, description: "Transfer to Emergency Fund", date: "2025-03-07", status: "completed" },
  { id: "t12", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Food & Dining", amount: 62.40, description: "Dinner at Italian restaurant", date: "2025-03-07", status: "completed" },
  { id: "t13", accountId: "acc4", accountName: "Investment Portfolio", type: "income", category: "Investments", amount: 385.20, description: "Dividend payment - VTSAX", date: "2025-03-08", status: "completed" },
  { id: "t14", accountId: "acc5", accountName: "Digital Wallet", type: "income", category: "Refunds", amount: 29.99, description: "Amazon return refund", date: "2025-03-08", status: "completed" },
  { id: "t15", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Personal Care", amount: 48.00, description: "Haircut & styling", date: "2025-03-09", status: "completed" },
  { id: "t16", accountId: "acc1", accountName: "Main Checking", type: "expense", category: "Insurance", amount: 195.00, description: "Car insurance premium", date: "2025-03-09", status: "completed" },
  { id: "t17", accountId: "acc3", accountName: "Credit Card", type: "expense", category: "Education", amount: 49.99, description: "Udemy course - React Advanced", date: "2025-03-10", status: "pending" },
  { id: "t18", accountId: "acc1", accountName: "Main Checking", type: "expense", category: "Subscriptions", amount: 10.99, description: "Spotify Premium", date: "2025-03-10", status: "completed" },
]

export const mockBudgets: Budget[] = [
  { id: "b1", category: "Housing", icon: "🏠", allocated: 1700, spent: 1650, period: "2025-03", color: "#6366f1" },
  { id: "b2", category: "Food & Dining", icon: "🍽️", allocated: 600, spent: 449.90, period: "2025-03", color: "#f43f5e" },
  { id: "b3", category: "Transportation", icon: "🚗", allocated: 200, spent: 45, period: "2025-03", color: "#06b6d4" },
  { id: "b4", category: "Utilities", icon: "💡", allocated: 200, spent: 142.30, period: "2025-03", color: "#eab308" },
  { id: "b5", category: "Entertainment", icon: "🎬", allocated: 150, spent: 32, period: "2025-03", color: "#8b5cf6" },
  { id: "b6", category: "Shopping", icon: "🛍️", allocated: 200, spent: 156.80, period: "2025-03", color: "#f97316" },
  { id: "b7", category: "Healthcare", icon: "🏥", allocated: 150, spent: 75, period: "2025-03", color: "#10b981" },
  { id: "b8", category: "Subscriptions", icon: "📱", allocated: 80, spent: 26.98, period: "2025-03", color: "#ec4899" },
  { id: "b9", category: "Personal Care", icon: "💅", allocated: 100, spent: 48, period: "2025-03", color: "#14b8a6" },
  { id: "b10", category: "Education", icon: "📚", allocated: 100, spent: 49.99, period: "2025-03", color: "#a855f7" },
]

export const mockBills: Bill[] = [
  { id: "bill1", name: "Rent", category: "Housing", amount: 1650, frequency: "monthly", nextDueDate: "2025-04-01", status: "active", autopay: true, lastPaidDate: "2025-03-01" },
  { id: "bill2", name: "Netflix", category: "Subscriptions", amount: 15.99, frequency: "monthly", nextDueDate: "2025-04-03", status: "active", autopay: true, lastPaidDate: "2025-03-03" },
  { id: "bill3", name: "Spotify", category: "Subscriptions", amount: 10.99, frequency: "monthly", nextDueDate: "2025-04-10", status: "active", autopay: true, lastPaidDate: "2025-03-10" },
  { id: "bill4", name: "Car Insurance", category: "Insurance", amount: 195, frequency: "monthly", nextDueDate: "2025-04-09", status: "active", autopay: false, lastPaidDate: "2025-03-09" },
  { id: "bill5", name: "Electric & Gas", category: "Utilities", amount: 142.30, frequency: "monthly", nextDueDate: "2025-04-03", status: "active", autopay: false, lastPaidDate: "2025-03-03" },
  { id: "bill6", name: "Internet", category: "Utilities", amount: 79.99, frequency: "monthly", nextDueDate: "2025-03-15", status: "active", autopay: true },
  { id: "bill7", name: "Gym Membership", category: "Personal Care", amount: 49.99, frequency: "monthly", nextDueDate: "2025-04-01", status: "active", autopay: true, lastPaidDate: "2025-03-01" },
  { id: "bill8", name: "Cloud Storage", category: "Subscriptions", amount: 2.99, frequency: "monthly", nextDueDate: "2025-04-05", status: "active", autopay: true },
  { id: "bill9", name: "Amazon Prime", category: "Subscriptions", amount: 139, frequency: "yearly", nextDueDate: "2025-09-15", status: "active", autopay: true },
  { id: "bill10", name: "Adobe CC", category: "Subscriptions", amount: 54.99, frequency: "monthly", nextDueDate: "2025-03-20", status: "paused", autopay: false },
]

export const mockSavingsGoals: SavingsGoal[] = [
  { id: "sg1", name: "Emergency Fund", targetAmount: 20000, currentAmount: 15000, deadline: "2025-06-30", icon: "🛟", color: "#f43f5e" },
  { id: "sg2", name: "Vacation to Japan", targetAmount: 5000, currentAmount: 2800, deadline: "2025-12-01", icon: "✈️", color: "#6366f1" },
  { id: "sg3", name: "New Laptop", targetAmount: 2000, currentAmount: 1450, deadline: "2025-05-01", icon: "💻", color: "#06b6d4" },
  { id: "sg4", name: "Down Payment", targetAmount: 50000, currentAmount: 25680, deadline: "2026-12-31", icon: "🏠", color: "#10b981" },
  { id: "sg5", name: "Wedding Fund", targetAmount: 15000, currentAmount: 4200, deadline: "2026-06-15", icon: "💒", color: "#ec4899" },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalBalance: 90555.95,
  monthlyIncome: 6815.19,
  monthlyExpenses: 2675.97,
  savingsRate: 60.7,
  balanceChange: 4.2,
  incomeChange: 8.5,
  expenseChange: -5.3,
  savingsChange: 12.1,
}

export const mockChartData: ChartData[] = [
  { month: "Jan", income: 5200, expenses: 3100 },
  { month: "Feb", income: 5850, expenses: 2900 },
  { month: "Mar", income: 6815, expenses: 2676 },
  { month: "Apr", income: 5400, expenses: 3200 },
  { month: "May", income: 5900, expenses: 2800 },
  { month: "Jun", income: 6200, expenses: 3400 },
  { month: "Jul", income: 5600, expenses: 3000 },
  { month: "Aug", income: 7100, expenses: 3100 },
  { month: "Sep", income: 5800, expenses: 2950 },
  { month: "Oct", income: 6400, expenses: 3300 },
  { month: "Nov", income: 5500, expenses: 3600 },
  { month: "Dec", income: 7800, expenses: 4200 },
]

export const mockCategoryData: CategoryData[] = [
  { name: "Housing", value: 1650, color: "#6366f1" },
  { name: "Food & Dining", value: 449.9, color: "#f43f5e" },
  { name: "Transportation", value: 45, color: "#06b6d4" },
  { name: "Utilities", value: 142.3, color: "#eab308" },
  { name: "Shopping", value: 156.8, color: "#f97316" },
  { name: "Healthcare", value: 75, color: "#10b981" },
  { name: "Entertainment", value: 32, color: "#8b5cf6" },
  { name: "Subscriptions", value: 26.98, color: "#ec4899" },
  { name: "Insurance", value: 195, color: "#94a3b8" },
]

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Bill due soon", message: "Internet bill of $79.99 is due in 5 days", type: "warning", read: false, createdAt: "2025-03-10T14:30:00" },
  { id: "n2", title: "Salary received", message: "Monthly salary of $5,200 has been deposited", type: "success", read: false, createdAt: "2025-03-10T09:00:00" },
  { id: "n3", title: "Budget alert", message: "Food & Dining budget is at 75% - $150.10 remaining", type: "warning", read: false, createdAt: "2025-03-09T18:00:00" },
  { id: "n4", title: "Savings milestone", message: "Emergency Fund reached 75% of your goal!", type: "success", read: true, createdAt: "2025-03-08T12:00:00" },
  { id: "n5", title: "Unusual spending", message: "Shopping spending is 20% higher than last month", type: "info", read: true, createdAt: "2025-03-07T15:30:00" },
  { id: "n6", title: "Transaction failed", message: "Running shoes purchase of $156.80 is still pending", type: "error", read: true, createdAt: "2025-03-06T10:00:00" },
  { id: "n7", title: "Monthly report", message: "Your February spending report is ready to view", type: "info", read: true, createdAt: "2025-03-05T08:00:00" },
  { id: "n8", title: "Credit card payment", message: "Your credit card statement of $1,245.67 is due March 25", type: "warning", read: true, createdAt: "2025-03-04T09:00:00" },
]

export const mockAuditLog: AuditEntry[] = [
  { id: "a1", action: "TRANSACTION", resource: "Checking", details: "Added expense: Rent payment - $1,650", timestamp: "2025-03-10T14:30:00" },
  { id: "a2", action: "BUDGET", resource: "Food & Dining", details: "Updated budget allocation to $600", timestamp: "2025-03-10T12:00:00" },
  { id: "a3", action: "GOAL", resource: "Emergency Fund", details: "Added $500 to savings goal", timestamp: "2025-03-09T16:00:00" },
  { id: "a4", action: "BILL", resource: "Netflix", details: "Auto-paid monthly subscription $15.99", timestamp: "2025-03-09T09:00:00" },
  { id: "a5", action: "ACCOUNT", resource: "Credit Card", details: "Synced latest transactions", timestamp: "2025-03-08T11:30:00" },
  { id: "a6", action: "EXPORT", resource: "Reports", details: "Exported February spending report as CSV", timestamp: "2025-03-07T15:00:00" },
  { id: "a7", action: "SETTINGS", resource: "Profile", details: "Updated notification preferences", timestamp: "2025-03-06T10:00:00" },
  { id: "a8", action: "TRANSACTION", resource: "Credit Card", details: "Categorized 5 uncategorized transactions", timestamp: "2025-03-05T14:00:00" },
]

export const mockAnalyticsData: AnalyticsData = {
  spendingTrend: [
    { month: "Jan", amount: 3100 }, { month: "Feb", amount: 2900 }, { month: "Mar", amount: 2676 },
    { month: "Apr", amount: 3200 }, { month: "May", amount: 2800 }, { month: "Jun", amount: 3400 },
    { month: "Jul", amount: 3000 }, { month: "Aug", amount: 3100 }, { month: "Sep", amount: 2950 },
    { month: "Oct", amount: 3300 }, { month: "Nov", amount: 3600 }, { month: "Dec", amount: 4200 },
  ],
  incomeVsExpenses: [
    { month: "Jan", income: 5200, expenses: 3100 }, { month: "Feb", income: 5850, expenses: 2900 },
    { month: "Mar", income: 6815, expenses: 2676 }, { month: "Apr", income: 5400, expenses: 3200 },
    { month: "May", income: 5900, expenses: 2800 }, { month: "Jun", income: 6200, expenses: 3400 },
  ],
  topCategories: [
    { name: "Housing", value: 1650, color: "#6366f1" },
    { name: "Food & Dining", value: 449.9, color: "#f43f5e" },
    { name: "Insurance", value: 195, color: "#94a3b8" },
    { name: "Shopping", value: 156.8, color: "#f97316" },
    { name: "Utilities", value: 142.3, color: "#eab308" },
  ],
  weeklySpending: [
    { day: "Mon", amount: 45 }, { day: "Tue", amount: 87.5 }, { day: "Wed", amount: 157.29 },
    { day: "Thu", amount: 32 }, { day: "Fri", amount: 137 }, { day: "Sat", amount: 204.8 },
    { day: "Sun", amount: 62.4 },
  ],
  savingsProgress: [
    { month: "Jan", saved: 2100, target: 2500 }, { month: "Feb", saved: 2950, target: 2500 },
    { month: "Mar", saved: 4139, target: 2500 }, { month: "Apr", saved: 2200, target: 2500 },
    { month: "May", saved: 3100, target: 2500 }, { month: "Jun", saved: 2800, target: 2500 },
  ],
  monthlyComparison: [
    { month: "Jan", current: 3100, previous: 3500 }, { month: "Feb", current: 2900, previous: 3200 },
    { month: "Mar", current: 2676, previous: 3100 }, { month: "Apr", current: 3200, previous: 3400 },
    { month: "May", current: 2800, previous: 3000 }, { month: "Jun", current: 3400, previous: 3600 },
  ],
}
