import { Page, expect } from '@playwright/test';
import { OpportunityTypeLocators as L } from '../../locators/opportunity-type/opportunity-type.locators';
import { NavigationPage } from '../shared/navigation.page';

export class OpportunityTypePage {
  private nav: NavigationPage;

  constructor(private page: Page) {
    this.nav = new NavigationPage(page);
  }

  // ---------- Navigation ----------

  async goto() {
  // Retry once — this app occasionally has a slow first-load, and a
  // second attempt after reloading almost always succeeds quickly.
  try {
    await this.nav.navigateToOpportunityType();
    await expect(this.page.getByRole('heading', { name: 'Opportunity Type' })).toBeVisible({ timeout: 45000 });
  } catch {
    await this.nav.navigateToOpportunityType();
    await expect(this.page.getByRole('heading', { name: 'Opportunity Type' })).toBeVisible({ timeout: 45000 });
  }
}
  // ---------- Create ----------

  async clickAddNew() {
    await this.page.locator(L.addNewButton).click();
  }

  async fillCode(value: string) {
    await this.page.locator(L.codeInput).fill(value);
  }

  async typeCode(value: string) {
    await this.page.locator(L.codeInput).pressSequentially(value);
  }

  async fillName(value: string) {
    await this.page.locator(L.nameInput).fill(value);
  }

  async typeName(value: string) {
    await this.page.locator(L.nameInput).pressSequentially(value);
  }

  async fillDescription(value: string) {
    await this.page.locator(L.descriptionInput).fill(value);
  }

  async clickSave() {
    await this.page.locator(L.saveButton).click();
  }

  /**
   * Clicks Save, but first waits briefly so any async "is this code/name
   * unique" check the app runs on keystroke has time to settle. If a
   * "Record already exists" popup still appears (which can happen from a
   * timing/race-condition false positive rather than a real duplicate),
   * dismisses it and retries Save once more.
   */
  async clickSaveRobust() {
    await this.page.waitForTimeout(800);
    await this.clickSave();

    const duplicatePopup = this.page.getByText('Record already exists.');
    const gotDuplicateError = await duplicatePopup
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (gotDuplicateError) {
      await this.page.getByRole('button', { name: 'OK' }).click();
      await this.page.waitForTimeout(1000);
      await this.clickSave();
    }
  }

  async clickCancel() {
    await this.page.getByRole(L.cancelButton.role, { name: L.cancelButton.name }).click();
  }

  async getCodeFieldValue() {
    return this.page.locator(L.codeInput).inputValue();
  }

  async getNameFieldValue() {
    return this.page.locator(L.nameInput).inputValue();
  }

  // ---------- Read ----------

  private rowByText(rowText: string | RegExp) {
    return this.page.locator('tbody tr', { hasText: rowText });
  }

  async searchFor(text: string) {
    await this.page.getByPlaceholder(/search/i).fill(text);
    await this.page.waitForTimeout(2000);
  }

  async expectRowVisible(rowText: string) {
    await this.searchFor(rowText);
    await expect(this.rowByText(rowText)).toBeVisible();
  }

  async expectRowVisibleNoSearch(rowText: string) {
    await expect(this.rowByText(rowText)).toBeVisible();
  }

  async expectRowNotVisible(rowText: string) {
    await this.searchFor(rowText);
    await expect(this.rowByText(rowText)).toHaveCount(0);
  }

  // ---------- Update ----------

  async clickEditRow(rowText: string | RegExp) {
    await this.rowByText(rowText).locator(L.editIconInRow).click();
  }

  // ---------- Delete ----------

  async deleteRowByName(rowText: string | RegExp) {
    await this.rowByText(rowText).locator(L.deleteIconInRow).click();
  }

  async confirmDelete() {
    const dialog = this.page.getByRole('dialog');
    await dialog.getByRole(L.deleteConfirmButton.role, { name: L.deleteConfirmButton.name }).click();
  }

