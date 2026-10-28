var l=Object.defineProperty;var s=(t,i)=>l(t,"name",{value:i,configurable:!0});import{a,h as r}from"./index-CvuAKKlM.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as o}from"./template-DH207kky.js";import"https://esm.sh/jsr/@pulgasari/logger";class c extends a{static{s(this,"SvgSprite")}static attr={icon:String,label:String,size:String,src:String,viewbox:String};static styles=`svg-sprite {
    block-size     : var(--sprite-size, 1em);
    display        : inline-block;
    fill           : currentColor;
    flex           : none;
    inline-size    : var(--sprite-size, 1em);
    line-height    : 0;
    vertical-align : var(--sprite-align, -0.125em);

    > svg { block-size: 100%; inline-size: 100%; }

    &:not([icon]) { display: none; }
  }`;render(){const{icon:i,src:e,viewbox:n}=this.getAttr();return i?r`<svg aria-hidden="true" ...${o({viewBox:n})}><use href="${e??""}#${i}"></use></svg>`:r``}sync(){const{label:i,size:e}=this.getAttr();this.setVar({"--sprite-size":e}),this.internals&&(this.internals.role=i?"img":null,this.internals.ariaLabel=i||null,this.internals.ariaHidden=i?null:"true")}}c.init();export{c as default};
