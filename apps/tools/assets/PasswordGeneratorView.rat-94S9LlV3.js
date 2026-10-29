var N=Object.defineProperty;var t=(s,p)=>N(s,"name",{value:p,configurable:!0});import{M as n,K as W,N as H,w as B,g as j,i as o}from"./index-DaBPW9ZR.js";import{i as D,$ as q,c as T}from"./copied.rat-DVV8RCvb.js";import{c as z}from"./cases-C6rhQfA5.js";import{V as K,l as i}from"./app.rat-PYKgMnM7.js";import{S as U}from"./Segments.rat-ChZQlGR4.js";import{S as b}from"./Slider.rat-BKYHaB7Q.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function re(s,p){return Z.call({props:s},s,p)}t(re,"PasswordGeneratorViewRatHtml");function Z(s,p){const y=D(()=>q),d={digits:"0123456789",lower:"abcdefghijklmnopqrstuvwxyz",similar:"iIlL1oO0",symbols:"!@#$%^&*()-_=+[]{}|;:,.<>?",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"},V=[{icon:"dice",label:"Random",value:"random"},{icon:"text",label:"Passphrase",value:"passphrase"},{icon:"number",label:"PIN",value:"pin"}],w=[["upper","A–Z uppercase"],["lower","a–z lowercase"],["digits","0–9 digits"],["symbols","!@# symbols"]],E=["-",".","_"," ","/"],G="https://raw.githubusercontent.com/EFF/BIP39-English/master/wordlist.txt";let r=n("mode","random"),g=n("length",16),u=n("sets",{digits:!0,lower:!0,symbols:!1,upper:!0}),k=n("noSimilar",!1),m=n("words",4),c=n("separator","-"),h=n("pinLength",6),S=n("count",5),$=W([]),x=null;const L=t(e=>k.value?[...e].filter(a=>!d.similar.includes(a)).join(""):e,"without"),f=H(()=>L(w.filter(([e])=>u.value[e]).map(([e])=>d[e]).join(""))),v=H(()=>+(r.value==="pin"?h.value*Math.log2(10):r.value==="passphrase"?m.value*Math.log2(x?.length??2048):f.value.length?g.value*Math.log2(f.value.length):0).toFixed(1)),R=H(()=>v.value<40?["Weak","#e06c75"]:v.value<60?["Fair","#d19a66"]:v.value<80?["Strong","#98c379"]:["Very strong","#56b6c2"]);function A(e){const a=new Uint32Array(1),l=Math.floor(4294967295/e)*e;do crypto.getRandomValues(a);while(a[0]>=l);return a[0]%e}t(A,"randomInt");const P=t(e=>e[A(e.length)],"pick");function I(e){for(let a=e.length-1;a>0;a--){const l=A(a+1);[e[a],e[l]]=[e[l],e[a]]}return e}t(I,"shuffle");function C(){if(!f.value)return"(enable at least one charset)";const e=w.filter(([l])=>u.value[l]).map(([l])=>P(l==="symbols"?d.symbols:L(d[l]))),a=Array.from({length:Math.max(0,g.value-e.length)},()=>P(f.value));return I([...e,...a]).join("")}t(C,"randomPassword");async function F(){return x??=(await(await fetch(G)).text()).trim().split(`
`).map(e=>e.trim()).filter(Boolean),Array.from({length:m.value},()=>P(x)).join(c.value)}t(F,"passphrase");const O=t(()=>Array.from({length:h.value},()=>A(10)).join(""),"pin");async function M(){const e=r.value==="passphrase"?F:r.value==="pin"?O:C;$.value=await Promise.all(Array.from({length:S.value},e))}return t(M,"generate"),M(),o`
    <${K} back="/" title="Password Generator" />
    <main.tool>
      <div.tool-body>
        <${U} ...${{get options(){return V},get value(){return r.value},onchange:t(e=>{r.value=e,M()},"onchange")}} />
        <div.panel>
          ${z(()=>r.value,["passphrase","pin"],[()=>o`
                <div.settings-group>
                  <${b} label="Words" ...${{get min(){return 2},get max(){return 10},get value(){return m.value},onchange:t(e=>m.value=e,"onchange")}} />
                  <div.setting-row>
                    <label>Separator</label>
                    <div.chip-group>
                      ${j(()=>E,e=>e,e=>o`<button.chip class:active=${()=>c.value===e} onclick=${i(()=>c.value=e)}>${()=>e===" "?"·space·":e}</button>`)}
                      <input.field.sep-input type="text" maxlength="3" placeholder="custom" value=${()=>c.value} oninput=${i(e=>c.value=e.currentTarget.value)} />
                    </div>
                  </div>
                </div>
              `,()=>o`<div.settings-group><${b} label="Length" ...${{get min(){return 4},get max(){return 12},get value(){return h.value},onchange:t(e=>h.value=e,"onchange")}} /></div>`],()=>o`
              <div.settings-group>
                <${b} label="Length" ...${{get min(){return 4},get max(){return 128},get value(){return g.value},onchange:t(e=>g.value=e,"onchange")}} />
                <div.toggles>
                  ${j(()=>w,e=>e,e=>o`
                      <label.toggle>
                        <input type="checkbox" checked=${()=>u.value[e[0]]} onchange=${i(a=>u.value={...u.value,[e[0]]:a.currentTarget.checked})} />
                        <span>${()=>e[1]}</span>
                      </label>
                    `)}
                  <label.toggle>
                    <input type="checkbox" checked=${()=>k.value} onchange=${i(e=>k.value=e.currentTarget.checked)} />
                    <span>No similar chars (i l 1 o 0)</span>
                  </label>
                </div>
              </div>
            `)}
          <div.entropy>
            <div.entropy-bar><div.entropy-fill style=${()=>`width: ${Math.min(100,v.value/128*100)}%; background: ${R.value[1]}`} /></div>
            <span.entropy-label style=${()=>`color: ${R.value[1]}`}>${()=>v.value} bits — ${()=>R.value[0]}</span>
          </div>
          <${b} label="Generate" ...${{get min(){return 1},get max(){return 20},get value(){return S.value},onchange:t(e=>S.value=e,"onchange")}} />
          <div.tool-actions>
            <btn-push icon="refresh" label="Generate" onclick=${i(M)} />
            ${B(()=>$.value.length>1,()=>o`<btn-push icon=${()=>y.value==="*"?"check":"copy"} label=${()=>y.value==="*"?"Copied!":"Copy all"} onclick=${i(()=>T($.value.join(`
`),"*"))} />`)}
          </div>
        </div>
        <div.pw-list>
          ${j(()=>$.value,e=>e,e=>o`
              <div.pw-row title="Click to copy" onclick=${i(()=>T(e))}>
                <code.pw-value>${()=>e}</code>
                <svg-icon.copy-icon icon=${()=>y.value===e?"check":"copy"} />
              </div>
            `)}
        </div>
      </div>
    </main>
  `}t(Z,"$$PasswordGeneratorViewRatHtml");export{re as default};
