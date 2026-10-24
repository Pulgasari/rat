import{a as h}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const b="https://api.iconify.design",s="@aufbau/svg/aliases.js",u="material-symbols:help",d={aufbau:"@aufbau/svg/icons/"},g=new Map,p=new Map,f=new Set;let $=null,m=!1;const v=n=>/^(\.{0,2}\/|https?:|data:)/.test(n),a=(n,t)=>{f.has(n)||(f.add(n),console.warn(`[svg-icon] ${t}`))};function k(n){if(!n)return null;if(v(n))return n;const t=String(n).trim().replace("/",":");return t.includes(":")?t:g.get(t)??null}function w(n,t){try{return import.meta.resolve(`${n}${t}.svg`)}catch{return a(n,`"${n}" could not be resolved, add it to the importmap.`),null}}function y(n){if(v(n))return n;const t=p.get(n);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[e,...i]=n.split(":"),r=i.join(":");return!e||!r?null:d[e]?w(d[e],r):`${b}/${encodeURIComponent(e)}:${encodeURIComponent(r)}.svg`}class l extends h{static attr={color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String};static styles=`svg-icon {
    background-color : var(--icon-color, currentColor);
    block-size       : var(--icon-size, 1em);
    display          : inline-block;
    flex             : none;
    inline-size      : var(--icon-size, 1em);
    mask             : var(--icon-url, linear-gradient(transparent, transparent)) center / 100% 100% no-repeat;
    vertical-align   : var(--icon-align, -0.125em);

    &[mode="image"] {
      background : var(--icon-url, none) center / contain no-repeat;
      mask       : none;
    }

    &:not([icon]) { display: none; }
  }`;static register(t){for(const[e,i]of Object.entries(t??{}))g.set(e,i);return this}static provide(t){for(const[e,i]of Object.entries(t??{}))p.set(e,i);return this}static loadDefaults(){return $??=import(s).then(t=>{this.register(t.default)}).catch(t=>a(s,`default aliases unavailable, "${s}" could not be imported: ${t?.message??t}`)).finally(()=>{m=!0})}sync(){const{color:t,icon:e,label:i,size:r}=this.getAttr();let o=k(e);if(e&&!o&&!m){l.loadDefaults().then(()=>this.update());return}e&&!o&&(a(e,`unknown icon "${e}", showing ${u}.`),o=u);const c=o?y(o):null;this.setVar({"--icon-color":t,"--icon-size":r,"--icon-url":c&&`url("${c}")`}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}}l.init("svg-icon");export{l as default,y as iconUrl,w as localUrl,k as resolveIcon};
