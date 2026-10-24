import{a as o,h as a}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as r}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";const l="ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 äöüß ?!&@#%*()[]{}";let m=0;class f extends o{static attr={family:String,sizes:"16 24 36 56",src:String,text:"The quick brown fox jumps over the lazy dog"};static styles=`media-font {
    display        : flex;
    flex-direction : column;
    gap            : --space(tiny);

    > header { font-size: 0.8em; opacity: 0.7; }
    > p      { line-height: 1.2; margin: 0; overflow-wrap: anywhere; }
    > p[part="glyphs"] { font-size: 1.5em; letter-spacing: 0.05em; }

    &[failed]::before { content: 'not a font'; opacity: 0.6; }
  }`;name=`media-font-${++m}`;get familyName(){return this.getAttr("family")||this.fileName||this.name}get fileName(){return decodeURIComponent(String(this.getAttr("src")??"").split(/[?#]/)[0].split("/").pop().replace(/\.[^.]+$/,""))}async load(){const t=this.getAttr("src");if(!(!t||t===this._loaded)){this._loaded=t;try{const e=new FontFace(this.familyName,`url("${new URL(t,document.baseURI).href}")`);document.fonts.add(await e.load()),this.removeAttribute("failed")}catch(e){this.setAttribute("failed",""),console.warn(`[media-font] ${t}:`,e)}}}render(){const{sizes:t,src:e,text:s}=this.getAttr();if(!e)return a``;const i=`font-family: "${this.familyName}", var(--font-fallback, sans-serif)`;return a`
      <header>${this.familyName}</header>
      ${String(t).split(/\s+/).filter(Boolean).map(n=>a`<p ...${r({style:`${i}; font-size: ${Number(n)||16}px`})}>${s}</p>`)}
      <p part="glyphs" ...${r({style:i})}>${l}</p>
    `}sync(){this.load()}}f.init("media-font");export{f as default};
