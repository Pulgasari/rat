var x=Object.defineProperty;var o=(e,p)=>x(e,"name",{value:p,configurable:!0});import{N as f,K as y,w as u,i as l,g as I,M as A}from"./index-CsWBSA1m.js";import{l as v,t as P,V as S}from"./app.rat-C6L9lY-_.js";import{i as V,l as L}from"./specs-DD51o_HH.js";import{C as D}from"./CodeInput.rat-D62nM1dk.js";import{c as H}from"./files-flpFxvji.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function N(e,p){return F.call({props:e},e,p)}o(N,"DataNodeRatHtml");function F(e,p){const g={array:"brackets",boolean:"toggle",null:"null",number:"number",object:"braces",string:"quote"},k=o(n=>n===null?"null":Array.isArray(n)?"array":typeof n,"typeOf"),t=f(()=>k(e.value)),c=f(()=>t.value==="object"||t.value==="array"),i=f(()=>c.value?t.value==="array"?e.value.map((n,C)=>[C,n]):Object.entries(e.value):[]),r=f(()=>t.value==="array"?["[","]"]:["{","}"]),s=f(()=>e.value===null?"null":t.value==="string"?`"${e.value}"`:String(e.value)),h=e.depth??0;let d=y(h<3);const w=o(n=>t.value==="array"?`${e.path}[${n}]`:`${e.path}.${n}`,"pathOf"),O=o(n=>typeof n=="string"?n:JSON.stringify(n,null,2),"shown");function m(){return l`
      <span.node-actions onclick=${v(n=>n.stopPropagation())}>
        <button.act-btn title="Copy path" onclick=${v(()=>H(e.path))}><svg-icon icon="path" /></button>
        <button.act-btn title="Copy value" onclick=${v(()=>H(O(e.value)))}><svg-icon icon="copy" /></button>
      </span>
    `}return o(m,"actions"),l`
    <div.node>
      ${u(()=>c.value,()=>l`
          <div.node-row onclick=${v(()=>d.value=!d.value)}>
            <svg-icon.toggle-icon icon=${()=>d.value?"chevron-down":"chevron-right"} />
            ${u(()=>e.name!==void 0,()=>l`<span.node-key>${()=>e.name}</span><span.colon>:</span>`)}
            <svg-icon.type-icon icon=${()=>g[t.value]} />
            <span.bracket>${()=>r.value[0]}</span>
            ${u(()=>!d.value,()=>l`
                <span.preview>${()=>i.value.length} ${()=>i.value.length===1?"item":"items"}</span>
                <span.bracket>${()=>r.value[1]}</span>
              `)}
            ${()=>m()}
          </div>
          ${u(()=>d.value,()=>l`
              <div.node-children>
                ${I(()=>i.value,n=>n,n=>l`<${N} ...${{get name(){return n[0]},get value(){return n[1]},get path(){return w(n[0])},get depth(){return h+1}}} />`)}
              </div>
              <div.node-row.closing><span.bracket>${()=>r.value[1]}</span></div>
            `)}
        `,()=>l`
          <div.node-row.leaf>
            <span.leaf-indent />
            ${u(()=>e.name!==void 0,()=>l`<span.node-key>${()=>e.name}</span><span.colon>:</span>`)}
            <svg-icon.type-icon class=${()=>`is-${t.value}`} icon=${()=>g[t.value]} />
            <span.prim-val class=${()=>`is-${t.value}`}>${()=>s.value}</span>
            ${()=>m()}
          </div>
        `)}
    </div>
  `}o(F,"$$DataNodeRatHtml");function Q(e,p){return J.call({props:e},e,p)}o(Q,"InspectorViewRatHtml");function J(e,p){const g=e.view.getAttribute("name"),k=P(g),t=V[g];let c=A("input",""),i=y(void 0),r=y(""),s=y("");const h=o(a=>a===null?"null":Array.isArray(a)?"array":typeof a,"typeOf");function d(a,$={booleans:0,depth:0,keys:0,nulls:0,numbers:0,strings:0},j=0){$.depth=Math.max($.depth,j);const b=h(a);if(b==="object"||b==="array"){b==="object"&&($.keys+=Object.keys(a).length);for(const R of b==="array"?a:Object.values(a))d(R,$,j+1)}else b!=="undefined"&&$[{boolean:"booleans",null:"nulls",number:"numbers",string:"strings"}[b]]++;return $}o(d,"count");const w=f(()=>i.value===void 0?[]:Object.entries(d(i.value)).filter(([,a])=>a>0)),O=f(()=>!s.value||JSON.stringify(i.value??null).toLowerCase().includes(s.value.toLowerCase()));async function m(){const a=c.value.trim();if(!a){i.value=void 0,r.value="";return}try{i.value=await t.parse(a),r.value=""}catch($){i.value=void 0,r.value=$.message}}o(m,"inspect");async function n(){i.value!==void 0&&(c.value=await t.format(i.value),m())}o(n,"tidy");function C(){c.value="",i.value=void 0,r.value="",s.value=""}return o(C,"clear"),c.value&&m(),l`
    <${S} back="/" ...${{get title(){return k.name}}} />
    <main.tool.inspector>
      <div.layout>
        <div.input-col>
          <${D} ...${{value:c,get lang(){return L(t.label.toLowerCase())},get placeholder(){return`Paste ${t.label} here …`}}} />
          <div.input-actions>
            <btn-push icon="search" label="Inspect" disabled=${()=>!c.value} onclick=${v(m)} />
            ${u(()=>t.format&&i.value!==void 0,()=>l`<btn-push icon="format" label="Format" onclick=${v(n)} />`)}
            ${u(()=>c.value,()=>l`<btn-push icon="close" label="Clear" onclick=${v(C)} />`)}
          </div>
          ${u(()=>r.value,()=>l`<div.err-block><svg-icon icon="warning" /> ${()=>r.value}</div>`)}
        </div>
        <div.tree-col>
          ${u(()=>i.value!==void 0,()=>l`
              <div.stats-bar>
                ${I(()=>w.value,a=>a,a=>l`<span.stat>${()=>a[1]} ${()=>a[0]==="depth"?"max depth":a[0]}</span>`)}
              </div>
              <div.search-row>
                <svg-icon.search-icon icon="search" />
                <input.search-input type="text" placeholder="Filter keys & values …" value=${()=>s.value} oninput=${v(a=>s.value=a.currentTarget.value)} />
                ${u(()=>s.value,()=>l`<button.act-btn onclick=${v(()=>s.value="")}><svg-icon icon="close" /></button>`)}
              </div>
              <div.tree>
                ${u(()=>O.value,()=>l`<${N} ...${{get value(){return i.value}}} path="$" />`)}
              </div>
            `,()=>l`
              <div.tree-empty>
                <svg-icon icon=${()=>t.icon} />
                <span>Paste ${()=>t.label} and click Inspect</span>
              </div>
            `)}
        </div>
      </div>
    </main>
  `}o(J,"$$InspectorViewRatHtml");export{Q as default};
