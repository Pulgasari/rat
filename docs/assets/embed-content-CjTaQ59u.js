import{a as l,k as a,h as s}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as m}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";const h="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",d=e=>/(^|\.)youtu\.be$/.test(e.hostname)?e.pathname.slice(1).split("/")[0]||null:e.searchParams.has("v")?e.searchParams.get("v"):e.pathname.match(/^\/(?:embed|live|shorts)\/([\w-]+)/)?.[1]??null,u=e=>{if(!e)return 0;if(/^\d+$/.test(e))return Number(e);const[,t=0,n=0,o=0]=e.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)??[];return Number(t)*3600+Number(n)*60+Number(o)},b=[{name:"youtube",label:"YouTube",ratio:"16 / 9",test:e=>/(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/.test(e.hostname)?d(e)??"":null,embed:(e,t)=>{if(!e)return null;const n=u(t.searchParams.get("t")??t.searchParams.get("start"));return`https://www.youtube-nocookie.com/embed/${encodeURIComponent(e)}?autoplay=1&rel=0${n?`&start=${n}`:""}`}},{name:"vimeo",label:"Vimeo",ratio:"16 / 9",test:e=>/(^|\.)vimeo\.com$/.test(e.hostname)?e.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/)?.[1]??"":null,embed:e=>e?`https://player.vimeo.com/video/${e}?autoplay=1&dnt=1`:null},{name:"spotify",label:"Spotify",height:e=>["episode","track"].includes(e.type)?"152px":"352px",test:e=>{if(e.hostname!=="open.spotify.com")return null;const[,t,n]=e.pathname.match(/^(?:\/intl-[\w-]+)?(?:\/embed)?\/(album|artist|episode|playlist|show|track)\/(\w+)/)??[];return t?{id:n,type:t}:null},embed:({id:e,type:t})=>`https://open.spotify.com/embed/${t}/${e}`},{name:"soundcloud",label:"SoundCloud",height:()=>"166px",test:e=>/(^|\.)soundcloud\.com$/.test(e.hostname)&&e.hostname!=="w.soundcloud.com"?e.href:null,embed:e=>`https://w.soundcloud.com/player/?url=${encodeURIComponent(e)}&auto_play=true&visual=false`},{name:"bandcamp",label:"Bandcamp",height:()=>"120px",test:e=>/(^|\.)bandcamp\.com$/.test(e.hostname)?e.href:null,embed:(e,t)=>t.pathname.startsWith("/EmbeddedPlayer")?e:null},{name:"mastodon",label:"Mastodon",height:()=>"400px",test:e=>/^\/@[\w.-]+\/\d+\/?$/.test(e.pathname)?e.href.replace(/\/$/,""):null,embed:e=>`${e}/embed`}],p={name:"web",ratio:"16 / 9",test:e=>e.href,embed:e=>e};function g(e){let t;try{t=new URL(e,location.href)}catch{return null}if(!/^https?:$/.test(t.protocol))return null;for(const n of[...b,p]){const o=n.test(t);if(o==null)continue;const r=n.embed(o,t);return{height:n.height?.(o)??null,host:r?new URL(r).hostname:t.hostname,label:n.label??t.hostname,link:t.href,provider:n.name,ratio:n.ratio??null,src:r}}return null}class f extends l{static attr={consent:{type:String,default:"click",values:["auto","click"]},height:String,label:String,poster:String,ratio:String,remember:Boolean,src:String,width:String};static styles=`embed-content {
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
  }`;get embed(){const t=this.getAttr("src");return t!==this._resolvedSrc&&(this._resolvedSrc=t,this._embed=t?g(t):null),this._embed}get active(){return!!this._active}get storeKey(){return`embed:consent:${this.embed?.provider}`}get consented(){return this.getAttr("consent")==="auto"?!0:!!(this.getAttr("remember")&&a.getSync(this.storeKey))}activate(){const t=this.embed;return!t?.src||this._active?this:(this._active=!0,this.getAttr("remember")&&a.setSync(this.storeKey,!0),this.update(),this.emit("activate",{provider:t.provider,src:t.src}),this)}onConnected(){this.on("click","button",(t,n)=>{n.parentNode===this&&this.activate()})}onAttributeChanged(t){t==="src"&&(this._active=!1)}render(){const t=this.embed;if(!t)return s``;!this._active&&t.src&&this.consented&&(this._active=!0);const n=this.getAttr("label")||t.label;return this._active?s`
      <iframe ...${m({allow:h,loading:"lazy",referrerpolicy:"strict-origin-when-cross-origin",src:t.src,title:n})}></iframe>
    `:t.src?s`
      <button type="button" aria-label="${`load ${n} from ${t.host}`}">
        <svg-icon icon="lucide:play"></svg-icon>
        <strong>${n}</strong>
        <small>loads content from ${t.host}</small>
      </button>
    `:s`
      <a href="${t.link}" target="_blank" rel="noopener noreferrer">
        <svg-icon icon="lucide:external-link"></svg-icon>
        <strong>${n}</strong>
        <small>opens ${t.host}</small>
      </a>
    `}sync(){const t=this.embed,{height:n,poster:o,ratio:r,width:c}=this.getAttr(),i=n||!r&&t?.height;this.states.toggle("active",this.active),this.setVar({"--embed-height":i,"--embed-poster":o&&`url(${JSON.stringify(o)})`,"--embed-ratio":i?"auto":r||t?.ratio||"16 / 9","--embed-width":c})}}f.init("embed-content");export{b as PROVIDERS,f as default,g as resolveEmbed};
