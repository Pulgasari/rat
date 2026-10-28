const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./widget-keyboard-DHLmhPjA.js","./index-Dn3sDlnf.js","./index-MfNjJyO2.css"])))=>i.map(i=>d[i]);
var y=Object.defineProperty;var s=(o,t)=>y(o,"name",{value:t,configurable:!0});import{a as k,I as f,_ as x,J as w,i as l}from"./index-Dn3sDlnf.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const h=/\s*(\d+(?:[.,]\d*)?|[.,]\d+|[-+*/()%×÷−])/y;function $(o){const t=[];h.lastIndex=0;const e=String(o).trim();for(;h.lastIndex<e.length;){const a=h.exec(e);if(!a)return null;const r=a[1];/[\d.,]/.test(r[0])?t.push(Number(r.replace(",","."))):t.push({"×":"*","÷":"/","−":"-"}[r]??r)}return t}s($,"tokenize");function E(o){const t=$(o);if(!t?.length)return null;let e=0;const a=s(()=>t[e],"peek"),r=s(()=>t[e++],"next");function d(){let i=g().value;for(;a()==="+"||a()==="-";){const n=r(),c=g(),u=c.percent?i*c.value:c.value;i=n==="+"?i+u:i-u}return i}s(d,"expression");function g(){let{percent:i,value:n}=v();for(;a()==="*"||a()==="/"||a()==="("||typeof a()=="number";){const c=a()==="*"||a()==="/"?r():"*",u=v().value;n=c==="*"?n*u:n/u,i=!1}return{percent:i,value:n}}s(g,"term");function v(){let i=p(),n=!1;for(;a()==="%";)r(),i/=100,n=!0;return{percent:n,value:i}}s(v,"factor");function p(){return a()==="-"?(r(),-p()):a()==="+"?(r(),p()):b()}s(p,"unary");function b(){const i=r();if(typeof i=="number")return i;if(i==="("){const n=d();return a()===")"&&r(),n}throw new SyntaxError(`unexpected ${i??"end"}`)}s(b,"primary");try{const i=d();return e===t.length&&Number.isFinite(i)?i:null}catch{return null}}s(E,"calculate");const S=[["alpha","()","%","÷"],["7","8","9","×"],["4","5","6","−"],["1","2","3","+"],["0","decimal","backspace","done"]],m={backspace:"lucide:delete",close:"lucide:x",copy:"lucide:copy",done:"lucide:check",keyboard:"lucide:keyboard",paste:"lucide:clipboard-paste",reset:"lucide:rotate-ccw"},C=new Set(["+","−","×","÷","%"]);let T=0;class A extends k{static{s(this,"WidgetCalculator")}static attr={alpha:Boolean,value:String};static styles=`widget-calculator {
    --calculator-gap : --space(small);

    background     : var(--calculator-bg, var(--color-bg, Canvas));
    color          : var(--color-fg, CanvasText);
    box-sizing     : border-box;
    display        : inline-flex;
    flex-direction : column;
    gap            : var(--calculator-gap);
    inline-size    : min(100%, var(--calculator-size, 20rem));
    padding        : var(--calculator-gap);
    touch-action   : manipulation;
    user-select    : none;

    button {
      background    : none;
      border        : 0;
      border-radius : var(--calculator-radius, 0.6rem);
      color         : inherit;
      cursor        : pointer;
      display       : grid;
      font          : inherit;
      margin        : 0;
      padding       : 0;
      place-content : center;
    }

    [part="head"] {
      display : flex;
      gap     : var(--calculator-gap);

      > button { block-size: 2.25rem; inline-size: 2.25rem; font-size: 1.25rem; }

      /* close at the start, the rest at the end, a spacer between */
      > [data-act="close"] { order: -2; }
      &::before            { content: ''; flex: 1 1 auto; order: -1; }
    }

    [part="screen"] {
      background    : color-mix(in oklch, var(--color-bg, Canvas), var(--color-fg, CanvasText) 15%);
      border-radius : 0.25rem;
      display       : grid;
      padding       : --space(normal);
    }

    [part="display"] {
      background : none;
      border     : 0;
      color      : inherit;
      font       : inherit;
      font-size  : 2rem;
      min-width  : 0;
      outline    : none;
      text-align : center;
    }

    [part="preview"] {
      font-size  : 0.9rem;
      min-height : 1.2em;
      opacity    : 0.6;
      text-align : center;
    }

    &[data-invalid] [part="screen"] { outline: 2px solid var(--color-error, #d33); }

    [part="keys"] {
      display               : grid;
      gap                   : var(--calculator-gap);
      grid-template-columns : repeat(4, minmax(0, 1fr));

      > button {
        aspect-ratio : 1;
        background   : color-mix(in oklch, var(--color-bg, Canvas), var(--color-fg, CanvasText) 22%);
        font-size    : 1.35rem;
        font-weight  : 600;
      }

      > [data-kind="operator"] {
        background : color-mix(in oklch, var(--color-fg, CanvasText) 80%, var(--color-bg, Canvas));
        color      : var(--color-bg, Canvas);
      }

      > [data-key="done"] {
        background : var(--color-ink, Highlight);
        color      : var(--accent-fg, HighlightText);
      }
    }

    widget-keyboard { inline-size: 100%; }
  }`;displayId=`calculator-${++T}`;get display(){return this.querySelector('[part="display"]')}get expression(){return this.display?.value??this.getAttr("value")??""}get decimal(){try{return new Intl.NumberFormat(f(this)).formatToParts(1.5).find(t=>t.type==="decimal")?.value??"."}catch{return"."}}get result(){return E(this.expression)}format(t){try{return new Intl.NumberFormat(f(this),{maximumFractionDigits:10,useGrouping:!1}).format(t)}catch{return String(t)}}insert(t){const e=this.display;if(!e)return this;const a=e.selectionStart??e.value.length,r=e.selectionEnd??a;return e.setRangeText(t,a,r,"end"),this.changed()}backspace(){const t=this.display;if(!t)return this;const e=t.selectionStart??t.value.length,a=t.selectionEnd??e;return a>e?t.setRangeText("",e,a,"end"):e>0&&t.setRangeText("",e-1,e,"end"),this.changed()}bracket(){const t=this.display,e=t.value.slice(0,t.selectionStart??t.value.length).trimEnd(),a=(e.match(/\(/g)??[]).length-(e.match(/\)/g)??[]).length,r=e.at(-1)??"",d=a>0&&/[\d.,)%]/.test(r);return this.insert(d?")":"(")}setExpression(t){const e=this.display;return e&&(e.value=t,e.setSelectionRange(t.length,t.length)),this.changed()}changed(){delete this.dataset.invalid;const t=this.querySelector('[part="preview"]');if(!t)return this;const e=this.result,a=/^\s*-?[\d.,]*\s*$/.test(this.expression);return t.textContent=e==null||a?"":`= ${this.format(e)}`,this}done(){const t=this.result;return t==null&&this.expression.trim()?(this.dataset.invalid="",this):(t!=null&&this.setExpression(this.format(t)),this.emit("widget-calculator",{action:"done",value:t}),this)}close(){return this.emit("widget-calculator",{action:"close"}),this}async act(t,e){switch(t){case"close":return this.close();case"reset":return this.setExpression(this._initial??"");case"copy":try{await navigator.clipboard.writeText(this.expression)}catch{}return this;case"paste":try{this.insert((await navigator.clipboard.readText()).trim())}catch{}return this;case"keyboard":{const a=this.display,r=a.inputMode==="none";return a.inputMode=r?"decimal":"none",e.setAttribute("aria-pressed",String(r)),a.blur(),a.focus(),this}}}press(t){switch(t){case"alpha":return x(()=>import("./widget-keyboard-DHLmhPjA.js"),__vite__mapDeps([0,1,2]),import.meta.url),this.setAttr({alpha:!this.getAttr("alpha")});case"backspace":return this.backspace();case"decimal":return this.insert(this.decimal);case"done":return this.done();case"()":return this.bracket();default:return this.insert(t)}}onConnected(){this._initial??=this.getAttr("value")??"",this.on("pointerdown","button",t=>t.preventDefault()),this.on("click","button[data-key]",(t,e)=>this.press(e.dataset.key)),this.on("click","button[data-act]",(t,e)=>this.act(e.dataset.act,e)),this.on("input",'[part="display"]',()=>this.changed()),this.on("keydown",'[part="display"]',t=>{t.key==="Enter"&&(t.preventDefault(),this.done()),t.key==="Escape"&&(t.preventDefault(),this.close())})}onAttributeChanged(t){t==="value"&&(this._initial=this.getAttr("value")??"",this.setExpression(this._initial))}key(t){const e={alpha:"α",decimal:this.decimal}[t]??t,a=m[t],r=C.has(t)||t==="()"||t==="alpha"?"operator":null;return l`<button type="button" tabindex="-1" ...${w({"aria-label":a&&t,"aria-pressed":t==="alpha"&&String(this.getAttr("alpha")),"data-key":t,"data-kind":r})}>${a?l`<svg-icon icon="${a}"></svg-icon>`:e}</button>`}render(){const t=this.getAttr("alpha"),e=this.display?.value??this.getAttr("value")??"";return l`
      <div part="head">
        ${["close","copy","paste","reset","keyboard"].map(a=>l`
          <button type="button" tabindex="-1" data-act="${a}" aria-label="${a}" title="${a}"><svg-icon icon="${m[a]}"></svg-icon></button>
        `)}
      </div>
      <div part="screen">
        <input part="display" id="${this.displayId}" inputmode="none" autocomplete="off" spellcheck="false" value=${e} />
        <output part="preview"></output>
      </div>
      ${t?l`<div part="keys">${this.key("alpha")}</div><widget-keyboard target="#${this.displayId}" rows="keys" native-keyboard="keep"></widget-keyboard>`:l`<div part="keys">${S.flat().map(a=>this.key(a))}</div>`}
    `}onRender(){this.setExpression(this.display?.value??"")}}A.init();export{E as calculate,A as default};
