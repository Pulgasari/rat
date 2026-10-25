var n=Object.defineProperty;var l=(a,t,o)=>t in a?n(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o;var e=(a,t)=>n(a,"name",{value:t,configurable:!0});var i=(a,t,o)=>l(a,typeof t!="symbol"?t+"":t,o);import{B as p}from"./Btn-lh_fn4Le.js";import"./svg-icon-Djk4Scb_.js";import"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";const r=class r extends p{};e(r,"BtnPush"),i(r,"reflect",["variant"]),i(r,"attr",{variant:"default"}),i(r,"styles",`
    :host {
      --btn-background : color-mix(in oklab, currentColor 12%, transparent);

      background-color : var(--btn-background);
      padding          : var(--btn-padding, --space(small));
    }
  `);let c=r;c.init();export{c as default};
