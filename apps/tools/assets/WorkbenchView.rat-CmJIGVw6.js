var C=Object.defineProperty;var i=(a,s)=>C(a,"name",{value:s,configurable:!0});import{J as d,H as $,K as V,N as w,O,w as H,h}from"./index-BqtsWe95.js";import{t as T,V as S,l as x}from"./app.rat-DP92pCm3.js";import{w as W}from"./specs-DjCaNLA1.js";import{C as A}from"./CodeInput.rat-DRE9roXN.js";import{C as I}from"./CodeOutput.rat-DY3AJlaQ.js";import{S as J}from"./Segments.rat-COspD1-8.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"./files-flpFxvji.js";function Q(a,s){return K.call({props:a},a,s)}i(Q,"WorkbenchViewRatHtml");function K(a,s){const b=a.view.getAttribute("name"),R=T(b),t=W[b];let l=d("input",""),c=d("live",!1),r=d("format",t.formats?.[0].id??null),m=$(""),v=$(""),u=$(!1),f=$(null);const y=V(()=>t.formats?.find(e=>e.id===r.value)?.ext??t.ext);let p=0;async function g(){const e=l.value.trim(),n=++p;if(!e){m.value="",v.value="",f.value=null;return}u.value=!0,v.value="";try{const o=await t.execute(e,r.value);if(n!==p)return;m.value=o,f.value=t.formats?null:{after:o.length,ratio:Math.round((1-o.length/e.length)*100)}}catch(o){if(n!==p)return;m.value="",f.value=null,v.value=o.message}finally{n===p&&(u.value=!1)}}i(g,"run");let k=0;return w(()=>{const e=c.value,n=l.value;clearTimeout(k),e&&n&&(k=setTimeout(g,1e3))}),w(()=>{r.value,O(()=>l.value)&&g()}),h`
    <${S} back="/" ...${{get title(){return R.name}}} />
    <main.tool.workbench>
      <div.panes>
        <${A} ...${{value:l,get placeholder(){return t.placeholder},get filename(){return`input.${t.ext}`}}} />
        <${I} ...${{get value(){return m.value},get error(){return v.value},get stats(){return f.value},get filename(){return`output.${y.value}`}}} />
      </div>
      <div.tool-actions>
        ${H(()=>t.formats,()=>h`<${J} ...${{get options(){return t.formats.map(e=>({label:e.label,value:e.id}))},get value(){return r.value},onchange:i(e=>r.value=e,"onchange")}} />`)}
        ${H(()=>!c.value,()=>h`<btn-push icon=${()=>u.value?"loading":"run"} label=${()=>u.value?"Running …":t.action} disabled=${()=>u.value||!l.value} onclick=${x(g)} />`)}
        <label.toggle>
          <input type="checkbox" checked=${()=>c.value} onchange=${x(e=>c.value=e.currentTarget.checked)} />
          <span>Live</span>
        </label>
      </div>
    </main>
  `}i(K,"$$WorkbenchViewRatHtml");export{Q as default};
