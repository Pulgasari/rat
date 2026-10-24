import{a as l,h as r}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const n="https://www.youtube-nocookie.com/embed/",c="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";class d extends l{static attr={autoplay:Boolean,controls:!0,label:"Video player",loop:Boolean,muted:Boolean,poster:String,src:String,youtubeId:String};static styles=`media-video {
    display: block;

    > video { display: block; inline-size: 100%; }

    > iframe {
      aspect-ratio : 16 / 9;
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }
  }`;get player(){return this.$(":scope > video").node}render(){const{label:e,src:t,youtubeId:o}=this.getAttr();return o?r`
      <iframe src="${n}${encodeURIComponent(o)}?rel=0" title="${e}" allow="${c}" allowfullscreen></iframe>
    `:t?r`<video src="${t}"></video>`:r``}sync(){const e=this.player;if(!e)return;const{autoplay:t,controls:o,loop:s,muted:a,poster:i}=this.getAttr();Object.assign(e,{autoplay:t,controls:o,loop:s,muted:a}),i?e.poster=i:e.removeAttribute("poster")}}d.init("media-video");export{d as default};
