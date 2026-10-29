var m=Object.defineProperty;var a=(i,t)=>m(i,"name",{value:t,configurable:!0});import"./tags-Bw8LkrU-.js";import{A as d,h as y}from"./index-DJRS1N05.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as u}from"./template-BpqHPBmK.js";import{l as g}from"./locale-CyKX5eGQ.js";import"./svg-icon-oK63BI77.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./placement-CECKNSni.js";import"./actions-Ca21dqAV.js";import"./index-CZPONa0e.js";import"./index-BYoc2UMT.js";import"./import-n7zfmJr1.js";import"./options-B1bWGPfH.js";const r=["street","postcode","city","region","country"],l={city:"city",postcode:"postcode",region:"state / region",street:"street and number"},f={AU:"city-region-postcode",CA:"city-region-postcode",US:"city-region-postcode",GB:"city-postcode",IE:"city-postcode"},c=a(()=>Object.fromEntries(r.map(i=>[i,""])),"EMPTY");class h extends d{static{a(this,"InputAddress")}static shadow={delegatesFocus:!0};static styles=`
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

    ${r.map(t=>`[part="${t}"] { grid-area: ${t}; min-inline-size: 0; }`).join(`
    `)}
  `;parseValue(t){try{return{...c(),...JSON.parse(t||"{}")}}catch{return c()}}formatValue(t){const e={...c(),...typeof t=="string"?this.parseValue(t):t};return Object.values(e).some(Boolean)?JSON.stringify(e):""}get formValue(){const t=this.value;if(!Object.values(t).some(Boolean))return null;const e=new FormData;for(const o of r)e.append(`${this.name||"address"}[${o}]`,t[o]);return e}get country(){const t=this.value.country;if(t)return t.toUpperCase();try{return new Intl.Locale(g(this)).maximize().region??""}catch{return""}}onConnected(){this.$(this.root).on("change",t=>{const e=t.target?.getAttribute?.("part");r.includes(e)&&(t.stopPropagation(),this.commit({...this.value,[e]:t.target.value??""}))}),this.$(this.root).on("input",t=>t.stopPropagation())}render(){const{disabled:t,readonly:e,required:o}=this.getAttr(),p={disabled:t,readonly:e},s=a(n=>u({...p,"aria-label":l[n],placeholder:l[n],required:o&&n!=="region"}),"text");return y`
      <input-text    part="street"   ...${s("street")}></input-text>
      <input-text    part="postcode" ...${s("postcode")}></input-text>
      <input-text    part="city"     ...${s("city")}></input-text>
      <input-text    part="region"   ...${s("region")}></input-text>
      <input-country part="country"  ...${u({...p,"aria-label":"country"})}></input-country>
    `}sync(){const t={...this.value,country:this.value.country||this.country};for(const e of r){const o=this.root.querySelector(`[part="${e}"]`);o&&(o.value??"")!==t[e]&&(o.value=t[e])}this.dataset.format=f[this.country]??"postcode-city"}}h.init();export{h as default};
