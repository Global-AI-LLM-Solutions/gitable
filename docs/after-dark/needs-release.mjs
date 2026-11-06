/**
 * Idempotency check for After Dark automatic deployment.
 * Produces GITHUB_OUTPUT deploy=yes/no; never sends private data.
 * Only compare a single specific public HTTPS URL with the reviewed static file.
 * Failure to reach the site means a first deployment is needed, not a passing live check.
 */
import https from 'node:https';
import {readFileSync, appendFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createHash} from 'node:crypto';

const url = 'https://afterdark.globalaiswarms.com/';
const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'index.html'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const expected = digest(html);
function finish(needsDeployment, reason) {
  const result = needsDeployment ? 'yes' : 'no';
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, 'deploy=' + result + '\n');
  }
  console.log(reason + '. Automated deployment required: ' + result);
}
const req = https.get(url, {timeout:15000, headers:{'User-Agent':'AfterDark-Publish-Check/1.0'}}, res => {
  if (res.statusCode !== 200 || !res.socket?.authorized) {
    res.resume();
    return finish(true, 'Existing site is not confirmed healthy');
  }
  const parts=[]; let size=0;
  res.on('data',chunk=>{
    size+=chunk.length;
    if(size>200000)res.destroy(new Error('Unexpected response size'));
    else parts.push(chunk);
  });
  res.on('end',()=>{
    finish(digest(Buffer.concat(parts)) !== expected, 'Compared live content against the approved source');
  });
});
req.on('error',err=>finish(true, 'Live site not available for comparison'));
req.on('timeout',()=>req.destroy(new Error('Network timeout')));
