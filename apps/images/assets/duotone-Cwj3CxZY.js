var s=Object.defineProperty;var n=(o,e)=>s(o,"name",{value:e,configurable:!0});import{r as l,f as u}from"./app.rat-DakpQRL4.js";import"./index-oKSG3TSX.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";const i="duotone",g="DuoTone",c={shadow:{type:"color",default:"#1a1a2e",bake:!0},highlight:{type:"color",default:"#e94560",bake:!0}};function r(o){const e=/^#?([0-9a-f]{6})$/i.exec(String(o).trim()),t=e?parseInt(e[1],16):0;return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}n(r,"channels");function y(o={}){const e=l(c,o),t=r(e.shadow),a=r(e.highlight);return u(i,`
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"/>
    <feComponentTransfer>
      <feFuncR type="table" tableValues="${t[0]} ${a[0]}"/>
      <feFuncG type="table" tableValues="${t[1]} ${a[1]}"/>
      <feFuncB type="table" tableValues="${t[2]} ${a[2]}"/>
    </feComponentTransfer>
  `,o)}n(y,"duotone");export{y as default,i as id,g as name,c as vars};
