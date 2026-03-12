import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { type ColumnDef } from "@tanstack/react-table"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DataTable, SortableHeader } from "@/components/ui/data-table"

type TxFormValues = {
  accountId: string
  type: "income" | "expense" | "transfer"
  category: string
  amount: string
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

const defaultValues: TxFormValues = {
  accountId: "",
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

  const form = useForm<TxFormValues>({ defaultValues })
  const watchType = form.watch("type")

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

  const openCreate = () => {
    setEditing(null)
    form.reset(defaultValues)
    setDialogOpen(true)
  }

  const openEdit = (tx: Transaction) => {
    setEditing(tx)
    form.reset({
      accountId: tx.accountId, type: tx.type, category: tx.category,
      amount: String(tx.amount), description: tx.description, date: tx.date, status: tx.status,
    })
    setDialogOpen(true)
  }

  const onSubmit = async (values: TxFormValues) => {
    const account = accounts?.find((a) => a.id === values.accountId)
    const data = { ...values, amount: parseFloat(values.amount), accountName: account?.name ?? "" }
    if (editing) { await updateTx.mutateAsync({ id: editing.id, data }) }
    else { await createTx.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (deleting) { await deleteTx.mutateAsync(deleting.id); setDeleteOpen(false) }
  }

  const columns: ColumnDef<Transaction>[] = useMemo(() => [
    {
      accessorKey: "description",
      header: ({ column }) => <SortableHeader column={column}>Description</SortableHeader>,
      cell: ({ row }) => <p className="font-medium">{row.getValue("description")}</p>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
      cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
    },
    {
      accessorKey: "accountName",
      header: "Account",
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("accountName")}</span>,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <SortableHeader column={column}>Type</SortableHeader>,
      cell: ({ row }) => {
        const type = row.getValue("type") as Transaction["type"]
        return (
          <div className="flex items-center gap-1.5">
            {type === "income" ? <ArrowUpRight className="h-4 w-4 text-emerald-600" /> :
             type === "transfer" ? <ArrowLeftRight className="h-4 w-4 text-blue-600" /> :
             <ArrowDownRight className="h-4 w-4 text-red-600" />}
            <span className="capitalize text-sm">{type}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
      cell: ({ row }) => formatDate(row.getValue("date")),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column}>Amount</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.type
        const amount = row.getValue("amount") as number
        return (
          <div className="text-right">
            <span className={`font-semibold ${type === "income" ? "text-emerald-600" : type === "transfer" ? "text-blue-600" : "text-red-600"}`}>
              {type === "income" ? "+" : "-"}{formatCurrency(amount)}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const tx = row.original
        return (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" onClick={() => openEdit(tx)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => { setDeleting(tx); setDeleteOpen(true) }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
      enableSorting: false,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

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

          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No transactions found."
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit Transaction" : "New Transaction"}</DialogTitle><DialogDescription>{editing ? "Update transaction details" : "Record a new transaction"}</DialogDescription></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="accountId" rules={{ required: "Account is required" }} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger><SelectContent>{accounts?.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem><SelectItem value="transfer">Transfer</SelectItem></SelectContent></Select>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" rules={{ required: "Description is required" }} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Input placeholder="e.g. Weekly groceries" {...field} />
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="amount" rules={{ required: "Amount is required", validate: (v) => parseFloat(v) > 0 || "Amount must be positive" }} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <Input type="number" min="0" step="0.01" {...field} />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{(watchType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}{watchType === "transfer" && <SelectItem value="Transfer">Transfer</SelectItem>}</SelectContent></Select>
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="date" rules={{ required: "Date is required" }} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <DatePicker value={field.value} onChange={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent></Select>
                    </FormItem>
                  )} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createTx.isPending || updateTx.isPending}>{(createTx.isPending || updateTx.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editing ? "Save Changes" : "Add Transaction"}</Button>
              </DialogFooter>
            </form>
          </Form>
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
