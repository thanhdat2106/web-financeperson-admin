import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { budgetService } from "@/services/budgetService"
import type { Budget } from "@/types"

export function useBudgets() {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: budgetService.getBudgets,
  })
}

export function useCreateBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Budget, "id">) => budgetService.createBudget(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  })
}

export function useUpdateBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) => budgetService.updateBudget(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  })
}

export function useDeleteBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => budgetService.deleteBudget(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  })
}
