import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { savingsGoalService } from "@/services/savingsGoalService"
import { toast } from "@/stores/toastStore"
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
    onSuccess: (goal) => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] })
      toast("success", "Goal created", `"${goal.name}" has been added`)
    },
    onError: () => toast("error", "Failed to create goal", "Please try again"),
  })
}

export function useUpdateSavingsGoal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SavingsGoal> }) => savingsGoalService.updateGoal(id, data),
    onSuccess: (goal) => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] })
      toast("success", "Goal updated", `"${goal.name}" has been updated`)
    },
    onError: () => toast("error", "Failed to update goal", "Please try again"),
  })
}

export function useDeleteSavingsGoal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => savingsGoalService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] })
      toast("success", "Goal deleted", "The savings goal has been removed")
    },
    onError: () => toast("error", "Failed to delete goal", "Please try again"),
  })
}
