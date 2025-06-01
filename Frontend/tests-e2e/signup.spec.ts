import { test, expect } from "@playwright/test";

test("should successfully register a new user", async ({ page }) => {
  // Fill in form fields
  await page.goto("/signup");

  // Fill User Name
  await page.waitForSelector('input[placeholder="Användarnamn"]', {
    state: "visible",
  });
  await page.fill(
    'input[placeholder="Användarnamn"]',
    `test-user-${Date.now()}`
  );

  // Fill Email
  await page.waitForSelector('input[placeholder="Epost"]', {
    state: "visible",
  });
  await page.fill(
    'input[placeholder="Epost"]',
    `test-${Date.now()}@example.com`
  );

  // Fill Name
  await page.waitForSelector('input[placeholder="Namn"]', {
    state: "visible",
  });
  await page.fill('input[placeholder="Namn"]', "Test User");

  // Fill Password
  await page.waitForSelector('input[name="password"]', {
    state: "visible",
  });
  await page.fill('input[name="password"]', "Password123!");

  // Fill Confirm Password
  await page.waitForSelector('input[name="confirmPassword"]', {
    state: "visible",
  });
  await page.fill('input[name="confirmPassword"]', "Password123!");

  // Submit form
  await page.click('button[type="submit"]');

  // Verify loading message
  await expect(
    page.locator(".loading-message", { hasText: "Registrerar..." })
  ).toBeVisible();

  // Verify success message
  await expect(page.locator("text=Konto skapat!")).toBeVisible();

  // Verify redirection to login page
  await expect(page).toHaveURL("/");
});
