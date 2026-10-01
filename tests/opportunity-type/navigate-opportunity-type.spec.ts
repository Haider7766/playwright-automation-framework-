import { test } from '../../fixtures/base';
import { OpportunityTypePage } from '../../pages/opportunity-type/opportunity-type.page';
import { uniqueCode, uniqueName } from '../../utils/helpers';

/**
 * Smoke test — run this FIRST to confirm login + sidebar navigation works
 * before running the full opportunity-type.spec.ts suite.
 */
test.describe('Navigation', () => {
  test('Can navigate to Opportunity Type screen after login', async ({ authedPage }) => {
    const opt = new OpportunityTypePage(authedPage);
    await opt.goto();

  });
});