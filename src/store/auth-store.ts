// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

export type AuthState = {
  token: string | null;
};

export type AuthActions = {
  setToken: (token: string) => void;
  removeToken: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { token: null };
};

export const defaultInitState: AuthState = {
  token: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setToken: (token) => set({ token }),
    removeToken: () => set({ token: null }),
  }));
};
