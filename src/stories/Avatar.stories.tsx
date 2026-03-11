import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground text-xs">SM</AvatarFallback></Avatar>
      <Avatar><AvatarFallback className="bg-primary text-primary-foreground text-sm">MD</AvatarFallback></Avatar>
      <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary text-primary-foreground">LG</AvatarFallback></Avatar>
      <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground text-lg">XL</AvatarFallback></Avatar>
    </div>
  ),
}

export const ColorVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar><AvatarFallback className="bg-indigo-500 text-white">AB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback className="bg-emerald-500 text-white">CD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback className="bg-rose-500 text-white">EF</AvatarFallback></Avatar>
      <Avatar><AvatarFallback className="bg-amber-500 text-white">GH</AvatarFallback></Avatar>
    </div>
  ),
}
