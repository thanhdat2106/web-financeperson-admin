import type { Meta, StoryObj } from "@storybook/react"
import { type ColumnDef } from "@tanstack/react-table"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DataTable, SortableHeader } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <div className="rounded-md border max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Monthly salary</TableCell>
            <TableCell><Badge variant="outline">Salary</Badge></TableCell>
            <TableCell className="text-emerald-600">Income</TableCell>
            <TableCell className="text-right text-emerald-600 font-semibold">+$5,200.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Rent payment</TableCell>
            <TableCell><Badge variant="outline">Housing</Badge></TableCell>
            <TableCell className="text-red-600">Expense</TableCell>
            <TableCell className="text-right text-red-600 font-semibold">-$1,650.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Weekly groceries</TableCell>
            <TableCell><Badge variant="outline">Food & Dining</Badge></TableCell>
            <TableCell className="text-red-600">Expense</TableCell>
            <TableCell className="text-right text-red-600 font-semibold">-$87.50</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="rounded-md border max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
              No transactions found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

type Payment = {
  id: string
  description: string
  category: string
  type: "income" | "expense"
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

const sampleData: Payment[] = [
  { id: "1", description: "Monthly salary", category: "Salary", type: "income", amount: 5200, date: "2025-03-01", status: "completed" },
  { id: "2", description: "Rent payment", category: "Housing", type: "expense", amount: 1650, date: "2025-03-02", status: "completed" },
  { id: "3", description: "Weekly groceries", category: "Food & Dining", type: "expense", amount: 87.5, date: "2025-03-03", status: "completed" },
  { id: "4", description: "Freelance project", category: "Freelance", type: "income", amount: 1200, date: "2025-03-04", status: "pending" },
  { id: "5", description: "Electricity bill", category: "Utilities", type: "expense", amount: 95, date: "2025-03-05", status: "completed" },
  { id: "6", description: "Netflix subscription", category: "Entertainment", type: "expense", amount: 15.99, date: "2025-03-06", status: "completed" },
  { id: "7", description: "Gas station", category: "Transportation", type: "expense", amount: 45, date: "2025-03-07", status: "completed" },
  { id: "8", description: "Amazon purchase", category: "Shopping", type: "expense", amount: 129.99, date: "2025-03-08", status: "pending" },
  { id: "9", description: "Dividend payment", category: "Investment", type: "income", amount: 350, date: "2025-03-09", status: "completed" },
  { id: "10", description: "Gym membership", category: "Health", type: "expense", amount: 49.99, date: "2025-03-10", status: "completed" },
  { id: "11", description: "Restaurant dinner", category: "Food & Dining", type: "expense", amount: 68, date: "2025-03-11", status: "completed" },
  { id: "12", description: "Side project income", category: "Freelance", type: "income", amount: 800, date: "2025-03-12", status: "completed" },
  { id: "13", description: "Internet bill", category: "Utilities", type: "expense", amount: 65, date: "2025-03-13", status: "failed" },
  { id: "14", description: "Coffee shop", category: "Food & Dining", type: "expense", amount: 12.5, date: "2025-03-14", status: "completed" },
  { id: "15", description: "Book purchase", category: "Education", type: "expense", amount: 34.99, date: "2025-03-15", status: "completed" },
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => <SortableHeader column={column}>Description</SortableHeader>,
    cell: ({ row }) => <span className="font-medium">{row.getValue("description")}</span>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <SortableHeader column={column}>Type</SortableHeader>,
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <span className={type === "income" ? "text-emerald-600" : "text-red-600"}>{type}</span>
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right"><SortableHeader column={column}>Amount</SortableHeader></div>
    ),
    cell: ({ row }) => {
      const type = row.original.type
      const amount = row.getValue("amount") as number
      return (
        <div className={`text-right font-semibold ${type === "income" ? "text-emerald-600" : "text-red-600"}`}>
          {type === "income" ? "+" : "-"}${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "completed" ? "success" : status === "pending" ? "warning" : "destructive"
      return <Badge variant={variant} className="capitalize">{status}</Badge>
    },
  },
]

export const DataTableWithSortingAndPagination: Story = {
  name: "DataTable — Sorting & Pagination",
  render: () => (
    <div className="max-w-4xl">
      <DataTable columns={columns} data={sampleData} pageSize={5} />
    </div>
  ),
}

export const DataTableSmallPage: Story = {
  name: "DataTable — Small Page Size",
  render: () => (
    <div className="max-w-4xl">
      <DataTable columns={columns} data={sampleData.slice(0, 3)} pageSize={10} emptyMessage="No payments found." />
    </div>
  ),
}

export const DataTableEmpty: Story = {
  name: "DataTable — Empty State",
  render: () => (
    <div className="max-w-4xl">
      <DataTable columns={columns} data={[]} emptyMessage="No payments found." />
    </div>
  ),
}
