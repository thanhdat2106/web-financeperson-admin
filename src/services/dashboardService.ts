import type { DashboardMetrics, ChartData, CategoryData } from "@/types"
import { mockDashboardMetrics, mockChartData, mockCategoryData } from "@/lib/mock-data"
import { simulateApiCall } from "./api"

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    return simulateApiCall(mockDashboardMetrics)
  },

  async getChartData(): Promise<ChartData[]> {
    return simulateApiCall(mockChartData)
  },

  async getCategoryData(): Promise<CategoryData[]> {
    return simulateApiCall(mockCategoryData)
  },
}
