import{a as l,p as d,h as a}from"./index-CAN6sJ0x.js";import{isArray as i}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{i as c}from"./import-D9lz_U--.js";import"https://esm.sh/jsr/@pulgasari/logger";class h extends l{static attr={columns:String,sortable:Boolean,src:String};static styles=`data-table {
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
  }`;set data(t){this._data=t,this._loadedSrc=null,this.invalidate().update()}get data(){return this._data}onConnected(){this.on("click","th[data-key] > button",(t,e)=>this.sortBy(e.parentElement.dataset.key))}sortBy(t){const e=this._sortKey===t&&this._sortDir!=="desc";this._sortKey=t,this._sortDir=e?"desc":"asc",d({container:this.$("tbody").node,item:"tr",indicators:[[`[data-key="${t}"]`,`auto-${this._sortDir}`]]}),this.sync(),this.emit("data-table-sort",{key:t,direction:this._sortDir})}async update(){const{src:t}=this.getAttr();if(t&&t!==this._loadedSrc){this._loadedSrc=t,this.setSkeleton(!0);try{this._data=await c(t)}catch(e){console.warn(`[data-table] could not load table data from "${t}":`,e),this._error="Failed to load table data."}this.setSkeleton(!1)}return super.update()}get rows(){let t=Array.isArray(this._data)?this._data:[this._data];if(t.length===1&&typeof t[0]=="object"&&!i(t[0])){const e=Object.values(t[0])[0];i(e)&&(t=e)}return t}get keys(){const{columns:t}=this.getAttr();if(t)return t.split(",").map(r=>r.trim());const e=this.rows[0];return typeof e=="object"&&e!==null?Object.keys(e):["Value"]}render(){if(this._error)return a`<p role="alert">${this._error}</p>`;if(!this._data)return a`<p role="status">No data available</p>`;const t=this.rows,e=this.keys,r=this.getAttr("sortable");if(!t.length)return a`<p role="status">No entries</p>`;const n=s=>r?a`<button type="button">${s}</button>`:s;return a`
      <table>
        <thead>
          <tr>${e.map(s=>a`<th scope="col" data-key="${s}">${n(s)}</th>`)}</tr>
        </thead>
        <tbody>
          ${t.map(s=>typeof s=="object"&&s!==null?a`<tr>${e.map(o=>a`<td data-key="${o}">${s[o]===!0?"true":s[o]??""}</td>`)}</tr>`:a`<tr><td>${s}</td></tr>`)}
        </tbody>
      </table>
    `}sync(){const t=this.getAttr("sortable");for(const e of this.$$("th[data-key]")){const r=t&&e.dataset.key===this._sortKey;t?e.setAttribute("aria-sort",r?this._sortDir==="desc"?"descending":"ascending":"none"):e.removeAttribute("aria-sort")}}}h.init("data-table");export{h as default};
