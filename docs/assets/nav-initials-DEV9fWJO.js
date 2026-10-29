var b=Object.defineProperty;var d=(p,t)=>b(p,"name",{value:t,configurable:!0});import{a as y,K as v,h as g}from"./index-B87tVqli.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as w}from"./template-DdVeaqko.js";import{l as m}from"./locale-CyKX5eGQ.js";import"https://esm.sh/jsr/@pulgasari/logger";const h="#";class _ extends y{static{d(this,"NavInitials")}static internals={role:"navigation"};static attr={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",empty:Boolean,items:":scope > *",label:"Index",order:{type:String,default:"asc",values:["asc","desc"]},target:String,text:String};static styles=`nav-initials {
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
  }`;get container(){const{target:t}=this.getAttr();return t?v(t):null}onConnected(){this.on("click","button[data-initial]",(t,e)=>{const s=this._groups?.get(e.dataset.initial);s?.length&&(s[0].scrollIntoView({behavior:"smooth",block:"start"}),this.emit("nav-initials",{initial:e.dataset.initial,items:s}))}),this.watch()}onAttributeChanged(t){t==="target"&&this.watch()}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const e=new MutationObserver(()=>{this._rescanQueued||(this._rescanQueued=!0,queueMicrotask(()=>{this._rescanQueued=!1,this.update()}))});e.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._stopWatching=this.track(()=>e.disconnect())}collect(){const t=this.container,e=new Map;if(!t)return e;const{alphabet:s,items:c,text:a}=this.getAttr(),r=new Intl.Collator(m(this),{sensitivity:"base"}),o=[...s];for(const i of t.querySelectorAll(c)){const l=[...((a?i.querySelector(a):i)?.textContent??"").trim()][0]?.toLocaleUpperCase();if(!l)continue;const u=/\p{L}/u.test(l)?o.find(f=>r.compare(f,l)===0)??l:h;e.has(u)||e.set(u,[]),e.get(u).push(i)}return e}render(){const{alphabet:t,empty:e,label:s,order:c}=this.getAttr(),a=new Intl.Collator(m(this),{sensitivity:"base"});this._groups=this.collect();const r=new Set(e?[...t]:[]);for(const i of this._groups.keys())r.add(i);const o=[...r].sort((i,n)=>i===h?-1:n===h?1:a.compare(i,n));return c==="desc"&&o.reverse(),g`
      <ol aria-label="${s}">
        ${o.map(i=>{const n=this._groups.get(i)?.length??0;return g`<li><button type="button" ...${w({"data-initial":i,disabled:!n,title:n})}>${i}</button></li>`})}
      </ol>
    `}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"))}}_.init();export{_ as default};
