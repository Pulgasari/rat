var u=Object.defineProperty;var l=(c,t)=>u(c,"name",{value:t,configurable:!0});import{a as g,K as d,h as o}from"./index-Cr8BofFF.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as h}from"./template-CFyM26us.js";import"https://esm.sh/jsr/@pulgasari/logger";const r="…";class p extends g{static{l(this,"NavPaginate")}static internals={role:"navigation"};static attr={around:1,items:":scope > *",label:"Pagination",page:1,pages:1,size:10,target:String};static styles=`nav-paginate {
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
  }`;hidden=new Set;get container(){const{target:t}=this.getAttr();return t?d(t):null}get list(){const t=this.container;return t?[...t.querySelectorAll(this.getAttr("items"))]:null}get count(){const t=this.list;return t?Math.max(1,Math.ceil(t.length/Math.max(1,this.getAttr("size")))):Math.max(1,this.getAttr("pages"))}get current(){return Math.min(this.count,Math.max(1,Math.round(this.getAttr("page"))))}onConnected(){this.on("click","button[data-page]",(t,e)=>this.go(Number(e.dataset.page))),this.watch(),this.track(()=>this.reveal())}onAttributeChanged(t){t==="target"&&(this.reveal(),this.watch())}go(t){const e=Math.min(this.count,Math.max(1,t));e!==this.current&&(this.setAttribute("page",e),this.emit("nav-paginate",{page:e,pages:this.count}))}watch(){this._stopWatching?.(),this._stopWatching=null;const t=this.container;if(!t)return;const e=new MutationObserver(()=>this.update());e.observe(t,{childList:!0}),this._stopWatching=this.track(()=>e.disconnect())}numbers(){const{around:t}=this.getAttr(),e=this.count,i=this.current,a=[];for(let n=1;n<=e;n++){const s=Math.abs(n-i)<=t;n===1||n===e||s?a.push(n):a.at(-1)!==r&&a.push(r)}return a}render(){const t=this.current,e=this.count;return o`
      <ol>
        <li><button type="button" aria-label="previous page" ...${h({"data-page":t-1,disabled:t<=1})}>‹</button></li>
        ${this.numbers().map(i=>i===r?o`<li aria-hidden="true">${r}</li>`:o`<li><button type="button" ...${h({"aria-current":i===t&&"page","data-page":i})}>${i}</button></li>`)}
        <li><button type="button" aria-label="next page" ...${h({"data-page":t+1,disabled:t>=e})}>›</button></li>
      </ol>
    `}sync(){this.internals&&(this.internals.ariaLabel=this.getAttr("label"));const t=this.list;if(!t)return;const e=Math.max(1,this.getAttr("size")),i=(this.current-1)*e;t.forEach((a,n)=>{const s=n<i||n>=i+e;a.hidden=s,s?this.hidden.add(a):this.hidden.delete(a)})}reveal(){for(const t of this.hidden)t.hidden=!1;this.hidden.clear()}}p.init();export{p as default};
