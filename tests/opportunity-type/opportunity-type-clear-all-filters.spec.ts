import { test, expect } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Clear All Filters', () => {
  test('Clear All resets the Advanced Search filter and restores the full list', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const code = uniqueCode('QA');
    const name = uniqueName('Test');

    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code);
    await opt.fillName(name);
    await opt.clickSave();

    await opt.expectSavedToast();
    await opt.waitForSavedPopupToClose();

    await opt.goto();
    await opt.openAdvancedSearch();
    await opt.fillAdvancedSearchCode(code);
    await opt.fillAdvancedSearchName(name);
    await opt.clickApplyFilters();
    await opt.expectRowVisibleNoSearch(code);

    await opt.clickClearAllFilters();

    const rowCount = await authedPage.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(1);

    await opt.cleanupRecord(code);
  });
});