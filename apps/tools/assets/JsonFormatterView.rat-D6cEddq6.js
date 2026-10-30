var $=Object.defineProperty;var e=(t,r)=>$(t,"name",{value:r,configurable:!0});import{M as s,K as m,i as b}from"./index-CsWBSA1m.js";import{V as h,l as p}from"./app.rat-C6L9lY-_.js";import{C as g}from"./CodeInput.rat-D62nM1dk.js";import{C as S}from"./CodeOutput.rat-Dn17S-R7.js";import{S as H}from"./Segments.rat-Dgj71kz-.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"./files-flpFxvji.js";function x(t,r){return J.call({props:t},t,r)}e(x,"JsonFormatterViewRatHtml");function J(t,r){let a=s("input",""),i=s("indent",2),l=m(""),n=m("");const c=[{label:"2 spaces",value:2},{label:"4 spaces",value:4},{label:"tab",value:"	"}];function u(){const o=a.value.trim();if(o)try{l.value=JSON.stringify(JSON.parse(o),null,i.value),n.value=""}catch(f){l.value="",n.value=f.message}}e(u,"format");function v(o){i.value=o,l.value&&u()}e(v,"indent");function d(){a.value="",l.value="",n.value=""}return e(d,"clear"),b`
    <${h} back="/" title="JSON Formatter" />
    <main.tool.workbench>
      <div.panes>
        <${g} ...${{value:a}} lang="json" placeholder="Paste JSON here …" filename="input.json" />
        <${S} ...${{get value(){return l.value}}} lang="json" ...${{get error(){return n.value}}} filename="formatted.json" placeholder="Formatted JSON appears here …" />
      </div>
      <div.tool-actions>
        <btn-push icon="format" label="Format" disabled=${()=>!a.value} onclick=${p(u)} />
        <div.indent-picker>
          <span.indent-label>Indent</span>
          <${H} ...${{get options(){return c},get value(){return i.value},onchange:v}} />
        </div>
        <btn-push icon="close" label="Clear" disabled=${()=>!a.value} onclick=${p(d)} />
      </div>
    </main>
  `}e(J,"$$JsonFormatterViewRatHtml");export{x as default};
