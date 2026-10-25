var h=Object.defineProperty;var b=(a,t,e)=>t in a?h(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var l=(a,t)=>h(a,"name",{value:t,configurable:!0});var d=(a,t,e)=>b(a,typeof t!="symbol"?t+"":t,e);import{a as m,v as y,h as r}from"./index-HgPxnqYB.js";import{isArray as u}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{i as f}from"./import-n7zfmJr1.js";import"https://esm.sh/jsr/@pulgasari/logger";const i=class i extends m{set data(t){this._data=t,this._loadedSrc=null,this.invalidate().update()}get data(){return this._data}onConnected(){this.on("click","th[data-key] > button",(t,e)=>this.sortBy(e.parentElement.dataset.key))}sortBy(t){const e=this._sortKey===t&&this._sortDir!=="desc";this._sortKey=t,this._sortDir=e?"desc":"asc",y({container:this.$("tbody").node,item:"tr",indicators:[[`[data-key="${t}"]`,`auto-${this._sortDir}`]]}),this.sync(),this.emit("data-table-sort",{key:t,direction:this._sortDir})}async update(){const{src:t}=this.getAttr();if(t&&t!==this._loadedSrc){this._loadedSrc=t,this.setSkeleton(!0);try{this._data=await f(t)}catch(e){console.warn(`[data-table] could not load table data from "${t}":`,e),this._error="Failed to load table data."}this.setSkeleton(!1)}return super.update()}get rows(){let t=Array.isArray(this._data)?this._data:[this._data];if(t.length===1&&typeof t[0]=="object"&&!u(t[0])){const e=Object.values(t[0])[0];u(e)&&(t=e)}return t}get keys(){const{columns:t}=this.getAttr();if(t)return t.split(",").map(o=>o.trim());const e=this.rows[0];return typeof e=="object"&&e!==null?Object.keys(e):["Value"]}render(){if(this._error)return r`<p role="alert">${this._error}</p>`;if(!this._data)return r`<p role="status">No data available</p>`;const t=this.rows,e=this.keys,o=this.getAttr("sortable");if(!t.length)return r`<p role="status">No entries</p>`;const p=l(s=>o?r`<button type="button">${s}</button>`:s,"head");return r`
      <table>
        <thead>
          <tr>${e.map(s=>r`<th scope="col" data-key="${s}">${p(s)}</th>`)}</tr>
        </thead>
        <tbody>
          ${t.map(s=>typeof s=="object"&&s!==null?r`<tr>${e.map(n=>r`<td data-key="${n}">${s[n]===!0?"true":s[n]??""}</td>`)}</tr>`:r`<tr><td>${s}</td></tr>`)}
        </tbody>
      </table>
    `}sync(){const t=this.getAttr("sortable");for(const e of this.$$("th[data-key]")){const o=t&&e.dataset.key===this._sortKey;t?e.setAttribute("aria-sort",o?this._sortDir==="desc"?"descending":"ascending":"none"):e.removeAttribute("aria-sort")}}};l(i,"DataTable"),d(i,"attr",{columns:String,sortable:Boolean,src:String}),d(i,"styles",`data-table {
    --skeleton-line  : 1.5em;
    --skeleton-lines : 5;

    display    : block;
    overflow-x : auto;

    > table { border-collapse: collapse; inline-size: 100%; }

    th > button {
      background  : none;
      border      : 0;
      color       : inherit;
      cursor      : pointer;
      font        : inherit;
      inline-size : 100%;
      margin      : 0;
      padding     : 0;
      text-align  : inherit;
    }
  }`);let c=i;c.init();export{c as default};
