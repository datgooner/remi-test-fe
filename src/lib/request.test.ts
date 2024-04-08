import { useAuthStore } from "@/stores/useAuthStore";
import MockAdapter from "axios-mock-adapter";
import { request } from "./request"; // Assuming your file is named api.ts

describe("API request interceptor", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(request);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should return directly response.data", async () => {
    const endpoint = "/test";
    const myData = "myData";
    mock.onGet(endpoint).reply(200, myData);

    const data = await request.get(endpoint);
    expect(data).toEqual(myData);
  });

  it("should add Authorization header if token exists", async () => {
    const token = "mockToken";
    useAuthStore.setState({ token });

    const endpoint = "/test";
    mock.onGet(endpoint).reply((config) => {
      expect(config.headers?.Authorization).toBe(`Bearer ${token}`);
      return [200, {}];
    });

    await request.get(endpoint);
  });

  it("should handle 401 error by logging out and retrying request", async () => {
    const logoutSpy = vi.spyOn(useAuthStore.getState(), "logout");
    const endpoint = "/test";
    mock.onGet(endpoint).reply(401);
    await request.get(endpoint);
    expect(logoutSpy).toHaveBeenCalled();
  });
});
