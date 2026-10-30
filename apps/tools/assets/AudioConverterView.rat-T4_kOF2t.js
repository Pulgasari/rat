var D=Object.defineProperty;var t=(s,u)=>D(s,"name",{value:u,configurable:!0});import{K as f,M as L,N as g,w as n,i,g as M}from"./index-DvJcPkcp.js";import{V as O,l as c}from"./app.rat-KPqxmOcS.js";import{d as b}from"./files-flpFxvji.js";import{r as S}from"./ffmpeg-D26eV_6e.js";import{D as U}from"./Dropzone.rat-DeF5cxDR.js";import{S as V}from"./Segments.rat-DkWivJr0.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"https://esm.sh/@ffmpeg/ffmpeg@0.12.10";import"https://esm.sh/@ffmpeg/util@0.12.1";function W(s,u){return j.call({props:s},s,u)}t(W,"AudioConverterViewRatHtml");function j(s,u){const w=["flac","m4a","mp3","ogg","wav"],h={flac:"audio/flac",m4a:"audio/mp4",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav"},R={converting:"loading",done:"check-circle",error:"warning",pending:"audio"};let e=f([]),v=L("format","mp3"),r=f(!1),k=0;const m=g(()=>e.value.filter(o=>o.status==="pending").length),$=g(()=>e.value.filter(o=>o.status==="done")),d=t((o,a)=>{e.value=e.value.map(l=>l.id===o?{...l,...a}:l)},"update"),C=t(o=>{e.value=[...e.value,...o.map(a=>({file:a,id:k++,progress:0,status:"pending"}))]},"add");function H(o){o.url&&URL.revokeObjectURL(o.url),e.value=e.value.filter(a=>a.id!==o.id)}t(H,"remove");async function N(){r.value=!0;for(const o of e.value.filter(a=>a.status==="pending")){const a=v.value,l=`in.${o.file.name.split(".").pop()||"bin"}`;d(o.id,{progress:0,status:"converting"});try{const[p]=await S(o.file,l,["-i",l,`out.${a}`],[`out.${a}`],A=>d(o.id,{progress:A}));d(o.id,{outName:`${o.file.name.replace(/\.[^.]+$/,"")}.${a}`,progress:100,status:"done",url:URL.createObjectURL(new Blob([p.buffer],{type:h[a]}))})}catch(p){d(o.id,{error:p.message,status:"error"})}}r.value=!1}return t(N,"convertAll"),i`
    <${O} back="/" title="Audio Converter" />
    <main.tool>
      <div.tool-body>
        <${U} accept="audio/*" multiple what="audio files" ...${{onfiles:C}} />
        ${n(()=>e.value.length,()=>i`
            <${V} ...${{get options(){return w},get value(){return v.value},onchange:t(o=>v.value=o,"onchange")}} />
            <div.file-list>
              ${M(()=>e.value,o=>o,o=>i`
                  <div.file-item class=${()=>o.status}>
                    <svg-icon icon=${()=>R[o.status]} />
                    <span.name>${()=>o.file.name}</span>
                    <span.label>${()=>o.status==="pending"?"—":o.status==="converting"?`${o.progress}%`:o.status==="done"?o.outName:o.error}</span>
                    ${n(()=>o.status==="converting",()=>i`<div.progress-bar><div style=${()=>`width: ${o.progress}%`} /></div>`)}
                    ${n(()=>o.status==="done",()=>i`<btn-icon icon="download" label="Download" onclick=${c(()=>b(o.url,o.outName))} />`)}
                    ${n(()=>o.status!=="converting",()=>i`<btn-icon icon="close" label="Remove" onclick=${c(()=>H(o))} />`)}
                  </div>
                `)}
            </div>
            <div.tool-actions>
              ${n(()=>m.value,()=>i`<btn-push icon=${()=>r.value?"loading":"run"} label=${()=>r.value?"Converting …":`Convert ${m.value} file${m.value===1?"":"s"}`} disabled=${()=>r.value} onclick=${c(N)} />`)}
              ${n(()=>$.value.length,()=>i`<btn-push icon="download" label="Download all" onclick=${c(()=>$.value.forEach(o=>b(o.url,o.outName)))} />`)}
            </div>
          `)}
      </div>
    </main>
  `}t(j,"$$AudioConverterViewRatHtml");export{W as default};
