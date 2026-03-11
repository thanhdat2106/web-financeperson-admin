import { useState, useMemo } from "react"
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
} from "lucide-react"
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions"
import { useAccounts } from "@/hooks/useAccounts"
import type { Transaction } from "@/types"
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TxFormData = {
  accountId: string
  accountName: string
  type: "income" | "expense" | "transfer"
  category: string
  amount: string
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

const defaultForm: TxFormData = {
  accountId: "",
  accountName: "",
  type: "expense",
  category: "Food & Dining",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  status: "completed",
}

export function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions()
  const { data: accounts } = useAccounts()
  const createTx = useCreateTransaction()
  const updateTx = useUpdateTransaction()
  const deleteTx = useDeleteTransaction()

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleting, setDeleting] = useState<Transaction | null>(null)
  const [form, setForm] = useState<TxFormData>(defaultForm)

  const filtered = useMemo(() => {
    if (!transactions) return []
    return transactions.filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === "all" || tx.type === typeFilter
      const matchCategory = categoryFilter === "all" || tx.category === categoryFilter
      const matchAccount = accountFilter === "all" || tx.accountId === accountFilter
      return matchSearch && matchType && matchCategory && matchAccount
    })
  }, [transactions, search, typeFilter, categoryFilter, accountFilter])

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0)
    const expense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)
    return { income, expense, net: income - expense }
  }, [filtered])

  const allCategories = useMemo(() => [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES, "Transfer"])], [])

  const openCreate = () => { setEditing(null); setForm(defaultForm); setDialogOpen(true) }
  const openEdit = (tx: Transaction) => {
    setEditing(tx)
    setForm({ accountId: tx.accountId, accountName: tx.accountName, type: tx.type, category: tx.category, amount: String(tx.amount), description: tx.description, date: tx.date, status: tx.status })
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const account = accounts?.find((a) => a.id === form.accountId)
    const data = { ...form, amount: parseFloat(form.amount), accountName: account?.name ?? form.accountName }
    if (editing) { await updateTx.mutateAsync({ id: editing.id, data }) }
    else { await createTx.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (deleting) { await deleteTx.mutateAsync(deleting.id); setDeleteOpen(false) }
  }

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Track your income, expenses, and transfers</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Transaction</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Income</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(totals.income)}</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"><ArrowUpRight className="h-5 w-5 text-emerald-600" /></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Expenses</p><p className="text-2xl font-bold text-red-600">{formatCurrency(totals.expense)}</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"><ArrowDownRight className="h-5 w-5 text-red-600" /></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Net</p><p className={`text-2xl font-bold ${totals.net >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatCurrency(totals.net)}</p></div></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-6 space-y-3">
            <Tabs value={typeFilter} onValueChange={setTypeFilter}><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="income">Income</TabsTrigger><TabsTrigger value="expense">Expense</TabsTrigger><TabsTrigger value="transfer">Transfer</TabsTrigger></TabsList></Tabs>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search transactions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
              <Select value={accountFilter} onValueChange={setAccountFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Account" /></SelectTrigger><SelectContent><SelectItem value="all">All Accounts</SelectItem>{accounts?.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{allCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader><TableRow><TableHead>Description</TableHead><TableHead>Category</TableHead><TableHead>Account</TableHead><TableHead>Type</TableHead><TableHead className="hidden md:table-cell">Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No transactions found.</TableCell></TableRow>
                ) : filtered.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell><p className="font-medium">{tx.description}</p></TableCell>
                    <TableCell><Badge variant="outline">{tx.category}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.accountName}</TableCell>
                    <TableCell><div className="flex items-center gap-1.5">{tx.type === "income" ? <ArrowUpRight className="h-4 w-4 text-emerald-600" /> : tx.type === "transfer" ? <ArrowLeftRight className="h-4 w-4 text-blue-600" /> : <ArrowDownRight className="h-4 w-4 text-red-600" />}<span className="capitalize text-sm">{tx.type}</span></div></TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(tx.date)}</TableCell>
                    <TableCell className="text-right"><span className={`font-semibold ${tx.type === "income" ? "text-emerald-600" : tx.type === "transfer" ? "text-blue-600" : "text-red-600"}`}>{tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}</span></TableCell>
                    <TableCell className="text-right"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" onClick={() => openEdit(tx)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => { setDeleting(tx); setDeleteOpen(true) }}><Trash2 className="h-4 w-4" /></Button></div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Showing {filtered.length} of {transactions?.length ?? 0} transactions</div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit Transaction" : "New Transaction"}</DialogTitle><DialogDescription>{editing ? "Update transaction details" : "Record a new transaction"}</DialogDescription></DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Account</Label>
                  <Select value={form.accountId} onValueChange={(v) => setForm({ ...form, accountId: v })}><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger><SelectContent>{accounts?.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TxFormData["type"] })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem><SelectItem value="transfer">Transfer</SelectItem></SelectContent></Select></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Weekly groceries" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Amount</Label><Input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{(form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}{form.type === "transfer" && <SelectItem value="Transfer">Transfer</SelectItem>}</SelectContent></Select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Date</Label><DatePicker value={form.date} onChange={(v) => setForm({ ...form, date: v })} required /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as TxFormData["status"] })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent></Select></div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createTx.isPending || updateTx.isPending}>{(createTx.isPending || updateTx.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editing ? "Save Changes" : "Add Transaction"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Delete Transaction</DialogTitle><DialogDescription>Are you sure you want to delete "<strong>{deleting?.description}</strong>"?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteTx.isPending}>{deleteTx.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
