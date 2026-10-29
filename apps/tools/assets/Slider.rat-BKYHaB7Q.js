var t=Object.defineProperty;var a=(e,l)=>t(e,"name",{value:l,configurable:!0});import{l as i}from"./app.rat-PYKgMnM7.js";import{i as u}from"./index-DaBPW9ZR.js";function d(e,l){return r.call({props:e},e,l)}a(d,"SliderRatHtml");function r(e,l){return u`
    <label.slider>
      <span.slider-label>${()=>e.label}</span>
      <input type="range" min=${()=>e.min} max=${()=>e.max} step=${()=>e.step??1} value=${()=>e.value} oninput=${i(n=>e.onchange(Number(n.currentTarget.value)))} />
      <span.slider-value>${()=>e.value}${()=>e.unit??""}</span>
    </label>
  `}a(r,"$$SliderRatHtml");export{d as S};
