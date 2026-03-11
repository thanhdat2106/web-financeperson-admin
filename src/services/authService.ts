import type { AuthUser, LoginCredentials, RegisterData } from "@/types"
import { simulateApiCall } from "./api"

const MOCK_USER: AuthUser = {
  id: "1",
  name: "Admin User",
  email: "admin@finance.com",
  role: "admin",
  token: "mock-jwt-token-" + Date.now(),
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    if (credentials.email === "admin@finance.com" && credentials.password === "admin123") {
      const user = { ...MOCK_USER, token: "mock-jwt-token-" + Date.now() }
      localStorage.setItem("auth_token", user.token)
      localStorage.setItem("auth_user", JSON.stringify(user))
      return simulateApiCall(user)
    }
    throw new Error("Invalid email or password")
  },

  async register(data: RegisterData): Promise<AuthUser> {
    const user: AuthUser = {
      id: Math.random().toString(36).substring(7),
      name: data.name,
      email: data.email,
      role: "user",
      token: "mock-jwt-token-" + Date.now(),
    }
    localStorage.setItem("auth_token", user.token)
    localStorage.setItem("auth_user", JSON.stringify(user))
    return simulateApiCall(user)
  },

  logout() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  },

  getStoredUser(): AuthUser | null {
    const user = localStorage.getItem("auth_user")
    return user ? JSON.parse(user) : null
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token")
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
