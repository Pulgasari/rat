import{a as p,h as i}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as h}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";class u extends p{static internals={role:"navigation"};static attr={href:String,label:"breadcrumb",max:Number,path:String,root:String,separator:"/"};static styles=`nav-crumbs {
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
  }`;get crumbs(){const{path:e,root:a,separator:t}=this.getAttr();if(e==null)return[];const r=String(e).split(t).filter(Boolean),o=String(e).startsWith(t)?t:"",s=r.map((l,n)=>({label:l,path:o+r.slice(0,n+1).join(t)}));return a?[{label:a,path:o||t},...s]:s}onConnected(){this.on("click","button[data-path]",(a,t)=>{const r=Number(t.dataset.index);this.emit("nav-crumbs",{index:r,path:t.dataset.path})}),this.on("click","button[data-expand]",()=>{this._expanded=!0,this.update()});const e=new MutationObserver(()=>this.sync());e.observe(this,{childList:!0}),this.track(()=>e.disconnect())}onAttributeChanged(e){e==="path"&&(this._expanded=!1)}render(){if(this.getAttr("path")==null)return null;const{href:e,max:a}=this.getAttr(),t=this.crumbs,r=t.length-1,s=a>1&&t.length>a&&!this._expanded?[t[0],null,...t.slice(t.length-(a-1))]:t,l=n=>{if(!n)return i`<button type="button" data-expand aria-label="show full path">…</button>`;const c=t.indexOf(n);return c===r?i`<span aria-current="page">${n.label}</span>`:e?i`<a href="${e.replaceAll("{path}",encodeURIComponent(n.path))}">${n.label}</a>`:i`<button type="button" ...${h({"data-index":c,"data-path":n.path})}>${n.label}</button>`};return i`${s.map(l)}`}sync(){if(this.internals&&(this.internals.ariaLabel=this.getAttr("label")),this.getAttr("path")!=null)return;const e=[...this.children];e.forEach((a,t)=>{t===e.length-1?a.hasAttribute("aria-current")||a.setAttribute("aria-current","page"):a.getAttribute("aria-current")==="page"&&a.removeAttribute("aria-current")})}}u.init("nav-crumbs");export{u as default};
