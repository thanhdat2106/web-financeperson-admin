import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Trash2, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: "Button" },
}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
}

export const Link: Story = {
  args: { variant: "link", children: "Link Button" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button><Plus className="mr-2 h-4 w-4" />Add New</Button>
      <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
      <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button size="icon"><Plus className="h-4 w-4" /></Button>
      <Button size="icon" variant="outline"><Trash2 className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}
