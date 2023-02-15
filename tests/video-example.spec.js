import { test, expect, chromium } from "@playwright/test";

//test and record a video of that test
test("Slow motion and video recording", async () => {
  const browser = await chromium.launch({
    slowMo: 2000,
    headless: false,
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: "videos/",
      size: {
        width: 800,
        height: 600,
      },
    },
  });

  const page = await context.newPage();

  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator("text=Open Menu").click();
  await page.locator("text=Logout").click();
  await page.waitForURL("https://www.saucedemo.com/");

  await page.screenshot({ path: "./tests/screenshots/screenshot.png" });

  await context.close();
});
