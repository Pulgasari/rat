var V=Object.defineProperty;var i=(a,s)=>V(a,"name",{value:s,configurable:!0});import{M as d,K as g,N as O,P as x,Q as T,w as H,i as h}from"./index-D7eNq_FT.js";import{t as M,V as S,l as R}from"./app.rat-CUWfUmji.js";import{w as W,l as y}from"./specs-CQ9MJwOR.js";import{C as A}from"./CodeInput.rat-B2b4_417.js";import{C as I}from"./CodeOutput.rat-jd7lW7Js.js";import{S as K}from"./Segments.rat-DNjJgeH7.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"./files-flpFxvji.js";function U(a,s){return L.call({props:a},a,s)}i(U,"WorkbenchViewRatHtml");function L(a,s){const b=a.view.getAttribute("name"),C=M(b),t=W[b];let l=d("input",""),c=d("live",!1),r=d("format",t.formats?.[0].id??null),m=g(""),v=g(""),n=g(!1),f=g(null);const k=O(()=>t.formats?.find(e=>e.id===r.value)?.ext??t.ext);let p=0;async function $(){const e=l.value.trim(),u=++p;if(!e){m.value="",v.value="",f.value=null;return}n.value=!0,v.value="";try{const o=await t.execute(e,r.value);if(u!==p)return;m.value=o,f.value=t.formats?null:{after:o.length,ratio:Math.round((1-o.length/e.length)*100)}}catch(o){if(u!==p)return;m.value="",f.value=null,v.value=o.message}finally{u===p&&(n.value=!1)}}i($,"run");let w=0;return x(()=>{const e=c.value,u=l.value;clearTimeout(w),e&&u&&(w=setTimeout($,1e3))}),x(()=>{r.value,T(()=>l.value)&&$()}),h`
    <${S} back="/" ...${{get title(){return C.name}}} />
    <main.tool.workbench>
      <div.panes>
        <${A} ...${{value:l,get lang(){return y(t.ext)},get placeholder(){return t.placeholder},get filename(){return`input.${t.ext}`}}} />
        <${I} ...${{get value(){return m.value},get lang(){return y(k.value)},get error(){return v.value},get stats(){return f.value},get filename(){return`output.${k.value}`}}} />
      </div>
      <div.tool-actions>
        ${H(()=>t.formats,()=>h`<${K} ...${{get options(){return t.formats.map(e=>({label:e.label,value:e.id}))},get value(){return r.value},onchange:i(e=>r.value=e,"onchange")}} />`)}
        ${H(()=>!c.value,()=>h`<btn-push icon=${()=>n.value?"loading":"run"} label=${()=>n.value?"Running …":t.action} disabled=${()=>n.value||!l.value} onclick=${R($)} />`)}
        <label.toggle>
          <input type="checkbox" checked=${()=>c.value} onchange=${R(e=>c.value=e.currentTarget.checked)} />
          <span>Live</span>
        </label>
      </div>
    </main>
  `}i(L,"$$WorkbenchViewRatHtml");export{U as default};
