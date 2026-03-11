import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Target,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { useDashboardMetrics, useChartData, useCategoryData } from "@/hooks/useDashboard"
import { useTransactions } from "@/hooks/useTransactions"
import { useSavingsGoals } from "@/hooks/useSavingsGoals"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  suffix,
}: {
  title: string
  value: string
  change: number
  icon: React.ElementType
  suffix?: string
}) {
  const isPositive = change >= 0
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}{suffix}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 text-emerald-600" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600" />
          )}
          <span className={isPositive ? "text-emerald-600" : "text-red-600"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics()
  const { data: chartData, isLoading: chartLoading } = useChartData()
  const { data: categoryData, isLoading: categoryLoading } = useCategoryData()
  const { data: transactions, isLoading: txLoading } = useTransactions()
  const { data: goals } = useSavingsGoals()

  if (metricsLoading || chartLoading || categoryLoading || txLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const recentTransactions = transactions?.slice(0, 5) ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your personal financial overview at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Balance"
          value={formatCurrency(metrics?.totalBalance ?? 0)}
          change={metrics?.balanceChange ?? 0}
          icon={Wallet}
        />
        <MetricCard
          title="Monthly Income"
          value={formatCurrency(metrics?.monthlyIncome ?? 0)}
          change={metrics?.incomeChange ?? 0}
          icon={TrendingUp}
        />
        <MetricCard
          title="Monthly Expenses"
          value={formatCurrency(metrics?.monthlyExpenses ?? 0)}
          change={metrics?.expenseChange ?? 0}
          icon={TrendingDown}
        />
        <MetricCard
          title="Savings Rate"
          value={`${metrics?.savingsRate ?? 0}`}
          change={metrics?.savingsChange ?? 0}
          icon={PiggyBank}
          suffix="%"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Your monthly cash flow this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#888", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", color: "hsl(var(--foreground))" }}
                    formatter={(value) => [formatCurrency(Number(value)), undefined]}
                  />
                  <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" name="Income" />
                  <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), undefined]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      tx.type === "income" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" :
                      tx.type === "transfer" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" :
                      "bg-red-100 text-red-700 dark:bg-red-900/30"
                    }`}>
                      {tx.type === "income" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} &middot; {formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${
                    tx.type === "income" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </div>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals?.slice(0, 4).map((goal) => {
                const pct = (goal.currentAmount / goal.targetAmount) * 100
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{goal.icon} {goal.name}</span>
                      <span className="text-muted-foreground">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: goal.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
