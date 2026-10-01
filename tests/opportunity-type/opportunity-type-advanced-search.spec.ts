import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Advanced Search', () => {
  test('Advanced Search finds a record by Code and Name together', async ({ authedPage }) => {
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

    await opt.cleanupRecord(code);
  });
});