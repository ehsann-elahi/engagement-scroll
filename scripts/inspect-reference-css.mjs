import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://engagementak.vercel.app/', { waitUntil: 'networkidle0' });
  const css = await page.evaluate(() => {
    const styleTags = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n');
    return styleTags;
  });
  fs.writeFileSync('reference-extracted-css.css', css);
  console.log('Saved reference-extracted-css.css, length:', css.length);
  await browser.close();
}

run().catch(console.error);
