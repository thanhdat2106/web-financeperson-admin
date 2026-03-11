import type { Meta, StoryObj } from "@storybook/react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
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
