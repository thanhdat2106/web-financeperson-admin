import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { billService } from "@/services/billService"
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bills"] }),
  })
}

export function useUpdateBill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Bill> }) => billService.updateBill(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bills"] }),
  })
}

export function useDeleteBill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => billService.deleteBill(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bills"] }),
  })
}
