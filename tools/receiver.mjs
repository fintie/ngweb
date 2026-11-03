// Loopback-only receiver: browser page POSTs extracted JSON here, saved to out/
import http from 'node:http'; import fs from 'node:fs';
const H={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'*','Access-Control-Allow-Private-Network':'true'};
http.createServer((req,res)=>{
  if(req.method==='OPTIONS'){res.writeHead(204,H);return res.end();}
  const m=req.url.match(/^\/save\/([a-z0-9._-]+)$/i);
  if(req.method!=='POST'||!m){res.writeHead(404,H);return res.end();}
  let b='';req.on('data',c=>b+=c);req.on('end',()=>{fs.writeFileSync('out/'+m[1],b);res.writeHead(200,H);res.end('ok '+b.length);console.log('saved',m[1],b.length);});
}).listen(8799,'127.0.0.1',()=>console.log('listening 127.0.0.1:8799'));
