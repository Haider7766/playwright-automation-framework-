import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../../locators/shared/login.locators';

export class LoginPage {
  constructor(private page: Page) {}

  async goto(loginUrl: string) {
    await this.page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 1200000  });
  }

  async clickProceedToLogin() {
    await this.page.locator(LoginLocators.proceedToLoginButton).click();
    await this.page.waitForURL(/middleoffice-qa-ids\.croeminc\.com/);
  }

  async fillCredentials(username: string, password: string) {
    await this.page.locator(LoginLocators.usernameInput).fill(username);
    await this.page.locator(LoginLocators.passwordInput).fill(password);
  }

  async submit() {
    await this.page.locator(LoginLocators.submitButton).click();
  }

  async login(loginUrl: string, username: string, password: string) {
    await this.goto(loginUrl);
    await this.clickProceedToLogin();
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async assertLoggedIn() {
    await expect(this.page).not.toHaveURL(/auth\/login|middleoffice-qa-ids/, { timeout: 15000 });
  }
}