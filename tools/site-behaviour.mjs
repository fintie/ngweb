// Uses the built site like a visitor: phone menu, forms, planner in both languages, old addresses, open and close rows. Prints what actually happened. Usage: node tools/site-behaviour.mjs <base>
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const base = process.argv[2]; const browser = await chromium.launch(); let bad = 0;
const check = (name, ok, info = '') => { if (!ok) bad++; console.log(ok ? 'ok ' : 'NOT', name, info); };
const mailto = async (page) => { const cdp = await page.context().newCDPSession(page); await cdp.send('Page.enable'); let url = ''; cdp.on('Page.frameRequestedNavigation', (e) => { url = e.url; }); return () => url; };

// phone
const ph = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
let p = await ph.newPage(); await p.goto(base + '/'); await p.waitForTimeout(1300);
const b = await p.locator('#mbtn').boundingBox(); check('menu button fully on a 375 wide screen', b && b.x >= 0 && b.x + b.width <= 375, JSON.stringify(b));
const hdr = await p.evaluate(() => [...document.querySelectorAll('header > *')].filter((e) => e.offsetWidth).map((e) => Math.round(e.getBoundingClientRect().right))); check('nothing in the header runs off the screen', Math.max(...hdr) <= 375, hdr.join(' '));
await p.locator('#mbtn').tap(); await p.waitForTimeout(800);
check('menu opens', await p.evaluate(() => getComputedStyle(document.querySelector('#mm')).visibility === 'visible'), await p.locator('#mbtn').textContent());
await p.locator('#mm summary').first().tap(); await p.waitForTimeout(500); check('phone menu group opens', await p.locator('#mm a[href="/solutions/#knowledge"]').isVisible());
await p.screenshot({ path: 'out/shots/site/menu.jpg', type: 'jpeg', quality: 70 });
await p.locator('#mm a[href="/solutions/#knowledge"]').tap(); await p.waitForTimeout(1200); check('phone menu link goes to the service, row open, menu closed', p.url().endsWith('/solutions/#knowledge') && await p.evaluate(() => document.querySelector('#knowledge').classList.contains('open') && !document.body.classList.contains('menu')), p.url().replace(base, ''));
await p.close(); await ph.close();

// desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); p = await ctx.newPage();
for (const [o, n] of [['service', '/solutions/'], ['use-cases', '/projects/'], ['opc', '/one-person-business/'], ['workshop', '/workshops/'], ['faq', '/faq/'], ['blog/top-ai-meetups-in-sydney', '/blog/top-ai-meetups-in-sydney/']]) { await p.goto(`${base}/#/${o}`); await p.waitForTimeout(700); check(`old address /#/${o}`, p.url().endsWith(n), p.url().replace(base, '')); }
// top menu with mouse and with keyboard
await p.goto(base + '/'); await p.waitForTimeout(1500);
const open = () => p.evaluate(() => ({ panel: document.querySelector('.dd.open')?.id ?? null, overlay: document.querySelector('#ov').classList.contains('on') }));
await p.mouse.move(700, 500); check('closed at the start', (await open()).panel === null);
await p.locator('.hd[data-dd=dd-sol] > a').hover(); await p.waitForTimeout(450); let st = await open(); check('mouse on Solutions opens its panel and darkens the page', st.panel === 'dd-sol' && st.overlay, JSON.stringify(st));
await p.screenshot({ path: 'out/shots/site/panel.jpg', type: 'jpeg', quality: 75 });
const li = await p.locator('#dd-sol li a').nth(1).boundingBox(); await p.mouse.move(li.x + 40, li.y + 8, { steps: 10 }); await p.waitForTimeout(450); check('panel stays open on the way to a link', (await open()).panel === 'dd-sol');
await p.locator('.hd[data-dd=dd-com] > a').hover(); await p.waitForTimeout(450); check('next item swaps the panel', (await open()).panel === 'dd-com');
await p.mouse.move(700, 800, { steps: 6 }); await p.waitForTimeout(700); check('leaving closes it', (await open()).panel === null);
await p.locator('.hd[data-dd=dd-pro] > button').focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400); check('keyboard opens a panel', (await open()).panel === 'dd-pro');
await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); check('Tab reaches the panel links', await p.evaluate(() => !!document.activeElement.closest('.dd')), await p.evaluate(() => document.activeElement.textContent.slice(0, 30)));
await p.keyboard.press('Escape'); await p.waitForTimeout(400); check('Escape closes and returns to the button', (await open()).panel === null && await p.evaluate(() => document.activeElement.matches('.hd > button')));
await p.locator('.hd[data-dd=dd-sol] > a').hover(); await p.waitForTimeout(400); await p.locator('#dd-sol a[href="/solutions/#support"]').click(); await p.waitForTimeout(1200); check('panel link lands on the opened service', p.url().endsWith('/solutions/#support') && await p.evaluate(() => document.querySelector('#support').classList.contains('open')), p.url().replace(base, ''));
await p.goto(base + '/blog/top-ai-meetups-in-sydney/'); await p.waitForTimeout(900); check('breadcrumb shows the way back', (await p.locator('.crumbs').textContent()).replace(/\s+/g, ' ').includes('Insights'), (await p.locator('.crumbs').textContent()).replace(/\s+/g, ' ').trim().slice(0, 60));
check('article text carries real links', (await p.locator('.prose a').count()) >= 2, String(await p.locator('.prose a').count()));

await p.goto(base + '/contact/'); await p.waitForTimeout(1200); const got = await mailto(p);
await p.fill('form[data-mail] [name=name]', 'Test Person'); await p.fill('form[data-mail] [name=email]', 'test@example.com'); await p.fill('form[data-mail] [name=message]', 'One slow process'); await p.selectOption('form[data-mail] [name=interest]', { index: 1 });
await p.locator('form[data-mail] button').click(); await p.waitForTimeout(600); const m = decodeURIComponent(got()); check('contact form prepares an email, sends nothing', m.startsWith('mailto:info@nextgenius.com.au') && m.includes('One slow process') && m.includes('Test Person'), m.slice(0, 90).replace(/\n/g, ' '));
await p.goto(base + '/solutions/'); await p.waitForTimeout(1200); const rows = p.locator('.row'); await rows.nth(1).locator('button').scrollIntoViewIfNeeded(); await p.waitForTimeout(900); await rows.nth(1).locator('button').click(); await p.waitForTimeout(800); check('row opens', (await rows.nth(1).locator('.body').boundingBox()).height > 40);
for (const [path, lang] of [['/one-person-business/', 'en'], ['/one-person-business/zh/', 'zh']]) {
  await p.goto(base + path); await p.waitForTimeout(1200); await p.locator('#opcExample').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await p.locator('#opcExample').click(); await p.locator('#opcForm button[type=submit]').scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await p.locator('#opcForm button[type=submit]').click(); await p.waitForTimeout(700);
  const plan = await p.locator('#opcPlan').textContent(); const shown = await p.locator('#opcResult').isVisible(); const href = await p.locator('#opcDiscuss').getAttribute('href');
  check(`planner ${lang} gives a plan`, shown && plan.length > 400 && (lang === 'zh' ? /[一-龥]/.test(plan) : /Positioning/.test(plan)), plan.slice(0, 60).replace(/\n/g, ' ')); check(`planner ${lang} email draft`, /^mailto:info@nextgenius\.com\.au/.test(href));
}
await browser.close(); console.log(bad ? `${bad} failed` : 'all passed'); process.exit(bad ? 1 : 0);
