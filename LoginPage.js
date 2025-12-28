// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /^Login$/i });
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('text=/^Login$/i').last(); // last occurrence is typically the button
    this.invalidEmailMessage = page.getByText(/Please enter a valid email address/i);
  }

  async goto() {
    await this.page.goto('/login');
    await expect(this.heading).toBeVisible();
  }

  async fillCredentials(email, password) {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
