import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        refreshToken: null,
        setToken: (token) => set(() => ({ token })),
        setRefreshToken: (refreshToken: string) =>
          set(() => ({ refreshToken })),

        logout: () => set(() => ({ token: null, refreshToken: null })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  return { isLoggedIn: !!token, token };
};

export { useAuthStore, useAuth };
