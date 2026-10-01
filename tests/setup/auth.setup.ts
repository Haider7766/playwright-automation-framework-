import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/shared/login.page';
import { TestData } from '../../fixtures/test-data';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    TestData.urls.login,
    TestData.users.qaUser.username,
    TestData.users.qaUser.password
  );
  await loginPage.assertLoggedIn();
    // Wait for the app to fully finish processing the login (its own
  // auth library needs a moment after redirect to settle its internal
  // state in localStorage) — otherwise we can capture a "mid-flow"
  // snapshot that gets rejected as invalid when reused elsewhere.
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: authFile });
});