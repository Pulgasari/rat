import{b as c,p as d,a as p}from"./actions-Dn3InYRx.js";import{h as s,y as g,q as m,w as f,a as x}from"./index-CAN6sJ0x.js";import{w as v}from"./withSource-CQRafHQH.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{d as l}from"./dedent-DNI4lC77.js";import{a as y}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";class b extends v(f(x)){static reflect=["look","resize"];static attr={actions:{type:String,default:"copy paste clear"},autogrow:{type:Boolean,default:!0},counter:Boolean,look:{type:String,default:"plain",values:["plain"]},maxRows:Number,maxlength:Number,minRows:{type:Number,default:2},placeholder:String,resize:{type:String,default:"vertical",values:["none","vertical","both"]},rows:Number,spellcheck:{type:Boolean,default:!0}};static styles=`write-text {
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
  }`;get field(){return this.$("textarea").node}actionText(){return this.field?.value??this.getAttribute("value")??""}actionTarget(){return this.getAttr("readonly")?null:this.field}onConnected(){!this.hasAttribute("value")&&this.defaultValue&&this.commit(this.defaultValue,{notify:!1}),this.on("input","textarea",(t,e)=>{this.commit(e.value),this.grow(e)}),this.on("change","textarea",(t,e)=>this.commit(e.value)),c(this)}captureDefaults(){return this._defaultValue??=l(this.sourceText)||(this.getAttribute("value")??""),this}onSourceChange(){const t=this._defaultValue;this._defaultValue=l(this.sourceText),(this.getAttribute("value")??"")===t?this.commit(this._defaultValue,{notify:!1}):this.update()}grow(t=this.field){if(!t||!this.getAttr("autogrow"))return this;if(t.value===this._grownFor)return this;this._grownFor=t.value;const{maxRows:e,minRows:a}=this.getAttr(),i=getComputedStyle(t),r=parseFloat(i.lineHeight)||20,o=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom);t.style.height="auto";const u=a*r+o,h=e?e*r+o:1/0,n=Math.min(h,Math.max(u,t.scrollHeight));return t.style.height=`${n}px`,t.style.overflowY=t.scrollHeight>n?"auto":"hidden",this}render(){const{counter:t,maxlength:e,placeholder:a,rows:i,spellcheck:r}=this.getAttr(),o=d(this.getAttr("actions"));return s`
      <textarea ...${y({maxlength:e,placeholder:a,rows:i})} spellcheck=${r}></textarea>
      ${(t||o.length)&&s`
        <footer>
          ${t&&s`<output aria-live="polite"></output>`}
          ${p(o)}
        </footer>
      `}
    `}sync(){super.sync();const t=this.field;if(!t)return;const{maxlength:e,readonly:a}=this.getAttr(),i=this.getAttribute("value")??"";t!==document.activeElement&&(g(t,i),this.grow(t)),m(t,{readonly:a}),this.$$('[data-action="paste"], [data-action="clear"]').attr({disabled:this.disabled||a}),this.$("footer > output").text(e?`${i.length} / ${e}`:String(i.length)),this.states.toggle("full",!!e&&i.length>=e)}}b.init("write-text");export{b as default};
