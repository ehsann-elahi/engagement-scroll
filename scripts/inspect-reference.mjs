import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://engagementak.vercel.app/', { waitUntil: 'networkidle2' });

  // Take screenshot of sealed state
  await page.screenshot({ path: 'reference-sealed.png' });

  // Find all scripts
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => s.src || s.innerHTML);
  });
  fs.writeFileSync('reference-scripts.json', JSON.stringify(scripts, null, 2));

  // Find audio element or audio references
  const audioInfo = await page.evaluate(() => {
    return {
      audios: Array.from(document.querySelectorAll('audio')).map(a => a.src || a.currentSrc),
      allElements: Array.from(document.querySelectorAll('*')).map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className
      })).filter(x => x.id || x.className)
    };
  });
  fs.writeFileSync('reference-elements.json', JSON.stringify(audioInfo, null, 2));

  // Click the seal / open invitation
  console.log('Clicking the lock/seal...');
  await page.evaluate(() => {
    const el = document.querySelector('.lock') || document.querySelector('button');
    if (el) el.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: 'reference-opened.png' });

  // Now scroll down and inspect timeline/scenes
  for (let y = 500; y <= 5000; y += 1000) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: `reference-scroll-${y}.png` });
  }

  const fullText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('reference-text.txt', fullText);
  console.log('Done inspecting reference site!');

  await browser.close();
}

main().catch(console.error);
