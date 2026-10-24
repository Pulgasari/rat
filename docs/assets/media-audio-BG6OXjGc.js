var p=Object.defineProperty;var g=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var u=(e,t)=>p(e,"name",{value:t,configurable:!0});var o=(e,t,i)=>g(e,typeof t!="symbol"?t+"":t,i);import{a as d,h as l}from"./index-zRU6UDoC.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const m=u(e=>Number.isFinite(e)?`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`:"0:00","formatTime"),n=class n extends d{constructor(){super(),this._audio=new Audio}get playing(){return!this._audio.paused}onConnected(){const t=this._audio;this.$(t).on("loadedmetadata timeupdate",()=>this.syncProgress()),this.$(t).on("play pause ended",()=>{this.syncPlayState(),this.emit("media-audio-play",{isPlaying:this.playing})}),this.on("click",":scope > button",()=>this.toggle()),this.on("input",":scope > input",(i,s)=>{const a=Number(s.value)/100*t.duration;Number.isFinite(a)&&(t.currentTime=a)})}onDisconnected(){this._audio.pause()}play(){return this._audio.src&&this._audio.play().catch(t=>console.warn("[media-audio] playback refused:",t)),this}pause(){return this._audio.pause(),this}toggle(){return this.playing?this.pause():this.play()}render(){const{artist:t,cover:i,label:s,layout:a}=this.getAttr(),r=a!=="minimal";return l`
      ${i&&r&&l`<img src="${i}" alt="" />`}
      <strong>${s}</strong>
      ${t&&l`<span>${t}</span>`}
      <button type="button" aria-label="play"><svg-icon icon="lucide:play"></svg-icon></button>
      ${r&&l`
        <time>0:00</time>
        <input type="range" min="0" max="100" step="0.1" value="0" aria-label="seek" />
        <time>0:00</time>
      `}
    `}sync(){const{autoplay:t,label:i,loop:s,src:a}=this.getAttr(),r=this._audio;r.loop=s,a&&r.getAttribute("src")!==a&&(r.src=a,t&&this.play()),this.internals&&(this.internals.role="group",this.internals.ariaLabel=i),this.syncPlayState(),this.syncProgress()}syncPlayState(){const t=this.playing,i=this.$(":scope > button");i.attr({"aria-label":t?"pause":"play"}),i.$("svg-icon").attr({icon:t?"lucide:pause":"lucide:play"}),this.states.toggle("playing",t)}syncProgress(){const{currentTime:t,duration:i}=this._audio,[s,a]=this.$$(":scope > time"),r=this.$(":scope > input").node;s&&(s.textContent=m(t)),a&&(a.textContent=m(i)),r&&r!==document.activeElement&&i&&(r.value=String(t/i*100))}};u(n,"MediaAudio"),o(n,"reflect",["layout"]),o(n,"attr",{artist:String,autoplay:Boolean,cover:String,label:"Unknown Title",layout:{type:String,default:"card",values:["card","minimal"]},loop:Boolean,src:String}),o(n,"styles",`media-audio {
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
  }`);let c=n;c.init();export{c as default};
