var o=Object.defineProperty;var s=(i,e)=>o(i,"name",{value:e,configurable:!0});import"./output-md-BsM343Ao.js";import"./write-text-Byo_Gwk1.js";import{a as l,h as n,y as d}from"./index-CvuAKKlM.js";import{d as u}from"./index-CZPONa0e.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as p}from"./template-DH207kky.js";import"./withSource-CrDeN6vy.js";import"./import-n7zfmJr1.js";import"./dedent-C1ttI8K7.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./actions-DoLlxZAk.js";const m=150,w=["counter","disabled","label","maxlength","minRows","name","persist","placeholder","readonly","required"];class v extends l{static{s(this,"WriteMd")}static reflect=["preview"];static attr={counter:Boolean,disabled:Boolean,label:String,maxlength:Number,minRows:{type:Number,default:6},name:String,persist:String,placeholder:"markdown…",preview:{type:String,default:"toggle",values:["none","side","toggle"]},readonly:Boolean,required:Boolean,value:String};static styles(){return`write-md {
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
    }`}get reader(){return this.querySelector("output-md")}get writer(){return this.querySelector("write-text")}get value(){return this.writer?.value??this.getAttribute("value")??""}set value(e){this.writer?this.writer.value=e:this.setAttribute("value",e??"")}get firstValue(){return this._firstValue??=this.getAttribute("value")??""}render(){return n`
      <div role="tablist">
        <button type="button" role="tab" data-mode="write" aria-selected="true">write</button>
        <button type="button" role="tab" data-mode="preview" aria-selected="false">preview</button>
      </div>
      <div>
        <write-text ...${p({value:this.firstValue})}></write-text>
        <output-md></output-md>
      </div>
    `}onConnected(){const e=u(()=>this.renderPreview(),m);this.track(e.cancel),this.$$("[data-mode]").onClick((t,r)=>{this.states.toggle("preview",r.dataset.mode==="preview");for(const a of this.$$("[data-mode]"))a.setAttribute("aria-selected",String(a===r))}),this.$("write-text").onInput(t=>{t.target===this.writer&&e()}),this.writer&&this.renderPreview()}onRender(){this.renderPreview()}sync(){const e=this.getAttr();d(this.writer,Object.fromEntries(w.map(t=>[t,e[t]??!1])))}renderPreview(){this.reader?.setAttribute("raw",this.value||" ")}onAttributeChanged(e,t,r){e!=="value"||!this.writer||(this.writer.value=r??"",this.renderPreview())}}v.init("write-md");export{v as WriteMd,v as default};
