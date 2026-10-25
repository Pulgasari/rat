var i=Object.defineProperty;var c=(e,t,o)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var s=(e,t)=>i(e,"name",{value:t,configurable:!0});var r=(e,t,o)=>c(e,typeof t!="symbol"?t+"":t,o);import{a as l}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const n=class n extends l{static styles(){return`app-float {
      --float-offset : 1rem;

      align-items    : center;
      display        : flex;
      flex-direction : column-reverse;
      gap            : var(--float-gap, --space(normal));
      pointer-events : none;
      position       : absolute;
      z-index        : var(--float-z, 10);

      > * { pointer-events: auto; }

      &[direction="down"]  { flex-direction: column; }
      &[direction="start"] { flex-direction: row-reverse; }
      &[direction="end"]   { flex-direction: row; }

      &[anchor^="top"]    { inset-block-start  : var(--float-offset); }
      &[anchor^="bottom"] { inset-block-end    : calc(var(--float-offset) + env(safe-area-inset-bottom, 0px)); }
      &[anchor$="start"]  { inset-inline-start : var(--float-offset); }
      &[anchor$="end"]    { inset-inline-end   : var(--float-offset); }

      &:is([anchor="top"], [anchor="bottom"], [anchor="center"]) { inset-inline-start: 50%; translate: -50% 0; }
      &:is([anchor="start"], [anchor="end"], [anchor="center"])  { inset-block-start: 50%; translate: 0 -50%; }
      &[anchor="center"] { translate: -50% -50%; }
    }`}};s(n,"AppFloat"),r(n,"attr",{anchor:{type:String,default:"bottom-end",values:["bottom","bottom-end","bottom-start","center","end","start","top","top-end","top-start"]},direction:{type:String,default:"up",values:["down","end","start","up"]}}),r(n,"reflect",["anchor","direction"]);let a=n;a.init("app-float");export{a as AppFloat,a as default};
