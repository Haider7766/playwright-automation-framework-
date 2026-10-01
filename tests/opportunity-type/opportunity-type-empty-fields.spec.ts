import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Empty field validation', () => {
  test('Leaving Code and Name empty shows inline required errors', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);

    await opt.goto();
    await opt.clickAddNew();
    await opt.triggerRequiredFieldValidation();

    await opt.expectFieldErrors();
  });
});