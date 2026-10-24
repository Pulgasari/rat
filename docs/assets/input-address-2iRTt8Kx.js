import"./tags-B7kuAnty.js";import{A as l,h as d}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as p}from"./template-CbX1Mzd8.js";import{l as m}from"./locale-CxrTcH6i.js";import"./svg-icon-CmK-OipF.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./placement-3pTR5Us0.js";import"./actions-Dn3InYRx.js";import"./index-B1xaW8O5.js";import"./index-C41x3u_M.js";import"./import-D9lz_U--.js";import"./options-rJMj_76y.js";const o=["street","postcode","city","region","country"],u={city:"city",postcode:"postcode",region:"state / region",street:"street and number"},y={AU:"city-region-postcode",CA:"city-region-postcode",US:"city-region-postcode",GB:"city-postcode",IE:"city-postcode"},a=()=>Object.fromEntries(o.map(n=>[n,""]));class g extends l{static shadow={delegatesFocus:!0};static styles=`
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

    ${o.map(t=>`[part="${t}"] { grid-area: ${t}; min-inline-size: 0; }`).join(`
    `)}
  `;parseValue(t){try{return{...a(),...JSON.parse(t||"{}")}}catch{return a()}}formatValue(t){const e={...a(),...typeof t=="string"?this.parseValue(t):t};return Object.values(e).some(Boolean)?JSON.stringify(e):""}get formValue(){const t=this.value;if(!Object.values(t).some(Boolean))return null;const e=new FormData;for(const r of o)e.append(`${this.name||"address"}[${r}]`,t[r]);return e}get country(){const t=this.value.country;if(t)return t.toUpperCase();try{return new Intl.Locale(m(this)).maximize().region??""}catch{return""}}onConnected(){this.$(this.root).on("change",t=>{const e=t.target?.getAttribute?.("part");o.includes(e)&&(t.stopPropagation(),this.commit({...this.value,[e]:t.target.value??""}))}),this.$(this.root).on("input",t=>t.stopPropagation())}render(){const{disabled:t,readonly:e,required:r}=this.getAttr(),c={disabled:t,readonly:e},i=s=>p({...c,"aria-label":u[s],placeholder:u[s],required:r&&s!=="region"});return d`
      <input-text    part="street"   ...${i("street")}></input-text>
      <input-text    part="postcode" ...${i("postcode")}></input-text>
      <input-text    part="city"     ...${i("city")}></input-text>
      <input-text    part="region"   ...${i("region")}></input-text>
      <input-country part="country"  ...${p({...c,"aria-label":"country"})}></input-country>
    `}sync(){const t={...this.value,country:this.value.country||this.country};for(const e of o){const r=this.root.querySelector(`[part="${e}"]`);r&&(r.value??"")!==t[e]&&(r.value=t[e])}this.dataset.format=y[this.country]??"postcode-city"}}g.init("input-address");export{g as default};
