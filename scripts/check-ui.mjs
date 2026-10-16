import { chromium } from 'playwright';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 for(const path of ['/','/blog','/blog/scaling-laravel-for-high-traffic']){
  await page.goto('http://127.0.0.1:5173'+path); await page.locator('h1').waitFor(); await page.waitForTimeout(900);
  const issues=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)}));
  if(issues.overflow||issues.broken.length) throw Error(JSON.stringify({width,path,...issues}));
 }
}
await page.goto('http://127.0.0.1:5173/blog');
await page.getByRole('textbox',{name:'Search posts'}).fill('performance');
await page.waitForTimeout(500);
if(await page.getByText('No posts found').count()) throw Error('Featured article missing from search');
await page.goto('http://127.0.0.1:5173/');
await page.getByRole('button',{name:'view details →'}).first().click();
await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
await page.getByRole('dialog').waitFor({state:'detached'});
await page.setViewportSize({width:390,height:844});
await page.screenshot({path:'/tmp/portfolio-mobile.png',fullPage:true});
if(errors.length) throw Error(errors.join('\n'));
console.log('PASS: 15 viewport/route checks; image loading; featured search; project dialog Escape; no browser errors');
await browser.close();
