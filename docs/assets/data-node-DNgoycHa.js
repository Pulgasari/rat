var o=Object.defineProperty;var p=(s,e,t)=>e in s?o(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var d=(s,e)=>o(s,"name",{value:e,configurable:!0});var r=(s,e,t)=>p(s,typeof e!="symbol"?e+"":e,t);import{a as u,h as g}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const n={file:"lucide:file-text",folder:"lucide:folder",open:"lucide:folder-open"},i=class i extends u{get items(){return[...this.children].filter(e=>e.localName==="data-node")}get hasChildren(){return this.items.length>0}get tree(){return this.closest("data-tree")}get level(){let e=1;for(let t=this.parentElement;t&&t.localName!=="data-tree";t=t.parentElement)t.localName==="data-node"&&(e+=1);return e}render(){return g`<div part="row"><svg-icon part="icon"></svg-icon><span part="label"></span></div><slot></slot>`}expand(e=!0){return this.setExpanded(e)}collapse(){return this.setExpanded(!1)}toggle(){return this.setExpanded(!this.getAttr("expanded"))}setExpanded(e){return!this.hasChildren||e===this.getAttr("expanded")?this:(this.setAttr({expanded:e}),this.tree?.syncFocus(),this.emit("data-tree-toggle",{element:this,expanded:e,label:this.getAttr("label"),value:this.getAttr("value")}),this)}select(){return this.$(this.tree).$$("data-node[selected]").attr({selected:!1}),this.setAttr({selected:!0}),this.tree?.syncFocus(),this.emit("data-tree-select",{element:this,label:this.getAttr("label"),value:this.getAttr("value")}),this}sync(){if(!this.$row.size)return;const{expanded:e,icon:t,label:h,selected:c}=this.getAttr(),l=this.hasChildren;this.$icon.attr({icon:t||(l?e?n.open:n.folder:n.file)}),this.$label.text(h),this.states.toggle("branch",l),this.internals&&(this.internals.ariaExpanded=l?String(e):null,this.internals.ariaLevel=String(this.level),this.internals.ariaSelected=String(c))}};d(i,"DataNode"),r(i,"internals",{role:"treeitem"}),r(i,"shadow",!0),r(i,"parts",["icon","label","row"]),r(i,"attr",{expanded:Boolean,icon:String,label:"Item",selected:Boolean,value:String}),r(i,"styles",`
    :host {
      --tree-indent : 1rem;

      display : block;
      outline : none;
    }

    [part~="row"] {
      align-items : center;
      cursor      : pointer;
      display     : flex;
      gap         : --space(tiny);
      padding     : --space(tiny);

      &::before {
        block-size        : 0.4em;
        border-block-end  : 1.5px solid;
        border-inline-end : 1.5px solid;
        content           : '';
        flex              : none;
        inline-size       : 0.4em;
        rotate            : -45deg;
        transition        : rotate 0.12s ease;
        visibility        : hidden;
      }
    }

    :host(:state(branch)) [part~="row"]::before { visibility: visible; }
    :host([expanded]) [part~="row"]::before     { rotate: 45deg; }

    [part~="icon"] { flex: none; }

    [part~="label"] {
      flex            : 1 1 auto;
      min-inline-size : 0;
      overflow        : hidden;
      text-overflow   : ellipsis;
      white-space     : nowrap;
    }

    slot { display: block; padding-inline-start: var(--tree-indent); }
    :host(:not([expanded])) slot { display: none; }
  `);let a=i;a.init();export{a as default};
