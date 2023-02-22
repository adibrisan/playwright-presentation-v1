import { test, expect } from "@playwright/test";

// Write your solution here
test.describe("Login test exercise", () => {
  test("Bad login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("wrong_username");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("wrong_password");
    await page.locator('[data-test="login-button"]').click();

    await expect(
      page.locator(
        "#login_button_container > div > form > div.error-message-container.error > h3"
      )
    ).toBeVisible();

    await expect(
      page.locator(
        "#login_button_container > div > form > div.error-message-container.error > h3"
      )
    ).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
