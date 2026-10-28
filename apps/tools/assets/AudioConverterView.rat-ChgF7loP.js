var D=Object.defineProperty;var t=(s,u)=>D(s,"name",{value:u,configurable:!0});import{H as f,J as L,K as g,w as n,h as i,f as O}from"./index-BqtsWe95.js";import{V as S,l as c}from"./app.rat-DP92pCm3.js";import{d as b}from"./files-flpFxvji.js";import{r as U}from"./ffmpeg-D26eV_6e.js";import{D as V}from"./Dropzone.rat-Dd6x3hmL.js";import{S as M}from"./Segments.rat-COspD1-8.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"https://esm.sh/@ffmpeg/ffmpeg@0.12.10";import"https://esm.sh/@ffmpeg/util@0.12.1";function W(s,u){return j.call({props:s},s,u)}t(W,"AudioConverterViewRatHtml");function j(s,u){const w=["flac","m4a","mp3","ogg","wav"],h={flac:"audio/flac",m4a:"audio/mp4",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav"},R={converting:"loading",done:"check-circle",error:"warning",pending:"audio"};let e=f([]),v=L("format","mp3"),r=f(!1),k=0;const m=g(()=>e.value.filter(o=>o.status==="pending").length),$=g(()=>e.value.filter(o=>o.status==="done")),d=t((o,a)=>{e.value=e.value.map(l=>l.id===o?{...l,...a}:l)},"update"),H=t(o=>{e.value=[...e.value,...o.map(a=>({file:a,id:k++,progress:0,status:"pending"}))]},"add");function C(o){o.url&&URL.revokeObjectURL(o.url),e.value=e.value.filter(a=>a.id!==o.id)}t(C,"remove");async function A(){r.value=!0;for(const o of e.value.filter(a=>a.status==="pending")){const a=v.value,l=`in.${o.file.name.split(".").pop()||"bin"}`;d(o.id,{progress:0,status:"converting"});try{const[p]=await U(o.file,l,["-i",l,`out.${a}`],[`out.${a}`],N=>d(o.id,{progress:N}));d(o.id,{outName:`${o.file.name.replace(/\.[^.]+$/,"")}.${a}`,progress:100,status:"done",url:URL.createObjectURL(new Blob([p.buffer],{type:h[a]}))})}catch(p){d(o.id,{error:p.message,status:"error"})}}r.value=!1}return t(A,"convertAll"),i`
    <${S} back="/" title="Audio Converter" />
    <main.tool>
      <div.tool-body>
        <${V} accept="audio/*" multiple what="audio files" ...${{onfiles:H}} />
        ${n(()=>e.value.length,()=>i`
            <${M} ...${{get options(){return w},get value(){return v.value},onchange:t(o=>v.value=o,"onchange")}} />
            <div.file-list>
              ${O(()=>e.value,o=>o,o=>i`
                  <div.file-item class=${()=>o.status}>
                    <svg-icon icon=${()=>R[o.status]} />
                    <span.name>${()=>o.file.name}</span>
                    <span.label>${()=>o.status==="pending"?"—":o.status==="converting"?`${o.progress}%`:o.status==="done"?o.outName:o.error}</span>
                    ${n(()=>o.status==="converting",()=>i`<div.progress-bar><div style=${()=>`width: ${o.progress}%`} /></div>`)}
                    ${n(()=>o.status==="done",()=>i`<btn-icon icon="download" label="Download" onclick=${c(()=>b(o.url,o.outName))} />`)}
                    ${n(()=>o.status!=="converting",()=>i`<btn-icon icon="close" label="Remove" onclick=${c(()=>C(o))} />`)}
                  </div>
                `)}
            </div>
            <div.tool-actions>
              ${n(()=>m.value,()=>i`<btn-push icon=${()=>r.value?"loading":"run"} label=${()=>r.value?"Converting …":`Convert ${m.value} file${m.value===1?"":"s"}`} disabled=${()=>r.value} onclick=${c(A)} />`)}
              ${n(()=>$.value.length,()=>i`<btn-push icon="download" label="Download all" onclick=${c(()=>$.value.forEach(o=>b(o.url,o.outName)))} />`)}
            </div>
          `)}
      </div>
    </main>
  `}t(j,"$$AudioConverterViewRatHtml");export{W as default};
