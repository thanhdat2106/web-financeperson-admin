import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { budgetService } from "@/services/budgetService"
import { toast } from "@/stores/toastStore"
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
    onSuccess: (budget) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast("success", "Budget created", `"${budget.category}" budget has been added`)
    },
    onError: () => toast("error", "Failed to create budget", "Please try again"),
  })
}

export function useUpdateBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) => budgetService.updateBudget(id, data),
    onSuccess: (budget) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast("success", "Budget updated", `"${budget.category}" budget has been updated`)
    },
    onError: () => toast("error", "Failed to update budget", "Please try again"),
  })
}

export function useDeleteBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => budgetService.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast("success", "Budget deleted", "The budget has been removed")
    },
    onError: () => toast("error", "Failed to delete budget", "Please try again"),
  })
}
