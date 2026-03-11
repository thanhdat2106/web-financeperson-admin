import { Loader2, TrendingDown, DollarSign, Calendar, PiggyBank } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts"
import { useAnalytics } from "@/hooks/useAnalytics"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()

  if (isLoading || !data) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  const avgSpending = data.spendingTrend.reduce((s, d) => s + d.amount, 0) / data.spendingTrend.length
  const totalSaved = data.savingsProgress.reduce((s, d) => s + d.saved, 0)

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Analytics</h1><p className="text-muted-foreground">Deep insights into your spending habits</p></div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Monthly Spending</CardTitle><TrendingDown className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{formatCurrency(avgSpending)}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Categories</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{data.topCategories.length}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Peak Spending Day</CardTitle><Calendar className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{data.weeklySpending.reduce((max, d) => d.amount > max.amount ? d : max, data.weeklySpending[0]).day}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Saved (6mo)</CardTitle><PiggyBank className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalSaved)}</div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Spending Trend</CardTitle><CardDescription>Monthly expenses over the year</CardDescription></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.spendingTrend}><defs><linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} /><YAxis tick={{ fill: "#888", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", color: "hsl(var(--foreground))" }} formatter={(value) => [formatCurrency(Number(value)), "Spent"]} /><Area type="monotone" dataKey="amount" stroke="#f43f5e" strokeWidth={2} fill="url(#colorSpend)" /></AreaChart></ResponsiveContainer></div></CardContent></Card>

        <Card><CardHeader><CardTitle>Top Spending Categories</CardTitle><CardDescription>Where your money goes</CardDescription></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.topCategories} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" nameKey="name">{data.topCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip formatter={(value) => [formatCurrency(Number(value)), undefined]} /><Legend /></PieChart></ResponsiveContainer></div></CardContent></Card>

        <Card><CardHeader><CardTitle>Weekly Spending Pattern</CardTitle><CardDescription>Average spending by day of week</CardDescription></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.weeklySpending}><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="day" tick={{ fill: "#888", fontSize: 12 }} /><YAxis tick={{ fill: "#888", fontSize: 12 }} /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", color: "hsl(var(--foreground))" }} formatter={(value) => [formatCurrency(Number(value)), "Spent"]} /><Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent></Card>

        <Card><CardHeader><CardTitle>Savings vs Target</CardTitle><CardDescription>Monthly savings against your goal</CardDescription></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.savingsProgress}><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} /><YAxis tick={{ fill: "#888", fontSize: 12 }} /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", color: "hsl(var(--foreground))" }} formatter={(value) => [formatCurrency(Number(value)), undefined]} /><Bar dataKey="target" name="Target" fill="#94a3b8" radius={[2, 2, 0, 0]} /><Bar dataKey="saved" name="Saved" fill="#10b981" radius={[2, 2, 0, 0]} /><Legend /></BarChart></ResponsiveContainer></div></CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Month-over-Month Comparison</CardTitle><CardDescription>Current vs previous year spending</CardDescription></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={data.monthlyComparison}><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} /><YAxis tick={{ fill: "#888", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", color: "hsl(var(--foreground))" }} formatter={(value) => [formatCurrency(Number(value)), undefined]} /><Line type="monotone" dataKey="previous" name="Last Year" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} /><Line type="monotone" dataKey="current" name="This Year" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} /><Legend /></LineChart></ResponsiveContainer></div></CardContent></Card>
    </div>
  )
}
