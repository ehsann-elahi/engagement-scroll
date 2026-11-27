import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/LOGICO/.gemini/antigravity/brain/ebd9a901-853c-4dab-86bd-3de6ddde8dab';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:4173/...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Capture Opening Envelope
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-01-envelope.png') });
  console.log('Captured modern-01-envelope.png');

  // Click Open Invitation
  const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
  if (openBtn) {
    await openBtn.click();
  } else {
    // fallback click on text
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.innerText, b);
      if (text.includes('Open Your Invitation')) {
        await b.click();
        break;
      }
    }
  }

  // Wait for envelope transition to finish
  await new Promise(r => setTimeout(r, 2000));

  // 2. Capture Hero Scene with 3D Floating Rings
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-02-hero-rings.png') });
  console.log('Captured modern-02-hero-rings.png');

  // 3. Scroll to Couple Scene
  await page.evaluate(() => {
    document.getElementById('couple')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-03-couple.png') });
  console.log('Captured modern-03-couple.png');

  // 4. Scroll to Blessing Scene
  await page.evaluate(() => {
    document.getElementById('blessing')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-04-blessing.png') });
  console.log('Captured modern-04-blessing.png');

  // 5. Scroll to Date Scene
  await page.evaluate(() => {
    document.getElementById('date')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-05-date.png') });
  console.log('Captured modern-05-date.png');

  // 6. Scroll to Celebration & Countdown Scene
  await page.evaluate(() => {
    document.getElementById('celebration')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-06-countdown.png') });
  console.log('Captured modern-06-countdown.png');

  // 7. Scroll to Closing Venue & Actions Scene
  await page.evaluate(() => {
    document.getElementById('closing')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-07-closing.png') });
  console.log('Captured modern-07-closing.png');

  // 8. Capture Full Page Desktop
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-desktop-full.png'), fullPage: true });
  console.log('Captured modern-desktop-full.png');

  // 9. Mobile Viewport (iPhone 14/15 size: 390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-mobile-hero.png') });
  console.log('Captured modern-mobile-hero.png');

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'modern-mobile-full.png'), fullPage: true });
  console.log('Captured modern-mobile-full.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
