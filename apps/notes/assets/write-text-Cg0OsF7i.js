var d=Object.defineProperty;var r=(n,t)=>d(n,"name",{value:t,configurable:!0});import{b as f,p as g,a as m}from"./actions-DD4AvppJ.js";import{u as v,V as b,W as x,h as l,y,l as w,a as A}from"./index-SpNlg7Y_.js";import{w as $}from"./withSource-DfC3eS1Y.js";import{isCheckable as k,isMultiSelect as S}from"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{d as c}from"./dedent-C1ttI8K7.js";import{a as z}from"./template-BaHrom4g.js";import"https://esm.sh/jsr/@pulgasari/logger";function V(n){n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}r(V,"notifyChange");function B(n,t,{notify:i=!1}={}){const e=v(n);if(!e)return null;if(k(e))e.checked=!!t;else if(S(e)){const a=b(t).map(String);for(const o of e.options)o.selected=a.includes(o.value)}else"value"in e?e.value=t instanceof Date&&e.type==="date"?x(t):t??"":e.textContent=t??"";return i&&V(e),e}r(B,"setValue");class C extends $(w(A)){static{r(this,"WriteText")}static reflect=["look","resize"];static attr={actions:{type:String,default:"copy paste clear"},autogrow:{type:Boolean,default:!0},counter:Boolean,look:{type:String,default:"plain",values:["plain"]},maxRows:Number,maxlength:Number,minRows:{type:Number,default:2},placeholder:String,resize:{type:String,default:"vertical",values:["none","vertical","both"]},rows:Number,spellcheck:{type:Boolean,default:!0}};static styles=`write-text {
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
  }`;get field(){return this.$("textarea").node}actionText(){return this.field?.value??this.getAttribute("value")??""}actionTarget(){return this.getAttr("readonly")?null:this.field}onConnected(){!this.hasAttribute("value")&&this.defaultValue&&this.commit(this.defaultValue,{notify:!1}),this.on("input","textarea",(t,i)=>{this.commit(i.value),this.grow(i)}),this.on("change","textarea",(t,i)=>this.commit(i.value)),f(this)}captureDefaults(){return this._defaultValue??=c(this.sourceText)||(this.getAttribute("value")??""),this}onSourceChange(){const t=this._defaultValue;this._defaultValue=c(this.sourceText),(this.getAttribute("value")??"")===t?this.commit(this._defaultValue,{notify:!1}):this.update()}grow(t=this.field){if(!t||!this.getAttr("autogrow"))return this;if(t.value===this._grownFor)return this;this._grownFor=t.value;const{maxRows:i,minRows:e}=this.getAttr(),a=getComputedStyle(t),o=parseFloat(a.lineHeight)||20,s=parseFloat(a.paddingTop)+parseFloat(a.paddingBottom);t.style.height="auto";const h=e*o+s,p=i?i*o+s:1/0,u=Math.min(p,Math.max(h,t.scrollHeight));return t.style.height=`${u}px`,t.style.overflowY=t.scrollHeight>u?"auto":"hidden",this}render(){const{counter:t,maxlength:i,placeholder:e,rows:a,spellcheck:o}=this.getAttr(),s=g(this.getAttr("actions"));return l`
      <textarea ...${z({maxlength:i,placeholder:e,rows:a})} spellcheck=${o}></textarea>
      ${(t||s.length)&&l`
        <footer>
          ${t&&l`<output aria-live="polite"></output>`}
          ${m(s)}
        </footer>
      `}
    `}sync(){super.sync();const t=this.field;if(!t)return;const{maxlength:i,readonly:e}=this.getAttr(),a=this.getAttribute("value")??"";t!==document.activeElement&&(B(t,a),this.grow(t)),y(t,{readonly:e}),this.$$('[data-action="paste"], [data-action="clear"]').attr({disabled:this.disabled||e}),this.$("footer > output").text(i?`${a.length} / ${i}`:String(a.length)),this.states.toggle("full",!!i&&a.length>=i)}}C.init();export{C as default};
