const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-kSVZxx04.js","./index-LJN-aEqT.css"])))=>i.map(i=>d[i]);
var Un=Object.defineProperty;var a=(e,t)=>Un(e,"name",{value:t,configurable:!0});import{E as qn,G as Et,P as Wn,n as y,H as V,J as v,_ as _n,h as s,f as w,K as H,w as h,L as Gn,M as it,O as Z}from"./index-kSVZxx04.js";import{p as Vn,a as Yn}from"./keys-CWTtq0D5.js";import{d as Kn}from"./drivers-CLGto_fz.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function m(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const l=t?Vn(t):null;let c=o;return function(i){if(!(o&&!c)&&!(l&&!Yn(i,l))){n&&i.preventDefault(),o&&c--;try{const r=(typeof e=="string"?qn(e):e).call(this,i);typeof r?.catch=="function"&&r.catch(d=>Et(this,d))}catch(r){Et(this,r)}}}}a(m,"listener");function se(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(se,"read$1");function Y(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(Y,"write$1");const ke=a(e=>(t,n)=>Wn.notify(t,{...n,type:e}),"notify"),D=Object.assign(ke("info"),{error:ke("error"),info:ke("info"),success:ke("success")}),Jn=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function C(e,t=[]){let n=e;for(const o of t)n=await n.getDirectoryHandle(o);return n}a(C,"dirAt");async function Qn(e,t=[]){const n=await C(e,t),o=[];for await(const c of n.values())o.push(c);return(await Promise.all(o.map(async c=>{if(c.kind==="directory")return{kind:"directory",name:c.name};const i=await c.peekFile?.()??await c.getFile();return{kind:"file",lastModified:i.lastModified,name:c.name,size:i.size,type:i.type}}))).sort(Jn)}a(Qn,"list$1");async function st(e,t,n){return(await(await C(e,t)).getFileHandle(n)).getFile()}a(st,"readFile");async function Xn(e,t,n){await(await C(e,t)).getDirectoryHandle(n,{create:!0})}a(Xn,"mkdir");async function Zn(e,t,n){await(await C(e,t)).removeEntry(n,{recursive:!0})}a(Zn,"remove$3");async function ea(e,t,n,o,l){const c=await C(e,t),i=l==="directory"?await c.getDirectoryHandle(n):await c.getFileHandle(n);if(typeof i.move=="function")try{await i.move(o);return}catch{}l==="directory"?await ct(i,c,o):await rt(i,c,o),await c.removeEntry(n,{recursive:!0})}a(ea,"rename");async function rt(e,t,n,o){const l=await e.getFile(),i=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(i instanceof WritableStream)){await i.write(await l.arrayBuffer()),await i.close();return}try{await l.stream().pipeTo(i,{signal:o})}catch(r){throw await i.abort?.().catch(()=>{}),r}}a(rt,"copyFile");async function ct(e,t,n,o,l=()=>{}){const c=await t.getDirectoryHandle(n,{create:!0});for await(const i of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");i.kind==="directory"?await ct(i,c,i.name,o,l):(await rt(i,c,i.name,o),l())}}a(ct,"copyTree");const ut="root",T=y(null),te=y(null),Vt=y(!1),dt=a(()=>RAT.app.database.root,"table");let ta=null;const Yt=a(async()=>ta??=await Kn("folders"),"folders"),Kt=a(async(e,t,n)=>{try{return e[t]?await e[t]({mode:n}):"granted"}catch{return"denied"}},"ask"),Jt=a(()=>RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function","supported");async function na(){const e=await dt().get(ut);if(e){const t=(await Yt()).revive(e.handle);T.value={addedAt:e.addedAt,handle:t,name:e.name},te.value=await Kt(t,"queryPermission","read")}Vt.value=!0}a(na,"load$1");async function aa(){const{keep:e,pick:t}=await Yt(),n=await t({id:"files"});if(!n)return null;const o={addedAt:Date.now(),handle:e(n),name:n.name};return await dt().set(ut,o),T.value={addedAt:o.addedAt,handle:n,name:o.name},te.value="granted",T.value}a(aa,"grant");async function oa(){const e=T.value?.handle;return e?(te.value=await Kt(e,"requestPermission","read"),{granted:te.value==="granted"}):{granted:!1}}a(oa,"reconnect$1");async function la(){await dt().delete(ut),T.value=null,te.value=null}a(la,"forget$2");const pt=a((e,t)=>{const n=y(se(e,t));return V(()=>Y(e,n.value)),n},"stored$2"),Se=pt("files:bookmarks",[]),Ke=pt("files:folderTyped",{}),Je=pt("files:folderTypes",[]),Qt=[{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:film",id:"video",label:"Videos"}],Me=a(()=>T.value?.addedAt??T.value?.name??"","folderId"),Qe=a(e=>`${Me()}:${e.join("/")}`,"keyOf"),Xt=a((e,t)=>e.join("/")===t.join("/"),"samePath$1"),Zt=a(()=>[...Qt,...Je.value],"types");function ft(e){const t=Ke.value[Qe(e)];return t?Zt().find(n=>n.id===t)??null:null}a(ft,"typeOf");function Xe(e,t){const n={...Ke.value};t?n[Qe(e)]=t:delete n[Qe(e)],Ke.value=n}a(Xe,"setType");function ia({icon:e="lucide:folder",label:t}){const n=`custom-${Date.now().toString(36)}`;return Je.value=[...Je.value,{icon:e,id:n,label:t}],n}a(ia,"addType");function sa(e,t){const n=e.filter(i=>i.kind==="file"),o={};for(const i of n)o[t(i)]=(o[t(i)]??0)+1;const[l,c]=Object.entries(o).sort((i,r)=>r[1]-i[1])[0]??[];return l&&c/n.length>=.6?Qt.find(i=>i.id===l)??null:null}a(sa,"suggest");const en=a(()=>Se.value.filter(e=>e.folder===Me()),"bookmarks"),tn=a(e=>en().some(t=>Xt(t.path,e)),"isBookmarked");function ra(e,t){Se.value=tn(e)?Se.value.filter(n=>!(n.folder===Me()&&Xt(n.path,e))):[...Se.value,{folder:Me(),name:t,path:e}]}a(ra,"toggleBookmark");const ca=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ua(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(ua,"toBase64");const da=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),pa=new Set([101,204,205,304]);async function fa(e,{body:t,headers:n={},method:o="GET",signal:l,timeout:c}={}){const i=ca();if(!i)return fetch(e,{body:t,headers:n,method:o,signal:l});const r=await i.request({body:await ua(t),headers:n,method:o,timeout:c,url:e});return new Response(pa.has(r.status)?null:da(r.data),{headers:r.headers,status:r.status,statusText:r.statusText})}a(fa,"request$2");const ha=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),va=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),nn=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),X=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function an(e,t="",n=!1){const o=new URL(va(t),nn(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(an,"urlFor");const ma={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class _e extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function re(e,t,{body:n,headers:o={},isDir:l=!1,method:c="GET"}={}){if(!e)throw new Error("No webdav connection.");let i;try{i=await fa(an(e,t,l),{body:n,headers:{Authorization:ha(e),...o},method:c})}catch(r){throw globalThis.Capacitor?.isNativePlatform?.()?new _e(0,`Connection failed: ${r?.message??r}`):new _e(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!i.ok)throw new _e(i.status,ma[i.status]??`${i.status} ${i.statusText}`);return i}a(re,"request$1");const $a='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',Ze="DAV:",xe=a((e,t)=>e.getElementsByTagNameNS(Ze,t)[0]?.textContent??"","firstText");async function on(e,t,n){const o=await re(e,t,{body:$a,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await o.text(),"application/xml"),c=new URL(nn(e)).pathname,i=a(r=>{const d=decodeURIComponent(new URL(r,e.url).pathname);return(d.startsWith(c)?d.slice(c.length):d).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS(Ze,"response")].map(r=>{const d=i(xe(r,"href"));return{isDir:r.getElementsByTagNameNS(Ze,"collection").length>0,lastModified:Date.parse(xe(r,"getlastmodified"))||0,mime:xe(r,"getcontenttype"),name:d.split("/").pop(),path:d,size:Number(xe(r,"getcontentlength"))||0}})}a(on,"propfind");async function ln(e,t=""){const n=X(t);return(await on(e,t,1)).filter(l=>l.path!==n).sort((l,c)=>l.isDir===c.isDir?l.name.localeCompare(c.name,void 0,{numeric:!0}):l.isDir?-1:1)}a(ln,"list");async function Ge(e,t){try{return(await on(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(Ge,"stat");const ba=a(async(e,t)=>(await re(e,t)).blob(),"read"),sn=a((e,t,n)=>re(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),ga=a((e,t)=>re(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),wa=a((e,t,n=!1)=>re(e,t,{isDir:n,method:"DELETE"}),"remove$2"),ya=a((e,t,n)=>({Destination:an(e,t,n),Overwrite:"F"}),"destination"),rn=a((e,t,n,o=!1)=>re(e,t,{headers:ya(e,n,o),isDir:o,method:"MOVE"}),"move"),ka=a(e=>ln(e,""),"test"),Ve=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),Ot=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class Be{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof Be&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class Ht extends Be{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,l=null){super(t,n,o),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await ba(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await sn(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=X(t.path,n);await rn(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ee extends Be{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await ln(this.connection,this.path))yield[t.name,t.isDir?new ee(this.connection,t.path,t.name):new Ht(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=X(this.path,t),l=await Ge(this.connection,o);if(l&&!l.isDir)throw Ot(t);if(!l){if(!n)throw Ve(t);await ga(this.connection,o)}return new ee(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=X(this.path,t),l=await Ge(this.connection,o);if(l?.isDir)throw Ot(t);if(!l){if(!n)throw Ve(t);await sn(this.connection,o,new Blob([]))}return new Ht(this.connection,o,t,l)}async removeEntry(t){const n=X(this.path,t),o=await Ge(this.connection,n);if(!o)throw Ve(t);await wa(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ee)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=X(t.path,n);await rn(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const xa=a(e=>new ee(e,"",e.name||new URL(e.url).host),"davRoot"),cn="remotes.json",Ae=new Map,L=y([]);async function Ra(){L.value=await RAT.app.files.read(cn,"json").catch(()=>[])}a(Ra,"load");const un=a(()=>RAT.app.files.write(cn,JSON.stringify(L.value)),"persist$1"),dn=a(e=>L.value.find(t=>t.id===e)??null,"byId");async function Ta({name:e,password:t="",url:n,username:o=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const c={id:`dav-${Date.now().toString(36)}`,name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(o).trim()};return await ka(c),L.value=[...L.value,c],await un(),c}a(Ta,"add$1");async function Sa(e){L.value=L.value.filter(t=>t.id!==e),Ae.delete(e),await un()}a(Sa,"remove$1");function Aa(e){const t=dn(e);return t?(Ae.has(e)||Ae.set(e,xa(t)),Ae.get(e)):null}a(Aa,"rootOf");const pn=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Ea=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Oa=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,Ha=a(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function ht({name:e,type:t=""}){const n=Ha(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||Ea.test(n)?"documents":Oa.test(n)?"archives":"other"}a(ht,"categoryOf$1");const B=y(null),_=y(null),Da=24,Ma=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),vt=a(e=>`index/${e.addedAt??e.name}.json`,"pathOf");let pe=null;async function fn(e,t,n,o){const l=[],c=[];for await(const i of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");Ma(i.name)||(i.kind==="directory"?l.push(i):c.push(Promise.resolve(i.peekFile?.()??i.getFile()).then(r=>({lastModified:r.lastModified,name:i.name,path:t,size:r.size,type:r.type}),()=>null)))}for(const i of await Promise.all(c))i&&n.push(i);_.value={files:n.length};for(const i of l)await fn(i,[...t,i.name],n,o)}a(fn,"walk");function Na(e){const t=Object.fromEntries(pn.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const c=t[ht(l)];c.count++,c.size+=l.size,n+=l.size}const o=e.toSorted((l,c)=>c.lastModified-l.lastModified).slice(0,Da);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(Na,"summarize");async function hn(e){if(!e)return B.value=null,null;const t=await RAT.app.files.read(vt(e),"json").catch(()=>null);return B.value=t,t}a(hn,"restore");async function vn(e,t){pe?.abort();const n=new AbortController;pe=n;const o=[];_.value={files:0};try{await fn(e,[],o,n.signal);const l=Na(o);return B.value=l,await RAT.app.files.write(vt(t),JSON.stringify(l)),l}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{pe===n&&(pe=null,_.value=null)}}a(vn,"scan");const mt=a(()=>pe?.abort(),"stop$1");async function mn(e){mt(),B.value=null,e&&await RAT.app.files.remove(vt(e)).catch(()=>{})}a(mn,"forget$1");function $n(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const l of B.value?.files??[])if(l.name.toLowerCase().includes(n)&&o.push(l),o.length>=t)break;return o}a($n,"search");const Fa=Object.freeze(Object.defineProperty({__proto__:null,CATEGORIES:pn,categoryOf:ht,forget:mn,index:B,restore:hn,scan:vn,scanning:_,search:$n,stop:mt},Symbol.toStringTag,{value:"Module"})),Pa=50,$t="files:tasks",M=y([]),fe=y(se($t,[])),ja=v(()=>M.value.some(e=>e.state==="running")),bt=new Map,Dt=new Map;let za=0;function Mt(e,t){M.value=M.peek().map(n=>n.id===e?{...n,...t}:n)}a(Mt,"patch");function Ye(e,t){const n={...M.peek().find(o=>o.id===e),...t,endedAt:Date.now()};M.value=M.peek().filter(o=>o.id!==e),fe.value=[n,...fe.peek()].slice(0,Pa),bt.delete(e),Y($t,fe.peek())}a(Ye,"finish");function Ie({icon:e="lucide:loader",label:t,lane:n="default"},o){const l=`task-${Date.now().toString(36)}-${++za}`,c=new AbortController;bt.set(l,c),M.value=[...M.peek(),{error:null,icon:e,id:l,label:t,lane:n,progress:null,queuedAt:Date.now(),state:"queued"}];const i=(Dt.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{if(c.signal.aborted)return Ye(l,{state:"cancelled"}),null;Mt(l,{startedAt:Date.now(),state:"running"});const r=a((d,p)=>Mt(l,{progress:{done:d,total:p}}),"progress");try{const d=await o({progress:r,signal:c.signal});return Ye(l,{state:c.signal.aborted?"cancelled":"done"}),d}catch(d){throw Ye(l,d?.name==="AbortError"?{state:"cancelled"}:{error:String(d?.message??d),state:"failed"}),d}});return Dt.set(n,i),i}a(Ie,"run");const Ca=a(e=>bt.get(e)?.abort(),"cancel");function La(){fe.value=[],Y($t,[])}a(La,"clearHistory");const j=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),bn=a(()=>!!j(),"available$1"),gn=["https","http"],Nt=53317,wn="files:sync",et=se(wn,{}),tt=y([]),ne=y(Array.isArray(et.targets)?et.targets:[]),z=y([]),nt=y(null),me=y(null);let Ne=et.folderName??"";const gt=a(()=>Y(wn,{folderName:Ne,targets:ne.value}),"persist");function Ba(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const c=new URL(n.replace(/^filesync:\/\//,"http://")),i=c.searchParams.get("protocol");return{fingerprint:c.searchParams.get("fingerprint")??"",host:c.hostname,port:Number(c.port)||Nt,protocol:gn.includes(i)?i:t}}catch{return null}const[o,l]=n.split(":");return{fingerprint:"",host:o,port:Number(l)||Nt,protocol:t}}a(Ba,"parseTarget");const Ft=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),yn=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget");function Ia(e){const t=ne.value.filter(n=>!yn(n,e));ne.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),gt()}a(Ia,"remember");function Ua(e){ne.value=ne.value.filter(t=>!yn(t,e)),gt()}a(Ua,"forget");let Pt=!1;async function kn(){const e=j();e&&(Pt||(Pt=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;tt.value=[t,...tt.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),nt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await wt())}a(kn,"start");const qa=a(()=>j()?.stopDiscovery().catch(()=>{}),"stop");function xn(e){const t=new Set(z.value.map(n=>n.uri));z.value=[...z.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(xn,"add");async function Wa(){const{files:e=[]}=await j().pickFiles();xn(e)}a(Wa,"pickFiles");async function _a(e,t,n){const o=await(await C(e,t)).getFileHandle(n.name),l=o._uri??(o.path?`file://${o.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");xn([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}a(_a,"addEntry");const Ga=a(e=>{z.value=z.value.filter(t=>t.uri!==e)},"remove"),Va=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Ya(e,t=z.value,n=""){const o=j();if(!o||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return Ie({icon:"lucide:send",label:`Send ${l} to ${Ft(e)}`,lane:"send"},async({progress:c})=>{const i=await o.addListener("progress",r=>c(r.sent,r.total));try{const r=a(d=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:d,port:e.port,protocol:e.protocol}),"attempt");try{await r(n)}catch(d){if(!Va(d))throw d;const p=await RAT.app.dialogs.prompt({message:`${Ft(e)} wants a pin`,ok:"Send",title:"Pin"});if(!p)throw new Error("no pin given");await r(p)}Ia(e),z.value=z.value.filter(d=>!t.includes(d))}finally{i.remove()}})}a(Ya,"send");async function wt(){const e=await j()?.getAutoSyncState().catch(()=>null)??null;me.value=e&&{...e,name:e.tree?Ne:""}}a(wt,"refreshAutoSync");async function Ka(){const{name:e,uri:t}=await j().pickFolder();t&&(Ne=e??"",me.value={...me.value,name:Ne,tree:t},gt())}a(Ka,"pickSyncFolder");async function Ja(e,{pin:t="",ssid:n=""}={}){const o=me.value?.tree;if(!o)throw new Error("pick a folder first");await j().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await wt()}a(Ja,"startAutoSync");async function Qa(){await j().stopAutoSync(),await wt()}a(Qa,"stopAutoSync");const Xa=a(()=>j()?.syncNow(),"syncNow"),I=y(null),yt=a((e,t)=>e.join("/")===t.join("/"),"samePath"),Za=a((e,t)=>e.length>=t.length&&yt(e.slice(0,t.length),t),"isInside");function eo(e,t,n,o){const l={kind:t.kind,name:t.name,path:t.path??n,root:o},c=I.value,i=c?.mode===e&&!c.pasted?c.items.filter(r=>!(r.name===l.name&&yt(r.path,l.path))):[];I.value={items:[...i,l],mode:e}}a(eo,"pick$1");const to=a(()=>{I.value&&(I.value={...I.value,pasted:!0})},"pasted"),Rn=a(()=>{I.value=null},"clear");async function jt(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(jt,"exists");async function no(e,t,n){if(!await jt(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,l=o>0?t.slice(0,o):t,c=o>0?t.slice(o):"";for(let i=2;;i++){const r=`${l} (${i})${c}`;if(!await jt(e,r))return r}}a(no,"freeName");async function Ee(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await Ee(n);return t}a(Ee,"countFiles");const ao=a(async(e,t)=>{const n=await C(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)},"handleOf");async function oo(e,t,n,o,{onProgress:l=a(()=>{},"onProgress"),signal:c}={}){for(const $ of t)if($.kind==="directory"&&Za(o,[...$.path,$.name]))throw new Error(`“${$.name}” can not go into itself`);const i=await C(e,o),r=await Promise.all(t.map($=>ao($.root??e,$))),d=(await Promise.all(r.map(Ee))).reduce(($,x)=>$+x,0);let p=0;const b=a(()=>l(++p,d),"onFile");l(0,d);for(const[$,x]of t.entries()){if(c?.aborted)throw new DOMException("transfer aborted","AbortError");const g=r[$],u=await C(x.root??e,x.path);if(n==="move"&&yt(x.path,o)){p+=await Ee(g),l(p,d);continue}const O=await no(i,x.name,x.kind);if(n==="move"&&typeof g.move=="function")try{await g.move(i,O),p+=await Ee(g),l(p,d);continue}catch{}x.kind==="directory"?await ct(g,i,O,c,b):(await rt(g,i,O,c),b()),n==="move"&&await u.removeEntry(x.name,{recursive:!0})}}a(oo,"transfer");const{CATEGORIES:kt,categoryOf:Fe}=Fa,G=a(()=>RAT.app.dialogs,"dialogs"),ce=a(e=>RAT.app.area(e),"area"),ae=a(e=>RAT.app.router.go(e),"go"),q=a((e,t)=>{const n=y(se(`files:${e}`,t));return V(()=>Y(`files:${e}`,n.value)),n},"stored"),E={open:q("open","auto"),"pattern-bg":q("pattern-bg",""),"pattern-tile":q("pattern-tile",""),searchbar:q("searchbar","bottom"),tabbar:q("tabbar","bottom"),viewmode:q("viewmode","list")},lo=["pattern-bg","pattern-tile"];V(()=>{const e=document.documentElement;for(const t of lo){const n=E[t].value;e.toggleAttribute(`data-${t}`,!!n),n&&_n(async()=>{const{patternStyle:o}=await import("./index-kSVZxx04.js").then(l=>l.Q);return{patternStyle:o}},__vite__mapDeps([0,1]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||E[t].peek()!==n))for(const[l,c]of Object.entries(o))e.style.setProperty(l,c)})}});const io=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Tn=a(()=>E.open.value==="single"||E.open.value==="auto"&&io(),"opensOnTap"),oe=y([]),at=y(!1),W=y(""),Oe=y(""),He=y(null),A=y(null),Pe=y(null),ge=y(null),he=y(null),je=q("tabs",{index:0,list:[{path:[]}]}),P=v(()=>je.value.list?.length?je.value.list:[{path:[]}]),N=v(()=>Math.min(Math.max(0,je.value.index??0),P.value.length-1)),S=v(()=>P.value[N.value].path),ue=v(()=>P.value[N.value].source??null),Sn=new Map,An=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function K(e,t=N.value){je.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}a(K,"setTabs");function U(e,t){K(P.value.map((n,o)=>o===N.value?{path:e,source:t===void 0?n.source??null:t}:n)),A.value=null,W.value=""}a(U,"goTo");function En(e=S.value,t=ue.value){const n=[...P.value,{path:e,source:t}];K(n,n.length-1),A.value=null}a(En,"openTab");function so(e){if(P.value.length===1)return U([]);K(P.value.filter((t,n)=>n!==e),e<N.value?N.value-1:N.value)}a(so,"closeTab");function ro(e){Sn.set(N.value,An()?.scrollTop??0),K(P.value,e),A.value=null}a(ro,"switchTab");const zt=a(e=>e.path.at(-1)??Ue(e.source??null),"tabName"),de=a(()=>te.value==="granted"?T.value?.handle??null:null,"localRoot"),we=a(e=>e?Aa(e):de(),"rootOfSource"),Ue=a(e=>e?dn(e)?.name??"remote":T.value?.name??"folder","sourceName"),qe=a(()=>we(ue.value),"rootHandle"),$e=a(()=>Ue(ue.value),"folderName"),le=a(e=>e.source!==void 0?e.source:e.path?null:ue.value,"sourceOf");let Re=0;V(()=>{const e=qe(),t=S.value,n=++Re;oe.value=[],at.value=!!e,e&&Qn(e,t).then(o=>{n===Re&&(oe.value=o,requestAnimationFrame(()=>{const l=An();l&&(l.scrollTop=Sn.get(N.peek())??0)}))}).catch(o=>{n===Re&&D.error(o)}).finally(()=>{n===Re&&(at.value=!1)})});let ot=null;V(()=>{const e=de(),t=T.value;!e||!t||ot===t||(ot=t,hn(t).then(()=>On(e,t)))});function On(e,t){return Ie({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>mt());const l=V(()=>{const c=_.value;c&&n(c.files,null)});return vn(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}a(On,"indexFolder");const co=a(()=>{const e=de();e&&On(e,T.value)},"rescan"),Ct=v(()=>{const e=W.value.trim().toLowerCase();return e?oe.value.filter(t=>t.name.toLowerCase().includes(e)):oe.value}),lt=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Hn=a((e,t)=>e.kind==="directory"?t&&ft([...t,e.name])?.icon||"lucide:folder":kt.find(n=>n.id===Fe(e))?.icon??"lucide:file","iconOf");function ie(e,t=S.value){if(e.kind==="directory")return U([...t,e.name]),ae("/library");Pe.value={...e,kind:"file",path:e.path??t,source:le(e)},ae("/preview")}a(ie,"open");function Lt(e){U(e.path??[],le(e)),ae("/library")}a(Lt,"showInFolder");function uo(e){if(Tn())return ie(e);A.value=e}a(uo,"onEntryClick");function Dn(e){ge.value=null,A.value=e,ce("context")?.show()}a(Dn,"about");function po(){A.value=null,ge.value="tasks",ce("context")?.show()}a(po,"openTasks");async function We(){const e=qe();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(D.error("No permission to change this folder"),null)}a(We,"writable");function xt(e,t,n){const o=a(()=>t.join("/")===S.value.join("/"),"same");Ie({...e,lane:"write"},n).then(()=>{o()&&U([...t])}).catch(D.error)}a(xt,"writeTask");async function Mn(){const e=await G().prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await We();if(!t)return;const n=S.value;xt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>Xn(t,n,e))}a(Mn,"newFolder");async function fo(e){const t=await G().prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await We();if(!n)return;const o=e.path??S.value;A.value=null,xt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>ea(n,o,e.name,t,e.kind))}a(fo,"renameEntry");async function ho(e){if(!await G().confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await We();if(!t)return;const n=e.path??S.value;A.value=null,ce("context")?.hide(),xt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Zn(t,n,e.name))}a(ho,"deleteEntry");function Bt(e,t){eo(e,t,t.path??S.value,we(le(t))),ce("context")?.hide()}a(Bt,"pick");async function vo(){const e=I.value;if(!e)return;const t=await We();if(!t)return;const n=[...S.value],o=e.items.length,l=o===1?e.items[0].name:`${o} items`,c=e.mode==="move"?"Move":"Copy";e.mode==="move"?Rn():to();const i=a(()=>{n.join("/")===S.value.join("/")&&U([...n])},"done");Ie({icon:e.mode==="move"?"lucide:scissors":"lucide:copy",label:`${c} ${l} to /${n.join("/")}`,lane:"write"},({progress:r,signal:d})=>oo(t,e.items,e.mode,n,{onProgress:r,signal:d})).then(i).catch(r=>{r?.name!=="AbortError"&&D.error(r),i()})}a(vo,"paste");async function It(e){const t=await st(we(le(e)),e.path??S.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(It,"download");async function ze(){if(!Jt())return D.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await aa())return;K([{path:[]}],0),ae("/")}catch(e){D.error(e)}}a(ze,"chooseFolder");async function mo(){const{granted:e}=await oa();if(!e)return ze()}a(mo,"reconnect");async function $o(){await G().confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:$e()})&&(await mn(T.value),ot=null,await la(),K([{path:[]}],0))}a($o,"closeFolder");function Nn(e){En([],e),ae("/library")}a(Nn,"openRemote");function bo(){A.value=null,ge.value="remotes",ce("context")?.show()}a(bo,"manageRemotes");async function go(e){if(!await G().confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await Sa(e.id);const t=P.value.filter(n=>n.source!==e.id);K(t.length?t:[{path:[]}],0)}a(go,"forgetRemote");function wo(e){_a(de(),e.path??S.value,e).then(()=>{ce("context")?.hide(),ae("/sync")}).catch(D.error)}a(wo,"sendEntry");async function yo(e){const t=await G().prompt({message:"Name of the new folder type",ok:"Next",title:"Folder type"});if(!t)return;const n=await G().prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";Xe(e,ia({icon:n,label:t}))}a(yo,"newType");const ko=v(()=>{const e=oe.value,t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[Fe(l)]=(n[Fe(l)]??0)+1;const o=Object.entries(n).sort((l,c)=>c[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?kt.find(l=>l.id===o[0])?.label:null,size:t.reduce((l,c)=>l+c.size,0)}}),Ut=kt.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),xo=v(()=>(B.value?.files??[]).filter(e=>Fe(e)===He.value).toSorted((e,t)=>t.lastModified-e.lastModified).slice(0,500)),Te=v(()=>$n(Oe.value));let ve=null;const ye=y(!1),Fn=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ro=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Fn;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ve=e,ye.value=!0});addEventListener("appinstalled",()=>{ve=null,ye.value=!1});async function To(){if(!ve)return!1;const e=ve;return ve=null,ye.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(To,"install");function So(e){const t=`${e}:install-hint`,n=a(()=>{se(t)||(Y(t,!0),D(`${e} can be installed: see the settings`))},"show");ye.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(So,"hint");const Ao=864e5,Eo={day:"numeric",month:"short",year:"numeric"},Rt=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ce=a(e=>{const t=Rt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Eo)},"date"),Oo=a(e=>{const t=Rt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Ao;return n<0?Ce(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ce(t)},"ago"),Ho=a(e=>{const t=Rt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ce(t)},"since"),Do=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${o}:${l}`:`${o}:${l}`},"duration"),Mo=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),R={ago:Oo,bytes:Mo,date:Ce,duration:Do,since:Ho};function k(e,t){return No.call({props:e},e,t)}a(k,"ActionRatHtml");function No(e,t){return s`<button.action type="button" disabled=${()=>e.disabled} onclick=${m(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(No,"$$ActionRatHtml");function De(e,t){return Fo.call({props:e},e,t)}a(De,"FactsRatHtml");function Fo(e,t){const n=(e.rows??[]).filter(([,o])=>o!=null&&o!=="");return s`
    <dl.facts>
      ${w(()=>n,o=>o,o=>s`<dt>${()=>o[0]}</dt><dd>${()=>o[1]}</dd>`)}
    </dl>
  `}a(Fo,"$$FactsRatHtml");function Po(e,t){return jo.call({props:e},e,t)}a(Po,"RemoteManagerRatHtml");function jo(e,t){let n=H(null),o=H(!1);const l=v(()=>L.value);async function c(i){i.preventDefault();const r=i.target,d=a(p=>r.querySelector(`[name="${p}"]`)?.value??"","field");o.value=!0,n.value=null;try{const p=await Ta({name:d("name"),password:d("password"),url:d("url"),username:d("username")});r.reset?.(),Nn(p.id),RAT.app.area("context")?.hide()}catch(p){n.value=p.message??String(p)}finally{o.value=!1}}return a(c,"add"),s`
    ${h(()=>l.value.length,()=>s`
        <ul.tasks>
          ${w(()=>l.value,i=>i,i=>s`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>i.name}</span><small>${()=>i.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+i.name} onclick=${m(()=>go(i))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${m(c)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${h(()=>n.value,()=>s`<p.error>${()=>n.value}</p>`)}
      <button.action type="submit" disabled=${()=>o.value}><svg-icon icon=${()=>o.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(jo,"$$RemoteManagerRatHtml");function Pn(e,t){return zo.call({props:e},e,t)}a(Pn,"StatusRatHtml");function zo(e,t){const n=v(()=>_.value),o=v(()=>B.value);return s`
    ${h(()=>n.value,()=>s`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>n.value.files} files</p>`,()=>h(()=>o.value,()=>s`<p.status>${()=>o.value.total} files · ${()=>R.bytes(o.value.size)} · read ${()=>R.date(o.value.scannedAt)}</p>`))}
  `}a(zo,"$$StatusRatHtml");function Co(e,t){return Lo.call({props:e},e,t)}a(Co,"TaskListRatHtml");function Lo(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},o=v(()=>M.value),l=v(()=>fe.value),c=a(p=>p.state==="queued"||p.state==="running","isOpen"),i=a(p=>{const{done:b,total:$}=p.progress??{};return p.state==="running"&&b!=null?$?`${Math.round(b/$*100)}%`:`${b}`:n[p.state]},"stateOf"),r=a(p=>p.error??[i(p),p.endedAt&&R.date(p.endedAt)].filter(Boolean).join(" · "),"noteOf");function d(p){return s`
      <li class=${()=>"task "+p.state}>
        <svg-icon icon=${()=>p.icon} />
        <span.text>
          <span.name>${()=>p.label}</span>
          <small>${()=>r(p)}</small>
          ${h(()=>p.state==="running"&&p.progress?.total,()=>s`<progress max=${()=>p.progress.total} value=${()=>p.progress.done} />`)}
        </span>
        ${h(()=>c(p),()=>s`<btn-icon icon="lucide:x" label=${()=>"cancel "+p.label} onclick=${m(()=>Ca(p.id))} />`)}
      </li>
    `}return a(d,"row"),s`
    ${h(()=>o.value.length,()=>s`
        <ul.tasks>
          ${w(()=>o.value,p=>p,p=>s`${()=>d(p)}`)}
        </ul>
      `,()=>s`<p.empty>nothing to do</p>`)}
    ${h(()=>l.value.length,()=>s`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${m(La)} />
        </div-x>
        <ul.tasks>
          ${w(()=>l.value,p=>p,p=>s`${()=>d(p)}`)}
        </ul>
      `)}
  `}a(Lo,"$$TaskListRatHtml");function Bo(e,t){return Io.call({props:e},e,t)}a(Bo,"ContextRatHtml");function Io(e,t){const n=v(()=>ge.value),o=v(()=>A.value),l=v(()=>Pe.value),c=v(()=>RAT.app.router.$path.value),i=v(()=>S.value),r=v(()=>ko.value),d=v(()=>!ue.value),p=a(u=>"/"+(u.path??i.value).join("/"),"where"),b=a(u=>tn(u),"isMarked"),$=a((u,O)=>ra(u,O),"bookmark"),x=v(()=>i.value.length?ft(i.value):null),g=v(()=>i.value.length&&!x.value?sa(oe.value,ht):null);return s`
    ${h(()=>n.value==="tasks",()=>s`<h2>Tasks</h2><${Co} />`,()=>h(()=>n.value==="remotes",()=>s`<h2>Remote</h2><${Po} />`,()=>h(()=>o.value,()=>s`
            <h2>${()=>o.value.name}</h2>
            <${De} ...${{get rows(){return[["name",o.value.name],["kind",o.value.kind==="directory"?"folder":o.value.type||"file"],["size",o.value.kind==="file"?R.bytes(o.value.size):null],["modified",o.value.lastModified?R.date(o.value.lastModified):null],["in",p(o.value)]]}}} />
            <div-x.actions>
              <${k} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>ie(o.value,o.value.path??i.value),"onclick")}} />
              ${h(()=>o.value.path,()=>s`<${k} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>Lt(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="file",()=>s`<${k} icon="lucide:download" label="download" ...${{onclick:a(()=>It(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="file"&&!le(o.value)&&bn(),()=>s`<${k} icon="lucide:send" label="send" ...${{onclick:a(()=>wo(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="directory"&&!le(o.value),()=>s`<${k} ...${{get icon(){return b([...i.value,o.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return b([...i.value,o.value.name])?"remove bookmark":"bookmark"},onclick:a(()=>$([...i.value,o.value.name],o.value.name),"onclick")}} />`)}
              <${k} icon="lucide:copy" label="copy" ...${{onclick:a(()=>Bt("copy",o.value),"onclick")}} />
              <${k} icon="lucide:scissors" label="move" ...${{onclick:a(()=>Bt("move",o.value),"onclick")}} />
              <${k} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>fo(o.value),"onclick")}} />
              <${k} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>ho(o.value),"onclick")}} />
            </div-x>
          `,()=>h(()=>c.value==="/preview"&&l.value,()=>s`
              <h2>Details</h2>
              <${De} ...${{get rows(){return[["name",l.value.name],["type",l.value.type||"unknown"],["size",R.bytes(l.value.size)],["dimensions",he.value?he.value.width+" × "+he.value.height:null],["modified",R.date(l.value.lastModified)],["in","/"+l.value.path.join("/")]]}}} />
              <div-x.actions>
                <${k} icon="lucide:download" label="download" ...${{onclick:a(()=>It(l.value),"onclick")}} />
                <${k} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>Lt(l.value),"onclick")}} />
              </div-x>
            `,()=>h(()=>c.value==="/library"&&qe(),()=>s`
                <h2>This folder</h2>
                <${De} ...${{get rows(){return[["folder",i.value.at(-1)??$e()],["contains",r.value.folders+" folders, "+r.value.files+" files"],["size",R.bytes(r.value.size)],["mostly",r.value.mostly]]}}} />
                <div-x.actions>
                  <${k} icon="lucide:folder-plus" label="new folder" ...${{onclick:Mn}} />
                  ${h(()=>i.value.length&&d.value,()=>s`<${k} ...${{get icon(){return b(i.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return b(i.value)?"remove bookmark":"bookmark"},onclick:a(()=>$(i.value,i.value.at(-1)),"onclick")}} />`)}
                </div-x>
                ${h(()=>i.value.length&&d.value,()=>s`
                    <h3>Type</h3>
                    ${h(()=>g.value,()=>s`<p.hint>Looks like ${()=>g.value.label}. <button.link type="button" onclick=${m(()=>Xe(i.value,g.value.id))}>Make it one</button></p>`)}
                    <div-x.actions>
                      ${w(()=>Zt(),u=>u,u=>s`<button.action type="button" aria-pressed=${()=>String(x.value?.id===u.id)} onclick=${m(()=>Xe(i.value,x.value?.id===u.id?null:u.id))}><svg-icon icon=${()=>u.icon} /> ${()=>u.label}</button>`)}
                      <${k} icon="lucide:plus" label="new type" ...${{onclick:a(()=>yo(i.value),"onclick")}} />
                    </div-x>
                  `)}
              `,()=>s`
                <h2>${()=>Ue(null)}</h2>
                <${Pn} />
                <div-x.actions><${k} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!de()||!!_.value},onclick:co}} /></div-x>
              `)))))}
  `}a(Io,"$$ContextRatHtml");function F(e,t){return Uo.call({props:e},e,t)}a(F,"BarRatHtml");function Uo(e,t){return s`
    <header.bar>
      ${h(()=>e.back,()=>s`<btn-icon icon="lucide:arrow-left" label="back" onclick=${m(e.back)} />`,()=>s`<btn-icon icon="lucide:menu" label="menu" onclick=${m(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${m(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Uo,"$$BarRatHtml");function Tt(e,t){return qo.call({props:e},e,t)}a(Tt,"ThumbRatHtml");function qo(e,t){const n=e.entry,o=e.at??[],l=e.from??null,c=RAT.app.thumbnails,i=lt(n)?`${l??T.value?.addedAt}/${o.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let r=H(i?c.peekFile(i):null);function d(p){if(!i||r.value)return;let b=!0;const $=new IntersectionObserver(([x])=>{x.isIntersecting&&($.disconnect(),c.requestFile(i,()=>st(we(l),o,n.name)).then(g=>{b&&g&&(r.value=g)}))},{rootMargin:"200px"});return $.observe(p),()=>{b=!1,$.disconnect()}}return a(d,"watch"),s`
    <span.thumb ref=${Gn(d)}>
      ${h(()=>r.value,()=>s`<img src=${()=>r.value} alt="" loading="lazy" />`,()=>s`<svg-icon icon=${()=>Hn(n,l?null:e.at)} />`)}
    </span>
  `}a(qo,"$$ThumbRatHtml");function qt(e,t){return Wo.call({props:e},e,t)}a(qt,"FileRowRatHtml");function Wo(e,t){const n=e.entry;return s`
    <li.row>
      <button.entry type="button" onclick=${m(()=>ie(n))}>
        <${Tt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+R.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Dn({...n,kind:"file"}))} />
    </li>
  `}a(Wo,"$$FileRowRatHtml");function Le(e,t){return _o.call({props:e},e,t)}a(Le,"SearchbarRatHtml");function _o(e,t){const n=v(()=>ja.value),o=v(()=>M.value.length);return s`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${m(l=>e.onsearch?.(l.detail.query))} />
      <button type="button" class=${()=>n.value?"tasks-button busy":"tasks-button"} aria-label=${()=>o.value?`${o.value} tasks`:"tasks"} title=${()=>o.value?`${o.value} tasks`:"tasks"} onclick=${m(po)}>
        <svg-icon icon=${()=>n.value?"lucide:loader":"lucide:list-checks"} />
        ${h(()=>o.value,()=>s`<span.badge>${()=>o.value}</span>`)}
      </button>
    </div>
  `}a(_o,"$$SearchbarRatHtml");const Go=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Vo(e,t){return Yo.call({props:e},e,t)}a(Vo,"LoadingRatHtml");function Yo(e,t){return it("1tn1js8",Go),s`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${h(()=>e.text,()=>s`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Yo,"$$LoadingRatHtml");function jn(e,t){return Ko.call({props:e},e,t)}a(jn,"WelcomeRatHtml");function Ko(e,t){const n=v(()=>Vt.value),o=v(()=>T.value);return s`
    ${h(()=>!Jt(),()=>s`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>h(()=>!n.value,()=>s`<${Vo} />`,()=>h(()=>!o.value,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${m(ze)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>s`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>$e()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${m(mo)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Ko,"$$WelcomeRatHtml");function Jo(e,t){return Qo.call({props:e},e,t)}a(Jo,"DashboardRatHtml");function Qo(e,t){const n=a(u=>{U(u,null),RAT.app.router.go("/library")},"library"),o=a(()=>Ue(null),"folderName"),l=v(()=>!!de()),c=v(()=>E.searchbar.value==="top"),i=v(()=>Oe.value.trim()),r=v(()=>He.value),d=v(()=>B.value),p=v(()=>en()),b=v(()=>Ut.find(u=>u.id===r.value)?.label??r.value),$=v(()=>L.value),x=a(u=>{try{return new URL(u).host}catch{return u}},"hostOf"),g=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return s`
    <${F} title="Files" />
    ${h(()=>l.value&&c.value,()=>s`<${Le} ...${{get placeholder(){return"Search in "+o()},onsearch:a(u=>Oe.value=u,"onsearch")}} />`)}
    <div.scroll>
      ${h(()=>!l.value,()=>s`<${jn} />`,()=>h(()=>i.value,()=>s`
            <section>
              <h2>${()=>Te.value.length?"Found "+(Te.value.length>=100?"100+":Te.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${w(()=>Te.value,u=>u,u=>s`<${qt} ...${{get entry(){return u}}} />`)}
              </ul>
            </section>
          `,()=>h(()=>r.value,()=>s`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${m(()=>He.value=null)} />
                  <h2>${()=>b.value}</h2>
                </div-x>
                <ul.rows>
                  ${w(()=>xo.value,u=>u,u=>s`<${qt} ...${{get entry(){return u}}} />`)}
                </ul>
              </section>
            `,()=>s`
              ${h(()=>d.value?.recent?.length,()=>s`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${w(()=>d.value.recent,u=>u,u=>s`
                          <button.card type="button" onclick=${m(()=>ie(u))}>
                            <${Tt} ...${{get entry(){return u},get at(){return u.path}}} />
                            <span.name>${()=>u.name}</span>
                            <small>${()=>R.date(u.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${h(()=>p.value.length,()=>s`
                    <ul.tiles>
                      ${w(()=>p.value,u=>u,u=>s`
                          <li>
                            <button.tile type="button" onclick=${m(()=>n(u.path))}>
                              <svg-icon icon=${()=>ft(u.path)?.icon??"lucide:bookmark"} />
                              <span.text>
                                <span.name>${()=>u.name}</span>
                                <small>/${()=>u.path.join("/")}</small>
                              </span>
                            </button>
                          </li>
                        `)}
                    </ul>
                  `,()=>s`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${w(()=>Ut,u=>u,u=>s`
                      <li>
                        <button.tile type="button" disabled=${()=>!d.value?.categories?.[u.id]?.count} onclick=${m(()=>He.value=u.id)}>
                          <svg-icon icon=${()=>u.icon} />
                          <span.text>
                            <span.name>${()=>u.label}</span>
                            <small>${()=>d.value?.categories?.[u.id]?d.value.categories[u.id].count+" · "+R.bytes(d.value.categories[u.id].size):"…"}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles>
                  <li>
                    <button.tile type="button" onclick=${m(()=>n([]))}>
                      <svg-icon icon="lucide:folder-open" />
                      <span.text>
                        <span.name>${()=>o()}</span>
                        <small>${()=>d.value?R.bytes(d.value.size):"the granted folder"}</small>
                      </span>
                    </button>
                  </li>
                </ul>
                <${Pn} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${w(()=>$.value,u=>u,u=>s`
                      <li>
                        <button.tile type="button" onclick=${m(()=>Nn(u.id))}>
                          <svg-icon icon="lucide:cloud" />
                          <span.text>
                            <span.name>${()=>u.name}</span>
                            <small>${()=>x(u.url)}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                  <li>
                    <button.tile type="button" onclick=${m(bo)}>
                      <svg-icon icon="lucide:cloud-cog" />
                      <span.text>
                        <span.name>WebDAV, Nextcloud</span>
                        <small>${()=>$.value.length?"add or remove":"connect a server"}</small>
                      </span>
                    </button>
                  </li>
                  ${w(()=>g,u=>u,u=>s`
                      <li>
                        <button.tile type="button" disabled title=${()=>u.note}>
                          <svg-icon icon=${()=>u.icon} />
                          <span.text>
                            <span.name>${()=>u.label}</span>
                            <small>soon · ${()=>u.note}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                </ul>
              </section>
            `)))}
    </div>
    ${h(()=>l.value&&!c.value,()=>s`<${Le} ...${{get placeholder(){return"Search in "+o()},onsearch:a(u=>Oe.value=u,"onsearch")}} />`)}
  `}a(Qo,"$$DashboardRatHtml");function Xo(e,t){return Zo.call({props:e},e,t)}a(Xo,"EntryRatHtml");function Zo(e,t){const n=e.entry,o=S.peek(),l=ue.peek(),c=v(()=>A.value?.name===n.name&&!A.value?.path),i=a(r=>{r.key==="Enter"&&!Tn()&&(r.preventDefault(),ie(n))},"onkeydown");return s`
    <data-item>
      <div.row class:selected=${()=>c.value}>
        <button.entry type="button" aria-pressed=${()=>c.value?"true":null} onclick=${m(()=>uo(n))} ondblclick=${m(()=>ie(n))} onkeydown=${m(i)}>
          <${Tt} ...${{get entry(){return n},get at(){return o},get from(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?R.date(n.lastModified)+" · "+R.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Dn(n))} />
      </div>
    </data-item>
  `}a(Zo,"$$EntryRatHtml");function el(e,t){return tl.call({props:e},e,t)}a(el,"PasteBarRatHtml");function tl(e,t){const n=v(()=>I.value),o=v(()=>n.value?n.value.items.length===1?n.value.items[0].name:`${n.value.items.length} items`:"");return s`
    ${h(()=>n.value,()=>s`
        <div-x.pastebar>
          <svg-icon icon=${()=>n.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>o.value}</span>
            <small>${()=>n.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${m(vo)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the clipboard" onclick=${m(Rn)} />
        </div-x>
      `)}
  `}a(tl,"$$PasteBarRatHtml");function Wt(e,t){return nl.call({props:e},e,t)}a(Wt,"TabsRatHtml");function nl(e,t){const n=v(()=>P.value),o=v(()=>N.value);return s`
    <div-x.tabs role="tablist" scrollable>
      ${w(()=>n.value,l=>l,l=>s`
          <div class=${()=>n.value.indexOf(l)===o.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(n.value.indexOf(l)===o.value)} onclick=${m(()=>ro(n.value.indexOf(l)))}>${()=>zt(l)}</button>
            ${h(()=>n.value.length>1,()=>s`<btn-icon icon="lucide:x" label=${()=>"close "+zt(l)} onclick=${m(()=>so(n.value.indexOf(l)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${m(()=>En())} />
    </div-x>
  `}a(nl,"$$TabsRatHtml");function al(e,t){return ol.call({props:e},e,t)}a(al,"LibraryRatHtml");function ol(e,t){const n=v(()=>!!qe()),o=v(()=>S.value),l=v(()=>E.viewmode.value),c=v(()=>E.tabbar.value==="top"),i=v(()=>E.searchbar.value==="top"),r=a(()=>o.value.length?U(o.value.slice(0,-1)):RAT.app.router.go("/"),"up"),d=a(()=>E.viewmode.value=l.value==="grid"?"list":"grid","toggle"),p=a(b=>U(b.detail.path.split("/").filter(Boolean)),"crumb");return s`
    ${h(()=>!n.value,()=>s`<${F} title="Library" /><div.scroll><${jn} /></div>`,()=>s`
        <${F} ...${{get title(){return o.value.at(-1)??$e()},get back(){return r}}}><btn-icon icon=${()=>l.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>l.value==="grid"?"show as list":"show as grid"} onclick=${m(d)} /></${F}>
        ${h(()=>c.value,()=>s`<${Wt} />`)}
        ${h(()=>i.value,()=>s`<${Le} placeholder="Filter this folder" ...${{get value(){return W.value},onsearch:a(b=>W.value=b,"onsearch")}} />`)}
        <nav-crumbs root=${()=>$e()} path=${()=>"/"+o.value.join("/")} onnav-crumbs=${m(p)} />
        <div.pane>
          <div.listing>
            ${h(()=>at.value,()=>s`<svg-icon icon="lucide:loader" />`,()=>h(()=>Ct.value.length,()=>s`
                  <data-index viewmode=${()=>l.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${w(()=>Ct.value,b=>b,b=>s`<${Xo} ...${{get entry(){return b}}} />`)}
                  </data-index>
                `,()=>s`<p.empty>${()=>W.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label="new folder" title="new folder" onclick=${m(Mn)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${el} />
        ${h(()=>!i.value,()=>s`<${Le} placeholder="Filter this folder" ...${{get value(){return W.value},onsearch:a(b=>W.value=b,"onsearch")}} />`)}
        ${h(()=>!c.value,()=>s`<${Wt} />`)}
      `)}
  `}a(ol,"$$LibraryRatHtml");const ll=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function il(e,t){return sl.call({props:e},e,t)}a(il,"BrandRatHtml");function sl(e,t){return it("1npwj96",ll),s`
    <div.brand data-rat="1npwj96">
      ${h(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(sl,"$$BrandRatHtml");function rl(e,t){return cl.call({props:e},e,t)}a(rl,"MenuRatHtml");function cl(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],l=v(()=>RAT.app.router.$path.value);function c(i){RAT.app.router.go(i);const r=RAT.app.area("menu");r?.isOverlay&&r.hide()}return a(c,"go"),s`
    <nav.menu>
      <${il} name="Files" icon="./app.svg" />
      ${w(()=>n,i=>i,i=>s`<button type="button" aria-current=${()=>l.value===i.route?"page":null} onclick=${m(()=>c(i.route))}><svg-icon icon=${()=>i.icon} /> ${()=>i.label}</button>`)}
      <hr />
      ${w(()=>o,i=>i,i=>s`<button type="button" disabled><svg-icon icon=${()=>i.icon} /> ${()=>i.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${m(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(cl,"$$MenuRatHtml");function ul(e,t){return dl.call({props:e},e,t)}a(ul,"PreferencesRatHtml");function dl(e,t){const n={"pattern-bg":"Background","pattern-tile":"Tiles"},o={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=v(()=>T.value),c=a((i,r)=>E[i].value=r.detail?.value??r.target.value,"change");return s`
    <section>
      <h3>files</h3>
      ${w(()=>Object.keys(o),i=>i,i=>s`
          <label>
            <span>${()=>o[i].label}</span>
            <input-value look="segments" value=${()=>E[i].value} onchange=${m(r=>c(i,r))}>
              ${w(()=>o[i].values,r=>r,r=>s`<input-option value=${()=>r[0]}>${()=>r[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${w(()=>Object.keys(n),i=>i,i=>s`
          <label>
            <span>${()=>n[i]}</span>
            <input-pattern opacity value=${()=>E[i].value} onchange=${m(r=>c(i,r))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${h(()=>l.value,()=>s`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>l.value.name}</p>
          <div-x.actions>
            <${k} icon="lucide:folder-sync" label="change" ...${{onclick:ze}} />
            <${k} icon="lucide:x" label="close" ...${{onclick:$o}} />
          </div-x>
        `,()=>s`<${k} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:ze}} />`)}
    </section>
  `}a(dl,"$$PreferencesRatHtml");function pl(e,t){return fl.call({props:e},e,t)}a(pl,"PreviewRatHtml");function fl(e,t){const n=v(()=>Pe.value);let o=H(null);V(()=>{const i=Pe.value;if(he.value=null,o.value=null,!i||!lt(i))return;let r=null,d=!0;return st(we(i.source),i.path,i.name).then(p=>{d&&(o.value=r=URL.createObjectURL(p))}),()=>{d=!1,r&&URL.revokeObjectURL(r)}});const l=a(i=>he.value={height:i.target.naturalHeight,width:i.target.naturalWidth},"loaded"),c=a(()=>{A.value=null,RAT.app.toggle("context")},"info");return s`
    ${h(()=>!n.value,()=>s`
        <${F} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>s`
        <${F} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${m(c)} /></${F}>
        <div.stage>
          ${h(()=>lt(n.value),()=>s`
              ${h(()=>o.value,()=>s`<img src=${()=>o.value} alt=${()=>n.value.name} onload=${m(l)} />`)}
            `,()=>s`<svg-icon icon=${()=>Hn(n.value)} />`)}
        </div>
      `)}
  `}a(fl,"$$PreviewRatHtml");const zn=`appearance:${new URL(".",location.href).pathname}`,_t={density:Z.densities,geometry:Z.geometries,mode:Z.modes},be=se(zn,{}),hl=a(()=>Z.palettes().catch(()=>[]),"palettes");function vl(e,t){return be[e]=t||null,Y(zn,be),Z.set({[e]:t||null})}a(vl,"setAppearance");Object.keys(be).length&&Z.set(be);const ml=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Gt(e,t){return $l.call({props:e},e,t)}a(Gt,"SettingsRatHtml");function $l(e,t){it("177zzh1",ml);let n=H({...be}),o=H([]);const l=v(()=>ye.value);hl().then(r=>{o.value=r});function c(r,d){const p=d.detail?.value??d.target.value;n.value={...n.value,[r]:p},vl(r,p)}a(c,"change");async function i(){await To()&&D.success(`${e.name??"the app"} is installed`)}return a(i,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${m(r=>c("palette",r))}>
            ${w(()=>o.value,r=>r,r=>s`<input-option value=${()=>r}>${()=>r}</input-option>`)}
          </input-value>
        </label>
        ${w(()=>Object.keys(_t),r=>r,r=>s`
            <label>
              <span>${()=>r}</span>
              <input-value look="segments" value=${()=>n.value[r]??""} onchange=${m(d=>c(r,d))}>
                ${w(()=>_t[r],d=>d,d=>s`<input-option value=${()=>d}>${()=>d}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${h(()=>!Fn,()=>s`
          <section>
            <h3>install</h3>
            ${h(()=>l.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${m(i)} />`,()=>s`
                ${h(()=>Ro,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a($l,"$$SettingsRatHtml");function bl(e,t){return gl.call({props:e},e,t)}a(bl,"SyncRatHtml");function gl(e,t){let n=H(null),o=H(""),l=H("https"),c=H(""),i=H("");const r=a(f=>`${f.host}:${f.port}`,"keyOf"),d=a(()=>n.value??Ba(o.value,l.value),"target"),p=v(()=>tt.value),b=v(()=>ne.value.filter(f=>!p.value.some(Q=>r({host:Q.ip,port:Q.port})===r(f)))),$=v(()=>z.value),x=v(()=>$.value.reduce((f,Q)=>f+Math.max(0,Q.size),0)),g=v(()=>me.value??{}),u=v(()=>d()),O=a(f=>f.ip??f.host,"hostOf"),St=a(f=>!!u.value&&r(u.value)===r({host:O(f),port:f.port??53317}),"isChosen"),Cn=a(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),J=a(f=>Promise.resolve().then(f).catch(D.error),"run");function Ln(f){n.value={alias:f.alias,fingerprint:f.fingerprint??"",host:O(f),port:f.port??53317,protocol:f.protocol??"https"},o.value=""}a(Ln,"choose");function Bn(f){l.value=f.detail?.value??f.target.value,n.value&&(n.value={...n.value,protocol:l.value})}a(Bn,"protocol");function At(f,Q,In){return s`
      <li class=${()=>St(f)?"row selected":"row"}>
        <button.entry type="button" aria-pressed=${()=>String(St(f))} onclick=${m(()=>Ln(f))}>
          <span.thumb><svg-icon icon=${()=>Q} /></span>
          <span.text>
            <span.name>${()=>f.alias??O(f)}</span>
            <small>${()=>O(f)}:${()=>f.port??53317} · ${()=>f.protocol??"https"}</small>
          </span>
        </button>
        ${h(()=>In,()=>s`<btn-icon icon="lucide:x" label=${()=>"forget "+(f.alias??O(f))} onclick=${m(()=>Ua(f))} />`)}
      </li>
    `}return a(At,"receiver"),s`
    ${h(()=>!bn(),()=>s`
        <${F} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>s`
        <${F} title="Send">
          ${h(()=>nt.value,()=>s`<small.identity>${()=>nt.value.alias}</small>`)}
        </${F}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${m(kn)} />
            </div-x>
            ${h(()=>p.value.length||b.value.length,()=>s`
                <ul.rows>
                  ${w(()=>p.value,f=>f,f=>s`${()=>At(f,Cn(f),!1)}`)}
                  ${w(()=>b.value,f=>f,f=>s`${()=>At(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>s`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>o.value} oninput=${m(f=>{o.value=f.target.value??"",n.value=null})} />
              <input-value look="segments" value=${()=>u.value?.protocol??l.value} onchange=${m(Bn)}>
                ${w(()=>gn,f=>f,f=>s`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" value=${()=>c.value} oninput=${m(f=>c.value=f.target.value??"")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${h(()=>$.value.length,()=>s`
                <ul.rows>
                  ${w(()=>$.value,f=>f,f=>s`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>f.size>=0?R.bytes(f.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${m(()=>Ga(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>s`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${k} icon="lucide:file-plus" label="pick files" ...${{onclick:a(()=>J(Wa),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!$.value.length||!u.value} onclick=${m(()=>J(()=>Ya(d(),$.value,c.value)))}><svg-icon icon="lucide:send" /> send${()=>$.value.length?` ${$.value.length} · ${R.bytes(x.value)}`:""}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${De} ...${{get rows(){return[["folder",g.value.name||(g.value.tree?"chosen":"none yet")],["state",g.value.enabled?"on"+(g.value.lastSync?" · last "+R.date(g.value.lastSync):""):"off"],["to",g.value.enabled?g.value.host+":"+g.value.port:null]]}}} />
            ${h(()=>!g.value.enabled,()=>s`<input-text placeholder="only on this wi-fi (ssid), optional" value=${()=>i.value} oninput=${m(f=>i.value=f.target.value??"")} />`)}
            <div-x.actions>
              <${k} icon="lucide:folder-search" label="folder" ...${{onclick:a(()=>J(Ka),"onclick")}} />
              ${h(()=>g.value.enabled,()=>s`
                  <${k} icon="lucide:refresh-cw" label="now" ...${{onclick:a(()=>J(Xa),"onclick")}} />
                  <${k} icon="lucide:pause" label="turn off" ...${{onclick:a(()=>J(Qa),"onclick")}} />
                `,()=>s`<${k} icon="lucide:play" label="turn on" ...${{get disabled(){return!g.value.tree||!u.value},onclick:a(()=>J(()=>Ja(d(),{pin:c.value,ssid:i.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(gl,"$$SyncRatHtml");function El(e,t){return wl.call({props:e},e,t)}a(El,"AppRatHtml");function wl(e,t){RAT.app.hold(Promise.all([na(),Ra()]).catch(D.error)),So("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&kn(),l!=="/sync"&&n&&qa(),n=l==="/sync"}),s`
    <rat-area name="menu" dock="start"><${rl} /></rat-area>
    <rat-view route="/" name="dashboard"><${Jo} /></rat-view>
    <rat-view route="/library" name="library"><${al} /></rat-view>
    <rat-view route="/preview" name="preview" transition="slide"><${pl} /></rat-view>
    <rat-view route="/sync" name="sync"><${bl} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${m(a(l=>{l.detail?.open||(ge.value=null)},"ontoggle"))}><div.context><${Bo} /></div></rat-area>
    <rat-area name="config" dock="end"><${Gt} name="Files"><${ul} /></${Gt}></rat-area>
  `}a(wl,"$$AppRatHtml");export{El as default};
