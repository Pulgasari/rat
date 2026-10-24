var i=Object.defineProperty;var n=(e,t,l)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l;var r=(e,t)=>i(e,"name",{value:t,configurable:!0});var s=(e,t,l)=>n(e,typeof t!="symbol"?t+"":t,l);import{a as m}from"./index-CJDrpzke.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const o=class o extends m{static styles(){return`div-x {
      display        : flex;
      flex-direction : row;

      &[scrollable] {
        min-inline-size : 0;
        overflow-x      : auto;
      }
    }`}};r(o,"DivX"),s(o,"attr",{scrollable:Boolean});let a=o;a.init("div-x");export{a as DivX,a as default};
