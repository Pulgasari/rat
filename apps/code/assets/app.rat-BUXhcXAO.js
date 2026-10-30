var en=Object.defineProperty;var a=(e,t)=>en(e,"name",{value:t,configurable:!0});import{k as ve,m as A,o as T,q as Qe,t as k,u as j,v as Ie,B as S,E as L,w as C,g as tn,x as nn,S as Y,P as an,y as on,z as ft,A as Z,C as rn,G as te,H as mt,J as pt,K as ht,M as vt,i as bt,O as sn,Q as $t,T as ln,V as cn,W as un}from"./index-I_I07oe7.js";import{p as dn,a as fn}from"./keys-CWTtq0D5.js";import{_ as mn,w as $,h as s,f as x}from"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function pn(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],r=t[o];n[o]=ve(i)?i:A(()=>e[o]===void 0&&r?r():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(pn,"signalsOf");function h(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return ve(i)?i.value:i},set value(i){const r=o();if(!ve(r))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");r.value=i}}}a(h,"imported");function b(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?dn(t):null;let r=o;return function(c){if(!(o&&!r)&&!(i&&!fn(c,i))){n&&c.preventDefault(),o&&r--;try{const u=(typeof e=="string"?T(e):e).call(this,c);typeof u?.catch=="function"&&u.catch(l=>Qe(this,l,"handler"))}catch(u){Qe(this,u,"handler")}}}}a(b,"listener");const me="input, textarea, [contenteditable]",Ae=a(e=>e.setAttribute("virtualkeyboardpolicy","manual"),"setManual"),hn=a(e=>e.removeAttribute("virtualkeyboardpolicy"),"setAuto"),gt=a(()=>navigator.virtualKeyboard?.hide(),"onFocusIn");let be=null;const vn=a(()=>{navigator.virtualKeyboard&&(navigator.virtualKeyboard.overlaysContent=!0,document.querySelectorAll(me).forEach(Ae),be=new MutationObserver(e=>{for(const{addedNodes:t}of e)for(const n of t)n.nodeType===1&&(n.matches?.(me)&&Ae(n),n.querySelectorAll?.(me).forEach(Ae))}),be.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("focusin",gt,!0))},"disableAndroidKeyboard"),wt=a(()=>{navigator.virtualKeyboard&&(navigator.virtualKeyboard.overlaysContent=!1,document.querySelectorAll(me).forEach(hn),be?.disconnect(),be=null,document.removeEventListener("focusin",gt,!0))},"enableAndroidKeyboard"),bn={commitPrompt:S,disableAndroidKeyboard:S.default(!0),fileSizeFormat:L("formatted","bytes","chars"),fontSize:L(10,11,12,13,14,16).default(12),showBrowser:S,showKeyboard:S.default(!0),showStatusbar:S.default(!0),showToolbar:S.default(!0)},H=j("config",Ie(bn).create()),yt={commands:"commands",files:"files",settings:"config"};let F=k(null);function Me(e){F.value=F.value===e?null:e}a(Me,"toggle$1");const kt=a(()=>{F.value=null},"close$1");C(()=>{for(const[e,t]of Object.entries(yt))RAT.app.toggle(t,F.value===e)});function $n(e){yt[F.value]===e&&(F.value=null)}a($n,"closed");C(()=>document.documentElement.style.setProperty("--font-size",`${H.fontSize}px`));C(()=>H.disableAndroidKeyboard||H.showKeyboard?vn():wt());const gn={bash:"shell",c:"c",cc:"cpp",cjs:"javascript",cpp:"cpp",cs:"csharp",css:"css",go:"go",h:"c",hpp:"cpp",htm:"html",html:"html",ini:"ini",java:"java",js:"javascript",json:"json",jsx:"javascript",less:"less",markdown:"markdown",md:"markdown",mjs:"javascript",php:"php",py:"python",rat:"rat",rb:"ruby",rs:"rust",scss:"scss",sh:"shell",sql:"sql",svg:"xml",toml:"ini",ts:"typescript",tsx:"typescript",xml:"xml",yaml:"yaml",yml:"yaml"},wn=a(e=>/\.rat\.js$/i.test(e)?"ratjs":gn[e.split(".").pop().toLowerCase()]??"plaintext","languageOf"),yn=a(e=>e.subarray(0,8e3).includes(0),"isBinary"),M=new tn;let D=k(null);const kn=a(e=>M.find(t=>t.id===e),"byId$1");async function xn(e,{id:t,where:n=""}){const o=kn(t);if(o)return D.value=o,o;const i=new Uint8Array(await(await e.getFile()).arrayBuffer()),r=yn(i),c=new Ie({content:r?"":new TextDecoder().decode(i),dirty:!1,handle:e,id:t,language:wn(e.name),name:e.name,readOnly:r||!!e.readOnly,where:n});return M.push(c),D.value=c,c}a(xn,"open");const Sn=a(e=>{D.value=e},"show$1");async function et(e=D.value,t){if(!e||e.readOnly)return!1;const{handle:n}=e;if(await n.requestPermission?.({mode:"readwrite"})==="denied")throw new Error(`No permission to write ${e.name}`);const o=await n.createWritable(t);return await o.write(e.content),await o.close(),e.dirty=!1,!0}a(et,"save");function We(e){const t=M.indexOf(e);M.remove(e),D.value===e&&(D.value=M.at(Math.min(t,M.length-1))??null)}a(We,"close");function Ke(e){for(const t of M.filter(n=>n.id===e||n.id.startsWith(`${e}/`)).toArray())We(t)}a(Ke,"closeUnder");const An="0.50.0",xt=`https://cdn.jsdelivr.net/npm/monaco-editor@${An}/min/`,Ee=`${xt}vs`;let En=null;function Tn(){return En??=new Promise((e,t)=>{const n=URL.createObjectURL(new Blob([`self.MonacoEnvironment = { baseUrl: '${xt}' };
`,`importScripts('${Ee}/base/worker/workerMain.js');`],{type:"text/javascript"}));self.MonacoEnvironment={getWorkerUrl:a(()=>n,"getWorkerUrl")};const o=Object.assign(document.createElement("script"),{src:`${Ee}/loader.js`});o.onerror=()=>t(new Error("[code] the monaco loader did not load")),o.onload=()=>{globalThis.require.config({paths:{vs:Ee}}),globalThis.require(["vs/editor/editor.main"],async()=>{const{monaco:i}=globalThis;try{(await mn(async()=>{const{register:r}=await import("./monaco-D5K8UBMT.js");return{register:r}},[],import.meta.url)).register(i)}catch(r){console.warn("[code] rat syntax unavailable",r)}e(i)},t)},document.head.append(o)})}a(Tn,"loadMonaco");const St=["vs","vs-dark","hc-black","hc-light"],At={active4d:"Active4D","all-hallows-eve":"All Hallows Eve",amy:"Amy","birds-of-paradise":"Birds of Paradise",blackboard:"Blackboard","brilliance-black":"Brilliance Black","brilliance-dull":"Brilliance Dull","chrome-devtools":"Chrome DevTools",clouds:"Clouds","clouds-midnight":"Clouds Midnight",cobalt:"Cobalt",cobalt2:"Cobalt2",dawn:"Dawn",dracula:"Dracula",dreamweaver:"Dreamweaver",eiffel:"Eiffel","espresso-libre":"Espresso Libre",github:"GitHub","github-dark":"GitHub Dark","github-light":"GitHub Light",idle:"IDLE",idlefingers:"idleFingers",iplastic:"iPlastic",katzenmilch:"Katzenmilch",krtheme:"krTheme","kuroir-theme":"Kuroir Theme",lazy:"LAZY","magicwb--amiga-":"MagicWB (Amiga)",merbivore:"Merbivore","merbivore-soft":"Merbivore Soft",monoindustrial:"monoindustrial",monokai:"Monokai","monokai-bright":"Monokai Bright","night-owl":"Night Owl",nord:"Nord","oceanic-next":"Oceanic Next","pastels-on-dark":"Pastels on Dark","slush-and-poppies":"Slush and Poppies","solarized-dark":"Solarized-dark","solarized-light":"Solarized-light",spacecadet:"SpaceCadet",sunburst:"Sunburst","textmate--mac-classic-":"Textmate (Mac Classic)",tomorrow:"Tomorrow","tomorrow-night":"Tomorrow-Night","tomorrow-night-blue":"Tomorrow-Night-Blue","tomorrow-night-bright":"Tomorrow-Night-Bright","tomorrow-night-eighties":"Tomorrow-Night-Eighties",twilight:"Twilight","upstream-sunburst":"Upstream Sunburst","vibrant-ink":"Vibrant Ink","xcode-default":"Xcode_default",zenburnesque:"Zenburnesque"},On=[...St,...Object.keys(At)],Cn={autoIndent:L("none","keep","brackets","advanced","full"),contextmenu:S,cursorBlinking:L("blink","smooth","phase","expand","solid"),cursorStyle:L("line","block","underline","line-thin","block-outline","underline-thin"),folding:S.default(!0),fontLigatures:S.default(!0),fontSize:L(8,9,10,11,12,13,14,16,18).default(13),insertSpaces:S.default(!0),lineNumbers:S.default(!0),minimap:S,readOnly:S,scrollBeyondLastLine:S,showUnused:S.default(!0),tabSize:L(2,4,8),theme:L(...On).default("dracula"),wordBasedSuggestions:S,wordWrap:L("off","on","wordWrapColumn","bounded"),wrappingStrategy:L("simple","advanced")},Rn={automaticLayout:!0,cursorWidth:2,disableLayerHinting:!0,dragAndDrop:!0,letterSpacing:0,lineNumbersMinChars:3,links:!0,renderLineHighlight:"none"},B=j("options",Ie(Cn).create());let Et=k(null);const tt=a(({lineNumbers:e,minimap:t,theme:n,...o})=>({...Rn,...o,lineNumbers:e?"on":"off",minimap:{enabled:t,renderCharacters:!1,side:"right"}}),"optionsOf");function I(e){e==="wordWrap"?B.wordWrap=B.wordWrap==="off"?"on":"off":B[e]=!B[e]}a(I,"toggle");function nt(e){Et.value=e}a(nt,"setInstance");const at=new Set;async function Dn(e){const{monaco:t}=globalThis;if(t){if(!St.includes(e)&&!at.has(e))try{const n=await fetch(`https://unpkg.com/monaco-themes/themes/${encodeURIComponent(At[e])}.json`);t.editor.defineTheme(e,await n.json()),at.add(e)}catch(n){return console.warn(`[code] theme ${e} unavailable`,n),t.editor.setTheme("vs-dark")}t.editor.setTheme(e)}}a(Dn,"applyTheme");const Ln=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function Mn(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(Mn,"toBase64$1");const Hn=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64$1"),jn=new Set([101,204,205,304]);async function Bn(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:r}={}){const c=Ln();if(!c)return fetch(e,{body:t,headers:n,method:o,signal:i});const u=await c.request({body:await Mn(t),headers:n,method:o,timeout:r,url:e});return new Response(jn.has(u.status)?null:Hn(u.data),{headers:u.headers,status:u.status,statusText:u.statusText})}a(Bn,"request$2");const Nn=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),zn=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath$1"),Tt=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),U=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join$1");function Ot(e,t="",n=!1){const o=new URL(zn(t),Tt(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(Ot,"urlFor");const Fn={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class Te extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function J(e,t,{body:n,headers:o={},isDir:i=!1,method:r="GET"}={}){if(!e)throw new Error("No webdav connection.");let c;try{c=await Bn(Ot(e,t,i),{body:n,headers:{Authorization:Nn(e),...o},method:r})}catch(u){throw globalThis.Capacitor?.isNativePlatform?.()?new Te(0,`Connection failed: ${u?.message??u}`):new Te(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!c.ok)throw new Te(c.status,Fn[c.status]??`${c.status} ${c.statusText}`);return c}a(J,"request$1");const Pn='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',He="DAV:",ue=a((e,t)=>e.getElementsByTagNameNS(He,t)[0]?.textContent??"","firstText");async function Ct(e,t,n){const o=await J(e,t,{body:Pn,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),r=new URL(Tt(e)).pathname,c=a(u=>{const l=decodeURIComponent(new URL(u,e.url).pathname);return(l.startsWith(r)?l.slice(r.length):l).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(He,"response")].map(u=>{const l=c(ue(u,"href"));return{isDir:u.getElementsByTagNameNS(He,"collection").length>0,lastModified:Date.parse(ue(u,"getlastmodified"))||0,mime:ue(u,"getcontenttype"),name:l.split("/").pop(),path:l,size:Number(ue(u,"getcontentlength"))||0}})}a(Ct,"propfind");async function Rt(e,t=""){const n=U(t);return(await Ct(e,t,1)).filter(i=>i.path!==n).sort((i,r)=>i.isDir===r.isDir?i.name.localeCompare(r.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(Rt,"list");async function Oe(e,t){try{return(await Ct(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(Oe,"stat");const Un=a(async(e,t)=>(await J(e,t)).blob(),"read"),Dt=a((e,t,n)=>J(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),In=a((e,t)=>J(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Wn=a((e,t,n=!1)=>J(e,t,{isDir:n,method:"DELETE"}),"remove$3"),Kn=a((e,t,n)=>({Destination:Ot(e,t,n),Overwrite:"F"}),"destination"),Lt=a((e,t,n,o=!1)=>J(e,t,{headers:Kn(e,n,o),isDir:o,method:"MOVE"}),"move$1"),qn=a(e=>Rt(e,""),"test"),Ce=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound$1"),ot=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class we{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof we&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class it extends we{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await Un(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await Dt(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof W)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=U(t.path,n);await Lt(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class W extends we{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await Rt(this.connection,this.path))yield[t.name,t.isDir?new W(this.connection,t.path,t.name):new it(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=U(this.path,t),i=await Oe(this.connection,o);if(i&&!i.isDir)throw ot(t);if(!i){if(!n)throw Ce(t);await In(this.connection,o)}return new W(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=U(this.path,t),i=await Oe(this.connection,o);if(i?.isDir)throw ot(t);if(!i){if(!n)throw Ce(t);await Dt(this.connection,o,new Blob([]))}return new it(this.connection,o,t,i)}async removeEntry(t){const n=U(this.path,t),o=await Oe(this.connection,n);if(!o)throw Ce(t);await Wn(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof W)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=U(t.path,n);await Lt(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Gn=a(e=>new W(e,"",e.name||new URL(e.url).host),"davRoot"),{files:Mt}=RAT.app,Ht="remotes.json",pe=new Map,Vn={id:Y,name:Y,password:Y,url:Y,username:Y},se=nn(Vn).create(await Mt.read(Ht,"json").catch(()=>[]));C(()=>Mt.write(Ht,JSON.stringify(se)));const _n=A(()=>se.toArray()),Jn=a(e=>se.one({id:e})??null,"byId");async function Xn({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const r={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await qn(r),se.push(r),r}a(Xn,"add$1");function Yn(e){se.drop({id:e}),pe.delete(e)}a(Yn,"remove$2");function Zn(e){const t=Jn(e);return t?(pe.has(e)||pe.set(e,Gn(t)),pe.get(e)):null}a(Zn,"rootOf");const Qn=h(()=>_n),{folders:X}=RAT.app,{perms:ea,sources:ta}=pn(X,{perms:null,sources:null});let qe=j("kind","local");const na=A(()=>ta.value.map(({id:e,name:t})=>{const n=ea.value[e]==="granted";return{granted:n,handle:n?X.handleOf(e):null,id:`local:${e}`,name:t,source:e}})),aa=A(()=>Qn.value.map(({id:e,name:t})=>({handle:Zn(e),id:`dav:${e}`,name:t,source:e}))),jt=a(e=>{qe.value=e},"show"),oa=a(()=>X.load(),"load$1"),ia=a(()=>X.add(),"add"),ra=a(e=>X.reconnect(e.source),"reconnect");async function sa(e){await RAT.app.dialogs.confirm({message:`Forget “${e.name}”? Its files stay where they are.`,ok:"Forget",title:e.name})&&await X.remove(e.source)}a(sa,"forget");const je=h(()=>H),Be=h(()=>D),la=h(()=>M),$e=h(()=>Et),Q=h(()=>B),{commands:Bt,dialogs:ca}=RAT.app;let ee=j("favourites",[]);const Nt=a(e=>Bt.run(e),"run"),g=a(e=>()=>$e.value?.getAction(e)?.run(),"action"),ua=a(e=>()=>$e.value?.trigger("keyboard",e,null),"trigger"),de=a(e=>()=>{je.value[e]=!je.value[e]},"flip"),Re=a((e,t)=>()=>{t&&jt(t),Me(e)},"panel");async function rt(e=Be.value){if(!e)return;if(!je.value.commitPrompt||!e.id.startsWith("gh:"))return et(e);const t=await ca.prompt({message:"Commit message",ok:"Commit",title:e.name,value:`Update ${e.name}`});if(t)return et(e,{message:t})}a(rt,"saveDocument");const zt={commands:{exec:a(()=>Me("commands"),"exec"),title:"Commands"},files:{exec:Re("files","local"),title:"Folders"},github:{exec:Re("files","github"),title:"GitHub"},settings:{exec:a(()=>Me("settings"),"exec"),title:"Settings"},webdav:{exec:Re("files","webdav"),title:"WebDAV"},"toggle-browser":{exec:de("showBrowser"),title:"Toggle Browser"},"toggle-keyboard":{exec:de("showKeyboard"),title:"Toggle Keyboard"},"toggle-statusbar":{exec:de("showStatusbar"),title:"Toggle Statusbar"},"toggle-toolbar":{exec:de("showToolbar"),title:"Toggle Toolbar"},"close-file":{exec:a(()=>{Be.value&&We(Be.value)},"exec"),title:"Close File"},save:{exec:a(()=>rt(),"exec"),title:"Save"},"save-all":{exec:a(async()=>{for(const e of la.value.filter(t=>t.dirty).toArray())await rt(e)},"exec"),title:"Save All"},copy:{exec:g("editor.action.clipboardCopyAction"),title:"Copy"},cut:{exec:g("editor.action.clipboardCutAction"),title:"Cut"},paste:{exec:g("editor.action.clipboardPasteAction"),title:"Paste"},redo:{exec:a(()=>$e.value?.getModel()?.redo(),"exec"),title:"Redo"},undo:{exec:a(()=>$e.value?.getModel()?.undo(),"exec"),title:"Undo"},"add-cursor-above":{exec:g("editor.action.insertCursorAbove"),title:"Add Cursor Above"},"add-cursor-below":{exec:g("editor.action.insertCursorBelow"),title:"Add Cursor Below"},"expand-selection":{exec:g("editor.action.smartSelect.expand"),title:"Expand Selection"},"select-all":{exec:ua("editor.action.selectAll"),title:"Select All"},"select-next-match":{exec:g("editor.action.addSelectionToNextFindMatch"),title:"Select Next Match"},"shrink-selection":{exec:g("editor.action.smartSelect.shrink"),title:"Shrink Selection"},"comment-block":{exec:g("editor.action.blockComment"),title:"Toggle Block Comment"},"comment-line":{exec:g("editor.action.commentLine"),title:"Toggle Line Comment"},"delete-lines":{exec:g("editor.action.deleteLines"),title:"Delete Line"},"duplicate-line":{exec:g("editor.action.copyLinesDownAction"),title:"Duplicate Line"},"indent-lines":{exec:g("editor.action.indentLines"),title:"Indent"},"join-lines":{exec:g("editor.action.joinLines"),title:"Join Lines"},"move-line-down":{exec:g("editor.action.moveLinesDownAction"),title:"Move Line Down"},"move-line-up":{exec:g("editor.action.moveLinesUpAction"),title:"Move Line Up"},"outdent-lines":{exec:g("editor.action.outdentLines"),title:"Outdent"},"sort-lines-asc":{exec:g("editor.action.sortLinesAscending"),title:"Sort Lines Ascending"},"sort-lines-desc":{exec:g("editor.action.sortLinesDescending"),title:"Sort Lines Descending"},fold:{exec:g("editor.fold"),title:"Fold"},"fold-all":{exec:g("editor.foldAll"),title:"Fold All"},"fold-recursive":{exec:g("editor.foldRecursive"),title:"Fold Recursive"},unfold:{exec:g("editor.unfold"),title:"Unfold"},"unfold-all":{exec:g("editor.unfoldAll"),title:"Unfold All"},find:{exec:g("actions.find"),title:"Find"},"find-next":{exec:g("editor.action.nextMatchFindAction"),title:"Find Next"},"find-previous":{exec:g("editor.action.previousMatchFindAction"),title:"Find Previous"},replace:{exec:g("editor.action.startFindReplaceAction"),title:"Find and Replace"},format:{exec:g("editor.action.formatDocument"),title:"Format Document"},"format-selection":{exec:g("editor.action.formatSelection"),title:"Format Selection"},"go-to-definition":{exec:g("editor.action.revealDefinition"),title:"Go to Definition"},"quick-fix":{exec:g("editor.action.quickFix"),title:"Quick Fix"},"rename-symbol":{exec:g("editor.action.rename"),title:"Rename Symbol"},"font-larger":{exec:a(()=>{Q.value.fontSize=st(Q.value.fontSize,1)},"exec"),title:"Font Size +"},"font-smaller":{exec:a(()=>{Q.value.fontSize=st(Q.value.fontSize,-1)},"exec"),title:"Font Size –"},"toggle-line-numbers":{exec:a(()=>I("lineNumbers"),"exec"),title:"Toggle Line Numbers"},"toggle-minimap":{exec:a(()=>I("minimap"),"exec"),title:"Toggle Minimap"},"toggle-word-wrap":{exec:a(()=>I("wordWrap"),"exec"),title:"Toggle Word Wrap"}};function st(e,t){const n=Q.value.schema.parts.fontSize.describe.values;return n[Math.min(n.length-1,Math.max(0,n.indexOf(e)+t))]??e}a(st,"next");Bt.assign(zt);const da=a(()=>Object.entries(zt).map(([e,{title:t}])=>({name:e,title:t})),"all");function fa(e){ee.value=ee.value.includes(e)?ee.value.filter(t=>t!==e):[...ee.value,e]}a(fa,"star");const ma="https://api.github.com";async function E(e,t,{body:n,method:o="GET"}={}){const i=await fetch(t.startsWith("http")?t:ma+t,{body:n?JSON.stringify(n):void 0,headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28",...e?{Authorization:`Bearer ${e}`}:{},...n?{"Content-Type":"application/json"}:{}},method:o});if(i.ok)return i.status===204?null:i.json();let r=`${i.status} ${i.statusText}`;try{r=(await i.json()).message??r}catch{}throw i.status===401&&(r="The token is invalid or expired"),i.status===403&&i.headers.get("x-ratelimit-remaining")==="0"&&(r="GitHub’s rate limit is reached, try again later"),new Error(r)}a(E,"request");const pa=a(e=>Uint8Array.from(atob(e.replace(/\n/g,"")),t=>t.charCodeAt(0)),"fromBase64");function ha(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}a(ha,"toBase64");const Ft=a(e=>e.split("/").map(encodeURIComponent).join("/"),"encodePath"),R=a(({name:e,owner:t})=>`/repos/${t}/${e}`,"base"),Pt=a(e=>E(e,"/user"),"user");async function Ut(e){const t=a(o=>E(e,`/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member&page=${o}`),"page");return(await Promise.all([t(1),t(2)])).flat().map(o=>It(o,!1))}a(Ut,"repos");const va=a(async(e,t,n)=>It(await E(e,`/repos/${t}/${n}`),!0),"repo"),It=a((e,t)=>({branch:e.default_branch,full:e.full_name,name:e.name,owner:e.owner.login,private:e.private,readOnly:t}),"repoOf");function ba(e){const t=/(?:github\.com\/)?([^/\s]+)\/([^/\s#?]+?)(?:\.git)?(?:[/#?].*)?$/i.exec(String(e??"").trim());return t?{name:t[2],owner:t[1]}:null}a(ba,"parseRepo");const $a=a(async e=>(await E(e.token,`${R(e)}/branches?per_page=100`)).map(t=>t.name),"branches$1"),ga=a(async(e,t)=>(await E(e.token,`${R(e)}/git/trees/${encodeURIComponent(t)}`)).tree??[],"tree"),wa=a(async(e,t)=>{const n=await E(e.token,`${R(e)}/git/blobs/${t}`);return n.encoding==="base64"?pa(n.content):new TextEncoder().encode(n.content??"")},"blob");async function Ne(e,t,n,o,i){const r={branch:e.branch,content:ha(n),message:i,...o?{sha:o}:{}};return(await E(e.token,`${R(e)}/contents/${Ft(t)}`,{body:r,method:"PUT"})).content.sha}a(Ne,"put");async function Ge(e){const t=await E(e.token,`${R(e)}/git/ref/heads/${e.branch}`),n=await E(e.token,`${R(e)}/git/commits/${t.object.sha}`);return{commit:t.object.sha,tree:n.tree.sha}}a(Ge,"head");async function Wt(e,t,n){const{tree:o=[]}=await E(e.token,`${R(e)}/git/trees/${n}?recursive=1`);return o.filter(i=>i.type==="blob"&&i.path.startsWith(`${t}/`))}a(Wt,"blobsUnder");async function ze(e,t,n){const{commit:o,tree:i}=await Ge(e),r=await E(e.token,`${R(e)}/git/trees`,{body:{base_tree:i,tree:t},method:"POST"}),c=await E(e.token,`${R(e)}/git/commits`,{body:{message:n,parents:[o],tree:r.sha},method:"POST"});return await E(e.token,`${R(e)}/git/refs/heads/${e.branch}`,{body:{sha:c.sha},method:"PATCH"}),c.sha}a(ze,"commit");async function ya(e,t,{isDir:n,sha:o}){if(!n)return E(e.token,`${R(e)}/contents/${Ft(t)}`,{body:{branch:e.branch,message:`Delete ${t}`,sha:o},method:"DELETE"});const i=await Wt(e,t,(await Ge(e)).tree);return ze(e,i.map(r=>({mode:r.mode,path:r.path,sha:null,type:"blob"})),`Delete ${t}/`)}a(ya,"remove$1");async function ka(e,t,n,{isDir:o,mode:i="100644",sha:r}){if(!o)return ze(e,[{mode:i,path:n,sha:r,type:"blob"},{mode:i,path:t,sha:null,type:"blob"}],`Rename ${t} to ${n}`);const c=await Wt(e,t,(await Ge(e)).tree);return ze(e,c.flatMap(u=>[{mode:u.mode,path:n+u.path.slice(t.length),sha:u.sha,type:"blob"},{mode:u.mode,path:u.path,sha:null,type:"blob"}]),`Rename ${t}/ to ${n}/`)}a(ka,"move");const he=a((...e)=>e.filter(Boolean).join("/"),"join"),De=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),ne=a(()=>new DOMException("this repository is read only","NotAllowedError"),"readOnly");class ye{static{a(this,"GitHubHandle")}constructor(t,n,o,i=null,r=void 0){Object.assign(this,{mode:r,name:o,path:n,repo:t,sha:i})}get readOnly(){return!!this.repo.readOnly}async isSameEntry(t){return t instanceof ye&&t.kind===this.kind&&t.repo===this.repo&&t.path===this.path}async queryPermission({mode:t="read"}={}){return t==="readwrite"&&this.readOnly?"denied":"granted"}async requestPermission(t){return this.queryPermission(t)}async move(t,n=this.name){if(this.readOnly)throw ne();if(!(t instanceof oe)||t.repo!==this.repo)throw new DOMException("move across repositories","NotSupportedError");const o=he(t.path,n);await ka(this.repo,this.path,o,{isDir:this.kind==="directory",mode:this.mode,sha:this.sha}),Object.assign(this,{name:n,path:o})}}class lt extends ye{static{a(this,"GitHubFileHandle")}kind="file";async getFile(){return new File([await wa(this.repo,this.sha)],this.name)}async createWritable({message:t}={}){if(this.readOnly)throw ne();const n=[];return{abort:a(async()=>{n.length=0},"abort"),close:a(async()=>{this.sha=await Ne(this.repo,this.path,new Uint8Array(await new Blob(n).arrayBuffer()),this.sha,t??`Update ${this.path}`)},"close"),write:a(async o=>{n.push(o?.type==="write"?o.data:o)},"write")}}}class oe extends ye{static{a(this,"GitHubDirectoryHandle")}kind="directory";async*entries(){const t=this.path?`${this.repo.branch}:${this.path}`:this.repo.branch;for(const n of await ga(this.repo,t)){const o=n.type==="tree"?oe:lt;(n.type==="tree"||n.type==="blob")&&(yield[n.path,new o(this.repo,he(this.path,n.path),n.path,n.sha,n.mode)])}}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async#e(t){for await(const[n,o]of this.entries())if(n===t)return o;return null}async getFileHandle(t,{create:n=!1}={}){const o=await this.#e(t);if(o?.kind==="directory")throw new DOMException(`“${t}” is a folder`,"TypeMismatchError");if(o)return o;if(!n)throw De(t);if(this.readOnly)throw ne();const i=he(this.path,t);return new lt(this.repo,i,t,await Ne(this.repo,i,new Uint8Array,null,`Create ${i}`))}async getDirectoryHandle(t,{create:n=!1}={}){const o=await this.#e(t);if(o?.kind==="file")throw new DOMException(`“${t}” is a file`,"TypeMismatchError");if(o)return o;if(!n)throw De(t);if(this.readOnly)throw ne();const i=he(this.path,t);return await Ne(this.repo,`${i}/.gitkeep`,new Uint8Array,null,`Create ${i}/`),new oe(this.repo,i,t)}async removeEntry(t){if(this.readOnly)throw ne();const n=await this.#e(t);if(!n)throw De(t);await ya(this.repo,n.path,{isDir:n.kind==="directory",sha:n.sha})}}const xa=a(e=>new oe(e,"",`${e.owner}/${e.name}`),"githubRoot"),Sa="https://github.com/settings/personal-access-tokens/new";let N=j("token",null),P=j("branch",null),K=j("pinned",[]),O=j("repo",null),Fe=k(""),Pe=k(null),ke=k([]),V=k(null);const Aa=A(()=>O.value&&P.value?xa({...O.value,branch:P.value,token:N.value}):null),Ea=A(()=>!!V.value&&!!O.value&&!O.value.readOnly);async function Kt(e,t){Fe.value=e,Pe.value=null;try{return await t()}catch(n){throw Pe.value=n.message,n}finally{Fe.value=""}}a(Kt,"busy");async function Ta(){if(N.value)try{V.value=await Pt(N.value),ke.value=await Ut(N.value)}catch{V.value=null}}a(Ta,"load");const Oa=a(e=>Kt("Connecting …",async()=>{const t=String(e??"").trim();if(!t)throw new Error("Paste a token first");V.value=await Pt(t),N.value=t,ke.value=await Ut(t)}),"connect");function Ca(){N.value=V.value=null,ke.value=[],O.value?.readOnly||(O.value=P.value=null)}a(Ca,"disconnect");const Ra=a(e=>Kt("Adding …",async()=>{const t=ba(e);if(!t)throw new Error("A repository as owner/name or a GitHub url");if(K.value.some(o=>o.full.toLowerCase()===`${t.owner}/${t.name}`.toLowerCase()))throw new Error("That one is pinned already");const n=await va(N.value,t.owner,t.name);K.value=[n,...K.value],qt(n)}),"pin");function Da(e){K.value=K.value.filter(t=>t.full!==e),O.value?.full===e&&(O.value=P.value=null)}a(Da,"unpin");function qt(e){O.value=e,P.value=e.branch}a(qt,"choose");const La=a(e=>{P.value=e},"chooseBranch"),Ma=a(()=>O.value?$a({...O.value,token:N.value}):Promise.resolve([]),"branches"),fe=a(e=>(t,n)=>an.notify(t,{...n,type:e}),"notify"),Ve=Object.assign(fe("info"),{error:fe("error"),info:fe("info"),success:fe("success")});let ae=null;const le=on(!1),Gt=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ha=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Gt;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ae=e,le.value=!0});addEventListener("appinstalled",()=>{ae=null,le.value=!1});async function ja(){if(!ae)return!1;const e=ae;return ae=null,le.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(ja,"install");function Ba(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),Ve(`${e} can be installed: see the settings`))},"show");le.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(Ba,"hint");function Na(e,t){return za.call({props:e},e,t)}a(Na,"BrowserRatHtml");function za(e,t){const n=h(()=>D);return s`
    <div.browser>
      ${$(()=>n.value?.language==="html",()=>s`<iframe title="preview" sandbox="allow-scripts" srcdoc=${()=>n.value.content} />`,()=>s`<p.none>A preview for html documents</p>`)}
    </div>
  `}a(za,"$$BrowserRatHtml");function Fa(e,t){return Pa.call({props:e},e,t)}a(Fa,"CommandsRatHtml");function Pa(e,t){const n=h(()=>ee),o=da();let i=k("");const r=A(()=>o.filter(({name:f,title:w})=>`${w} ${f}`.toLowerCase().includes(i.value.trim().toLowerCase()))),c=A(()=>r.value.filter(f=>n.value.includes(f.name))),u=A(()=>r.value.filter(f=>!n.value.includes(f.name)));function l(f){kt(),Nt(f)}a(l,"go");function m(f){return s`
      <li>
        <button.run onclick=${b(()=>l(f.name))}>
          <strong>${()=>f.title}</strong>
          <small>${()=>f.name}</small>
        </button>
        <btn-icon icon=${()=>n.value.includes(f.name)?"starred":"star"} label="favourite" onclick=${b(()=>fa(f.name))} />
      </li>
    `}return a(m,"row"),s`
    <section.commands>
      <input type="search" placeholder="Search commands …" ref=${ft(i,"value")} />
      ${$(()=>c.value.length,()=>s`
          <h3>Favourites</h3>
          <ul>
            ${x(()=>c.value,f=>f,f=>s`${()=>m(f)}`)}
          </ul>
        `)}
      <h3>All</h3>
      <ul>
        ${x(()=>u.value,f=>f,f=>s`${()=>m(f)}`)}
      </ul>
      ${$(()=>!r.value.length,()=>s`<p.none>No command matches</p>`)}
    </section>
  `}a(Pa,"$$CommandsRatHtml");function Ua(e,t){return Ia.call({props:e},e,t)}a(Ua,"WelcomeRatHtml");function Ia(e,t){const n=new URL(""+new URL("app-DqjHgYJa.svg",import.meta.url).href,import.meta.url).href;return s`
    <div.welcome>
      <img src=${()=>n} alt="Code" width="160" height="160" />
      <button.hint onclick=${T("files")}>
        <svg-icon icon="info" />
        <span>No file open: open a folder, a repository or a server to start.</span>
      </button>
    </div>
  `}a(Ia,"$$WelcomeRatHtml");function Wa(e,t){return Ka.call({props:e},e,t)}a(Wa,"EditorRatHtml");function Ka(e,t){const n=h(()=>D),o=h(()=>B);let i=k(null),r=k(null),c=!1;C(()=>{const l=i.value;if(!l)return;let m=!0,f=null;return Tn().then(w=>{m&&(f=w.editor.create(l,Z(()=>tt(o.value.toJSON()))),f.onDidChangeModelContent(()=>{const d=Z(()=>n.value);c||!d||(d.content=f.getValue(),d.dirty=!0)}),r.value=f,nt(f))}),()=>{m=!1,f?.dispose(),r.value=null,nt(null)}}),C(()=>{const l=r.value,m=n.value;!l||!m||Z(()=>{l.getValue()!==m.content&&(c=!0,l.setValue(m.content),c=!1),globalThis.monaco.editor.setModelLanguage(l.getModel(),m.language),l.updateOptions({readOnly:m.readOnly||o.value.readOnly})})}),C(()=>{const l=tt(o.value.toJSON());r.value?.updateOptions({...l,readOnly:Z(()=>n.value?.readOnly)||l.readOnly})});const u=A(()=>o.value.theme);return C(()=>{r.value&&Dn(u.value)}),s`
    <div.editor>
      ${$(()=>!n.value,()=>s`<${Ua} />`)}
      <div.monaco ref=${rn(i)} hidden=${()=>!n.value} />
    </div>
  `}a(Ka,"$$EditorRatHtml");function qa(e,t){return Ga.call({props:e},e,t)}a(qa,"KeyboardRatHtml");function Ga(e,t){const n=h(()=>H),o={regular:["qwertzuiopü","asdfghjklöä","--yxcvbnm--"],shift:["QWERTZUIOPÜ","ASDFGHJKLÖÄ","--YXCVBNM--"],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']},i={backspace:{key:"Backspace",keyCode:8},down:{key:"ArrowDown",keyCode:40},enter:{key:"Enter",keyCode:13},left:{key:"ArrowLeft",keyCode:37},right:{key:"ArrowRight",keyCode:39},space:{key:" ",keyCode:32},tab:{key:"Tab",keyCode:9},up:{key:"ArrowUp",keyCode:38}},r=[["tab","tab-rtl"],["capslock","backspace"],["shift","enter"]];let c=k(!1),u=k(!1);const l=A(()=>c.value||u.value?o.shift:o.regular);function m(d,v={}){const y=document.activeElement;if(!y)return;const z={bubbles:!0,cancelable:!0,key:d,shiftKey:u.value||c.value,...v};if(y.dispatchEvent(new KeyboardEvent("keydown",z)),d.length===1&&/^(INPUT|TEXTAREA)$/.test(y.tagName)){const{selectionEnd:ce,selectionStart:p}=y;y.value=y.value.slice(0,p)+d+y.value.slice(ce),y.selectionStart=y.selectionEnd=p+d.length,y.dispatchEvent(new Event("input",{bubbles:!0}))}y.dispatchEvent(new KeyboardEvent("keyup",z)),u.value&&!c.value&&(u.value=!1)}a(m,"send");function f(d,v){if(d.preventDefault(),v==="shift"){u.value=!u.value;return}if(v==="capslock"){c.value=!c.value,u.value=!1;return}if(v==="tab-rtl")return m("Tab",{keyCode:9,shiftKey:!0});if(i[v])return m(i[v].key,{keyCode:i[v].keyCode});m(v)}a(f,"press"),C(()=>()=>{n.value.disableAndroidKeyboard||wt()});function w(d,v,y){return s`
      <button.key class=${()=>y} class:active=${()=>d==="shift"&&u.value||d==="capslock"&&c.value} tabindex="-1" onmousedown=${b(z=>f(z,d))}>
        ${$(()=>v,()=>s`<svg-icon icon=${()=>v} />`,()=>s`${()=>d}`)}
      </button>
    `}return a(w,"key"),s`
    <div.keyboard>
      <div.symbols>
        ${x(()=>o.symbols,d=>d,d=>s`
            <div.row>
              ${x(()=>[...d],v=>v,v=>s`${()=>w(v,null,"symbol")}`)}
            </div>
          `)}
      </div>
      <div.keys>
        ${x(()=>l.value,d=>d,(d,v)=>s`
            <div.row>
              ${()=>w(r[v][0],r[v][0],"w-2")}
              ${x(()=>[...d],y=>y,y=>s`
                  ${$(()=>y==="-",()=>s`<span.spacer />`,()=>s`${()=>w(y,null,"")}`)}
                `)}
              ${()=>w(r[v][1],r[v][1],"w-2")}
            </div>
          `)}
        <div.row>
          <button.key.w-2 disabled tabindex="-1">ctrl</button>
          <button.key.w-2 disabled tabindex="-1">alt</button>
          ${()=>w("space","space","w-7")}
          ${()=>w("up","arrow-up","")}
          ${()=>w("down","arrow-down","")}
          ${()=>w("left","arrow-left","")}
          ${()=>w("right","arrow-right","")}
        </div>
      </div>
    </div>
  `}a(Ga,"$$KeyboardRatHtml");function Vt(e,t){return Va.call({props:e},e,t)}a(Vt,"PickerRatHtml");function Va(e,t){const n=a(l=>typeof l=="object"&&l!==null&&!Array.isArray(l),"isObject"),o=e.signal??(ve(e.value)?e.value:null),i=a(l=>Array.isArray(l)?{label:String(l[1]??l[0]),title:String(l[1]??l[0]),value:l[0]}:n(l)?{icon:l.icon,label:l.label??(l.icon?"":String(l.value)),title:l.title??l.label??String(l.value),value:l.value}:{label:String(l),title:String(l),value:l},"normalize"),r=A(()=>o?o.value:e.value),c=A(()=>(e.options??o?.values??[]).map(i));function u(l){const m=l.detail?.value??l.target?.value;o&&(o.value=m),e.onchange?.(m)}return a(u,"change"),s`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>r.value} onchange=${b(u)}>
      ${x(()=>c.value,l=>l,l=>s`<input-option icon=${()=>l.icon} label=${()=>l.label} title=${()=>l.title} value=${()=>l.value} />`)}
    </input-value>
  `}a(Va,"$$PickerRatHtml");function _a(e,t){return Ja.call({props:e},e,t)}a(_a,"PreferencesRatHtml");function Ja(e,t){const n=h(()=>H),o=h(()=>B),i=[["true","on"],["false","off"]],r=a(m=>Object.entries(m.schema.parts).map(([f,w])=>({key:f,values:w.kind==="bool"?null:w.describe.values})),"fieldsOf"),c=a(m=>m.replace(/[A-Z]/g,f=>` ${f.toLowerCase()}`),"labelOf");function u(m,f,w){m[f.key]=f.values?f.values.find(d=>String(d)===String(w)):String(w)==="true"}a(u,"set");function l(m){return s`
      ${x(()=>r(m),f=>f,f=>s`
          <label>
            <span>${()=>c(f.key)}</span>
            <${Vt} ...${{get look(){return f.values?.length>4?"combobox":"segments"},get options(){return f.values??i},get value(){return String(m[f.key])},onchange:a(w=>u(m,f,w),"onchange")}} />
          </label>
        `)}
    `}return a(l,"fields"),s`
    <section><h3>code</h3>${()=>l(n.value)}</section>
    <section><h3>editor</h3>${()=>l(o.value)}</section>
  `}a(Ja,"$$PreferencesRatHtml");const ie=j("appearance",{}),ct={density:te.densities,geometry:te.geometries,mode:te.modes},Xa=a(()=>ie.value,"appearance"),Ya=a(()=>te.palettes().catch(()=>[]),"palettes");function _t(e){const t=document.querySelector("rat-app");for(const[n,o]of Object.entries(e))o?t?.setAttribute(n,o):t?.removeAttribute(n);return te.set(e)}a(_t,"apply");function Za(e,t){return ie.value={...ie.value,[e]:t||null},_t({[e]:t||null})}a(Za,"setAppearance");Object.keys(ie.value).length&&_t(ie.value);const Qa=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function ut(e,t){return eo.call({props:e},e,t)}a(ut,"SettingsRatHtml");function eo(e,t){mt("177zzh1",Qa);let n=k({...Xa()}),o=k([]);const i=A(()=>le.value);Ya().then(u=>{o.value=u});function r(u,l){const m=l.detail?.value??l.target.value;n.value={...n.value,[u]:m},Za(u,m)}a(r,"change");async function c(){await ja()&&Ve.success(`${e.name??"the app"} is installed`)}return a(c,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${b(u=>r("palette",u))}>
            ${x(()=>o.value,u=>u,u=>s`<input-option value=${()=>u}>${()=>u}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(ct),u=>u,u=>s`
            <label>
              <span>${()=>u}</span>
              <input-value look="segments" value=${()=>n.value[u]??""} onchange=${b(l=>r(u,l))}>
                ${x(()=>ct[u],l=>l,l=>s`<input-option value=${()=>l}>${()=>l}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${$(()=>!Gt,()=>s`
          <section>
            <h3>install</h3>
            ${$(()=>i.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${b(c)} />`,()=>s`
                ${$(()=>Ha,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(eo,"$$SettingsRatHtml");function to(e,t){return no.call({props:e},e,t)}a(to,"LinkRatHtml");function no(e,t){return s`
    <a.link class=${()=>e.class} href=${()=>e.href} title=${()=>e.title} target="_blank" rel="noopener">
      ${$(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${()=>e.label??e.text??""}
      ${t}
    </a>
  `}a(no,"$$LinkRatHtml");const ao={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function oo(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a(oo,"extOf");class _{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof _?t:new _(oo(t))}get mimeType(){return ao[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}const io=a(()=>new bt({initial:"",kind:"fileext",run:a((e,t)=>e instanceof _?{value:e}:sn(e)?{value:new _(e)}:$t("expected an extension",t),"run")}),"fileExtOf"),ro=pt(ht(_,io,{kind:"fileext",make:vt,name:"FileExt"})),Le=new Map;class q extends cn{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof q)return t;const n=un(t,"/").join("/");return Le.has(n)||Le.set(n,new q(n)),Le.get(n)}static get root(){return q.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return ro.from(this.name)}child(t){return this.with(t)}}const so=a(()=>new bt({initial:"",kind:"path",run:a((e,t)=>ln(e)?{value:q.from(e)}:$t("expected a path",t),"run")}),"pathOf");pt(ht(q,so,{kind:"path",make:vt,name:"Path"}));async function _e(e,t,n,o){const i=await e.getFile(),c=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(c instanceof WritableStream)){await c.write(await i.arrayBuffer()),await c.close();return}try{await i.stream().pipeTo(c,{signal:o})}catch(u){throw await c.abort?.().catch(()=>{}),u}}a(_e,"copyFile");async function Je(e,t,n,o,i=()=>{}){const r=await t.getDirectoryHandle(n,{create:!0});for await(const c of e.values())c.kind==="directory"?await Je(c,r,c.name,o,i):(await _e(c,r,c.name,o),i())}a(Je,"copyTree");const{dialogs:Jt}=RAT.app;let G=k(null),Xt=k(0);const xe=a(()=>{Xt.value++},"changed"),lo=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function co(e){const t=[];for await(const n of e.values())t.push(n);return t.sort(lo)}a(co,"entries");const Ue=a(e=>!!e&&!/[\\/\0]/.test(e)&&e!=="."&&e!=="..","valid"),Xe=a((e,t="")=>Jt.prompt({message:e,ok:"OK",title:e,value:t}),"ask");async function uo(e,t){for await(const n of e.values())if(n.name===t)return!0;return!1}a(uo,"taken");async function Ye(e,t){for(;Ue(t)&&await uo(e,t);)t=await Xe(`“${t}” exists, another name`,t);return Ue(t)?t:null}a(Ye,"free");async function ge(e,t){const n=await Ye(t,await Xe(e==="directory"?"New folder":"New file"));n&&(e==="directory"?await t.getDirectoryHandle(n,{create:!0}):await t.getFileHandle(n,{create:!0}),xe())}a(ge,"create");async function Yt({handle:e,parent:t},n,o){try{await e.move(n,o);return}catch{}e.kind==="directory"?await Je(e,n,o):await _e(e,n,o),await t.removeEntry(e.name,{recursive:!0})}a(Yt,"moveTo");async function fo(e){const t=await Xe("Rename",e.handle.name);!Ue(t)||t===e.handle.name||await Ye(e.parent,t)&&(await Yt(e,e.parent,t),Ke(e.id),xe())}a(fo,"rename");async function mo(e){await Jt.confirm({message:`Delete “${e.handle.name}”?`,ok:"Delete",title:"Delete"})&&(await e.parent.removeEntry(e.handle.name,{recursive:!0}),Ke(e.id),xe())}a(mo,"remove");const dt=a((e,t)=>{G.value={entry:t,mode:e}},"pick");async function Zt(e){if(!G.value)return;const{entry:t,mode:n}=G.value,o=await Ye(e,t.handle.name);o&&(n==="cut"?(await Yt(t,e,o),Ke(t.id),G.value=null):t.handle.kind==="directory"?await Je(t.handle,e,o):await _e(t.handle,e,o),xe())}a(Zt,"paste");function po(e,t){return ho.call({props:e},e,t)}a(po,"RowMenuRatHtml");function ho(e,t){function n(o,i){o.currentTarget.closest("details").open=!1,i.onclick()}return a(n,"run"),s`
    ${$(()=>e.items?.length,()=>s`
        <details.row-menu>
          <summary aria-label="actions"><svg-icon icon="more" /></summary>
          <div.pop>
            ${x(()=>e.items,o=>o,o=>s`<button onclick=${b(i=>n(i,o))}><svg-icon icon=${()=>o.icon} /> ${()=>o.label}</button>`)}
          </div>
        </details>
      `)}
  `}a(ho,"$$RowMenuRatHtml");function Qt(e,t){return vo.call({props:e},e,t)}a(Qt,"TreeRatHtml");function vo(e,t){const n=h(()=>G),o=h(()=>Xt);let i=k(null),r=k(null),c=k([]);C(()=>{const d=e.dir;let v=!0;return o.value,co(d).then(y=>{v&&(r.value=y,i.value=null)},y=>{v&&(i.value=y.message)}),()=>{v=!1}});const u=a(d=>`${e.id}/${d.name}`,"idOf"),l=a(d=>d.kind==="directory","isFolder"),m=a(d=>c.value.includes(d.name),"isOpen");async function f(d){if(l(d)){c.value=m(d)?c.value.filter(v=>v!==d.name):[...c.value,d.name];return}await xn(d,{id:u(d),where:e.where}),kt()}a(f,"activate");function w(d){const v={handle:d,id:u(d),parent:e.dir};return e.readOnly?[]:[l(d)&&{icon:"file-add",label:"New file",onclick:a(()=>ge("file",d),"onclick")},l(d)&&{icon:"folder-add",label:"New folder",onclick:a(()=>ge("directory",d),"onclick")},l(d)&&n.value&&{icon:"paste",label:"Paste",onclick:a(()=>Zt(d),"onclick")},{icon:"edit",label:"Rename",onclick:a(()=>fo(v),"onclick")},{icon:"copy",label:"Copy",onclick:a(()=>dt("copy",v),"onclick")},{icon:"cut",label:"Cut",onclick:a(()=>dt("cut",v),"onclick")},{icon:"delete",label:"Delete",onclick:a(()=>mo(v),"onclick")}].filter(Boolean)}return a(w,"itemsOf"),s`
    <ul.tree>
      ${$(()=>i.value,()=>s`<li.error>${()=>i.value}</li>`)}
      ${x(()=>r.value??[],d=>d,d=>s`
          <li>
            <div.row>
              <button.entry onclick=${b(()=>f(d))}>
                <svg-icon icon=${()=>l(d)?m(d)?"folder-open":"folder":"file"} />
                <span>${()=>d.name}</span>
              </button>
              <${po} ...${{get items(){return w(d)}}} />
            </div>
            ${$(()=>l(d)&&m(d),()=>s`<${Qt} ...${{get dir(){return d},get id(){return u(d)},get where(){return e.where},get readOnly(){return e.readOnly}}} />`)}
          </li>
        `,()=>s`${$(()=>r.value,()=>s`<li.none>Empty</li>`)}`)}
    </ul>
  `}a(vo,"$$TreeRatHtml");function re(e,t){return bo.call({props:e},e,t)}a(re,"RootRatHtml");function bo(e,t){const n=h(()=>G);let o=k(!0);return s`
    <div.root>
      <div.head>
        <button.name onclick=${b(()=>{o.value=!o.value})}>
          <svg-icon icon=${()=>o.value?"chevron-down":"chevron-right"} />
          <span>${()=>e.name}</span>
        </button>
        ${$(()=>e.handle&&!e.readOnly,()=>s`
            <btn-icon icon="file-add" label="new file" onclick=${b(()=>ge("file",e.handle))} />
            <btn-icon icon="folder-add" label="new folder" onclick=${b(()=>ge("directory",e.handle))} />
            ${$(()=>n.value,()=>s`<btn-icon icon="paste" label="paste" onclick=${b(()=>Zt(e.handle))} />`)}
          `)}
        ${t}
      </div>
      ${$(()=>e.handle&&o.value,()=>s`<${Qt} ...${{get dir(){return e.handle},get id(){return e.id},get where(){return e.name},get readOnly(){return e.readOnly}}} />`)}
    </div>
  `}a(bo,"$$RootRatHtml");function $o(e,t){return go.call({props:e},e,t)}a($o,"GitHubSourceRatHtml");function go(e,t){const n=h(()=>P),o=h(()=>Fe),i=h(()=>Pe),r=h(()=>K),c=h(()=>O),u=h(()=>ke),l=h(()=>Aa),m=h(()=>V),f=h(()=>Ea);let w=k(!1),d=k(""),v=k([]);const y=A(()=>u.value.filter(p=>p.full.toLowerCase().includes(d.value.trim().toLowerCase())));C(()=>{const p=c.value;v.value=p?[p.branch]:[],p&&Ma().then(Se=>{p===Z(()=>c.value)&&(v.value=Se)},()=>{})});const z=a(p=>{qt(p),w.value=!1},"pick");async function ce(p,Se){p.preventDefault();const Ze=p.currentTarget;await Se(new FormData(Ze).get("value")),Ze.reset()}return a(ce,"submit"),s`
    ${$(()=>m.value,()=>s`
        <div.account>
          <svg-icon icon="github" />
          <span>${()=>m.value.login}</span>
          <btn-push label="Disconnect" onclick=${b(Ca)} />
        </div>
      `)}
    ${$(()=>i.value,()=>s`<p.error><svg-icon icon="warning" /> ${()=>i.value}</p>`)}
    ${$(()=>c.value&&!w.value,()=>s`
        <div.repo>
          <btn-push icon=${()=>c.value.readOnly?"web":"folder-open"} label=${()=>c.value.full} onclick=${b(()=>{w.value=!0})} />
          <select value=${()=>n.value} onchange=${b(p=>La(p.target.value))}>
            ${x(()=>v.value,p=>p,p=>s`<option value=${()=>p} selected=${()=>p===n.value}>${()=>p}</option>`)}
          </select>
        </div>
        <${re} ...${{get handle(){return l.value},get id(){return`gh:${c.value.full}@${n.value}`},get name(){return c.value.full},get readOnly(){return!f.value}}} />
      `,()=>s`
        ${$(()=>!m.value,()=>s`
            <form.connect onsubmit=${b(p=>ce(p,Oa))}>
              <p>A <strong>fine-grained personal access token</strong> with <em>contents: read and write</em> edits your own repositories. A public one below reads without.</p>
              <${to} ...${{get href(){return Sa}}} label="Create a token" />
              <input name="value" type="password" placeholder="github_pat_…" />
              <btn-push type="submit" label=${()=>o.value||"Connect"} disabled=${()=>!!o.value} />
            </form>
          `)}
        <form.connect onsubmit=${b(p=>ce(p,Ra))}>
          <input name="value" placeholder="A public repo: owner/name or its url" />
          <btn-push type="submit" label="Pin" disabled=${()=>!!o.value} />
        </form>
        <ul.repos>
          ${x(()=>r.value,p=>p,p=>s`
              <li>
                <button onclick=${b(()=>z(p))}><svg-icon icon="web" /> ${()=>p.full} <small>read only</small></button>
                <btn-icon icon="close" label="unpin" onclick=${b(()=>Da(p.full))} />
              </li>
            `)}
        </ul>
        ${$(()=>m.value,()=>s`
            <input type="search" placeholder="Filter repositories …" ref=${ft(d,"value")} />
            <ul.repos>
              ${x(()=>y.value,p=>p,p=>s`<li><button onclick=${b(()=>z(p))}><svg-icon icon=${()=>p.private?"lock":"web"} /> ${()=>p.full}</button></li>`)}
            </ul>
          `)}
      `)}
  `}a(go,"$$GitHubSourceRatHtml");const wo=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
  .empty {
    align-content  : center;
    display        : grid;
    gap            : 0.5rem;
    justify-items  : center;
    min-block-size : 50dvh;
    text-align     : center;
  }
  
  svg-icon { font-size: 3rem; opacity: 0.5; }
  .title   { font-weight: 600; margin: 0; }
  .hint    { margin: 0; opacity: 0.7; }
}`;function yo(e,t){return ko.call({props:e},e,t)}a(yo,"EmptyRatHtml");function ko(e,t){return mt("ihnpco",wo),s`
    <div.empty data-rat="ihnpco">
      ${$(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${$(()=>e.title,()=>s`<p.title>${()=>e.title}</p>`)}
      ${$(()=>e.hint,()=>s`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}a(ko,"$$EmptyRatHtml");function xo(e,t){return So.call({props:e},e,t)}a(xo,"LocalSourceRatHtml");function So(e,t){const n=h(()=>na);return s`
    <btn-push icon="folder-add" label="Add a folder" onclick=${b(ia)} />
    ${x(()=>n.value,o=>o,o=>s`
        <${re} ...${{get handle(){return o.handle},get id(){return o.id},get name(){return o.name}}}>
          ${$(()=>!o.granted,()=>s`<btn-icon icon="folder-key" label="reconnect" onclick=${b(()=>ra(o))} />`)}
          <btn-icon icon="close" label="forget" onclick=${b(()=>sa(o))} />
        </${re}>
      `,()=>s`<${yo} icon="folder-open" title="No folder yet" hint="A folder of your device: it is edited where it is, nothing is uploaded." />`)}
  `}a(So,"$$LocalSourceRatHtml");function Ao(e,t){return Eo.call({props:e},e,t)}a(Ao,"WebDAVSourceRatHtml");function Eo(e,t){const n=h(()=>aa);let o=k(!1);async function i(r){r.preventDefault();const c=r.currentTarget;o.value=!0;try{await Xn(Object.fromEntries(new FormData(c))),c.reset()}finally{o.value=!1}}return a(i,"submit"),s`
    ${x(()=>n.value,r=>r,r=>s`<${re} ...${{get handle(){return r.handle},get id(){return r.id},get name(){return r.name}}}><btn-icon icon="close" label="forget" onclick=${b(()=>Yn(r.source))} /></${re}>`)}
    <form.connect onsubmit=${b(i)}>
      <input name="name" placeholder="Name (optional)" />
      <input name="url" placeholder="https://cloud.example.com/remote.php/dav/files/me/" type="url" required />
      <input name="username" placeholder="Username" autocomplete="username" />
      <input name="password" placeholder="Password or app password" type="password" autocomplete="current-password" />
      <btn-push type="submit" icon="cloud" label=${()=>o.value?"Connecting …":"Connect"} disabled=${()=>o.value} />
    </form>
  `}a(Eo,"$$WebDAVSourceRatHtml");function To(e,t){return Oo.call({props:e},e,t)}a(To,"SourcesRatHtml");function Oo(e,t){const n=h(()=>qe),o=[["local","Folders"],["github","GitHub"],["webdav","WebDAV"]];return s`
    <section.sources>
      <${Vt} look="segments" ...${{get options(){return o},get value(){return n.value},onchange:jt}} />
      ${$(()=>n.value==="github",()=>s`<${$o} />`,()=>$(()=>n.value==="webdav",()=>s`<${Ao} />`,()=>s`<${xo} />`))}
    </section>
  `}a(Oo,"$$SourcesRatHtml");const Co=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes");function Ro(e,t){return Do.call({props:e},e,t)}a(Ro,"StatusbarRatHtml");function Do(e,t){const n=h(()=>H),o=h(()=>D),i=h(()=>B),r=["formatted","bytes","chars"],c=a((m,f)=>f==="chars"?`${m.length} chars`:f==="bytes"?`${new Blob([m]).size} B`:Co(new Blob([m]).size),"sizeOf"),u=a(()=>{n.value.fileSizeFormat=r[(r.indexOf(n.value.fileSizeFormat)+1)%r.length]},"cycle"),l=a(m=>m?"on":"off","onOff");return s`
    <footer.statusbar>
      ${$(()=>o.value,()=>s`
          ${$(()=>o.value.where,()=>s`
              <span.item.where title=${()=>o.value.where}>${()=>o.value.where}</span>
              <span.sep>·</span>
            `)}
          <span.item.language>${()=>o.value.language}</span>
          <span.sep>·</span>
          <button.item onclick=${b(u)}>${()=>c(o.value.content,n.value.fileSizeFormat)}</button>
          <span.sep>·</span>
          <button.item onclick=${T("settings")}>${()=>i.value.insertSpaces?`Spaces: ${i.value.tabSize}`:"Tabs"}</button>
        `,()=>s`<span.item>No file</span>`)}
      <span.spacer />
      <button.item onclick=${b(()=>I("wordWrap"))}>Wrap: ${()=>i.value.wordWrap}</button>
      <span.sep>·</span>
      <button.item onclick=${b(()=>I("minimap"))}>Map: ${()=>l(i.value.minimap)}</button>
      <span.sep>·</span>
      <button.item onclick=${b(()=>I("lineNumbers"))}>Lines: ${()=>l(i.value.lineNumbers)}</button>
      <span.sep>·</span>
      <span.item>${()=>i.value.fontSize}px</span>
    </footer>
  `}a(Do,"$$StatusbarRatHtml");function Lo(e,t){return Mo.call({props:e},e,t)}a(Lo,"TabsRatHtml");function Mo(e,t){const n=h(()=>D),o=h(()=>M);return s`
    <nav.tabs>
      ${x(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button.name onclick=${b(()=>Sn(i))}>
              <svg-icon icon="file" />
              <span>${()=>i.name}</span>
              ${$(()=>i.dirty,()=>s`<span.dirty>●</span>`)}
            </button>
            <btn-icon icon="close" label="close" onclick=${b(()=>We(i))} />
          </div>
        `,()=>s`<p.none>No files open</p>`)}
    </nav>
  `}a(Mo,"$$TabsRatHtml");function Ho(e,t){return jo.call({props:e},e,t)}a(Ho,"TapsRatHtml");function jo(e,t){const n=h(()=>H),o=h(()=>F),i=h(()=>qe),r=a(c=>o.value==="files"&&i.value===c,"showing");return s`
    <nav.taps>
      <div.section>
        <btn-icon icon="settings" label="settings" class:active=${()=>o.value==="settings"} onclick=${T("settings")} />
        <btn-icon icon="folder-tree" label="folders" class:active=${()=>r("local")} onclick=${T("files")} />
        <btn-icon icon="github" label="github" class:active=${()=>r("github")} onclick=${T("github")} />
        <btn-icon icon="cloud" label="webdav" class:active=${()=>r("webdav")} onclick=${T("webdav")} />
      </div>
      <div.section>
        <btn-icon icon="undo" label="undo" onclick=${T("undo")} />
        <btn-icon icon="commands" label="commands" class:active=${()=>o.value==="commands"} onclick=${T("commands")} />
        <btn-icon icon="redo" label="redo" onclick=${T("redo")} />
      </div>
      <div.section>
        <btn-icon icon="web" label="browser" class:active=${()=>n.value.showBrowser} onclick=${T("toggle-browser")} />
        <btn-icon icon="keyboard" label="keyboard" class:active=${()=>n.value.showKeyboard} onclick=${T("toggle-keyboard")} />
        <btn-icon icon="toolbar" label="toolbar" class:active=${()=>n.value.showToolbar} onclick=${T("toggle-toolbar")} />
      </div>
    </nav>
  `}a(jo,"$$TapsRatHtml");function Bo(e,t){return No.call({props:e},e,t)}a(Bo,"ToolbarRatHtml");function No(e,t){const n=[{command:"save",icon:"save",label:"save"},{command:"copy",icon:"copy",label:"copy"},{command:"cut",icon:"cut",label:"cut"},{command:"paste",icon:"paste",label:"paste"},{command:"select-all",icon:"select-all",label:"select all"},{command:"duplicate-line",icon:"duplicate-line",label:"duplicate line"},{command:"move-line-down",icon:"move-line-down",label:"move line down"},{command:"move-line-up",icon:"move-line-up",label:"move line up"},{command:"join-lines",icon:"join-lines",label:"join lines"},{command:"sort-lines-asc",icon:"sort-lines",label:"sort lines"}];return s`
    <div.toolbar>
      ${x(()=>n,o=>o,o=>s`<btn-icon icon=${()=>o.icon} label=${()=>o.label} onclick=${b(()=>Nt(o.command))} />`)}
    </div>
  `}a(No,"$$ToolbarRatHtml");function Vo(e,t){return zo.call({props:e},e,t)}a(Vo,"AppRatHtml");function zo(e,t){const n=h(()=>H);RAT.app.on("error",Ve.error),RAT.app.hold(oa()),Ta(),Ba("Code");const o=a(i=>r=>{r.detail?.open||$n(i)},"ontoggle");return s`
    <rat-area name="main">
      <div.workspace>
        ${$(()=>n.value.showBrowser,()=>s`<${Na} />`)}
        ${$(()=>n.value.showStatusbar,()=>s`<${Ro} />`)}
        <${Lo} />
        <${Wa} />
        ${$(()=>n.value.showToolbar,()=>s`<${Bo} />`)}
      </div>
      <div.underdock>
        ${$(()=>n.value.showKeyboard,()=>s`<${qa} />`)}
        <${Ho} />
      </div>
    </rat-area>
    <rat-area name="files" dock="start" ontoggle=${b(o("files"))}><${To} /></rat-area>
    <rat-area name="config" dock="end" ontoggle=${b(o("config"))}><${ut} name="Code"><${_a} /></${ut}></rat-area>
    <rat-area name="commands" dock="bottom" ontoggle=${b(o("commands"))}><${Fa} /></rat-area>
  `}a(zo,"$$AppRatHtml");export{Vo as default};
