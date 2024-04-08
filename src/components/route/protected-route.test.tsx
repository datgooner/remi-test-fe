import { useAuthStore } from "@/stores/useAuthStore";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";

vi.mock("zustand");

describe("ProtectedRoute component", () => {
  it("renders Outlet when user is logged in", async () => {
    // Mock isLoggedIn to return true
    useAuthStore.setState({ token: "dummy_token" });

    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/protected"
              element={<div data-testid="protected-page">protected-page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    // Assert that Outlet is rendered when user is logged in
    expect(await findByTestId("protected-page")).toBeInTheDocument();
  });

  it("redirects to home page when user is not logged in", async () => {
    // Mock isLoggedIn to return false
    useAuthStore.setState({ token: null });

    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route path="/" element={<div data-testid="home">Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Assert that it redirects to home page when user is not logged in
    expect(await findByTestId("home")).toBeInTheDocument();
  });
});
