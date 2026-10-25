var l=Object.defineProperty;var h=(a,t,e)=>t in a?l(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var m=(a,t)=>l(a,"name",{value:t,configurable:!0});var r=(a,t,e)=>h(a,typeof t!="symbol"?t+"":t,e);import{a as d,h as s}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as f}from"./template-DPs-zPIM.js";import"https://esm.sh/jsr/@pulgasari/logger";const y="ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 äöüß ?!&@#%*()[]{}";let u=0;const i=class i extends d{name=`media-font-${++u}`;get familyName(){return this.getAttr("family")||this.fileName||this.name}get fileName(){return decodeURIComponent(String(this.getAttr("src")??"").split(/[?#]/)[0].split("/").pop().replace(/\.[^.]+$/,""))}async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const e=new FontFace(this.familyName,`url("${new URL(t,document.baseURI).href}")`);document.fonts.add(await e.load()),this.removeAttribute("failed")}catch(e){this.setAttribute("failed",""),console.warn(`[media-font] ${t}:`,e)}}}render(){const{sizes:t,src:e,text:c}=this.getAttr();if(!e)return s``;const o=`font-family: "${this.familyName}", var(--font-fallback, sans-serif)`;return s`
      <header>${this.familyName}</header>
      ${String(t).split(/\s+/).filter(Boolean).map(p=>s`<p ...${f({style:`${o}; font-size: ${Number(p)||16}px`})}>${c}</p>`)}
      <p part="glyphs" ...${f({style:o})}>${y}</p>
    `}sync(){this.load()}};m(i,"MediaFont"),r(i,"attr",{family:String,sizes:"16 24 36 56",src:String,text:"The quick brown fox jumps over the lazy dog"}),r(i,"styles",`media-font {
    display        : flex;
    flex-direction : column;
    gap            : --space(tiny);

    > header { font-size: 0.8em; opacity: 0.7; }
    > p      { line-height: 1.2; margin: 0; overflow-wrap: anywhere; }
    > p[part="glyphs"] { font-size: 1.5em; letter-spacing: 0.05em; }

    &[failed]::before { content: 'not a font'; opacity: 0.6; }
  }`);let n=i;n.init();export{n as default};
