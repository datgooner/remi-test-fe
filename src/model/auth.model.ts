export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
}
