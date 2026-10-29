var X=Object.defineProperty;var a=(t,e)=>X(t,"name",{value:e,configurable:!0});import{z as B,E as C,k as W,G as w,H as K,A as Y,J as F,b as G,h as u,K as J,M as L,O as Q,e as x,w as E,P as Z,Q as ee,T as te}from"./index-C4qlWWlk.js";import{p as ne,a as ie}from"./keys-CWTtq0D5.js";import{c as se}from"./files-DMvaay4a.js";import{predicates as ae,isString as re,isPlainObject as oe}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import*as R from"https://esm.sh/@xterm/addon-fit@0.11.0";import*as z from"https://esm.sh/@xterm/xterm@6.0.0";import"https://esm.sh/jsr/@pulgasari/logger";function S(t,{keys:e=null,prevent:n=!1,times:o=0}={}){const s=e?ne(e):null;let r=o;return function(c){if(!(o&&!r)&&!(s&&!ie(c,s))){n&&c.preventDefault(),o&&r--;try{const i=(typeof t=="string"?B(t):t).call(this,c);typeof i?.catch=="function"&&i.catch(l=>C(this,l,"handler"))}catch(i){C(this,i,"handler")}}}}a(S,"listener");const I="v0.2.0",T=W(new Set(["clear","download","help","init","ls","rm","upload"])),O=se({driver:"opfs"}),b=a(t=>`\x1B[31m${t}\x1B[0m`,"red"),N=a(t=>`\x1B[32m${t}\x1B[0m`,"green"),le=["Available commands:","  ls           - List files in virtual filesystem (OPFS)","  upload       - Open file dialog to upload file into OPFS","  download <f> - Download file from OPFS to host system","  rm <f>       - Delete file from OPFS","  init <tool>  - Register WASM executable tool","  clear        - Clear terminal screen"];async function ce(t,{done:e,term:n,worker:o}){const[s,...r]=t.split(/\s+/),c=a(i=>r[0]?!1:(n.writeln(b(`Error: ${i}`)),e(),!0),"needs");switch(s){case"help":return le.forEach(i=>n.writeln(i)),e();case"clear":return n.clear(),e();case"ls":try{const i=await O.list();i.length||n.writeln("VFS is empty.");for(const l of i)n.writeln(`${l.name.padEnd(25)}${(await l.info())?.size??0} bytes`)}catch(i){n.writeln(b(`Error accessing VFS: ${i.message}`))}return e();case"upload":return ue(n,e);case"download":return c("Filename required. Usage: download <filename>")?void 0:(await pe(r[0],n),e());case"rm":if(c("Filename required. Usage: rm <filename>"))return;try{await O.remove(r[0]),n.writeln(`Removed file: ${r[0]}`)}catch(i){n.writeln(b(`Error removing file: ${i.message}`))}return e();case"init":return c("Tool name required. Usage: init <tool>")?void 0:(T.value=new Set([...T.value,r[0]]),n.writeln(N(`Registered WASM executable: ${r[0]}`)),e());default:return T.value.has(s)?o.postMessage({payload:{args:r,cmd:s},type:"RUN_COMMAND"}):(n.writeln(b(`Command not found: ${s}. Type "help" for instructions.`)),e())}}a(ce,"run");function ue(t,e){const n=Object.assign(document.createElement("input"),{type:"file"});n.onchange=async o=>{const s=o.target.files[0];s?(t.writeln(`Uploading ${s.name} to VFS...`),await O.write(s.name,s),t.writeln(N(`Successfully saved ${s.name} to OPFS.`))):t.writeln("Upload canceled."),e()},n.oncancel=()=>{t.writeln("Upload canceled."),e()},n.click()}a(ue,"upload");async function pe(t,e){try{const n=URL.createObjectURL(await O.read(t,"blob"));Object.assign(document.createElement("a"),{download:t,href:n}).click(),URL.revokeObjectURL(n),e.writeln(`Triggered download for: ${t}`)}catch(n){e.writeln(b(`Download failed: ${n.message}`))}}a(pe,"download");const v=K("appearance",{}),M={density:w.densities,geometry:w.geometries,mode:w.modes},fe=a(()=>v.value,"appearance"),de=a(()=>w.palettes().catch(()=>[]),"palettes");function me(t,e){return v.value={...v.value,[t]:e||null},w.set({[t]:e||null})}a(me,"setAppearance");Object.keys(v.value).length&&w.set(v.value);const U="fallback",D=a((t,e)=>typeof t=="function"?t(e):t,"valueOf");function P(t={}){const e=new Map;function n(s){if(e.has(s))return e.get(s);const r="is"+s.charAt(0).toUpperCase()+s.slice(1);if(e.has(r))return e.get(r);throw new TypeError(`unknown predicate: ${s}`)}a(n,"predicateOf");function o(...s){const r=s.length<2?s[0]:s[1],c=[];for(const[l,p]of Object.entries(r))l!==U&&c.push([n(l),p]);const i=a(l=>{for(const[p,f]of c)if(p(l))return D(f,l);return D(r[U],l)},"run");return s.length<2?i:i(s[0])}return a(o,"shift"),o.with=s=>{for(const[r,c]of Object.entries(s)){if(typeof c!="function")throw new TypeError(`not a predicate: ${r}`);e.set(r,c)}return o},Object.defineProperty(o,"predicates",{get:a(()=>Object.fromEntries(e),"get")}),o.with(t)}a(P,"createShift");const he=P(ae);P();const H={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},ge=["error","warning","warn","success","info"],we=.35,V=a(t=>t instanceof Error||t!=null&&typeof t=="object"&&re(t.message)&&("stack"in t||"name"in t),"isErrorLike"),be=P(he.predicates).with({isErrorLike:V})({nullish:"",string:a(t=>t,"string"),errorLike:a(t=>t.message,"errorLike"),fallback:String});function ye(t,e={}){let n;if(V(t))n={type:"error",message:t,...e};else if(!oe(t))n={message:t,...e};else{const o=ge.find(s=>s in t);if(o){const{[o]:s,...r}=t;n={type:o,message:s,...r,...e}}else n={...t,...e}}return n.message=be(n.message),n.type==="warn"&&(n.type="warning"),n}a(ye,"toToastOptions");const ve=`
  [data-pop-toasts] {
    background      : none;
    border          : 0;
    display         : flex;
    flex-direction  : column;
    gap             : --space(small);
    inset           : 1rem 1rem auto auto;
    margin          : 0;
    max-inline-size : min(24rem, calc(100vw - 2rem));
    overflow        : visible;
    padding         : 0;
    pointer-events  : none;
    position        : fixed;
    z-index         : var(--toast-z, 100);
  }
`;class m extends Y{static{a(this,"PopToast")}static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
    :host {
      align-items           : start;
      column-gap            : --space(small);
      display               : grid;
      grid-template-columns : auto 1fr auto;
      pointer-events        : auto;
    }

    :host([dismissible]) { touch-action: pan-y; }

    [part~="icon"] { grid-row: span 2; line-height: 1.4; }

    [part~="heading"],
    [part~="message"] {
      grid-column     : 2;
      min-inline-size : 0;
      overflow-wrap   : anywhere;
    }

    [part~="heading"] { font-weight: 600; }

    [part~="close"] {
      align-items : center;
      background  : none;
      border      : 0;
      color       : inherit;
      cursor      : pointer;
      display     : inline-flex;
      font        : inherit;
      margin      : 0;
      padding     : 0;
      grid-column : 3;
      grid-row    : 1 / span 2;
    }
  `;static get stack(){let e=document.querySelector("[data-pop-toasts]");return e||(e=document.createElement("section"),F(e,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(e)),e}static notify(e,n){const{dismissible:o=!0,duration:s,heading:r,icon:c,message:i,title:l,type:p}=ye(e,n),f=document.createElement("pop-toast"),d=this.stack;return F(f,{dismissible:o,duration:s,heading:r??l,icon:c,message:i,type:p}),d.append(f),d.showPopover&&(d.matches(":popover-open")&&d.hidePopover(),d.showPopover()),f}static error(e,n){return this.notify(e,{...n,type:"error"})}static info(e,n){return this.notify(e,{...n,type:"info"})}static success(e,n){return this.notify(e,{...n,type:"success"})}static warning(e,n){return this.notify(e,{...n,type:"warning"})}static warn(e,n){return this.warning(e,n)}onConnected(){G("pop-toast-stack",ve),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(e=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const n=a(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return n(),this;const o=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:o},{opacity:0,translate:`${e*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(n,n),this}onSwipe(){let e=null,n=0;this.on("pointerdown",s=>{!this.getAttr("dismissible")||s.pointerType==="mouse"||s.composedPath().some(r=>r.localName==="button")||this.getAttr("gestures")!=="false"&&(e=s.clientX,n=0,this.stopTimer())}),this.$(window).on("pointermove",s=>{e!=null&&(n=s.clientX-e,this.style.translate=`${n}px 0`,this.style.opacity=String(1-Math.min(Math.abs(n)/this.offsetWidth,1)*.6))},{passive:!0});const o=a(()=>{if(e!=null){if(e=null,this.style.opacity="",Math.abs(n)>this.offsetWidth*we){this.dismiss(Math.sign(n));return}this.style.translate="",this.animate?.([{translate:`${n}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",o)}render(){const{dismissible:e,heading:n,icon:o,message:s,type:r}=this.getAttr();return u`
      <svg-icon part="icon" icon="${o||H[r]||H.info}"></svg-icon>
      ${n&&u`<strong part="heading">${n}</strong>`}
      <div part="message">${s||u`<slot></slot>`}</div>
      ${e&&u`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const e=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=e:this.setAttribute("role",e)}}Object.assign((t,e)=>m.notify(t,e),{error:a((t,e)=>m.error(t,e),"error"),info:a((t,e)=>m.info(t,e),"info"),success:a((t,e)=>m.success(t,e),"success"),warn:a((t,e)=>m.warning(t,e),"warn"),warning:a((t,e)=>m.warning(t,e),"warning")});m.init();const $=a(t=>(e,n)=>m.notify(e,{...n,type:t}),"notify"),$e=Object.assign($("info"),{error:$("error"),info:$("info"),success:$("success")});let y=null;const A=W(!1),q=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Se=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!q;addEventListener("beforeinstallprompt",t=>{t.preventDefault(),y=t,A.value=!0});addEventListener("appinstalled",()=>{y=null,A.value=!1});async function Te(){if(!y)return!1;const t=y;return y=null,A.value=!1,t.prompt(),(await t.userChoice).outcome==="accepted"}a(Te,"install");const Oe=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Ae(t,e){return ke.call({props:t},t,e)}a(Ae,"SettingsRatHtml");function ke(t,e){J("177zzh1",Oe);let n=L({...fe()}),o=L([]);const s=Q(()=>A.value);de().then(i=>{o.value=i});function r(i,l){const p=l.detail?.value??l.target.value;n.value={...n.value,[i]:p},me(i,p)}a(r,"change");async function c(){await Te()&&$e.success(`${t.name??"the app"} is installed`)}return a(c,"installApp"),u`
    <div.settings data-rat="177zzh1">
      ${e}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${S(i=>r("palette",i))}>
            ${x(()=>o.value,i=>i,i=>u`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(M),i=>i,i=>u`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>n.value[i]??""} onchange=${S(l=>r(i,l))}>
                ${x(()=>M[i],l=>l,l=>u`<input-option value=${()=>l}>${()=>l}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${E(()=>!q,()=>u`
          <section>
            <h3>install</h3>
            ${E(()=>s.value,()=>u`<btn-push icon="download" label=${()=>"install "+(t.name??"the app")} onclick=${S(c)} />`,()=>u`
                ${E(()=>Se,()=>u`<p.hint>Share, then "Add to Home Screen".</p>`,()=>u`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(ke,"$$SettingsRatHtml");function xe(t,e){return Ee.call({props:t},t,e)}a(xe,"TerminalRatHtml");function Ee(t,e){const{FitAddon:n}=R.FitAddon?R:R.default,{Terminal:o}=z.Terminal?z:z.default,s="zugriff> ";let r=L(null);return Z(()=>{const c=r.value;if(!c)return;const i=new o(ee()),l=new n;i.loadAddon(l),i.open(c),l.fit();const p=new Worker(new URL("worker.js",document.baseURI),{type:"module"});let f="",d=!1;const k=a(()=>{d=!1,i.write(`\r
\x1B[32m${s}\x1B[0m`)},"done");p.onmessage=({data:{text:g,type:h}})=>{h==="STDOUT"&&i.writeln(`\x1B[36m${g}\x1B[0m`),h==="STDERR"&&i.writeln(`\x1B[31m${g}\x1B[0m`),h==="EXIT"&&k()};const _=new ResizeObserver(()=>l.fit());return _.observe(c),i.writeln(`\x1B[1;34m=== zugriff ${I} ===\x1B[0m`),i.writeln('Client-side WASM micro-terminal. Type "help" to list available commands.'),i.write(`\x1B[32m${s}\x1B[0m`),i.onData(async g=>{if(d)return;const h=g.charCodeAt(0);if(h===13){i.write(`\r
`);const j=f.trim();if(f="",!j)return k();d=!0,await ce(j,{done:k,term:i,worker:p})}else if(h===127){if(!f.length)return;f=f.slice(0,-1),i.write("\b \b")}else h>=32&&(f+=g,i.write(g))}),()=>{_.disconnect(),p.terminate(),i.dispose()}}),u`<div.terminal-container ref=${te(r)} />`}a(Ee,"$$TerminalRatHtml");function Me(t,e){return Re.call({props:t},t,e)}a(Me,"AppRatHtml");function Re(t,e){return u`
    <rat-area name="main">
      <header#app-head>
        <div#app-logo><h1>zugriff</h1><span.version>${()=>I}</span></div>
        <button.ghost-btn title="Settings" onclick=${S(a(()=>RAT.app.area("config")?.toggle(),"toggleConfig"))}><svg-icon icon="settings" /></button>
      </header>
      <main#app-main><${xe} /></main>
      <footer#app-foot>
        <span>Engine: OPFS + WebWorker</span>
        <span>Loaded Tools: ${()=>T.value.size}</span>
      </footer>
    </rat-area>
    <rat-area name="config" dock="end"><${Ae} name="cli" /></rat-area>
  `}a(Re,"$$AppRatHtml");export{Me as default};
