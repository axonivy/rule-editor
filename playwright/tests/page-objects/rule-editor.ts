import type { Page } from '@playwright/test';

export const server = process.env.BASE_URL ?? 'http://localhost:8081';
export const user = 'Developer';
const ws = process.env.TEST_WS ?? '';
const app = process.env.TEST_APP ?? 'designer';
const pmv = 'rule-test-project';

export class RuleEditor {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private static async open(page: Page, url = '') {
    await page.goto(url);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addStyleTag({ content: `.tsqd-parent-container { display: none; }` });
    return new RuleEditor(page);
  }

  static async openRule(page: Page, options?: { readonly?: boolean; theme?: string }) {
    const serverUrl = server.replace(/^https?:\/\//, '');
    let url = `?server=${serverUrl}${ws}&app=${app}&pmv=${pmv}&file=rles.yaml`;
    if (options) {
      url += Object.entries(options)
        .map(([key, value]) => `&${key}=${value}`)
        .join('');
    }
    return await this.open(page, url);
  }

  static async openMock(page: Page) {
    const url = `mock.html`;
    return await this.open(page, url);
  }
}
