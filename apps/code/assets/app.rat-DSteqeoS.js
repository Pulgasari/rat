var Yt=Object.defineProperty;var a=(e,t)=>Yt(e,"name",{value:t,configurable:!0});import{k as ve,m as A,o as E,q as Qe,t as k,u as H,v as Ie,B as S,E as L,w as C,g as Zt,x as Qt,S as Z,P as en,y as tn,z as ft,A as Q,C as nn,G as K,H as mt,J as pt,K as ht,i as vt,M as an,O as on,Q as rn,T as sn}from"./index-DLlspG37.js";import{p as ln,a as cn}from"./keys-CWTtq0D5.js";import{_ as un,w as $,h as s,f as x}from"./withControl-Br8gmZRb.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./index-CgHh2HpB.js";import"https://esm.sh/jsr/@pulgasari/logger";function dn(e,t){const n={};for(const o of Object.keys(t)){const i=e?.[o],r=t[o];n[o]=ve(i)?i:A(()=>e[o]===void 0&&r?r():e[o])}return new Proxy(e??{},{get:a((o,i)=>Object.hasOwn(n,i)?n[i]:o[i],"get")})}a(dn,"signalsOf");function h(e){let t=!1,n;const o=a(()=>(t||(n=e(),t=!0),n),"source");return{get value(){const i=o();return ve(i)?i.value:i},set value(i){const r=o();if(!ve(r))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");r.value=i}}}a(h,"imported");function b(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const i=t?ln(t):null;let r=o;return function(c){if(!(o&&!r)&&!(i&&!cn(c,i))){n&&c.preventDefault(),o&&r--;try{const u=(typeof e=="string"?E(e):e).call(this,c);typeof u?.catch=="function"&&u.catch(l=>Qe(this,l,"handler"))}catch(u){Qe(this,u,"handler")}}}}a(b,"listener");const me="input, textarea, [contenteditable]",Ae=a(e=>e.setAttribute("virtualkeyboardpolicy","manual"),"setManual"),fn=a(e=>e.removeAttribute("virtualkeyboardpolicy"),"setAuto"),bt=a(()=>navigator.virtualKeyboard?.hide(),"onFocusIn");let be=null;const mn=a(()=>{navigator.virtualKeyboard&&(navigator.virtualKeyboard.overlaysContent=!0,document.querySelectorAll(me).forEach(Ae),be=new MutationObserver(e=>{for(const{addedNodes:t}of e)for(const n of t)n.nodeType===1&&(n.matches?.(me)&&Ae(n),n.querySelectorAll?.(me).forEach(Ae))}),be.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("focusin",bt,!0))},"disableAndroidKeyboard"),$t=a(()=>{navigator.virtualKeyboard&&(navigator.virtualKeyboard.overlaysContent=!1,document.querySelectorAll(me).forEach(fn),be?.disconnect(),be=null,document.removeEventListener("focusin",bt,!0))},"enableAndroidKeyboard"),pn={commitPrompt:S,disableAndroidKeyboard:S.default(!0),fileSizeFormat:L("formatted","bytes","chars"),fontSize:L(10,11,12,13,14,16).default(12),showBrowser:S,showKeyboard:S.default(!0),showStatusbar:S.default(!0),showToolbar:S.default(!0)},j=H("config",Ie(pn).create()),gt={commands:"commands",files:"files",settings:"config"};let U=k(null);function Me(e){U.value=U.value===e?null:e}a(Me,"toggle$1");const wt=a(()=>{U.value=null},"close$1");C(()=>{for(const[e,t]of Object.entries(gt))RAT.app.toggle(t,U.value===e)});function hn(e){gt[U.value]===e&&(U.value=null)}a(hn,"closed");C(()=>document.documentElement.style.setProperty("--font-size",`${j.fontSize}px`));C(()=>j.disableAndroidKeyboard||j.showKeyboard?mn():$t());const vn={bash:"shell",c:"c",cc:"cpp",cjs:"javascript",cpp:"cpp",cs:"csharp",css:"css",go:"go",h:"c",hpp:"cpp",htm:"html",html:"html",ini:"ini",java:"java",js:"javascript",json:"json",jsx:"javascript",less:"less",markdown:"markdown",md:"markdown",mjs:"javascript",php:"php",py:"python",rat:"rat",rb:"ruby",rs:"rust",scss:"scss",sh:"shell",sql:"sql",svg:"xml",toml:"ini",ts:"typescript",tsx:"typescript",xml:"xml",yaml:"yaml",yml:"yaml"},bn=a(e=>/\.rat\.js$/i.test(e)?"ratjs":vn[e.split(".").pop().toLowerCase()]??"plaintext","languageOf"),$n=a(e=>e.subarray(0,8e3).includes(0),"isBinary"),M=new Zt;let D=k(null);const gn=a(e=>M.find(t=>t.id===e),"byId$1");async function wn(e,{id:t,where:n=""}){const o=gn(t);if(o)return D.value=o,o;const i=new Uint8Array(await(await e.getFile()).arrayBuffer()),r=$n(i),c=new Ie({content:r?"":new TextDecoder().decode(i),dirty:!1,handle:e,id:t,language:bn(e.name),name:e.name,readOnly:r||!!e.readOnly,where:n});return M.push(c),D.value=c,c}a(wn,"open");const yn=a(e=>{D.value=e},"show$1");async function et(e=D.value,t){if(!e||e.readOnly)return!1;const{handle:n}=e;if(await n.requestPermission?.({mode:"readwrite"})==="denied")throw new Error(`No permission to write ${e.name}`);const o=await n.createWritable(t);return await o.write(e.content),await o.close(),e.dirty=!1,!0}a(et,"save");function We(e){const t=M.indexOf(e);M.remove(e),D.value===e&&(D.value=M.at(Math.min(t,M.length-1))??null)}a(We,"close");function Ke(e){for(const t of M.filter(n=>n.id===e||n.id.startsWith(`${e}/`)).toArray())We(t)}a(Ke,"closeUnder");const kn="0.50.0",yt=`https://cdn.jsdelivr.net/npm/monaco-editor@${kn}/min/`,Te=`${yt}vs`;let xn=null;function Sn(){return xn??=new Promise((e,t)=>{const n=URL.createObjectURL(new Blob([`self.MonacoEnvironment = { baseUrl: '${yt}' };
`,`importScripts('${Te}/base/worker/workerMain.js');`],{type:"text/javascript"}));self.MonacoEnvironment={getWorkerUrl:a(()=>n,"getWorkerUrl")};const o=Object.assign(document.createElement("script"),{src:`${Te}/loader.js`});o.onerror=()=>t(new Error("[code] the monaco loader did not load")),o.onload=()=>{globalThis.require.config({paths:{vs:Te}}),globalThis.require(["vs/editor/editor.main"],async()=>{const{monaco:i}=globalThis;try{(await un(async()=>{const{register:r}=await import("./monaco-D5K8UBMT.js");return{register:r}},[],import.meta.url)).register(i)}catch(r){console.warn("[code] rat syntax unavailable",r)}e(i)},t)},document.head.append(o)})}a(Sn,"loadMonaco");const kt=["vs","vs-dark","hc-black","hc-light"],xt={active4d:"Active4D","all-hallows-eve":"All Hallows Eve",amy:"Amy","birds-of-paradise":"Birds of Paradise",blackboard:"Blackboard","brilliance-black":"Brilliance Black","brilliance-dull":"Brilliance Dull","chrome-devtools":"Chrome DevTools",clouds:"Clouds","clouds-midnight":"Clouds Midnight",cobalt:"Cobalt",cobalt2:"Cobalt2",dawn:"Dawn",dracula:"Dracula",dreamweaver:"Dreamweaver",eiffel:"Eiffel","espresso-libre":"Espresso Libre",github:"GitHub","github-dark":"GitHub Dark","github-light":"GitHub Light",idle:"IDLE",idlefingers:"idleFingers",iplastic:"iPlastic",katzenmilch:"Katzenmilch",krtheme:"krTheme","kuroir-theme":"Kuroir Theme",lazy:"LAZY","magicwb--amiga-":"MagicWB (Amiga)",merbivore:"Merbivore","merbivore-soft":"Merbivore Soft",monoindustrial:"monoindustrial",monokai:"Monokai","monokai-bright":"Monokai Bright","night-owl":"Night Owl",nord:"Nord","oceanic-next":"Oceanic Next","pastels-on-dark":"Pastels on Dark","slush-and-poppies":"Slush and Poppies","solarized-dark":"Solarized-dark","solarized-light":"Solarized-light",spacecadet:"SpaceCadet",sunburst:"Sunburst","textmate--mac-classic-":"Textmate (Mac Classic)",tomorrow:"Tomorrow","tomorrow-night":"Tomorrow-Night","tomorrow-night-blue":"Tomorrow-Night-Blue","tomorrow-night-bright":"Tomorrow-Night-Bright","tomorrow-night-eighties":"Tomorrow-Night-Eighties",twilight:"Twilight","upstream-sunburst":"Upstream Sunburst","vibrant-ink":"Vibrant Ink","xcode-default":"Xcode_default",zenburnesque:"Zenburnesque"},An=[...kt,...Object.keys(xt)],Tn={autoIndent:L("none","keep","brackets","advanced","full"),contextmenu:S,cursorBlinking:L("blink","smooth","phase","expand","solid"),cursorStyle:L("line","block","underline","line-thin","block-outline","underline-thin"),folding:S.default(!0),fontLigatures:S.default(!0),fontSize:L(8,9,10,11,12,13,14,16,18).default(13),insertSpaces:S.default(!0),lineNumbers:S.default(!0),minimap:S,readOnly:S,scrollBeyondLastLine:S,showUnused:S.default(!0),tabSize:L(2,4,8),theme:L(...An).default("dracula"),wordBasedSuggestions:S,wordWrap:L("off","on","wordWrapColumn","bounded"),wrappingStrategy:L("simple","advanced")},En={automaticLayout:!0,cursorWidth:2,disableLayerHinting:!0,dragAndDrop:!0,letterSpacing:0,lineNumbersMinChars:3,links:!0,renderLineHighlight:"none"},B=H("options",Ie(Tn).create());let St=k(null);const tt=a(({lineNumbers:e,minimap:t,theme:n,...o})=>({...En,...o,lineNumbers:e?"on":"off",minimap:{enabled:t,renderCharacters:!1,side:"right"}}),"optionsOf");function q(e){e==="wordWrap"?B.wordWrap=B.wordWrap==="off"?"on":"off":B[e]=!B[e]}a(q,"toggle");function nt(e){St.value=e}a(nt,"setInstance");const at=new Set;async function On(e){const{monaco:t}=globalThis;if(t){if(!kt.includes(e)&&!at.has(e))try{const n=await fetch(`https://unpkg.com/monaco-themes/themes/${encodeURIComponent(xt[e])}.json`);t.editor.defineTheme(e,await n.json()),at.add(e)}catch(n){return console.warn(`[code] theme ${e} unavailable`,n),t.editor.setTheme("vs-dark")}t.editor.setTheme(e)}}a(On,"applyTheme");const Cn=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function Rn(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(Rn,"toBase64$1");const Dn=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64$1"),Ln=new Set([101,204,205,304]);async function Mn(e,{body:t,headers:n={},method:o="GET",signal:i,timeout:r}={}){const c=Cn();if(!c)return fetch(e,{body:t,headers:n,method:o,signal:i});const u=await c.request({body:await Rn(t),headers:n,method:o,timeout:r,url:e});return new Response(Ln.has(u.status)?null:Dn(u.data),{headers:u.headers,status:u.status,statusText:u.statusText})}a(Mn,"request$2");const jn=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),Hn=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath$1"),At=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),W=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join$1");function Tt(e,t="",n=!1){const o=new URL(Hn(t),At(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(Tt,"urlFor");const Bn={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class Ee extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function X(e,t,{body:n,headers:o={},isDir:i=!1,method:r="GET"}={}){if(!e)throw new Error("No webdav connection.");let c;try{c=await Mn(Tt(e,t,i),{body:n,headers:{Authorization:jn(e),...o},method:r})}catch(u){throw globalThis.Capacitor?.isNativePlatform?.()?new Ee(0,`Connection failed: ${u?.message??u}`):new Ee(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!c.ok)throw new Ee(c.status,Bn[c.status]??`${c.status} ${c.statusText}`);return c}a(X,"request$1");const Nn='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',je="DAV:",ue=a((e,t)=>e.getElementsByTagNameNS(je,t)[0]?.textContent??"","firstText");async function Et(e,t,n){const o=await X(e,t,{body:Nn,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),i=new DOMParser().parseFromString(await o.text(),"application/xml"),r=new URL(At(e)).pathname,c=a(u=>{const l=decodeURIComponent(new URL(u,e.url).pathname);return(l.startsWith(r)?l.slice(r.length):l).replace(/^\/+|\/+$/g,"")},"relative");return[...i.getElementsByTagNameNS(je,"response")].map(u=>{const l=c(ue(u,"href"));return{isDir:u.getElementsByTagNameNS(je,"collection").length>0,lastModified:Date.parse(ue(u,"getlastmodified"))||0,mime:ue(u,"getcontenttype"),name:l.split("/").pop(),path:l,size:Number(ue(u,"getcontentlength"))||0}})}a(Et,"propfind");async function Ot(e,t=""){const n=W(t);return(await Et(e,t,1)).filter(i=>i.path!==n).sort((i,r)=>i.isDir===r.isDir?i.name.localeCompare(r.name,void 0,{numeric:!0}):i.isDir?-1:1)}a(Ot,"list");async function Oe(e,t){try{return(await Et(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(Oe,"stat");const zn=a(async(e,t)=>(await X(e,t)).blob(),"read"),Ct=a((e,t,n)=>X(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),Fn=a((e,t)=>X(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Pn=a((e,t,n=!1)=>X(e,t,{isDir:n,method:"DELETE"}),"remove$3"),Un=a((e,t,n)=>({Destination:Tt(e,t,n),Overwrite:"F"}),"destination"),Rt=a((e,t,n,o=!1)=>X(e,t,{headers:Un(e,n,o),isDir:o,method:"MOVE"}),"move$1"),In=a(e=>Ot(e,""),"test"),Ce=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound$1"),ot=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class we{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof we&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class it extends we{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,i=null){super(t,n,o),this.meta=i}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await zn(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await Ct(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof G)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=W(t.path,n);await Rt(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class G extends we{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await Ot(this.connection,this.path))yield[t.name,t.isDir?new G(this.connection,t.path,t.name):new it(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=W(this.path,t),i=await Oe(this.connection,o);if(i&&!i.isDir)throw ot(t);if(!i){if(!n)throw Ce(t);await Fn(this.connection,o)}return new G(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=W(this.path,t),i=await Oe(this.connection,o);if(i?.isDir)throw ot(t);if(!i){if(!n)throw Ce(t);await Ct(this.connection,o,new Blob([]))}return new it(this.connection,o,t,i)}async removeEntry(t){const n=W(this.path,t),o=await Oe(this.connection,n);if(!o)throw Ce(t);await Pn(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof G)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=W(t.path,n);await Rt(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Wn=a(e=>new G(e,"",e.name||new URL(e.url).host),"davRoot"),{files:Dt}=RAT.app,Lt="remotes.json",pe=new Map,Kn={id:Z,name:Z,password:Z,url:Z,username:Z},se=Qt(Kn).create(await Dt.read(Lt,"json").catch(()=>[]));C(()=>Dt.write(Lt,JSON.stringify(se)));const qn=A(()=>se.toArray()),Gn=a(e=>se.one({id:e})??null,"byId");async function Vn({name:e,password:t="",url:n,username:o=""}){const i=String(n??"").trim();if(!/^https?:\/\//i.test(i))throw new Error("The url has to start with http:// or https://");const r={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(i).host,password:t,url:i,username:String(o).trim()};return await In(r),se.push(r),r}a(Vn,"add$1");function _n(e){se.drop({id:e}),pe.delete(e)}a(_n,"remove$2");function Jn(e){const t=Gn(e);return t?(pe.has(e)||pe.set(e,Wn(t)),pe.get(e)):null}a(Jn,"rootOf");const Xn=h(()=>qn),{folders:Y}=RAT.app,{perms:Yn,sources:Zn}=dn(Y,{perms:null,sources:null});let qe=H("kind","local");const Qn=A(()=>Zn.value.map(({id:e,name:t})=>{const n=Yn.value[e]==="granted";return{granted:n,handle:n?Y.handleOf(e):null,id:`local:${e}`,name:t,source:e}})),ea=A(()=>Xn.value.map(({id:e,name:t})=>({handle:Jn(e),id:`dav:${e}`,name:t,source:e}))),Mt=a(e=>{qe.value=e},"show"),ta=a(()=>Y.load(),"load$1"),na=a(()=>Y.add(),"add"),aa=a(e=>Y.reconnect(e.source),"reconnect");async function oa(e){await RAT.app.dialogs.confirm({message:`Forget “${e.name}”? Its files stay where they are.`,ok:"Forget",title:e.name})&&await Y.remove(e.source)}a(oa,"forget");const He=h(()=>j),Be=h(()=>D),ia=h(()=>M),$e=h(()=>St),ee=h(()=>B),{commands:jt,dialogs:ra}=RAT.app;let te=H("favourites",[]);const Ht=a(e=>jt.run(e),"run"),g=a(e=>()=>$e.value?.getAction(e)?.run(),"action"),sa=a(e=>()=>$e.value?.trigger("keyboard",e,null),"trigger"),de=a(e=>()=>{He.value[e]=!He.value[e]},"flip"),Re=a((e,t)=>()=>{t&&Mt(t),Me(e)},"panel");async function rt(e=Be.value){if(!e)return;if(!He.value.commitPrompt||!e.id.startsWith("gh:"))return et(e);const t=await ra.prompt({message:"Commit message",ok:"Commit",title:e.name,value:`Update ${e.name}`});if(t)return et(e,{message:t})}a(rt,"saveDocument");const Bt={commands:{exec:a(()=>Me("commands"),"exec"),title:"Commands"},files:{exec:Re("files","local"),title:"Folders"},github:{exec:Re("files","github"),title:"GitHub"},settings:{exec:a(()=>Me("settings"),"exec"),title:"Settings"},webdav:{exec:Re("files","webdav"),title:"WebDAV"},"toggle-browser":{exec:de("showBrowser"),title:"Toggle Browser"},"toggle-keyboard":{exec:de("showKeyboard"),title:"Toggle Keyboard"},"toggle-statusbar":{exec:de("showStatusbar"),title:"Toggle Statusbar"},"toggle-toolbar":{exec:de("showToolbar"),title:"Toggle Toolbar"},"close-file":{exec:a(()=>{Be.value&&We(Be.value)},"exec"),title:"Close File"},save:{exec:a(()=>rt(),"exec"),title:"Save"},"save-all":{exec:a(async()=>{for(const e of ia.value.filter(t=>t.dirty).toArray())await rt(e)},"exec"),title:"Save All"},copy:{exec:g("editor.action.clipboardCopyAction"),title:"Copy"},cut:{exec:g("editor.action.clipboardCutAction"),title:"Cut"},paste:{exec:g("editor.action.clipboardPasteAction"),title:"Paste"},redo:{exec:a(()=>$e.value?.getModel()?.redo(),"exec"),title:"Redo"},undo:{exec:a(()=>$e.value?.getModel()?.undo(),"exec"),title:"Undo"},"add-cursor-above":{exec:g("editor.action.insertCursorAbove"),title:"Add Cursor Above"},"add-cursor-below":{exec:g("editor.action.insertCursorBelow"),title:"Add Cursor Below"},"expand-selection":{exec:g("editor.action.smartSelect.expand"),title:"Expand Selection"},"select-all":{exec:sa("editor.action.selectAll"),title:"Select All"},"select-next-match":{exec:g("editor.action.addSelectionToNextFindMatch"),title:"Select Next Match"},"shrink-selection":{exec:g("editor.action.smartSelect.shrink"),title:"Shrink Selection"},"comment-block":{exec:g("editor.action.blockComment"),title:"Toggle Block Comment"},"comment-line":{exec:g("editor.action.commentLine"),title:"Toggle Line Comment"},"delete-lines":{exec:g("editor.action.deleteLines"),title:"Delete Line"},"duplicate-line":{exec:g("editor.action.copyLinesDownAction"),title:"Duplicate Line"},"indent-lines":{exec:g("editor.action.indentLines"),title:"Indent"},"join-lines":{exec:g("editor.action.joinLines"),title:"Join Lines"},"move-line-down":{exec:g("editor.action.moveLinesDownAction"),title:"Move Line Down"},"move-line-up":{exec:g("editor.action.moveLinesUpAction"),title:"Move Line Up"},"outdent-lines":{exec:g("editor.action.outdentLines"),title:"Outdent"},"sort-lines-asc":{exec:g("editor.action.sortLinesAscending"),title:"Sort Lines Ascending"},"sort-lines-desc":{exec:g("editor.action.sortLinesDescending"),title:"Sort Lines Descending"},fold:{exec:g("editor.fold"),title:"Fold"},"fold-all":{exec:g("editor.foldAll"),title:"Fold All"},"fold-recursive":{exec:g("editor.foldRecursive"),title:"Fold Recursive"},unfold:{exec:g("editor.unfold"),title:"Unfold"},"unfold-all":{exec:g("editor.unfoldAll"),title:"Unfold All"},find:{exec:g("actions.find"),title:"Find"},"find-next":{exec:g("editor.action.nextMatchFindAction"),title:"Find Next"},"find-previous":{exec:g("editor.action.previousMatchFindAction"),title:"Find Previous"},replace:{exec:g("editor.action.startFindReplaceAction"),title:"Find and Replace"},format:{exec:g("editor.action.formatDocument"),title:"Format Document"},"format-selection":{exec:g("editor.action.formatSelection"),title:"Format Selection"},"go-to-definition":{exec:g("editor.action.revealDefinition"),title:"Go to Definition"},"quick-fix":{exec:g("editor.action.quickFix"),title:"Quick Fix"},"rename-symbol":{exec:g("editor.action.rename"),title:"Rename Symbol"},"font-larger":{exec:a(()=>{ee.value.fontSize=st(ee.value.fontSize,1)},"exec"),title:"Font Size +"},"font-smaller":{exec:a(()=>{ee.value.fontSize=st(ee.value.fontSize,-1)},"exec"),title:"Font Size –"},"toggle-line-numbers":{exec:a(()=>q("lineNumbers"),"exec"),title:"Toggle Line Numbers"},"toggle-minimap":{exec:a(()=>q("minimap"),"exec"),title:"Toggle Minimap"},"toggle-word-wrap":{exec:a(()=>q("wordWrap"),"exec"),title:"Toggle Word Wrap"}};function st(e,t){const n=ee.value.schema.parts.fontSize.describe.values;return n[Math.min(n.length-1,Math.max(0,n.indexOf(e)+t))]??e}a(st,"next");jt.assign(Bt);const la=a(()=>Object.entries(Bt).map(([e,{title:t}])=>({name:e,title:t})),"all");function ca(e){te.value=te.value.includes(e)?te.value.filter(t=>t!==e):[...te.value,e]}a(ca,"star");const ua="https://api.github.com";async function T(e,t,{body:n,method:o="GET"}={}){const i=await fetch(t.startsWith("http")?t:ua+t,{body:n?JSON.stringify(n):void 0,headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28",...e?{Authorization:`Bearer ${e}`}:{},...n?{"Content-Type":"application/json"}:{}},method:o});if(i.ok)return i.status===204?null:i.json();let r=`${i.status} ${i.statusText}`;try{r=(await i.json()).message??r}catch{}throw i.status===401&&(r="The token is invalid or expired"),i.status===403&&i.headers.get("x-ratelimit-remaining")==="0"&&(r="GitHub’s rate limit is reached, try again later"),new Error(r)}a(T,"request");const da=a(e=>Uint8Array.from(atob(e.replace(/\n/g,"")),t=>t.charCodeAt(0)),"fromBase64");function fa(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}a(fa,"toBase64");const Nt=a(e=>e.split("/").map(encodeURIComponent).join("/"),"encodePath"),R=a(({name:e,owner:t})=>`/repos/${t}/${e}`,"base"),zt=a(e=>T(e,"/user"),"user");async function Ft(e){const t=a(o=>T(e,`/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member&page=${o}`),"page");return(await Promise.all([t(1),t(2)])).flat().map(o=>Pt(o,!1))}a(Ft,"repos");const ma=a(async(e,t,n)=>Pt(await T(e,`/repos/${t}/${n}`),!0),"repo"),Pt=a((e,t)=>({branch:e.default_branch,full:e.full_name,name:e.name,owner:e.owner.login,private:e.private,readOnly:t}),"repoOf");function pa(e){const t=/(?:github\.com\/)?([^/\s]+)\/([^/\s#?]+?)(?:\.git)?(?:[/#?].*)?$/i.exec(String(e??"").trim());return t?{name:t[2],owner:t[1]}:null}a(pa,"parseRepo");const ha=a(async e=>(await T(e.token,`${R(e)}/branches?per_page=100`)).map(t=>t.name),"branches$1"),va=a(async(e,t)=>(await T(e.token,`${R(e)}/git/trees/${encodeURIComponent(t)}`)).tree??[],"tree"),ba=a(async(e,t)=>{const n=await T(e.token,`${R(e)}/git/blobs/${t}`);return n.encoding==="base64"?da(n.content):new TextEncoder().encode(n.content??"")},"blob");async function Ne(e,t,n,o,i){const r={branch:e.branch,content:fa(n),message:i,...o?{sha:o}:{}};return(await T(e.token,`${R(e)}/contents/${Nt(t)}`,{body:r,method:"PUT"})).content.sha}a(Ne,"put");async function Ge(e){const t=await T(e.token,`${R(e)}/git/ref/heads/${e.branch}`),n=await T(e.token,`${R(e)}/git/commits/${t.object.sha}`);return{commit:t.object.sha,tree:n.tree.sha}}a(Ge,"head");async function Ut(e,t,n){const{tree:o=[]}=await T(e.token,`${R(e)}/git/trees/${n}?recursive=1`);return o.filter(i=>i.type==="blob"&&i.path.startsWith(`${t}/`))}a(Ut,"blobsUnder");async function ze(e,t,n){const{commit:o,tree:i}=await Ge(e),r=await T(e.token,`${R(e)}/git/trees`,{body:{base_tree:i,tree:t},method:"POST"}),c=await T(e.token,`${R(e)}/git/commits`,{body:{message:n,parents:[o],tree:r.sha},method:"POST"});return await T(e.token,`${R(e)}/git/refs/heads/${e.branch}`,{body:{sha:c.sha},method:"PATCH"}),c.sha}a(ze,"commit");async function $a(e,t,{isDir:n,sha:o}){if(!n)return T(e.token,`${R(e)}/contents/${Nt(t)}`,{body:{branch:e.branch,message:`Delete ${t}`,sha:o},method:"DELETE"});const i=await Ut(e,t,(await Ge(e)).tree);return ze(e,i.map(r=>({mode:r.mode,path:r.path,sha:null,type:"blob"})),`Delete ${t}/`)}a($a,"remove$1");async function ga(e,t,n,{isDir:o,mode:i="100644",sha:r}){if(!o)return ze(e,[{mode:i,path:n,sha:r,type:"blob"},{mode:i,path:t,sha:null,type:"blob"}],`Rename ${t} to ${n}`);const c=await Ut(e,t,(await Ge(e)).tree);return ze(e,c.flatMap(u=>[{mode:u.mode,path:n+u.path.slice(t.length),sha:u.sha,type:"blob"},{mode:u.mode,path:u.path,sha:null,type:"blob"}]),`Rename ${t}/ to ${n}/`)}a(ga,"move");const he=a((...e)=>e.filter(Boolean).join("/"),"join"),De=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),ne=a(()=>new DOMException("this repository is read only","NotAllowedError"),"readOnly");class ye{static{a(this,"GitHubHandle")}constructor(t,n,o,i=null,r=void 0){Object.assign(this,{mode:r,name:o,path:n,repo:t,sha:i})}get readOnly(){return!!this.repo.readOnly}async isSameEntry(t){return t instanceof ye&&t.kind===this.kind&&t.repo===this.repo&&t.path===this.path}async queryPermission({mode:t="read"}={}){return t==="readwrite"&&this.readOnly?"denied":"granted"}async requestPermission(t){return this.queryPermission(t)}async move(t,n=this.name){if(this.readOnly)throw ne();if(!(t instanceof oe)||t.repo!==this.repo)throw new DOMException("move across repositories","NotSupportedError");const o=he(t.path,n);await ga(this.repo,this.path,o,{isDir:this.kind==="directory",mode:this.mode,sha:this.sha}),Object.assign(this,{name:n,path:o})}}class lt extends ye{static{a(this,"GitHubFileHandle")}kind="file";async getFile(){return new File([await ba(this.repo,this.sha)],this.name)}async createWritable({message:t}={}){if(this.readOnly)throw ne();const n=[];return{abort:a(async()=>{n.length=0},"abort"),close:a(async()=>{this.sha=await Ne(this.repo,this.path,new Uint8Array(await new Blob(n).arrayBuffer()),this.sha,t??`Update ${this.path}`)},"close"),write:a(async o=>{n.push(o?.type==="write"?o.data:o)},"write")}}}class oe extends ye{static{a(this,"GitHubDirectoryHandle")}kind="directory";async*entries(){const t=this.path?`${this.repo.branch}:${this.path}`:this.repo.branch;for(const n of await va(this.repo,t)){const o=n.type==="tree"?oe:lt;(n.type==="tree"||n.type==="blob")&&(yield[n.path,new o(this.repo,he(this.path,n.path),n.path,n.sha,n.mode)])}}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async#e(t){for await(const[n,o]of this.entries())if(n===t)return o;return null}async getFileHandle(t,{create:n=!1}={}){const o=await this.#e(t);if(o?.kind==="directory")throw new DOMException(`“${t}” is a folder`,"TypeMismatchError");if(o)return o;if(!n)throw De(t);if(this.readOnly)throw ne();const i=he(this.path,t);return new lt(this.repo,i,t,await Ne(this.repo,i,new Uint8Array,null,`Create ${i}`))}async getDirectoryHandle(t,{create:n=!1}={}){const o=await this.#e(t);if(o?.kind==="file")throw new DOMException(`“${t}” is a file`,"TypeMismatchError");if(o)return o;if(!n)throw De(t);if(this.readOnly)throw ne();const i=he(this.path,t);return await Ne(this.repo,`${i}/.gitkeep`,new Uint8Array,null,`Create ${i}/`),new oe(this.repo,i,t)}async removeEntry(t){if(this.readOnly)throw ne();const n=await this.#e(t);if(!n)throw De(t);await $a(this.repo,n.path,{isDir:n.kind==="directory",sha:n.sha})}}const wa=a(e=>new oe(e,"",`${e.owner}/${e.name}`),"githubRoot"),ya="https://github.com/settings/personal-access-tokens/new";let N=H("token",null),I=H("branch",null),V=H("pinned",[]),O=H("repo",null),Fe=k(""),Pe=k(null),ke=k([]),J=k(null);const ka=A(()=>O.value&&I.value?wa({...O.value,branch:I.value,token:N.value}):null),xa=A(()=>!!J.value&&!!O.value&&!O.value.readOnly);async function It(e,t){Fe.value=e,Pe.value=null;try{return await t()}catch(n){throw Pe.value=n.message,n}finally{Fe.value=""}}a(It,"busy");async function Sa(){if(N.value)try{J.value=await zt(N.value),ke.value=await Ft(N.value)}catch{J.value=null}}a(Sa,"load");const Aa=a(e=>It("Connecting …",async()=>{const t=String(e??"").trim();if(!t)throw new Error("Paste a token first");J.value=await zt(t),N.value=t,ke.value=await Ft(t)}),"connect");function Ta(){N.value=J.value=null,ke.value=[],O.value?.readOnly||(O.value=I.value=null)}a(Ta,"disconnect");const Ea=a(e=>It("Adding …",async()=>{const t=pa(e);if(!t)throw new Error("A repository as owner/name or a GitHub url");if(V.value.some(o=>o.full.toLowerCase()===`${t.owner}/${t.name}`.toLowerCase()))throw new Error("That one is pinned already");const n=await ma(N.value,t.owner,t.name);V.value=[n,...V.value],Wt(n)}),"pin");function Oa(e){V.value=V.value.filter(t=>t.full!==e),O.value?.full===e&&(O.value=I.value=null)}a(Oa,"unpin");function Wt(e){O.value=e,I.value=e.branch}a(Wt,"choose");const Ca=a(e=>{I.value=e},"chooseBranch"),Ra=a(()=>O.value?ha({...O.value,token:N.value}):Promise.resolve([]),"branches"),fe=a(e=>(t,n)=>en.notify(t,{...n,type:e}),"notify"),Ve=Object.assign(fe("info"),{error:fe("error"),info:fe("info"),success:fe("success")});let ae=null;const le=tn(!1),Kt=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Da=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Kt;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ae=e,le.value=!0});addEventListener("appinstalled",()=>{ae=null,le.value=!1});async function La(){if(!ae)return!1;const e=ae;return ae=null,le.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(La,"install");function Ma(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),Ve(`${e} can be installed: see the settings`))},"show");le.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(Ma,"hint");function ja(e,t){return Ha.call({props:e},e,t)}a(ja,"BrowserRatHtml");function Ha(e,t){const n=h(()=>D);return s`
    <div.browser>
      ${$(()=>n.value?.language==="html",()=>s`<iframe title="preview" sandbox="allow-scripts" srcdoc=${()=>n.value.content} />`,()=>s`<p.none>A preview for html documents</p>`)}
    </div>
  `}a(Ha,"$$BrowserRatHtml");function Ba(e,t){return Na.call({props:e},e,t)}a(Ba,"CommandsRatHtml");function Na(e,t){const n=h(()=>te),o=la();let i=k("");const r=A(()=>o.filter(({name:f,title:w})=>`${w} ${f}`.toLowerCase().includes(i.value.trim().toLowerCase()))),c=A(()=>r.value.filter(f=>n.value.includes(f.name))),u=A(()=>r.value.filter(f=>!n.value.includes(f.name)));function l(f){wt(),Ht(f)}a(l,"go");function m(f){return s`
      <li>
        <button.run onclick=${b(()=>l(f.name))}>
          <strong>${()=>f.title}</strong>
          <small>${()=>f.name}</small>
        </button>
        <btn-icon icon=${()=>n.value.includes(f.name)?"starred":"star"} label="favourite" onclick=${b(()=>ca(f.name))} />
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
  `}a(Na,"$$CommandsRatHtml");function za(e,t){return Fa.call({props:e},e,t)}a(za,"WelcomeRatHtml");function Fa(e,t){const n=new URL(""+new URL("app-DqjHgYJa.svg",import.meta.url).href,import.meta.url).href;return s`
    <div.welcome>
      <img src=${()=>n} alt="Code" width="160" height="160" />
      <button.hint onclick=${E("files")}>
        <svg-icon icon="info" />
        <span>No file open: open a folder, a repository or a server to start.</span>
      </button>
    </div>
  `}a(Fa,"$$WelcomeRatHtml");function Pa(e,t){return Ua.call({props:e},e,t)}a(Pa,"EditorRatHtml");function Ua(e,t){const n=h(()=>D),o=h(()=>B);let i=k(null),r=k(null),c=!1;C(()=>{const l=i.value;if(!l)return;let m=!0,f=null;return Sn().then(w=>{m&&(f=w.editor.create(l,Q(()=>tt(o.value.toJSON()))),f.onDidChangeModelContent(()=>{const d=Q(()=>n.value);c||!d||(d.content=f.getValue(),d.dirty=!0)}),r.value=f,nt(f))}),()=>{m=!1,f?.dispose(),r.value=null,nt(null)}}),C(()=>{const l=r.value,m=n.value;!l||!m||Q(()=>{l.getValue()!==m.content&&(c=!0,l.setValue(m.content),c=!1),globalThis.monaco.editor.setModelLanguage(l.getModel(),m.language),l.updateOptions({readOnly:m.readOnly||o.value.readOnly})})}),C(()=>{const l=tt(o.value.toJSON());r.value?.updateOptions({...l,readOnly:Q(()=>n.value?.readOnly)||l.readOnly})});const u=A(()=>o.value.theme);return C(()=>{r.value&&On(u.value)}),s`
    <div.editor>
      ${$(()=>!n.value,()=>s`<${za} />`)}
      <div.monaco ref=${nn(i)} hidden=${()=>!n.value} />
    </div>
  `}a(Ua,"$$EditorRatHtml");function Ia(e,t){return Wa.call({props:e},e,t)}a(Ia,"KeyboardRatHtml");function Wa(e,t){const n=h(()=>j),o={regular:["qwertzuiopü","asdfghjklöä","--yxcvbnm--"],shift:["QWERTZUIOPÜ","ASDFGHJKLÖÄ","--YXCVBNM--"],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']},i={backspace:{key:"Backspace",keyCode:8},down:{key:"ArrowDown",keyCode:40},enter:{key:"Enter",keyCode:13},left:{key:"ArrowLeft",keyCode:37},right:{key:"ArrowRight",keyCode:39},space:{key:" ",keyCode:32},tab:{key:"Tab",keyCode:9},up:{key:"ArrowUp",keyCode:38}},r=[["tab","tab-rtl"],["capslock","backspace"],["shift","enter"]];let c=k(!1),u=k(!1);const l=A(()=>c.value||u.value?o.shift:o.regular);function m(d,v={}){const y=document.activeElement;if(!y)return;const z={bubbles:!0,cancelable:!0,key:d,shiftKey:u.value||c.value,...v};if(y.dispatchEvent(new KeyboardEvent("keydown",z)),d.length===1&&/^(INPUT|TEXTAREA)$/.test(y.tagName)){const{selectionEnd:ce,selectionStart:p}=y;y.value=y.value.slice(0,p)+d+y.value.slice(ce),y.selectionStart=y.selectionEnd=p+d.length,y.dispatchEvent(new Event("input",{bubbles:!0}))}y.dispatchEvent(new KeyboardEvent("keyup",z)),u.value&&!c.value&&(u.value=!1)}a(m,"send");function f(d,v){if(d.preventDefault(),v==="shift"){u.value=!u.value;return}if(v==="capslock"){c.value=!c.value,u.value=!1;return}if(v==="tab-rtl")return m("Tab",{keyCode:9,shiftKey:!0});if(i[v])return m(i[v].key,{keyCode:i[v].keyCode});m(v)}a(f,"press"),C(()=>()=>{n.value.disableAndroidKeyboard||$t()});function w(d,v,y){return s`
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
  `}a(Wa,"$$KeyboardRatHtml");function qt(e,t){return Ka.call({props:e},e,t)}a(qt,"PickerRatHtml");function Ka(e,t){const n=a(l=>typeof l=="object"&&l!==null&&!Array.isArray(l),"isObject"),o=e.signal??(ve(e.value)?e.value:null),i=a(l=>Array.isArray(l)?{label:String(l[1]??l[0]),title:String(l[1]??l[0]),value:l[0]}:n(l)?{icon:l.icon,label:l.label??(l.icon?"":String(l.value)),title:l.title??l.label??String(l.value),value:l.value}:{label:String(l),title:String(l),value:l},"normalize"),r=A(()=>o?o.value:e.value),c=A(()=>(e.options??o?.values??[]).map(i));function u(l){const m=l.detail?.value??l.target?.value;o&&(o.value=m),e.onchange?.(m)}return a(u,"change"),s`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>r.value} onchange=${b(u)}>
      ${x(()=>c.value,l=>l,l=>s`<input-option icon=${()=>l.icon} label=${()=>l.label} title=${()=>l.title} value=${()=>l.value} />`)}
    </input-value>
  `}a(Ka,"$$PickerRatHtml");function qa(e,t){return Ga.call({props:e},e,t)}a(qa,"PreferencesRatHtml");function Ga(e,t){const n=h(()=>j),o=h(()=>B),i=[["true","on"],["false","off"]],r=a(m=>Object.entries(m.schema.parts).map(([f,w])=>({key:f,values:w.kind==="bool"?null:w.describe.values})),"fieldsOf"),c=a(m=>m.replace(/[A-Z]/g,f=>` ${f.toLowerCase()}`),"labelOf");function u(m,f,w){m[f.key]=f.values?f.values.find(d=>String(d)===String(w)):String(w)==="true"}a(u,"set");function l(m){return s`
      ${x(()=>r(m),f=>f,f=>s`
          <label>
            <span>${()=>c(f.key)}</span>
            <${qt} ...${{get look(){return f.values?.length>4?"combobox":"segments"},get options(){return f.values??i},get value(){return String(m[f.key])},onchange:a(w=>u(m,f,w),"onchange")}} />
          </label>
        `)}
    `}return a(l,"fields"),s`
    <section><h3>code</h3>${()=>l(n.value)}</section>
    <section><h3>editor</h3>${()=>l(o.value)}</section>
  `}a(Ga,"$$PreferencesRatHtml");const ie=H("appearance",{}),ct={density:K.densities,geometry:K.geometries,mode:K.modes},Va=a(()=>ie.value,"appearance"),_a=a(()=>K.palettes().catch(()=>[]),"palettes");function Ja(e,t){return ie.value={...ie.value,[e]:t||null},K.set({[e]:t||null})}a(Ja,"setAppearance");Object.keys(ie.value).length&&K.set(ie.value);const Xa=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function ut(e,t){return Ya.call({props:e},e,t)}a(ut,"SettingsRatHtml");function Ya(e,t){mt("177zzh1",Xa);let n=k({...Va()}),o=k([]);const i=A(()=>le.value);_a().then(u=>{o.value=u});function r(u,l){const m=l.detail?.value??l.target.value;n.value={...n.value,[u]:m},Ja(u,m)}a(r,"change");async function c(){await La()&&Ve.success(`${e.name??"the app"} is installed`)}return a(c,"installApp"),s`
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
      ${$(()=>!Kt,()=>s`
          <section>
            <h3>install</h3>
            ${$(()=>i.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${b(c)} />`,()=>s`
                ${$(()=>Da,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(Ya,"$$SettingsRatHtml");function Za(e,t){return Qa.call({props:e},e,t)}a(Za,"LinkRatHtml");function Qa(e,t){return s`
    <a.link class=${()=>e.class} href=${()=>e.href} title=${()=>e.title} target="_blank" rel="noopener">
      ${$(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${()=>e.label??e.text??""}
      ${t}
    </a>
  `}a(Qa,"$$LinkRatHtml");const eo={"7z":"application/x-7z-compressed",aac:"audio/aac",avif:"image/avif",bmp:"image/bmp",bz2:"application/x-bzip2",css:"text/css",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",epub:"application/epub+zip",flac:"audio/flac",gif:"image/gif",gz:"application/gzip",heic:"image/heic",htm:"text/html",html:"text/html",ico:"image/vnd.microsoft.icon",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",m4a:"audio/mp4",md:"text/markdown",mjs:"text/javascript",mkv:"video/x-matroska",mov:"video/quicktime",mp3:"audio/mpeg",mp4:"video/mp4",odp:"application/vnd.oasis.opendocument.presentation",ods:"application/vnd.oasis.opendocument.spreadsheet",odt:"application/vnd.oasis.opendocument.text",oga:"audio/ogg",ogg:"audio/ogg",ogv:"video/ogg",opus:"audio/opus",pdf:"application/pdf",png:"image/png",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",rar:"application/vnd.rar",rtf:"application/rtf",svg:"image/svg+xml",tar:"application/x-tar",tif:"image/tiff",tiff:"image/tiff",txt:"text/plain",wav:"audio/wav",weba:"audio/webm",webm:"video/webm",webp:"image/webp",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml:"application/xml",xz:"application/x-xz",zip:"application/zip",zst:"application/zstd"};function to(e){const t=String(e??"").split("/").at(-1),n=t.lastIndexOf(".");return n>0?t.slice(n+1).toLowerCase():""}a(to,"extOf");class F{static{a(this,"FileExtType")}constructor(t=""){this.value=String(t).replace(/^\./,"").toLowerCase(),Object.freeze(this)}static from(t){return t instanceof F?t:new F(to(t))}get mimeType(){return eo[this.value]??"application/octet-stream"}is(...t){return t.some(n=>String(n).replace(/^\./,"").toLowerCase()===this.value)}toJSON(){return this.value}toString(){return this.value}}Object.defineProperty(F,"name",{value:"FileExt"});const no=a((e,t,n=t.initial)=>t.parse(n),"ofValue"),ao=pt(ht(F,()=>new vt({initial:"",kind:"fileext",run:a((e,t)=>e instanceof F?{value:e}:typeof e=="string"?{value:new F(e)}:{issues:[{message:"expected an extension",path:t}]},"run")}),no)),Le=new Map;class P extends rn{static{a(this,"PathType")}constructor(t=[]){super(t,"/")}static from(t){if(t instanceof P)return t;const n=sn(t,"/").join("/");return Le.has(n)||Le.set(n,new P(n)),Le.get(n)}static get root(){return P.from("")}get name(){return this.at(-1)??""}get parent(){return this.length?this.slice(0,-1):null}get ext(){return ao.from(this.name)}child(t){return this.with(t)}}Object.defineProperty(P,"name",{value:"Path"});pt(ht(P,()=>new vt({initial:"",kind:"path",run:a((e,t)=>on(e)?{value:P.from(e)}:{issues:[{message:"expected a path",path:t}]},"run")}),an));async function _e(e,t,n,o){const i=await e.getFile(),c=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(c instanceof WritableStream)){await c.write(await i.arrayBuffer()),await c.close();return}try{await i.stream().pipeTo(c,{signal:o})}catch(u){throw await c.abort?.().catch(()=>{}),u}}a(_e,"copyFile");async function Je(e,t,n,o,i=()=>{}){const r=await t.getDirectoryHandle(n,{create:!0});for await(const c of e.values())c.kind==="directory"?await Je(c,r,c.name,o,i):(await _e(c,r,c.name,o),i())}a(Je,"copyTree");const{dialogs:Gt}=RAT.app;let _=k(null),Vt=k(0);const xe=a(()=>{Vt.value++},"changed"),oo=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function io(e){const t=[];for await(const n of e.values())t.push(n);return t.sort(oo)}a(io,"entries");const Ue=a(e=>!!e&&!/[\\/\0]/.test(e)&&e!=="."&&e!=="..","valid"),Xe=a((e,t="")=>Gt.prompt({message:e,ok:"OK",title:e,value:t}),"ask");async function ro(e,t){for await(const n of e.values())if(n.name===t)return!0;return!1}a(ro,"taken");async function Ye(e,t){for(;Ue(t)&&await ro(e,t);)t=await Xe(`“${t}” exists, another name`,t);return Ue(t)?t:null}a(Ye,"free");async function ge(e,t){const n=await Ye(t,await Xe(e==="directory"?"New folder":"New file"));n&&(e==="directory"?await t.getDirectoryHandle(n,{create:!0}):await t.getFileHandle(n,{create:!0}),xe())}a(ge,"create");async function _t({handle:e,parent:t},n,o){try{await e.move(n,o);return}catch{}e.kind==="directory"?await Je(e,n,o):await _e(e,n,o),await t.removeEntry(e.name,{recursive:!0})}a(_t,"moveTo");async function so(e){const t=await Xe("Rename",e.handle.name);!Ue(t)||t===e.handle.name||await Ye(e.parent,t)&&(await _t(e,e.parent,t),Ke(e.id),xe())}a(so,"rename");async function lo(e){await Gt.confirm({message:`Delete “${e.handle.name}”?`,ok:"Delete",title:"Delete"})&&(await e.parent.removeEntry(e.handle.name,{recursive:!0}),Ke(e.id),xe())}a(lo,"remove");const dt=a((e,t)=>{_.value={entry:t,mode:e}},"pick");async function Jt(e){if(!_.value)return;const{entry:t,mode:n}=_.value,o=await Ye(e,t.handle.name);o&&(n==="cut"?(await _t(t,e,o),Ke(t.id),_.value=null):t.handle.kind==="directory"?await Je(t.handle,e,o):await _e(t.handle,e,o),xe())}a(Jt,"paste");function co(e,t){return uo.call({props:e},e,t)}a(co,"RowMenuRatHtml");function uo(e,t){function n(o,i){o.currentTarget.closest("details").open=!1,i.onclick()}return a(n,"run"),s`
    ${$(()=>e.items?.length,()=>s`
        <details.row-menu>
          <summary aria-label="actions"><svg-icon icon="more" /></summary>
          <div.pop>
            ${x(()=>e.items,o=>o,o=>s`<button onclick=${b(i=>n(i,o))}><svg-icon icon=${()=>o.icon} /> ${()=>o.label}</button>`)}
          </div>
        </details>
      `)}
  `}a(uo,"$$RowMenuRatHtml");function Xt(e,t){return fo.call({props:e},e,t)}a(Xt,"TreeRatHtml");function fo(e,t){const n=h(()=>_),o=h(()=>Vt);let i=k(null),r=k(null),c=k([]);C(()=>{const d=e.dir;let v=!0;return o.value,io(d).then(y=>{v&&(r.value=y,i.value=null)},y=>{v&&(i.value=y.message)}),()=>{v=!1}});const u=a(d=>`${e.id}/${d.name}`,"idOf"),l=a(d=>d.kind==="directory","isFolder"),m=a(d=>c.value.includes(d.name),"isOpen");async function f(d){if(l(d)){c.value=m(d)?c.value.filter(v=>v!==d.name):[...c.value,d.name];return}await wn(d,{id:u(d),where:e.where}),wt()}a(f,"activate");function w(d){const v={handle:d,id:u(d),parent:e.dir};return e.readOnly?[]:[l(d)&&{icon:"file-add",label:"New file",onclick:a(()=>ge("file",d),"onclick")},l(d)&&{icon:"folder-add",label:"New folder",onclick:a(()=>ge("directory",d),"onclick")},l(d)&&n.value&&{icon:"paste",label:"Paste",onclick:a(()=>Jt(d),"onclick")},{icon:"edit",label:"Rename",onclick:a(()=>so(v),"onclick")},{icon:"copy",label:"Copy",onclick:a(()=>dt("copy",v),"onclick")},{icon:"cut",label:"Cut",onclick:a(()=>dt("cut",v),"onclick")},{icon:"delete",label:"Delete",onclick:a(()=>lo(v),"onclick")}].filter(Boolean)}return a(w,"itemsOf"),s`
    <ul.tree>
      ${$(()=>i.value,()=>s`<li.error>${()=>i.value}</li>`)}
      ${x(()=>r.value??[],d=>d,d=>s`
          <li>
            <div.row>
              <button.entry onclick=${b(()=>f(d))}>
                <svg-icon icon=${()=>l(d)?m(d)?"folder-open":"folder":"file"} />
                <span>${()=>d.name}</span>
              </button>
              <${co} ...${{get items(){return w(d)}}} />
            </div>
            ${$(()=>l(d)&&m(d),()=>s`<${Xt} ...${{get dir(){return d},get id(){return u(d)},get where(){return e.where},get readOnly(){return e.readOnly}}} />`)}
          </li>
        `,()=>s`${$(()=>r.value,()=>s`<li.none>Empty</li>`)}`)}
    </ul>
  `}a(fo,"$$TreeRatHtml");function re(e,t){return mo.call({props:e},e,t)}a(re,"RootRatHtml");function mo(e,t){const n=h(()=>_);let o=k(!0);return s`
    <div.root>
      <div.head>
        <button.name onclick=${b(()=>{o.value=!o.value})}>
          <svg-icon icon=${()=>o.value?"chevron-down":"chevron-right"} />
          <span>${()=>e.name}</span>
        </button>
        ${$(()=>e.handle&&!e.readOnly,()=>s`
            <btn-icon icon="file-add" label="new file" onclick=${b(()=>ge("file",e.handle))} />
            <btn-icon icon="folder-add" label="new folder" onclick=${b(()=>ge("directory",e.handle))} />
            ${$(()=>n.value,()=>s`<btn-icon icon="paste" label="paste" onclick=${b(()=>Jt(e.handle))} />`)}
          `)}
        ${t}
      </div>
      ${$(()=>e.handle&&o.value,()=>s`<${Xt} ...${{get dir(){return e.handle},get id(){return e.id},get where(){return e.name},get readOnly(){return e.readOnly}}} />`)}
    </div>
  `}a(mo,"$$RootRatHtml");function po(e,t){return ho.call({props:e},e,t)}a(po,"GitHubSourceRatHtml");function ho(e,t){const n=h(()=>I),o=h(()=>Fe),i=h(()=>Pe),r=h(()=>V),c=h(()=>O),u=h(()=>ke),l=h(()=>ka),m=h(()=>J),f=h(()=>xa);let w=k(!1),d=k(""),v=k([]);const y=A(()=>u.value.filter(p=>p.full.toLowerCase().includes(d.value.trim().toLowerCase())));C(()=>{const p=c.value;v.value=p?[p.branch]:[],p&&Ra().then(Se=>{p===Q(()=>c.value)&&(v.value=Se)},()=>{})});const z=a(p=>{Wt(p),w.value=!1},"pick");async function ce(p,Se){p.preventDefault();const Ze=p.currentTarget;await Se(new FormData(Ze).get("value")),Ze.reset()}return a(ce,"submit"),s`
    ${$(()=>m.value,()=>s`
        <div.account>
          <svg-icon icon="github" />
          <span>${()=>m.value.login}</span>
          <btn-push label="Disconnect" onclick=${b(Ta)} />
        </div>
      `)}
    ${$(()=>i.value,()=>s`<p.error><svg-icon icon="warning" /> ${()=>i.value}</p>`)}
    ${$(()=>c.value&&!w.value,()=>s`
        <div.repo>
          <btn-push icon=${()=>c.value.readOnly?"web":"folder-open"} label=${()=>c.value.full} onclick=${b(()=>{w.value=!0})} />
          <select value=${()=>n.value} onchange=${b(p=>Ca(p.target.value))}>
            ${x(()=>v.value,p=>p,p=>s`<option value=${()=>p} selected=${()=>p===n.value}>${()=>p}</option>`)}
          </select>
        </div>
        <${re} ...${{get handle(){return l.value},get id(){return`gh:${c.value.full}@${n.value}`},get name(){return c.value.full},get readOnly(){return!f.value}}} />
      `,()=>s`
        ${$(()=>!m.value,()=>s`
            <form.connect onsubmit=${b(p=>ce(p,Aa))}>
              <p>A <strong>fine-grained personal access token</strong> with <em>contents: read and write</em> edits your own repositories. A public one below reads without.</p>
              <${Za} ...${{get href(){return ya}}} label="Create a token" />
              <input name="value" type="password" placeholder="github_pat_…" />
              <btn-push type="submit" label=${()=>o.value||"Connect"} disabled=${()=>!!o.value} />
            </form>
          `)}
        <form.connect onsubmit=${b(p=>ce(p,Ea))}>
          <input name="value" placeholder="A public repo: owner/name or its url" />
          <btn-push type="submit" label="Pin" disabled=${()=>!!o.value} />
        </form>
        <ul.repos>
          ${x(()=>r.value,p=>p,p=>s`
              <li>
                <button onclick=${b(()=>z(p))}><svg-icon icon="web" /> ${()=>p.full} <small>read only</small></button>
                <btn-icon icon="close" label="unpin" onclick=${b(()=>Oa(p.full))} />
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
  `}a(ho,"$$GitHubSourceRatHtml");const vo=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function bo(e,t){return $o.call({props:e},e,t)}a(bo,"EmptyRatHtml");function $o(e,t){return mt("ihnpco",vo),s`
    <div.empty data-rat="ihnpco">
      ${$(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${$(()=>e.title,()=>s`<p.title>${()=>e.title}</p>`)}
      ${$(()=>e.hint,()=>s`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}a($o,"$$EmptyRatHtml");function go(e,t){return wo.call({props:e},e,t)}a(go,"LocalSourceRatHtml");function wo(e,t){const n=h(()=>Qn);return s`
    <btn-push icon="folder-add" label="Add a folder" onclick=${b(na)} />
    ${x(()=>n.value,o=>o,o=>s`
        <${re} ...${{get handle(){return o.handle},get id(){return o.id},get name(){return o.name}}}>
          ${$(()=>!o.granted,()=>s`<btn-icon icon="folder-key" label="reconnect" onclick=${b(()=>aa(o))} />`)}
          <btn-icon icon="close" label="forget" onclick=${b(()=>oa(o))} />
        </${re}>
      `,()=>s`<${bo} icon="folder-open" title="No folder yet" hint="A folder of your device: it is edited where it is, nothing is uploaded." />`)}
  `}a(wo,"$$LocalSourceRatHtml");function yo(e,t){return ko.call({props:e},e,t)}a(yo,"WebDAVSourceRatHtml");function ko(e,t){const n=h(()=>ea);let o=k(!1);async function i(r){r.preventDefault();const c=r.currentTarget;o.value=!0;try{await Vn(Object.fromEntries(new FormData(c))),c.reset()}finally{o.value=!1}}return a(i,"submit"),s`
    ${x(()=>n.value,r=>r,r=>s`<${re} ...${{get handle(){return r.handle},get id(){return r.id},get name(){return r.name}}}><btn-icon icon="close" label="forget" onclick=${b(()=>_n(r.source))} /></${re}>`)}
    <form.connect onsubmit=${b(i)}>
      <input name="name" placeholder="Name (optional)" />
      <input name="url" placeholder="https://cloud.example.com/remote.php/dav/files/me/" type="url" required />
      <input name="username" placeholder="Username" autocomplete="username" />
      <input name="password" placeholder="Password or app password" type="password" autocomplete="current-password" />
      <btn-push type="submit" icon="cloud" label=${()=>o.value?"Connecting …":"Connect"} disabled=${()=>o.value} />
    </form>
  `}a(ko,"$$WebDAVSourceRatHtml");function xo(e,t){return So.call({props:e},e,t)}a(xo,"SourcesRatHtml");function So(e,t){const n=h(()=>qe),o=[["local","Folders"],["github","GitHub"],["webdav","WebDAV"]];return s`
    <section.sources>
      <${qt} look="segments" ...${{get options(){return o},get value(){return n.value},onchange:Mt}} />
      ${$(()=>n.value==="github",()=>s`<${po} />`,()=>$(()=>n.value==="webdav",()=>s`<${yo} />`,()=>s`<${go} />`))}
    </section>
  `}a(So,"$$SourcesRatHtml");const Ao=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes");function To(e,t){return Eo.call({props:e},e,t)}a(To,"StatusbarRatHtml");function Eo(e,t){const n=h(()=>j),o=h(()=>D),i=h(()=>B),r=["formatted","bytes","chars"],c=a((m,f)=>f==="chars"?`${m.length} chars`:f==="bytes"?`${new Blob([m]).size} B`:Ao(new Blob([m]).size),"sizeOf"),u=a(()=>{n.value.fileSizeFormat=r[(r.indexOf(n.value.fileSizeFormat)+1)%r.length]},"cycle"),l=a(m=>m?"on":"off","onOff");return s`
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
          <button.item onclick=${E("settings")}>${()=>i.value.insertSpaces?`Spaces: ${i.value.tabSize}`:"Tabs"}</button>
        `,()=>s`<span.item>No file</span>`)}
      <span.spacer />
      <button.item onclick=${b(()=>q("wordWrap"))}>Wrap: ${()=>i.value.wordWrap}</button>
      <span.sep>·</span>
      <button.item onclick=${b(()=>q("minimap"))}>Map: ${()=>l(i.value.minimap)}</button>
      <span.sep>·</span>
      <button.item onclick=${b(()=>q("lineNumbers"))}>Lines: ${()=>l(i.value.lineNumbers)}</button>
      <span.sep>·</span>
      <span.item>${()=>i.value.fontSize}px</span>
    </footer>
  `}a(Eo,"$$StatusbarRatHtml");function Oo(e,t){return Co.call({props:e},e,t)}a(Oo,"TabsRatHtml");function Co(e,t){const n=h(()=>D),o=h(()=>M);return s`
    <nav.tabs>
      ${x(()=>o.value,i=>i,i=>s`
          <div.tab class:active=${()=>i===n.value}>
            <button.name onclick=${b(()=>yn(i))}>
              <svg-icon icon="file" />
              <span>${()=>i.name}</span>
              ${$(()=>i.dirty,()=>s`<span.dirty>●</span>`)}
            </button>
            <btn-icon icon="close" label="close" onclick=${b(()=>We(i))} />
          </div>
        `,()=>s`<p.none>No files open</p>`)}
    </nav>
  `}a(Co,"$$TabsRatHtml");function Ro(e,t){return Do.call({props:e},e,t)}a(Ro,"TapsRatHtml");function Do(e,t){const n=h(()=>j),o=h(()=>U),i=h(()=>qe),r=a(c=>o.value==="files"&&i.value===c,"showing");return s`
    <nav.taps>
      <div.section>
        <btn-icon icon="settings" label="settings" class:active=${()=>o.value==="settings"} onclick=${E("settings")} />
        <btn-icon icon="folder-tree" label="folders" class:active=${()=>r("local")} onclick=${E("files")} />
        <btn-icon icon="github" label="github" class:active=${()=>r("github")} onclick=${E("github")} />
        <btn-icon icon="cloud" label="webdav" class:active=${()=>r("webdav")} onclick=${E("webdav")} />
      </div>
      <div.section>
        <btn-icon icon="undo" label="undo" onclick=${E("undo")} />
        <btn-icon icon="commands" label="commands" class:active=${()=>o.value==="commands"} onclick=${E("commands")} />
        <btn-icon icon="redo" label="redo" onclick=${E("redo")} />
      </div>
      <div.section>
        <btn-icon icon="web" label="browser" class:active=${()=>n.value.showBrowser} onclick=${E("toggle-browser")} />
        <btn-icon icon="keyboard" label="keyboard" class:active=${()=>n.value.showKeyboard} onclick=${E("toggle-keyboard")} />
        <btn-icon icon="toolbar" label="toolbar" class:active=${()=>n.value.showToolbar} onclick=${E("toggle-toolbar")} />
      </div>
    </nav>
  `}a(Do,"$$TapsRatHtml");function Lo(e,t){return Mo.call({props:e},e,t)}a(Lo,"ToolbarRatHtml");function Mo(e,t){const n=[{command:"save",icon:"save",label:"save"},{command:"copy",icon:"copy",label:"copy"},{command:"cut",icon:"cut",label:"cut"},{command:"paste",icon:"paste",label:"paste"},{command:"select-all",icon:"select-all",label:"select all"},{command:"duplicate-line",icon:"duplicate-line",label:"duplicate line"},{command:"move-line-down",icon:"move-line-down",label:"move line down"},{command:"move-line-up",icon:"move-line-up",label:"move line up"},{command:"join-lines",icon:"join-lines",label:"join lines"},{command:"sort-lines-asc",icon:"sort-lines",label:"sort lines"}];return s`
    <div.toolbar>
      ${x(()=>n,o=>o,o=>s`<btn-icon icon=${()=>o.icon} label=${()=>o.label} onclick=${b(()=>Ht(o.command))} />`)}
    </div>
  `}a(Mo,"$$ToolbarRatHtml");function Wo(e,t){return jo.call({props:e},e,t)}a(Wo,"AppRatHtml");function jo(e,t){const n=h(()=>j);RAT.app.on("error",Ve.error),RAT.app.hold(ta()),Sa(),Ma("Code");const o=a(i=>r=>{r.detail?.open||hn(i)},"ontoggle");return s`
    <rat-area name="main">
      <div.workspace>
        ${$(()=>n.value.showBrowser,()=>s`<${ja} />`)}
        ${$(()=>n.value.showStatusbar,()=>s`<${To} />`)}
        <${Oo} />
        <${Pa} />
        ${$(()=>n.value.showToolbar,()=>s`<${Lo} />`)}
      </div>
      <div.underdock>
        ${$(()=>n.value.showKeyboard,()=>s`<${Ia} />`)}
        <${Ro} />
      </div>
    </rat-area>
    <rat-area name="files" dock="start" ontoggle=${b(o("files"))}><${xo} /></rat-area>
    <rat-area name="config" dock="end" ontoggle=${b(o("config"))}><${ut} name="Code"><${qa} /></${ut}></rat-area>
    <rat-area name="commands" dock="bottom" ontoggle=${b(o("commands"))}><${Ba} /></rat-area>
  `}a(jo,"$$AppRatHtml");export{Wo as default};
