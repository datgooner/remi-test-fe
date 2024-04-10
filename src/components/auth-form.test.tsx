import { loginOrRegister } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Mock } from "vitest";
import { AuthForm } from "./auth-form";
import { Toaster } from "./ui/toaster";

vi.mock("zustand");
vi.mock("@/services/auth.service", () => ({
  loginOrRegister: vi.fn(),
}));

describe("AuthForm", () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<React.PropsWithChildren>;

  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
        <Toaster />
      </QueryClientProvider>
    );
  });

  it("should login successfully with valid data", async () => {
    (loginOrRegister as Mock).mockReturnValue({
      token: "dummy token",
      message: "Login Successfully",
    });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthForm />,
      {
        wrapper,
      }
    );

    // Fill in the form
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByTestId("button-submit"));

    // Wait for the form submission to complete
    await waitFor(() =>
      expect(getByText("Login Successfully")).toBeInTheDocument()
    );

    const isLoggedIn = !!useAuthStore.getState().token;
    expect(isLoggedIn).toBeTruthy();
  });

  it("should show error message after form validation failed", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthForm />,
      {
        wrapper,
      }
    );
    // Fill in the form
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "test" },
    });
    fireEvent.change(getByPlaceholderText("password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByTestId("button-submit"));
    await waitFor(() => expect(getByText("Email invalid")).toBeInTheDocument());

    // Fill in the form
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("password"), {
      target: { value: "passw" },
    });
    // Submit the form
    fireEvent.submit(getByTestId("button-submit"));
    await waitFor(() =>
      expect(getByText("Password at least 8 characters")).toBeInTheDocument()
    );
  });

  it("should show error message after submitting with invalid email or password", async () => {
    const error = "error message";
    (loginOrRegister as Mock).mockRejectedValue({ message: error });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthForm />,
      {
        wrapper,
      }
    );

    // Fill in the form
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "invalid@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByTestId("button-submit"));
    await waitFor(() => expect(getByText(error)).toBeInTheDocument());
  });
});
