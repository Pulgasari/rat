var S=Object.defineProperty;var i=(t,e)=>S(t,"name",{value:e,configurable:!0});import{g as A,h as s}from"./index-DlJ9mHnL.js";import{A as $}from"./withSource-DPAd-xqk.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{t as o,T as l}from"./index-4g4XNgkI.js";import{b,a as T}from"./actions-rV_pzrzK.js";import{a as x}from"./template-C74i1KTk.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./locale-CyKX5eGQ.js";import"./index-CZPONa0e.js";const N=Object.keys(l).filter(t=>!l[t].list),c=new Set(["date","datetime","time"]),v=/^-?\d+$/,E=["short","medium","long","full"],p={short:"short",medium:"medium",long:"medium",full:"medium"},h={date:i(t=>({dateStyle:t}),"date"),datetime:i(t=>({dateStyle:t,timeStyle:p[t]}),"datetime"),time:i(t=>({timeStyle:p[t]}),"time")},a=i((t,e=2)=>String(t).padStart(e,"0"),"pad"),g=i(t=>`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}`,"isoDate"),f=i(t=>`${a(t.getHours())}:${a(t.getMinutes())}`,"isoTime"),w=i(t=>`${g(t)}T${f(t)}`,"isoStamp"),d=i((t,e)=>t==="time"?new Date(1970,0,1,0,0,0,e):new Date(e),"instantOf");function m(t,e){return e==null?"":t==="date"?g(new Date(e)):t==="datetime"?w(new Date(e)):t==="time"?f(d("time",e)):o(t).format(e)}i(m,"machineText");function D(t,e,r,n){return e==null?"":h[t]&&E.includes(r)?new Intl.DateTimeFormat(n,h[t](r)).format(d(t,e)):t==="number"&&r==="locale"?new Intl.NumberFormat(n).format(e):m(t,e)}i(D,"displayText");class O extends ${static{i(this,"OutputValue")}static attr={format:String,locale:String,type:{type:String,default:"text",values:N},value:String,copy:Boolean,icon:String};static output="span";static styles=`
    output-value {
      display: inline;

      &:state(empty) { display: none; }

      > span {
        align-items : baseline;
        display     : inline-flex;
        gap         : var(--value-gap, --space(tiny));
      }

      &:is([type="date"], [type="datetime"], [type="number"], [type="time"], [type="year"]) > span > :is(span, time) {
        font-variant-numeric: tabular-nums;
      }

      > span > svg-icon { align-self: center; }

      > span > button {
        align-self  : center;
        background  : none;
        border      : 0;
        color       : inherit;
        cursor      : pointer;
        display     : inline-flex;
        font        : inherit;
        line-height : 0;
        margin      : 0;
        padding     : 0;
      }
    }
  `;parseValue(e){const r=this.getAttr("type"),n=String(e??"").trim();return c.has(r)&&v.test(n)?Number(n):r==="duration"?n:o(r).parse(e)}formatValue(e){return m(this.getAttr("type"),e)}get value(){const e=this.getAttribute("value")??this.sourceText.trim();return e===""?null:this.parseValue(e)}set value(e){this.setAttr({value:e==null||e===""?!1:this.formatValue(this.parseValue(e))})}get text(){const{type:e}=this.getAttr();try{return D(e,this.value,this.formatName(),this.getAttr("locale")||void 0)}catch{return m(e,this.value)}}get machine(){return this.formatValue(this.value)}formatName(){const e=this.getAttr("type");return this.getAttribute("format")??A(`${this.localName}-${e}-format`)??this.getAttr("format")??""}iconName(){return this.hasAttr("icon")&&(this.getAttr("icon")||o(this.getAttr("type")).icon)||""}onConnected(){b(this)}sync(){this.states.toggle("empty",!this.text)}actionText(){return this.text}actionTarget(){return null}render(){const{copy:e,type:r}=this.getAttr(),n=this.text;if(!n)return s``;const u=this.iconName(),y=c.has(r)?s`<time ...${x({datetime:this.machine})}>${n}</time>`:s`<span>${n}</span>`;return s`
      ${u&&s`<svg-icon icon="${u}"></svg-icon>`}
      ${y}
      ${e&&T(["copy"])}
    `}}O.init();export{O as default};
