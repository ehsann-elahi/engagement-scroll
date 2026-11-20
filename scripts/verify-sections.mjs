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
  if (openBtn) await openBtn.click();
  await new Promise(r => setTimeout(r, 1600));

  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      text: s.innerText.slice(0, 100).replace(/\n+/g, ' | '),
      height: s.offsetHeight,
      top: s.offsetTop
    }));
  });
  console.log('Rendered Sections:', sections);
  await browser.close();
}

test().catch(console.error);
