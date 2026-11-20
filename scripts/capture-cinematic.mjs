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
    console.log('Capturing Desktop Sealed Envelope State...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({
      path: path.join(artifactDir, 'cinematic-01-sealed.png')
    });
    console.log('Saved cinematic-01-sealed.png');

    // Click "OPEN YOUR INVITATION"
    console.log('Clicking Open Invitation button...');
    const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (openBtn) {
      await openBtn.click();
    } else {
      await page.click('button');
    }

    // Wait for envelope unfolding animation, sound start, and overlay unmount
    console.log('Waiting for envelope unfolding and unmounting...');
    await new Promise(r => setTimeout(r, 2600));

    await page.screenshot({
      path: path.join(artifactDir, 'cinematic-02-opened.png')
    });
    console.log('Saved cinematic-02-opened.png');

    // 2. Scrub through the 6 cinematic scenes
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    console.log('Total scroll track height:', totalHeight);

    const scenes = [
      { name: 'scene-1-hero.png', progress: 0.04 },
      { name: 'scene-2-couple.png', progress: 0.25 },
      { name: 'scene-3-blessing.png', progress: 0.44 },
      { name: 'scene-4-date.png', progress: 0.60 },
      { name: 'scene-5-celebration.png', progress: 0.76 },
      { name: 'scene-6-final.png', progress: 0.95 },
    ];

    for (const sc of scenes) {
      const targetY = Math.round(totalHeight * sc.progress);
      await page.evaluate((y) => window.scrollTo(0, y), targetY);
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(artifactDir, sc.name)
      });
      console.log(`Saved ${sc.name} at progress ${sc.progress}`);
    }

    // 3. Mobile Viewport Experience (390 x 844, iPhone)
    console.log('Capturing Mobile Experience...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(artifactDir, 'mobile-sealed.png')
    });

    const mobileOpenBtn = await page.$('button[aria-label="Open your engagement invitation"]');
    if (mobileOpenBtn) {
      await mobileOpenBtn.click();
      await new Promise(r => setTimeout(r, 2600));
      await page.screenshot({
        path: path.join(artifactDir, 'mobile-opened.png')
      });

      const mHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      const mScenes = [
        { name: 'mobile-couple.png', progress: 0.25 },
        { name: 'mobile-blessing.png', progress: 0.44 },
        { name: 'mobile-date.png', progress: 0.60 },
        { name: 'mobile-celebration.png', progress: 0.76 },
        { name: 'mobile-final.png', progress: 0.95 },
      ];

      for (const m of mScenes) {
        const mTargetY = Math.round(mHeight * m.progress);
        await page.evaluate((y) => window.scrollTo(0, y), mTargetY);
        await new Promise(r => setTimeout(r, 700));
        await page.screenshot({
          path: path.join(artifactDir, m.name)
        });
        console.log(`Saved ${m.name} at mobile progress ${m.progress}`);
      }
    }

    console.log('All cinematic captures successfully completed!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
