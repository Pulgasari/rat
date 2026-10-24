var p=Object.defineProperty;var g=(e,t,r)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var c=(e,t)=>p(e,"name",{value:t,configurable:!0});var l=(e,t,r)=>g(e,typeof t!="symbol"?t+"":t,r);import{a as m}from"./index-CfkG_3cO.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const h=c(e=>Math.min(100,Math.max(0,e)),"clamp"),s=class s extends m{onConnected(){this.watchScroll()}onAttributeChanged(t){(t==="target"||t==="type")&&this.watchScroll()}watchScroll(){this._scrollWatch?.abort(),this._scrollWatch=null;const{target:t,type:r}=this.getAttr();if(r!=="scroll")return;const n=!t||t==="body"?window:document.querySelector(t);if(!n)return;const a=n===window?document.documentElement:n,o=c(()=>{const i=a.scrollHeight-a.clientHeight,d=i>0?h(a.scrollTop/i*100):0;this.setAttr({value:d.toFixed(1)})},"measure");this._scrollWatch=new AbortController,this.$(n).until(this._scrollWatch.signal).on("scroll",o,{passive:!0}),o()}render(){return this.getAttr("showText")?"<span></span>":""}sync(){const{max:t,type:r,unit:n,value:a}=this.getAttr(),o=a===void 0&&r!=="scroll",i=o?0:h((a??0)/t*100);this.setVar("--progress",`${i}%`),this.internals&&(this.internals.ariaValueMin="0",this.internals.ariaValueMax=String(t),this.internals.ariaValueNow=o?null:String(a??0)),this.$(":scope > span").text(o?"":`${Math.round(i)}${n}`)}};c(s,"AufbauProgress"),l(s,"internals",{role:"progressbar"}),l(s,"reflect",["type"]),l(s,"attr",{max:100,showText:Boolean,target:String,type:{default:"standard",values:["standard","scroll"]},unit:"%",value:Number}),l(s,"styles",`
    aufbau-progress {
      --progress-size: 0.5em;

      align-items : center;
      display     : flex;
      gap         : --space(small);

      &::before {
        background-color  : var(--progress-track, transparent);
        background-image  : linear-gradient(var(--progress-bar, currentColor), var(--progress-bar, currentColor));
        background-repeat : no-repeat;
        background-size   : var(--progress, 0%) 100%;
        block-size        : var(--progress-size);
        content           : '';
        flex              : 1 1 auto;
        transition        : background-size 0.2s ease;
      }

      > span {
        flex                 : none;
        font-size            : 0.75em;
        font-variant-numeric : tabular-nums;
        line-height          : 1;
      }

      &:not([value], [type="scroll"])::before {
        animation       : aufbau-progress-slide 1.2s ease-in-out infinite;
        background-size : 35% 100%;
      }
    }

    @keyframes aufbau-progress-slide {
      from { background-position: -100% 0; }
      to   { background-position:  200% 0; }
    }
  `);let u=s;u.init();export{u as default};
