import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/shared/login.page';
import { TestData } from '../../fixtures/test-data';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login flow', () => {
  test('User can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      TestData.urls.login,
      TestData.users.qaUser.username,
      TestData.users.qaUser.password
    );

    await loginPage.assertLoggedIn();
  });
});