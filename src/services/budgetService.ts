import type { Budget } from "@/types"
import { mockBudgets } from "@/lib/mock-data"
import { simulateApiCall } from "./api"
import { generateId } from "@/lib/utils"

let budgets = [...mockBudgets]

export const budgetService = {
  async getBudgets(): Promise<Budget[]> {
    return simulateApiCall([...budgets])
  },

  async createBudget(data: Omit<Budget, "id">): Promise<Budget> {
    const newBudget: Budget = { ...data, id: generateId() }
    budgets = [newBudget, ...budgets]
    return simulateApiCall(newBudget)
  },

  async updateBudget(id: string, data: Partial<Budget>): Promise<Budget> {
    const index = budgets.findIndex((b) => b.id === id)
    if (index === -1) throw new Error("Budget not found")
    budgets[index] = { ...budgets[index], ...data }
    return simulateApiCall(budgets[index])
  },

  async deleteBudget(id: string): Promise<void> {
    budgets = budgets.filter((b) => b.id !== id)
    return simulateApiCall(undefined)
  },
}
