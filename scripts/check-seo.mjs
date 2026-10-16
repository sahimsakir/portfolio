import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const sitemap=readFileSync('dist/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]));
assert.equal(urls.length,5);
for(const url of urls){
 const file='dist'+(url.pathname==='/'?'/index.html':url.pathname+'/index.html');
 const html=readFileSync(file,'utf8');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert(html.includes(`href="${url.href}"`));
 assert.equal((html.match(/property="og:title"/g)||[]).length,1);
 assert(!html.includes('PLACEHOLDER'));
 for(const [,raw] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(raw);
 if(url.pathname.startsWith('/blog/')){assert(html.includes('BlogPosting'));assert(html.includes('<noscript><article>'));}
}
for(const name of ['rtb','sync','catalog','cloud'])for(const suffix of ['','-640'])assert(existsSync(`dist/images/${name}${suffix}.webp`));
for(const name of ['rtb','sync','catalog','cloud'])for(const suffix of ['','-640'])assert(existsSync(`dist/images/project-ui-${name}${suffix}.webp`));
console.log('PASS: five route HTML files, unique canonical/social tags, valid schema JSON, article fallback text, eight image assets');
