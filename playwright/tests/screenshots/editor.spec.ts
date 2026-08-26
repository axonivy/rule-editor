import { test } from '@playwright/test';
import { RuleEditor } from '../page-objects/rule-editor';
import { screenshotElement } from './screenshot-util';

test('editor', async ({ page }) => {
  await RuleEditor.openMock(page);
  await screenshotElement(page.getByText('Rule Editor'), 'rule-editor');
});
