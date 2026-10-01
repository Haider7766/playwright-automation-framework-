import { test,expect } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Export', () => {
  test.describe.configure({ mode: 'serial' });

  test('Export to Excel triggers a file download', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);

    await opt.goto();
    await expect(authedPage.locator('tbody tr').first()).toBeVisible();

    await opt.clickExportDropdown();

    const [download] = await Promise.all([
      authedPage.waitForEvent('download'),
      opt.clickExportToExcel(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    // Wait for the download to FULLY finish before this test ends.
    await download.path();
  });

  test('Export to CSV triggers a file download', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);

    await opt.goto();
    await expect(authedPage.locator('tbody tr').first()).toBeVisible();

    await opt.clickExportDropdown();

    const [download] = await Promise.all([
      authedPage.waitForEvent('download'),
      opt.clickExportToCsv(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    await download.path();
  });
});