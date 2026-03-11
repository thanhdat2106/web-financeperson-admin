import type { SavingsGoal } from "@/types"
import { mockSavingsGoals } from "@/lib/mock-data"
import { simulateApiCall } from "./api"
import { generateId } from "@/lib/utils"

let goals = [...mockSavingsGoals]

export const savingsGoalService = {
  async getGoals(): Promise<SavingsGoal[]> {
    return simulateApiCall([...goals])
  },

  async createGoal(data: Omit<SavingsGoal, "id">): Promise<SavingsGoal> {
    const newGoal: SavingsGoal = { ...data, id: generateId() }
    goals = [newGoal, ...goals]
    return simulateApiCall(newGoal)
  },

  async updateGoal(id: string, data: Partial<SavingsGoal>): Promise<SavingsGoal> {
    const index = goals.findIndex((g) => g.id === id)
    if (index === -1) throw new Error("Goal not found")
    goals[index] = { ...goals[index], ...data }
    return simulateApiCall(goals[index])
  },

  async deleteGoal(id: string): Promise<void> {
    goals = goals.filter((g) => g.id !== id)
    return simulateApiCall(undefined)
  },
}
