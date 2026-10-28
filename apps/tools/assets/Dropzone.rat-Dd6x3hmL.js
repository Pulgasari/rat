var d=Object.defineProperty;var t=(l,r)=>d(l,"name",{value:r,configurable:!0});import{H as c,M as p,h as s}from"./index-BqtsWe95.js";import{l as a}from"./app.rat-DP92pCm3.js";function m(l,r){return $.call({props:l},l,r)}t(m,"DropzoneRatHtml");function $(l,r){let o=c(null),n=c(!1);const i=t(e=>{e?.length&&l.onfiles([...e])},"hand");function u(e){e.preventDefault(),n.value=!1,i(e.dataTransfer?.files)}t(u,"dropped");function f(e){i(e.currentTarget.files),e.currentTarget.value=""}return t(f,"picked"),s`
    <div.dropzone class:over=${()=>n.value} onclick=${a(()=>o.value?.click())} ondragover=${a(e=>{e.preventDefault(),n.value=!0})} ondragleave=${a(e=>{e.target===e.currentTarget&&(n.value=!1)})} ondrop=${a(u)}>
      <svg-icon icon="upload" />
      <p>Drop ${()=>l.what??"files"} here, or click to choose</p>
      <input type="file" hidden accept=${()=>l.accept} multiple=${()=>l.multiple??!1} ref=${p(o)} onchange=${a(f)} />
    </div>
  `}t($,"$$DropzoneRatHtml");export{m as D};
