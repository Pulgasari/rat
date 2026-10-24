import"./tags-B7kuAnty.js";import"./input-option-CcljAw-N.js";import{a as c}from"./template-CbX1Mzd8.js";import m from"./pop-modal-bXuWggN9.js";import{h as l}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-CmK-OipF.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./placement-3pTR5Us0.js";import"./actions-Dn3InYRx.js";import"./index-B1xaW8O5.js";import"./index-C41x3u_M.js";import"./locale-CxrTcH6i.js";import"./import-D9lz_U--.js";import"./options-rJMj_76y.js";class u extends m{static parts=["field","message"];static attr={cancel:"Cancel",confirm:"OK",field:String,look:String,message:String,value:String};static styles=`
    [part~="message"] { margin: 0; }
    [part~="field"]   { box-sizing: border-box; inline-size: 100%; }

    [part~="actions"] {
      display         : flex;
      gap             : --space(small);
      justify-content : flex-end;
    }
  `;static async ask(t,{options:o,...r}={}){const e=document.createElement("pop-prompt");e.options=o;for(const[s,a]of Object.entries({message:t,...r}))a!==!1&&a!=null&&e.setAttribute(s,a===!0?"":a);document.body.append(e);const n=await e.show(),p=e.$field.node?.value??null;return e.remove(),{confirmed:n==="confirm",value:p}}static async alert(t,o){await this.ask(t,{cancel:"",...o})}static async confirm(t,o){return(await this.ask(t,o)).confirmed}static async prompt(t,o,r){const{confirmed:e,value:n}=await this.ask(t,{field:!0,value:o,...r});return e?n:null}onConnected(){super.onConnected(),this.on("keydown",'[part~="field"]',t=>{t.key==="Enter"&&(t.preventDefault(),this.close("confirm"))})}renderBody(){const{cancel:t,confirm:o,field:r,look:e,message:n,value:p}=this.getAttr(),s=this.hasAttribute("field")?r||"text":null,a=(this.options??[]).map(i=>typeof i=="object"?i:{value:i});return l`
      <p part="message">${n??""}</p>
      <slot></slot>
      ${s&&l`
        <input-value part="field" ...${c({autofocus:!0,look:e,type:!a.length&&s,value:p})}>
          ${a.map(i=>l`<input-option ...${c({value:i.value})}>${i.label??i.value}</input-option>`)}
        </input-value>
      `}
      <form method="dialog" part="actions">
        ${t&&l`<button value="cancel">${t}</button>`}
        <button value="confirm" autofocus=${!s}>${o}</button>
      </form>
    `}}u.init("pop-prompt");export{u as default};
