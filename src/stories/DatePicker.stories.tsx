import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <div className="max-w-sm">
        <DatePicker value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <div className="max-w-sm space-y-2">
        <Label>Transaction Date</Label>
        <DatePicker value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState("2025-06-15")
    return (
      <div className="max-w-sm space-y-2">
        <Label>Selected Date</Label>
        <DatePicker value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Raw value: <code className="rounded bg-muted px-1">{value || "empty"}</code>
        </p>
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <div className="max-w-sm space-y-2">
        <Label>Due Date</Label>
        <DatePicker
          value={value}
          onChange={setValue}
          placeholder="Select due date..."
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    value: "2025-03-10",
    disabled: true,
    placeholder: "Disabled date picker",
  },
  render: (args) => (
    <div className="max-w-sm">
      <DatePicker {...args} />
    </div>
  ),
}

export const DateRange: Story = {
  name: "Date Range (From/To)",
  render: function Render() {
    const [from, setFrom] = useState("2025-01-01")
    const [to, setTo] = useState("2025-12-31")
    return (
      <div className="max-w-sm space-y-4">
        <div className="space-y-2">
          <Label>From</Label>
          <DatePicker value={from} onChange={setFrom} />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <DatePicker value={to} onChange={setTo} />
        </div>
        <p className="text-sm text-muted-foreground">
          Range: {from} → {to}
        </p>
      </div>
    )
  },
}

export const InForm: Story = {
  name: "Inside a Form",
  render: function Render() {
    const [date, setDate] = useState("")
    const [deadline, setDeadline] = useState("")
    return (
      <div className="max-w-md space-y-4 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">New Savings Goal</h3>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <DatePicker value={date} onChange={setDate} placeholder="When to start..." />
        </div>
        <div className="space-y-2">
          <Label>Deadline</Label>
          <DatePicker value={deadline} onChange={setDeadline} placeholder="Target deadline..." />
        </div>
        <p className="text-xs text-muted-foreground">
          Start: {date || "—"} | Deadline: {deadline || "—"}
        </p>
      </div>
    )
  },
}

export const CalendarStandalone: Story = {
  name: "Calendar (Standalone)",
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="inline-block rounded-lg border">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </div>
    )
  },
}
