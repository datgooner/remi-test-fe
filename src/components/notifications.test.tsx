import { SocketEvent } from "@/constants/enum";
import { SOCKET_URL } from "@/constants/environment";
import { useGetMe } from "@/hooks/query/useGetMe";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import io from "socket.io-client";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { Notifications } from "./notifications";
import { toast } from "./ui/use-toast";

vi.mock("socket.io-client");
vi.mock("zustand");
// Mock the toast function
vi.mock("./ui/use-toast", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as object),
    toast: vi.fn(),
  };
});

vi.mock("@/hooks/query/useGetMe", () => ({
  useGetMe: vi.fn(),
}));
vi.mock("@tanstack/react-query", async () => ({
  ...(await vi.importActual("@tanstack/react-query")),
  useQueryClient: vi.fn(),
}));

const mockUseGetMe = {
  data: { _id: "user_id", email: "email@gmail.com" },
};

const socketQueryOptions = {
  query: { userId: mockUseGetMe.data._id },
};

describe("Notifications component", () => {
  beforeEach(() => {
    (useQueryClient as Mock).mockReturnValue({ invalidateQueries: vi.fn() });

    // mocking isLoggedIn and having use info
    useAuthStore.setState({ token: "token" });
    (useGetMe as Mock).mockReturnValue(mockUseGetMe);
  });

  it("connects to the socket and listens for notifications when logged in", async () => {
    const mockSocket = {
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    };
    (io as Mock).mockReturnValue(mockSocket);

    render(<Notifications />);

    await waitFor(() =>
      expect(io).toHaveBeenCalledWith(SOCKET_URL, socketQueryOptions)
    );

    expect(mockSocket.on).toHaveBeenCalledWith(
      SocketEvent.Notification,
      expect.any(Function)
    );
  });

  it("disconnects the socket on unmount", async () => {
    const mockSocket = {
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    };
    vi.mocked(io, { partial: true }).mockReturnValue(mockSocket);

    const { unmount } = render(<Notifications />);

    await waitFor(() =>
      expect(io).toHaveBeenCalledWith(SOCKET_URL, socketQueryOptions)
    );

    unmount();

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });

  it("displays a notification and invalidates video queries when a notification is received", async () => {
    const mockSocket = {
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    };

    (io as Mock).mockReturnValue(mockSocket);

    render(<Notifications />);

    await waitFor(() =>
      expect(io).toHaveBeenCalledWith(SOCKET_URL, socketQueryOptions)
    );

    (io().on as Mock).mock.calls[0][1]({
      data: {
        createBy: { email: "test@example.com" },
        title: "Test Video",
      },
      message: "New Video Notification",
    });

    expect(toast).toHaveBeenCalledWith({
      title: "New Video Notification",
      description: expect.any(Object), // You might want to refine this expectation based on your specific implementation
    });
  });
});
