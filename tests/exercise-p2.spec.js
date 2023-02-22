import { test, expect } from "@playwright/test";

// Write your solution here
test.describe("API test exercise", () => {
  const BASE_URL = "https://reqres.in/api";
  test("Assert response status", async ({ request }) => {
    const data = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    const response = await request.post(`${BASE_URL}/login`, {
      data,
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status()).toBe(200);
  });
});
