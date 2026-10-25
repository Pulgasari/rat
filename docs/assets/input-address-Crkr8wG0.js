var y=Object.defineProperty;var f=(o,t,e)=>t in o?y(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var n=(o,t)=>y(o,"name",{value:t,configurable:!0});var p=(o,t,e)=>f(o,typeof t!="symbol"?t+"":t,e);import"./tags-vEZ35LAB.js";import{A as h,h as x}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as d}from"./template-DVBhjnqx.js";import{l as $}from"./locale-CyKX5eGQ.js";import"./svg-icon-BzSAM4HS.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./placement-CECKNSni.js";import"./actions-eNzxACff.js";import"./index-CZPONa0e.js";import"./index-DnIgJ5wD.js";import"./import-n7zfmJr1.js";import"./options-B1bWGPfH.js";const i=["street","postcode","city","region","country"],g={city:"city",postcode:"postcode",region:"state / region",street:"street and number"},b={AU:"city-region-postcode",CA:"city-region-postcode",US:"city-region-postcode",GB:"city-postcode",IE:"city-postcode"},u=n(()=>Object.fromEntries(i.map(o=>[o,""])),"EMPTY"),a=class a extends h{parseValue(t){try{return{...u(),...JSON.parse(t||"{}")}}catch{return u()}}formatValue(t){const e={...u(),...typeof t=="string"?this.parseValue(t):t};return Object.values(e).some(Boolean)?JSON.stringify(e):""}get formValue(){const t=this.value;if(!Object.values(t).some(Boolean))return null;const e=new FormData;for(const r of i)e.append(`${this.name||"address"}[${r}]`,t[r]);return e}get country(){const t=this.value.country;if(t)return t.toUpperCase();try{return new Intl.Locale($(this)).maximize().region??""}catch{return""}}onConnected(){this.$(this.root).on("change",t=>{const e=t.target?.getAttribute?.("part");i.includes(e)&&(t.stopPropagation(),this.commit({...this.value,[e]:t.target.value??""}))}),this.$(this.root).on("input",t=>t.stopPropagation())}render(){const{disabled:t,readonly:e,required:r}=this.getAttr(),m={disabled:t,readonly:e},s=n(c=>d({...m,"aria-label":g[c],placeholder:g[c],required:r&&c!=="region"}),"text");return x`
      <input-text    part="street"   ...${s("street")}></input-text>
      <input-text    part="postcode" ...${s("postcode")}></input-text>
      <input-text    part="city"     ...${s("city")}></input-text>
      <input-text    part="region"   ...${s("region")}></input-text>
      <input-country part="country"  ...${d({...m,"aria-label":"country"})}></input-country>
    `}sync(){const t={...this.value,country:this.value.country||this.country};for(const e of i){const r=this.root.querySelector(`[part="${e}"]`);r&&(r.value??"")!==t[e]&&(r.value=t[e])}this.dataset.format=b[this.country]??"postcode-city"}};n(a,"InputAddress"),p(a,"shadow",{delegatesFocus:!0}),p(a,"styles",`
    :host {
      display               : grid;
      gap                   : --space(small);
      grid-template-areas   : "street street" "postcode city" "country country";
      grid-template-columns : minmax(5em, 1fr) 3fr;
    }

    :host([data-format="city-region-postcode"]) {
      grid-template-areas   : "street street street" "city region postcode" "country country country";
      grid-template-columns : 3fr 2fr minmax(5em, 1fr);
    }

    :host([data-format="city-postcode"]) {
      grid-template-areas   : "street" "city" "postcode" "country";
      grid-template-columns : 1fr;
    }

    [part="region"] { display: none; }
    :host([data-format="city-region-postcode"]) [part="region"] { display: inline-flex; }

    ${i.map(t=>`[part="${t}"] { grid-area: ${t}; min-inline-size: 0; }`).join(`
    `)}
  `);let l=a;l.init();export{l as default};
