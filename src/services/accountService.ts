import type { Account } from "@/types"
import { mockAccounts } from "@/lib/mock-data"
import { simulateApiCall } from "./api"
import { generateId } from "@/lib/utils"

let accounts = [...mockAccounts]

export const accountService = {
  async getAccounts(): Promise<Account[]> {
    return simulateApiCall([...accounts])
  },

  async createAccount(data: Omit<Account, "id">): Promise<Account> {
    const newAccount: Account = { ...data, id: generateId() }
    accounts = [newAccount, ...accounts]
    return simulateApiCall(newAccount)
  },

  async updateAccount(id: string, data: Partial<Account>): Promise<Account> {
    const index = accounts.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Account not found")
    accounts[index] = { ...accounts[index], ...data }
    return simulateApiCall(accounts[index])
  },

  async deleteAccount(id: string): Promise<void> {
    accounts = accounts.filter((a) => a.id !== id)
    return simulateApiCall(undefined)
  },
}
