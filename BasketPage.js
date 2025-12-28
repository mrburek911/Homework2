// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class BasketPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // There are multiple headings that contain "Your Basket" (e.g., "Your Basket" and "Your Basket 0").
    // Use an exact match to avoid strict-mode violations.
    this.heading = page.getByRole('heading', { name: 'Your Basket', exact: true });

    // Buttons can be implemented in different ways; prefer robust locators.
    // Use role where possible; fall back to text.
    this.emptyBasket = page.getByText(/^Empty Basket$/i);
    this.continueCheckoutRole = page.getByRole('button', { name: /Continue to checkout/i });
    this.continueCheckoutText = page.getByText(/Continue to checkout/i);

    // Payment/shipping inputs (shown on the Basket page for checkout)
    this._nameOnCardCss = '#cc-name, input[name="cc-name"], input[name="nameOnCard"], input[id*="cc-name"]';

    // Validation messages (bootstrap-style). Keep these specific to avoid strict-mode collisions.
    this.validationZipRequired = page.getByText(/Zip code required\.?/i);
    this.validationCardNumberRequired = page.getByText(/Credit card number is required/i);
    this.validationNameOnCardRequired = page.getByText(/Name on card is required/i);
  }

  async goto() {
    await this.page.goto('/basket');
    await expect(this.heading).toBeVisible();
  }

  /**
   * Resolve an input field via label (preferred) with a CSS fallback.
   * This avoids relying on newer Locator.or() support.
   * @param {RegExp} labelRegex
   * @param {string} fallbackCss
   */
  async inputByLabelOrCss(labelRegex, fallbackCss) {
    const byLabel = this.page.getByLabel(labelRegex);
    if (await byLabel.count()) return byLabel.first();
    return this.page.locator(fallbackCss).first();
  }

  async firstNameInput() {
    // Deprecated: The Sweet Shop checkout form does not use a "First name" field.
    // Kept only for backwards compatibility.
    return this.inputByLabelOrCss(/First name/i, '#firstName, input[name="firstName"], input[placeholder*="First"]');
  }

  async lastNameInput() {
    // Deprecated: The Sweet Shop checkout form does not use a "Last name" field.
    // Kept only for backwards compatibility.
    return this.inputByLabelOrCss(/Last name/i, '#lastName, input[name="lastName"], input[placeholder*="Last"]');
  }

  async nameOnCardInput() {
    return this.inputByLabelOrCss(/Name on card/i, this._nameOnCardCss);
  }

  async empty() {
    await expect(this.emptyBasket).toBeVisible();
    await this.emptyBasket.click();
  }

  async continueToCheckout() {
    // Prefer role-based locator when available; otherwise fall back to text.
    if (await this.continueCheckoutRole.count()) {
      await expect(this.continueCheckoutRole.first()).toBeVisible();
      await this.continueCheckoutRole.first().click();
      return;
    }
    await expect(this.continueCheckoutText.first()).toBeVisible();
    await this.continueCheckoutText.first().click();
  }
}

module.exports = { BasketPage };
