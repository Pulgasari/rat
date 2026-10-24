var p=Object.defineProperty;var T=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var n=(e,t)=>p(e,"name",{value:t,configurable:!0});var o=(e,t,i)=>T(e,typeof t!="symbol"?t+"":t,i);import{g as x,h as a}from"./index-ChxOIlqb.js";import{A as N}from"./withSource-wiqCu_cZ.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{t as c,T as g}from"./index-CD_e6vjY.js";import{b as v,a as E}from"./actions-CSz23ftr.js";import{a as w}from"./template-CA3qlpi6.js";import"https://esm.sh/jsr/@pulgasari/logger";import"./locale-CyKX5eGQ.js";import"./index-CZPONa0e.js";const D=Object.keys(g).filter(e=>!g[e].list),f=new Set(["date","datetime","time"]),I=/^-?\d+$/,C=["short","medium","long","full"],d={short:"short",medium:"medium",long:"medium",full:"medium"},y={date:n(e=>({dateStyle:e}),"date"),datetime:n(e=>({dateStyle:e,timeStyle:d[e]}),"datetime"),time:n(e=>({timeStyle:d[e]}),"time")},m=n((e,t=2)=>String(e).padStart(t,"0"),"pad"),S=n(e=>`${e.getFullYear()}-${m(e.getMonth()+1)}-${m(e.getDate())}`,"isoDate"),A=n(e=>`${m(e.getHours())}:${m(e.getMinutes())}`,"isoTime"),M=n(e=>`${S(e)}T${A(e)}`,"isoStamp"),$=n((e,t)=>e==="time"?new Date(1970,0,1,0,0,0,t):new Date(t),"instantOf");function l(e,t){return t==null?"":e==="date"?S(new Date(t)):e==="datetime"?M(new Date(t)):e==="time"?A($("time",t)):c(e).format(t)}n(l,"machineText");function Y(e,t,i,r){return t==null?"":y[e]&&C.includes(i)?new Intl.DateTimeFormat(r,y[e](i)).format($(e,t)):e==="number"&&i==="locale"?new Intl.NumberFormat(r).format(t):l(e,t)}n(Y,"displayText");const s=class s extends N{parseValue(t){const i=this.getAttr("type"),r=String(t??"").trim();return f.has(i)&&I.test(r)?Number(r):i==="duration"?r:c(i).parse(t)}formatValue(t){return l(this.getAttr("type"),t)}get value(){const t=this.getAttribute("value")??this.sourceText.trim();return t===""?null:this.parseValue(t)}set value(t){this.setAttr({value:t==null||t===""?!1:this.formatValue(this.parseValue(t))})}get text(){const{type:t}=this.getAttr();try{return Y(t,this.value,this.formatName(),this.getAttr("locale")||void 0)}catch{return l(t,this.value)}}get machine(){return this.formatValue(this.value)}formatName(){const t=this.getAttr("type");return this.getAttribute("format")??x(`${this.localName}-${t}-format`)??this.getAttr("format")??""}iconName(){return this.hasAttr("icon")&&(this.getAttr("icon")||c(this.getAttr("type")).icon)||""}onConnected(){v(this)}sync(){this.states.toggle("empty",!this.text)}actionText(){return this.text}actionTarget(){return null}render(){const{copy:t,type:i}=this.getAttr(),r=this.text;if(!r)return a``;const h=this.iconName(),b=f.has(i)?a`<time ...${w({datetime:this.machine})}>${r}</time>`:a`<span>${r}</span>`;return a`
      ${h&&a`<svg-icon icon="${h}"></svg-icon>`}
      ${b}
      ${t&&E(["copy"])}
    `}};n(s,"OutputValue"),o(s,"attr",{format:String,locale:String,type:{type:String,default:"text",values:D},value:String,copy:Boolean,icon:String}),o(s,"output","span"),o(s,"styles",`
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
  `);let u=s;u.init();export{u as default};
