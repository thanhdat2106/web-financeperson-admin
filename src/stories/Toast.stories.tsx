import type { Meta, StoryObj } from "@storybook/react"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/stores/toastStore"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Toaster> = {
  title: "UI/Toast",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-[200px]">
        <Story />
        <Toaster />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast("success", "Account created", '"Main Checking" has been added')}>
      Show Success Toast
    </Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button variant="destructive" onClick={() => toast("error", "Failed to delete", "Please try again")}>
      Show Error Toast
    </Button>
  ),
}

export const Warning: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast("warning", "Budget alert", "Food & Dining budget is at 75%")}>
      Show Warning Toast
    </Button>
  ),
}

export const Info: Story = {
  render: () => (
    <Button variant="secondary" onClick={() => toast("info", "Notification marked as read")}>
      Show Info Toast
    </Button>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("success", "Success", "Operation completed successfully")}>Success</Button>
      <Button variant="destructive" onClick={() => toast("error", "Error", "Something went wrong")}>Error</Button>
      <Button variant="outline" onClick={() => toast("warning", "Warning", "Please check your input")}>Warning</Button>
      <Button variant="secondary" onClick={() => toast("info", "Info", "Here is some information")}>Info</Button>
    </div>
  ),
}

export const MultipleToasts: Story = {
  render: () => (
    <Button onClick={() => {
      toast("success", "Account created", "New checking account added")
      setTimeout(() => toast("info", "Syncing", "Fetching latest transactions..."), 500)
      setTimeout(() => toast("warning", "Budget alert", "Shopping is at 78%"), 1000)
    }}>
      Trigger Multiple Toasts
    </Button>
  ),
}
