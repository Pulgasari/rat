var r=Object.defineProperty;var o=(e,a)=>r(e,"name",{value:a,configurable:!0});import"./svg-icon-Dd-pgQOS.js";import{a as s}from"./index-DU5ugZhf.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";class l extends s{static{o(this,"DashPanel")}static shadow=!0;static parts=["collapse","heading"];static reflect=["collapsed"];static attr={collapsed:Boolean,collapsible:Boolean,heading:String,name:String,rows:{type:String,var:"--dash-rows"},span:{type:String,var:"--dash-span"}};static styles=`
    :host {
      background-color : var(--dash-panel-background, color-mix(in oklab, currentColor 4%, transparent));
      border           : 1px solid color-mix(in oklab, currentColor 12%, transparent);
      border-radius    : var(--dash-panel-radius, --radius());
      box-sizing       : border-box;
      display          : flex;
      flex-direction   : column;
      grid-column      : span min(var(--dash-span, 1), var(--dash-columns, 1));
      grid-row         : span var(--dash-rows, 1);
      min-inline-size  : 0;
    }

    [part="header"] {
      align-items : center;
      display     : flex;
      flex        : none;
      gap         : --space(small);
      padding     : var(--dash-panel-header-padding, --space(small) --space(normal));
    }

    [part="heading"] {
      flex            : 1 1 auto;
      font-weight     : 600;
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

      &:hover         { background-color: color-mix(in oklab, currentColor 8%, transparent); }
      &:focus-visible { outline: 2px solid color-mix(in oklab, currentColor 55%, transparent); }
      &[hidden]       { display: none; }
    }

    [part="body"] {
      flex           : 1 1 auto;
      min-block-size : 0;
      overflow       : auto;
      padding        : var(--dash-panel-padding, 0 --space(normal) --space(normal));
    }

    :host([collapsed])                { align-self: start; }
    :host([collapsed]) [part="body"]  { display: none; }
  `;render(){return`
      <header part="header">
        <slot name="start"></slot>
        <strong part="heading"></strong>
        <slot name="actions"></slot>
        <button type="button" part="collapse"><svg-icon icon="chevron-up"></svg-icon></button>
      </header>
      <div part="body"><slot></slot></div>
    `}collapse(a=!this.collapsed){return a===this.collapsed?this:(this.collapsed=a,this.emit("toggle",{collapsed:a}),this)}onConnected(){this.$collapse.onClick(()=>this.collapse())}sync(){const{collapsed:a,collapsible:n,heading:t}=this.getAttr();this.$heading.text(t??""),this.$collapse.attr({"aria-expanded":String(!a),"aria-label":a?"expand":"collapse",hidden:!n}),this.$collapse.$("svg-icon").attr({icon:a?"chevron-down":"chevron-up"})}}l.init("dash-panel");export{l as DashPanel,l as default};
