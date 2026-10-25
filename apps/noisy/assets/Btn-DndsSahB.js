var s=Object.defineProperty;var n=(o,t)=>s(o,"name",{value:t,configurable:!0});import"./svg-icon-KHlb6lry.js";import{a as l,h as r}from"./index-Ar8QsFaM.js";import{isFn as i}from"https://esm.sh/jsr/@pulgasari/is";import{toCamelCase as c}from"https://esm.sh/jsr/@pulgasari/str";const m={add:{icon:"add",label:"add"},back:{icon:"arrow-left",label:"back"},bookmark:{icon:"bookmark",label:"bookmark"},cancel:{icon:"close",label:"cancel"},close:{icon:"close",label:"close"},collapse:{icon:"chevron-up",label:"collapse"},copy:{icon:"copy",label:"copy"},cut:{icon:"cut",label:"cut"},delete:{icon:"delete",label:"delete"},edit:{icon:"edit",label:"edit"},expand:{icon:"chevron-down",label:"expand"},export:{icon:"export",label:"export"},heart:{icon:"heart",label:"heart"},import:{icon:"import",label:"import"},menu:{icon:"menu",label:"menu"},more:{icon:"more",label:"more"},reset:{icon:"reset",label:"reset"},save:{icon:"save",label:"save"},search:{icon:"search",label:"search"},share:{icon:"share",label:"share"}};class f extends l{static{n(this,"Btn")}static commands=m;static formAssociated=!0;static internals={role:"button"};static shadow=!0;static attr={command:String,commandfor:String,disabled:Boolean,icon:String,label:String,type:{default:"button",values:["button","reset","submit"]}};static styles=`
    :host {
      align-items     : center;
      border-radius   : var(--btn-radius, 0.375em);
      cursor          : pointer;
      display         : inline-flex;
      gap             : --space(small);
      justify-content : center;
      line-height     : 1.2;
      user-select     : none;
    }

    :host(:hover)         { background-color: color-mix(in oklab, currentColor 8%, var(--btn-background, transparent)); }
    :host(:focus-visible) { outline: 2px solid color-mix(in oklab, currentColor 55%, transparent); outline-offset: 2px; }
    :host([disabled])     { cursor: not-allowed; opacity: 0.5; }

    svg-icon { flex: none; }
  `;get form(){return this.internals?.form??null}get preset(){return this.constructor.commands[this.getAttr("command")]??{}}get iconName(){return this.getAttr("icon")??this.preset.icon}get labelText(){return this.getAttr("label")??this.preset.label??""}get method(){return c(this.getAttr("command")?.replace(/^--/,"")??"")}get commandTarget(){const t=this.getAttr("commandfor");if(t)return document.getElementById(t)??this.getRootNode().querySelector?.(t)??document.querySelector(t);for(let e=this.parentElement??this.getRootNode().host;e;e=e.parentElement??e.getRootNode().host)if(i(e[this.method]))return e;return null}run(){const t=this.getAttr("command"),e=t&&this.commandTarget;if(!e)return;if(i(e[this.method]))return e[this.method]();const a=typeof CommandEvent=="function"?new CommandEvent("command",{cancelable:!0,command:t,source:this}):new CustomEvent("command",{cancelable:!0,detail:{command:t,source:this}});e.dispatchEvent(a)}onConnected(){this.on("click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},{capture:!0}),this.on("click",t=>{if(t.defaultPrevented)return;const e=this.getAttr("type");e==="submit"&&this.form?.requestSubmit(),e==="reset"&&this.form?.reset(),this.run()}),this.on("keydown",t=>{t.target===this&&(t.key==="Enter"&&(t.preventDefault(),this.click()),t.key===" "&&t.preventDefault())}),this.on("keyup",t=>{t.target===this&&t.key===" "&&this.click()})}render(){const t=this.iconName;return r`
      ${t&&r`<svg-icon part="icon" icon="${t}"></svg-icon>`}
      <span part="label"><slot>${this.labelText}</slot></span>
    `}sync(){this.internals&&(this.internals.ariaDisabled=String(this.disabled)),this.tabIndex=this.disabled?-1:0}}export{f as B};
