const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-mUY99LjY.js","./preload-helper-Cc2_yIPf.js","./withControl-YhKKGoq_.js","./index-CgHh2HpB.js","./index-DJNaec74.css"])))=>i.map(i=>d[i]);
var aa=Object.defineProperty;var a=(e,t)=>aa(e,"name",{value:t,configurable:!0});import{i as st,g as v,h as oa,r as zt,j as Yt,t as Kt,f as _t,o as ia,k as la,m as ra,q as sa,P as ca,u as Qt,S as H,$ as Xt,v as z,w,x as Be,y as Ue,E as He,z as me,A as ua,C as ce,G as da,H as vt,J as te,K as Mt}from"./index-mUY99LjY.js";import{p as fa,a as pa}from"./keys-CWTtq0D5.js";import{_ as ha}from"./preload-helper-Cc2_yIPf.js";import{h as s,f as k,w as m}from"./withControl-YhKKGoq_.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function xe(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],l=t[o];n[o]=st(i)?i:v(()=>e[o]===void 0&&l?l():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(xe,"signalsOf");function p(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return st(i)?i.value:i},set value(i){const l=o();if(!st(l))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");l.value=i}}}a(p,"imported");function $(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?fa(t):null;let l=o;return function(r){if(!(o&&!l)&&!(i&&!pa(r,i))){n&&r.preventDefault(),o&&l--;try{const c=(typeof e=="string"?oa(e):e).call(this,r);typeof c?.catch=="function"&&c.catch(u=>zt(this,u,"handler"))}catch(c){zt(this,c,"handler")}}}}a($,"listener");const ma={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function $a(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a($a,"extOf");class K{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof K?t:new K($a(t))}get mimeType(){return ma[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}Object.defineProperty(K,"name",{value:"FileExt"});const va=a((e,t,n=t.initial)=>t.parse(n),"ofValue"),Zt=Yt(Kt(K,()=>new _t({initial:"",kind:"fileext",run:a((e,t)=>e instanceof K?{value:e}:typeof e=="string"?{value:new K(e)}:{issues:[{message:"expected an extension",path:t}]},"run")}),va)),at=new Map;class _ extends ra{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof _)return t;const n=sa(t,"/").join("/");return at.has(n)||at.set(n,new _(n)),at.get(n)}static get root(){return _.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return Zt.from(this.name)}child(t){return this.with(t)}}Object.defineProperty(_,"name",{value:"Path"});const N=Yt(Kt(_,()=>new _t({initial:"",kind:"path",run:a((e,t)=>la(e)?{value:_.from(e)}:{issues:[{message:"expected a path",path:t}]},"run")}),ia));function W(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(W,"read$1");function V(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(V,"write$1");const Fe=a(e=>(t,n)=>ca.notify(t,{...n,type:e}),"notify"),qe=Object.assign(Fe("info"),{error:Fe("error"),info:Fe("info"),success:Fe("success")}),ga=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function U(e,t=N.root){let n=e;for(const o of N.from(t))n=await n.getDirectoryHandle(o);return n}a(U,"dirAt");async function ba(e,t=N.root){const n=await U(e,t),o=[];for await(const l of n.values())o.push(l);return(await Promise.all(o.map(async l=>{if(l.kind==="directory")return{kind:"directory",name:l.name};const r=await l.peekFile?.()??await l.getFile();return{kind:"file",lastModified:r.lastModified,name:l.name,size:r.size,type:r.type}}))).sort(ga)}a(ba,"list$1");async function gt(e,t,n){return(await(await U(e,t)).getFileHandle(n)).getFile()}a(gt,"readFile");async function wa(e,t,n){await(await U(e,t)).getDirectoryHandle(n,{create:!0})}a(wa,"mkdir");async function ya(e,t,n){await(await U(e,t)).removeEntry(n,{recursive:!0})}a(ya,"remove$3");async function ka(e,t,n,o,i){const l=await U(e,t),r=i==="directory"?await l.getDirectoryHandle(n):await l.getFileHandle(n);if(typeof r.move=="function")try{await r.move(o);return}catch{}i==="directory"?await wt(r,l,o):await bt(r,l,o),await l.removeEntry(n,{recursive:!0})}a(ka,"rename");async function bt(e,t,n,o){const i=await e.getFile(),r=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(r instanceof WritableStream)){await r.write(await i.arrayBuffer()),await r.close();return}try{await i.stream().pipeTo(r,{signal:o})}catch(c){throw await r.abort?.().catch(()=>{}),c}}a(bt,"copyFile");async function wt(e,t,n,o,i=()=>{}){const l=await t.getDirectoryHandle(n,{create:!0});for await(const r of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");r.kind==="directory"?await wt(r,l,r.name,o,i):(await bt(r,l,r.name,o),i())}}a(wt,"copyTree");const{folders:Q}=RAT.app,{perms:xa,ready:Ra,sources:en}=xe(Q,{perms:null,ready:null,sources:null}),M=v(()=>en.value.at(-1)??null),Ta=v(()=>M.value?xa.value[M.value.id]??null:null),yt=v(()=>Ta.value==="granted"?Q.handleOf(M.value.id):null),tn=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",Sa=a(()=>Q.load(),"load");async function Aa(){const e=en.value.map(n=>n.id),t=await Q.add();if(t)for(const n of e)await Q.remove(n);return t}a(Aa,"grant");async function Oa(){return M.value?Q.reconnect(M.value.id):{granted:!1}}a(Oa,"reconnect$1");async function Ea(){M.value&&await Q.remove(M.value.id)}a(Ea,"forget$2");const Ha=p(()=>M),Fa={folder:H,name:H,path:N},Da={icon:H,label:H},We=Qt(Fa).create(W("files:bookmarks",[])),Me=Xt(H,H).create(W("files:folderTyped",{})),kt=Xt(H,Da).create(W("files:folderTypes",{}));z(()=>V("files:bookmarks",We));z(()=>V("files:folderTyped",Me));z(()=>V("files:folderTypes",kt));const $e=v(()=>String(Ha.value?.id??"")),nn=a(e=>`${$e.value}:${e}`,"keyOf"),xt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},an=v(()=>({...xt,...kt.toJSON()})),on=a(e=>Me.get(nn(e))??null,"folderTypeIdOf"),ln=a(e=>an.value[on(e)]??null,"folderTypeOf");function ct(e,t){const n=nn(e);t?Me.set(n,t):Me.delete(n)}a(ct,"setFolderType");function Na({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return kt.set(n,{icon:e,label:t}),n}a(Na,"addFolderType");function za(e,t){const n=e.filter(r=>r.kind==="file"),o={};for(const r of n)o[t(r)]=(o[t(r)]??0)+1;const[i,l]=Object.entries(o).sort((r,c)=>c[1]-r[1])[0]??[];return i in xt&&l/n.length>=.6?i:null}a(za,"suggestFolderType");const Ma=a(()=>We.where({folder:$e.value}),"bookmarks"),ja=a(e=>We.has({folder:$e.value,path:e}),"isBookmarked"),Ca=a((e,t)=>We.toggle({folder:$e.value,name:t,path:e},{folder:$e.value,path:e}),"toggleBookmark"),Pa=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function La(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(La,"toBase64");const Ia=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),Ba=new Set([101,204,205,304]);async function Ua(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:l}={}){const r=Pa();if(!r)return fetch(e,{body:t,headers:n,method:o,signal:i});const c=await r.request({body:await La(t),headers:n,method:o,timeout:l,url:e});return new Response(Ba.has(c.status)?null:Ia(c.data),{headers:c.headers,status:c.status,statusText:c.statusText})}a(Ua,"request$2");const qa=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Wa=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),rn=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),ee=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function sn(e,t="",n=!1){const o=new URL(Wa(t),rn(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(sn,"urlFor");const Va={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class ot extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function ue(e,t,{body:n,headers:o={},isDir:i=!1,method:l="GET"}={}){if(!e)throw new Error("No webdav connection.");let r;try{r=await Ua(sn(e,t,i),{body:n,headers:{Authorization:qa(e),...o},method:l})}catch(c){throw globalThis.Capacitor?.isNativePlatform?.()?new ot(0,`Connection failed: ${c?.message??c}`):new ot(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!r.ok)throw new ot(r.status,Va[r.status]??`${r.status} ${r.statusText}`);return r}a(ue,"request$1");const Ga='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',ut="DAV:",De=a((e,t)=>e.getElementsByTagNameNS(ut,t)[0]?.textContent??"","firstText");async function cn(e,t,n){const o=await ue(e,t,{body:Ga,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),l=new URL(rn(e)).pathname,r=a(c=>{const u=decodeURIComponent(new URL(c,e.url).pathname);return(u.startsWith(l)?u.slice(l.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(ut,"response")].map(c=>{const u=r(De(c,"href"));return{isDir:c.getElementsByTagNameNS(ut,"collection").length>0,lastModified:Date.parse(De(c,"getlastmodified"))||0,mime:De(c,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(De(c,"getcontentlength"))||0}})}a(cn,"propfind");async function un(e,t=""){const n=ee(t);return(await cn(e,t,1)).filter(i=>i.path!==n).sort((i,l)=>i.isDir===l.isDir?i.name.localeCompare(l.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(un,"list");async function it(e,t){try{return(await cn(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(it,"stat");const Ja=a(async(e,t)=>(await ue(e,t)).blob(),"read"),dn=a((e,t,n)=>ue(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Ya=a((e,t)=>ue(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Ka=a((e,t,n=!1)=>ue(e,t,{isDir:n,method:"DELETE"}),"remove$2"),_a=a((e,t,n)=>({Destination:sn(e,t,n),Overwrite:"F"}),"destination"),fn=a((e,t,n,o=!1)=>ue(e,t,{headers:_a(e,n,o),isDir:o,method:"MOVE"}),"move"),Qa=a(e=>un(e,""),"test"),lt=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),jt=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class Ve{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof Ve&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class Ct extends Ve{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await Ja(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await dn(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ne)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ee(t.path,n);await fn(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ne extends Ve{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await un(this.connection,this.path))yield[t.name,t.isDir?new ne(this.connection,t.path,t.name):new Ct(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=ee(this.path,t),i=await it(this.connection,o);if(i&&!i.isDir)throw jt(t);if(!i){if(!n)throw lt(t);await Ya(this.connection,o)}return new ne(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=ee(this.path,t),i=await it(this.connection,o);if(i?.isDir)throw jt(t);if(!i){if(!n)throw lt(t);await dn(this.connection,o,new Blob([]))}return new Ct(this.connection,o,t,i)}async removeEntry(t){const n=ee(this.path,t),o=await it(this.connection,n);if(!o)throw lt(t);await Ka(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ne)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ee(t.path,n);await fn(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Xa=a(e=>new ne(e,"",e.name||new URL(e.url).host),"davRoot"),{files:pn}=RAT.app,hn="remotes.json",ze=new Map,Za={id:H,name:H,password:H,url:H,username:H},Re=Qt(Za).create(await pn.read(hn,"json").catch(()=>[]));z(()=>pn.write(hn,JSON.stringify(Re)));const mn=v(()=>Re.toArray()),$n=a(e=>Re.one({id:e})??null,"byId");async function eo({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const l={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await Qa(l),Re.push(l),l}a(eo,"add$1");function to(e){Re.drop({id:e}),ze.delete(e)}a(to,"remove$1");function no(e){const t=$n(e);return t?(ze.has(e)||ze.set(e,Xa(t)),ze.get(e)):null}a(no,"rootOf");const Ge=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],ao=["csv","doc","docx","epub","htm","html","json","md","odp","ods","odt","pdf","ppt","pptx","rtf","txt","xls","xlsx","xml"],oo=["7z","bz2","gz","rar","tar","xz","zip","zst"];function ae({name:e,type:t}){const n=Zt.from(e),o=t||n.mimeType;return o.startsWith("image/")?"images":o.startsWith("audio/")?"audio":o.startsWith("video/")?"video":o.startsWith("text/")||n.is(...ao)?"documents":n.is(...oo)?"archives":"other"}a(ae,"categoryOf");let P=w(null),oe=w(null);const{files:Rt}=RAT.app,io=24,lo=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),Tt=a(e=>`index/${e.id}.json`,"pathOf");let pe=null;async function vn(e,t,n,o){const i=[],l=[];for await(const r of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");lo(r.name)||(r.kind==="directory"?i.push(r):l.push(Promise.resolve(r.peekFile?.()??r.getFile()).then(c=>({lastModified:c.lastModified,name:r.name,path:t,size:c.size,type:c.type}),()=>null)))}for(const r of await Promise.all(l))r&&n.push(r);oe.value={files:n.length};for(const r of i)await vn(r,t.child(r.name),n,o)}a(vn,"walk");function ro(e){const t=Object.fromEntries(Ge.map(({id:i})=>[i,{count:0,size:0}]));let n=0;for(const i of e){const l=t[ae(i)];l.count++,l.size+=i.size,n+=i.size}const o=e.toSorted((i,l)=>l.lastModified-i.lastModified).slice(0,io);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(ro,"summarize");const Pt=a(e=>({...e,path:N.from(e.path)}),"revive");async function so(e){const t=e?await Rt.read(Tt(e),"json").catch(()=>null):null;return P.value=t&&{...t,files:t.files.map(Pt),recent:t.recent.map(Pt)},P.value}a(so,"restore");async function co(e,t){pe?.abort();const n=new AbortController;pe=n;const o=[];oe.value={files:0};try{return await vn(e,N.root,o,n.signal),P.value=ro(o),await Rt.write(Tt(t),JSON.stringify(P.value)),P.value}catch(i){if(i?.name!=="AbortError")throw i;return null}finally{pe===n&&(pe=null,oe.value=null)}}a(co,"scan");const gn=a(()=>pe?.abort(),"stop$1");async function uo(e){gn(),P.value=null,e&&await Rt.remove(Tt(e)).catch(()=>{})}a(uo,"forget$1");function fo(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const i of P.value?.files??[])if(i.name.toLowerCase().includes(n)&&o.push(i),o.length>=t)break;return o}a(fo,"search");const po=50,bn="files:tasks",Je=new Be,ve=new Be(W(bn,[]));z(()=>V(bn,ve));const wn=v(()=>Je.toArray()),ho=v(()=>ve.toArray()),mo=v(()=>Je.has({state:"running"})),yn=new WeakMap,kn=new Map,$o=a(e=>e?.name==="AbortError","isAbort"),vo=a(e=>(kn.get(e)??Promise.resolve()).catch(()=>{}),"after");function rt(e,t){Object.assign(e,t,{endedAt:Date.now()}),Je.remove(e),ve.unshift(e.toJSON()),ve.splice(po)}a(rt,"finish");function Ye({icon:e="lucide:loader",label:t,lane:n="default"},o){const i=new AbortController,{signal:l}=i,r=new Ue({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});yn.set(r,i),Je.push(r);const c=a((d,g)=>{r.progress={done:d,total:g}},"progress"),u=vo(n).then(async()=>{if(l.aborted)return rt(r,{state:"cancelled"}),null;Object.assign(r,{startedAt:Date.now(),state:"running"});try{const d=await o({progress:c,signal:l});return rt(r,{state:l.aborted?"cancelled":"done"}),d}catch(d){throw rt(r,$o(d)?{state:"cancelled"}:{error:String(d?.message??d),state:"failed"}),d}});return kn.set(n,u),u}a(Ye,"run");const go=a(e=>yn.get(e)?.abort(),"cancel"),bo=a(()=>ve.clear(),"clearHistory"),{dialogs:wo}=RAT.app,I=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),xn=a(()=>!!I(),"available$1"),Rn=["https","http"],dt=53317,Tn="files:sync",ft=W(Tn,{});let ge=w(null),pt=w([]),Sn=w(null),B=w([]),ie=w(Array.isArray(ft.targets)?ft.targets:[]),je=ft.folderName??"";const St=a(()=>V(Tn,{folderName:je,targets:ie.value}),"persist");function yo(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const l=new URL(n.replace(/^filesync:\/\//,"http://")),r=l.searchParams.get("protocol");return{fingerprint:l.searchParams.get("fingerprint")??"",host:l.hostname,port:Number(l.port)||dt,protocol:Rn.includes(r)?r:t}}catch{return null}const[o,i]=n.split(":");return{fingerprint:"",host:o,port:Number(i)||dt,protocol:t}}a(yo,"parseTarget");const Ce=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),Pe=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),ko=a(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??dt,protocol:e.protocol??"https"}),"targetOf");function xo(e){const t=ie.value.filter(n=>!Pe(n,e));ie.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),St()}a(xo,"remember");function Ro(e){ie.value=ie.value.filter(t=>!Pe(t,e)),St()}a(Ro,"forget");let Lt=!1;async function An(){const e=I();e&&(Lt||(Lt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;pt.value=[t,...pt.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),Sn.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await At())}a(An,"start");const To=a(()=>I()?.stopDiscovery().catch(()=>{}),"stop");function On(e){const t=new Set(B.value.map(n=>n.uri));B.value=[...B.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(On,"add");async function So(){const{files:e=[]}=await I().pickFiles();On(e)}a(So,"pickFiles");async function Ao(e,t,n){const o=await(await U(e,t)).getFileHandle(n.name),i=o._uri??(o.path?`file://${o.path}`:null);if(!i)throw new Error("only files of the folder on this device can be sent");On([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:i}])}a(Ao,"addEntry");const Oo=a(e=>{B.value=B.value.filter(t=>t.uri!==e)},"remove"),Eo=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Ho(e,t=B.value,n=""){const o=I();if(!o||!e||!t.length)return Promise.resolve(null);const i=t.length===1?t[0].name:`${t.length} files`;return Ye({icon:"lucide:send",label:`Send ${i} to ${Ce(e)}`,lane:"send"},async({progress:l})=>{const r=await o.addListener("progress",c=>l(c.sent,c.total));try{const c=a(u=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await c(n)}catch(u){if(!Eo(u))throw u;const d=await wo.prompt({message:`${Ce(e)} wants a pin`,ok:"Send",title:"Pin"});if(!d)throw new Error("no pin given");await c(d)}xo(e),B.value=B.value.filter(u=>!t.includes(u))}finally{r.remove()}})}a(Ho,"send");async function At(){const e=await I()?.getAutoSyncState().catch(()=>null)??null;ge.value=e&&{...e,name:e.tree?je:""}}a(At,"refreshAutoSync");async function Fo(){const{name:e,uri:t}=await I().pickFolder();t&&(je=e??"",ge.value={...ge.value,name:je,tree:t},St())}a(Fo,"pickSyncFolder");async function Do(e,{pin:t="",ssid:n=""}={}){const o=ge.value?.tree;if(!o)throw new Error("pick a folder first");await I().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await At()}a(Do,"startAutoSync");async function No(){await I().stopAutoSync(),await At()}a(No,"stopAutoSync");const zo=a(()=>I()?.syncNow(),"syncNow");let C=w(null);function Mo(e,t,n,o){(C.value?.mode!==e||C.value.placed)&&(C.value=new Ue({items:new Be,mode:e,placed:!1})),C.value.items.drop({name:t.name,path:n}),C.value.items.push({kind:t.kind,name:t.name,path:n,root:o})}a(Mo,"pick$1");const jo=a(()=>{C.value&&(C.value.placed=!0)},"placed"),En=a(()=>{C.value=null},"clear");async function It(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(It,"exists");async function Co(e,t,n){if(!await It(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,i=o>0?t.slice(0,o):t,l=o>0?t.slice(o):"";for(let r=2;;r++){const c=`${i} (${r})${l}`;if(!await It(e,c))return c}}a(Co,"freeName");async function Hn(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await Hn(n);return t}a(Hn,"countFiles");async function Po(e,t){const n=await U(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}a(Po,"handleOf");async function Lo(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}a(Lo,"moved");async function Io(e,t,n,o,{onProgress:i=a(()=>{},"onProgress"),signal:l}={}){const r=[...t],c=r.find(y=>y.kind==="directory"&&o.startsWith(y.path.child(y.name)));if(c)throw new Error(`“${c.name}” can not go into itself`);const u=await U(e,o),d=await Promise.all(r.map(y=>Po(y.root??e,y))),g=await Promise.all(d.map(Hn)),b=g.reduce((y,S)=>y+S,0);let T=0;const x=a((y=1)=>i(T+=y,b),"report");i(0,b);for(const[y,S]of r.entries()){l?.throwIfAborted();const D=d[y],J=g[y];if(n==="move"&&S.path===o){x(J);continue}const G=await Co(u,S.name,S.kind);if(n==="move"&&await Lo(D,u,G)){x(J);continue}S.kind==="directory"?await wt(D,u,G,l,x):(await bt(D,u,G,l),x()),n==="move"&&await(await U(S.root??e,S.path)).removeEntry(S.name,{recursive:!0})}}a(Io,"transfer");const Ke=p(()=>M),be=p(()=>yt),Bo=p(()=>P),Bt=p(()=>oe),Uo=p(()=>C),{dialogs:X,router:le}=RAT.app,qo={copy:"lucide:copy",move:"lucide:scissors"},Wo=["pattern-bg","pattern-tile"],Vo={open:He("auto","single","double"),"pattern-bg":H,"pattern-tile":H,searchbar:He("bottom","top"),tabbar:He("bottom","top"),viewmode:He("list","grid")},q=Ue(Vo).create(W("files:settings",{}));z(()=>V("files:settings",q));z(()=>{const e=document.documentElement;for(const t of Wo){const n=q[t];e.toggleAttribute(`data-${t}`,!!n),n&&ha(async()=>{const{patternStyle:o}=await import("./index-mUY99LjY.js").then(i=>i.L);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||me(()=>q[t])!==n))for(const[i,l]of Object.entries(o))e.style.setProperty(i,l)})}});z(()=>{const{dataset:e}=document.documentElement;e.searchbar=q.searchbar,e.tabbar=q.tabbar});const Go=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Fn=a(()=>q.open==="single"||q.open==="auto"&&Go(),"opensOnTap");let Dn=w(null),we=w([]),_e=w(null),Ot=w(""),ht=w(!1),Nn=w(""),j=w(null),Te=w(null),zn=w(null);const Jo=Ue({path:N,"?source":H}),Qe=a((e={})=>Jo.create({path:e.path??N.root,source:e.source??null}),"tabOf"),Mn=W("files:tabs",{index:0,list:[]}),A=new Be(Mn.list.map(Qe));A.length||A.push(Qe());let F=w(A.at(Mn.index)??A.at(0));z(()=>V("files:tabs",{index:A.indexOf(F.value),list:A}));const E=v(()=>F.value.path),de=v(()=>F.value.source),jn=new WeakMap,Cn=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function re(e,t){F.value.path=e,t!==void 0&&(F.value.source=t),j.value=null,Ot.value=""}a(re,"goTo");function Pn(e=E.value,t=de.value){F.value=Qe({path:e,source:t}),A.push(F.value),j.value=null}a(Pn,"openTab");function Yo(e){if(A.length===1){re(N.root);return}e===F.value&&(F.value=A.at(A.indexOf(e)+1)??A.at(-2)),A.remove(e)}a(Yo,"closeTab");function Ko(e){jn.set(F.value,Cn()?.scrollTop??0),F.value=e,j.value=null}a(Ko,"switchTab");function Et(e=[]){A.replace(e.length?e:[Qe()]),A.includes(F.value)||(F.value=A.at(0))}a(Et,"resetTabs");const Ut=a(e=>e.path.name||Xe(e.source),"tabName"),Se=a(e=>e?no(e):be.value,"rootOfSource"),Xe=a(e=>e?$n(e)?.name??"remote":Ke.value?.name??"folder","sourceName"),Ze=a(()=>Se(de.value),"rootHandle"),ye=a(()=>Xe(de.value),"folderName"),Ae=a(e=>e.source!==void 0?e.source:e.path?null:de.value,"sourceOf");let Ln=w(0),Ne=0;const In=a(()=>{Ln.value++},"refresh");z(()=>{const e=Ze(),t=E.value,n=++Ne;Ln.value,we.value=[],ht.value=!!e,e&&ba(e,t).then(o=>{n===Ne&&(we.value=o,requestAnimationFrame(()=>{const i=Cn();i&&(i.scrollTop=jn.get(me(()=>F.value))??0)}))}).catch(o=>{n===Ne&&qe.error(o)}).finally(()=>{n===Ne&&(ht.value=!1)})});let mt=null;z(()=>{const e=be.value,t=Ke.value;!e||!t||mt===t||(mt=t,so(t).then(()=>Bn(e,t)))});function Bn(e,t){return Ye({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>gn());const i=z(()=>{Bt.value&&n(Bt.value.files,null)});return co(e,t).finally(i)}).catch(n=>console.warn("[files] scan failed",n))}a(Bn,"indexFolder");const _o=a(()=>{be.value&&Bn(be.value,Ke.value)},"rescan"),Qo=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),Xo=v(()=>Qo(we.value,Ot.value)),$t=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Un=a((e,t)=>e.kind==="directory"?t&&ln(t.child(e.name))?.icon||"lucide:folder":Ge.find(n=>n.id===ae(e))?.icon??"lucide:file","iconOf");function se(e,t=E.value){if(e.kind==="directory")return re(t.child(e.name)),le.go("/library");_e.value={...e,kind:"file",path:e.path??t,source:Ae(e)},le.go("/preview")}a(se,"open");function qn(e){re(e.path??N.root,Ae(e)),le.go("/library")}a(qn,"showInFolder");function Zo(e){if(Fn())return se(e);j.value=e}a(Zo,"onEntryClick");function Wn(e){Te.value=null,j.value=e,RAT.app.toggle("context",!0)}a(Wn,"about");function ei(){j.value=null,Te.value="tasks",RAT.app.toggle("context",!0)}a(ei,"openTasks");async function et(){const e=Ze();if(!e)throw new Error("No folder open");if((e.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):"granted")!=="granted")throw new Error("No permission to change this folder");return e}a(et,"writable");async function Ht(e,t,n){await Ye({...e,lane:"write"},n),t===E.value&&In()}a(Ht,"writeTask");async function Vn(){const e=await X.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await et(),n=E.value;await Ht({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>wa(t,n,e))}a(Vn,"newFolder");async function ti(e){const t=await X.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await et(),o=e.path??E.value;j.value=null,await Ht({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>ka(n,o,e.name,t,e.kind))}a(ti,"renameEntry");async function ni(e){if(!await X.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await et(),n=e.path??E.value;j.value=null,RAT.app.toggle("context",!1),await Ht({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>ya(t,n,e.name))}a(ni,"deleteEntry");function qt(e,t){Mo(e,t,t.path??E.value,Se(Ae(t))),RAT.app.toggle("context",!1)}a(qt,"pick");async function ai(){const e=Uo.value;if(!e)return;const t=await et(),n=e.items.toArray(),o=E.value,i=n.length===1?n[0].name:`${n.length} items`,l=e.mode==="move"?"move":"copy",r=qo[l];e.mode==="move"?En():jo();try{await Ye({icon:r,label:`${l} ${i} to /${o}`,lane:"write"},({progress:c,signal:u})=>Io(t,n,e.mode,o,{onProgress:c,signal:u}))}finally{o===E.value&&In()}}a(ai,"paste");async function Gn(e){const t=await gt(Se(Ae(e)),e.path??E.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(Gn,"download");async function Le(){if(!tn)throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");await Aa()&&(Et(),le.go("/"))}a(Le,"chooseFolder");async function oi(){const{granted:e}=await Oa();e||await Le()}a(oi,"reconnect");async function ii(){await X.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:ye()})&&(await uo(Ke.value),mt=null,await Ea(),Et())}a(ii,"closeFolder");function Jn(e){Pn(N.root,e),le.go("/library")}a(Jn,"openRemote");function li(){j.value=null,Te.value="remotes",RAT.app.toggle("context",!0)}a(li,"manageRemotes");async function ri(e){await X.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name})&&(await to(e.id),Et(A.filter(t=>t.source!==e.id).toArray()))}a(ri,"forgetRemote");async function si(e){await Ao(be.value,e.path??E.value,e),RAT.app.toggle("context",!1),le.go("/sync")}a(si,"sendEntry");async function ci(e){const t=await X.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await X.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";ct(e,Na({icon:n,label:t}))}a(ci,"newFolderType");function ui(e){const t=e.filter(i=>i.kind==="file"),n={};for(const i of t)n[ae(i)]=(n[ae(i)]??0)+1;const o=Object.entries(n).sort((i,l)=>l[1]-i[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?Ge.find(i=>i.id===o[0])?.label:null,size:t.reduce((i,l)=>i+l.size,0)}}a(ui,"factsOf");const di=v(()=>ui(we.value)),Wt=Ge.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),fi=a((e,t)=>t.lastModified-e.lastModified,"newest"),pi=v(()=>(Bo.value?.files??[]).filter(e=>ae(e)===Dn.value).toSorted(fi).slice(0,500)),hi=v(()=>fo(Nn.value));let he=null;const Oe=ua(!1),Yn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,mi=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Yn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),he=e,Oe.value=!0});addEventListener("appinstalled",()=>{he=null,Oe.value=!1});async function $i(){if(!he)return!1;const e=he;return he=null,Oe.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a($i,"install");function vi(e){const t=`${e}:install-hint`,n=a(()=>{W(t)||(V(t,!0),qe(`${e} can be installed: see the settings`))},"show");Oe.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(vi,"hint");const gi=864e5,bi={day:"numeric",month:"short",year:"numeric"},Ft=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ie=a(e=>{const t=Ft(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,bi)},"date"),wi=a(e=>{const t=Ft(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/gi;return n<0?Ie(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ie(t)},"ago"),yi=a(e=>{const t=Ft(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ie(t)},"since"),ki=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${o}:${i}`:`${o}:${i}`},"duration"),xi=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),O={ago:wi,bytes:xi,date:Ie,duration:ki,since:yi};function R(e,t){return Ri.call({props:e},e,t)}a(R,"ActionRatHtml");function Ri(e,t){return s`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${$(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(Ri,"$$ActionRatHtml");function Kn(e,t){return Ti.call({props:e},e,t)}a(Kn,"BookmarkActionRatHtml");function Ti(e,t){const{path:n}=xe(e,{path:null}),o=v(()=>ja(n.value));return s`<${R} ...${{get icon(){return o.value?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return o.value?"remove bookmark":"bookmark"},onclick:a(()=>Ca(n.value,n.value.name),"onclick")}} />`}a(Ti,"$$BookmarkActionRatHtml");function tt(e,t){return Si.call({props:e},e,t)}a(tt,"FactsRatHtml");function Si(e,t){const n=a(i=>i==null||i===""||i===!1,"isEmpty"),o=v(()=>Object.entries(e.rows??{}).filter(([,i])=>!n(i)));return s`
    <dl.facts>
      ${k(()=>o.value,i=>i,([i,l])=>s`<dt>${()=>i}</dt><dd>${()=>l}</dd>`)}
    </dl>
  `}a(Si,"$$FactsRatHtml");function Ai(e,t){return Oi.call({props:e},e,t)}a(Ai,"EntryDetailsRatHtml");function Oi(e,t){const n=p(()=>E),{entry:o}=xe(e,{entry:null}),i=v(()=>o.value.path??n.value),l=v(()=>o.value.kind==="directory"),r=v(()=>!Ae(o.value)),c=a(u=>u.kind==="directory"?"folder":u.type||"file","kindOf");return s`
    <h2>${()=>o.value.name}</h2>
    <${tt} ...${{get rows(){return{name:o.value.name,kind:c(o.value),size:l.value?null:O.bytes(o.value.size),modified:o.value.lastModified&&O.date(o.value.lastModified),in:"/"+i.value}}}} />
    <div-x.actions>
      <${R} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>se(o.value,i.value),"onclick")}} />
      ${m(()=>o.value.path,()=>s`<${R} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>qn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value,()=>s`<${R} icon="lucide:download" label="download" ...${{onclick:a(()=>Gn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value&&r.value&&xn(),()=>s`<${R} icon="lucide:send" label="send" ...${{onclick:a(()=>si(o.value),"onclick")}} />`)}
      ${m(()=>l.value&&r.value,()=>s`<${Kn} ...${{get path(){return i.value.child(o.value.name)}}} />`)}
      <${R} icon="lucide:copy" label="copy" ...${{onclick:a(()=>qt("copy",o.value),"onclick")}} />
      <${R} icon="lucide:scissors" label="move" ...${{onclick:a(()=>qt("move",o.value),"onclick")}} />
      <${R} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>ti(o.value),"onclick")}} />
      <${R} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>ni(o.value),"onclick")}} />
    </div-x>
  `}a(Oi,"$$EntryDetailsRatHtml");function Ei(e,t){return Hi.call({props:e},e,t)}a(Ei,"FileDetailsRatHtml");function Hi(e,t){const n=p(()=>_e),o=p(()=>zn);return s`
    <h2>Details</h2>
    <${tt} ...${{get rows(){return{name:n.value.name,type:n.value.type||"unknown",size:O.bytes(n.value.size),dimensions:o.value&&`${o.value.width} × ${o.value.height}`,modified:O.date(n.value.lastModified),in:"/"+n.value.path}}}} />
    <div-x.actions>
      <${R} icon="lucide:download" label="download" ...${{onclick:a(()=>Gn(n.value),"onclick")}} />
      <${R} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>qn(n.value),"onclick")}} />
    </div-x>
  `}a(Hi,"$$FileDetailsRatHtml");function Fi(e,t){return Di.call({props:e},e,t)}a(Fi,"FolderDetailsRatHtml");function Di(e,t){const n=p(()=>we),o=p(()=>di),i=p(()=>E),l=p(()=>de),r=p(()=>an),c=v(()=>i.value.length>0&&!l.value),u=v(()=>c.value?on(i.value):null),d=v(()=>c.value&&!u.value?za(n.value,ae):null),g=a(b=>ct(i.value,u.value===b?null:b),"toggleFolderType");return s`
    <h2>This folder</h2>
    <${tt} ...${{get rows(){return{folder:i.value.name||ye(),contains:`${o.value.folders} folders, ${o.value.files} files`,size:O.bytes(o.value.size),mostly:o.value.mostly}}}} />
    <div-x.actions>
      <${R} icon="lucide:folder-plus" label="new folder" ...${{onclick:Vn}} />
      ${m(()=>c.value,()=>s`<${Kn} ...${{get path(){return i.value}}} />`)}
    </div-x>
    ${m(()=>c.value,()=>s`
        <h3>Foldertype</h3>
        ${m(()=>d.value,()=>s`<p.hint>Looks like ${()=>xt[d.value].label}. <button.link type="button" onclick=${$(()=>ct(i.value,d.value))}>Make it one</button></p>`)}
        <div-x.actions>
          ${k(()=>Object.entries(r.value),b=>b,([b,T])=>s`<button.action type="button" aria-pressed=${()=>ce(u.value===b)} onclick=${$(()=>g(b))}><svg-icon icon=${()=>T.icon} /> ${()=>T.label}</button>`)}
          <${R} icon="lucide:plus" label="new foldertype" ...${{onclick:a(()=>ci(i.value),"onclick")}} />
        </div-x>
      `)}
  `}a(Di,"$$FolderDetailsRatHtml");function Ni(e,t){return zi.call({props:e},e,t)}a(Ni,"RemoteManagerRatHtml");function zi(e,t){const n=p(()=>mn);let o=w(null),i=w(!1);async function l(r){r.preventDefault();const c=r.target;i.value=!0,o.value=null;try{const u=await eo(Object.fromEntries(new FormData(c)));c.reset(),Jn(u.id),RAT.app.toggle("context",!1)}catch(u){o.value=u.message??String(u)}finally{i.value=!1}}return a(l,"add"),s`
    ${m(()=>n.value.length,()=>s`
        <ul.tasks>
          ${k(()=>n.value,r=>r,r=>s`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+r.name} onclick=${$(()=>ri(r))} />
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
      <button.action type="submit" disabled=${()=>i.value}><svg-icon icon=${()=>i.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(zi,"$$RemoteManagerRatHtml");function _n(e,t){return Mi.call({props:e},e,t)}a(_n,"StatusRatHtml");function Mi(e,t){const n=p(()=>P),o=p(()=>oe);return s`
    ${m(()=>o.value,()=>s`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>o.value.files} files</p>`,()=>m(()=>n.value,()=>s`<p.status>${()=>n.value.total} files · ${()=>O.bytes(n.value.size)} · read ${()=>O.date(n.value.scannedAt)}</p>`))}
  `}a(Mi,"$$StatusRatHtml");function ji(e,t){return Ci.call({props:e},e,t)}a(ji,"RootDetailsRatHtml");function Ci(e,t){const n=p(()=>yt),o=p(()=>oe);return s`
    <h2>${()=>Xe(null)}</h2>
    <${_n} />
    <div-x.actions><${R} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!n.value||!!o.value},onclick:_o}} /></div-x>
  `}a(Ci,"$$RootDetailsRatHtml");function Pi(e,t){return Li.call({props:e},e,t)}a(Pi,"TaskListRatHtml");function Li(e,t){const n=p(()=>ho),o=p(()=>wn),i={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},l=a(d=>d.state==="queued"||d.state==="running","isOpen");function r({progress:d,state:g}){return g!=="running"||d?.done==null?i[g]:d.total?`${Math.round(d.done/d.total*100)}%`:String(d.done)}a(r,"stateOf");function c(d){return d.error?d.error:d.endedAt?`${r(d)} · ${O.date(d.endedAt)}`:r(d)}a(c,"noteOf");function u(d){return s`
      <li class=${()=>`task ${d.state}`}>
        <svg-icon icon=${()=>d.icon} />
        <span.text>
          <span.name>${()=>d.label}</span>
          <small>${()=>c(d)}</small>
          ${m(()=>d.state==="running"&&d.progress?.total,()=>s`<progress max=${()=>d.progress.total} value=${()=>d.progress.done} />`)}
        </span>
        ${m(()=>l(d),()=>s`<btn-icon icon="lucide:x" label=${()=>"cancel "+d.label} onclick=${$(()=>go(d))} />`)}
      </li>
    `}return a(u,"row"),s`
    ${m(()=>o.value.length,()=>s`
        <ul.tasks>
          ${k(()=>o.value,d=>d,d=>s`${()=>u(d)}`)}
        </ul>
      `,()=>s`<p.empty>nothing to do</p>`)}
    ${m(()=>n.value.length,()=>s`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${$(bo)} />
        </div-x>
        <ul.tasks>
          ${k(()=>n.value,d=>d,d=>s`${()=>u(d)}`)}
        </ul>
      `)}
  `}a(Li,"$$TaskListRatHtml");function Ii(e,t){return Bi.call({props:e},e,t)}a(Ii,"ContextRatHtml");function Bi(e,t){const n=p(()=>_e),o=p(()=>j),i=p(()=>Te),{$path:l}=xe(RAT.app.router,{$path:null});return s`
    ${m(()=>i.value==="tasks",()=>s`<h2>Tasks</h2><${Pi} />`,()=>m(()=>i.value==="remotes",()=>s`<h2>Remote</h2><${Ni} />`,()=>m(()=>o.value,()=>s`<${Ai} ...${{get entry(){return o.value}}} />`,()=>m(()=>l.value==="/preview"&&n.value,()=>s`<${Ei} />`,()=>m(()=>l.value==="/library"&&Ze(),()=>s`<${Fi} />`,()=>s`<${ji} />`)))))}
  `}a(Bi,"$$ContextRatHtml");function L(e,t){return Ui.call({props:e},e,t)}a(L,"BarRatHtml");function Ui(e,t){return s`
    <header.bar>
      ${m(()=>e.back,()=>s`<btn-icon icon="lucide:arrow-left" label="back" onclick=${$(e.back)} />`,()=>s`<btn-icon icon="lucide:menu" label="menu" onclick=${$(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${$(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Ui,"$$BarRatHtml");function Dt(e,t){return qi.call({props:e},e,t)}a(Dt,"ThumbRatHtml");function qi(e,t){const n=p(()=>M),o=e.entry,i=e.at??N.root,l=e.from??null,r=RAT.app.thumbnails,c=$t(o)?d(o):null;let u=w(c?r.peekFile(c):null);function d({lastModified:b,name:T,size:x}){return`${l??me(()=>n.value)?.id}/${i}/${T}:${x}:${b}`}a(d,"idOf");function g(b){if(!c||u.value)return;let T=!0;const x=new IntersectionObserver(([y])=>{y.isIntersecting&&(x.disconnect(),r.requestFile(c,()=>gt(Se(l),i,o.name)).then(S=>{T&&S&&(u.value=S)}))},{rootMargin:"200px"});return x.observe(b),()=>{T=!1,x.disconnect()}}return a(g,"watch"),s`
    <span.thumb ref=${da(g)}>
      ${m(()=>u.value,()=>s`<img src=${()=>u.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>Un(o,l?null:e.at)} />`)}
    </span>
  `}a(qi,"$$ThumbRatHtml");function Vt(e,t){return Wi.call({props:e},e,t)}a(Vt,"FileRowRatHtml");function Wi(e,t){const n=e.entry,o=`/${n.path} · ${O.bytes(n.size)}`;return s`
    <li.row>
      <button.entry type="button" onclick=${$(()=>se(n))}>
        <${Dt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>o}</small></span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${$(()=>Wn(n))} />
    </li>
  `}a(Wi,"$$FileRowRatHtml");function Qn(e,t){return Vi.call({props:e},e,t)}a(Qn,"SearchbarRatHtml");function Vi(e,t){const n=p(()=>mo),o=p(()=>wn),i=v(()=>o.value.length),l=v(()=>i.value?`${i.value} tasks`:"tasks");return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${$(a(c=>e.onsearch?.(c.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>n.value} aria-label=${()=>ce(l.value)} title=${()=>l.value} onclick=${$(ei)}>
        <svg-icon icon=${()=>n.value?"lucide:loader":"lucide:list-checks"} />
        ${m(()=>i.value,()=>s`<span.badge>${()=>i.value}</span>`)}
      </button>
    </div>
  `}a(Vi,"$$SearchbarRatHtml");function Z(e,t){return Gi.call({props:e},e,t)}a(Z,"TileRatHtml");function Gi(e,t){return s`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${$(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}a(Gi,"$$TileRatHtml");const Ji=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Yi(e,t){return Ki.call({props:e},e,t)}a(Yi,"LoadingRatHtml");function Ki(e,t){return vt("1tn1js8",Ji),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Ki,"$$LoadingRatHtml");function Xn(e,t){return _i.call({props:e},e,t)}a(Xn,"WelcomeRatHtml");function _i(e,t){const n=p(()=>M),o=p(()=>Ra);return s`
    ${m(()=>!tn,()=>s`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>m(()=>!o.value,()=>s`<${Yi} />`,()=>m(()=>!n.value,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${$(Le)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>ye()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${$(oi)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(_i,"$$WelcomeRatHtml");function Qi(e,t){return Xi.call({props:e},e,t)}a(Qi,"DashboardRatHtml");function Xi(e,t){const n=p(()=>Dn),o=p(()=>pi),i=p(()=>hi),l=p(()=>Nn),r=p(()=>mn),c=p(()=>yt),u=p(()=>P),d=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}],g=v(()=>l.value.trim()!==""),b=v(()=>Ma()),T=v(()=>Wt.find(f=>f.id===n.value)?.label??n.value),x=a(()=>Xe(null),"folderName"),y=a(f=>l.value=f,"search"),S=a(f=>u.value?.categories?.[f]??null,"statsOf");function D(f){return f?f>=100?"Found 100+":`Found ${f}`:"Nothing found"}a(D,"foundOf");function J(f){try{return new URL(f).host}catch{return f}}a(J,"hostOf");function G(f){re(f,null),RAT.app.router.go("/library")}a(G,"library");function Ee(f){return f?`${f.count} · ${O.bytes(f.size)}`:"…"}return a(Ee,"noteOf"),s`
    <${L} title="Files" />
    <div.scroll>
      ${m(()=>!c.value,()=>s`<${Xn} />`,()=>m(()=>g.value,()=>s`
            <section>
              <h2>${()=>D(i.value.length)}</h2>
              <ul.rows>
                ${k(()=>i.value,f=>f,f=>s`<${Vt} ...${{get entry(){return f}}} />`)}
              </ul>
            </section>
          `,()=>m(()=>n.value,()=>s`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${$(()=>n.value=null)} />
                  <h2>${()=>T.value}</h2>
                </div-x>
                <ul.rows>
                  ${k(()=>o.value,f=>f,f=>s`<${Vt} ...${{get entry(){return f}}} />`)}
                </ul>
              </section>
            `,()=>s`
              ${m(()=>u.value?.recent.length,()=>s`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${k(()=>u.value.recent,f=>f,f=>s`
                          <button.card type="button" onclick=${$(()=>se(f))}>
                            <${Dt} ...${{get entry(){return f},get at(){return f.path}}} />
                            <span.name>${()=>f.name}</span>
                            <small>${()=>O.date(f.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${m(()=>b.value.length,()=>s`
                    <ul.tiles>
                      ${k(()=>b.value,f=>f,f=>s`<${Z} ...${{get icon(){return ln(f.path)?.icon??"lucide:bookmark"},get name(){return f.name},get note(){return"/"+f.path},onclick:a(()=>G(f.path),"onclick")}} />`)}
                    </ul>
                  `,()=>s`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${k(()=>Wt,f=>f,({icon:f,id:fe,label:nt})=>s`<${Z} ...${{get icon(){return f},get name(){return nt},get note(){return Ee(S(fe))},get disabled(){return!S(fe)?.count},onclick:a(()=>n.value=fe,"onclick")}} />`)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles><${Z} icon="lucide:folder-open" ...${{get name(){return x()},get note(){return u.value?O.bytes(u.value.size):"the granted folder"},onclick:a(()=>G(N.root),"onclick")}} /></ul>
                <${_n} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${k(()=>r.value,f=>f,f=>s`<${Z} icon="lucide:cloud" ...${{get name(){return f.name},get note(){return J(f.url)},onclick:a(()=>Jn(f.id),"onclick")}} />`)}
                  <${Z} icon="lucide:cloud-cog" name="WebDAV, Nextcloud" ...${{get note(){return r.value.length?"add or remove":"connect a server"},onclick:li}} />
                  ${k(()=>d,f=>f,f=>s`<${Z} ...${{get icon(){return f.icon},get name(){return f.label},get note(){return"soon · "+f.note},get title(){return f.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${m(()=>c.value,()=>s`<${Qn} ...${{get placeholder(){return"Search in "+x()},onsearch:y}} />`)}
  `}a(Xi,"$$DashboardRatHtml");function Zi(e,t){return el.call({props:e},e,t)}a(Zi,"EntryRatHtml");function el(e,t){const n=p(()=>E),o=p(()=>j),i=p(()=>de),l=e.entry,r=me(()=>n.value),c=me(()=>i.value),u=l.kind==="file"?`${O.date(l.lastModified)} · ${O.bytes(l.size)}`:"folder",d=v(()=>o.value?.name===l.name&&!o.value?.path);function g(b){b.key!=="Enter"||Fn()||(b.preventDefault(),se(l))}return a(g,"onkeydown"),s`
    <data-item>
      <div.row class:selected=${()=>d.value}>
        <button.entry type="button" aria-pressed=${()=>ce(d.value)} onclick=${$(()=>Zo(l))} ondblclick=${$(()=>se(l))} onkeydown=${$(g)}>
          <${Dt} ...${{get entry(){return l},get at(){return r},get from(){return c}}} />
          <span.text><span.name>${()=>l.name}</span><small>${()=>u}</small></span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${$(()=>Wn(l))} />
      </div>
    </data-item>
  `}a(el,"$$EntryRatHtml");function tl(e,t){return nl.call({props:e},e,t)}a(tl,"PasteBarRatHtml");function nl(e,t){const n=p(()=>C),o=v(()=>n.value?.mode==="move"),i=a(l=>l.length===1?l.at(0).name:`${l.length} items`,"describe");return s`
    ${m(()=>n.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>o.value?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>i(n.value.items)}</span>
            <small>${()=>o.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${$(ai)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the pickboard" onclick=${$(En)} />
        </div-x>
      `)}
  `}a(nl,"$$PasteBarRatHtml");function al(e,t){return ol.call({props:e},e,t)}a(al,"TabsRatHtml");function ol(e,t){const n=p(()=>F),o=p(()=>A);return s`
    <div-x.tabs role="tablist" scrollable>
      ${k(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button type="button" role="tab" aria-selected=${()=>ce(i===n.value)} onclick=${$(()=>Ko(i))}>${()=>Ut(i)}</button>
            ${m(()=>o.value.length>1,()=>s`<btn-icon icon="lucide:x" label=${()=>"close "+Ut(i)} onclick=${$(()=>Yo(i))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${$(()=>Pn())} />
    </div-x>
  `}a(ol,"$$TabsRatHtml");function il(e,t){return ll.call({props:e},e,t)}a(il,"LibraryRatHtml");function ll(e,t){const n=p(()=>Ot),o=p(()=>ht),i=p(()=>E),l=p(()=>q),r=p(()=>Xo),c=v(()=>!!Ze()),u=v(()=>l.value.viewmode==="grid"),d=a(x=>re(N.from(x.detail.path)),"crumb"),g=a(x=>n.value=x,"search"),b=a(()=>l.value.viewmode=u.value?"list":"grid","toggleView");function T(){i.value.parent?re(i.value.parent):RAT.app.router.go("/")}return a(T,"up"),s`
    ${m(()=>!c.value,()=>s`<${L} title="Library" /><div.scroll><${Xn} /></div>`,()=>s`
        <${L} ...${{get title(){return i.value.name||ye()},get back(){return T}}}><btn-icon icon=${()=>u.value?"lucide:list":"lucide:layout-grid"} label=${()=>u.value?"show as list":"show as grid"} onclick=${$(b)} /></${L}>
        <nav-crumbs root=${()=>ye()} path=${()=>"/"+i.value} onnav-crumbs=${$(d)} />
        <div.pane>
          <div.listing>
            ${m(()=>o.value,()=>s`<svg-icon icon="lucide:loader" />`,()=>m(()=>r.value.length,()=>s`
                  <data-index viewmode=${()=>l.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>r.value,x=>x,x=>s`<${Zi} ...${{get entry(){return x}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>n.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${$(Vn)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${tl} />
        <${Qn} placeholder="Filter this folder" ...${{get value(){return n.value},onsearch:g}} />
        <${al} />
      `)}
  `}a(ll,"$$LibraryRatHtml");const rl=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function sl(e,t){return cl.call({props:e},e,t)}a(sl,"BrandRatHtml");function cl(e,t){return vt("1npwj96",rl),s`
    <div.brand data-rat="1npwj96">
      ${m(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(cl,"$$BrandRatHtml");function ul(e,t){return dl.call({props:e},e,t)}a(ul,"MenuRatHtml");function dl(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:i}=xe(RAT.app.router,{$path:null});function l(r){RAT.app.router.go(r);const c=RAT.app.area("menu");c?.isOverlay&&c.hide()}return a(l,"go"),s`
    <nav.menu>
      <${sl} name="Files" icon="./app.svg" />
      ${k(()=>n,r=>r,r=>s`<button type="button" aria-current=${()=>ce(i.value===r.route?"page":null)} onclick=${$(()=>l(r.route))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
      <hr />
      ${k(()=>o,r=>r,r=>s`<button type="button" disabled><svg-icon icon=${()=>r.icon} /> ${()=>r.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${$(()=>RAT.app.toggle("config",!0))}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(dl,"$$MenuRatHtml");function fl(e,t){return pl.call({props:e},e,t)}a(fl,"PreferencesRatHtml");function pl(e,t){const n=p(()=>q),o=p(()=>M),i={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},l={"pattern-bg":"Background","pattern-tile":"Tiles"},r=a(c=>u=>n.value[c]=u.target.value,"change");return s`
    <section>
      <h3>files</h3>
      ${k(()=>Object.entries(i),c=>c,([c,{label:u,values:d}])=>s`
          <label>
            <span>${()=>u}</span>
            <input-value look="segments" value=${()=>n.value[c]} onchange=${$(r(c))}>
              ${k(()=>Object.entries(d),g=>g,([g,b])=>s`<input-option value=${()=>g}>${()=>b}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${k(()=>Object.entries(l),c=>c,([c,u])=>s`
          <label>
            <span>${()=>u}</span>
            <input-pattern opacity value=${()=>n.value[c]} onchange=${$(r(c))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${m(()=>o.value,()=>s`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>o.value.name}</p>
          <div-x.actions>
            <${R} icon="lucide:folder-sync" label="change" ...${{onclick:Le}} />
            <${R} icon="lucide:x" label="close" ...${{onclick:ii}} />
          </div-x>
        `,()=>s`<${R} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Le}} />`)}
    </section>
  `}a(pl,"$$PreferencesRatHtml");function hl(e,t){return ml.call({props:e},e,t)}a(hl,"PreviewRatHtml");function ml(e,t){const n=p(()=>_e),o=p(()=>j),i=p(()=>zn);let l=w(null);function r(d){let g=null,b=!0;return gt(Se(d.source),d.path,d.name).then(T=>{b&&(g=URL.createObjectURL(T),l.value=g)}),()=>{b=!1,g&&URL.revokeObjectURL(g)}}a(r,"show"),z(()=>{if(i.value=null,l.value=null,n.value&&$t(n.value))return r(n.value)});const c=a(d=>i.value={height:d.target.naturalHeight,width:d.target.naturalWidth},"loaded");function u(){o.value=null,RAT.app.toggle("context")}return a(u,"info"),s`
    ${m(()=>!n.value,()=>s`
        <${L} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>s`
        <${L} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${$(u)} /></${L}>
        <div.stage>
          ${m(()=>$t(n.value),()=>s`
              ${m(()=>l.value,()=>s`<img src=${()=>l.value} alt=${()=>n.value.name} onload=${$(c)} />`)}
            `,()=>s`<svg-icon icon=${()=>Un(n.value)} />`)}
        </div>
      `)}
  `}a(ml,"$$PreviewRatHtml");const Zn=`appearance:${new URL(".",location.href).pathname}`,Gt={density:te.densities,geometry:te.geometries,mode:te.modes},ke=W(Zn,{}),$l=a(()=>te.palettes().catch(()=>[]),"palettes");function vl(e,t){return ke[e]=t||null,V(Zn,ke),te.set({[e]:t||null})}a(vl,"setAppearance");Object.keys(ke).length&&te.set(ke);const gl=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Jt(e,t){return bl.call({props:e},e,t)}a(Jt,"SettingsRatHtml");function bl(e,t){vt("177zzh1",gl);let n=w({...ke}),o=w([]);const i=v(()=>Oe.value);$l().then(c=>{o.value=c});function l(c,u){const d=u.detail?.value??u.target.value;n.value={...n.value,[c]:d},vl(c,d)}a(l,"change");async function r(){await $i()&&qe.success(`${e.name??"the app"} is installed`)}return a(r,"installApp"),s`
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
        ${k(()=>Object.keys(Gt),c=>c,c=>s`
            <label>
              <span>${()=>c}</span>
              <input-value look="segments" value=${()=>n.value[c]??""} onchange=${$(u=>l(c,u))}>
                ${k(()=>Gt[c],u=>u,u=>s`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!Yn,()=>s`
          <section>
            <h3>install</h3>
            ${m(()=>i.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${$(r)} />`,()=>s`
                ${m(()=>mi,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(bl,"$$SettingsRatHtml");function wl(e,t){return yl.call({props:e},e,t)}a(wl,"SyncRatHtml");function yl(e,t){const n=p(()=>ge),o=p(()=>pt),i=p(()=>Sn),l=p(()=>B),r=p(()=>ie);let c=w(null),u=w(""),d=w("https"),g=w(""),b=w("");const T=v(()=>o.value.map(ko)),x=v(()=>r.value.filter(h=>!T.value.some(Y=>Pe(Y,h)))),y=v(()=>c.value??yo(u.value,d.value)),S=v(()=>l.value.reduce((h,Y)=>h+Math.max(0,Y.size),0)),D=v(()=>n.value??{}),J=a(h=>!!y.value&&Pe(y.value,h),"isChosen"),G=a(h=>h.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf");function Ee(h){c.value=h,u.value=""}a(Ee,"choose");function f(h){u.value=h.target.value,c.value=null}a(f,"type");function fe(h){d.value=h.target.value,c.value&&(c.value={...c.value,protocol:d.value})}a(fe,"protocol");function nt(h){return h.name?h.name:h.tree?"chosen":"none yet"}a(nt,"folderOf");function ea(h){return h.enabled?h.lastSync?`on · last ${O.date(h.lastSync)}`:"on":"off"}a(ea,"stateOf");const ta=a((h,Y)=>h.length?`send ${h.length} · ${O.bytes(Y)}`:"send","sendLabel");function Nt(h,Y,na){return s`
      <li.row class:selected=${()=>J(h)}>
        <button.entry type="button" aria-pressed=${()=>ce(J(h))} onclick=${$(()=>Ee(h))}>
          <span.thumb><svg-icon icon=${()=>Y} /></span>
          <span.text>
            <span.name>${()=>Ce(h)}</span>
            <small>${()=>h.host}:${()=>h.port} · ${()=>h.protocol}</small>
          </span>
        </button>
        ${m(()=>na,()=>s`<btn-icon icon="lucide:x" label=${()=>"forget "+Ce(h)} onclick=${$(()=>Ro(h))} />`)}
      </li>
    `}return a(Nt,"receiver"),s`
    ${m(()=>!xn(),()=>s`
        <${L} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>s`
        <${L} title="Send">
          ${m(()=>i.value,()=>s`<small.identity>${()=>i.value.alias}</small>`)}
        </${L}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${$(An)} />
            </div-x>
            ${m(()=>T.value.length||x.value.length,()=>s`
                <ul.rows>
                  ${k(()=>T.value,h=>h,h=>s`${()=>Nt(h,G(h),!1)}`)}
                  ${k(()=>x.value,h=>h,h=>s`${()=>Nt(h,"lucide:history",!0)}`)}
                </ul>
              `,()=>s`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>u.value} oninput=${$(f)} />
              <input-value look="segments" value=${()=>y.value?.protocol??d.value} onchange=${$(fe)}>
                ${k(()=>Rn,h=>h,h=>s`<input-option value=${()=>h}>${()=>h}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" ref=${Mt(g,"value")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${m(()=>l.value.length,()=>s`
                <ul.rows>
                  ${k(()=>l.value,h=>h,h=>s`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>h.name}</span>
                            <small>${()=>h.size>=0?O.bytes(h.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+h.name} onclick=${$(()=>Oo(h.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${R} icon="lucide:file-plus" label="pick files" ...${{onclick:So}} />
              <button.action.primary type="button" disabled=${()=>!l.value.length||!y.value} onclick=${$(()=>Ho(y.value,l.value,g.value))}><svg-icon icon="lucide:send" /> ${()=>ta(l.value,S.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${tt} ...${{get rows(){return{folder:nt(D.value),state:ea(D.value),to:D.value.enabled&&`${D.value.host}:${D.value.port}`}}}} />
            ${m(()=>!D.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Mt(b,"value")} />`)}
            <div-x.actions>
              <${R} icon="lucide:folder-search" label="folder" ...${{onclick:Fo}} />
              ${m(()=>D.value.enabled,()=>s`
                  <${R} icon="lucide:refresh-cw" label="now" ...${{onclick:zo}} />
                  <${R} icon="lucide:pause" label="turn off" ...${{onclick:No}} />
                `,()=>s`<${R} icon="lucide:play" label="turn on" ...${{get disabled(){return!D.value.tree||!y.value},onclick:a(()=>Do(y.value,{pin:g.value,ssid:b.value}),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(yl,"$$SyncRatHtml");function Dl(e,t){return kl.call({props:e},e,t)}a(Dl,"AppRatHtml");function kl(e,t){const n=p(()=>Te);RAT.app.on("error",qe.error),RAT.app.hold(Sa()),vi("Files");let o=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!o&&An(),l!=="/sync"&&o&&To(),o=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${ul} /></rat-area>
    <rat-view name="dashboard" route="/"><${Qi} /></rat-view>
    <rat-view name|route="library"><${il} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${hl} /></rat-view>
    <rat-view name|route="sync"><${wl} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${$(a(l=>{l.detail?.open||(n.value=null)},"ontoggle"))}><div.context><${Ii} /></div></rat-area>
    <rat-area name="config" dock="end"><${Jt} name="Files"><${fl} /></${Jt}></rat-area>
  `}a(kl,"$$AppRatHtml");export{Dl as default};
