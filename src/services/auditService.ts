import type { AuditEntry } from "@/types"
import { mockAuditLog } from "@/lib/mock-data"
import { simulateApiCall } from "./api"

export const auditService = {
  async getAuditLog(): Promise<AuditEntry[]> {
    return simulateApiCall([...mockAuditLog])
  },
}
