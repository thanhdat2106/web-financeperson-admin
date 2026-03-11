import type { Notification } from "@/types"
import { mockNotifications } from "@/lib/mock-data"
import { simulateApiCall } from "./api"

let notifications = [...mockNotifications]

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return simulateApiCall([...notifications])
  },

  async markAsRead(id: string): Promise<Notification> {
    const index = notifications.findIndex((n) => n.id === id)
    if (index === -1) throw new Error("Notification not found")
    notifications[index] = { ...notifications[index], read: true }
    return simulateApiCall(notifications[index])
  },

  async markAllAsRead(): Promise<void> {
    notifications = notifications.map((n) => ({ ...n, read: true }))
    return simulateApiCall(undefined)
  },

  async deleteNotification(id: string): Promise<void> {
    notifications = notifications.filter((n) => n.id !== id)
    return simulateApiCall(undefined)
  },
}
