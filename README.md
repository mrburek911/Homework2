# Sweet Shop – Playwright Tests (Homework)

Target site: https://sweetshop.netlify.app/

## Quick start

1) Install Node.js (LTS)  
2) Install dependencies:

```bash
npm install
npx playwright install
```

3) Run tests:

```bash
npm test
```

Helpful variants:

```bash
npm run test:headed
npm run test:ui
npm run report
```

## Project structure (POM)

- `pages/` – Page Object Model wrappers (navigation + common actions)
- `tests/` – Test specs mapped to manual test case IDs
- `playwright.config.js` – baseURL + retries + HTML report
