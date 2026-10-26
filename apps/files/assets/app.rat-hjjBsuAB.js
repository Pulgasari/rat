var Lt=Object.defineProperty;var a=(e,t)=>Lt(e,"name",{value:t,configurable:!0});import{z as It,E as Qe,P as Bt,n as b,G,H as f,h as r,f as g,w as v,J as se,K as Pt,L as Ee,M as B}from"./index-BzFdOaQ4.js";import{p as qt,a as Wt}from"./keys-CWTtq0D5.js";import{d as Ut}from"./drivers-DhbRwOkA.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function p(e,{keys:t=null,prevent:n=!1,times:l=0}={}){const i=t?qt(t):null;let c=l;return function(o){if(!(l&&!c)&&!(i&&!Wt(o,i))){n&&o.preventDefault(),l&&c--;try{const s=(typeof e=="string"?It(e):e).call(this,o);typeof s?.catch=="function"&&s.catch($=>Qe(this,$))}catch(s){Qe(this,s)}}}}a(p,"listener");function ee(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(ee,"read");function Y(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(Y,"write");const ne=a(e=>(t,n)=>Bt.notify(t,{...n,type:e}),"notify"),z=Object.assign(ne("info"),{error:ne("error"),info:ne("info"),success:ne("success")}),Gt=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function D(e,t=[]){let n=e;for(const l of t)n=await n.getDirectoryHandle(l);return n}a(D,"dirAt");async function Yt(e,t=[]){const n=await D(e,t),l=[];for await(const c of n.values())l.push(c);return(await Promise.all(l.map(async c=>{if(c.kind==="directory")return{kind:"directory",name:c.name};const o=await c.getFile();return{kind:"file",lastModified:o.lastModified,name:c.name,size:o.size,type:o.type}}))).sort(Gt)}a(Yt,"list");async function je(e,t,n){return(await(await D(e,t)).getFileHandle(n)).getFile()}a(je,"readFile");async function _t(e,t,n){await(await D(e,t)).getDirectoryHandle(n,{create:!0})}a(_t,"mkdir");async function Kt(e,t,n){await(await D(e,t)).removeEntry(n,{recursive:!0})}a(Kt,"remove");async function Jt(e,t,n,l,i){const c=await D(e,t),o=i==="directory"?await c.getDirectoryHandle(n):await c.getFileHandle(n);if(typeof o.move=="function")try{await o.move(l);return}catch{}i==="directory"?await Fe(o,c,l):await De(o,c,l),await c.removeEntry(n,{recursive:!0})}a(Jt,"rename");async function De(e,t,n,l){const i=await e.getFile(),o=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(o instanceof WritableStream)){await o.write(await i.arrayBuffer()),await o.close();return}try{await i.stream().pipeTo(o,{signal:l})}catch(s){throw await o.abort?.().catch(()=>{}),s}}a(De,"copyFile");async function Fe(e,t,n,l,i=()=>{}){const c=await t.getDirectoryHandle(n,{create:!0});for await(const o of e.values()){if(l?.aborted)throw new DOMException("copy aborted","AbortError");o.kind==="directory"?await Fe(o,c,o.name,l,i):(await De(o,c,o.name,l),i())}}a(Fe,"copyTree");const Ne="root",k=b(null),P=b(null),vt=b(!1),Ce=a(()=>RAT.app.database.root,"table");let Vt=null;const ft=a(async()=>Vt??=await Ut("folders"),"folders"),Le=a(async(e,t,n)=>{try{return e[t]?await e[t]({mode:n}):"granted"}catch{return"denied"}},"ask"),$t=a(()=>RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function","supported");async function Xt(){const e=await Ce().get(Ne);if(e){const t=(await ft()).revive(e.handle);k.value={addedAt:e.addedAt,handle:t,name:e.name},P.value=await Le(t,"queryPermission","read")}vt.value=!0}a(Xt,"load");async function Qt(){const{keep:e,pick:t}=await ft(),n=await t({id:"files"});if(!n)return null;const l={addedAt:Date.now(),handle:e(n),name:n.name};return await Ce().set(Ne,l),k.value={addedAt:l.addedAt,handle:n,name:l.name},P.value="granted",k.value}a(Qt,"grant");async function Zt(){const e=k.value?.handle;return e?(P.value=await Le(e,"requestPermission","read"),{granted:P.value==="granted"}):{granted:!1}}a(Zt,"reconnect$1");async function en(){await Ce().delete(Ne),k.value=null,P.value=null}a(en,"forget$1");async function tn(){const e=k.value?.handle;return e&&await Le(e,"requestPermission","readwrite")==="granted"?e:null}a(tn,"writable$1");const Ie=a((e,t)=>{const n=b(ee(e,t));return G(()=>Y(e,n.value)),n},"stored$1"),oe=Ie("files:bookmarks",[]),Te=Ie("files:folderTyped",{}),Ae=Ie("files:folderTypes",[]),pt=[{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:film",id:"video",label:"Videos"}],ue=a(()=>k.value?.addedAt??k.value?.name??"","folderId"),He=a(e=>`${ue()}:${e.join("/")}`,"keyOf"),ht=a((e,t)=>e.join("/")===t.join("/"),"samePath$1"),mt=a(()=>[...pt,...Ae.value],"types");function Be(e){const t=Te.value[He(e)];return t?mt().find(n=>n.id===t)??null:null}a(Be,"typeOf");function Se(e,t){const n={...Te.value};t?n[He(e)]=t:delete n[He(e)],Te.value=n}a(Se,"setType");function nn({icon:e="lucide:folder",label:t}){const n=`custom-${Date.now().toString(36)}`;return Ae.value=[...Ae.value,{icon:e,id:n,label:t}],n}a(nn,"addType");function an(e,t){const n=e.filter(o=>o.kind==="file"),l={};for(const o of n)l[t(o)]=(l[t(o)]??0)+1;const[i,c]=Object.entries(l).sort((o,s)=>s[1]-o[1])[0]??[];return i&&c/n.length>=.6?pt.find(o=>o.id===i)??null:null}a(an,"suggest");const bt=a(()=>oe.value.filter(e=>e.folder===ue()),"bookmarks"),gt=a(e=>bt().some(t=>ht(t.path,e)),"isBookmarked");function ln(e,t){oe.value=gt(e)?oe.value.filter(n=>!(n.folder===ue()&&ht(n.path,e))):[...oe.value,{folder:ue(),name:t,path:e}]}a(ln,"toggleBookmark");const yt=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],on=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,rn=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,cn=a(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function Pe({name:e,type:t=""}){const n=cn(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||on.test(n)?"documents":rn.test(n)?"archives":"other"}a(Pe,"categoryOf$1");const E=b(null),I=b(null),sn=24,un=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),qe=a(e=>`index/${e.addedAt??e.name}.json`,"pathOf");let K=null;async function wt(e,t,n,l){const i=[],c=[];for await(const o of e.values()){if(l.aborted)throw new DOMException("scan aborted","AbortError");un(o.name)||(o.kind==="directory"?i.push(o):c.push(o.getFile().then(s=>({lastModified:s.lastModified,name:o.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const o of await Promise.all(c))o&&n.push(o);I.value={files:n.length};for(const o of i)await wt(o,[...t,o.name],n,l)}a(wt,"walk");function dn(e){const t=Object.fromEntries(yt.map(({id:i})=>[i,{count:0,size:0}]));let n=0;for(const i of e){const c=t[Pe(i)];c.count++,c.size+=i.size,n+=i.size}const l=e.toSorted((i,c)=>c.lastModified-i.lastModified).slice(0,sn);return{categories:t,files:e,recent:l,scannedAt:Date.now(),size:n,total:e.length}}a(dn,"summarize");async function kt(e){if(!e)return E.value=null,null;const t=await RAT.app.files.read(qe(e),"json").catch(()=>null);return E.value=t,t}a(kt,"restore");async function xt(e,t){K?.abort();const n=new AbortController;K=n;const l=[];I.value={files:0};try{await wt(e,[],l,n.signal);const i=dn(l);return E.value=i,await RAT.app.files.write(qe(t),JSON.stringify(i)),i}catch(i){if(i?.name!=="AbortError")throw i;return null}finally{K===n&&(K=null,I.value=null)}}a(xt,"scan");const We=a(()=>K?.abort(),"stop");async function Rt(e){We(),E.value=null,e&&await RAT.app.files.remove(qe(e)).catch(()=>{})}a(Rt,"forget");function Tt(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const l=[];for(const i of E.value?.files??[])if(i.name.toLowerCase().includes(n)&&l.push(i),l.length>=t)break;return l}a(Tt,"search");const vn=Object.freeze(Object.defineProperty({__proto__:null,CATEGORIES:yt,categoryOf:Pe,forget:Rt,index:E,restore:kt,scan:xt,scanning:I,search:Tt,stop:We},Symbol.toStringTag,{value:"Module"})),fn=50,Ue="files:tasks",H=b([]),V=b(ee(Ue,[])),$n=f(()=>H.value.some(e=>e.state==="running")),Ge=new Map,Ze=new Map;let pn=0;function et(e,t){H.value=H.peek().map(n=>n.id===e?{...n,...t}:n)}a(et,"patch");function xe(e,t){const n={...H.peek().find(l=>l.id===e),...t,endedAt:Date.now()};H.value=H.peek().filter(l=>l.id!==e),V.value=[n,...V.peek()].slice(0,fn),Ge.delete(e),Y(Ue,V.peek())}a(xe,"finish");function Ye({icon:e="lucide:loader",label:t,lane:n="default"},l){const i=`task-${Date.now().toString(36)}-${++pn}`,c=new AbortController;Ge.set(i,c),H.value=[...H.peek(),{error:null,icon:e,id:i,label:t,lane:n,progress:null,queuedAt:Date.now(),state:"queued"}];const o=(Ze.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{if(c.signal.aborted)return xe(i,{state:"cancelled"}),null;et(i,{startedAt:Date.now(),state:"running"});const s=a(($,d)=>et(i,{progress:{done:$,total:d}}),"progress");try{const $=await l({progress:s,signal:c.signal});return xe(i,{state:c.signal.aborted?"cancelled":"done"}),$}catch($){throw xe(i,$?.name==="AbortError"?{state:"cancelled"}:{error:String($?.message??$),state:"failed"}),$}});return Ze.set(n,o),o}a(Ye,"run");const hn=a(e=>Ge.get(e)?.abort(),"cancel");function mn(){V.value=[],Y(Ue,[])}a(mn,"clearHistory");const j=b(null),_e=a((e,t)=>e.join("/")===t.join("/"),"samePath"),bn=a((e,t)=>e.length>=t.length&&_e(e.slice(0,t.length),t),"isInside");function gn(e,t,n,l){const i={kind:t.kind,name:t.name,path:t.path??n,root:l},c=j.value,o=c?.mode===e&&!c.pasted?c.items.filter(s=>!(s.name===i.name&&_e(s.path,i.path))):[];j.value={items:[...o,i],mode:e}}a(gn,"pick$1");const yn=a(()=>{j.value&&(j.value={...j.value,pasted:!0})},"pasted"),At=a(()=>{j.value=null},"clear");async function tt(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(tt,"exists");async function wn(e,t,n){if(!await tt(e,t))return t;const l=n==="file"?t.lastIndexOf("."):-1,i=l>0?t.slice(0,l):t,c=l>0?t.slice(l):"";for(let o=2;;o++){const s=`${i} (${o})${c}`;if(!await tt(e,s))return s}}a(wn,"freeName");async function ie(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await ie(n);return t}a(ie,"countFiles");const kn=a(async(e,t)=>{const n=await D(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)},"handleOf");async function xn(e,t,n,l,{onProgress:i=a(()=>{},"onProgress"),signal:c}={}){for(const u of t)if(u.kind==="directory"&&bn(l,[...u.path,u.name]))throw new Error(`“${u.name}” can not go into itself`);const o=await D(e,l),s=await Promise.all(t.map(u=>kn(u.root??e,u))),$=(await Promise.all(s.map(ie))).reduce((u,w)=>u+w,0);let d=0;const h=a(()=>i(++d,$),"onFile");i(0,$);for(const[u,w]of t.entries()){if(c?.aborted)throw new DOMException("transfer aborted","AbortError");const m=s[u],we=await D(w.root??e,w.path);if(n==="move"&&_e(w.path,l)){d+=await ie(m),i(d,$);continue}const ke=await wn(o,w.name,w.kind);if(n==="move"&&typeof m.move=="function")try{await m.move(o,ke),d+=await ie(m),i(d,$);continue}catch{}w.kind==="directory"?await Fe(m,o,ke,c,h):(await De(m,o,ke,c),h()),n==="move"&&await we.removeEntry(w.name,{recursive:!0})}}a(xn,"transfer");const{CATEGORIES:Ke,categoryOf:de}=vn,q=a(()=>RAT.app.dialogs,"dialogs"),be=a(e=>RAT.app.area(e),"area"),ve=a(e=>RAT.app.router.go(e),"go"),J=a((e,t)=>{const n=b(ee(`files:${e}`,t));return G(()=>Y(`files:${e}`,n.value)),n},"stored"),O={open:J("open","auto"),searchbar:J("searchbar","bottom"),tabbar:J("tabbar","bottom"),viewmode:J("viewmode","list")},Rn=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Ht=a(()=>O.open.value==="single"||O.open.value==="auto"&&Rn(),"opensOnTap"),W=b([]),Oe=b(!1),C=b(""),re=b(""),ce=b(null),T=b(null),fe=b(null),ge=b(null),X=b(null),$e=J("tabs",{index:0,list:[{path:[]}]}),F=f(()=>$e.value.list?.length?$e.value.list:[{path:[]}]),M=f(()=>Math.min(Math.max(0,$e.value.index??0),F.value.length-1)),R=f(()=>F.value[M.value].path),St=new Map,Ot=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function _(e,t=M.value){$e.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}a(_,"setTabs");function N(e){_(F.value.map((t,n)=>n===M.value?{path:e}:t)),T.value=null,C.value=""}a(N,"goTo");function Tn(e=R.value){const t=[...F.value,{path:e}];_(t,t.length-1),T.value=null}a(Tn,"openTab");function An(e){if(F.value.length===1)return N([]);_(F.value.filter((t,n)=>n!==e),e<M.value?M.value-1:M.value)}a(An,"closeTab");function Hn(e){St.set(M.value,Ot()?.scrollTop??0),_(F.value,e),T.value=null}a(Hn,"switchTab");const nt=a(e=>e.path.at(-1)??S(),"tabName"),A=a(()=>P.value==="granted"?k.value?.handle??null:null,"rootHandle"),S=a(()=>k.value?.name??"folder","folderName");let ae=0;G(()=>{const e=A(),t=R.value,n=++ae;W.value=[],Oe.value=!!e,e&&Yt(e,t).then(l=>{n===ae&&(W.value=l,requestAnimationFrame(()=>{const i=Ot();i&&(i.scrollTop=St.get(M.peek())??0)}))}).catch(l=>{n===ae&&z.error(l.message??String(l))}).finally(()=>{n===ae&&(Oe.value=!1)})});let Me=null;G(()=>{const e=A(),t=k.value;!e||!t||Me===t||(Me=t,kt(t).then(()=>Mt(e,t)))});function Mt(e,t){return Ye({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:l})=>{l.addEventListener("abort",()=>We());const i=G(()=>{const c=I.value;c&&n(c.files,null)});return xt(e,t).finally(i)}).catch(n=>console.warn("[files] scan failed",n))}a(Mt,"indexFolder");const Sn=a(()=>{const e=A();e&&Mt(e,k.value)},"rescan"),at=f(()=>{const e=C.value.trim().toLowerCase();return e?W.value.filter(t=>t.name.toLowerCase().includes(e)):W.value}),ze=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),zt=a((e,t)=>e.kind==="directory"?t&&Be([...t,e.name])?.icon||"lucide:folder":Ke.find(n=>n.id===de(e))?.icon??"lucide:file","iconOf");function U(e,t=R.value){if(e.kind==="directory")return N([...t,e.name]),ve("/library");fe.value={...e,kind:"file",path:e.path??t},ve("/preview")}a(U,"open");function lt(e){N(e.path??[]),ve("/library")}a(lt,"showInFolder");function On(e){if(Ht())return U(e);T.value=e}a(On,"onEntryClick");function Et(e){ge.value=null,T.value=e,be("context")?.show()}a(Et,"about");function Mn(){T.value=null,ge.value="tasks",be("context")?.show()}a(Mn,"openTasks");async function ye(){const e=await tn();return e||z.error("No permission to change this folder"),e}a(ye,"writable");function Je(e,t,n){const l=a(()=>t.join("/")===R.value.join("/"),"same");Ye({...e,lane:"write"},n).then(()=>{l()&&N([...t])}).catch(i=>z.error(i.message??String(i)))}a(Je,"writeTask");async function jt(){const e=await q().prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await ye();if(!t)return;const n=R.value;Je({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>_t(t,n,e))}a(jt,"newFolder");async function zn(e){const t=await q().prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await ye();if(!n)return;const l=e.path??R.value;T.value=null,Je({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},l,()=>Jt(n,l,e.name,t,e.kind))}a(zn,"renameEntry");async function En(e){if(!await q().confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await ye();if(!t)return;const n=e.path??R.value;T.value=null,be("context")?.hide(),Je({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Kt(t,n,e.name))}a(En,"deleteEntry");function ot(e,t){gn(e,t,t.path??R.value,A()),be("context")?.hide()}a(ot,"pick");async function jn(){const e=j.value;if(!e)return;const t=await ye();if(!t)return;const n=[...R.value],l=e.items.length,i=l===1?e.items[0].name:`${l} items`,c=e.mode==="move"?"Move":"Copy";e.mode==="move"?At():yn();const o=a(()=>{n.join("/")===R.value.join("/")&&N([...n])},"done");Ye({icon:e.mode==="move"?"lucide:scissors":"lucide:copy",label:`${c} ${i} to /${n.join("/")}`,lane:"write"},({progress:s,signal:$})=>xn(t,e.items,e.mode,n,{onProgress:s,signal:$})).then(o).catch(s=>{s?.name!=="AbortError"&&z.error(s.message??String(s)),o()})}a(jn,"paste");async function it(e){const t=await je(A(),e.path??R.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(it,"download");async function pe(){if(!$t())return z.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await Qt())return;_([{path:[]}],0),ve("/")}catch(e){z.error(e.message??String(e))}}a(pe,"chooseFolder");async function Dn(){const{granted:e}=await Zt();if(!e)return pe()}a(Dn,"reconnect");async function Fn(){await q().confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:S()})&&(await Rt(k.value),Me=null,await en(),_([{path:[]}],0))}a(Fn,"closeFolder");async function Nn(e){const t=await q().prompt({message:"Name of the new folder type",ok:"Next",title:"Folder type"});if(!t)return;const n=await q().prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";Se(e,nn({icon:n,label:t}))}a(Nn,"newType");const Cn=f(()=>{const e=W.value,t=e.filter(i=>i.kind==="file"),n={};for(const i of t)n[de(i)]=(n[de(i)]??0)+1;const l=Object.entries(n).sort((i,c)=>c[1]-i[1])[0];return{files:t.length,folders:e.length-t.length,mostly:l&&l[1]/t.length>=.6?Ke.find(i=>i.id===l[0])?.label:null,size:t.reduce((i,c)=>i+c.size,0)}}),rt=Ke.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),Ln=f(()=>(E.value?.files??[]).filter(e=>de(e)===ce.value).toSorted((e,t)=>t.lastModified-e.lastModified).slice(0,500)),le=f(()=>Tt(re.value));let Q=null;const te=b(!1),Dt=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,In=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Dt;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Q=e,te.value=!0});addEventListener("appinstalled",()=>{Q=null,te.value=!1});async function Bn(){if(!Q)return!1;const e=Q;return Q=null,te.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(Bn,"install");function Pn(e){const t=`${e}:install-hint`,n=a(()=>{ee(t)||(Y(t,!0),z(`${e} can be installed: see the settings`))},"show");te.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(Pn,"hint");const qn=864e5,Wn={day:"numeric",month:"short",year:"numeric"},Ve=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),he=a(e=>{const t=Ve(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Wn)},"date"),Un=a(e=>{const t=Ve(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/qn;return n<0?he(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:he(t)},"ago"),Gn=a(e=>{const t=Ve(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:he(t)},"since"),Yn=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),l=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${l}:${i}`:`${l}:${i}`},"duration"),_n=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),x={ago:Un,bytes:_n,date:he,duration:Yn,since:Gn};function y(e,t){return Kn.call({props:e},e,t)}a(y,"ActionRatHtml");function Kn(e,t){return r`<button.action type="button" disabled=${()=>e.disabled} onclick=${p(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(Kn,"$$ActionRatHtml");function Re(e,t){return Jn.call({props:e},e,t)}a(Re,"FactsRatHtml");function Jn(e,t){const n=(e.rows??[]).filter(([,l])=>l!=null&&l!=="");return r`
    <dl.facts>
      ${g(()=>n,l=>l,l=>r`<dt>${()=>l[0]}</dt><dd>${()=>l[1]}</dd>`)}
    </dl>
  `}a(Jn,"$$FactsRatHtml");function Ft(e,t){return Vn.call({props:e},e,t)}a(Ft,"StatusRatHtml");function Vn(e,t){const n=f(()=>I.value),l=f(()=>E.value);return r`
    ${v(()=>n.value,()=>r`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>n.value.files} files</p>`,()=>v(()=>l.value,()=>r`<p.status>${()=>l.value.total} files · ${()=>x.bytes(l.value.size)} · read ${()=>x.date(l.value.scannedAt)}</p>`))}
  `}a(Vn,"$$StatusRatHtml");function Xn(e,t){return Qn.call({props:e},e,t)}a(Xn,"TaskListRatHtml");function Qn(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},l=f(()=>H.value),i=f(()=>V.value),c=a(d=>d.state==="queued"||d.state==="running","isOpen"),o=a(d=>{const{done:h,total:u}=d.progress??{};return d.state==="running"&&h!=null?u?`${Math.round(h/u*100)}%`:`${h}`:n[d.state]},"stateOf"),s=a(d=>d.error??[o(d),d.endedAt&&x.date(d.endedAt)].filter(Boolean).join(" · "),"noteOf");function $(d){return r`
      <li class=${()=>"task "+d.state}>
        <svg-icon icon=${()=>d.icon} />
        <span.text>
          <span.name>${()=>d.label}</span>
          <small>${()=>s(d)}</small>
          ${v(()=>d.state==="running"&&d.progress?.total,()=>r`<progress max=${()=>d.progress.total} value=${()=>d.progress.done} />`)}
        </span>
        ${v(()=>c(d),()=>r`<btn-icon icon="lucide:x" label=${()=>"cancel "+d.label} onclick=${p(()=>hn(d.id))} />`)}
      </li>
    `}return a($,"row"),r`
    ${v(()=>l.value.length,()=>r`
        <ul.tasks>
          ${g(()=>l.value,d=>d,d=>r`${()=>$(d)}`)}
        </ul>
      `,()=>r`<p.empty>nothing to do</p>`)}
    ${v(()=>i.value.length,()=>r`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${p(mn)} />
        </div-x>
        <ul.tasks>
          ${g(()=>i.value,d=>d,d=>r`${()=>$(d)}`)}
        </ul>
      `)}
  `}a(Qn,"$$TaskListRatHtml");function Zn(e,t){return ea.call({props:e},e,t)}a(Zn,"ContextRatHtml");function ea(e,t){const n=f(()=>ge.value),l=f(()=>T.value),i=f(()=>fe.value),c=f(()=>RAT.app.router.$path.value),o=f(()=>R.value),s=f(()=>Cn.value),$=a(m=>"/"+(m.path??o.value).join("/"),"where"),d=a(m=>gt(m),"isMarked"),h=a((m,we)=>ln(m,we),"bookmark"),u=f(()=>o.value.length?Be(o.value):null),w=f(()=>o.value.length&&!u.value?an(W.value,Pe):null);return r`
    ${v(()=>n.value==="tasks",()=>r`<h2>Tasks</h2><${Xn} />`,()=>v(()=>l.value,()=>r`
          <h2>${()=>l.value.name}</h2>
          <${Re} ...${{get rows(){return[["name",l.value.name],["kind",l.value.kind==="directory"?"folder":l.value.type||"file"],["size",l.value.kind==="file"?x.bytes(l.value.size):null],["modified",l.value.lastModified?x.date(l.value.lastModified):null],["in",$(l.value)]]}}} />
          <div-x.actions>
            <${y} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>U(l.value,l.value.path??o.value),"onclick")}} />
            ${v(()=>l.value.path,()=>r`<${y} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>lt(l.value),"onclick")}} />`)}
            ${v(()=>l.value.kind==="file",()=>r`<${y} icon="lucide:download" label="download" ...${{onclick:a(()=>it(l.value),"onclick")}} />`)}
            ${v(()=>l.value.kind==="directory",()=>r`<${y} ...${{get icon(){return d([...o.value,l.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return d([...o.value,l.value.name])?"remove bookmark":"bookmark"},onclick:a(()=>h([...o.value,l.value.name],l.value.name),"onclick")}} />`)}
            <${y} icon="lucide:copy" label="copy" ...${{onclick:a(()=>ot("copy",l.value),"onclick")}} />
            <${y} icon="lucide:scissors" label="move" ...${{onclick:a(()=>ot("move",l.value),"onclick")}} />
            <${y} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>zn(l.value),"onclick")}} />
            <${y} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>En(l.value),"onclick")}} />
          </div-x>
        `,()=>v(()=>c.value==="/preview"&&i.value,()=>r`
            <h2>Details</h2>
            <${Re} ...${{get rows(){return[["name",i.value.name],["type",i.value.type||"unknown"],["size",x.bytes(i.value.size)],["dimensions",X.value?X.value.width+" × "+X.value.height:null],["modified",x.date(i.value.lastModified)],["in","/"+i.value.path.join("/")]]}}} />
            <div-x.actions>
              <${y} icon="lucide:download" label="download" ...${{onclick:a(()=>it(i.value),"onclick")}} />
              <${y} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>lt(i.value),"onclick")}} />
            </div-x>
          `,()=>v(()=>c.value==="/library"&&A(),()=>r`
              <h2>This folder</h2>
              <${Re} ...${{get rows(){return[["folder",o.value.at(-1)??S()],["contains",s.value.folders+" folders, "+s.value.files+" files"],["size",x.bytes(s.value.size)],["mostly",s.value.mostly]]}}} />
              <div-x.actions>
                <${y} icon="lucide:folder-plus" label="new folder" ...${{onclick:jt}} />
                ${v(()=>o.value.length,()=>r`<${y} ...${{get icon(){return d(o.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return d(o.value)?"remove bookmark":"bookmark"},onclick:a(()=>h(o.value,o.value.at(-1)),"onclick")}} />`)}
              </div-x>
              ${v(()=>o.value.length,()=>r`
                  <h3>Type</h3>
                  ${v(()=>w.value,()=>r`<p.hint>Looks like ${()=>w.value.label}. <button.link type="button" onclick=${p(()=>Se(o.value,w.value.id))}>Make it one</button></p>`)}
                  <div-x.actions>
                    ${g(()=>mt(),m=>m,m=>r`<button.action type="button" aria-pressed=${()=>String(u.value?.id===m.id)} onclick=${p(()=>Se(o.value,u.value?.id===m.id?null:m.id))}><svg-icon icon=${()=>m.icon} /> ${()=>m.label}</button>`)}
                    <${y} icon="lucide:plus" label="new type" ...${{onclick:a(()=>Nn(o.value),"onclick")}} />
                  </div-x>
                `)}
            `,()=>r`
              <h2>${()=>S()}</h2>
              <${Ft} />
              <div-x.actions><${y} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!A()||!!I.value},onclick:Sn}} /></div-x>
            `))))}
  `}a(ea,"$$ContextRatHtml");function L(e,t){return ta.call({props:e},e,t)}a(L,"BarRatHtml");function ta(e,t){return r`
    <header.bar>
      ${v(()=>e.back,()=>r`<btn-icon icon="lucide:arrow-left" label="back" onclick=${p(e.back)} />`,()=>r`<btn-icon icon="lucide:menu" label="menu" onclick=${p(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${p(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(ta,"$$BarRatHtml");function Xe(e,t){return na.call({props:e},e,t)}a(Xe,"ThumbRatHtml");function na(e,t){const n=e.entry,l=e.at??[],i=RAT.app.thumbnails,c=ze(n)?`${k.value?.addedAt}/${l.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let o=se(c?i.peekFile(c):null);function s($){if(!c||o.value)return;let d=!0;const h=new IntersectionObserver(([u])=>{u.isIntersecting&&(h.disconnect(),i.requestFile(c,()=>je(A(),l,n.name)).then(w=>{d&&w&&(o.value=w)}))},{rootMargin:"200px"});return h.observe($),()=>{d=!1,h.disconnect()}}return a(s,"watch"),r`
    <span.thumb ref=${Pt(s)}>
      ${v(()=>o.value,()=>r`<img src=${()=>o.value} alt="" loading="lazy" />`,()=>r`<svg-icon icon=${()=>zt(n,e.at)} />`)}
    </span>
  `}a(na,"$$ThumbRatHtml");function ct(e,t){return aa.call({props:e},e,t)}a(ct,"FileRowRatHtml");function aa(e,t){const n=e.entry;return r`
    <li.row>
      <button.entry type="button" onclick=${p(()=>U(n))}>
        <${Xe} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+x.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${p(()=>Et({...n,kind:"file"}))} />
    </li>
  `}a(aa,"$$FileRowRatHtml");function me(e,t){return la.call({props:e},e,t)}a(me,"SearchbarRatHtml");function la(e,t){const n=f(()=>$n.value),l=f(()=>H.value.length);return r`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${p(i=>e.onsearch?.(i.detail.query))} />
      <button type="button" class=${()=>n.value?"tasks-button busy":"tasks-button"} aria-label=${()=>l.value?`${l.value} tasks`:"tasks"} title=${()=>l.value?`${l.value} tasks`:"tasks"} onclick=${p(Mn)}>
        <svg-icon icon=${()=>n.value?"lucide:loader":"lucide:list-checks"} />
        ${v(()=>l.value,()=>r`<span.badge>${()=>l.value}</span>`)}
      </button>
    </div>
  `}a(la,"$$SearchbarRatHtml");const oa=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function ia(e,t){return ra.call({props:e},e,t)}a(ia,"LoadingRatHtml");function ra(e,t){return Ee("1tn1js8",oa),r`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${v(()=>e.text,()=>r`<span>${()=>e.text}</span>`)}
    </div>
  `}a(ra,"$$LoadingRatHtml");function Nt(e,t){return ca.call({props:e},e,t)}a(Nt,"WelcomeRatHtml");function ca(e,t){const n=f(()=>vt.value),l=f(()=>k.value);return r`
    ${v(()=>!$t(),()=>r`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>v(()=>!n.value,()=>r`<${ia} />`,()=>v(()=>!l.value,()=>r`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${p(pe)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>r`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>S()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${p(Dn)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(ca,"$$WelcomeRatHtml");function sa(e,t){return ua.call({props:e},e,t)}a(sa,"DashboardRatHtml");function ua(e,t){const n=a(u=>{N(u),RAT.app.router.go("/library")},"library"),l=f(()=>!!A()),i=f(()=>O.searchbar.value==="top"),c=f(()=>re.value.trim()),o=f(()=>ce.value),s=f(()=>E.value),$=f(()=>bt()),d=f(()=>rt.find(u=>u.id===o.value)?.label??o.value),h=[{icon:"lucide:cloud",label:"WebDAV, Nextcloud",note:"not ported to rat yet"},{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return r`
    <${L} title="Files" />
    ${v(()=>l.value&&i.value,()=>r`<${me} ...${{get placeholder(){return"Search in "+S()},onsearch:a(u=>re.value=u,"onsearch")}} />`)}
    <div.scroll>
      ${v(()=>!l.value,()=>r`<${Nt} />`,()=>v(()=>c.value,()=>r`
            <section>
              <h2>${()=>le.value.length?"Found "+(le.value.length>=100?"100+":le.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${g(()=>le.value,u=>u,u=>r`<${ct} ...${{get entry(){return u}}} />`)}
              </ul>
            </section>
          `,()=>v(()=>o.value,()=>r`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${p(()=>ce.value=null)} />
                  <h2>${()=>d.value}</h2>
                </div-x>
                <ul.rows>
                  ${g(()=>Ln.value,u=>u,u=>r`<${ct} ...${{get entry(){return u}}} />`)}
                </ul>
              </section>
            `,()=>r`
              ${v(()=>s.value?.recent?.length,()=>r`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${g(()=>s.value.recent,u=>u,u=>r`
                          <button.card type="button" onclick=${p(()=>U(u))}>
                            <${Xe} ...${{get entry(){return u},get at(){return u.path}}} />
                            <span.name>${()=>u.name}</span>
                            <small>${()=>x.date(u.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${v(()=>$.value.length,()=>r`
                    <ul.tiles>
                      ${g(()=>$.value,u=>u,u=>r`
                          <li>
                            <button.tile type="button" onclick=${p(()=>n(u.path))}>
                              <svg-icon icon=${()=>Be(u.path)?.icon??"lucide:bookmark"} />
                              <span.text>
                                <span.name>${()=>u.name}</span>
                                <small>/${()=>u.path.join("/")}</small>
                              </span>
                            </button>
                          </li>
                        `)}
                    </ul>
                  `,()=>r`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${g(()=>rt,u=>u,u=>r`
                      <li>
                        <button.tile type="button" disabled=${()=>!s.value?.categories?.[u.id]?.count} onclick=${p(()=>ce.value=u.id)}>
                          <svg-icon icon=${()=>u.icon} />
                          <span.text>
                            <span.name>${()=>u.label}</span>
                            <small>${()=>s.value?.categories?.[u.id]?s.value.categories[u.id].count+" · "+x.bytes(s.value.categories[u.id].size):"…"}</small>
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
                    <button.tile type="button" onclick=${p(()=>n([]))}>
                      <svg-icon icon="lucide:folder-open" />
                      <span.text>
                        <span.name>${()=>S()}</span>
                        <small>${()=>s.value?x.bytes(s.value.size):"the granted folder"}</small>
                      </span>
                    </button>
                  </li>
                </ul>
                <${Ft} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${g(()=>h,u=>u,u=>r`
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
    ${v(()=>l.value&&!i.value,()=>r`<${me} ...${{get placeholder(){return"Search in "+S()},onsearch:a(u=>re.value=u,"onsearch")}} />`)}
  `}a(ua,"$$DashboardRatHtml");function da(e,t){return va.call({props:e},e,t)}a(da,"EntryRatHtml");function va(e,t){const n=e.entry,l=R.peek(),i=f(()=>T.value?.name===n.name&&!T.value?.path),c=a(o=>{o.key==="Enter"&&!Ht()&&(o.preventDefault(),U(n))},"onkeydown");return r`
    <data-item>
      <div.row class:selected=${()=>i.value}>
        <button.entry type="button" aria-pressed=${()=>i.value?"true":null} onclick=${p(()=>On(n))} ondblclick=${p(()=>U(n))} onkeydown=${p(c)}>
          <${Xe} ...${{get entry(){return n},get at(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?x.date(n.lastModified)+" · "+x.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${p(()=>Et(n))} />
      </div>
    </data-item>
  `}a(va,"$$EntryRatHtml");function fa(e,t){return $a.call({props:e},e,t)}a(fa,"PasteBarRatHtml");function $a(e,t){const n=f(()=>j.value),l=f(()=>n.value?n.value.items.length===1?n.value.items[0].name:`${n.value.items.length} items`:"");return r`
    ${v(()=>n.value,()=>r`
        <div-x.pastebar>
          <svg-icon icon=${()=>n.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>l.value}</span>
            <small>${()=>n.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${p(jn)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the clipboard" onclick=${p(At)} />
        </div-x>
      `)}
  `}a($a,"$$PasteBarRatHtml");function st(e,t){return pa.call({props:e},e,t)}a(st,"TabsRatHtml");function pa(e,t){const n=f(()=>F.value),l=f(()=>M.value);return r`
    <div-x.tabs role="tablist" scrollable>
      ${g(()=>n.value,i=>i,i=>r`
          <div class=${()=>n.value.indexOf(i)===l.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(n.value.indexOf(i)===l.value)} onclick=${p(()=>Hn(n.value.indexOf(i)))}>${()=>nt(i)}</button>
            ${v(()=>n.value.length>1,()=>r`<btn-icon icon="lucide:x" label=${()=>"close "+nt(i)} onclick=${p(()=>An(n.value.indexOf(i)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${p(()=>Tn())} />
    </div-x>
  `}a(pa,"$$TabsRatHtml");function ha(e,t){return ma.call({props:e},e,t)}a(ha,"LibraryRatHtml");function ma(e,t){const n=f(()=>!!A()),l=f(()=>R.value),i=f(()=>O.viewmode.value),c=f(()=>O.tabbar.value==="top"),o=f(()=>O.searchbar.value==="top"),s=a(()=>l.value.length?N(l.value.slice(0,-1)):RAT.app.router.go("/"),"up"),$=a(()=>O.viewmode.value=i.value==="grid"?"list":"grid","toggle"),d=a(h=>N(h.detail.path.split("/").filter(Boolean)),"crumb");return r`
    ${v(()=>!n.value,()=>r`<${L} title="Library" /><div.scroll><${Nt} /></div>`,()=>r`
        <${L} ...${{get title(){return l.value.at(-1)??S()},get back(){return s}}}><btn-icon icon=${()=>i.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>i.value==="grid"?"show as list":"show as grid"} onclick=${p($)} /></${L}>
        ${v(()=>c.value,()=>r`<${st} />`)}
        ${v(()=>o.value,()=>r`<${me} placeholder="Filter this folder" ...${{get value(){return C.value},onsearch:a(h=>C.value=h,"onsearch")}} />`)}
        <nav-crumbs root=${()=>S()} path=${()=>"/"+l.value.join("/")} onnav-crumbs=${p(d)} />
        <div.pane>
          <div.listing>
            ${v(()=>Oe.value,()=>r`<svg-icon icon="lucide:loader" />`,()=>v(()=>at.value.length,()=>r`
                  <data-index viewmode=${()=>i.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${g(()=>at.value,h=>h,h=>r`<${da} ...${{get entry(){return h}}} />`)}
                  </data-index>
                `,()=>r`<p.empty>${()=>C.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label="new folder" title="new folder" onclick=${p(jt)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${fa} />
        ${v(()=>!o.value,()=>r`<${me} placeholder="Filter this folder" ...${{get value(){return C.value},onsearch:a(h=>C.value=h,"onsearch")}} />`)}
        ${v(()=>!c.value,()=>r`<${st} />`)}
      `)}
  `}a(ma,"$$LibraryRatHtml");const ba=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function ga(e,t){return ya.call({props:e},e,t)}a(ga,"BrandRatHtml");function ya(e,t){return Ee("1npwj96",ba),r`
    <div.brand data-rat="1npwj96">
      ${v(()=>e.icon,()=>r`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(ya,"$$BrandRatHtml");function wa(e,t){return ka.call({props:e},e,t)}a(wa,"MenuRatHtml");function ka(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"}],l=[{icon:"lucide:send",label:"Send"},{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],i=f(()=>RAT.app.router.$path.value);function c(o){RAT.app.router.go(o);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return a(c,"go"),r`
    <nav.menu>
      <${ga} name="Files" icon="./app.svg" />
      ${g(()=>n,o=>o,o=>r`<button type="button" aria-current=${()=>i.value===o.route?"page":null} onclick=${p(()=>c(o.route))}><svg-icon icon=${()=>o.icon} /> ${()=>o.label}</button>`)}
      <hr />
      ${g(()=>l,o=>o,o=>r`<button type="button" disabled><svg-icon icon=${()=>o.icon} /> ${()=>o.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${p(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(ka,"$$MenuRatHtml");function xa(e,t){return Ra.call({props:e},e,t)}a(xa,"PreferencesRatHtml");function Ra(e,t){const n={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=f(()=>k.value),i=a((c,o)=>O[c].value=o.detail?.value??o.target.value,"change");return r`
    <section>
      <h3>files</h3>
      ${g(()=>Object.keys(n),c=>c,c=>r`
          <label>
            <span>${()=>n[c].label}</span>
            <input-value look="segments" value=${()=>O[c].value} onchange=${p(o=>i(c,o))}>
              ${g(()=>n[c].values,o=>o,o=>r`<input-option value=${()=>o[0]}>${()=>o[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${v(()=>l.value,()=>r`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>l.value.name}</p>
          <div-x.actions>
            <${y} icon="lucide:folder-sync" label="change" ...${{onclick:pe}} />
            <${y} icon="lucide:x" label="close" ...${{onclick:Fn}} />
          </div-x>
        `,()=>r`<${y} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:pe}} />`)}
    </section>
  `}a(Ra,"$$PreferencesRatHtml");function Ta(e,t){return Aa.call({props:e},e,t)}a(Ta,"PreviewRatHtml");function Aa(e,t){const n=f(()=>fe.value);let l=se(null);G(()=>{const o=fe.value;if(X.value=null,l.value=null,!o||!ze(o))return;let s=null,$=!0;return je(A(),o.path,o.name).then(d=>{$&&(l.value=s=URL.createObjectURL(d))}),()=>{$=!1,s&&URL.revokeObjectURL(s)}});const i=a(o=>X.value={height:o.target.naturalHeight,width:o.target.naturalWidth},"loaded"),c=a(()=>{T.value=null,RAT.app.toggle("context")},"info");return r`
    ${v(()=>!n.value,()=>r`
        <${L} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>r`
        <${L} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${p(c)} /></${L}>
        <div.stage>
          ${v(()=>ze(n.value),()=>r`
              ${v(()=>l.value,()=>r`<img src=${()=>l.value} alt=${()=>n.value.name} onload=${p(i)} />`)}
            `,()=>r`<svg-icon icon=${()=>zt(n.value)} />`)}
        </div>
      `)}
  `}a(Aa,"$$PreviewRatHtml");const Ct=`appearance:${new URL(".",location.href).pathname}`,ut={density:B.densities,geometry:B.geometries,mode:B.modes},Z=ee(Ct,{}),Ha=a(()=>B.palettes().catch(()=>[]),"palettes");function Sa(e,t){return Z[e]=t||null,Y(Ct,Z),B.set({[e]:t||null})}a(Sa,"setAppearance");Object.keys(Z).length&&B.set(Z);const Oa=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function dt(e,t){return Ma.call({props:e},e,t)}a(dt,"SettingsRatHtml");function Ma(e,t){Ee("177zzh1",Oa);let n=se({...Z}),l=se([]);const i=f(()=>te.value);Ha().then(s=>{l.value=s});function c(s,$){const d=$.detail?.value??$.target.value;n.value={...n.value,[s]:d},Sa(s,d)}a(c,"change");async function o(){await Bn()&&z.success(`${e.name??"the app"} is installed`)}return a(o,"installApp"),r`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${p(s=>c("palette",s))}>
            ${g(()=>l.value,s=>s,s=>r`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${g(()=>Object.keys(ut),s=>s,s=>r`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${p($=>c(s,$))}>
                ${g(()=>ut[s],$=>$,$=>r`<input-option value=${()=>$}>${()=>$}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${v(()=>!Dt,()=>r`
          <section>
            <h3>install</h3>
            ${v(()=>i.value,()=>r`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${p(o)} />`,()=>r`
                ${v(()=>In,()=>r`<p.hint>Share, then "Add to Home Screen".</p>`,()=>r`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(Ma,"$$SettingsRatHtml");function Ia(e,t){return za.call({props:e},e,t)}a(Ia,"AppRatHtml");function za(e,t){return RAT.app.hold(Xt().catch(l=>z.error(l.message??String(l)))),Pn("Files"),r`
    <rat-area name="menu" dock="start"><${wa} /></rat-area>
    <rat-view route="/" name="dashboard"><${sa} /></rat-view>
    <rat-view route="/library" name="library"><${ha} /></rat-view>
    <rat-view route="/preview" name="preview" transition="slide"><${Ta} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${p(a(l=>{l.detail?.open||(ge.value=null)},"ontoggle"))}><div.context><${Zn} /></div></rat-area>
    <rat-area name="config" dock="end"><${dt} name="Files"><${xa} /></${dt}></rat-area>
  `}a(za,"$$AppRatHtml");export{Ia as default};
