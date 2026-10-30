var o=Object.defineProperty;var i=(s,t)=>o(s,"name",{value:t,configurable:!0});import{a,G as n}from"./index-DlJ9mHnL.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class d extends a{static{i(this,"AufbauLoop")}static reflect=["direction","mode"];static attr={direction:{type:String,default:"left",values:["left","right"]},interval:3e3,mode:{type:String,default:"carousel",values:["carousel","marquee"]},pauseOnHover:Boolean,speed:"20s"};static shadow=!0;static styles=`
    :host { display: block; }

    :host(:not([mode="marquee"])) { display: grid; }

    :host(:not([mode="marquee"])) ::slotted(*) {
      grid-area  : 1 / 1;
      transition : opacity var(--loop-fade, 0.4s) ease;
    }

    :host(:not([mode="marquee"])) ::slotted([inert]) { opacity: 0; }

    :host([mode="marquee"]) { overflow: hidden; }

    [part~="track"] {
      animation   : aufbau-loop-marquee var(--loop-speed, 20s) linear infinite;
      display     : flex;
      inline-size : max-content;
    }

    [part~="copy"] { display: contents; }

    [part~="track"] ::slotted(*),
    [part~="copy"] > * { flex: none; padding-inline-end: var(--loop-gap, --space(large)); }

    :host([direction="right"]) [part~="track"]    { animation-direction: reverse; }
    :host([pause-on-hover]:hover) [part~="track"] { animation-play-state: paused; }
    :host(:state(offscreen)) [part~="track"]      { animation-play-state: paused; }

    @keyframes aufbau-loop-marquee { to { translate: -50% 0; } }

    @media (prefers-reduced-motion: reduce) {
      [part~="track"] { animation-play-state: paused; }
    }
  `;constructor(){super(),this._index=0}onConnected(){this.$(this.root).on("slotchange",()=>this.copy()),this.on("pointerenter",()=>{this._hovered=!0}),this.on("pointerleave",()=>{this._hovered=!1}),this.track(n(this,(t,e)=>{this._offscreen=!e.isIntersecting,this.states.toggle("offscreen",this._offscreen)})),this.start()}onDisconnected(){this.stop()}onAttributeChanged(t){this.start()}stop(){clearInterval(this._timer),this._timer=null}start(){this.stop();const{interval:t,mode:e}=this.getAttr();e!=="carousel"||this.slides.length<2||(this._timer=setInterval(()=>{this._offscreen||document.hidden||this._hovered&&this.getAttr("pauseOnHover")||this.next()},t))}next(){return this.goTo(this._index+1)}previous(){return this.goTo(this._index-1)}goTo(t){const e=this.slides.length;return e?(this._index=(t%e+e)%e,this.sync(),this.emit("aufbau-loop-change",{index:this._index}),this):this}get slides(){return[...this.children]}render(){return this.getAttr("mode")==="marquee"?'<div part="track"><slot></slot><div part="copy" aria-hidden="true" inert></div></div>':"<slot></slot>"}onRender(){this.copy()}copy(){this.part("copy").node?.replaceChildren(...this.slides.map(t=>t.cloneNode(!0)))}sync(){this.setVar("--loop-speed",this.getAttr("speed"));const t=this.getAttr("mode")==="carousel";this.slides.forEach((e,r)=>{e.inert=t&&r!==this._index})}}d.init();export{d as default};
