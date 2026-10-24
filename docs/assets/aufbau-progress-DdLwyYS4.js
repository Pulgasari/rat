import{a as c}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const i=o=>Math.min(100,Math.max(0,o));class u extends c{static internals={role:"progressbar"};static reflect=["type"];static attr={max:100,showText:Boolean,target:String,type:{default:"standard",values:["standard","scroll"]},unit:"%",value:Number};static styles=`
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
  `;onConnected(){this.watchScroll()}onAttributeChanged(t){(t==="target"||t==="type")&&this.watchScroll()}watchScroll(){this._scrollWatch?.abort(),this._scrollWatch=null;const{target:t,type:n}=this.getAttr();if(n!=="scroll")return;const r=!t||t==="body"?window:document.querySelector(t);if(!r)return;const e=r===window?document.documentElement:r,s=()=>{const a=e.scrollHeight-e.clientHeight,l=a>0?i(e.scrollTop/a*100):0;this.setAttr({value:l.toFixed(1)})};this._scrollWatch=new AbortController,this.$(r).until(this._scrollWatch.signal).on("scroll",s,{passive:!0}),s()}render(){return this.getAttr("showText")?"<span></span>":""}sync(){const{max:t,type:n,unit:r,value:e}=this.getAttr(),s=e===void 0&&n!=="scroll",a=s?0:i((e??0)/t*100);this.setVar("--progress",`${a}%`),this.internals&&(this.internals.ariaValueMin="0",this.internals.ariaValueMax=String(t),this.internals.ariaValueNow=s?null:String(e??0)),this.$(":scope > span").text(s?"":`${Math.round(a)}${r}`)}}u.init("aufbau-progress");export{u as default};
