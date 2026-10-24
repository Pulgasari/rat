import{A as p,h as o}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import{a as h}from"./template-CbX1Mzd8.js";import"https://esm.sh/jsr/@pulgasari/logger";const c=["B","KB","MB","GB"],d=r=>{let t=Number(r)||0,e=0;for(;t>=1024&&e<c.length-1;)t/=1024,e++;return`${t<10&&e?t.toFixed(1):Math.round(t)} ${c[e]}`},f=(r,t)=>t?t.split(",").map(e=>e.trim().toLowerCase()).filter(Boolean).some(e=>e.startsWith(".")?r.name.toLowerCase().endsWith(e):e.endsWith("/*")?r.type.startsWith(e.slice(0,-1)):r.type.toLowerCase()===e):!0;class u extends p{static reflect=["look"];static attr={accept:String,directory:Boolean,look:{type:String,default:"dropzone",values:["dropzone","button","list"]},maxSize:Number,multiple:Boolean,text:"drop files here or click to browse"};static shadow=!0;static styles=`
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
  `;get multiple(){return this.getAttr("multiple")}get type(){return"file"}get files(){return this._files??=[]}get formValue(){const{name:t}=this.getAttr();if(!this.files.length||!t)return null;const e=new FormData;for(const i of this.files)e.append(t,i,i.name);return e}onConnected(){this.on("change",'input[type="file"]',(t,e)=>this.add([...e.files])),this.on("click",'[part~="zone"]',()=>{this.disabled||this.field?.click()}),this.on("click","[data-remove]",(t,e)=>this.remove(Number(e.dataset.remove))),this.on("dragenter dragover",t=>{this.disabled||(t.preventDefault(),this.states.toggle("dragging",!0))}),this.on("dragleave",t=>{this.contains(t.relatedTarget)||this.states.toggle("dragging",!1)}),this.on("drop",t=>{t.preventDefault(),this.states.toggle("dragging",!1),this.disabled||this.add([...t.dataTransfer?.files??[]])})}add(t){const{accept:e,maxSize:i,multiple:l}=this.getAttr(),s=[],n=[];for(const a of t)f(a,e)?i&&a.size>i?n.push({file:a,reason:"size"}):s.push(a):n.push({file:a,reason:"type"});return this._files=l?[...this.files,...s]:s.slice(0,1),this._rejected=n,n.length&&this.emit("input-file-rejected",{rejected:n}),this.commitFiles(),this}remove(t){return this._files=this.files.filter((e,i)=>i!==t),this.commitFiles(),this}clear(){return this._files=[],this.commitFiles(),this}commitFiles(){return this.invalidate().update(),this.notify(),this.emit("input-file",{files:this.files}),this}onFormReset(){this._files=[],this._rejected=[],this.invalidate().update()}validate(){const t=this.internals;if(!t)return this;const e=this.part("zone").node??this;return this._rejected?.length?t.setValidity({typeMismatch:!0},"one or more files were rejected.",e):this.getAttr("required")&&!this.files.length?t.setValidity({valueMissing:!0},"please select a file.",e):t.setValidity({}),this}render(){const{accept:t,directory:e,multiple:i,text:l}=this.getAttr();return o`
      <input type="file" hidden ...${h({accept:t,multiple:i,webkitdirectory:e})} />
      <button type="button" part="zone">
        <svg-icon part="icon" icon="lucide:upload"></svg-icon>
        <span part="text"><slot>${l}</slot></span>
      </button>
      ${this.files.length>0&&o`
        <ul part="list">
          ${this.files.map((s,n)=>o`
            <li part="file">
              <span part="name">${s.name}</span>
              <small part="size">${d(s.size)}</small>
              <button type="button" part="remove" data-remove="${n}" aria-label="remove ${s.name}">
                <svg-icon icon="lucide:x"></svg-icon>
              </button>
            </li>
          `)}
        </ul>
      `}
    `}sync(){super.sync(),this.states.toggle("filled",this.files.length>0)}}u.init("input-file");export{u as default};
