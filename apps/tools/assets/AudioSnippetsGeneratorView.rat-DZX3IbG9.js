var W=Object.defineProperty;var i=(v,p)=>W(v,"name",{value:p,configurable:!0});import{K as f,M as j,N as z,w as V,i as w,g as K}from"./index-B2ljDWdg.js";import{V as O,l as d}from"./app.rat-BRBbls4Z.js";import{d as q,W as C,f as k,p as J}from"./Waveform.rat-DK1kELmh.js";import{d as B}from"./files-flpFxvji.js";import{e as L}from"./ffmpeg-D26eV_6e.js";import{D as Q}from"./Dropzone.rat-k3fCDbkf.js";import{S as U}from"./Segments.rat-CtajkjFr.js";import{fetchFile as X}from"https://esm.sh/@ffmpeg/util@0.12.1";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";import"https://esm.sh/@ffmpeg/ffmpeg@0.12.10";function me(v,p){return Y.call({props:v},v,p)}i(me,"AudioSnippetsGeneratorViewRatHtml");function Y(v,p){const N=["mp3","wav","ogg","flac","m4a"],S={flac:"audio/flac",m4a:"audio/mp4",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav"};let o=f([]),h=j("format","mp3"),r=f(null),b=f({id:null,time:0}),c=f(!1),m=f("");const x=new Map;let P=0,$=null;const _=z(()=>o.value.reduce((e,a)=>e+a.end-a.start,0)),H=i((e,a,t)=>Math.max(a,Math.min(t,e)),"clamp"),M=i((e,a)=>{o.value=o.value.map(t=>t.id===e?{...t,...a}:t)},"update");async function D(e){for(const a of e)try{const{buffer:t,peaks:l}=await q(a,400),u=P++;x.set(u,t),o.value=[...o.value,{duration:t.duration,end:t.duration,file:a,id:u,peaks:l,start:0}]}catch(t){m.value=`${a.name}: ${t.message}`}}i(D,"add");function G(e){r.value===e&&s(),x.delete(e),o.value=o.value.filter(a=>a.id!==e)}i(G,"remove");function R(e,a){const t=[...o.value],l=t.findIndex(n=>n.id===e),u=l+a;u<0||u>=t.length||([t[l],t[u]]=[t[u],t[l]],o.value=t)}i(R,"move");function y(e,a,t){a==="start"?M(e.id,{start:H(t,0,e.end-.1)}):M(e.id,{end:H(t,e.start+.1,e.duration)})}i(y,"setBound");function s(){const e=$;$=null,r.value=null,b.value={id:null,time:0},e?.stop()}i(s,"stop");function A(e,a){$=J(x.get(e.id),e.start,e.end,{onend:i(()=>{$&&($=null,a?a():s())},"onend"),onposition:i(t=>b.value={id:e.id,time:t},"onposition")})}i(A,"hear");function I(e){const a=r.value;s(),a!==e.id&&(r.value=e.id,A(e))}i(I,"toggle");function E(e=0){e===0&&(s(),r.value="all");const a=o.value[e];if(!a||r.value!=="all")return s();A(a,()=>E(e+1))}i(E,"playAll");async function T(e){c.value=!0,m.value="";const a=h.value,t=o.value;try{await L(async l=>{const u=[];for(const n of t){const F=`in_${n.id}.${n.file.name.split(".").pop()}`,g=`slice_${n.id}.${a}`;await l.writeFile(F,await X(n.file)),await l.exec(["-i",F,"-ss",n.start.toFixed(3),"-to",n.end.toFixed(3),g]),await l.deleteFile(F),e?u.push(g):(B(new Blob([(await l.readFile(g)).buffer],{type:S[a]}),`${n.file.name.replace(/\.[^.]+$/,"")}_snippet.${a}`),await l.deleteFile(g))}if(e){await l.writeFile("list.txt",u.map(n=>`file '${n}'`).join(`
`)),await l.exec(["-f","concat","-safe","0","-i","list.txt","-c","copy",`combined.${a}`]),B(new Blob([(await l.readFile(`combined.${a}`)).buffer],{type:S[a]}),`combined.${a}`);for(const n of[...u,"list.txt",`combined.${a}`])await l.deleteFile(n)}})}catch(l){m.value=l.message}finally{c.value=!1}}return i(T,"exportAs"),w`
    <${O} back="/" title="Audio Snippets" />
    <main.tool>
      <div.tool-body>
        <${Q} accept="audio/*" multiple what="audio files" ...${{onfiles:D}} />
        ${V(()=>o.value.length,()=>w`
            <div.snippets>
              ${K(()=>o.value,e=>e,(e,a)=>w`
                  <div.snippet-pane>
                    <div.pane-header>
                      <svg-icon icon="audio" />
                      <span.pane-title>${()=>e.file.name}</span>
                      <span.sel-dur>${()=>k(e.end-e.start)}</span>
                      <div.pane-controls>
                        <btn-icon icon="chevron-up" label="up" disabled=${()=>a===0} onclick=${d(()=>R(e.id,-1))} />
                        <btn-icon icon="chevron-down" label="down" disabled=${()=>a===o.value.length-1} onclick=${d(()=>R(e.id,1))} />
                        <btn-icon icon="close" label="remove" onclick=${d(()=>G(e.id))} />
                      </div>
                    </div>
                    <${C} ...${{get peaks(){return e.peaks},get duration(){return e.duration},get start(){return e.start},get end(){return e.end},get position(){return b.value.id===e.id?b.value.time:0},onchange:i((t,l)=>y(e,t,l),"onchange")}} />
                    <div.pane-footer>
                      <btn-icon icon=${()=>r.value===e.id?"pause":"play"} label=${()=>r.value===e.id?"Pause":"Play selection"} onclick=${d(()=>I(e))} />
                      <div.time-row>
                        <label>Start</label>
                        <input.field.time-input type="number" step="0.1" min="0" max=${()=>(e.end-.1).toFixed(1)} value=${()=>e.start.toFixed(1)} oninput=${d(t=>y(e,"start",Number(t.currentTarget.value)))} />
                        <svg-icon icon="arrow-right" />
                        <label>End</label>
                        <input.field.time-input type="number" step="0.1" min=${()=>(e.start+.1).toFixed(1)} max=${()=>e.duration.toFixed(1)} value=${()=>e.end.toFixed(1)} oninput=${d(t=>y(e,"end",Number(t.currentTarget.value)))} />
                        <span.total-dur>/ ${()=>k(e.duration)}</span>
                      </div>
                    </div>
                  </div>
                `)}
            </div>
            <div.preview-bar>
              <btn-push icon=${()=>r.value==="all"?"stop":"play"} label=${()=>r.value==="all"?"Stop preview":"Preview all"} onclick=${d(()=>r.value==="all"?s():E())} />
              <span.preview-info>${()=>o.value.length} snippet${()=>o.value.length===1?"":"s"} · ${()=>k(_.value)} total</span>
            </div>
            <div.export-bar>
              <${U} ...${{get options(){return N},get value(){return h.value},onchange:i(e=>h.value=e,"onchange")}} />
              <div.tool-actions>
                <btn-push icon=${()=>c.value?"loading":"download"} label=${()=>c.value?"Exporting …":"Export combined"} disabled=${()=>c.value} onclick=${d(()=>T(!0))} />
                <btn-push icon="download" label="Export individually" disabled=${()=>c.value} onclick=${d(()=>T(!1))} />
              </div>
            </div>
          `)}
        ${V(()=>m.value,()=>w`<div.err-block><svg-icon icon="warning" /> ${()=>m.value}</div>`)}
      </div>
    </main>
  `}i(Y,"$$AudioSnippetsGeneratorViewRatHtml");export{me as default};
