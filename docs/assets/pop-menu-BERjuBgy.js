var l=Object.defineProperty;var d=(i,t,e)=>t in i?l(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var c=(i,t)=>l(i,"name",{value:t,configurable:!0});var o=(i,t,e)=>d(i,typeof t!="symbol"?t+"":t,e);import{a as u,h}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{p as m}from"./placement-CECKNSni.js";import"https://esm.sh/jsr/@pulgasari/logger";const g='a, button, [role="menuitem"]',r=class r extends u{get trigger(){return this.part("trigger").node}get menu(){return this.part("menu").node}get isOpen(){return!!this.menu?.matches(":popover-open")}onConnected(){this.on("click",g,(t,e)=>{this.contains(e)&&this.close()}),this.part("menu").on("toggle",t=>{const e=t.newState==="open";e!==this.getAttr("open")&&this.setAttr({open:e}),this.emit("pop-menu",{open:e})}),this.$(window).on("resize",()=>this.reposition(),{passive:!0}),this.$(window).on("scroll",()=>this.reposition(),{capture:!0,passive:!0})}onRender(){this.trigger.popoverTargetElement=this.menu}open(){return this.setOpen(!0)}close(){return this.setOpen(!1)}toggle(){return this.setOpen(!this.isOpen)}setOpen(t){return t&&this.getAttr("disabled")?this:(this.setAttr({open:t}),this)}reposition(){this.isOpen&&m(this.menu,this.trigger,{placement:this.getAttr("placement"),maxSize:288})}render(){const{icon:t,label:e}=this.getAttr();return h`
      <button type="button" part="trigger" aria-haspopup="menu" aria-expanded="false">
        ${t&&h`<svg-icon part="icon" icon="${t}"></svg-icon>`}
        <span part="label">${e}</span>
        <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
      </button>
      <div part="menu" role="menu" popover="auto"><slot></slot></div>
    `}sync(){const t=this.trigger;if(!t)return;const{disabled:e,open:n}=this.getAttr();t.disabled=e,t.setAttribute("aria-expanded",String(n));for(const p of this.children)p.hasAttribute("role")||p.setAttribute("role","menuitem");const a=this.menu;a.showPopover&&n!==this.isOpen&&a[n?"showPopover":"hidePopover"](),this.reposition()}};c(r,"PopMenu"),o(r,"shadow",!0),o(r,"attr",{disabled:Boolean,icon:String,label:"menu",open:Boolean,placement:{type:String,default:"bottom-start",values:["bottom-start","bottom-end","top-start","top-end"]}}),o(r,"styles",`
    :host { display: inline-block; }

    [part~="trigger"] {
      align-items : center;
      color       : inherit;
      cursor      : pointer;
      display     : inline-flex;
      font        : inherit;
      gap         : --space(small);
      margin      : 0;

      &:disabled { cursor: not-allowed; opacity: 0.5; }

      &[aria-expanded="true"] > [part~="caret"] { rotate: 180deg; }
    }

    [part~="caret"] { transition: rotate 0.15s ease; }

    [part~="menu"] {
      border              : 0;
      color               : inherit;
      flex-direction      : column;
      max-block-size      : var(--dropdown-menu-size, 18em);
      overflow-y          : auto;
      overscroll-behavior : contain;
      padding             : 0;

      &:popover-open { display: flex; }
    }

    ::slotted(*) {
      align-items     : center;
      color           : inherit;
      cursor          : pointer;
      display         : flex;
      flex            : none;
      font            : inherit;
      gap             : --space(small);
      text-align      : start;
      text-decoration : none;
    }
  `);let s=r;s.init();export{s as default};
