import type { AnalyticsData } from "@/types"
import { mockAnalyticsData } from "@/lib/mock-data"
import { simulateApiCall } from "./api"

export const analyticsService = {
  async getAnalyticsData(): Promise<AnalyticsData> {
    return simulateApiCall({ ...mockAnalyticsData })
  },
}
