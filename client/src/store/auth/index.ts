import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AuthStore } from './type';

/**
 * Global auth store (Zustand) — holds the logged-in user + JWT tokens.
 * Wrapped with `persist` middleware to survive page refreshes via localStorage.
 * Key: 'mini-expense-tracker'
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,

      setUserDetails(data) {
        set({ user: data });
      },

      setUserTokens(data) {
        set({ tokens: data });
      },

      logout: () => {
        set({ user: null, tokens: null });
      },
    }),
    {
      name: 'mini-expense-tracker',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
