import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
  if (openBtn) {
    await openBtn.click();
  }
  await new Promise(r => setTimeout(r, 2600));

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  const tests = [
    ['Scene 1 Hero', 0.04],
    ['Scene 2 Couple', 0.25],
    ['Scene 3 Blessing', 0.44],
    ['Scene 4 Date', 0.60],
    ['Scene 5 Celebration', 0.76],
    ['Scene 6 Final', 0.95]
  ];

  for (const [name, prog] of tests) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(totalHeight * prog));
    await new Promise(r => setTimeout(r, 600));
    const textSample = await page.evaluate(() => {
      const activeEl = Array.from(document.querySelectorAll('.sticky > div[style*="opacity: 1"]'))[0];
      return activeEl ? activeEl.innerText.slice(0, 160).replace(/\n+/g, ' | ') : 'No active element with opacity 1';
    });
    console.log(name.padEnd(20), '=>', textSample);
  }
  await browser.close();
}

test().catch(console.error);
