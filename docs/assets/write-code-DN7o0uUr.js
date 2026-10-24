import{h as p,q as m,x as y,_,g as w}from"./index-CAN6sJ0x.js";import{isFn as h}from"https://esm.sh/jsr/@pulgasari/is";import{d as C}from"./index-B1xaW8O5.js";import{A as b}from"./withSource-CQRafHQH.js";import"https://esm.sh/jsr/@pulgasari/str";import{b as x,p as S,a as A}from"./actions-Dn3InYRx.js";import{d as j}from"./dedent-DNI4lC77.js";import{a as v}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";const l="11.9.0",E=`https://cdn.jsdelivr.net/npm/highlight.js@${l}/+esm`,T=`https://cdn.jsdelivr.net/npm/highlight.js@${l}/styles/`,$=`https://data.jsdelivr.com/v1/packages/npm/highlight.js@${l}?structure=flat`,c="data-hljs-theme";let L=null,k=null;const d=()=>L??=_(()=>import("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/+esm"),[],import.meta.url).catch(()=>import(E)).then(i=>i.default),f=new Map([["poo","@poo/hljs"],["rat","@rat/syntax/hljs/rat.js"],["ratjs","@rat/syntax/hljs/ratjs.js"]]),H=i=>f.get(i)??w(`write-code-languages-${i}`),a=new Map;function u(i,e){if(!e||i.getLanguage(e))return Promise.resolve();if(a.has(e))return a.get(e);const t=H(e);if(!t)return Promise.resolve();const n=(async()=>{const s=h(t)?t:(await import(t)).default;if(!h(s))throw new Error("module has no default export returning a language definition");i.registerLanguage(e,s)})().catch(s=>console.warn(`[write-code] could not register language "${e}":`,s));return a.set(e,n),n}const D=["dracula","github","github-dark"],P={dracula:"base16/dracula"},g=i=>y(`${T}${P[i]??i}.min.css`,{scope:`write-code[${c}="${i}"]`,key:`hljs:${i}`});function I(i){const e=[],t=(n,s="")=>{for(const o of n??[]){const r=o.name.startsWith("/")?o.name:`${s}/${o.name}`;if(o.files){t(o.files,r);continue}r.startsWith("/styles/")&&r.endsWith(".css")&&!r.endsWith(".min.css")&&e.push(r.slice(8,-4))}};return t(i?.files),e.sort()}const N=150;function M(i){const e=i.ownerDocument.getSelection();if(!e?.rangeCount||!i.contains(e.focusNode))return null;const t=i.ownerDocument.createRange();return t.selectNodeContents(i),t.setEnd(e.focusNode,e.focusOffset),t.toString().length}function R(i,e){const t=i.ownerDocument.createTreeWalker(i,NodeFilter.SHOW_TEXT);let n,s=e;for(;(n=t.nextNode())&&!(s<=n.length);)s-=n.length;const o=i.ownerDocument.createRange();n?o.setStart(n,s):(o.selectNodeContents(i),o.collapse(!1)),o.collapse(!0);const r=i.ownerDocument.getSelection();r.removeAllRanges(),r.addRange(o)}class W extends b{static attr={actions:{type:String,default:"copy paste clear"},code:String,editable:Boolean,lang:String,language:String,noCopy:Boolean,theme:{type:String,default:"github-dark"}};static output="figure";static styles=`write-code {
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
  }`;static registerLanguage(e,t){return f.set(e,t),a.delete(e),this}static themes(){return k??=fetch($).then(e=>e.json()).then(e=>{const t=I(e);if(!t.length)throw new Error("empty theme index");return t}).catch(e=>(console.warn("[write-code] theme index unreachable, using fallback list:",e),[...D]))}static preloadTheme(e){return g(e)}onConnected(){x(this),this.on("focusin","code[contenteditable]",()=>{this._focusedCode=this.source});const e=C(t=>this.highlightInPlace(t),N);this.track(e.cancel),this.on("input","code[contenteditable]",(t,n)=>{this._editedCode=n.textContent,this.emit("input",{code:this._editedCode}),e(n)}),this.on("focusout","code[contenteditable]",()=>{this._editedCode===void 0||this._editedCode===this._focusedCode||(this._focusedCode=this._editedCode,this.emit("change",{code:this._editedCode}))})}async highlightInPlace(e){const t=e.textContent;if(t!==this._highlighted)try{const n=await d();if(await u(n,this.lang),!e.isConnected||e.textContent!==t)return;const s=n.getLanguage(this.lang)?this.lang:"plaintext",o=M(e);e.innerHTML=n.highlight(t,{ignoreIllegals:!0,language:s}).value,o!==null&&R(e,o),this._highlighted=t}catch(n){console.warn("[write-code] could not highlight the edit:",n)}}onAttributeChanged(e){e==="code"&&(this._editedCode=void 0)}onSourceChange(){this._editedCode=void 0,this.invalidate().update()}get source(){return this._editedCode!==void 0?this._editedCode:this.getAttr("code")||j(this.sourceText)}get code(){return this.source}get lang(){const{lang:e,language:t}=this.getAttr();return e||t||"plaintext"}get actions(){const{editable:e,noCopy:t}=this.getAttr();return S(this.getAttr("actions")).filter(n=>n==="copy"?!t:e)}actionText(){return this.source}actionTarget(){return this.getAttr("editable")?this.$("figure > pre > code").node:null}render(){const{editable:e}=this.getAttr();return p`
      <header>
        <span>${this.lang}</span>
        <div>${A(this.actions)}</div>
      </header>
      <pre><code class="language-${this.lang}" ...${v({contenteditable:e&&"plaintext-only"})} textContent=${this.source}></code></pre>
    `}async highlight(e){const t=this.source;try{const n=await d();if(await u(n,this.lang),!e.isConnected||!this.isConnected||this.source!==t)return;delete e.dataset.highlighted,n.highlightElement(e),this._highlighted=t}catch(n){console.warn("[write-code] failed to lazy load highlight.js:",n)}}sync(){const{editable:e,theme:t}=this.getAttr();t?(this.setAttribute(c,t),g(t)):this.removeAttribute(c);const n=this.output?.querySelector("pre > code");if(!n)return;m(n,{spellcheck:e&&"false"});const s=`${this.lang}
${this.source}`;n===this._paintedCode&&s===this._paintedKey||(this._paintedCode=n,this._paintedKey=s,this.highlight(n))}}W.init("write-code");export{W as default};
