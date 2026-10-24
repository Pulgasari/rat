var n=Object.defineProperty;var h=(e,t,i)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var d=(e,t)=>n(e,"name",{value:t,configurable:!0});var s=(e,t,i)=>h(e,typeof t!="symbol"?t+"":t,i);import{a as p,c as g,h as c}from"./index-BcM9qEFI.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const u=":root:has(pop-modal:state(open)) { overflow: hidden; }",a=class a extends p{get dialog(){return this.$dialog.node}get isOpen(){return!!this.dialog?.open}show(){return this._closed??=new Promise(t=>{this._resolve=t}),this.setAttr({open:!0}),this._closed}close(t){return this.isOpen&&this.dialog.close(t),this}toggle(){return this.isOpen?this.close():this.show()}onConnected(){g("pop-modal-page",u),this.$close.onClick(()=>this.close()),this.$dialog.onClick(t=>{t.target===this.dialog&&this.getAttr("dismissible")&&this.close()}),this.on("submit",t=>{t.target.getAttribute("method")?.toLowerCase()==="dialog"&&(t.preventDefault(),this.close(t.submitter?.value??""))}),this.$dialog.on("cancel",t=>{this.getAttr("dismissible")||t.preventDefault()}),this.$dialog.on("close",()=>{const t=this.dialog.returnValue;this.states.delete("open"),this.getAttr("open")&&this.setAttr({open:!1}),this.emit("pop-modal",{open:!1,returnValue:t}),this._resolve?.(t),this._closed=this._resolve=null})}render(){return c`
      <dialog part="dialog">
        <header part="header">
          <strong part="heading"></strong>
          <button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>
        </header>
        ${this.renderBody()}
      </dialog>
    `}renderBody(){return c`<slot></slot>`}sync(){const t=this.dialog;if(!t)return;const{dismissible:i,heading:o,open:l}=this.getAttr();this.$heading.text(o??"").attr({hidden:!o}),this.$close.attr({hidden:!i}),this.$header.attr({hidden:!o&&!i}),o?t.setAttribute("aria-label",o):t.removeAttribute("aria-label"),l&&!t.open&&(t.returnValue="",t.showModal(),this.states.add("open"),this.emit("pop-modal",{open:!0})),!l&&t.open&&t.close()}};d(a,"PopModal"),s(a,"shadow",!0),s(a,"parts",["close","dialog","header","heading"]),s(a,"attr",{dismissible:{type:Boolean,default:!0},heading:String,open:Boolean}),s(a,"styles",`
    :host { display: contents; }

    dialog {
      --modal-duration: 0.2s;

      box-sizing      : border-box;
      max-block-size  : min(var(--modal-max-block-size, 85dvh), calc(100dvh - 2rem));
      max-inline-size : min(var(--modal-size, 32rem), calc(100vw - 2rem));
      opacity         : 0;
      translate       : 0 0.75rem;
      transition      :
        opacity   var(--modal-duration) ease,
        translate var(--modal-duration) ease,
        display   var(--modal-duration) allow-discrete,
        overlay   var(--modal-duration) allow-discrete;

      &[open] {
        display        : flex;
        flex-direction : column;
        gap            : --space(normal);
        opacity        : 1;
        translate      : 0 0;

        @starting-style { opacity: 0; translate: 0 0.75rem; }
      }

      &::backdrop {
        background-color : transparent;
        transition       :
          background-color var(--modal-duration) ease,
          display          var(--modal-duration) allow-discrete,
          overlay          var(--modal-duration) allow-discrete;
      }

      &[open]::backdrop {
        background-color: var(--modal-backdrop, rgb(0 0 0 / 0.45));

        @starting-style { background-color: transparent; }
      }
    }

    header {
      align-items     : center;
      display         : flex;
      gap             : --space(small);
      justify-content : flex-end;

      > strong { flex: 1 1 auto; font-weight: 600; }

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

    @media (prefers-reduced-motion: reduce) {
      dialog { --modal-duration: 0s; }
    }
  `);let r=a;r.init();export{r as default};
