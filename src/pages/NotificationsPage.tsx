import { useState, useMemo } from "react"
import {
  Bell,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Check,
  CheckCheck,
  Trash2,
  Loader2,
} from "lucide-react"
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from "@/hooks/useNotifications"
import type { Notification } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const typeConfig: Record<Notification["type"], { icon: React.ElementType; color: string; bg: string }> = {
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
  success: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  error: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const deleteNotification = useDeleteNotification()
  const [filter, setFilter] = useState("all")

  const filtered = useMemo(() => {
    if (!notifications) return []
    if (filter === "unread") return notifications.filter((n) => !n.read)
    if (filter === "read") return notifications.filter((n) => n.read)
    return notifications
  }, [notifications, filter])

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={() => markAllRead.mutate()}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All ({notifications?.length ?? 0})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({(notifications?.length ?? 0) - unreadCount})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((notification) => {
            const config = typeConfig[notification.type]
            const Icon = config.icon
            return (
              <Card
                key={notification.id}
                className={`transition-colors ${!notification.read ? "border-primary/30 bg-primary/[0.02]" : ""}`}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium ${!notification.read ? "" : "text-muted-foreground"}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markRead.mutate(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification.mutate(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={notification.type === "error" ? "destructive" : notification.type === "warning" ? "warning" : notification.type === "success" ? "success" : "secondary"} className="text-xs">
                        {notification.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(notification.createdAt)}</span>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
