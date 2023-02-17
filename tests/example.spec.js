// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("general flow test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("check login section", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/.*Labs/);

    await expect(page.locator('[data-test="login-button"]')).toBeEnabled();

    await expect(page.locator('[data-test="login-button"]')).toHaveText(
      "Login"
    );
    await expect(page.locator('[data-test="login-button"]')).toHaveAttribute(
      "class",
      /.*btn_action/
    );
  });

  test("check login flow auto-generated", async ({ page }) => {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/); //or page.waitForURL("https://www.saucedemo.com/inventory.html")
  });

  test("logout", async ({ page }) => {
    await page.pause();

    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/); // make an error to trigger tracing

    await page.locator("text=Open Menu").click();
    await page.locator("text=Logout").click();
    await page.waitForURL("https://www.saucedemo.com/");
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
