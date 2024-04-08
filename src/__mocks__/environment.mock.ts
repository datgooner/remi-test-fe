import { vi } from "vitest";

vi.mock("@/constants/environment", () => ({
  SOCKET_URL: "",
  BASE_URl: "",
}));
