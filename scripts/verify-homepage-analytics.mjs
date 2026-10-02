import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const sections = [
  'Hero', 'Feature preview', 'Streaming software', 'Use cases', 'Features',
  'Protocols', 'Installer', 'Support', 'Financial supporters', 'FAQ', 'Store',
  'Apps', 'Sponsors', 'Contributors',
];

async function verifyHomepageAnalytics(page, url) {
  const events = () => page.evaluate(() => window.__analytics.filter(([name]) =>
    name.startsWith('Homepage Section Viewed: ')));
  const settle = () => page.evaluate(() => new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const scrollPage = async () => {
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 400) {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await settle();
      await page.waitForFunction(() =>
        [...document.querySelectorAll('[aria-hidden="true"] > svg.animate-spin')].every(spinner => {
          const rect = spinner.getBoundingClientRect();
          return rect.top >= innerHeight || rect.bottom <= 0;
        }));
      await settle();
    }
  };

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url);
  await page.waitForFunction(() => window.__analytics?.some(([name]) =>
    name === 'Homepage Section Viewed: Hero'));
  assert(!(await events()).some(([name]) => name.endsWith(': Financial supporters')));
  assert(!(await events()).some(([name]) => name.endsWith(': Contributors')));
  await scrollPage();
  const desktop = await events();
  assert.deepEqual(desktop.map(([name]) => name).sort(),
    sections.map(section => `Homepage Section Viewed: ${section}`).sort());
  assert(desktop.every(([, options]) => options.interactive === false));

  await page.evaluate(() => window.scrollTo(0, 0));
  await settle();
  await scrollPage();
  assert.equal((await events()).length, sections.length, 'Scrolling back must not double-count views');

  await page.click('[data-homepage-section="Support"] a[href="/donate/"]');
  await page.waitForSelector('#financial-supporters-heading');
  await scrollPage();
  assert.equal((await events()).length, sections.length, 'Donation-page donors must not send homepage views');
  await page.click('.navbar__brand');
  await page.waitForFunction(() => window.__analytics.filter(([name]) =>
    name === 'Homepage Section Viewed: Hero').length === 2);

  await page.setViewport({ width: 390, height: 844 });
  await page.goto(url);
  await page.waitForSelector('[data-homepage-section="Hero"]');
  await scrollPage();
  const mobileSections = sections.filter(name => !['Protocols', 'FAQ', 'Store', 'Sponsors'].includes(name));
  await page.waitForFunction(count => window.__analytics.length >= count, {}, mobileSections.length);
  assert.deepEqual((await events()).map(([name]) => name).sort(),
    mobileSections.map(section => `Homepage Section Viewed: ${section}`).sort());
  console.log('PASS: desktop/mobile visibility, once per visit, revisit, and donation-page exclusion');
}

const browser = await puppeteer.launch({
  headless: true,
  args: process.argv.includes('--no-sandbox') ? ['--no-sandbox'] : [],
});
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => request.url().startsWith('https://plausible.io/')
    ? request.abort() : request.continue());
  await page.evaluateOnNewDocument(() => {
    window.__analytics = [];
    window.plausible = (...args) => window.__analytics.push(args);
  });
  await verifyHomepageAnalytics(page, process.argv[2] || 'http://127.0.0.1:3000/');
} finally {
  await browser.close();
}
