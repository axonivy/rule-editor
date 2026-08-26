import { expect, test } from '@playwright/test';
import { RuleEditor } from '../page-objects/rule-editor';

test('canvas', async ({ page }) => {
  await RuleEditor.openMock(page);
  await expect(page.getByText('Rule Editor')).toBeVisible();
});
