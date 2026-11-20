import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  
  // Click open
  const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
  if (openBtn) {
    await openBtn.click();
    console.log('Clicked open');
  }
  await new Promise(r => setTimeout(r, 2200));

  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log('Max scroll:', maxScroll);

  for (const p of [0.05, 0.25, 0.44, 0.60, 0.76, 0.95]) {
    const y = Math.round(maxScroll * p);
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise(r => setTimeout(r, 600));
    const info = await page.evaluate(() => {
      // Find active visible scene or opacity of each scene
      const scenes = Array.from(document.querySelectorAll('.sticky > div[style*="opacity"]')).map((el, i) => {
        return {
          idx: i + 1,
          opacity: el.style.opacity,
          transform: el.style.transform,
          pointerEvents: el.style.pointerEvents || window.getComputedStyle(el).pointerEvents
        };
      });
      return {
        scrollY: window.scrollY,
        scenes
      };
    });
    console.log(`\n--- Progress ${p} (scrollY=${y}) ---`);
    console.log(JSON.stringify(info, null, 2));
  }
  await browser.close();
}

run().catch(console.error);
