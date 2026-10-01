import { test,expect } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Max length validation', () => {
  test('Code field rejects input beyond 10 characters', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const longCode = 'A'.repeat(15);
    await opt.goto();
    await opt.clickAddNew();
    await opt.typeCode(longCode);

    const actualValue = await opt.getCodeFieldValue();
    expect(actualValue.length).toBeLessThanOrEqual(10);
  });

  test('Name field shows an error on Save when it exceeds 50 characters', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    const code = uniqueCode('QA');
    const longName = 'B'.repeat(55);

    await opt.goto();
    await opt.clickAddNew();
    await opt.fillCode(code);
    await opt.fillName(longName);
    await opt.clickSave();

    await expect(authedPage.getByText('Name cannot exceed 50 characters.')).toBeVisible();
   
  });
});