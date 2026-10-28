var $=Object.defineProperty;var e=(t,r)=>$(t,"name",{value:r,configurable:!0});import{J as s,H as m,h as b}from"./index-BqtsWe95.js";import{V as h,l as p}from"./app.rat-DP92pCm3.js";import{C as g}from"./CodeInput.rat-DRE9roXN.js";import{C as H}from"./CodeOutput.rat-DY3AJlaQ.js";import{S as J}from"./Segments.rat-COspD1-8.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"./files-flpFxvji.js";function x(t,r){return S.call({props:t},t,r)}e(x,"JsonFormatterViewRatHtml");function S(t,r){let a=s("input",""),i=s("indent",2),l=m(""),n=m("");const c=[{label:"2 spaces",value:2},{label:"4 spaces",value:4},{label:"tab",value:"	"}];function u(){const o=a.value.trim();if(o)try{l.value=JSON.stringify(JSON.parse(o),null,i.value),n.value=""}catch(f){l.value="",n.value=f.message}}e(u,"format");function v(o){i.value=o,l.value&&u()}e(v,"indent");function d(){a.value="",l.value="",n.value=""}return e(d,"clear"),b`
    <${h} back="/" title="JSON Formatter" />
    <main.tool.workbench>
      <div.panes>
        <${g} ...${{value:a}} placeholder="Paste JSON here …" filename="input.json" />
        <${H} ...${{get value(){return l.value},get error(){return n.value}}} filename="formatted.json" placeholder="Formatted JSON appears here …" />
      </div>
      <div.tool-actions>
        <btn-push icon="format" label="Format" disabled=${()=>!a.value} onclick=${p(u)} />
        <div.indent-picker>
          <span.indent-label>Indent</span>
          <${J} ...${{get options(){return c},get value(){return i.value},onchange:v}} />
        </div>
        <btn-push icon="close" label="Clear" disabled=${()=>!a.value} onclick=${p(d)} />
      </div>
    </main>
  `}e(S,"$$JsonFormatterViewRatHtml");export{x as default};
