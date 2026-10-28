const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Bbos8dJc.js","./preload-helper-Cc2_yIPf.js","./withControl-YhKKGoq_.js","./index-CgHh2HpB.js","./index-DJNaec74.css"])))=>i.map(i=>d[i]);
var Zn=Object.defineProperty;var a=(e,t)=>Zn(e,"name",{value:t,configurable:!0});import{j as ot,k as v,m as ea,r as Ft,o as Vt,t as Gt,h as Jt,q as ta,u as na,v as aa,w as oa,P as ia,x as P,y as Yt,S as E,$ as Kt,z as X,A as w,C as Le,E as Ie,G as Ee,H as he,J as Qt,K as la,L as se,M as ra,O as ht,Q as te,T as Dt}from"./index-Bbos8dJc.js";import{p as sa,a as ca}from"./keys-CWTtq0D5.js";import{_ as ua}from"./preload-helper-Cc2_yIPf.js";import{h as s,f as k,w as m}from"./withControl-YhKKGoq_.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function ke(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],l=t[o];n[o]=ot(i)?i:v(()=>e[o]===void 0&&l?l():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(ke,"signalsOf");function f(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return ot(i)?i.value:i},set value(i){const l=o();if(!ot(l))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");l.value=i}}}a(f,"imported");function $(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?sa(t):null;let l=o;return function(r){if(!(o&&!l)&&!(i&&!ca(r,i))){n&&r.preventDefault(),o&&l--;try{const c=(typeof e=="string"?ea(e):e).call(this,r);typeof c?.catch=="function"&&c.catch(u=>Ft(this,u,"handler"))}catch(c){Ft(this,c,"handler")}}}}a($,"listener");const da={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function pa(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a(pa,"extOf");class J{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof J?t:new J(pa(t))}get mimeType(){return da[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}Object.defineProperty(J,"name",{value:"FileExt"});const fa=a((e,t,n=t.initial)=>t.parse(n),"ofValue"),_t=Vt(Gt(J,()=>new Jt({initial:"",kind:"fileext",run:a((e,t)=>e instanceof J?{value:e}:typeof e=="string"?{value:new J(e)}:{issues:[{message:"expected an extension",path:t}]},"run")}),fa)),Ze=new Map;class Y extends aa{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof Y)return t;const n=oa(t,"/").join("/");return Ze.has(n)||Ze.set(n,new Y(n)),Ze.get(n)}static get root(){return Y.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return _t.from(this.name)}child(t){return this.with(t)}}Object.defineProperty(Y,"name",{value:"Path"});const F=Vt(Gt(Y,()=>new Jt({initial:"",kind:"path",run:a((e,t)=>na(e)?{value:Y.from(e)}:{issues:[{message:"expected a path",path:t}]},"run")}),ta)),He=a(e=>(t,n)=>ia.notify(t,{...n,type:e}),"notify"),Be=Object.assign(He("info"),{error:He("error"),info:He("info"),success:He("success")}),ha=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function B(e,t=F.root){let n=e;for(const o of F.from(t))n=await n.getDirectoryHandle(o);return n}a(B,"dirAt");async function ma(e,t=F.root){const n=await B(e,t),o=[];for await(const l of n.values())o.push(l);return(await Promise.all(o.map(async l=>{if(l.kind==="directory")return{kind:"directory",name:l.name};const r=await l.peekFile?.()??await l.getFile();return{kind:"file",lastModified:r.lastModified,name:l.name,size:r.size,type:r.type}}))).sort(ha)}a(ma,"list$1");async function mt(e,t,n){return(await(await B(e,t)).getFileHandle(n)).getFile()}a(mt,"readFile");async function $a(e,t,n){await(await B(e,t)).getDirectoryHandle(n,{create:!0})}a($a,"mkdir");async function va(e,t,n){await(await B(e,t)).removeEntry(n,{recursive:!0})}a(va,"remove$3");async function ga(e,t,n,o,i){const l=await B(e,t),r=i==="directory"?await l.getDirectoryHandle(n):await l.getFileHandle(n);if(typeof r.move=="function")try{await r.move(o);return}catch{}i==="directory"?await vt(r,l,o):await $t(r,l,o),await l.removeEntry(n,{recursive:!0})}a(ga,"rename");async function $t(e,t,n,o){const i=await e.getFile(),r=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(r instanceof WritableStream)){await r.write(await i.arrayBuffer()),await r.close();return}try{await i.stream().pipeTo(r,{signal:o})}catch(c){throw await r.abort?.().catch(()=>{}),c}}a($t,"copyFile");async function vt(e,t,n,o,i=()=>{}){const l=await t.getDirectoryHandle(n,{create:!0});for await(const r of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");r.kind==="directory"?await vt(r,l,r.name,o,i):(await $t(r,l,r.name,o),i())}}a(vt,"copyTree");const{folders:Q}=RAT.app,{perms:ba,ready:wa,sources:Xt}=ke(Q,{perms:null,ready:null,sources:null}),z=v(()=>Xt.value.at(-1)??null),ya=v(()=>z.value?ba.value[z.value.id]??null:null),gt=v(()=>ya.value==="granted"?Q.handleOf(z.value.id):null),Zt=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",ka=a(()=>Q.load(),"load");async function xa(){const e=Xt.value.map(n=>n.id),t=await Q.add();if(t)for(const n of e)await Q.remove(n);return t}a(xa,"grant");async function Ra(){return z.value?Q.reconnect(z.value.id):{granted:!1}}a(Ra,"reconnect$1");async function Ta(){z.value&&await Q.remove(z.value.id)}a(Ta,"forget$2");const Aa=f(()=>z),Oa={folder:E,name:E,path:F},Sa={icon:E,label:E},bt=P("bookmarks",Yt(Oa).create()),it=P("folderTyped",Kt(E,E).create()),en=P("ownFolderTypes",Kt(E,Sa).create()),me=v(()=>String(Aa.value?.id??"")),tn=a(e=>`${me.value}:${e}`,"keyOf"),wt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},nn=v(()=>({...wt,...en.toJSON()})),an=a(e=>it.get(tn(e))??null,"folderTypeIdOf"),on=a(e=>nn.value[an(e)]??null,"folderTypeOf");function lt(e,t){const n=tn(e);t?it.set(n,t):it.delete(n)}a(lt,"setFolderType");function Ea({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return en.set(n,{icon:e,label:t}),n}a(Ea,"addFolderType");function Ha(e,t){const n=e.filter(r=>r.kind==="file"),o={};for(const r of n)o[t(r)]=(o[t(r)]??0)+1;const[i,l]=Object.entries(o).sort((r,c)=>c[1]-r[1])[0]??[];return i in wt&&l/n.length>=.6?i:null}a(Ha,"suggestFolderType");const Fa=a(()=>bt.where({folder:me.value}),"bookmarks"),Da=a(e=>bt.has({folder:me.value,path:e}),"isBookmarked"),za=a((e,t)=>bt.toggle({folder:me.value,name:t,path:e},{folder:me.value,path:e}),"toggleBookmark"),Na=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function Ma(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(Ma,"toBase64");const ja=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),Ca=new Set([101,204,205,304]);async function Pa(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:l}={}){const r=Na();if(!r)return fetch(e,{body:t,headers:n,method:o,signal:i});const c=await r.request({body:await Ma(t),headers:n,method:o,timeout:l,url:e});return new Response(Ca.has(c.status)?null:ja(c.data),{headers:c.headers,status:c.status,statusText:c.statusText})}a(Pa,"request$2");const La=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Ia=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),ln=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),ee=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function rn(e,t="",n=!1){const o=new URL(Ia(t),ln(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(rn,"urlFor");const Ba={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class et extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function ce(e,t,{body:n,headers:o={},isDir:i=!1,method:l="GET"}={}){if(!e)throw new Error("No webdav connection.");let r;try{r=await Pa(rn(e,t,i),{body:n,headers:{Authorization:La(e),...o},method:l})}catch(c){throw globalThis.Capacitor?.isNativePlatform?.()?new et(0,`Connection failed: ${c?.message??c}`):new et(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!r.ok)throw new et(r.status,Ba[r.status]??`${r.status} ${r.statusText}`);return r}a(ce,"request$1");const Ua='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',rt="DAV:",Fe=a((e,t)=>e.getElementsByTagNameNS(rt,t)[0]?.textContent??"","firstText");async function sn(e,t,n){const o=await ce(e,t,{body:Ua,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),l=new URL(ln(e)).pathname,r=a(c=>{const u=decodeURIComponent(new URL(c,e.url).pathname);return(u.startsWith(l)?u.slice(l.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(rt,"response")].map(c=>{const u=r(Fe(c,"href"));return{isDir:c.getElementsByTagNameNS(rt,"collection").length>0,lastModified:Date.parse(Fe(c,"getlastmodified"))||0,mime:Fe(c,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(Fe(c,"getcontentlength"))||0}})}a(sn,"propfind");async function cn(e,t=""){const n=ee(t);return(await sn(e,t,1)).filter(i=>i.path!==n).sort((i,l)=>i.isDir===l.isDir?i.name.localeCompare(l.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(cn,"list");async function tt(e,t){try{return(await sn(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(tt,"stat");const qa=a(async(e,t)=>(await ce(e,t)).blob(),"read"),un=a((e,t,n)=>ce(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Wa=a((e,t)=>ce(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Va=a((e,t,n=!1)=>ce(e,t,{isDir:n,method:"DELETE"}),"remove$2"),Ga=a((e,t,n)=>({Destination:rn(e,t,n),Overwrite:"F"}),"destination"),dn=a((e,t,n,o=!1)=>ce(e,t,{headers:Ga(e,n,o),isDir:o,method:"MOVE"}),"move"),Ja=a(e=>cn(e,""),"test"),nt=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),zt=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class Ue{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof Ue&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class Nt extends Ue{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await qa(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await un(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ne)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ee(t.path,n);await dn(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ne extends Ue{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await cn(this.connection,this.path))yield[t.name,t.isDir?new ne(this.connection,t.path,t.name):new Nt(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=ee(this.path,t),i=await tt(this.connection,o);if(i&&!i.isDir)throw zt(t);if(!i){if(!n)throw nt(t);await Wa(this.connection,o)}return new ne(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=ee(this.path,t),i=await tt(this.connection,o);if(i?.isDir)throw zt(t);if(!i){if(!n)throw nt(t);await un(this.connection,o,new Blob([]))}return new Nt(this.connection,o,t,i)}async removeEntry(t){const n=ee(this.path,t),o=await tt(this.connection,n);if(!o)throw nt(t);await Va(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ne)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ee(t.path,n);await dn(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Ya=a(e=>new ne(e,"",e.name||new URL(e.url).host),"davRoot"),{files:pn}=RAT.app,fn="remotes.json",ze=new Map,Ka={id:E,name:E,password:E,url:E,username:E},xe=Yt(Ka).create(await pn.read(fn,"json").catch(()=>[]));X(()=>pn.write(fn,JSON.stringify(xe)));const hn=v(()=>xe.toArray()),mn=a(e=>xe.one({id:e})??null,"byId");async function Qa({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const l={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await Ja(l),xe.push(l),l}a(Qa,"add$1");function _a(e){xe.drop({id:e}),ze.delete(e)}a(_a,"remove$1");function Xa(e){const t=mn(e);return t?(ze.has(e)||ze.set(e,Ya(t)),ze.get(e)):null}a(Xa,"rootOf");const qe=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Za=["csv","doc","docx","epub","htm","html","json","md","odp","ods","odt","pdf","ppt","pptx","rtf","txt","xls","xlsx","xml"],eo=["7z","bz2","gz","rar","tar","xz","zip","zst"];function ae({name:e,type:t}){const n=_t.from(e),o=t||n.mimeType;return o.startsWith("image/")?"images":o.startsWith("audio/")?"audio":o.startsWith("video/")?"video":o.startsWith("text/")||n.is(...Za)?"documents":n.is(...eo)?"archives":"other"}a(ae,"categoryOf");let j=w(null),oe=w(null);const{files:yt}=RAT.app,to=24,no=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),kt=a(e=>`index/${e.id}.json`,"pathOf");let pe=null;async function $n(e,t,n,o){const i=[],l=[];for await(const r of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");no(r.name)||(r.kind==="directory"?i.push(r):l.push(Promise.resolve(r.peekFile?.()??r.getFile()).then(c=>({lastModified:c.lastModified,name:r.name,path:t,size:c.size,type:c.type}),()=>null)))}for(const r of await Promise.all(l))r&&n.push(r);oe.value={files:n.length};for(const r of i)await $n(r,t.child(r.name),n,o)}a($n,"walk");function ao(e){const t=Object.fromEntries(qe.map(({id:i})=>[i,{count:0,size:0}]));let n=0;for(const i of e){const l=t[ae(i)];l.count++,l.size+=i.size,n+=i.size}const o=e.toSorted((i,l)=>l.lastModified-i.lastModified).slice(0,to);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(ao,"summarize");const Mt=a(e=>({...e,path:F.from(e.path)}),"revive");async function oo(e){const t=e?await yt.read(kt(e),"json").catch(()=>null):null;return j.value=t&&{...t,files:t.files.map(Mt),recent:t.recent.map(Mt)},j.value}a(oo,"restore");async function io(e,t){pe?.abort();const n=new AbortController;pe=n;const o=[];oe.value={files:0};try{return await $n(e,F.root,o,n.signal),j.value=ao(o),await yt.write(kt(t),JSON.stringify(j.value)),j.value}catch(i){if(i?.name!=="AbortError")throw i;return null}finally{pe===n&&(pe=null,oe.value=null)}}a(io,"scan");const vn=a(()=>pe?.abort(),"stop$1");async function lo(e){vn(),j.value=null,e&&await yt.remove(kt(e)).catch(()=>{})}a(lo,"forget$1");function ro(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const i of j.value?.files??[])if(i.name.toLowerCase().includes(n)&&o.push(i),o.length>=t)break;return o}a(ro,"search");const so=50,We=new Le,Ne=P("ended",new Le),gn=v(()=>We.toArray()),co=v(()=>Ne.toArray()),uo=v(()=>We.has({state:"running"})),bn=new WeakMap,wn=new Map,po=a(e=>e?.name==="AbortError","isAbort"),fo=a(e=>(wn.get(e)??Promise.resolve()).catch(()=>{}),"after");function at(e,t){Object.assign(e,t,{endedAt:Date.now()}),We.remove(e),Ne.unshift(e.toJSON()),Ne.splice(so)}a(at,"finish");function Ve({icon:e="lucide:loader",label:t,lane:n="default"},o){const i=new AbortController,{signal:l}=i,r=new Ie({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});bn.set(r,i),We.push(r);const c=a((d,g)=>{r.progress={done:d,total:g}},"progress"),u=fo(n).then(async()=>{if(l.aborted)return at(r,{state:"cancelled"}),null;Object.assign(r,{startedAt:Date.now(),state:"running"});try{const d=await o({progress:c,signal:l});return at(r,{state:l.aborted?"cancelled":"done"}),d}catch(d){throw at(r,po(d)?{state:"cancelled"}:{error:String(d?.message??d),state:"failed"}),d}});return wn.set(n,u),u}a(Ve,"run");const ho=a(e=>bn.get(e)?.abort(),"cancel"),mo=a(()=>Ne.clear(),"clearHistory"),{dialogs:$o}=RAT.app,L=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),yn=a(()=>!!L(),"available$1"),kn=["https","http"],st=53317;let $e=w(null),ct=w([]),xn=w(null),I=w([]),ve=P("targets",[]),ut=P("folderName","");function vo(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const l=new URL(n.replace(/^filesync:\/\//,"http://")),r=l.searchParams.get("protocol");return{fingerprint:l.searchParams.get("fingerprint")??"",host:l.hostname,port:Number(l.port)||st,protocol:kn.includes(r)?r:t}}catch{return null}const[o,i]=n.split(":");return{fingerprint:"",host:o,port:Number(i)||st,protocol:t}}a(vo,"parseTarget");const Me=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),je=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),go=a(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??st,protocol:e.protocol??"https"}),"targetOf");function bo(e){const t=ve.value.filter(n=>!je(n,e));ve.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8)}a(bo,"remember");function wo(e){ve.value=ve.value.filter(t=>!je(t,e))}a(wo,"forget");let jt=!1;async function Rn(){const e=L();e&&(jt||(jt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;ct.value=[t,...ct.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),xn.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await xt())}a(Rn,"start");const yo=a(()=>L()?.stopDiscovery().catch(()=>{}),"stop");function Tn(e){const t=new Set(I.value.map(n=>n.uri));I.value=[...I.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(Tn,"add");async function ko(){const{files:e=[]}=await L().pickFiles();Tn(e)}a(ko,"pickFiles");async function xo(e,t,n){const o=await(await B(e,t)).getFileHandle(n.name),i=o._uri??(o.path?`file://${o.path}`:null);if(!i)throw new Error("only files of the folder on this device can be sent");Tn([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:i}])}a(xo,"addEntry");const Ro=a(e=>{I.value=I.value.filter(t=>t.uri!==e)},"remove"),To=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Ao(e,t=I.value,n=""){const o=L();if(!o||!e||!t.length)return Promise.resolve(null);const i=t.length===1?t[0].name:`${t.length} files`;return Ve({icon:"lucide:send",label:`Send ${i} to ${Me(e)}`,lane:"send"},async({progress:l})=>{const r=await o.addListener("progress",c=>l(c.sent,c.total));try{const c=a(u=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await c(n)}catch(u){if(!To(u))throw u;const d=await $o.prompt({message:`${Me(e)} wants a pin`,ok:"Send",title:"Pin"});if(!d)throw new Error("no pin given");await c(d)}bo(e),I.value=I.value.filter(u=>!t.includes(u))}finally{r.remove()}})}a(Ao,"send");async function xt(){const e=await L()?.getAutoSyncState().catch(()=>null)??null;$e.value=e&&{...e,name:e.tree?ut.value:""}}a(xt,"refreshAutoSync");async function Oo(){const{name:e,uri:t}=await L().pickFolder();t&&(ut.value=e??"",$e.value={...$e.value,name:ut.value,tree:t})}a(Oo,"pickSyncFolder");async function So(e,{pin:t="",ssid:n=""}={}){const o=$e.value?.tree;if(!o)throw new Error("pick a folder first");await L().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await xt()}a(So,"startAutoSync");async function Eo(){await L().stopAutoSync(),await xt()}a(Eo,"stopAutoSync");const Ho=a(()=>L()?.syncNow(),"syncNow");let M=w(null);function Fo(e,t,n,o){(M.value?.mode!==e||M.value.placed)&&(M.value=new Ie({items:new Le,mode:e,placed:!1})),M.value.items.drop({name:t.name,path:n}),M.value.items.push({kind:t.kind,name:t.name,path:n,root:o})}a(Fo,"pick$1");const Do=a(()=>{M.value&&(M.value.placed=!0)},"placed"),An=a(()=>{M.value=null},"clear");async function Ct(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(Ct,"exists");async function zo(e,t,n){if(!await Ct(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,i=o>0?t.slice(0,o):t,l=o>0?t.slice(o):"";for(let r=2;;r++){const c=`${i} (${r})${l}`;if(!await Ct(e,c))return c}}a(zo,"freeName");async function On(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await On(n);return t}a(On,"countFiles");async function No(e,t){const n=await B(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}a(No,"handleOf");async function Mo(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}a(Mo,"moved");async function jo(e,t,n,o,{onProgress:i=a(()=>{},"onProgress"),signal:l}={}){const r=[...t],c=r.find(y=>y.kind==="directory"&&o.startsWith(y.path.child(y.name)));if(c)throw new Error(`“${c.name}” can not go into itself`);const u=await B(e,o),d=await Promise.all(r.map(y=>No(y.root??e,y))),g=await Promise.all(d.map(On)),b=g.reduce((y,A)=>y+A,0);let T=0;const x=a((y=1)=>i(T+=y,b),"report");i(0,b);for(const[y,A]of r.entries()){l?.throwIfAborted();const H=d[y],V=g[y];if(n==="move"&&A.path===o){x(V);continue}const U=await zo(u,A.name,A.kind);if(n==="move"&&await Mo(H,u,U)){x(V);continue}A.kind==="directory"?await vt(H,u,U,l,x):(await $t(H,u,U,l),x()),n==="move"&&await(await B(A.root??e,A.path)).removeEntry(A.name,{recursive:!0})}}a(jo,"transfer");const Ge=f(()=>z),ge=f(()=>gt),Co=f(()=>j),Pt=f(()=>oe),Po=f(()=>M),{dialogs:_,router:ie}=RAT.app,Lo={copy:"lucide:copy",move:"lucide:scissors"},Io=["pattern-bg","pattern-tile"],Bo={open:Ee("auto","single","double"),"pattern-bg":E,"pattern-tile":E,searchbar:Ee("bottom","top"),tabbar:Ee("bottom","top"),viewmode:Ee("list","grid")},q=P("settings",Ie(Bo).create());X(()=>{const e=document.documentElement;for(const t of Io){const n=q[t];e.toggleAttribute(`data-${t}`,!!n),n&&ua(async()=>{const{patternStyle:o}=await import("./index-Bbos8dJc.js").then(i=>i.V);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||he(()=>q[t])!==n))for(const[i,l]of Object.entries(o))e.style.setProperty(i,l)})}});X(()=>{const{dataset:e}=document.documentElement;e.searchbar=q.searchbar,e.tabbar=q.tabbar});const Uo=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Sn=a(()=>q.open==="single"||q.open==="auto"&&Uo(),"opensOnTap");let En=w(null),be=w([]),Je=w(null),Rt=w(""),dt=w(!1),Hn=w(""),N=w(null),Re=w(null),Fn=w(null);const Dn=Ie({path:F,"?source":E}),Tt=a((e={})=>Dn.create({path:e.path??F.root,source:e.source??null}),"tabOf"),D=P("tabs",Le(Dn).create([Tt()]));let K=P("tabIndex",0);const W=v(()=>D.at(K.value)??D.at(0)),S=v(()=>W.value.path),ue=v(()=>W.value.source),zn=new WeakMap,Nn=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function le(e,t){W.value.path=e,t!==void 0&&(W.value.source=t),N.value=null,Rt.value=""}a(le,"goTo");function Mn(e=S.value,t=ue.value){D.push(Tt({path:e,source:t})),K.value=D.length-1,N.value=null}a(Mn,"openTab");function qo(e){if(D.length===1){le(F.root);return}const t=D.indexOf(e);Qt(()=>{D.remove(e),(t<K.value||K.value===D.length)&&K.value--})}a(qo,"closeTab");function Wo(e){zn.set(W.value,Nn()?.scrollTop??0),K.value=D.indexOf(e),N.value=null}a(Wo,"switchTab");function At(e=[]){const t=W.value;Qt(()=>{D.replace(e.length?e:[Tt()]),K.value=Math.max(0,D.indexOf(t))})}a(At,"resetTabs");const Lt=a(e=>e.path.name||Ye(e.source),"tabName"),Te=a(e=>e?Xa(e):ge.value,"rootOfSource"),Ye=a(e=>e?mn(e)?.name??"remote":Ge.value?.name??"folder","sourceName"),Ke=a(()=>Te(ue.value),"rootHandle"),we=a(()=>Ye(ue.value),"folderName"),Ae=a(e=>e.source!==void 0?e.source:e.path?null:ue.value,"sourceOf");let jn=w(0),De=0;const Cn=a(()=>{jn.value++},"refresh");X(()=>{const e=Ke(),t=S.value,n=++De;jn.value,be.value=[],dt.value=!!e,e&&ma(e,t).then(o=>{n===De&&(be.value=o,requestAnimationFrame(()=>{const i=Nn();i&&(i.scrollTop=zn.get(he(()=>W.value))??0)}))}).catch(o=>{n===De&&Be.error(o)}).finally(()=>{n===De&&(dt.value=!1)})});let pt=null;X(()=>{const e=ge.value,t=Ge.value;!e||!t||pt===t||(pt=t,oo(t).then(()=>Pn(e,t)))});function Pn(e,t){return Ve({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>vn());const i=X(()=>{Pt.value&&n(Pt.value.files,null)});return io(e,t).finally(i)}).catch(n=>console.warn("[files] scan failed",n))}a(Pn,"indexFolder");const Vo=a(()=>{ge.value&&Pn(ge.value,Ge.value)},"rescan"),Go=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),Jo=v(()=>Go(be.value,Rt.value)),ft=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ln=a((e,t)=>e.kind==="directory"?t&&on(t.child(e.name))?.icon||"lucide:folder":qe.find(n=>n.id===ae(e))?.icon??"lucide:file","iconOf");function re(e,t=S.value){if(e.kind==="directory")return le(t.child(e.name)),ie.go("/library");Je.value={...e,kind:"file",path:e.path??t,source:Ae(e)},ie.go("/preview")}a(re,"open");function In(e){le(e.path??F.root,Ae(e)),ie.go("/library")}a(In,"showInFolder");function Yo(e){if(Sn())return re(e);N.value=e}a(Yo,"onEntryClick");function Bn(e){Re.value=null,N.value=e,RAT.app.toggle("context",!0)}a(Bn,"about");function Ko(){N.value=null,Re.value="tasks",RAT.app.toggle("context",!0)}a(Ko,"openTasks");async function Qe(){const e=Ke();if(!e)throw new Error("No folder open");if((e.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):"granted")!=="granted")throw new Error("No permission to change this folder");return e}a(Qe,"writable");async function Ot(e,t,n){await Ve({...e,lane:"write"},n),t===S.value&&Cn()}a(Ot,"writeTask");async function Un(){const e=await _.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await Qe(),n=S.value;await Ot({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>$a(t,n,e))}a(Un,"newFolder");async function Qo(e){const t=await _.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await Qe(),o=e.path??S.value;N.value=null,await Ot({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>ga(n,o,e.name,t,e.kind))}a(Qo,"renameEntry");async function _o(e){if(!await _.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await Qe(),n=e.path??S.value;N.value=null,RAT.app.toggle("context",!1),await Ot({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>va(t,n,e.name))}a(_o,"deleteEntry");function It(e,t){Fo(e,t,t.path??S.value,Te(Ae(t))),RAT.app.toggle("context",!1)}a(It,"pick");async function Xo(){const e=Po.value;if(!e)return;const t=await Qe(),n=e.items.toArray(),o=S.value,i=n.length===1?n[0].name:`${n.length} items`,l=e.mode==="move"?"move":"copy",r=Lo[l];e.mode==="move"?An():Do();try{await Ve({icon:r,label:`${l} ${i} to /${o}`,lane:"write"},({progress:c,signal:u})=>jo(t,n,e.mode,o,{onProgress:c,signal:u}))}finally{o===S.value&&Cn()}}a(Xo,"paste");async function qn(e){const t=await mt(Te(Ae(e)),e.path??S.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(qn,"download");async function Ce(){if(!Zt)throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");await xa()&&(At(),ie.go("/"))}a(Ce,"chooseFolder");async function Zo(){const{granted:e}=await Ra();e||await Ce()}a(Zo,"reconnect");async function ei(){await _.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:we()})&&(await lo(Ge.value),pt=null,await Ta(),At())}a(ei,"closeFolder");function Wn(e){Mn(F.root,e),ie.go("/library")}a(Wn,"openRemote");function ti(){N.value=null,Re.value="remotes",RAT.app.toggle("context",!0)}a(ti,"manageRemotes");async function ni(e){await _.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name})&&(await _a(e.id),At(D.filter(t=>t.source!==e.id).toArray()))}a(ni,"forgetRemote");async function ai(e){await xo(ge.value,e.path??S.value,e),RAT.app.toggle("context",!1),ie.go("/sync")}a(ai,"sendEntry");async function oi(e){const t=await _.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await _.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";lt(e,Ea({icon:n,label:t}))}a(oi,"newFolderType");function ii(e){const t=e.filter(i=>i.kind==="file"),n={};for(const i of t)n[ae(i)]=(n[ae(i)]??0)+1;const o=Object.entries(n).sort((i,l)=>l[1]-i[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?qe.find(i=>i.id===o[0])?.label:null,size:t.reduce((i,l)=>i+l.size,0)}}a(ii,"factsOf");const li=v(()=>ii(be.value)),Bt=qe.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),ri=a((e,t)=>t.lastModified-e.lastModified,"newest"),si=v(()=>(Co.value?.files??[]).filter(e=>ae(e)===En.value).toSorted(ri).slice(0,500)),ci=v(()=>ro(Hn.value));let fe=null;const Oe=la(!1),Vn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ui=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Vn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),fe=e,Oe.value=!0});addEventListener("appinstalled",()=>{fe=null,Oe.value=!1});async function di(){if(!fe)return!1;const e=fe;return fe=null,Oe.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(di,"install");function pi(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),Be(`${e} can be installed: see the settings`))},"show");Oe.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(pi,"hint");const fi=864e5,hi={day:"numeric",month:"short",year:"numeric"},St=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Pe=a(e=>{const t=St(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,hi)},"date"),mi=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/fi;return n<0?Pe(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Pe(t)},"ago"),$i=a(e=>{const t=St(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Pe(t)},"since"),vi=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${o}:${i}`:`${o}:${i}`},"duration"),gi=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),O={ago:mi,bytes:gi,date:Pe,duration:vi,since:$i};function R(e,t){return bi.call({props:e},e,t)}a(R,"ActionRatHtml");function bi(e,t){return s`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${$(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(bi,"$$ActionRatHtml");function Gn(e,t){return wi.call({props:e},e,t)}a(Gn,"BookmarkActionRatHtml");function wi(e,t){const{path:n}=ke(e,{path:null}),o=v(()=>Da(n.value));return s`<${R} ...${{get icon(){return o.value?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return o.value?"remove bookmark":"bookmark"},onclick:a(()=>za(n.value,n.value.name),"onclick")}} />`}a(wi,"$$BookmarkActionRatHtml");function _e(e,t){return yi.call({props:e},e,t)}a(_e,"FactsRatHtml");function yi(e,t){const n=a(i=>i==null||i===""||i===!1,"isEmpty"),o=v(()=>Object.entries(e.rows??{}).filter(([,i])=>!n(i)));return s`
    <dl.facts>
      ${k(()=>o.value,i=>i,([i,l])=>s`<dt>${()=>i}</dt><dd>${()=>l}</dd>`)}
    </dl>
  `}a(yi,"$$FactsRatHtml");function ki(e,t){return xi.call({props:e},e,t)}a(ki,"EntryDetailsRatHtml");function xi(e,t){const n=f(()=>S),{entry:o}=ke(e,{entry:null}),i=v(()=>o.value.path??n.value),l=v(()=>o.value.kind==="directory"),r=v(()=>!Ae(o.value)),c=a(u=>u.kind==="directory"?"folder":u.type||"file","kindOf");return s`
    <h2>${()=>o.value.name}</h2>
    <${_e} ...${{get rows(){return{name:o.value.name,kind:c(o.value),size:l.value?null:O.bytes(o.value.size),modified:o.value.lastModified&&O.date(o.value.lastModified),in:"/"+i.value}}}} />
    <div-x.actions>
      <${R} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>re(o.value,i.value),"onclick")}} />
      ${m(()=>o.value.path,()=>s`<${R} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>In(o.value),"onclick")}} />`)}
      ${m(()=>!l.value,()=>s`<${R} icon="lucide:download" label="download" ...${{onclick:a(()=>qn(o.value),"onclick")}} />`)}
      ${m(()=>!l.value&&r.value&&yn(),()=>s`<${R} icon="lucide:send" label="send" ...${{onclick:a(()=>ai(o.value),"onclick")}} />`)}
      ${m(()=>l.value&&r.value,()=>s`<${Gn} ...${{get path(){return i.value.child(o.value.name)}}} />`)}
      <${R} icon="lucide:copy" label="copy" ...${{onclick:a(()=>It("copy",o.value),"onclick")}} />
      <${R} icon="lucide:scissors" label="move" ...${{onclick:a(()=>It("move",o.value),"onclick")}} />
      <${R} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>Qo(o.value),"onclick")}} />
      <${R} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>_o(o.value),"onclick")}} />
    </div-x>
  `}a(xi,"$$EntryDetailsRatHtml");function Ri(e,t){return Ti.call({props:e},e,t)}a(Ri,"FileDetailsRatHtml");function Ti(e,t){const n=f(()=>Je),o=f(()=>Fn);return s`
    <h2>Details</h2>
    <${_e} ...${{get rows(){return{name:n.value.name,type:n.value.type||"unknown",size:O.bytes(n.value.size),dimensions:o.value&&`${o.value.width} × ${o.value.height}`,modified:O.date(n.value.lastModified),in:"/"+n.value.path}}}} />
    <div-x.actions>
      <${R} icon="lucide:download" label="download" ...${{onclick:a(()=>qn(n.value),"onclick")}} />
      <${R} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>In(n.value),"onclick")}} />
    </div-x>
  `}a(Ti,"$$FileDetailsRatHtml");function Ai(e,t){return Oi.call({props:e},e,t)}a(Ai,"FolderDetailsRatHtml");function Oi(e,t){const n=f(()=>be),o=f(()=>li),i=f(()=>S),l=f(()=>ue),r=f(()=>nn),c=v(()=>i.value.length>0&&!l.value),u=v(()=>c.value?an(i.value):null),d=v(()=>c.value&&!u.value?Ha(n.value,ae):null),g=a(b=>lt(i.value,u.value===b?null:b),"toggleFolderType");return s`
    <h2>This folder</h2>
    <${_e} ...${{get rows(){return{folder:i.value.name||we(),contains:`${o.value.folders} folders, ${o.value.files} files`,size:O.bytes(o.value.size),mostly:o.value.mostly}}}} />
    <div-x.actions>
      <${R} icon="lucide:folder-plus" label="new folder" ...${{onclick:Un}} />
      ${m(()=>c.value,()=>s`<${Gn} ...${{get path(){return i.value}}} />`)}
    </div-x>
    ${m(()=>c.value,()=>s`
        <h3>Foldertype</h3>
        ${m(()=>d.value,()=>s`<p.hint>Looks like ${()=>wt[d.value].label}. <button.link type="button" onclick=${$(()=>lt(i.value,d.value))}>Make it one</button></p>`)}
        <div-x.actions>
          ${k(()=>Object.entries(r.value),b=>b,([b,T])=>s`<button.action type="button" aria-pressed=${()=>se(u.value===b)} onclick=${$(()=>g(b))}><svg-icon icon=${()=>T.icon} /> ${()=>T.label}</button>`)}
          <${R} icon="lucide:plus" label="new foldertype" ...${{onclick:a(()=>oi(i.value),"onclick")}} />
        </div-x>
      `)}
  `}a(Oi,"$$FolderDetailsRatHtml");function Si(e,t){return Ei.call({props:e},e,t)}a(Si,"RemoteManagerRatHtml");function Ei(e,t){const n=f(()=>hn);let o=w(null),i=w(!1);async function l(r){r.preventDefault();const c=r.target;i.value=!0,o.value=null;try{const u=await Qa(Object.fromEntries(new FormData(c)));c.reset(),Wn(u.id),RAT.app.toggle("context",!1)}catch(u){o.value=u.message??String(u)}finally{i.value=!1}}return a(l,"add"),s`
    ${m(()=>n.value.length,()=>s`
        <ul.tasks>
          ${k(()=>n.value,r=>r,r=>s`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+r.name} onclick=${$(()=>ni(r))} />
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
  `}a(Ei,"$$RemoteManagerRatHtml");function Jn(e,t){return Hi.call({props:e},e,t)}a(Jn,"StatusRatHtml");function Hi(e,t){const n=f(()=>j),o=f(()=>oe);return s`
    ${m(()=>o.value,()=>s`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>o.value.files} files</p>`,()=>m(()=>n.value,()=>s`<p.status>${()=>n.value.total} files · ${()=>O.bytes(n.value.size)} · read ${()=>O.date(n.value.scannedAt)}</p>`))}
  `}a(Hi,"$$StatusRatHtml");function Fi(e,t){return Di.call({props:e},e,t)}a(Fi,"RootDetailsRatHtml");function Di(e,t){const n=f(()=>gt),o=f(()=>oe);return s`
    <h2>${()=>Ye(null)}</h2>
    <${Jn} />
    <div-x.actions><${R} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!n.value||!!o.value},onclick:Vo}} /></div-x>
  `}a(Di,"$$RootDetailsRatHtml");function zi(e,t){return Ni.call({props:e},e,t)}a(zi,"TaskListRatHtml");function Ni(e,t){const n=f(()=>co),o=f(()=>gn),i={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},l=a(d=>d.state==="queued"||d.state==="running","isOpen");function r({progress:d,state:g}){return g!=="running"||d?.done==null?i[g]:d.total?`${Math.round(d.done/d.total*100)}%`:String(d.done)}a(r,"stateOf");function c(d){return d.error?d.error:d.endedAt?`${r(d)} · ${O.date(d.endedAt)}`:r(d)}a(c,"noteOf");function u(d){return s`
      <li class=${()=>`task ${d.state}`}>
        <svg-icon icon=${()=>d.icon} />
        <span.text>
          <span.name>${()=>d.label}</span>
          <small>${()=>c(d)}</small>
          ${m(()=>d.state==="running"&&d.progress?.total,()=>s`<progress max=${()=>d.progress.total} value=${()=>d.progress.done} />`)}
        </span>
        ${m(()=>l(d),()=>s`<btn-icon icon="lucide:x" label=${()=>"cancel "+d.label} onclick=${$(()=>ho(d))} />`)}
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
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${$(mo)} />
        </div-x>
        <ul.tasks>
          ${k(()=>n.value,d=>d,d=>s`${()=>u(d)}`)}
        </ul>
      `)}
  `}a(Ni,"$$TaskListRatHtml");function Mi(e,t){return ji.call({props:e},e,t)}a(Mi,"ContextRatHtml");function ji(e,t){const n=f(()=>Je),o=f(()=>N),i=f(()=>Re),{$path:l}=ke(RAT.app.router,{$path:null});return s`
    ${m(()=>i.value==="tasks",()=>s`<h2>Tasks</h2><${zi} />`,()=>m(()=>i.value==="remotes",()=>s`<h2>Remote</h2><${Si} />`,()=>m(()=>o.value,()=>s`<${ki} ...${{get entry(){return o.value}}} />`,()=>m(()=>l.value==="/preview"&&n.value,()=>s`<${Ri} />`,()=>m(()=>l.value==="/library"&&Ke(),()=>s`<${Ai} />`,()=>s`<${Fi} />`)))))}
  `}a(ji,"$$ContextRatHtml");function C(e,t){return Ci.call({props:e},e,t)}a(C,"BarRatHtml");function Ci(e,t){return s`
    <header.bar>
      ${m(()=>e.back,()=>s`<btn-icon icon="lucide:arrow-left" label="back" onclick=${$(e.back)} />`,()=>s`<btn-icon icon="lucide:menu" label="menu" onclick=${$(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${$(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Ci,"$$BarRatHtml");function Et(e,t){return Pi.call({props:e},e,t)}a(Et,"ThumbRatHtml");function Pi(e,t){const n=f(()=>z),o=e.entry,i=e.at??F.root,l=e.from??null,r=RAT.app.thumbnails,c=ft(o)?d(o):null;let u=w(c?r.peekFile(c):null);function d({lastModified:b,name:T,size:x}){return`${l??he(()=>n.value)?.id}/${i}/${T}:${x}:${b}`}a(d,"idOf");function g(b){if(!c||u.value)return;let T=!0;const x=new IntersectionObserver(([y])=>{y.isIntersecting&&(x.disconnect(),r.requestFile(c,()=>mt(Te(l),i,o.name)).then(A=>{T&&A&&(u.value=A)}))},{rootMargin:"200px"});return x.observe(b),()=>{T=!1,x.disconnect()}}return a(g,"watch"),s`
    <span.thumb ref=${ra(g)}>
      ${m(()=>u.value,()=>s`<img src=${()=>u.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>Ln(o,l?null:e.at)} />`)}
    </span>
  `}a(Pi,"$$ThumbRatHtml");function Ut(e,t){return Li.call({props:e},e,t)}a(Ut,"FileRowRatHtml");function Li(e,t){const n=e.entry,o=`/${n.path} · ${O.bytes(n.size)}`;return s`
    <li.row>
      <button.entry type="button" onclick=${$(()=>re(n))}>
        <${Et} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>o}</small></span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${$(()=>Bn(n))} />
    </li>
  `}a(Li,"$$FileRowRatHtml");function Yn(e,t){return Ii.call({props:e},e,t)}a(Yn,"SearchbarRatHtml");function Ii(e,t){const n=f(()=>uo),o=f(()=>gn),i=v(()=>o.value.length),l=v(()=>i.value?`${i.value} tasks`:"tasks");return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${$(a(c=>e.onsearch?.(c.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>n.value} aria-label=${()=>se(l.value)} title=${()=>l.value} onclick=${$(Ko)}>
        <svg-icon icon=${()=>n.value?"lucide:loader":"lucide:list-checks"} />
        ${m(()=>i.value,()=>s`<span.badge>${()=>i.value}</span>`)}
      </button>
    </div>
  `}a(Ii,"$$SearchbarRatHtml");function Z(e,t){return Bi.call({props:e},e,t)}a(Z,"TileRatHtml");function Bi(e,t){return s`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${$(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}a(Bi,"$$TileRatHtml");const Ui=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function qi(e,t){return Wi.call({props:e},e,t)}a(qi,"LoadingRatHtml");function Wi(e,t){return ht("1tn1js8",Ui),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Wi,"$$LoadingRatHtml");function Kn(e,t){return Vi.call({props:e},e,t)}a(Kn,"WelcomeRatHtml");function Vi(e,t){const n=f(()=>z),o=f(()=>wa);return s`
    ${m(()=>!Zt,()=>s`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>m(()=>!o.value,()=>s`<${qi} />`,()=>m(()=>!n.value,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${$(Ce)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>we()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${$(Zo)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Vi,"$$WelcomeRatHtml");function Gi(e,t){return Ji.call({props:e},e,t)}a(Gi,"DashboardRatHtml");function Ji(e,t){const n=f(()=>En),o=f(()=>si),i=f(()=>ci),l=f(()=>Hn),r=f(()=>hn),c=f(()=>gt),u=f(()=>j),d=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}],g=v(()=>l.value.trim()!==""),b=v(()=>Fa()),T=v(()=>Bt.find(p=>p.id===n.value)?.label??n.value),x=a(()=>Ye(null),"folderName"),y=a(p=>l.value=p,"search"),A=a(p=>u.value?.categories?.[p]??null,"statsOf");function H(p){return p?p>=100?"Found 100+":`Found ${p}`:"Nothing found"}a(H,"foundOf");function V(p){try{return new URL(p).host}catch{return p}}a(V,"hostOf");function U(p){le(p,null),RAT.app.router.go("/library")}a(U,"library");function Se(p){return p?`${p.count} · ${O.bytes(p.size)}`:"…"}return a(Se,"noteOf"),s`
    <${C} title="Files" />
    <div.scroll>
      ${m(()=>!c.value,()=>s`<${Kn} />`,()=>m(()=>g.value,()=>s`
            <section>
              <h2>${()=>H(i.value.length)}</h2>
              <ul.rows>
                ${k(()=>i.value,p=>p,p=>s`<${Ut} ...${{get entry(){return p}}} />`)}
              </ul>
            </section>
          `,()=>m(()=>n.value,()=>s`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${$(()=>n.value=null)} />
                  <h2>${()=>T.value}</h2>
                </div-x>
                <ul.rows>
                  ${k(()=>o.value,p=>p,p=>s`<${Ut} ...${{get entry(){return p}}} />`)}
                </ul>
              </section>
            `,()=>s`
              ${m(()=>u.value?.recent.length,()=>s`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${k(()=>u.value.recent,p=>p,p=>s`
                          <button.card type="button" onclick=${$(()=>re(p))}>
                            <${Et} ...${{get entry(){return p},get at(){return p.path}}} />
                            <span.name>${()=>p.name}</span>
                            <small>${()=>O.date(p.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${m(()=>b.value.length,()=>s`
                    <ul.tiles>
                      ${k(()=>b.value,p=>p,p=>s`<${Z} ...${{get icon(){return on(p.path)?.icon??"lucide:bookmark"},get name(){return p.name},get note(){return"/"+p.path},onclick:a(()=>U(p.path),"onclick")}} />`)}
                    </ul>
                  `,()=>s`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${k(()=>Bt,p=>p,({icon:p,id:de,label:Xe})=>s`<${Z} ...${{get icon(){return p},get name(){return Xe},get note(){return Se(A(de))},get disabled(){return!A(de)?.count},onclick:a(()=>n.value=de,"onclick")}} />`)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles><${Z} icon="lucide:folder-open" ...${{get name(){return x()},get note(){return u.value?O.bytes(u.value.size):"the granted folder"},onclick:a(()=>U(F.root),"onclick")}} /></ul>
                <${Jn} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${k(()=>r.value,p=>p,p=>s`<${Z} icon="lucide:cloud" ...${{get name(){return p.name},get note(){return V(p.url)},onclick:a(()=>Wn(p.id),"onclick")}} />`)}
                  <${Z} icon="lucide:cloud-cog" name="WebDAV, Nextcloud" ...${{get note(){return r.value.length?"add or remove":"connect a server"},onclick:ti}} />
                  ${k(()=>d,p=>p,p=>s`<${Z} ...${{get icon(){return p.icon},get name(){return p.label},get note(){return"soon · "+p.note},get title(){return p.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${m(()=>c.value,()=>s`<${Yn} ...${{get placeholder(){return"Search in "+x()},onsearch:y}} />`)}
  `}a(Ji,"$$DashboardRatHtml");function Yi(e,t){return Ki.call({props:e},e,t)}a(Yi,"EntryRatHtml");function Ki(e,t){const n=f(()=>S),o=f(()=>N),i=f(()=>ue),l=e.entry,r=he(()=>n.value),c=he(()=>i.value),u=l.kind==="file"?`${O.date(l.lastModified)} · ${O.bytes(l.size)}`:"folder",d=v(()=>o.value?.name===l.name&&!o.value?.path);function g(b){b.key!=="Enter"||Sn()||(b.preventDefault(),re(l))}return a(g,"onkeydown"),s`
    <data-item>
      <div.row class:selected=${()=>d.value}>
        <button.entry type="button" aria-pressed=${()=>se(d.value)} onclick=${$(()=>Yo(l))} ondblclick=${$(()=>re(l))} onkeydown=${$(g)}>
          <${Et} ...${{get entry(){return l},get at(){return r},get from(){return c}}} />
          <span.text><span.name>${()=>l.name}</span><small>${()=>u}</small></span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${$(()=>Bn(l))} />
      </div>
    </data-item>
  `}a(Ki,"$$EntryRatHtml");function Qi(e,t){return _i.call({props:e},e,t)}a(Qi,"PasteBarRatHtml");function _i(e,t){const n=f(()=>M),o=v(()=>n.value?.mode==="move"),i=a(l=>l.length===1?l.at(0).name:`${l.length} items`,"describe");return s`
    ${m(()=>n.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>o.value?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>i(n.value.items)}</span>
            <small>${()=>o.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${$(Xo)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the pickboard" onclick=${$(An)} />
        </div-x>
      `)}
  `}a(_i,"$$PasteBarRatHtml");function Xi(e,t){return Zi.call({props:e},e,t)}a(Xi,"TabsRatHtml");function Zi(e,t){const n=f(()=>W),o=f(()=>D);return s`
    <div-x.tabs role="tablist" scrollable>
      ${k(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button type="button" role="tab" aria-selected=${()=>se(i===n.value)} onclick=${$(()=>Wo(i))}>${()=>Lt(i)}</button>
            ${m(()=>o.value.length>1,()=>s`<btn-icon icon="lucide:x" label=${()=>"close "+Lt(i)} onclick=${$(()=>qo(i))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${$(()=>Mn())} />
    </div-x>
  `}a(Zi,"$$TabsRatHtml");function el(e,t){return tl.call({props:e},e,t)}a(el,"LibraryRatHtml");function tl(e,t){const n=f(()=>Rt),o=f(()=>dt),i=f(()=>S),l=f(()=>q),r=f(()=>Jo),c=v(()=>!!Ke()),u=v(()=>l.value.viewmode==="grid"),d=a(x=>le(F.from(x.detail.path)),"crumb"),g=a(x=>n.value=x,"search"),b=a(()=>l.value.viewmode=u.value?"list":"grid","toggleView");function T(){i.value.parent?le(i.value.parent):RAT.app.router.go("/")}return a(T,"up"),s`
    ${m(()=>!c.value,()=>s`<${C} title="Library" /><div.scroll><${Kn} /></div>`,()=>s`
        <${C} ...${{get title(){return i.value.name||we()},get back(){return T}}}><btn-icon icon=${()=>u.value?"lucide:list":"lucide:layout-grid"} label=${()=>u.value?"show as list":"show as grid"} onclick=${$(b)} /></${C}>
        <nav-crumbs root=${()=>we()} path=${()=>"/"+i.value} onnav-crumbs=${$(d)} />
        <div.pane>
          <div.listing>
            ${m(()=>o.value,()=>s`<svg-icon icon="lucide:loader" />`,()=>m(()=>r.value.length,()=>s`
                  <data-index viewmode=${()=>l.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>r.value,x=>x,x=>s`<${Yi} ...${{get entry(){return x}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>n.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${$(Un)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${Qi} />
        <${Yn} placeholder="Filter this folder" ...${{get value(){return n.value},onsearch:g}} />
        <${Xi} />
      `)}
  `}a(tl,"$$LibraryRatHtml");const nl=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function al(e,t){return ol.call({props:e},e,t)}a(al,"BrandRatHtml");function ol(e,t){return ht("1npwj96",nl),s`
    <div.brand data-rat="1npwj96">
      ${m(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(ol,"$$BrandRatHtml");function il(e,t){return ll.call({props:e},e,t)}a(il,"MenuRatHtml");function ll(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:i}=ke(RAT.app.router,{$path:null});function l(r){RAT.app.router.go(r);const c=RAT.app.area("menu");c?.isOverlay&&c.hide()}return a(l,"go"),s`
    <nav.menu>
      <${al} name="Files" icon="./app.svg" />
      ${k(()=>n,r=>r,r=>s`<button type="button" aria-current=${()=>se(i.value===r.route?"page":null)} onclick=${$(()=>l(r.route))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
      <hr />
      ${k(()=>o,r=>r,r=>s`<button type="button" disabled><svg-icon icon=${()=>r.icon} /> ${()=>r.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${$(()=>RAT.app.toggle("config",!0))}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(ll,"$$MenuRatHtml");function rl(e,t){return sl.call({props:e},e,t)}a(rl,"PreferencesRatHtml");function sl(e,t){const n=f(()=>q),o=f(()=>z),i={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},l={"pattern-bg":"Background","pattern-tile":"Tiles"},r=a(c=>u=>n.value[c]=u.target.value,"change");return s`
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
            <${R} icon="lucide:folder-sync" label="change" ...${{onclick:Ce}} />
            <${R} icon="lucide:x" label="close" ...${{onclick:ei}} />
          </div-x>
        `,()=>s`<${R} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Ce}} />`)}
    </section>
  `}a(sl,"$$PreferencesRatHtml");function cl(e,t){return ul.call({props:e},e,t)}a(cl,"PreviewRatHtml");function ul(e,t){const n=f(()=>Je),o=f(()=>N),i=f(()=>Fn);let l=w(null);function r(d){let g=null,b=!0;return mt(Te(d.source),d.path,d.name).then(T=>{b&&(g=URL.createObjectURL(T),l.value=g)}),()=>{b=!1,g&&URL.revokeObjectURL(g)}}a(r,"show"),X(()=>{if(i.value=null,l.value=null,n.value&&ft(n.value))return r(n.value)});const c=a(d=>i.value={height:d.target.naturalHeight,width:d.target.naturalWidth},"loaded");function u(){o.value=null,RAT.app.toggle("context")}return a(u,"info"),s`
    ${m(()=>!n.value,()=>s`
        <${C} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>s`
        <${C} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${$(u)} /></${C}>
        <div.stage>
          ${m(()=>ft(n.value),()=>s`
              ${m(()=>l.value,()=>s`<img src=${()=>l.value} alt=${()=>n.value.name} onload=${$(c)} />`)}
            `,()=>s`<svg-icon icon=${()=>Ln(n.value)} />`)}
        </div>
      `)}
  `}a(ul,"$$PreviewRatHtml");const ye=P("appearance",{}),qt={density:te.densities,geometry:te.geometries,mode:te.modes},dl=a(()=>ye.value,"appearance"),pl=a(()=>te.palettes().catch(()=>[]),"palettes");function fl(e,t){return ye.value={...ye.value,[e]:t||null},te.set({[e]:t||null})}a(fl,"setAppearance");Object.keys(ye.value).length&&te.set(ye.value);const hl=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Wt(e,t){return ml.call({props:e},e,t)}a(Wt,"SettingsRatHtml");function ml(e,t){ht("177zzh1",hl);let n=w({...dl()}),o=w([]);const i=v(()=>Oe.value);pl().then(c=>{o.value=c});function l(c,u){const d=u.detail?.value??u.target.value;n.value={...n.value,[c]:d},fl(c,d)}a(l,"change");async function r(){await di()&&Be.success(`${e.name??"the app"} is installed`)}return a(r,"installApp"),s`
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
        ${k(()=>Object.keys(qt),c=>c,c=>s`
            <label>
              <span>${()=>c}</span>
              <input-value look="segments" value=${()=>n.value[c]??""} onchange=${$(u=>l(c,u))}>
                ${k(()=>qt[c],u=>u,u=>s`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!Vn,()=>s`
          <section>
            <h3>install</h3>
            ${m(()=>i.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${$(r)} />`,()=>s`
                ${m(()=>ui,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(ml,"$$SettingsRatHtml");function $l(e,t){return vl.call({props:e},e,t)}a($l,"SyncRatHtml");function vl(e,t){const n=f(()=>$e),o=f(()=>ct),i=f(()=>xn),l=f(()=>I),r=f(()=>ve);let c=w(null),u=w(""),d=w("https"),g=w(""),b=w("");const T=v(()=>o.value.map(go)),x=v(()=>r.value.filter(h=>!T.value.some(G=>je(G,h)))),y=v(()=>c.value??vo(u.value,d.value)),A=v(()=>l.value.reduce((h,G)=>h+Math.max(0,G.size),0)),H=v(()=>n.value??{}),V=a(h=>!!y.value&&je(y.value,h),"isChosen"),U=a(h=>h.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf");function Se(h){c.value=h,u.value=""}a(Se,"choose");function p(h){u.value=h.target.value,c.value=null}a(p,"type");function de(h){d.value=h.target.value,c.value&&(c.value={...c.value,protocol:d.value})}a(de,"protocol");function Xe(h){return h.name?h.name:h.tree?"chosen":"none yet"}a(Xe,"folderOf");function Qn(h){return h.enabled?h.lastSync?`on · last ${O.date(h.lastSync)}`:"on":"off"}a(Qn,"stateOf");const _n=a((h,G)=>h.length?`send ${h.length} · ${O.bytes(G)}`:"send","sendLabel");function Ht(h,G,Xn){return s`
      <li.row class:selected=${()=>V(h)}>
        <button.entry type="button" aria-pressed=${()=>se(V(h))} onclick=${$(()=>Se(h))}>
          <span.thumb><svg-icon icon=${()=>G} /></span>
          <span.text>
            <span.name>${()=>Me(h)}</span>
            <small>${()=>h.host}:${()=>h.port} · ${()=>h.protocol}</small>
          </span>
        </button>
        ${m(()=>Xn,()=>s`<btn-icon icon="lucide:x" label=${()=>"forget "+Me(h)} onclick=${$(()=>wo(h))} />`)}
      </li>
    `}return a(Ht,"receiver"),s`
    ${m(()=>!yn(),()=>s`
        <${C} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
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
              <btn-icon icon="lucide:radar" label="search again" onclick=${$(Rn)} />
            </div-x>
            ${m(()=>T.value.length||x.value.length,()=>s`
                <ul.rows>
                  ${k(()=>T.value,h=>h,h=>s`${()=>Ht(h,U(h),!1)}`)}
                  ${k(()=>x.value,h=>h,h=>s`${()=>Ht(h,"lucide:history",!0)}`)}
                </ul>
              `,()=>s`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>u.value} oninput=${$(p)} />
              <input-value look="segments" value=${()=>y.value?.protocol??d.value} onchange=${$(de)}>
                ${k(()=>kn,h=>h,h=>s`<input-option value=${()=>h}>${()=>h}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" ref=${Dt(g,"value")} />
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
                        <btn-icon icon="lucide:x" label=${()=>"remove "+h.name} onclick=${$(()=>Ro(h.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${R} icon="lucide:file-plus" label="pick files" ...${{onclick:ko}} />
              <button.action.primary type="button" disabled=${()=>!l.value.length||!y.value} onclick=${$(()=>Ao(y.value,l.value,g.value))}><svg-icon icon="lucide:send" /> ${()=>_n(l.value,A.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${_e} ...${{get rows(){return{folder:Xe(H.value),state:Qn(H.value),to:H.value.enabled&&`${H.value.host}:${H.value.port}`}}}} />
            ${m(()=>!H.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Dt(b,"value")} />`)}
            <div-x.actions>
              <${R} icon="lucide:folder-search" label="folder" ...${{onclick:Oo}} />
              ${m(()=>H.value.enabled,()=>s`
                  <${R} icon="lucide:refresh-cw" label="now" ...${{onclick:Ho}} />
                  <${R} icon="lucide:pause" label="turn off" ...${{onclick:Eo}} />
                `,()=>s`<${R} icon="lucide:play" label="turn on" ...${{get disabled(){return!H.value.tree||!y.value},onclick:a(()=>So(y.value,{pin:g.value,ssid:b.value}),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(vl,"$$SyncRatHtml");function Sl(e,t){return gl.call({props:e},e,t)}a(Sl,"AppRatHtml");function gl(e,t){const n=f(()=>Re);RAT.app.on("error",Be.error),RAT.app.hold(ka()),pi("Files");let o=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!o&&Rn(),l!=="/sync"&&o&&yo(),o=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${il} /></rat-area>
    <rat-view name="dashboard" route="/"><${Gi} /></rat-view>
    <rat-view name|route="library"><${el} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${cl} /></rat-view>
    <rat-view name|route="sync"><${$l} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${$(a(l=>{l.detail?.open||(n.value=null)},"ontoggle"))}><div.context><${Mi} /></div></rat-area>
    <rat-area name="config" dock="end"><${Wt} name="Files"><${rl} /></${Wt}></rat-area>
  `}a(gl,"$$AppRatHtml");export{Sl as default};
