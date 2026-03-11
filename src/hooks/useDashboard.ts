import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "@/services/dashboardService"

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: dashboardService.getMetrics,
  })
}

export function useChartData() {
  return useQuery({
    queryKey: ["dashboard", "chart"],
    queryFn: dashboardService.getChartData,
  })
}

export function useCategoryData() {
  return useQuery({
    queryKey: ["dashboard", "categories"],
    queryFn: dashboardService.getCategoryData,
  })
}
