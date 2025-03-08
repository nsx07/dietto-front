// src/stores/counter-store.ts
import { decrypt, SessionPayload } from "@/lib/session";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type AuthState = {
  token: string | null;
};

export type AuthActions = {
  setToken: (token: string) => void;
  removeToken: () => void;
  getPayload: () => Pick<SessionPayload, "name" | "email" | "userId"> | null | undefined;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { token: null };
};

export const defaultInitState: AuthState = {
  token: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set, get) => ({
        ...initState,
        setToken: (token) => set({ token }),
        removeToken: () => set({ token: null }),
        getPayload: () => {
          if (!get().token) {
            return null;
          }

          return decrypt(get().token!);
        },
      }),
      {
        name: "auth-storage",
      }
    )
  );
};
