import { Page } from '@playwright/test';
import { NavigationLocators } from '../../locators/shared/navigation.locators';
import { TestData } from '../../fixtures/test-data';
export class NavigationPage {
  constructor(private page: Page) {}

  /**
   * Since login now happens ONCE in auth.setup.ts (not per-test), every
   * new browser context starts at a blank page (about:blank) — it has
   * the session cookies loaded, but hasn't navigated anywhere yet. This
   * sends it to the app's home page first, so the sidebar actually exists
   * before we try to click anything in it.
   */
  async gotoAppHome() {
    await this.page.goto(TestData.urls.appHome, { waitUntil: 'domcontentloaded', timeout: 120000 });
  }

  async clickAdministration() {
    await this.page.locator(NavigationLocators.administrationMenu).click();
  }

  async clickCatalog() {
    await this.page.locator(NavigationLocators.catalogSubMenu).click();
  }

  async clickOpportunityType() {
    await this.page.locator(NavigationLocators.opportunityTypeLink).click();
  }

  async navigateToOpportunityType() {
    await this.gotoAppHome();
    await this.clickAdministration();
    await this.clickCatalog();
    await this.clickOpportunityType();
  }
}