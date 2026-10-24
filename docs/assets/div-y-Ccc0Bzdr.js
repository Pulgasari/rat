var r=Object.defineProperty;var c=(e,t,l)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l;var s=(e,t)=>r(e,"name",{value:t,configurable:!0});var i=(e,t,l)=>c(e,typeof t!="symbol"?t+"":t,l);import{a as n}from"./index-zRU6UDoC.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const o=class o extends n{static styles(){return`div-y {
      display        : flex;
      flex-direction : column;
      min-height     : stretch;
      place-content  : safe center;

      &[scrollable] {
        min-block-size : 0;
        overflow-y     : auto;
      }
    }`}};s(o,"DivY"),i(o,"attr",{scrollable:Boolean});let a=o;a.init("div-y");export{a as DivY,a as default};
