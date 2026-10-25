var c=Object.defineProperty;var d=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var p=(o,e)=>c(o,"name",{value:e,configurable:!0});var i=(o,e,t)=>d(o,typeof e!="symbol"?e+"":e,t);import{a as y,h as l}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const b="https://www.youtube-nocookie.com/embed/",f="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",r=class r extends y{get player(){return this.$(":scope > video").node}render(){const{label:e,src:t,youtubeId:s}=this.getAttr();return s?l`
      <iframe src="${b}${encodeURIComponent(s)}?rel=0" title="${e}" allow="${f}" allowfullscreen></iframe>
    `:t?l`<video src="${t}"></video>`:l``}sync(){const e=this.player;if(!e)return;const{autoplay:t,controls:s,loop:u,muted:m,poster:n}=this.getAttr();Object.assign(e,{autoplay:t,controls:s,loop:u,muted:m}),n?e.poster=n:e.removeAttribute("poster")}};p(r,"MediaVideo"),i(r,"attr",{autoplay:Boolean,controls:!0,label:"Video player",loop:Boolean,muted:Boolean,poster:String,src:String,youtubeId:String}),i(r,"styles",`media-video {
    display: block;

    > video { display: block; inline-size: 100%; }

    > iframe {
      aspect-ratio : 16 / 9;
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }
  }`);let a=r;a.init();export{a as default};
