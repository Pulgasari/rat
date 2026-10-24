var d=Object.defineProperty;var b=(a,t,e)=>t in a?d(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var p=(a,t)=>d(a,"name",{value:t,configurable:!0});var h=(a,t,e)=>b(a,typeof t!="symbol"?t+"":t,e);import{a as m,t as f,h as l}from"./index-zRU6UDoC.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as u}from"./template-BNIvHboi.js";import"https://esm.sh/jsr/@pulgasari/logger";const c="…",r=class r extends m{hidden=new Set;get container(){const{target:t}=this.getAttr();return t?f(t):null}get list(){const t=this.container;return t?[...t.querySelectorAll(this.getAttr("items"))]:null}get count(){const t=this.list;return t?Math.max(1,Math.ceil(t.length/Math.max(1,this.getAttr("size")))):Math.max(1,this.getAttr("pages"))}get current(){return Math.min(this.count,Math.max(1,Math.round(this.getAttr("page"))))}onConnected(){this.on("click","button[data-page]",(t,e)=>this.go(Number(e.dataset.page))),this.watch(),this.track(()=>this.reveal())}onAttributeChanged(t){t==="target"&&(this.reveal(),this.watch())}go(t){const e=Math.min(this.count,Math.max(1,t));e!==this.current&&(this.setAttribute("page",e),this.emit("nav-paginate",{page:e,pages:this.count}))}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const e=new MutationObserver(()=>this.update());e.observe(t,{childList:!0}),this._stopWatching=this.track(()=>e.disconnect())}numbers(){const{around:t}=this.getAttr(),e=this.count,i=this.current,s=[];for(let n=1;n<=e;n++){const o=Math.abs(n-i)<=t;n===1||n===e||o?s.push(n):s.at(-1)!==c&&s.push(c)}return s}render(){const t=this.current,e=this.count;return l`
      <ol>
        <li><button type="button" aria-label="previous page" ...${u({"data-page":t-1,disabled:t<=1})}>‹</button></li>
        ${this.numbers().map(i=>i===c?l`<li aria-hidden="true">${c}</li>`:l`<li><button type="button" ...${u({"aria-current":i===t&&"page","data-page":i})}>${i}</button></li>`)}
        <li><button type="button" aria-label="next page" ...${u({"data-page":t+1,disabled:t>=e})}>›</button></li>
      </ol>
    `}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"));const t=this.list;if(!t)return;const e=Math.max(1,this.getAttr("size")),i=(this.current-1)*e;t.forEach((s,n)=>{const o=n<i||n>=i+e;s.hidden=o,o?this.hidden.add(s):this.hidden.delete(s)})}reveal(){for(const t of this.hidden)t.hidden=!1;this.hidden.clear()}};p(r,"NavPaginate"),h(r,"internals",{role:"navigation"}),h(r,"attr",{around:1,items:":scope > *",label:"Pagination",page:1,pages:1,size:10,target:String}),h(r,"styles",`nav-paginate {
    display: block;

    > ol {
      align-items : center;
      display     : flex;
      flex-wrap   : wrap;
      gap         : --space(tiny);
      list-style  : none;
      margin      : 0;
      padding     : 0;
    }

    button {
      min-inline-size : 2em;
      text-align      : center;

      &[aria-current="page"] { font-weight: 700; }
    }
  }`);let g=r;g.init();export{g as default};
