import{B as s}from"./Btn-DVYVQNLL.js";import{h as t}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-CmK-OipF.js";import"https://esm.sh/jsr/@pulgasari/logger";class i extends s{static reflect=["pressed","removable"];static attr={pressed:Boolean,removable:Boolean};static styles=`
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
  `;dismiss(){if(!this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,cancelable:!0})))return!1;const e=[this.nextElementSibling,this.previousElementSibling].find(o=>o?.localName===this.localName),r=this.matches(":focus");return this.remove(),r&&e?.focus(),!0}onConnected(){super.onConnected(),this.on("click",e=>{!this.removable||!e.composedPath().some(r=>r.matches?.('[part~="remove"]'))||(e.stopImmediatePropagation(),this.dismiss())},{capture:!0}),this.on("keydown",e=>{e.target===this&&this.removable&&(e.key==="Delete"||e.key==="Backspace")&&(e.preventDefault(),this.dismiss())})}render(){return t`${super.render()}${this.removable&&t`<span part="remove" aria-hidden="true"><svg-icon icon="close"></svg-icon></span>`}`}sync(){super.sync(),this.internals&&(this.internals.ariaPressed=this.hasAttribute("pressed")?"true":null)}}i.init("btn-chip");export{i as default};