  /**
   * Best-effort cleanup — deletes a record created during a test, so the
   * grid doesn't keep growing across runs.
   */
  async cleanupRecord(code: string) {
    try {
      await this.goto();
      await this.searchFor(code);
      await this.deleteRowByName(code);
      await this.confirmDelete();
    } catch {
      // best effort — ignore cleanup failures
    }
  }

  // ---------- Messages / feedback ----------

  async triggerRequiredFieldValidation() {
    await this.page.locator(L.codeInput).click();
    await this.page.locator(L.nameInput).click();
    await this.page.locator(L.descriptionInput).click();
  }

  async expectFieldErrors() {
    await expect(this.page.getByText(L.codeRequiredMessage)).toBeVisible();
    await expect(this.page.getByText(L.nameRequiredMessage)).toBeVisible();
  }

  async expectAlreadyExistsError() {
    await expect(this.page.getByText(L.alreadyExistsMessage)).toBeVisible();
  }

 async dismissAlreadyExistsError() {
  await this.page.getByRole('button', { name: 'Close' }).click();
  await expect(this.page.getByText(L.alreadyExistsMessage)).toBeHidden({ timeout: 5000 });
}
  async expectSavedToast() {
    await expect(this.page.getByText(L.savedToast)).toBeVisible();
  }

  /**
   * The "Created Successfully" popup auto-closes on its own after a few
   * seconds — we don't click anything, we just wait for it to actually
   * disappear before doing anything else (so it can't block a later
   * click, like sidebar navigation, while it's still on screen).
   */
  async waitForSavedPopupToClose() {
    await expect(this.page.getByText(L.savedToast)).toBeHidden({ timeout: 10000 });
  }
  async waitForDeletedPopupToClose() {
  await expect(this.page.getByText(L.deletedToast)).toBeHidden({ timeout: 10000 });
}

  async expectAuditBlockVisible() {
    await expect(this.page.getByTestId(L.auditBlock)).toBeVisible();
  }

  async expectBlockedDeletePopup() {
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toContainText(L.blockedDeleteMessage);
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible();
  }

  async closeBlockedDeletePopup() {
    const dialog = this.page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Close' }).click();
  }

  async expectConfirmDeletePopup(recordName: string) {
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toContainText(recordName);
    await expect(dialog.getByRole('button', { name: 'Delete' })).toBeVisible();
  }

  // ---------- Unsaved changes ----------

  async makeFormDirty() {
    await this.page.locator(L.nameInput).fill('unsaved-change-test');
  }

  async expectUnsavedChangesPrompt() {
    const dialog = this.page.getByRole('dialog');
    await expect(dialog.getByRole('button', { name: 'Stay' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Discard' })).toBeVisible();
  }

  async clickDiscardUnsavedChanges() {
    await this.page.getByRole('dialog').getByRole('button', { name: 'Discard' }).click();
  }

  async clickStayOnForm() {
    await this.page.getByRole('dialog').getByRole('button', { name: 'Stay' }).click();
  }

  // ---------- Advanced Search ----------

  async openAdvancedSearch() {
    await this.page.getByRole('button', { name: 'Advanced Search' }).click();
  }

  async fillAdvancedSearchName(value: string) {
    await this.page.locator(L.advancedSearchNameInput).fill(value);
  }

  async fillAdvancedSearchCode(value: string) {
    await this.page.locator(L.advancedSearchCodeInput).fill(value);
  }

  async clickApplyFilters() {
    await this.page.locator(L.applyFiltersButton).click();
  }

  async clickClearAllFilters() {
    await this.page.locator(L.clearAllFiltersButton).click();
  }

  async getAdvancedSearchCodeValue() {
    return this.page.locator(L.advancedSearchCodeInput).inputValue();
  }

  // ---------- Export ----------

  async clickExportDropdown() {
    await this.page.locator(L.exportDropdownButton).click();
  }

  async clickExportToCsv() {
    await this.page.locator(L.exportToCsvOption).click();
  }

  async clickExportToExcel() {
    await this.page.locator(L.exportToExcelOption).click();
  }
}