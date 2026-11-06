import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
const html=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'index.html'),'utf8');
const fail=[];
for(const marker of ['PARTNER-REVIEW CONCEPT','No active affiliate links','Age Verification Not Yet Available','CONCEPT','Partner pending'])if(!html.toUpperCase().includes(marker.toUpperCase()))fail.push('Missing safe marker: '+marker);
for(const [name,re] of [
['external media and embedded content',/<\s*(?:img|picture|video|audio|iframe|source|track|embed|object|svg|canvas)\b/i],
['external script',/<\s*script\b[^>]*\bsrc\s*=/i],
['network fetch, import or URL',/(?:@import\b|url\s*\(|\bfetch\s*\(|\bXMLHttpRequest\b|\bWebSocket\b|\bsendBeacon\b|\bEventSource\b|\bimport\s*\()/i],
['redirect or window opening',/(?:location\s*\.\s*(?:href|assign|replace)|window\s*\.\s*open\s*\()/i]
])if(re.test(html))fail.push('Prohibited '+name);
for(const match of html.matchAll(/\b(?:href|src|srcset|poster|action)\s*=\s*(["'])(.*?)\1/gi))if(!/^#[a-zA-Z0-9_-]+$/.test(match[2]))fail.push('External URL/asset');
const cardButtons=[...html.matchAll(/<button\b[^>]*\bclass=["']visit["'][^>]*>/gi)];
if(cardButtons.length!==4||cardButtons.some(m=>!(/\bdisabled\b/.test(m[0]))))fail.push('Unapproved affiliate cards');
if(!/<button\b[^>]*\bdisabled\b[^>]*>\s*Age Verification Not Yet Available\s*<\/button>/i.test(html))fail.push('Age verification not disabled');
if(fail.length){console.error(fail.join('\n'));process.exit(1)}else console.log('PASS: fail-closed single-file concept only');
