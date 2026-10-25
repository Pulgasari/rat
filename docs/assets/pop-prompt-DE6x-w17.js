var d=Object.defineProperty;var h=(i,t,e)=>t in i?d(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var g=(i,t)=>d(i,"name",{value:t,configurable:!0});var u=(i,t,e)=>h(i,typeof t!="symbol"?t+"":t,e);import"./tags-DvUri9d1.js";import"./input-option-7-V5FDHL.js";import{a as v}from"./template-DPs-zPIM.js";import y from"./pop-modal-DbUD3K2O.js";import{h as m}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-Djk4Scb_.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./placement-CECKNSni.js";import"./actions-BWkLUtBS.js";import"./index-CZPONa0e.js";import"./index-BkhVbcIn.js";import"./locale-CyKX5eGQ.js";import"./import-n7zfmJr1.js";import"./options-B1bWGPfH.js";const s=class s extends y{static async ask(t,{options:e,...r}={}){const a=document.createElement("pop-prompt");a.options=e;for(const[c,n]of Object.entries({message:t,...r}))n!==!1&&n!=null&&a.setAttribute(c,n===!0?"":n);document.body.append(a);const l=await a.show(),p=a.$field.node?.value??null;return a.remove(),{confirmed:l==="confirm",value:p}}static async alert(t,e){await this.ask(t,{cancel:"",...e})}static async confirm(t,e){return(await this.ask(t,e)).confirmed}static async prompt(t,e,r){const{confirmed:a,value:l}=await this.ask(t,{field:!0,value:e,...r});return a?l:null}onConnected(){super.onConnected(),this.on("keydown",'[part~="field"]',t=>{t.key==="Enter"&&(t.preventDefault(),this.close("confirm"))})}renderBody(){const{cancel:t,confirm:e,field:r,look:a,message:l,value:p}=this.getAttr(),c=this.hasAttribute("field")?r||"text":null,n=(this.options??[]).map(o=>typeof o=="object"?o:{value:o});return m`
      <p part="message">${l??""}</p>
      <slot></slot>
      ${c&&m`
        <input-value part="field" ...${v({autofocus:!0,look:a,type:!n.length&&c,value:p})}>
          ${n.map(o=>m`<input-option ...${v({value:o.value})}>${o.label??o.value}</input-option>`)}
        </input-value>
      `}
      <form method="dialog" part="actions">
        ${t&&m`<button value="cancel">${t}</button>`}
        <button value="confirm" autofocus=${!c}>${e}</button>
      </form>
    `}};g(s,"PopPrompt"),u(s,"parts",["field","message"]),u(s,"attr",{cancel:"Cancel",confirm:"OK",field:String,look:String,message:String,value:String}),u(s,"styles",`
    [part~="message"] { margin: 0; }
    [part~="field"]   { box-sizing: border-box; inline-size: 100%; }

    [part~="actions"] {
      display         : flex;
      gap             : --space(small);
      justify-content : flex-end;
    }
  `);let f=s;f.init();export{f as default};
