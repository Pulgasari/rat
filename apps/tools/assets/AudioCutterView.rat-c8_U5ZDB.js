var C=Object.defineProperty;var t=(s,$)=>C(s,"name",{value:$,configurable:!0});import{H as i,w as p,h as v}from"./index-BqtsWe95.js";import{V as U,l as d}from"./app.rat-DP92pCm3.js";import{f as w,W as D,p as M,d as V}from"./Waveform.rat-h2V3HC2v.js";import{d as j}from"./files-flpFxvji.js";import{r as A}from"./ffmpeg-D26eV_6e.js";import{D as O}from"./Dropzone.rat-Dd6x3hmL.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"https://esm.sh/@ffmpeg/ffmpeg@0.12.10";import"https://esm.sh/@ffmpeg/util@0.12.1";function Q(s,$){return T.call({props:s},s,$)}t(Q,"AudioCutterViewRatHtml");function T(s,$){let o=i(null),f=i(null),c=i(0),u=i(0),n=i(0),b=i(0),m=i(!1),a=i("idle"),r=i(null),h=i(""),g=null,x=null;async function F(e){y(),R(),o.value=e[0],a.value="loading";try{const l=await V(o.value);g=l.buffer,f.value=l.peaks,c.value=g.duration,n.value=g.duration,a.value="idle"}catch(l){a.value="error",h.value=l.message}}t(F,"use");function R(){r.value&&URL.revokeObjectURL(r.value.url),o.value=null,f.value=null,r.value=null,b.value=0,u.value=0,a.value="idle"}t(R,"reset");const y=t(()=>x?.stop(),"stop");function H(){if(m.value)return y();m.value=!0,x=M(g,u.value,n.value,{onend:t(()=>{m.value=!1,b.value=0,x=null},"onend"),onposition:t(e=>b.value=e,"onposition")})}t(H,"toggle");function k(e,l){e==="start"?u.value=Math.max(0,Math.min(l,n.value-.1)):n.value=Math.min(c.value,Math.max(l,u.value+.1))}t(k,"move");async function L(){const e=o.value.name.split(".").pop().toLowerCase();a.value="cutting";try{const[l]=await A(o.value,`in.${e}`,["-i",`in.${e}`,"-ss",u.value.toFixed(3),"-to",n.value.toFixed(3),"-c","copy",`out.${e}`],[`out.${e}`]);r.value&&URL.revokeObjectURL(r.value.url),r.value={name:o.value.name.replace(/\.([^.]+)$/,"_cut.$1"),url:URL.createObjectURL(new Blob([l.buffer],{type:o.value.type}))},a.value="done"}catch(l){a.value="error",h.value=l.message}}return t(L,"cut"),v`
    <${U} back="/" title="Audio Cutter" />
    <main.tool>
      <div.tool-body>
        ${p(()=>!o.value,()=>v`<${O} accept="audio/*" what="an audio file" ...${{onfiles:F}} />`,()=>v`
            <div.file-bar>
              <svg-icon icon="audio" />
              <span.fname>${()=>o.value.name}</span>
              <span.dur>${()=>w(c.value)}</span>
              <btn-icon icon="close" label="Remove" onclick=${d(()=>{y(),R()})} />
            </div>
            ${p(()=>a.value==="loading",()=>v`<div.info-row><svg-icon icon="loading" /> Decoding …</div>`)}
            ${p(()=>f.value,()=>v`
                <${D} ...${{get peaks(){return f.value},get duration(){return c.value},get start(){return u.value},get end(){return n.value},get position(){return b.value},onchange:k}} />
                <div.time-row>
                  <div.time-field>
                    <label>Start</label>
                    <input type="number" min="0" step="0.1" max=${()=>(n.value-.1).toFixed(1)} value=${()=>u.value.toFixed(1)} oninput=${d(e=>k("start",Number(e.currentTarget.value)))} />
                    <span.time-fmt>${()=>w(u.value)}</span>
                  </div>
                  <div.sel-dur><svg-icon icon="cut" />${()=>w(n.value-u.value)}</div>
                  <div.time-field>
                    <label>End</label>
                    <input type="number" step="0.1" min=${()=>(u.value+.1).toFixed(1)} max=${()=>c.value.toFixed(1)} value=${()=>n.value.toFixed(1)} oninput=${d(e=>k("end",Number(e.currentTarget.value)))} />
                    <span.time-fmt>${()=>w(n.value)}</span>
                  </div>
                </div>
                <div.tool-actions>
                  <btn-icon icon=${()=>m.value?"pause":"play"} label=${()=>m.value?"Pause":"Preview"} onclick=${d(H)} />
                  <btn-push icon=${()=>a.value==="cutting"?"loading":"cut"} label=${()=>a.value==="cutting"?"Cutting …":"Cut & export"} disabled=${()=>a.value==="cutting"} onclick=${d(L)} />
                  ${p(()=>a.value==="done"&&r.value,()=>v`<btn-push icon="download" label="Download" onclick=${d(()=>j(r.value.url,r.value.name))} />`)}
                </div>
              `)}
            ${p(()=>a.value==="error",()=>v`<div.err-block><svg-icon icon="warning" /> ${()=>h.value}</div>`)}
          `)}
      </div>
    </main>
  `}t(T,"$$AudioCutterViewRatHtml");export{Q as default};
