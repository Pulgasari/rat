var c=Object.defineProperty;var s=(t,e)=>c(t,"name",{value:e,configurable:!0});import"./svg-icon-BvuzFmqu.js";import{a as p}from"./index-DvP7gnjy.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class h extends p{static{s(this,"AppPanel")}static shadow=!0;static parts=["close","expand","heading"];static attr={controls:{type:String,default:"close expand"},heading:String};static styles=`
    :host {
      box-sizing     : border-box;
      display        : flex;
      flex           : 1 1 auto;
      flex-direction : column;
      min-block-size : 0;
    }

    header {
      align-items : center;
      display     : flex;
      flex        : none;
      gap         : --space(small);
      padding     : var(--panel-header-padding, --space(small));

      &[hidden] { display: none; }
    }

    [part="heading"] {
      flex          : 1 1 auto;
      font-weight   : 600;
      min-inline-size : 0;
      overflow        : hidden;
      text-overflow   : ellipsis;
      white-space     : nowrap;
    }

    button {
      align-items   : center;
      background    : none;
      border        : 0;
      border-radius : --radius();
      color         : inherit;
      cursor        : pointer;
      display       : inline-flex;
      font          : inherit;
      font-size     : 1.15em;
      padding       : --space(tiny);

      &:hover          { background-color: color-mix(in oklab, currentColor 8%, transparent); }
      &:focus-visible  { outline: 2px solid color-mix(in oklab, currentColor 55%, transparent); }
      &[hidden]        { display: none; }
    }

    [part="body"] {
      flex           : 1 1 auto;
      min-block-size : 0;
      overflow       : auto;
      padding        : var(--panel-padding, 0 --space(normal) --space(normal));
    }
  `;render(){return`
      <header part="header">
        <slot name="start"></slot>
        <strong part="heading"></strong>
        <slot name="actions"></slot>
        <button type="button" part="expand" aria-label="expand"><svg-icon icon="lucide:maximize-2"></svg-icon></button>
        <button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>
      </header>
      <div part="body"><slot></slot></div>
    `}get container(){return this.parentElement?.closest("app-area, pop-modal")??null}get area(){const e=this.container;return e?.localName==="app-area"?e:null}close(){const e=this.container;return e?.localName==="app-area"?e.hide():e?e.close():this.emit("close"),this}expand(e){return this.area?.expand(e),this}onConnected(){this.$close.onClick(this.close),this.$expand.onClick(()=>this.expand()),this.$(this.area).on("toggle",()=>this.update())}sync(){const{controls:e,heading:r}=this.getAttr(),a=new Set(String(e).split(/\s+/)),l=this.hasAttribute("controls"),n=this.area,o=!!n?.docked,i=!!n?.expanded,d=this.container?.localName==="pop-modal";this.$heading.text(r??""),this.$close.attr({hidden:!(a.has("close")&&(l||o||d))}),this.$expand.attr({hidden:!(a.has("expand")&&o),"aria-label":i?"collapse":"expand"}),this.$expand.$("svg-icon").attr({icon:i?"lucide:minimize-2":"lucide:maximize-2"})}}h.init("app-panel");export{h as AppPanel,h as default};
