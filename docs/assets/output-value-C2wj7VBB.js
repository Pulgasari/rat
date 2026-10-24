import{g as y,h as r}from"./index-CAN6sJ0x.js";import{A as S}from"./withSource-CQRafHQH.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{t as a,T as m}from"./index-C41x3u_M.js";import{b as A,a as $}from"./actions-Dn3InYRx.js";import{a as b}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./locale-CxrTcH6i.js";import"./index-B1xaW8O5.js";const T=Object.keys(m).filter(t=>!m[t].list),l=new Set(["date","datetime","time"]),x=/^-?\d+$/,N=["short","medium","long","full"],c={short:"short",medium:"medium",long:"medium",full:"medium"},p={date:t=>({dateStyle:t}),datetime:t=>({dateStyle:t,timeStyle:c[t]}),time:t=>({timeStyle:c[t]})},s=(t,e=2)=>String(t).padStart(e,"0"),h=t=>`${t.getFullYear()}-${s(t.getMonth()+1)}-${s(t.getDate())}`,g=t=>`${s(t.getHours())}:${s(t.getMinutes())}`,v=t=>`${h(t)}T${g(t)}`,f=(t,e)=>t==="time"?new Date(1970,0,1,0,0,0,e):new Date(e);function o(t,e){return e==null?"":t==="date"?h(new Date(e)):t==="datetime"?v(new Date(e)):t==="time"?g(f("time",e)):a(t).format(e)}function E(t,e,n,i){return e==null?"":p[t]&&N.includes(n)?new Intl.DateTimeFormat(i,p[t](n)).format(f(t,e)):t==="number"&&n==="locale"?new Intl.NumberFormat(i).format(e):o(t,e)}class w extends S{static attr={format:String,locale:String,type:{type:String,default:"text",values:T},value:String,copy:Boolean,icon:String};static output="span";static styles=`
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
  `;parseValue(e){const n=this.getAttr("type"),i=String(e??"").trim();return l.has(n)&&x.test(i)?Number(i):n==="duration"?i:a(n).parse(e)}formatValue(e){return o(this.getAttr("type"),e)}get value(){const e=this.getAttribute("value")??this.sourceText.trim();return e===""?null:this.parseValue(e)}set value(e){this.setAttr({value:e==null||e===""?!1:this.formatValue(this.parseValue(e))})}get text(){const{type:e}=this.getAttr();try{return E(e,this.value,this.formatName(),this.getAttr("locale")||void 0)}catch{return o(e,this.value)}}get machine(){return this.formatValue(this.value)}formatName(){const e=this.getAttr("type");return this.getAttribute("format")??y(`${this.localName}-${e}-format`)??this.getAttr("format")??""}iconName(){return this.hasAttr("icon")&&(this.getAttr("icon")||a(this.getAttr("type")).icon)||""}onConnected(){A(this)}sync(){this.states.toggle("empty",!this.text)}actionText(){return this.text}actionTarget(){return null}render(){const{copy:e,type:n}=this.getAttr(),i=this.text;if(!i)return r``;const u=this.iconName(),d=l.has(n)?r`<time ...${b({datetime:this.machine})}>${i}</time>`:r`<span>${i}</span>`;return r`
      ${u&&r`<svg-icon icon="${u}"></svg-icon>`}
      ${d}
      ${e&&$(["copy"])}
    `}}w.init("output-value");export{w as default};
