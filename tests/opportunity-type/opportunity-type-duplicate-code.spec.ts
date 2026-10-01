import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Duplicate Code', () => {
  test('Save is refused for a duplicate Code', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const code = uniqueCode('QA');
    const name1 = uniqueName('Test');
    const name2 = uniqueName('Test');

    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code);
    await opt.fillName(name1);
    await opt.clickSave();

    await opt.expectSavedToast();
     await opt.waitForSavedPopupToClose();
    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code);
    await opt.fillName(name2);
    await opt.clickSave();

    await opt.expectAlreadyExistsError();

    await opt.dismissAlreadyExistsError();
    await opt.cleanupRecord(code);
  });
});