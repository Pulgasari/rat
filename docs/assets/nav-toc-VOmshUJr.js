import{a as h,t as d,u,v,h as l}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import{toSlugCase as g}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class p extends h{static internals={role:"navigation"};static attr={label:"On This Page",selector:"h1, h2, h3, h4, h5, h6",target:String};static styles=`nav-toc {
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
  }`;get container(){const{target:t}=this.getAttr();return t?d(t):null}onConnected(){this.watch()}onAttributeChanged(t){(t==="target"||t==="selector")&&this.watch()}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const i=()=>{this._rescanQueued||(this._rescanQueued=!0,queueMicrotask(()=>{this._rescanQueued=!1,this.invalidate().update()}))};this._stopWatching=this.track(u(this.getAttr("selector"),{within:t,onInit:i,onAdded:i,onRemoved:i}))}collect(){const t=this.container;if(!t)return[];const i=new Set;return v(this.getAttr("selector"),t).map((e,a)=>{const n=e.textContent?.trim()||"",o=Number(/^H([1-6])$/i.exec(e.tagName)?.[1]??e.dataset.level??1);if(!e.id){const r=g(n)||`heading-${a}`;let s=r;for(let c=2;i.has(s)||document.getElementById(s);c++)s=`${r}-${c}`;e.id=s}return i.add(e.id),{heading:e,id:e.id,level:o,text:n}})}render(){return this._entries=this.collect(),this._entries.length?l`
      <header>${this.getAttr("label")}</header>
      <ol>
        ${this._entries.map(t=>l`
          <li aria-level="${t.level}"><a href="#${t.id}">${t.text}</a></li>
        `)}
      </ol>
    `:l``}onRender(){this.spy()}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"))}spy(){this._stopSpy?.();const t=this._entries??[];if(!t.length||typeof IntersectionObserver>"u")return;const i=new Set,e=new Map(t.map(n=>[n.heading,this.$(`a[href="#${CSS.escape(n.id)}"]`).node])),a=new IntersectionObserver(n=>{for(const r of n)i[r.isIntersecting?"add":"delete"](r.target);const o=t.find(r=>i.has(r.heading));if(o)for(const[r,s]of e)r===o.heading?s?.setAttribute("aria-current","location"):s?.removeAttribute("aria-current")},{rootMargin:"0px 0px -60% 0px"});for(const n of t)a.observe(n.heading);this._stopSpy=this.track(()=>a.disconnect())}}p.init("nav-toc");export{p as default};
