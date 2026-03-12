import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { Plus, Pencil, Trash2, Loader2, AlertTriangle } from "lucide-react"
import { useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from "@/hooks/useBudgets"
import type { Budget } from "@/types"
import { EXPENSE_CATEGORIES } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type BudgetFormValues = { category: string; icon: string; allocated: string; spent: string; period: string; color: string }
const defaultValues: BudgetFormValues = { category: "Food & Dining", icon: "🍽️", allocated: "", spent: "0", period: "2025-03", color: "#6366f1" }

export function BudgetPage() {
  const { data: budgets, isLoading } = useBudgets()
  const createBudget = useCreateBudget()
  const updateBudget = useUpdateBudget()
  const deleteBudget = useDeleteBudget()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Budget | null>(null)
  const [deleting, setDeleting] = useState<Budget | null>(null)

  const form = useForm<BudgetFormValues>({ defaultValues })

  const totals = useMemo(() => {
    if (!budgets) return { allocated: 0, spent: 0 }
    return budgets.reduce((acc, b) => ({ allocated: acc.allocated + b.allocated, spent: acc.spent + b.spent }), { allocated: 0, spent: 0 })
  }, [budgets])

  const openCreate = () => { setEditing(null); form.reset(defaultValues); setDialogOpen(true) }
  const openEdit = (b: Budget) => {
    setEditing(b)
    form.reset({ category: b.category, icon: b.icon, allocated: String(b.allocated), spent: String(b.spent), period: b.period, color: b.color })
    setDialogOpen(true)
  }

  const onSubmit = async (values: BudgetFormValues) => {
    const data = { category: values.category, icon: values.icon, allocated: parseFloat(values.allocated), spent: parseFloat(values.spent), period: values.period, color: values.color }
    if (editing) { await updateBudget.mutateAsync({ id: editing.id, data }) }
    else { await createBudget.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => { if (deleting) { await deleteBudget.mutateAsync(deleting.id); setDeleteOpen(false) } }

  if (isLoading) { return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> }

  const overallPct = totals.allocated > 0 ? (totals.spent / totals.allocated) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Budget</h1><p className="text-muted-foreground">Plan and track your monthly spending</p></div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Budget</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Budget</p><p className="text-2xl font-bold">{formatCurrency(totals.allocated)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Spent</p><p className="text-2xl font-bold">{formatCurrency(totals.spent)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Remaining</p><p className={`text-2xl font-bold ${totals.allocated - totals.spent >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatCurrency(totals.allocated - totals.spent)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Overall Usage</p><p className={`text-2xl font-bold ${overallPct > 90 ? "text-red-600" : overallPct > 70 ? "text-amber-600" : "text-emerald-600"}`}>{overallPct.toFixed(0)}%</p></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {budgets?.map((budget) => {
          const pct = budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0
          const isOver = pct > 100
          const isWarning = pct >= 80 && pct <= 100
          return (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{budget.icon}</span>
                  <div><CardTitle className="text-base">{budget.category}</CardTitle><CardDescription>{budget.period}</CardDescription></div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(budget)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setDeleting(budget); setDeleteOpen(true) }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}</span>
                  <span className={`font-medium ${isOver ? "text-red-600" : isWarning ? "text-amber-600" : "text-emerald-600"}`}>{pct.toFixed(0)}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: isOver ? "#ef4444" : isWarning ? "#f59e0b" : budget.color }} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Remaining: {formatCurrency(Math.max(budget.allocated - budget.spent, 0))}</span>
                  {isWarning && !isOver && <span className="flex items-center gap-1 text-amber-600"><AlertTriangle className="h-3 w-3" /> Near limit</span>}
                  {isOver && <span className="flex items-center gap-1 text-red-600"><AlertTriangle className="h-3 w-3" /> Over budget</span>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit Budget" : "New Budget"}</DialogTitle><DialogDescription>{editing ? "Update budget allocation" : "Set a new spending budget"}</DialogDescription></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="col-span-2"><FormLabel>Category</FormLabel><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{EXPENSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="icon" render={({ field }) => (
                    <FormItem><FormLabel>Icon</FormLabel><Input placeholder="🍽️" {...field} /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="allocated" rules={{ required: "Budget amount is required", validate: (v) => parseFloat(v) > 0 || "Must be positive" }} render={({ field }) => (
                    <FormItem><FormLabel>Budget Amount</FormLabel><Input type="number" min="0" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="spent" rules={{ required: "Spent amount is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Spent So Far</FormLabel><Input type="number" min="0" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="period" rules={{ required: "Period is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Period (YYYY-MM)</FormLabel><Input {...field} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color</FormLabel><Input type="color" {...field} /></FormItem>
                  )} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createBudget.isPending || updateBudget.isPending}>{(createBudget.isPending || updateBudget.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editing ? "Save" : "Create"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Delete Budget</DialogTitle><DialogDescription>Remove the <strong>{deleting?.category}</strong> budget?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteBudget.isPending}>{deleteBudget.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
