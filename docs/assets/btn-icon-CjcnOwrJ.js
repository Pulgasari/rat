var n=Object.defineProperty;var i=(t,s)=>n(t,"name",{value:s,configurable:!0});import{B as a}from"./Btn-g82SPL8Y.js";import{h as e}from"./index-BtCkjzHf.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"./svg-icon-CrJpsOx_.js";import"https://esm.sh/jsr/@pulgasari/logger";class r extends a{static{i(this,"BtnIcon")}static styles=`
    :host {
      aspect-ratio : 1;
      font-size    : var(--btn-icon-size, 1.15em);
      padding      : var(--btn-padding, --space(tiny));
    }

    [part="label"] { display: none; }
  `;render(){return e`<svg-icon part="icon" icon="${this.iconName??""}"></svg-icon><span part="label"><slot></slot></span>`}sync(){super.sync(),this.internals&&(this.internals.ariaLabel=this.getAttr("label")??(this.textContent.trim()||this.preset.label)??null)}}r.init();export{r as default};
