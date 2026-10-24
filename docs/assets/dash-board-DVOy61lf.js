var m=Object.defineProperty;var c=(s,t,e)=>t in s?m(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t)=>m(s,"name",{value:t,configurable:!0});var l=(s,t,e)=>c(s,typeof t!="symbol"?t+"":t,e);import{a as p,_ as u}from"./index-CJDrpzke.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const a=class a extends p{get panels(){return[...this.children].filter(t=>t.localName==="dash-panel")}render(){return null}onConnected(){this.restore(),this.syncSortable(),this._resize=new ResizeObserver(()=>this.measure()),this._resize.observe(this)}onDisconnected(){this._resize?.disconnect(),this._sort?.destroy(),this._resize=this._sort=null}onAttributeChanged(t){t==="sortable"&&this.syncSortable()}measure(){const t=getComputedStyle(this).gridTemplateColumns.split(" ").filter(Boolean).length;t!==this._columns&&this.setVar("--dash-columns",String(this._columns=t||1))}nameOf=o(t=>t.getAttribute("name")??t.id??"","nameOf");get order(){return this.panels.map(this.nameOf)}restore(){const t=this.getAttr("persist");if(!t)return;let e;try{e=JSON.parse(localStorage.getItem(t))}catch{return}if(!Array.isArray(e))return;const n=o(r=>{const i=e.indexOf(r);return i<0?e.length:i},"rank"),h=this.panels.map((r,i)=>({index:i,panel:r,rank:n(this.nameOf(r))})).sort((r,i)=>r.rank-i.rank||r.index-i.index);for(const{panel:r}of h)this.append(r)}save(){const t=this.getAttr("persist");if(t)try{localStorage.setItem(t,JSON.stringify(this.order))}catch{}}async syncSortable(){this._sort?.destroy(),this._sort=null;const t=this._sortToken=(this._sortToken??0)+1;if(!this.getAttr("sortable"))return;const{sortable:e}=await u(async()=>{const{sortable:n}=await import("./index-C3MfxrKq.js");return{sortable:n}},[],import.meta.url);t!==this._sortToken||!this._mounted||(this._sort=e(this,{handle:'[part~="header"]',items:"dash-panel",onSort:o(({from:n,to:h})=>{this.save(),this.emit("sort",{from:n,order:this.order,to:h})},"onSort")}))}};o(a,"DashBoard"),l(a,"reflect",["sortable"]),l(a,"attr",{columns:{type:String,var:"--dash-fixed"},gap:{type:String,var:"--dash-gap"},min:{type:String,var:"--dash-min"},persist:String,sortable:Boolean}),l(a,"styles",`dash-board {
    display               : grid;
    gap                   : var(--dash-gap, --space(normal));
    grid-auto-flow        : dense;
    grid-template-columns : repeat(auto-fill, minmax(min(var(--dash-min, 18rem), 100%), 1fr));

    &[columns] { grid-template-columns: repeat(var(--dash-fixed), minmax(0, 1fr)); }

    &[sortable] > dash-panel::part(header) { cursor: grab; }

    > dash-panel[data-dragging] {
      box-shadow : 0 0.5rem 1.5rem color-mix(in oklab, black 35%, transparent);
      opacity    : 0.92;

      &::part(header) { cursor: grabbing; }
    }
  }`);let d=a;d.init();export{d as default};
