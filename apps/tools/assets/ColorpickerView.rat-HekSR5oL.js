var te=Object.defineProperty;var o=(x,M)=>te(x,"name",{value:M,configurable:!0});import{K as p,M as le,N as c,i as u,w as oe,g as z}from"./index-ChBsdUy-.js";import{c as R,i as ue,$ as re}from"./copied.rat-2FSmgknL.js";import{c as ne}from"./cases-Bvh222fY.js";import{V as ie,l as v}from"./app.rat-tYHGNQLI.js";import{modeHsl as ve,modeLab as ce,modeLch as $e,modeLrgb as se,modeOklab as de,modeOklch as he,modeRgb as pe,useMode as ge,converter as C,parse as w,formatHex as me,interpolate as be}from"https://esm.sh/culori@3.3.0";import{S as Z}from"./Segments.rat-Dq3OISMN.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function Fe(x,M){return fe.call({props:x},x,M)}o(Fe,"ColorpickerViewRatHtml");function fe(x,M){const D=ue(()=>re);for(const e of[ve,ce,$e,se,de,he,pe])ge(e);const T=C("rgb"),F=C("hsl"),O=C("lch"),g=C("oklch"),y=o(e=>{try{return e&&me(e)||"#000000"}catch{return"#000000"}},"toHex"),J=o((e,a,l)=>Math.max(a,Math.min(l,e)),"clamp"),ee=["RGB","HSL","LCH","OKLCH","Mix","Shades"],ae=["rgb","hsl","oklch","lch","lab","oklab"],B="linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)";let t=p(g(w("#3b82f6"))),A=le("tab","OKLCH"),$=p(y(t.value)),s=p("#ffffff"),H=p(50),S=p("oklch"),d=p(10),N=p("color");const k=c(()=>y(t.value)),r=c(()=>(({r:e=0,g:a=0,b:l=0})=>({b:Math.round(l*255),g:Math.round(a*255),r:Math.round(e*255)}))(T(t.value))),i=c(()=>(({h:e=0,s:a=0,l=0})=>({h:Math.round(e||0),l:Math.round(l*100),s:Math.round(a*100)}))(F(t.value))),V=c(()=>(({l:e=0,c:a=0,h:l=0})=>({c:+a.toFixed(2),h:Math.round(l||0),l:+e.toFixed(1)}))(O(t.value))),E=c(()=>(({l:e=0,c:a=0,h:l=0})=>({c:+a.toFixed(4),h:Math.round(l||0),l:+e.toFixed(4)}))(t.value));function Q(e){const{r:a=0,g:l=0,b:m=0}=T(e),h=F(e),b=O(e),f=g(e);return[["hex",y(e)],["rgb",`rgb(${Math.round(a*255)} ${Math.round(l*255)} ${Math.round(m*255)})`],["hsl",`hsl(${Math.round(h.h||0)} ${Math.round((h.s??0)*100)}% ${Math.round((h.l??0)*100)}%)`],["lch",`lch(${(b.l??0).toFixed(1)} ${(b.c??0).toFixed(2)} ${Math.round(b.h||0)})`],["oklch",`oklch(${((f.l??0)*100).toFixed(1)}% ${(f.c??0).toFixed(4)} ${Math.round(f.h||0)})`]]}o(Q,"notations");const G=o((e,a)=>{t.value=g({...T(t.value),[e]:a/255})},"setRgb"),K=o((e,a)=>{t.value=g({...F(t.value),[e]:e==="h"?a:a/100})},"setHsl"),P=o((e,a)=>{t.value=g({...O(t.value),[e]:a})},"setLch"),j=o((e,a)=>{t.value={...t.value,[e]:a,mode:"oklch"}},"setOklch");function W(e){const a=w(e);a&&(t.value=g(a))}o(W,"fromText");const I=c(()=>(()=>{const e=w($.value),a=w(s.value);if(!e||!a)return null;try{return be([e,a],S.value)(H.value/100)}catch{return null}})()),X=c(()=>Array.from({length:d.value},(e,a)=>y({...t.value,l:J(.96-a/(d.value-1)*.88,.05,.97),mode:"oklch"}))),U=c(()=>X.value.map((e,a)=>`--${N.value||"color"}-${(a+1)*Math.round(1e3/d.value)}: ${e};`).join(`
`));function n(e,a,l,m,h,b,f){return u`
      <div.slider-row>
        <span.slider-label>${()=>e}</span>
        <div.slider-track style=${()=>b?`--gradient: ${b}`:""}><input type="range" min=${()=>l} max=${()=>m} step=${()=>h} value=${()=>a} oninput=${v(q=>f(Number(q.currentTarget.value)))} /></div>
        <input.field.num-input type="number" min=${()=>l} max=${()=>m} step=${()=>h} value=${()=>a} style=${()=>`width: calc(${String(m).replace(".","").length+(h<1?4:2)}ch + 1rem)`} oninput=${v(q=>f(J(Number(q.currentTarget.value),l,m)))} />
      </div>
    `}o(n,"slider");function _(e,a){return u`
      <div.copy-row>
        <span.copy-label>${()=>e}</span>
        <code.copy-value>${()=>a}</code>
        <button.ghost-btn onclick=${v(()=>R(a))}><svg-icon icon=${()=>D.value===a?"check":"copy"} /></button>
      </div>
    `}o(_,"copyRow");function L(e){return u`
      <div.copy-rows>
        ${z(()=>Q(e),a=>a,a=>u`${()=>_(a[0],a[1])}`)}
      </div>
    `}o(L,"copyRows");function Y(e,a){return u`
      <div.mix-color>
        <div.swatch.swatch-lg style=${()=>`background: ${e}`} />
        <input.field.hex-input type="text" maxlength="7" value=${()=>e} oninput=${v(l=>{w(l.currentTarget.value)&&a(l.currentTarget.value)})} />
        <input.native-color type="color" value=${()=>e} oninput=${v(l=>a(l.currentTarget.value))} />
      </div>
    `}return o(Y,"colorInput"),u`
    <${ie} back="/" title="Colorpicker" />
    <main.tool>
      <div.tool-body>
        <div.color-header>
          <div.header-swatch style=${()=>`background: ${k.value}`} />
          <code.header-hex onclick=${v(()=>R(k.value))}>${()=>k.value}</code>
        </div>
        <${Z} ...${{get options(){return ee},get value(){return A.value},onchange:o(e=>A.value=e,"onchange")}} />
        <div.tab>
          <div.tab-content>
            ${ne(()=>A.value,["RGB","HSL","LCH","Mix","Shades"],[()=>u`
                  ${()=>n("R",r.value.r,0,255,1,`linear-gradient(to right, rgb(0 ${r.value.g} ${r.value.b}), rgb(255 ${r.value.g} ${r.value.b}))`,e=>G("r",e))}
                  ${()=>n("G",r.value.g,0,255,1,`linear-gradient(to right, rgb(${r.value.r} 0 ${r.value.b}), rgb(${r.value.r} 255 ${r.value.b}))`,e=>G("g",e))}
                  ${()=>n("B",r.value.b,0,255,1,`linear-gradient(to right, rgb(${r.value.r} ${r.value.g} 0), rgb(${r.value.r} ${r.value.g} 255))`,e=>G("b",e))}
                  <div.hex-row>
                    <span.slider-label>Hex</span>
                    <input.field.hex-input type="text" maxlength="7" value=${()=>k.value} oninput=${v(e=>W(e.currentTarget.value))} />
                    <input.native-color type="color" value=${()=>k.value} oninput=${v(e=>W(e.currentTarget.value))} />
                  </div>
                  ${()=>L(t.value)}
                `,()=>u`
                  ${()=>n("H",i.value.h,0,360,1,B,e=>K("h",e))}
                  ${()=>n("S",i.value.s,0,100,1,`linear-gradient(to right, hsl(${i.value.h} 0% ${i.value.l}%), hsl(${i.value.h} 100% ${i.value.l}%))`,e=>K("s",e))}
                  ${()=>n("L",i.value.l,0,100,1,`linear-gradient(to right, hsl(${i.value.h} ${i.value.s}% 0%), hsl(${i.value.h} ${i.value.s}% 50%), hsl(${i.value.h} ${i.value.s}% 100%))`,e=>K("l",e))}
                  ${()=>L(t.value)}
                `,()=>u`
                  ${()=>n("L",V.value.l,0,100,.1,"",e=>P("l",e))}
                  ${()=>n("C",V.value.c,0,150,.1,"",e=>P("c",e))}
                  ${()=>n("H",V.value.h,0,360,1,B,e=>P("h",e))}
                  ${()=>L(t.value)}
                `,()=>u`
                  <div.mix-row>
                    ${()=>Y($.value,e=>$.value=e)}
                    <button.swap-btn title="Swap" onclick=${v(()=>{const e=$.value;$.value=s.value,s.value=e})}><svg-icon icon="swap" /></button>
                    ${()=>Y(s.value,e=>s.value=e)}
                  </div>
                  ${()=>n("Mix",H.value,0,100,1,`linear-gradient(to right, ${$.value}, ${s.value})`,e=>H.value=e)}
                  <${Z} ...${{get options(){return ae},get value(){return S.value},onchange:o(e=>S.value=e,"onchange")}} />
                  ${oe(()=>I.value,()=>u`
                      <div.mix-result>
                        <div.swatch.swatch-lg style=${()=>`background: ${y(I.value)}`} />
                        <div.copy-rows>
                          ${()=>_("color-mix",`color-mix(in ${S.value}, ${$.value} ${H.value}%, ${s.value})`)}
                          ${z(()=>Q(I.value),e=>e,e=>u`${()=>_(e[0],e[1])}`)}
                        </div>
                      </div>
                    `,()=>u`<span.placeholder>Enter two valid hex colors</span>`)}
                `,()=>u`
                  <div.shade-controls>
                    ${()=>n("Steps",d.value,3,20,1,"",e=>d.value=e)}
                    <div.slider-row>
                      <span.slider-label>Name</span>
                      <input.field.hex-input type="text" value=${()=>N.value} oninput=${v(e=>N.value=e.currentTarget.value)} />
                    </div>
                  </div>
                  <div.shade-grid>
                    ${z(()=>X.value,e=>e,(e,a)=>u`
                        <div.shade-item title="Copy" onclick=${v(()=>R(e))}>
                          <div.swatch.swatch-shade style=${()=>`background: ${e}`} />
                          <span.shade-hex>${()=>e}</span>
                          <span.shade-num>${()=>(a+1)*Math.round(1e3/d.value)}</span>
                        </div>
                      `)}
                  </div>
                  <div.copy-rows>
                    <div.copy-row.copy-row-vars>
                      <span.copy-label>css</span>
                      <textarea.vars-textarea readonly style=${()=>`--lines: ${d.value}`} value=${()=>U.value} />
                      <button.ghost-btn onclick=${v(()=>R(U.value))}><svg-icon icon=${()=>D.value===U.value?"check":"copy"} /></button>
                    </div>
                  </div>
                `],()=>u`
                ${()=>n("L",E.value.l,0,1,.001,"",e=>j("l",e))}
                ${()=>n("C",E.value.c,0,.4,.001,"",e=>j("c",e))}
                ${()=>n("H",E.value.h,0,360,1,B,e=>j("h",e))}
                ${()=>L(t.value)}
              `)}
          </div>
        </div>
      </div>
    </main>
  `}o(fe,"$$ColorpickerViewRatHtml");export{Fe as default};
