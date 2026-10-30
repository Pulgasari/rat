var H=Object.defineProperty;var t=(s,$)=>H(s,"name",{value:$,configurable:!0});import{K as n,w as p,i as v}from"./index-B2ljDWdg.js";import{V as U,l as d}from"./app.rat-BRBbls4Z.js";import{f as w,W as D,p as M,d as V}from"./Waveform.rat-DK1kELmh.js";import{d as j}from"./files-flpFxvji.js";import{r as A}from"./ffmpeg-D26eV_6e.js";import{D as O}from"./Dropzone.rat-k3fCDbkf.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"https://esm.sh/@ffmpeg/ffmpeg@0.12.10";import"https://esm.sh/@ffmpeg/util@0.12.1";function Q(s,$){return T.call({props:s},s,$)}t(Q,"AudioCutterViewRatHtml");function T(s,$){let o=n(null),f=n(null),c=n(0),u=n(0),i=n(0),b=n(0),m=n(!1),a=n("idle"),r=n(null),x=n(""),g=null,y=null;async function F(e){h(),R(),o.value=e[0],a.value="loading";try{const l=await V(o.value);g=l.buffer,f.value=l.peaks,c.value=g.duration,i.value=g.duration,a.value="idle"}catch(l){a.value="error",x.value=l.message}}t(F,"use");function R(){r.value&&URL.revokeObjectURL(r.value.url),o.value=null,f.value=null,r.value=null,b.value=0,u.value=0,a.value="idle"}t(R,"reset");const h=t(()=>y?.stop(),"stop");function L(){if(m.value)return h();m.value=!0,y=M(g,u.value,i.value,{onend:t(()=>{m.value=!1,b.value=0,y=null},"onend"),onposition:t(e=>b.value=e,"onposition")})}t(L,"toggle");function k(e,l){e==="start"?u.value=Math.max(0,Math.min(l,i.value-.1)):i.value=Math.min(c.value,Math.max(l,u.value+.1))}t(k,"move");async function C(){const e=o.value.name.split(".").pop().toLowerCase();a.value="cutting";try{const[l]=await A(o.value,`in.${e}`,["-i",`in.${e}`,"-ss",u.value.toFixed(3),"-to",i.value.toFixed(3),"-c","copy",`out.${e}`],[`out.${e}`]);r.value&&URL.revokeObjectURL(r.value.url),r.value={name:o.value.name.replace(/\.([^.]+)$/,"_cut.$1"),url:URL.createObjectURL(new Blob([l.buffer],{type:o.value.type}))},a.value="done"}catch(l){a.value="error",x.value=l.message}}return t(C,"cut"),v`
    <${U} back="/" title="Audio Cutter" />
    <main.tool>
      <div.tool-body>
        ${p(()=>!o.value,()=>v`<${O} accept="audio/*" what="an audio file" ...${{onfiles:F}} />`,()=>v`
            <div.file-bar>
              <svg-icon icon="audio" />
              <span.fname>${()=>o.value.name}</span>
              <span.dur>${()=>w(c.value)}</span>
              <btn-icon icon="close" label="Remove" onclick=${d(()=>{h(),R()})} />
            </div>
            ${p(()=>a.value==="loading",()=>v`<div.info-row><svg-icon icon="loading" /> Decoding …</div>`)}
            ${p(()=>f.value,()=>v`
                <${D} ...${{get peaks(){return f.value},get duration(){return c.value},get start(){return u.value},get end(){return i.value},get position(){return b.value},onchange:k}} />
                <div.time-row>
                  <div.time-field>
                    <label>Start</label>
                    <input type="number" min="0" step="0.1" max=${()=>(i.value-.1).toFixed(1)} value=${()=>u.value.toFixed(1)} oninput=${d(e=>k("start",Number(e.currentTarget.value)))} />
                    <span.time-fmt>${()=>w(u.value)}</span>
                  </div>
                  <div.sel-dur><svg-icon icon="cut" />${()=>w(i.value-u.value)}</div>
                  <div.time-field>
                    <label>End</label>
                    <input type="number" step="0.1" min=${()=>(u.value+.1).toFixed(1)} max=${()=>c.value.toFixed(1)} value=${()=>i.value.toFixed(1)} oninput=${d(e=>k("end",Number(e.currentTarget.value)))} />
                    <span.time-fmt>${()=>w(i.value)}</span>
                  </div>
                </div>
                <div.tool-actions>
                  <btn-icon icon=${()=>m.value?"pause":"play"} label=${()=>m.value?"Pause":"Preview"} onclick=${d(L)} />
                  <btn-push icon=${()=>a.value==="cutting"?"loading":"cut"} label=${()=>a.value==="cutting"?"Cutting …":"Cut & export"} disabled=${()=>a.value==="cutting"} onclick=${d(C)} />
                  ${p(()=>a.value==="done"&&r.value,()=>v`<btn-push icon="download" label="Download" onclick=${d(()=>j(r.value.url,r.value.name))} />`)}
                </div>
              `)}
            ${p(()=>a.value==="error",()=>v`<div.err-block><svg-icon icon="warning" /> ${()=>x.value}</div>`)}
          `)}
      </div>
    </main>
  `}t(T,"$$AudioCutterViewRatHtml");export{Q as default};
