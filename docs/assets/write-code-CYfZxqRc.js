var f=Object.defineProperty;var b=(n,e,t)=>e in n?f(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e)=>f(n,"name",{value:e,configurable:!0});var l=(n,e,t)=>b(n,typeof e!="symbol"?e+"":e,t);import{h as C,x,G as S,_ as A,g as j}from"./index-Dic2q7Qi.js";import{isFn as p}from"https://esm.sh/jsr/@pulgasari/is";import{d as v}from"./index-CZPONa0e.js";import{A as E}from"./withSource-BqNer-76.js";import"https://esm.sh/jsr/@pulgasari/str";import{b as T,p as $,a as L}from"./actions-eNzxACff.js";import{d as k}from"./dedent-C1ttI8K7.js";import{a as H}from"./template-DVBhjnqx.js";import"https://esm.sh/jsr/@pulgasari/logger";const g="11.9.0",D=`https://cdn.jsdelivr.net/npm/highlight.js@${g}/+esm`,P=`https://cdn.jsdelivr.net/npm/highlight.js@${g}/styles/`,I=`https://data.jsdelivr.com/v1/packages/npm/highlight.js@${g}?structure=flat`,d="data-hljs-theme";let N=null,M=null;const m=a(()=>N??=A(()=>import("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/+esm"),[],import.meta.url).catch(()=>import(D)).then(n=>n.default),"getHljs"),_=new Map([["poo","@poo/hljs"],["rat","@rat/syntax/hljs/rat.js"],["ratjs","@rat/syntax/hljs/ratjs.js"]]),R=a(n=>_.get(n)??j(`write-code-languages-${n}`),"languageSource"),h=new Map;function y(n,e){if(!e||n.getLanguage(e))return Promise.resolve();if(h.has(e))return h.get(e);const t=R(e);if(!t)return Promise.resolve();const i=(async()=>{const s=p(t)?t:(await import(t)).default;if(!p(s))throw new Error("module has no default export returning a language definition");n.registerLanguage(e,s)})().catch(s=>console.warn(`[write-code] could not register language "${e}":`,s));return h.set(e,i),i}a(y,"useLanguage");const O=["dracula","github","github-dark"],B={dracula:"base16/dracula"},w=a(n=>S(`${P}${B[n]??n}.min.css`,{scope:`write-code[${d}="${n}"]`,key:`hljs:${n}`}),"loadTheme");function J(n){const e=[],t=a((i,s="")=>{for(const o of i??[]){const r=o.name.startsWith("/")?o.name:`${s}/${o.name}`;if(o.files){t(o.files,r);continue}r.startsWith("/styles/")&&r.endsWith(".css")&&!r.endsWith(".min.css")&&e.push(r.slice(8,-4))}},"walk");return t(n?.files),e.sort()}a(J,"collectThemes");const z=150;function F(n){const e=n.ownerDocument.getSelection();if(!e?.rangeCount||!n.contains(e.focusNode))return null;const t=n.ownerDocument.createRange();return t.selectNodeContents(n),t.setEnd(e.focusNode,e.focusOffset),t.toString().length}a(F,"caretOffset");function G(n,e){const t=n.ownerDocument.createTreeWalker(n,NodeFilter.SHOW_TEXT);let i,s=e;for(;(i=t.nextNode())&&!(s<=i.length);)s-=i.length;const o=n.ownerDocument.createRange();i?o.setStart(i,s):(o.selectNodeContents(n),o.collapse(!1)),o.collapse(!0);const r=n.ownerDocument.getSelection();r.removeAllRanges(),r.addRange(o)}a(G,"setCaret");const c=class c extends E{static registerLanguage(e,t){return _.set(e,t),h.delete(e),this}static themes(){return M??=fetch(I).then(e=>e.json()).then(e=>{const t=J(e);if(!t.length)throw new Error("empty theme index");return t}).catch(e=>(console.warn("[write-code] theme index unreachable, using fallback list:",e),[...O]))}static preloadTheme(e){return w(e)}onConnected(){T(this),this.on("focusin","code[contenteditable]",()=>{this._focusedCode=this.source});const e=v(t=>this.highlightInPlace(t),z);this.track(e.cancel),this.on("input","code[contenteditable]",(t,i)=>{this._editedCode=i.textContent,this.emit("input",{code:this._editedCode}),e(i)}),this.on("focusout","code[contenteditable]",()=>{this._editedCode===void 0||this._editedCode===this._focusedCode||(this._focusedCode=this._editedCode,this.emit("change",{code:this._editedCode}))})}async highlightInPlace(e){const t=e.textContent;if(t!==this._highlighted)try{const i=await m();if(await y(i,this.lang),!e.isConnected||e.textContent!==t)return;const s=i.getLanguage(this.lang)?this.lang:"plaintext",o=F(e);e.innerHTML=i.highlight(t,{ignoreIllegals:!0,language:s}).value,o!==null&&G(e,o),this._highlighted=t}catch(i){console.warn("[write-code] could not highlight the edit:",i)}}onAttributeChanged(e){e==="code"&&(this._editedCode=void 0)}onSourceChange(){this._editedCode=void 0,this.invalidate().update()}get source(){return this._editedCode!==void 0?this._editedCode:this.getAttr("code")||k(this.sourceText)}get code(){return this.source}get lang(){const{lang:e,language:t}=this.getAttr();return e||t||"plaintext"}get actions(){const{editable:e,noCopy:t}=this.getAttr();return $(this.getAttr("actions")).filter(i=>i==="copy"?!t:e)}actionText(){return this.source}actionTarget(){return this.getAttr("editable")?this.$("figure > pre > code").node:null}render(){const{editable:e}=this.getAttr();return C`
      <header>
        <span>${this.lang}</span>
        <div>${L(this.actions)}</div>
      </header>
      <pre><code class="language-${this.lang}" ...${H({contenteditable:e&&"plaintext-only"})} textContent=${this.source}></code></pre>
    `}async highlight(e){const t=this.source;try{const i=await m();if(await y(i,this.lang),!e.isConnected||!this.isConnected||this.source!==t)return;delete e.dataset.highlighted,i.highlightElement(e),this._highlighted=t}catch(i){console.warn("[write-code] failed to lazy load highlight.js:",i)}}sync(){const{editable:e,theme:t}=this.getAttr();t?(this.setAttribute(d,t),w(t)):this.removeAttribute(d);const i=this.output?.querySelector("pre > code");if(!i)return;x(i,{spellcheck:e&&"false"});const s=`${this.lang}
${this.source}`;i===this._paintedCode&&s===this._paintedKey||(this._paintedCode=i,this._paintedKey=s,this.highlight(i))}};a(c,"WriteCode"),l(c,"attr",{actions:{type:String,default:"copy paste clear"},code:String,editable:Boolean,lang:String,language:String,noCopy:Boolean,theme:{type:String,default:"github-dark"}}),l(c,"output","figure"),l(c,"styles",`write-code {
    display  : block;
    font     : inherit;
    overflow : hidden;

    > figure {
      display        : flex;
      flex-direction : column;
      margin         : 0;
    }

    > figure > header {
      --gap: --space(small); /* gap: --space(small); */
      
      align-items : center;
      display     : flex;
      flex        : none;
      justify-content : space-between;

      > span {
        font-family : var(--font-family-mono, ui-monospace, monospace);
        font-size   : 0.8em;
        line-height : 1;
      }
      > div {
        display : inline-flex;
        gap     : --space(small);
      }
      button {
        align-items : center;
        background  : none;
        border      : 0;
        color       : inherit;
        cursor      : pointer;
        display     : inline-flex;
        flex        : none;
        font        : inherit;
        margin      : 0;
      }
    }

    > figure > pre {
      margin     : 0;
      overflow-x : auto;
    }

    code {
      display     : block;
      font-family : var(--font-family-mono, ui-monospace, monospace);
      tab-size    : 2;
      white-space : pre;

      &[contenteditable] {
        caret-color : currentColor;
        outline     : none;
      }
    }
  }`);let u=c;u.init();export{u as default};
