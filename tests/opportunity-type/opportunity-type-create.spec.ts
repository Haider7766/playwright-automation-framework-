import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Create', () => {
  test('Add a new Opportunity Type record', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const code = uniqueCode('QA');
    const name = uniqueName('Test');

    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code);
    await opt.fillName(name);
    await opt.fillDescription('Created by Playwright automation.');
    await opt.clickSave();

    // Confirm Save actually succeeded RIGHT AWAY
    await opt.expectSavedToast();
    await opt.waitForSavedPopupToClose();

    await opt.goto();
    await opt.expectRowVisible(code);

    await opt.cleanupRecord(code);
  });
});