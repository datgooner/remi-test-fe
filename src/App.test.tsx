import App from "@/App";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("App", () => {
  it("should render correctly", () => {
    render(<App />);
  });
});
