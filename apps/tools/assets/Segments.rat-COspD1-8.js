var s=Object.defineProperty;var l=(a,t)=>s(a,"name",{value:t,configurable:!0});import{K as m,f as u,w as i,h as c}from"./index-BqtsWe95.js";import{l as r}from"./app.rat-DP92pCm3.js";function g(a,t){return v.call({props:a},a,t)}l(g,"SegmentsRatHtml");function v(a,t){const n=m(()=>(a.options??[]).map(e=>typeof e=="object"?e:{label:String(e),value:e}));return c`
    <div.segments>
      ${u(()=>n.value,e=>e,e=>c`
          <button.chip class:active=${()=>a.value===e.value} onclick=${r(()=>a.onchange(e.value))}>
            ${i(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} />`)}
            ${()=>e.label}
          </button>
        `)}
    </div>
  `}l(v,"$$SegmentsRatHtml");export{g as S};
