var B=Object.defineProperty;var r=(t,e)=>B(t,"name",{value:e,configurable:!0});import{q as K,r as j,i as W,t as w,A as Y,u as C,b as J,h as u,v as G,x as L,y as Q,e as E,w as k,z as Z,E as ee,G as te}from"./index-DoPjcldH.js";import{p as ne,a as ie}from"./keys-CWTtq0D5.js";import{c as se}from"./files-DMvaay4a.js";import{predicates as re,isString as ae,isPlainObject as oe}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import*as R from"https://esm.sh/@xterm/addon-fit@0.11.0";import*as z from"https://esm.sh/@xterm/xterm@6.0.0";import"https://esm.sh/jsr/@pulgasari/logger";function S(t,{keys:e=null,prevent:n=!1,times:o=0}={}){const s=e?ne(e):null;let a=o;return function(c){if(!(o&&!a)&&!(s&&!ie(c,s))){n&&c.preventDefault(),o&&a--;try{const i=(typeof t=="string"?K(t):t).call(this,c);typeof i?.catch=="function"&&i.catch(l=>j(this,l))}catch(i){j(this,i)}}}}r(S,"listener");const H="v0.2.0",T=W(new Set(["clear","download","help","init","ls","rm","upload"])),O=se({driver:"opfs"}),b=r(t=>`\x1B[31m${t}\x1B[0m`,"red"),N=r(t=>`\x1B[32m${t}\x1B[0m`,"green"),le=["Available commands:","  ls           - List files in virtual filesystem (OPFS)","  upload       - Open file dialog to upload file into OPFS","  download <f> - Download file from OPFS to host system","  rm <f>       - Delete file from OPFS","  init <tool>  - Register WASM executable tool","  clear        - Clear terminal screen"];async function ce(t,{done:e,term:n,worker:o}){const[s,...a]=t.split(/\s+/),c=r(i=>a[0]?!1:(n.writeln(b(`Error: ${i}`)),e(),!0),"needs");switch(s){case"help":return le.forEach(i=>n.writeln(i)),e();case"clear":return n.clear(),e();case"ls":try{const i=await O.list();i.length||n.writeln("VFS is empty.");for(const l of i)n.writeln(`${l.name.padEnd(25)}${(await l.info())?.size??0} bytes`)}catch(i){n.writeln(b(`Error accessing VFS: ${i.message}`))}return e();case"upload":return ue(n,e);case"download":return c("Filename required. Usage: download <filename>")?void 0:(await pe(a[0],n),e());case"rm":if(c("Filename required. Usage: rm <filename>"))return;try{await O.remove(a[0]),n.writeln(`Removed file: ${a[0]}`)}catch(i){n.writeln(b(`Error removing file: ${i.message}`))}return e();case"init":return c("Tool name required. Usage: init <tool>")?void 0:(T.value=new Set([...T.value,a[0]]),n.writeln(N(`Registered WASM executable: ${a[0]}`)),e());default:return T.value.has(s)?o.postMessage({payload:{args:a,cmd:s},type:"RUN_COMMAND"}):(n.writeln(b(`Command not found: ${s}. Type "help" for instructions.`)),e())}}r(ce,"run");function ue(t,e){const n=Object.assign(document.createElement("input"),{type:"file"});n.onchange=async o=>{const s=o.target.files[0];s?(t.writeln(`Uploading ${s.name} to VFS...`),await O.write(s.name,s),t.writeln(N(`Successfully saved ${s.name} to OPFS.`))):t.writeln("Upload canceled."),e()},n.oncancel=()=>{t.writeln("Upload canceled."),e()},n.click()}r(ue,"upload");async function pe(t,e){try{const n=URL.createObjectURL(await O.read(t,"blob"));Object.assign(document.createElement("a"),{download:t,href:n}).click(),URL.revokeObjectURL(n),e.writeln(`Triggered download for: ${t}`)}catch(n){e.writeln(b(`Download failed: ${n.message}`))}}r(pe,"download");function fe(t,e=null){try{return JSON.parse(localStorage.getItem(t))??e}catch{return e}}r(fe,"read");function de(t,e){e==null?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))}r(de,"write");const q=`appearance:${new URL(".",location.href).pathname}`,F={density:w.densities,geometry:w.geometries,mode:w.modes},v=fe(q,{}),me=r(()=>w.palettes().catch(()=>[]),"palettes");function he(t,e){return v[t]=e||null,de(q,v),w.set({[t]:e||null})}r(he,"setAppearance");Object.keys(v).length&&w.set(v);const M="fallback",D=r((t,e)=>typeof t=="function"?t(e):t,"valueOf");function P(t={}){const e=new Map;function n(s){if(e.has(s))return e.get(s);const a="is"+s.charAt(0).toUpperCase()+s.slice(1);if(e.has(a))return e.get(a);throw new TypeError(`unknown predicate: ${s}`)}r(n,"predicateOf");function o(...s){const a=s.length<2?s[0]:s[1],c=[];for(const[l,p]of Object.entries(a))l!==M&&c.push([n(l),p]);const i=r(l=>{for(const[p,f]of c)if(p(l))return D(f,l);return D(a[M],l)},"run");return s.length<2?i:i(s[0])}return r(o,"shift"),o.with=s=>{for(const[a,c]of Object.entries(s)){if(typeof c!="function")throw new TypeError(`not a predicate: ${a}`);e.set(a,c)}return o},Object.defineProperty(o,"predicates",{get:r(()=>Object.fromEntries(e),"get")}),o.with(t)}r(P,"createShift");const ge=P(re);P();const I={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},we=["error","warning","warn","success","info"],be=.35,V=r(t=>t instanceof Error||t!=null&&typeof t=="object"&&ae(t.message)&&("stack"in t||"name"in t),"isErrorLike"),ye=P(ge.predicates).with({isErrorLike:V})({nullish:"",string:r(t=>t,"string"),errorLike:r(t=>t.message,"errorLike"),fallback:String});function ve(t,e={}){let n;if(V(t))n={type:"error",message:t,...e};else if(!oe(t))n={message:t,...e};else{const o=we.find(s=>s in t);if(o){const{[o]:s,...a}=t;n={type:o,message:s,...a,...e}}else n={...t,...e}}return n.message=ye(n.message),n.type==="warn"&&(n.type="warning"),n}r(ve,"toToastOptions");const $e=`
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
`;class m extends Y{static{r(this,"PopToast")}static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
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
  `;static get stack(){let e=document.querySelector("[data-pop-toasts]");return e||(e=document.createElement("section"),C(e,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(e)),e}static notify(e,n){const{dismissible:o=!0,duration:s,heading:a,icon:c,message:i,title:l,type:p}=ve(e,n),f=document.createElement("pop-toast"),d=this.stack;return C(f,{dismissible:o,duration:s,heading:a??l,icon:c,message:i,type:p}),d.append(f),d.showPopover&&(d.matches(":popover-open")&&d.hidePopover(),d.showPopover()),f}static error(e,n){return this.notify(e,{...n,type:"error"})}static info(e,n){return this.notify(e,{...n,type:"info"})}static success(e,n){return this.notify(e,{...n,type:"success"})}static warning(e,n){return this.notify(e,{...n,type:"warning"})}static warn(e,n){return this.warning(e,n)}onConnected(){J("pop-toast-stack",$e),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(e=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const n=r(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return n(),this;const o=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:o},{opacity:0,translate:`${e*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(n,n),this}onSwipe(){let e=null,n=0;this.on("pointerdown",s=>{!this.getAttr("dismissible")||s.pointerType==="mouse"||s.composedPath().some(a=>a.localName==="button")||this.getAttr("gestures")!=="false"&&(e=s.clientX,n=0,this.stopTimer())}),this.$(window).on("pointermove",s=>{e!=null&&(n=s.clientX-e,this.style.translate=`${n}px 0`,this.style.opacity=String(1-Math.min(Math.abs(n)/this.offsetWidth,1)*.6))},{passive:!0});const o=r(()=>{if(e!=null){if(e=null,this.style.opacity="",Math.abs(n)>this.offsetWidth*be){this.dismiss(Math.sign(n));return}this.style.translate="",this.animate?.([{translate:`${n}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",o)}render(){const{dismissible:e,heading:n,icon:o,message:s,type:a}=this.getAttr();return u`
      <svg-icon part="icon" icon="${o||I[a]||I.info}"></svg-icon>
      ${n&&u`<strong part="heading">${n}</strong>`}
      <div part="message">${s||u`<slot></slot>`}</div>
      ${e&&u`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const e=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=e:this.setAttribute("role",e)}}Object.assign((t,e)=>m.notify(t,e),{error:r((t,e)=>m.error(t,e),"error"),info:r((t,e)=>m.info(t,e),"info"),success:r((t,e)=>m.success(t,e),"success"),warn:r((t,e)=>m.warning(t,e),"warn"),warning:r((t,e)=>m.warning(t,e),"warning")});m.init();const $=r(t=>(e,n)=>m.notify(e,{...n,type:t}),"notify"),Se=Object.assign($("info"),{error:$("error"),info:$("info"),success:$("success")});let y=null;const A=W(!1),X=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Te=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!X;addEventListener("beforeinstallprompt",t=>{t.preventDefault(),y=t,A.value=!0});addEventListener("appinstalled",()=>{y=null,A.value=!1});async function Oe(){if(!y)return!1;const t=y;return y=null,A.value=!1,t.prompt(),(await t.userChoice).outcome==="accepted"}r(Oe,"install");const Ae=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function xe(t,e){return Ee.call({props:t},t,e)}r(xe,"SettingsRatHtml");function Ee(t,e){G("177zzh1",Ae);let n=L({...v}),o=L([]);const s=Q(()=>A.value);me().then(i=>{o.value=i});function a(i,l){const p=l.detail?.value??l.target.value;n.value={...n.value,[i]:p},he(i,p)}r(a,"change");async function c(){await Oe()&&Se.success(`${t.name??"the app"} is installed`)}return r(c,"installApp"),u`
    <div.settings data-rat="177zzh1">
      ${e}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${S(i=>a("palette",i))}>
            ${E(()=>o.value,i=>i,i=>u`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${E(()=>Object.keys(F),i=>i,i=>u`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>n.value[i]??""} onchange=${S(l=>a(i,l))}>
                ${E(()=>F[i],l=>l,l=>u`<input-option value=${()=>l}>${()=>l}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${k(()=>!X,()=>u`
          <section>
            <h3>install</h3>
            ${k(()=>s.value,()=>u`<btn-push icon="download" label=${()=>"install "+(t.name??"the app")} onclick=${S(c)} />`,()=>u`
                ${k(()=>Te,()=>u`<p.hint>Share, then "Add to Home Screen".</p>`,()=>u`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}r(Ee,"$$SettingsRatHtml");function ke(t,e){return Re.call({props:t},t,e)}r(ke,"TerminalRatHtml");function Re(t,e){const{FitAddon:n}=R.FitAddon?R:R.default,{Terminal:o}=z.Terminal?z:z.default,s="zugriff> ";let a=L(null);return Z(()=>{const c=a.value;if(!c)return;const i=new o(ee()),l=new n;i.loadAddon(l),i.open(c),l.fit();const p=new Worker(new URL("worker.js",document.baseURI),{type:"module"});let f="",d=!1;const x=r(()=>{d=!1,i.write(`\r
\x1B[32m${s}\x1B[0m`)},"done");p.onmessage=({data:{text:g,type:h}})=>{h==="STDOUT"&&i.writeln(`\x1B[36m${g}\x1B[0m`),h==="STDERR"&&i.writeln(`\x1B[31m${g}\x1B[0m`),h==="EXIT"&&x()};const _=new ResizeObserver(()=>l.fit());return _.observe(c),i.writeln(`\x1B[1;34m=== zugriff ${H} ===\x1B[0m`),i.writeln('Client-side WASM micro-terminal. Type "help" to list available commands.'),i.write(`\x1B[32m${s}\x1B[0m`),i.onData(async g=>{if(d)return;const h=g.charCodeAt(0);if(h===13){i.write(`\r
`);const U=f.trim();if(f="",!U)return x();d=!0,await ce(U,{done:x,term:i,worker:p})}else if(h===127){if(!f.length)return;f=f.slice(0,-1),i.write("\b \b")}else h>=32&&(f+=g,i.write(g))}),()=>{_.disconnect(),p.terminate(),i.dispose()}}),u`<div.terminal-container ref=${te(a)} />`}r(Re,"$$TerminalRatHtml");function Me(t,e){return ze.call({props:t},t,e)}r(Me,"AppRatHtml");function ze(t,e){return u`
    <rat-area name="main">
      <header#app-head>
        <div#app-logo><h1>zugriff</h1><span.version>${()=>H}</span></div>
        <button.ghost-btn title="Settings" onclick=${S(r(()=>RAT.app.area("config")?.toggle(),"toggleConfig"))}><svg-icon icon="settings" /></button>
      </header>
      <main#app-main><${ke} /></main>
      <footer#app-foot>
        <span>Engine: OPFS + WebWorker</span>
        <span>Loaded Tools: ${()=>T.value.size}</span>
      </footer>
    </rat-area>
    <rat-area name="config" dock="end"><${xe} name="cli" /></rat-area>
  `}r(ze,"$$AppRatHtml");export{Me as default};
