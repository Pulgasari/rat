var d=Object.defineProperty;var v=(a,t,e)=>t in a?d(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var p=(a,t)=>d(a,"name",{value:t,configurable:!0});var l=(a,t,e)=>v(a,typeof t!="symbol"?t+"":t,e);import{b as y,p as b,a as x}from"./actions-eNzxACff.js";import{h as u,H as w,x as A,w as $,a as z}from"./index-Dic2q7Qi.js";import{w as k}from"./withSource-BqNer-76.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{d as g}from"./dedent-C1ttI8K7.js";import{a as S}from"./template-DVBhjnqx.js";import"https://esm.sh/jsr/@pulgasari/logger";const s=class s extends k($(z)){get field(){return this.$("textarea").node}actionText(){return this.field?.value??this.getAttribute("value")??""}actionTarget(){return this.getAttr("readonly")?null:this.field}onConnected(){!this.hasAttribute("value")&&this.defaultValue&&this.commit(this.defaultValue,{notify:!1}),this.on("input","textarea",(t,e)=>{this.commit(e.value),this.grow(e)}),this.on("change","textarea",(t,e)=>this.commit(e.value)),y(this)}captureDefaults(){return this._defaultValue??=g(this.sourceText)||(this.getAttribute("value")??""),this}onSourceChange(){const t=this._defaultValue;this._defaultValue=g(this.sourceText),(this.getAttribute("value")??"")===t?this.commit(this._defaultValue,{notify:!1}):this.update()}grow(t=this.field){if(!t||!this.getAttr("autogrow"))return this;if(t.value===this._grownFor)return this;this._grownFor=t.value;const{maxRows:e,minRows:o}=this.getAttr(),i=getComputedStyle(t),r=parseFloat(i.lineHeight)||20,n=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom);t.style.height="auto";const m=o*r+n,f=e?e*r+n:1/0,c=Math.min(f,Math.max(m,t.scrollHeight));return t.style.height=`${c}px`,t.style.overflowY=t.scrollHeight>c?"auto":"hidden",this}render(){const{counter:t,maxlength:e,placeholder:o,rows:i,spellcheck:r}=this.getAttr(),n=b(this.getAttr("actions"));return u`
      <textarea ...${S({maxlength:e,placeholder:o,rows:i})} spellcheck=${r}></textarea>
      ${(t||n.length)&&u`
        <footer>
          ${t&&u`<output aria-live="polite"></output>`}
          ${x(n)}
        </footer>
      `}
    `}sync(){super.sync();const t=this.field;if(!t)return;const{maxlength:e,readonly:o}=this.getAttr(),i=this.getAttribute("value")??"";t!==document.activeElement&&(w(t,i),this.grow(t)),A(t,{readonly:o}),this.$$('[data-action="paste"], [data-action="clear"]').attr({disabled:this.disabled||o}),this.$("footer > output").text(e?`${i.length} / ${e}`:String(i.length)),this.states.toggle("full",!!e&&i.length>=e)}};p(s,"WriteText"),l(s,"reflect",["look","resize"]),l(s,"attr",{actions:{type:String,default:"copy paste clear"},autogrow:{type:Boolean,default:!0},counter:Boolean,look:{type:String,default:"plain",values:["plain"]},maxRows:Number,maxlength:Number,minRows:{type:Number,default:2},placeholder:String,resize:{type:String,default:"vertical",values:["none","vertical","both"]},rows:Number,spellcheck:{type:Boolean,default:!0}}),l(s,"styles",`write-text {
    display: block;

    > div {
      display        : flex;
      flex-direction : column;
    }

    > div > textarea {
      background  : none;
      border      : 0;
      color       : inherit;
      font        : inherit;
      inline-size : 100%;
      line-height : 1.4;
      margin      : 0;
      resize      : vertical;

      &:focus { outline: none; }
    }

    &[resize="none"] > div > textarea { resize: none; }
    &[resize="both"] > div > textarea { resize: both; }

    > div > footer {
      align-items     : center;
      display         : flex;
      gap             : --space(small);
      justify-content : flex-end;

      > output {
        font-size            : 0.75em;
        font-variant-numeric : tabular-nums;
        flex                 : 1 1 auto;
        line-height          : 1;
        opacity              : 0.65;
      }

      > button {
        align-items : center;
        background  : none;
        border      : 0;
        color       : inherit;
        cursor      : pointer;
        display     : inline-flex;
        font        : inherit;
        margin      : 0;
        padding     : 0;
      }
    }
  }`);let h=s;h.init();export{h as default};
