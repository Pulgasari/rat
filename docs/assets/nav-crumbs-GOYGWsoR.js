var f=Object.defineProperty;var g=(r,t,a)=>t in r?f(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a;var u=(r,t)=>f(r,"name",{value:t,configurable:!0});var c=(r,t,a)=>g(r,typeof t!="symbol"?t+"":t,a);import{a as m,h as o}from"./index-CJDrpzke.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as x}from"./template-BbaYBheU.js";import"https://esm.sh/jsr/@pulgasari/logger";const s=class s extends m{get crumbs(){const{path:t,root:a,separator:e}=this.getAttr();if(t==null)return[];const i=String(t).split(e).filter(Boolean),p=String(t).startsWith(e)?e:"",l=i.map((h,n)=>({label:h,path:p+i.slice(0,n+1).join(e)}));return a?[{label:a,path:p||e},...l]:l}onConnected(){this.on("click","button[data-path]",(a,e)=>{const i=Number(e.dataset.index);this.emit("nav-crumbs",{index:i,path:e.dataset.path})}),this.on("click","button[data-expand]",()=>{this._expanded=!0,this.update()});const t=new MutationObserver(()=>this.sync());t.observe(this,{childList:!0}),this.track(()=>t.disconnect())}onAttributeChanged(t){t==="path"&&(this._expanded=!1)}render(){if(this.getAttr("path")==null)return null;const{href:t,max:a}=this.getAttr(),e=this.crumbs,i=e.length-1,l=a>1&&e.length>a&&!this._expanded?[e[0],null,...e.slice(e.length-(a-1))]:e,h=u(n=>{if(!n)return o`<button type="button" data-expand aria-label="show full path">…</button>`;const b=e.indexOf(n);return b===i?o`<span aria-current="page">${n.label}</span>`:t?o`<a href="${t.replaceAll("{path}",encodeURIComponent(n.path))}">${n.label}</a>`:o`<button type="button" ...${x({"data-index":b,"data-path":n.path})}>${n.label}</button>`},"crumb");return o`${l.map(h)}`}sync(){if(this.internals&&(this.internals.ariaLabel=this.getAttr("label")),this.getAttr("path")!=null)return;const t=[...this.children];t.forEach((a,e)=>{e===t.length-1?a.hasAttribute("aria-current")||a.setAttribute("aria-current","page"):a.getAttribute("aria-current")==="page"&&a.removeAttribute("aria-current")})}};u(s,"NavCrumbs"),c(s,"internals",{role:"navigation"}),c(s,"attr",{href:String,label:"breadcrumb",max:Number,path:String,root:String,separator:"/"}),c(s,"styles",`nav-crumbs {
    align-items : center;
    display     : flex;
    flex-wrap   : nowrap;
    gap         : var(--crumbs-gap, --space(tiny));
    min-inline-size : 0;
    overflow    : hidden;

    > * {
      flex            : 0 1 auto;
      min-inline-size : 0;
      overflow        : hidden;
      text-overflow   : ellipsis;
      white-space     : nowrap;
    }

    > :last-child { flex-shrink: 0.2; }

    > * + *::before {
      content            : var(--crumbs-separator, '/');
      opacity            : 0.5;
      padding-inline-end : var(--crumbs-gap, --space(tiny));
    }

    > button {
      background : none;
      border     : 0;
      color      : inherit;
      cursor     : pointer;
      font       : inherit;
      margin     : 0;
      padding    : 0;
    }
  }`);let d=s;d.init();export{d as default};
