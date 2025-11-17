import { test, expect } from "@playwright/test";

test("should register a new user via auth popup", async ({ page }) => {
  await page.goto("/");

  // Open auth popup
  await page.getByRole("button", { name: "ВОЙТИ" }).click();

  // Switch to Register page
  await page.getByRole("button", { name: "Зарегистрироваться" }).click();

  // Fill the form
  await page.getByLabel("Почта").fill("junayd-test@example.com");
  await page.getByLabel("Пароль").fill("SecurePassword123!");

  // Submit
  await page.getByRole("button", { name: "Получить код" }).click();

  // Expect some OTP screen or success
  await expect(page.locator("text=Проверьте почту")).toBeVisible();
});
