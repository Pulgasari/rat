import{a as l,h as n}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const o=s=>Number.isFinite(s)?`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`:"0:00";class u extends l{static reflect=["layout"];static attr={artist:String,autoplay:Boolean,cover:String,label:"Unknown Title",layout:{type:String,default:"card",values:["card","minimal"]},loop:Boolean,src:String};static styles=`media-audio {
    align-items           : center;
    column-gap            : --space(normal);
    display               : grid;
    grid-template-areas   : "cover title   title   title title"
                            "cover artist  artist  artist artist"
                            "cover play    current seek  duration";
    grid-template-columns : auto auto auto 1fr auto;

    &:not(:has(> img)) {
      grid-template-areas   : "title   title   title title"
                              "artist  artist  artist artist"
                              "play    current seek  duration";
      grid-template-columns : auto auto 1fr auto;
    }

    &[layout="minimal"] {
      grid-template-areas   : "play title" "play artist";
      grid-template-columns : auto 1fr;
    }

    > img {
      block-size  : var(--audio-cover-size, 4em);
      grid-area   : cover;
      inline-size : var(--audio-cover-size, 4em);
      object-fit  : cover;
    }

    > strong { grid-area: title; }
    > span   { grid-area: artist; opacity: 0.7; }

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
      grid-area   : play;
    }

    > input { grid-area: seek; inline-size: 100%; margin: 0; }

    > time {
      font-size            : 0.8em;
      font-variant-numeric : tabular-nums;
    }

    > time:first-of-type { grid-area: current; }
    > time:last-of-type  { grid-area: duration; }
  }`;constructor(){super(),this._audio=new Audio}get playing(){return!this._audio.paused}onConnected(){const t=this._audio;this.$(t).on("loadedmetadata timeupdate",()=>this.syncProgress()),this.$(t).on("play pause ended",()=>{this.syncPlayState(),this.emit("media-audio-play",{isPlaying:this.playing})}),this.on("click",":scope > button",()=>this.toggle()),this.on("input",":scope > input",(i,r)=>{const e=Number(r.value)/100*t.duration;Number.isFinite(e)&&(t.currentTime=e)})}onDisconnected(){this._audio.pause()}play(){return this._audio.src&&this._audio.play().catch(t=>console.warn("[media-audio] playback refused:",t)),this}pause(){return this._audio.pause(),this}toggle(){return this.playing?this.pause():this.play()}render(){const{artist:t,cover:i,label:r,layout:e}=this.getAttr(),a=e!=="minimal";return n`
      ${i&&a&&n`<img src="${i}" alt="" />`}
      <strong>${r}</strong>
      ${t&&n`<span>${t}</span>`}
      <button type="button" aria-label="play"><svg-icon icon="lucide:play"></svg-icon></button>
      ${a&&n`
        <time>0:00</time>
        <input type="range" min="0" max="100" step="0.1" value="0" aria-label="seek" />
        <time>0:00</time>
      `}
    `}sync(){const{autoplay:t,label:i,loop:r,src:e}=this.getAttr(),a=this._audio;a.loop=r,e&&a.getAttribute("src")!==e&&(a.src=e,t&&this.play()),this.internals&&(this.internals.role="group",this.internals.ariaLabel=i),this.syncPlayState(),this.syncProgress()}syncPlayState(){const t=this.playing,i=this.$(":scope > button");i.attr({"aria-label":t?"pause":"play"}),i.$("svg-icon").attr({icon:t?"lucide:pause":"lucide:play"}),this.states.toggle("playing",t)}syncProgress(){const{currentTime:t,duration:i}=this._audio,[r,e]=this.$$(":scope > time"),a=this.$(":scope > input").node;r&&(r.textContent=o(t)),e&&(e.textContent=o(i)),a&&a!==document.activeElement&&i&&(a.value=String(t/i*100))}}u.init("media-audio");export{u as default};
