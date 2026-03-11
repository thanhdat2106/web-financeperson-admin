import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { savingsGoalService } from "@/services/savingsGoalService"
import type { SavingsGoal } from "@/types"

export function useSavingsGoals() {
  return useQuery({
    queryKey: ["savingsGoals"],
    queryFn: savingsGoalService.getGoals,
  })
}

export function useCreateSavingsGoal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<SavingsGoal, "id">) => savingsGoalService.createGoal(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savingsGoals"] }),
  })
}

export function useUpdateSavingsGoal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SavingsGoal> }) => savingsGoalService.updateGoal(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savingsGoals"] }),
  })
}

export function useDeleteSavingsGoal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => savingsGoalService.deleteGoal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savingsGoals"] }),
  })
}
