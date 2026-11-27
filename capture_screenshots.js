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
  await new Promise((r) => setTimeout(r, 900));

  // 1. Desktop Sealed 3D Envelope
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'azure-01-envelope.png') });
  console.log('Captured azure-01-envelope.png');

  // Open Invitation
  const openBtn = await page.$('button[aria-label="Open your engagement invitation"]');
  if (openBtn) await openBtn.click();
  await new Promise((r) => setTimeout(r, 2200));

  // 2. Desktop Hero
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'azure-02-hero.png') });
  console.log('Captured azure-02-hero.png');

  // Helper to scroll smoothly so GSAP ScrollTrigger updates every scrub point
  const scrollToAndCapture = async (id, filename) => {
    await page.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    }, id);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, filename) });
    console.log(`Captured ${filename}`);
  };

  await scrollToAndCapture('couple', 'azure-03-couple.png');
  await scrollToAndCapture('blessing', 'azure-04-blessing.png');
  await scrollToAndCapture('date', 'azure-05-date.png');
  await scrollToAndCapture('celebration', 'azure-06-countdown.png');
  await scrollToAndCapture('closing', 'azure-07-closing.png');

  // Check page text to ensure ZERO GPS text exists anywhere
  const hasGpsText = await page.evaluate(() => {
    return document.body.innerText.includes('GPS') || document.body.innerText.includes('31.339');
  });
  console.log('GPS text present on page:', hasGpsText);

  // Mobile Viewport Captures (fresh reload for envelope + open hero + closing)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 900));

  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'azure-mobile-envelope.png') });
  console.log('Captured azure-mobile-envelope.png');

  const mobileBtn = await mobilePage.$('button[aria-label="Open your engagement invitation"]');
  if (mobileBtn) await mobileBtn.click();
  await new Promise((r) => setTimeout(r, 2200));

  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'azure-mobile-hero.png') });
  console.log('Captured azure-mobile-hero.png');

  await mobilePage.evaluate(() => {
    const el = document.getElementById('closing');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 900));
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'azure-mobile-closing.png') });
  console.log('Captured azure-mobile-closing.png');

  await browser.close();
  console.log('All Azure Royal Blue screenshots captured!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
