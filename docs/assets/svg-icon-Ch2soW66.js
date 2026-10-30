var b=Object.defineProperty;var r=(e,t)=>b(e,"name",{value:t,configurable:!0});import{a as $,_ as k}from"./index-DlJ9mHnL.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const w="https://api.iconify.design",d="@aufbau/svg/aliases.js",f="material-symbols:help",m={aufbau:"@aufbau/svg/icons/"},s=new Map,v=new Map,p=new Set;let y=null,g=!1;const h=r(e=>/^(\.{0,2}\/|https?:|data:)/.test(e),"isFile"),l=r((e,t)=>{p.has(e)||(p.add(e),console.warn(`[svg-icon] ${t}`))},"warnOnce");function A(e){if(!e)return null;if(h(e))return e;const t=String(e).trim().replace("/",":");return t.includes(":")?t:s.get(t)??null}r(A,"resolveIcon");function L(e,t){try{return import.meta.resolve(`${e}${t}.svg`)}catch{return l(e,`"${e}" could not be resolved, add it to the importmap.`),null}}r(L,"localUrl");function S(e){if(h(e))return e;const t=v.get(e);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[n,...i]=e.split(":"),o=i.join(":");return!n||!o?null:m[n]?L(m[n],o):`${w}/${encodeURIComponent(n)}/${encodeURIComponent(o)}.svg`}r(S,"iconUrl");class c extends ${static{r(this,"SvgIcon")}static attr={color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String};static styles=`svg-icon {
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
  }`;static register(t){for(const[n,i]of Object.entries(t??{}))s.set(n,i);return this}static provide(t){for(const[n,i]of Object.entries(t??{}))v.set(n,i);return this}static loadDefaults(){return y??=k(()=>import("./aliases-mNqufWew.js"),[],import.meta.url).then(t=>{for(const[n,i]of Object.entries(t.default??{}))s.has(n)||s.set(n,i)}).catch(t=>l(d,`default aliases unavailable, "${d}" could not be imported: ${t?.message??t}`)).finally(()=>{g=!0})}sync(){const{color:t,icon:n,label:i,size:o}=this.getAttr();let a=A(n);if(n&&!a&&!g){c.loadDefaults().then(()=>this.update());return}n&&!a&&(l(n,`unknown icon "${n}", showing ${f}.`),a=f);const u=a?S(a):null;this.setVar({"--icon-color":t,"--icon-size":o,"--icon-url":u&&`url("${u}")`}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}}c.init();export{c as default,S as iconUrl,L as localUrl,A as resolveIcon};
