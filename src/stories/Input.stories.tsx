import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "color"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "Enter text..." },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="relative max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-9" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: "Disabled input", disabled: true },
}

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password..." },
}

export const Number: Story = {
  args: { type: "number", placeholder: "0.00", step: "0.01" },
}

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <div className="space-y-1"><Label>Text</Label><Input type="text" placeholder="Text input" /></div>
      <div className="space-y-1"><Label>Email</Label><Input type="email" placeholder="Email input" /></div>
      <div className="space-y-1"><Label>Password</Label><Input type="password" placeholder="Password" /></div>
      <div className="space-y-1"><Label>Number</Label><Input type="number" placeholder="0" /></div>
      <div className="space-y-1"><Label>Search</Label><Input type="search" placeholder="Search..." /></div>
      <div className="space-y-1"><Label>Color</Label><Input type="color" defaultValue="#6366f1" /></div>
    </div>
  ),
}
