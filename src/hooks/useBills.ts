import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { billService } from "@/services/billService"
import { toast } from "@/stores/toastStore"
import type { Bill } from "@/types"

export function useBills() {
  return useQuery({
    queryKey: ["bills"],
    queryFn: billService.getBills,
  })
}

export function useCreateBill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Bill, "id">) => billService.createBill(data),
    onSuccess: (bill) => {
      queryClient.invalidateQueries({ queryKey: ["bills"] })
      toast("success", "Bill added", `"${bill.name}" has been added`)
    },
    onError: () => toast("error", "Failed to add bill", "Please try again"),
  })
}

export function useUpdateBill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Bill> }) => billService.updateBill(id, data),
    onSuccess: (bill) => {
      queryClient.invalidateQueries({ queryKey: ["bills"] })
      toast("success", "Bill updated", `"${bill.name}" has been updated`)
    },
    onError: () => toast("error", "Failed to update bill", "Please try again"),
  })
}

export function useDeleteBill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => billService.deleteBill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] })
      toast("success", "Bill deleted", "The bill has been removed")
    },
    onError: () => toast("error", "Failed to delete bill", "Please try again"),
  })
}
