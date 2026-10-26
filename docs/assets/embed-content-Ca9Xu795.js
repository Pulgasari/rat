var m=Object.defineProperty;var n=(e,t)=>m(e,"name",{value:t,configurable:!0});import{a as h,k as c,h as i}from"./index-mP1PGphD.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as d}from"./template-DUWU3MC7.js";import"https://esm.sh/jsr/@pulgasari/logger";const u="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",b=n(e=>/(^|\.)youtu\.be$/.test(e.hostname)?e.pathname.slice(1).split("/")[0]||null:e.searchParams.has("v")?e.searchParams.get("v"):e.pathname.match(/^\/(?:embed|live|shorts)\/([\w-]+)/)?.[1]??null,"youtubeId"),p=n(e=>{if(!e)return 0;if(/^\d+$/.test(e))return Number(e);const[,t=0,o=0,r=0]=e.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)??[];return Number(t)*3600+Number(o)*60+Number(r)},"seconds"),g=[{name:"youtube",label:"YouTube",ratio:"16 / 9",test:n(e=>/(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/.test(e.hostname)?b(e)??"":null,"test"),embed:n((e,t)=>{if(!e)return null;const o=p(t.searchParams.get("t")??t.searchParams.get("start"));return`https://www.youtube-nocookie.com/embed/${encodeURIComponent(e)}?autoplay=1&rel=0${o?`&start=${o}`:""}`},"embed")},{name:"vimeo",label:"Vimeo",ratio:"16 / 9",test:n(e=>/(^|\.)vimeo\.com$/.test(e.hostname)?e.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/)?.[1]??"":null,"test"),embed:n(e=>e?`https://player.vimeo.com/video/${e}?autoplay=1&dnt=1`:null,"embed")},{name:"spotify",label:"Spotify",height:n(e=>["episode","track"].includes(e.type)?"152px":"352px","height"),test:n(e=>{if(e.hostname!=="open.spotify.com")return null;const[,t,o]=e.pathname.match(/^(?:\/intl-[\w-]+)?(?:\/embed)?\/(album|artist|episode|playlist|show|track)\/(\w+)/)??[];return t?{id:o,type:t}:null},"test"),embed:n(({id:e,type:t})=>`https://open.spotify.com/embed/${t}/${e}`,"embed")},{name:"soundcloud",label:"SoundCloud",height:n(()=>"166px","height"),test:n(e=>/(^|\.)soundcloud\.com$/.test(e.hostname)&&e.hostname!=="w.soundcloud.com"?e.href:null,"test"),embed:n(e=>`https://w.soundcloud.com/player/?url=${encodeURIComponent(e)}&auto_play=true&visual=false`,"embed")},{name:"bandcamp",label:"Bandcamp",height:n(()=>"120px","height"),test:n(e=>/(^|\.)bandcamp\.com$/.test(e.hostname)?e.href:null,"test"),embed:n((e,t)=>t.pathname.startsWith("/EmbeddedPlayer")?e:null,"embed")},{name:"mastodon",label:"Mastodon",height:n(()=>"400px","height"),test:n(e=>/^\/@[\w.-]+\/\d+\/?$/.test(e.pathname)?e.href.replace(/\/$/,""):null,"test"),embed:n(e=>`${e}/embed`,"embed")}],f={name:"web",ratio:"16 / 9",test:n(e=>e.href,"test"),embed:n(e=>e,"embed")};function y(e){let t;try{t=new URL(e,location.href)}catch{return null}if(!/^https?:$/.test(t.protocol))return null;for(const o of[...g,f]){const r=o.test(t);if(r==null)continue;const s=o.embed(r,t);return{height:o.height?.(r)??null,host:s?new URL(s).hostname:t.hostname,label:o.label??t.hostname,link:t.href,provider:o.name,ratio:o.ratio??null,src:s}}return null}n(y,"resolveEmbed");class v extends h{static{n(this,"EmbedContent")}static attr={consent:{type:String,default:"click",values:["auto","click"]},height:String,label:String,poster:String,ratio:String,remember:Boolean,src:String,width:String};static styles=`embed-content {
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
  }`;get embed(){const t=this.getAttr("src");return t!==this._resolvedSrc&&(this._resolvedSrc=t,this._embed=t?y(t):null),this._embed}get active(){return!!this._active}get storeKey(){return`embed:consent:${this.embed?.provider}`}get consented(){return this.getAttr("consent")==="auto"?!0:!!(this.getAttr("remember")&&c.getSync(this.storeKey))}activate(){const t=this.embed;return!t?.src||this._active?this:(this._active=!0,this.getAttr("remember")&&c.setSync(this.storeKey,!0),this.update(),this.emit("activate",{provider:t.provider,src:t.src}),this)}onConnected(){this.on("click","button",(t,o)=>{o.parentNode===this&&this.activate()})}onAttributeChanged(t){t==="src"&&(this._active=!1)}render(){const t=this.embed;if(!t)return i``;!this._active&&t.src&&this.consented&&(this._active=!0);const o=this.getAttr("label")||t.label;return this._active?i`
      <iframe ...${d({allow:u,loading:"lazy",referrerpolicy:"strict-origin-when-cross-origin",src:t.src,title:o})}></iframe>
    `:t.src?i`
      <button type="button" aria-label="${`load ${o} from ${t.host}`}">
        <svg-icon icon="lucide:play"></svg-icon>
        <strong>${o}</strong>
        <small>loads content from ${t.host}</small>
      </button>
    `:i`
      <a href="${t.link}" target="_blank" rel="noopener noreferrer">
        <svg-icon icon="lucide:external-link"></svg-icon>
        <strong>${o}</strong>
        <small>opens ${t.host}</small>
      </a>
    `}sync(){const t=this.embed,{height:o,poster:r,ratio:s,width:l}=this.getAttr(),a=o||!s&&t?.height;this.states.toggle("active",this.active),this.setVar({"--embed-height":a,"--embed-poster":r&&`url(${JSON.stringify(r)})`,"--embed-ratio":a?"auto":s||t?.ratio||"16 / 9","--embed-width":l})}}v.init();export{g as PROVIDERS,v as default,y as resolveEmbed};
