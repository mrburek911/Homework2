// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class SweetsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Browse sweets/i });
    // "Add to Basket" may not be implemented as a semantic <button> (so getByRole('button') can fail).
    // Use a text-based locator for resilience.
    this.addToBasketButtons = page.getByText(/Add to Basket/i);
  }

  async goto() {
    await this.page.goto('/sweets');
    await expect(this.heading).toBeVisible();
  }

  async addFirstItemToBasket() {
    await expect(this.addToBasketButtons.first()).toBeVisible();
    await this.addToBasketButtons.first().click();
  }
}

module.exports = { SweetsPage };
