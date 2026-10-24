var m=Object.defineProperty;var w=(e,t,n)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var r=(e,t)=>m(e,"name",{value:t,configurable:!0});var l=(e,t,n)=>w(e,typeof t!="symbol"?t+"":t,n);import{a as y}from"./index-CfkG_3cO.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const z="https://api.iconify.design",c="@aufbau/svg/aliases.js",p="material-symbols:help",g={aufbau:"@aufbau/svg/icons/"},b=new Map,$=new Map,h=new Set;let A=null,v=!1;const k=r(e=>/^(\.{0,2}\/|https?:|data:)/.test(e),"isFile"),u=r((e,t)=>{h.has(e)||(h.add(e),console.warn(`[svg-icon] ${t}`))},"warnOnce");function L(e){if(!e)return null;if(k(e))return e;const t=String(e).trim().replace("/",":");return t.includes(":")?t:b.get(t)??null}r(L,"resolveIcon");function C(e,t){try{return import.meta.resolve(`${e}${t}.svg`)}catch{return u(e,`"${e}" could not be resolved, add it to the importmap.`),null}}r(C,"localUrl");function U(e){if(k(e))return e;const t=$.get(e);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[n,...i]=e.split(":"),s=i.join(":");return!n||!s?null:g[n]?C(g[n],s):`${z}/${encodeURIComponent(n)}:${encodeURIComponent(s)}.svg`}r(U,"iconUrl");const a=class a extends y{static register(t){for(const[n,i]of Object.entries(t??{}))b.set(n,i);return this}static provide(t){for(const[n,i]of Object.entries(t??{}))$.set(n,i);return this}static loadDefaults(){return A??=import(c).then(t=>{this.register(t.default)}).catch(t=>u(c,`default aliases unavailable, "${c}" could not be imported: ${t?.message??t}`)).finally(()=>{v=!0})}sync(){const{color:t,icon:n,label:i,size:s}=this.getAttr();let o=L(n);if(n&&!o&&!v){a.loadDefaults().then(()=>this.update());return}n&&!o&&(u(n,`unknown icon "${n}", showing ${p}.`),o=p);const f=o?U(o):null;this.setVar({"--icon-color":t,"--icon-size":s,"--icon-url":f&&`url("${f}")`}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}};r(a,"SvgIcon"),l(a,"attr",{color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String}),l(a,"styles",`svg-icon {
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
  }`);let d=a;d.init();export{d as default,U as iconUrl,C as localUrl,L as resolveIcon};
