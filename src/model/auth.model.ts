export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  message: string;
}
