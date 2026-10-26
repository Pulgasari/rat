var c=Object.defineProperty;var i=(n,t)=>c(n,"name",{value:t,configurable:!0});import{a as h,h as r}from"./index-DSHtYu-_.js";import{isArray as l}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{i as u}from"./import-n7zfmJr1.js";import{s as p}from"./docs.rat-Dy8OTdiz.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";class b extends h{static{i(this,"DataTable")}static attr={columns:String,sortable:Boolean,src:String};static styles=`data-table {
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
  }`;set data(t){this._data=t,this._loadedSrc=null,this.invalidate().update()}get data(){return this._data}onConnected(){this.on("click","th[data-key] > button",(t,e)=>this.sortBy(e.parentElement.dataset.key))}sortBy(t){const e=this._sortKey===t&&this._sortDir!=="desc";this._sortKey=t,this._sortDir=e?"desc":"asc",p({container:this.$("tbody").node,item:"tr",indicators:[[`[data-key="${t}"]`,`auto-${this._sortDir}`]]}),this.sync(),this.emit("data-table-sort",{key:t,direction:this._sortDir})}async update(){const{src:t}=this.getAttr();if(t&&t!==this._loadedSrc){this._loadedSrc=t,this.setSkeleton(!0);try{this._data=await u(t)}catch(e){console.warn(`[data-table] could not load table data from "${t}":`,e),this._error="Failed to load table data."}this.setSkeleton(!1)}return super.update()}get rows(){let t=Array.isArray(this._data)?this._data:[this._data];if(t.length===1&&typeof t[0]=="object"&&!l(t[0])){const e=Object.values(t[0])[0];l(e)&&(t=e)}return t}get keys(){const{columns:t}=this.getAttr();if(t)return t.split(",").map(a=>a.trim());const e=this.rows[0];return typeof e=="object"&&e!==null?Object.keys(e):["Value"]}render(){if(this._error)return r`<p role="alert">${this._error}</p>`;if(!this._data)return r`<p role="status">No data available</p>`;const t=this.rows,e=this.keys,a=this.getAttr("sortable");if(!t.length)return r`<p role="status">No entries</p>`;const d=i(s=>a?r`<button type="button">${s}</button>`:s,"head");return r`
      <table>
        <thead>
          <tr>${e.map(s=>r`<th scope="col" data-key="${s}">${d(s)}</th>`)}</tr>
        </thead>
        <tbody>
          ${t.map(s=>typeof s=="object"&&s!==null?r`<tr>${e.map(o=>r`<td data-key="${o}">${s[o]===!0?"true":s[o]??""}</td>`)}</tr>`:r`<tr><td>${s}</td></tr>`)}
        </tbody>
      </table>
    `}sync(){const t=this.getAttr("sortable");for(const e of this.$$("th[data-key]")){const a=t&&e.dataset.key===this._sortKey;t?e.setAttribute("aria-sort",a?this._sortDir==="desc"?"descending":"ascending":"none"):e.removeAttribute("aria-sort")}}}b.init();export{b as default};
