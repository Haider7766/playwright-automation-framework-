import { test,expect } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

test.describe('Opportunity Type — Code keystroke validation', () => {
  test('Code auto-uppercases and strips invalid characters as typed', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);

    await opt.goto();
    await opt.clickAddNew();
    await opt.typeCode('test@code 1');

    expect(await opt.getCodeFieldValue()).toBe('TESTCODE1');
  });
});