var ve=Object.defineProperty;var n=(t,e)=>ve(t,"name",{value:e,configurable:!0});import{z as ft,E as Kt,G as W,f as N,h as w,H as Ct,w as D,J as G,P as $e,n as we,K as P,L as be,_ as xe,M as mt,O as Se,Q as Te}from"./index-Dt7wPgEn.js";import{p as Ee,a as Me}from"./keys-CWTtq0D5.js";import{c as Ce}from"./store-D22fjUgZ.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function L(t,{keys:e=null,prevent:s=!1,times:f=0}={}){const i=e?Ee(e):null;let r=f;return function(l){if(!(f&&!r)&&!(i&&!Me(l,i))){s&&l.preventDefault(),f&&r--;try{const a=(typeof t=="string"?ft(t):t).call(this,l);typeof a?.catch=="function"&&a.catch(u=>Kt(this,u))}catch(a){Kt(this,a)}}}}n(L,"listener");function Ie(t,{stale:e=!1,ttl:s=1/0}={}){const f=new Map;function i(r,l){if(!f.has(r)){const a=Promise.resolve().then(l).then(async u=>(await t.set(r,{at:Date.now(),value:u}),u)).finally(()=>f.delete(r));f.set(r,a)}return f.get(r)}return n(i,"load"),{store:t,async get(r,l){const a=await t.get(r);return a!==void 0&&Date.now()-a.at<s?a.value:a!==void 0&&e?(l&&i(r,l).catch(()=>{}),a.value):l?i(r,l):void 0},clear:n(()=>t.clear(),"clear"),delete:n(r=>t.delete(r),"delete")}}n(Ie,"memo");const Le=100,st={down:"down",left:"left",right:"right",up:"up"},j=new Map,Jt=n((t,e)=>t===0&&e===0?null:Math.abs(t)>=Math.abs(e)?t>0?st.right:st.left:e>0?st.down:st.up,"directionOf"),De=n((t,e)=>{const s=(e-t)%360;return s>180?s-360:s<=-180?s+360:s},"turn"),Ut=n((t,e)=>Math.atan2(e.y-t.y,e.x-t.x)*180/Math.PI,"angleBetween"),Yt=n((t,e)=>Math.hypot(e.x-t.x,e.y-t.y),"distanceOf");function ke(t,e,{coalesced:s=!1,yielding:f=!1}={}){const i=new Map;let r=null,l=null,a=!1;const u=n(()=>{let c=0,$=0;for(const C of i.values())c+=C.x,$+=C.y;return{x:c/i.size,y:$/i.size}},"centerOf"),y=n(()=>{const[c,$]=i.values();return[c,$]},"firstTwo"),h=n(()=>{if(i.size<2){l.pair=null;return}const[c,$]=y();l.pair={angle:Ut(c,$),distance:Yt(c,$)||1,rotation:r.rotation,scale:r.scale}},"rebasePair"),v=n(()=>{const c=u();r.start={x:r.start.x+c.x-r.center.x,y:r.start.y+c.y-r.center.y},r.center=c,l.samples.length=0},"rebaseCenter");function m(c){const $=u(),C={x:$.x-r.start.x,y:$.y-r.start.y},R=c.timeStamp;r.buttons=c.buttons,r.movement={x:$.x-r.center.x,y:$.y-r.center.y},r.center=$,r.delta=C,r.direction=Jt(C.x,C.y),r.distance=Math.hypot(C.x,C.y),r.angle=r.distance?Math.atan2(C.y,C.x)*180/Math.PI:0,r.duration=R-l.startTime,r.modifiers={alt:c.altKey,control:c.ctrlKey,meta:c.metaKey,shift:c.shiftKey},r.pointerId=c.pointerId,r.pointers=i.size,r.pressure=c.pressure??0,r.sourceEvent=c,r.tilt={x:c.tiltX??0,y:c.tiltY??0},r.time=R,r.travel=Math.max(r.travel,r.distance),r.twist=c.twist??0,s&&(r.coalesced=(c.getCoalescedEvents?.()??[c]).map(k=>({pressure:k.pressure,time:k.timeStamp,x:k.clientX,y:k.clientY})));const d=l.samples;for(d.push({time:R,x:$.x,y:$.y});d.length>2&&R-d[0].time>Le;)d.shift();const b=d[0],S=R-b.time,I=S>0?($.x-b.x)/S:0,E=S>0?($.y-b.y)/S:0;if(r.velocity={speed:Math.hypot(I,E),x:I,y:E},l.pair){const[k,T]=y(),X=Ut(k,T);r.rotation=l.pair.rotation+De(l.pair.angle,X),r.scale=l.pair.scale*Yt(k,T)/l.pair.distance}}n(m,"measure");const p={abort:n(()=>x(),"abort"),yielding:f};function o(){for(const c of i.keys()){const $=j.get(c);if($&&$!==p&&!$.yielding)return x(),!1}for(const c of i.keys()){const $=j.get(c);$&&$!==p&&$.abort(),j.set(c,p)}return a=!0,!0}n(o,"own");const g=n(()=>{for(const c of i.keys())j.get(c)===p&&j.delete(c);a=!1},"release");function M(c){const $={x:c.clientX,y:c.clientY};l={pair:null,samples:[],startTime:c.timeStamp},r={angle:0,buttons:c.buttons,center:$,claims:new Set,delta:{x:0,y:0},direction:null,distance:0,duration:0,element:t,input:c.pointerType||"mouse",maximumPointers:1,modifiers:{alt:c.altKey,control:c.ctrlKey,meta:c.metaKey,shift:c.shiftKey},movement:{x:0,y:0},own:o,path:c.composedPath(),phase:"start",pointerId:c.pointerId,pointers:1,pressure:c.pressure??0,rotation:0,scale:1,start:$,target:c.target,tilt:{x:c.tiltX??0,y:c.tiltY??0},time:c.timeStamp,travel:0,twist:c.twist??0,velocity:{speed:0,x:0,y:0},get positions(){return[...i].map(([C,{x:R,y:d}])=>({id:C,x:R,y:d}))}},J(!0)}n(M,"open");function A(){J(!1),g(),i.clear(),r=l=null}n(A,"close");function x(){if(!r)return;r.phase="cancel";const c=r;A(),e.cancel(c,null)}n(x,"abort");function O(c){if(!(c.pointerType==="mouse"&&c.button!==0)){if(r&&c.isPrimary&&c.pointerType===r.input&&x(),i.set(c.pointerId,{x:c.clientX,y:c.clientY}),!r){M(c),m(c),e.start(r,c);return}a&&!j.has(c.pointerId)&&j.set(c.pointerId,p),r.maximumPointers=Math.max(r.maximumPointers,i.size),r.phase="move",v(),h(),m(c),e.move(r,c)}}n(O,"down");function B(c){const $=i.get(c.pointerId);$&&($.x=c.clientX,$.y=c.clientY,r.phase="move",m(c),e.move(r,c))}n(B,"move");function F(c){if(!i.has(c.pointerId))return;if(i.size>1){j.get(c.pointerId)===p&&j.delete(c.pointerId),i.delete(c.pointerId),r.phase="move",v(),h(),m(c),e.move(r,c);return}const $=i.get(c.pointerId);$.x=c.clientX,$.y=c.clientY,r.phase="end",m(c),r.pointers=0;const C=r;A(),e.end(C,c)}n(F,"up");function ct(c){if(!i.has(c.pointerId))return;r.phase="cancel";const $=r;A(),e.cancel($,c)}n(ct,"cancel");const lt=n(()=>{document.visibilityState==="hidden"&&x()},"hidden");function J(c){const $=c?"addEventListener":"removeEventListener";window[$]("pointermove",B),window[$]("pointerup",F),window[$]("pointercancel",ct),window[$]("blur",x),document[$]("visibilitychange",lt)}return n(J,"listen"),t.addEventListener("pointerdown",O),{abort:x,get session(){return r},destroy(){t.removeEventListener("pointerdown",O),r&&A()}}}n(ke,"createTracker");const Ft={mouse:4,pen:8,touch:10},H=n((t,e)=>typeof t=="number"?t:t?.[e]??Ft[e]??Ft.touch,"toleranceFor"),It={userSelect:"none",webkitTouchCallout:"none",webkitUserDrag:"none",webkitUserSelect:"none"},Nt={auto:0,manipulation:1,"pan-x pan-y":1,"pan-x":2,"pan-y":2,none:3},ze=n((t,e)=>t?e?t==="pan-x"&&e==="pan-y"||t==="pan-y"&&e==="pan-x"?"none":(Nt[e]??0)>(Nt[t]??0)?e:t:t:e,"stricterTouchAction"),q=n((t,e)=>(t.claims.add(e),t.own?t.own():!0),"claim"),Ae=["doubleTapDrag","edgeSwipe","secondary"],Zt=n(t=>Ae.some(e=>t.claims.has(e)),"exclusive"),Ht={0:1,1:16,2:400},Qt=n(t=>({x:t.deltaX*Ht[t.deltaMode],y:t.deltaY*Ht[t.deltaMode]}),"normalizeWheel"),wt=n(t=>({alt:t.altKey,control:t.ctrlKey,meta:t.metaKey,shift:t.shiftKey}),"modifiersOf");function te(t,e,s){const f={x:e.clientX,y:e.clientY};return{angle:0,buttons:0,center:f,claims:new Set,delta:{x:0,y:0},direction:null,distance:0,duration:0,element:t,input:s,maximumPointers:0,modifiers:wt(e),movement:{x:0,y:0},path:e.composedPath(),phase:"start",pointerId:null,pointers:0,positions:[],pressure:0,rotation:0,scale:1,start:f,startTime:e.timeStamp,target:e.target,tilt:{x:0,y:0},time:e.timeStamp,travel:0,twist:0,velocity:{speed:0,x:0,y:0}}}n(te,"inputSession");const ee=150;function Lt({element:t,emit:e,options:s}){const{interval:f=300,maximumDuration:i=500,tolerance:r}=s;let l=null,a=!1,u=!1;function y(o,g){const M=H(r,o.input);a=!!l&&g.timeStamp-l.time<=f&&Math.hypot(o.start.x-l.x,o.start.y-l.y)<=M*3,u=!1}n(y,"start");function h(o,g){if(u){if(o.pointers!==1){v("doubleTapDragEnd",o);return}e("doubleTapDragMove",o);return}!a||g?.type!=="pointermove"||o.pointers!==1||o.travel<=H(r,o.input)||(a=!1,q(o,"doubleTapDrag")&&(u=!0,e("doubleTapDragStart",o),e("doubleTapDragMove",o)))}n(h,"move");function v(o,g){u&&e(o,g),u=a=!1,l=null}n(v,"finish");function m(o,g){if(u){v("doubleTapDragEnd",o);return}l=!o.claims.size&&o.maximumPointers===1&&o.duration<=i&&o.travel<=H(r,o.input)&&!a?{time:g.timeStamp,x:o.center.x,y:o.center.y}:null,a=!1}n(m,"end");const p=n(o=>{(a||u)&&o.cancelable&&o.preventDefault()},"holdScroll");return t.addEventListener("touchmove",p,{passive:!1}),{start:y,move:h,end:m,cancel:n(o=>v("doubleTapDragCancel",o),"cancel"),destroy:n(()=>{u=a=!1,l=null,t.removeEventListener("touchmove",p)},"destroy"),touchAction:"manipulation"}}n(Lt,"doubleTapDrag");Lt.gestures=["doubleTapDragCancel","doubleTapDragEnd","doubleTapDragMove","doubleTapDragStart"];Lt.priority=1;const Oe={bottom:n(t=>-t.y>Math.abs(t.x),"bottom"),left:n(t=>t.x>Math.abs(t.y),"left"),right:n(t=>-t.x>Math.abs(t.y),"right"),top:n(t=>t.y>Math.abs(t.x),"top")};function Dt({element:t,emit:e,options:s}){const{edges:f=["left"],relativeTo:i="element",size:r=24,tolerance:l}=s;let a=null,u=null,y=!1;const h=n(()=>i==="viewport"?{bottom:innerHeight,height:innerHeight,left:0,right:innerWidth,top:0,width:innerWidth}:t.getBoundingClientRect(),"boxOf"),v=n(x=>a==="left"||a==="right"?Math.min(1,Math.abs(x.delta.x)/u.width):Math.min(1,Math.abs(x.delta.y)/u.height),"progressOf"),m=n(x=>({edge:a,progress:v(x)}),"detail");function p(x){y=!1,u=h();const{x:O,y:B}=x.start;a=f.find(F=>F==="left"?O-u.left<=r:F==="right"?u.right-O<=r:F==="top"?B-u.top<=r:u.bottom-B<=r)??null}n(p,"start");function o(x){if(a){if(!y){if(x.pointers!==1||x.travel<=H(l,x.input))return;if(!Oe[a](x.delta)){a=null;return}if(!q(x,"edgeSwipe")){a=null;return}y=!0,e("edgeSwipeStart",x,m(x))}e("edgeSwipeMove",x,m(x))}}n(o,"move");function g(x,O){y&&e(x,O,m(O)),y=!1,a=null}n(g,"finish");const M=f.some(x=>x==="left"||x==="right"),A=f.some(x=>x==="top"||x==="bottom");return{start:p,move:o,end:n(x=>g("edgeSwipeEnd",x),"end"),cancel:n(x=>g("edgeSwipeCancel",x),"cancel"),touchAction:M&&A?"none":M?"pan-y":"pan-x"}}n(Dt,"edgeSwipe");Dt.gestures=["edgeSwipeCancel","edgeSwipeEnd","edgeSwipeMove","edgeSwipeStart"];Dt.priority=1;function ne({active:t,element:e,emit:s,options:f}){const{duration:i=500,grace:r=200,tolerance:l}=f,a=t.has("secondary");let u=null;const y=n(()=>{clearTimeout(u),u=null},"stop"),h=n((o,g)=>{u=null,!(o.claims.size||o.pointers===0||o.phase==="cancel")&&q(o,"longPress")&&s("longPress",o,{duration:performance.now()-g})},"fire");function v(o){y();const g=performance.now()-o.duration,M=a&&o.input!=="mouse"?i+r:i;u=setTimeout(()=>h(o,g),M)}n(v,"start");function m(o){u&&(o.travel>H(l,o.input)||o.pointers>1)&&y()}n(m,"move");const p=n(o=>{o.pointerType&&o.pointerType!=="mouse"&&o.preventDefault()},"preventNativeMenu");return a||e.addEventListener("contextmenu",p),{start:v,move:m,end:y,cancel:y,destroy:n(()=>{y(),e.removeEventListener("contextmenu",p)},"destroy"),style:It,touchAction:"manipulation"}}n(ne,"longPress");ne.gestures=["longPress"];function ae({emit:t,options:e}){const{after:s=null,axis:f=null,pointers:i=1,tolerance:r,touchAction:l=null}=e;let a=!1;const u=n(m=>typeof s=="string"?s:s?.[m]??null,"waitsFor");function y(m,p){if(a&&m.pointers!==i){a=!1,t("panEnd",m);return}if(!a){if(p.type!=="pointermove"||m.pointers!==i||Zt(m))return;const o=u(m.input);if(o){if(!m.claims.has(o))return}else if(s===null&&m.claims.has("longPress")||m.travel<=H(r,m.input))return;if(!q(m,"pan"))return;a=!0,t("panStart",m)}t("panMove",m)}n(y,"move");function h(m){a&&(a=!1,t("panEnd",m))}n(h,"end");function v(m){a&&(a=!1,t("panCancel",m))}return n(v,"cancel"),{move:y,end:h,cancel:v,destroy:n(()=>{a=!1},"destroy"),nativeDrag:!1,style:It,touchAction:l??(f==="x"?"pan-y":f==="y"?"pan-x":"none")}}n(ae,"pan");ae.gestures=["panCancel","panEnd","panMove","panStart"];function oe(t,e,{wheel:s=!0,wheelIntensity:f=.01}={}){let i=null,r=null;const l=n((o,g)=>{i=te(t,o,"trackpad"),i.maximumPointers=i.pointers=2,i.source=g,e.start(i,o)},"open"),a=n((o,g,M)=>{i.duration=o.timeStamp-i.startTime,i.movement={x:o.clientX-i.center.x,y:o.clientY-i.center.y},i.phase="move",i.time=o.timeStamp,i.sourceEvent=o,i.center={x:o.clientX,y:o.clientY},i.rotation=M,i.scale=g,e.move(i,o)},"update"),u=n(o=>{if(clearTimeout(r),!i)return;i.phase="end",i.pointers=0;const g=i;i=null,e.end(g,o)},"close");function y(o){o.ctrlKey&&(o.preventDefault(),i?.source!=="gesture"&&(i||l(o,"wheel"),a(o,i.scale*Math.exp(-Qt(o).y*f),0),clearTimeout(r),r=setTimeout(()=>u(o),ee)))}n(y,"wheel");function h(o){o.preventDefault(),u(o),l(o,"gesture")}n(h,"gesturestart");function v(o){o.preventDefault(),i&&a(o,o.scale,o.rotation)}n(v,"gesturechange");function m(o){o.preventDefault(),u(o)}n(m,"gestureend");const p=s?{gesturechange:v,gestureend:m,gesturestart:h,wheel:y}:{gesturechange:v,gestureend:m,gesturestart:h};for(const[o,g]of Object.entries(p))t.addEventListener(o,g,{passive:!1});return{destroy(){clearTimeout(r),i=null;for(const[o,g]of Object.entries(p))t.removeEventListener(o,g)}}}n(oe,"createTrackpad");function re({element:t,emit:e,options:s}){const{threshold:f=.05,trackpad:i=!0,wheelIntensity:r}=s;let l=!1,a=1;const u=n(o=>{const g=o.scale/a;return a=o.scale,g},"changeOf");function y(o){q(o,"pinch")&&(l=!0,e("pinchStart",o,{scaleChange:1}),e("pinchMove",o,{scaleChange:u(o)}))}n(y,"begin");function h(o,g){if(!l)return;l=!1;const M=u(g);M!==1&&e("pinchMove",g,{scaleChange:M}),e(o,g,{scaleChange:1})}n(h,"finish");function v(o){if(!l){o.pointers>=2&&Math.abs(o.scale-1)>=f&&y(o);return}if(o.pointers<2){h("pinchEnd",o);return}e("pinchMove",o,{scaleChange:u(o)})}n(v,"move");const m={start:n(()=>{a=1},"start"),cancel:n(o=>h("pinchCancel",o),"cancel"),end:n(o=>h("pinchEnd",o),"end"),move:v},p=i&&oe(t,{end:m.end,move:n(o=>{l?e("pinchMove",o,{scaleChange:u(o)}):y(o)},"move"),start:n(()=>{a=1},"start")},{wheelIntensity:r});return{...m,destroy:n(()=>{l=!1,p?.destroy()},"destroy"),touchAction:"none"}}n(re,"pinch");re.gestures=["pinchCancel","pinchEnd","pinchMove","pinchStart"];function ie({active:t,emit:e,options:s}){const{delay:f=400,interval:i=100,tolerance:r}=s,l=t.has("pressRepeat");let a=null,u=null,y=0;const h=n(()=>{clearTimeout(a),clearInterval(u),a=u=null},"stop");function v(p){e("pressStart",p),l&&(h(),y=0,a=setTimeout(()=>{u=setInterval(()=>{if(p.claims.size||p.pointers===0){h();return}e("pressRepeat",p,{count:++y})},i)},f))}n(v,"start");function m(p){(a||u)&&(p.travel>H(r,p.input)||p.pointers>1)&&h()}return n(m,"move"),{start:v,move:m,end:n(p=>{h(),e("pressEnd",p)},"end"),cancel:n(p=>{h(),e("pressCancel",p)},"cancel"),destroy:h,touchAction:"manipulation"}}n(ie,"press");ie.gestures=["pressCancel","pressEnd","pressRepeat","pressStart"];function ce({element:t,emit:e,options:s}){const{threshold:f=10,trackpad:i=!0}=s;let r=!1,l=0;const a=n(p=>{const o=p.rotation-l;return l=p.rotation,o},"changeOf");function u(p){q(p,"rotate")&&(r=!0,e("rotateStart",p,{rotationChange:0}),e("rotateMove",p,{rotationChange:a(p)}))}n(u,"begin");function y(p,o){if(!r)return;r=!1;const g=a(o);g!==0&&e("rotateMove",o,{rotationChange:g}),e(p,o,{rotationChange:0})}n(y,"finish");function h(p){if(!r){p.pointers>=2&&Math.abs(p.rotation)>=f&&u(p);return}if(p.pointers<2){y("rotateEnd",p);return}e("rotateMove",p,{rotationChange:a(p)})}n(h,"move");const v={start:n(()=>{l=0},"start"),cancel:n(p=>y("rotateCancel",p),"cancel"),end:n(p=>y("rotateEnd",p),"end"),move:h},m=i&&oe(t,{end:v.end,move:n(p=>{p.source==="gesture"&&(r?e("rotateMove",p,{rotationChange:a(p)}):u(p))},"move"),start:n(()=>{l=0},"start")},{wheel:!1});return{...v,destroy:n(()=>{r=!1,m?.destroy()},"destroy"),touchAction:"none"}}n(ce,"rotate");ce.gestures=["rotateCancel","rotateEnd","rotateMove","rotateStart"];function le({element:t,emit:e,options:s,session:f}){const{nativeMenu:i=!1}=s,r=n(a=>a.pointerType||(a.button===-1||a.detail===0&&a.clientX===0&&a.clientY===0?"keyboard":"mouse"),"inputOf");function l(a){i||a.preventDefault();const u=r(a),y=f();y&&(u==="touch"||u==="pen")&&q(y,"secondary");const h={x:a.clientX,y:a.clientY};e("secondary",null,{center:h,element:t,input:u,modifiers:{alt:a.altKey,control:a.ctrlKey,meta:a.metaKey,shift:a.shiftKey},start:h,target:a.target},a)}return n(l,"contextmenu"),t.addEventListener("contextmenu",l),{destroy:n(()=>t.removeEventListener("contextmenu",l),"destroy")}}n(le,"secondary");le.gestures=["secondary"];function se({active:t,emit:e,options:s}){const{minimumDistance:f=30,minimumSpeed:i=.3,touchAction:r=null}=s,l=t.has("swipeLeft")||t.has("swipeRight"),a=t.has("swipeUp")||t.has("swipeDown"),u=t.has("swipe")||!l&&!a;function y(h){if(h.claims.has("longPress")||Zt(h)||h.travel<f||h.velocity.speed<i)return;const v=Jt(h.velocity.x,h.velocity.y);v&&(e("swipe",h,{direction:v}),e("swipe"+v[0].toUpperCase()+v.slice(1),h,{direction:v}))}return n(y,"end"),{end:y,nativeDrag:!1,style:It,touchAction:r??(u||l&&a?"none":l?"pan-y":"pan-x")}}n(se,"swipe");se.gestures=["swipe","swipeDown","swipeLeft","swipeRight","swipeUp"];function ue({active:t,emit:e,options:s}){const{interval:f=300,maximumDuration:i=500,tolerance:r,waitForDoubleTap:l=!0}=s,a=t.has("doubleTap"),u=a&&l!==!1,y=typeof l=="number"?l:f;let h=0,v=null,m=null;const p=n(()=>{clearTimeout(m),m=null},"flush");function o(g,M){const A=H(r,g.input);if(g.claims.size||g.travel>A||g.duration>i){h=0;return}if(g.maximumPointers===2){h=0,v=null,e("twoFingerTap",g,{count:1});return}if(g.maximumPointers>2){h=0;return}const x=M.timeStamp;if(h=v&&x-v.time<=f&&Math.hypot(g.center.x-v.x,g.center.y-v.y)<=A*3?h+1:1,v={time:x,x:g.center.x,y:g.center.y},!u){e("tap",g,{count:h}),a&&h===2&&e("doubleTap",g,{count:h});return}if(p(),h===2){e("doubleTap",g,{count:h});return}if(h>2){e("tap",g,{count:h});return}m=setTimeout(()=>{m=null,e("tap",g,{count:1})},y)}return n(o,"end"),{end:o,destroy:p,touchAction:"manipulation"}}n(ue,"tap");ue.gestures=["doubleTap","tap","twoFingerTap"];function pe({active:t,element:e,emit:s,options:f}){const{modifier:i=null,nativeScroll:r=!1}=f,l=t.has("pinchStart")||t.has("pinchMove")||t.has("pinchEnd")||t.has("pinch");let a=null,u=null;function y(){if(clearTimeout(u),!a)return;a.phase="end";const v=a;a=null,s("wheelEnd",v)}n(y,"end");function h(v){if(v.ctrlKey&&l||i&&!wt(v)[i])return;r||v.preventDefault();const m=Qt(v),p=!a;p&&(a=te(e,v,"wheel")),a.center={x:v.clientX,y:v.clientY},a.delta={x:a.delta.x+m.x,y:a.delta.y+m.y},a.distance=Math.hypot(a.delta.x,a.delta.y),a.duration=v.timeStamp-a.startTime,a.modifiers=wt(v),a.movement=m,a.time=v.timeStamp,a.sourceEvent=v,a.direction=Math.abs(m.x)>=Math.abs(m.y)?m.x>0?"right":"left":m.y>0?"down":"up",p&&s("wheelStart",a),a.phase="move",s("wheelMove",a),clearTimeout(u),u=setTimeout(y,ee)}return n(h,"listener"),e.addEventListener("wheel",h,{passive:!1}),{destroy:n(()=>{clearTimeout(u),a=null,e.removeEventListener("wheel",h)},"destroy")}}n(pe,"wheel");pe.gestures=["wheelEnd","wheelMove","wheelStart"];const gt={doubleTapDrag:Lt,edgeSwipe:Dt,longPress:ne,pan:ae,pinch:re,press:ie,rotate:ce,secondary:le,swipe:se,tap:ue,wheel:pe},yt={};for(const[t,e]of Object.entries(gt))for(const s of e.gestures)yt[s]=t;Object.freeze(Object.keys(yt).sort());const Re=/^on[A-Z]/,ut=n(t=>t.toLowerCase(),"eventTypeOf"),Pe=n(t=>t[2].toLowerCase()+t.slice(3),"gestureOf"),bt=n(t=>yt[t]??(gt[t]?t:null),"ownerOf"),Xt=n(t=>gt[t].priority??0,"priorityOf"),Z=n((t,e)=>{if(!bt(t))throw new TypeError(`[@aufbau/gestures] unknown gesture "${t}"${e?` (${e})`:""}`);return t},"known"),_t=n((t,e)=>{const{claims:s,own:f,startTime:i,...r}=t??{};return{...r,...e}},"snapshot");function je(t,e){return!(t.input&&t.input!==e.input||t.minimumDistance&&!(e.distance>=t.minimumDistance)||t.minimumSpeed&&!(e.velocity?.speed>=t.minimumSpeed)||t.pointers&&t.pointers!==e.maximumPointers)}n(je,"passes");function Ke(t,e={}){let s={...e},f=[],i=null,r={},l=null,a=!1,u=!0;const y=new Map,h=new Map,v=new Map,m=new Map,p=new Set;let o=new Set;function g(d){return b=>{if(b.detail?.element===t)for(const{guard:S,handler:I}of y.get(d)??[])je(S,b.detail)&&I(b.detail,b)}}n(g,"listenerFor");function M(d,b,S){const{handler:I,...E}=typeof b=="function"?{handler:b}:b,k={guard:E,handler:I,source:S};if(y.has(d)||y.set(d,new Set),y.get(d).add(k),!h.has(d)){const T=g(d);h.set(d,T),t.addEventListener(ut(d),T)}return k}n(M,"add");function A(d,b){const S=y.get(d);!S?.delete(b)||S.size||(y.delete(d),t.removeEventListener(ut(d),h.get(d)),h.delete(d))}n(A,"drop");function x(d){for(const[b,S]of[...y])for(const I of[...S])I.source==="options"&&A(b,I);for(const[b,S]of Object.entries(d))!Re.test(b)||S==null||M(Z(Pe(b),b),S,"options");o=new Set((d.recognize??[]).map(b=>Z(b,"recognize")))}n(x,"adopt");function O(d,b){const S=v.get(d);return S===void 0||S===!0?!0:S===!1?!1:m.has(d)?m.get(d):b?!!S(b):!0}n(O,"allowed");function B(d,b,S={},I=null){if(!u)return;const E=_t(b,{element:t,...S,gesture:d});if(E.sourceEvent=I??E.sourceEvent??null,!O(yt[d],E))return;(E.target?.isConnected&&t.contains(E.target)?E.target:t).dispatchEvent(new CustomEvent(ut(d),{bubbles:!0,cancelable:!0,composed:!0,detail:E}))}n(B,"emit");const F={};for(const d of["start","move","end","cancel"])F[d]=(b,S)=>{if(d==="start"){m.clear();for(const[I]of f){const E=v.get(I);typeof E=="function"&&m.set(I,!!E(_t(b,{element:t})))}}for(const[I,E]of f){if(b.phase==="cancel"&&d!=="cancel")break;O(I)&&E[d]?.(b,S)}a&&(d==="end"||d==="cancel")&&c()};const ct=n(d=>d.preventDefault(),"preventDrag"),lt=n((d,b)=>{d in r||(r[d]=t.style[d]),t.style[d]=b},"setStyle");function J(){for(const[,d]of f)d.destroy?.();f=[],t.removeEventListener("dragstart",ct),Object.assign(t.style,r),r={}}n(J,"teardown");function c(){a=!1,J();const d=new Set([...y.keys()]),b=new Set([...d,...o,...p]),S=[...new Set([...b].map(bt))].sort((T,X)=>Xt(X)-Xt(T)),I=n(()=>i?.session??null,"session");f=S.map(T=>[T,gt[T]({active:b,element:t,emit:B,handled:d,options:s[T]??{},session:I})]);const E=f.some(([,T])=>T.start||T.move||T.end||T.cancel);E&&!i&&(i=ke(t,F,{coalesced:!!s.coalesced,yielding:!!s.yield})),!E&&i&&(i.destroy(),i=null);for(const[,T]of f)for(const[X,ye]of Object.entries(T.style??{}))lt(X,ye);f.some(([,T])=>T.nativeDrag===!1)&&t.addEventListener("dragstart",ct);const k=s.touchAction??f.reduce((T,[,X])=>ze(T,X.touchAction),null);k&&lt("touchAction",k),l=$()}n(c,"build");const $=n(()=>[[...y.keys()].sort(),[...o].sort(),[...p].sort()].join("|"),"signature");function C(d=!1){!u||!d&&l===$()||(i?.session?a=!0:c())}n(C,"rebuild"),x(s),c();const R={element:t,get session(){return i?i.session:null},enable(d,b=!0){return v.set(bt(Z(d)),b),R},on(d,b){const S=M(Z(d),b,"on");return C(),()=>{A(d,S),C()}},recognize(d,b=!0){for(const S of[d].flat())b?p.add(Z(S)):p.delete(S);return C(),R},set(d={}){return s={...s,...d},x(s),("coalesced"in d||"yield"in d)&&i&&!i.session&&(i.destroy(),i=null),C(!0),R},destroy(){u=!1,i?.destroy(),i=null,J();for(const[d,b]of h)t.removeEventListener(ut(d),b);h.clear(),y.clear()}};return R}n(Ke,"gestures");function Ue(t,e){return Ye.call({props:t},t,e)}n(Ue,"DockRatHtml");function Ye(t,e){const s=W(()=>RAT.app?.router.$path.value??"/"),f=n((l,a)=>l==="/"?a==="/":a===l||a.startsWith(`${l}/`),"owns"),i=n(l=>l.to!=null&&[l.to,...l.match??[]].some(a=>f(a,s.value)),"isActive"),r=n(l=>l.onclick?l.onclick():RAT.app.router.go(l.to),"run");return w`
    <nav.dock>
      ${N(()=>t.items??[],l=>l,l=>w`<btn-tap class=${()=>i(l)?"col active":"col"} aria-current=${()=>i(l)?"page":null} icon=${()=>l.icon} label=${()=>l.label} onclick=${L(()=>r(l))} />`)}
    </nav>
  `}n(Ye,"$$DockRatHtml");const Fe=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
  .empty {
    align-content  : center;
    display        : grid;
    gap            : 0.5rem;
    justify-items  : center;
    min-block-size : 50dvh;
    text-align     : center;
  }
  
  svg-icon { font-size: 3rem; opacity: 0.5; }
  .title   { font-weight: 600; margin: 0; }
  .hint    { margin: 0; opacity: 0.7; }
}`;function vt(t,e){return Ne.call({props:t},t,e)}n(vt,"EmptyRatHtml");function Ne(t,e){return Ct("ihnpco",Fe),w`
    <div.empty data-rat="ihnpco">
      ${D(()=>t.icon,()=>w`<svg-icon icon=${()=>t.icon} />`)}
      ${D(()=>t.title,()=>w`<p.title>${()=>t.title}</p>`)}
      ${D(()=>t.hint,()=>w`<p.hint>${()=>t.hint}</p>`)}
      ${e}
    </div>
  `}n(Ne,"$$EmptyRatHtml");const He=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function kt(t,e){return Xe.call({props:t},t,e)}n(kt,"LoadingRatHtml");function Xe(t,e){return Ct("1tn1js8",He),w`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${D(()=>t.text,()=>w`<span>${()=>t.text}</span>`)}
    </div>
  `}n(Xe,"$$LoadingRatHtml");function at(t,e=null){try{return JSON.parse(localStorage.getItem(t))??e}catch{return e}}n(at,"read");function ot(t,e){e==null?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))}n(ot,"write");const de=`appearance:${new URL(".",location.href).pathname}`,Vt={density:G.densities,geometry:G.geometries,mode:G.modes},et=at(de,{}),_e=n(()=>G.palettes().catch(()=>[]),"palettes");function Ve(t,e){return et[t]=e||null,ot(de,et),G.set({[t]:e||null})}n(Ve,"setAppearance");Object.keys(et).length&&G.set(et);const pt=n(t=>(e,s)=>$e.notify(e,{...s,type:t}),"notify"),Y=Object.assign(pt("info"),{error:pt("error"),info:pt("info"),success:pt("success")});let Q=null;const rt=we(!1),fe=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,We=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!fe;addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Q=t,rt.value=!0});addEventListener("appinstalled",()=>{Q=null,rt.value=!1});async function qe(){if(!Q)return!1;const t=Q;return Q=null,rt.value=!1,t.prompt(),(await t.userChoice).outcome==="accepted"}n(qe,"install");function Be(t){const e=`${t}:install-hint`,s=n(()=>{at(e)||(ot(e,!0),Y(`${t} can be installed: see the settings`))},"show");rt.value?s():addEventListener("beforeinstallprompt",s,{once:!0})}n(Be,"hint");const Ge=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Wt(t,e){return Je.call({props:t},t,e)}n(Wt,"SettingsRatHtml");function Je(t,e){Ct("177zzh1",Ge);let s=P({...et}),f=P([]);const i=W(()=>rt.value);_e().then(a=>{f.value=a});function r(a,u){const y=u.detail?.value??u.target.value;s.value={...s.value,[a]:y},Ve(a,y)}n(r,"change");async function l(){await qe()&&Y.success(`${t.name??"the app"} is installed`)}return n(l,"installApp"),w`
    <div.settings data-rat="177zzh1">
      ${e}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>s.value.palette??"zombie"} onchange=${L(a=>r("palette",a))}>
            ${N(()=>f.value,a=>a,a=>w`<input-option value=${()=>a}>${()=>a}</input-option>`)}
          </input-value>
        </label>
        ${N(()=>Object.keys(Vt),a=>a,a=>w`
            <label>
              <span>${()=>a}</span>
              <input-value look="segments" value=${()=>s.value[a]??""} onchange=${L(u=>r(a,u))}>
                ${N(()=>Vt[a],u=>u,u=>w`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${D(()=>!fe,()=>w`
          <section>
            <h3>install</h3>
            ${D(()=>i.value,()=>w`<btn-push icon="download" label=${()=>"install "+(t.name??"the app")} onclick=${L(l)} />`,()=>w`
                ${D(()=>We,()=>w`<p.hint>Share, then "Add to Home Screen".</p>`,()=>w`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(Je,"$$SettingsRatHtml");const it="https://api.iconify.design",Ze=1440*60*1e3,Qe=Ie(Ce({driver:"cache",name:"icons-api"}),{ttl:Ze}),he=n((t,e)=>Qe.get(`${it}/rat-cache/${encodeURIComponent(t)}`,e),"cached");async function zt(t){const e=await fetch(t,{headers:{accept:"application/json"}});if(!e.ok)throw new Error(`Iconify API ${e.status}`);return e.json()}n(zt,"getJson");function tn(){return he("collections",async()=>{const t=await zt(`${it}/collections`);return Object.entries(t).map(([e,s])=>({prefix:e,name:s.name||e,total:s.total||0,samples:s.samples||[],author:s.author?.name||"",category:s.category||"",palette:!!s.palette})).sort((e,s)=>e.name.localeCompare(s.name,void 0,{sensitivity:"base"}))})}n(tn,"collections");function en(t){return he(`set:${t}`,async()=>{const e=await zt(`${it}/collection?prefix=${encodeURIComponent(t)}`),s=[...e.uncategorized||[],...Object.values(e.categories||{}).flat()],f=new Set,i=[];for(const r of s)f.has(r)||(f.add(r),i.push(`${t}:${r}`));return{prefix:t,title:e.title||t,total:e.total||i.length,icons:i}})}n(en,"collection");async function nn(t,e=120){const s=t.trim();return s?(await zt(`${it}/search?query=${encodeURIComponent(s)}&limit=${e}`)).icons||[]:[]}n(nn,"search$1");const an=n(t=>`${it}/${t.replace(":","/")}.svg`,"svgUrl");async function me(t){const e=await fetch(an(t));if(!e.ok)throw new Error(`could not load ${t}`);return e.text()}n(me,"svgText");xe(()=>import("https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"),[],import.meta.url).catch(()=>{});let U=P(null),K=P(null),xt=P(!1),St=P(null),dt=P(!1),z=P(null),At=P(at("icons:setFilter","")),V=P(at("icons:query","")),_=P(at("icons:itemSize",88));mt(()=>ot("icons:setFilter",At.value));mt(()=>ot("icons:query",V.value));mt(()=>ot("icons:itemSize",_.value));const qt=W(()=>/^\/set\/(.+)$/.exec(RAT.app.router.$path.value)?.[1]??null),Tt=RAT.app.database.favs,Et=W(()=>new Set(Tt.$items.map(t=>t.name)));async function on(){if(!U.value)try{U.value=await tn()}catch{U.value=[],Y.error("Could not reach the Iconify API")}}n(on,"loadCollections");async function rn(t){if(!(!t||K.value?.prefix===t)){K.value=null,xt.value=!0;try{K.value=await en(t)}catch{Y.error("Could not load that set")}finally{xt.value=!1}}}n(rn,"loadSet");mt(()=>{rn(qt.value?decodeURIComponent(qt.value):null)});const Mt=n(t=>RAT.app.router.go(t),"go"),Ot=n(t=>Mt(`/set/${encodeURIComponent(t)}`),"openSet");let Bt=null;function Rt(t){V.value=t,clearTimeout(Bt);const e=t.trim();if(!e){St.value=null,dt.value=!1;return}dt.value=!0,Bt=setTimeout(async()=>{try{St.value=await nn(e)}catch{Y.error("Search failed")}finally{dt.value=!1}},250)}n(Rt,"search");function cn(t){z.value=t,RAT.toggle("context",!0)}n(cn,"inspect");function ln(){RAT.toggle("context",!1),z.value=null}n(ln,"closeDetail");function sn(){const t=RAT.app.router.$path.value;t.startsWith("/set/")?Mt("/sets"):t==="/search"&&V.value?Rt(""):t!=="/"&&Mt("/")}n(sn,"up");const tt=n(t=>t?.toLocaleString?.()??String(t??0),"count"),un=W(()=>(()=>{const t=At.value.trim().toLowerCase(),e=U.value??[];return t?e.filter(s=>s.name.toLowerCase().includes(t)||s.prefix.toLowerCase().includes(t)):e})()),pn=W(()=>(U.value??[]).reduce((t,e)=>t+(e.total||0),0)),dn=["mdi","material-symbols","lucide","ph","tabler","bi","fa6-solid","ri","carbon","solar"],Gt=W(()=>dn.map(t=>(U.value??[]).find(e=>e.prefix===t)).filter(Boolean));async function Pt(t,e="Copied"){try{await navigator.clipboard.writeText(t),Y.success(e)}catch{Y.error("Copy failed")}}n(Pt,"copy");async function fn(t){try{await Pt(await me(t),"SVG copied")}catch{Y.error("Could not copy the SVG")}}n(fn,"copySvg");async function hn(t){try{const e=URL.createObjectURL(new Blob([await me(t)],{type:"image/svg+xml"})),s=Te("a",{download:t.replace(":","-")+".svg",href:e});document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}catch{Y.error("Could not download the SVG")}}n(hn,"downloadSvg");const nt=n(t=>Et.value.has(t),"isFav");function ge(t,e){return e?.stopPropagation(),nt(t)?Tt.delete(t):Tt.add({name:t})}n(ge,"toggleFav");const mn=n(t=>w`
    <button.cell title=${()=>t.name} onclick=${L(()=>cn(t.name))}>
      <span.glyph><iconify-icon icon=${()=>t.name} /></span>
      <span.cname>${()=>t.name.split(":")[1]}</span>
      <btn-push class=${()=>nt(t.name)?"heart on":"heart"} icon=${()=>nt(t.name)?"heart":"heart-outline"} title="Favourite" onclick=${L(e=>ge(t.name,e))} />
    </button>
  `,"IconCell"),ht={max:200,min:56},gn=n(t=>{let e=_.value;const s=Ke(t,{onPinchStart:n(()=>{e=_.value},"onPinchStart"),onPinchMove:n(f=>{_.value=Math.round(Math.min(ht.max,Math.max(ht.min,e*f.scale)))},"onPinchMove")});return()=>s.destroy()},"pinchSize"),jt=n(t=>w`
    ${D(()=>t.names?.length,()=>w`
        <div.grid style=${()=>"--isz: "+_.value+"px"} ref=${Se(gn)}>
          ${N(()=>t.names,e=>e,e=>w`<${mn} ...${{get name(){return e}}} />`)}
        </div>
      `,()=>w`<${vt} icon="image-search" title="Nothing here." />`)}
  `,"IconGrid"),$t=n(()=>w`
    <div.size>
      <svg-icon icon="zoom-out" />
      <input type="range" min=${()=>ht.min} max=${()=>ht.max} step="1" value=${()=>_.value} oninput=${L(t=>_.value=Number(t.target.value))} />
      <svg-icon icon="zoom-in" />
    </div>
  `,"SizeControl"),yn=n(()=>w`
    <div.home>
      <div.hero>
        <svg-icon icon="mdi:emoticon-outline" />
        <h1>The whole Iconify library</h1>
        <p>${()=>U.value?"Browse "+tt(pn.value)+" icons across "+tt(U.value.length)+" sets.":"Loading the catalogue …"}</p>
        <div.hero-actions>
          <btn-push icon="images" label="browse sets" onclick=${ft("go[sets]")} />
          <btn-push icon="search" label="search" onclick=${ft("go[search]")} />
        </div>
      </div>
      ${D(()=>Gt.value.length,()=>w`
          <div.home-sets>
            <div.home-sets-head>Popular sets</div>
            <div.chips>
              ${N(()=>Gt.value,t=>t,t=>w`<button.chip onclick=${L(()=>Ot(t.prefix))}>${()=>t.name} <span>${()=>tt(t.total)}</span></button>`)}
            </div>
          </div>
        `)}
    </div>
  `,"HomeView"),vn=n(()=>w`
    <header.topbar>
      <div.searchbox>
        <svg-icon icon="search" />
        <input type="search" placeholder="Filter sets …" ref=${be(At,"value")} />
      </div>
    </header>
    ${D(()=>!U.value,()=>w`<${kt} />`,()=>w`
        <div.sets>
          ${N(()=>un.value,t=>t,t=>w`
              <button.set-card onclick=${L(()=>Ot(t.prefix))}>
                <div.set-samples>
                  ${N(()=>t.samples.slice(0,3),e=>e,e=>w`<iconify-icon icon=${()=>t.prefix+":"+e} />`)}
                </div>
                <div.set-name title=${()=>t.name}>${()=>t.name}</div>
                <div.set-meta>${()=>tt(t.total)} icons${()=>t.author?" · "+t.author:""}</div>
              </button>
            `,()=>w`<${vt} icon="image-search" title="Nothing here." />`)}
        </div>
      `)}
  `,"SetsView"),$n=n(()=>w`
    <header.topbar>
      <btn-icon icon="arrow-left" label="Back" onclick=${ft("go[sets]")} />
      <span.spacer />
      <${$t} />
    </header>
    ${D(()=>xt.value||!K.value,()=>w`<${kt} />`,()=>w`
        <div.setview>
          <header.setview-head>
            <div>
              <h1>${()=>K.value.title}</h1>
              <div.sub>${()=>tt(K.value.total)} icons · <code>${()=>K.value.prefix}</code></div>
            </div>
            <btn-push class="small" icon="copy" label="copy prefix" onclick=${L(()=>Pt(K.value.prefix))} />
          </header>
          <${jt} ...${{get names(){return K.value.icons}}} />
        </div>
      `)}
  `,"SetView"),wn=n(()=>w`
    <header.topbar>
      <div.searchbox.big>
        <svg-icon icon="search" />
        <input type="search" placeholder="Search all of Iconify …" value=${()=>V.value} oninput=${L(t=>Rt(t.target.value))} />
      </div>
      <${$t} />
    </header>
    ${D(()=>dt.value,()=>w`<${kt} />`,()=>w`
        ${D(()=>V.value.trim(),()=>w`<${jt} ...${{get names(){return St.value??[]}}} />`,()=>w`<${vt} icon="search" hint="Search across every Iconify set." />`)}
      `)}
  `,"SearchView"),bn=n(()=>w`
    <header.topbar><h1>Favourites</h1><span.spacer /><${$t} /></header>
    ${D(()=>Et.value.size,()=>w`<${jt} ...${{get names(){return[...Et.value]}}} />`,()=>w`<${vt} icon="heart" hint="No favourites yet: tap the heart on any icon." />`)}
  `,"FavoritesView"),xn=n(()=>w`
    ${D(()=>z.value,()=>w`
        <app-panel heading=${()=>z.value.split(":")[1]}>
          <div.detail>
            <div.sheet-preview><iconify-icon icon=${()=>z.value} /></div>
            <div.sheet-set><button.linkish onclick=${L(()=>{const[t]=z.value.split(":");ln(),Ot(t)})}>${()=>z.value.split(":")[0]}</button></div>
            <div.sheet-actions>
              <btn-push icon="copy" label="copy name" onclick=${L(()=>Pt(z.value))} />
              <btn-push icon="svg" label="copy svg" onclick=${L(()=>fn(z.value))} />
              <btn-push icon="download" label="download" onclick=${L(()=>hn(z.value))} />
              <btn-push icon=${()=>nt(z.value)?"heart":"heart-outline"} label=${()=>nt(z.value)?"Favourited":"Favourite"} onclick=${L(()=>ge(z.value))} />
            </div>
          </div>
        </app-panel>
      `)}
  `,"Detail"),Sn=[{icon:"mdi:home",label:"home",to:"/"},{icon:"search",label:"search",to:"/search"},{icon:"images",label:"sets",to:"/sets",match:["/set"]},{icon:"heart",label:"favs",to:"/favs"},{icon:"settings",label:"settings",onclick:n(()=>RAT.toggle("config"),"onclick")}],kn=n(t=>(t.app.hold(on()),t.app.commands.set("up",sn),Be("Icons"),V.value.trim()&&Rt(V.value),w`
    <rat-view route="/" name="home"><${yn} /></rat-view>
    <rat-view route="/sets" name="sets"><${vn} /></rat-view>
    <rat-view route="/set/:prefix" name="set"><${$n} /></rat-view>
    <rat-view route="/search" name="search"><${wn} /></rat-view>
    <rat-view route="/favs" name="favs"><${bn} /></rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${Ue} ...${{get items(){return Sn}}} /></rat-area>
    <rat-area name="context" dock="bottom" overlay="always" ontoggle=${L(e=>{e.detail?.open||(z.value=null)})}><${xn} /></rat-area>
    <rat-area name="config" dock="end">
      <${Wt} name="Icons">
        <section>
          <h3>grid</h3>
          <label><span>cell size (or pinch the grid)</span><${$t} /></label>
        </section>
      </${Wt}>
    </rat-area>
  `),"app_rat");export{kn as default};
