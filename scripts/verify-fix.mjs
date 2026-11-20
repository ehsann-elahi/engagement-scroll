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

    // 1. Desktop Viewport (1440 x 900)
    console.log('Testing Desktop 1440x900...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // Capture Sealed state
    await page.screenshot({ path: path.join(artifactDir, 'bright-01-sealed.png') });
    console.log('Saved bright-01-sealed.png');

    // Tap "OPEN YOUR INVITATION"
    const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (openBtn) {
      await openBtn.click();
      console.log('Clicked Open Invitation');
    }
    await new Promise(r => setTimeout(r, 1600));

    // Measure total scroll height
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    console.log('Page scroll height after tap:', scrollHeight, 'Viewport:', viewportHeight);

    // Scroll through each section and capture
    const sections = [
      { name: 'bright-02-hero.png', y: 0 },
      { name: 'bright-03-couple.png', y: 800 },
      { name: 'bright-04-blessing.png', y: 1600 },
      { name: 'bright-05-date.png', y: 2400 },
      { name: 'bright-06-celebration.png', y: 3200 },
      { name: 'bright-07-closing.png', y: scrollHeight - viewportHeight },
    ];

    for (const sec of sections) {
      await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), sec.y);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(artifactDir, sec.name) });
      console.log(`Saved ${sec.name} at scrollY ${sec.y}`);
    }

    // Capture Full Page Desktop Screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'bright-desktop-full.png'),
      fullPage: true
    });
    console.log('Saved bright-desktop-full.png');

    // 2. Mobile Viewport (390 x 844 iPhone)
    console.log('Testing Mobile 390x844...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    const mobileBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (mobileBtn) {
      await mobileBtn.click();
    }
    await new Promise(r => setTimeout(r, 1600));

    // Capture Full Page Mobile Screenshot
    await page.screenshot({
      path: path.join(artifactDir, 'bright-mobile-full.png'),
      fullPage: true
    });
    console.log('Saved bright-mobile-full.png');

    console.log('All verification captures completed successfully!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
