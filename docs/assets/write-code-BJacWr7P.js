var m=Object.defineProperty;var r=(i,e)=>m(i,"name",{value:e,configurable:!0});import{h as y,t as _,y as C,_ as w,g as b}from"./index-DQDrUPsl.js";import{isFn as d}from"https://esm.sh/jsr/@pulgasari/is";import{d as x}from"./index-CZPONa0e.js";import{A as S}from"./withSource-D5b6aypw.js";import"https://esm.sh/jsr/@pulgasari/str";import{b as A,p as j,a as v}from"./actions-BojS1s-j.js";import{d as E}from"./dedent-C1ttI8K7.js";import{a as T}from"./template-DATJ_xQJ.js";import"https://esm.sh/jsr/@pulgasari/logger";const h="11.9.0",$=`https://cdn.jsdelivr.net/npm/highlight.js@${h}/+esm`,L=`https://cdn.jsdelivr.net/npm/highlight.js@${h}/styles/`,k=`https://data.jsdelivr.com/v1/packages/npm/highlight.js@${h}?structure=flat`,l="data-hljs-theme";let H=null,D=null;const u=r(()=>H??=w(()=>import("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/+esm"),[],import.meta.url).catch(()=>import($)).then(i=>i.default),"getHljs"),p=new Map([["poo","@poo/hljs"],["rat","@rat/syntax/hljs/rat.js"],["ratjs","@rat/syntax/hljs/ratjs.js"]]),P=r(i=>p.get(i)??b(`write-code-languages-${i}`),"languageSource"),c=new Map;function g(i,e){if(!e||i.getLanguage(e))return Promise.resolve();if(c.has(e))return c.get(e);const t=P(e);if(!t)return Promise.resolve();const n=(async()=>{const s=d(t)?t:(await import(t)).default;if(!d(s))throw new Error("module has no default export returning a language definition");i.registerLanguage(e,s)})().catch(s=>console.warn(`[write-code] could not register language "${e}":`,s));return c.set(e,n),n}r(g,"useLanguage");const I=["dracula","github","github-dark"],N={dracula:"base16/dracula"},f=r(i=>C(`${L}${N[i]??i}.min.css`,{scope:`write-code[${l}="${i}"]`,key:`hljs:${i}`}),"loadTheme");function M(i){const e=[],t=r((n,s="")=>{for(const o of n??[]){const a=o.name.startsWith("/")?o.name:`${s}/${o.name}`;if(o.files){t(o.files,a);continue}a.startsWith("/styles/")&&a.endsWith(".css")&&!a.endsWith(".min.css")&&e.push(a.slice(8,-4))}},"walk");return t(i?.files),e.sort()}r(M,"collectThemes");const R=150;function W(i){const e=i.ownerDocument.getSelection();if(!e?.rangeCount||!i.contains(e.focusNode))return null;const t=i.ownerDocument.createRange();return t.selectNodeContents(i),t.setEnd(e.focusNode,e.focusOffset),t.toString().length}r(W,"caretOffset");function O(i,e){const t=i.ownerDocument.createTreeWalker(i,NodeFilter.SHOW_TEXT);let n,s=e;for(;(n=t.nextNode())&&!(s<=n.length);)s-=n.length;const o=i.ownerDocument.createRange();n?o.setStart(n,s):(o.selectNodeContents(i),o.collapse(!1)),o.collapse(!0);const a=i.ownerDocument.getSelection();a.removeAllRanges(),a.addRange(o)}r(O,"setCaret");class B extends S{static{r(this,"WriteCode")}static attr={actions:{type:String,default:"copy paste clear"},code:String,editable:Boolean,lang:String,language:String,noCopy:Boolean,theme:{type:String,default:"github-dark"}};static output="figure";static styles=`write-code {
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
  }`;static registerLanguage(e,t){return p.set(e,t),c.delete(e),this}static themes(){return D??=fetch(k).then(e=>e.json()).then(e=>{const t=M(e);if(!t.length)throw new Error("empty theme index");return t}).catch(e=>(console.warn("[write-code] theme index unreachable, using fallback list:",e),[...I]))}static preloadTheme(e){return f(e)}onConnected(){A(this),this.on("focusin","code[contenteditable]",()=>{this._focusedCode=this.source});const e=x(t=>this.highlightInPlace(t),R);this.track(e.cancel),this.on("input","code[contenteditable]",(t,n)=>{this._editedCode=n.textContent,this.emit("input",{code:this._editedCode}),e(n)}),this.on("focusout","code[contenteditable]",()=>{this._editedCode===void 0||this._editedCode===this._focusedCode||(this._focusedCode=this._editedCode,this.emit("change",{code:this._editedCode}))})}async highlightInPlace(e){const t=e.textContent;if(t!==this._highlighted)try{const n=await u();if(await g(n,this.lang),!e.isConnected||e.textContent!==t)return;const s=n.getLanguage(this.lang)?this.lang:"plaintext",o=W(e);e.innerHTML=n.highlight(t,{ignoreIllegals:!0,language:s}).value,o!==null&&O(e,o),this._highlighted=t}catch(n){console.warn("[write-code] could not highlight the edit:",n)}}onAttributeChanged(e){e==="code"&&(this._editedCode=void 0)}onSourceChange(){this._editedCode=void 0,this.invalidate().update()}get source(){return this._editedCode!==void 0?this._editedCode:this.getAttr("code")||E(this.sourceText)}get code(){return this.source}get lang(){const{lang:e,language:t}=this.getAttr();return e||t||"plaintext"}get actions(){const{editable:e,noCopy:t}=this.getAttr();return j(this.getAttr("actions")).filter(n=>n==="copy"?!t:e)}actionText(){return this.source}actionTarget(){return this.getAttr("editable")?this.$("figure > pre > code").node:null}render(){const{editable:e}=this.getAttr();return y`
      <header>
        <span>${this.lang}</span>
        <div>${v(this.actions)}</div>
      </header>
      <pre><code class="language-${this.lang}" ...${T({contenteditable:e&&"plaintext-only"})} textContent=${this.source}></code></pre>
    `}async highlight(e){const t=this.source;try{const n=await u();if(await g(n,this.lang),!e.isConnected||!this.isConnected||this.source!==t)return;delete e.dataset.highlighted,n.highlightElement(e),this._highlighted=t}catch(n){console.warn("[write-code] failed to lazy load highlight.js:",n)}}sync(){const{editable:e,theme:t}=this.getAttr();t?(this.setAttribute(l,t),f(t)):this.removeAttribute(l);const n=this.output?.querySelector("pre > code");if(!n)return;_(n,{spellcheck:e&&"false"});const s=`${this.lang}
${this.source}`;n===this._paintedCode&&s===this._paintedKey||(this._paintedCode=n,this._paintedKey=s,this.highlight(n))}}B.init();export{B as default};
