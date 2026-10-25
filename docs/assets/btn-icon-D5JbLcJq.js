var r=Object.defineProperty;var o=(i,t,s)=>t in i?r(i,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[t]=s;var n=(i,t)=>r(i,"name",{value:t,configurable:!0});var l=(i,t,s)=>o(i,typeof t!="symbol"?t+"":t,s);import{B as p}from"./Btn-eO_oLsYV.js";import{h as m}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-BzSAM4HS.js";import"https://esm.sh/jsr/@pulgasari/logger";const a=class a extends p{render(){return m`<svg-icon part="icon" icon="${this.iconName??""}"></svg-icon><span part="label"><slot></slot></span>`}sync(){super.sync(),this.internals&&(this.internals.ariaLabel=this.getAttr("label")??(this.textContent.trim()||this.preset.label)??null)}};n(a,"BtnIcon"),l(a,"styles",`
    :host {
      aspect-ratio : 1;
      font-size    : var(--btn-icon-size, 1.15em);
      padding      : var(--btn-padding, --space(tiny));
    }

    [part="label"] { display: none; }
  `);let e=a;e.init();export{e as default};
