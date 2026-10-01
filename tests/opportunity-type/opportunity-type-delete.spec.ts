import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Delete', () => {
  test('Delete a never-used record removes it from the grid', async ({ authedPage }) => {
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
    await opt.expectRowVisible(code);

    await opt.deleteRowByName(code);
    await opt.confirmDelete();
    await opt.waitForDeletedPopupToClose();

    await authedPage.waitForTimeout(3000);

    await opt.goto();
    await opt.expectRowNotVisible(code);
  });
});