import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const validator=readFileSync(new URL('../validate-preview.mjs',import.meta.url),'utf8');
const policy=JSON.parse(readFileSync(new URL('../content-policy.json',import.meta.url),'utf8'));
test('age assurance remains disabled',()=>assert.match(html,/<button[^>]*disabled[^>]*>\s*Age Verification Not Yet Available\s*<\/button>/i));
test('affiliate cards remain disabled',()=>{
 const buttons=[...html.matchAll(/<button\b[^>]*class=["']visit["'][^>]*>/gi)];
 assert.equal(buttons.length,4);
 for(const [tag] of buttons) assert.match(tag,/\bdisabled\b/);
});
test('all local navigation remains fragment-only',()=>{
 for(const [, ,href] of html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi))assert.match(href,/^#[\w-]+$/);
});
test('no externally loaded media or executable scripts',()=>{
 assert.doesNotMatch(html,/<(?:img|video|audio|iframe|picture|source|embed|object)\b/i);
 assert.doesNotMatch(html,/<script\b[^>]*src\s*=/i);
});
test('release policy remains fail closed',()=>{
 assert.equal(policy.default,'deny');
 assert.equal(policy.media.render,false);
 assert.equal(policy.monetisation.enabled,false);
 assert.equal(policy.enforcement,undefined);
});
test('shared validator exists and checks prohibited elements',()=>assert.match(validator,/prohibited|Prohibited/i));
