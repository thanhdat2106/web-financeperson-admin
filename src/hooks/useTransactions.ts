import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { transactionService } from "@/services/transactionService"
import { toast } from "@/stores/toastStore"
import type { Transaction } from "@/types"

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getTransactions,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Transaction, "id">) => transactionService.createTransaction(data),
    onSuccess: (tx) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      toast("success", "Transaction added", `"${tx.description}" has been recorded`)
    },
    onError: () => toast("error", "Failed to add transaction", "Please try again"),
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) =>
      transactionService.updateTransaction(id, data),
    onSuccess: (tx) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      toast("success", "Transaction updated", `"${tx.description}" has been updated`)
    },
    onError: () => toast("error", "Failed to update transaction", "Please try again"),
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => transactionService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      toast("success", "Transaction deleted", "The transaction has been removed")
    },
    onError: () => toast("error", "Failed to delete transaction", "Please try again"),
  })
}
