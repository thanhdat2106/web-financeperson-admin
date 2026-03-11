import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This is the card content area.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const MetricCard: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">Total Balance</p>
        <p className="text-2xl font-bold">$90,555.95</p>
        <p className="text-xs text-emerald-600 mt-1">+4.2% vs last month</p>
      </CardContent>
    </Card>
  ),
}

export const AccountCard: Story = {
  render: () => (
    <Card className="w-[320px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Main Checking</CardTitle>
          <p className="text-xs text-muted-foreground">Chase Bank •••• 4521</p>
        </div>
        <Badge variant="success">Active</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground uppercase">Checking</p>
        <p className="text-xl font-bold">$8,450.32</p>
      </CardContent>
    </Card>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Net Worth</p><p className="text-2xl font-bold">$90,555</p></CardContent></Card>
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Assets</p><p className="text-2xl font-bold text-emerald-600">$91,801</p></CardContent></Card>
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Liabilities</p><p className="text-2xl font-bold text-red-600">$1,245</p></CardContent></Card>
    </div>
  ),
}
