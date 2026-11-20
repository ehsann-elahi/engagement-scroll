import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:/Users/LOGICO/.gemini/antigravity/brain/ebd9a901-853c-4dab-86bd-3de6ddde8dab';

let edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
if (!fs.existsSync(edgePath)) {
  edgePath = 'C:/Program Files/Microsoft/Edge/Application/msedge.exe';
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Experience (1440 x 900)
    console.log('Capturing Desktop 1440x900...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // Sealed state
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-01-sealed.png') });
    console.log('Saved royalblue-01-sealed.png');

    // Click Open
    const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (openBtn) await openBtn.click();
    await new Promise(r => setTimeout(r, 1600));

    // Hero with Floating Rings & Ripples
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-02-hero-rings.png') });
    console.log('Saved royalblue-02-hero-rings.png');

    // Scroll down to Couple with Hands Ceremony
    await page.evaluate(() => window.scrollTo({ top: 920, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-03-couple-hands.png') });
    console.log('Saved royalblue-03-couple-hands.png');

    // Scroll down to Blessing
    await page.evaluate(() => window.scrollTo({ top: 1750, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-04-blessing.png') });
    console.log('Saved royalblue-04-blessing.png');

    // Scroll down to Save The Date
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-05-date.png') });
    console.log('Saved royalblue-05-date.png');

    // Scroll down to Countdown
    await page.evaluate(() => window.scrollTo({ top: 3300, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-06-countdown.png') });
    console.log('Saved royalblue-06-countdown.png');

    // Scroll down to Closing & Map Pin
    await page.evaluate(() => window.scrollTo({ top: 4100, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-07-closing.png') });
    console.log('Saved royalblue-07-closing.png');

    // Full page desktop
    await page.screenshot({
      path: path.join(artifactDir, 'royalblue-desktop-full.png'),
      fullPage: true
    });
    console.log('Saved royalblue-desktop-full.png');

    // 2. Mobile Experience (390 x 844 iPhone)
    console.log('Capturing Mobile 390x844...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    const mobileBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (mobileBtn) await mobileBtn.click();
    await new Promise(r => setTimeout(r, 1600));

    // Mobile Hero with Rings
    await page.screenshot({ path: path.join(artifactDir, 'royalblue-mobile-hero.png') });
    console.log('Saved royalblue-mobile-hero.png');

    // Mobile Full Page
    await page.screenshot({
      path: path.join(artifactDir, 'royalblue-mobile-full.png'),
      fullPage: true
    });
    console.log('Saved royalblue-mobile-full.png');

    console.log('All royal blue captures completed successfully!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
