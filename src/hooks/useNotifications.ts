import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "@/services/notificationService"
import { toast } from "@/stores/toastStore"

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      toast("info", "Notification marked as read")
    },
    onError: () => toast("error", "Failed to mark notification"),
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      toast("success", "All notifications marked as read")
    },
    onError: () => toast("error", "Failed to mark all notifications"),
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      toast("success", "Notification deleted")
    },
    onError: () => toast("error", "Failed to delete notification"),
  })
}
