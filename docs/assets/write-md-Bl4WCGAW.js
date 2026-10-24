var n=Object.defineProperty;var u=(r,e,t)=>e in r?n(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var d=(r,e)=>n(r,"name",{value:e,configurable:!0});var s=(r,e,t)=>u(r,typeof e!="symbol"?e+"":e,t);import"./output-md-8g6i5lVU.js";import"./write-text-Bz9jgvgo.js";import{a as p,h as m,q as w}from"./index-ChxOIlqb.js";import{d as v}from"./index-CZPONa0e.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as h}from"./template-CA3qlpi6.js";import"./withSource-wiqCu_cZ.js";import"./import-n7zfmJr1.js";import"./dedent-C1ttI8K7.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./actions-CSz23ftr.js";const g=150,c=["counter","disabled","label","maxlength","minRows","name","persist","placeholder","readonly","required"],i=class i extends p{static styles(){return`write-md {
      display        : flex;
      flex-direction : column;
      gap            : --space(small);

      > [role="tablist"] { align-self: flex-start; display: flex; }
      > div              { display: grid; gap: inherit; }

      &:not([preview="toggle"]) > [role="tablist"]           { display: none; }
      &[preview="none"] output-md                        { display: none; }
      &[preview="side"] > div                                { grid-template-columns: 1fr 1fr; }
      &[preview="toggle"]:state(preview) write-text       { display: none; }
      &[preview="toggle"]:not(:state(preview)) output-md { display: none; }
    }`}get reader(){return this.querySelector("output-md")}get writer(){return this.querySelector("write-text")}get value(){return this.writer?.value??this.getAttribute("value")??""}set value(e){this.writer?this.writer.value=e:this.setAttribute("value",e??"")}get firstValue(){return this._firstValue??=this.getAttribute("value")??""}render(){return m`
      <div role="tablist">
        <button type="button" role="tab" data-mode="write" aria-selected="true">write</button>
        <button type="button" role="tab" data-mode="preview" aria-selected="false">preview</button>
      </div>
      <div>
        <write-text ...${h({value:this.firstValue})}></write-text>
        <output-md></output-md>
      </div>
    `}onConnected(){const e=v(()=>this.renderPreview(),g);this.track(e.cancel),this.$$("[data-mode]").onClick((t,a)=>{this.states.toggle("preview",a.dataset.mode==="preview");for(const l of this.$$("[data-mode]"))l.setAttribute("aria-selected",String(l===a))}),this.$("write-text").onInput(t=>{t.target===this.writer&&e()}),this.writer&&this.renderPreview()}onRender(){this.renderPreview()}sync(){const e=this.getAttr();w(this.writer,Object.fromEntries(c.map(t=>[t,e[t]??!1])))}renderPreview(){this.reader?.setAttribute("raw",this.value||" ")}onAttributeChanged(e,t,a){e!=="value"||!this.writer||(this.writer.value=a??"",this.renderPreview())}};d(i,"WriteMd"),s(i,"reflect",["preview"]),s(i,"attr",{counter:Boolean,disabled:Boolean,label:String,maxlength:Number,minRows:{type:Number,default:6},name:String,persist:String,placeholder:"markdown…",preview:{type:String,default:"toggle",values:["none","side","toggle"]},readonly:Boolean,required:Boolean,value:String});let o=i;o.init("write-md");export{o as WriteMd,o as default};
