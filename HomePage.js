// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Welcome to the sweet shop/i });
    this.browseSweetsLink = page.getByRole('link', { name: /Browse Sweets/i });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { HomePage };
