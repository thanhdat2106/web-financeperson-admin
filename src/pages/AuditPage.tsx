import { useState, useMemo } from "react"
import { Search, Shield, Loader2, Plus, Pencil, Trash2, Download, RefreshCw, Settings2 } from "lucide-react"
import { useAuditLog } from "@/hooks/useAudit"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const actionConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  TRANSACTION: { icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
  BUDGET: { icon: Pencil, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  GOAL: { icon: Plus, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  BILL: { icon: RefreshCw, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  ACCOUNT: { icon: RefreshCw, color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
  EXPORT: { icon: Download, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
  SETTINGS: { icon: Settings2, color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-900/30" },
  DELETE: { icon: Trash2, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
}

function formatTimestamp(ts: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts))
}

export function AuditPage() {
  const { data: logs, isLoading } = useAuditLog()
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [resourceFilter, setResourceFilter] = useState("all")

  const filtered = useMemo(() => {
    if (!logs) return []
    return logs.filter((log) => {
      const matchSearch = log.details.toLowerCase().includes(search.toLowerCase()) ||
        log.resource.toLowerCase().includes(search.toLowerCase())
      const matchAction = actionFilter === "all" || log.action === actionFilter
      const matchResource = resourceFilter === "all" || log.resource === resourceFilter
      return matchSearch && matchAction && matchResource
    })
  }, [logs, search, actionFilter, resourceFilter])

  const actions = useMemo(() => {
    if (!logs) return []
    return [...new Set(logs.map((l) => l.action))]
  }, [logs])

  const resources = useMemo(() => {
    if (!logs) return []
    return [...new Set(logs.map((l) => l.resource))]
  }, [logs])

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
          <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground">Track your financial activities and changes</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{logs?.length ?? 0} activities logged</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>Complete record of your financial actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search activities..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {actions.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                {resources.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mb-4 opacity-50" />
                <p>No activities found</p>
              </div>
            ) : (
              filtered.map((entry) => {
                const config = actionConfig[entry.action] ?? actionConfig.TRANSACTION
                const Icon = config.icon
                return (
                  <div key={entry.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{entry.action}</Badge>
                        <Badge variant="outline" className="text-xs">{entry.resource}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{entry.details}</p>
                      <span className="text-xs text-muted-foreground mt-2 block">{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filtered.length} of {logs?.length ?? 0} entries
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
