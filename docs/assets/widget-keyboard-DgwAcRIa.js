var w=Object.defineProperty;var C=(o,t,e)=>t in o?w(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var n=(o,t)=>w(o,"name",{value:t,configurable:!0});var y=(o,t,e)=>C(o,typeof t!="symbol"?t+"":t,e);import{a as T,h as l,u as $}from"./index-BcM9qEFI.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as B}from"./template-Dec5Qew5.js";import"https://esm.sh/jsr/@pulgasari/logger";const L=" ",m={de:{regular:["qwertzuiopü","asdfghjklöä"," yxcvbnm "],shift:["QWERTZUIOPÜ","ASDFGHJKLÖÄ"," YXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']},en:{regular:["qwertyuiop","asdfghjkl"," zxcvbnm "],shift:["QWERTYUIOP","ASDFGHJKL"," ZXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']}},A={alt:{toggle:"alt"},ctrl:{toggle:"ctrl"},capslock:{icon:"capslock",toggle:"caps"},shift:{icon:"shift",toggle:"shift"},backspace:{icon:"backspace",key:"Backspace",code:8},enter:{icon:"enter",key:"Enter",code:13},space:{icon:"space",key:" ",code:32},tab:{icon:"tab",key:"Tab",code:9},"tab-rtl":{icon:"tab-rtl",key:"Tab",code:9,shift:!0},down:{icon:"arrow-down",key:"ArrowDown",code:40},left:{icon:"arrow-left",key:"ArrowLeft",code:37},right:{icon:"arrow-right",key:"ArrowRight",code:39},up:{icon:"arrow-up",key:"ArrowUp",code:38}},D=[["tab","tab-rtl"],["capslock","backspace"],["shift","enter"]],M=["ctrl","alt","space","up","down","left","right"],I=["shift","ctrl","alt"],O="input, textarea, [contenteditable]";let b=0,f=null;const E=n(()=>navigator.virtualKeyboard?.hide(),"onFocusIn");function U(o){return o.setAttribute("virtualkeyboardpolicy","manual"),()=>o.removeAttribute("virtualkeyboardpolicy")}n(U,"setManual");function x(){!navigator.virtualKeyboard||b++||(navigator.virtualKeyboard.overlaysContent=!0,f=$(O,{onMatch:U}),document.addEventListener("focusin",E,!0))}n(x,"suppressNative");function S(){!navigator.virtualKeyboard||!b||--b||(navigator.virtualKeyboard.overlaysContent=!1,f?.(),f=null,document.removeEventListener("focusin",E,!0))}n(S,"restoreNative");const c=class c extends T{get layout(){return c.layouts[this.getAttr("layout")]??c.layouts.de}get isShifted(){return this.getAttr("shift")||this.getAttr("caps")}get target(){const t=this.getAttr("target");if(t)return document.querySelector(t);const e=document.activeElement;return e&&e!==document.body?e:null}toggle(t,e){return this.setAttr({[t]:e??!this.getAttr(t)}),t==="caps"&&this.getAttr("caps")&&this.setAttr({shift:!1}),this}consume(){for(const t of I)this.getAttr(t)&&this.setAttr({[t]:!1});return this}press(t){const e=A[t];return e?.toggle?this.toggle(e.toggle):e?this.send(e.key,e):this.send(this.isShifted?t.toUpperCase():t)}send(t,{code:e,shift:s}={}){const r={key:t,keyCode:e,which:e,shiftKey:s??this.isShifted,ctrlKey:this.getAttr("ctrl"),altKey:this.getAttr("alt"),bubbles:!0,cancelable:!0,composed:!0},a=this.target;return this.emit("widget-keyboard-key",{key:t,target:a,shiftKey:r.shiftKey,ctrlKey:r.ctrlKey,altKey:r.altKey}),a&&(a.dispatchEvent(new KeyboardEvent("keydown",r))&&this.edit(a,t,r),a.dispatchEvent(new KeyboardEvent("keyup",r))),this.consume()}edit(t,e,{ctrlKey:s,altKey:r}={}){const a=t.localName;if(a!=="input"&&a!=="textarea")return this;if(s||r)return this;const d=t.value??"",i=t.selectionStart??d.length,u=t.selectionEnd??i,h=n((p,k=i,K=u)=>{t.value=d.slice(0,k)+p+d.slice(K),g(k+p.length),t.dispatchEvent(new Event("input",{bubbles:!0}))},"splice"),g=n(p=>{try{t.setSelectionRange(p,p)}catch{}},"caret");switch(e){case"Backspace":return u>i?h(""):i>0?h("",i-1,i):this;case"ArrowLeft":return g(Math.max(0,u>i?i:i-1)),this;case"ArrowRight":return g(Math.min(d.length,u>i?u:u+1)),this;case"ArrowUp":case"ArrowDown":return this;case"Enter":return a==="textarea"&&h(`
`),this;case"Tab":return h("	"),this}return e.length===1&&h(e),this}onConnected(){this.on("pointerdown","button[data-key]",(t,e)=>{t.preventDefault(),e.disabled||this.press(e.dataset.key)}),this.getAttr("nativeKeyboard")==="hide"&&(x(),this._suppressing=!0)}onDisconnected(){this._suppressing&&(S(),this._suppressing=!1)}onAttributeChanged(t){if(t!=="native-keyboard")return;const e=this.getAttr("nativeKeyboard")==="hide";e!==!!this._suppressing&&(e?x():S(),this._suppressing=e)}key(t,{label:e}={}){const s=A[t],r=s?.icon,a=s?.toggle?this.getAttr(s.toggle):null;return l`<button type="button" tabindex="-1" ...${B({"aria-label":r?t:!1,"aria-pressed":a==null?!1:String(!!a),"data-key":t})}>${r?l`<svg-icon icon="${r}"></svg-icon>`:e??t}</button>`}row(t,{edges:e=null}={}){const s=[...t].map(r=>r===L?l`<span></span>`:this.key(r));return l`
      <div>
        ${e?.[0]&&this.key(e[0])}
        ${s}
        ${e?.[1]&&this.key(e[1])}
      </div>`}render(){const t=this.layout,e=this.isShifted?t.shift:t.regular,s={symbols:l`<div role="group" aria-label="symbols">
        ${t.symbols.map(r=>this.row(r))}
      </div>`,keys:l`<div role="group" aria-label="keys">
        ${e.map((r,a)=>this.row(r,{edges:D[a]}))}
        <div>${M.map(r=>this.key(r))}</div>
      </div>`};return l`${this.getAttr("rows").split(/\s+/).map(r=>s[r]??"")}`}};n(c,"WidgetKeyboard"),y(c,"layouts",m),y(c,"attr",{layout:{type:String,default:"de",values:Object.keys(m)},rows:{type:String,default:"symbols keys"},target:String,"native-keyboard":{type:String,default:"hide",values:["hide","keep"]},alt:Boolean,caps:Boolean,ctrl:Boolean,shift:Boolean}),y(c,"styles",`widget-keyboard {
    background          : var(--keyboard-bg, var(--color-bg, Canvas));
    display             : flex;
    flex-direction      : column;
    gap                 : var(--keyboard-gap, --space(tiny));
    touch-action        : manipulation;
    user-select         : none;
    -webkit-user-select : none;

    > div {
      display        : flex;
      flex-direction : column;
      gap            : var(--keyboard-gap, --space(tiny));

      > div {
        display         : flex;
        gap             : var(--keyboard-gap, --space(tiny));
        justify-content : center;

        > span { flex: 1 0 0; }
      }
    }

    button {
      background    : var(--keyboard-key-bg, color-mix(in oklch, var(--color-bg, Canvas), var(--color-fg, CanvasText) 12%));
      border        : 0;
      border-radius : var(--keyboard-key-radius, 4px);
      color         : var(--keyboard-key-fg, var(--color-fg, CanvasText));
      cursor        : pointer;
      display       : grid;
      flex          : 1 0 0;
      font          : inherit;
      margin        : 0;
      padding       : var(--keyboard-key-padding, --space(small) 0);
      place-content : center;

      &[aria-pressed="true"] {
        background : var(--keyboard-key-active-bg, var(--color-ink, Highlight));
        color      : var(--keyboard-key-active-fg, var(--accent-fg, HighlightText));
      }

      &:disabled { cursor: not-allowed; opacity: 0.25; }
    }

    [aria-label="symbols"] button { aspect-ratio: 1; border-radius: 50%; padding: 0; }

    :is([data-key="alt"], [data-key="backspace"], [data-key="capslock"], [data-key="ctrl"],
        [data-key="enter"], [data-key="shift"], [data-key="tab"], [data-key="tab-rtl"]) { flex-grow: 2; }

    [data-key="space"] { flex-grow: 7; }
  }`);let v=c;v.init();export{v as default};
