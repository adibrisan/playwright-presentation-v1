import { test, expect } from "@playwright/test";

test.describe.parallel("API Testing", () => {
  const BASE_URL = "https://reqres.in/api";

  test("Assert response status", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);
  });

  test("Expect list of users not to be null", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`);

    const resBody = JSON.parse(await response.text());

    expect(resBody).not.toBeNull();
  });
});

// Write your soulution here
test.describe.parallel("API exercise", () => {});
