const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BLpyG_KD.js","./preload-helper-Cc2_yIPf.js","./withControl-ByYV6CO-.js","./index-CgHh2HpB.js","./index-BTMqK-yh.css"])))=>i.map(i=>d[i]);
var Zn=Object.defineProperty;var a=(e,t)=>Zn(e,"name",{value:t,configurable:!0});import{k as ot,m as v,o as ea,q as Ht,t as Wt,u as Vt,v as Gt,i as Jt,w as ta,x as Yt,y as na,z as aa,A as oa,P as ia,C as P,E as Kt,S as E,$ as Qt,G as Q,H as w,g as Le,J as Be,K as Ee,M as he,O as Xt,Q as la,T as se,V as ra,W as ht,X as Z,Y as Ft}from"./index-BLpyG_KD.js";import{p as sa,a as ca}from"./keys-CWTtq0D5.js";import{_ as ua}from"./preload-helper-Cc2_yIPf.js";import{h as s,f as k,w as m}from"./withControl-ByYV6CO-.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function ke(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],l=t[o];n[o]=ot(i)?i:v(()=>e[o]===void 0&&l?l():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(ke,"signalsOf");function p(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return ot(i)?i.value:i},set value(i){const l=o();if(!ot(l))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");l.value=i}}}a(p,"imported");function $(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?sa(t):null;let l=o;return function(r){if(!(o&&!l)&&!(i&&!ca(r,i))){n&&r.preventDefault(),o&&l--;try{const c=(typeof e=="string"?ea(e):e).call(this,r);typeof c?.catch=="function"&&c.catch(d=>Ht(this,d,"handler"))}catch(c){Ht(this,c,"handler")}}}}a($,"listener");const da={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function fa(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a(fa,"extOf");class ne{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof ne?t:new ne(fa(t))}get mimeType(){return da[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}const pa=a(()=>new Jt({initial:"",kind:"fileext",run:a((e,t)=>e instanceof ne?{value:e}:ta(e)?{value:new ne(e)}:Yt("expected an extension",t),"run")}),"fileExtOf"),_t=Wt(Vt(ne,pa,{kind:"fileext",make:Gt,name:"FileExt"})),Ze=new Map;class ee extends aa{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof ee)return t;const n=oa(t,"/").join("/");return Ze.has(n)||Ze.set(n,new ee(n)),Ze.get(n)}static get root(){return ee.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return _t.from(this.name)}child(t){return this.with(t)}}const ha=a(()=>new Jt({initial:"",kind:"path",run:a((e,t)=>na(e)?{value:ee.from(e)}:Yt("expected a path",t),"run")}),"pathOf$1"),D=Wt(Vt(ee,ha,{kind:"path",make:Gt,name:"Path"})),He=a(e=>(t,n)=>ia.notify(t,{...n,type:e}),"notify"),Ie=Object.assign(He("info"),{error:He("error"),info:He("info"),success:He("success")}),ma=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function I(e,t=D.root){let n=e;for(const o of D.from(t))n=await n.getDirectoryHandle(o);return n}a(I,"dirAt");async function $a(e,t=D.root){const n=await I(e,t),o=[];for await(const l of n.values())o.push(l);return(await Promise.all(o.map(async l=>{if(l.kind==="directory")return{kind:"directory",name:l.name};const r=await l.peekFile?.()??await l.getFile();return{kind:"file",lastModified:r.lastModified,name:l.name,size:r.size,type:r.type}}))).sort(ma)}a($a,"list$1");async function mt(e,t,n){return(await(await I(e,t)).getFileHandle(n)).getFile()}a(mt,"readFile");async function va(e,t,n){await(await I(e,t)).getDirectoryHandle(n,{create:!0})}a(va,"mkdir");async function ga(e,t,n){await(await I(e,t)).removeEntry(n,{recursive:!0})}a(ga,"remove$3");async function ba(e,t,n,o,i){const l=await I(e,t),r=i==="directory"?await l.getDirectoryHandle(n):await l.getFileHandle(n);if(typeof r.move=="function")try{await r.move(o);return}catch{}i==="directory"?await vt(r,l,o):await $t(r,l,o),await l.removeEntry(n,{recursive:!0})}a(ba,"rename");async function $t(e,t,n,o){const i=await e.getFile(),r=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(r instanceof WritableStream)){await r.write(await i.arrayBuffer()),await r.close();return}try{await i.stream().pipeTo(r,{signal:o})}catch(c){throw await r.abort?.().catch(()=>{}),c}}a($t,"copyFile");async function vt(e,t,n,o,i=()=>{}){const l=await t.getDirectoryHandle(n,{create:!0});for await(const r of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");r.kind==="directory"?await vt(r,l,r.name,o,i):(await $t(r,l,r.name,o),i())}}a(vt,"copyTree");const{folders:Y}=RAT.app,{perms:wa,ready:ya,sources:Zt}=ke(Y,{perms:null,ready:null,sources:null}),z=v(()=>Zt.value.at(-1)??null),ka=v(()=>z.value?wa.value[z.value.id]??null:null),gt=v(()=>ka.value==="granted"?Y.handleOf(z.value.id):null),en=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",xa=a(()=>Y.load(),"load");async function Ra(){const e=Zt.value.map(n=>n.id),t=await Y.add();if(t)for(const n of e)await Y.remove(n);return t}a(Ra,"grant");async function Ta(){return z.value?Y.reconnect(z.value.id):{granted:!1}}a(Ta,"reconnect$1");async function Aa(){z.value&&await Y.remove(z.value.id)}a(Aa,"forget$2");const Sa=p(()=>z),Oa={folder:E,name:E,path:D},Ea={icon:E,label:E},bt=P("bookmarks",Kt(Oa).create()),it=P("folderTyped",Qt(E,E).create()),tn=P("ownFolderTypes",Qt(E,Ea).create()),me=v(()=>String(Sa.value?.id??"")),nn=a(e=>`${me.value}:${e}`,"keyOf"),wt={audio:{icon:"audio",label:"Audio"},documents:{icon:"document",label:"Documents"},images:{icon:"image",label:"Images"},video:{icon:"video",label:"Videos"}},an=v(()=>({...wt,...tn.toJSON()})),on=a(e=>it.get(nn(e))??null,"folderTypeIdOf"),ln=a(e=>an.value[on(e)]??null,"folderTypeOf");function lt(e,t){const n=nn(e);t?it.set(n,t):it.delete(n)}a(lt,"setFolderType");function Ha({icon:e="folder",label:t}){const n=crypto.randomUUID();return tn.set(n,{icon:e,label:t}),n}a(Ha,"addFolderType");function Fa(e,t){const n=e.filter(r=>r.kind==="file"),o={};for(const r of n)o[t(r)]=(o[t(r)]??0)+1;const[i,l]=Object.entries(o).sort((r,c)=>c[1]-r[1])[0]??[];return i in wt&&l/n.length>=.6?i:null}a(Fa,"suggestFolderType");const Da=a(()=>bt.where({folder:me.value}),"bookmarks"),za=a(e=>bt.has({folder:me.value,path:e}),"isBookmarked"),Na=a((e,t)=>bt.toggle({folder:me.value,name:t,path:e},{folder:me.value,path:e}),"toggleBookmark"),Ma=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ja(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(ja,"toBase64");const Ca=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),Pa=new Set([101,204,205,304]);async function La(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:l}={}){const r=Ma();if(!r)return fetch(e,{body:t,headers:n,method:o,signal:i});const c=await r.request({body:await ja(t),headers:n,method:o,timeout:l,url:e});return new Response(Pa.has(c.status)?null:Ca(c.data),{headers:c.headers,status:c.status,statusText:c.statusText})}a(La,"request$2");const Ba=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Ia=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),rn=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),_=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function sn(e,t="",n=!1){const o=new URL(Ia(t),rn(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(sn,"urlFor");const Ua={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class et extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function ce(e,t,{body:n,headers:o={},isDir:i=!1,method:l="GET"}={}){if(!e)throw new Error("No webdav connection.");let r;try{r=await La(sn(e,t,i),{body:n,headers:{Authorization:Ba(e),...o},method:l})}catch(c){throw globalThis.Capacitor?.isNativePlatform?.()?new et(0,`Connection failed: ${c?.message??c}`):new et(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!r.ok)throw new et(r.status,Ua[r.status]??`${r.status} ${r.statusText}`);return r}a(ce,"request$1");const qa='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',rt="DAV:",Fe=a((e,t)=>e.getElementsByTagNameNS(rt,t)[0]?.textContent??"","firstText");async function cn(e,t,n){const o=await ce(e,t,{body:qa,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),l=new URL(rn(e)).pathname,r=a(c=>{const d=decodeURIComponent(new URL(c,e.url).pathname);return(d.startsWith(l)?d.slice(l.length):d).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(rt,"response")].map(c=>{const d=r(Fe(c,"href"));return{isDir:c.getElementsByTagNameNS(rt,"collection").length>0,lastModified:Date.parse(Fe(c,"getlastmodified"))||0,mime:Fe(c,"getcontenttype"),name:d.split("/").pop(),path:d,size:Number(Fe(c,"getcontentlength"))||0}})}a(cn,"propfind");async function un(e,t=""){const n=_(t);return(await cn(e,t,1)).filter(i=>i.path!==n).sort((i,l)=>i.isDir===l.isDir?i.name.localeCompare(l.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(un,"list");async function tt(e,t){try{return(await cn(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(tt,"stat");const Wa=a(async(e,t)=>(await ce(e,t)).blob(),"read"),dn=a((e,t,n)=>ce(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Va=a((e,t)=>ce(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Ga=a((e,t,n=!1)=>ce(e,t,{isDir:n,method:"DELETE"}),"remove$2"),Ja=a((e,t,n)=>({Destination:sn(e,t,n),Overwrite:"F"}),"destination"),fn=a((e,t,n,o=!1)=>ce(e,t,{headers:Ja(e,n,o),isDir:o,method:"MOVE"}),"move"),Ya=a(e=>un(e,""),"test"),nt=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),Dt=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class Ue{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof Ue&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class zt extends Ue{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await Wa(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await dn(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof te)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=_(t.path,n);await fn(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class te extends Ue{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await un(this.connection,this.path))yield[t.name,t.isDir?new te(this.connection,t.path,t.name):new zt(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=_(this.path,t),i=await tt(this.connection,o);if(i&&!i.isDir)throw Dt(t);if(!i){if(!n)throw nt(t);await Va(this.connection,o)}return new te(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=_(this.path,t),i=await tt(this.connection,o);if(i?.isDir)throw Dt(t);if(!i){if(!n)throw nt(t);await dn(this.connection,o,new Blob([]))}return new zt(this.connection,o,t,i)}async removeEntry(t){const n=_(this.path,t),o=await tt(this.connection,n);if(!o)throw nt(t);await Ga(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof te)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=_(t.path,n);await fn(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Ka=a(e=>new te(e,"",e.name||new URL(e.url).host),"davRoot"),{files:pn}=RAT.app,hn="remotes.json",ze=new Map,Qa={id:E,name:E,password:E,url:E,username:E},xe=Kt(Qa).create(await pn.read(hn,"json").catch(()=>[]));Q(()=>pn.write(hn,JSON.stringify(xe)));const mn=v(()=>xe.toArray()),$n=a(e=>xe.one({id:e})??null,"byId");async function Xa({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const l={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await Ya(l),xe.push(l),l}a(Xa,"add$1");function _a(e){xe.drop({id:e}),ze.delete(e)}a(_a,"remove$1");function Za(e){const t=$n(e);return t?(ze.has(e)||ze.set(e,Ka(t)),ze.get(e)):null}a(Za,"rootOf");const qe=[{icon:"image",id:"images",label:"Images"},{icon:"audio",id:"audio",label:"Audio"},{icon:"video",id:"video",label:"Videos"},{icon:"document",id:"documents",label:"Documents"},{icon:"archive",id:"archives",label:"Archives"},{icon:"file",id:"other",label:"Other"}],eo=["csv","doc","docx","epub","htm","html","json","md","odp","ods","odt","pdf","ppt","pptx","rtf","txt","xls","xlsx","xml"],to=["7z","bz2","gz","rar","tar","xz","zip","zst"];function ae({name:e,type:t}){const n=_t.from(e),o=t||n.mimeType;return o.startsWith("image/")?"images":o.startsWith("audio/")?"audio":o.startsWith("video/")?"video":o.startsWith("text/")||n.is(...eo)?"documents":n.is(...to)?"archives":"other"}a(ae,"categoryOf");let j=w(null),oe=w(null);const{files:yt}=RAT.app,no=24,ao=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),kt=a(e=>`index/${e.id}.json`,"pathOf");let fe=null;async function vn(e,t,n,o){const i=[],l=[];for await(const r of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");ao(r.name)||(r.kind==="directory"?i.push(r):l.push(Promise.resolve(r.peekFile?.()??r.getFile()).then(c=>({lastModified:c.lastModified,name:r.name,path:t,size:c.size,type:c.type}),()=>null)))}for(const r of await Promise.all(l))r&&n.push(r);oe.value={files:n.length};for(const r of i)await vn(r,t.child(r.name),n,o)}a(vn,"walk");function oo(e){const t=Object.fromEntries(qe.map(({id:i})=>[i,{count:0,size:0}]));let n=0;for(const i of e){const l=t[ae(i)];l.count++,l.size+=i.size,n+=i.size}const o=e.toSorted((i,l)=>l.lastModified-i.lastModified).slice(0,no);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(oo,"summarize");const Nt=a(e=>({...e,path:D.from(e.path)}),"revive");async function io(e){const t=e?await yt.read(kt(e),"json").catch(()=>null):null;return j.value=t&&{...t,files:t.files.map(Nt),recent:t.recent.map(Nt)},j.value}a(io,"restore");async function lo(e,t){fe?.abort();const n=new AbortController;fe=n;const o=[];oe.value={files:0};try{return await vn(e,D.root,o,n.signal),j.value=oo(o),await yt.write(kt(t),JSON.stringify(j.value)),j.value}catch(i){if(i?.name!=="AbortError")throw i;return null}finally{fe===n&&(fe=null,oe.value=null)}}a(lo,"scan");const gn=a(()=>fe?.abort(),"stop$1");async function ro(e){gn(),j.value=null,e&&await yt.remove(kt(e)).catch(()=>{})}a(ro,"forget$1");function so(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const i of j.value?.files??[])if(i.name.toLowerCase().includes(n)&&o.push(i),o.length>=t)break;return o}a(so,"search");const co=50,We=new Le,Ne=P("ended",new Le),bn=v(()=>We.toArray()),uo=v(()=>Ne.toArray()),fo=v(()=>We.has({state:"running"})),wn=new WeakMap,yn=new Map,po=a(e=>e?.name==="AbortError","isAbort"),ho=a(e=>(yn.get(e)??Promise.resolve()).catch(()=>{}),"after");function at(e,t){Object.assign(e,t,{endedAt:Date.now()}),We.remove(e),Ne.unshift(e.toJSON()),Ne.splice(co)}a(at,"finish");function Ve({icon:e="pending",label:t,lane:n="default"},o){const i=new AbortController,{signal:l}=i,r=new Be({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});wn.set(r,i),We.push(r);const c=a((u,g)=>{r.progress={done:u,total:g}},"progress"),d=ho(n).then(async()=>{if(l.aborted)return at(r,{state:"cancelled"}),null;Object.assign(r,{startedAt:Date.now(),state:"running"});try{const u=await o({progress:c,signal:l});return at(r,{state:l.aborted?"cancelled":"done"}),u}catch(u){throw at(r,po(u)?{state:"cancelled"}:{error:String(u?.message??u),state:"failed"}),u}});return yn.set(n,d),d}a(Ve,"run");const mo=a(e=>wn.get(e)?.abort(),"cancel"),$o=a(()=>Ne.clear(),"clearHistory"),{dialogs:vo}=RAT.app,L=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),kn=a(()=>!!L(),"available$1"),xn=["https","http"],st=53317;let $e=w(null),ct=w([]),Rn=w(null),B=w([]),ve=P("targets",[]),ut=P("folderName","");function go(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const l=new URL(n.replace(/^filesync:\/\//,"http://")),r=l.searchParams.get("protocol");return{fingerprint:l.searchParams.get("fingerprint")??"",host:l.hostname,port:Number(l.port)||st,protocol:xn.includes(r)?r:t}}catch{return null}const[o,i]=n.split(":");return{fingerprint:"",host:o,port:Number(i)||st,protocol:t}}a(go,"parseTarget");const Me=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),je=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),bo=a(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??st,protocol:e.protocol??"https"}),"targetOf");function wo(e){const t=ve.value.filter(n=>!je(n,e));ve.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8)}a(wo,"remember");function yo(e){ve.value=ve.value.filter(t=>!je(t,e))}a(yo,"forget");let Mt=!1;async function Tn(){const e=L();e&&(Mt||(Mt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;ct.value=[t,...ct.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),Rn.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await xt())}a(Tn,"start");const ko=a(()=>L()?.stopDiscovery().catch(()=>{}),"stop");function An(e){const t=new Set(B.value.map(n=>n.uri));B.value=[...B.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(An,"add");async function xo(){const{files:e=[]}=await L().pickFiles();An(e)}a(xo,"pickFiles");async function Ro(e,t,n){const o=await(await I(e,t)).getFileHandle(n.name),i=o._uri??(o.path?`file://${o.path}`:null);if(!i)throw new Error("only files of the folder on this device can be sent");An([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:i}])}a(Ro,"addEntry");const To=a(e=>{B.value=B.value.filter(t=>t.uri!==e)},"remove"),Ao=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function So(e,t=B.value,n=""){const o=L();if(!o||!e||!t.length)return Promise.resolve(null);const i=t.length===1?t[0].name:`${t.length} files`;return Ve({icon:"send",label:`Send ${i} to ${Me(e)}`,lane:"send"},async({progress:l})=>{const r=await o.addListener("progress",c=>l(c.sent,c.total));try{const c=a(d=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:d,port:e.port,protocol:e.protocol}),"attempt");try{await c(n)}catch(d){if(!Ao(d))throw d;const u=await vo.prompt({message:`${Me(e)} wants a pin`,ok:"Send",title:"Pin"});if(!u)throw new Error("no pin given");await c(u)}wo(e),B.value=B.value.filter(d=>!t.includes(d))}finally{r.remove()}})}a(So,"send");async function xt(){const e=await L()?.getAutoSyncState().catch(()=>null)??null;$e.value=e&&{...e,name:e.tree?ut.value:""}}a(xt,"refreshAutoSync");async function Oo(){const{name:e,uri:t}=await L().pickFolder();t&&(ut.value=e??"",$e.value={...$e.value,name:ut.value,tree:t})}a(Oo,"pickSyncFolder");async function Eo(e,{pin:t="",ssid:n=""}={}){const o=$e.value?.tree;if(!o)throw new Error("pick a folder first");await L().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await xt()}a(Eo,"startAutoSync");async function Ho(){await L().stopAutoSync(),await xt()}a(Ho,"stopAutoSync");const Fo=a(()=>L()?.syncNow(),"syncNow");let M=w(null);function Do(e,t,n,o){(M.value?.mode!==e||M.value.placed)&&(M.value=new Be({items:new Le,mode:e,placed:!1})),M.value.items.drop({name:t.name,path:n}),M.value.items.push({kind:t.kind,name:t.name,path:n,root:o})}a(Do,"pick$1");const zo=a(()=>{M.value&&(M.value.placed=!0)},"placed"),Sn=a(()=>{M.value=null},"clear");async function jt(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(jt,"exists");async function No(e,t,n){if(!await jt(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,i=o>0?t.slice(0,o):t,l=o>0?t.slice(o):"";for(let r=2;;r++){const c=`${i} (${r})${l}`;if(!await jt(e,c))return c}}a(No,"freeName");async function On(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await On(n);return t}a(On,"countFiles");async function Mo(e,t){const n=await I(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}a(Mo,"handleOf");async function jo(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}a(jo,"moved");async function Co(e,t,n,o,{onProgress:i=a(()=>{},"onProgress"),signal:l}={}){const r=[...t],c=r.find(y=>y.kind==="directory"&&o.startsWith(y.path.child(y.name)));if(c)throw new Error(`“${c.name}” can not go into itself`);const d=await I(e,o),u=await Promise.all(r.map(y=>Mo(y.root??e,y))),g=await Promise.all(u.map(On)),b=g.reduce((y,A)=>y+A,0);let T=0;const x=a((y=1)=>i(T+=y,b),"report");i(0,b);for(const[y,A]of r.entries()){l?.throwIfAborted();const H=u[y],V=g[y];if(n==="move"&&A.path===o){x(V);continue}const U=await No(d,A.name,A.kind);if(n==="move"&&await jo(H,d,U)){x(V);continue}A.kind==="directory"?await vt(H,d,U,l,x):(await $t(H,d,U,l),x()),n==="move"&&await(await I(A.root??e,A.path)).removeEntry(A.name,{recursive:!0})}}a(Co,"transfer");const Ge=p(()=>z),ge=p(()=>gt),Po=p(()=>j),Ct=p(()=>oe),Lo=p(()=>M),{dialogs:K,router:ie}=RAT.app,Bo=["pattern-bg","pattern-tile"],Io={open:Ee("auto","single","double"),"pattern-bg":E,"pattern-tile":E,searchbar:Ee("bottom","top"),tabbar:Ee("bottom","top"),viewmode:Ee("list","grid")},q=P("settings",Be(Io).create());Q(()=>{const e=document.documentElement;for(const t of Bo){const n=q[t];e.toggleAttribute(`data-${t}`,!!n),n&&ua(async()=>{const{patternStyle:o}=await import("./index-BLpyG_KD.js").then(i=>i.Z);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||he(()=>q[t])!==n))for(const[i,l]of Object.entries(o))e.style.setProperty(i,l)})}});Q(()=>{const{dataset:e}=document.documentElement;e.searchbar=q.searchbar,e.tabbar=q.tabbar});const Uo=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),En=a(()=>q.open==="single"||q.open==="auto"&&Uo(),"opensOnTap");let Hn=w(null),be=w([]),Je=w(null),Rt=w(""),dt=w(!1),Fn=w(""),N=w(null),Re=w(null),Dn=w(null);const qo=Be({path:D,source:E.optional().default(null)}),F=P("tabs",Le(qo).create([{}]));let J=P("tabIndex",0);const W=v(()=>F.at(J.value)??F.at(0)),O=v(()=>W.value.path),ue=v(()=>W.value.source),zn=new WeakMap,Nn=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function le(e,t){W.value.path=e,t!==void 0&&(W.value.source=t),N.value=null,Rt.value=""}a(le,"goTo");function Mn(e=O.value,t=ue.value){F.push({path:e,source:t??null}),J.value=F.length-1,N.value=null}a(Mn,"openTab");function Wo(e){if(F.length===1){le(D.root);return}const t=F.indexOf(e);Xt(()=>{F.remove(e),(t<J.value||J.value===F.length)&&J.value--})}a(Wo,"closeTab");function Vo(e){zn.set(W.value,Nn()?.scrollTop??0),J.value=F.indexOf(e),N.value=null}a(Vo,"switchTab");function Tt(e=[]){const t=W.value;Xt(()=>{F.replace(e.length?e:[{}]),J.value=Math.max(0,F.indexOf(t))})}a(Tt,"resetTabs");const Pt=a(e=>e.path.name||Ye(e.source),"tabName"),Te=a(e=>e?Za(e):ge.value,"rootOfSource"),Ye=a(e=>e?$n(e)?.name??"remote":Ge.value?.name??"folder","sourceName"),Ke=a(()=>Te(ue.value),"rootHandle"),we=a(()=>Ye(ue.value),"folderName"),Ae=a(e=>e.source!==void 0?e.source:e.path?null:ue.value,"sourceOf");let jn=w(0),De=0;const Cn=a(()=>{jn.value++},"refresh");Q(()=>{const e=Ke(),t=O.value,n=++De;jn.value,be.value=[],dt.value=!!e,e&&$a(e,t).then(o=>{n===De&&(be.value=o,requestAnimationFrame(()=>{const i=Nn();i&&(i.scrollTop=zn.get(he(()=>W.value))??0)}))}).catch(o=>{n===De&&Ie.error(o)}).finally(()=>{n===De&&(dt.value=!1)})});let ft=null;Q(()=>{const e=ge.value,t=Ge.value;!e||!t||ft===t||(ft=t,io(t).then(()=>Pn(e,t)))});function Pn(e,t){return Ve({icon:"scan",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>gn());const i=Q(()=>{Ct.value&&n(Ct.value.files,null)});return lo(e,t).finally(i)}).catch(n=>console.warn("[files] scan failed",n))}a(Pn,"indexFolder");const Go=a(()=>{ge.value&&Pn(ge.value,Ge.value)},"rescan"),Jo=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),Yo=v(()=>Jo(be.value,Rt.value)),pt=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ln=a((e,t)=>e.kind==="directory"?t&&ln(t.child(e.name))?.icon||"folder":qe.find(n=>n.id===ae(e))?.icon??"file","iconOf");function re(e,t=O.value){if(e.kind==="directory")return le(t.child(e.name)),ie.go("/library");Je.value={...e,kind:"file",path:e.path??t,source:Ae(e)},ie.go("/preview")}a(re,"open");function Bn(e){le(e.path??D.root,Ae(e)),ie.go("/library")}a(Bn,"showInFolder");function Ko(e){if(En())return re(e);N.value=e}a(Ko,"onEntryClick");function In(e){Re.value=null,N.value=e,RAT.app.toggle("context",!0)}a(In,"about");function Qo(){N.value=null,Re.value="tasks",RAT.app.toggle("context",!0)}a(Qo,"openTasks");async function Qe(){const e=Ke();if(!e)throw new Error("No folder open");if((e.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):"granted")!=="granted")throw new Error("No permission to change this folder");return e}a(Qe,"writable");async function At(e,t,n){await Ve({...e,lane:"write"},n),t===O.value&&Cn()}a(At,"writeTask");async function Un(){const e=await K.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await Qe(),n=O.value;await At({icon:"folder-add",label:`New folder ${e}`},n,()=>va(t,n,e))}a(Un,"newFolder");async function Xo(e){const t=await K.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await Qe(),o=e.path??O.value;N.value=null,await At({icon:"edit",label:`Rename ${e.name} to ${t}`},o,()=>ba(n,o,e.name,t,e.kind))}a(Xo,"renameEntry");async function _o(e){if(!await K.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await Qe(),n=e.path??O.value;N.value=null,RAT.app.toggle("context",!1),await At({icon:"delete",label:`Delete ${e.name}`},n,()=>ga(t,n,e.name))}a(_o,"deleteEntry");function Lt(e,t){Do(e,t,t.path??O.value,Te(Ae(t))),RAT.app.toggle("context",!1)}a(Lt,"pick");async function Zo(){const e=Lo.value;if(!e)return;const t=await Qe(),n=e.items.toArray(),o=O.value,i=n.length===1?n[0].name:`${n.length} items`,l=e.mode==="move"?"move":"copy";e.mode==="move"?Sn():zo();try{await Ve({icon:l,label:`${l} ${i} to /${o}`,lane:"write"},({progress:r,signal:c})=>Co(t,n,e.mode,o,{onProgress:r,signal:c}))}finally{o===O.value&&Cn()}}a(Zo,"paste");async function qn(e){const t=await mt(Te(Ae(e)),e.path??O.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(qn,"download");async function Ce(){if(!en)throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");await Ra()&&(Tt(),ie.go("/"))}a(Ce,"chooseFolder");async function ei(){const{granted:e}=await Ta();e||await Ce()}a(ei,"reconnect");async function ti(){await K.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:we()})&&(await ro(Ge.value),ft=null,await Aa(),Tt())}a(ti,"closeFolder");function Wn(e){Mn(D.root,e),ie.go("/library")}a(Wn,"openRemote");function ni(){N.value=null,Re.value="remotes",RAT.app.toggle("context",!0)}a(ni,"manageRemotes");async function ai(e){await K.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name})&&(await _a(e.id),Tt(F.filter(t=>t.source!==e.id).toArray()))}a(ai,"forgetRemote");async function oi(e){await Ro(ge.value,e.path??O.value,e),RAT.app.toggle("context",!1),ie.go("/sync")}a(oi,"sendEntry");async function ii(e){const t=await K.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await K.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"folder"})||"folder";lt(e,Ha({icon:n,label:t}))}a(ii,"newFolderType");function li(e){const t=e.filter(i=>i.kind==="file"),n={};for(const i of t)n[ae(i)]=(n[ae(i)]??0)+1;const o=Object.entries(n).sort((i,l)=>l[1]-i[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?qe.find(i=>i.id===o[0])?.label:null,size:t.reduce((i,l)=>i+l.size,0)}}a(li,"factsOf");const ri=v(()=>li(be.value)),Bt=qe.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),si=a((e,t)=>t.lastModified-e.lastModified,"newest"),ci=v(()=>(Po.value?.files??[]).filter(e=>ae(e)===Hn.value).toSorted(si).slice(0,500)),ui=v(()=>so(Fn.value));let pe=null;const Se=la(!1),Vn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,di=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Vn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),pe=e,Se.value=!0});addEventListener("appinstalled",()=>{pe=null,Se.value=!1});async function fi(){if(!pe)return!1;const e=pe;return pe=null,Se.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(fi,"install");function pi(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),Ie(`${e} can be installed: see the settings`))},"show");Se.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(pi,"hint");const hi=864e5,mi={day:"numeric",month:"short",year:"numeric"},St=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Pe=a(e=>{const t=St(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,mi)},"date"),$i=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/hi;return n<0?Pe(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Pe(t)},"ago"),vi=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Pe(t)},"since"),gi=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${o}:${i}`:`${o}:${i}`},"duration"),bi=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),S={ago:$i,bytes:bi,date:Pe,duration:gi,since:vi};function R(e,t){return wi.call({props:e},e,t)}a(R,"ActionRatHtml");function wi(e,t){return s`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${$(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(wi,"$$ActionRatHtml");function Gn(e,t){return yi.call({props:e},e,t)}a(Gn,"BookmarkActionRatHtml");function yi(e,t){const{path:n}=ke(e,{path:null}),o=v(()=>za(n.value));return s`<${R} ...${{get icon(){return o.value?"bookmark-remove":"bookmark-add"},get label(){return o.value?"remove bookmark":"bookmark"},onclick:a(()=>Na(n.value,n.value.name),"onclick")}} />`}a(yi,"$$BookmarkActionRatHtml");function Xe(e,t){return ki.call({props:e},e,t)}a(Xe,"FactsRatHtml");function ki(e,t){const n=a(i=>i==null||i===""||i===!1,"isEmpty"),o=v(()=>Object.entries(e.rows??{}).filter(([,i])=>!n(i)));return s`
    <dl.facts>
      ${k(()=>o.value,i=>i,([i,l])=>s`<dt>${()=>i}</dt><dd>${()=>l}</dd>`)}
    </dl>
  `}a(ki,"$$FactsRatHtml");function xi(e,t){return Ri.call({props:e},e,t)}a(xi,"EntryDetailsRatHtml");function Ri(e,t){const n=p(()=>O),{entry:o}=ke(e,{entry:null}),i=v(()=>o.value.path??n.value),l=v(()=>o.value.kind==="directory"),r=v(()=>!Ae(o.value)),c=a(d=>d.kind==="directory"?"folder":d.type||"file","kindOf");return s`
    <h2>${()=>o.value.name}</h2>
    <${Xe} ...${{get rows(){return{name:o.value.name,kind:c(o.value),size:l.value?null:S.bytes(o.value.size),modified:o.value.lastModified&&S.date(o.value.lastModified),in:"/"+i.value}}}} />
    <div-x.actions>
      <${R} icon="external" label="open" ...${{onclick:a(()=>re(o.value,i.value),"onclick")}} />
      ${m(()=>o.value.path,()=>s`<${R} icon="folder" label="show in folder" ...${{onclick:a(()=>Bn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value,()=>s`<${R} icon="download" label="download" ...${{onclick:a(()=>qn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value&&r.value&&kn(),()=>s`<${R} icon="send" label="send" ...${{onclick:a(()=>oi(o.value),"onclick")}} />`)}
      ${m(()=>l.value&&r.value,()=>s`<${Gn} ...${{get path(){return i.value.child(o.value.name)}}} />`)}
      <${R} icon="copy" label="copy" ...${{onclick:a(()=>Lt("copy",o.value),"onclick")}} />
      <${R} icon="move" label="move" ...${{onclick:a(()=>Lt("move",o.value),"onclick")}} />
      <${R} icon="edit" label="rename" ...${{onclick:a(()=>Xo(o.value),"onclick")}} />
      <${R} icon="delete" label="delete" ...${{onclick:a(()=>_o(o.value),"onclick")}} />
    </div-x>
  `}a(Ri,"$$EntryDetailsRatHtml");function Ti(e,t){return Ai.call({props:e},e,t)}a(Ti,"FileDetailsRatHtml");function Ai(e,t){const n=p(()=>Je),o=p(()=>Dn);return s`
    <h2>Details</h2>
    <${Xe} ...${{get rows(){return{name:n.value.name,type:n.value.type||"unknown",size:S.bytes(n.value.size),dimensions:o.value&&`${o.value.width} × ${o.value.height}`,modified:S.date(n.value.lastModified),in:"/"+n.value.path}}}} />
    <div-x.actions>
      <${R} icon="download" label="download" ...${{onclick:a(()=>qn(n.value),"onclick")}} />
      <${R} icon="folder" label="show in folder" ...${{onclick:a(()=>Bn(n.value),"onclick")}} />
    </div-x>
  `}a(Ai,"$$FileDetailsRatHtml");function Si(e,t){return Oi.call({props:e},e,t)}a(Si,"FolderDetailsRatHtml");function Oi(e,t){const n=p(()=>be),o=p(()=>ri),i=p(()=>O),l=p(()=>ue),r=p(()=>an),c=v(()=>i.value.length>0&&!l.value),d=v(()=>c.value?on(i.value):null),u=v(()=>c.value&&!d.value?Fa(n.value,ae):null),g=a(b=>lt(i.value,d.value===b?null:b),"toggleFolderType");return s`
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
          ${k(()=>Object.entries(r.value),b=>b,([b,T])=>s`<button.action type="button" aria-pressed=${()=>se(d.value===b)} onclick=${$(()=>g(b))}><svg-icon icon=${()=>T.icon} /> ${()=>T.label}</button>`)}
          <${R} icon="add" label="new foldertype" ...${{onclick:a(()=>ii(i.value),"onclick")}} />
        </div-x>
      `)}
  `}a(Oi,"$$FolderDetailsRatHtml");function Ei(e,t){return Hi.call({props:e},e,t)}a(Ei,"RemoteManagerRatHtml");function Hi(e,t){const n=p(()=>mn);let o=w(null),i=w(!1);async function l(r){r.preventDefault();const c=r.target;i.value=!0,o.value=null;try{const d=await Xa(Object.fromEntries(new FormData(c)));c.reset(),Wn(d.id),RAT.app.toggle("context",!1)}catch(d){o.value=d.message??String(d)}finally{i.value=!1}}return a(l,"add"),s`
    ${m(()=>n.value.length,()=>s`
        <ul.tasks>
          ${k(()=>n.value,r=>r,r=>s`
              <li.task>
                <svg-icon icon="cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="delete" label=${()=>"forget "+r.name} onclick=${$(()=>ai(r))} />
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
  `}a(Hi,"$$RemoteManagerRatHtml");function Jn(e,t){return Fi.call({props:e},e,t)}a(Jn,"StatusRatHtml");function Fi(e,t){const n=p(()=>j),o=p(()=>oe);return s`
    ${m(()=>o.value,()=>s`<p.status><svg-icon icon="pending" /> Reading the folder … ${()=>o.value.files} files</p>`,()=>m(()=>n.value,()=>s`<p.status>${()=>n.value.total} files · ${()=>S.bytes(n.value.size)} · read ${()=>S.date(n.value.scannedAt)}</p>`))}
  `}a(Fi,"$$StatusRatHtml");function Di(e,t){return zi.call({props:e},e,t)}a(Di,"RootDetailsRatHtml");function zi(e,t){const n=p(()=>gt),o=p(()=>oe);return s`
    <h2>${()=>Ye(null)}</h2>
    <${Jn} />
    <div-x.actions><${R} icon="refresh" label="read again" ...${{get disabled(){return!n.value||!!o.value},onclick:Go}} /></div-x>
  `}a(zi,"$$RootDetailsRatHtml");function Ni(e,t){return Mi.call({props:e},e,t)}a(Ni,"TaskListRatHtml");function Mi(e,t){const n=p(()=>uo),o=p(()=>bn),i={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},l=a(u=>u.state==="queued"||u.state==="running","isOpen");function r({progress:u,state:g}){return g!=="running"||u?.done==null?i[g]:u.total?`${Math.round(u.done/u.total*100)}%`:String(u.done)}a(r,"stateOf");function c(u){return u.error?u.error:u.endedAt?`${r(u)} · ${S.date(u.endedAt)}`:r(u)}a(c,"noteOf");function d(u){return s`
      <li class=${()=>`task ${u.state}`}>
        <svg-icon icon=${()=>u.icon} />
        <span.text>
          <span.name>${()=>u.label}</span>
          <small>${()=>c(u)}</small>
          ${m(()=>u.state==="running"&&u.progress?.total,()=>s`<progress max=${()=>u.progress.total} value=${()=>u.progress.done} />`)}
        </span>
        ${m(()=>l(u),()=>s`<btn-icon icon="close" label=${()=>"cancel "+u.label} onclick=${$(()=>mo(u))} />`)}
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
          <btn-icon icon="trash" label="clear the history" onclick=${$($o)} />
        </div-x>
        <ul.tasks>
          ${k(()=>n.value,u=>u,u=>s`${()=>d(u)}`)}
        </ul>
      `)}
  `}a(Mi,"$$TaskListRatHtml");function ji(e,t){return Ci.call({props:e},e,t)}a(ji,"ContextRatHtml");function Ci(e,t){const n=p(()=>Je),o=p(()=>N),i=p(()=>Re),{$path:l}=ke(RAT.app.router,{$path:null});return s`
    ${m(()=>i.value==="tasks",()=>s`<h2>Tasks</h2><${Ni} />`,()=>m(()=>i.value==="remotes",()=>s`<h2>Remote</h2><${Ei} />`,()=>m(()=>o.value,()=>s`<${xi} ...${{get entry(){return o.value}}} />`,()=>m(()=>l.value==="/preview"&&n.value,()=>s`<${Ti} />`,()=>m(()=>l.value==="/library"&&Ke(),()=>s`<${Si} />`,()=>s`<${Di} />`)))))}
  `}a(Ci,"$$ContextRatHtml");function C(e,t){return Pi.call({props:e},e,t)}a(C,"BarRatHtml");function Pi(e,t){return s`
    <header.bar>
      ${m(()=>e.back,()=>s`<btn-icon icon="back" label="back" onclick=${$(e.back)} />`,()=>s`<btn-icon icon="menu" label="menu" onclick=${$(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="settings" label="settings" onclick=${$(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Pi,"$$BarRatHtml");function Ot(e,t){return Li.call({props:e},e,t)}a(Ot,"ThumbRatHtml");function Li(e,t){const n=p(()=>z),o=e.entry,i=e.at??D.root,l=e.from??null,r=RAT.app.thumbnails,c=pt(o)?u(o):null;let d=w(c?r.peekFile(c):null);function u({lastModified:b,name:T,size:x}){return`${l??he(()=>n.value)?.id}/${i}/${T}:${x}:${b}`}a(u,"idOf");function g(b){if(!c||d.value)return;let T=!0;const x=new IntersectionObserver(([y])=>{y.isIntersecting&&(x.disconnect(),r.requestFile(c,()=>mt(Te(l),i,o.name)).then(A=>{T&&A&&(d.value=A)}))},{rootMargin:"200px"});return x.observe(b),()=>{T=!1,x.disconnect()}}return a(g,"watch"),s`
    <span.thumb ref=${ra(g)}>
      ${m(()=>d.value,()=>s`<img src=${()=>d.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>Ln(o,l?null:e.at)} />`)}
    </span>
  `}a(Li,"$$ThumbRatHtml");function It(e,t){return Bi.call({props:e},e,t)}a(It,"FileRowRatHtml");function Bi(e,t){const n=e.entry,o=`/${n.path} · ${S.bytes(n.size)}`;return s`
    <li.row>
      <button.entry type="button" onclick=${$(()=>re(n))}>
        <${Ot} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>o}</small></span>
      </button>
      <btn-icon icon="more" label="more" onclick=${$(()=>In(n))} />
    </li>
  `}a(Bi,"$$FileRowRatHtml");function Yn(e,t){return Ii.call({props:e},e,t)}a(Yn,"SearchbarRatHtml");function Ii(e,t){const n=p(()=>fo),o=p(()=>bn),i=v(()=>o.value.length),l=v(()=>i.value?`${i.value} tasks`:"tasks");return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${$(a(c=>e.onsearch?.(c.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>n.value} aria-label=${()=>se(l.value)} title=${()=>l.value} onclick=${$(Qo)}>
        <svg-icon icon=${()=>n.value?"pending":"tasks"} />
        ${m(()=>i.value,()=>s`<span.badge>${()=>i.value}</span>`)}
      </button>
    </div>
  `}a(Ii,"$$SearchbarRatHtml");function X(e,t){return Ui.call({props:e},e,t)}a(X,"TileRatHtml");function Ui(e,t){return s`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${$(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}a(Ui,"$$TileRatHtml");const qi=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Wi(e,t){return Vi.call({props:e},e,t)}a(Wi,"LoadingRatHtml");function Vi(e,t){return ht("1tn1js8",qi),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Vi,"$$LoadingRatHtml");function Kn(e,t){return Gi.call({props:e},e,t)}a(Kn,"WelcomeRatHtml");function Gi(e,t){const n=p(()=>z),o=p(()=>ya);return s`
    ${m(()=>!en,()=>s`
        <div-y.hero>
          <svg-icon icon="warning" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>m(()=>!o.value,()=>s`<${Wi} />`,()=>m(()=>!n.value,()=>s`
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
              <button.action type="button" onclick=${$(ei)}><svg-icon icon="folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Gi,"$$WelcomeRatHtml");function Ji(e,t){return Yi.call({props:e},e,t)}a(Ji,"DashboardRatHtml");function Yi(e,t){const n=p(()=>Hn),o=p(()=>ci),i=p(()=>ui),l=p(()=>Fn),r=p(()=>mn),c=p(()=>gt),d=p(()=>j),u=[{icon:"drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"network",label:"LAN",note:"smb shares, only in the android app"}],g=v(()=>l.value.trim()!==""),b=v(()=>Da()),T=v(()=>Bt.find(f=>f.id===n.value)?.label??n.value),x=a(()=>Ye(null),"folderName"),y=a(f=>l.value=f,"search"),A=a(f=>d.value?.categories?.[f]??null,"statsOf");function H(f){return f?f>=100?"Found 100+":`Found ${f}`:"Nothing found"}a(H,"foundOf");function V(f){try{return new URL(f).host}catch{return f}}a(V,"hostOf");function U(f){le(f,null),RAT.app.router.go("/library")}a(U,"library");function Oe(f){return f?`${f.count} · ${S.bytes(f.size)}`:"…"}return a(Oe,"noteOf"),s`
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
                          <button.card type="button" onclick=${$(()=>re(f))}>
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
                  ${k(()=>Bt,f=>f,({icon:f,id:de,label:_e})=>s`<${X} ...${{get icon(){return f},get name(){return _e},get note(){return Oe(A(de))},get disabled(){return!A(de)?.count},onclick:a(()=>n.value=de,"onclick")}} />`)}
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
                  <${X} icon="cloud-settings" name="WebDAV, Nextcloud" ...${{get note(){return r.value.length?"add or remove":"connect a server"},onclick:ni}} />
                  ${k(()=>u,f=>f,f=>s`<${X} ...${{get icon(){return f.icon},get name(){return f.label},get note(){return"soon · "+f.note},get title(){return f.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${m(()=>c.value,()=>s`<${Yn} ...${{get placeholder(){return"Search in "+x()},onsearch:y}} />`)}
  `}a(Yi,"$$DashboardRatHtml");function Ki(e,t){return Qi.call({props:e},e,t)}a(Ki,"EntryRatHtml");function Qi(e,t){const n=p(()=>O),o=p(()=>N),i=p(()=>ue),l=e.entry,r=he(()=>n.value),c=he(()=>i.value),d=l.kind==="file"?`${S.date(l.lastModified)} · ${S.bytes(l.size)}`:"folder",u=v(()=>o.value?.name===l.name&&!o.value?.path);function g(b){b.key!=="Enter"||En()||(b.preventDefault(),re(l))}return a(g,"onkeydown"),s`
    <data-item>
      <div.row class:selected=${()=>u.value}>
        <button.entry type="button" aria-pressed=${()=>se(u.value)} onclick=${$(()=>Ko(l))} ondblclick=${$(()=>re(l))} onkeydown=${$(g)}>
          <${Ot} ...${{get entry(){return l},get at(){return r},get from(){return c}}} />
          <span.text><span.name>${()=>l.name}</span><small>${()=>d}</small></span>
        </button>
        <btn-icon icon="more" label="more" onclick=${$(()=>In(l))} />
      </div>
    </data-item>
  `}a(Qi,"$$EntryRatHtml");function Xi(e,t){return _i.call({props:e},e,t)}a(Xi,"PasteBarRatHtml");function _i(e,t){const n=p(()=>M),o=v(()=>n.value?.mode==="move"),i=a(l=>l.length===1?l.at(0).name:`${l.length} items`,"describe");return s`
    ${m(()=>n.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>o.value?"move":"copy"} />
          <span.text>
            <span.name>${()=>i(n.value.items)}</span>
            <small>${()=>o.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${$(Zo)}><svg-icon icon="paste" /> here</button>
          <btn-icon icon="close" label="empty the pickboard" onclick=${$(Sn)} />
        </div-x>
      `)}
  `}a(_i,"$$PasteBarRatHtml");function Zi(e,t){return el.call({props:e},e,t)}a(Zi,"TabsRatHtml");function el(e,t){const n=p(()=>W),o=p(()=>F);return s`
    <div-x.tabs role="tablist" scrollable>
      ${k(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button type="button" role="tab" aria-selected=${()=>se(i===n.value)} onclick=${$(()=>Vo(i))}>${()=>Pt(i)}</button>
            ${m(()=>o.value.length>1,()=>s`<btn-icon icon="close" label=${()=>"close "+Pt(i)} onclick=${$(()=>Wo(i))} />`)}
          </div>
        `)}
      <btn-icon icon="add" label="new tab" onclick=${$(()=>Mn())} />
    </div-x>
  `}a(el,"$$TabsRatHtml");function tl(e,t){return nl.call({props:e},e,t)}a(tl,"LibraryRatHtml");function nl(e,t){const n=p(()=>Rt),o=p(()=>dt),i=p(()=>O),l=p(()=>q),r=p(()=>Yo),c=v(()=>!!Ke()),d=v(()=>l.value.viewmode==="grid"),u=a(x=>le(D.from(x.detail.path)),"crumb"),g=a(x=>n.value=x,"search"),b=a(()=>l.value.viewmode=d.value?"list":"grid","toggleView");function T(){i.value.parent?le(i.value.parent):RAT.app.router.go("/")}return a(T,"up"),s`
    ${m(()=>!c.value,()=>s`<${C} title="Library" /><div.scroll><${Kn} /></div>`,()=>s`
        <${C} ...${{get title(){return i.value.name||we()},get back(){return T}}}><btn-icon icon=${()=>d.value?"list":"grid"} label=${()=>d.value?"show as list":"show as grid"} onclick=${$(b)} /></${C}>
        <nav-crumbs root=${()=>we()} path=${()=>"/"+i.value} onnav-crumbs=${$(u)} />
        <div.pane>
          <div.listing>
            ${m(()=>o.value,()=>s`<svg-icon icon="pending" />`,()=>m(()=>r.value.length,()=>s`
                  <data-index viewmode=${()=>l.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>r.value,x=>x,x=>s`<${Ki} ...${{get entry(){return x}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>n.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${$(Un)}><svg-icon icon="folder-add" /></button>
        </div>
        <${Xi} />
        <${Yn} placeholder="Filter this folder" ...${{get value(){return n.value},onsearch:g}} />
        <${Zi} />
      `)}
  `}a(nl,"$$LibraryRatHtml");const al=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function ol(e,t){return il.call({props:e},e,t)}a(ol,"BrandRatHtml");function il(e,t){return ht("1npwj96",al),s`
    <div.brand data-rat="1npwj96">
      ${m(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(il,"$$BrandRatHtml");function ll(e,t){return rl.call({props:e},e,t)}a(ll,"MenuRatHtml");function rl(e,t){const n=[{icon:"dashboard",label:"Dashboard",route:"/"},{icon:"folder",label:"Library",route:"/library"},{icon:"send",label:"Send",route:"/sync"}],o=[{icon:"image",label:"Image editor"},{icon:"file-edit",label:"Text editor"}],{$path:i}=ke(RAT.app.router,{$path:null});function l(r){RAT.app.router.go(r);const c=RAT.app.area("menu");c?.isOverlay&&c.hide()}return a(l,"go"),s`
    <nav.menu>
      <${ol} name="Files" icon="./app.svg" />
      ${k(()=>n,r=>r,r=>s`<button type="button" aria-current=${()=>se(i.value===r.route?"page":null)} onclick=${$(()=>l(r.route))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
      <hr />
      ${k(()=>o,r=>r,r=>s`<button type="button" disabled><svg-icon icon=${()=>r.icon} /> ${()=>r.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${$(()=>RAT.app.toggle("config",!0))}><svg-icon icon="settings" /> Settings</button>
    </nav>
  `}a(rl,"$$MenuRatHtml");function sl(e,t){return cl.call({props:e},e,t)}a(sl,"PreferencesRatHtml");function cl(e,t){const n=p(()=>q),o=p(()=>z),i={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},l={"pattern-bg":"Background","pattern-tile":"Tiles"},r=a(c=>d=>n.value[c]=d.target.value,"change");return s`
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
            <${R} icon="close" label="close" ...${{onclick:ti}} />
          </div-x>
        `,()=>s`<${R} icon="folder-add" label="Open a folder" ...${{onclick:Ce}} />`)}
    </section>
  `}a(cl,"$$PreferencesRatHtml");function ul(e,t){return dl.call({props:e},e,t)}a(ul,"PreviewRatHtml");function dl(e,t){const n=p(()=>Je),o=p(()=>N),i=p(()=>Dn);let l=w(null);function r(u){let g=null,b=!0;return mt(Te(u.source),u.path,u.name).then(T=>{b&&(g=URL.createObjectURL(T),l.value=g)}),()=>{b=!1,g&&URL.revokeObjectURL(g)}}a(r,"show"),Q(()=>{if(i.value=null,l.value=null,n.value&&pt(n.value))return r(n.value)});const c=a(u=>i.value={height:u.target.naturalHeight,width:u.target.naturalWidth},"loaded");function d(){o.value=null,RAT.app.toggle("context")}return a(d,"info"),s`
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
  `}a(dl,"$$PreviewRatHtml");const ye=P("appearance",{}),Ut={density:Z.densities,geometry:Z.geometries,mode:Z.modes},fl=a(()=>ye.value,"appearance"),pl=a(()=>Z.palettes().catch(()=>[]),"palettes");function hl(e,t){return ye.value={...ye.value,[e]:t||null},Z.set({[e]:t||null})}a(hl,"setAppearance");Object.keys(ye.value).length&&Z.set(ye.value);const ml=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function qt(e,t){return $l.call({props:e},e,t)}a(qt,"SettingsRatHtml");function $l(e,t){ht("177zzh1",ml);let n=w({...fl()}),o=w([]);const i=v(()=>Se.value);pl().then(c=>{o.value=c});function l(c,d){const u=d.detail?.value??d.target.value;n.value={...n.value,[c]:u},hl(c,u)}a(l,"change");async function r(){await fi()&&Ie.success(`${e.name??"the app"} is installed`)}return a(r,"installApp"),s`
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
                ${m(()=>di,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a($l,"$$SettingsRatHtml");function vl(e,t){return gl.call({props:e},e,t)}a(vl,"SyncRatHtml");function gl(e,t){const n=p(()=>$e),o=p(()=>ct),i=p(()=>Rn),l=p(()=>B),r=p(()=>ve);let c=w(null),d=w(""),u=w("https"),g=w(""),b=w("");const T=v(()=>o.value.map(bo)),x=v(()=>r.value.filter(h=>!T.value.some(G=>je(G,h)))),y=v(()=>c.value??go(d.value,u.value)),A=v(()=>l.value.reduce((h,G)=>h+Math.max(0,G.size),0)),H=v(()=>n.value??{}),V=a(h=>!!y.value&&je(y.value,h),"isChosen"),U=a(h=>h.deviceType==="mobile"?"phone":"desktop","iconOf");function Oe(h){c.value=h,d.value=""}a(Oe,"choose");function f(h){d.value=h.target.value,c.value=null}a(f,"type");function de(h){u.value=h.target.value,c.value&&(c.value={...c.value,protocol:u.value})}a(de,"protocol");function _e(h){return h.name?h.name:h.tree?"chosen":"none yet"}a(_e,"folderOf");function Qn(h){return h.enabled?h.lastSync?`on · last ${S.date(h.lastSync)}`:"on":"off"}a(Qn,"stateOf");const Xn=a((h,G)=>h.length?`send ${h.length} · ${S.bytes(G)}`:"send","sendLabel");function Et(h,G,_n){return s`
      <li.row class:selected=${()=>V(h)}>
        <button.entry type="button" aria-pressed=${()=>se(V(h))} onclick=${$(()=>Oe(h))}>
          <span.thumb><svg-icon icon=${()=>G} /></span>
          <span.text>
            <span.name>${()=>Me(h)}</span>
            <small>${()=>h.host}:${()=>h.port} · ${()=>h.protocol}</small>
          </span>
        </button>
        ${m(()=>_n,()=>s`<btn-icon icon="close" label=${()=>"forget "+Me(h)} onclick=${$(()=>yo(h))} />`)}
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
              <input-value look="segments" value=${()=>y.value?.protocol??u.value} onchange=${$(de)}>
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
                        <btn-icon icon="close" label=${()=>"remove "+h.name} onclick=${$(()=>To(h.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${R} icon="file-add" label="pick files" ...${{onclick:xo}} />
              <button.action.primary type="button" disabled=${()=>!l.value.length||!y.value} onclick=${$(()=>So(y.value,l.value,g.value))}><svg-icon icon="send" /> ${()=>Xn(l.value,A.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${Xe} ...${{get rows(){return{folder:_e(H.value),state:Qn(H.value),to:H.value.enabled&&`${H.value.host}:${H.value.port}`}}}} />
            ${m(()=>!H.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Ft(b,"value")} />`)}
            <div-x.actions>
              <${R} icon="folder-search" label="folder" ...${{onclick:Oo}} />
              ${m(()=>H.value.enabled,()=>s`
                  <${R} icon="refresh" label="now" ...${{onclick:Fo}} />
                  <${R} icon="pause" label="turn off" ...${{onclick:Ho}} />
                `,()=>s`<${R} icon="play" label="turn on" ...${{get disabled(){return!H.value.tree||!y.value},onclick:a(()=>Eo(y.value,{pin:g.value,ssid:b.value}),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(gl,"$$SyncRatHtml");function El(e,t){return bl.call({props:e},e,t)}a(El,"AppRatHtml");function bl(e,t){const n=p(()=>Re);RAT.app.on("error",Ie.error),RAT.app.hold(xa()),pi("Files");let o=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!o&&Tn(),l!=="/sync"&&o&&ko(),o=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${ll} /></rat-area>
    <rat-view name="dashboard" route="/"><${Ji} /></rat-view>
    <rat-view name|route="library"><${tl} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${ul} /></rat-view>
    <rat-view name|route="sync"><${vl} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${$(a(l=>{l.detail?.open||(n.value=null)},"ontoggle"))}><div.context><${ji} /></div></rat-area>
    <rat-area name="config" dock="end"><${qt} name="Files"><${sl} /></${qt}></rat-area>
  `}a(bl,"$$AppRatHtml");export{El as default};
