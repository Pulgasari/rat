var D=Object.defineProperty;var o=(d,$)=>D(d,"name",{value:$,configurable:!0});import{M as w,K as f,w as b,i,g as x}from"./index-D7eNq_FT.js";import{V as S,l as u}from"./app.rat-CUWfUmji.js";import{d as R}from"./files-flpFxvji.js";import{D as V}from"./Dropzone.rat-D4WLVzJs.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function Z(d,$){return B.call({props:d},d,$)}o(Z,"IconGeneratorViewRatHtml");function B(d,$){const L=[16,32,64,96,128,180,192,256,512,1024];let t=w("sizes",[192,512]),p=w("padding",0),r=w("bg",""),l=f(null),n=f([]),g=f(!1),c=f("");const m=o(e=>`icon-${e}.png`,"nameOf");async function U(e){const a=e.at(-1);if(c.value="",!/svg/i.test(a.type)&&!/\.svg$/i.test(a.name)){c.value=`${a.name} is not an svg`;return}l.value&&URL.revokeObjectURL(l.value.url),l.value={name:a.name.replace(/\.svg$/i,""),url:URL.createObjectURL(new Blob([await a.text()],{type:"image/svg+xml"}))},n.value=[]}o(U,"use");async function I(e,a){const s=Object.assign(document.createElement("canvas"),{height:a,width:a}),v=s.getContext("2d");v.imageSmoothingQuality="high",r.value&&(v.fillStyle=r.value,v.fillRect(0,0,a,a));const y=a-Math.round(a*p.value/100)*2,h=Math.min(y/e.width,y/e.height);v.drawImage(e,(a-e.width*h)/2,(a-e.height*h)/2,e.width*h,e.height*h);const k=await new Promise(M=>s.toBlob(M,"image/png"));if(!k)throw new Error(`could not render ${a}px`);return{size:a,url:URL.createObjectURL(k)}}o(I,"render");async function O(){if(!(!l.value||!t.value.length)){g.value=!0,c.value="";for(const e of n.value)URL.revokeObjectURL(e.url);n.value=[];try{const e=new Image;e.src=l.value.url,await e.decode();for(const a of[...t.value].sort((s,v)=>s-v))n.value=[...n.value,await I(e,a)]}catch(e){c.value=e.message}finally{g.value=!1}}}o(O,"generate");function j(){for(const e of n.value)R(e.url,m(e.size));R(l.value.url,"icon.svg")}o(j,"downloadAll");const H=o(e=>{t.value=t.value.includes(e)?t.value.filter(a=>a!==e):[...t.value,e].sort((a,s)=>a-s)},"toggle");return i`
    <${S} back="/" title="Icon Generator" />
    <main.tool>
      <div.tool-body>
        <${V} accept="image/svg+xml,.svg" what="an app.svg" ...${{onfiles:U}} />
        ${b(()=>c.value,()=>i`<div.err-block><svg-icon icon="warning" /> ${()=>c.value}</div>`)}
        ${b(()=>l.value,()=>i`
            <div.source>
              <img.source-preview src=${()=>l.value.url} alt=${()=>l.value.name} />
              <span.source-name>${()=>l.value.name}.svg</span>
            </div>
            <div.size-picker>
              ${x(()=>L,e=>e,e=>i`<button.chip class:active=${()=>t.value.includes(e)} onclick=${u(()=>H(e))}>${()=>e}</button>`)}
            </div>
            <div.options>
              <label.option>
                <span>Padding</span>
                <input type="range" min="0" max="25" value=${()=>p.value} oninput=${u(e=>p.value=Number(e.currentTarget.value))} />
                <span.option-value>${()=>p.value}%</span>
              </label>
              <label.option>
                <span>Background</span>
                <input type="color" value=${()=>r.value||"#282a36"} oninput=${u(e=>r.value=e.currentTarget.value)} />
                <button.chip disabled=${()=>!r.value} onclick=${u(()=>r.value="")}>transparent</button>
              </label>
            </div>
            <div.tool-actions>
              <btn-push icon=${()=>g.value?"loading":"run"} label=${()=>g.value?"Rendering …":`Render ${t.value.length} size${t.value.length===1?"":"s"}`} disabled=${()=>g.value||!t.value.length} onclick=${u(O)} />
              ${b(()=>n.value.length,()=>i`<btn-push icon="download" label="Download all" onclick=${u(j)} />`)}
            </div>
            ${b(()=>n.value.length,()=>i`
                <div.results>
                  ${x(()=>n.value,e=>e,e=>i`
                      <figure.result>
                        <img src=${()=>e.url} alt=${()=>m(e.size)} width=${()=>Math.min(e.size,128)} height=${()=>Math.min(e.size,128)} />
                        <figcaption>
                          <span>${()=>m(e.size)}</span>
                          <btn-icon icon="download" label="Download" onclick=${u(()=>R(e.url,m(e.size)))} />
                        </figcaption>
                      </figure>
                    `)}
                </div>
              `)}
          `)}
      </div>
    </main>
  `}o(B,"$$IconGeneratorViewRatHtml");export{Z as default};
