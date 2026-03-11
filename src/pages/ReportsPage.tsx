import { useState } from "react"
import { Download, FileSpreadsheet, Loader2, TrendingUp, DollarSign, ArrowLeftRight, Wallet } from "lucide-react"
import { useChartData } from "@/hooks/useDashboard"
import { useTransactions } from "@/hooks/useTransactions"
import { useAccounts } from "@/hooks/useAccounts"
import { useBudgets } from "@/hooks/useBudgets"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const reportTypes = [
  { id: "monthly", label: "Monthly Overview", icon: DollarSign, desc: "Income, expenses, and savings by month" },
  { id: "transactions", label: "Transaction Report", icon: ArrowLeftRight, desc: "Detailed list of all transactions" },
  { id: "networth", label: "Net Worth Report", icon: Wallet, desc: "Account balances and net worth breakdown" },
  { id: "budget", label: "Budget vs Actual", icon: TrendingUp, desc: "Compare budget allocations with spending" },
]

function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return
  const headers = Object.keys(data[0])
  const csv = [headers.join(","), ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(","))].join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("monthly")
  const [dateRange, setDateRange] = useState({ from: "2025-01-01", to: "2025-12-31" })
  const [exporting, setExporting] = useState<string | null>(null)

  const { data: chartData, isLoading: chartLoading } = useChartData()
  const { data: transactions, isLoading: txLoading } = useTransactions()
  const { data: accounts, isLoading: accLoading } = useAccounts()
  const { data: budgets, isLoading: budgetLoading } = useBudgets()

  const isLoading = chartLoading || txLoading || accLoading || budgetLoading

  const handleExport = async (format: "csv" | "pdf") => {
    setExporting(format)
    await new Promise((r) => setTimeout(r, 1000))
    if (format === "csv") {
      if (selectedReport === "monthly" && chartData) downloadCSV(chartData.map((d) => ({ ...d, savings: d.income - d.expenses })), "monthly-overview.csv")
      else if (selectedReport === "transactions" && transactions) downloadCSV(transactions as unknown as Record<string, unknown>[], "transactions.csv")
      else if (selectedReport === "networth" && accounts) downloadCSV(accounts as unknown as Record<string, unknown>[], "net-worth.csv")
      else if (selectedReport === "budget" && budgets) downloadCSV(budgets as unknown as Record<string, unknown>[], "budget-vs-actual.csv")
    } else { window.print() }
    setExporting(null)
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Reports</h1><p className="text-muted-foreground">Generate and export your financial reports</p></div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card><CardHeader><CardTitle className="text-base">Report Type</CardTitle></CardHeader><CardContent className="space-y-2">
            {reportTypes.map((r) => (
              <button key={r.id} onClick={() => setSelectedReport(r.id)} className={`flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors cursor-pointer ${selectedReport === r.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                <r.icon className="h-5 w-5 shrink-0" /><div><p className="font-medium">{r.label}</p><p className={`text-xs ${selectedReport === r.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{r.desc}</p></div>
              </button>
            ))}
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">Date Range</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="space-y-2"><Label>From</Label><Input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} /></div>
            <div className="space-y-2"><Label>To</Label><Input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} /></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">Export</CardTitle></CardHeader><CardContent className="space-y-2">
            <Button className="w-full" onClick={() => handleExport("csv")} disabled={isLoading || exporting !== null}>{exporting === "csv" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}Export as CSV</Button>
            <Button variant="outline" className="w-full" onClick={() => handleExport("pdf")} disabled={isLoading || exporting !== null}>{exporting === "pdf" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}Print / Save as PDF</Button>
          </CardContent></Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading ? <div className="flex h-[40vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
            <Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>{reportTypes.find((r) => r.id === selectedReport)?.label}</CardTitle><CardDescription>Period: {dateRange.from} to {dateRange.to}</CardDescription></div><Badge variant="secondary">Preview</Badge></div></CardHeader>
              <CardContent>
                {selectedReport === "monthly" && chartData && (
                  <div className="rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="p-3 text-left font-medium">Month</th><th className="p-3 text-right font-medium">Income</th><th className="p-3 text-right font-medium">Expenses</th><th className="p-3 text-right font-medium">Savings</th></tr></thead><tbody>{chartData.map((d) => (<tr key={d.month} className="border-b"><td className="p-3">{d.month}</td><td className="p-3 text-right text-emerald-600">{formatCurrency(d.income)}</td><td className="p-3 text-right text-red-600">{formatCurrency(d.expenses)}</td><td className="p-3 text-right font-medium">{formatCurrency(d.income - d.expenses)}</td></tr>))}</tbody></table></div>
                )}
                {selectedReport === "transactions" && transactions && (
                  <div className="rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="p-3 text-left font-medium">Date</th><th className="p-3 text-left font-medium">Description</th><th className="p-3 text-left font-medium">Category</th><th className="p-3 text-left font-medium">Account</th><th className="p-3 text-right font-medium">Amount</th></tr></thead><tbody>{transactions.map((tx) => (<tr key={tx.id} className="border-b"><td className="p-3">{tx.date}</td><td className="p-3">{tx.description}</td><td className="p-3">{tx.category}</td><td className="p-3 text-muted-foreground">{tx.accountName}</td><td className={`p-3 text-right font-medium ${tx.type === "income" ? "text-emerald-600" : "text-red-600"}`}>{tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}</td></tr>))}</tbody></table></div>
                )}
                {selectedReport === "networth" && accounts && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Total Assets</p><p className="text-xl font-bold text-emerald-600">{formatCurrency(accounts.filter((a) => a.balance >= 0).reduce((s, a) => s + a.balance, 0))}</p></div><div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Total Liabilities</p><p className="text-xl font-bold text-red-600">{formatCurrency(accounts.filter((a) => a.balance < 0).reduce((s, a) => s + Math.abs(a.balance), 0))}</p></div></div>
                    <div className="rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="p-3 text-left font-medium">Account</th><th className="p-3 text-left font-medium">Type</th><th className="p-3 text-left font-medium">Institution</th><th className="p-3 text-right font-medium">Balance</th></tr></thead><tbody>{accounts.map((a) => (<tr key={a.id} className="border-b"><td className="p-3 font-medium">{a.name}</td><td className="p-3"><Badge variant="secondary" className="capitalize text-xs">{a.type}</Badge></td><td className="p-3 text-muted-foreground">{a.institution}</td><td className={`p-3 text-right font-medium ${a.balance < 0 ? "text-red-600" : ""}`}>{formatCurrency(a.balance)}</td></tr>))}</tbody></table></div>
                  </div>
                )}
                {selectedReport === "budget" && budgets && (
                  <div className="rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="p-3 text-left font-medium">Category</th><th className="p-3 text-right font-medium">Budget</th><th className="p-3 text-right font-medium">Actual</th><th className="p-3 text-right font-medium">Difference</th><th className="p-3 text-right font-medium">Usage</th></tr></thead><tbody>{budgets.map((b) => { const diff = b.allocated - b.spent; const pct = b.allocated > 0 ? (b.spent / b.allocated * 100) : 0; return (<tr key={b.id} className="border-b"><td className="p-3">{b.icon} {b.category}</td><td className="p-3 text-right">{formatCurrency(b.allocated)}</td><td className="p-3 text-right">{formatCurrency(b.spent)}</td><td className={`p-3 text-right font-medium ${diff >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatCurrency(diff)}</td><td className={`p-3 text-right ${pct > 90 ? "text-red-600" : pct > 70 ? "text-amber-600" : "text-emerald-600"}`}>{pct.toFixed(0)}%</td></tr>)})}</tbody></table></div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
