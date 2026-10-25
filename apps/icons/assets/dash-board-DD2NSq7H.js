const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./app.rat-CkcnWh2b.js","./index-BSXhWbFe.js","./index-CpV0yxAr.css","./keys-CWTtq0D5.js","./store-D22fjUgZ.js"])))=>i.map(i=>d[i]);
var l=Object.defineProperty;var n=(o,t)=>l(o,"name",{value:t,configurable:!0});import{a as h,_ as d}from"./index-BSXhWbFe.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class m extends h{static{n(this,"DashBoard")}static reflect=["sortable"];static attr={columns:{type:String,var:"--dash-fixed"},gap:{type:String,var:"--dash-gap"},min:{type:String,var:"--dash-min"},persist:String,sortable:Boolean};static styles=`dash-board {
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
  }`;get panels(){return[...this.children].filter(t=>t.localName==="dash-panel")}render(){return null}onConnected(){this.restore(),this.syncSortable(),this._resize=new ResizeObserver(()=>this.measure()),this._resize.observe(this)}onDisconnected(){this._resize?.disconnect(),this._sort?.destroy(),this._resize=this._sort=null}onAttributeChanged(t){t==="sortable"&&this.syncSortable()}measure(){const t=getComputedStyle(this).gridTemplateColumns.split(" ").filter(Boolean).length;t!==this._columns&&this.setVar("--dash-columns",String(this._columns=t||1))}nameOf=n(t=>t.getAttribute("name")??t.id??"","nameOf");get order(){return this.panels.map(this.nameOf)}restore(){const t=this.getAttr("persist");if(!t)return;let s;try{s=JSON.parse(localStorage.getItem(t))}catch{return}if(!Array.isArray(s))return;const a=n(e=>{const r=s.indexOf(e);return r<0?s.length:r},"rank"),i=this.panels.map((e,r)=>({index:r,panel:e,rank:a(this.nameOf(e))})).sort((e,r)=>e.rank-r.rank||e.index-r.index);for(const{panel:e}of i)this.append(e)}save(){const t=this.getAttr("persist");if(t)try{localStorage.setItem(t,JSON.stringify(this.order))}catch{}}async syncSortable(){this._sort?.destroy(),this._sort=null;const t=this._sortToken=(this._sortToken??0)+1;if(!this.getAttr("sortable"))return;const{sortable:s}=await d(async()=>{const{sortable:a}=await import("./app.rat-CkcnWh2b.js").then(i=>i.i);return{sortable:a}},__vite__mapDeps([0,1,2,3,4]),import.meta.url);t!==this._sortToken||!this._mounted||(this._sort=s(this,{handle:'[part~="header"]',items:"dash-panel",onSort:n(({from:a,to:i})=>{this.save(),this.emit("sort",{from:a,order:this.order,to:i})},"onSort")}))}}m.init();export{m as default};
