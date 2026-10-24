import{a as s,h as n}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{p as a}from"./placement-3pTR5Us0.js";import"https://esm.sh/jsr/@pulgasari/logger";const p='a, button, [role="menuitem"]';class l extends s{static shadow=!0;static attr={disabled:Boolean,icon:String,label:"menu",open:Boolean,placement:{type:String,default:"bottom-start",values:["bottom-start","bottom-end","top-start","top-end"]}};static styles=`
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
  `;get trigger(){return this.part("trigger").node}get menu(){return this.part("menu").node}get isOpen(){return!!this.menu?.matches(":popover-open")}onConnected(){this.on("click",p,(t,e)=>{this.contains(e)&&this.close()}),this.part("menu").on("toggle",t=>{const e=t.newState==="open";e!==this.getAttr("open")&&this.setAttr({open:e}),this.emit("pop-menu",{open:e})}),this.$(window).on("resize",()=>this.reposition(),{passive:!0}),this.$(window).on("scroll",()=>this.reposition(),{capture:!0,passive:!0})}onRender(){this.trigger.popoverTargetElement=this.menu}open(){return this.setOpen(!0)}close(){return this.setOpen(!1)}toggle(){return this.setOpen(!this.isOpen)}setOpen(t){return t&&this.getAttr("disabled")?this:(this.setAttr({open:t}),this)}reposition(){this.isOpen&&a(this.menu,this.trigger,{placement:this.getAttr("placement"),maxSize:288})}render(){const{icon:t,label:e}=this.getAttr();return n`
      <button type="button" part="trigger" aria-haspopup="menu" aria-expanded="false">
        ${t&&n`<svg-icon part="icon" icon="${t}"></svg-icon>`}
        <span part="label">${e}</span>
        <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
      </button>
      <div part="menu" role="menu" popover="auto"><slot></slot></div>
    `}sync(){const t=this.trigger;if(!t)return;const{disabled:e,open:i}=this.getAttr();t.disabled=e,t.setAttribute("aria-expanded",String(i));for(const r of this.children)r.hasAttribute("role")||r.setAttribute("role","menuitem");const o=this.menu;o.showPopover&&i!==this.isOpen&&o[i?"showPopover":"hidePopover"](),this.reposition()}}l.init("pop-menu");export{l as default};
