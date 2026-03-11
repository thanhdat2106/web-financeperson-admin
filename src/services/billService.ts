import type { Bill } from "@/types"
import { mockBills } from "@/lib/mock-data"
import { simulateApiCall } from "./api"
import { generateId } from "@/lib/utils"

let bills = [...mockBills]

export const billService = {
  async getBills(): Promise<Bill[]> {
    return simulateApiCall([...bills])
  },

  async createBill(data: Omit<Bill, "id">): Promise<Bill> {
    const newBill: Bill = { ...data, id: generateId() }
    bills = [newBill, ...bills]
    return simulateApiCall(newBill)
  },

  async updateBill(id: string, data: Partial<Bill>): Promise<Bill> {
    const index = bills.findIndex((b) => b.id === id)
    if (index === -1) throw new Error("Bill not found")
    bills[index] = { ...bills[index], ...data }
    return simulateApiCall(bills[index])
  },

  async deleteBill(id: string): Promise<void> {
    bills = bills.filter((b) => b.id !== id)
    return simulateApiCall(undefined)
  },
}
