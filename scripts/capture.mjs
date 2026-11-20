import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:/Users/LOGICO/.gemini/antigravity/brain/ebd9a901-853c-4dab-86bd-3de6ddde8dab';
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

let edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
if (!fs.existsSync(edgePath)) {
  edgePath = 'C:/Program Files/Microsoft/Edge/Application/msedge.exe';
}

console.log('Using browser executable at:', edgePath);

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();

    // Auto-scroll helper to trigger all in-view animations
    async function autoScroll(p) {
      await p.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
      // Scroll back to top
      await p.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 800));
    }

    // 1. Desktop Viewport (1440 x 900)
    console.log('Capturing Desktop Viewport...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({
      path: path.join(artifactDir, 'desktop-hero.png'),
    });
    console.log('Saved desktop-hero.png');

    await autoScroll(page);

    await page.screenshot({
      path: path.join(artifactDir, 'desktop-full.png'),
      fullPage: true,
    });
    console.log('Saved desktop-full.png');

    // 2. Interactive Date Reveal state
    console.log('Testing Date Reveal Interaction...');
    const envelope = await page.$('#date-reveal [role="button"]');
    if (envelope) {
      await envelope.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(artifactDir, 'desktop-revealed.png'),
      });
      console.log('Saved desktop-revealed.png');
    }

    // 3. Mobile Viewport (390 x 844, iPhone 14)
    console.log('Capturing Mobile Viewport...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({
      path: path.join(artifactDir, 'mobile-hero.png'),
    });
    console.log('Saved mobile-hero.png');

    await autoScroll(page);

    await page.screenshot({
      path: path.join(artifactDir, 'mobile-full.png'),
      fullPage: true,
    });
    console.log('Saved mobile-full.png');

    console.log('All captures complete!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
