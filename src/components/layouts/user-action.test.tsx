import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock } from "vitest";
import { UserAction } from "./user-action";

vi.mock("zustand");
vi.mock("@/services/auth.service", () => ({ getMe: vi.fn() }));

describe("UserAction component", () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<React.PropsWithChildren>;

  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
    useAuthStore.setState({ token: "dummyToken" });
  });
  beforeAll(() => {
    (getMe as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ email: "test@example.com", _id: "testId" }),
            200
          )
        )
    );
  });

  it("should render loading skeleton when loading", async () => {
    const { findByTestId } = render(<UserAction />, { wrapper });
    expect(await findByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("should render user email when not loading", async () => {
    const { findByText, getByTestId } = render(<UserAction />, { wrapper });

    waitFor(() => {
      expect(getByTestId("loading-skeleton")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(getByTestId("loading-skeleton")).not.toBeInTheDocument();
    });
    expect(await findByText("Welcome")).toBeInTheDocument();
    expect(await findByText("test@example.com")).toBeInTheDocument();
  });

  it("should call logout function when logout button is clicked", async () => {
    (getMe as Mock).mockReturnValue({
      email: "test@example.com",
      _id: "testId",
    });
    const { getByText } = render(<UserAction />, { wrapper });
    fireEvent.click(getByText("Logout"));
    const isLoggedIn = !!useAuthStore.getState().token;
    expect(isLoggedIn).toBeFalsy();
  });
});
