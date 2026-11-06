import https from 'node:https';
const url = new URL(process.argv[2] || '');
const validProduction = url.href === 'https://afterdark.globalaiswarms.com/';
const validRevision = /^https:\/\/[0-9]{10,}--afterdark--globalaiswarms--com\.surge\.sh\/$/.test(url.href);
if (!validProduction && !validRevision) throw new Error('Verification destination is not allowlisted.');
const required = [
  'AFTER DARK',
  'Age Verification Not Yet Available',
  'No active affiliate links',
  'Partner pending',
  'CONCEPT'
];
const req = https.get(url, {
  timeout: 20000,
  headers: {'User-Agent':'AfterDark-Release-Check/1.0', 'Accept':'text/html'}
}, response => {
  if (response.statusCode !== 200) throw new Error('Unexpected HTTPS status: '+response.statusCode);
  if (!response.socket?.authorized) throw new Error('Invalid HTTPS certificate');
  if (!String(response.headers['content-type'] || '').toLowerCase().includes('text/html')) {
    throw new Error('Unexpected Content-Type');
  }
  let size = 0;
  const chunks = [];
  response.on('data',chunk=>{
    size += chunk.length;
    if (size > 200000) response.destroy(new Error('Response exceeds expected size'));
    else chunks.push(chunk);
  });
  response.on('end',()=>{
    const html = Buffer.concat(chunks).toString('utf8');
    for (const text of required) if (!html.toLowerCase().includes(text.toLowerCase())) {
      throw new Error('Missing live safety marker: '+text);
    }
    if (/<\s*(?:img|video|iframe|embed|object)\b/i.test(html)) {
      throw new Error('Unapproved media elements found live');
    }
    console.log('PASS: valid HTTPS, expected HTML and prelaunch release markers at '+url.host);
  });
});
req.on('error',err=>{ console.error('Verification failed:',err.message); process.exitCode = 1; });
req.on('timeout',()=>req.destroy(new Error('Timed out checking HTTPS')));
