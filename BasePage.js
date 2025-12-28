// @ts-check

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navSweets = page.getByRole('link', { name: /^Sweets$/i });
    this.navAbout = page.getByRole('link', { name: /^About$/i });
    this.navLogin = page.getByRole('link', { name: /^Login$/i });
    this.navBasket = page.getByRole('link', { name: /Basket/i });
  }

  async basketCount() {
    const text = await this.navBasket.innerText();
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async goToBasket() {
    await this.navBasket.click();
  }
}

module.exports = { BasePage };
