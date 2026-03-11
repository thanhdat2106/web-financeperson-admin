import { useQuery } from "@tanstack/react-query"
import { auditService } from "@/services/auditService"

export function useAuditLog() {
  return useQuery({
    queryKey: ["audit"],
    queryFn: auditService.getAuditLog,
  })
}
