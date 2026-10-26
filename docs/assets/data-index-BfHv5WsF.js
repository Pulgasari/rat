var h=Object.defineProperty;var n=(s,e)=>h(s,"name",{value:e,configurable:!0});import{a as u,_ as c}from"./index-kAuIywEd.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{p,r as d}from"./itemLook-Brs9pRRz.js";import"https://esm.sh/jsr/@pulgasari/logger";const m=n(s=>{const e=parseFloat(s);return Number.isFinite(e)?e:null},"parsePx"),z=new Set(["item-look","item-shape","item-size","viewmode"]);class g extends u{static{n(this,"DataIndex")}static reflect=["viewmode"];static attr={gap:{type:String,var:"--index-gap"},itemIntrinsicSize:String,itemLook:String,itemShape:String,itemSize:String,itemSizeMax:String,itemSizeMin:String,viewmode:{type:String,default:"grid",values:["grid","list","gallery","masonry"]}};static styles=`data-index {
    display               : grid;
    gap                   : var(--index-gap, --space(normal));
    grid-template-columns : repeat(auto-fill, minmax(var(--item-size, 200px), 1fr));
    inline-size           : 100%;

    &[viewmode="list"] {
      display        : flex;
      flex-direction : column;
    }

    &[viewmode="gallery"] {
      display           : flex;
      overflow-x        : auto;
      padding-block-end : --space(small);
      scroll-snap-type  : x mandatory;

      > * {
        flex              : 0 0 var(--item-size, 200px);
        scroll-snap-align : start;
      }
    }

    &[viewmode="masonry"] {
      column-gap   : var(--index-gap, --space(normal));
      column-width : var(--item-size, 200px);
      display      : block;

      > * {
        break-inside     : avoid;
        margin-block-end : var(--index-gap, --space(normal));
      }
    }

    &:is([item-shape="circle"], [item-shape="square"], [item-look~="circle"], [item-look~="square"]) > data-item {
      aspect-ratio: 1 / 1;
    }

    &[eager] data-item { content-visibility: visible; }

    &:state(relayout) data-item { contain-intrinsic-block-size: var(--item-intrinsic-size, var(--item-size, 200px)); }
  }`;constructor(){super(),this._samples={count:0,total:0}}render(){return null}onConnected(){this.syncResize(),this.on("contentvisibilityautostatechange",e=>{e.skipped||this.sample(e.target)},{capture:!0})}onDisconnected(){this._resize?.destroy(),this._resize=null}onAttributeChanged(e){(e==="item-size-min"||e==="item-size-max")&&this.syncResize(),(e==="item-size"||e==="item-look")&&(this._resizeValue=null),z.has(e)&&this.relayout()}get learns(){return!this.getAttr("itemIntrinsicSize")}sample(e){!this.learns||e.localName!=="data-item"||e.hasAttribute("intrinsic-size")||e.parentElement?.closest("data-index")===this&&((this._pending??=new Set).add(e),!this._frame&&(this._frame=requestAnimationFrame(()=>{this._frame=null;for(const t of this._pending){const i=t.getBoundingClientRect().height;i>0&&(this._samples.count+=1,this._samples.total+=i)}this._pending.clear(),this.applyEstimate()})))}applyEstimate(){const{count:e,total:t}=this._samples;if(!e)return;const i=Math.round(t/e);Math.abs(i-(this._estimate??0))<1||(this._estimate=i,this.setVar("--item-intrinsic-size",`${i}px`))}relayout(){this._samples={count:0,total:0},this._estimate=null,this.learns&&this.setVar("--item-intrinsic-size",null),this.states.add("relayout"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.states.delete("relayout")))}async syncResize(){this._resize?.destroy(),this._resize=null;const e=m(this.getAttr("itemSizeMin")),t=m(this.getAttr("itemSizeMax")),i=this.getAttr("gestures")!=="false"&&e!=null&&t!=null&&t>e,r=this._resizeToken=(this._resizeToken??0)+1;if(!i){this._resizeValue=null;return}const{adjustable:a}=await c(async()=>{const{adjustable:o}=await import("./index-C3MfxrKq.js");return{adjustable:o}},[],import.meta.url);if(r!==this._resizeToken||!this._mounted)return;const l=this._resizeValue??m(this.getAttr("itemSize"))??(e+t)/2;this._resize=a(this,{maximum:t,minimum:e,onChange:n(o=>{this._resizeValue=Math.round(o),this.setVar("--item-size",`${this._resizeValue}px`)},"onChange"),value:l}),this._resizeValue=this._resize.get(),this.setVar("--item-size",`${this._resizeValue}px`)}sync(){const{itemIntrinsicSize:e,itemLook:t,itemShape:i,itemSize:r}=this.getAttr(),a=p(t),l=this._resizeValue!=null?`${this._resizeValue}px`:r||a.size;this.setVar({"--item-shape":d(i||a.shape),"--item-size":l}),e?this.setVar("--item-intrinsic-size",e):this._estimate==null&&this.setVar("--item-intrinsic-size",null)}}g.init();export{g as default};
