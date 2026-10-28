var A=Object.defineProperty;var o=(e,p)=>A(e,"name",{value:p,configurable:!0});import{K as f,H as y,w as u,h as t,f as I,J as N}from"./index-BqtsWe95.js";import{l as v,t as P,V as S}from"./app.rat-DP92pCm3.js";import{i as V}from"./specs-DjCaNLA1.js";import{C as J}from"./CodeInput.rat-DRE9roXN.js";import{c as H}from"./files-flpFxvji.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function R(e,p){return D.call({props:e},e,p)}o(R,"DataNodeRatHtml");function D(e,p){const h={array:"brackets",boolean:"toggle",null:"null",number:"number",object:"braces",string:"quote"},k=o(n=>n===null?"null":Array.isArray(n)?"array":typeof n,"typeOf"),l=f(()=>k(e.value)),c=f(()=>l.value==="object"||l.value==="array"),i=f(()=>c.value?l.value==="array"?e.value.map((n,j)=>[j,n]):Object.entries(e.value):[]),r=f(()=>l.value==="array"?["[","]"]:["{","}"]),s=f(()=>e.value===null?"null":l.value==="string"?`"${e.value}"`:String(e.value)),g=e.depth??0;let d=y(g<3);const w=o(n=>l.value==="array"?`${e.path}[${n}]`:`${e.path}.${n}`,"pathOf"),O=o(n=>typeof n=="string"?n:JSON.stringify(n,null,2),"shown");function m(){return t`
      <span.node-actions onclick=${v(n=>n.stopPropagation())}>
        <button.act-btn title="Copy path" onclick=${v(()=>H(e.path))}><svg-icon icon="path" /></button>
        <button.act-btn title="Copy value" onclick=${v(()=>H(O(e.value)))}><svg-icon icon="copy" /></button>
      </span>
    `}return o(m,"actions"),t`
    <div.node>
      ${u(()=>c.value,()=>t`
          <div.node-row onclick=${v(()=>d.value=!d.value)}>
            <svg-icon.toggle-icon icon=${()=>d.value?"chevron-down":"chevron-right"} />
            ${u(()=>e.name!==void 0,()=>t`<span.node-key>${()=>e.name}</span><span.colon>:</span>`)}
            <svg-icon.type-icon icon=${()=>h[l.value]} />
            <span.bracket>${()=>r.value[0]}</span>
            ${u(()=>!d.value,()=>t`
                <span.preview>${()=>i.value.length} ${()=>i.value.length===1?"item":"items"}</span>
                <span.bracket>${()=>r.value[1]}</span>
              `)}
            ${()=>m()}
          </div>
          ${u(()=>d.value,()=>t`
              <div.node-children>
                ${I(()=>i.value,n=>n,n=>t`<${R} ...${{get name(){return n[0]},get value(){return n[1]},get path(){return w(n[0])},get depth(){return g+1}}} />`)}
              </div>
              <div.node-row.closing><span.bracket>${()=>r.value[1]}</span></div>
            `)}
        `,()=>t`
          <div.node-row.leaf>
            <span.leaf-indent />
            ${u(()=>e.name!==void 0,()=>t`<span.node-key>${()=>e.name}</span><span.colon>:</span>`)}
            <svg-icon.type-icon class=${()=>`is-${l.value}`} icon=${()=>h[l.value]} />
            <span.prim-val class=${()=>`is-${l.value}`}>${()=>s.value}</span>
            ${()=>m()}
          </div>
        `)}
    </div>
  `}o(D,"$$DataNodeRatHtml");function G(e,p){return F.call({props:e},e,p)}o(G,"InspectorViewRatHtml");function F(e,p){const h=e.view.getAttribute("name"),k=P(h),l=V[h];let c=N("input",""),i=y(void 0),r=y(""),s=y("");const g=o(a=>a===null?"null":Array.isArray(a)?"array":typeof a,"typeOf");function d(a,$={booleans:0,depth:0,keys:0,nulls:0,numbers:0,strings:0},C=0){$.depth=Math.max($.depth,C);const b=g(a);if(b==="object"||b==="array"){b==="object"&&($.keys+=Object.keys(a).length);for(const x of b==="array"?a:Object.values(a))d(x,$,C+1)}else b!=="undefined"&&$[{boolean:"booleans",null:"nulls",number:"numbers",string:"strings"}[b]]++;return $}o(d,"count");const w=f(()=>i.value===void 0?[]:Object.entries(d(i.value)).filter(([,a])=>a>0)),O=f(()=>!s.value||JSON.stringify(i.value??null).toLowerCase().includes(s.value.toLowerCase()));async function m(){const a=c.value.trim();if(!a){i.value=void 0,r.value="";return}try{i.value=await l.parse(a),r.value=""}catch($){i.value=void 0,r.value=$.message}}o(m,"inspect");async function n(){i.value!==void 0&&(c.value=await l.format(i.value),m())}o(n,"tidy");function j(){c.value="",i.value=void 0,r.value="",s.value=""}return o(j,"clear"),c.value&&m(),t`
    <${S} back="/" ...${{get title(){return k.name}}} />
    <main.tool.inspector>
      <div.layout>
        <div.input-col>
          <${J} ...${{value:c,get placeholder(){return`Paste ${l.label} here …`}}} />
          <div.input-actions>
            <btn-push icon="search" label="Inspect" disabled=${()=>!c.value} onclick=${v(m)} />
            ${u(()=>l.format&&i.value!==void 0,()=>t`<btn-push icon="format" label="Format" onclick=${v(n)} />`)}
            ${u(()=>c.value,()=>t`<btn-push icon="close" label="Clear" onclick=${v(j)} />`)}
          </div>
          ${u(()=>r.value,()=>t`<div.err-block><svg-icon icon="warning" /> ${()=>r.value}</div>`)}
        </div>
        <div.tree-col>
          ${u(()=>i.value!==void 0,()=>t`
              <div.stats-bar>
                ${I(()=>w.value,a=>a,a=>t`<span.stat>${()=>a[1]} ${()=>a[0]==="depth"?"max depth":a[0]}</span>`)}
              </div>
              <div.search-row>
                <svg-icon.search-icon icon="search" />
                <input.search-input type="text" placeholder="Filter keys & values …" value=${()=>s.value} oninput=${v(a=>s.value=a.currentTarget.value)} />
                ${u(()=>s.value,()=>t`<button.act-btn onclick=${v(()=>s.value="")}><svg-icon icon="close" /></button>`)}
              </div>
              <div.tree>
                ${u(()=>O.value,()=>t`<${R} ...${{get value(){return i.value}}} path="$" />`)}
              </div>
            `,()=>t`
              <div.tree-empty>
                <svg-icon icon=${()=>l.icon} />
                <span>Paste ${()=>l.label} and click Inspect</span>
              </div>
            `)}
        </div>
      </div>
    </main>
  `}o(F,"$$InspectorViewRatHtml");export{G as default};
