import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Building2,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react"
import { useAccounts, useCreateAccount, useUpdateAccount, useDeleteAccount } from "@/hooks/useAccounts"
import type { Account } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const typeIcons: Record<Account["type"], React.ElementType> = {
  checking: Building2, savings: PiggyBank, credit: CreditCard, wallet: Wallet, investment: TrendingUp,
}

const typeLabels: Record<Account["type"], string> = {
  checking: "Checking", savings: "Savings", credit: "Credit Card", wallet: "Digital Wallet", investment: "Investment",
}

type AccountFormValues = {
  name: string; type: Account["type"]; balance: string; institution: string; lastFour: string; color: string; isActive: boolean
}

const defaultValues: AccountFormValues = {
  name: "", type: "checking", balance: "", institution: "", lastFour: "", color: "#6366f1", isActive: true,
}

export function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts()
  const createAccount = useCreateAccount()
  const updateAccount = useUpdateAccount()
  const deleteAccount = useDeleteAccount()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Account | null>(null)
  const [deleting, setDeleting] = useState<Account | null>(null)
  const [showBalances, setShowBalances] = useState(true)

  const form = useForm<AccountFormValues>({ defaultValues })

  const totals = useMemo(() => {
    if (!accounts) return { netWorth: 0, assets: 0, liabilities: 0 }
    const assets = accounts.filter((a) => a.balance >= 0).reduce((s, a) => s + a.balance, 0)
    const liabilities = accounts.filter((a) => a.balance < 0).reduce((s, a) => s + Math.abs(a.balance), 0)
    return { netWorth: assets - liabilities, assets, liabilities }
  }, [accounts])

  const openCreate = () => { setEditing(null); form.reset(defaultValues); setDialogOpen(true) }
  const openEdit = (a: Account) => {
    setEditing(a)
    form.reset({ name: a.name, type: a.type, balance: String(a.balance), institution: a.institution, lastFour: a.lastFour, color: a.color, isActive: a.isActive })
    setDialogOpen(true)
  }

  const onSubmit = async (values: AccountFormValues) => {
    const data = { ...values, balance: parseFloat(values.balance) }
    if (editing) { await updateAccount.mutateAsync({ id: editing.id, data }) }
    else { await createAccount.mutateAsync(data) }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (deleting) { await deleteAccount.mutateAsync(deleting.id); setDeleteOpen(false) }
  }

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">Manage your financial accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowBalances(!showBalances)}>
            {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Account</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Net Worth</p><p className="text-2xl font-bold">{showBalances ? formatCurrency(totals.netWorth) : "••••••"}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Assets</p><p className="text-2xl font-bold text-emerald-600">{showBalances ? formatCurrency(totals.assets) : "••••••"}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Liabilities</p><p className="text-2xl font-bold text-red-600">{showBalances ? formatCurrency(totals.liabilities) : "••••••"}</p></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts?.map((account) => {
          const Icon = typeIcons[account.type]
          return (
            <Card key={account.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: account.color }} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: account.color + "20" }}>
                    <Icon className="h-5 w-5" style={{ color: account.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{account.institution} •••• {account.lastFour}</p>
                  </div>
                </div>
                <Badge variant={account.isActive ? "success" : "secondary"}>{account.isActive ? "Active" : "Inactive"}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">{typeLabels[account.type]}</p>
                    <p className={`text-xl font-bold ${account.balance < 0 ? "text-red-600" : ""}`}>
                      {showBalances ? formatCurrency(account.balance) : "••••••"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(account)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { setDeleting(account); setDeleteOpen(true) }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Account" : "Add Account"}</DialogTitle>
            <DialogDescription>{editing ? "Update account details" : "Add a new financial account"}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <FormField control={form.control} name="name" rules={{ required: "Account name is required" }} render={({ field }) => (
                  <FormItem><FormLabel>Account Name</FormLabel><Input placeholder="e.g. Main Checking" {...field} /><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem><FormLabel>Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                        <SelectItem value="checking">Checking</SelectItem><SelectItem value="savings">Savings</SelectItem><SelectItem value="credit">Credit Card</SelectItem><SelectItem value="wallet">Digital Wallet</SelectItem><SelectItem value="investment">Investment</SelectItem>
                      </SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="balance" rules={{ required: "Balance is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Balance</FormLabel><Input type="number" step="0.01" {...field} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="institution" rules={{ required: "Institution is required" }} render={({ field }) => (
                    <FormItem><FormLabel>Institution</FormLabel><Input placeholder="e.g. Chase Bank" {...field} /><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastFour" rules={{ required: "Last 4 digits required", maxLength: { value: 4, message: "Max 4 digits" } }} render={({ field }) => (
                    <FormItem><FormLabel>Last 4 Digits</FormLabel><Input maxLength={4} placeholder="1234" {...field} /><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color</FormLabel><Input type="color" {...field} /></FormItem>
                  )} />
                  <FormField control={form.control} name="isActive" render={({ field }) => (
                    <FormItem><FormLabel>Status</FormLabel>
                      <Select value={field.value ? "active" : "inactive"} onValueChange={(v) => field.onChange(v === "active")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                        <SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent></Select></FormItem>
                  )} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createAccount.isPending || updateAccount.isPending}>
                  {(createAccount.isPending || updateAccount.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Add Account"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>Are you sure you want to remove <strong>{deleting?.name}</strong>? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteAccount.isPending}>
              {deleteAccount.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
