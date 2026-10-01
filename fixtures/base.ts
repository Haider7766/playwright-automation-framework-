import { test as base, Page } from '@playwright/test';

type Fixtures = {
  authedPage: Page;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ page }, use) => {
    await use(page); // already logged in — storageState from auth.setup.ts
  },
});

export { expect } from '@playwright/test';