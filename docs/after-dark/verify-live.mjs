import https from 'node:https';
const target=process.argv[2];
const prod='https://afterdark.globalaiswarms.com/';
const preview=/^https:\/\/[0-9]{10,}--afterdark--globalaiswarms--com\.surge\.sh\/$/;
if(target!==prod&&!preview.test(target))throw new Error('Unexpected verification hostname.');
const required=['After Dark™','Age Verification Not Yet Available','No active affiliate links','Partner pending'];
const req=https.get(target,{timeout:15000,rejectUnauthorized:true,headers:{'User-Agent':'AfterDark-ReleaseCheck/1.0'}},res=>{
  if(res.statusCode!==200){res.resume();console.error('FAIL: HTTPS returned '+res.statusCode);process.exitCode=1;return}
  const chunks=[];let size=0;
  res.on('data',b=>{size+=b.length;if(size>200000)res.destroy(new Error('Unexpected response size'));else chunks.push(b)});
  res.on('end',()=>{
    const html=Buffer.concat(chunks).toString('utf8');
    const missing=required.filter(t=>!html.toLowerCase().includes(t.toLowerCase()));
    if(missing.length||/<\s*(?:img|video|iframe|embed|object)\b/i.test(html)){
      console.error('FAIL: content verification: '+missing.join(', '));process.exitCode=1;
    }else console.log('PASS: trusted HTTPS, expected host, non-explicit static concept.');
  });
});
req.on('error',e=>{console.error('FAIL: HTTPS verification: '+e.message);process.exitCode=1});
req.on('timeout',()=>req.destroy(new Error('Request timeout')));
