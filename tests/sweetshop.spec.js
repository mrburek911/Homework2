// @ts-check
const { test, expect } = require('@playwright/test');

const { HomePage } = require('../pages/HomePage');
const { SweetsPage } = require('../pages/SweetsPage');
const { BasketPage } = require('../pages/BasketPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Sweet Shop – easy, stable E2E checks (5 tests)', () => {
  test('TC01 – Home page loads and global navigation is visible (positive)', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.navSweets).toBeVisible();
    await expect(home.navAbout).toBeVisible();
    await expect(home.navLogin).toBeVisible();
    await expect(home.navBasket).toBeVisible();
  });

  test('TC02 – Navigate to Sweets page via nav link (positive + URL assertion)', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.navSweets.click();
    await expect(page).toHaveURL(/\/sweets$/);

    const sweets = new SweetsPage(page);
    await expect(sweets.heading).toBeVisible();
    await expect(sweets.addToBasketButtons.first()).toBeVisible();
  });

  test('TC03 – About page loads and explains project purpose (usability)', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.navAbout.click();
    await expect(page).toHaveURL(/\/about$/);

    await expect(page.getByRole('heading', { name: /Sweet Shop Project/i })).toBeVisible();
    await expect(page.getByText(/intentionally broken web application/i)).toBeVisible();
  });

  test('TC04 – Checkout validation triggers when required fields are missing (negative + form input + submit)', async ({ page }) => {
    const basket = new BasketPage(page);
    await basket.goto();
    await expect(page).toHaveURL(/\/basket$/);

    // The Sweet Shop checkout form shows shipping + payment fields (Address/Zip/Card details).
    // Fill one field and submit with other required fields missing to verify validation.
    const nameOnCard = await basket.nameOnCardInput();
    await expect(nameOnCard).toBeVisible();
    await nameOnCard.fill('Test User');

    await basket.continueToCheckout();

    // Assert at least one specific required-field validation is shown.
    await expect(basket.validationCardNumberRequired).toBeVisible();
    await expect(basket.validationZipRequired).toBeVisible();
  });

  test('TC05 – Login form fields are present and password input is masked (security)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(page).toHaveURL(/\/login$/);

    await expect(login.emailInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.passwordInput).toHaveAttribute('type', 'password');
  });
});
