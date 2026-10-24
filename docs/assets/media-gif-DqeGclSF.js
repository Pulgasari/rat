import{a,h as s}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as r}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";const n=()=>matchMedia?.("(prefers-reduced-motion: reduce)").matches;class o extends a{static attr={alt:String,paused:Boolean,src:String};static reflect=["paused"];static styles=`media-gif {
    cursor   : pointer;
    display  : inline-block;
    position : relative;

    > img, > canvas { display: block; max-inline-size: 100%; block-size: auto; }
    > canvas        { inset: 0; position: absolute; inline-size: 100%; block-size: 100%; }
    &:not([paused]) > canvas { display: none; }

    > span {
      background    : color-mix(in oklch, black 60%, transparent);
      border-radius : 0.3em;
      color         : white;
      font-size     : 0.75em;
      font-weight   : 700;
      inset         : auto auto 0.5em 0.5em;
      padding       : --space(tiny);
      position      : absolute;
    }
    &:not([paused]) > span { display: none; }
  }`;constructor(){super(),n()&&(this._startPaused=!0)}onConnected(){this._startPaused&&!this.hasAttribute("paused")&&this.setAttribute("paused",""),this.on("click",()=>this.toggle()),this.on("keydown",t=>{(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.toggle())}),this.hasAttribute("tabindex")||(this.tabIndex=0)}play(){return this.setAttr({paused:!1})}pause(){return this.setAttr({paused:!0})}toggle(){return this.getAttr("paused")?this.play():this.pause()}render(){const{alt:t,src:e}=this.getAttr();return e?s`<img ...${r({alt:t??"",src:e})} /><canvas aria-hidden="true"></canvas><span aria-hidden="true">GIF</span>`:s``}freeze(){const t=this.querySelector("img"),e=this.querySelector("canvas");if(!t||!e)return;const i=()=>{e.width=t.naturalWidth,e.height=t.naturalHeight,e.getContext("2d")?.drawImage(t,0,0)};t.complete?i():t.addEventListener("load",i,{once:!0})}sync(){const t=this.getAttr("paused");t&&this.freeze(),this.internals&&(this.internals.role="button",this.internals.ariaLabel=this.getAttr("alt")||"animation",this.internals.ariaPressed=String(!t))}}o.init("media-gif");export{o as default};
