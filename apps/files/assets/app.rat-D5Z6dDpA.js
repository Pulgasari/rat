const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DB16kTnb.js","./preload-helper-Cc2_yIPf.js","./withControl-ByYV6CO-.js","./index-CgHh2HpB.js","./index-BTMqK-yh.css"])))=>i.map(i=>d[i]);
var ea=Object.defineProperty;var a=(e,t)=>ea(e,"name",{value:t,configurable:!0});import{k as ot,m as v,o as ta,q as Ht,t as Wt,u as Vt,v as Gt,i as Jt,w as na,x as Yt,y as aa,z as oa,A as ia,P as la,C as P,E as Kt,S as E,$ as Qt,G as Q,H as w,g as Le,J as Be,K as Ee,M as he,O as Xt,Q as ra,T as re,V as sa,W as ht,X as fe,Y as Ft}from"./index-DB16kTnb.js";import{p as ca,a as ua}from"./keys-CWTtq0D5.js";import{_ as da}from"./preload-helper-Cc2_yIPf.js";import{h as s,f as k,w as m}from"./withControl-ByYV6CO-.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function ke(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],l=t[o];n[o]=ot(i)?i:v(()=>e[o]===void 0&&l?l():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(ke,"signalsOf");function p(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return ot(i)?i.value:i},set value(i){const l=o();if(!ot(l))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");l.value=i}}}a(p,"imported");function $(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?ca(t):null;let l=o;return function(r){if(!(o&&!l)&&!(i&&!ua(r,i))){n&&r.preventDefault(),o&&l--;try{const c=(typeof e=="string"?ta(e):e).call(this,r);typeof c?.catch=="function"&&c.catch(d=>Ht(this,d,"handler"))}catch(c){Ht(this,c,"handler")}}}}a($,"listener");const fa={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function pa(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a(pa,"extOf");class te{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof te?t:new te(pa(t))}get mimeType(){return fa[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}const ha=a(()=>new Jt({initial:"",kind:"fileext",run:a((e,t)=>e instanceof te?{value:e}:na(e)?{value:new te(e)}:Yt("expected an extension",t),"run")}),"fileExtOf"),_t=Wt(Vt(te,ha,{kind:"fileext",make:Gt,name:"FileExt"})),Ze=new Map;class Z extends oa{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof Z)return t;const n=ia(t,"/").join("/");return Ze.has(n)||Ze.set(n,new Z(n)),Ze.get(n)}static get root(){return Z.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return _t.from(this.name)}child(t){return this.with(t)}}const ma=a(()=>new Jt({initial:"",kind:"path",run:a((e,t)=>aa(e)?{value:Z.from(e)}:Yt("expected a path",t),"run")}),"pathOf$1"),D=Wt(Vt(Z,ma,{kind:"path",make:Gt,name:"Path"})),He=a(e=>(t,n)=>la.notify(t,{...n,type:e}),"notify"),Ie=Object.assign(He("info"),{error:He("error"),info:He("info"),success:He("success")}),$a=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function I(e,t=D.root){let n=e;for(const o of D.from(t))n=await n.getDirectoryHandle(o);return n}a(I,"dirAt");async function va(e,t=D.root){const n=await I(e,t),o=[];for await(const l of n.values())o.push(l);return(await Promise.all(o.map(async l=>{if(l.kind==="directory")return{kind:"directory",name:l.name};const r=await l.peekFile?.()??await l.getFile();return{kind:"file",lastModified:r.lastModified,name:l.name,size:r.size,type:r.type}}))).sort($a)}a(va,"list$1");async function mt(e,t,n){return(await(await I(e,t)).getFileHandle(n)).getFile()}a(mt,"readFile");async function ga(e,t,n){await(await I(e,t)).getDirectoryHandle(n,{create:!0})}a(ga,"mkdir");async function ba(e,t,n){await(await I(e,t)).removeEntry(n,{recursive:!0})}a(ba,"remove$3");async function wa(e,t,n,o,i){const l=await I(e,t),r=i==="directory"?await l.getDirectoryHandle(n):await l.getFileHandle(n);if(typeof r.move=="function")try{await r.move(o);return}catch{}i==="directory"?await vt(r,l,o):await $t(r,l,o),await l.removeEntry(n,{recursive:!0})}a(wa,"rename");async function $t(e,t,n,o){const i=await e.getFile(),r=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(r instanceof WritableStream)){await r.write(await i.arrayBuffer()),await r.close();return}try{await i.stream().pipeTo(r,{signal:o})}catch(c){throw await r.abort?.().catch(()=>{}),c}}a($t,"copyFile");async function vt(e,t,n,o,i=()=>{}){const l=await t.getDirectoryHandle(n,{create:!0});for await(const r of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");r.kind==="directory"?await vt(r,l,r.name,o,i):(await $t(r,l,r.name,o),i())}}a(vt,"copyTree");const{folders:Y}=RAT.app,{perms:ya,ready:ka,sources:Zt}=ke(Y,{perms:null,ready:null,sources:null}),z=v(()=>Zt.value.at(-1)??null),xa=v(()=>z.value?ya.value[z.value.id]??null:null),gt=v(()=>xa.value==="granted"?Y.handleOf(z.value.id):null),en=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",Ra=a(()=>Y.load(),"load");async function Ta(){const e=Zt.value.map(n=>n.id),t=await Y.add();if(t)for(const n of e)await Y.remove(n);return t}a(Ta,"grant");async function Aa(){return z.value?Y.reconnect(z.value.id):{granted:!1}}a(Aa,"reconnect$1");async function Sa(){z.value&&await Y.remove(z.value.id)}a(Sa,"forget$2");const Oa=p(()=>z),Ea={folder:E,name:E,path:D},Ha={icon:E,label:E},bt=P("bookmarks",Kt(Ea).create()),it=P("folderTyped",Qt(E,E).create()),tn=P("ownFolderTypes",Qt(E,Ha).create()),me=v(()=>String(Oa.value?.id??"")),nn=a(e=>`${me.value}:${e}`,"keyOf"),wt={audio:{icon:"audio",label:"Audio"},documents:{icon:"document",label:"Documents"},images:{icon:"image",label:"Images"},video:{icon:"video",label:"Videos"}},an=v(()=>({...wt,...tn.toJSON()})),on=a(e=>it.get(nn(e))??null,"folderTypeIdOf"),ln=a(e=>an.value[on(e)]??null,"folderTypeOf");function lt(e,t){const n=nn(e);t?it.set(n,t):it.delete(n)}a(lt,"setFolderType");function Fa({icon:e="folder",label:t}){const n=crypto.randomUUID();return tn.set(n,{icon:e,label:t}),n}a(Fa,"addFolderType");function Da(e,t){const n=e.filter(r=>r.kind==="file"),o={};for(const r of n)o[t(r)]=(o[t(r)]??0)+1;const[i,l]=Object.entries(o).sort((r,c)=>c[1]-r[1])[0]??[];return i in wt&&l/n.length>=.6?i:null}a(Da,"suggestFolderType");const za=a(()=>bt.where({folder:me.value}),"bookmarks"),Na=a(e=>bt.has({folder:me.value,path:e}),"isBookmarked"),Ma=a((e,t)=>bt.toggle({folder:me.value,name:t,path:e},{folder:me.value,path:e}),"toggleBookmark"),ja=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function Ca(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(Ca,"toBase64");const Pa=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),La=new Set([101,204,205,304]);async function Ba(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:l}={}){const r=ja();if(!r)return fetch(e,{body:t,headers:n,method:o,signal:i});const c=await r.request({body:await Ca(t),headers:n,method:o,timeout:l,url:e});return new Response(La.has(c.status)?null:Pa(c.data),{headers:c.headers,status:c.status,statusText:c.statusText})}a(Ba,"request$2");const Ia=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Ua=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),rn=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),_=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function sn(e,t="",n=!1){const o=new URL(Ua(t),rn(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(sn,"urlFor");const qa={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class et extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function se(e,t,{body:n,headers:o={},isDir:i=!1,method:l="GET"}={}){if(!e)throw new Error("No webdav connection.");let r;try{r=await Ba(sn(e,t,i),{body:n,headers:{Authorization:Ia(e),...o},method:l})}catch(c){throw globalThis.Capacitor?.isNativePlatform?.()?new et(0,`Connection failed: ${c?.message??c}`):new et(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!r.ok)throw new et(r.status,qa[r.status]??`${r.status} ${r.statusText}`);return r}a(se,"request$1");const Wa='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',rt="DAV:",Fe=a((e,t)=>e.getElementsByTagNameNS(rt,t)[0]?.textContent??"","firstText");async function cn(e,t,n){const o=await se(e,t,{body:Wa,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),l=new URL(rn(e)).pathname,r=a(c=>{const d=decodeURIComponent(new URL(c,e.url).pathname);return(d.startsWith(l)?d.slice(l.length):d).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(rt,"response")].map(c=>{const d=r(Fe(c,"href"));return{isDir:c.getElementsByTagNameNS(rt,"collection").length>0,lastModified:Date.parse(Fe(c,"getlastmodified"))||0,mime:Fe(c,"getcontenttype"),name:d.split("/").pop(),path:d,size:Number(Fe(c,"getcontentlength"))||0}})}a(cn,"propfind");async function un(e,t=""){const n=_(t);return(await cn(e,t,1)).filter(i=>i.path!==n).sort((i,l)=>i.isDir===l.isDir?i.name.localeCompare(l.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(un,"list");async function tt(e,t){try{return(await cn(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(tt,"stat");const Va=a(async(e,t)=>(await se(e,t)).blob(),"read"),dn=a((e,t,n)=>se(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Ga=a((e,t)=>se(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Ja=a((e,t,n=!1)=>se(e,t,{isDir:n,method:"DELETE"}),"remove$2"),Ya=a((e,t,n)=>({Destination:sn(e,t,n),Overwrite:"F"}),"destination"),fn=a((e,t,n,o=!1)=>se(e,t,{headers:Ya(e,n,o),isDir:o,method:"MOVE"}),"move"),Ka=a(e=>un(e,""),"test"),nt=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),Dt=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class Ue{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof Ue&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class zt extends Ue{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await Va(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await dn(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=_(t.path,n);await fn(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ee extends Ue{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await un(this.connection,this.path))yield[t.name,t.isDir?new ee(this.connection,t.path,t.name):new zt(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=_(this.path,t),i=await tt(this.connection,o);if(i&&!i.isDir)throw Dt(t);if(!i){if(!n)throw nt(t);await Ga(this.connection,o)}return new ee(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=_(this.path,t),i=await tt(this.connection,o);if(i?.isDir)throw Dt(t);if(!i){if(!n)throw nt(t);await dn(this.connection,o,new Blob([]))}return new zt(this.connection,o,t,i)}async removeEntry(t){const n=_(this.path,t),o=await tt(this.connection,n);if(!o)throw nt(t);await Ja(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=_(t.path,n);await fn(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Qa=a(e=>new ee(e,"",e.name||new URL(e.url).host),"davRoot"),{files:pn}=RAT.app,hn="remotes.json",ze=new Map,Xa={id:E,name:E,password:E,url:E,username:E},xe=Kt(Xa).create(await pn.read(hn,"json").catch(()=>[]));Q(()=>pn.write(hn,JSON.stringify(xe)));const mn=v(()=>xe.toArray()),$n=a(e=>xe.one({id:e})??null,"byId");async function _a({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const l={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await Ka(l),xe.push(l),l}a(_a,"add$1");function Za(e){xe.drop({id:e}),ze.delete(e)}a(Za,"remove$1");function eo(e){const t=$n(e);return t?(ze.has(e)||ze.set(e,Qa(t)),ze.get(e)):null}a(eo,"rootOf");const qe=[{icon:"image",id:"images",label:"Images"},{icon:"audio",id:"audio",label:"Audio"},{icon:"video",id:"video",label:"Videos"},{icon:"document",id:"documents",label:"Documents"},{icon:"archive",id:"archives",label:"Archives"},{icon:"file",id:"other",label:"Other"}],to=["csv","doc","docx","epub","htm","html","json","md","odp","ods","odt","pdf","ppt","pptx","rtf","txt","xls","xlsx","xml"],no=["7z","bz2","gz","rar","tar","xz","zip","zst"];function ne({name:e,type:t}){const n=_t.from(e),o=t||n.mimeType;return o.startsWith("image/")?"images":o.startsWith("audio/")?"audio":o.startsWith("video/")?"video":o.startsWith("text/")||n.is(...to)?"documents":n.is(...no)?"archives":"other"}a(ne,"categoryOf");let j=w(null),ae=w(null);const{files:yt}=RAT.app,ao=24,oo=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),kt=a(e=>`index/${e.id}.json`,"pathOf");let de=null;async function vn(e,t,n,o){const i=[],l=[];for await(const r of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");oo(r.name)||(r.kind==="directory"?i.push(r):l.push(Promise.resolve(r.peekFile?.()??r.getFile()).then(c=>({lastModified:c.lastModified,name:r.name,path:t,size:c.size,type:c.type}),()=>null)))}for(const r of await Promise.all(l))r&&n.push(r);ae.value={files:n.length};for(const r of i)await vn(r,t.child(r.name),n,o)}a(vn,"walk");function io(e){const t=Object.fromEntries(qe.map(({id:i})=>[i,{count:0,size:0}]));let n=0;for(const i of e){const l=t[ne(i)];l.count++,l.size+=i.size,n+=i.size}const o=e.toSorted((i,l)=>l.lastModified-i.lastModified).slice(0,ao);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(io,"summarize");const Nt=a(e=>({...e,path:D.from(e.path)}),"revive");async function lo(e){const t=e?await yt.read(kt(e),"json").catch(()=>null):null;return j.value=t&&{...t,files:t.files.map(Nt),recent:t.recent.map(Nt)},j.value}a(lo,"restore");async function ro(e,t){de?.abort();const n=new AbortController;de=n;const o=[];ae.value={files:0};try{return await vn(e,D.root,o,n.signal),j.value=io(o),await yt.write(kt(t),JSON.stringify(j.value)),j.value}catch(i){if(i?.name!=="AbortError")throw i;return null}finally{de===n&&(de=null,ae.value=null)}}a(ro,"scan");const gn=a(()=>de?.abort(),"stop$1");async function so(e){gn(),j.value=null,e&&await yt.remove(kt(e)).catch(()=>{})}a(so,"forget$1");function co(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const i of j.value?.files??[])if(i.name.toLowerCase().includes(n)&&o.push(i),o.length>=t)break;return o}a(co,"search");const uo=50,We=new Le,Ne=P("ended",new Le),bn=v(()=>We.toArray()),fo=v(()=>Ne.toArray()),po=v(()=>We.has({state:"running"})),wn=new WeakMap,yn=new Map,ho=a(e=>e?.name==="AbortError","isAbort"),mo=a(e=>(yn.get(e)??Promise.resolve()).catch(()=>{}),"after");function at(e,t){Object.assign(e,t,{endedAt:Date.now()}),We.remove(e),Ne.unshift(e.toJSON()),Ne.splice(uo)}a(at,"finish");function Ve({icon:e="pending",label:t,lane:n="default"},o){const i=new AbortController,{signal:l}=i,r=new Be({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});wn.set(r,i),We.push(r);const c=a((u,g)=>{r.progress={done:u,total:g}},"progress"),d=mo(n).then(async()=>{if(l.aborted)return at(r,{state:"cancelled"}),null;Object.assign(r,{startedAt:Date.now(),state:"running"});try{const u=await o({progress:c,signal:l});return at(r,{state:l.aborted?"cancelled":"done"}),u}catch(u){throw at(r,ho(u)?{state:"cancelled"}:{error:String(u?.message??u),state:"failed"}),u}});return yn.set(n,d),d}a(Ve,"run");const $o=a(e=>wn.get(e)?.abort(),"cancel"),vo=a(()=>Ne.clear(),"clearHistory"),{dialogs:go}=RAT.app,L=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),kn=a(()=>!!L(),"available$1"),xn=["https","http"],st=53317;let $e=w(null),ct=w([]),Rn=w(null),B=w([]),ve=P("targets",[]),ut=P("folderName","");function bo(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const l=new URL(n.replace(/^filesync:\/\//,"http://")),r=l.searchParams.get("protocol");return{fingerprint:l.searchParams.get("fingerprint")??"",host:l.hostname,port:Number(l.port)||st,protocol:xn.includes(r)?r:t}}catch{return null}const[o,i]=n.split(":");return{fingerprint:"",host:o,port:Number(i)||st,protocol:t}}a(bo,"parseTarget");const Me=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),je=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),wo=a(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??st,protocol:e.protocol??"https"}),"targetOf");function yo(e){const t=ve.value.filter(n=>!je(n,e));ve.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8)}a(yo,"remember");function ko(e){ve.value=ve.value.filter(t=>!je(t,e))}a(ko,"forget");let Mt=!1;async function Tn(){const e=L();e&&(Mt||(Mt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;ct.value=[t,...ct.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),Rn.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await xt())}a(Tn,"start");const xo=a(()=>L()?.stopDiscovery().catch(()=>{}),"stop");function An(e){const t=new Set(B.value.map(n=>n.uri));B.value=[...B.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(An,"add");async function Ro(){const{files:e=[]}=await L().pickFiles();An(e)}a(Ro,"pickFiles");async function To(e,t,n){const o=await(await I(e,t)).getFileHandle(n.name),i=o._uri??(o.path?`file://${o.path}`:null);if(!i)throw new Error("only files of the folder on this device can be sent");An([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:i}])}a(To,"addEntry");const Ao=a(e=>{B.value=B.value.filter(t=>t.uri!==e)},"remove"),So=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Oo(e,t=B.value,n=""){const o=L();if(!o||!e||!t.length)return Promise.resolve(null);const i=t.length===1?t[0].name:`${t.length} files`;return Ve({icon:"send",label:`Send ${i} to ${Me(e)}`,lane:"send"},async({progress:l})=>{const r=await o.addListener("progress",c=>l(c.sent,c.total));try{const c=a(d=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:d,port:e.port,protocol:e.protocol}),"attempt");try{await c(n)}catch(d){if(!So(d))throw d;const u=await go.prompt({message:`${Me(e)} wants a pin`,ok:"Send",title:"Pin"});if(!u)throw new Error("no pin given");await c(u)}yo(e),B.value=B.value.filter(d=>!t.includes(d))}finally{r.remove()}})}a(Oo,"send");async function xt(){const e=await L()?.getAutoSyncState().catch(()=>null)??null;$e.value=e&&{...e,name:e.tree?ut.value:""}}a(xt,"refreshAutoSync");async function Eo(){const{name:e,uri:t}=await L().pickFolder();t&&(ut.value=e??"",$e.value={...$e.value,name:ut.value,tree:t})}a(Eo,"pickSyncFolder");async function Ho(e,{pin:t="",ssid:n=""}={}){const o=$e.value?.tree;if(!o)throw new Error("pick a folder first");await L().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await xt()}a(Ho,"startAutoSync");async function Fo(){await L().stopAutoSync(),await xt()}a(Fo,"stopAutoSync");const Do=a(()=>L()?.syncNow(),"syncNow");let M=w(null);function zo(e,t,n,o){(M.value?.mode!==e||M.value.placed)&&(M.value=new Be({items:new Le,mode:e,placed:!1})),M.value.items.drop({name:t.name,path:n}),M.value.items.push({kind:t.kind,name:t.name,path:n,root:o})}a(zo,"pick$1");const No=a(()=>{M.value&&(M.value.placed=!0)},"placed"),Sn=a(()=>{M.value=null},"clear");async function jt(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(jt,"exists");async function Mo(e,t,n){if(!await jt(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,i=o>0?t.slice(0,o):t,l=o>0?t.slice(o):"";for(let r=2;;r++){const c=`${i} (${r})${l}`;if(!await jt(e,c))return c}}a(Mo,"freeName");async function On(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await On(n);return t}a(On,"countFiles");async function jo(e,t){const n=await I(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}a(jo,"handleOf");async function Co(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}a(Co,"moved");async function Po(e,t,n,o,{onProgress:i=a(()=>{},"onProgress"),signal:l}={}){const r=[...t],c=r.find(y=>y.kind==="directory"&&o.startsWith(y.path.child(y.name)));if(c)throw new Error(`“${c.name}” can not go into itself`);const d=await I(e,o),u=await Promise.all(r.map(y=>jo(y.root??e,y))),g=await Promise.all(u.map(On)),b=g.reduce((y,A)=>y+A,0);let T=0;const x=a((y=1)=>i(T+=y,b),"report");i(0,b);for(const[y,A]of r.entries()){l?.throwIfAborted();const H=u[y],V=g[y];if(n==="move"&&A.path===o){x(V);continue}const U=await Mo(d,A.name,A.kind);if(n==="move"&&await Co(H,d,U)){x(V);continue}A.kind==="directory"?await vt(H,d,U,l,x):(await $t(H,d,U,l),x()),n==="move"&&await(await I(A.root??e,A.path)).removeEntry(A.name,{recursive:!0})}}a(Po,"transfer");const Ge=p(()=>z),ge=p(()=>gt),Lo=p(()=>j),Ct=p(()=>ae),Bo=p(()=>M),{dialogs:K,router:oe}=RAT.app,Io=["pattern-bg","pattern-tile"],Uo={open:Ee("auto","single","double"),"pattern-bg":E,"pattern-tile":E,searchbar:Ee("bottom","top"),tabbar:Ee("bottom","top"),viewmode:Ee("list","grid")},q=P("settings",Be(Uo).create());Q(()=>{const e=document.documentElement;for(const t of Io){const n=q[t];e.toggleAttribute(`data-${t}`,!!n),n&&da(async()=>{const{patternStyle:o}=await import("./index-DB16kTnb.js").then(i=>i.Z);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||he(()=>q[t])!==n))for(const[i,l]of Object.entries(o))e.style.setProperty(i,l)})}});Q(()=>{const{dataset:e}=document.documentElement;e.searchbar=q.searchbar,e.tabbar=q.tabbar});const qo=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),En=a(()=>q.open==="single"||q.open==="auto"&&qo(),"opensOnTap");let Hn=w(null),be=w([]),Je=w(null),Rt=w(""),dt=w(!1),Fn=w(""),N=w(null),Re=w(null),Dn=w(null);const Wo=Be({path:D,source:E.optional().default(null)}),F=P("tabs",Le(Wo).create([{}]));let J=P("tabIndex",0);const W=v(()=>F.at(J.value)??F.at(0)),O=v(()=>W.value.path),ce=v(()=>W.value.source),zn=new WeakMap,Nn=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function ie(e,t){W.value.path=e,t!==void 0&&(W.value.source=t),N.value=null,Rt.value=""}a(ie,"goTo");function Mn(e=O.value,t=ce.value){F.push({path:e,source:t??null}),J.value=F.length-1,N.value=null}a(Mn,"openTab");function Vo(e){if(F.length===1){ie(D.root);return}const t=F.indexOf(e);Xt(()=>{F.remove(e),(t<J.value||J.value===F.length)&&J.value--})}a(Vo,"closeTab");function Go(e){zn.set(W.value,Nn()?.scrollTop??0),J.value=F.indexOf(e),N.value=null}a(Go,"switchTab");function Tt(e=[]){const t=W.value;Xt(()=>{F.replace(e.length?e:[{}]),J.value=Math.max(0,F.indexOf(t))})}a(Tt,"resetTabs");const Pt=a(e=>e.path.name||Ye(e.source),"tabName"),Te=a(e=>e?eo(e):ge.value,"rootOfSource"),Ye=a(e=>e?$n(e)?.name??"remote":Ge.value?.name??"folder","sourceName"),Ke=a(()=>Te(ce.value),"rootHandle"),we=a(()=>Ye(ce.value),"folderName"),Ae=a(e=>e.source!==void 0?e.source:e.path?null:ce.value,"sourceOf");let jn=w(0),De=0;const Cn=a(()=>{jn.value++},"refresh");Q(()=>{const e=Ke(),t=O.value,n=++De;jn.value,be.value=[],dt.value=!!e,e&&va(e,t).then(o=>{n===De&&(be.value=o,requestAnimationFrame(()=>{const i=Nn();i&&(i.scrollTop=zn.get(he(()=>W.value))??0)}))}).catch(o=>{n===De&&Ie.error(o)}).finally(()=>{n===De&&(dt.value=!1)})});let ft=null;Q(()=>{const e=ge.value,t=Ge.value;!e||!t||ft===t||(ft=t,lo(t).then(()=>Pn(e,t)))});function Pn(e,t){return Ve({icon:"scan",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>gn());const i=Q(()=>{Ct.value&&n(Ct.value.files,null)});return ro(e,t).finally(i)}).catch(n=>console.warn("[files] scan failed",n))}a(Pn,"indexFolder");const Jo=a(()=>{ge.value&&Pn(ge.value,Ge.value)},"rescan"),Yo=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),Ko=v(()=>Yo(be.value,Rt.value)),pt=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ln=a((e,t)=>e.kind==="directory"?t&&ln(t.child(e.name))?.icon||"folder":qe.find(n=>n.id===ne(e))?.icon??"file","iconOf");function le(e,t=O.value){if(e.kind==="directory")return ie(t.child(e.name)),oe.go("/library");Je.value={...e,kind:"file",path:e.path??t,source:Ae(e)},oe.go("/preview")}a(le,"open");function Bn(e){ie(e.path??D.root,Ae(e)),oe.go("/library")}a(Bn,"showInFolder");function Qo(e){if(En())return le(e);N.value=e}a(Qo,"onEntryClick");function In(e){Re.value=null,N.value=e,RAT.app.toggle("context",!0)}a(In,"about");function Xo(){N.value=null,Re.value="tasks",RAT.app.toggle("context",!0)}a(Xo,"openTasks");async function Qe(){const e=Ke();if(!e)throw new Error("No folder open");if((e.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):"granted")!=="granted")throw new Error("No permission to change this folder");return e}a(Qe,"writable");async function At(e,t,n){await Ve({...e,lane:"write"},n),t===O.value&&Cn()}a(At,"writeTask");async function Un(){const e=await K.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await Qe(),n=O.value;await At({icon:"folder-add",label:`New folder ${e}`},n,()=>ga(t,n,e))}a(Un,"newFolder");async function _o(e){const t=await K.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await Qe(),o=e.path??O.value;N.value=null,await At({icon:"edit",label:`Rename ${e.name} to ${t}`},o,()=>wa(n,o,e.name,t,e.kind))}a(_o,"renameEntry");async function Zo(e){if(!await K.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await Qe(),n=e.path??O.value;N.value=null,RAT.app.toggle("context",!1),await At({icon:"delete",label:`Delete ${e.name}`},n,()=>ba(t,n,e.name))}a(Zo,"deleteEntry");function Lt(e,t){zo(e,t,t.path??O.value,Te(Ae(t))),RAT.app.toggle("context",!1)}a(Lt,"pick");async function ei(){const e=Bo.value;if(!e)return;const t=await Qe(),n=e.items.toArray(),o=O.value,i=n.length===1?n[0].name:`${n.length} items`,l=e.mode==="move"?"move":"copy";e.mode==="move"?Sn():No();try{await Ve({icon:l,label:`${l} ${i} to /${o}`,lane:"write"},({progress:r,signal:c})=>Po(t,n,e.mode,o,{onProgress:r,signal:c}))}finally{o===O.value&&Cn()}}a(ei,"paste");async function qn(e){const t=await mt(Te(Ae(e)),e.path??O.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(qn,"download");async function Ce(){if(!en)throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");await Ta()&&(Tt(),oe.go("/"))}a(Ce,"chooseFolder");async function ti(){const{granted:e}=await Aa();e||await Ce()}a(ti,"reconnect");async function ni(){await K.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:we()})&&(await so(Ge.value),ft=null,await Sa(),Tt())}a(ni,"closeFolder");function Wn(e){Mn(D.root,e),oe.go("/library")}a(Wn,"openRemote");function ai(){N.value=null,Re.value="remotes",RAT.app.toggle("context",!0)}a(ai,"manageRemotes");async function oi(e){await K.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name})&&(await Za(e.id),Tt(F.filter(t=>t.source!==e.id).toArray()))}a(oi,"forgetRemote");async function ii(e){await To(ge.value,e.path??O.value,e),RAT.app.toggle("context",!1),oe.go("/sync")}a(ii,"sendEntry");async function li(e){const t=await K.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await K.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"folder"})||"folder";lt(e,Fa({icon:n,label:t}))}a(li,"newFolderType");function ri(e){const t=e.filter(i=>i.kind==="file"),n={};for(const i of t)n[ne(i)]=(n[ne(i)]??0)+1;const o=Object.entries(n).sort((i,l)=>l[1]-i[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?qe.find(i=>i.id===o[0])?.label:null,size:t.reduce((i,l)=>i+l.size,0)}}a(ri,"factsOf");const si=v(()=>ri(be.value)),Bt=qe.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),ci=a((e,t)=>t.lastModified-e.lastModified,"newest"),ui=v(()=>(Lo.value?.files??[]).filter(e=>ne(e)===Hn.value).toSorted(ci).slice(0,500)),di=v(()=>co(Fn.value));let pe=null;const Se=ra(!1),Vn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,fi=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Vn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),pe=e,Se.value=!0});addEventListener("appinstalled",()=>{pe=null,Se.value=!1});async function pi(){if(!pe)return!1;const e=pe;return pe=null,Se.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(pi,"install");function hi(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),Ie(`${e} can be installed: see the settings`))},"show");Se.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(hi,"hint");const mi=864e5,$i={day:"numeric",month:"short",year:"numeric"},St=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Pe=a(e=>{const t=St(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,$i)},"date"),vi=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/mi;return n<0?Pe(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Pe(t)},"ago"),gi=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Pe(t)},"since"),bi=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${o}:${i}`:`${o}:${i}`},"duration"),wi=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),S={ago:vi,bytes:wi,date:Pe,duration:bi,since:gi};function R(e,t){return yi.call({props:e},e,t)}a(R,"ActionRatHtml");function yi(e,t){return s`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${$(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(yi,"$$ActionRatHtml");function Gn(e,t){return ki.call({props:e},e,t)}a(Gn,"BookmarkActionRatHtml");function ki(e,t){const{path:n}=ke(e,{path:null}),o=v(()=>Na(n.value));return s`<${R} ...${{get icon(){return o.value?"bookmark-remove":"bookmark-add"},get label(){return o.value?"remove bookmark":"bookmark"},onclick:a(()=>Ma(n.value,n.value.name),"onclick")}} />`}a(ki,"$$BookmarkActionRatHtml");function Xe(e,t){return xi.call({props:e},e,t)}a(Xe,"FactsRatHtml");function xi(e,t){const n=a(i=>i==null||i===""||i===!1,"isEmpty"),o=v(()=>Object.entries(e.rows??{}).filter(([,i])=>!n(i)));return s`
    <dl.facts>
      ${k(()=>o.value,i=>i,([i,l])=>s`<dt>${()=>i}</dt><dd>${()=>l}</dd>`)}
    </dl>
  `}a(xi,"$$FactsRatHtml");function Ri(e,t){return Ti.call({props:e},e,t)}a(Ri,"EntryDetailsRatHtml");function Ti(e,t){const n=p(()=>O),{entry:o}=ke(e,{entry:null}),i=v(()=>o.value.path??n.value),l=v(()=>o.value.kind==="directory"),r=v(()=>!Ae(o.value)),c=a(d=>d.kind==="directory"?"folder":d.type||"file","kindOf");return s`
    <h2>${()=>o.value.name}</h2>
    <${Xe} ...${{get rows(){return{name:o.value.name,kind:c(o.value),size:l.value?null:S.bytes(o.value.size),modified:o.value.lastModified&&S.date(o.value.lastModified),in:"/"+i.value}}}} />
    <div-x.actions>
      <${R} icon="external" label="open" ...${{onclick:a(()=>le(o.value,i.value),"onclick")}} />
      ${m(()=>o.value.path,()=>s`<${R} icon="folder" label="show in folder" ...${{onclick:a(()=>Bn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value,()=>s`<${R} icon="download" label="download" ...${{onclick:a(()=>qn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value&&r.value&&kn(),()=>s`<${R} icon="send" label="send" ...${{onclick:a(()=>ii(o.value),"onclick")}} />`)}
      ${m(()=>l.value&&r.value,()=>s`<${Gn} ...${{get path(){return i.value.child(o.value.name)}}} />`)}
      <${R} icon="copy" label="copy" ...${{onclick:a(()=>Lt("copy",o.value),"onclick")}} />
      <${R} icon="move" label="move" ...${{onclick:a(()=>Lt("move",o.value),"onclick")}} />
      <${R} icon="edit" label="rename" ...${{onclick:a(()=>_o(o.value),"onclick")}} />
      <${R} icon="delete" label="delete" ...${{onclick:a(()=>Zo(o.value),"onclick")}} />
    </div-x>
  `}a(Ti,"$$EntryDetailsRatHtml");function Ai(e,t){return Si.call({props:e},e,t)}a(Ai,"FileDetailsRatHtml");function Si(e,t){const n=p(()=>Je),o=p(()=>Dn);return s`
    <h2>Details</h2>
    <${Xe} ...${{get rows(){return{name:n.value.name,type:n.value.type||"unknown",size:S.bytes(n.value.size),dimensions:o.value&&`${o.value.width} × ${o.value.height}`,modified:S.date(n.value.lastModified),in:"/"+n.value.path}}}} />
    <div-x.actions>
      <${R} icon="download" label="download" ...${{onclick:a(()=>qn(n.value),"onclick")}} />
      <${R} icon="folder" label="show in folder" ...${{onclick:a(()=>Bn(n.value),"onclick")}} />
    </div-x>
  `}a(Si,"$$FileDetailsRatHtml");function Oi(e,t){return Ei.call({props:e},e,t)}a(Oi,"FolderDetailsRatHtml");function Ei(e,t){const n=p(()=>be),o=p(()=>si),i=p(()=>O),l=p(()=>ce),r=p(()=>an),c=v(()=>i.value.length>0&&!l.value),d=v(()=>c.value?on(i.value):null),u=v(()=>c.value&&!d.value?Da(n.value,ne):null),g=a(b=>lt(i.value,d.value===b?null:b),"toggleFolderType");return s`
    <h2>This folder</h2>
    <${Xe} ...${{get rows(){return{folder:i.value.name||we(),contains:`${o.value.folders} folders, ${o.value.files} files`,size:S.bytes(o.value.size),mostly:o.value.mostly}}}} />
    <div-x.actions>
      <${R} icon="folder-add" label="new folder" ...${{onclick:Un}} />
      ${m(()=>c.value,()=>s`<${Gn} ...${{get path(){return i.value}}} />`)}
    </div-x>
    ${m(()=>c.value,()=>s`
        <h3>Foldertype</h3>
        ${m(()=>u.value,()=>s`<p.hint>Looks like ${()=>wt[u.value].label}. <button.link type="button" onclick=${$(()=>lt(i.value,u.value))}>Make it one</button></p>`)}
        <div-x.actions>
          ${k(()=>Object.entries(r.value),b=>b,([b,T])=>s`<button.action type="button" aria-pressed=${()=>re(d.value===b)} onclick=${$(()=>g(b))}><svg-icon icon=${()=>T.icon} /> ${()=>T.label}</button>`)}
          <${R} icon="add" label="new foldertype" ...${{onclick:a(()=>li(i.value),"onclick")}} />
        </div-x>
      `)}
  `}a(Ei,"$$FolderDetailsRatHtml");function Hi(e,t){return Fi.call({props:e},e,t)}a(Hi,"RemoteManagerRatHtml");function Fi(e,t){const n=p(()=>mn);let o=w(null),i=w(!1);async function l(r){r.preventDefault();const c=r.target;i.value=!0,o.value=null;try{const d=await _a(Object.fromEntries(new FormData(c)));c.reset(),Wn(d.id),RAT.app.toggle("context",!1)}catch(d){o.value=d.message??String(d)}finally{i.value=!1}}return a(l,"add"),s`
    ${m(()=>n.value.length,()=>s`
        <ul.tasks>
          ${k(()=>n.value,r=>r,r=>s`
              <li.task>
                <svg-icon icon="cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="delete" label=${()=>"forget "+r.name} onclick=${$(()=>oi(r))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${$(l)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${m(()=>o.value,()=>s`<p.error>${()=>o.value}</p>`)}
      <button.action type="submit" disabled=${()=>i.value}><svg-icon icon=${()=>i.value?"pending":"plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(Fi,"$$RemoteManagerRatHtml");function Jn(e,t){return Di.call({props:e},e,t)}a(Jn,"StatusRatHtml");function Di(e,t){const n=p(()=>j),o=p(()=>ae);return s`
    ${m(()=>o.value,()=>s`<p.status><svg-icon icon="pending" /> Reading the folder … ${()=>o.value.files} files</p>`,()=>m(()=>n.value,()=>s`<p.status>${()=>n.value.total} files · ${()=>S.bytes(n.value.size)} · read ${()=>S.date(n.value.scannedAt)}</p>`))}
  `}a(Di,"$$StatusRatHtml");function zi(e,t){return Ni.call({props:e},e,t)}a(zi,"RootDetailsRatHtml");function Ni(e,t){const n=p(()=>gt),o=p(()=>ae);return s`
    <h2>${()=>Ye(null)}</h2>
    <${Jn} />
    <div-x.actions><${R} icon="refresh" label="read again" ...${{get disabled(){return!n.value||!!o.value},onclick:Jo}} /></div-x>
  `}a(Ni,"$$RootDetailsRatHtml");function Mi(e,t){return ji.call({props:e},e,t)}a(Mi,"TaskListRatHtml");function ji(e,t){const n=p(()=>fo),o=p(()=>bn),i={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},l=a(u=>u.state==="queued"||u.state==="running","isOpen");function r({progress:u,state:g}){return g!=="running"||u?.done==null?i[g]:u.total?`${Math.round(u.done/u.total*100)}%`:String(u.done)}a(r,"stateOf");function c(u){return u.error?u.error:u.endedAt?`${r(u)} · ${S.date(u.endedAt)}`:r(u)}a(c,"noteOf");function d(u){return s`
      <li class=${()=>`task ${u.state}`}>
        <svg-icon icon=${()=>u.icon} />
        <span.text>
          <span.name>${()=>u.label}</span>
          <small>${()=>c(u)}</small>
          ${m(()=>u.state==="running"&&u.progress?.total,()=>s`<progress max=${()=>u.progress.total} value=${()=>u.progress.done} />`)}
        </span>
        ${m(()=>l(u),()=>s`<btn-icon icon="close" label=${()=>"cancel "+u.label} onclick=${$(()=>$o(u))} />`)}
      </li>
    `}return a(d,"row"),s`
    ${m(()=>o.value.length,()=>s`
        <ul.tasks>
          ${k(()=>o.value,u=>u,u=>s`${()=>d(u)}`)}
        </ul>
      `,()=>s`<p.empty>nothing to do</p>`)}
    ${m(()=>n.value.length,()=>s`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="trash" label="clear the history" onclick=${$(vo)} />
        </div-x>
        <ul.tasks>
          ${k(()=>n.value,u=>u,u=>s`${()=>d(u)}`)}
        </ul>
      `)}
  `}a(ji,"$$TaskListRatHtml");function Ci(e,t){return Pi.call({props:e},e,t)}a(Ci,"ContextRatHtml");function Pi(e,t){const n=p(()=>Je),o=p(()=>N),i=p(()=>Re),{$path:l}=ke(RAT.app.router,{$path:null});return s`
    ${m(()=>i.value==="tasks",()=>s`<h2>Tasks</h2><${Mi} />`,()=>m(()=>i.value==="remotes",()=>s`<h2>Remote</h2><${Hi} />`,()=>m(()=>o.value,()=>s`<${Ri} ...${{get entry(){return o.value}}} />`,()=>m(()=>l.value==="/preview"&&n.value,()=>s`<${Ai} />`,()=>m(()=>l.value==="/library"&&Ke(),()=>s`<${Oi} />`,()=>s`<${zi} />`)))))}
  `}a(Pi,"$$ContextRatHtml");function C(e,t){return Li.call({props:e},e,t)}a(C,"BarRatHtml");function Li(e,t){return s`
    <header.bar>
      ${m(()=>e.back,()=>s`<btn-icon icon="back" label="back" onclick=${$(e.back)} />`,()=>s`<btn-icon icon="menu" label="menu" onclick=${$(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="settings" label="settings" onclick=${$(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Li,"$$BarRatHtml");function Ot(e,t){return Bi.call({props:e},e,t)}a(Ot,"ThumbRatHtml");function Bi(e,t){const n=p(()=>z),o=e.entry,i=e.at??D.root,l=e.from??null,r=RAT.app.thumbnails,c=pt(o)?u(o):null;let d=w(c?r.peekFile(c):null);function u({lastModified:b,name:T,size:x}){return`${l??he(()=>n.value)?.id}/${i}/${T}:${x}:${b}`}a(u,"idOf");function g(b){if(!c||d.value)return;let T=!0;const x=new IntersectionObserver(([y])=>{y.isIntersecting&&(x.disconnect(),r.requestFile(c,()=>mt(Te(l),i,o.name)).then(A=>{T&&A&&(d.value=A)}))},{rootMargin:"200px"});return x.observe(b),()=>{T=!1,x.disconnect()}}return a(g,"watch"),s`
    <span.thumb ref=${sa(g)}>
      ${m(()=>d.value,()=>s`<img src=${()=>d.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>Ln(o,l?null:e.at)} />`)}
    </span>
  `}a(Bi,"$$ThumbRatHtml");function It(e,t){return Ii.call({props:e},e,t)}a(It,"FileRowRatHtml");function Ii(e,t){const n=e.entry,o=`/${n.path} · ${S.bytes(n.size)}`;return s`
    <li.row>
      <button.entry type="button" onclick=${$(()=>le(n))}>
        <${Ot} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>o}</small></span>
      </button>
      <btn-icon icon="more" label="more" onclick=${$(()=>In(n))} />
    </li>
  `}a(Ii,"$$FileRowRatHtml");function Yn(e,t){return Ui.call({props:e},e,t)}a(Yn,"SearchbarRatHtml");function Ui(e,t){const n=p(()=>po),o=p(()=>bn),i=v(()=>o.value.length),l=v(()=>i.value?`${i.value} tasks`:"tasks");return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${$(a(c=>e.onsearch?.(c.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>n.value} aria-label=${()=>re(l.value)} title=${()=>l.value} onclick=${$(Xo)}>
        <svg-icon icon=${()=>n.value?"pending":"tasks"} />
        ${m(()=>i.value,()=>s`<span.badge>${()=>i.value}</span>`)}
      </button>
    </div>
  `}a(Ui,"$$SearchbarRatHtml");function X(e,t){return qi.call({props:e},e,t)}a(X,"TileRatHtml");function qi(e,t){return s`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${$(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}a(qi,"$$TileRatHtml");const Wi=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Vi(e,t){return Gi.call({props:e},e,t)}a(Vi,"LoadingRatHtml");function Gi(e,t){return ht("1tn1js8",Wi),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Gi,"$$LoadingRatHtml");function Kn(e,t){return Ji.call({props:e},e,t)}a(Kn,"WelcomeRatHtml");function Ji(e,t){const n=p(()=>z),o=p(()=>ka);return s`
    ${m(()=>!en,()=>s`
        <div-y.hero>
          <svg-icon icon="warning" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>m(()=>!o.value,()=>s`<${Vi} />`,()=>m(()=>!n.value,()=>s`
            <div-y.hero>
              <svg-icon icon="folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${$(Ce)}><svg-icon icon="folder-add" /> Open a folder</button>
            </div-y>
          `,()=>s`
            <div-y.hero>
              <svg-icon icon="folder-key" />
              <h2>Reconnect “${()=>we()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${$(ti)}><svg-icon icon="folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Ji,"$$WelcomeRatHtml");function Yi(e,t){return Ki.call({props:e},e,t)}a(Yi,"DashboardRatHtml");function Ki(e,t){const n=p(()=>Hn),o=p(()=>ui),i=p(()=>di),l=p(()=>Fn),r=p(()=>mn),c=p(()=>gt),d=p(()=>j),u=[{icon:"drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"network",label:"LAN",note:"smb shares, only in the android app"}],g=v(()=>l.value.trim()!==""),b=v(()=>za()),T=v(()=>Bt.find(f=>f.id===n.value)?.label??n.value),x=a(()=>Ye(null),"folderName"),y=a(f=>l.value=f,"search"),A=a(f=>d.value?.categories?.[f]??null,"statsOf");function H(f){return f?f>=100?"Found 100+":`Found ${f}`:"Nothing found"}a(H,"foundOf");function V(f){try{return new URL(f).host}catch{return f}}a(V,"hostOf");function U(f){ie(f,null),RAT.app.router.go("/library")}a(U,"library");function Oe(f){return f?`${f.count} · ${S.bytes(f.size)}`:"…"}return a(Oe,"noteOf"),s`
    <${C} title="Files" />
    <div.scroll>
      ${m(()=>!c.value,()=>s`<${Kn} />`,()=>m(()=>g.value,()=>s`
            <section>
              <h2>${()=>H(i.value.length)}</h2>
              <ul.rows>
                ${k(()=>i.value,f=>f,f=>s`<${It} ...${{get entry(){return f}}} />`)}
              </ul>
            </section>
          `,()=>m(()=>n.value,()=>s`
              <section>
                <div-x.section-head>
                  <btn-icon icon="back" label="back" onclick=${$(()=>n.value=null)} />
                  <h2>${()=>T.value}</h2>
                </div-x>
                <ul.rows>
                  ${k(()=>o.value,f=>f,f=>s`<${It} ...${{get entry(){return f}}} />`)}
                </ul>
              </section>
            `,()=>s`
              ${m(()=>d.value?.recent.length,()=>s`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${k(()=>d.value.recent,f=>f,f=>s`
                          <button.card type="button" onclick=${$(()=>le(f))}>
                            <${Ot} ...${{get entry(){return f},get at(){return f.path}}} />
                            <span.name>${()=>f.name}</span>
                            <small>${()=>S.date(f.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${m(()=>b.value.length,()=>s`
                    <ul.tiles>
                      ${k(()=>b.value,f=>f,f=>s`<${X} ...${{get icon(){return ln(f.path)?.icon??"bookmark"},get name(){return f.name},get note(){return"/"+f.path},onclick:a(()=>U(f.path),"onclick")}} />`)}
                    </ul>
                  `,()=>s`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${k(()=>Bt,f=>f,({icon:f,id:ue,label:_e})=>s`<${X} ...${{get icon(){return f},get name(){return _e},get note(){return Oe(A(ue))},get disabled(){return!A(ue)?.count},onclick:a(()=>n.value=ue,"onclick")}} />`)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles><${X} icon="folder-open" ...${{get name(){return x()},get note(){return d.value?S.bytes(d.value.size):"the granted folder"},onclick:a(()=>U(D.root),"onclick")}} /></ul>
                <${Jn} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${k(()=>r.value,f=>f,f=>s`<${X} icon="cloud" ...${{get name(){return f.name},get note(){return V(f.url)},onclick:a(()=>Wn(f.id),"onclick")}} />`)}
                  <${X} icon="cloud-settings" name="WebDAV, Nextcloud" ...${{get note(){return r.value.length?"add or remove":"connect a server"},onclick:ai}} />
                  ${k(()=>u,f=>f,f=>s`<${X} ...${{get icon(){return f.icon},get name(){return f.label},get note(){return"soon · "+f.note},get title(){return f.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${m(()=>c.value,()=>s`<${Yn} ...${{get placeholder(){return"Search in "+x()},onsearch:y}} />`)}
  `}a(Ki,"$$DashboardRatHtml");function Qi(e,t){return Xi.call({props:e},e,t)}a(Qi,"EntryRatHtml");function Xi(e,t){const n=p(()=>O),o=p(()=>N),i=p(()=>ce),l=e.entry,r=he(()=>n.value),c=he(()=>i.value),d=l.kind==="file"?`${S.date(l.lastModified)} · ${S.bytes(l.size)}`:"folder",u=v(()=>o.value?.name===l.name&&!o.value?.path);function g(b){b.key!=="Enter"||En()||(b.preventDefault(),le(l))}return a(g,"onkeydown"),s`
    <data-item>
      <div.row class:selected=${()=>u.value}>
        <button.entry type="button" aria-pressed=${()=>re(u.value)} onclick=${$(()=>Qo(l))} ondblclick=${$(()=>le(l))} onkeydown=${$(g)}>
          <${Ot} ...${{get entry(){return l},get at(){return r},get from(){return c}}} />
          <span.text><span.name>${()=>l.name}</span><small>${()=>d}</small></span>
        </button>
        <btn-icon icon="more" label="more" onclick=${$(()=>In(l))} />
      </div>
    </data-item>
  `}a(Xi,"$$EntryRatHtml");function _i(e,t){return Zi.call({props:e},e,t)}a(_i,"PasteBarRatHtml");function Zi(e,t){const n=p(()=>M),o=v(()=>n.value?.mode==="move"),i=a(l=>l.length===1?l.at(0).name:`${l.length} items`,"describe");return s`
    ${m(()=>n.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>o.value?"move":"copy"} />
          <span.text>
            <span.name>${()=>i(n.value.items)}</span>
            <small>${()=>o.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${$(ei)}><svg-icon icon="paste" /> here</button>
          <btn-icon icon="close" label="empty the pickboard" onclick=${$(Sn)} />
        </div-x>
      `)}
  `}a(Zi,"$$PasteBarRatHtml");function el(e,t){return tl.call({props:e},e,t)}a(el,"TabsRatHtml");function tl(e,t){const n=p(()=>W),o=p(()=>F);return s`
    <div-x.tabs role="tablist" scrollable>
      ${k(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button type="button" role="tab" aria-selected=${()=>re(i===n.value)} onclick=${$(()=>Go(i))}>${()=>Pt(i)}</button>
            ${m(()=>o.value.length>1,()=>s`<btn-icon icon="close" label=${()=>"close "+Pt(i)} onclick=${$(()=>Vo(i))} />`)}
          </div>
        `)}
      <btn-icon icon="add" label="new tab" onclick=${$(()=>Mn())} />
    </div-x>
  `}a(tl,"$$TabsRatHtml");function nl(e,t){return al.call({props:e},e,t)}a(nl,"LibraryRatHtml");function al(e,t){const n=p(()=>Rt),o=p(()=>dt),i=p(()=>O),l=p(()=>q),r=p(()=>Ko),c=v(()=>!!Ke()),d=v(()=>l.value.viewmode==="grid"),u=a(x=>ie(D.from(x.detail.path)),"crumb"),g=a(x=>n.value=x,"search"),b=a(()=>l.value.viewmode=d.value?"list":"grid","toggleView");function T(){i.value.parent?ie(i.value.parent):RAT.app.router.go("/")}return a(T,"up"),s`
    ${m(()=>!c.value,()=>s`<${C} title="Library" /><div.scroll><${Kn} /></div>`,()=>s`
        <${C} ...${{get title(){return i.value.name||we()},get back(){return T}}}><btn-icon icon=${()=>d.value?"list":"grid"} label=${()=>d.value?"show as list":"show as grid"} onclick=${$(b)} /></${C}>
        <nav-crumbs root=${()=>we()} path=${()=>"/"+i.value} onnav-crumbs=${$(u)} />
        <div.pane>
          <div.listing>
            ${m(()=>o.value,()=>s`<svg-icon icon="pending" />`,()=>m(()=>r.value.length,()=>s`
                  <data-index viewmode=${()=>l.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>r.value,x=>x,x=>s`<${Qi} ...${{get entry(){return x}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>n.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${$(Un)}><svg-icon icon="folder-add" /></button>
        </div>
        <${_i} />
        <${Yn} placeholder="Filter this folder" ...${{get value(){return n.value},onsearch:g}} />
        <${el} />
      `)}
  `}a(al,"$$LibraryRatHtml");const ol=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function il(e,t){return ll.call({props:e},e,t)}a(il,"BrandRatHtml");function ll(e,t){return ht("1npwj96",ol),s`
    <div.brand data-rat="1npwj96">
      ${m(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(ll,"$$BrandRatHtml");function rl(e,t){return sl.call({props:e},e,t)}a(rl,"MenuRatHtml");function sl(e,t){const n=[{icon:"dashboard",label:"Dashboard",route:"/"},{icon:"folder",label:"Library",route:"/library"},{icon:"send",label:"Send",route:"/sync"}],o=[{icon:"image",label:"Image editor"},{icon:"file-edit",label:"Text editor"}],{$path:i}=ke(RAT.app.router,{$path:null});function l(r){RAT.app.router.go(r);const c=RAT.app.area("menu");c?.isOverlay&&c.hide()}return a(l,"go"),s`
    <nav.menu>
      <${il} name="Files" icon="./app.svg" />
      ${k(()=>n,r=>r,r=>s`<button type="button" aria-current=${()=>re(i.value===r.route?"page":null)} onclick=${$(()=>l(r.route))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
      <hr />
      ${k(()=>o,r=>r,r=>s`<button type="button" disabled><svg-icon icon=${()=>r.icon} /> ${()=>r.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${$(()=>RAT.app.toggle("config",!0))}><svg-icon icon="settings" /> Settings</button>
    </nav>
  `}a(sl,"$$MenuRatHtml");function cl(e,t){return ul.call({props:e},e,t)}a(cl,"PreferencesRatHtml");function ul(e,t){const n=p(()=>q),o=p(()=>z),i={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},l={"pattern-bg":"Background","pattern-tile":"Tiles"},r=a(c=>d=>n.value[c]=d.target.value,"change");return s`
    <section>
      <h3>files</h3>
      ${k(()=>Object.entries(i),c=>c,([c,{label:d,values:u}])=>s`
          <label>
            <span>${()=>d}</span>
            <input-value look="segments" value=${()=>n.value[c]} onchange=${$(r(c))}>
              ${k(()=>Object.entries(u),g=>g,([g,b])=>s`<input-option value=${()=>g}>${()=>b}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${k(()=>Object.entries(l),c=>c,([c,d])=>s`
          <label>
            <span>${()=>d}</span>
            <input-pattern opacity value=${()=>n.value[c]} onchange=${$(r(c))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${m(()=>o.value,()=>s`
          <p.folder><svg-icon icon="folder-open" /> ${()=>o.value.name}</p>
          <div-x.actions>
            <${R} icon="folder-sync" label="change" ...${{onclick:Ce}} />
            <${R} icon="close" label="close" ...${{onclick:ni}} />
          </div-x>
        `,()=>s`<${R} icon="folder-add" label="Open a folder" ...${{onclick:Ce}} />`)}
    </section>
  `}a(ul,"$$PreferencesRatHtml");function dl(e,t){return fl.call({props:e},e,t)}a(dl,"PreviewRatHtml");function fl(e,t){const n=p(()=>Je),o=p(()=>N),i=p(()=>Dn);let l=w(null);function r(u){let g=null,b=!0;return mt(Te(u.source),u.path,u.name).then(T=>{b&&(g=URL.createObjectURL(T),l.value=g)}),()=>{b=!1,g&&URL.revokeObjectURL(g)}}a(r,"show"),Q(()=>{if(i.value=null,l.value=null,n.value&&pt(n.value))return r(n.value)});const c=a(u=>i.value={height:u.target.naturalHeight,width:u.target.naturalWidth},"loaded");function d(){o.value=null,RAT.app.toggle("context")}return a(d,"info"),s`
    ${m(()=>!n.value,()=>s`
        <${C} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>s`
        <${C} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="info" label="details" onclick=${$(d)} /></${C}>
        <div.stage>
          ${m(()=>pt(n.value),()=>s`
              ${m(()=>l.value,()=>s`<img src=${()=>l.value} alt=${()=>n.value.name} onload=${$(c)} />`)}
            `,()=>s`<svg-icon icon=${()=>Ln(n.value)} />`)}
        </div>
      `)}
  `}a(fl,"$$PreviewRatHtml");const ye=P("appearance",{}),Ut={density:fe.densities,geometry:fe.geometries,mode:fe.modes},pl=a(()=>ye.value,"appearance"),hl=a(()=>fe.palettes().catch(()=>[]),"palettes");function Qn(e){const t=document.querySelector("rat-app");for(const[n,o]of Object.entries(e))o?t?.setAttribute(n,o):t?.removeAttribute(n);return fe.set(e)}a(Qn,"apply");function ml(e,t){return ye.value={...ye.value,[e]:t||null},Qn({[e]:t||null})}a(ml,"setAppearance");Object.keys(ye.value).length&&Qn(ye.value);const $l=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function qt(e,t){return vl.call({props:e},e,t)}a(qt,"SettingsRatHtml");function vl(e,t){ht("177zzh1",$l);let n=w({...pl()}),o=w([]);const i=v(()=>Se.value);hl().then(c=>{o.value=c});function l(c,d){const u=d.detail?.value??d.target.value;n.value={...n.value,[c]:u},ml(c,u)}a(l,"change");async function r(){await pi()&&Ie.success(`${e.name??"the app"} is installed`)}return a(r,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${$(c=>l("palette",c))}>
            ${k(()=>o.value,c=>c,c=>s`<input-option value=${()=>c}>${()=>c}</input-option>`)}
          </input-value>
        </label>
        ${k(()=>Object.keys(Ut),c=>c,c=>s`
            <label>
              <span>${()=>c}</span>
              <input-value look="segments" value=${()=>n.value[c]??""} onchange=${$(d=>l(c,d))}>
                ${k(()=>Ut[c],d=>d,d=>s`<input-option value=${()=>d}>${()=>d}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!Vn,()=>s`
          <section>
            <h3>install</h3>
            ${m(()=>i.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${$(r)} />`,()=>s`
                ${m(()=>fi,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(vl,"$$SettingsRatHtml");function gl(e,t){return bl.call({props:e},e,t)}a(gl,"SyncRatHtml");function bl(e,t){const n=p(()=>$e),o=p(()=>ct),i=p(()=>Rn),l=p(()=>B),r=p(()=>ve);let c=w(null),d=w(""),u=w("https"),g=w(""),b=w("");const T=v(()=>o.value.map(wo)),x=v(()=>r.value.filter(h=>!T.value.some(G=>je(G,h)))),y=v(()=>c.value??bo(d.value,u.value)),A=v(()=>l.value.reduce((h,G)=>h+Math.max(0,G.size),0)),H=v(()=>n.value??{}),V=a(h=>!!y.value&&je(y.value,h),"isChosen"),U=a(h=>h.deviceType==="mobile"?"phone":"desktop","iconOf");function Oe(h){c.value=h,d.value=""}a(Oe,"choose");function f(h){d.value=h.target.value,c.value=null}a(f,"type");function ue(h){u.value=h.target.value,c.value&&(c.value={...c.value,protocol:u.value})}a(ue,"protocol");function _e(h){return h.name?h.name:h.tree?"chosen":"none yet"}a(_e,"folderOf");function Xn(h){return h.enabled?h.lastSync?`on · last ${S.date(h.lastSync)}`:"on":"off"}a(Xn,"stateOf");const _n=a((h,G)=>h.length?`send ${h.length} · ${S.bytes(G)}`:"send","sendLabel");function Et(h,G,Zn){return s`
      <li.row class:selected=${()=>V(h)}>
        <button.entry type="button" aria-pressed=${()=>re(V(h))} onclick=${$(()=>Oe(h))}>
          <span.thumb><svg-icon icon=${()=>G} /></span>
          <span.text>
            <span.name>${()=>Me(h)}</span>
            <small>${()=>h.host}:${()=>h.port} · ${()=>h.protocol}</small>
          </span>
        </button>
        ${m(()=>Zn,()=>s`<btn-icon icon="close" label=${()=>"forget "+Me(h)} onclick=${$(()=>ko(h))} />`)}
      </li>
    `}return a(Et,"receiver"),s`
    ${m(()=>!kn(),()=>s`
        <${C} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>s`
        <${C} title="Send">
          ${m(()=>i.value,()=>s`<small.identity>${()=>i.value.alias}</small>`)}
        </${C}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="radar" label="search again" onclick=${$(Tn)} />
            </div-x>
            ${m(()=>T.value.length||x.value.length,()=>s`
                <ul.rows>
                  ${k(()=>T.value,h=>h,h=>s`${()=>Et(h,U(h),!1)}`)}
                  ${k(()=>x.value,h=>h,h=>s`${()=>Et(h,"history",!0)}`)}
                </ul>
              `,()=>s`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>d.value} oninput=${$(f)} />
              <input-value look="segments" value=${()=>y.value?.protocol??u.value} onchange=${$(ue)}>
                ${k(()=>xn,h=>h,h=>s`<input-option value=${()=>h}>${()=>h}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" ref=${Ft(g,"value")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${m(()=>l.value.length,()=>s`
                <ul.rows>
                  ${k(()=>l.value,h=>h,h=>s`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="file" /></span>
                          <span.text>
                            <span.name>${()=>h.name}</span>
                            <small>${()=>h.size>=0?S.bytes(h.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="close" label=${()=>"remove "+h.name} onclick=${$(()=>Ao(h.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${R} icon="file-add" label="pick files" ...${{onclick:Ro}} />
              <button.action.primary type="button" disabled=${()=>!l.value.length||!y.value} onclick=${$(()=>Oo(y.value,l.value,g.value))}><svg-icon icon="send" /> ${()=>_n(l.value,A.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${Xe} ...${{get rows(){return{folder:_e(H.value),state:Xn(H.value),to:H.value.enabled&&`${H.value.host}:${H.value.port}`}}}} />
            ${m(()=>!H.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Ft(b,"value")} />`)}
            <div-x.actions>
              <${R} icon="folder-search" label="folder" ...${{onclick:Eo}} />
              ${m(()=>H.value.enabled,()=>s`
                  <${R} icon="refresh" label="now" ...${{onclick:Do}} />
                  <${R} icon="pause" label="turn off" ...${{onclick:Fo}} />
                `,()=>s`<${R} icon="play" label="turn on" ...${{get disabled(){return!H.value.tree||!y.value},onclick:a(()=>Ho(y.value,{pin:g.value,ssid:b.value}),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(bl,"$$SyncRatHtml");function Hl(e,t){return wl.call({props:e},e,t)}a(Hl,"AppRatHtml");function wl(e,t){const n=p(()=>Re);RAT.app.on("error",Ie.error),RAT.app.hold(Ra()),hi("Files");let o=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!o&&Tn(),l!=="/sync"&&o&&xo(),o=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${rl} /></rat-area>
    <rat-view name="dashboard" route="/"><${Yi} /></rat-view>
    <rat-view name|route="library"><${nl} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${dl} /></rat-view>
    <rat-view name|route="sync"><${gl} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${$(a(l=>{l.detail?.open||(n.value=null)},"ontoggle"))}><div.context><${Ci} /></div></rat-area>
    <rat-area name="config" dock="end"><${qt} name="Files"><${cl} /></${qt}></rat-area>
  `}a(wl,"$$AppRatHtml");export{Hl as default};
