import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

export function setup(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(
      // Make sure that this doesn't break any other tests in the suite.
      { delay: null }
    ),

    // Think of this like a 'mix-in' of the entries from the returned object.
    ...render(jsx),
  };
}
