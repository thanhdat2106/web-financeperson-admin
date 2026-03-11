import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { AuthUser } from "@/types"
import { authService } from "@/services/authService"

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initialize: () => {
        const user = authService.getStoredUser()
        if (user) {
          set({ user, isAuthenticated: true }, false, "auth/initialize")
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null }, false, "auth/loginStart")
        try {
          const user = await authService.login({ email, password })
          set({ user, isAuthenticated: true, isLoading: false }, false, "auth/loginSuccess")
        } catch (error) {
          set(
            {
              error: error instanceof Error ? error.message : "Login failed",
              isLoading: false,
            },
            false,
            "auth/loginFailed"
          )
          throw error
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null }, false, "auth/registerStart")
        try {
          const user = await authService.register({ name, email, password })
          set({ user, isAuthenticated: true, isLoading: false }, false, "auth/registerSuccess")
        } catch (error) {
          set(
            {
              error: error instanceof Error ? error.message : "Registration failed",
              isLoading: false,
            },
            false,
            "auth/registerFailed"
          )
          throw error
        }
      },

      logout: () => {
        authService.logout()
        set({ user: null, isAuthenticated: false }, false, "auth/logout")
      },

      clearError: () => set({ error: null }, false, "auth/clearError"),
    }),
    { name: "AuthStore" }
  )
)
