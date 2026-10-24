import{U as y,V as f,W as M,a as z}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";function H(...e){const t=document.createDocumentFragment(),n=y(e);return n.length&&t.append(...n),t}const l=e=>Object.fromEntries(Object.entries(e).filter(([,t])=>t!=null)),L=/^\s*(-?\d*\.?\d+)/,q=e=>{if(e==null)return null;const t=L.exec(String(e));return t?Number(t[1]):null},$=(e={})=>Object.fromEntries(Object.entries(e).filter(([,t])=>t!=null&&t!==!1).map(([t,n])=>[t,n===!0?"":n])),j=e=>Array.isArray(e)?e:[e,e];function x(e,t,n){const r=w(e,t,n);return t.attrs&&!t.tag&&(r.attrs={...$(t.attrs),...r.attrs}),r}function w(e,t,n){n??=t.default;const r={name:e},{max:i,min:s,step:a,type:c,unit:o,values:u}=t;if(t.tag)return{tag:t.tag,attrs:l({...$(t.attrs),...r,value:n})};if(u)return{tag:"input-value",attrs:l({...r,value:n,look:t.look}),options:u};switch(c){case"boolean":return{tag:"input-bool",attrs:l({...r,value:n?"true":null})};case"integer":case"number":return{tag:"input-number",attrs:l({...r,look:"slider",min:s,max:i,step:a,unit:o,value:n})};case"angle":return{tag:"input-number",attrs:l({...r,look:"slider",min:s??0,max:i??360,step:a??1,unit:o??"deg",value:n})};case"duration":return{tag:"input-duration",attrs:l({...r,look:"slider",min:s,max:i,step:q(a),value:n})};case"year":return{tag:"input-year",attrs:l({...r,min:s,max:i,step:a,value:n})};case"color":return{tag:"input-color",attrs:l({...r,value:n})}}return{tag:"input-value",attrs:l({...r,type:c,value:n})}}function b(e,t){return t?Object.fromEntries(Object.entries(e).map(([n,r])=>{if(p(r))return[n,[b(d(r),t)]];const i=t[r.type]??{},s=t[n]??{};return[n,{...i,...r,...s,attrs:{...i.attrs,...r.attrs,...s.attrs}}]})):e}const p=e=>Array.isArray(e),d=e=>Object.assign({},...e.filter(t=>t&&typeof t=="object")),O=(e,t)=>{const n=e?.[t];return n&&typeof n=="object"&&!Array.isArray(n)?{...e,...n}:e};function F(e,t){switch(e.type){case"boolean":return!!(t.checked??t.getAttribute?.("value")==="true");case"integer":case"year":return Math.round(Number(t.value));case"number":case"angle":return Number(t.value);default:return t.value??t.getAttribute?.("value")??""}}function A(e,t,{nested:n=!1}={}){return E({},e,t,n)}function E(e,t,n,r){for(const[i,s]of Object.entries(n)){if(p(s)){E(r?e[i]={}:e,t,d(s),r);continue}const a=t.querySelector?.(`[name="${i}"]:not(fieldset)`);a&&(e[i]=F(s,a))}return e}function v(e,t,n){const{tag:r,attrs:i,options:s}=x(e,t,n),a=f(r);for(const[u,m]of Object.entries(i))a.setAttribute(u,m);if(s)for(const u of s){const[m,T]=j(u),N=f("input-option",{value:m,textContent:T});a.append(N)}const c=f("label"),o=f("span",{textContent:t.label??e});return c.append(o,a),c}function V(e,t,n={}){const r=f("fieldset",{className:"aufbau-section",name:e});return r.append(f("legend",{textContent:e}),...C(d(t),O(n,e))),r}const C=(e,t)=>Object.entries(e).map(([n,r])=>p(r)?V(n,r,t):v(n,r,t[n]));function B(e,{nested:t=!1,values:n={},wrap:r="div",onChange:i}={}){const s=r?f(r):H();if(s.append(...C(e,n)),i){const a=o=>o.target?.closest?.("[name]:not(fieldset)")?.getAttribute("name")??null;M(s,["change","input"],o=>i(A(s,e,{nested:t}),a(o),o))}return s}const h=e=>String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;"),g=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),R=e=>Object.entries(e).map(([t,n])=>n===""?` ${t}`:` ${t}="${h(n)}"`).join("");function S(e,t,n){const{tag:r,attrs:i,options:s}=x(e,t,n),a=s?s.map(c=>{const[o,u]=j(c);return`<input-option value="${h(o)}">${g(u)}</input-option>`}).join(""):"";return`
    <label class="aufbau-field">
      <span class="aufbau-field-label">
        ${g(t.label??e)}
      </span>
      <${r}${R(i)}>${a}</${r}>
    </label>
  `}function U(e,t,n={}){return`
  <fieldset class="aufbau-section" name="${h(e)}">
    <legend>${g(e)}</legend>
    ${_(d(t),O(n,e))}
  </fieldset>
  `}const _=(e,t)=>Object.entries(e).map(([n,r])=>p(r)?U(n,r,t):S(n,r,t[n])).join("");function D(e,{values:t={},wrap:n="div"}={}){const r=_(e,t);return n?`<${n}>${r}</${n}>`:r}function I(e,t,n,r={}){const i=b({[e]:t},r.controls)[e];return r.format==="html"?S(e,i,n):v(e,i,n)}function K(e,t={}){const n=b(e,t.controls);return t.format==="html"?D(n,t):B(n,t)}const P={field:I,readValues:A,render:K};class W extends z{static styles(){return`app-config {
      display: block;

      > div {
        display        : flex;
        flex-direction : column;
        gap            : var(--config-gap, --space(normal));
      }

      label {
        align-items : center;
        display     : flex;
        flex-wrap   : wrap;
        gap         : --space(small);

        > span       { flex: 0 0 var(--config-label-size, 7rem); font-size: 0.85em; opacity: 0.65; }
        > :not(span) { flex: 1 1 12rem; min-inline-size: 0; }
      }
    }`}get spec(){return this._spec??{}}set spec(t){this._spec=t,this.build()}get controls(){return this._controls??null}set controls(t){this._controls=t,this._built&&this.build()}get values(){return this._values??{}}set values(t){this._values=t,this._built?this.fill():this.build()}onConnected(){this.build()}build(){if(!this.isConnected)return;const t=P.render(this.spec,{controls:this.controls,values:{...this.values},onChange:(n,r)=>{r!=null&&(this._values={...this.values,[r]:n[r]},this.emit("config",{key:r,values:n}))}});this.replaceChildren(t),this._built=!0}fill(){for(const[t,n]of Object.entries(this.values)){const r=this.querySelector(`[name="${CSS.escape(t)}"]:not(fieldset)`);r&&(r.type==="checkbox"?r.checked=!!n:String(r.value??"")!==String(n??"")&&(r.value=n??""))}}}W.init("app-config");export{W as AppConfig,W as default};
