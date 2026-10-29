var f=Object.defineProperty;var e=(o,n)=>f(o,"name",{value:n,configurable:!0});import{M as d,K as y,w as S,g as w,i as u}from"./index-CtR854MK.js";import{i as k,$ as b,c as m}from"./copied.rat-CzmVNnSl.js";import{V as U,l as v}from"./app.rat-B-tEyFdk.js";import{S as H}from"./Segments.rat-CaWJVUux.js";import{S as R}from"./Slider.rat-CGPzMg71.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function q(o,n){return V.call({props:o},o,n)}e(q,"UuidGeneratorViewRatHtml");function V(o,n){const a=k(()=>b);let r=d("count",5),l=d("version","v4"),i=y([]);const p=e(()=>crypto.randomUUID(),"v4");function $(){const t=(BigInt(Date.now())*10000n+122192928000000000n).toString(16).padStart(16,"0"),s=[...crypto.getRandomValues(new Uint8Array(8))].map(h=>h.toString(16).padStart(2,"0")).join(""),g=(parseInt(s.slice(0,2),16)&63|128).toString(16).padStart(2,"0");return`${t.slice(-8)}-${t.slice(-12,-8)}-1${t.slice(-15,-12)}-${g}${s.slice(2,6)}-${s.slice(6)}`}e($,"v1");const c=e(()=>{i.value=Array.from({length:r.value},l.value==="v4"?p:$)},"generate");return c(),u`
    <${U} back="/" title="UUID Generator" />
    <main.tool>
      <div.tool-body>
        <div.controls>
          <${H} ...${{get options(){return["v4","v1"]},get value(){return l.value},onchange:e(t=>{l.value=t,c()},"onchange")}} />
          <${R} label="Count" ...${{get min(){return 1},get max(){return 100},get value(){return r.value},onchange:e(t=>r.value=t,"onchange")}} />
          <div.tool-actions>
            <btn-push icon="refresh" label="Generate" onclick=${v(c)} />
            ${S(()=>i.value.length,()=>u`<btn-push icon=${()=>a.value==="*"?"check":"copy"} label=${()=>a.value==="*"?"Copied!":"Copy all"} onclick=${v(()=>m(i.value.join(`
`),"*"))} />`)}
          </div>
        </div>
        <div.uuid-list>
          ${w(()=>i.value,t=>t,t=>u`
              <div.uuid-row title="Click to copy" onclick=${v(()=>m(t))}>
                <code.uuid>${()=>t}</code>
                <svg-icon.copy-icon icon=${()=>a.value===t?"check":"copy"} />
              </div>
            `)}
        </div>
      </div>
    </main>
  `}e(V,"$$UuidGeneratorViewRatHtml");export{q as default};
