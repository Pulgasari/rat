var me=Object.defineProperty;var e=(t,n)=>me(t,"name",{value:n,configurable:!0});import{P as pt,Q as Ot,T as _,f as X,h as w,V as ge,W as Et,w as D,X as q,Y as ft,Z as ye,q as ve,a0 as H,v as $e,a1 as we,_ as be,a2 as xe,a3 as Se,a4 as Te}from"./index-rXM9zcVD.js";import{p as Ee,a as Me}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function I(t,{keys:n=null,prevent:s=!1,times:f=0}={}){const i=n?Ee(n):null;let r=f;return function(l){if(!(f&&!r)&&!(i&&!Me(l,i))){s&&l.preventDefault(),f&&r--;try{const a=(typeof t=="string"?pt(t):t).call(this,l);typeof a?.catch=="function"&&a.catch(u=>Ot(this,u,"handler"))}catch(a){Ot(this,a,"handler")}}}}e(I,"listener");function Ce(t,{stale:n=!1,ttl:s=1/0}={}){const f=new Map;function i(r,l){if(!f.has(r)){const a=Promise.resolve().then(l).then(async u=>(await t.set(r,{at:Date.now(),value:u}),u)).finally(()=>f.delete(r));f.set(r,a)}return f.get(r)}return e(i,"load"),{store:t,async get(r,l){const a=await t.get(r);return a!==void 0&&Date.now()-a.at<s?a.value:a!==void 0&&n?(l&&i(r,l).catch(()=>{}),a.value):l?i(r,l):void 0},clear:e(()=>t.clear(),"clear"),delete:e(r=>t.delete(r),"delete")}}e(Ce,"memo");const ke=100,ct={down:"down",left:"left",right:"right",up:"up"},P=new Map,qt=e((t,n)=>t===0&&n===0?null:Math.abs(t)>=Math.abs(n)?t>0?ct.right:ct.left:n>0?ct.down:ct.up,"directionOf"),Ie=e((t,n)=>{const s=(n-t)%360;return s>180?s-360:s<=-180?s+360:s},"turn"),Pt=e((t,n)=>Math.atan2(n.y-t.y,n.x-t.x)*180/Math.PI,"angleBetween"),jt=e((t,n)=>Math.hypot(n.x-t.x,n.y-t.y),"distanceOf");function De(t,n,{coalesced:s=!1,yielding:f=!1}={}){const i=new Map;let r=null,l=null,a=!1;const u=e(()=>{let c=0,$=0;for(const C of i.values())c+=C.x,$+=C.y;return{x:c/i.size,y:$/i.size}},"centerOf"),y=e(()=>{const[c,$]=i.values();return[c,$]},"firstTwo"),h=e(()=>{if(i.size<2){l.pair=null;return}const[c,$]=y();l.pair={angle:Pt(c,$),distance:jt(c,$)||1,rotation:r.rotation,scale:r.scale}},"rebasePair"),v=e(()=>{const c=u();r.start={x:r.start.x+c.x-r.center.x,y:r.start.y+c.y-r.center.y},r.center=c,l.samples.length=0},"rebaseCenter");function m(c){const $=u(),C={x:$.x-r.start.x,y:$.y-r.start.y},O=c.timeStamp;r.buttons=c.buttons,r.movement={x:$.x-r.center.x,y:$.y-r.center.y},r.center=$,r.delta=C,r.direction=qt(C.x,C.y),r.distance=Math.hypot(C.x,C.y),r.angle=r.distance?Math.atan2(C.y,C.x)*180/Math.PI:0,r.duration=O-l.startTime,r.modifiers={alt:c.altKey,control:c.ctrlKey,meta:c.metaKey,shift:c.shiftKey},r.pointerId=c.pointerId,r.pointers=i.size,r.pressure=c.pressure??0,r.sourceEvent=c,r.tilt={x:c.tiltX??0,y:c.tiltY??0},r.time=O,r.travel=Math.max(r.travel,r.distance),r.twist=c.twist??0,s&&(r.coalesced=(c.getCoalescedEvents?.()??[c]).map(L=>({pressure:L.pressure,time:L.timeStamp,x:L.clientX,y:L.clientY})));const d=l.samples;for(d.push({time:O,x:$.x,y:$.y});d.length>2&&O-d[0].time>ke;)d.shift();const b=d[0],S=O-b.time,k=S>0?($.x-b.x)/S:0,E=S>0?($.y-b.y)/S:0;if(r.velocity={speed:Math.hypot(k,E),x:k,y:E},l.pair){const[L,T]=y(),N=Pt(L,T);r.rotation=l.pair.rotation+Ie(l.pair.angle,N),r.scale=l.pair.scale*jt(L,T)/l.pair.distance}}e(m,"measure");const p={abort:e(()=>x(),"abort"),yielding:f};function o(){for(const c of i.keys()){const $=P.get(c);if($&&$!==p&&!$.yielding)return x(),!1}for(const c of i.keys()){const $=P.get(c);$&&$!==p&&$.abort(),P.set(c,p)}return a=!0,!0}e(o,"own");const g=e(()=>{for(const c of i.keys())P.get(c)===p&&P.delete(c);a=!1},"release");function M(c){const $={x:c.clientX,y:c.clientY};l={pair:null,samples:[],startTime:c.timeStamp},r={angle:0,buttons:c.buttons,center:$,claims:new Set,delta:{x:0,y:0},direction:null,distance:0,duration:0,element:t,input:c.pointerType||"mouse",maximumPointers:1,modifiers:{alt:c.altKey,control:c.ctrlKey,meta:c.metaKey,shift:c.shiftKey},movement:{x:0,y:0},own:o,path:c.composedPath(),phase:"start",pointerId:c.pointerId,pointers:1,pressure:c.pressure??0,rotation:0,scale:1,start:$,target:c.target,tilt:{x:c.tiltX??0,y:c.tiltY??0},time:c.timeStamp,travel:0,twist:c.twist??0,velocity:{speed:0,x:0,y:0},get positions(){return[...i].map(([C,{x:O,y:d}])=>({id:C,x:O,y:d}))}},Z(!0)}e(M,"open");function z(){Z(!1),g(),i.clear(),r=l=null}e(z,"close");function x(){if(!r)return;r.phase="cancel";const c=r;z(),n.cancel(c,null)}e(x,"abort");function R(c){if(!(c.pointerType==="mouse"&&c.button!==0)){if(r&&c.isPrimary&&c.pointerType===r.input&&x(),i.set(c.pointerId,{x:c.clientX,y:c.clientY}),!r){M(c),m(c),n.start(r,c);return}a&&!P.has(c.pointerId)&&P.set(c.pointerId,p),r.maximumPointers=Math.max(r.maximumPointers,i.size),r.phase="move",v(),h(),m(c),n.move(r,c)}}e(R,"down");function W(c){const $=i.get(c.pointerId);$&&($.x=c.clientX,$.y=c.clientY,r.phase="move",m(c),n.move(r,c))}e(W,"move");function Y(c){if(!i.has(c.pointerId))return;if(i.size>1){P.get(c.pointerId)===p&&P.delete(c.pointerId),i.delete(c.pointerId),r.phase="move",v(),h(),m(c),n.move(r,c);return}const $=i.get(c.pointerId);$.x=c.clientX,$.y=c.clientY,r.phase="end",m(c),r.pointers=0;const C=r;z(),n.end(C,c)}e(Y,"up");function rt(c){if(!i.has(c.pointerId))return;r.phase="cancel";const $=r;z(),n.cancel($,c)}e(rt,"cancel");const it=e(()=>{document.visibilityState==="hidden"&&x()},"hidden");function Z(c){const $=c?"addEventListener":"removeEventListener";window[$]("pointermove",W),window[$]("pointerup",Y),window[$]("pointercancel",rt),window[$]("blur",x),document[$]("visibilitychange",it)}return e(Z,"listen"),t.addEventListener("pointerdown",R),{abort:x,get session(){return r},destroy(){t.removeEventListener("pointerdown",R),r&&z()}}}e(De,"createTracker");const Kt={mouse:4,pen:8,touch:10},F=e((t,n)=>typeof t=="number"?t:t?.[n]??Kt[n]??Kt.touch,"toleranceFor"),Mt={userSelect:"none",webkitTouchCallout:"none",webkitUserDrag:"none",webkitUserSelect:"none"},Ut={auto:0,manipulation:1,"pan-x pan-y":1,"pan-x":2,"pan-y":2,none:3},Le=e((t,n)=>t?n?t==="pan-x"&&n==="pan-y"||t==="pan-y"&&n==="pan-x"?"none":(Ut[n]??0)>(Ut[t]??0)?n:t:t:n,"stricterTouchAction"),V=e((t,n)=>(t.claims.add(n),t.own?t.own():!0),"claim"),Ae=["doubleTapDrag","edgeSwipe","secondary"],Bt=e(t=>Ae.some(n=>t.claims.has(n)),"exclusive"),Yt={0:1,1:16,2:400},Gt=e(t=>({x:t.deltaX*Yt[t.deltaMode],y:t.deltaY*Yt[t.deltaMode]}),"normalizeWheel"),vt=e(t=>({alt:t.altKey,control:t.ctrlKey,meta:t.metaKey,shift:t.shiftKey}),"modifiersOf");function Zt(t,n,s){const f={x:n.clientX,y:n.clientY};return{angle:0,buttons:0,center:f,claims:new Set,delta:{x:0,y:0},direction:null,distance:0,duration:0,element:t,input:s,maximumPointers:0,modifiers:vt(n),movement:{x:0,y:0},path:n.composedPath(),phase:"start",pointerId:null,pointers:0,positions:[],pressure:0,rotation:0,scale:1,start:f,startTime:n.timeStamp,target:n.target,tilt:{x:0,y:0},time:n.timeStamp,travel:0,twist:0,velocity:{speed:0,x:0,y:0}}}e(Zt,"inputSession");const Jt=150;function Ct({element:t,emit:n,options:s}){const{interval:f=300,maximumDuration:i=500,tolerance:r}=s;let l=null,a=!1,u=!1;function y(o,g){const M=F(r,o.input);a=!!l&&g.timeStamp-l.time<=f&&Math.hypot(o.start.x-l.x,o.start.y-l.y)<=M*3,u=!1}e(y,"start");function h(o,g){if(u){if(o.pointers!==1){v("doubleTapDragEnd",o);return}n("doubleTapDragMove",o);return}!a||g?.type!=="pointermove"||o.pointers!==1||o.travel<=F(r,o.input)||(a=!1,V(o,"doubleTapDrag")&&(u=!0,n("doubleTapDragStart",o),n("doubleTapDragMove",o)))}e(h,"move");function v(o,g){u&&n(o,g),u=a=!1,l=null}e(v,"finish");function m(o,g){if(u){v("doubleTapDragEnd",o);return}l=!o.claims.size&&o.maximumPointers===1&&o.duration<=i&&o.travel<=F(r,o.input)&&!a?{time:g.timeStamp,x:o.center.x,y:o.center.y}:null,a=!1}e(m,"end");const p=e(o=>{(a||u)&&o.cancelable&&o.preventDefault()},"holdScroll");return t.addEventListener("touchmove",p,{passive:!1}),{start:y,move:h,end:m,cancel:e(o=>v("doubleTapDragCancel",o),"cancel"),destroy:e(()=>{u=a=!1,l=null,t.removeEventListener("touchmove",p)},"destroy"),touchAction:"manipulation"}}e(Ct,"doubleTapDrag");Ct.gestures=["doubleTapDragCancel","doubleTapDragEnd","doubleTapDragMove","doubleTapDragStart"];Ct.priority=1;const ze={bottom:e(t=>-t.y>Math.abs(t.x),"bottom"),left:e(t=>t.x>Math.abs(t.y),"left"),right:e(t=>-t.x>Math.abs(t.y),"right"),top:e(t=>t.y>Math.abs(t.x),"top")};function kt({element:t,emit:n,options:s}){const{edges:f=["left"],relativeTo:i="element",size:r=24,tolerance:l}=s;let a=null,u=null,y=!1;const h=e(()=>i==="viewport"?{bottom:innerHeight,height:innerHeight,left:0,right:innerWidth,top:0,width:innerWidth}:t.getBoundingClientRect(),"boxOf"),v=e(x=>a==="left"||a==="right"?Math.min(1,Math.abs(x.delta.x)/u.width):Math.min(1,Math.abs(x.delta.y)/u.height),"progressOf"),m=e(x=>({edge:a,progress:v(x)}),"detail");function p(x){y=!1,u=h();const{x:R,y:W}=x.start;a=f.find(Y=>Y==="left"?R-u.left<=r:Y==="right"?u.right-R<=r:Y==="top"?W-u.top<=r:u.bottom-W<=r)??null}e(p,"start");function o(x){if(a){if(!y){if(x.pointers!==1||x.travel<=F(l,x.input))return;if(!ze[a](x.delta)){a=null;return}if(!V(x,"edgeSwipe")){a=null;return}y=!0,n("edgeSwipeStart",x,m(x))}n("edgeSwipeMove",x,m(x))}}e(o,"move");function g(x,R){y&&n(x,R,m(R)),y=!1,a=null}e(g,"finish");const M=f.some(x=>x==="left"||x==="right"),z=f.some(x=>x==="top"||x==="bottom");return{start:p,move:o,end:e(x=>g("edgeSwipeEnd",x),"end"),cancel:e(x=>g("edgeSwipeCancel",x),"cancel"),touchAction:M&&z?"none":M?"pan-y":"pan-x"}}e(kt,"edgeSwipe");kt.gestures=["edgeSwipeCancel","edgeSwipeEnd","edgeSwipeMove","edgeSwipeStart"];kt.priority=1;function Qt({active:t,element:n,emit:s,options:f}){const{duration:i=500,grace:r=200,tolerance:l}=f,a=t.has("secondary");let u=null;const y=e(()=>{clearTimeout(u),u=null},"stop"),h=e((o,g)=>{u=null,!(o.claims.size||o.pointers===0||o.phase==="cancel")&&V(o,"longPress")&&s("longPress",o,{duration:performance.now()-g})},"fire");function v(o){y();const g=performance.now()-o.duration,M=a&&o.input!=="mouse"?i+r:i;u=setTimeout(()=>h(o,g),M)}e(v,"start");function m(o){u&&(o.travel>F(l,o.input)||o.pointers>1)&&y()}e(m,"move");const p=e(o=>{o.pointerType&&o.pointerType!=="mouse"&&o.preventDefault()},"preventNativeMenu");return a||n.addEventListener("contextmenu",p),{start:v,move:m,end:y,cancel:y,destroy:e(()=>{y(),n.removeEventListener("contextmenu",p)},"destroy"),style:Mt,touchAction:"manipulation"}}e(Qt,"longPress");Qt.gestures=["longPress"];function te({emit:t,options:n}){const{after:s=null,axis:f=null,pointers:i=1,tolerance:r,touchAction:l=null}=n;let a=!1;const u=e(m=>typeof s=="string"?s:s?.[m]??null,"waitsFor");function y(m,p){if(a&&m.pointers!==i){a=!1,t("panEnd",m);return}if(!a){if(p.type!=="pointermove"||m.pointers!==i||Bt(m))return;const o=u(m.input);if(o){if(!m.claims.has(o))return}else if(s===null&&m.claims.has("longPress")||m.travel<=F(r,m.input))return;if(!V(m,"pan"))return;a=!0,t("panStart",m)}t("panMove",m)}e(y,"move");function h(m){a&&(a=!1,t("panEnd",m))}e(h,"end");function v(m){a&&(a=!1,t("panCancel",m))}return e(v,"cancel"),{move:y,end:h,cancel:v,destroy:e(()=>{a=!1},"destroy"),nativeDrag:!1,style:Mt,touchAction:l??(f==="x"?"pan-y":f==="y"?"pan-x":"none")}}e(te,"pan");te.gestures=["panCancel","panEnd","panMove","panStart"];function ee(t,n,{wheel:s=!0,wheelIntensity:f=.01}={}){let i=null,r=null;const l=e((o,g)=>{i=Zt(t,o,"trackpad"),i.maximumPointers=i.pointers=2,i.source=g,n.start(i,o)},"open"),a=e((o,g,M)=>{i.duration=o.timeStamp-i.startTime,i.movement={x:o.clientX-i.center.x,y:o.clientY-i.center.y},i.phase="move",i.time=o.timeStamp,i.sourceEvent=o,i.center={x:o.clientX,y:o.clientY},i.rotation=M,i.scale=g,n.move(i,o)},"update"),u=e(o=>{if(clearTimeout(r),!i)return;i.phase="end",i.pointers=0;const g=i;i=null,n.end(g,o)},"close");function y(o){o.ctrlKey&&(o.preventDefault(),i?.source!=="gesture"&&(i||l(o,"wheel"),a(o,i.scale*Math.exp(-Gt(o).y*f),0),clearTimeout(r),r=setTimeout(()=>u(o),Jt)))}e(y,"wheel");function h(o){o.preventDefault(),u(o),l(o,"gesture")}e(h,"gesturestart");function v(o){o.preventDefault(),i&&a(o,o.scale,o.rotation)}e(v,"gesturechange");function m(o){o.preventDefault(),u(o)}e(m,"gestureend");const p=s?{gesturechange:v,gestureend:m,gesturestart:h,wheel:y}:{gesturechange:v,gestureend:m,gesturestart:h};for(const[o,g]of Object.entries(p))t.addEventListener(o,g,{passive:!1});return{destroy(){clearTimeout(r),i=null;for(const[o,g]of Object.entries(p))t.removeEventListener(o,g)}}}e(ee,"createTrackpad");function ne({element:t,emit:n,options:s}){const{threshold:f=.05,trackpad:i=!0,wheelIntensity:r}=s;let l=!1,a=1;const u=e(o=>{const g=o.scale/a;return a=o.scale,g},"changeOf");function y(o){V(o,"pinch")&&(l=!0,n("pinchStart",o,{scaleChange:1}),n("pinchMove",o,{scaleChange:u(o)}))}e(y,"begin");function h(o,g){if(!l)return;l=!1;const M=u(g);M!==1&&n("pinchMove",g,{scaleChange:M}),n(o,g,{scaleChange:1})}e(h,"finish");function v(o){if(!l){o.pointers>=2&&Math.abs(o.scale-1)>=f&&y(o);return}if(o.pointers<2){h("pinchEnd",o);return}n("pinchMove",o,{scaleChange:u(o)})}e(v,"move");const m={start:e(()=>{a=1},"start"),cancel:e(o=>h("pinchCancel",o),"cancel"),end:e(o=>h("pinchEnd",o),"end"),move:v},p=i&&ee(t,{end:m.end,move:e(o=>{l?n("pinchMove",o,{scaleChange:u(o)}):y(o)},"move"),start:e(()=>{a=1},"start")},{wheelIntensity:r});return{...m,destroy:e(()=>{l=!1,p?.destroy()},"destroy"),touchAction:"none"}}e(ne,"pinch");ne.gestures=["pinchCancel","pinchEnd","pinchMove","pinchStart"];function ae({active:t,emit:n,options:s}){const{delay:f=400,interval:i=100,tolerance:r}=s,l=t.has("pressRepeat");let a=null,u=null,y=0;const h=e(()=>{clearTimeout(a),clearInterval(u),a=u=null},"stop");function v(p){n("pressStart",p),l&&(h(),y=0,a=setTimeout(()=>{u=setInterval(()=>{if(p.claims.size||p.pointers===0){h();return}n("pressRepeat",p,{count:++y})},i)},f))}e(v,"start");function m(p){(a||u)&&(p.travel>F(r,p.input)||p.pointers>1)&&h()}return e(m,"move"),{start:v,move:m,end:e(p=>{h(),n("pressEnd",p)},"end"),cancel:e(p=>{h(),n("pressCancel",p)},"cancel"),destroy:h,touchAction:"manipulation"}}e(ae,"press");ae.gestures=["pressCancel","pressEnd","pressRepeat","pressStart"];function oe({element:t,emit:n,options:s}){const{threshold:f=10,trackpad:i=!0}=s;let r=!1,l=0;const a=e(p=>{const o=p.rotation-l;return l=p.rotation,o},"changeOf");function u(p){V(p,"rotate")&&(r=!0,n("rotateStart",p,{rotationChange:0}),n("rotateMove",p,{rotationChange:a(p)}))}e(u,"begin");function y(p,o){if(!r)return;r=!1;const g=a(o);g!==0&&n("rotateMove",o,{rotationChange:g}),n(p,o,{rotationChange:0})}e(y,"finish");function h(p){if(!r){p.pointers>=2&&Math.abs(p.rotation)>=f&&u(p);return}if(p.pointers<2){y("rotateEnd",p);return}n("rotateMove",p,{rotationChange:a(p)})}e(h,"move");const v={start:e(()=>{l=0},"start"),cancel:e(p=>y("rotateCancel",p),"cancel"),end:e(p=>y("rotateEnd",p),"end"),move:h},m=i&&ee(t,{end:v.end,move:e(p=>{p.source==="gesture"&&(r?n("rotateMove",p,{rotationChange:a(p)}):u(p))},"move"),start:e(()=>{l=0},"start")},{wheel:!1});return{...v,destroy:e(()=>{r=!1,m?.destroy()},"destroy"),touchAction:"none"}}e(oe,"rotate");oe.gestures=["rotateCancel","rotateEnd","rotateMove","rotateStart"];function re({element:t,emit:n,options:s,session:f}){const{nativeMenu:i=!1}=s,r=e(a=>a.pointerType||(a.button===-1||a.detail===0&&a.clientX===0&&a.clientY===0?"keyboard":"mouse"),"inputOf");function l(a){i||a.preventDefault();const u=r(a),y=f();y&&(u==="touch"||u==="pen")&&V(y,"secondary");const h={x:a.clientX,y:a.clientY};n("secondary",null,{center:h,element:t,input:u,modifiers:{alt:a.altKey,control:a.ctrlKey,meta:a.metaKey,shift:a.shiftKey},start:h,target:a.target},a)}return e(l,"contextmenu"),t.addEventListener("contextmenu",l),{destroy:e(()=>t.removeEventListener("contextmenu",l),"destroy")}}e(re,"secondary");re.gestures=["secondary"];function ie({active:t,emit:n,options:s}){const{minimumDistance:f=30,minimumSpeed:i=.3,touchAction:r=null}=s,l=t.has("swipeLeft")||t.has("swipeRight"),a=t.has("swipeUp")||t.has("swipeDown"),u=t.has("swipe")||!l&&!a;function y(h){if(h.claims.has("longPress")||Bt(h)||h.travel<f||h.velocity.speed<i)return;const v=qt(h.velocity.x,h.velocity.y);v&&(n("swipe",h,{direction:v}),n("swipe"+v[0].toUpperCase()+v.slice(1),h,{direction:v}))}return e(y,"end"),{end:y,nativeDrag:!1,style:Mt,touchAction:r??(u||l&&a?"none":l?"pan-y":"pan-x")}}e(ie,"swipe");ie.gestures=["swipe","swipeDown","swipeLeft","swipeRight","swipeUp"];function ce({active:t,emit:n,options:s}){const{interval:f=300,maximumDuration:i=500,tolerance:r,waitForDoubleTap:l=!0}=s,a=t.has("doubleTap"),u=a&&l!==!1,y=typeof l=="number"?l:f;let h=0,v=null,m=null;const p=e(()=>{clearTimeout(m),m=null},"flush");function o(g,M){const z=F(r,g.input);if(g.claims.size||g.travel>z||g.duration>i){h=0;return}if(g.maximumPointers===2){h=0,v=null,n("twoFingerTap",g,{count:1});return}if(g.maximumPointers>2){h=0;return}const x=M.timeStamp;if(h=v&&x-v.time<=f&&Math.hypot(g.center.x-v.x,g.center.y-v.y)<=z*3?h+1:1,v={time:x,x:g.center.x,y:g.center.y},!u){n("tap",g,{count:h}),a&&h===2&&n("doubleTap",g,{count:h});return}if(p(),h===2){n("doubleTap",g,{count:h});return}if(h>2){n("tap",g,{count:h});return}m=setTimeout(()=>{m=null,n("tap",g,{count:1})},y)}return e(o,"end"),{end:o,destroy:p,touchAction:"manipulation"}}e(ce,"tap");ce.gestures=["doubleTap","tap","twoFingerTap"];function le({active:t,element:n,emit:s,options:f}){const{modifier:i=null,nativeScroll:r=!1}=f,l=t.has("pinchStart")||t.has("pinchMove")||t.has("pinchEnd")||t.has("pinch");let a=null,u=null;function y(){if(clearTimeout(u),!a)return;a.phase="end";const v=a;a=null,s("wheelEnd",v)}e(y,"end");function h(v){if(v.ctrlKey&&l||i&&!vt(v)[i])return;r||v.preventDefault();const m=Gt(v),p=!a;p&&(a=Zt(n,v,"wheel")),a.center={x:v.clientX,y:v.clientY},a.delta={x:a.delta.x+m.x,y:a.delta.y+m.y},a.distance=Math.hypot(a.delta.x,a.delta.y),a.duration=v.timeStamp-a.startTime,a.modifiers=vt(v),a.movement=m,a.time=v.timeStamp,a.sourceEvent=v,a.direction=Math.abs(m.x)>=Math.abs(m.y)?m.x>0?"right":"left":m.y>0?"down":"up",p&&s("wheelStart",a),a.phase="move",s("wheelMove",a),clearTimeout(u),u=setTimeout(y,Jt)}return e(h,"listener"),n.addEventListener("wheel",h,{passive:!1}),{destroy:e(()=>{clearTimeout(u),a=null,n.removeEventListener("wheel",h)},"destroy")}}e(le,"wheel");le.gestures=["wheelEnd","wheelMove","wheelStart"];const ht={doubleTapDrag:Ct,edgeSwipe:kt,longPress:Qt,pan:te,pinch:ne,press:ae,rotate:oe,secondary:re,swipe:ie,tap:ce,wheel:le},mt={};for(const[t,n]of Object.entries(ht))for(const s of n.gestures)mt[s]=t;Object.freeze(Object.keys(mt).sort());const Re=/^on[A-Z]/,lt=e(t=>t.toLowerCase(),"eventTypeOf"),Oe=e(t=>t[2].toLowerCase()+t.slice(3),"gestureOf"),$t=e(t=>mt[t]??(ht[t]?t:null),"ownerOf"),Xt=e(t=>ht[t].priority??0,"priorityOf"),J=e((t,n)=>{if(!$t(t))throw new TypeError(`[@aufbau/gestures] unknown gesture "${t}"${n?` (${n})`:""}`);return t},"known"),Ft=e((t,n)=>{const{claims:s,own:f,startTime:i,...r}=t??{};return{...r,...n}},"snapshot");function Pe(t,n){return!(t.input&&t.input!==n.input||t.minimumDistance&&!(n.distance>=t.minimumDistance)||t.minimumSpeed&&!(n.velocity?.speed>=t.minimumSpeed)||t.pointers&&t.pointers!==n.maximumPointers)}e(Pe,"passes");function je(t,n={}){let s={...n},f=[],i=null,r={},l=null,a=!1,u=!0;const y=new Map,h=new Map,v=new Map,m=new Map,p=new Set;let o=new Set;function g(d){return b=>{if(b.detail?.element===t)for(const{guard:S,handler:k}of y.get(d)??[])Pe(S,b.detail)&&k(b.detail,b)}}e(g,"listenerFor");function M(d,b,S){const{handler:k,...E}=typeof b=="function"?{handler:b}:b,L={guard:E,handler:k,source:S};if(y.has(d)||y.set(d,new Set),y.get(d).add(L),!h.has(d)){const T=g(d);h.set(d,T),t.addEventListener(lt(d),T)}return L}e(M,"add");function z(d,b){const S=y.get(d);!S?.delete(b)||S.size||(y.delete(d),t.removeEventListener(lt(d),h.get(d)),h.delete(d))}e(z,"drop");function x(d){for(const[b,S]of[...y])for(const k of[...S])k.source==="options"&&z(b,k);for(const[b,S]of Object.entries(d))!Re.test(b)||S==null||M(J(Oe(b),b),S,"options");o=new Set((d.recognize??[]).map(b=>J(b,"recognize")))}e(x,"adopt");function R(d,b){const S=v.get(d);return S===void 0||S===!0?!0:S===!1?!1:m.has(d)?m.get(d):b?!!S(b):!0}e(R,"allowed");function W(d,b,S={},k=null){if(!u)return;const E=Ft(b,{element:t,...S,gesture:d});if(E.sourceEvent=k??E.sourceEvent??null,!R(mt[d],E))return;(E.target?.isConnected&&t.contains(E.target)?E.target:t).dispatchEvent(new CustomEvent(lt(d),{bubbles:!0,cancelable:!0,composed:!0,detail:E}))}e(W,"emit");const Y={};for(const d of["start","move","end","cancel"])Y[d]=(b,S)=>{if(d==="start"){m.clear();for(const[k]of f){const E=v.get(k);typeof E=="function"&&m.set(k,!!E(Ft(b,{element:t})))}}for(const[k,E]of f){if(b.phase==="cancel"&&d!=="cancel")break;R(k)&&E[d]?.(b,S)}a&&(d==="end"||d==="cancel")&&c()};const rt=e(d=>d.preventDefault(),"preventDrag"),it=e((d,b)=>{d in r||(r[d]=t.style[d]),t.style[d]=b},"setStyle");function Z(){for(const[,d]of f)d.destroy?.();f=[],t.removeEventListener("dragstart",rt),Object.assign(t.style,r),r={}}e(Z,"teardown");function c(){a=!1,Z();const d=new Set([...y.keys()]),b=new Set([...d,...o,...p]),S=[...new Set([...b].map($t))].sort((T,N)=>Xt(N)-Xt(T)),k=e(()=>i?.session??null,"session");f=S.map(T=>[T,ht[T]({active:b,element:t,emit:W,handled:d,options:s[T]??{},session:k})]);const E=f.some(([,T])=>T.start||T.move||T.end||T.cancel);E&&!i&&(i=De(t,Y,{coalesced:!!s.coalesced,yielding:!!s.yield})),!E&&i&&(i.destroy(),i=null);for(const[,T]of f)for(const[N,he]of Object.entries(T.style??{}))it(N,he);f.some(([,T])=>T.nativeDrag===!1)&&t.addEventListener("dragstart",rt);const L=s.touchAction??f.reduce((T,[,N])=>Le(T,N.touchAction),null);L&&it("touchAction",L),l=$()}e(c,"build");const $=e(()=>[[...y.keys()].sort(),[...o].sort(),[...p].sort()].join("|"),"signature");function C(d=!1){!u||!d&&l===$()||(i?.session?a=!0:c())}e(C,"rebuild"),x(s),c();const O={element:t,get session(){return i?i.session:null},enable(d,b=!0){return v.set($t(J(d)),b),O},on(d,b){const S=M(J(d),b,"on");return C(),()=>{z(d,S),C()}},recognize(d,b=!0){for(const S of[d].flat())b?p.add(J(S)):p.delete(S);return C(),O},set(d={}){return s={...s,...d},x(s),("coalesced"in d||"yield"in d)&&i&&!i.session&&(i.destroy(),i=null),C(!0),O},destroy(){u=!1,i?.destroy(),i=null,Z();for(const[d,b]of h)t.removeEventListener(lt(d),b);h.clear(),y.clear()}};return O}e(je,"gestures");function Ke(t,n){return Ue.call({props:t},t,n)}e(Ke,"DockRatHtml");function Ue(t,n){const s=_(()=>RAT.app?.router.$path.value??"/"),f=e((l,a)=>l==="/"?a==="/":a===l||a.startsWith(`${l}/`),"owns"),i=e(l=>l.to!=null&&[l.to,...l.match??[]].some(a=>f(a,s.value)),"isActive"),r=e(l=>l.onclick?l.onclick():RAT.app.router.go(l.to),"run");return w`
    <nav.dock>
      ${X(()=>t.items??[],l=>l,l=>w`<btn-tap class=${()=>i(l)?"col active":"col"} aria-current=${()=>ge(i(l)?"page":null)} icon=${()=>l.icon} label=${()=>l.label} onclick=${I(()=>r(l))} />`)}
    </nav>
  `}e(Ue,"$$DockRatHtml");const Ye=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function gt(t,n){return Xe.call({props:t},t,n)}e(gt,"EmptyRatHtml");function Xe(t,n){return Et("ihnpco",Ye),w`
    <div.empty data-rat="ihnpco">
      ${D(()=>t.icon,()=>w`<svg-icon icon=${()=>t.icon} />`)}
      ${D(()=>t.title,()=>w`<p.title>${()=>t.title}</p>`)}
      ${D(()=>t.hint,()=>w`<p.hint>${()=>t.hint}</p>`)}
      ${n}
    </div>
  `}e(Xe,"$$EmptyRatHtml");const Fe=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function It(t,n){return He.call({props:t},t,n)}e(It,"LoadingRatHtml");function He(t,n){return Et("1tn1js8",Fe),w`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${D(()=>t.text,()=>w`<span>${()=>t.text}</span>`)}
    </div>
  `}e(He,"$$LoadingRatHtml");const et=ft("appearance",{}),Ht={density:q.densities,geometry:q.geometries,mode:q.modes},Ne=e(()=>et.value,"appearance"),_e=e(()=>q.palettes().catch(()=>[]),"palettes");function Ve(t,n){return et.value={...et.value,[t]:n||null},q.set({[t]:n||null})}e(Ve,"setAppearance");Object.keys(et.value).length&&q.set(et.value);const st=e(t=>(n,s)=>ye.notify(n,{...s,type:t}),"notify"),U=Object.assign(st("info"),{error:st("error"),info:st("info"),success:st("success")});let Q=null;const at=ve(!1),se=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,We=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!se;addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Q=t,at.value=!0});addEventListener("appinstalled",()=>{Q=null,at.value=!1});async function qe(){if(!Q)return!1;const t=Q;return Q=null,at.value=!1,t.prompt(),(await t.userChoice).outcome==="accepted"}e(qe,"install");function Be(t){const n=e(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),U(`${t} can be installed: see the settings`))},"show");at.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}e(Be,"hint");const Ge=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Nt(t,n){return Ze.call({props:t},t,n)}e(Nt,"SettingsRatHtml");function Ze(t,n){Et("177zzh1",Ge);let s=H({...Ne()}),f=H([]);const i=_(()=>at.value);_e().then(a=>{f.value=a});function r(a,u){const y=u.detail?.value??u.target.value;s.value={...s.value,[a]:y},Ve(a,y)}e(r,"change");async function l(){await qe()&&U.success(`${t.name??"the app"} is installed`)}return e(l,"installApp"),w`
    <div.settings data-rat="177zzh1">
      ${n}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>s.value.palette??"zombie"} onchange=${I(a=>r("palette",a))}>
            ${X(()=>f.value,a=>a,a=>w`<input-option value=${()=>a}>${()=>a}</input-option>`)}
          </input-value>
        </label>
        ${X(()=>Object.keys(Ht),a=>a,a=>w`
            <label>
              <span>${()=>a}</span>
              <input-value look="segments" value=${()=>s.value[a]??""} onchange=${I(u=>r(a,u))}>
                ${X(()=>Ht[a],u=>u,u=>w`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${D(()=>!se,()=>w`
          <section>
            <h3>install</h3>
            ${D(()=>i.value,()=>w`<btn-push icon="download" label=${()=>"install "+(t.name??"the app")} onclick=${I(l)} />`,()=>w`
                ${D(()=>We,()=>w`<p.hint>Share, then "Add to Home Screen".</p>`,()=>w`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}e(Ze,"$$SettingsRatHtml");const ot="https://api.iconify.design",Je=1440*60*1e3,Qe=Ce($e({driver:"cache",name:"icons-api"}),{ttl:Je}),ue=e((t,n)=>Qe.get(`${ot}/rat-cache/${encodeURIComponent(t)}`,n),"cached");async function Dt(t){const n=await fetch(t,{headers:{accept:"application/json"}});if(!n.ok)throw new Error(`Iconify API ${n.status}`);return n.json()}e(Dt,"getJson");function tn(){return ue("collections",async()=>{const t=await Dt(`${ot}/collections`);return Object.entries(t).map(([n,s])=>({prefix:n,name:s.name||n,total:s.total||0,samples:s.samples||[],author:s.author?.name||"",category:s.category||"",palette:!!s.palette})).sort((n,s)=>n.name.localeCompare(s.name,void 0,{sensitivity:"base"}))})}e(tn,"collections");function en(t){return ue(`set:${t}`,async()=>{const n=await Dt(`${ot}/collection?prefix=${encodeURIComponent(t)}`),s=[...n.uncategorized||[],...Object.values(n.categories||{}).flat()],f=new Set,i=[];for(const r of s)f.has(r)||(f.add(r),i.push(`${t}:${r}`));return{prefix:t,title:n.title||t,total:n.total||i.length,icons:i}})}e(en,"collection");async function nn(t,n=120){const s=t.trim();return s?(await Dt(`${ot}/search?query=${encodeURIComponent(s)}&limit=${n}`)).icons||[]:[]}e(nn,"search$1");const an=e(t=>`${ot}/${t.replace(":","/")}.svg`,"svgUrl");async function pe(t){const n=await fetch(an(t));if(!n.ok)throw new Error(`could not load ${t}`);return n.text()}e(pe,"svgText");be(()=>import("https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"),[],import.meta.url).catch(()=>{});let K=H(null),j=H(null),wt=H(!1),bt=H(null),ut=H(!1),A=H(null),de=ft("setFilter",""),G=ft("query",""),B=ft("itemSize",88);const _t=_(()=>/^\/set\/(.+)$/.exec(RAT.app.router.$path.value)?.[1]??null),xt=RAT.app.database.favs,St=_(()=>new Set(xt.$items.map(t=>t.name)));async function on(){if(!K.value)try{K.value=await tn()}catch{K.value=[],U.error("Could not reach the Iconify API")}}e(on,"loadCollections");async function rn(t){if(!(!t||j.value?.prefix===t)){j.value=null,wt.value=!0;try{j.value=await en(t)}catch{U.error("Could not load that set")}finally{wt.value=!1}}}e(rn,"loadSet");xe(()=>{rn(_t.value?decodeURIComponent(_t.value):null)});const Tt=e(t=>RAT.app.router.go(t),"go"),Lt=e(t=>Tt(`/set/${encodeURIComponent(t)}`),"openSet");let Vt=null;function At(t){G.value=t,clearTimeout(Vt);const n=t.trim();if(!n){bt.value=null,ut.value=!1;return}ut.value=!0,Vt=setTimeout(async()=>{try{bt.value=await nn(n)}catch{U.error("Search failed")}finally{ut.value=!1}},250)}e(At,"search");function cn(t){A.value=t,RAT.toggle("context",!0)}e(cn,"inspect");function ln(){RAT.toggle("context",!1),A.value=null}e(ln,"closeDetail");function sn(){const t=RAT.app.router.$path.value;t.startsWith("/set/")?Tt("/sets"):t==="/search"&&G.value?At(""):t!=="/"&&Tt("/")}e(sn,"up");const tt=e(t=>t?.toLocaleString?.()??String(t??0),"count"),un=_(()=>(()=>{const t=de.value.trim().toLowerCase(),n=K.value??[];return t?n.filter(s=>s.name.toLowerCase().includes(t)||s.prefix.toLowerCase().includes(t)):n})()),pn=_(()=>(K.value??[]).reduce((t,n)=>t+(n.total||0),0)),dn=["mdi","material-symbols","lucide","ph","tabler","bi","fa6-solid","ri","carbon","solar"],Wt=_(()=>dn.map(t=>(K.value??[]).find(n=>n.prefix===t)).filter(Boolean));async function zt(t,n="Copied"){try{await navigator.clipboard.writeText(t),U.success(n)}catch{U.error("Copy failed")}}e(zt,"copy");async function fn(t){try{await zt(await pe(t),"SVG copied")}catch{U.error("Could not copy the SVG")}}e(fn,"copySvg");async function hn(t){try{const n=URL.createObjectURL(new Blob([await pe(t)],{type:"image/svg+xml"})),s=Te("a",{download:t.replace(":","-")+".svg",href:n});document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch{U.error("Could not download the SVG")}}e(hn,"downloadSvg");const nt=e(t=>St.value.has(t),"isFav");function fe(t,n){return n?.stopPropagation(),nt(t)?xt.delete(t):xt.add({name:t})}e(fe,"toggleFav");const mn=e(t=>w`
    <button.cell title=${()=>t.name} onclick=${I(()=>cn(t.name))}>
      <span.glyph><iconify-icon icon=${()=>t.name} /></span>
      <span.cname>${()=>t.name.split(":")[1]}</span>
      <btn-push class=${()=>nt(t.name)?"heart on":"heart"} icon=${()=>nt(t.name)?"heart":"heart-outline"} title="Favourite" onclick=${I(n=>fe(t.name,n))} />
    </button>
  `,"IconCell"),dt={max:200,min:56},gn=e(t=>{let n=B.value;const s=je(t,{onPinchStart:e(()=>{n=B.value},"onPinchStart"),onPinchMove:e(f=>{B.value=Math.round(Math.min(dt.max,Math.max(dt.min,n*f.scale)))},"onPinchMove")});return()=>s.destroy()},"pinchSize"),Rt=e(t=>w`
    ${D(()=>t.names?.length,()=>w`
        <div.grid style=${()=>"--isz: "+B.value+"px"} ref=${Se(gn)}>
          ${X(()=>t.names,n=>n,n=>w`<${mn} ...${{get name(){return n}}} />`)}
        </div>
      `,()=>w`<${gt} icon="image-search" title="Nothing here." />`)}
  `,"IconGrid"),yt=e(()=>w`
    <div.size>
      <svg-icon icon="zoom-out" />
      <input type="range" min=${()=>dt.min} max=${()=>dt.max} step="1" value=${()=>B.value} oninput=${I(t=>B.value=Number(t.target.value))} />
      <svg-icon icon="zoom-in" />
    </div>
  `,"SizeControl"),yn=e(()=>w`
    <div.home>
      <div.hero>
        <svg-icon icon="smile" />
        <h1>The whole Iconify library</h1>
        <p>${()=>K.value?"Browse "+tt(pn.value)+" icons across "+tt(K.value.length)+" sets.":"Loading the catalogue …"}</p>
        <div.hero-actions>
          <btn-push icon="images" label="browse sets" onclick=${pt("go[sets]")} />
          <btn-push icon="search" label="search" onclick=${pt("go[search]")} />
        </div>
      </div>
      ${D(()=>Wt.value.length,()=>w`
          <div.home-sets>
            <div.home-sets-head>Popular sets</div>
            <div.chips>
              ${X(()=>Wt.value,t=>t,t=>w`<button.chip onclick=${I(()=>Lt(t.prefix))}>${()=>t.name} <span>${()=>tt(t.total)}</span></button>`)}
            </div>
          </div>
        `)}
    </div>
  `,"HomeView"),vn=e(()=>w`
    <header.topbar>
      <div.searchbox>
        <svg-icon icon="search" />
        <input type="search" placeholder="Filter sets …" ref=${we(de,"value")} />
      </div>
    </header>
    ${D(()=>!K.value,()=>w`<${It} />`,()=>w`
        <div.sets>
          ${X(()=>un.value,t=>t,t=>w`
              <button.set-card onclick=${I(()=>Lt(t.prefix))}>
                <div.set-samples>
                  ${X(()=>t.samples.slice(0,3),n=>n,n=>w`<iconify-icon icon=${()=>t.prefix+":"+n} />`)}
                </div>
                <div.set-name title=${()=>t.name}>${()=>t.name}</div>
                <div.set-meta>${()=>tt(t.total)} icons${()=>t.author?" · "+t.author:""}</div>
              </button>
            `,()=>w`<${gt} icon="image-search" title="Nothing here." />`)}
        </div>
      `)}
  `,"SetsView"),$n=e(()=>w`
    <header.topbar>
      <btn-icon icon="arrow-left" label="Back" onclick=${pt("go[sets]")} />
      <span.spacer />
      <${yt} />
    </header>
    ${D(()=>wt.value||!j.value,()=>w`<${It} />`,()=>w`
        <div.setview>
          <header.setview-head>
            <div>
              <h1>${()=>j.value.title}</h1>
              <div.sub>${()=>tt(j.value.total)} icons · <code>${()=>j.value.prefix}</code></div>
            </div>
            <btn-push class="small" icon="copy" label="copy prefix" onclick=${I(()=>zt(j.value.prefix))} />
          </header>
          <${Rt} ...${{get names(){return j.value.icons}}} />
        </div>
      `)}
  `,"SetView"),wn=e(()=>w`
    <header.topbar>
      <div.searchbox.big>
        <svg-icon icon="search" />
        <input type="search" placeholder="Search all of Iconify …" value=${()=>G.value} oninput=${I(t=>At(t.target.value))} />
      </div>
      <${yt} />
    </header>
    ${D(()=>ut.value,()=>w`<${It} />`,()=>w`
        ${D(()=>G.value.trim(),()=>w`<${Rt} ...${{get names(){return bt.value??[]}}} />`,()=>w`<${gt} icon="search" hint="Search across every Iconify set." />`)}
      `)}
  `,"SearchView"),bn=e(()=>w`
    <header.topbar><h1>Favourites</h1><span.spacer /><${yt} /></header>
    ${D(()=>St.value.size,()=>w`<${Rt} ...${{get names(){return[...St.value]}}} />`,()=>w`<${gt} icon="heart" hint="No favourites yet: tap the heart on any icon." />`)}
  `,"FavoritesView"),xn=e(()=>w`
    ${D(()=>A.value,()=>w`
        <app-panel heading=${()=>A.value.split(":")[1]}>
          <div.detail>
            <div.sheet-preview><iconify-icon icon=${()=>A.value} /></div>
            <div.sheet-set><button.linkish onclick=${I(()=>{const[t]=A.value.split(":");ln(),Lt(t)})}>${()=>A.value.split(":")[0]}</button></div>
            <div.sheet-actions>
              <btn-push icon="copy" label="copy name" onclick=${I(()=>zt(A.value))} />
              <btn-push icon="svg" label="copy svg" onclick=${I(()=>fn(A.value))} />
              <btn-push icon="download" label="download" onclick=${I(()=>hn(A.value))} />
              <btn-push icon=${()=>nt(A.value)?"heart":"heart-outline"} label=${()=>nt(A.value)?"Favourited":"Favourite"} onclick=${I(()=>fe(A.value))} />
            </div>
          </div>
        </app-panel>
      `)}
  `,"Detail"),Sn=[{icon:"home",label:"home",to:"/"},{icon:"search",label:"search",to:"/search"},{icon:"images",label:"sets",to:"/sets",match:["/set"]},{icon:"heart",label:"favs",to:"/favs"},{icon:"settings",label:"settings",onclick:e(()=>RAT.toggle("config"),"onclick")}],Dn=e(t=>(t.app.hold(on()),t.app.commands.set("up",sn),Be("Icons"),G.value.trim()&&At(G.value),w`
    <rat-view route="/" name="home"><${yn} /></rat-view>
    <rat-view route="/sets" name="sets"><${vn} /></rat-view>
    <rat-view route="/set/:prefix" name="set"><${$n} /></rat-view>
    <rat-view route="/search" name="search"><${wn} /></rat-view>
    <rat-view route="/favs" name="favs"><${bn} /></rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${Ke} ...${{get items(){return Sn}}} /></rat-area>
    <rat-area name="context" dock="bottom" overlay="always" ontoggle=${I(n=>{n.detail?.open||(A.value=null)})}><${xn} /></rat-area>
    <rat-area name="config" dock="end">
      <${Nt} name="Icons">
        <section>
          <h3>grid</h3>
          <label><span>cell size (or pinch the grid)</span><${yt} /></label>
        </section>
      </${Nt}>
    </rat-area>
  `),"app_rat");export{Dn as default};
