var b=Object.defineProperty;var r=(n,t)=>b(n,"name",{value:t,configurable:!0});import{a as $}from"./index-DQDrUPsl.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const k="https://api.iconify.design",s="@aufbau/svg/aliases.js",d="material-symbols:help",f={aufbau:"@aufbau/svg/icons/"},p=new Map,v=new Map,m=new Set;let w=null,g=!1;const h=r(n=>/^(\.{0,2}\/|https?:|data:)/.test(n),"isFile"),l=r((n,t)=>{m.has(n)||(m.add(n),console.warn(`[svg-icon] ${t}`))},"warnOnce");function y(n){if(!n)return null;if(h(n))return n;const t=String(n).trim().replace("/",":");return t.includes(":")?t:p.get(t)??null}r(y,"resolveIcon");function S(n,t){try{return import.meta.resolve(`${n}${t}.svg`)}catch{return l(n,`"${n}" could not be resolved, add it to the importmap.`),null}}r(S,"localUrl");function z(n){if(h(n))return n;const t=v.get(n);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[e,...i]=n.split(":"),o=i.join(":");return!e||!o?null:f[e]?S(f[e],o):`${k}/${encodeURIComponent(e)}/${encodeURIComponent(o)}.svg`}r(z,"iconUrl");class c extends ${static{r(this,"SvgIcon")}static attr={color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String};static styles=`svg-icon {
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
  }`;static register(t){for(const[e,i]of Object.entries(t??{}))p.set(e,i);return this}static provide(t){for(const[e,i]of Object.entries(t??{}))v.set(e,i);return this}static loadDefaults(){return w??=import(s).then(t=>{this.register(t.default)}).catch(t=>l(s,`default aliases unavailable, "${s}" could not be imported: ${t?.message??t}`)).finally(()=>{g=!0})}sync(){const{color:t,icon:e,label:i,size:o}=this.getAttr();let a=y(e);if(e&&!a&&!g){c.loadDefaults().then(()=>this.update());return}e&&!a&&(l(e,`unknown icon "${e}", showing ${d}.`),a=d);const u=a?z(a):null;this.setVar({"--icon-color":t,"--icon-size":o,"--icon-url":u&&`url("${u}")`}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}}c.init();export{c as default,z as iconUrl,S as localUrl,y as resolveIcon};
