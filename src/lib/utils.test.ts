import { cn, extractErrorMessage } from "./utils"; // Importing functions to be tested

describe("cn function", () => {
  it("should concatenate class names properly", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});

describe("extractErrorMessage function", () => {
  it("should return fallback for falsy error input", () => {
    const error = undefined;
    const fallback = "Fallback message";
    const result = extractErrorMessage(error, fallback);
    expect(result).toBe(fallback);
  });

  it("should return error message if error is a string", () => {
    const error = "Error message";
    const fallback = "Fallback message";
    const result = extractErrorMessage(error, fallback);
    expect(result).toBe(error);
  });

  it("should return response data message if it exists", () => {
    const error = {
      response: {
        data: {
          message: "Response data message",
        },
      },
    };
    const fallback = "Fallback message";
    const result = extractErrorMessage(error, fallback);
    expect(result).toBe("Response data message");
  });

  it("should return error message if it exists", () => {
    const error = new Error("Custom error message");
    const fallback = "Fallback message";
    const result = extractErrorMessage(error, fallback);
    expect(result).toBe("Custom error message");
  });

  it("should return fallback for unknown error type", () => {
    const error = { unknown: "error" };
    const fallback = "Fallback message";
    const result = extractErrorMessage(error, fallback);
    expect(result).toBe(fallback);
  });
});
