var c=Object.defineProperty;var l=(i,e)=>c(i,"name",{value:e,configurable:!0});import{a as p,h as r}from"./index-Ddjzuyg9.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const d="https://www.youtube-nocookie.com/embed/",u="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";class m extends p{static{l(this,"MediaVideo")}static attr={autoplay:Boolean,controls:!0,label:"Video player",loop:Boolean,muted:Boolean,poster:String,src:String,youtubeId:String};static styles=`media-video {
    display: block;

    > video { display: block; inline-size: 100%; }

    > iframe {
      aspect-ratio : 16 / 9;
      border       : 0;
      display      : block;
      inline-size  : 100%;
    }
  }`;get player(){return this.$(":scope > video").node}render(){const{label:e,src:t,youtubeId:o}=this.getAttr();return o?r`
      <iframe src="${d}${encodeURIComponent(o)}?rel=0" title="${e}" allow="${u}" allowfullscreen></iframe>
    `:t?r`<video src="${t}"></video>`:r``}sync(){const e=this.player;if(!e)return;const{autoplay:t,controls:o,loop:a,muted:n,poster:s}=this.getAttr();Object.assign(e,{autoplay:t,controls:o,loop:a,muted:n}),s?e.poster=s:e.removeAttribute("poster")}}m.init();export{m as default};
