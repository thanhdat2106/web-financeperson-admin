import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "@/services/accountService"
import { toast } from "@/stores/toastStore"
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
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast("success", "Account created", `"${account.name}" has been added`)
    },
    onError: () => toast("error", "Failed to create account", "Please try again"),
  })
}

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Account> }) => accountService.updateAccount(id, data),
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast("success", "Account updated", `"${account.name}" has been updated`)
    },
    onError: () => toast("error", "Failed to update account", "Please try again"),
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => accountService.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast("success", "Account deleted", "The account has been removed")
    },
    onError: () => toast("error", "Failed to delete account", "Please try again"),
  })
}
