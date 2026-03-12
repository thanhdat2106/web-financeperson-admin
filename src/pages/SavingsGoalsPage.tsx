import { useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { useSavingsGoals, useCreateSavingsGoal, useUpdateSavingsGoal, useDeleteSavingsGoal } from "@/hooks/useSavingsGoals"
import type { SavingsGoal } from "@/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type GoalFormValues = { name: string; targetAmount: string; currentAmount: string; deadline: string; icon: string; color: string }
const defaultValues: GoalFormValues = { name: "", targetAmount: "", currentAmount: "0", deadline: "", icon: "🎯", color: "#6366f1" }

export function SavingsGoalsPage() {
  const { data: goals, isLoading } = useSavingsGoals()
  const createGoal = useCreateSavingsGoal()
  const updateGoal = useUpdateSavingsGoal()
  const deleteGoal = useDeleteSavingsGoal()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<SavingsGoal | null>(null)
  const [deleting, setDeleting] = useState<SavingsGoal | null>(null)

  const form = useForm<GoalFormValues>({ defaultValues })

  const totalSaved = goals?.reduce((s, g) => s + g.currentAmount, 0) ?? 0
  const totalTarget = goals?.reduce((s, g) => s + g.targetAmount, 0) ?? 0

  const openCreate = () => { setEditing(null); form.reset(defaultValues); setDialogOpen(true) }
  const openEdit = (g: SavingsGoal) => {
    setEditing(g)
    form.reset({ name: g.name, targetAmount: String(g.targetAmount), currentAmount: String(g.currentAmount), deadline: g.deadline, icon: g.icon, color: g.color })
    setDialogOpen(true)
  }

  const onSubmit = async (values: GoalFormValues) => {
    const data = { ...values, targetAmount: parseFloat(values.targetAmount), currentAmount: parseFloat(values.currentAmount) }
    if (editing) { await updateGoal.mutateAsync({ id: editing.id, data }) }
    else { await createGoal.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => { if (deleting) { await deleteGoal.mutateAsync(deleting.id); setDeleteOpen(false) } }

  if (isLoading) { return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1><p className="text-muted-foreground">Set targets and track your progress</p></div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />New Goal</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Saved</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalSaved)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Target</p><p className="text-2xl font-bold">{formatCurrency(totalTarget)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Overall Progress</p><p className="text-2xl font-bold">{totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(0) : 0}%</p></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals?.map((goal) => {
          const pct = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: goal.color }} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{goal.icon}</span>
                  <div><CardTitle className="text-base">{goal.name}</CardTitle><CardDescription>{daysLeft} days left</CardDescription></div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(goal)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setDeleting(goal); setDeleteOpen(true) }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: goal.color }}>{pct.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</p>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: goal.color }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Remaining: {formatCurrency(goal.targetAmount - goal.currentAmount)}</span>
                  <span>Due: {formatDate(goal.deadline)}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editing ? "Edit Goal" : "New Savings Goal"}</DialogTitle><DialogDescription>{editing ? "Update your savings goal" : "Set a new financial goal"}</DialogDescription></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <FormField control={form.control} name="name" rules={{ required: "Goal name is required" }} render={({ field }) => (
                    <FormItem className="col-span-3"><FormLabel>Goal Name</FormLabel><Input placeholder="e.g. Vacation Fund" {...field} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="icon" render={({ field }) => (
                    <FormItem><FormLabel>Icon</FormLabel><Input placeholder="🎯" {...field} /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="targetAmount" rules={{ required: "Target amount is required", validate: (v) => parseFloat(v) > 0 || "Must be positive" }} render={({ field }) => (
                    <FormItem><FormLabel>Target Amount</FormLabel><Input type="number" min="0" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="currentAmount" rules={{ required: "Current saved is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Current Saved</FormLabel><Input type="number" min="0" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="deadline" rules={{ required: "Deadline is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Deadline</FormLabel><DatePicker value={field.value} onChange={field.onChange} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color</FormLabel><Input type="color" {...field} /></FormItem>
                  )} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createGoal.isPending || updateGoal.isPending}>{(createGoal.isPending || updateGoal.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editing ? "Save" : "Create Goal"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Delete Goal</DialogTitle><DialogDescription>Remove <strong>{deleting?.name}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteGoal.isPending}>{deleteGoal.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
