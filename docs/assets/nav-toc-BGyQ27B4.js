var f=Object.defineProperty;var v=(s,t,e)=>t in s?f(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var d=(s,t)=>f(s,"name",{value:t,configurable:!0});var h=(s,t,e)=>v(s,typeof t!="symbol"?t+"":t,e);import{a as m,y as b,z as $,E as A,h as u}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import{toSlugCase as x}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const l=class l extends m{get container(){const{target:t}=this.getAttr();return t?b(t):null}onConnected(){this.watch()}onAttributeChanged(t){(t==="target"||t==="selector")&&this.watch()}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const e=d(()=>{this._rescanQueued||(this._rescanQueued=!0,queueMicrotask(()=>{this._rescanQueued=!1,this.invalidate().update()}))},"rescan");this._stopWatching=this.track($(this.getAttr("selector"),{within:t,onInit:e,onAdded:e,onRemoved:e}))}collect(){const t=this.container;if(!t)return[];const e=new Set;return A(this.getAttr("selector"),t).map((i,o)=>{const n=i.textContent?.trim()||"",c=Number(/^H([1-6])$/i.exec(i.tagName)?.[1]??i.dataset.level??1);if(!i.id){const r=x(n)||`heading-${o}`;let a=r;for(let p=2;e.has(a)||document.getElementById(a);p++)a=`${r}-${p}`;i.id=a}return e.add(i.id),{heading:i,id:i.id,level:c,text:n}})}render(){return this._entries=this.collect(),this._entries.length?u`
      <header>${this.getAttr("label")}</header>
      <ol>
        ${this._entries.map(t=>u`
          <li aria-level="${t.level}"><a href="#${t.id}">${t.text}</a></li>
        `)}
      </ol>
    `:u``}onRender(){this.spy()}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"))}spy(){this._stopSpy?.();const t=this._entries??[];if(!t.length||typeof IntersectionObserver>"u")return;const e=new Set,i=new Map(t.map(n=>[n.heading,this.$(`a[href="#${CSS.escape(n.id)}"]`).node])),o=new IntersectionObserver(n=>{for(const r of n)e[r.isIntersecting?"add":"delete"](r.target);const c=t.find(r=>e.has(r.heading));if(c)for(const[r,a]of i)r===c.heading?a?.setAttribute("aria-current","location"):a?.removeAttribute("aria-current")},{rootMargin:"0px 0px -60% 0px"});for(const n of t)o.observe(n.heading);this._stopSpy=this.track(()=>o.disconnect())}};d(l,"NavToc"),h(l,"internals",{role:"navigation"}),h(l,"attr",{label:"On This Page",selector:"h1, h2, h3, h4, h5, h6",target:String}),h(l,"styles",`nav-toc {
    display: block;

    > ol {
      list-style : none;
      margin     : 0;
      padding    : 0;
    }

    li {
      padding-inline-start: calc((var(--toc-level, 1) - 1) * var(--toc-indent, --space(normal)));

      &[aria-level="2"] { --toc-level: 2; }
      &[aria-level="3"] { --toc-level: 3; }
      &[aria-level="4"] { --toc-level: 4; }
      &[aria-level="5"] { --toc-level: 5; }
      &[aria-level="6"] { --toc-level: 6; }
    }
  }`);let g=l;g.init();export{g as default};
