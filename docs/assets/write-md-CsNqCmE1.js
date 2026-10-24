import"./output-md-DVJiwhMY.js";import"./write-text-IZy8wj2f.js";import{a,h as s,q as o}from"./index-CAN6sJ0x.js";import{d as l}from"./index-B1xaW8O5.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as n}from"./template-CbX1Mzd8.js";import"./withSource-CQRafHQH.js";import"./import-D9lz_U--.js";import"./dedent-DNI4lC77.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./actions-Dn3InYRx.js";const d=150,u=["counter","disabled","label","maxlength","minRows","name","persist","placeholder","readonly","required"];class p extends a{static reflect=["preview"];static attr={counter:Boolean,disabled:Boolean,label:String,maxlength:Number,minRows:{type:Number,default:6},name:String,persist:String,placeholder:"markdown…",preview:{type:String,default:"toggle",values:["none","side","toggle"]},readonly:Boolean,required:Boolean,value:String};static styles(){return`write-md {
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
    }`}get reader(){return this.querySelector("output-md")}get writer(){return this.querySelector("write-text")}get value(){return this.writer?.value??this.getAttribute("value")??""}set value(e){this.writer?this.writer.value=e:this.setAttribute("value",e??"")}get firstValue(){return this._firstValue??=this.getAttribute("value")??""}render(){return s`
      <div role="tablist">
        <button type="button" role="tab" data-mode="write" aria-selected="true">write</button>
        <button type="button" role="tab" data-mode="preview" aria-selected="false">preview</button>
      </div>
      <div>
        <write-text ...${n({value:this.firstValue})}></write-text>
        <output-md></output-md>
      </div>
    `}onConnected(){const e=l(()=>this.renderPreview(),d);this.track(e.cancel),this.$$("[data-mode]").onClick((t,r)=>{this.states.toggle("preview",r.dataset.mode==="preview");for(const i of this.$$("[data-mode]"))i.setAttribute("aria-selected",String(i===r))}),this.$("write-text").onInput(t=>{t.target===this.writer&&e()}),this.writer&&this.renderPreview()}onRender(){this.renderPreview()}sync(){const e=this.getAttr();o(this.writer,Object.fromEntries(u.map(t=>[t,e[t]??!1])))}renderPreview(){this.reader?.setAttribute("raw",this.value||" ")}onAttributeChanged(e,t,r){e!=="value"||!this.writer||(this.writer.value=r??"",this.renderPreview())}}p.init("write-md");export{p as WriteMd,p as default};
