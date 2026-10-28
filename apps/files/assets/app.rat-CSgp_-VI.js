const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-D1-vv94K.js","./preload-helper-Cc2_yIPf.js","./withControl-YhKKGoq_.js","./index-CgHh2HpB.js","./index-DJNaec74.css"])))=>i.map(i=>d[i]);
var Bn=Object.defineProperty;var a=(e,t)=>Bn(e,"name",{value:t,configurable:!0});import{i as Un,g as v,h as qn,r as Ot,P as Wn,L as Vn,S as H,j as Wt,$ as Vt,k as F,m as $,o as ft,q as Gt,u as ve,s as Gn,t as ie,v as _n,w as pt,x as Jn,y as Z,z as Et}from"./index-D1-vv94K.js";import{p as Yn,a as Kn}from"./keys-CWTtq0D5.js";import{_ as Qn}from"./preload-helper-Cc2_yIPf.js";import{h as s,f as g,w as p}from"./withControl-YhKKGoq_.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function Re(e,t){const n={};for(const o of Object.keys(t)){const l=e?.[o],c=t[o];n[o]=Un(l)?l:v(()=>e[o]===void 0&&c?c():e[o])}return new Proxy(e??{},{get:a((o,l)=>Object.hasOwn(n,l)?n[l]:o[l],"get")})}a(Re,"signalsOf");function h(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const l=t?Yn(t):null;let c=o;return function(i){if(!(o&&!c)&&!(l&&!Kn(i,l))){n&&i.preventDefault(),o&&c--;try{const r=(typeof e=="string"?qn(e):e).call(this,i);typeof r?.catch=="function"&&r.catch(d=>Ot(this,d,"handler"))}catch(r){Ot(this,r,"handler")}}}}a(h,"listener");function B(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(B,"read$1");function U(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(U,"write$1");const Ee=a(e=>(t,n)=>Wn.notify(t,{...n,type:e}),"notify"),Be=Object.assign(Ee("info"),{error:Ee("error"),info:Ee("info"),success:Ee("success")}),Xn=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function I(e,t=[]){let n=e;for(const o of t)n=await n.getDirectoryHandle(o);return n}a(I,"dirAt");async function Zn(e,t=[]){const n=await I(e,t),o=[];for await(const c of n.values())o.push(c);return(await Promise.all(o.map(async c=>{if(c.kind==="directory")return{kind:"directory",name:c.name};const i=await c.peekFile?.()??await c.getFile();return{kind:"file",lastModified:i.lastModified,name:c.name,size:i.size,type:i.type}}))).sort(Xn)}a(Zn,"list$1");async function ht(e,t,n){return(await(await I(e,t)).getFileHandle(n)).getFile()}a(ht,"readFile");async function ea(e,t,n){await(await I(e,t)).getDirectoryHandle(n,{create:!0})}a(ea,"mkdir");async function ta(e,t,n){await(await I(e,t)).removeEntry(n,{recursive:!0})}a(ta,"remove$3");async function na(e,t,n,o,l){const c=await I(e,t),i=l==="directory"?await c.getDirectoryHandle(n):await c.getFileHandle(n);if(typeof i.move=="function")try{await i.move(o);return}catch{}l==="directory"?await mt(i,c,o):await vt(i,c,o),await c.removeEntry(n,{recursive:!0})}a(na,"rename");async function vt(e,t,n,o){const l=await e.getFile(),i=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(i instanceof WritableStream)){await i.write(await l.arrayBuffer()),await i.close();return}try{await l.stream().pipeTo(i,{signal:o})}catch(r){throw await i.abort?.().catch(()=>{}),r}}a(vt,"copyFile");async function mt(e,t,n,o,l=()=>{}){const c=await t.getDirectoryHandle(n,{create:!0});for await(const i of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");i.kind==="directory"?await mt(i,c,i.name,o,l):(await vt(i,c,i.name,o),l())}}a(mt,"copyTree");const{folders:_}=RAT.app,{perms:aa,ready:oa,sources:_t}=Re(_,{perms:null,ready:null,sources:null}),A=v(()=>_t.value.at(-1)??null),la=v(()=>A.value?aa.value[A.value.id]??null:null),q=v(()=>la.value==="granted"?_.handleOf(A.value.id):null),Jt=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",ia=a(()=>_.load(),"load");async function ra(){const e=_t.value.map(n=>n.id),t=await _.add();if(t)for(const n of e)await _.remove(n);return t}a(ra,"grant");async function sa(){return A.value?_.reconnect(A.value.id):{granted:!1}}a(sa,"reconnect$1");async function ca(){A.value&&await _.remove(A.value.id)}a(ca,"forget$2");const ua={folder:H,name:H,path:Vn(H)},da={icon:H,label:H},Ue=Wt(ua).create(B("files:bookmarks",[])),je=Vt(H,H).create(B("files:folderTyped",{})),$t=Vt(H,da).create(B("files:folderTypes",{}));F(()=>U("files:bookmarks",Ue));F(()=>U("files:folderTyped",je));F(()=>U("files:folderTypes",$t));const me=v(()=>String(A.value?.id??"")),Yt=a(e=>`${me.value}:${e.join("/")}`,"keyOf"),gt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},Kt=v(()=>({...gt,...$t.toJSON()})),Qt=a(e=>je.get(Yt(e))??null,"folderTypeIdOf"),Xt=a(e=>Kt.value[Qt(e)]??null,"folderTypeOf");function tt(e,t){const n=Yt(e);t?je.set(n,t):je.delete(n)}a(tt,"setFolderType");function fa({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return $t.set(n,{icon:e,label:t}),n}a(fa,"addFolderType");function pa(e,t){const n=e.filter(i=>i.kind==="file"),o={};for(const i of n)o[t(i)]=(o[t(i)]??0)+1;const[l,c]=Object.entries(o).sort((i,r)=>r[1]-i[1])[0]??[];return l in gt&&c/n.length>=.6?l:null}a(pa,"suggestFolderType");const ha=a(()=>Ue.where({folder:me.value}),"bookmarks"),va=a(e=>Ue.has({folder:me.value,path:e}),"isBookmarked"),ma=a((e,t)=>Ue.toggle({folder:me.value,name:t,path:e},{folder:me.value,path:e}),"toggleBookmark"),$a=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ga(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(ga,"toBase64");const ba=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),wa=new Set([101,204,205,304]);async function ya(e,{body:t,headers:n={},method:o="GET",signal:l,timeout:c}={}){const i=$a();if(!i)return fetch(e,{body:t,headers:n,method:o,signal:l});const r=await i.request({body:await ga(t),headers:n,method:o,timeout:c,url:e});return new Response(wa.has(r.status)?null:ba(r.data),{headers:r.headers,status:r.status,statusText:r.statusText})}a(ya,"request$2");const ka=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Ra=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),Zt=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),X=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function en(e,t="",n=!1){const o=new URL(Ra(t),Zt(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(en,"urlFor");const xa={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class Qe extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function re(e,t,{body:n,headers:o={},isDir:l=!1,method:c="GET"}={}){if(!e)throw new Error("No webdav connection.");let i;try{i=await ya(en(e,t,l),{body:n,headers:{Authorization:ka(e),...o},method:c})}catch(r){throw globalThis.Capacitor?.isNativePlatform?.()?new Qe(0,`Connection failed: ${r?.message??r}`):new Qe(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!i.ok)throw new Qe(i.status,xa[i.status]??`${i.status} ${i.statusText}`);return i}a(re,"request$1");const Ta='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',nt="DAV:",He=a((e,t)=>e.getElementsByTagNameNS(nt,t)[0]?.textContent??"","firstText");async function tn(e,t,n){const o=await re(e,t,{body:Ta,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await o.text(),"application/xml"),c=new URL(Zt(e)).pathname,i=a(r=>{const d=decodeURIComponent(new URL(r,e.url).pathname);return(d.startsWith(c)?d.slice(c.length):d).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS(nt,"response")].map(r=>{const d=i(He(r,"href"));return{isDir:r.getElementsByTagNameNS(nt,"collection").length>0,lastModified:Date.parse(He(r,"getlastmodified"))||0,mime:He(r,"getcontenttype"),name:d.split("/").pop(),path:d,size:Number(He(r,"getcontentlength"))||0}})}a(tn,"propfind");async function nn(e,t=""){const n=X(t);return(await tn(e,t,1)).filter(l=>l.path!==n).sort((l,c)=>l.isDir===c.isDir?l.name.localeCompare(c.name,void 0,{numeric:!0}):l.isDir?-1:1)}a(nn,"list");async function Xe(e,t){try{return(await tn(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(Xe,"stat");const Aa=a(async(e,t)=>(await re(e,t)).blob(),"read"),an=a((e,t,n)=>re(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Sa=a((e,t)=>re(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Oa=a((e,t,n=!1)=>re(e,t,{isDir:n,method:"DELETE"}),"remove$2"),Ea=a((e,t,n)=>({Destination:en(e,t,n),Overwrite:"F"}),"destination"),on=a((e,t,n,o=!1)=>re(e,t,{headers:Ea(e,n,o),isDir:o,method:"MOVE"}),"move"),Ha=a(e=>nn(e,""),"test"),Ze=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),Ht=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class qe{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof qe&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class Dt extends qe{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,l=null){super(t,n,o),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await Aa(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await an(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=X(t.path,n);await on(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ee extends qe{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await nn(this.connection,this.path))yield[t.name,t.isDir?new ee(this.connection,t.path,t.name):new Dt(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=X(this.path,t),l=await Xe(this.connection,o);if(l&&!l.isDir)throw Ht(t);if(!l){if(!n)throw Ze(t);await Sa(this.connection,o)}return new ee(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=X(this.path,t),l=await Xe(this.connection,o);if(l?.isDir)throw Ht(t);if(!l){if(!n)throw Ze(t);await an(this.connection,o,new Blob([]))}return new Dt(this.connection,o,t,l)}async removeEntry(t){const n=X(this.path,t),o=await Xe(this.connection,n);if(!o)throw Ze(t);await Oa(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=X(t.path,n);await on(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Da=a(e=>new ee(e,"",e.name||new URL(e.url).host),"davRoot"),{files:ln}=RAT.app,rn="remotes.json",Ne=new Map,Fa={id:H,name:H,password:H,url:H,username:H},xe=Wt(Fa).create(await ln.read(rn,"json").catch(()=>[]));F(()=>ln.write(rn,JSON.stringify(xe)));const Me=v(()=>xe.toArray()),sn=a(e=>xe.one({id:e})??null,"byId");async function Na({name:e,password:t="",url:n,username:o=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const c={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(o).trim()};return await Ha(c),xe.push(c),c}a(Na,"add$1");function ja(e){xe.drop({id:e}),Ne.delete(e)}a(ja,"remove$1");function Ma(e){const t=sn(e);return t?(Ne.has(e)||Ne.set(e,Da(t)),Ne.get(e)):null}a(Ma,"rootOf");const We=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],za=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Ca=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,La=a(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function te({name:e,type:t=""}){const n=La(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||za.test(n)?"documents":Ca.test(n)?"archives":"other"}a(te,"categoryOf");let x=$(null),W=$(null);const{files:bt}=RAT.app,Pa=24,Ia=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),wt=a(e=>`index/${e.id}.json`,"pathOf");let de=null;async function cn(e,t,n,o){const l=[],c=[];for await(const i of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");Ia(i.name)||(i.kind==="directory"?l.push(i):c.push(Promise.resolve(i.peekFile?.()??i.getFile()).then(r=>({lastModified:r.lastModified,name:i.name,path:t,size:r.size,type:r.type}),()=>null)))}for(const i of await Promise.all(c))i&&n.push(i);W.value={files:n.length};for(const i of l)await cn(i,[...t,i.name],n,o)}a(cn,"walk");function Ba(e){const t=Object.fromEntries(We.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const c=t[te(l)];c.count++,c.size+=l.size,n+=l.size}const o=e.toSorted((l,c)=>c.lastModified-l.lastModified).slice(0,Pa);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(Ba,"summarize");async function Ua(e){return x.value=e?await bt.read(wt(e),"json").catch(()=>null):null,x.value}a(Ua,"restore");async function qa(e,t){de?.abort();const n=new AbortController;de=n;const o=[];W.value={files:0};try{return await cn(e,[],o,n.signal),x.value=Ba(o),await bt.write(wt(t),JSON.stringify(x.value)),x.value}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{de===n&&(de=null,W.value=null)}}a(qa,"scan");const un=a(()=>de?.abort(),"stop$1");async function Wa(e){un(),x.value=null,e&&await bt.remove(wt(e)).catch(()=>{})}a(Wa,"forget$1");function Va(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const l of x.value?.files??[])if(l.name.toLowerCase().includes(n)&&o.push(l),o.length>=t)break;return o}a(Va,"search");const Ga=50,dn="files:tasks",Ve=new ft,$e=new ft(B(dn,[]));F(()=>U(dn,$e));const at=v(()=>Ve.toArray()),Ft=v(()=>$e.toArray()),Nt=v(()=>Ve.has({state:"running"})),fn=new WeakMap,pn=new Map,_a=a(e=>e?.name==="AbortError","isAbort"),Ja=a(e=>(pn.get(e)??Promise.resolve()).catch(()=>{}),"after");function et(e,t){Object.assign(e,t,{endedAt:Date.now()}),Ve.remove(e),$e.unshift(e.toJSON()),$e.splice(Ga)}a(et,"finish");function Ge({icon:e="lucide:loader",label:t,lane:n="default"},o){const l=new AbortController,{signal:c}=l,i=new Gt({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});fn.set(i,l),Ve.push(i);const r=a((m,N)=>{i.progress={done:m,total:N}},"progress"),d=Ja(n).then(async()=>{if(c.aborted)return et(i,{state:"cancelled"}),null;Object.assign(i,{startedAt:Date.now(),state:"running"});try{const m=await o({progress:r,signal:c});return et(i,{state:c.aborted?"cancelled":"done"}),m}catch(m){throw et(i,_a(m)?{state:"cancelled"}:{error:String(m?.message??m),state:"failed"}),m}});return pn.set(n,d),d}a(Ge,"run");const Ya=a(e=>fn.get(e)?.abort(),"cancel"),Ka=a(()=>$e.clear(),"clearHistory"),{dialogs:Qa}=RAT.app,P=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),hn=a(()=>!!P(),"available$1"),vn=["https","http"],ot=53317,mn="files:sync",lt=B(mn,{});let ge=$(null),it=$([]),rt=$(null),S=$([]),ne=$(Array.isArray(lt.targets)?lt.targets:[]),ze=lt.folderName??"";const yt=a(()=>U(mn,{folderName:ze,targets:ne.value}),"persist");function Xa(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const c=new URL(n.replace(/^filesync:\/\//,"http://")),i=c.searchParams.get("protocol");return{fingerprint:c.searchParams.get("fingerprint")??"",host:c.hostname,port:Number(c.port)||ot,protocol:vn.includes(i)?i:t}}catch{return null}const[o,l]=n.split(":");return{fingerprint:"",host:o,port:Number(l)||ot,protocol:t}}a(Xa,"parseTarget");const Ce=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),Le=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),Za=a(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??ot,protocol:e.protocol??"https"}),"targetOf");function eo(e){const t=ne.value.filter(n=>!Le(n,e));ne.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),yt()}a(eo,"remember");function to(e){ne.value=ne.value.filter(t=>!Le(t,e)),yt()}a(to,"forget");let jt=!1;async function $n(){const e=P();e&&(jt||(jt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;it.value=[t,...it.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),rt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await kt())}a($n,"start");const no=a(()=>P()?.stopDiscovery().catch(()=>{}),"stop");function gn(e){const t=new Set(S.value.map(n=>n.uri));S.value=[...S.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(gn,"add");async function ao(){const{files:e=[]}=await P().pickFiles();gn(e)}a(ao,"pickFiles");async function oo(e,t,n){const o=await(await I(e,t)).getFileHandle(n.name),l=o._uri??(o.path?`file://${o.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");gn([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}a(oo,"addEntry");const lo=a(e=>{S.value=S.value.filter(t=>t.uri!==e)},"remove"),io=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function ro(e,t=S.value,n=""){const o=P();if(!o||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return Ge({icon:"lucide:send",label:`Send ${l} to ${Ce(e)}`,lane:"send"},async({progress:c})=>{const i=await o.addListener("progress",r=>c(r.sent,r.total));try{const r=a(d=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:d,port:e.port,protocol:e.protocol}),"attempt");try{await r(n)}catch(d){if(!io(d))throw d;const m=await Qa.prompt({message:`${Ce(e)} wants a pin`,ok:"Send",title:"Pin"});if(!m)throw new Error("no pin given");await r(m)}eo(e),S.value=S.value.filter(d=>!t.includes(d))}finally{i.remove()}})}a(ro,"send");async function kt(){const e=await P()?.getAutoSyncState().catch(()=>null)??null;ge.value=e&&{...e,name:e.tree?ze:""}}a(kt,"refreshAutoSync");async function so(){const{name:e,uri:t}=await P().pickFolder();t&&(ze=e??"",ge.value={...ge.value,name:ze,tree:t},yt())}a(so,"pickSyncFolder");async function co(e,{pin:t="",ssid:n=""}={}){const o=ge.value?.tree;if(!o)throw new Error("pick a folder first");await P().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await kt()}a(co,"startAutoSync");async function uo(){await P().stopAutoSync(),await kt()}a(uo,"stopAutoSync");const fo=a(()=>P()?.syncNow(),"syncNow");let M=$(null);const bn=a((e,t)=>e.join("/")===t.join("/"),"samePath"),po=a((e,t)=>e.length>=t.length&&bn(e.slice(0,t.length),t),"isInside");function ho(e,t,n,o){(M.value?.mode!==e||M.value.placed)&&(M.value=new Gt({items:new ft,mode:e,placed:!1})),M.value.items.drop({name:t.name,path:n}),M.value.items.push({kind:t.kind,name:t.name,path:n,root:o})}a(ho,"pick$1");const vo=a(()=>{M.value&&(M.value.placed=!0)},"placed"),wn=a(()=>{M.value=null},"clear");async function Mt(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(Mt,"exists");async function mo(e,t,n){if(!await Mt(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,l=o>0?t.slice(0,o):t,c=o>0?t.slice(o):"";for(let i=2;;i++){const r=`${l} (${i})${c}`;if(!await Mt(e,r))return r}}a(mo,"freeName");async function yn(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await yn(n);return t}a(yn,"countFiles");async function $o(e,t){const n=await I(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}a($o,"handleOf");async function go(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}a(go,"moved");async function bo(e,t,n,o,{onProgress:l=a(()=>{},"onProgress"),signal:c}={}){const i=[...t],r=i.find(w=>w.kind==="directory"&&po(o,[...w.path,w.name]));if(r)throw new Error(`“${r.name}” can not go into itself`);const d=await I(e,o),m=await Promise.all(i.map(w=>$o(w.root??e,w))),N=await Promise.all(m.map(yn)),k=N.reduce((w,E)=>w+E,0);let j=0;const u=a((w=1)=>l(j+=w,k),"report");l(0,k);for(const[w,E]of i.entries()){c?.throwIfAborted();const ce=m[w],Oe=N[w];if(n==="move"&&bn(E.path,o)){u(Oe);continue}const ue=await mo(d,E.name,E.kind);if(n==="move"&&await go(ce,d,ue)){u(Oe);continue}E.kind==="directory"?await mt(ce,d,ue,c,u):(await vt(ce,d,ue,c),u()),n==="move"&&await(await I(E.root??e,E.path)).removeEntry(E.name,{recursive:!0})}}a(bo,"transfer");const{dialogs:J,router:ae}=RAT.app,wo={copy:"lucide:copy",move:"lucide:scissors"},yo=["pattern-bg","pattern-tile"],ko={open:"auto","pattern-bg":"","pattern-tile":"",searchbar:"bottom",tabbar:"bottom",viewmode:"list"};let D=$(Object.fromEntries(Object.entries(ko).map(([e,t])=>[e,B(`files:${e}`,t)])));F(()=>{for(const[e,t]of Object.entries(D.value))U(`files:${e}`,t)});const kn=a((e,t)=>{D.value={...D.value,[e]:t}},"setting");F(()=>{const e=document.documentElement;for(const t of yo){const n=D.value[t];e.toggleAttribute(`data-${t}`,!!n),n&&Qn(async()=>{const{patternStyle:o}=await import("./index-D1-vv94K.js").then(l=>l.A);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||ve(()=>D.value[t])!==n))for(const[l,c]of Object.entries(o))e.style.setProperty(l,c)})}});F(()=>{const{dataset:e}=document.documentElement;e.searchbar=D.value.searchbar,e.tabbar=D.value.tabbar});const Ro=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Rn=a(()=>D.value.open==="single"||D.value.open==="auto"&&Ro(),"opensOnTap");let Q=$(null),be=$([]),R=$(null),fe=$(""),st=$(!1),ct=$(""),O=$(null),oe=$(null),pe=$(null),we=$(B("files:tabs",{index:0,list:[{path:[]}]}));F(()=>U("files:tabs",we.value));const C=v(()=>we.value.list?.length?we.value.list:[{path:[]}]),z=v(()=>Math.min(Math.max(0,we.value.index??0),C.value.length-1)),b=v(()=>C.value[z.value].path),se=v(()=>C.value[z.value].source??null),xn=new Map,Tn=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function Y(e,t=z.value){we.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}a(Y,"setTabs");function V(e,t){Y(C.value.map((n,o)=>o===z.value?{path:e,source:t===void 0?n.source??null:t}:n)),O.value=null,fe.value=""}a(V,"goTo");function An(e=b.value,t=se.value){const n=[...C.value,{path:e,source:t}];Y(n,n.length-1),O.value=null}a(An,"openTab");function xo(e){if(C.value.length===1)return V([]);Y(C.value.filter((t,n)=>n!==e),e<z.value?z.value-1:z.value)}a(xo,"closeTab");function To(e){xn.set(z.value,Tn()?.scrollTop??0),Y(C.value,e),O.value=null}a(To,"switchTab");const zt=a(e=>e.path.at(-1)??_e(e.source??null),"tabName"),Te=a(e=>e?Ma(e):q.value,"rootOfSource"),_e=a(e=>e?sn(e)?.name??"remote":A.value?.name??"folder","sourceName"),Je=a(()=>Te(se.value),"rootHandle"),ye=a(()=>_e(se.value),"folderName"),Ae=a(e=>e.source!==void 0?e.source:e.path?null:se.value,"sourceOf");let De=0;F(()=>{const e=Je(),t=b.value,n=++De;be.value=[],st.value=!!e,e&&Zn(e,t).then(o=>{n===De&&(be.value=o,requestAnimationFrame(()=>{const l=Tn();l&&(l.scrollTop=xn.get(ve(()=>z.value))??0)}))}).catch(o=>{n===De&&Be.error(o)}).finally(()=>{n===De&&(st.value=!1)})});let ut=null;F(()=>{const e=q.value,t=A.value;!e||!t||ut===t||(ut=t,Ua(t).then(()=>Sn(e,t)))});function Sn(e,t){return Ge({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>un());const l=F(()=>{W.value&&n(W.value.files,null)});return qa(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}a(Sn,"indexFolder");const Ao=a(()=>{q.value&&Sn(q.value,A.value)},"rescan"),So=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),Ct=v(()=>So(be.value,fe.value)),dt=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),On=a((e,t)=>e.kind==="directory"?t&&Xt([...t,e.name])?.icon||"lucide:folder":We.find(n=>n.id===te(e))?.icon??"lucide:file","iconOf");function le(e,t=b.value){if(e.kind==="directory")return V([...t,e.name]),ae.go("/library");R.value={...e,kind:"file",path:e.path??t,source:Ae(e)},ae.go("/preview")}a(le,"open");function En(e){V(e.path??[],Ae(e)),ae.go("/library")}a(En,"showInFolder");function Oo(e){if(Rn())return le(e);O.value=e}a(Oo,"onEntryClick");function Hn(e){oe.value=null,O.value=e,RAT.app.toggle("context",!0)}a(Hn,"about");function Eo(){O.value=null,oe.value="tasks",RAT.app.toggle("context",!0)}a(Eo,"openTasks");async function Ye(){const e=Je();if(!e)throw new Error("No folder open");if((e.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):"granted")!=="granted")throw new Error("No permission to change this folder");return e}a(Ye,"writable");async function Rt(e,t,n){await Ge({...e,lane:"write"},n),t.join("/")===b.value.join("/")&&V([...t])}a(Rt,"writeTask");async function Dn(){const e=await J.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await Ye(),n=b.value;await Rt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>ea(t,n,e))}a(Dn,"newFolder");async function Ho(e){const t=await J.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await Ye(),o=e.path??b.value;O.value=null,await Rt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>na(n,o,e.name,t,e.kind))}a(Ho,"renameEntry");async function Do(e){if(!await J.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await Ye(),n=e.path??b.value;O.value=null,RAT.app.toggle("context",!1),await Rt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>ta(t,n,e.name))}a(Do,"deleteEntry");function Lt(e,t){ho(e,t,t.path??b.value,Te(Ae(t))),RAT.app.toggle("context",!1)}a(Lt,"pick");async function Fo(){const e=M.value;if(!e)return;const t=await Ye(),n=e.items.toArray(),o=[...b.value],l=n.length===1?n[0].name:`${n.length} items`,c=e.mode==="move"?"move":"copy",i=wo[c];e.mode==="move"?wn():vo();try{await Ge({icon:i,label:`${c} ${l} to /${o.join("/")}`,lane:"write"},({progress:r,signal:d})=>bo(t,n,e.mode,o,{onProgress:r,signal:d}))}finally{o.join("/")===b.value.join("/")&&V([...o])}}a(Fo,"paste");async function Fn(e){const t=await ht(Te(Ae(e)),e.path??b.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(Fn,"download");async function Pe(){if(!Jt)throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");await ra()&&(Y([{path:[]}],0),ae.go("/"))}a(Pe,"chooseFolder");async function No(){const{granted:e}=await sa();e||await Pe()}a(No,"reconnect");async function jo(){await J.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:ye()})&&(await Wa(A.value),ut=null,await ca(),Y([{path:[]}],0))}a(jo,"closeFolder");function Nn(e){An([],e),ae.go("/library")}a(Nn,"openRemote");function Mo(){O.value=null,oe.value="remotes",RAT.app.toggle("context",!0)}a(Mo,"manageRemotes");async function zo(e){if(!await J.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await ja(e.id);const t=C.value.filter(n=>n.source!==e.id);Y(t.length?t:[{path:[]}],0)}a(zo,"forgetRemote");async function Co(e){await oo(q.value,e.path??b.value,e),RAT.app.toggle("context",!1),ae.go("/sync")}a(Co,"sendEntry");async function Lo(e){const t=await J.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await J.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";tt(e,fa({icon:n,label:t}))}a(Lo,"newFolderType");function Po(e){const t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[te(l)]=(n[te(l)]??0)+1;const o=Object.entries(n).sort((l,c)=>c[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?We.find(l=>l.id===o[0])?.label:null,size:t.reduce((l,c)=>l+c.size,0)}}a(Po,"factsOf");const Fe=v(()=>Po(be.value)),Pt=We.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),Io=a((e,t)=>t.lastModified-e.lastModified,"newest"),Bo=v(()=>(x.value?.files??[]).filter(e=>te(e)===Q.value).toSorted(Io).slice(0,500)),It=v(()=>Va(ct.value));let he=null;const Se=Gn(!1),jn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Uo=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!jn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),he=e,Se.value=!0});addEventListener("appinstalled",()=>{he=null,Se.value=!1});async function qo(){if(!he)return!1;const e=he;return he=null,Se.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(qo,"install");function Wo(e){const t=`${e}:install-hint`,n=a(()=>{B(t)||(U(t,!0),Be(`${e} can be installed: see the settings`))},"show");Se.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(Wo,"hint");const Vo=864e5,Go={day:"numeric",month:"short",year:"numeric"},xt=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ie=a(e=>{const t=xt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Go)},"date"),_o=a(e=>{const t=xt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Vo;return n<0?Ie(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ie(t)},"ago"),Jo=a(e=>{const t=xt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ie(t)},"since"),Yo=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${o}:${l}`:`${o}:${l}`},"duration"),Ko=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),T={ago:_o,bytes:Ko,date:Ie,duration:Yo,since:Jo};function y(e,t){return Qo.call({props:e},e,t)}a(y,"ActionRatHtml");function Qo(e,t){return s`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${h(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(Qo,"$$ActionRatHtml");function Mn(e,t){return Xo.call({props:e},e,t)}a(Mn,"BookmarkActionRatHtml");function Xo(e,t){const{path:n}=Re(e,{path:null}),o=v(()=>va(n.value));return s`<${y} ...${{get icon(){return o.value?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return o.value?"remove bookmark":"bookmark"},onclick:a(()=>ma(n.value,n.value.at(-1)),"onclick")}} />`}a(Xo,"$$BookmarkActionRatHtml");function Ke(e,t){return Zo.call({props:e},e,t)}a(Ke,"FactsRatHtml");function Zo(e,t){const n=a(l=>l==null||l===""||l===!1,"isEmpty"),o=v(()=>Object.entries(e.rows??{}).filter(([,l])=>!n(l)));return s`
    <dl.facts>
      ${g(()=>o.value,l=>l,([l,c])=>s`<dt>${()=>l}</dt><dd>${()=>c}</dd>`)}
    </dl>
  `}a(Zo,"$$FactsRatHtml");function el(e,t){return tl.call({props:e},e,t)}a(el,"EntryDetailsRatHtml");function tl(e,t){const{entry:n}=Re(e,{entry:null}),o=v(()=>n.value.path??b.value),l=v(()=>n.value.kind==="directory"),c=v(()=>!Ae(n.value)),i=a(r=>r.kind==="directory"?"folder":r.type||"file","kindOf");return s`
    <h2>${()=>n.value.name}</h2>
    <${Ke} ...${{get rows(){return{name:n.value.name,kind:i(n.value),size:l.value?null:T.bytes(n.value.size),modified:n.value.lastModified&&T.date(n.value.lastModified),in:"/"+o.value.join("/")}}}} />
    <div-x.actions>
      <${y} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>le(n.value,o.value),"onclick")}} />
      ${p(()=>n.value.path,()=>s`<${y} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>En(n.value),"onclick")}} />`)}
      ${p(()=>!l.value,()=>s`<${y} icon="lucide:download" label="download" ...${{onclick:a(()=>Fn(n.value),"onclick")}} />`)}
      ${p(()=>!l.value&&c.value&&hn(),()=>s`<${y} icon="lucide:send" label="send" ...${{onclick:a(()=>Co(n.value),"onclick")}} />`)}
      ${p(()=>l.value&&c.value,()=>s`<${Mn} ...${{get path(){return[...o.value,n.value.name]}}} />`)}
      <${y} icon="lucide:copy" label="copy" ...${{onclick:a(()=>Lt("copy",n.value),"onclick")}} />
      <${y} icon="lucide:scissors" label="move" ...${{onclick:a(()=>Lt("move",n.value),"onclick")}} />
      <${y} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>Ho(n.value),"onclick")}} />
      <${y} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>Do(n.value),"onclick")}} />
    </div-x>
  `}a(tl,"$$EntryDetailsRatHtml");function nl(e,t){return al.call({props:e},e,t)}a(nl,"FileDetailsRatHtml");function al(e,t){return s`
    <h2>Details</h2>
    <${Ke} ...${{get rows(){return{name:R.value.name,type:R.value.type||"unknown",size:T.bytes(R.value.size),dimensions:pe.value&&`${pe.value.width} × ${pe.value.height}`,modified:T.date(R.value.lastModified),in:"/"+R.value.path.join("/")}}}} />
    <div-x.actions>
      <${y} icon="lucide:download" label="download" ...${{onclick:a(()=>Fn(R.value),"onclick")}} />
      <${y} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>En(R.value),"onclick")}} />
    </div-x>
  `}a(al,"$$FileDetailsRatHtml");function ol(e,t){return ll.call({props:e},e,t)}a(ol,"FolderDetailsRatHtml");function ll(e,t){const n=v(()=>b.value.length>0&&!se.value),o=v(()=>n.value?Qt(b.value):null),l=v(()=>n.value&&!o.value?pa(be.value,te):null),c=a(i=>tt(b.value,o.value===i?null:i),"toggleFolderType");return s`
    <h2>This folder</h2>
    <${Ke} ...${{get rows(){return{folder:b.value.at(-1)??ye(),contains:`${Fe.value.folders} folders, ${Fe.value.files} files`,size:T.bytes(Fe.value.size),mostly:Fe.value.mostly}}}} />
    <div-x.actions>
      <${y} icon="lucide:folder-plus" label="new folder" ...${{onclick:Dn}} />
      ${p(()=>n.value,()=>s`<${Mn} ...${{get path(){return b.value}}} />`)}
    </div-x>
    ${p(()=>n.value,()=>s`
        <h3>Foldertype</h3>
        ${p(()=>l.value,()=>s`<p.hint>Looks like ${()=>gt[l.value].label}. <button.link type="button" onclick=${h(()=>tt(b.value,l.value))}>Make it one</button></p>`)}
        <div-x.actions>
          ${g(()=>Object.entries(Kt.value),i=>i,([i,r])=>s`<button.action type="button" aria-pressed=${()=>ie(o.value===i)} onclick=${h(()=>c(i))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
          <${y} icon="lucide:plus" label="new foldertype" ...${{onclick:a(()=>Lo(b.value),"onclick")}} />
        </div-x>
      `)}
  `}a(ll,"$$FolderDetailsRatHtml");function il(e,t){return rl.call({props:e},e,t)}a(il,"RemoteManagerRatHtml");function rl(e,t){let n=$(null),o=$(!1);async function l(c){c.preventDefault();const i=c.target;o.value=!0,n.value=null;try{const r=await Na(Object.fromEntries(new FormData(i)));i.reset(),Nn(r.id),RAT.app.toggle("context",!1)}catch(r){n.value=r.message??String(r)}finally{o.value=!1}}return a(l,"add"),s`
    ${p(()=>Me.value.length,()=>s`
        <ul.tasks>
          ${g(()=>Me.value,c=>c,c=>s`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>c.name}</span><small>${()=>c.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+c.name} onclick=${h(()=>zo(c))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${h(l)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${p(()=>n.value,()=>s`<p.error>${()=>n.value}</p>`)}
      <button.action type="submit" disabled=${()=>o.value}><svg-icon icon=${()=>o.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(rl,"$$RemoteManagerRatHtml");function zn(e,t){return sl.call({props:e},e,t)}a(zn,"StatusRatHtml");function sl(e,t){return s`
    ${p(()=>W.value,()=>s`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>W.value.files} files</p>`,()=>p(()=>x.value,()=>s`<p.status>${()=>x.value.total} files · ${()=>T.bytes(x.value.size)} · read ${()=>T.date(x.value.scannedAt)}</p>`))}
  `}a(sl,"$$StatusRatHtml");function cl(e,t){return ul.call({props:e},e,t)}a(cl,"RootDetailsRatHtml");function ul(e,t){return s`
    <h2>${()=>_e(null)}</h2>
    <${zn} />
    <div-x.actions><${y} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!q.value||!!W.value},onclick:Ao}} /></div-x>
  `}a(ul,"$$RootDetailsRatHtml");function dl(e,t){return fl.call({props:e},e,t)}a(dl,"TaskListRatHtml");function fl(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},o=a(r=>r.state==="queued"||r.state==="running","isOpen");function l({progress:r,state:d}){return d!=="running"||r?.done==null?n[d]:r.total?`${Math.round(r.done/r.total*100)}%`:String(r.done)}a(l,"stateOf");function c(r){return r.error?r.error:r.endedAt?`${l(r)} · ${T.date(r.endedAt)}`:l(r)}a(c,"noteOf");function i(r){return s`
      <li class=${()=>`task ${r.state}`}>
        <svg-icon icon=${()=>r.icon} />
        <span.text>
          <span.name>${()=>r.label}</span>
          <small>${()=>c(r)}</small>
          ${p(()=>r.state==="running"&&r.progress?.total,()=>s`<progress max=${()=>r.progress.total} value=${()=>r.progress.done} />`)}
        </span>
        ${p(()=>o(r),()=>s`<btn-icon icon="lucide:x" label=${()=>"cancel "+r.label} onclick=${h(()=>Ya(r))} />`)}
      </li>
    `}return a(i,"row"),s`
    ${p(()=>at.value.length,()=>s`
        <ul.tasks>
          ${g(()=>at.value,r=>r,r=>s`${()=>i(r)}`)}
        </ul>
      `,()=>s`<p.empty>nothing to do</p>`)}
    ${p(()=>Ft.value.length,()=>s`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${h(Ka)} />
        </div-x>
        <ul.tasks>
          ${g(()=>Ft.value,r=>r,r=>s`${()=>i(r)}`)}
        </ul>
      `)}
  `}a(fl,"$$TaskListRatHtml");function pl(e,t){return hl.call({props:e},e,t)}a(pl,"ContextRatHtml");function hl(e,t){const{$path:n}=Re(RAT.app.router,{$path:null});return s`
    ${p(()=>oe.value==="tasks",()=>s`<h2>Tasks</h2><${dl} />`,()=>p(()=>oe.value==="remotes",()=>s`<h2>Remote</h2><${il} />`,()=>p(()=>O.value,()=>s`<${el} ...${{get entry(){return O.value}}} />`,()=>p(()=>n.value==="/preview"&&R.value,()=>s`<${nl} />`,()=>p(()=>n.value==="/library"&&Je(),()=>s`<${ol} />`,()=>s`<${cl} />`)))))}
  `}a(hl,"$$ContextRatHtml");function L(e,t){return vl.call({props:e},e,t)}a(L,"BarRatHtml");function vl(e,t){return s`
    <header.bar>
      ${p(()=>e.back,()=>s`<btn-icon icon="lucide:arrow-left" label="back" onclick=${h(e.back)} />`,()=>s`<btn-icon icon="lucide:menu" label="menu" onclick=${h(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${h(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(vl,"$$BarRatHtml");function Tt(e,t){return ml.call({props:e},e,t)}a(Tt,"ThumbRatHtml");function ml(e,t){const n=e.entry,o=e.at??[],l=e.from??null,c=RAT.app.thumbnails,i=dt(n)?d(n):null;let r=$(i?c.peekFile(i):null);function d({lastModified:N,name:k,size:j}){return`${l??ve(()=>A.value)?.id}/${o.join("/")}/${k}:${j}:${N}`}a(d,"idOf");function m(N){if(!i||r.value)return;let k=!0;const j=new IntersectionObserver(([u])=>{u.isIntersecting&&(j.disconnect(),c.requestFile(i,()=>ht(Te(l),o,n.name)).then(w=>{k&&w&&(r.value=w)}))},{rootMargin:"200px"});return j.observe(N),()=>{k=!1,j.disconnect()}}return a(m,"watch"),s`
    <span.thumb ref=${_n(m)}>
      ${p(()=>r.value,()=>s`<img src=${()=>r.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>On(n,l?null:e.at)} />`)}
    </span>
  `}a(ml,"$$ThumbRatHtml");function Bt(e,t){return $l.call({props:e},e,t)}a(Bt,"FileRowRatHtml");function $l(e,t){const n=e.entry,o=`/${n.path.join("/")} · ${T.bytes(n.size)}`;return s`
    <li.row>
      <button.entry type="button" onclick=${h(()=>le(n))}>
        <${Tt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>o}</small></span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${h(()=>Hn(n))} />
    </li>
  `}a($l,"$$FileRowRatHtml");function Cn(e,t){return gl.call({props:e},e,t)}a(Cn,"SearchbarRatHtml");function gl(e,t){const n=v(()=>at.value.length),o=v(()=>n.value?`${n.value} tasks`:"tasks");return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${h(a(c=>e.onsearch?.(c.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>Nt.value} aria-label=${()=>ie(o.value)} title=${()=>o.value} onclick=${h(Eo)}>
        <svg-icon icon=${()=>Nt.value?"lucide:loader":"lucide:list-checks"} />
        ${p(()=>n.value,()=>s`<span.badge>${()=>n.value}</span>`)}
      </button>
    </div>
  `}a(gl,"$$SearchbarRatHtml");function K(e,t){return bl.call({props:e},e,t)}a(K,"TileRatHtml");function bl(e,t){return s`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${h(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}a(bl,"$$TileRatHtml");const wl=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function yl(e,t){return kl.call({props:e},e,t)}a(yl,"LoadingRatHtml");function kl(e,t){return pt("1tn1js8",wl),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${p(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(kl,"$$LoadingRatHtml");function Ln(e,t){return Rl.call({props:e},e,t)}a(Ln,"WelcomeRatHtml");function Rl(e,t){return s`
    ${p(()=>!Jt,()=>s`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>p(()=>!oa.value,()=>s`<${yl} />`,()=>p(()=>!A.value,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${h(Pe)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>ye()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${h(No)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Rl,"$$WelcomeRatHtml");function xl(e,t){return Tl.call({props:e},e,t)}a(xl,"DashboardRatHtml");function Tl(e,t){const n=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}],o=v(()=>ct.value.trim()!==""),l=v(()=>ha()),c=v(()=>Pt.find(u=>u.id===Q.value)?.label??Q.value),i=a(()=>_e(null),"folderName"),r=a(u=>ct.value=u,"search"),d=a(u=>x.value?.categories?.[u]??null,"statsOf");function m(u){return u?u>=100?"Found 100+":`Found ${u}`:"Nothing found"}a(m,"foundOf");function N(u){try{return new URL(u).host}catch{return u}}a(N,"hostOf");function k(u){V(u,null),RAT.app.router.go("/library")}a(k,"library");function j(u){return u?`${u.count} · ${T.bytes(u.size)}`:"…"}return a(j,"noteOf"),s`
    <${L} title="Files" />
    <div.scroll>
      ${p(()=>!q.value,()=>s`<${Ln} />`,()=>p(()=>o.value,()=>s`
            <section>
              <h2>${()=>m(It.value.length)}</h2>
              <ul.rows>
                ${g(()=>It.value,u=>u,u=>s`<${Bt} ...${{get entry(){return u}}} />`)}
              </ul>
            </section>
          `,()=>p(()=>Q.value,()=>s`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${h(()=>Q.value=null)} />
                  <h2>${()=>c.value}</h2>
                </div-x>
                <ul.rows>
                  ${g(()=>Bo.value,u=>u,u=>s`<${Bt} ...${{get entry(){return u}}} />`)}
                </ul>
              </section>
            `,()=>s`
              ${p(()=>x.value?.recent.length,()=>s`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${g(()=>x.value.recent,u=>u,u=>s`
                          <button.card type="button" onclick=${h(()=>le(u))}>
                            <${Tt} ...${{get entry(){return u},get at(){return u.path}}} />
                            <span.name>${()=>u.name}</span>
                            <small>${()=>T.date(u.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${p(()=>l.value.length,()=>s`
                    <ul.tiles>
                      ${g(()=>l.value,u=>u,u=>s`<${K} ...${{get icon(){return Xt(u.path)?.icon??"lucide:bookmark"},get name(){return u.name},get note(){return"/"+u.path.join("/")},onclick:a(()=>k(u.path),"onclick")}} />`)}
                    </ul>
                  `,()=>s`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${g(()=>Pt,u=>u,({icon:u,id:w,label:E})=>s`<${K} ...${{get icon(){return u},get name(){return E},get note(){return j(d(w))},get disabled(){return!d(w)?.count},onclick:a(()=>Q.value=w,"onclick")}} />`)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles><${K} icon="lucide:folder-open" ...${{get name(){return i()},get note(){return x.value?T.bytes(x.value.size):"the granted folder"},onclick:a(()=>k([]),"onclick")}} /></ul>
                <${zn} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${g(()=>Me.value,u=>u,u=>s`<${K} icon="lucide:cloud" ...${{get name(){return u.name},get note(){return N(u.url)},onclick:a(()=>Nn(u.id),"onclick")}} />`)}
                  <${K} icon="lucide:cloud-cog" name="WebDAV, Nextcloud" ...${{get note(){return Me.value.length?"add or remove":"connect a server"},onclick:Mo}} />
                  ${g(()=>n,u=>u,u=>s`<${K} ...${{get icon(){return u.icon},get name(){return u.label},get note(){return"soon · "+u.note},get title(){return u.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${p(()=>q.value,()=>s`<${Cn} ...${{get placeholder(){return"Search in "+i()},onsearch:r}} />`)}
  `}a(Tl,"$$DashboardRatHtml");function Al(e,t){return Sl.call({props:e},e,t)}a(Al,"EntryRatHtml");function Sl(e,t){const n=e.entry,o=ve(()=>b.value),l=ve(()=>se.value),c=n.kind==="file"?`${T.date(n.lastModified)} · ${T.bytes(n.size)}`:"folder",i=v(()=>O.value?.name===n.name&&!O.value?.path);function r(d){d.key!=="Enter"||Rn()||(d.preventDefault(),le(n))}return a(r,"onkeydown"),s`
    <data-item>
      <div.row class:selected=${()=>i.value}>
        <button.entry type="button" aria-pressed=${()=>ie(i.value)} onclick=${h(()=>Oo(n))} ondblclick=${h(()=>le(n))} onkeydown=${h(r)}>
          <${Tt} ...${{get entry(){return n},get at(){return o},get from(){return l}}} />
          <span.text><span.name>${()=>n.name}</span><small>${()=>c}</small></span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${h(()=>Hn(n))} />
      </div>
    </data-item>
  `}a(Sl,"$$EntryRatHtml");function Ol(e,t){return El.call({props:e},e,t)}a(Ol,"PasteBarRatHtml");function El(e,t){const n=v(()=>M.value?.mode==="move"),o=a(l=>l.length===1?l.at(0).name:`${l.length} items`,"describe");return s`
    ${p(()=>M.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>n.value?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>o(M.value.items)}</span>
            <small>${()=>n.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${h(Fo)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the pickboard" onclick=${h(wn)} />
        </div-x>
      `)}
  `}a(El,"$$PasteBarRatHtml");function Hl(e,t){return Dl.call({props:e},e,t)}a(Hl,"TabsRatHtml");function Dl(e,t){return s`
    <div-x.tabs role="tablist" scrollable>
      ${Jn(()=>C.value,(n,o)=>s`
          <div.tab class:active=${()=>o.value===z.value}>
            <button type="button" role="tab" aria-selected=${()=>ie(o.value===z.value)} onclick=${h(()=>To(o.value))}>${()=>zt(n)}</button>
            ${p(()=>C.value.length>1,()=>s`<btn-icon icon="lucide:x" label=${()=>"close "+zt(n)} onclick=${h(()=>xo(o.value))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${h(()=>An())} />
    </div-x>
  `}a(Dl,"$$TabsRatHtml");function Fl(e,t){return Nl.call({props:e},e,t)}a(Fl,"LibraryRatHtml");function Nl(e,t){const n=v(()=>!!Je()),o=v(()=>D.value.viewmode==="grid"),l=a(d=>V(d.detail.path.split("/").filter(Boolean)),"crumb"),c=a(d=>fe.value=d,"search"),i=a(()=>kn("viewmode",o.value?"list":"grid"),"toggleView");function r(){b.value.length?V(b.value.slice(0,-1)):RAT.app.router.go("/")}return a(r,"up"),s`
    ${p(()=>!n.value,()=>s`<${L} title="Library" /><div.scroll><${Ln} /></div>`,()=>s`
        <${L} ...${{get title(){return b.value.at(-1)??ye()},get back(){return r}}}><btn-icon icon=${()=>o.value?"lucide:list":"lucide:layout-grid"} label=${()=>o.value?"show as list":"show as grid"} onclick=${h(i)} /></${L}>
        <nav-crumbs root=${()=>ye()} path=${()=>"/"+b.value.join("/")} onnav-crumbs=${h(l)} />
        <div.pane>
          <div.listing>
            ${p(()=>st.value,()=>s`<svg-icon icon="lucide:loader" />`,()=>p(()=>Ct.value.length,()=>s`
                  <data-index viewmode=${()=>D.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${g(()=>Ct.value,d=>d,d=>s`<${Al} ...${{get entry(){return d}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>fe.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${h(Dn)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${Ol} />
        <${Cn} placeholder="Filter this folder" ...${{get value(){return fe.value},onsearch:c}} />
        <${Hl} />
      `)}
  `}a(Nl,"$$LibraryRatHtml");const jl=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function Ml(e,t){return zl.call({props:e},e,t)}a(Ml,"BrandRatHtml");function zl(e,t){return pt("1npwj96",jl),s`
    <div.brand data-rat="1npwj96">
      ${p(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(zl,"$$BrandRatHtml");function Cl(e,t){return Ll.call({props:e},e,t)}a(Cl,"MenuRatHtml");function Ll(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:l}=Re(RAT.app.router,{$path:null});function c(i){RAT.app.router.go(i);const r=RAT.app.area("menu");r?.isOverlay&&r.hide()}return a(c,"go"),s`
    <nav.menu>
      <${Ml} name="Files" icon="./app.svg" />
      ${g(()=>n,i=>i,i=>s`<button type="button" aria-current=${()=>ie(l.value===i.route?"page":null)} onclick=${h(()=>c(i.route))}><svg-icon icon=${()=>i.icon} /> ${()=>i.label}</button>`)}
      <hr />
      ${g(()=>o,i=>i,i=>s`<button type="button" disabled><svg-icon icon=${()=>i.icon} /> ${()=>i.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${h(()=>RAT.app.toggle("config",!0))}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(Ll,"$$MenuRatHtml");function Pl(e,t){return Il.call({props:e},e,t)}a(Pl,"PreferencesRatHtml");function Il(e,t){const n={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},o={"pattern-bg":"Background","pattern-tile":"Tiles"},l=a(c=>i=>kn(c,i.target.value),"change");return s`
    <section>
      <h3>files</h3>
      ${g(()=>Object.entries(n),c=>c,([c,{label:i,values:r}])=>s`
          <label>
            <span>${()=>i}</span>
            <input-value look="segments" value=${()=>D.value[c]} onchange=${h(l(c))}>
              ${g(()=>Object.entries(r),d=>d,([d,m])=>s`<input-option value=${()=>d}>${()=>m}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${g(()=>Object.entries(o),c=>c,([c,i])=>s`
          <label>
            <span>${()=>i}</span>
            <input-pattern opacity value=${()=>D.value[c]} onchange=${h(l(c))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${p(()=>A.value,()=>s`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>A.value.name}</p>
          <div-x.actions>
            <${y} icon="lucide:folder-sync" label="change" ...${{onclick:Pe}} />
            <${y} icon="lucide:x" label="close" ...${{onclick:jo}} />
          </div-x>
        `,()=>s`<${y} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Pe}} />`)}
    </section>
  `}a(Il,"$$PreferencesRatHtml");function Bl(e,t){return Ul.call({props:e},e,t)}a(Bl,"PreviewRatHtml");function Ul(e,t){let n=$(null);function o(i){let r=null,d=!0;return ht(Te(i.source),i.path,i.name).then(m=>{d&&(r=URL.createObjectURL(m),n.value=r)}),()=>{d=!1,r&&URL.revokeObjectURL(r)}}a(o,"show"),F(()=>{if(pe.value=null,n.value=null,R.value&&dt(R.value))return o(R.value)});const l=a(i=>pe.value={height:i.target.naturalHeight,width:i.target.naturalWidth},"loaded");function c(){O.value=null,RAT.app.toggle("context")}return a(c,"info"),s`
    ${p(()=>!R.value,()=>s`
        <${L} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>s`
        <${L} ...${{get title(){return R.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${h(c)} /></${L}>
        <div.stage>
          ${p(()=>dt(R.value),()=>s`
              ${p(()=>n.value,()=>s`<img src=${()=>n.value} alt=${()=>R.value.name} onload=${h(l)} />`)}
            `,()=>s`<svg-icon icon=${()=>On(R.value)} />`)}
        </div>
      `)}
  `}a(Ul,"$$PreviewRatHtml");const Pn=`appearance:${new URL(".",location.href).pathname}`,Ut={density:Z.densities,geometry:Z.geometries,mode:Z.modes},ke=B(Pn,{}),ql=a(()=>Z.palettes().catch(()=>[]),"palettes");function Wl(e,t){return ke[e]=t||null,U(Pn,ke),Z.set({[e]:t||null})}a(Wl,"setAppearance");Object.keys(ke).length&&Z.set(ke);const Vl=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function qt(e,t){return Gl.call({props:e},e,t)}a(qt,"SettingsRatHtml");function Gl(e,t){pt("177zzh1",Vl);let n=$({...ke}),o=$([]);const l=v(()=>Se.value);ql().then(r=>{o.value=r});function c(r,d){const m=d.detail?.value??d.target.value;n.value={...n.value,[r]:m},Wl(r,m)}a(c,"change");async function i(){await qo()&&Be.success(`${e.name??"the app"} is installed`)}return a(i,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${h(r=>c("palette",r))}>
            ${g(()=>o.value,r=>r,r=>s`<input-option value=${()=>r}>${()=>r}</input-option>`)}
          </input-value>
        </label>
        ${g(()=>Object.keys(Ut),r=>r,r=>s`
            <label>
              <span>${()=>r}</span>
              <input-value look="segments" value=${()=>n.value[r]??""} onchange=${h(d=>c(r,d))}>
                ${g(()=>Ut[r],d=>d,d=>s`<input-option value=${()=>d}>${()=>d}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${p(()=>!jn,()=>s`
          <section>
            <h3>install</h3>
            ${p(()=>l.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(i)} />`,()=>s`
                ${p(()=>Uo,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(Gl,"$$SettingsRatHtml");function _l(e,t){return Jl.call({props:e},e,t)}a(_l,"SyncRatHtml");function Jl(e,t){let n=$(null),o=$(""),l=$("https"),c=$(""),i=$("");const r=v(()=>it.value.map(Za)),d=v(()=>ne.value.filter(f=>!r.value.some(G=>Le(G,f)))),m=v(()=>n.value??Xa(o.value,l.value)),N=v(()=>S.value.reduce((f,G)=>f+Math.max(0,G.size),0)),k=v(()=>ge.value??{}),j=a(f=>!!m.value&&Le(m.value,f),"isChosen"),u=a(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf");function w(f){n.value=f,o.value=""}a(w,"choose");function E(f){o.value=f.target.value,n.value=null}a(E,"type");function ce(f){l.value=f.target.value,n.value&&(n.value={...n.value,protocol:l.value})}a(ce,"protocol");function Oe(f){return f.name?f.name:f.tree?"chosen":"none yet"}a(Oe,"folderOf");function ue(f){return f.enabled?f.lastSync?`on · last ${T.date(f.lastSync)}`:"on":"off"}a(ue,"stateOf");const At=a((f,G)=>f.length?`send ${f.length} · ${T.bytes(G)}`:"send","sendLabel");function St(f,G,In){return s`
      <li.row class:selected=${()=>j(f)}>
        <button.entry type="button" aria-pressed=${()=>ie(j(f))} onclick=${h(()=>w(f))}>
          <span.thumb><svg-icon icon=${()=>G} /></span>
          <span.text>
            <span.name>${()=>Ce(f)}</span>
            <small>${()=>f.host}:${()=>f.port} · ${()=>f.protocol}</small>
          </span>
        </button>
        ${p(()=>In,()=>s`<btn-icon icon="lucide:x" label=${()=>"forget "+Ce(f)} onclick=${h(()=>to(f))} />`)}
      </li>
    `}return a(St,"receiver"),s`
    ${p(()=>!hn(),()=>s`
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
          ${p(()=>rt.value,()=>s`<small.identity>${()=>rt.value.alias}</small>`)}
        </${L}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${h($n)} />
            </div-x>
            ${p(()=>r.value.length||d.value.length,()=>s`
                <ul.rows>
                  ${g(()=>r.value,f=>f,f=>s`${()=>St(f,u(f),!1)}`)}
                  ${g(()=>d.value,f=>f,f=>s`${()=>St(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>s`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>o.value} oninput=${h(E)} />
              <input-value look="segments" value=${()=>m.value?.protocol??l.value} onchange=${h(ce)}>
                ${g(()=>vn,f=>f,f=>s`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" ref=${Et(c,"value")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${p(()=>S.value.length,()=>s`
                <ul.rows>
                  ${g(()=>S.value,f=>f,f=>s`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>f.size>=0?T.bytes(f.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${h(()=>lo(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${y} icon="lucide:file-plus" label="pick files" ...${{onclick:ao}} />
              <button.action.primary type="button" disabled=${()=>!S.value.length||!m.value} onclick=${h(()=>ro(m.value,S.value,c.value))}><svg-icon icon="lucide:send" /> ${()=>At(S.value,N.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${Ke} ...${{get rows(){return{folder:Oe(k.value),state:ue(k.value),to:k.value.enabled&&`${k.value.host}:${k.value.port}`}}}} />
            ${p(()=>!k.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Et(i,"value")} />`)}
            <div-x.actions>
              <${y} icon="lucide:folder-search" label="folder" ...${{onclick:so}} />
              ${p(()=>k.value.enabled,()=>s`
                  <${y} icon="lucide:refresh-cw" label="now" ...${{onclick:fo}} />
                  <${y} icon="lucide:pause" label="turn off" ...${{onclick:uo}} />
                `,()=>s`<${y} icon="lucide:play" label="turn on" ...${{get disabled(){return!k.value.tree||!m.value},onclick:a(()=>co(m.value,{pin:c.value,ssid:i.value}),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(Jl,"$$SyncRatHtml");function li(e,t){return Yl.call({props:e},e,t)}a(li,"AppRatHtml");function Yl(e,t){RAT.app.on("error",Be.error),RAT.app.hold(ia()),Wo("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&$n(),l!=="/sync"&&n&&no(),n=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${Cl} /></rat-area>
    <rat-view name="dashboard" route="/"><${xl} /></rat-view>
    <rat-view name|route="library"><${Fl} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${Bl} /></rat-view>
    <rat-view name|route="sync"><${_l} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${h(a(l=>{l.detail?.open||(oe.value=null)},"ontoggle"))}><div.context><${pl} /></div></rat-area>
    <rat-area name="config" dock="end"><${qt} name="Files"><${Pl} /></${qt}></rat-area>
  `}a(Yl,"$$AppRatHtml");export{li as default};
