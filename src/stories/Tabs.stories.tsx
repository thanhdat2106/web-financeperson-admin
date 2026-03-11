import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all" className="max-w-md">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expense">Expense</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card><CardHeader><CardTitle>All Transactions</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Showing all transaction types.</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="income">
        <Card><CardHeader><CardTitle>Income</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Showing income transactions only.</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="expense">
        <Card><CardHeader><CardTitle>Expenses</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Showing expense transactions only.</p></CardContent></Card>
      </TabsContent>
      <TabsContent value="transfer">
        <Card><CardHeader><CardTitle>Transfers</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Showing transfer transactions only.</p></CardContent></Card>
      </TabsContent>
    </Tabs>
  ),
}

export const FilterTabs: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="paused">Paused</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
