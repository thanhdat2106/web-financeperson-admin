import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { Plus, Pencil, Trash2, Loader2, Search, Calendar, CreditCard, Zap } from "lucide-react"
import { useBills, useCreateBill, useUpdateBill, useDeleteBill } from "@/hooks/useBills"
import type { Bill } from "@/types"
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

const BILL_CATEGORIES = ["Housing", "Utilities", "Insurance", "Subscriptions", "Personal Care", "Education", "Transportation", "Other"]

const statusVariants: Record<Bill["status"], "success" | "warning" | "destructive"> = {
  active: "success", paused: "warning", cancelled: "destructive",
}

type BillFormValues = {
  name: string; category: string; amount: string; frequency: Bill["frequency"]; nextDueDate: string; status: Bill["status"]; autopay: boolean
}
const defaultValues: BillFormValues = { name: "", category: "Subscriptions", amount: "", frequency: "monthly", nextDueDate: "", status: "active", autopay: false }

export function BillsPage() {
  const { data: bills, isLoading } = useBills()
  const createBill = useCreateBill()
  const updateBill = useUpdateBill()
  const deleteBill = useDeleteBill()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Bill | null>(null)
  const [deleting, setDeleting] = useState<Bill | null>(null)

  const form = useForm<BillFormValues>({ defaultValues })

  const filtered = useMemo(() => {
    if (!bills) return []
    return bills.filter((b) => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "all" || b.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [bills, search, statusFilter])

  const totals = useMemo(() => {
    if (!bills) return { monthly: 0, yearly: 0, upcoming: 0 }
    const active = bills.filter((b) => b.status === "active")
    const monthly = active.reduce((s, b) => {
      if (b.frequency === "monthly") return s + b.amount
      if (b.frequency === "weekly") return s + b.amount * 4.33
      if (b.frequency === "quarterly") return s + b.amount / 3
      if (b.frequency === "yearly") return s + b.amount / 12
      return s
    }, 0)
    const upcoming = active.filter((b) => {
      const due = new Date(b.nextDueDate)
      const now = new Date()
      const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      return diff >= 0 && diff <= 7
    }).length
    return { monthly, yearly: monthly * 12, upcoming }
  }, [bills])

  const openCreate = () => { setEditing(null); form.reset(defaultValues); setDialogOpen(true) }
  const openEdit = (b: Bill) => {
    setEditing(b)
    form.reset({ name: b.name, category: b.category, amount: String(b.amount), frequency: b.frequency, nextDueDate: b.nextDueDate, status: b.status, autopay: b.autopay })
    setDialogOpen(true)
  }

  const onSubmit = async (values: BillFormValues) => {
    const data = { ...values, amount: parseFloat(values.amount) }
    if (editing) { await updateBill.mutateAsync({ id: editing.id, data }) }
    else { await createBill.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => { if (deleting) { await deleteBill.mutateAsync(deleting.id); setDeleteOpen(false) } }

  if (isLoading) { return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Bills & Subscriptions</h1><p className="text-muted-foreground">Manage your recurring payments</p></div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Bill</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Monthly Cost</p><p className="text-2xl font-bold">{formatCurrency(totals.monthly)}</p></div><CreditCard className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Yearly Cost</p><p className="text-2xl font-bold">{formatCurrency(totals.yearly)}</p></div><Calendar className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Due This Week</p><p className="text-2xl font-bold">{totals.upcoming}</p></div><Zap className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Bills</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-6 space-y-3">
            <Tabs value={statusFilter} onValueChange={setStatusFilter}><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="paused">Paused</TabsTrigger><TabsTrigger value="cancelled">Cancelled</TabsTrigger></TabsList></Tabs>
            <div className="relative max-w-md"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search bills..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-muted-foreground"><CreditCard className="h-12 w-12 mb-4 opacity-50" /><p>No bills found</p></div>
            ) : filtered.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><CreditCard className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="flex items-center gap-2"><p className="font-medium">{bill.name}</p>{bill.autopay && <Badge variant="secondary" className="text-xs">Autopay</Badge>}</div>
                    <p className="text-sm text-muted-foreground">{bill.category} &middot; {bill.frequency} &middot; Next: {formatDate(bill.nextDueDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariants[bill.status]} className="capitalize">{bill.status}</Badge>
                  <span className="font-semibold">{formatCurrency(bill.amount)}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(bill)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setDeleting(bill); setDeleteOpen(true) }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit Bill" : "Add Bill"}</DialogTitle><DialogDescription>{editing ? "Update bill details" : "Add a recurring bill or subscription"}</DialogDescription></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <FormField control={form.control} name="name" rules={{ required: "Name is required" }} render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><Input placeholder="e.g. Netflix" {...field} /><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{BILL_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="amount" rules={{ required: "Amount is required", validate: (v) => parseFloat(v) > 0 || "Amount must be positive" }} render={({ field }) => (
                    <FormItem><FormLabel>Amount</FormLabel><Input type="number" min="0" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="frequency" render={({ field }) => (
                    <FormItem><FormLabel>Frequency</FormLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="yearly">Yearly</SelectItem></SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="nextDueDate" rules={{ required: "Due date is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Next Due Date</FormLabel><DatePicker value={field.value} onChange={field.onChange} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem><FormLabel>Status</FormLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="paused">Paused</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="autopay" render={({ field }) => (
                    <FormItem className="flex items-end pb-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-gray-300" />
                        <span className="text-sm font-medium">Auto-pay enabled</span>
                      </label>
                    </FormItem>
                  )} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createBill.isPending || updateBill.isPending}>{(createBill.isPending || updateBill.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editing ? "Save" : "Add Bill"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Delete Bill</DialogTitle><DialogDescription>Remove <strong>{deleting?.name}</strong> from your bills?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteBill.isPending}>{deleteBill.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
