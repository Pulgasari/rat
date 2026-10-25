var A=Object.defineProperty;var o=(s,t)=>A(s,"name",{value:t,configurable:!0});import{K as D,L as v,Q as I,T as K,M as x,v as E,x as T,a as j,h as n}from"./index-CyRt1GIe.js";import{isFn as w,isArray as y}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{i as C}from"./import-n7zfmJr1.js";import{g as F}from"./getValue-Dlbw6ynr.js";import"https://esm.sh/jsr/@pulgasari/logger";const N="auto-asc",z=/[̀-ͯ]/g,B=/\d+/g,L=/^[\x00-\x7f]*$/,g=o(s=>{let t=String(s);return L.test(t)||(t=t.normalize("NFD").replace(z,"")),t.toLowerCase().replace(B,e=>e.padStart(16,"0"))},"textKey"),_=o(s=>T(s)?.getTime()??null,"dateKey"),$={date:o(s=>s.map(_),"date"),num:o(s=>s.map(E),"num"),regular:o(s=>s.map(g),"regular"),auto:o(s=>{const t=s.map(_);return t.every((e,a)=>e!==null||s[a]==="")&&t.some(e=>e!==null)?t:s.map(g)},"auto")},O=o((s,t,e)=>s===null&&t===null?0:s===null?1:t===null?-1:s<t?-e:s>t?e:0,"compareKeys");function R({selector:s,order:t},e){const a=s?x(s):null,c=e.map(d=>F(a?d.querySelector(a):d)??"");if(w(t))return{values:c,order:t};const[r,i]=t.includes("-")?t.split("-"):["auto",t];return{keys:($[r]??$.auto)(c),dir:i==="desc"?-1:1}}o(R,"column");function V({container:s,item:t,indicators:e}){const a=D("sortElements",s,t);if(!a)return[];const{$container:c,items:r}=a,i=v(e,K(N));if(i.some(d=>d.order==="random"))I(r);else{const d=i.map(l=>R(l,r)),p=r.map((l,u)=>u);p.sort((l,u)=>{for(const{dir:k,keys:h,order:m,values:f}of d){const b=m?m(f[l],f[u],r[l],r[u]):O(h[l],h[u],k);if(b)return b}return 0});const S=p.map(l=>r[l]);r.splice(0,r.length,...S)}return c.append(...r),r}o(V,"sortElements");class q extends j{static{o(this,"DataTable")}static attr={columns:String,sortable:Boolean,src:String};static styles=`data-table {
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
  }`;set data(t){this._data=t,this._loadedSrc=null,this.invalidate().update()}get data(){return this._data}onConnected(){this.on("click","th[data-key] > button",(t,e)=>this.sortBy(e.parentElement.dataset.key))}sortBy(t){const e=this._sortKey===t&&this._sortDir!=="desc";this._sortKey=t,this._sortDir=e?"desc":"asc",V({container:this.$("tbody").node,item:"tr",indicators:[[`[data-key="${t}"]`,`auto-${this._sortDir}`]]}),this.sync(),this.emit("data-table-sort",{key:t,direction:this._sortDir})}async update(){const{src:t}=this.getAttr();if(t&&t!==this._loadedSrc){this._loadedSrc=t,this.setSkeleton(!0);try{this._data=await C(t)}catch(e){console.warn(`[data-table] could not load table data from "${t}":`,e),this._error="Failed to load table data."}this.setSkeleton(!1)}return super.update()}get rows(){let t=Array.isArray(this._data)?this._data:[this._data];if(t.length===1&&typeof t[0]=="object"&&!y(t[0])){const e=Object.values(t[0])[0];y(e)&&(t=e)}return t}get keys(){const{columns:t}=this.getAttr();if(t)return t.split(",").map(a=>a.trim());const e=this.rows[0];return typeof e=="object"&&e!==null?Object.keys(e):["Value"]}render(){if(this._error)return n`<p role="alert">${this._error}</p>`;if(!this._data)return n`<p role="status">No data available</p>`;const t=this.rows,e=this.keys,a=this.getAttr("sortable");if(!t.length)return n`<p role="status">No entries</p>`;const c=o(r=>a?n`<button type="button">${r}</button>`:r,"head");return n`
      <table>
        <thead>
          <tr>${e.map(r=>n`<th scope="col" data-key="${r}">${c(r)}</th>`)}</tr>
        </thead>
        <tbody>
          ${t.map(r=>typeof r=="object"&&r!==null?n`<tr>${e.map(i=>n`<td data-key="${i}">${r[i]===!0?"true":r[i]??""}</td>`)}</tr>`:n`<tr><td>${r}</td></tr>`)}
        </tbody>
      </table>
    `}sync(){const t=this.getAttr("sortable");for(const e of this.$$("th[data-key]")){const a=t&&e.dataset.key===this._sortKey;t?e.setAttribute("aria-sort",a?this._sortDir==="desc"?"descending":"ascending":"none"):e.removeAttribute("aria-sort")}}}q.init();export{q as default};
