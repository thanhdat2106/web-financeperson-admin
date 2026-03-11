import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Spacing & Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold">Border Radius</h2>
        <p className="text-sm text-muted-foreground">Based on --radius: 0.5rem (8px)</p>
      </div>
      <div className="flex items-end gap-6">
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-sm" />
          <p className="text-xs font-medium">sm</p>
          <p className="text-[10px] text-muted-foreground font-mono">4px</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-md" />
          <p className="text-xs font-medium">md</p>
          <p className="text-[10px] text-muted-foreground font-mono">6px</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-lg" />
          <p className="text-xs font-medium">lg</p>
          <p className="text-[10px] text-muted-foreground font-mono">8px</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-xl" />
          <p className="text-xs font-medium">xl</p>
          <p className="text-[10px] text-muted-foreground font-mono">12px</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-2xl" />
          <p className="text-xs font-medium">2xl</p>
          <p className="text-[10px] text-muted-foreground font-mono">16px</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary rounded-full" />
          <p className="text-xs font-medium">full</p>
          <p className="text-[10px] text-muted-foreground font-mono">50%</p>
        </div>
      </div>
    </div>
  ),
}

export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold">Spacing Scale</h2>
        <p className="text-sm text-muted-foreground">Common spacing values used in the app</p>
      </div>
      <div className="space-y-2">
        {[
          { name: "gap-1", value: "4px", desc: "Tight icon gaps" },
          { name: "gap-2", value: "8px", desc: "Button icon gaps, badge spacing" },
          { name: "gap-3", value: "12px", desc: "List item gaps, card content" },
          { name: "gap-4", value: "16px", desc: "Grid gaps, form field spacing" },
          { name: "gap-6", value: "24px", desc: "Section spacing, card grid gaps" },
          { name: "p-3", value: "12px", desc: "Nav item padding, compact cards" },
          { name: "p-4", value: "16px", desc: "Card padding, list items" },
          { name: "p-6", value: "24px", desc: "Page padding, large card padding" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-4 border-b pb-2">
            <div className="w-20">
              <div className="bg-primary/20 inline-block" style={{ width: item.value, height: "12px" }}>
                <div className="bg-primary h-full w-full" />
              </div>
            </div>
            <span className="text-sm font-mono w-16 text-primary font-medium">{item.name}</span>
            <span className="text-xs text-muted-foreground w-12">{item.value}</span>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const GridLayouts: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">Grid Layouts</h2>
        <p className="text-sm text-muted-foreground">Common grid patterns used across pages</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Metric Cards - grid-cols-4 gap-4</p>
        <div className="grid grid-cols-4 gap-4">
          {["Balance", "Income", "Expenses", "Rate"].map((l) => (
            <div key={l} className="rounded-lg border p-4 bg-card text-center">
              <p className="text-xs text-muted-foreground">{l}</p>
              <p className="text-lg font-bold">$0.00</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dashboard - grid-cols-3 (2:1 split)</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-lg border p-6 bg-card h-32 flex items-center justify-center text-sm text-muted-foreground">Chart area (lg:col-span-2)</div>
          <div className="rounded-lg border p-6 bg-card h-32 flex items-center justify-center text-sm text-muted-foreground">Side panel</div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Cards - grid-cols-3 gap-4</p>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-4 bg-card">
              <div className="h-1 w-full bg-primary rounded mb-3" />
              <p className="text-sm font-medium">Account {i}</p>
              <p className="text-xs text-muted-foreground">$0.00</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Budget Cards - grid-cols-2 gap-4</p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border p-4 bg-card">
              <p className="text-sm font-medium">Category {i}</p>
              <div className="h-3 rounded-full bg-muted overflow-hidden mt-2">
                <div className="h-full rounded-full bg-primary" style={{ width: `${i * 25}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
