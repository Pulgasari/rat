var i=Object.defineProperty;var d=(r,e,t)=>e in r?i(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var a=(r,e)=>i(r,"name",{value:e,configurable:!0});var n=(r,e,t)=>d(r,typeof e!="symbol"?e+"":e,t);import"./svg-icon-DQ34R_gw.js";import{a as u,h as s}from"./index-ChxOIlqb.js";import{isFn as l}from"https://esm.sh/jsr/@pulgasari/is";import{toCamelCase as h}from"https://esm.sh/jsr/@pulgasari/str";const b={add:{icon:"add",label:"add"},back:{icon:"arrow-left",label:"back"},bookmark:{icon:"bookmark",label:"bookmark"},cancel:{icon:"close",label:"cancel"},close:{icon:"close",label:"close"},collapse:{icon:"chevron-up",label:"collapse"},copy:{icon:"copy",label:"copy"},cut:{icon:"cut",label:"cut"},delete:{icon:"delete",label:"delete"},edit:{icon:"edit",label:"edit"},expand:{icon:"chevron-down",label:"expand"},export:{icon:"export",label:"export"},heart:{icon:"heart",label:"heart"},import:{icon:"import",label:"import"},menu:{icon:"menu",label:"menu"},more:{icon:"more",label:"more"},reset:{icon:"reset",label:"reset"},save:{icon:"save",label:"save"},search:{icon:"search",label:"search"},share:{icon:"share",label:"share"}},o=class o extends u{get form(){return this.internals?.form??null}get preset(){return this.constructor.commands[this.getAttr("command")]??{}}get iconName(){return this.getAttr("icon")??this.preset.icon}get labelText(){return this.getAttr("label")??this.preset.label??""}get method(){return h(this.getAttr("command")?.replace(/^--/,"")??"")}get commandTarget(){const e=this.getAttr("commandfor");if(e)return document.getElementById(e)??this.getRootNode().querySelector?.(e)??document.querySelector(e);for(let t=this.parentElement??this.getRootNode().host;t;t=t.parentElement??t.getRootNode().host)if(l(t[this.method]))return t;return null}run(){const e=this.getAttr("command"),t=e&&this.commandTarget;if(!t)return;if(l(t[this.method]))return t[this.method]();const m=typeof CommandEvent=="function"?new CommandEvent("command",{cancelable:!0,command:e,source:this}):new CustomEvent("command",{cancelable:!0,detail:{command:e,source:this}});t.dispatchEvent(m)}onConnected(){this.on("click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},{capture:!0}),this.on("click",e=>{if(e.defaultPrevented)return;const t=this.getAttr("type");t==="submit"&&this.form?.requestSubmit(),t==="reset"&&this.form?.reset(),this.run()}),this.on("keydown",e=>{e.target===this&&(e.key==="Enter"&&(e.preventDefault(),this.click()),e.key===" "&&e.preventDefault())}),this.on("keyup",e=>{e.target===this&&e.key===" "&&this.click()})}render(){const e=this.iconName;return s`
      ${e&&s`<svg-icon part="icon" icon="${e}"></svg-icon>`}
      <span part="label"><slot>${this.labelText}</slot></span>
    `}sync(){this.internals&&(this.internals.ariaDisabled=String(this.disabled)),this.tabIndex=this.disabled?-1:0}};a(o,"Btn"),n(o,"commands",b),n(o,"formAssociated",!0),n(o,"internals",{role:"button"}),n(o,"shadow",!0),n(o,"attr",{command:String,commandfor:String,disabled:Boolean,icon:String,label:String,type:{default:"button",values:["button","reset","submit"]}}),n(o,"styles",`
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
  `);let c=o;export{c as B};
