var s=Object.defineProperty;var l=(a,t)=>s(a,"name",{value:t,configurable:!0});import{N as i,g as m,w as u,i as c}from"./index-BgOYoByy.js";import{l as r}from"./app.rat-DU5-tjU4.js";function o(a,t){return v.call({props:a},a,t)}l(o,"SegmentsRatHtml");function v(a,t){const n=i(()=>(a.options??[]).map(e=>typeof e=="object"?e:{label:String(e),value:e}));return c`
    <div.segments>
      ${m(()=>n.value,e=>e,e=>c`
          <button.chip class:active=${()=>a.value===e.value} onclick=${r(()=>a.onchange(e.value))}>
            ${u(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} />`)}
            ${()=>e.label}
          </button>
        `)}
    </div>
  `}l(v,"$$SegmentsRatHtml");export{o as S};
