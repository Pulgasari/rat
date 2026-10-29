var h=Object.defineProperty;var l=(s,t)=>h(s,"name",{value:t,configurable:!0});import{A as d,h as c}from"./index-D-u4qg2H.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as f}from"./template-CBvUiAS5.js";import"https://esm.sh/jsr/@pulgasari/logger";const p=["B","KB","MB","GB"],m=l(s=>{let t=Number(s)||0,e=0;for(;t>=1024&&e<p.length-1;)t/=1024,e++;return`${t<10&&e?t.toFixed(1):Math.round(t)} ${p[e]}`},"formatSize"),u=l((s,t)=>t?t.split(",").map(e=>e.trim().toLowerCase()).filter(Boolean).some(e=>e.startsWith(".")?s.name.toLowerCase().endsWith(e):e.endsWith("/*")?s.type.startsWith(e.slice(0,-1)):s.type.toLowerCase()===e):!0,"matches");class g extends d{static{l(this,"InputFile")}static reflect=["look"];static attr={accept:String,directory:Boolean,look:{type:String,default:"dropzone",values:["dropzone","button","list"]},maxSize:Number,multiple:Boolean,text:"drop files here or click to browse"};static shadow=!0;static styles=`
    :host {
      display        : flex;
      flex-direction : column;
      gap            : --space(small);
    }

    [part~="zone"] {
      align-items     : center;
      background      : none;
      color           : inherit;
      cursor          : pointer;
      display         : flex;
      flex-direction  : column;
      font            : inherit;
      gap             : --space(small);
      justify-content : center;
      margin          : 0;
      padding         : --space(large);
      text-align      : center;

      > svg-icon { --icon-size: 1.75em; }
    }

    :host([look="button"]) [part~="zone"] {
      flex-direction : row;
      padding        : --space(small);
    }

    :host([look="list"]) [part~="zone"] { display: none; }

    [part~="list"] {
      display        : flex;
      flex-direction : column;
      gap            : --space(tiny);
      list-style     : none;
      margin         : 0;
      padding        : 0;
    }

    [part~="file"] {
      align-items : center;
      display     : flex;
      gap         : --space(small);
    }

    [part~="name"] {
      flex            : 1 1 auto;
      min-inline-size : 0;
      overflow        : hidden;
      text-overflow   : ellipsis;
      white-space     : nowrap;
    }

    [part~="size"] {
      flex                 : none;
      font-size            : inherit;
      font-variant-numeric : tabular-nums;
      opacity              : 0.65;
    }

    [part~="remove"] {
      align-items : center;
      background  : none;
      border      : 0;
      color       : inherit;
      cursor      : pointer;
      display     : inline-flex;
      font        : inherit;
      margin      : 0;
      padding     : 0;
      flex        : none;
    }
  `;get multiple(){return this.getAttr("multiple")}get type(){return"file"}get files(){return this._files??=[]}get formValue(){const{name:t}=this.getAttr();if(!this.files.length||!t)return null;const e=new FormData;for(const i of this.files)e.append(t,i,i.name);return e}onConnected(){this.on("change",'input[type="file"]',(t,e)=>this.add([...e.files])),this.on("click",'[part~="zone"]',()=>{this.disabled||this.field?.click()}),this.on("click","[data-remove]",(t,e)=>this.remove(Number(e.dataset.remove))),this.on("dragenter dragover",t=>{this.disabled||(t.preventDefault(),this.states.toggle("dragging",!0))}),this.on("dragleave",t=>{this.contains(t.relatedTarget)||this.states.toggle("dragging",!1)}),this.on("drop",t=>{t.preventDefault(),this.states.toggle("dragging",!1),this.disabled||this.add([...t.dataTransfer?.files??[]])})}add(t){const{accept:e,maxSize:i,multiple:o}=this.getAttr(),n=[],r=[];for(const a of t)u(a,e)?i&&a.size>i?r.push({file:a,reason:"size"}):n.push(a):r.push({file:a,reason:"type"});return this._files=o?[...this.files,...n]:n.slice(0,1),this._rejected=r,r.length&&this.emit("input-file-rejected",{rejected:r}),this.commitFiles(),this}remove(t){return this._files=this.files.filter((e,i)=>i!==t),this.commitFiles(),this}clear(){return this._files=[],this.commitFiles(),this}commitFiles(){return this.invalidate().update(),this.notify(),this.emit("input-file",{files:this.files}),this}onFormReset(){this._files=[],this._rejected=[],this.invalidate().update()}validate(){const t=this.internals;if(!t)return this;const e=this.part("zone").node??this;return this._rejected?.length?t.setValidity({typeMismatch:!0},"one or more files were rejected.",e):this.getAttr("required")&&!this.files.length?t.setValidity({valueMissing:!0},"please select a file.",e):t.setValidity({}),this}render(){const{accept:t,directory:e,multiple:i,text:o}=this.getAttr();return c`
      <input type="file" hidden ...${f({accept:t,multiple:i,webkitdirectory:e})} />
      <button type="button" part="zone">
        <svg-icon part="icon" icon="lucide:upload"></svg-icon>
        <span part="text"><slot>${o}</slot></span>
      </button>
      ${this.files.length>0&&c`
        <ul part="list">
          ${this.files.map((n,r)=>c`
            <li part="file">
              <span part="name">${n.name}</span>
              <small part="size">${m(n.size)}</small>
              <button type="button" part="remove" data-remove="${r}" aria-label="remove ${n.name}">
                <svg-icon icon="lucide:x"></svg-icon>
              </button>
            </li>
          `)}
        </ul>
      `}
    `}sync(){super.sync(),this.states.toggle("filled",this.files.length>0)}}g.init();export{g as default};
