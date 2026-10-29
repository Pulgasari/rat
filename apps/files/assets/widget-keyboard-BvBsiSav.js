var K=Object.defineProperty;var i=(h,t)=>K(h,"name",{value:t,configurable:!0});import{o as S}from"./index-CgHh2HpB.js";import{a as E,h as n}from"./withControl-ByYV6CO-.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{h as C}from"./index-CwfGEMW7.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./preload-helper-Cc2_yIPf.js";const T=" ",v={de:{regular:["qwertzuiopü","asdfghjklöä"," yxcvbnm "],shift:["QWERTZUIOPÜ","ASDFGHJKLÖÄ"," YXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']},en:{regular:["qwertyuiop","asdfghjkl"," zxcvbnm "],shift:["QWERTYUIOP","ASDFGHJKL"," ZXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']}},k={alt:{toggle:"alt"},ctrl:{toggle:"ctrl"},capslock:{icon:"capslock",toggle:"caps"},shift:{icon:"shift",toggle:"shift"},backspace:{icon:"backspace",key:"Backspace",code:8},enter:{icon:"enter",key:"Enter",code:13},space:{icon:"space",key:" ",code:32},tab:{icon:"tab",key:"Tab",code:9},"tab-rtl":{icon:"tab-rtl",key:"Tab",code:9,shift:!0},down:{icon:"arrow-down",key:"ArrowDown",code:40},left:{icon:"arrow-left",key:"ArrowLeft",code:37},right:{icon:"arrow-right",key:"ArrowRight",code:39},up:{icon:"arrow-up",key:"ArrowUp",code:38}},$=[["tab","tab-rtl"],["capslock","backspace"],["shift","enter"]],B=["ctrl","alt","space","up","down","left","right"],L=["shift","ctrl","alt"],D="input, textarea, [contenteditable]";let g=0,b=null;const A=i(()=>navigator.virtualKeyboard?.hide(),"onFocusIn");function M(h){return h.setAttribute("virtualkeyboardpolicy","manual"),()=>h.removeAttribute("virtualkeyboardpolicy")}i(M,"setManual");function m(){!navigator.virtualKeyboard||g++||(navigator.virtualKeyboard.overlaysContent=!0,b=S(D,{onMatch:M}),document.addEventListener("focusin",A,!0))}i(m,"suppressNative");function w(){!navigator.virtualKeyboard||!g||--g||(navigator.virtualKeyboard.overlaysContent=!1,b?.(),b=null,document.removeEventListener("focusin",A,!0))}i(w,"restoreNative");class p extends E{static{i(this,"WidgetKeyboard")}static layouts=v;static attr={layout:{type:String,default:"de",values:Object.keys(v)},rows:{type:String,default:"symbols keys"},target:String,"native-keyboard":{type:String,default:"hide",values:["hide","keep"]},alt:Boolean,caps:Boolean,ctrl:Boolean,shift:Boolean};static styles=`widget-keyboard {
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
  }`;get layout(){return p.layouts[this.getAttr("layout")]??p.layouts.de}get isShifted(){return this.getAttr("shift")||this.getAttr("caps")}get target(){const t=this.getAttr("target");if(t)return document.querySelector(t);const e=document.activeElement;return e&&e!==document.body?e:null}toggle(t,e){return this.setAttr({[t]:e??!this.getAttr(t)}),t==="caps"&&this.getAttr("caps")&&this.setAttr({shift:!1}),this}consume(){for(const t of L)this.getAttr(t)&&this.setAttr({[t]:!1});return this}press(t){const e=k[t];return e?.toggle?this.toggle(e.toggle):e?this.send(e.key,e):this.send(this.isShifted?t.toUpperCase():t)}send(t,{code:e,shift:s}={}){const r={key:t,keyCode:e,which:e,shiftKey:s??this.isShifted,ctrlKey:this.getAttr("ctrl"),altKey:this.getAttr("alt"),bubbles:!0,cancelable:!0,composed:!0},a=this.target;return this.emit("widget-keyboard-key",{key:t,target:a,shiftKey:r.shiftKey,ctrlKey:r.ctrlKey,altKey:r.altKey}),a&&(a.dispatchEvent(new KeyboardEvent("keydown",r))&&this.edit(a,t,r),a.dispatchEvent(new KeyboardEvent("keyup",r))),this.consume()}edit(t,e,{ctrlKey:s,altKey:r}={}){const a=t.localName;if(a!=="input"&&a!=="textarea")return this;if(s||r)return this;const l=t.value??"",o=t.selectionStart??l.length,c=t.selectionEnd??o,u=i((d,f=o,x=c)=>{t.value=l.slice(0,f)+d+l.slice(x),y(f+d.length),t.dispatchEvent(new Event("input",{bubbles:!0}))},"splice"),y=i(d=>{try{t.setSelectionRange(d,d)}catch{}},"caret");switch(e){case"Backspace":return c>o?u(""):o>0?u("",o-1,o):this;case"ArrowLeft":return y(Math.max(0,c>o?o:o-1)),this;case"ArrowRight":return y(Math.min(l.length,c>o?c:c+1)),this;case"ArrowUp":case"ArrowDown":return this;case"Enter":return a==="textarea"&&u(`
`),this;case"Tab":return u("	"),this}return e.length===1&&u(e),this}onConnected(){this.on("pointerdown","button[data-key]",(t,e)=>{t.preventDefault(),e.disabled||this.press(e.dataset.key)}),this.getAttr("nativeKeyboard")==="hide"&&(m(),this._suppressing=!0)}onDisconnected(){this._suppressing&&(w(),this._suppressing=!1)}onAttributeChanged(t){if(t!=="native-keyboard")return;const e=this.getAttr("nativeKeyboard")==="hide";e!==!!this._suppressing&&(e?m():w(),this._suppressing=e)}key(t,{label:e}={}){const s=k[t],r=s?.icon,a=s?.toggle?this.getAttr(s.toggle):null;return n`<button type="button" tabindex="-1" ...${C({"aria-label":r?t:!1,"aria-pressed":a==null?!1:String(!!a),"data-key":t})}>${r?n`<svg-icon icon="${r}"></svg-icon>`:e??t}</button>`}row(t,{edges:e=null}={}){const s=[...t].map(r=>r===T?n`<span></span>`:this.key(r));return n`
      <div>
        ${e?.[0]&&this.key(e[0])}
        ${s}
        ${e?.[1]&&this.key(e[1])}
      </div>`}render(){const t=this.layout,e=this.isShifted?t.shift:t.regular,s={symbols:n`<div role="group" aria-label="symbols">
        ${t.symbols.map(r=>this.row(r))}
      </div>`,keys:n`<div role="group" aria-label="keys">
        ${e.map((r,a)=>this.row(r,{edges:$[a]}))}
        <div>${B.map(r=>this.key(r))}</div>
      </div>`};return n`${this.getAttr("rows").split(/\s+/).map(r=>s[r]??"")}`}}p.init();export{p as default};
