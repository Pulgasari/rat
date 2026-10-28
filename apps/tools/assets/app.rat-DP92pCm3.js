const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./AudioConverterView.rat-ChgF7loP.js","./index-BqtsWe95.js","./index-CxIQRcqW.css","./files-flpFxvji.js","./ffmpeg-D26eV_6e.js","./Dropzone.rat-Dd6x3hmL.js","./Segments.rat-COspD1-8.js","./keys-CWTtq0D5.js","./AudioCutterView.rat-c8_U5ZDB.js","./Waveform.rat-h2V3HC2v.js","./AudioSnippetsGeneratorView.rat-COqkiVCQ.js","./WorkbenchView.rat-CmJIGVw6.js","./specs-DjCaNLA1.js","./CodeInput.rat-DRE9roXN.js","./CodeOutput.rat-DY3AJlaQ.js","./ColorpickerView.rat-D5kAJpkp.js","./copied.rat-CL9Com0w.js","./cases-DigEqbWn.js","./InspectorView.rat-jOBj123K.js","./IconGeneratorView.rat-9AuX0CkH.js","./JsonFormatterView.rat-KkyEZufe.js","./PasswordGeneratorView.rat-BdUJt8Og.js","./Slider.rat-D7kbjV3n.js","./PdfExtractorView.rat-Bm4nZ5zO.js","./PixelArtCreatorView.rat-C_WcJUat.js","./SvgConverterView.rat-BrYq0zni.js","./SvgPixelPatternGeneratorView.rat-CKShnThP.js","./UuidGeneratorView.rat-PcOwF7UG.js"])))=>i.map(i=>d[i]);
var P=Object.defineProperty;var t=(e,i)=>P(e,"name",{value:i,configurable:!0});import{a2 as R,K as E,a3 as V,a4 as y,_ as n,w as d,h as l,H as $,f as v,a5 as k,q as D,a6 as g,J as I,a1 as C}from"./index-BqtsWe95.js";import{p as M,a as x}from"./keys-CWTtq0D5.js";function j(e,i){const s={};for(const o of Object.keys(i)){const c=e?.[o],m=i[o];s[o]=R(c)?c:E(()=>e[o]===void 0&&m?m():e[o])}return new Proxy(e??{},{get:t((o,c)=>Object.hasOwn(s,c)?s[c]:o[c],"get")})}t(j,"signalsOf");function p(e,{keys:i=null,prevent:s=!1,times:o=0}={}){const c=i?M(i):null;let m=o;return function(a){if(!(o&&!m)&&!(c&&!x(a,c))){s&&a.preventDefault(),o&&m--;try{const r=(typeof e=="string"?V(e):e).call(this,a);typeof r?.catch=="function"&&r.catch(u=>y(this,u,"handler"))}catch(r){y(this,r,"handler")}}}}t(p,"listener");const w=[{slug:"audio-converter",name:"Audio Converter",icon:"mdi:waveform",description:"Convert audio files between formats, entirely in the browser.",categories:["media"],view:t(()=>n(()=>import("./AudioConverterView.rat-ChgF7loP.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),"view")},{slug:"audio-cutter",name:"Audio Cutter",icon:"mdi:content-cut",description:"Trim an audio file down to the part you actually want.",categories:["media"],view:t(()=>n(()=>import("./AudioCutterView.rat-c8_U5ZDB.js"),__vite__mapDeps([8,1,2,9,3,4,5,7]),import.meta.url),"view")},{slug:"audio-snippets-generator",name:"Audio Snippets",icon:"mdi:music-box-multiple-outline",description:"Slice one recording into a batch of evenly cut snippets.",categories:["media"],view:t(()=>n(()=>import("./AudioSnippetsGeneratorView.rat-COqkiVCQ.js"),__vite__mapDeps([10,1,2,9,3,4,5,6,7]),import.meta.url),"view")},{slug:"base64-decoder",name:"Base64 Decoder",icon:"material-symbols:key-visualizer",description:"Decode Base64 back into readable text.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"base64-encoder",name:"Base64 Encoder",icon:"material-symbols:key-visualizer",description:"Encode text as Base64.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"colorpicker",name:"Colorpicker",icon:"streamline-ultimate:color-palette",description:"Pick a colour and read it back in every notation.",categories:["design"],view:t(()=>n(()=>import("./ColorpickerView.rat-D5kAJpkp.js"),__vite__mapDeps([15,1,2,16,17,6,7]),import.meta.url),"view")},{slug:"css-minifyer",name:"CSS Minifyer",icon:"devicon-plain:css",description:"Shrink CSS with csso.",categories:["minifier"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"csv-converter",name:"CSV Converter",icon:"mdi:table",description:"Turn CSV into JSON, YAML, TOML or a JS object.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"csv-inspector",name:"CSV Inspector",icon:"mdi:table-search",description:"Browse CSV as a searchable tree.",categories:["inspector"],view:t(()=>n(()=>import("./InspectorView.rat-jOBj123K.js"),__vite__mapDeps([18,1,2,12,13,3,7]),import.meta.url),"view")},{slug:"html-minifyer",name:"HTML Minifyer",icon:"fa:html5",description:"Shrink HTML with html-minifier-terser.",categories:["minifier"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"icon-generator",name:"Icon Generator",icon:"mdi:image-size-select-large",description:"Render an SVG into the PNG app icons a manifest needs.",categories:["tool","design"],view:t(()=>n(()=>import("./IconGeneratorView.rat-9AuX0CkH.js"),__vite__mapDeps([19,1,2,3,5,7]),import.meta.url),"view")},{slug:"image-batch-processor",name:"Image Batch Processor",icon:"mdi:image-multiple-outline",description:"Resize, crop and convert a whole pile of images at once.",categories:["image"],href:"../images/#/batch"},{slug:"image-converter",name:"Image Converter",icon:"mdi:image-sync-outline",description:"Convert images to JPG, PNG or WebP.",categories:["image","converter"],href:"../images/#/convert"},{slug:"js-minifyer",name:"JS Minifyer",icon:"akar-icons:javascript-fill",description:"Shrink JavaScript with terser.",categories:["minifier"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"json-converter",name:"JSON Converter",icon:"mdi:code-json",description:"Turn JSON into CSV, YAML, TOML or a JS object.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"json-formatter",name:"JSON Formatter",icon:"mdi:code-braces",description:"Pretty-print JSON with the indentation you want.",categories:["formatter"],view:t(()=>n(()=>import("./JsonFormatterView.rat-KkyEZufe.js"),__vite__mapDeps([20,1,2,13,3,14,6,7]),import.meta.url),"view")},{slug:"json-inspector",name:"JSON Inspector",icon:"mdi:code-json",description:"Browse JSON as a searchable tree.",categories:["inspector"],view:t(()=>n(()=>import("./InspectorView.rat-jOBj123K.js"),__vite__mapDeps([18,1,2,12,13,3,7]),import.meta.url),"view")},{slug:"json-minifyer",name:"JSON Minifyer",icon:"mdi:code-json",description:"Strip every byte of whitespace out of JSON.",categories:["minifier"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"password-generator",name:"Password Generator",icon:"mdi:lock-outline",description:"Generate passwords from crypto-grade randomness.",categories:["generator"],view:t(()=>n(()=>import("./PasswordGeneratorView.rat-BdUJt8Og.js"),__vite__mapDeps([21,1,2,16,17,6,22,7]),import.meta.url),"view")},{slug:"pdf-extractor",name:"PDF Extractor",icon:"mdi:file-pdf-box",description:"Pull text, pages and images out of a PDF.",categories:["document"],view:t(()=>n(()=>import("./PdfExtractorView.rat-Bm4nZ5zO.js"),__vite__mapDeps([23,1,2,3,5,6,22,7]),import.meta.url),"view")},{slug:"pixel-art-creator",name:"Pixel Art Creator",icon:"mdi:grid",description:"Draw pixel art on a grid and export it as SVG or PNG.",categories:["design"],view:t(()=>n(()=>import("./PixelArtCreatorView.rat-C_WcJUat.js"),__vite__mapDeps([24,1,2,3,6,7]),import.meta.url),"view")},{slug:"svg-converter",name:"SVG Converter",icon:"mdi:svg",description:"Rasterise SVG to PNG at any size.",categories:["image","converter"],view:t(()=>n(()=>import("./SvgConverterView.rat-BrYq0zni.js"),__vite__mapDeps([25,1,2,3,5,22,7]),import.meta.url),"view")},{slug:"svg-pixel-pattern-generator",name:"SVG Pixel Pattern Generator",icon:"mdi:dots-grid",description:"Build tileable pixel patterns and export them as SVG.",categories:["design","generator"],view:t(()=>n(()=>import("./SvgPixelPatternGeneratorView.rat-CKShnThP.js"),__vite__mapDeps([26,1,2,3,6,22,7]),import.meta.url),"view")},{slug:"toml-converter",name:"TOML Converter",icon:"mdi:file-cog-outline",description:"Turn TOML into JSON, CSV, YAML or a JS object.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"toml-inspector",name:"TOML Inspector",icon:"mdi:file-search-outline",description:"Browse TOML as a searchable tree.",categories:["inspector"],view:t(()=>n(()=>import("./InspectorView.rat-jOBj123K.js"),__vite__mapDeps([18,1,2,12,13,3,7]),import.meta.url),"view")},{slug:"uuid-generator",name:"UUID Generator",icon:"mdi:identifier",description:"Generate UUIDs in bulk and copy them out.",categories:["generator"],view:t(()=>n(()=>import("./UuidGeneratorView.rat-PcOwF7UG.js"),__vite__mapDeps([27,1,2,16,6,22,7]),import.meta.url),"view")},{slug:"xml-minifyer",name:"XML Minifyer",icon:"mdi:xml",description:"Strip whitespace and comments out of XML.",categories:["minifier"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"yaml-converter",name:"YAML Converter",icon:"mdi:file-document-outline",description:"Turn YAML into JSON, CSV, TOML or a JS object.",categories:["converter"],view:t(()=>n(()=>import("./WorkbenchView.rat-CmJIGVw6.js"),__vite__mapDeps([11,1,2,12,13,3,14,6,7]),import.meta.url),"view")},{slug:"yaml-inspector",name:"YAML Inspector",icon:"mdi:file-search-outline",description:"Browse YAML as a searchable tree.",categories:["inspector"],view:t(()=>n(()=>import("./InspectorView.rat-jOBj123K.js"),__vite__mapDeps([18,1,2,12,13,3,7]),import.meta.url),"view")}],J=[...new Set(w.flatMap(e=>e.categories))].sort(),ae=t(e=>w.find(i=>i.slug===e),"toolOf");function z(e,i){return G.call({props:e},e,i)}t(z,"SearchPanelRatHtml");function G(e,i){let{value:s}=j(this.props,{value:null});return l`
    <div.search-panel>
      <input-search placeholder=${()=>e.placeholder} value=${()=>s.value} oninput=${p(o=>s.value=o.currentTarget.value??"")} />
      ${d(()=>s.value,()=>l`<btn-icon icon="close" label="clear filter" onclick=${p(()=>s.value="")} />`)}
    </div>
  `}t(G,"$$SearchPanelRatHtml");function S(e,i){return H.call({props:e},e,i)}t(S,"ViewHeaderRatHtml");function H(e,i){const s=t(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return l`
    <header.view-header>
      ${d(()=>typeof e.back=="string",()=>l`<btn-icon.view-back icon="arrow-left" label="back" onclick=${p(s)} />`,()=>d(()=>e.back,()=>l`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${d(()=>e.title,()=>l`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${i}</div>
    </header>
  `}t(H,"$$ViewHeaderRatHtml");function N(e,i){return B.call({props:e},e,i)}t(N,"ShelfViewRatHtml");function B(e,i){let s=$(""),o=$("");const c=E(()=>(()=>{const a=s.value.trim().toLowerCase();return w.filter(r=>(!o.value||r.categories.includes(o.value))&&(!a||r.name.toLowerCase().includes(a)||r.description.toLowerCase().includes(a)))})());function m(a,r){r.href||(a.preventDefault(),RAT.app.router.go(`/${r.slug}`))}return t(m,"open"),l`
    <${S} title="tools"><btn-icon icon="settings" label="settings" onclick=${p(()=>RAT.app.toggle("config"))} /></${S}>
    <main.shelf-main>
      <div.categories>
        <button.chip class:active=${()=>o.value===""} onclick=${p(()=>o.value="")}>all</button>
        ${v(()=>J,a=>a,a=>l`<button.chip class:active=${()=>o.value===a} onclick=${p(()=>o.value=a)}>${()=>a}</button>`)}
      </div>
      <ul.shelf>
        ${v(()=>c.value,a=>a,a=>l`
            <li>
              <a href=${()=>a.href??`#/${a.slug}`} onclick=${p(r=>m(r,a))}>
                <span.title>
                  <span.name>${()=>a.name}</span>
                  <span.desc>${()=>a.description}</span>
                </span>
                <svg-icon.logo icon=${()=>a.href?"external":a.icon} />
              </a>
            </li>
          `)}
      </ul>
      ${d(()=>!c.value.length,()=>l`<p.nothing>nothing matches “${()=>s.value}”.</p>`)}
      <${z} class="search sticky" placeholder="search tools …" ...${{value:s}} />
    </main>
  `}t(B,"$$ShelfViewRatHtml");const b=t(e=>(i,s)=>k.notify(i,{...s,type:e}),"notify"),O=Object.assign(b("info"),{error:b("error"),info:b("info"),success:b("success")});let _=null;const h=D(!1),L=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Y=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!L;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),_=e,h.value=!0});addEventListener("appinstalled",()=>{_=null,h.value=!1});async function U(){if(!_)return!1;const e=_;return _=null,h.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}t(U,"install");function F(e){const i=t(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),O(`${e} can be installed: see the settings`))},"show");h.value?i():addEventListener("beforeinstallprompt",i,{once:!0})}t(F,"hint");const f=I("appearance",{}),A={density:g.densities,geometry:g.geometries,mode:g.modes},X=t(()=>f.value,"appearance"),q=t(()=>g.palettes().catch(()=>[]),"palettes");function W(e,i){return f.value={...f.value,[e]:i||null},g.set({[e]:i||null})}t(W,"setAppearance");Object.keys(f.value).length&&g.set(f.value);const K=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Q(e,i){return Z.call({props:e},e,i)}t(Q,"SettingsRatHtml");function Z(e,i){C("177zzh1",K);let s=$({...X()}),o=$([]);const c=E(()=>h.value);q().then(r=>{o.value=r});function m(r,u){const T=u.detail?.value??u.target.value;s.value={...s.value,[r]:T},W(r,T)}t(m,"change");async function a(){await U()&&O.success(`${e.name??"the app"} is installed`)}return t(a,"installApp"),l`
    <div.settings data-rat="177zzh1">
      ${i}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>s.value.palette??"zombie"} onchange=${p(r=>m("palette",r))}>
            ${v(()=>o.value,r=>r,r=>l`<input-option value=${()=>r}>${()=>r}</input-option>`)}
          </input-value>
        </label>
        ${v(()=>Object.keys(A),r=>r,r=>l`
            <label>
              <span>${()=>r}</span>
              <input-value look="segments" value=${()=>s.value[r]??""} onchange=${p(u=>m(r,u))}>
                ${v(()=>A[r],u=>u,u=>l`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${d(()=>!L,()=>l`
          <section>
            <h3>install</h3>
            ${d(()=>c.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${p(a)} />`,()=>l`
                ${d(()=>Y,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}t(Z,"$$SettingsRatHtml");function ee(e,i){return te.call({props:e},e,i)}t(ee,"AppRatHtml");function te(e,i){RAT.app.on("error",O.error),F("Tools");const s=w.filter(o=>o.view);return l`
    <rat-view name="shelf" route="/" component=${()=>N} />
    ${v(()=>s,o=>o,o=>l`<rat-view name=${()=>o.slug} route=${()=>`/${o.slug}`} lazy=${()=>o.view} />`)}
    <rat-area name="config" dock="end"><${Q} name="Tools" /></rat-area>
  `}t(te,"$$AppRatHtml");const ne=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));export{S as V,ne as a,p as l,j as s,ae as t};
