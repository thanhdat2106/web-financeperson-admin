import type { Transaction } from "@/types"
import { mockTransactions } from "@/lib/mock-data"
import { simulateApiCall } from "./api"
import { generateId } from "@/lib/utils"

let transactions = [...mockTransactions]

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    return simulateApiCall([...transactions])
  },

  async createTransaction(data: Omit<Transaction, "id">): Promise<Transaction> {
    const newTransaction: Transaction = { ...data, id: generateId() }
    transactions = [newTransaction, ...transactions]
    return simulateApiCall(newTransaction)
  },

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const index = transactions.findIndex((t) => t.id === id)
    if (index === -1) throw new Error("Transaction not found")
    transactions[index] = { ...transactions[index], ...data }
    return simulateApiCall(transactions[index])
  },

  async deleteTransaction(id: string): Promise<void> {
    transactions = transactions.filter((t) => t.id !== id)
    return simulateApiCall(undefined)
  },
}
