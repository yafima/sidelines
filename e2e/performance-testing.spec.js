import { playAudit} from  'playwright-lighthouse';
import { test, chromium } from '@playwright/test';
import { lighthouseDesktopConfig } from 'lighthouse/lighthouse-core/config/lr-desktop-config';


const options = {
  loglevel: "info",
}
const thresholds =
{
  performance: 15,
  accessibility: 15,
  'best-practices': 15,
  seo: 50
}


  test(`verify lighthouse performance for https://www.cbssports.com/betting`, async () => {
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
      headless: false
    });
    const page = await browser.newPage();
    await page.goto("https://www.cbssports.com/betting");
    await playAudit({
      page: page,
      config: lighthouseDesktopConfig,
      thresholds: thresholds,
      port: 9222,
      opts: options,
      reports: {
        formats: {
          json: true,
          csv: true
        },
         name: `ligthouse-${new Date()}`,
         directory: `${process.cwd()}/lighthouse`,
      },
    });
    await page.close();
    await browser.close();
});