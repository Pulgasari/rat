var f=Object.defineProperty;var A=(i,t,e)=>t in i?f(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var b=(i,t)=>f(i,"name",{value:t,configurable:!0});var h=(i,t,e)=>A(i,typeof t!="symbol"?t+"":t,e);import{a as v,t as C,h as y}from"./index-CfkG_3cO.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as S}from"./template-MmwWXFEp.js";import{l as w}from"./locale-CyKX5eGQ.js";import"https://esm.sh/jsr/@pulgasari/logger";const g="#",a=class a extends v{get container(){const{target:t}=this.getAttr();return t?C(t):null}onConnected(){this.on("click","button[data-initial]",(t,e)=>{const n=this._groups?.get(e.dataset.initial);n?.length&&(n[0].scrollIntoView({behavior:"smooth",block:"start"}),this.emit("nav-initials",{initial:e.dataset.initial,items:n}))}),this.watch()}onAttributeChanged(t){t==="target"&&this.watch()}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const e=new MutationObserver(()=>{this._rescanQueued||(this._rescanQueued=!0,queueMicrotask(()=>{this._rescanQueued=!1,this.update()}))});e.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._stopWatching=this.track(()=>e.disconnect())}collect(){const t=this.container,e=new Map;if(!t)return e;const{alphabet:n,items:p,text:o}=this.getAttr(),l=new Intl.Collator(w(this),{sensitivity:"base"}),c=[...n];for(const s of t.querySelectorAll(p)){const u=[...((o?s.querySelector(o):s)?.textContent??"").trim()][0]?.toLocaleUpperCase();if(!u)continue;const d=new RegExp("\\p{L}","u").test(u)?c.find(x=>l.compare(x,u)===0)??u:g;e.has(d)||e.set(d,[]),e.get(d).push(s)}return e}render(){const{alphabet:t,empty:e,label:n,order:p}=this.getAttr(),o=new Intl.Collator(w(this),{sensitivity:"base"});this._groups=this.collect();const l=new Set(e?[...t]:[]);for(const s of this._groups.keys())l.add(s);const c=[...l].sort((s,r)=>s===g?-1:r===g?1:o.compare(s,r));return p==="desc"&&c.reverse(),y`
      <ol aria-label="${n}">
        ${c.map(s=>{const r=this._groups.get(s)?.length??0;return y`<li><button type="button" ...${S({"data-initial":s,disabled:!r,title:r})}>${s}</button></li>`})}
      </ol>
    `}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"))}};b(a,"NavInitials"),h(a,"internals",{role:"navigation"}),h(a,"attr",{alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",empty:Boolean,items:":scope > *",label:"Index",order:{type:String,default:"asc",values:["asc","desc"]},target:String,text:String}),h(a,"styles",`nav-initials {
    display: block;

    > ol {
      display    : flex;
      flex-wrap  : wrap;
      gap        : --space(tiny);
      list-style : none;
      margin     : 0;
      padding    : 0;
    }

    button {
      min-inline-size : 1.75em;
      text-align      : center;

      &:disabled { opacity: 0.35; }
    }
  }`);let m=a;m.init();export{m as default};
