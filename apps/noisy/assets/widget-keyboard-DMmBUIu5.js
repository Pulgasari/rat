var K=Object.defineProperty;var i=(h,t)=>K(h,"name",{value:t,configurable:!0});import{a as S,t as E,h as n,u as C}from"./index-DSJLmsC9.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const T=" ",v={de:{regular:["qwertzuiopü","asdfghjklöä"," yxcvbnm "],shift:["QWERTZUIOPÜ","ASDFGHJKLÖÄ"," YXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']},en:{regular:["qwertyuiop","asdfghjkl"," zxcvbnm "],shift:["QWERTYUIOP","ASDFGHJKL"," ZXCVBNM "],symbols:["([{<?.,'$#=+*12345",')]}>!:;"&|_-/67890']}},k={alt:{toggle:"alt"},ctrl:{toggle:"ctrl"},capslock:{icon:"capslock",toggle:"caps"},shift:{icon:"shift",toggle:"shift"},backspace:{icon:"backspace",key:"Backspace",code:8},enter:{icon:"enter",key:"Enter",code:13},space:{icon:"space",key:" ",code:32},tab:{icon:"tab",key:"Tab",code:9},"tab-rtl":{icon:"tab-rtl",key:"Tab",code:9,shift:!0},down:{icon:"arrow-down",key:"ArrowDown",code:40},left:{icon:"arrow-left",key:"ArrowLeft",code:37},right:{icon:"arrow-right",key:"ArrowRight",code:39},up:{icon:"arrow-up",key:"ArrowUp",code:38}},$=[["tab","tab-rtl"],["capslock","backspace"],["shift","enter"]],B=["ctrl","alt","space","up","down","left","right"],L=["shift","ctrl","alt"],D="input, textarea, [contenteditable]";let g=0,b=null;const A=i(()=>navigator.virtualKeyboard?.hide(),"onFocusIn");function M(h){return h.setAttribute("virtualkeyboardpolicy","manual"),()=>h.removeAttribute("virtualkeyboardpolicy")}i(M,"setManual");function w(){!navigator.virtualKeyboard||g++||(navigator.virtualKeyboard.overlaysContent=!0,b=C(D,{onMatch:M}),document.addEventListener("focusin",A,!0))}i(w,"suppressNative");function m(){!navigator.virtualKeyboard||!g||--g||(navigator.virtualKeyboard.overlaysContent=!1,b?.(),b=null,document.removeEventListener("focusin",A,!0))}i(m,"restoreNative");class y extends S{static{i(this,"WidgetKeyboard")}static layouts=v;static attr={layout:{type:String,default:"de",values:Object.keys(v)},rows:{type:String,default:"symbols keys"},target:String,"native-keyboard":{type:String,default:"hide",values:["hide","keep"]},alt:Boolean,caps:Boolean,ctrl:Boolean,shift:Boolean};static styles=`widget-keyboard {
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
  }`;get layout(){return y.layouts[this.getAttr("layout")]??y.layouts.de}get isShifted(){return this.getAttr("shift")||this.getAttr("caps")}get target(){const t=this.getAttr("target");if(t)return document.querySelector(t);const e=document.activeElement;return e&&e!==document.body?e:null}toggle(t,e){return this.setAttr({[t]:e??!this.getAttr(t)}),t==="caps"&&this.getAttr("caps")&&this.setAttr({shift:!1}),this}consume(){for(const t of L)this.getAttr(t)&&this.setAttr({[t]:!1});return this}press(t){const e=k[t];return e?.toggle?this.toggle(e.toggle):e?this.send(e.key,e):this.send(this.isShifted?t.toUpperCase():t)}send(t,{code:e,shift:s}={}){const a={key:t,keyCode:e,which:e,shiftKey:s??this.isShifted,ctrlKey:this.getAttr("ctrl"),altKey:this.getAttr("alt"),bubbles:!0,cancelable:!0,composed:!0},r=this.target;return this.emit("widget-keyboard-key",{key:t,target:r,shiftKey:a.shiftKey,ctrlKey:a.ctrlKey,altKey:a.altKey}),r&&(r.dispatchEvent(new KeyboardEvent("keydown",a))&&this.edit(r,t,a),r.dispatchEvent(new KeyboardEvent("keyup",a))),this.consume()}edit(t,e,{ctrlKey:s,altKey:a}={}){const r=t.localName;if(r!=="input"&&r!=="textarea")return this;if(s||a)return this;const l=t.value??"",o=t.selectionStart??l.length,c=t.selectionEnd??o,u=i((d,f=o,x=c)=>{t.value=l.slice(0,f)+d+l.slice(x),p(f+d.length),t.dispatchEvent(new Event("input",{bubbles:!0}))},"splice"),p=i(d=>{try{t.setSelectionRange(d,d)}catch{}},"caret");switch(e){case"Backspace":return c>o?u(""):o>0?u("",o-1,o):this;case"ArrowLeft":return p(Math.max(0,c>o?o:o-1)),this;case"ArrowRight":return p(Math.min(l.length,c>o?c:c+1)),this;case"ArrowUp":case"ArrowDown":return this;case"Enter":return r==="textarea"&&u(`
`),this;case"Tab":return u("	"),this}return e.length===1&&u(e),this}onConnected(){this.on("pointerdown","button[data-key]",(t,e)=>{t.preventDefault(),e.disabled||this.press(e.dataset.key)}),this.getAttr("nativeKeyboard")==="hide"&&(w(),this._suppressing=!0)}onDisconnected(){this._suppressing&&(m(),this._suppressing=!1)}onAttributeChanged(t){if(t!=="native-keyboard")return;const e=this.getAttr("nativeKeyboard")==="hide";e!==!!this._suppressing&&(e?w():m(),this._suppressing=e)}key(t,{label:e}={}){const s=k[t],a=s?.icon,r=s?.toggle?this.getAttr(s.toggle):null;return n`<button type="button" tabindex="-1" ...${E({"aria-label":a?t:!1,"aria-pressed":r==null?!1:String(!!r),"data-key":t})}>${a?n`<svg-icon icon="${a}"></svg-icon>`:e??t}</button>`}row(t,{edges:e=null}={}){const s=[...t].map(a=>a===T?n`<span></span>`:this.key(a));return n`
      <div>
        ${e?.[0]&&this.key(e[0])}
        ${s}
        ${e?.[1]&&this.key(e[1])}
      </div>`}render(){const t=this.layout,e=this.isShifted?t.shift:t.regular,s={symbols:n`<div role="group" aria-label="symbols">
        ${t.symbols.map(a=>this.row(a))}
      </div>`,keys:n`<div role="group" aria-label="keys">
        ${e.map((a,r)=>this.row(a,{edges:$[r]}))}
        <div>${B.map(a=>this.key(a))}</div>
      </div>`};return n`${this.getAttr("rows").split(/\s+/).map(a=>s[a]??"")}`}}y.init();export{y as default};
