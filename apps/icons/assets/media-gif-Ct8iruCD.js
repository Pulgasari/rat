var n=Object.defineProperty;var s=(i,t)=>n(i,"name",{value:t,configurable:!0});import{a as o,h as r}from"./index-aAWsfKI1.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as u}from"./template-Bf--u8jz.js";import"https://esm.sh/jsr/@pulgasari/logger";const l=s(()=>matchMedia?.("(prefers-reduced-motion: reduce)").matches,"REDUCED");class d extends o{static{s(this,"MediaGif")}static attr={alt:String,paused:Boolean,src:String};static reflect=["paused"];static styles=`media-gif {
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
  }`;constructor(){super(),l()&&(this._startPaused=!0)}onConnected(){this._startPaused&&!this.hasAttribute("paused")&&this.setAttribute("paused",""),this.on("click",()=>this.toggle()),this.on("keydown",t=>{(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.toggle())}),this.hasAttribute("tabindex")||(this.tabIndex=0)}play(){return this.setAttr({paused:!1})}pause(){return this.setAttr({paused:!0})}toggle(){return this.getAttr("paused")?this.play():this.pause()}render(){const{alt:t,src:e}=this.getAttr();return e?r`<img ...${u({alt:t??"",src:e})} /><canvas aria-hidden="true"></canvas><span aria-hidden="true">GIF</span>`:r``}freeze(){const t=this.querySelector("img"),e=this.querySelector("canvas");if(!t||!e)return;const a=s(()=>{e.width=t.naturalWidth,e.height=t.naturalHeight,e.getContext("2d")?.drawImage(t,0,0)},"draw");t.complete?a():t.addEventListener("load",a,{once:!0})}sync(){const t=this.getAttr("paused");t&&this.freeze(),this.internals&&(this.internals.role="button",this.internals.ariaLabel=this.getAttr("alt")||"animation",this.internals.ariaPressed=String(!t))}}d.init();export{d as default};
