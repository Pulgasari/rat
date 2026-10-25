var h=Object.defineProperty;var b=(e,t,n)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t)=>h(e,"name",{value:t,configurable:!0});var c=(e,t,n)=>b(e,typeof t!="symbol"?t+"":t,n);import{a as p,k as u,h as a}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as g}from"./template-DVBhjnqx.js";import"https://esm.sh/jsr/@pulgasari/logger";const f="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",y=o(e=>/(^|\.)youtu\.be$/.test(e.hostname)?e.pathname.slice(1).split("/")[0]||null:e.searchParams.has("v")?e.searchParams.get("v"):e.pathname.match(/^\/(?:embed|live|shorts)\/([\w-]+)/)?.[1]??null,"youtubeId"),v=o(e=>{if(!e)return 0;if(/^\d+$/.test(e))return Number(e);const[,t=0,n=0,r=0]=e.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)??[];return Number(t)*3600+Number(n)*60+Number(r)},"seconds"),$=[{name:"youtube",label:"YouTube",ratio:"16 / 9",test:o(e=>/(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/.test(e.hostname)?y(e)??"":null,"test"),embed:o((e,t)=>{if(!e)return null;const n=v(t.searchParams.get("t")??t.searchParams.get("start"));return`https://www.youtube-nocookie.com/embed/${encodeURIComponent(e)}?autoplay=1&rel=0${n?`&start=${n}`:""}`},"embed")},{name:"vimeo",label:"Vimeo",ratio:"16 / 9",test:o(e=>/(^|\.)vimeo\.com$/.test(e.hostname)?e.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/)?.[1]??"":null,"test"),embed:o(e=>e?`https://player.vimeo.com/video/${e}?autoplay=1&dnt=1`:null,"embed")},{name:"spotify",label:"Spotify",height:o(e=>["episode","track"].includes(e.type)?"152px":"352px","height"),test:o(e=>{if(e.hostname!=="open.spotify.com")return null;const[,t,n]=e.pathname.match(/^(?:\/intl-[\w-]+)?(?:\/embed)?\/(album|artist|episode|playlist|show|track)\/(\w+)/)??[];return t?{id:n,type:t}:null},"test"),embed:o(({id:e,type:t})=>`https://open.spotify.com/embed/${t}/${e}`,"embed")},{name:"soundcloud",label:"SoundCloud",height:o(()=>"166px","height"),test:o(e=>/(^|\.)soundcloud\.com$/.test(e.hostname)&&e.hostname!=="w.soundcloud.com"?e.href:null,"test"),embed:o(e=>`https://w.soundcloud.com/player/?url=${encodeURIComponent(e)}&auto_play=true&visual=false`,"embed")},{name:"bandcamp",label:"Bandcamp",height:o(()=>"120px","height"),test:o(e=>/(^|\.)bandcamp\.com$/.test(e.hostname)?e.href:null,"test"),embed:o((e,t)=>t.pathname.startsWith("/EmbeddedPlayer")?e:null,"embed")},{name:"mastodon",label:"Mastodon",height:o(()=>"400px","height"),test:o(e=>/^\/@[\w.-]+\/\d+\/?$/.test(e.pathname)?e.href.replace(/\/$/,""):null,"test"),embed:o(e=>`${e}/embed`,"embed")}],w={name:"web",ratio:"16 / 9",test:o(e=>e.href,"test"),embed:o(e=>e,"embed")};function k(e){let t;try{t=new URL(e,location.href)}catch{return null}if(!/^https?:$/.test(t.protocol))return null;for(const n of[...$,w]){const r=n.test(t);if(r==null)continue;const s=n.embed(r,t);return{height:n.height?.(r)??null,host:s?new URL(s).hostname:t.hostname,label:n.label??t.hostname,link:t.href,provider:n.name,ratio:n.ratio??null,src:s}}return null}o(k,"resolveEmbed");const i=class i extends p{get embed(){const t=this.getAttr("src");return t!==this._resolvedSrc&&(this._resolvedSrc=t,this._embed=t?k(t):null),this._embed}get active(){return!!this._active}get storeKey(){return`embed:consent:${this.embed?.provider}`}get consented(){return this.getAttr("consent")==="auto"?!0:!!(this.getAttr("remember")&&u.getSync(this.storeKey))}activate(){const t=this.embed;return!t?.src||this._active?this:(this._active=!0,this.getAttr("remember")&&u.setSync(this.storeKey,!0),this.update(),this.emit("activate",{provider:t.provider,src:t.src}),this)}onConnected(){this.on("click","button",(t,n)=>{n.parentNode===this&&this.activate()})}onAttributeChanged(t){t==="src"&&(this._active=!1)}render(){const t=this.embed;if(!t)return a``;!this._active&&t.src&&this.consented&&(this._active=!0);const n=this.getAttr("label")||t.label;return this._active?a`
      <iframe ...${g({allow:f,loading:"lazy",referrerpolicy:"strict-origin-when-cross-origin",src:t.src,title:n})}></iframe>
    `:t.src?a`
      <button type="button" aria-label="${`load ${n} from ${t.host}`}">
        <svg-icon icon="lucide:play"></svg-icon>
        <strong>${n}</strong>
        <small>loads content from ${t.host}</small>
      </button>
    `:a`
      <a href="${t.link}" target="_blank" rel="noopener noreferrer">
        <svg-icon icon="lucide:external-link"></svg-icon>
        <strong>${n}</strong>
        <small>opens ${t.host}</small>
      </a>
    `}sync(){const t=this.embed,{height:n,poster:r,ratio:s,width:d}=this.getAttr(),m=n||!s&&t?.height;this.states.toggle("active",this.active),this.setVar({"--embed-height":m,"--embed-poster":r&&`url(${JSON.stringify(r)})`,"--embed-ratio":m?"auto":s||t?.ratio||"16 / 9","--embed-width":d})}};o(i,"EmbedContent"),c(i,"attr",{consent:{type:String,default:"click",values:["auto","click"]},height:String,label:String,poster:String,ratio:String,remember:Boolean,src:String,width:String}),c(i,"styles",`embed-content {
    aspect-ratio    : var(--embed-ratio, 16 / 9);
    background      : center / cover no-repeat var(--embed-poster, none);
    block-size      : var(--embed-height, auto);
    container-type  : size;
    display         : block;
    inline-size     : var(--embed-width, 100%);
    max-inline-size : 100%;

    > iframe {
      block-size  : 100%;
      border      : 0;
      display     : block;
      inline-size : 100%;
    }

    > :is(button, a) {
      align-items     : center;
      background      : none;
      block-size      : 100%;
      border          : 0;
      color           : inherit;
      cursor          : pointer;
      display         : flex;
      flex-direction  : column;
      font            : inherit;
      gap             : --space(tiny);
      inline-size     : 100%;
      justify-content : center;
      margin          : 0;
      text-align      : center;
      text-decoration : none;

      > svg-icon { font-size: 2em; }
      > small       { font-size: 0.75em; }
    }

    @container (max-height: 80px) {
      > :is(button, a) { flex-direction: row; gap: --space(small); }
      > :is(button, a) > svg-icon { font-size: 1em; }
    }
  }`);let l=i;l.init();export{$ as PROVIDERS,l as default,k as resolveEmbed};
