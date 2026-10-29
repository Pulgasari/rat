var L=Object.defineProperty;var o=(e,r)=>L(e,"name",{value:r,configurable:!0});import{a3 as W,K as B,O as D,R as H,w as T,i as A}from"./index-CtR854MK.js";import{l as k}from"./app.rat-B-tEyFdk.js";let X=null;const z=o(()=>X??=new AudioContext,"audioContext");async function j(e,r=600){const f=await z().decodeAudioData(await e.arrayBuffer()),u=f.getChannelData(0),h=Math.max(1,Math.floor(u.length/r)),i=new Float32Array(r);for(let a=0;a<r;a++){let t=0;for(let n=a*h,c=n+h;n<c;n++){const l=Math.abs(u[n]??0);l>t&&(t=l)}i[a]=t}return{buffer:f,peaks:i}}o(j,"decode");function G(e,r,f,{onend:u,onposition:h}={}){const i=z(),a=i.createBufferSource(),t=i.currentTime;i.state==="suspended"&&i.resume(),a.buffer=e,a.connect(i.destination),a.start(0,r,f-r);let n=0,c=!1;const l=o(()=>{h?.(Math.min(f,r+i.currentTime-t)),n=requestAnimationFrame(l)},"tick");n=requestAnimationFrame(l);const s=o(()=>{if(!c){c=!0,cancelAnimationFrame(n);try{a.stop()}catch{}u?.()}},"stop");return a.onended=s,{stop:s}}o(G,"play");const M=o(e=>`${Math.floor(e/60)}:${(e%60).toFixed(1).padStart(4,"0")}`,"formatTime"),q=`@scope (:has(> [data-rat="1pbho1g"])) to (:scope > :not([data-rat="1pbho1g"])) {
  .waveform-wrap   { border-radius: 0.4rem; position: relative; touch-action: none; user-select: none; }
  .waveform-canvas { block-size: 100%; display: block; inline-size: 100%; }
  
  .handle {
    background  : var(--color-ink);
    cursor      : ew-resize;
    inset-block : 0;
    inline-size : 3px;
    position    : absolute;
    transform   : translateX(-50%);
  
    &::before { content: ''; inset: 0 -0.6rem; position: absolute; }   /* a wider grip */
  }
  
  .handle-label {
    background    : var(--color-ink);
    border-radius : 0.25rem;
    color         : var(--color-bg);
    font-size     : 0.7rem;
    left          : 50%;
    padding       : 0.05rem 0.3rem;
    position      : absolute;
    top           : 100%;
    transform     : translateX(-50%);
    white-space   : nowrap;
  }
}`;function I(e,r){return P.call({props:e},e,r)}o(I,"WaveformRatHtml");function P(e,r){W("1pbho1g",q);let f=B(null);const u=o(t=>`${(t/e.duration*100).toFixed(3)}%`,"percent");function h(t,[n,c,l,s,w,R]){const m=t.width=t.offsetWidth,v=t.height=t.offsetHeight;if(!m||!v||!n)return;const d=t.getContext("2d"),$=getComputedStyle(t),C=$.getPropertyValue("--color-ink").trim()||"#3498db",x=$.getPropertyValue("--color-fg").trim()||"#fff",F=c/s*m,S=l/s*m,E=Math.max(1.5,m/n.length-.5);for(let g=0;g<n.length;g++){const b=g/n.length*m,p=b>=F&&b<=S,y=n[g]*v*.85;d.fillStyle=p?C:x,d.globalAlpha=p?.85:.15,d.fillRect(b,(v-y)/2,E,y)}d.fillStyle=x,d.globalAlpha=.5;for(const g of R??[])d.fillRect(g/s*m,0,1,v);d.globalAlpha=.85,w>0&&d.fillRect(w/s*m-1,0,2,v),d.globalAlpha=1}o(h,"paint");const i=o(t=>{const n=f.value.getBoundingClientRect();return Math.max(0,Math.min(e.duration,(t-n.left)/n.width*e.duration))},"timeAt");function a(t,n){t.preventDefault();const c=o(s=>e.onchange(n,i(s.clientX)),"move"),l=o(()=>{removeEventListener("pointermove",c),removeEventListener("pointerup",l)},"up");addEventListener("pointermove",c),addEventListener("pointerup",l)}return o(a,"drag"),A`
    <div.waveform-wrap data-rat="1pbho1g" ref=${D(f)}>
      <canvas.waveform-canvas ref=${H(h,()=>[e.peaks,e.start??0,e.end??e.duration,e.duration,e.position??0,e.marks])} />
      ${T(()=>e.onchange,()=>A`
          <div.handle.handle-s style=${()=>`left: ${u(e.start)}`} onpointerdown=${k(t=>a(t,"start"))}><div.handle-label>${()=>M(e.start)}</div></div>
          <div.handle.handle-e style=${()=>`left: ${u(e.end)}`} onpointerdown=${k(t=>a(t,"end"))}><div.handle-label>${()=>M(e.end)}</div></div>
        `)}
    </div>
  `}o(P,"$$WaveformRatHtml");export{I as W,j as d,M as f,G as p};
