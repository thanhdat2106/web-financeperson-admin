import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "@/services/accountService"
import type { Account } from "@/types"

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAccounts,
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Account, "id">) => accountService.createAccount(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  })
}

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Account> }) => accountService.updateAccount(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => accountService.deleteAccount(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  })
}
