var a=Object.defineProperty;var e=(t,o)=>a(t,"name",{value:o,configurable:!0});import{a as n}from"./index-CLscBhfk.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class r extends n{static{e(this,"AppFloat")}static attr={anchor:{type:String,default:"bottom-end",values:["bottom","bottom-end","bottom-start","center","end","start","top","top-end","top-start"]},direction:{type:String,default:"up",values:["down","end","start","up"]}};static reflect=["anchor","direction"];static styles(){return`app-float {
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
    }`}}r.init("app-float");export{r as AppFloat,r as default};
