var a=Object.defineProperty;var d=(t,e,r)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var n=(t,e)=>a(t,"name",{value:e,configurable:!0});var s=(t,e,r)=>d(t,typeof e!="symbol"?e+"":e,r);import{B as m}from"./Btn-lh_fn4Le.js";import{h as l}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-Djk4Scb_.js";import"https://esm.sh/jsr/@pulgasari/logger";const o=class o extends m{dismiss(){if(!this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,cancelable:!0})))return!1;const e=[this.nextElementSibling,this.previousElementSibling].find(c=>c?.localName===this.localName),r=this.matches(":focus");return this.remove(),r&&e?.focus(),!0}onConnected(){super.onConnected(),this.on("click",e=>{!this.removable||!e.composedPath().some(r=>r.matches?.('[part~="remove"]'))||(e.stopImmediatePropagation(),this.dismiss())},{capture:!0}),this.on("keydown",e=>{e.target===this&&this.removable&&(e.key==="Delete"||e.key==="Backspace")&&(e.preventDefault(),this.dismiss())})}render(){return l`${super.render()}${this.removable&&l`<span part="remove" aria-hidden="true"><svg-icon icon="close"></svg-icon></span>`}`}sync(){super.sync(),this.internals&&(this.internals.ariaPressed=this.hasAttribute("pressed")?"true":null)}};n(o,"BtnChip"),s(o,"reflect",["pressed","removable"]),s(o,"attr",{pressed:Boolean,removable:Boolean}),s(o,"styles",`
    :host {
      border      : 1px solid color-mix(in oklab, currentColor 25%, transparent);
      font-size   : 0.875em;
      padding     : var(--btn-padding, 0.25em 0.75em);
      --btn-radius: 999px;
    }

    :host([pressed]) {
      --btn-background : color-mix(in oklab, currentColor 15%, transparent);
      background-color : var(--btn-background);
      border-color     : currentColor;
    }

    :host([removable]) { padding-inline-end: 0.3em; }

    [part="remove"] {
      border-radius : 50%;
      display       : inline-flex;
      opacity       : 0.6;
      padding       : 0.15em;

      &:hover { background-color: color-mix(in oklab, currentColor 15%, transparent); opacity: 1; }
    }
  `);let i=o;i.init();export{i as default};
