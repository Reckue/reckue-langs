const { chromium } = require('playwright-core');
const path = require('path');

const EXE = 'C:\\Users\\harde\\AppData\\Local\\ms-playwright\\chromium-1217\\chrome-win64\\chrome.exe';
const URL = 'file:///C:/Users/harde/develop/reckue/plugin/promo/reckue-teaser.html';
// Дизайн рендерится в натуральном 450x800, deviceScaleFactor 2.4 → чёткие 1080x1920.
const BW = 450, BH = 800, DSF = 2.4;

(async () => {
  const browser = await chromium.launch({
    executablePath: EXE, headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--force-color-profile=srgb']
  });
  const context = await browser.newContext({
    viewport: { width: BW, height: BH }, deviceScaleFactor: DSF,
    recordVideo: { dir: path.join(__dirname, 'rec'), size: { width: BW * DSF, height: BH * DSF } }
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content:
    '.stage{height:800px!important;width:450px!important;max-width:none!important;border-radius:0!important;box-shadow:none!important;margin:0!important}' +
    'body{margin:0!important;display:block!important;background:#0c0d0f}' });
  await page.waitForTimeout(500);
  await page.click('#ui');
  await page.waitForTimeout(8900);
  const vid = page.video();
  await context.close();
  await browser.close();
  console.log('VIDEO:' + await vid.path());
})().catch(e => { console.error(e); process.exit(1); });
