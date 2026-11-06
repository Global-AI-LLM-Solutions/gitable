import https from 'node:https';
const target=process.argv[2];
if(target!=='https://afterdark.globalaiswarms.com/')throw new Error('Unexpected verification target.');
const required=['AFTER DARK','Age Verification Not Yet Available','No active affiliate links','Partner pending'];
const req=https.get(target,{timeout:15000,headers:{'User-Agent':'AfterDark-Release-Check/1.0'}},res=>{
  if(res.statusCode!==200)throw new Error('Unexpected HTTPS status: '+res.statusCode);
  if(!res.socket.authorized)throw new Error('TLS certificate not verified');
  const chunks=[];let size=0;
  res.on('data',b=>{size+=b.length;if(size>200000)res.destroy(new Error('Unexpected response size'));else chunks.push(b)});
  res.on('end',()=>{
    const html=Buffer.concat(chunks).toString('utf8');
    for(const text of required)if(!html.toLowerCase().includes(text.toLowerCase()))throw new Error('Missing live marker: '+text);
    if(/<\s*(?:img|video|iframe|embed|object)\b/i.test(html))throw new Error('Media elements in response');
    console.log('PASS: public HTTPS response, valid certificate and non-explicit content markers.');
  });
});
req.on('error',e=>{console.error('Live verification failed:',e.message);process.exitCode=1});
req.on('timeout',()=>req.destroy(new Error('HTTPS timeout')));
