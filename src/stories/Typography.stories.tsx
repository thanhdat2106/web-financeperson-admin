import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj

export const Headings: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Typography</h1>
        <p className="text-muted-foreground">Font: Inter / system-ui / -apple-system, sans-serif</p>
      </div>

      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-3xl font-bold tracking-tight</p>
          <h1 className="text-3xl font-bold tracking-tight">Page Heading</h1>
        </div>
        <div className="border-b pb-2">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-2xl font-bold tracking-tight</p>
          <h2 className="text-2xl font-bold tracking-tight">Section Heading</h2>
        </div>
        <div className="border-b pb-2">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-xl font-semibold</p>
          <h3 className="text-xl font-semibold">Card Title (large)</h3>
        </div>
        <div className="border-b pb-2">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-base font-semibold</p>
          <h4 className="text-base font-semibold">Card Title (default)</h4>
        </div>
        <div className="border-b pb-2">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-sm font-medium</p>
          <p className="text-sm font-medium">Label / Subtitle</p>
        </div>
      </div>
    </div>
  ),
}

export const BodyText: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold">Body Text Styles</h2>
      <div className="space-y-4">
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-sm (default body)</p>
          <p className="text-sm">This is the default body text size used for table cells, descriptions, and form content.</p>
        </div>
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-sm text-muted-foreground</p>
          <p className="text-sm text-muted-foreground">This is muted body text for secondary information, descriptions, and helper text.</p>
        </div>
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-xs text-muted-foreground</p>
          <p className="text-xs text-muted-foreground">Small muted text for timestamps, counts, meta info.</p>
        </div>
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground font-mono mb-1">text-xs font-semibold uppercase tracking-wider text-muted-foreground</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Section Label</p>
        </div>
      </div>
    </div>
  ),
}

export const DataDisplay: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold">Data Display Styles</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-mono mb-2">Metric card value</p>
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-2xl font-bold">$90,555.95</p>
          <p className="text-xs text-emerald-600">+4.2% vs last month</p>
        </div>
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-mono mb-2">Savings goal</p>
          <p className="text-sm font-medium">Emergency Fund</p>
          <p className="text-3xl font-bold text-indigo-500">75%</p>
          <p className="text-sm text-muted-foreground">$15,000 / $20,000</p>
        </div>
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-mono mb-2">Transaction amount</p>
          <p className="text-sm font-semibold text-emerald-600">+$5,200.00</p>
          <p className="text-sm font-semibold text-red-600">-$1,650.00</p>
          <p className="text-sm font-semibold text-blue-600">$500.00</p>
        </div>
        <div className="rounded-lg border p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-mono mb-2">Mono / code</p>
          <p className="text-xs font-mono text-muted-foreground">--primary: 262.1 83.3% 57.8%</p>
          <p className="text-xs font-mono text-muted-foreground">--background: 0 0% 100%</p>
        </div>
      </div>
    </div>
  ),
}

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Font Weights</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-normal">Normal (400)</span>
          <span className="text-xs font-mono text-muted-foreground">font-normal</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Medium (500)</span>
          <span className="text-xs font-mono text-muted-foreground">font-medium</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-semibold">Semibold (600)</span>
          <span className="text-xs font-mono text-muted-foreground">font-semibold</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-bold">Bold (700)</span>
          <span className="text-xs font-mono text-muted-foreground">font-bold</span>
        </div>
      </div>
    </div>
  ),
}
