import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Duplicate Name', () => {
  test('Save is refused for a duplicate Name', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const code1 = uniqueCode('QA');
    const code2 = uniqueCode('QA');
    const name = uniqueName('Test');

    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code1);
    await opt.fillName(name);
    await opt.clickSave();

    await opt.expectSavedToast();
    await opt.waitForSavedPopupToClose();
    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code2);
    await opt.fillName(name);
    await opt.clickSave();
    await opt.expectAlreadyExistsError();
  
    await opt.dismissAlreadyExistsError();
    await opt.cleanupRecord(code1);
  });
});