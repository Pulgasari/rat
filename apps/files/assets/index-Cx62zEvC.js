const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-D_xAKS-Y.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./preload-helper-Cc2_yIPf.js","./clipboard-DEIqTmq2.js","./database-DM0-3NhX.js","./store-m2Y2q3s_.js","./dialogs-BW0XSeOh.js","./external-DyNe1vmV.js","./files-Dv3AwROg.js","./hotkeys-DO-xoeTX.js","./keys-CWTtq0D5.js","./notifications-OMtplzlo.js","./offline-CUoJZI21.js","./store-BoQVJWPE.js","./thumbnails-BP7TLTrf.js","./pop-over-BhJuUlH3.js","./widget-calculator-DDAXvt8T.js","./index-f1CGb_xX.js","./capacitor-CCCt9GT9.js","./_capacitor-9HBST7L5.js","./capacitor-D3bIhX_I.js","./_sqlite-7QzGfcuH.js","./deno-BByxYXn1.js","./capacitor-CrwlxJUU.js","./capacitor-CEqFVJaa.js","./capacitor-CbCZhLAo.js","./_fs-Cf_TBARi.js","./deno-xgjCZN34.js","./capacitor-CKSh_kHX.js","./deno-DsR_18HX.js","./capacitor-BeWV1cig.js","./capacitor-D27RfInF.js","./app.rat-Deznye4J.js"])))=>i.map(i=>d[i]);
var gi=Object.defineProperty;var s=(e,t)=>gi(e,"name",{value:t,configurable:!0});import{_ as g}from"./preload-helper-Cc2_yIPf.js";import{O as bi,P as yi,a as L,h as b,e as vi,A as wi,x as Wn,c as ki}from"./withControl-saxu6q3w.js";import{isFn as Ve,isString as Kt,isArray as tn,isPlainObject as en,predicates as xi}from"https://esm.sh/jsr/@pulgasari/is";import{toCamelCase as Si}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";import"./index-CgHh2HpB.js";s(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}s(n,"getFetchOpts");function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}s(r,"processPreload")},"polyfill")();let x=class{static{s(this,"Schema")}constructor({checks:t=[],describe:n={},factory:r=null,initial:i,kind:o,nullable:a=!1,parts:c=null,run:l,transform:u=null}){Object.assign(this,{checks:t,describe:{kind:o,...n},factory:r,initial:i,kind:o,nullable:a,parts:c,run:l,transform:u}),Object.freeze(this)}derive(t){return new this.constructor({...this,...t,describe:{...this.describe,...t.describe}})}check(t,n="check failed",r={}){return this.derive({checks:[...this.checks,[t,n]],describe:r})}default(t){return this.derive({describe:{initial:t},initial:t})}optional(){return this.derive({describe:{optional:!0},nullable:!0})}validate(t,n=[]){if(t==null&&this.nullable)return{value:t};const r=this.run(t,n);if(r.issues)return r;const i=this.checks.filter(([o])=>!o(r.value)).map(([,o])=>({message:o,path:n}));return i.length?{issues:i}:r}is(t){return!this.validate(t).issues}create(t){if(!this.factory)throw new TypeError(`[rat] ${this.kind} is no data type, there is nothing to create: its values are plain js`);return this.factory(this,t)}from(t){if(!this.transform)throw new TypeError(`[rat] ${this.kind} has no transform, nothing can be made into it`);return this.transform(t)}to(t){return this.derive({checks:[],run:s((n,r)=>{const i=this.validate(n,r);return i.issues?i:t.validate(t.from(i.value),r)},"run")})}parse(t){const n=this.validate(t);if(n.issues)throw new TypeError(`[rat] ${n.issues.map(r=>(r.path.length?r.path.join(".")+": ":"")+r.message).join(", ")}`);return n.value}get"~standard"(){return{validate:s(t=>this.validate(t),"validate"),vendor:"rat",version:1}}};const ie=s((e,t,n=r=>r)=>(r,i)=>{const o=n(r);return t(o)?{value:o}:{issues:[{message:`expected ${e}`,path:i}]}},"scalar");class Oi extends x{static{s(this,"NumSchema")}min(t){return this.check(n=>n>=t,`at least ${t}`,{min:t})}max(t){return this.check(n=>n<=t,`at most ${t}`,{max:t})}range(t,n){return this.min(t).max(n).derive({initial:this.initial<t||this.initial>n?t:this.initial})}get int(){return this.check(Number.isInteger,"an integer",{int:!0})}}const Kn={false:!1,no:!1,off:!1,on:!0,true:!0,yes:!0},$i=s(e=>typeof e=="string"&&e.toLowerCase()in Kn?Kn[e.toLowerCase()]:e,"toBool"),Ei=s(e=>typeof e=="string"&&e.trim()!==""&&!isNaN(e)?Number(e):e,"toNum"),zr=new x({initial:!1,kind:"bool",run:ie("a boolean",e=>typeof e=="boolean",$i)}),Lr=new Oi({initial:0,kind:"num",run:ie("a number",e=>typeof e=="number"&&Number.isFinite(e),Ei)}),Cr=s(e=>e instanceof x,"isSchema$2"),Ai=s((e,t,n)=>new e(t,n),"byConstructor");function z(e,t,n=Ai){const r=new Proxy(e,{apply:s((i,o,a)=>t(...a).derive({factory:s((c,l)=>n(r,c,l),"factory")}),"apply")});return r}s(z,"typed");const Gt=s(e=>e!==null&&typeof e=="object"&&!Array.isArray(e),"isObject");class _i extends x{static{s(this,"StrSchema")}min(t){return this.check(n=>n.length>=t,`at least ${t} characters`,{min:t})}max(t){return this.check(n=>n.length<=t,`at most ${t} characters`,{max:t})}pattern(t,n=`matching ${t}`){return this.check(r=>t.test(r),n,{pattern:t.source})}get email(){return this.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"an email address")}get uuid(){return this.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,"a uuid")}case({regex:t=null,transform:n}){return this.derive({describe:{regex:t?.source??null},transform:n,run:s((r,i)=>{const o=this.run(r,i);return o.issues||n(o.value)===o.value?o:{issues:[{message:`expected ${t??"this case"}`,path:i}]}},"run")})}}const T=new _i({initial:"",kind:"str",run:ie("a string",e=>typeof e=="string")}),gt=s(e=>String(e??"").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/[\s\-_.]+/g," ").trim().toLowerCase().split(" ").filter(Boolean),"toWords"),nn=s(e=>e.charAt(0).toUpperCase()+e.slice(1),"upperFirst"),Ti=T.case({regex:/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/,transform:s(e=>gt(e).map((t,n)=>n?nn(t):t).join(""),"transform")}),zi=T.case({regex:/^[A-Z0-9]+(_[A-Z0-9]+)*$/,transform:s(e=>gt(e).join("_").toUpperCase(),"transform")}),Rr=T.case({regex:/^[a-z0-9]+(-[a-z0-9]+)*$/,transform:s(e=>gt(e).join("-"),"transform")}),Li=T.case({transform:s(e=>String(e??"").toLowerCase(),"transform")}),Ci=T.case({transform:s(e=>[...String(e??"")].map((t,n)=>n%2?t.toUpperCase():t.toLowerCase()).join(""),"transform")}),Ri=T.case({regex:/^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/,transform:s(e=>gt(e).map(nn).join(""),"transform")}),Ni=T.case({regex:/^[a-z0-9]+(_[a-z0-9]+)*$/,transform:s(e=>gt(e).join("_"),"transform")}),ji=T.case({regex:/^[A-Z][a-z0-9]*(\s[A-Z][a-z0-9]*)*$/,transform:s(e=>gt(e).map(nn).join(" "),"transform")}),Pi=T.case({transform:s(e=>String(e??"").toUpperCase(),"transform")}),Nr=new x({initial:void 0,kind:"fn",run:ie("a function",e=>typeof e=="function")});function Di({update:e,notify:t,unwatched:n}){return{link:r,unlink:i,propagate:o,checkDirty:a,shallowPropagate:c};function r(u,p,d){const f=p.depsTail;if(f!==void 0&&f.dep===u)return;const h=f!==void 0?f.nextDep:p.deps;if(h!==void 0&&h.dep===u){h.version=d,p.depsTail=h;return}const m=u.subsTail;if(m!==void 0&&m.version===d&&m.sub===p)return;const v=p.depsTail=u.subsTail={version:d,dep:u,sub:p,prevDep:f,nextDep:h,prevSub:m,nextSub:void 0};h!==void 0&&(h.prevDep=v),f!==void 0?f.nextDep=v:p.deps=v,m!==void 0?m.nextSub=v:u.subs=v}function i(u,p=u.sub){const{dep:d,prevDep:f,nextDep:h,nextSub:m,prevSub:v}=u;return h!==void 0?h.prevDep=f:p.depsTail=f,f!==void 0?f.nextDep=h:p.deps=h,m!==void 0?m.prevSub=v:d.subsTail=v,v!==void 0?v.nextSub=m:(d.subs=m)===void 0&&n(d),h}function o(u,p){let d=u.nextSub,f;t:do{const h=u.sub;let m=h.flags;if(m&60?m&12?m&4?!(m&48)&&l(u,h)?(h.flags=m|40,m&=1):m=0:h.flags=m&-9|32:m=0:(h.flags=m|32,p&&(h.flags|=8)),m&2&&t(h),m&1){const v=h.subs;if(v!==void 0){const k=(u=v).nextSub;k!==void 0&&(f={value:d,prev:f},d=k);continue}}if((u=d)!==void 0){d=u.nextSub;continue}for(;f!==void 0;)if(u=f.value,f=f.prev,u!==void 0){d=u.nextSub;continue t}break}while(!0)}function a(u,p){let d,f=0,h=!1;t:do{const m=u.dep,v=m.flags;if(p.flags&16)h=!0;else if((v&17)===17){const k=m.subs;e(m)&&(k.nextSub!==void 0&&c(k),h=!0)}else if((v&33)===33){d={value:u,prev:d},u=m.deps,p=m,++f;continue}if(!h){const k=u.nextDep;if(k!==void 0){u=k;continue}}for(;f--;){if(u=d.value,d=d.prev,h){const J=p.subs;if(e(p)){J.nextSub!==void 0&&c(J),p=u.sub;continue}h=!1}else p.flags&=-33;p=u.sub;const k=u.nextDep;if(k!==void 0){u=k;continue t}}return h&&!!p.flags}while(!0)}function c(u){do{const p=u.sub,d=p.flags;(d&48)===32&&(p.flags=d|16,(d&6)===2&&t(p))}while((u=u.nextSub)!==void 0)}function l(u,p){let d=p.depsTail;for(;d!==void 0;){if(d===u)return!0;d=d.prevDep}return!1}}s(Di,"createReactiveSystem");const G=1,pt=2,st=4,Ii=8,Ot=16,Be=32,Zt=64;let O,U=null,qe=0,Ue=0,oe=0;const B=[];let wt=0,Y=0;class ae{static{s(this,"Node")}deps=void 0;depsTail=void 0;subs=void 0;subsTail=void 0;flags=0}class ot extends ae{static{s(this,"Signal")}flags=G;schema;currentValue;pendingValue;constructor(t){super(),Jr(t)&&(this.schema=t,t=t.initial),this.currentValue=this.pendingValue=t}get value(){return this.flags&Ot&&Dr(this)&&this.subs&&Pr(this.subs),O&&on(this,O,oe),this.currentValue}set value(t){if(this.schema){const n=Bi(this.schema,t);if(!n.ok)return;t=n.value}Object.is(this.pendingValue,t)||(this.pendingValue=t,this.flags=G|Ot,this.subs&&(Mi(this.subs,Ue>0),qe||Vr()))}peek(){return Ct(()=>this.value)}toString(){return String(this.value)}}class Yt extends ae{static{s(this,"Computed")}getter;current=void 0;constructor(t){super(),this.getter=t}get value(){const t=this.flags;if(t&Ot||t&Be&&(jr(this.deps,this)||(this.flags=t&~Be,!1)))Ir(this)&&this.subs&&Pr(this.subs);else if(!t){this.flags=G|st;const n=O;O=this;try{this.current=this.getter()}finally{O=n,this.flags&=~st}}return O&&on(this,O,oe),this.current}peek(){return Ct(()=>this.value)}toString(){return String(this.value)}}class rn extends ae{static{s(this,"Effect")}fn;cleanups=[];flags=pt|st;constructor(t){super(),this.fn=t}}class sn extends ae{static{s(this,"Scope")}cleanups=[];flags=G}const{link:on,unlink:ce,propagate:Mi,checkDirty:jr,shallowPropagate:Pr}=Di({update(e){return e instanceof Yt?Ir(e):e instanceof ot?Dr(e):(e.flags=G,!0)},notify(e){let t=wt;const n=t;do B[t++]=e,e.flags&=~pt,e=e.subs?.sub;while(e!==void 0&&e.flags&pt);wt=t;for(let r=n,i=t-1;r<i;r++,i--)[B[r],B[i]]=[B[i],B[r]]},unwatched(e){e instanceof Yt?e.depsTail!==void 0&&(e.flags=G|Ot,Fr(e)):(e instanceof rn||e instanceof sn)&&an(e)}});function Dr(e){e.flags=G;const t=!Object.is(e.currentValue,e.pendingValue);return e.currentValue=e.pendingValue,t}s(Dr,"commit");function Ir(e){e.flags&Zt&&qr(e),e.depsTail=void 0,e.flags=G|st;const t=O;O=e;try{oe++;const n=e.current;return e.current=e.getter(n),!Object.is(n,e.current)}finally{O=t,e.flags&=~st,Ur(e)}}s(Ir,"recompute");function Vi(e){const t=e.flags;if(t&Ot||t&Be&&jr(e.deps,e)){if(t&Zt&&qr(e),Hr(e),!e.flags)return;e.depsTail=void 0,e.flags=pt|st,Mr(e),Ur(e)}else e.deps!==void 0&&(e.flags=pt|t&Zt)}s(Vi,"run");function Mr(e){const t=O,n=U;O=e,U=e;try{oe++,Ue++;const r=e.fn();typeof r=="function"&&e.cleanups.push(r)}finally{Ue--,O=t,U=n,e.flags&=~st}}s(Mr,"execute");function Vr(){try{for(;Y<wt;){const e=B[Y];B[Y++]=void 0,Vi(e)}}finally{for(;Y<wt;){const e=B[Y];B[Y++]=void 0,e.flags|=pt|Ii}Y=0,wt=0}}s(Vr,"flush");function Br(e,t){t&&(on(e,t,0),t.flags|=Zt)}s(Br,"adopt");function qr(e){for(let t=e.depsTail;t!==void 0;){const n=t.prevDep;(t.dep instanceof rn||t.dep instanceof sn)&&ce(t,e),t=n}}s(qr,"dropChildren");function Ur(e){for(let t=e.depsTail!==void 0?e.depsTail.nextDep:e.deps;t!==void 0;)t=ce(t,e)}s(Ur,"purge");function Fr(e){for(let t=e.depsTail;t!==void 0;){const n=t.prevDep;ce(t,e),t=n}}s(Fr,"unlinkAll");function Hr(e){if(!e.cleanups.length)return;const t=O;O=void 0;try{for(const n of e.cleanups.splice(0))n()}finally{O=t}}s(Hr,"runCleanups");function an(e){!e.flags&&!e.deps&&!e.subs||(e.flags=0,Fr(e),e.subs!==void 0&&ce(e.subs),Hr(e))}s(an,"dispose");const Jr=s(e=>typeof e?.["~standard"]?.validate=="function","isSchema$1");function Bi(e,t){const n=e["~standard"].validate(t);return typeof n?.then=="function"?(console.warn("[rat] an async schema can not check a signal write, the value is taken as it is"),{ok:!0,value:t}):n.issues?(console.warn(`[rat] ${JSON.stringify(t)} rejected: ${n.issues.map(r=>r.message).join(", ")}`),{ok:!1}):{ok:!0,value:n.value}}s(Bi,"check");const ut=s(e=>new ot(e),"signal"),Du=s(e=>new Yt(e),"computed"),Wr=s(e=>e instanceof ot||e instanceof Yt,"isSignal");function cn(e,t=U){const n=new rn(e);return Br(n,t),Mr(n),()=>an(n)}s(cn,"effect");function Fe(e,t=U){const n=new sn;Br(n,t);const r=O,i=U;O=void 0,U=n;try{return[e(),()=>an(n)]}finally{O=r,U=i}}s(Fe,"scope");function qi(e){qe++;try{return e()}finally{--qe||Vr()}}s(qi,"batch");function Ct(e){const t=O;O=void 0;try{return e()}finally{O=t}}s(Ct,"untrack");function Ui(e){U?.cleanups.push(e)}s(Ui,"onCleanup");const Rt=Symbol.for("rat.reactive"),Gn=new WeakMap,Kr=s(e=>Gn.get(e)??Gn.set(e,new ot(0)).get(e),"versionOf"),Zn=s(e=>{Kr(e).value},"track"),Fi=s(e=>{Kr(e).value++},"bump"),Hi=s(e=>Wr(e)||e?.[Rt]===!0,"isReactive");function $e(e,t){for(let n=e;n;n=Object.getPrototypeOf(n)){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r}return null}s($e,"descriptorOf");const Ji=s(e=>Array.isArray(e)?e.map(t=>[t,!0]):Reflect.ownKeys(e).map(t=>[t,e[t]]),"entriesOf");function N(e,{reads:t=[],writes:n=[]}={}){const r=class extends e{static{s(this,"Reactive")}};Object.defineProperty(r,"name",{value:`$${e.name}`}),Object.defineProperty(r.prototype,Rt,{value:!0});for(const i of t){const o=$e(e.prototype,i);if(!o)throw new TypeError(`[rat] ${e.name} has no ${String(i)} to read`);if(o.get){const a=o.get;Object.defineProperty(r.prototype,i,{configurable:!0,get(){return Zn(this),a.call(this)},set:o.set})}else{const a=o.value;Object.defineProperty(r.prototype,i,{configurable:!0,writable:!0,value:s(function(...c){return Zn(this),a.apply(this,c)},"value")})}}for(const[i,o]of Ji(n)){const a=$e(e.prototype,i),c=a?.value??a?.set;if(typeof c!="function")throw new TypeError(`[rat] ${e.name} has no method or setter ${String(i)} to write with`);const l=s(function(...u){return o!==!0&&!Ct(()=>o(this,...u))?c.apply(this,u):qi(()=>{const p=c.apply(this,u);return Fi(this),p})},"write");a.set?Object.defineProperty(r.prototype,i,{configurable:!0,get:$e(r.prototype,i).get,set:l}):Object.defineProperty(r.prototype,i,{configurable:!0,writable:!0,value:l})}return r}s(N,"reactive");const Gr=[];function I(e,t){const n=e.prototype?i=>i instanceof e:e,r=t.prototype?.[Rt]?i=>new t(i):t;Gr.unshift([n,r])}s(I,"register");function Yn(e){if(e==null||typeof e!="object"||Hi(e))return e;for(const[t,n]of Gr)if(t(e))return n(e);return e}s(Yn,"wrap");class Wi extends ot{static{s(this,"Holder")}constructor(t){super(Yn(t))}get value(){return super.value}set value(t){super.value=Yn(t)}}function Ki(e){return Wr(e)?e:Jr(e)?new ot(e):new Wi(e)}s(Ki,"$");Ki.register=I;const R=Symbol("rat.scalar.get"),nt=Symbol("rat.scalar.set");class ln{static{s(this,"Scalar")}#t;constructor(t,n,r){t instanceof x&&([t,n]=[void 0,t]),this.schema=n??r,this.#t=this.schema.parse(t===void 0?this.schema.initial:t)}[R](){return this.#t}[nt](t){return this.#t=this.schema.parse(t),this.#t}get value(){return this[R]()}set value(t){this[nt](t)}toJSON(){return this[R]()}toString(){return String(this[R]())}valueOf(){return this[R]()}}class Zr extends ln{static{s(this,"BoolType")}constructor(t,n){super(t,n,zr)}off(){return this[nt](!1)}on(){return this[nt](!0)}toggle(){return this[nt](!this[R]())}}class Yr extends ln{static{s(this,"NumType")}constructor(t,n){super(t,n,Lr)}dec(t=1){return this.inc(-t)}inc(t=1){const{max:n=1/0,min:r=-1/0}=this.schema.describe;return this[nt](Math.min(n,Math.max(r,this[R]()+t)))}}class Xr extends ln{static{s(this,"StrType")}constructor(t,n){super(t,n,T)}clear(){return this[nt]("")}}for(const[e,t]of[[Zr,"Bool"],[Yr,"Num"],[Xr,"Str"]])Object.defineProperty(e,"name",{value:t});const un=["value","toJSON","toString","valueOf"],dn=s((e,t)=>!Object.is(e[R](),t),"changes"),Gi=N(Zr,{reads:un,writes:{off:s(e=>e[R]()!==!1,"off"),on:s(e=>e[R]()!==!0,"on"),toggle:!0,value:dn}}),Zi=N(Yr,{reads:un,writes:{dec:!0,inc:!0,value:dn}}),Yi=N(Xr,{reads:un,writes:{clear:s(e=>e[R]()!=="","clear"),value:dn}}),Xn={copyWithin:s(()=>!0,"copyWithin"),fill:s(()=>!0,"fill"),pop:s((e,t,n)=>n.length!==e,"pop"),push:s((e,t,n)=>n.length!==e,"push"),reverse:s(()=>!0,"reverse"),shift:s((e,t,n)=>n.length!==e,"shift"),sort:s(()=>!0,"sort"),splice:s((e,t,n,r)=>t.length>0||r.length>2,"splice"),unshift:s((e,t,n)=>n.length!==e,"unshift")},Xi=new Set(["copyWithin","fill","reverse","sort"]);function pn(e=[]){const t=[...e],n=new ot(0),r=new Map,i=s(()=>{n.value},"track"),o=s(()=>{n.value=Ct(()=>n.value)+1},"bump"),a=s(p=>(...d)=>(i(),p.apply(t,d)),"tracking"),c=s((p,d)=>(...f)=>{const h=t.length,m=d.apply(t,f);return Xn[p](h,m,t,f)&&o(),Xi.has(p)?u:m},"notifying"),l=s((p,d)=>(r.has(p)||r.set(p,Object.hasOwn(Xn,p)?c(p,d):a(d)),r.get(p)),"methodOf"),u=new Proxy(t,{get(p,d){if(d===Rt)return!0;const f=p[d];return typeof f=="function"&&d!=="constructor"&&f===Array.prototype[d]?l(d,f):(i(),f)},set(p,d,f){const h=!Object.is(p[d],f);return p[d]=f,h&&o(),!0},deleteProperty(p,d){const f=Object.hasOwn(p,d);return delete p[d],f&&o(),!0},has(p,d){return i(),d in p},ownKeys(p){return i(),Reflect.ownKeys(p)}});return u}s(pn,"$Array");Object.defineProperty(pn,Symbol.hasInstance,{value:s(e=>Array.isArray(e)&&e[Rt]===!0,"value")});I(Array,pn);const Qr=N(Map,{reads:["get","has","size","keys","values","entries","forEach",Symbol.iterator],writes:{clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete"),set:s((e,t,n)=>!e.has(t)||!Object.is(e.get(t),n),"set")}});I(Map,Qr);const Xt=Symbol("rat.record.get"),He=Symbol("rat.record.set"),Qi=new Set(["assign","schema","toJSON"]),to=s(e=>Object.fromEntries(Object.entries(e).map(([t,n])=>t.startsWith("?")?[t.slice(1),n.optional()]:[t,n])),"shapeOf");function ts(e){const t=to(e),n=Object.keys(t);return new x({describe:{fields:Object.fromEntries(n.map(r=>[r,t[r].describe]))},initial:Object.fromEntries(n.map(r=>[r,t[r].initial])),kind:"record",parts:t,run:s((r,i)=>{if(!Gt(r))return{issues:[{message:"expected a record",path:i}]};const o=[],a={};for(const c of n){const l=t[c].validate(r[c],[...i,c]);l.issues?o.push(...l.issues):l.value!==r[c]&&(a[c]=l.value)}return o.length?{issues:o}:{value:Object.keys(a).length?{...r,...a}:r}},"run")})}s(ts,"recordOf");class le{static{s(this,"RecordType")}#t;constructor(t,n={}){const r=t instanceof le,i=r?t.schema:t instanceof x?t:null;if(i&&i.kind!=="record")throw new TypeError("[rat] a Record needs fields or a Record schema");const o=r?t.toJSON():i?i.parse({...i.initial,...n}):t,a=Object.keys(i?i.parts:o);Object.defineProperty(this,"schema",{value:i}),this.#t=Object.fromEntries(a.map(c=>[c,o[c]]));for(const c of a){if(Qi.has(c))throw new TypeError(`[rat] ${c} can not be a Record field`);Object.defineProperty(this,c,{enumerable:!0,get:s(()=>this[Xt](c),"get"),set:s(l=>this[He](c,l),"set")})}Object.seal(this)}[Xt](t){return this.#t[t]}[He](t,n){this.#t[t]=this.schema?this.schema.parts[t].parse(n):n}assign(t){for(const n of Object.keys(t))this[n]=t[n];return this}toJSON(){return{...this.#t}}}Object.defineProperty(le,"name",{value:"Record"});const Nt=z(le,ts),es=z(N(Nt,{reads:[Xt,"toJSON"],writes:{[He]:(e,t,n)=>!Object.is(e[Xt](t),n),assign:!0}}),ts);I(Nt,es);const eo=s(e=>e instanceof x?e:Nt(e),"valueOf$1");function ns(e,t){const n=eo(t);return new x({describe:{key:e.describe,value:n.describe},initial:{},kind:"dict",parts:{key:e,value:n},run:s((r,i)=>{if(!(r instanceof Map)&&!Gt(r))return{issues:[{message:"expected a dict",path:i}]};const o=[],a=new Map;for(const[c,l]of r instanceof Map?r:Object.entries(r)){const u=e.validate(c,[...i,c]),p=n.validate(l,[...i,c]);u.issues&&o.push(...u.issues),p.issues&&o.push(...p.issues),!u.issues&&!p.issues&&a.set(u.value,p.value)}return o.length?{issues:o}:{value:a}},"run")})}s(ns,"dictOf");const Ee=new WeakMap;function no(e,t,n,r){Ee.has(e)||Ee.set(e,new Map);const i=Ee.get(e);return i.has(t)||i.set(t,(...o)=>{const a=n.apply(e,o);return a===e?r:a}),i.get(t)}s(no,"boundOf");const Pt=s((e,t)=>typeof t=="symbol"||t in e,"isMember"),Qn=s(e=>new TypeError(`[rat] ${String(e)} is a member of the Dict: an entry of that name goes through set() and delete()`),"member"),ro={deleteProperty(e,t){if(Pt(e,t))throw Qn(t);return e.delete(t)},has(e,t){return Pt(e,t)||e.has(t)},set(e,t,n){if(Pt(e,t))throw Qn(t);return e.set(t,n),!0},get(e,t,n){if(!Pt(e,t))return e.read(e.get(t));const r=Reflect.get(e,t,e);return typeof r=="function"&&t!=="constructor"?no(e,t,r,n):r}};class ue extends Map{static{s(this,"DictType")}constructor(t,n=[]){super();const r=t instanceof ue,i=r?t.schema:t;if(!(i instanceof x)||i.kind!=="dict")throw new TypeError("[rat] a Dict needs a Dict schema: new Dict(Dict(Key, Value))");Object.defineProperty(this,"schema",{value:i});for(const[o,a]of r?t:n instanceof Map?n:Object.entries(n))this.set(o,a);return new Proxy(this,ro)}read(t){return t}keyOf(t){const n=this.schema.parts.key.validate(t);return n.issues?void 0:n.value}set(t,n){return super.set(this.schema.parts.key.parse(t),this.schema.parts.value.parse(n))}get(t){const n=this.keyOf(t);return n===void 0?void 0:super.get(n)}has(t){const n=this.keyOf(t);return n!==void 0&&super.has(n)}delete(t){const n=this.keyOf(t);return n!==void 0&&super.delete(n)}toJSON(){return Object.fromEntries(this)}}Object.defineProperty(ue,"name",{value:"Dict"});const de=z(ue,ns),hn=z(N(de,{reads:["get","has","size","keys","values","entries","forEach","toJSON",Symbol.iterator],writes:{clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete"),set:!0}}),ns);I(de,hn);const fn=s((...e)=>new x({describe:{values:e},initial:e[0],kind:"enum",run:s((t,n)=>e.includes(t)?{value:t}:{issues:[{message:`one of ${e.map(String).join(", ")}`,path:n}]},"run")}),"enumOf");class pe{static{s(this,"EnumType")}#t;constructor(...t){const[n]=t,r=t.length===1&&n instanceof pe,i=r?n.schema:t.length===1&&n instanceof x?n:fn(...t);if(i.kind!=="enum"||!i.describe.values.length)throw new TypeError("[rat] an Enum needs values or an Enum schema");this.schema=i,this.values=Object.freeze([...i.describe.values]),this.#t=Math.max(0,this.values.indexOf(r?n.value:i.initial))}get value(){return this.values[this.#t]}set value(t){this.#t=this.values.indexOf(this.schema.parse(t))}cycle(t=1){const n=this.values.length;return this.#t=((this.#t+t)%n+n)%n,this.value}is(t){return this.value===t}toJSON(){return this.value}toString(){return String(this.value)}valueOf(){return this.value}}Object.defineProperty(pe,"name",{value:"Enum"});const rs=s((e,t,n)=>{const r=new e(t);return n!==void 0&&(r.value=n),r},"atValue"),he=z(pe,fn,rs),ss=z(N(he,{reads:["value","is","toJSON","toString","valueOf"],writes:{cycle:s(e=>e.values.length>1,"cycle"),value:s((e,t)=>!e.is(t),"value")}}),fn,rs);I(he,ss);const so=s(e=>/^[A-Z]/.test(e.name)&&typeof e.prototype=="object","isClass"),$t=s(e=>typeof e=="function","isFn$1"),io=s(e=>$t(e?.["~standard"]?.validate),"isSchema"),$=Symbol("rat.none"),tr=new Map([[BigInt,"bigint"],[Boolean,"boolean"],[Function,"function"],[Number,"number"],[Object,"object"],[String,"string"],[Symbol,"symbol"]]);class is{static{s(this,"Either")}constructor(t){this.tests=t}}class os{static{s(this,"Part")}constructor(t,n){this.name=t,this.test=n}}class as{static{s(this,"Pattern")}constructor(t,n){this.guard=n,this.test=t}}class cs{static{s(this,"Rest")}constructor(t){this.name=t}}const mn=Object.freeze({}),oo=s((...e)=>new is(e),"either"),ao=s((e,t=mn)=>new os(e,t),"part"),co=s((e,t=null)=>new as(e,t),"pattern$3"),lo=s((e=null)=>new cs(e),"rest");function q(e,t,n){if(t===mn)return e;if(t instanceof os){const r=q(e,t.test,n);return r!==$&&(n[t.name]=r),r}if(t instanceof is){for(const r of t.tests){const i={},o=q(e,r,i);if(o!==$)return Object.assign(n,i),o}return $}if(t instanceof as){const r={},i=q(e,t.test,r);return i===$||t.guard&&!t.guard(i,r)?$:(Object.assign(n,r),i)}if(io(t)){const r=t["~standard"].validate(e);if($t(r?.then))throw new TypeError("[rat] an async schema can not be a test");return r.issues?$:r.value}if(tr.has(t))return typeof e===tr.get(t)&&e!==null?e:$;if($t(t))return(so(t)?e instanceof t:t(e))?e:$;if(t instanceof RegExp)return typeof e=="string"&&t.test(e)?e:$;if(Array.isArray(t)){if(!Array.isArray(e))return $;const r=t.at(-1)instanceof cs?t.at(-1):null,i=r?t.length-1:t.length;if(r?e.length<i:e.length!==i)return $;for(let o=0;o<i;o++)if(q(e[o],t[o],n)===$)return $;return r?.name&&(n[r.name]=e.slice(i)),e}if(t!==null&&typeof t=="object"){if(e==null)return $;for(const r of Object.keys(t))if(q(e[r],t[r],n)===$)return $;return e}return Object.is(e,t)?e:$}s(q,"walk");const uo=s((e,t)=>q(e,t,{}),"pass"),ls=s((e,t)=>q(e,t,{})!==$,"is");function po(e,t){for(let n=0;n<t.length;n++){const r={};if(q(e,t[n],r)!==$)return{index:n,parts:r}}return{index:-1,parts:null}}s(po,"which");function ho(e,t,n){for(const[r,i]of t){const o={},a=q(e,r,o);if(a!==$)return $t(i)?i(a,o):i}return $t(n)?n(e):n}s(ho,"match");const at=s(e=>Array.isArray(e)?e:[...e],"arrayOf"),gn=s(e=>typeof e=="function"?e:t=>t?.[e],"getterOf"),fo=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),mo=s((e,t)=>typeof e=="string"&&typeof t=="string"?fo.compare(e,t):e<t?-1:e>t?1:0,"compare");function Et(...e){const t=[];for(const n of e){if(n==="asc"||n==="desc"){t.length&&(t.at(-1).sign=n==="desc"?-1:1);continue}t.push({get:gn(n),sign:1})}return(n,r)=>{for(const{get:i,sign:o}of t){const a=i(n),c=i(r);if(a==null||c==null){if(a==null&&c==null)continue;return a==null?1:-1}const l=mo(a,c);if(l)return o*l}return 0}}s(Et,"by");const fe=s(e=>t=>ls(t,e),"tester"),us=s(e=>t=>at(t).filter(fe(e)),"where"),Je=s(e=>{const t=fe(e);return n=>at(n).filter(r=>!t(r))},"without"),ds=s(e=>t=>at(t).find(fe(e)),"one"),ps=s(e=>t=>at(t).some(fe(e)),"has"),hs=s(e=>t=>at(t).map(gn(e)),"pluck"),fs=s(e=>{const t=gn(e);return n=>Object.fromEntries(at(n).map(r=>[t(r),r]))},"keyBy"),go=s((...e)=>t=>t.sort(Et(...e)),"sortBy"),bo=s((...e)=>t=>at(t).toSorted(Et(...e)),"toSortedBy");class _{static{s(this,"ListType")}#t;constructor(t=[]){this.#t=[...t]}static from(t){return new this(t)}static of(...t){return new this(t)}get length(){return this.#t.length}at(t){return this.#t.at(t)}includes(t){return this.#t.includes(t)}indexOf(t){return this.#t.indexOf(t)}every(t){return this.#t.every(t)}filter(t){return new _(this.#t.filter(t))}find(t){return this.#t.find(t)}findIndex(t){return this.#t.findIndex(t)}flatMap(t){return new _(this.#t.flatMap(t))}forEach(t){this.#t.forEach(t)}join(t){return this.#t.join(t)}map(t){return new _(this.#t.map(t))}reduce(...t){return this.#t.reduce(...t)}slice(t,n){return new _(this.#t.slice(t,n))}some(t){return this.#t.some(t)}toArray(){return[...this.#t]}toJSON(){return this.toArray()}has(t){return ps(t)(this.#t)}keyBy(t){return fs(t)(this.#t)}one(t){return ds(t)(this.#t)}pluck(t){return new _(hs(t)(this.#t))}where(t){return new _(us(t)(this.#t))}without(t){return new _(Je(t)(this.#t))}toReversed(){return new _(this.#t.toReversed())}toSorted(t){return new _(this.#t.toSorted(t))}toSortedBy(...t){return new _(this.#t.toSorted(Et(...t)))}toSpliced(...t){return new _(this.#t.toSpliced(...t))}with(t,n){return new _(this.#t.with(t,n))}[Symbol.iterator](){return this.#t[Symbol.iterator]()}push(...t){return this.#t.push(...t)}pop(){return this.#t.pop()}shift(){return this.#t.shift()}unshift(...t){return this.#t.unshift(...t)}splice(...t){return this.#t.splice(...t)}sort(t){return this.#t.sort(t),this}sortBy(...t){return this.#t.sort(Et(...t)),this}reverse(){return this.#t.reverse(),this}set(t,n){return this.#t[t<0?this.#t.length+t:t]=n,this}remove(t){const n=this.#t.indexOf(t);return n>-1&&this.#t.splice(n,1),n>-1}replace(t){return this.#t=[...t],this}drop(t){const n=Je(t)(this.#t),r=this.#t.length-n.length;return this.#t=n,r}toggle(t,n=t){return this.drop(n)?!1:(this.push(t),!0)}clear(){return this.#t.length=0,this}}Object.defineProperty(_,"name",{value:"List"});class yo extends x{static{s(this,"ListSchema")}min(t){return this.check(n=>n.length>=t,`at least ${t} items`,{min:t})}max(t){return this.check(n=>n.length<=t,`at most ${t} items`,{max:t})}}const ms=s(e=>new yo({describe:{item:e.describe},initial:[],kind:"list",run:s((t,n)=>{const r=t instanceof _;if(!r&&!Array.isArray(t))return{issues:[{message:"expected a list",path:n}]};const i=r?t.toArray():t,o=[],a=i.map((c,l)=>{const u=e.validate(c,[...n,l]);return u.issues&&o.push(...u.issues),u.value});return o.length?{issues:o}:a.some((c,l)=>c!==i[l])?{value:r?new t.constructor(a):a}:{value:t}},"run")}),"listOf$1"),gs=["length","at","includes","indexOf","every","filter","find","findIndex","flatMap","forEach","join","map","reduce","slice","some","toArray","toJSON",Symbol.iterator,"has","keyBy","one","pluck","where","without","toReversed","toSorted","toSortedBy","toSpliced","with"],bs={clear:s(e=>e.length>0,"clear"),drop:s((e,t)=>e.has(t),"drop"),pop:s(e=>e.length>0,"pop"),push:s((e,...t)=>t.length>0,"push"),remove:s((e,t)=>e.includes(t),"remove"),replace:!0,reverse:s(e=>e.length>1,"reverse"),set:s((e,t,n)=>!Object.is(e.at(t),n),"set"),shift:s(e=>e.length>0,"shift"),sort:s(e=>e.length>1,"sort"),sortBy:s(e=>e.length>1,"sortBy"),splice:!0,toggle:!0,unshift:s((e,...t)=>t.length>0,"unshift")},ys=s((e,t,n=[])=>new e(t.parse(n)),"ofItems"),me=z(_,ms,ys),vs=z(N(me,{reads:gs,writes:bs}),ms,ys);I(me,vs);const vo=s(e=>e instanceof x?e:Nt(e),"rowOf");function bn(e){const t=vo(e);if(t.kind!=="record")throw new TypeError("[rat] a Table needs fields or a Record schema");return new x({describe:{row:t.describe},initial:[],kind:"table",parts:{row:t},run:s((n,r)=>{const i=n instanceof jt;if(!i&&!Array.isArray(n))return{issues:[{message:"expected a table",path:r}]};const o=i?n.toArray():n,a=[];return o.forEach((c,l)=>{const u=t.validate({...t.initial,...c},[...r,l]);u.issues&&a.push(...u.issues)}),a.length?{issues:a}:{value:n}},"run")})}s(bn,"tableOf");class jt extends me{static{s(this,"TableType")}constructor(t,n=[]){const r=t instanceof jt,i=r?t.schema:t instanceof x&&t.kind==="table"?t:t instanceof x?bn(t):null;if(!i)throw new TypeError("[rat] a Table needs a Table schema or a Record schema");const o=i.parts.row,a=Object.keys(o.parts),c=s(l=>{const u=o.parse({...o.initial,...l});return Object.freeze(Object.fromEntries(a.map(p=>[p,u[p]])))},"parse");super((r?t.toArray():n).map(c)),Object.defineProperty(this,"schema",{value:i}),Object.defineProperty(this,"parse",{value:c})}get columns(){return Object.keys(this.schema.parts.row.parts)}column(t){return this.map(n=>n[t])}push(...t){return super.push(...t.map(this.parse))}unshift(...t){return super.unshift(...t.map(this.parse))}set(t,n){return super.set(t,this.parse(n))}replace(t){return super.replace([...t].map(this.parse))}update(t,n){return super.set(t,this.parse({...this.at(t),...n}))}splice(t,n,...r){return arguments.length<2?super.splice(t):super.splice(t,n,...r.map(this.parse))}toJSON(){return this.toArray()}}Object.defineProperty(jt,"name",{value:"Table"});const yn=z(jt,bn),ws=z(N(yn,{reads:[...gs,"column","columns"],writes:{...bs,update:!0}}),bn);I(yn,ws);const ks=N(Set,{reads:["has","size","keys","values","entries","forEach",Symbol.iterator],writes:{add:s((e,t)=>!e.has(t),"add"),clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete")}});I(Set,ks);const wo=s((...e)=>new x({describe:{items:e.map(t=>t.describe)},initial:e.map(t=>t.initial),kind:"tuple",parts:e,run:s((t,n)=>{const r=t instanceof ht;if(!r&&!Array.isArray(t))return{issues:[{message:"expected a tuple",path:n}]};if(t.length!==e.length)return{issues:[{message:`expected ${e.length} items`,path:n}]};const i=[],o=e.map((a,c)=>{const l=a.validate(t[c],[...n,c]);return l.issues&&i.push(...l.issues),l.value});return i.length?{issues:i}:o.some((a,c)=>a!==t[c])?{value:r?new ht(...o):o}:{value:t}},"run")}),"tupleOf");class ht{static{s(this,"TupleType")}constructor(...t){t.forEach((n,r)=>{this[r]=n}),Object.defineProperty(this,"length",{value:t.length}),Object.freeze(this)}static from(t){return new this(...t)}at(t){return this[t<0?this.length+t:t]}equals(t){if(!(t instanceof ht)||t.length!==this.length)return!1;for(let n=0;n<this.length;n++)if(!Object.is(this[n],t[n]))return!1;return!0}with(t,n){const r=[...this];return r[t<0?this.length+t:t]=n,new this.constructor(...r)}toArray(){return[...this]}toJSON(){return this.toArray()}*[Symbol.iterator](){for(let t=0;t<this.length;t++)yield this[t]}}Object.defineProperty(ht,"name",{value:"Tuple"});const ko=z(ht,wo,(e,t,n=t.initial)=>new e(...t.parse(n)));class xo extends x{static{s(this,"UnionSchema")}which(t){for(const[n,r]of this.parts)if(r.is(t))return n;return null}}function So(...e){const t=e.length===1&&!Cr(e[0]),n=t?Object.entries(e[0]):e.map((r,i)=>[i,r]);if(!n.length)throw new TypeError("[rat] a Union needs at least one case");return new xo({describe:{cases:n.map(([r,i])=>({name:r,...i.describe}))},initial:n[0][1].initial,kind:"union",parts:n,run:s((r,i)=>{for(const[,o]of n){const a=o.validate(r,i);if(!a.issues)return a}return{issues:[{message:`none of ${n.map(([o,a])=>t?o:a.kind).join(", ")}`,path:i}]}},"run")})}s(So,"Union");const j=s((e,t,n)=>Math.min(n,Math.max(t,e)),"clamp"),xs=s(e=>(e%360+360)%360,"turn");function vn(e,t,n){t/=100,n/=100;const r=s(a=>(a+xs(e)/30)%12,"k"),i=t*Math.min(n,1-n),o=s(a=>(n-i*Math.max(-1,Math.min(r(a)-3,9-r(a),1)))*255,"f");return[o(0),o(8),o(4)]}s(vn,"hslToRgb");function Oo(e,t,n){e/=255,t/=255,n/=255;const r=Math.max(e,t,n),i=Math.min(e,t,n),o=(r+i)/2,a=r-i;if(!a)return[0,0,o*100];const c=r===e?(t-n)/a%6:r===t?(n-e)/a+2:(e-t)/a+4;return[xs(c*60),a/(1-Math.abs(2*o-1))*100,o*100]}s(Oo,"rgbToHsl");const $o=/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,Eo=/^(rgba?|hsla?)\((.*)\)$/i,Ao=s(e=>e.endsWith("%")?parseFloat(e)*2.55:parseFloat(e),"channel"),er=s(e=>e===void 0?1:e.endsWith("%")?parseFloat(e)/100:parseFloat(e),"alpha");function _o(e){e=e.trim();const t=$o.exec(e)?.[1];if(t){const o=t.length<5?[...t].map(p=>p+p).join(""):t,[a,c,l,u=255]=o.match(/../g).map(p=>parseInt(p,16));return[a,c,l,u/255]}const[,n,r]=Eo.exec(e)??[];if(!n)return null;const i=r.trim().split(/[\s,/]+/).filter(Boolean);return i.length<3||i.length>4?null:n[0].toLowerCase()==="r"?[...i.slice(0,3).map(Ao),er(i[3])]:[...vn(parseFloat(i[0]),parseFloat(i[1]),parseFloat(i[2])),er(i[3])]}s(_o,"fromString");function Ft(e){let t=null;return e instanceof wn?t=e.toArray():typeof e=="string"?t=_o(e):Array.isArray(e)?t=[e[0],e[1],e[2],e[3]??1]:Gt(e)&&"r"in e?t=[e.r,e.g,e.b,e.a??1]:Gt(e)&&"h"in e&&(t=[...vn(e.h,e.s,e.l),e.a??1]),t?.every(Number.isFinite)?t:null}s(Ft,"rgba");const Ss=s((...e)=>{if(e.length)throw new TypeError("[rat] Color() is the schema and takes nothing, a color is new Color(…)");return new x({initial:"#000000",kind:"color",run:s((t,n)=>Ft(t)?{value:t}:{issues:[{message:"expected a color",path:n}]},"run")})},"colorOf$1");class wn{static{s(this,"ColorType")}#t;#e;#r;#n;constructor(t="#000000"){this.set(t)}set(t){const n=Ft(t);if(!n)throw new TypeError(`[rat] not a color: ${t}`);return[this.#t,this.#e,this.#r,this.#n]=[j(n[0],0,255),j(n[1],0,255),j(n[2],0,255),j(n[3],0,1)],this}get r(){return Math.round(this.#t)}get g(){return Math.round(this.#e)}get b(){return Math.round(this.#r)}get a(){return Math.round(this.#n*1e3)/1e3}set r(t){this.#t=j(t,0,255)}set g(t){this.#e=j(t,0,255)}set b(t){this.#r=j(t,0,255)}set a(t){this.#n=j(t,0,1)}get h(){return Math.round(this.toHsl()[0])}get s(){return Math.round(this.toHsl()[1])}get l(){return Math.round(this.toHsl()[2])}set h(t){const[,n,r]=this.toHsl();this.#s(t,n,r)}set s(t){const[n,,r]=this.toHsl();this.#s(n,j(t,0,100),r)}set l(t){const[n,r]=this.toHsl();this.#s(n,r,j(t,0,100))}#s(t,n,r){[this.#t,this.#e,this.#r]=vn(t,n,r)}get hex(){return"#"+[this.#t,this.#e,this.#r,...this.#n<1?[this.#n*255]:[]].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}set hex(t){this.set(t)}mix(t,n=.5){const r=Ft(t);if(!r)throw new TypeError(`[rat] not a color: ${t}`);return new this.constructor(this.toArray().map((i,o)=>i+(r[o]-i)*n))}equals(t){const n=Ft(t);return!!n&&this.toArray().every((r,i)=>Math.abs(r-n[i])<1e-6)}toArray(){return[this.#t,this.#e,this.#r,this.#n]}toHsl(){return[...Oo(this.#t,this.#e,this.#r),this.#n]}toJSON(){return this.hex}toString(){return this.hex}}Object.defineProperty(wn,"name",{value:"Color"});const W=s(e=>(t,n)=>!Object.is(t[e],n),"differs"),Os=s((e,t,n=t.initial)=>new e(t.parse(n)),"ofValue"),kn=z(wn,Ss,Os),$s=z(N(kn,{reads:["r","g","b","a","h","s","l","hex","equals","mix","toArray","toHsl","toJSON","toString"],writes:{a:W("a"),b:W("b"),g:W("g"),h:W("h"),hex:W("hex"),l:W("l"),r:W("r"),s:W("s"),set:s((e,t)=>!e.equals(t),"set")}}),Ss,Os);I(kn,$s);const To=s(e=>typeof e=="string"&&e!==""||Number.isInteger(e),"isKey"),Es=s((e,t)=>n=>To(n)?{value:n}:{issues:[{message:e,path:t}]},"key");class zo extends x{static{s(this,"IdSchema")}get counter(){return this.derive({describe:{counter:!0}})}make(t=[]){return this.describe.counter?t.reduce((n,r)=>Number.isInteger(r)&&r>n?r:n,0)+1:crypto.randomUUID()}}const As=new zo({initial:null,kind:"id",nullable:!0,run:s((e,t)=>Es("a key",t)(e),"run")}),Lo=s(e=>new x({describe:{table:e},initial:null,kind:"ref",run:s((t,n)=>Es(`a key of ${e}`,n)(t),"run")}),"Ref"),Co=Object.freeze(Object.defineProperty({__proto__:null,$Array:pn,$Bool:Gi,$Color:$s,$Dict:hn,$Enum:ss,$List:vs,$Map:Qr,$Num:Zi,$Record:es,$Set:ks,$Str:Yi,$Table:ws,Bool:zr,CamelCase:Ti,Color:kn,ConstantCase:zi,Dict:de,Enum:he,Fn:Nr,Id:As,KebabCase:Rr,List:me,LowerCase:Li,MockingCase:Ci,NONE:$,Num:Lr,PascalCase:Ri,Record:Nt,Ref:Lo,Schema:x,SnakeCase:Ni,Str:T,Table:yn,TitleCase:ji,Tuple:ko,Union:So,UpperCase:Pi,any:mn,by:Et,either:oo,has:ps,is:ls,isSchema:Cr,keyBy:fs,match:ho,one:ds,part:ao,pass:uo,pattern:co,pluck:hs,rest:lo,sortBy:go,toSortedBy:bo,where:us,which:po,without:Je},Symbol.toStringTag,{value:"Module"})),_s="https://code.pulgasari.dev/gestalt/packages/css",Ro=["compact","normal","comfortable","touch"],No=["sharp","soft","round","pill"],jo=["landing","mobile-basic","three-panels"],Po=["flat","rounded"],Do=["auto","dark","light"],Io=["andromeda","monochrome"],Mo=["layout"],Ht={density:"density",geometry:"geometry",mode:"scheme",palette:"palette",skin:"skin"},xn={look:"looks"},Qt={},Vo=s(async e=>(await g(async()=>{const{setSkin:t}=await import("./index-D_xAKS-Y.js");return{setSkin:t}},__vite__mapDeps([0,1,2,3]),import.meta.url)).setSkin(e||null),"setSkin"),nr=s(e=>g(()=>import(`@domina/verbs/${e}.js`),[],import.meta.url).then(t=>t[e]??t.default),"domina"),Bo=s(e=>getComputedStyle(document.documentElement).getPropertyValue(`--${e}`).trim()||null,"readToken"),qo=s(e=>new RegExp(`style\\(\\s*--${e}\\s*:\\s*([\\w-]+)\\s*\\)`),"presetPattern");function Uo(e,t){const n=document.documentElement,r=e.replace(/-(\w)/g,(i,o)=>o.toUpperCase());if(t==null||t===!1){n.style.removeProperty(`--${e}`),delete n.dataset[r];return}n.style.setProperty(`--${e}`,t),n.dataset[r]=t}s(Uo,"setToken");async function Fo(e,t){const n=`gestalt:${e}`;return t?(await nr("adoptStyleSheet"))(`${_s}/${xn[e]}/${t}.css`,{key:n,replace:!0}):(await nr("releaseStyleSheet"))(n)}s(Fo,"setSheet");function Ts(e,t,n=[]){for(const r of e){const i=r instanceof CSSContainerRule&&r.conditionText.match(t);i?n.push(i[1]):(r.cssRules??r.styleSheet?.cssRules)&&Ts(r.cssRules??r.styleSheet.cssRules,t,n)}return n}s(Ts,"presetsOf");async function Ho(e){try{return(await import(e,{with:{type:"css"}})).default}catch{const t=await fetch(e);if(!t.ok)throw new Error(`[@gestalt/core] ${t.status} ${t.statusText} - ${e}`);return new CSSStyleSheet().replace(await t.text())}}s(Ho,"loadSheet");const Dt=new Map;function Jo(e,t){return Dt.has(t)||Dt.set(t,Ho(`${_s}/${e}`).then(n=>[...new Set(Ts(n.cssRules,qo(t)))]).catch(n=>{throw Dt.delete(t),n})),Dt.get(t)}s(Jo,"presetNames");const Wo=s(()=>Jo("palettes.css","palette"),"palettes");async function Ko(e={}){const t=document.querySelector("rat-app, app-root")??document.querySelector("#app");for(const n of Mo)!t||!(n in e)||(e[n]===!1||e[n]==null?delete t.dataset[n]:t.dataset[n]=e[n]);for(const[n,r]of Object.entries(Ht))n in e&&Uo(r,e[n]);return await Promise.all([...Object.keys(xn).filter(n=>n in e).map(n=>Fo(n,e[n])),"skin"in e&&Vo(e.skin)]),Object.assign(Qt,e),{...Qt}}s(Ko,"set");const Go=s(e=>{const t=s(n=>n in Ht?Qt[n]??Bo(Ht[n]):Qt[n]??null,"read");return e?t(e):Object.fromEntries([...Object.keys(Ht),...Object.keys(xn)].map(n=>[n,t(n)]))},"get"),Zo=s((e=document.body)=>{const t=getComputedStyle(e);return Object.fromEntries(["bg","fg","ink"].map(n=>[n,t.getPropertyValue(`--color-${n}`).trim()]))},"colors"),Yo={colors:Zo,get:Go,palettes:Wo,set:Ko,densities:Ro,geometries:No,layouts:jo,looks:Po,modes:Do,skins:Io},zs={...Co};globalThis.RAT=zs;const Ls=s(e=>t=>typeof t===e,"isTypeOf"),Jt=Ls("function"),Xo=Ls("string"),We="rat:command",rr={false:!1,null:null,true:!0},Qo=s(e=>e in rr?rr[e]:/^-?\d+(\.\d+)?$/.test(e)?Number(e):e,"argumentOf"),Ae=new Map;function Cs(e){if(!Ae.has(e)){const[,t=e,n=""]=/^([^[\]]+)\[(.*)\]$/.exec(String(e).trim())??[];Ae.set(e,{args:n.trim()?n.split(",").map(r=>Qo(r.trim())):[],name:t.trim()})}return Ae.get(e)}s(Cs,"parseCommand");function ta(e,t,n=null,r=[]){const{args:i,name:o}=Cs(t),a=o.includes(":")?o:We;return e.dispatchEvent(new CustomEvent(a,{bubbles:!0,cancelable:!0,composed:!0,detail:{args:[...i,...r],event:n,name:o}}))}s(ta,"command");const Iu=s(e=>t=>ta(t.currentTarget,e,t),"commandListener"),Ke="rat:error";function ft(e,t){const n=new CustomEvent(Ke,{bubbles:!0,cancelable:!0,composed:!0,detail:{boundary:null,error:t}});return(!e?.isConnected||e.dispatchEvent(n))&&(globalThis.reportError??console.error)(t),n.detail.boundary}s(ft,"raise");const sr=s((e,t=null)=>function(...n){try{const r=e.apply(this,n);return Jt(r?.catch)&&r.catch(i=>ft(t??this,i)),r}catch(r){ft(t??this,r)}},"guard"),ir={effect:s(e=>cn(e,null),"effect"),scope:s(e=>Fe(e,null),"scope")};function ea(e,t,n){const r=n?{...ir,...n}:ir;return yi(e,t,r)}s(ea,"render");function Sn(e,t,n={}){const r=Xo(t)?document.querySelector(t):t,i={effect:s(a=>cn(sr(a,r),null),"effect"),scope:s(a=>Fe(sr(a,r),null),"scope")},[,o]=Fe(()=>ea(r,e(n),i),null);return()=>{bi(r),o()}}s(Sn,"mount");function Mu(e,t,n){if(!Jt(e))throw new TypeError(`[rat] @ needs a function, got ${typeof e}`);return r=>{let i=null,o=null;Ui(()=>o?.()),cn(()=>{const a=t?.();Ct(()=>{if(i&&Jt(i.update)){i.update(a);return}o?.(),i=e(r,a,n)??null,o=Jt(i)?i:i?.destroy?()=>i.destroy():null})})}}s(Mu,"use");const or=new Map;function Vu(e,t){if(or.has(e))return;const n=new CSSStyleSheet;n.replaceSync(t),or.set(e,n),document.adoptedStyleSheets=[...document.adoptedStyleSheets,n]}s(Vu,"style");const na={"?description":T,exec:Nr,"?title":T},ra=de(T.to(Rr),na);class sa extends hn{static{s(this,"Commands")}constructor(t={}){super(ra,t)}read(t){return t?.exec}set(t,n){return super.set(t,typeof n=="function"?{exec:n}:n)}assign(t){for(const[n,r]of Object.entries(t))this.set(n,r);return this}run(t,...n){const{args:r,name:i}=Cs(t);return this.get(i)?.exec(...r,...n)}listen(t=document){const n=s(r=>{const{args:i=[],event:o,name:a}=r.detail??{},c=this.get(a);if(!c)return;r.stopPropagation();const l=r.composedPath()[0];try{c.exec(...i,o)?.catch?.(u=>ft(l,u))}catch(u){ft(l,u)}},"handle");return t.addEventListener(We,n),()=>t.removeEventListener(We,n)}}const ia=s((e,t)=>typeof e=="string"?ca[e]?.(t)??null:e,"modeOf"),On=s(e=>Object.fromEntries(new URLSearchParams(e)),"queryOf"),ge=s(e=>String(e??"").split("/").filter(Boolean),"segmentsOf"),oa=s((...e)=>"/"+e.flatMap(ge).join("/"),"join"),aa=s((e,t)=>JSON.stringify(e)===JSON.stringify(t),"sameQuery"),ca={hash:ua,memory:ha,path:da,query:pa},_e=new Map,be=s(e=>{const t=e.indexOf("?");return t<0?{path:e||"/",query:{}}:{path:e.slice(0,t)||"/",query:On(e.slice(t+1))}},"split$1"),la=s((e,t)=>{for(const n of e)addEventListener(n,t);return()=>{for(const n of e)removeEventListener(n,t)}},"onWindow");function $n(){let e=history.state?.ratIndex??0;return history.state?.ratIndex===void 0&&history.replaceState({...history.state,ratIndex:e},""),{listen:s(t=>la(["popstate"],t),"listen"),moved:s(()=>{e=history.state?.ratIndex??e},"moved"),push:s((t,n)=>n?history.replaceState({ratIndex:e},"",t):history.pushState({ratIndex:++e},"",t),"push"),undo:s(()=>{const t=(history.state?.ratIndex??e)-e;return t&&history.go(-t),t!==0},"undo")}}s($n,"historyOf");function ua(){const e=$n();return{...e,read:s(()=>be(decodeURI(location.hash.slice(1))),"read"),write:s((t,{replace:n}={})=>e.push(`#${t}`,n),"write")}}s(ua,"hash");function da({base:e=""}={}){const t=$n(),n=e.replace(/\/$/,"");return{...t,base:n,read:s(()=>({path:decodeURI(location.pathname.startsWith(n)?location.pathname.slice(n.length):location.pathname)||"/",query:On(location.search)}),"read"),write:s((r,{replace:i}={})=>t.push(n+r,i),"write")}}s(da,"path");function pa({key:e="route"}={}){const t=$n();return{...t,read:s(()=>{const{[e]:n="/",...r}=On(location.search);return{path:n,query:r}},"read"),write:s((n,{replace:r}={})=>{const{path:i,query:o}=be(n),a=new URLSearchParams({[e]:i,...o});t.push(`${location.pathname}?${a}${location.hash}`,r)},"write")}}s(pa,"query");function ha({initial:e="/"}={}){const t=[e],n=new Set;return{back:s(()=>{if(t.length>1){t.pop();for(const r of n)r()}},"back"),listen:s(r=>(n.add(r),()=>n.delete(r)),"listen"),read:s(()=>be(t.at(-1)),"read"),write:s((r,{replace:i}={})=>{i?t[t.length-1]=r:t.push(r)},"write")}}s(ha,"memory");function Rs(e){return _e.has(e)||_e.set(e,ge(e).map(t=>t==="*"?{kind:"rest"}:t.startsWith(":")?{kind:"param",name:t.slice(1).replace(/\?$/,""),optional:t.endsWith("?")}:{kind:"literal",value:decodeURIComponent(t)})),_e.get(e)}s(Rs,"compile");function kt(e,t,{exact:n=!1}={}){const r=Rs(e),i=ge(t),o={};let a=0;for(const l of r){if(l.kind==="rest")return o["*"]=i.slice(a).map(decodeURIComponent).join("/"),{params:o,rest:""};const u=i[a];if(l.kind==="literal"){if(u===void 0||decodeURIComponent(u)!==l.value)return null;a++}else if(u===void 0){if(!l.optional)return null}else o[l.name]=decodeURIComponent(u),a++}const c=a<i.length?"/"+i.slice(a).join("/"):"";return n&&c?null:{params:o,rest:c}}s(kt,"matchRoute");const fa=s((e,t={})=>"/"+Rs(e).map(n=>n.kind==="literal"?encodeURIComponent(n.value):n.kind==="rest"?t["*"]??"":t[n.name]==null?"":encodeURIComponent(t[n.name])).filter(Boolean).join("/"),"fill$1"),Te=s((e,t)=>{const n=new URLSearchParams(t).toString();return n?`${e}?${n}`:e},"toFull");function ma({base:e="",initial:t="/",key:n="route",mode:r="hash",resolve:i=null,root:o=null}={}){const a=ia(r==="none"?"memory":r,{base:e,initial:t,key:n});if(!a)throw new TypeError(`[rat] router: no mode "${r}"`);const c={change:new Set,leave:new Set},l=new Set,u=new Set,p=ut("/"),d={params:{},path:"/",query:{}};let f=0,h=null;const m=s((y,w)=>{for(const S of c[y])S(w)},"emit");function v({path:y,query:w}){Object.assign(d,{path:y,query:w}),p.value=y;for(const{fn:S,pattern:A}of l){const Z=kt(A,y,{exact:!0});Z&&S(Z.params,M)}m("change",{path:y,query:w,router:M})}s(v,"apply");async function k(y){const w={defaultPrevented:!1,from:d.path,to:y,preventDefault(){this.defaultPrevented=!0}};for(const S of c.leave)await S(w);return!w.defaultPrevented}s(k,"guarded");function J(y,w={}){if(h?.full===y)return h.promise;const S=Se(y,w).finally(()=>{h?.promise===S&&(h=null)});return h={full:y,promise:S},S}s(J,"navigate");async function Se(y,{outside:w=!1,replace:S=!1}={}){const A=be(y);if(A.path===d.path&&aa(A.query,d.query))return!0;const Z=++f,Oe=c.leave.size===0||await k(A.path);return Z!==f?!1:Oe?(w?a.moved?.():a.write(Te(A.path,A.query),{replace:S}),v(A),!0):(w&&!a.undo?.()&&a.write(Te(d.path,d.query),{replace:!0}),!1)}s(Se,"run");const mi=s(y=>String(y).startsWith("/")?String(y):i?.(String(y))??`/${y}`,"pathOf");function Fn(y){if(y.defaultPrevented||y.button!==0||y.altKey||y.ctrlKey||y.metaKey||y.shiftKey)return;const w=y.composedPath().find(A=>A.localName==="a"&&A.href);if(!w||w.target&&w.target!=="_self"||w.hasAttribute("download")||w.hasAttribute("data-native"))return;const S=new URL(w.href);S.origin!==location.origin||!S.pathname.startsWith(a.base??"")||(y.preventDefault(),J(S.pathname.slice((a.base??"").length)+S.search))}s(Fn,"onClick");const M={$path:p,mode:r,get params(){return d.params},get path(){return d.path},get query(){return d.query},set params(y){d.params=y??{}},back(){return a.back?a.back():history.back()},go(y,w){return J(mi(y),w)},match(y,w){const S={fn:w,pattern:y};l.add(S);const A=kt(y,d.path,{exact:!0});return A&&w(A.params,M),()=>l.delete(S)},on(y,w,{unload:S=!1}={}){c[y].add(w);let A=s(()=>c[y].delete(w),"off");if(y==="leave"&&S){const Z=s(Hn=>{const Jn={defaultPrevented:!1,from:d.path,to:null,unload:!0,preventDefault(){this.defaultPrevented=!0}};w(Jn),Jn.defaultPrevented&&(Hn.preventDefault(),Hn.returnValue="")},"ask");addEventListener("beforeunload",Z);const Oe=A;A=s(()=>{Oe(),removeEventListener("beforeunload",Z)},"off")}return A},bind(y){return y.set("go",(w,S)=>typeof w=="string"?M.go(w):void 0),y.set("back",()=>M.back()),M},start(){if(u.add(a.listen(()=>J(Te(a.read().path,a.read().query),{outside:!0}))),r==="path"){const y=o??document;y.addEventListener("click",Fn),u.add(()=>y.removeEventListener("click",Fn))}return v(a.read()),M},stop(){for(const y of u)y();return u.clear(),M}};return M}s(ma,"createRouter");const ar=s((e,t,n)=>{const r=Object.assign(document.createElement(e),{textContent:n});return r.setAttribute("part",t),r},"create");function En(e,t,n=null){console.error(t),e.toggleAttribute("error",!0);const r=[ar("pre","error",t?.message??String(t))];if(n){const i=ar("button","retry","retry");i.type="button",i.addEventListener("click",n),r.push(i)}e.replaceChildren(...r)}s(En,"showError");function An(e,t){const n=s(r=>{r.defaultPrevented||(r.preventDefault(),r.detail.boundary=e,t(r.detail.error))},"take");return e.addEventListener(Ke,n),()=>e.removeEventListener(Ke,n)}s(An,"catchErrors");const ga=/\.html?$/,ba=/\.htx$/,ya=/\.rat(\.js|\.html)?$/,va=/^(\.{1,2}\/|\/)/,wa=import.meta.url,It=new Map,ka="rat:compiled",xa=6,Sa=[".rat.html",".rat",".rat.js"];let te=[];const Wt=new Map;function Oa(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0).toString(36)}s(Oa,"hashOf");async function _n(e){const{parse:t}=await g(async()=>{const{parse:i}=await import("https://esm.sh/acorn@8.14.0");return{parse:i}},[],import.meta.url),n=[],r=s(i=>{if(!(!i||!Kt(i.type))){/^(Import|ExportNamed|ExportAll)Declaration$/.test(i.type)&&i.source&&n.push({dynamic:!1,end:i.source.end,start:i.source.start,value:i.source.value}),i.type==="ImportExpression"&&i.source.type==="Literal"&&typeof i.source.value=="string"&&n.push({dynamic:!0,end:i.end,start:i.start,value:i.source.value}),i.type==="MemberExpression"&&i.object.type==="MetaProperty"&&i.object.meta.name==="import"&&i.property.name==="url"&&n.push({end:i.end,meta:!0,start:i.start});for(const o in i){const a=i[o];tn(a)?a.forEach(r):a&&Kt(a.type)&&r(a)}}},"visit");return r(t(e,{ecmaVersion:"latest",sourceType:"module"})),n}s(_n,"specifiers");const Ns=s(e=>{const t=new URL(e).pathname;return ya.test(t)?"rat":ba.test(t)?"htx":ga.test(t)?"html":null},"kindOf"),$a=s(e=>va.test(e)||/^[a-z][\w+.-]*:/i.test(e),"isUrl");function Ea({dynamic:e,meta:t,value:n},r,i){if(t)return JSON.stringify(r);const o=new URL(n,r).href;return Ns(o)?e?`import(${JSON.stringify(wa)}).then(app => app.load(${JSON.stringify(o)}))`:Tn(o,i).then(a=>JSON.stringify(a)):e?`import(${JSON.stringify(o)})`:JSON.stringify(o)}s(Ea,"replacement");async function js({code:e,found:t},n,r){const i=t.filter(({meta:a,value:c})=>a||$a(c)).sort((a,c)=>a.start-c.start),o=await Promise.all(i.map(a=>Ea(a,n,r)));for(let a=i.length-1;a>=0;a--){const{end:c,start:l}=i[a];e=e.slice(0,l)+o[a]+e.slice(c)}return e}s(js,"rewrite");function Aa(e,t){const n=s(i=>new URL(i.endsWith("/")?i:`${i}/`,t).href,"dir");te=e===!0?[{dir:new URL("./",t).href,names:null}]:[e].flat().flatMap(i=>Kt(i)?[{dir:n(i),names:null}]:Object.entries(i).map(([o,a])=>({dir:n(o),names:a}))),Wt.clear()}s(Aa,"autoImport");const _a=s(e=>fetch(e,{cache:"no-cache"}).then(t=>t.ok,()=>!1),"exists");function Ta(e){return Wt.has(e)||Wt.set(e,(async()=>{for(const{dir:t,names:n}of te)if(!(n&&!n.includes(e))){for(const r of Sa)if(await _a(t+e+r))return t+e+r}return null})()),Wt.get(e)}s(Ta,"locate");async function za(e=[],t,n){return!e.length||!te.length?"":(await Promise.all(e.map(async i=>{const o=await Ta(i);if(!o)throw new Error(`[rat] ${t}: <${i}> is not imported and not found in ${te.map(({dir:a})=>a).join(", ")}`);return`import ${i} from ${JSON.stringify(await Tn(o,n))};`}))).join(`
`)}s(za,"importsOf");async function La(e,t){const n=await fetch(e,{cache:"no-cache"});if(!n.ok)throw new Error(`[rat] ${e}: ${n.status} ${n.statusText}`);const r=await n.text(),i=new URL(e).pathname.split("/").pop(),o=n.headers.get("x-rat-compiled")?{code:r,found:await _n(r),unresolved:(n.headers.get("x-rat-unresolved")??"").split(",").filter(Boolean)}:await Ca(r,e,i,t),a=await js(o,e,t),c=await za(o.unresolved,e,t);return URL.createObjectURL(new Blob([`${a}
${c}
//# sourceURL=${e}.js
`],{type:"text/javascript"}))}s(La,"build");async function Ca(e,t,n,r){const i=globalThis.caches?await caches.open(ka).catch(()=>null):null,o=`${t}${t.includes("?")?"&":"?"}rat-compiled=${xa}.${Oa(e)}`,a=await i?.match(o);if(a)return a.json();document.dispatchEvent(new CustomEvent("rat:compile",{detail:{name:n,url:t}}));const{code:c,comptime:l,inlined:u,unresolved:p=[]}=await Na(e,t,n,r),d={code:c,found:await _n(c),unresolved:p};return i&&!u&&!l&&(await i.delete(t,{ignoreSearch:!0}),await i.put(o,new Response(JSON.stringify(d),{headers:{"content-type":"application/json"}}))),d}s(Ca,"compiledOf");const Ra=s((e,t)=>async(n,{read:r})=>{const i=URL.createObjectURL(new Blob([`${await js({code:n,found:await _n(n)},e,t)}
//# sourceURL=${e}.comptime.js
`],{type:"text/javascript"}));try{return await(await import(i)).default({read:r})}finally{URL.revokeObjectURL(i)}},"comptimeOf");async function Na(e,t,n,r){const i=Ns(t);if(i==="html")return{code:`import { raw } from '@rat/runtime';
const source = ${JSON.stringify(e)};
export default () => raw(source);
`};try{if(i==="htx")return{code:(await g(async()=>{const{compile:d}=await import("./index-rAOEOiax.js");return{compile:d}},[],import.meta.url)).compile(e,{adapter:"@rat/runtime",filename:n}).code};let o=!1;const a=s(d=>(o=!0,fetch(new URL(d,t),{cache:"no-cache"}).then(f=>f.ok?f.text():Promise.reject(new Error(`[rat] ${new URL(d,t).href}: ${f.status}`)))),"read"),{compileAsync:c}=await g(async()=>{const{compileAsync:d}=await import("./index-DhwAp6mF.js");return{compileAsync:d}},[],import.meta.url),{code:l,comptime:u,unresolved:p}=await c(e,{base:t,comptime:Ra(t,r),filename:n,read:a});return{code:l,comptime:u,inlined:o,unresolved:p}}catch(o){throw o.message=`${t}
${o.message}`,o}}s(Na,"compileSource");function Tn(e,t=[]){if(e=new URL(e,document.baseURI).href,t.includes(e))throw new Error(`[rat] circular import: ${[...t,e].join(" -> ")}`);if(!It.has(e)){const n=La(e,[...t,e]);n.catch(()=>It.delete(e)),It.set(e,n)}return It.get(e)}s(Tn,"compileFile");const ee=s(async e=>import(await Tn(e)),"load$1"),zn=s(e=>e.default??Object.values(e).find(t=>Ve(t))??null,"componentOf"),cr={clipboard:s(()=>g(()=>import("./clipboard-DEIqTmq2.js"),__vite__mapDeps([4,3,1,2]),import.meta.url),"clipboard"),database:s(()=>g(()=>import("./database-DM0-3NhX.js"),__vite__mapDeps([5,6,3,1,2]),import.meta.url),"database"),dialogs:s(()=>g(()=>import("./dialogs-BW0XSeOh.js"),__vite__mapDeps([7,3,1,2]),import.meta.url),"dialogs"),external:s(()=>g(()=>import("./external-DyNe1vmV.js"),__vite__mapDeps([8,3,1,2]),import.meta.url),"external"),files:s(()=>g(()=>import("./files-Dv3AwROg.js"),__vite__mapDeps([9,3,1,2]),import.meta.url),"files"),folders:s(()=>g(()=>Promise.resolve().then(()=>Eu),void 0,import.meta.url),"folders"),hotkeys:s(()=>g(()=>import("./hotkeys-DO-xoeTX.js"),__vite__mapDeps([10,11,3,1,2]),import.meta.url),"hotkeys"),notifications:s(()=>g(()=>import("./notifications-OMtplzlo.js"),__vite__mapDeps([12,3,1,2]),import.meta.url),"notifications"),offline:s(()=>g(()=>import("./offline-CUoJZI21.js"),__vite__mapDeps([13,3,1,2]),import.meta.url),"offline"),store:s(()=>g(()=>import("./store-BoQVJWPE.js"),__vite__mapDeps([14,6,3,1,2]),import.meta.url),"store"),thumbnails:s(()=>g(()=>import("./thumbnails-BP7TLTrf.js"),__vite__mapDeps([15,3,1,2]),import.meta.url),"thumbnails")};async function ja(e,t){for(const[n,r]of Object.entries(t)){if(!Object.hasOwn(cr,n)||r===!1||r==null)continue;if(n in e){console.warn(`[rat] mod "${n}": the app has a ${n} already, left out`);continue}const{default:i}=await cr[n](),o=await i(r===!0?{}:r,{app:e,config:t});Object.defineProperty(e,n,{configurable:!0,enumerable:!0,value:o})}}s(ja,"useMods");const xt=typeof __RAT_TARGET__=="string"?__RAT_TARGET__:null,Pa=s(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.getPlatform():null,"capacitor"),Da=s(()=>globalThis.bindings&&typeof globalThis.bindings=="object"?"desktop":null,"deno"),Ln=Pa()??Da()??"web",Bu=Ln!=="web",Ia={android:"capacitor",desktop:"deno",ios:"capacitor",web:"web"},Ma=Ia[Ln],Va={fit:"viewport-fit"},Ba=s(e=>Va[e]??e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),"kebab");function qa(e){const t=typeof e=="string"?e:Object.entries(e).map(([r,i])=>`${Ba(r)}=${i}`).join(", ");let n=document.head.querySelector('meta[name="viewport"]');return n||(n=document.head.appendChild(Object.assign(document.createElement("meta"),{name:"viewport"}))),n.content=t,t}s(qa,"viewport");const lr=64;class Ua extends L{static{s(this,"RatArea")}static shadow=!0;static props={breakpoint:{type:String,default:"48rem",reflect:!1},dock:{type:String,default:"none",values:["bottom","end","none","start"]},expanded:Boolean,name:String,open:Boolean,overlay:{type:String,default:"auto",values:["always","auto","never"]},peek:Boolean};static styles(){return`
    :host {
      --area-border : var(--border, 1px solid color-mix(in oklab, currentColor 20%, transparent));
      --area-peek   : 1.75rem;
      --area-size   : min(20rem, 85vw);
      --area-z      : 100;

      box-sizing     : border-box;
      display        : flex;
      flex-direction : column;
      min-block-size : 0;
      min-inline-size: 0;
    }

    :host([hidden]) { display: none; }

    [part="scrim"]  { display: none; }
    [part="handle"] { display: none; }

    [part="content"] {
      display        : flex;
      flex           : 1 1 auto;
      flex-direction : column;
      min-block-size : 0;
      overflow       : auto;
    }

    :host([dock="none"]) {
      grid-area : main;
      position  : relative;

      [part="sheet"]   { display: contents; }
      [part="content"] { overflow: hidden; }
    }

    ::slotted(rat-view[active]) {
      flex           : 1 1 auto;
      min-block-size : 0;
      overflow       : auto;
    }

    :host([dock="start"])  { grid-area: start;  }
    :host([dock="end"])    { grid-area: end;    }
    :host([dock="bottom"]) { grid-area: bottom; }

    :host(:not([dock="none"], [open], [peek])) { display: none; }

    [part="sheet"] {
      background-color : var(--color-bg);
      box-sizing       : border-box;
      display          : flex;
      flex-direction   : column;
      min-block-size   : 0;
      position         : relative;
    }

    :host([dock="start"]:not(:state(overlay))) [part="sheet"] { border-inline-end: var(--area-border); flex: 1 1 auto; inline-size: var(--area-size); }
    :host([dock="end"]:not(:state(overlay)))   [part="sheet"] { border-inline-start: var(--area-border); flex: 1 1 auto; inline-size: var(--area-size); }
    :host([dock="bottom"]:not(:state(overlay))) [part="sheet"] { border-block-start: var(--area-border); max-block-size: var(--area-size); }

    :host([dock="start"]:not(:state(overlay))[expanded]),
    :host([dock="end"]:not(:state(overlay))[expanded]) { --area-size: var(--area-expanded-size, 50vw); }

    :host([dock="bottom"]) { --area-size: 40dvh; }
    :host([dock="bottom"]:not(:state(overlay))[expanded]) { --area-size: var(--area-expanded-size, 70dvh); }

    :host([dock="bottom"]:not([open])[peek]:not(:state(overlay))) [part="content"] { display: none; }

    :host(:state(overlay)) {
      inset          : 0;
      pointer-events : none;
      position       : fixed;
      z-index        : var(--area-z);
    }

    :host(:state(overlay)) [part="scrim"] {
      background-color : var(--area-scrim, rgb(0 0 0 / 0.45));
      display          : block;
      inset            : 0;
      opacity          : 0;
      position         : absolute;
      transition       : opacity 0.25s ease;
    }

    :host(:state(overlay)[open]) { z-index: calc(var(--area-z) + 1); }

    :host(:state(overlay)[open]) [part="scrim"] { opacity: 1; pointer-events: auto; }

    :host(:state(overlay)) [part="sheet"] {
      box-shadow     : 0 0 1.5rem rgb(0 0 0 / 0.25);
      pointer-events : auto;
      position       : absolute;
      transition     : translate 0.25s ease, inline-size 0.25s ease, block-size 0.25s ease;
    }

    :host(:state(dragging)) [part="sheet"] { transition: none; }

    :host(:state(overlay)[dock="start"]) [part="sheet"] { inset-block: 0; inset-inline-start: 0; inline-size: var(--area-size); translate: -100% 0; }
    :host(:state(overlay)[dock="end"])   [part="sheet"] { inset-block: 0; inset-inline-end: 0;   inline-size: var(--area-size); translate:  100% 0; }

    :host(:state(overlay)[dock="bottom"]) [part="sheet"] {
      border-start-end-radius   : var(--radius-surface, 1rem);
      border-start-start-radius : var(--radius-surface, 1rem);
      inset-block-end           : 0;
      inset-inline              : 0;
      max-block-size            : 85dvh;
      translate                 : 0 100%;
    }

    :host(:state(overlay)[dock="bottom"][peek]:not([open])) [part="sheet"] { translate: 0 calc(100% - var(--area-peek)); }

    :host(:state(overlay)[open]) [part="sheet"] { translate: 0 0; }

    :host(:state(overlay)[expanded]:not([dock="bottom"])) [part="sheet"] { inline-size: 100vw; }
    :host(:state(overlay)[expanded][dock="bottom"])       [part="sheet"] { block-size: 100dvh; border-radius: 0; max-block-size: 100dvh; }

    :host(:state(overlay)) [part="handle"],
    :host([dock="bottom"][peek]) [part="handle"] {
      cursor       : grab;
      display      : block;
      flex         : none;
      position     : relative;
      touch-action : none;

      &::after {
        background-color : currentColor;
        border-radius    : 999px;
        content          : '';
        inset            : 50% auto auto 50%;
        opacity          : 0.35;
        position         : absolute;
        translate        : -50% -50%;
      }
    }

    :host([dock="bottom"]) [part="handle"] {
      block-size : var(--area-peek);
      &::after   { block-size: 0.25rem; inline-size: 2.5rem; }
    }

    :host(:state(overlay):not([dock="bottom"])) [part="handle"] {
      inline-size : 1rem;
      inset-block : 0;
      position    : absolute;
      z-index     : 1;
      &::after    { block-size: 2.5rem; inline-size: 0.25rem; }
    }

    :host(:state(overlay)[dock="start"]) [part="handle"] { inset-inline-end: 0; }
    :host(:state(overlay)[dock="end"])   [part="handle"] { inset-inline-start: 0; }

    @media (prefers-reduced-motion: reduce) {
      [part="scrim"], [part="sheet"] { transition: none !important; }
    }
    `}render(){return`
      <div part="scrim"></div>
      <div part="sheet">
        <div part="handle" role="button" tabindex="-1" aria-label="toggle"></div>
        <div part="content"><slot></slot></div>
      </div>
    `}get app(){return this.closest("rat-app")}get docked(){return this.dock!=="none"}get isOverlay(){return this.states.has("overlay")}show(){return this.toggle(!0)}hide(){return this.toggle(!1)}toggle(t=!this.open){return!this.docked||!!t===this.open?this:(t&&this.closeOtherDrawers(),this.open=!!t,t||(this.expanded=!1),this)}expand(t=!this.expanded){return this.docked?(t&&!this.open&&this.closeOtherDrawers(),this.expanded=!!t,t&&(this.open=!0),this):this}onConnected(){this.watchBreakpoint(),this.part("scrim").onClick(()=>this.hide()),this.parts("handle").onPointerDown(t=>this.drag(t)),this.$(document).onKeyDown(t=>{t.key==="Escape"&&this.isOverlay&&this.open&&!t.defaultPrevented&&(t.preventDefault(),this.hide())})}onDisconnected(){this.setOthersInert(!1)}onAttributeChanged(t){(t==="breakpoint"||t==="dock"||t==="overlay")&&this.watchBreakpoint()}sync(){const t=this.open,n=this.shadowRoot.querySelector('[part="content"]');n&&(n.inert=this.docked&&!t);const r=`${t}:${this.expanded}`;this._state!=null&&this._state!==r&&this.emit("toggle",{expanded:this.expanded,open:t}),this._state=r,this.setOthersInert(this.isOverlay&&t)}watchBreakpoint(){this._breakpoint?.();const t=this.overlay,n=s(a=>{this.states.toggle("overlay",a&&this.docked),this.update()},"set");if(t!=="auto"){this._breakpoint=null,n(t==="always");return}const r=globalThis.matchMedia?.(`(width < ${this.breakpoint})`),i=s(()=>n(!!r?.matches),"change"),o=s(()=>r?.removeEventListener("change",i),"stop");r?.addEventListener("change",i),this.track(o),this._breakpoint=o,n(!!r?.matches)}closeOtherDrawers(){if(this.isOverlay)for(const t of this.app?.areas??[])t!==this&&t.isOverlay&&t.open&&t.hide()}setOthersInert(t){const n=this.app;if(n){if(t&&!this._inerted){this._inerted=[...n.children].filter(r=>r!==this&&!r.inert);for(const r of this._inerted)r.inert=!0}else if(!t&&this._inerted){for(const r of this._inerted)r.inert=r.localName==="rat-view"&&!r.active;this._inerted=null}}}drag(t){const n=this.shadowRoot.querySelector('[part="sheet"]'),r=this.dock,i=r==="bottom"?"y":"x",o=r==="start"?-1:1,a=t.target,c=i==="y"?t.clientY:t.clientX;let l=0;const u=i==="y"?n.offsetHeight:n.offsetWidth,p=r==="bottom"&&this.peek?a.offsetHeight:0,d=(u-p)*o,f=this.open?0:d;a.setPointerCapture(t.pointerId),this.states.add("dragging");const h=s(v=>{if(l=(i==="y"?v.clientY:v.clientX)-c,!this.isOverlay)return;const k=Math.min(Math.max(f+l,Math.min(0,d)),Math.max(0,d));n.style.translate=i==="y"?`0 ${k}px`:`${k}px 0`},"move"),m=s(()=>{a.removeEventListener("pointermove",h),a.removeEventListener("pointerup",m),a.removeEventListener("pointercancel",m),this.states.delete("dragging"),n.style.translate="";const v=l*o;Math.abs(l)<4?this.toggle():v>lr?this.expanded?this.expand(!1):this.hide():v<-lr&&(this.open&&r==="bottom"?this.expand(!0):this.show())},"end");a.addEventListener("pointermove",h),a.addEventListener("pointerup",m),a.addEventListener("pointercancel",m)}}Ua.init("rat-area");const Fa=s((e,t)=>JSON.stringify(e)===JSON.stringify(t),"sameParams");class Ha extends L{static{s(this,"RatView")}static props={active:Boolean,name:String,route:String,src:String,transition:String};static styles(){return`rat-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }`}#t=null;#e=new Set;#r=!1;#n=null;#s=0;get app(){return this.closest("rat-app")}get loaded(){return!this.src||this.#r}onConnected(){this.inert=!this.active,this.track(An(this,t=>this.fail(t)))}on(t,n,r={}){if(t!=="leave")return super.on(t,n,r);const i={fn:n,unload:!!r.unload};return this.#e.add(i),()=>this.#e.delete(i)}async ask(t){for(const{fn:n,unload:r}of this.#e)if(!(t.unload&&!r)&&(t.unload?n.call(this,t):await n.call(this,t),t.defaultPrevented))return!1;return!0}enter(t={}){this.active||(this.active=!0,this.inert=!1,this.emit("rat:enter",{params:t})),this.src&&!Fa(t,this.#n)&&this.fill(t)}leave(){this.active&&(this.active=!1,this.inert=!0,this.emit("rat:leave"))}async fill(t){const n=++this.#s;this.#n=t,this.toggleAttribute("loading",!0),this.removeAttribute("error");try{const r=zn(await ee(new URL(this.src,this.baseURI).href));if(n!==this.#s)return;if(!r)throw new Error(`[rat] ${this.src} exports no component`);this.#t?.(),this.replaceChildren(),this.#t=Sn(r,this,{...t,view:this}),this.emit("rat:mount")}catch(r){n===this.#s&&ft(this,r)}finally{n===this.#s&&(this.#r=!0,this.removeAttribute("loading"))}}fail(t){this.#t?.(),this.#t=null,En(this,t,this.src?()=>this.retry():null)}retry(){return this.removeAttribute("error"),this.fill(this.#n??{})}onAttributeChanged(t){t!=="src"||this.#n===null||(this.#r=!1,this.active?this.fill(this.#n):this.#n=null)}}Ha.init("rat-view");const ze="rat-view-in",Le="rat-view-out",X=s(e=>({type:String,onChange(t,n){t==null&&n===void 0||Yo.set({[e]:t??null})}}),"gestaltProp"),Ce=s(e=>e.route.includes("*"),"isWild"),Ja=/^\.{1,2}\//,Wa=s((e=[],t)=>Promise.all([e].flat().map(n=>Ja.test(n)?new URL(n,t).href:n).map(n=>import(n))),"imports");let C=null;class Ka extends L{static{s(this,"RatApp")}static props={base:String,configSrc:String,loading:Boolean,routing:he("hash","path","query","memory","none"),src:String,transition:{default:"fade",type:String},density:X("density"),geometry:X("geometry"),layout:X("layout"),look:X("look"),mode:X("mode"),palette:X("palette"),skin:X("skin")};static styles(){return`
    rat-app {
      display: block;

      /* while loading the splash of run.js has the box */
      &:has(> rat-area):not([loading]) {
        display       : grid;
        grid-template :
          "start main   end" minmax(0, 1fr)
          "start bottom end" auto
          / auto minmax(0, 1fr) auto;
        min-block-size: 100dvh;

        & > :not(rat-area) { grid-area: main; min-inline-size: 0; }
      }

      &:has(> rat-area[dock="bottom"][peek]:state(overlay)) { padding-block-end: var(--area-peek, 1.75rem); }

      & > [data-rat-errors] {
        background      : Canvas;
        border          : 1px solid color-mix(in oklab, CanvasText 25%, transparent);
        border-radius   : 0.5rem;
        color           : CanvasText;
        inset           : auto 1rem 1rem auto;
        max-inline-size : min(40rem, calc(100vw - 2rem));
        padding         : 0.75rem 1rem;

        & pre { margin: 0 0 0.5rem; white-space: pre-wrap; }
      }
    }

    @keyframes rat-view-fade  { from { opacity: 0; } }
    @keyframes rat-view-slide { from { opacity: 0; translate: var(--rat-view-offset, 2rem 0); } }

    html:active-view-transition-type(rat-view) {
      &::view-transition-old(root),
      &::view-transition-new(root) { animation: none; }

      &::view-transition-group(${ze}),
      &::view-transition-group(${Le}) { animation-duration: var(--rat-view-duration, 0.25s); }

      &::view-transition-new(${ze})  { animation: var(--rat-view-in)  var(--rat-view-duration, 0.25s) ease both; }
      &::view-transition-old(${Le}) { animation: var(--rat-view-out) var(--rat-view-duration, 0.25s) ease both reverse; }
    }`}#t=new sa;#e=null;#r=null;#n=null;#s=new Set;#o=!1;#a=!1;#i=null;#c=!1;get commands(){return this.#t}get config(){return this.#e??{}}get router(){return this.#i}get areas(){return this.dom.getListOfElements("rat-area")}get view(){return this.views.findLast({active:!0})??null}get views(){return this.dom.getListOfElements("rat-view")}area(t){return this.areas.find({name:t})??null}toggle(t,n){const r=this.area(t);return r?.toggle(n),r}onConnected(){if(C&&C!==this&&C.isConnected){console.warn("[rat] one <rat-app> per page, this one stays out of it",this);return}C=this,this.src?this.hold(this.start()):this.configSrc&&this.hold(this.configure()),this.#i??=ma({base:this.base??"",mode:this.routing,resolve:s(t=>this.resolve(t),"resolve")}).bind(this.#t),this.track(this.#t.listen(this)),this.track(this.#i.on("change",()=>this.schedule())),this.track(this.#i.on("leave",t=>this.ask(t),{unload:!0})),this.#i.start(),this.track(()=>this.#i.stop()),this.observe.added("rat-view",()=>this.schedule()),this.observe.removed("rat-view",()=>this.schedule()),this.track(An(this,t=>this.report(t))),this.on("rat:toggle",({detail:t})=>this.toggle(...t.args))}onDisconnected(){C===this&&(C=null)}onAttributeChanged(t){t==="src"&&C===this&&this.start()}run(t,n={}){return this.hold(this.start(t,n))}async start(t,n){const{src:r}=this;if(!r&&!t)return;const i=s(({detail:o})=>{this.dataset.status=`compiling ${o.name}`},"status");this.#o=!0,this.loading=!0,this.dataset.status=`loading ${r??"the app"}`,document.addEventListener("rat:compile",i);try{await this.configure(n);const o=zn(t?await t():await ee(new URL(r,this.baseURI).href));if(!o)throw new Error(`[rat] ${r} exports no component`);this.#r?.(),this.replaceChildren(),this.#n=null,this.#r=Sn(o,this,{app:this}),this.emit("rat:mount")}catch(o){this.loading=!1,En(this,o,()=>{this.removeAttribute("error"),this.start(t,n)})}finally{document.removeEventListener("rat:compile",i),delete this.dataset.status,this.#o=!1,this.#c=!1,this.schedule()}}async configure(t){if(this.#e)return this.#e;if(t)return this.#e=await this.#l(t);const n=this.configSrc,r=n?new URL(n,this.baseURI).href:new URL("config.rat.js",new URL(this.src,this.baseURI)).href;if(!n&&!await fetch(r,{cache:"no-cache"}).then(a=>a.ok,()=>!1))return this.#e={};const i=await ee(r),o=i.default??{...i};return o.autoImport&&Aa(o.autoImport,r),await Wa(o.import,r),this.#e=await this.#l(o)}async#l(t){return t.viewport&&qa(t.viewport),await ja(this,t),t}levelOf(t){return[...t.querySelectorAll("rat-view[route]")].filter(n=>n.parentElement.closest("rat-view, rat-app")===t)}pick(t,n){const r=t.filter(i=>!Ce(i));for(const i of r){const o=kt(i.route,n,{exact:!0});if(o)return{...o,view:i}}for(const i of r){if(!ge(i.route).length||i.loaded&&!this.levelOf(i).length)continue;const o=kt(i.route,n);if(o)return{...o,view:i}}for(const i of t.filter(Ce)){const o=kt(i.route,n);if(o)return{...o,view:i}}return null}match(t){const n={},r=[];let i=this.levelOf(this),o=t;for(;i.length;){const a=this.pick(i,o);if(!a)break;Object.assign(n,a.params),r.push(a.view),o=a.rest||"/",i=this.levelOf(a.view)}return{params:n,views:r}}routeOf(t){const n=[];for(let r=t;r&&r!==this;r=r.parentElement.closest("rat-view, rat-app"))n.unshift(r.route??"");return fa(oa(...n),this.#i.params)}resolve(t){const n=`/${t}`,{views:r}=this.match(n);if(r.length&&!r.some(Ce))return n;const i=this.views.find({name:t});return i?.route==null?null:this.routeOf(i)}schedule(){this.#a||this.#o||C!==this||(this.#a=!0,queueMicrotask(()=>{this.#a=!1,this.follow()}))}follow(){const{path:t}=this.#i,{params:n,views:r}=this.match(t),i=new Set(r),o=this.views.filter(l=>l.active&&!i.has(l)),a=r.filter(l=>!l.active),c=s(()=>{for(const l of o)l.leave();for(const l of r)l.enter(n)},"swap");if(this.#i.params=n,!this.#c){this.#c=!0,c(),this.settle();return}return!o.length&&!a.length?c():(this.emit("rat:navigate",{from:o[0]?.name??null,params:n,path:t,to:a[0]?.name??null}),this.transit({from:o[0],swap:c,to:a[0]}))}transit({from:t,swap:n,to:r}){const i=s((u,p)=>{const d=u?.transition??p;return d==="fade"||d==="slide"?`rat-view-${d}`:d},"name"),o=i(r,this.transition),a=i(t,this.transition);if(!document.startViewTransition||this.a11y.reducedMotion||o==="none"&&a==="none"||this.loading)return Promise.resolve(n());const c=document.documentElement;return c.style.setProperty("--rat-view-in",o),c.style.setProperty("--rat-view-out",a),t&&(t.style.viewTransitionName=Le),document.startViewTransition({types:["rat-view"],update:s(()=>{t&&(t.style.viewTransitionName=""),r&&(r.style.viewTransitionName=ze),n()},"update")}).finished.finally(()=>{r&&(r.style.viewTransitionName=""),c.style.removeProperty("--rat-view-in"),c.style.removeProperty("--rat-view-out")})}ask(t){if(t.unload){for(const r of this.views.filter({active:!0}))r.ask(t);return}const n=new Set(this.match(t.to).views);return this.views.filter(r=>r.active&&!n.has(r)).reverse().reduce((r,i)=>r.then(o=>o&&i.ask(t)),Promise.resolve(!0))}report(t){if(console.error(t),!this.#n){this.#n=Object.assign(document.createElement("div"),{popover:"manual"}),this.#n.dataset.ratErrors="";const n=Object.assign(document.createElement("button"),{popoverTargetAction:"hide",popoverTargetElement:this.#n,textContent:"close",type:"button"});this.#n.append(document.createElement("pre"),n),this.append(this.#n)}this.#n.querySelector("pre").textContent=t?.message??String(t),this.#n.showPopover?.()}hold(t){return this.#s.add(t),t}async settle(){if(!this.loading)return;const t=s(n=>n.loaded||new Promise(r=>{n.addEventListener("rat:mount",r,{once:!0}),n.addEventListener("rat:error",r,{once:!0})}),"mounted");return await Promise.allSettled([...this.views.filter({active:!0}).map(t),...this.#s]),this.ready()}ready(){if(!this.loading)return Promise.resolve();const t=s(()=>{this.loading=!1,this.emit("rat:ready")},"done");return!document.startViewTransition||this.a11y.reducedMotion?Promise.resolve(t()):document.startViewTransition(t).finished}}Ka.init("rat-app");Object.defineProperties(zs,{app:{configurable:!0,enumerable:!0,get:s(()=>C,"get")},config:{configurable:!0,enumerable:!0,get:s(()=>C?.config??null,"get")},platform:{configurable:!0,enumerable:!0,value:Ln},toggle:{configurable:!0,enumerable:!0,value:s((e,t)=>C?.toggle(e,t)??null,"value")}});const Ga=s(e=>globalThis.requestIdleCallback?requestIdleCallback(e):setTimeout(e,1),"idle");class Za extends HTMLElement{static{s(this,"RatPart")}static observedAttributes=["src"];#t=null;#e=null;#r=0;#n=null;props={};get mode(){return this.getAttribute("load")??"eager"}connectedCallback(){this.#n??=An(this,t=>this.#o(t)),this.#s()}disconnectedCallback(){this.#n?.(),this.#n=null,this.stop()}attributeChangedCallback(t,n,r){this.isConnected&&n!==null&&n!==r&&this.start()}#s(){if(this.mode==="visible"&&globalThis.IntersectionObserver){const t=new IntersectionObserver(n=>{n.some(r=>r.isIntersecting)&&(t.disconnect(),this.start())});t.observe(this),this.#t=()=>t.disconnect()}else if(this.mode==="idle"){let t=!1;Ga(()=>{t||this.start()}),this.#t=()=>{t=!0}}else this.start()}async start(){this.stop();const t=this.getAttribute("src");if(!t)return;const n=this.#r,r=s(({detail:i})=>{n===this.#r&&(this.dataset.status=`compiling ${i.name}`)},"status");this.toggleAttribute("loading",!0),this.removeAttribute("error"),this.dataset.status=`loading ${t}`,document.addEventListener("rat:compile",r);try{const i=zn(await ee(new URL(t,this.baseURI).href));if(document.removeEventListener("rat:compile",r),n!==this.#r)return;if(!i)throw new Error(`[rat] ${t} exports no component`);this.replaceChildren(),this.#e=Sn(i,this,this.props),this.removeAttribute("loading"),delete this.dataset.status,this.dispatchEvent(new CustomEvent("rat:mount",{bubbles:!0}))}catch(i){if(document.removeEventListener("rat:compile",r),n!==this.#r)return;ft(this,i)}}stop(){this.#r++,this.#t?.(),this.#e?.(),this.#t=this.#e=null}#o(t){this.#e?.(),this.#e=null,this.removeAttribute("loading"),delete this.dataset.status,En(this,t,()=>this.start())}}customElements.get("rat-part")??customElements.define("rat-part",Za);const Ya="https://api.iconify.design",Re="@aufbau/svg/aliases.js",ur="material-symbols:help",dr={aufbau:"@aufbau/svg/icons/"},Ps=new Map,Ds=new Map,pr=new Set;let Xa=null,hr=!1;const Is=s(e=>/^(\.{0,2}\/|https?:|data:)/.test(e),"isFile"),Ge=s((e,t)=>{pr.has(e)||(pr.add(e),console.warn(`[svg-icon] ${t}`))},"warnOnce");function Qa(e){if(!e)return null;if(Is(e))return e;const t=String(e).trim().replace("/",":");return t.includes(":")?t:Ps.get(t)??null}s(Qa,"resolveIcon");function tc(e,t){try{return import.meta.resolve(`${e}${t}.svg`)}catch{return Ge(e,`"${e}" could not be resolved, add it to the importmap.`),null}}s(tc,"localUrl");function ec(e){if(Is(e))return e;const t=Ds.get(e);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[n,...r]=e.split(":"),i=r.join(":");return!n||!i?null:dr[n]?tc(dr[n],i):`${Ya}/${encodeURIComponent(n)}/${encodeURIComponent(i)}.svg`}s(ec,"iconUrl");class Cn extends L{static{s(this,"SvgIcon")}static attr={color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String};static styles=`svg-icon {
    background-color : var(--icon-color, currentColor);
    block-size       : var(--icon-size, 1em);
    display          : inline-block;
    flex             : none;
    inline-size      : var(--icon-size, 1em);
    mask             : var(--icon-url, linear-gradient(transparent, transparent)) center / 100% 100% no-repeat;
    vertical-align   : var(--icon-align, -0.125em);

    &[mode="image"] {
      background : var(--icon-url, none) center / contain no-repeat;
      mask       : none;
    }

    &:not([icon]) { display: none; }
  }`;static register(t){for(const[n,r]of Object.entries(t??{}))Ps.set(n,r);return this}static provide(t){for(const[n,r]of Object.entries(t??{}))Ds.set(n,r);return this}static loadDefaults(){return Xa??=import(Re).then(t=>{this.register(t.default)}).catch(t=>Ge(Re,`default aliases unavailable, "${Re}" could not be imported: ${t?.message??t}`)).finally(()=>{hr=!0})}sync(){const{color:t,icon:n,label:r,size:i}=this.getAttr();let o=Qa(n);if(n&&!o&&!hr){Cn.loadDefaults().then(()=>this.update());return}n&&!o&&(Ge(n,`unknown icon "${n}", showing ${ur}.`),o=ur);const a=o?ec(o):null;this.setVar({"--icon-color":t,"--icon-size":i,"--icon-url":a&&`url("${a}")`}),this.internals&&(this.internals.role=r?"img":null,this.internals.ariaLabel=r||null,this.internals.ariaHidden=r?null:"true")}}Cn.init();const D=s(e=>Object.fromEntries(Object.entries(e??{}).filter(([,t])=>t!==!1&&t!=null&&t!=="")),"attrs"),Rn=s(e=>e.kind==="bool","fits"),Ms=s(e=>{const{icon:t,iconChecked:n}=e.getAttr();return t||n?{off:t||n,on:n||t}:null},"iconsOf");function Nn(e,t,n){const r=e.getAttr("label");return b`
    <button type="button" part="control" ...${D({role:n})}>
      ${t}
      ${Ms(e)&&b`<svg-icon part="icon"></svg-icon>`}
      ${r&&b`<span part="label">${r}</span>`}
    </button>
  `}s(Nn,"control");const jn=s((e,t)=>t.on("click",'[part~="control"]',()=>e.toggle()),"events");function Pn(e){const t=e.part("control").node,n=e.checked;t.setAttribute(e.look==="button"?"aria-pressed":"aria-checked",String(n)),t.part.toggle("checked",n);const r=Ms(e);r&&t.querySelector("svg-icon").setAttribute("icon",n?r.on:r.off)}s(Pn,"update");const nc={fits:Rn,events:jn,update:Pn,css:`
    [part~="control"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(normal);
    }

    [part~="checked"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
  `,render:s(e=>Nn(e,"",null),"render"),focus:s(e=>e.part("control").node,"focus")},rc={fits:Rn,events:jn,update:Pn,css:`
    [part~="check"] {
      align-items     : center;
      block-size      : 1.15em;
      border          : var(--border-width, 1px) solid color-mix(in srgb, currentColor 45%, transparent);
      border-radius   : calc(--radius() * 0.5);
      display         : inline-flex;
      flex            : none;
      inline-size     : 1.15em;
      justify-content : center;
    }

    [part~="mark"] { --icon-size: 0.85em; visibility: hidden; }

    [part~="checked"] [part~="check"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
    [part~="checked"] [part~="mark"]  { visibility: visible; }
  `,render:s(e=>Nn(e,b`<span part="check"><svg-icon part="mark" icon="lucide:check"></svg-icon></span>`,"checkbox"),"render"),focus:s(e=>e.part("control").node,"focus")},bt=`
  [part~="box"] {
    border         : var(--input-line);
    border-radius  : --radius();
    min-block-size : --space(9);
    padding-inline : --space(small);

    &:focus-within { border-color: var(--color-ink, Highlight); }
  }

  [part~="icon"], [part~="action"] { opacity: 0.65; }
  [part~="action"]:hover          { opacity: 1; }
`,ye=s(e=>e.iconName&&b`<svg-icon part="icon" icon="${e.iconName}"></svg-icon>`,"icon$1");function At(e,t=0,n={}){const{autocomplete:r,max:i,maxlength:o,min:a,minlength:c,pattern:l,step:u}=e.getAttr(),p=e.placeholder;return b`<input part="input" data-index="${t}" ...${{...D({autocomplete:r,max:i,maxlength:o,min:a,minlength:c,pattern:l,placeholder:p,step:u,type:e.valueType.input}),...n}} />`}s(At,"field$1");function ve(e,t){t.on("input","input[data-index]",(n,r)=>e.setPart(Number(r.dataset.index),r.value)),t.on("change","input[data-index]",(n,r)=>e.setPart(Number(r.dataset.index),r.value,{final:!0}))}s(ve,"fieldEvents");function we(e){const t=e.values,n=!!e.getAttr("readonly");for(const r of e.root.querySelectorAll("input[data-index]")){if(r.readOnly=n,r===e.focused)continue;const i=t[Number(r.dataset.index)]??"";r.value!==i&&(r.value=i)}}s(we,"updateFields");const Dn=s(e=>e.root.querySelector("input[data-index]"),"firstField"),sc=s(e=>b`${(e.suggestionList??[]).map(t=>b`<option value="${t}"></option>`)}`,"options"),fr=s(e=>queueMicrotask(()=>e.part("input").focus()),"refocus"),ic={fits:s(e=>e.kind==="free"&&e.count==="multiple","fits"),css:`
    ${bt}
    [part~="box"] { flex-wrap: wrap; gap: --space(tiny); padding-block: --space(tiny); }

    [part~="chip"] {
      align-items   : center;
      background    : color-mix(in srgb, currentColor 12%, transparent);
      border-radius : --radius();
      display       : inline-flex;
      gap           : --space(tiny);
      padding       : --space(tiny);
    }

    [part~="remove"] { --icon-size: 0.85em; opacity: 0.65; }
    [part~="input"]  { flex: 1 1 6em; }
  `,render:s(e=>b`
    ${ye(e)}
    ${e.values.map((t,n)=>b`
      <span part="chip">
        <span part="label">${t}</span>
        <button type="button" part="remove" data-index="${n}" aria-label="${`remove ${t}`}" tabindex="-1"><svg-icon icon="lucide:x"></svg-icon></button>
      </span>
    `)}
    <input part="input" type="${e.valueType.input}" placeholder="${e.placeholder||"add…"}" enterkeyhint="done" ...${D({list:"suggestionList"in e&&"suggestions"})} />
    ${"suggestionList"in e?b`<datalist id="suggestions">${sc(e)}</datalist>`:""}
  `,"render"),events(e,t){const n=s(r=>{r.value.trim()&&(e.add(r.value),fr(e))},"add");t.on("click",'[part~="remove"]',(r,i)=>e.removeAt(Number(i.dataset.index))),t.$(e.root).on("input",async r=>{const i=e.part("input").node;if(r.target!==i||(i.setCustomValidity(""),typeof e.suggest!="function"))return;const o=i.value,a=await e.suggest(o);i.value===o&&(e.suggested=Array.isArray(a)?a.map(String):[],e.update())}),t.$(e.root).on("change",r=>{r.target===e.part("input").node&&n(r.target)}),t.$(e.root).on("keydown",r=>{const i=e.part("input").node;r.target===i&&(r.key==="Enter"||r.key===","?(r.preventDefault(),n(i)):r.key==="Backspace"&&!i.value&&e.values.length&&(e.removeAt(e.values.length-1),fr(e)))})},update(e){const t=e.part("input").node;t&&(t.readOnly=!!e.getAttr("readonly"))},focus:s(e=>e.part("input").node,"focus")},oc={ArrowLeft:-1,ArrowRight:1},ac={ArrowDown:1,ArrowUp:-1};function Vs(e,t,n,{sideways:r=!0}={}){if(e==="Home")return 0;if(e==="End")return n-1;const i=ac[e]??(r?oc[e]:void 0);return i?t<0?0:(t+i+n)%n:null}s(Vs,"nextIndex");const mt=s(e=>e.hidden||e.matches(':disabled, [aria-disabled="true"]'),"isInactive"),Bs=s(e=>e.icon&&b`<svg-icon part="icon" icon="${e.icon}"></svg-icon>`,"optionIcon"),ke=s(e=>e.label||e.value,"labelOf$1");function In(e,t,{iconsOnly:n=e.getAttr("iconsOnly"),mark:r=!1}={}){const i=e.count==="multiple"?"checkbox":"radio";return b`${e.options.map(o=>{const a=ke(o),c=!(n&&o.icon);return b`
      <button type="button" part="${t}" role="${i}" data-value="${o.value}" tabindex="-1" aria-checked="false"
              ...${D({"aria-label":!c&&a,disabled:o.disabled,title:!c&&a})}>
        ${r&&b`<span part="mark"></span>`}
        ${Bs(o)}
        ${c&&b`<span part="label">${a}</span>`}
      </button>
    `})}`}s(In,"optionButtons");function xe(e){const t=e.selected,n=[...e.root.querySelectorAll("[data-value]")];for(const r of n){const i=t.has(r.dataset.value);r.setAttribute(r.getAttribute("role")==="option"?"aria-selected":"aria-checked",String(i)),r.part.toggle("selected",i)}return n}s(xe,"updateSelected");function qs(e,t){const n=e.selected,r=t.find(i=>n.has(i.dataset.value)&&!mt(i))??t.find(i=>!mt(i));for(const i of t)i.tabIndex=i===r?0:-1}s(qs,"updateTabStop");function Us(e,t){t.on("click","[data-value]",(n,r)=>{mt(r)||e.select(r.dataset.value)}),t.$(e.root).on("keydown",n=>{if(n.target.localName==="input")return;const r=[...e.root.querySelectorAll("[data-value]")].filter(c=>!mt(c)),i=r.indexOf(n.target.closest?.("[data-value]")),o=Vs(n.key,i,r.length);if(o===null||!r.length)return;n.preventDefault();const a=r[o];a.focus(),e.count!=="multiple"&&e.select(a.dataset.value)})}s(Us,"groupEvents");const Mn={events:Us,focus:s(e=>e.root.querySelector('[data-value][tabindex="0"]'),"focus"),role:s(e=>e.count==="multiple"?"group":"radiogroup","role"),update:s(e=>qs(e,xe(e)),"update")},mr=8,Mt=4;function Fs(e,t,{matchWidth:n=!0,maxSize:r=240,placement:i="bottom-start"}={}){const o=t.getBoundingClientRect(),a={height:window.innerHeight,width:window.innerWidth},c=Math.min(e.scrollHeight||r,r),l=a.height-o.bottom,u=o.top,d=i.startsWith("top")?u<c&&l>u?"bottom":"top":l<c&&u>l?"top":"bottom",f=e.style;f.position="fixed",f.margin="0",f.minInlineSize=n?`${o.width}px`:"";const h=e.offsetWidth,m=i.endsWith("end")?o.right-h:o.left;return f.left=`${Math.max(mr,Math.min(m,a.width-h-mr))}px`,f.right="auto",d==="top"?(f.top="auto",f.bottom=`${a.height-o.top+Mt}px`,f.maxBlockSize=`${Math.min(u-3*Mt,r)}px`):(f.bottom="auto",f.top=`${o.bottom+Mt}px`,f.maxBlockSize=`${Math.min(l-3*Mt,r)}px`),d}s(Fs,"place");const F=s(e=>e.root.querySelector("[aria-haspopup]"),"triggerOf"),it=s(e=>e.part("listbox").matches(":popover-open"),"isOpen"),Hs=s(e=>b`
  <div part="listbox" role="listbox" popover="manual" ...${D({"aria-multiselectable":e.count==="multiple"&&"true"})}>
    ${e.options.map(t=>b`
      <div part="option" role="option" data-value="${t.value}" tabindex="-1" aria-selected="false" ...${D({"aria-disabled":t.disabled&&"true"})}>
        ${Bs(t)}
        <span part="label">${ke(t)}</span>
      </div>
    `)}
  </div>
`,"listbox"),Js=`
  [part~="listbox"] {
    background          : var(--color-bg, Canvas);
    border              : var(--input-line);
    border-radius       : --radius();
    color               : inherit;
    margin              : 0;
    max-block-size      : var(--list-size, 15em);
    overflow-y          : auto;
    overscroll-behavior : contain;
    padding             : --space(tiny);
    position            : fixed;
  }

  [part~="option"] {
    align-items   : center;
    border-radius : calc(--radius() * 0.75);
    cursor        : pointer;
    display       : flex;
    gap           : --space(small);
    padding       : --space(small);

    &:hover, &:focus        { background: color-mix(in srgb, currentColor 10%, transparent); }
    &[part~="selected"]     { color: var(--color-ink, AccentColor); }
    &[aria-disabled="true"] { cursor: not-allowed; opacity: 0.5; }
  }

  [part~="label"] { min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;function Ws(e,t){const n=e.part("listbox").node;n&&it(e)&&(e.dataset.placement=Fs(n,t))}s(Ws,"reposition");function rt(e,t,n){const r=e.part("listbox").node;if(!r||e.disabled||t===it(e))return;const i=r.contains(e.focused);r[t?"showPopover":"hidePopover"](),F(e)?.setAttribute("aria-expanded",String(t)),t?(Ws(e,n),r.querySelector('[part~="selected"]')?.scrollIntoView({block:"nearest"})):(Ks(e,""),i&&F(e)?.focus())}s(rt,"setOpen");function Ks(e,t){const n=String(t??"").trim().toLowerCase();for(const r of e.part("listbox").$$('[role="option"]'))r.hidden=!!n&&!r.textContent.toLowerCase().includes(n)}s(Ks,"filter$1");const cc=s(e=>e.part("listbox").$$("[data-value]").filter(t=>!mt(t)).nodes,"enabledItems");function Gs(e,t,n){const r=s(()=>rt(e,!1,n()),"close");t.on("click",'[role="option"]',(o,a)=>{mt(a)||(e.select(a.dataset.value),e.count!=="multiple"&&r())}),t.$(document).on("pointerdown",o=>{o.composedPath().includes(e)||r()});const i=s(()=>Ws(e,n()),"follow");t.$(window).on("resize",i,{passive:!0}),t.$(window).on("scroll",i,{capture:!0,passive:!0}),t.$(e.root).on("keydown",o=>{const{key:a}=o,c=o.target.closest?.("[data-value]");if(a==="Escape"&&it(e)){o.preventDefault(),r();return}if((a==="Enter"||a===" ")&&c){o.preventDefault(),c.click();return}const l=cc(e),u=l.findIndex(f=>e.selected.has(f.dataset.value)),p=c?l.indexOf(c):u,d=Vs(a,p,l.length,{sideways:!1});d!==null&&(o.preventDefault(),it(e)||rt(e,!0,n()),l[d]?.focus())})}s(Gs,"popoverEvents");function gr(e){const t=F(e);if(!t||t===e.focused)return;const n=e.selected;t.value=e.options.filter(r=>n.has(r.value)).map(ke).join(", ")}s(gr,"showSelection");const lc={fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
    ${bt}
    ${Js}
    [part~="box"] { cursor: pointer; }

    [part~="input"] {
      cursor        : inherit;
      flex          : 1 1 auto;
      inline-size   : 100%;
      text-overflow : ellipsis;

      &[aria-expanded="true"] ~ [part~="caret"] { rotate: 180deg; }
    }

    [part~="caret"] { opacity: 0.65; transition: rotate 0.15s ease; }
  `,render:s(e=>b`
    ${ye(e)}
    <input type="text" part="input" role="combobox" aria-haspopup="listbox" aria-expanded="false"
           ...${D({placeholder:e.placeholder||"select…",readonly:!e.getAttr("searchable")})} />
    <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
    ${Hs(e)}
  `,"render"),events(e,t){Gs(e,t,()=>e),t.on("click",n=>{n.composedPath().includes(e.part("listbox").node)||rt(e,!it(e),e)}),t.$(e.root).on("input",n=>{n.target===F(e)&&(rt(e,!0,e),Ks(e,n.target.value))}),t.$(e.root).on("focusout",n=>{n.target===F(e)&&!it(e)&&gr(e)})},update(e){xe(e),gr(e)},focus:F},uc=500,dc={fits:s(e=>e.kind==="list"&&e.count==="single","fits"),css:`
    ${Js}

    [part~="button"] {
      -webkit-touch-callout : none;
      border                : var(--input-line);
      border-radius         : --radius();
      min-block-size        : --space(9);
      padding-inline        : --space(normal);
      user-select           : none;
    }
  `,render:s(e=>b`
    <button type="button" part="button" aria-haspopup="listbox" aria-expanded="false">
      <svg-icon part="icon" hidden></svg-icon>
      <span part="label"></span>
    </button>
    ${Hs(e)}
  `,"render"),events(e,t){const n=s(()=>F(e),"button");Gs(e,t,n);let r=null,i=!1;t.on("pointerdown","[aria-haspopup]",a=>{a.button===0&&(i=!1,clearTimeout(r),r=setTimeout(()=>{i=!0,rt(e,!0,n())},uc))});const o=s(()=>{clearTimeout(r),i&&setTimeout(()=>{i=!1})},"release");t.$(window).on("pointerup pointercancel",o),t.on("click","[aria-haspopup]",()=>{i||(it(e)?rt(e,!1,n()):e.cycle(1))}),t.on("contextmenu","[aria-haspopup]",a=>{a.preventDefault(),rt(e,!0,n())})},update(e){xe(e);const t=F(e),n=e.options.find(a=>a.value===e.value),r=n?ke(n):e.placeholder||"select…",i=t.querySelector("svg-icon"),o=t.querySelector('[part~="label"]');i.hidden=!n?.icon,n?.icon&&i.setAttribute("icon",n.icon),o.textContent=r,o.hidden=!!(e.getAttr("iconsOnly")&&n?.icon),t.title=r,t.setAttribute("aria-label",r)},focus:F},pc=["copy","paste","clear","reveal","calculator"],dt={calculator:"lucide:calculator",clear:"lucide:eraser",copy:"lucide:copy",done:"lucide:check",fail:"lucide:x",paste:"lucide:clipboard-paste",reveal:"lucide:eye",veil:"lucide:eye-off"},hc=s(e=>{const t=new Set(String(e??"").split(/[\s,]+/));return pc.filter(n=>t.has(n))},"parseActions"),fc=s(e=>b`${e.map(t=>b`
  <button type="button" part="action ${t}" data-action="${t}" aria-label="${t}" title="${t}">
    <svg-icon icon="${dt[t]}"></svg-icon>
  </button>
`)}`,"actionButtons"),Vt=s((e,t)=>{const n=e.querySelector("svg-icon");n&&(n.setAttribute("icon",t?dt.done:dt.fail),clearTimeout(e._flash),e._flash=setTimeout(()=>n.setAttribute("icon",dt[e.dataset.action]),1500))},"flash"),mc=s(e=>{if("select"in e)return e.select();const t=document.createRange();t.selectNodeContents(e);const n=getSelection();n.removeAllRanges(),n.addRange(t)},"selectAll"),Zs=s((e,t)=>{if("setRangeText"in e)e.setRangeText(t,e.selectionStart,e.selectionEnd,"end");else{const n=getSelection().getRangeAt(0);n.deleteContents(),n.insertNode(document.createTextNode(t)),n.collapse(!1)}e.dispatchEvent(new Event("input",{bubbles:!0}))},"fallback"),gc=s((e,t)=>{if(e.focus(),!("setRangeText"in e)){const n=getSelection();if(!e.contains(n.anchorNode)){const r=document.createRange();r.selectNodeContents(e),r.collapse(!1),n.removeAllRanges(),n.addRange(r)}}document.execCommand("insertText",!1,t)||Zs(e,t)},"insert");let P=null;async function bc(e){if(await Promise.all([g(()=>import("./pop-over-BhJuUlH3.js"),__vite__mapDeps([16,1,2,3]),import.meta.url),g(()=>import("./widget-calculator-DDAXvt8T.js"),__vite__mapDeps([17,3,1,2]),import.meta.url)]),!P){const n=document.createElement("pop-over"),r=document.createElement("widget-calculator");n.append(r),document.body.append(n),r.addEventListener("widget-calculator",({detail:i})=>{i.action==="done"&&i.value!=null&&P.host?.setValue(String(i.value)),n.hide()}),n.addEventListener("pop-over",({detail:i})=>{i.open||(P.host=null)}),Object.defineProperty(n,"anchorElement",{get:s(()=>P.host,"get")}),P={host:null,pop:n,widget:r}}const t=e.value??"";P.host=e,P.widget.setAttribute("value",t),P.widget.setExpression(t),P.pop.show(),P.widget.display?.focus()}s(bc,"openCalculator");const yc={calculator(e){return bc(e)},async copy(e,t){try{await navigator.clipboard.writeText(e.actionText()),Vt(t,!0),e.emit("aufbau-copy",{text:e.actionText()})}catch(n){Vt(t,!1),console.warn(`[${e.localName}] copy failed:`,n)}},async paste(e,t){const n=e.actionTarget();if(n)try{gc(n,await navigator.clipboard.readText()),Vt(t,!0)}catch(r){Vt(t,!1),console.warn(`[${e.localName}] paste failed:`,r)}},clear(e){const t=e.actionTarget();t&&(t.focus(),mc(t),document.execCommand("delete")||Zs(t,""))},reveal(e,t){const n=e.revealTarget?.()??e.actionTarget();if(!n||!("type"in n))return;const r=n.type==="password";n.type=r?"text":"password",t.setAttribute("aria-pressed",String(r)),t.querySelector("svg-icon")?.setAttribute("icon",r?dt.veil:dt.reveal)}};function vc(e,t=e){t.on("pointerdown","[data-action]",n=>n.preventDefault()),t.on("click","[data-action]",(n,r)=>yc[r.dataset.action]?.(e,r))}s(vc,"bindActions");const wc={fits:s(e=>e.kind==="free"&&e.count==="single","fits"),css:`
    ${bt}
    [part~="input"] { flex: 1 1 auto; inline-size: 100%; }
  `,render:s(e=>b`
    ${ye(e)}
    ${At(e)}
    ${fc(hc(e.actions))}
  `,"render"),events(e,t){ve(e,t),vc(e,t)},update(e){we(e);const t=e.root.querySelector('[data-action="clear"]');t&&(t.hidden=!e.value)},focus:Dn},kc={fits:s(e=>e.kind==="free"&&e.count==="range","fits"),css:`
    ${bt}
    [part~="input"]     { flex: 1 1 auto; inline-size: 100%; }
    [part~="separator"] { flex: none; opacity: 0.65; }
  `,render:s(e=>b`
    ${ye(e)}
    ${At(e,0,{"aria-label":"from"})}
    <span part="separator">–</span>
    ${At(e,1,{"aria-label":"to"})}
  `,"render"),events:ve,update:we,focus:Dn},Ys=s((e,t=100)=>{let n=null;const r=s((...i)=>{clearTimeout(n),n=setTimeout(()=>{n=null,e(...i)},t)},"debounced");return r.cancel=()=>{clearTimeout(n),n=null},r},"debounce"),xc=250,Sc=s(e=>!!(e.valueType.list?.query||e.getAttr("searchable")),"hasSearch");function br(e,t){const n=t.trim().toLowerCase();for(const r of e.part("options").$$("[data-value]")){const i=(r.title||r.textContent).toLowerCase();r.hidden=!!n&&!i.includes(n)}}s(br,"filter");const Oc={fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
    [part~="box"] { align-items: stretch; flex-direction: column; }

    [part~="search"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(small);

      &:focus { border-color: var(--color-ink, Highlight); }
    }

    [part~="options"] {
      display               : grid;
      gap                   : --space(tiny);
      grid-template-columns : repeat(auto-fill, minmax(var(--grid-size, 2.5em), 1fr));
      max-block-size        : var(--grid-height, 16em);
      overflow-y            : auto;
    }

    [part~="option"] {
      aspect-ratio  : 1;
      border-radius : --radius();
      font-size     : 1.25em;

      &:hover             { background: color-mix(in srgb, currentColor 10%, transparent); }
      &[part~="selected"] { background: var(--color-ink, AccentColor); color: var(--color-bg, Canvas); }
    }
  `,render(e){const t=Sc(e)&&b`<input type="search" part="search" placeholder="${e.placeholder||"search…"}" />`;return b`${t}<div part="options">${In(e,"option",{iconsOnly:!0})}</div>`},events(e,t){Us(e,t);const n=Ys(r=>e.source.search(r),xc);e.track(n.cancel),t.$(e.root).on("input",r=>{r.target===e.part("search").node&&(e.valueType.list?.query?n(r.target.value):br(e,r.target.value))})},update(e){const t=e.part("options").node,n=e.options.map(r=>r.value).join(`
`);if(t.dataset.signature!==n){t.dataset.signature=n;const r=e.part("search").node;r?.value&&!e.valueType.list?.query&&br(e,r.value)}qs(e,xe(e))},role:Mn.role,focus:s(e=>e.part("search").node??e.root.querySelector('[data-value][tabindex="0"]'),"focus")},E={icon:null,input:"text",look:"field",parse:s(e=>e==null?"":String(e),"parse"),format:s(e=>e==null?"":String(e),"format")},$c=/^(\d+(?:\.\d+)?)%$/;function ne(e=""){const t=String(e??"").trim().split(/\s+/).filter(Boolean),n=t.shift()??"",r={bg:null,fg:null,id:n==="none"?"":n,opacity:null};for(const i of t){const o=i.match($c);o?r.opacity=Math.min(1,Number(o[1])/100):r.fg?r.bg||(r.bg=i):r.fg=i}return r}s(ne,"parsePattern");function Xs({bg:e,fg:t,id:n,opacity:r}={}){if(!n)return"";const i=[n];return r!=null&&i.push(`${Math.round(r*100)}%`),e?i.push(t??"#000000",e):t&&i.push(t),i.join(" ")}s(Xs,"formatPattern");async function Ec(e,{name:t="pattern",opacity:n=1}={}){const r=ne(e);if(!r.id)return null;const i={};r.fg&&(i.fg=r.fg),r.bg&&(i.bg=r.bg);try{const{use:o}=await g(async()=>{const{use:c}=await import("./index-f1CGb_xX.js").then(l=>l.i);return{use:c}},__vite__mapDeps([18,3]),import.meta.url),a=await o(r.id,i).image();return{[`--${t}-image`]:a,[`--${t}-opacity`]:String(r.opacity??n)}}catch{return null}}s(Ec,"patternStyle");const Qs={...E,attributes:["colors","opacity","patterns"],icon:"lucide:grid-3x3",look:"pattern"},qu=Object.freeze(Object.defineProperty({__proto__:null,default:Qs,formatPattern:Xs,parsePattern:ne,patternStyle:Ec},Symbol.toStringTag,{value:"Module"})),re=s((e,t)=>e.root.querySelector(`[data-color="${t}"]`),"colorOf"),Ne=s(e=>[...e.root.querySelectorAll('[part~="patterns"] [data-pattern]')],"swatchesOf"),et=s(e=>e.dataset.pattern==="none"?"":e.dataset.pattern,"idOf"),yr=s((e,t,n="swatch")=>b`
  <button type="button" part="${n}" data-pattern="${e}" ...${D({"aria-label":t,title:t})}><span></span></button>
`,"swatch$1");function Ac(e,t){const n=t.map(i=>i.id),r=e.getAttribute("patterns")?.trim();return r?r.split(/\s+/).filter(i=>n.includes(i)):n}s(Ac,"idsOf");async function _c(e){const{use:t}=await g(async()=>{const{use:n}=await import("./index-f1CGb_xX.js").then(r=>r.i);return{use:n}},__vite__mapDeps([18,3]),import.meta.url);for(const n of e.root.querySelectorAll("[data-pattern] > span")){const r=et(n.parentElement);!r||n.dataset.painted===r||(n.dataset.painted=r,t(r).image().then(i=>{et(n.parentElement)===r&&n.style.setProperty("--swatch",i)}).catch(()=>{}))}}s(_c,"paint");function je(e,t){const n=e.part("opacity").node,r=e.hasAttribute("colors");e.setValue(Xs({bg:r?re(e,"bg").value:null,fg:r?re(e,"fg").value:null,id:t,opacity:n?Number(n.value)/100:null}))}s(je,"pick$1");function Tc(e){e._swatches||(e._swatches=[],g(async()=>{const{list:t}=await import("./index-f1CGb_xX.js").then(n=>n.i);return{list:t}},__vite__mapDeps([18,3]),import.meta.url).then(({list:t})=>{const n=t(),r=Object.fromEntries(n.map(o=>[o.id,o.name])),i=e.hasAttribute("required")?[]:[["none","none"]];e._swatches=[...i,...Ac(e,n).map(o=>[o,r[o]??o])],e.update()}))}s(Tc,"fill");function vr(e,t){const n=e.part("patterns").node;t?(n.showPopover(),Fs(n,e.part("current").node),n.querySelector('[tabindex="0"]')?.focus()):n.hidePopover()}s(vr,"toggle$1");const zc={fits:s(e=>e.type==="pattern","fits"),css:`
    [part~="box"] { flex-wrap: wrap; }

    [part~="current"], [part~="swatch"] {
      aspect-ratio  : 1;
      border        : var(--input-line);
      border-radius : --radius();
      inline-size   : var(--pattern-swatch-size, 2.75em);
      overflow      : hidden;
      position      : relative;

      > span {
        background-color : currentColor;
        inset            : 0;
        mask-image       : var(--swatch);
        opacity          : 0.7;
        position         : absolute;
      }

      &[data-pattern="none"] > span {
        background : linear-gradient(to top right, transparent calc(50% - 1px), currentColor 0 calc(50% + 1px), transparent 0);
        mask-image : none;
        opacity    : 0.4;
      }
    }

    [part~="swatch"][aria-checked="true"] { outline: 2px solid var(--color-ink, currentColor); outline-offset: 1px; }

    [part~="opacity"] { accent-color: var(--color-ink, AccentColor); flex: 1 1 8em; }

    [part~="colors"] { display: flex; gap: --space(small); }

    [part~="color"] {
      block-size    : 2em;
      border        : var(--input-line);
      border-radius : --radius();
      inline-size   : 2.5em;
      padding       : --space(tiny);
    }

    [part~="patterns"] {
      background            : var(--color-bg, Canvas);
      border                : var(--input-line);
      border-radius         : --radius();
      color                 : inherit;
      gap                   : --space(tiny);
      grid-template-columns : repeat(var(--pattern-columns, 5), var(--pattern-swatch-size, 2.75em));
      margin                : 0;
      padding               : --space(small);
      position              : fixed;

      &:popover-open { display: grid; }
    }
  `,render(e){const t=e.hasAttribute("opacity"),n=e.hasAttribute("colors");return b`
      ${yr("none","pattern","current")}
      ${t&&b`<input type="range" part="opacity" min="0" max="100" step="1" aria-label="opacity" />`}
      ${n&&b`
        <span part="colors">
          <input type="color" part="color" data-color="fg" aria-label="pattern color" />
          <input type="color" part="color" data-color="bg" aria-label="background color" />
        </span>`}
      <div part="patterns" popover="auto" role="radiogroup" aria-label="patterns">${(e._swatches??[]).map(([r,i])=>yr(r,i))}</div>
    `},events(e,t){t.on("click",'[part~="current"]',()=>vr(e,!e.part("patterns").matches(":popover-open"))),t.on("click",'[part~="patterns"] [data-pattern]',(r,i)=>{je(e,et(i)),vr(e,!1),e.part("current").focus()}),t.$(e.root).on("keydown",r=>{const o={ArrowDown:1,ArrowLeft:-1,ArrowRight:1,ArrowUp:-1}[r.key],a=Ne(e),c=a.indexOf(r.target);if(!o||c<0)return;r.preventDefault();const l=a[(c+o+a.length)%a.length];l.focus(),je(e,et(l))});const n=s(()=>{const r=Ne(e).map(et).find(Boolean)??"";je(e,ne(e.value).id||r)},"keep");t.$(e.root).on("change",r=>{r.target.matches('[part~="opacity"], [part~="color"]')&&n()})},update(e){Tc(e);const t=ne(e.value),n=e.part("current").node;n.dataset.pattern=t.id||"none";const r=e.part("opacity").node;r&&r!==e.focused&&(r.value=String(Math.round((t.opacity??.1)*100))),e.hasAttribute("colors")&&(re(e,"fg").value=t.fg??"#000000",re(e,"bg").value=t.bg??"#ffffff");const i=Ne(e),o=i.find(a=>et(a)===t.id)??i[0];for(const a of i)a.setAttribute("aria-checked",String(et(a)===t.id)),a.tabIndex=a===o?0:-1;n.title=o?.title??"",_c(e)},focus:s(e=>e.part("current").node,"focus")},Lc={...Mn,fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
    [part~="box"]    { align-items: flex-start; flex-direction: column; gap: --space(tiny); }
    [part~="option"] { gap: --space(small); justify-content: flex-start; }

    [part~="mark"] {
      block-size    : 1em;
      border        : var(--border-width, 1px) solid color-mix(in srgb, currentColor 45%, transparent);
      border-radius : 50%;
      flex          : none;
      inline-size   : 1em;
    }

    [role="checkbox"] [part~="mark"] { border-radius: calc(--radius() * 0.5); }

    [part~="selected"] [part~="mark"] {
      background : var(--color-ink, AccentColor);
      border     : 0.3em solid var(--color-bg, Canvas);
      outline    : var(--border-width, 1px) solid var(--color-ink, AccentColor);
    }
  `,render:s(e=>In(e,"option",{mark:!0}),"render")},Cc={...Mn,fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
    [part~="box"] {
      border        : var(--input-line);
      border-radius : --radius();
      gap           : 0;
      overflow      : hidden;
    }

    [part~="segment"] {
      flex           : 1 1 auto;
      min-block-size : --space(9);
      padding-inline : --space(normal);

      & + [part~="segment"] { border-inline-start: var(--input-line); }

      &[part~="selected"] { background: var(--color-ink, AccentColor); color: var(--color-bg, Canvas); }
    }
  `,render:s(e=>In(e,"segment"),"render")},Pe=s((e,[t,n])=>(e-t)/(n-t||1)*100,"percent");function Rc(e){const[t,n]=e.bounds;return e.values.map((r,i)=>r===""?i===1?n:t:Math.min(n,Math.max(t,e.toNumber(r))))}s(Rc,"positionsOf");const Nc={fits:s(e=>e.kind==="free"&&e.axis&&e.count!=="multiple","fits"),css:`
    :host {
      --slider-thumb : 1.1em;
      --slider-track : 0.35em;
    }

    [part~="track"] {
      align-items     : center;
      block-size      : var(--slider-thumb);
      display         : flex;
      flex            : 1 1 auto;
      min-inline-size : var(--slider-size, 10em);
      position        : relative;

      &::before {
        background    : color-mix(in srgb, currentColor 20%, transparent);
        block-size    : var(--slider-track);
        border-radius : var(--slider-track);
        content       : '';
        inset-inline  : 0;
        position      : absolute;
      }

      &[part~="hue"]::before { background: linear-gradient(to right in hsl longer hue, red, red); }
    }

    [part~="fill"] {
      background         : var(--color-ink, AccentColor);
      block-size         : var(--slider-track);
      border-radius      : var(--slider-track);
      inline-size        : calc((var(--to) - var(--from)) * (100% - var(--slider-thumb)) / 100);
      inset-inline-start : calc(var(--slider-thumb) / 2 + var(--from) * (100% - var(--slider-thumb)) / 100);
      position           : absolute;
    }

    [part~="hue"] > [part~="fill"] { display: none; }

    [part~="thumb"] {
      background         : var(--slider-color, var(--color-fg, currentColor));
      block-size         : var(--slider-thumb);
      border             : 2px solid var(--color-ink, AccentColor);
      border-radius      : 50%;
      inline-size        : var(--slider-thumb);
      inset-inline-start : calc(var(--at) * (100% - var(--slider-thumb)) / 100);
      pointer-events     : none;
      position           : absolute;

      &:has(+ input:focus-visible) { outline: 2px solid var(--color-ink, Highlight); outline-offset: 2px; }
    }

    [part~="input"] {
      appearance  : none;
      block-size  : 100%;
      cursor      : pointer;
      inline-size : 100%;
      inset       : 0;
      opacity     : 0;
      position    : absolute;

      &::-webkit-slider-thumb { appearance: none; block-size: var(--slider-thumb); inline-size: var(--slider-thumb); }
      &::-moz-range-thumb     { block-size: var(--slider-thumb); border: 0; inline-size: var(--slider-thumb); }
    }

    :host([range]) [part~="input"] {
      pointer-events: none;

      &::-webkit-slider-thumb { pointer-events: auto; }
      &::-moz-range-thumb     { pointer-events: auto; }
    }

    [part~="output"] { flex: none; font-variant-numeric: tabular-nums; min-inline-size: 4ch; text-align: end; }
  `,render(e){const t=e.count==="range",[n,r]=e.bounds,i=e.stepSize,o=e.getAttr("unit"),a=s(c=>b`
      <span part="thumb" data-thumb="${c}"></span>
      <input type="range" part="input" data-index="${c}" ...${D({"aria-label":t&&(c?"to":"from"),max:r,min:n,step:i})} />
    `,"handle");return b`
      <span part="${e.typeName==="color"?"track hue":"track"}">
        <span part="fill"></span>
        ${a(0)}
        ${t&&a(1)}
      </span>
      ${e.getAttr("readout")&&b`<output part="output"></output>`}
      ${o&&b`<small part="unit">${o}</small>`}
    `},events(e,t){t.on("input",'input[type="range"]',(n,r)=>e.setNumber(Number(r.dataset.index),Number(r.value),{track:!0}))},update(e){const t=e.bounds,n=Rc(e),r=e.values,i=e.count==="range";for(const l of e.root.querySelectorAll('input[type="range"]'))l.disabled=e.isLocked,l!==e.focused&&(l.value=String(n[Number(l.dataset.index)]));for(const l of e.root.querySelectorAll("[data-thumb]"))l.style.setProperty("--at",Pe(n[Number(l.dataset.thumb)],t));const o=e.part("track").node;o.style.setProperty("--from",i?Pe(n[0],t):0),o.style.setProperty("--to",Pe(n[i?1:0],t));const a=n.map((l,u)=>r[u]||e.fromNumber(l)),c=e.part("output").node;c&&(c.textContent=i?a.join(" – "):a[0]),e.setVar("--slider-color",e.typeName==="color"&&a[0])},focus:s(e=>e.root.querySelector('input[type="range"]'),"focus")},jc={fits:s(e=>e.kind==="free"&&e.count==="single"&&e.steppable,"fits"),css:`
    ${bt}
    [part~="box"] { padding-inline: --space(tiny); }

    [part~="input"] {
      appearance  : textfield;
      flex        : 1 1 auto;
      inline-size : 100%;
      text-align  : center;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button { appearance: none; margin: 0; }
    }

    [part~="button"] {
      block-size    : 1.75em;
      border-radius : --radius();
      inline-size   : 1.75em;

      &:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
    }
  `,render:s(e=>b`
    <button type="button" part="button decrement" data-step="-1" aria-label="less" tabindex="-1"><svg-icon icon="lucide:minus"></svg-icon></button>
    ${At(e)}
    <button type="button" part="button increment" data-step="1" aria-label="more" tabindex="-1"><svg-icon icon="lucide:plus"></svg-icon></button>
  `,"render"),events(e,t){ve(e,t),t.on("click","[data-step]",(n,r)=>e.step(Number(r.dataset.step))),t.$(e.root).on("keydown",n=>{n.key!=="ArrowUp"&&n.key!=="ArrowDown"||(n.preventDefault(),e.step(n.key==="ArrowUp"?1:-1))})},update:we,focus:Dn},Pc={fits:s(e=>e.kind==="free"&&e.count==="single"&&e.type==="color","fits"),css:`
    ${bt}
    [part~="box"] { padding-inline-start: --space(tiny); }

    [part~="swatch"] {
      background    : var(--swatch, transparent);
      block-size    : 1.6em;
      border        : var(--input-line);
      border-radius : calc(--radius() * 0.75);
      flex          : none;
      inline-size   : 1.6em;
      overflow      : hidden;
      position      : relative;

      > input { cursor: pointer; inset: 0; opacity: 0; position: absolute; }
    }

    [part~="input"] { flex: 1 1 auto; font-variant-numeric: tabular-nums; inline-size: 7ch; }
  `,render:s(e=>b`
    <span part="swatch"><input type="color" data-index="0" aria-label="pick a color" /></span>
    ${At(e,0,{spellcheck:!1,type:"text"})}
  `,"render"),events:ve,update(e){we(e),e.setVar("--swatch",e.valueType.format(e.value))},focus:s(e=>e.part("input").node,"focus")},Dc={fits:Rn,events:jn,update:Pn,css:`
    :host {
      --switch-size : 1.25em;
      --switch-pad  : 0.15em;
    }

    [part~="track"] {
      background    : color-mix(in srgb, currentColor 25%, transparent);
      block-size    : var(--switch-size);
      border-radius : var(--switch-size);
      flex          : none;
      inline-size   : calc(var(--switch-size) * 1.8);
      position      : relative;
      transition    : background 0.15s ease;
    }

    [part~="thumb"] {
      background         : var(--color-bg, Canvas);
      block-size         : calc(var(--switch-size) - 2 * var(--switch-pad));
      border-radius      : 50%;
      inline-size        : calc(var(--switch-size) - 2 * var(--switch-pad));
      inset-block-start  : var(--switch-pad);
      inset-inline-start : var(--switch-pad);
      position           : absolute;
      transition         : translate 0.15s ease;
    }

    [part~="checked"] [part~="track"] { background: var(--color-ink, AccentColor); }
    [part~="checked"] [part~="thumb"] { translate: calc(var(--switch-size) * 0.8) 0; }
  `,render:s(e=>Nn(e,b`<span part="track"><span part="thumb"></span></span>`,"switch"),"render"),focus:s(e=>e.part("control").node,"focus")},Vn={button:nc,checkbox:rc,chips:ic,combobox:lc,cycle:dc,field:wc,fields:kc,grid:Oc,pattern:zc,radio:Lc,segments:Cc,slider:Nc,stepper:jc,swatch:Pc,switch:Dc},Ic=["field","fields","chips","combobox","switch"];function Mc(e,...t){for(const n of[...t,...Ic])if(n&&Vn[n]?.fits(e))return n;return"field"}s(Mc,"lookFor");const De=new Map;function Vc(e){if(!De.has(e)){const t=new CSSStyleSheet;t.replaceSync(vi(Vn[e].css)),t.isLookSheet=!0,De.set(e,t)}return De.get(e)}s(Vc,"sheetOf");const wr="https://esm.sh/",kr={marked:"marked@11.1.1",papaparse:"papaparse@5.4.1",yaml:"yaml@2.3.4"},Bt=new Map,qt=new Map;function Ze(e){if(!Bt.has(e)){let t=wr+kr[e];try{t=import.meta.resolve?.(e)??t}catch{}const n=import(t).catch(()=>import(wr+kr[e]));n.catch(()=>Bt.delete(e)),Bt.set(e,n)}return Bt.get(e)}s(Ze,"vendor");const Bc=/"(?:[^"\\]|\\.)*"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|,(?=\s*[}\]])/g,ti=s(e=>/\.([a-z0-9]+)$/i.exec(new URL(e,document.baseURI).pathname)?.[1].toLowerCase()??"","extensionOf");async function qc(e){return(await Ze("marked")).marked.parse(e)}s(qc,"renderMD");const Uc={csv:s(async(e,t)=>(await Ze("papaparse")).default.parse(e,{delimiter:ti(t)==="tsv"?"	":void 0,dynamicTyping:!0,header:!0,skipEmptyLines:!0}).data,"csv"),json:s(e=>JSON.parse(e),"json"),jsonc:s(e=>JSON.parse(e.replace(Bc,t=>t[0]==='"'?t:"")),"jsonc"),md:s(e=>qc(e),"md"),yaml:s(async e=>(await Ze("yaml")).default.parse(e),"yaml")},Fc={tsv:"csv",yml:"yaml"};async function Hc(e){const t=await fetch(e);if(!t.ok)throw new Error(`[@aufbau/elements] ${e}: ${t.status} ${t.statusText}`);const n=await t.text(),r=ti(e),i=Uc[Fc[r]??r];return i?i(n,e):n}s(Hc,"load");function Jc(e){const t=new URL(e,document.baseURI).href;if(!qt.has(t)){const n=Hc(t);n.catch(()=>qt.delete(t)),qt.set(t,n)}return qt.get(t)}s(Jc,"importFile");const Wc=s(e=>e.closest("[lang]")?.lang||document.documentElement.lang||navigator.language,"localeOf");function _t(e,t,n={}){try{return new Intl.DisplayNames([e],{fallback:"code",type:t,...n})}catch{return null}}s(_t,"displayNames");function Tt(e,t){try{return e?.of(t)??t}catch{return t}}s(Tt,"nameOf");const Kc="input-option, option";function Gc(e){return tn(e)?e:en(e)?e.items??e.data??e.results??Object.values(e):[]}s(Gc,"unwrap");function Zc(e,{key:t="value",labelKey:n="label"}={}){if(!en(e)){const o=e==null?"":String(e);return{disabled:!1,icon:null,label:o,value:o}}const r=e[t]??e.value??e.name??Object.values(e)[0]??"",i=e[n]??e.label??e.name??r;return{disabled:!!e.disabled,icon:e.icon??null,label:String(i),value:String(r)}}s(Zc,"toOption");function Yc(e,t){return Gc(e).map(n=>Zc(n,t))}s(Yc,"normalizeOptions");function Xc(e){const t=[];for(const n of e.querySelectorAll(Kc)){const r=n.getAttribute("label")??n.textContent.trim();t.push({disabled:n.hasAttribute("disabled"),icon:n.getAttribute("icon"),label:r,selected:n.hasAttribute("selected"),value:n.getAttribute("value")??r})}return t}s(Xc,"readOptions");class Qc{static{s(this,"OptionSource")}constructor(t,n){this.host=t,this.onChange=n,this.query="",this.fetched=[],this.listed=[]}get all(){return[...Xc(this.host),...this.fetched,...this.listed]}refresh(){this.refreshSrc(),this.refreshList()}search(t){this.query=String(t??"").trim(),this.refreshList()}refreshSrc(){const t=this.host.getAttribute("src");if(t===this.src||(this.src=t,this.fetched=[],!t))return;const n=s(r=>{this.src===t&&(this.fetched=r,this.onChange())},"done");Jc(t).then(r=>n(Yc(r))).catch(r=>{console.warn(`[${this.host.localName}] could not load options from "${t}":`,r),n([])})}refreshList(){const t=this.host,n=t.valueType;if(!n.list){this.key="",this.listed=[];return}const r=Wc(t),i=[t.typeName,r,this.query];for(const c of n.attributes??[])i.push(t.getAttribute(c));const o=i.join("|");if(o===this.key)return;this.key=o;const a=s(c=>{this.key===o&&(this.listed=c,this.onChange())},"done");Promise.resolve(n.list.entries(t,r,this.query)).then(a).catch(c=>{console.warn(`[${t.localName}] could not build the ${t.typeName} list:`,c),a([])})}}const tl={...E,input:"checkbox",look:"switch",parse:s(e=>e==="true","parse"),format:s(e=>e===!0||e==="true"?"true":"","format")},el=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i,Ye=s(e=>{const t=String(e??"").trim().match(el);if(!t)return null;const n=t[1];return"#"+(n.length===3?[...n].map(r=>r+r).join(""):n).toLowerCase()},"toHex"),nl=s(e=>{const t=Ye(e)??"#000000";return[1,3,5].map(n=>parseInt(t.slice(n,n+2),16))},"channels");function ei(e){const[t,n,r]=nl(e).map(u=>u/255),i=Math.max(t,n,r),o=Math.min(t,n,r),a=(i+o)/2,c=i-o;return c?[((i===t?(n-r)/c%6:i===n?(r-t)/c+2:(t-n)/c+4)*60+360)%360,c/(1-Math.abs(2*a-1)),a]:[0,0,a]}s(ei,"hslOf");function rl(e,t,n){const r=(1-Math.abs(2*n-1))*t,i=(e%360+360)%360/60,o=r*(1-Math.abs(i%2-1)),a=n-r/2,[c,l,u]=i<1?[r,o,0]:i<2?[o,r,0]:i<3?[0,r,o]:i<4?[0,o,r]:i<5?[o,0,r]:[r,0,o];return"#"+[c,l,u].map(p=>Math.round((p+a)*255).toString(16).padStart(2,"0")).join("")}s(rl,"fromHsl");const sl=s(e=>ei(e)[0],"hueOf"),il=s((e,t)=>{const[,n,r]=t?ei(t):[0,1,.5];return rl(e,n||1,r||.5)},"fromHue"),ol={...E,icon:"lucide:palette",input:"color",look:"swatch",parse:s(e=>Ye(e)??"#000000","parse"),format:s(e=>Ye(e)??"#000000","format"),steppable:!1,axis:{bounds:[0,360],fromNumber:il,step:1,toNumber:sl}},ct=s((e,t)=>e?.trim()?e.trim().split(/\s+/):t,"listOf"),se=s((e,t)=>e.getAttribute(t)!=="false","enabled"),yt=s(e=>(t,n)=>t.label.localeCompare(n.label,e),"byLabel"),H=s(({attributes:e=[],entries:t,icon:n=null,look:r="combobox",placeholder:i,query:o=!1})=>({...E,attributes:e,icon:n,list:{entries:t,query:o},look:r,placeholder:i}),"listType");function Xe(e,t,n){const r=e.value;if(!r)return t;const i=t.filter(o=>o.value!==r);return[n(r),...i]}s(Xe,"withCurrent");const al=H({attributes:["countries","flags"],icon:"lucide:map-pin",placeholder:"country…",async entries(e,t){const{REGIONS:n}=await g(async()=>{const{REGIONS:o}=await import("./regions-wXqKeTwC.js");return{REGIONS:o}},[],import.meta.url),r=_t(t,"region"),i=se(e,"flags");return ct(e.getAttribute("countries"),n).map(o=>o.toUpperCase()).map(o=>({icon:i&&`circle-flags:${o.toLowerCase()}`,label:Tt(r,o),value:o})).sort(yt(t))}}),cl=Intl.supportedValuesOf?.("currency")??[],ll=H({attributes:["currencies"],icon:"lucide:coins",placeholder:"currency…",entries(e,t){const n=_t(t,"currency");return ct(e.getAttribute("currencies"),cl).map(r=>r.toUpperCase()).map(r=>{const i=Tt(n,r);return{label:i===r?r:`${i} (${r})`,value:r}}).sort(yt(t))}}),zt=6e4,St=864e5,xr=s(e=>String(e).padStart(2,"0"),"pad$1"),ul=s(e=>{if(e==null||e==="")return null;const[t=0,n=0,r=0]=String(e).split(":").map(Number),i=(t*60+n)*zt+r*1e3;return Number.isFinite(i)?i:null},"parseClock"),dl=s(e=>{const t=(e%St+St)%St;return`${xr(Math.floor(t/36e5))}:${xr(Math.floor(t/zt)%60)}`},"formatClock"),pl={...E,icon:"lucide:clock",input:"time",parse:ul,format:s(e=>e==null?"":dl(e),"format"),axis:{bounds:[0,St-zt],fromNumber:s(e=>e,"fromNumber"),step:zt,toNumber:s(e=>e??0,"toNumber")}},ni=s(e=>{if(e==null||e==="")return null;const t=e instanceof Date?e:new Date(String(e));return Number.isNaN(t.getTime())?null:t.getTime()},"parseStamp"),hl={...E,icon:"lucide:calendar",input:"date",parse:ni,format:s(e=>e==null?"":new Date(e).toISOString().slice(0,10),"format"),axis:{bounds:null,fromNumber:s(e=>e,"fromNumber"),step:St,toNumber:s(e=>e??0,"toNumber")}},Ut=s(e=>String(e).padStart(2,"0"),"pad"),fl=s(e=>{const t=new Date(e);return`${t.getFullYear()}-${Ut(t.getMonth()+1)}-${Ut(t.getDate())}T${Ut(t.getHours())}:${Ut(t.getMinutes())}`},"formatStamp"),ml={...E,icon:"lucide:calendar-clock",input:"datetime-local",parse:ni,format:s(e=>e==null?"":fl(e),"format"),axis:{bounds:null,fromNumber:s(e=>e,"fromNumber"),step:zt,toNumber:s(e=>e??0,"toNumber")}},ri=/^\s*(-?\d*\.?\d+)\s*([a-z]*)\s*$/i,gl=s(e=>{const t=ri.exec(String(e??""));return t?Number(t[1]):null},"amountOf"),bl=s(e=>ri.exec(String(e??""))?.[2]||"s","unitOf"),yl={...E,icon:"lucide:timer",parse:gl,format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[0,10],fromNumber:s((e,t)=>`${e}${bl(t)}`,"fromNumber"),step:.1,toNumber:s(e=>e??0,"toNumber")}},vl={...E,icon:"lucide:mail",input:"email"};function wl(e,t){const n=e.split(/[\s-]+/);return t.every(r=>n.some(i=>i.startsWith(r)))}s(wl,"matches");const Sr=s(e=>({label:e,value:e}),"entryOf$1"),kl=H({attributes:["limit"],icon:"lucide:smile",look:"grid",placeholder:"search emoji…",query:!0,async entries(e,t,n){const{EMOJI:r}=await g(async()=>{const{EMOJI:c}=await import("./emoji-DfQ28uUz.js");return{EMOJI:c}},[],import.meta.url),i=n.toLowerCase().split(/\s+/).filter(Boolean),o=Number(e.getAttribute("limit")??120),a=[];for(const{emoji:c,name:l}of r){if(a.length>=o)break;wl(l,i)&&a.push(Sr(c))}return Xe(e,a,Sr)}}),xl=H({attributes:["categories"],icon:"lucide:type",placeholder:"font…",async entries(e,t){const{fonts:n}=await g(async()=>{const{fonts:i}=await import("./index-UEOQAGj5.js");return{fonts:i}},[],import.meta.url),r=ct(e.getAttribute("categories"),null);return n.filter(i=>!r||r.includes(i.category)).map(i=>({label:i.name,value:i.id})).sort(yt(t))}}),Sl=["Control","Alt","Shift","Meta"],Ol={" ":"Space",Escape:"Esc"};function $l(e){if(/^Key[A-Z]$/.test(e.code))return e.code.slice(3);if(/^Digit\d$/.test(e.code))return e.code.slice(5);const t=Ol[e.key]??e.key;return t.length===1?t.toUpperCase():t}s($l,"keyOf");function El(e){return Sl.includes(e.key)?null:[e.ctrlKey&&"Ctrl",e.altKey&&"Alt",e.shiftKey&&"Shift",e.metaKey&&"Meta",$l(e)].filter(Boolean).join("+")}s(El,"hotkeyOf");const Or=s(e=>!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey,"bare"),Al={...E,icon:"lucide:keyboard",placeholder:"press a key…",setup(e,t){t.$(e.root).on("beforeinput",n=>n.preventDefault(),{capture:!0}),t.$(e.root).on("keydown",n=>{if(e.isLocked||n.target.localName!=="input"||n.key==="Tab"&&Or(n))return;if(n.preventDefault(),(n.key==="Backspace"||n.key==="Delete")&&Or(n))return e.setValue("");const r=El(n);r&&e.setValue(r)})}},_l="https://api.iconify.design/search",Ie=s(e=>({icon:e,label:e,value:e}),"entryOf");async function Tl(e,{limit:t,prefixes:n}){const r=new URLSearchParams({limit:String(t),query:e});n?.trim()&&r.set("prefixes",n.trim().split(/\s+/).join(","));const i=await fetch(`${_l}?${r}`);if(!i.ok)throw new Error(`${i.status} ${i.statusText}`);const{icons:o=[]}=await i.json();return o}s(Tl,"search$1");const zl=H({attributes:["limit","prefixes"],icon:"lucide:shapes",look:"grid",placeholder:"search icons…",query:!0,async entries(e,t,n){if(!n)return Xe(e,[],Ie);const r=Number(e.getAttribute("limit")??64),i=e.getAttribute("prefixes"),o=await Tl(n,{limit:r,prefixes:i});return Xe(e,o.map(Ie),Ie)}}),Ll=H({attributes:["flags","languages","native"],icon:"lucide:languages",placeholder:"language…",async entries(e,t){const{LANGUAGES:n}=await g(async()=>{const{LANGUAGES:a}=await import("./languages-DOQNiPjJ.js");return{LANGUAGES:a}},[],import.meta.url),r=_t(t,"language"),i=se(e,"flags"),o=se(e,"native");return ct(e.getAttribute("languages"),n).map(a=>{const c=Tt(r,a),l=o?Tt(_t(a,"language"),a):null;return{icon:i&&`circle-flags:lang-${a.split("-")[0].toLowerCase()}`,label:l&&l!==c?`${c} (${l})`:c,value:a}}).sort(yt(t))}}),Cl=s(e=>{try{return new Intl.Locale(e).region??null}catch{return null}},"regionOf"),Rl=H({attributes:["flags","locales"],icon:"lucide:globe",placeholder:"locale…",async entries(e,t){const{LOCALES:n}=await g(async()=>{const{LOCALES:o}=await import("./locales-DO6ndLPH.js");return{LOCALES:o}},[],import.meta.url),r=_t(t,"language",{languageDisplay:"standard"}),i=se(e,"flags");return ct(e.getAttribute("locales"),n).map(o=>{const a=Cl(o);return{icon:i&&a&&`circle-flags:${a.toLowerCase()}`,label:Tt(r,o),value:o}}).sort(yt(t))}}),Nl={...E,input:"number",parse:s(e=>{const t=parseFloat(e);return Number.isNaN(t)?null:t},"parse"),format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[0,100],fromNumber:s(e=>e,"fromNumber"),step:1,toNumber:s(e=>e??0,"toNumber")}},jl={...E,actions:"reveal",icon:"lucide:lock",input:"password"},Pl={...E,icon:"lucide:phone",input:"tel"},Dl={...E,actions:"clear",attributes:["debounce"],icon:"lucide:search",input:"search",placeholder:"search…",setup(e,t){const n=Ys(()=>e.emit("search",{query:e.value}),Number(e.getAttribute("debounce")??250));e.track(n.cancel),t.on("input",n)}},Il={ä:"ae",ö:"oe",ß:"ss",ü:"ue"},$r=s(e=>String(e??"").toLowerCase().replace(/[äöüß]/g,t=>Il[t]).normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),"slugify");function Ml(e){const t=e.getAttribute("source");return t?(e.closest("form")??document).querySelector(t)??document.querySelector(t):null}s(Ml,"sourceOf");const Vl={...E,attributes:["source"],icon:"lucide:link-2",normalize:$r,setup(e,t){let n=!1;t.$(e.root).on("keydown",i=>{i.key!=="Tab"&&(n=!0)});const r=Ml(e);r&&t.$(r).on("input",()=>{n||e.setValue($r(r.value))})}},Bl=Intl.supportedValuesOf?.("timeZone")??[];function ql(e,t){try{return new Intl.DateTimeFormat(t,{timeZone:e,timeZoneName:"shortOffset"}).formatToParts(new Date).find(r=>r.type==="timeZoneName")?.value??""}catch{return""}}s(ql,"offsetOf");const Ul=H({attributes:["zones"],icon:"lucide:earth",placeholder:"time zone…",entries(e,t){return ct(e.getAttribute("zones"),Bl).map(n=>{const r=ql(n,t),i=n.replaceAll("_"," ");return{label:r?`${i} (${r})`:i,value:n}})}}),Fl=Intl.supportedValuesOf?.("unit")??[];function Hl(e,t){const n=s(o=>{try{return new Intl.NumberFormat(t,{style:"unit",unit:e,unitDisplay:o}).formatToParts(2).filter(c=>c.type==="unit").map(c=>c.value).join(" ").trim()}catch{return""}},"name"),r=n("long")||e,i=n("short");return i&&i!==r?`${r} (${i})`:r}s(Hl,"labelOf");const Jl=H({attributes:["units"],icon:"lucide:ruler",placeholder:"unit…",entries(e,t){return ct(e.getAttribute("units"),Fl).map(n=>({label:Hl(n,t),value:n})).sort(yt(t))}}),Wl=/^[a-z][a-z0-9+.-]*:/i,Kl=s(e=>{const t=String(e??"").trim();return!t||Wl.test(t)?t:`https://${t.replace(/^\/+/,"")}`},"normalizeUrl"),Gl={...E,icon:"lucide:link",input:"url",normalize:Kl},Zl={...E,icon:"lucide:calendar",input:"number",look:"stepper",parse:s(e=>{const t=parseInt(e,10);return Number.isNaN(t)?null:t},"parse"),format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[1900,2100],fromNumber:s(e=>Math.round(e),"fromNumber"),step:1,toNumber:s(e=>e??0,"toNumber")}},si={bool:tl,color:ol,country:al,currency:ll,date:hl,datetime:ml,duration:yl,email:vl,emoji:kl,font:xl,hotkey:Al,icon:zl,language:Ll,locale:Rl,number:Nl,password:jl,pattern:Qs,phone:Pl,search:Dl,slug:Vl,text:E,time:pl,timezone:Ul,unit:Jl,url:Gl,year:Zl},Yl=Object.fromEntries(Object.values(si).flatMap(e=>e.attributes??[]).map(e=>[e,String])),Xl=s(e=>si[e]??E,"typeOf"),Qe={multiple:",",range:".."};function Ql(e,t){const n=e??"";if(t==="single")return[n];const r=n?n.split(Qe[t]).map(i=>i.trim()):[];return t==="range"?[r[0]??"",r[1]??""]:r.filter(Boolean)}s(Ql,"splitValue");function tu(e,t){return t==="single"?e[0]??"":t==="range"?e.some(Boolean)?e.map(n=>n??"").join(Qe.range):"":e.filter(Boolean).join(Qe.multiple)}s(tu,"joinValue");const eu=`
  :host {
    --input-line    : var(--border-width, 1px) solid color-mix(in srgb, currentColor 25%, transparent);

    box-sizing      : border-box;
    color           : inherit;
    display         : inline-flex;
    font            : inherit;
    min-inline-size : 0;
    vertical-align  : middle;
  }

  :host([hidden])           { display: none; }
  :host(:state(disabled))   { opacity: 0.5; pointer-events: none; }

  *, *::before, *::after    { box-sizing: border-box; }
  [hidden]                  { display: none !important; }
  :focus                    { outline: none; }
  :focus-visible            { outline: 2px solid var(--color-ink, Highlight); outline-offset: 2px; }
  input:focus-visible       { outline: none; }
  svg-icon                  { flex: none; }

  [part~="box"] {
    align-items     : center;
    display         : flex;
    flex            : 1 1 auto;
    gap             : var(--input-gap, --space(small));
    min-inline-size : 0;
  }

  button {
    align-items : center;
    background  : none;
    border      : 0;
    color       : inherit;
    cursor      : pointer;
    display     : inline-flex;
    font        : inherit;
    margin      : 0;
    padding     : 0;
    appearance      : none;
    flex            : none;
    gap             : --space(small);
    justify-content : center;
  }

  input {
    background      : none;
    border          : 0;
    color           : inherit;
    font            : inherit;
    margin          : 0;
    min-inline-size : 0;
    padding         : 0;
    &::-webkit-search-cancel-button { appearance: none; }
  }
`;class Bn extends wi{static{s(this,"Input")}static shadow={delegatesFocus:!0};static attr={...Yl,actions:String,autocomplete:String,icon:String,iconChecked:String,iconsOnly:Boolean,look:String,max:String,maxlength:Number,min:String,minlength:Number,multiple:Boolean,pattern:String,placeholder:String,range:Boolean,readout:{type:Boolean,default:!0},searchable:Boolean,src:String,step:Number,type:String,unit:String};static styles=eu;static type=null;constructor(){super(),this.source=new Qc(this,()=>this.update())}get typeName(){return this.constructor.type??this.getAttr("type")??"text"}get valueType(){return Xl(this.typeName)}get type(){return this.typeName==="bool"?"checkbox":this.typeName}get count(){return this.typeName==="bool"?"single":this.getAttr("multiple")?"multiple":this.getAttr("range")&&!this.isList?"range":"single"}get options(){return this.source.all}get isList(){return!!(this.valueType.list||this.getAttr("src")||this.options.length)}get kind(){return this.typeName==="bool"?"bool":this.isList?"list":"free"}get shape(){const t=this.valueType;return{axis:!!t.axis,count:this.count,kind:this.kind,steppable:!!t.axis&&t.steppable!==!1,type:this.typeName}}get askedLook(){return this._ownLook?null:this.getAttribute("look")}get look(){return Mc(this.shape,this.askedLook,this.valueType.look)}get lookModule(){return Vn[this.look]}reflectAttrs(){if(super.reflectAttrs(),this.getAttribute("look")!==null&&!this._ownLook)return this;const t=this.look;if(this._ownLook=!0,this.getAttribute("look")===t)return this;this._reflecting=!0;try{this.setAttribute("look",t)}finally{this._reflecting=!1}return this}onAttributeChanged(t){t==="look"&&(this._ownLook=!1)}adoptLook(){const t=Vc(this.look),n=this.shadowRoot;n.adoptedStyleSheets.includes(t)||(n.adoptedStyleSheets=[...n.adoptedStyleSheets.filter(r=>!r.isLookSheet),t])}bindWhile(t,n,r){const i=this._bound??={};if(i[t]?.key===n)return;i[t]?.controller.abort();const o=new AbortController;i[t]={key:n,controller:o},r?.(this.self.until(o.signal))}get values(){return Ql(this.getAttribute("value"),this.count)}parseValue(t){return t==null?"":String(t)}formatValue(t){return tn(t)?tu(t,this.count):t==null?"":String(t)}get typedValue(){const t=this.valueType,n=this.values.map(r=>r===""?null:t.parse(r));return this.count==="single"?n[0]:n}get formValue(){if(this.count!=="multiple")return super.formValue;const t=this.getAttr("name"),n=this.values;if(!n.length)return null;if(!t)return this.value;const r=new FormData;for(const i of n)r.append(t,i);return r}get isLocked(){return this.disabled||!!this.getAttr("readonly")}setValue(t){return this.isLocked?this:this.commit(t)}setPart(t,n,{final:r=!1}={}){const i=this.values;return i[t]=r?this.normalize(n):String(n??""),this.setValue(r&&this.count==="range"?this.order(i):i)}normalize(t){const n=String(t??"").trim();return this.valueType.normalize?.(n)??n}order(t){const[n,r]=t;return n&&r&&this.toNumber(n)>this.toNumber(r)?[r,n]:t}add(t){const n=this.normalize(String(t??"").replaceAll(","," "));return n&&!this.values.includes(n)?this.setValue([...this.values,n]):this}removeAt(t){return this.setValue(this.values.filter((n,r)=>r!==t))}toNumber(t){const n=this.valueType;return n.axis.toNumber(n.parse(t))}fromNumber(t,n){const r=this.valueType;return r.format(r.axis.fromNumber(t,n))}get limits(){const{max:t,min:n}=this.getAttr();return[n===void 0?-1/0:this.toNumber(n),t===void 0?1/0:this.toNumber(t)]}get bounds(){const[t,n]=this.valueType.axis?.bounds??[0,100],{max:r,min:i}=this.getAttr();return[i===void 0?t:this.toNumber(i),r===void 0?n:this.toNumber(r)]}get stepSize(){return this.getAttr("step")||this.valueType.axis?.step||1}setNumber(t,n,{track:r=!1}={}){const[i,o]=r?this.bounds:this.limits,a=this.values;return a[t]=this.fromNumber(Math.min(o,Math.max(i,Number(n)||0)),a[t]),this.count==="range"&&(a[0]||=this.fromNumber(this.bounds[0]),a[1]||=this.fromNumber(this.bounds[1])),this.setValue(this.count==="range"?this.order(a):a)}step(t,n=0){const r=this.values[n]??"",[i]=this.limits,o=r===""?Number.isFinite(i)?i:0:this.toNumber(r);return this.setNumber(n,o+t*this.stepSize)}get selected(){return new Set(this.values.filter(Boolean))}select(t){if(this.count!=="multiple")return this.setValue(t);const n=this.selected;return n.has(t)?n.delete(t):n.add(t),this.setValue([...n])}cycle(t=1){const n=this.options.filter(o=>!o.disabled);if(!n.length)return this;const r=n.findIndex(o=>o.value===this.value),i=r<0?t>0?-1:0:r;return this.select(n[((i+t)%n.length+n.length)%n.length].value)}get checked(){return this.getAttribute("value")==="true"}set checked(t){this.commit(t?"true":"",{notify:!1})}toggle(){return this.setValue(this.checked?"":"true")}get actions(){return this.getAttr("actions")??this.valueType.actions??""}get placeholder(){return this.getAttr("placeholder")??this.valueType.placeholder??""}get iconName(){const t=this.getAttr("icon");return t==="false"?null:t||this.valueType.icon||null}actionText(){return this.value}actionTarget(){return this.isLocked?null:this.focusTarget}revealTarget(){return this.focusTarget}get focusTarget(){return this.lookModule?.focus?.(this)??this.root.querySelector("input, button")}captureDefaults(){return this.typeName==="bool"&&this.hasAttribute("checked")&&!this.hasAttribute("value")&&this.setAttribute("value","true"),super.captureDefaults()}onConnected(){this.$(this.root).on("input beforeinput",n=>n.stopPropagation());const t=new MutationObserver(n=>{n.some(r=>r.target!==this)&&this.update()});if(t.observe(this,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["value","label","icon","disabled","selected"]}),this.track(()=>t.disconnect()),!this.hasAttribute("value")){const n=this.options.filter(r=>r.selected).map(r=>r.value);n.length&&(this.commit(this.count==="multiple"?n:n[0],{notify:!1}),this._defaultValue=this.getAttribute("value")??"")}}onDisconnected(){this._bound=null}update(){return this._mounted&&this.source.refresh(),super.update()}render(){return b`<div part="box">${this.lookModule.render(this)}</div>`}sync(){super.sync();const t=this.lookModule;this.adoptLook(),this.bindWhile("look",this.look,n=>t.events?.(this,n)),this.bindWhile("type",this.typeName,n=>this.valueType.setup?.(this,n)),this.internals&&(this.internals.role=t.role?.(this)??null),t.update?.(this)}}const nu={"input-bool":"bool","input-color":"color","input-country":"country","input-currency":"currency","input-date":"date","input-datetime":"datetime","input-duration":"duration","input-email":"email","input-emoji":"emoji","input-font":"font","input-hotkey":"hotkey","input-icon":"icon","input-language":"language","input-locale":"locale","input-number":"number","input-password":"password","input-pattern":"pattern","input-phone":"phone","input-search":"search","input-slug":"slug","input-text":"text","input-time":"time","input-timezone":"timezone","input-unit":"unit","input-url":"url","input-year":"year"},qn={"input-value":Bn};for(const[e,t]of Object.entries(nu))qn[e]=class extends Bn{static type=t};qn["input-chips"]=class extends Bn{static attr={multiple:{type:Boolean,default:!0},suggestions:String};static type="text";accept=null;suggest=null;transform=null;suggested=[];get suggestionList(){const e=String(this.getAttr("suggestions")??"").split(",").map(t=>t.trim()).filter(Boolean);return[...new Set([...e,...this.suggested])].filter(t=>!this.values.includes(t))}verdict(e){const t=this.getAttr("pattern");if(t&&!new RegExp(`^(?:${t})$`,"u").test(e))return"does not match the pattern";const n=this.accept?.(e)??!0;return n===!1?"not accepted":n}add(e){const t=String(e??"").replaceAll(","," ").trim(),n=this.normalize(this.transform?this.transform(t):t);if(!n)return this;const r=this.verdict(n);if(r!==!0){const i=this.part("input").node;return i?.setCustomValidity(String(r)),i?.reportValidity(),this.emit("input-chips-refused",{reason:r,text:n}),this}return super.add(n)}};for(const[e,t]of Object.entries(qn))t.init(e);const ru={add:{icon:"add",label:"add"},back:{icon:"arrow-left",label:"back"},bookmark:{icon:"bookmark",label:"bookmark"},cancel:{icon:"close",label:"cancel"},close:{icon:"close",label:"close"},collapse:{icon:"chevron-up",label:"collapse"},copy:{icon:"copy",label:"copy"},cut:{icon:"cut",label:"cut"},delete:{icon:"delete",label:"delete"},edit:{icon:"edit",label:"edit"},expand:{icon:"chevron-down",label:"expand"},export:{icon:"export",label:"export"},heart:{icon:"heart",label:"heart"},import:{icon:"import",label:"import"},menu:{icon:"menu",label:"menu"},more:{icon:"more",label:"more"},reset:{icon:"reset",label:"reset"},save:{icon:"save",label:"save"},search:{icon:"search",label:"search"},share:{icon:"share",label:"share"}};class ii extends L{static{s(this,"Btn")}static commands=ru;static formAssociated=!0;static internals={role:"button"};static shadow=!0;static attr={command:String,commandfor:String,disabled:Boolean,icon:String,label:String,type:{default:"button",values:["button","reset","submit"]}};static styles=`
    :host {
      align-items     : center;
      border-radius   : var(--btn-radius, 0.375em);
      cursor          : pointer;
      display         : inline-flex;
      gap             : --space(small);
      justify-content : center;
      line-height     : 1.2;
      user-select     : none;
    }

    :host(:hover)         { background-color: color-mix(in oklab, currentColor 8%, var(--btn-background, transparent)); }
    :host(:focus-visible) { outline: 2px solid color-mix(in oklab, currentColor 55%, transparent); outline-offset: 2px; }
    :host([disabled])     { cursor: not-allowed; opacity: 0.5; }

    svg-icon { flex: none; }
  `;get form(){return this.internals?.form??null}get preset(){return this.constructor.commands[this.getAttr("command")]??{}}get iconName(){return this.getAttr("icon")??this.preset.icon}get labelText(){return this.getAttr("label")??this.preset.label??""}get method(){return Si(this.getAttr("command")?.replace(/^--/,"")??"")}get commandTarget(){const t=this.getAttr("commandfor");if(t)return document.getElementById(t)??this.getRootNode().querySelector?.(t)??document.querySelector(t);for(let n=this.parentElement??this.getRootNode().host;n;n=n.parentElement??n.getRootNode().host)if(Ve(n[this.method]))return n;return null}run(){const t=this.getAttr("command"),n=t&&this.commandTarget;if(!n)return;if(Ve(n[this.method]))return n[this.method]();const r=typeof CommandEvent=="function"?new CommandEvent("command",{cancelable:!0,command:t,source:this}):new CustomEvent("command",{cancelable:!0,detail:{command:t,source:this}});n.dispatchEvent(r)}onConnected(){this.on("click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},{capture:!0}),this.on("click",t=>{if(t.defaultPrevented)return;const n=this.getAttr("type");n==="submit"&&this.form?.requestSubmit(),n==="reset"&&this.form?.reset(),this.run()}),this.on("keydown",t=>{t.target===this&&(t.key==="Enter"&&(t.preventDefault(),this.click()),t.key===" "&&t.preventDefault())}),this.on("keyup",t=>{t.target===this&&t.key===" "&&this.click()})}render(){const t=this.iconName;return b`
      ${t&&b`<svg-icon part="icon" icon="${t}"></svg-icon>`}
      <span part="label"><slot>${this.labelText}</slot></span>
    `}sync(){this.internals&&(this.internals.ariaDisabled=String(this.disabled)),this.tabIndex=this.disabled?-1:0}}class su extends ii{static{s(this,"BtnIcon")}static styles=`
    :host {
      aspect-ratio : 1;
      font-size    : var(--btn-icon-size, 1.15em);
      padding      : var(--btn-padding, --space(tiny));
    }

    [part="label"] { display: none; }
  `;render(){return b`<svg-icon part="icon" icon="${this.iconName??""}"></svg-icon><span part="label"><slot></slot></span>`}sync(){super.sync(),this.internals&&(this.internals.ariaLabel=this.getAttr("label")??(this.textContent.trim()||this.preset.label)??null)}}su.init();class iu extends ii{static{s(this,"BtnPush")}static reflect=["variant"];static attr={variant:"default"};static styles=`
    :host {
      --btn-background : color-mix(in oklab, currentColor 12%, transparent);

      background-color : var(--btn-background);
      padding          : var(--btn-padding, --space(small));
    }
  `}iu.init();const ou={circle:"50%",square:"0px",rounded:"12px",squircle:"24% / 50%"},oi=s(e=>e?ou[e]??e:"","resolveShape"),au=s(e=>/^[\d.]/.test(e)||/(px|rem|em|%|vw|vh|vmin|vmax|ch|fr|pt|cm|mm|in)$/.test(e),"isSize");function ai(e){const t={size:"",shape:""};if(!e)return t;for(const n of String(e).trim().split(/\s+/))n&&(au(n)?t.size=n:t.shape=n);return t}s(ai,"parseLook");const Me=s(e=>{const t=parseFloat(e);return Number.isFinite(t)?t:null},"parsePx"),cu=new Set(["item-look","item-shape","item-size","viewmode"]);class lu extends L{static{s(this,"DataIndex")}static reflect=["viewmode"];static attr={gap:{type:String,var:"--index-gap"},itemIntrinsicSize:String,itemLook:String,itemShape:String,itemSize:String,itemSizeMax:String,itemSizeMin:String,viewmode:{type:String,default:"grid",values:["grid","list","gallery","masonry"]}};static styles=`data-index {
    display               : grid;
    gap                   : var(--index-gap, --space(normal));
    grid-template-columns : repeat(auto-fill, minmax(var(--item-size, 200px), 1fr));
    inline-size           : 100%;

    &[viewmode="list"] {
      display        : flex;
      flex-direction : column;
    }

    &[viewmode="gallery"] {
      display           : flex;
      overflow-x        : auto;
      padding-block-end : --space(small);
      scroll-snap-type  : x mandatory;

      > * {
        flex              : 0 0 var(--item-size, 200px);
        scroll-snap-align : start;
      }
    }

    &[viewmode="masonry"] {
      column-gap   : var(--index-gap, --space(normal));
      column-width : var(--item-size, 200px);
      display      : block;

      > * {
        break-inside     : avoid;
        margin-block-end : var(--index-gap, --space(normal));
      }
    }

    &:is([item-shape="circle"], [item-shape="square"], [item-look~="circle"], [item-look~="square"]) > data-item {
      aspect-ratio: 1 / 1;
    }

    &[eager] data-item { content-visibility: visible; }

    &:state(relayout) data-item { contain-intrinsic-block-size: var(--item-intrinsic-size, var(--item-size, 200px)); }
  }`;constructor(){super(),this._samples={count:0,total:0}}render(){return null}onConnected(){this.syncResize(),this.on("contentvisibilityautostatechange",t=>{t.skipped||this.sample(t.target)},{capture:!0})}onDisconnected(){this._resize?.destroy(),this._resize=null}onAttributeChanged(t){(t==="item-size-min"||t==="item-size-max")&&this.syncResize(),(t==="item-size"||t==="item-look")&&(this._resizeValue=null),cu.has(t)&&this.relayout()}get learns(){return!this.getAttr("itemIntrinsicSize")}sample(t){!this.learns||t.localName!=="data-item"||t.hasAttribute("intrinsic-size")||t.parentElement?.closest("data-index")===this&&((this._pending??=new Set).add(t),!this._frame&&(this._frame=requestAnimationFrame(()=>{this._frame=null;for(const n of this._pending){const r=n.getBoundingClientRect().height;r>0&&(this._samples.count+=1,this._samples.total+=r)}this._pending.clear(),this.applyEstimate()})))}applyEstimate(){const{count:t,total:n}=this._samples;if(!t)return;const r=Math.round(n/t);Math.abs(r-(this._estimate??0))<1||(this._estimate=r,this.setVar("--item-intrinsic-size",`${r}px`))}relayout(){this._samples={count:0,total:0},this._estimate=null,this.learns&&this.setVar("--item-intrinsic-size",null),this.states.add("relayout"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.states.delete("relayout")))}async syncResize(){this._resize?.destroy(),this._resize=null;const t=Me(this.getAttr("itemSizeMin")),n=Me(this.getAttr("itemSizeMax")),r=this.getAttr("gestures")!=="false"&&t!=null&&n!=null&&n>t,i=this._resizeToken=(this._resizeToken??0)+1;if(!r){this._resizeValue=null;return}const{adjustable:o}=await g(async()=>{const{adjustable:c}=await import("./index-DIlYw3RB.js");return{adjustable:c}},[],import.meta.url);if(i!==this._resizeToken||!this._mounted)return;const a=this._resizeValue??Me(this.getAttr("itemSize"))??(t+n)/2;this._resize=o(this,{maximum:n,minimum:t,onChange:s(c=>{this._resizeValue=Math.round(c),this.setVar("--item-size",`${this._resizeValue}px`)},"onChange"),value:a}),this._resizeValue=this._resize.get(),this.setVar("--item-size",`${this._resizeValue}px`)}sync(){const{itemIntrinsicSize:t,itemLook:n,itemShape:r,itemSize:i}=this.getAttr(),o=ai(n),a=this._resizeValue!=null?`${this._resizeValue}px`:i||o.size;this.setVar({"--item-shape":oi(r||o.shape),"--item-size":a}),t?this.setVar("--item-intrinsic-size",t):this._estimate==null&&this.setVar("--item-intrinsic-size",null)}}lu.init();class uu extends L{static{s(this,"DataItem")}static attr={eager:Boolean,intrinsicSize:String,look:String,shape:String};static styles=`data-item {
    border-radius : var(--item-current-shape, var(--item-shape, 0px));
    box-sizing    : border-box;
    display       : block;
    overflow      : hidden;

    content-visibility           : auto;
    contain-intrinsic-block-size : auto var(--item-intrinsic-size, var(--item-size, 200px));

    transition-behavior : allow-discrete;

    &:is([shape="circle"], [shape="square"], [look~="circle"], [look~="square"]) { aspect-ratio: 1 / 1; }

    &[eager] { content-visibility: visible; }
  }`;render(){return null}sync(){const{intrinsicSize:t,look:n,shape:r}=this.getAttr();this.setVar({"--item-current-shape":oi(r||ai(n).shape),"--item-intrinsic-size":t})}}uu.init();class du extends L{static{s(this,"DivX")}static attr={scrollable:Boolean};static styles(){return`div-x {
      display        : flex;
      flex-direction : row;

      &[scrollable] {
        min-inline-size : 0;
        overflow-x      : auto;
      }
    }`}}du.init("div-x");class pu extends L{static{s(this,"DivY")}static attr={scrollable:Boolean};static styles(){return`div-y {
      display        : flex;
      flex-direction : column;
      min-height     : stretch;
      place-content  : safe center;

      &[scrollable] {
        min-block-size : 0;
        overflow-y     : auto;
      }
    }`}}pu.init("div-y");class hu extends L{static{s(this,"InputOption")}static attr={disabled:Boolean,icon:String,label:String,selected:Boolean,value:String};static styles="input-option { display: none; }";get label(){return this.getAttr("label")||this.textContent.trim()}get value(){return this.getAttribute("value")??this.label}render(){return null}}hu.init("input-option");class fu extends L{static{s(this,"NavCrumbs")}static internals={role:"navigation"};static attr={href:String,label:"breadcrumb",max:Number,path:String,root:String,separator:"/"};static styles=`nav-crumbs {
    align-items : center;
    display     : flex;
    flex-wrap   : nowrap;
    gap         : var(--crumbs-gap, --space(tiny));
    min-inline-size : 0;
    overflow    : hidden;

    > * {
      flex            : 0 1 auto;
      min-inline-size : 0;
      overflow        : hidden;
      text-overflow   : ellipsis;
      white-space     : nowrap;
    }

    > :last-child { flex-shrink: 0.2; }

    > * + *::before {
      content            : var(--crumbs-separator, '/');
      opacity            : 0.5;
      padding-inline-end : var(--crumbs-gap, --space(tiny));
    }

    > button {
      background : none;
      border     : 0;
      color      : inherit;
      cursor     : pointer;
      font       : inherit;
      margin     : 0;
      padding    : 0;
    }
  }`;get crumbs(){const{path:t,root:n,separator:r}=this.getAttr();if(t==null)return[];const i=String(t).split(r).filter(Boolean),o=String(t).startsWith(r)?r:"",a=i.map((c,l)=>({label:c,path:o+i.slice(0,l+1).join(r)}));return n?[{label:n,path:o||r},...a]:a}onConnected(){this.on("click","button[data-path]",(n,r)=>{const i=Number(r.dataset.index);this.emit("nav-crumbs",{index:i,path:r.dataset.path})}),this.on("click","button[data-expand]",()=>{this._expanded=!0,this.update()});const t=new MutationObserver(()=>this.sync());t.observe(this,{childList:!0}),this.track(()=>t.disconnect())}onAttributeChanged(t){t==="path"&&(this._expanded=!1)}render(){if(this.getAttr("path")==null)return null;const{href:t,max:n}=this.getAttr(),r=this.crumbs,i=r.length-1,a=n>1&&r.length>n&&!this._expanded?[r[0],null,...r.slice(r.length-(n-1))]:r,c=s(l=>{if(!l)return b`<button type="button" data-expand aria-label="show full path">…</button>`;const u=r.indexOf(l);return u===i?b`<span aria-current="page">${l.label}</span>`:t?b`<a href="${t.replaceAll("{path}",encodeURIComponent(l.path))}">${l.label}</a>`:b`<button type="button" ...${D({"data-index":u,"data-path":l.path})}>${l.label}</button>`},"crumb");return b`${a.map(c)}`}sync(){if(this.internals&&(this.internals.ariaLabel=this.getAttr("label")),this.getAttr("path")!=null)return;const t=[...this.children];t.forEach((n,r)=>{r===t.length-1?n.hasAttribute("aria-current")||n.setAttribute("aria-current","page"):n.getAttribute("aria-current")==="page"&&n.removeAttribute("aria-current")})}}fu.init();const Er="fallback",Ar=s((e,t)=>typeof e=="function"?e(t):e,"valueOf");function Un(e={}){const t=new Map;function n(i){if(t.has(i))return t.get(i);const o="is"+i.charAt(0).toUpperCase()+i.slice(1);if(t.has(o))return t.get(o);throw new TypeError(`unknown predicate: ${i}`)}s(n,"predicateOf");function r(...i){const o=i.length<2?i[0]:i[1],a=[];for(const[l,u]of Object.entries(o))l!==Er&&a.push([n(l),u]);const c=s(l=>{for(const[u,p]of a)if(u(l))return Ar(p,l);return Ar(o[Er],l)},"run");return i.length<2?c:c(i[0])}return s(r,"shift"),r.with=i=>{for(const[o,a]of Object.entries(i)){if(typeof a!="function")throw new TypeError(`not a predicate: ${o}`);t.set(o,a)}return r},Object.defineProperty(r,"predicates",{get:s(()=>Object.fromEntries(t),"get")}),r.with(e)}s(Un,"createShift");const mu=Un(xi);Un();const _r={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},gu=["error","warning","warn","success","info"],bu=.35,ci=s(e=>e instanceof Error||e!=null&&typeof e=="object"&&Kt(e.message)&&("stack"in e||"name"in e),"isErrorLike"),yu=Un(mu.predicates).with({isErrorLike:ci})({nullish:"",string:s(e=>e,"string"),errorLike:s(e=>e.message,"errorLike"),fallback:String});function vu(e,t={}){let n;if(ci(e))n={type:"error",message:e,...t};else if(!en(e))n={message:e,...t};else{const r=gu.find(i=>i in e);if(r){const{[r]:i,...o}=e;n={type:r,message:i,...o,...t}}else n={...e,...t}}return n.message=yu(n.message),n.type==="warn"&&(n.type="warning"),n}s(vu,"toToastOptions");const wu=`
  [data-pop-toasts] {
    background      : none;
    border          : 0;
    display         : flex;
    flex-direction  : column;
    gap             : --space(small);
    inset           : 1rem 1rem auto auto;
    margin          : 0;
    max-inline-size : min(24rem, calc(100vw - 2rem));
    overflow        : visible;
    padding         : 0;
    pointer-events  : none;
    position        : fixed;
    z-index         : var(--toast-z, 100);
  }
`;class tt extends L{static{s(this,"PopToast")}static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
    :host {
      align-items           : start;
      column-gap            : --space(small);
      display               : grid;
      grid-template-columns : auto 1fr auto;
      pointer-events        : auto;
    }

    :host([dismissible]) { touch-action: pan-y; }

    [part~="icon"] { grid-row: span 2; line-height: 1.4; }

    [part~="heading"],
    [part~="message"] {
      grid-column     : 2;
      min-inline-size : 0;
      overflow-wrap   : anywhere;
    }

    [part~="heading"] { font-weight: 600; }

    [part~="close"] {
      align-items : center;
      background  : none;
      border      : 0;
      color       : inherit;
      cursor      : pointer;
      display     : inline-flex;
      font        : inherit;
      margin      : 0;
      padding     : 0;
      grid-column : 3;
      grid-row    : 1 / span 2;
    }
  `;static get stack(){let t=document.querySelector("[data-pop-toasts]");return t||(t=document.createElement("section"),Wn(t,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(t)),t}static notify(t,n){const{dismissible:r=!0,duration:i,heading:o,icon:a,message:c,title:l,type:u}=vu(t,n),p=document.createElement("pop-toast"),d=this.stack;return Wn(p,{dismissible:r,duration:i,heading:o??l,icon:a,message:c,type:u}),d.append(p),d.showPopover&&(d.matches(":popover-open")&&d.hidePopover(),d.showPopover()),p}static error(t,n){return this.notify(t,{...n,type:"error"})}static info(t,n){return this.notify(t,{...n,type:"info"})}static success(t,n){return this.notify(t,{...n,type:"success"})}static warning(t,n){return this.notify(t,{...n,type:"warning"})}static warn(t,n){return this.warning(t,n)}onConnected(){ki("pop-toast-stack",wu),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(t=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const n=s(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return n(),this;const r=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:r},{opacity:0,translate:`${t*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(n,n),this}onSwipe(){let t=null,n=0;this.on("pointerdown",i=>{!this.getAttr("dismissible")||i.pointerType==="mouse"||i.composedPath().some(o=>o.localName==="button")||this.getAttr("gestures")!=="false"&&(t=i.clientX,n=0,this.stopTimer())}),this.$(window).on("pointermove",i=>{t!=null&&(n=i.clientX-t,this.style.translate=`${n}px 0`,this.style.opacity=String(1-Math.min(Math.abs(n)/this.offsetWidth,1)*.6))},{passive:!0});const r=s(()=>{if(t!=null){if(t=null,this.style.opacity="",Math.abs(n)>this.offsetWidth*bu){this.dismiss(Math.sign(n));return}this.style.translate="",this.animate?.([{translate:`${n}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",r)}render(){const{dismissible:t,heading:n,icon:r,message:i,type:o}=this.getAttr();return b`
      <svg-icon part="icon" icon="${r||_r[o]||_r.info}"></svg-icon>
      ${n&&b`<strong part="heading">${n}</strong>`}
      <div part="message">${i||b`<slot></slot>`}</div>
      ${t&&b`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const t=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=t:this.setAttribute("role",t)}}Object.assign((e,t)=>tt.notify(e,t),{error:s((e,t)=>tt.error(e,t),"error"),info:s((e,t)=>tt.info(e,t),"info"),success:s((e,t)=>tt.success(e,t),"success"),warn:s((e,t)=>tt.warning(e,t),"warn"),warning:s((e,t)=>tt.warning(e,t),"warning")});tt.init();const Tr=s((e,t)=>e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName"),lt=s(e=>String(e??"").split("/").filter(Boolean),"split");class vt{static{s(this,"Entry")}constructor(t,n,r){Object.assign(this,{files:t,handle:n,kind:n.kind==="directory"?"folder":"file",name:n.name,path:r})}async info(){if(this.kind!=="file")return null;const t=await this.handle.peekFile?.()??await this.handle.getFile();return{modified:t.lastModified,size:t.size,type:t.type}}async read(t="text"){const n=await this.handle.getFile();return t==="blob"?n:t==="bytes"?new Uint8Array(await n.arrayBuffer()):t==="json"?JSON.parse(await n.text()):n.text()}async write(t){const n=await this.handle.createWritable();return await n.write(typeof t=="string"||t instanceof Blob||ArrayBuffer.isView(t)||t instanceof ArrayBuffer?t:JSON.stringify(t)),await n.close(),this.files.emit({paths:[this.path],type:"write"}),this}list(){return this.files.list(this.path)}remove(){return this.files.remove(this.path)}async permission(t="read"){try{return this.handle.queryPermission?await this.handle.queryPermission({mode:t}):"granted"}catch{return"denied"}}async request(t="read"){try{return this.handle.requestPermission?await this.handle.requestPermission({mode:t}):"granted"}catch{return"denied"}}}class Lt{static{s(this,"Files")}#t=new Set;#e;constructor({driver:t="opfs",root:n=null}={}){if(this.#e=n?Promise.resolve(n):typeof t=="function"?Promise.resolve(t()):t==="opfs"?navigator.storage.getDirectory():null,!this.#e)throw new TypeError(`[bunker] files: no driver "${t}", 'opfs', a function or a root handle`)}static async pick({id:t,mode:n="read",startIn:r}={}){if(typeof showDirectoryPicker!="function")throw new TypeError("[bunker] this browser can not open a folder");try{return new Lt({root:await showDirectoryPicker({id:t,mode:n,startIn:r})})}catch(i){if(i?.name==="AbortError")return null;throw i}}async root(){return new vt(this,await this.#e,"")}async#r(t,{create:n=!1,kind:r="file"}={}){const i=lt(t);let o=await this.#e;if(!i.length)return o;for(const c of i.slice(0,-1))o=await o.getDirectoryHandle(c,{create:n});const a=i.at(-1);if(r==="folder")return o.getDirectoryHandle(a,{create:n});if(n)return o.getFileHandle(a,{create:n});try{return await o.getFileHandle(a)}catch{return o.getDirectoryHandle(a)}}async entry(t){try{return new vt(this,await this.#r(t),lt(t).join("/"))}catch{return null}}async exists(t){return await this.entry(t)!==null}async list(t=""){const n=await this.#r(t,{kind:"folder"}),r=lt(t).join("/"),i=[];for await(const a of n.values())i.push(new vt(this,a,r?`${r}/${a.name}`:a.name));return[...i.filter(a=>a.kind==="folder").sort(Tr),...i.filter(a=>a.kind==="file").sort(Tr)]}async tree(t="",{accept:n=s(()=>!0,"accept")}={}){const r=s(async i=>{const o=[];for(const a of await i.list()){if(a.name.startsWith("."))continue;if(a.kind==="file"){n(a.name)&&o.push({children:null,entry:a});continue}const c=await r(a);c.children.length&&o.push(c)}return{children:o,entry:i}},"walk");return r(t?await this.entry(t):await this.root())}async read(t,n){const r=await this.entry(t);if(!r)throw new TypeError(`[bunker] files: no ${t}`);return r.read(n)}async write(t,n){const r=await this.#r(t,{create:!0});return new vt(this,r,lt(t).join("/")).write(n)}async mkdir(t){const n=await this.#r(t,{create:!0,kind:"folder"});return new vt(this,n,lt(t).join("/"))}async remove(t){const n=lt(t);await(await this.#r(n.slice(0,-1).join("/"),{kind:"folder"})).removeEntry(n.at(-1),{recursive:!0}),this.emit({paths:[n.join("/")],type:"remove"})}on(t,n){if(t!=="change")throw new TypeError(`[bunker] on(): no event "${t}", only "change"`);return this.#t.add(n),()=>this.#t.delete(n)}emit(t){for(const n of this.#t)n(t)}}const Uu=s(e=>new Lt(e),"createFiles"),K=xt==null||xt==="android"||xt==="ios",Q=xt==null||xt==="desktop",li={clipboard:{capacitor:K&&(()=>g(()=>import("./capacitor-CCCt9GT9.js"),__vite__mapDeps([19,20]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-CtphZ_O7.js"),[],import.meta.url)),web:s(()=>g(()=>import("./web-BsissfIk.js"),[],import.meta.url),"web")},database:{capacitor:K&&(()=>g(()=>import("./capacitor-D3bIhX_I.js"),__vite__mapDeps([21,20,22]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-BByxYXn1.js").then(e=>e.d),__vite__mapDeps([23,22]),import.meta.url)),web:s(()=>g(()=>import("./web-BEGZ3LQQ.js"),[],import.meta.url),"web")},dialogs:{capacitor:K&&(()=>g(()=>import("./capacitor-CrwlxJUU.js"),__vite__mapDeps([24,20]),import.meta.url)),web:s(()=>g(()=>import("./web-C9qW8z5J.js"),[],import.meta.url),"web")},external:{capacitor:K&&(()=>g(()=>import("./capacitor-CEqFVJaa.js"),__vite__mapDeps([25,20]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-BTIIF_9p.js"),[],import.meta.url)),web:s(()=>g(()=>import("./web-8RtAjHqk.js"),[],import.meta.url),"web")},files:{capacitor:K&&(()=>g(()=>import("./capacitor-CbCZhLAo.js"),__vite__mapDeps([26,20,27]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-xgjCZN34.js"),__vite__mapDeps([28,27]),import.meta.url)),web:s(()=>g(()=>import("./web-Bkbgzb3J.js"),[],import.meta.url),"web")},folders:{capacitor:K&&(()=>g(()=>import("./capacitor-CKSh_kHX.js"),__vite__mapDeps([29,20,27]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-DsR_18HX.js"),__vite__mapDeps([30,27,28]),import.meta.url)),web:s(()=>g(()=>Promise.resolve().then(()=>di),void 0,import.meta.url),"web")},notifications:{capacitor:K&&(()=>g(()=>import("./capacitor-BeWV1cig.js"),__vite__mapDeps([31,20]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-Dd19ZBZz.js"),[],import.meta.url)),web:s(()=>g(()=>import("./web-DseMVTiM.js"),[],import.meta.url),"web")},store:{capacitor:K&&(()=>g(()=>import("./capacitor-D27RfInF.js"),__vite__mapDeps([32,20]),import.meta.url)),deno:Q&&(()=>g(()=>import("./deno-BByxYXn1.js").then(e=>e.a),__vite__mapDeps([23,22]),import.meta.url)),web:s(()=>g(()=>import("./web-DlepgatL.js"),[],import.meta.url),"web")}};function ui(e,t){const n=li[e];if(!n)throw new Error(`[rat] no drivers for "${e}"`);if(t&&!n[t])throw new Error(`[rat] ${e}: no driver "${t}", ${Object.keys(n).filter(r=>n[r]).join(", ")} are`);return(n[t]||n[Ma]||n.web)()}s(ui,"driverOf");async function Fu(e,t){return t&&!Object.hasOwn(li[e],t)?typeof t=="string"?t.replace(/-/g,""):t:(await ui(e,t)).default}s(Fu,"bunkerDriverOf");async function ku({id:e}={}){if(typeof showDirectoryPicker!="function")throw new TypeError("[rat] folders: this browser can not open a folder");try{return await showDirectoryPicker({id:e,mode:"read"})}catch(t){if(t?.name==="AbortError")return null;throw t}}s(ku,"pick");const xu=s(e=>e,"keep"),Su=s(e=>e,"revive"),di=Object.freeze(Object.defineProperty({__proto__:null,keep:xu,pick:ku,revive:Su},Symbol.toStringTag,{value:"Module"})),pi={added:Number,handle:Object,id:As,name:String};function Ou(e){if(!e||e==="*")return()=>!0;if(typeof e=="function")return e;const t=new Set([e].flat().flatMap(n=>String(n).split(/[,\s]+/)).filter(Boolean).map(n=>n.replace(/^\./,"").toLowerCase()));return n=>t.has(n.slice(n.lastIndexOf(".")+1).toLowerCase())}s(Ou,"acceptOf");const hi=s(({children:e,entry:t})=>({children:e?.map(hi)??null,entry:t,kind:t.kind==="folder"?"dir":"file",name:t.name,path:t.path}),"nodeOf");function V(e,t,n){const r={...e.value};n===void 0?delete r[t]:r[t]=n,e.value=r}s(V,"patch");function fi({accept:e,driver:t=di,id:n="folders",scan:r=!0,table:i}){const o=Ou(e),a=new Map,c=new Map,l=s(async h=>await a.get(h).root(),"rootOf"),u=s(async()=>{const h=await t.pick({id:n});return h?new Lt({root:h}):null},"pick"),p=s(h=>r?f.scan(h):Promise.resolve(),"auto"),d=s((h,m)=>{a.set(h,new Lt({root:m})),c.set(h,m)},"open"),f={perms:ut({}),ready:ut(!1),scanning:ut({}),sources:ut([]),trees:ut({}),async load(){const h=(await i.values()).sort((m,v)=>m.added-v.added);for(const m of h)d(m.id,t.revive(m.handle));f.sources.value=h.map(({id:m,name:v})=>({id:m,name:v}));for(const m of h)V(f.perms,m.id,await(await l(m.id)).permission());f.ready.value=!0;for(const m of h)f.perms.value[m.id]==="granted"&&p(m.id).catch(()=>{})},async add(){const h=await u();if(!h)return null;const m=await h.root();for(const k of a.keys())if(await(await l(k)).handle.isSameEntry?.(m.handle))throw new Error("That folder is open already.");const v=await i.add({added:Date.now(),handle:t.keep(m.handle),name:m.name});return d(v.id,m.handle),f.sources.value=[...f.sources.value,{id:v.id,name:v.name}],V(f.perms,v.id,"granted"),await p(v.id),v},async reconnect(h){const m=await(await l(h)).request();return V(f.perms,h,m),m==="granted"&&await p(h),{granted:m==="granted",state:m}},async repick(h){const m=await u();if(!m)return!1;const v=await m.root();return await i.update(h,{handle:t.keep(v.handle),name:v.name}),d(h,v.handle),f.sources.value=f.sources.value.map(k=>k.id===h?{id:h,name:v.name}:k),V(f.perms,h,"granted"),await p(h),!0},async remove(h){await i.delete(h),a.delete(h),c.delete(h),f.sources.value=f.sources.value.filter(m=>m.id!==h);for(const m of[f.perms,f.scanning,f.trees])V(m,h,void 0)},async scan(h){V(f.scanning,h,!0);try{V(f.trees,h,hi(await a.get(h).tree("",{accept:o})))}catch(m){throw m?.name==="NotAllowedError"&&V(f.perms,h,"prompt"),m}finally{V(f.scanning,h,void 0)}},nodeAt(h,m){const v=s(k=>k?k.kind==="file"?k.path===m?k:null:(k.children??[]).reduce((J,Se)=>J??v(Se),null):null,"find");return v(f.trees.value[h])},handleOf:s(h=>c.get(h)??null,"handleOf"),read:s(h=>h.entry.read("text"),"read")};return f}s(fi,"createFolders");async function $u({accept:e,driver:t,id:n,scan:r,table:i="folders"},{app:o,config:a}){if(!o.database?.[i])throw new Error(`[rat] mod folders: the database needs a table "${i}" (schema: { ${i}: FOLDERS }), before folders`);return fi({accept:e,driver:await ui("folders",t),id:n??a.id??"folders",scan:r,table:o.database[i]})}s($u,"folders");const Eu=Object.freeze(Object.defineProperty({__proto__:null,FOLDERS:pi,createFolders:fi,default:$u},Symbol.toStringTag,{value:"Module"})),Au={dir:"ltr",display:"standalone",lang:"en",orientation:"any",viewport:{width:"device-width",initialScale:1,maximumScale:1,userScalable:"no",fit:"cover"},autoImport:["../.shared/components/"],aufbau:{elements:{mode:"auto"}},gestalt:{palette:"zombie"}},_u={...Au,name:"Files",import:["@aufbau/elements/webcomponents/input/tags.js","@aufbau/elements/webcomponents/btn-icon.js","@aufbau/elements/webcomponents/btn-push.js","@aufbau/elements/webcomponents/data-index.js","@aufbau/elements/webcomponents/data-item.js","@aufbau/elements/webcomponents/div-x.js","@aufbau/elements/webcomponents/div-y.js","@aufbau/elements/webcomponents/input-option.js","@aufbau/elements/webcomponents/nav-crumbs.js","@aufbau/elements/webcomponents/pop-toast.js","@aufbau/elements/webcomponents/svg-icon.js"],autoImport:[{"./components/":["Action","Bar","Context","Dashboard","Entry","Facts","FileRow","Library","Menu","PasteBar","Preferences","Preview","RemoteManager","Searchbar","Status","Sync","TaskList","Tabs","Thumb","Welcome"]},"../.shared/components/"],database:{schema:{folders:pi}},dialogs:!0,files:!0,folders:{id:"files",scan:!1},offline:!0,thumbnails:{maxBytes:128*1024*1024,width:256},android:{id:"dev.pulgasari.files",name:"Files",plugins:["filesync"]},build:{emptyOutDir:!0,outDir:"../../../apps/files"},icons:{copy:"lucide:copy",move:"lucide:scissors"}};document.querySelector("rat-app").run(()=>g(()=>import("./app.rat-Deznye4J.js"),__vite__mapDeps([33,11,3,2,1]),import.meta.url),_u);export{hn as $,zr as B,de as D,Nr as F,As as I,me as L,Lr as N,tt as P,Nt as R,T as S,So as U,ta as a,Fu as b,Uu as c,ui as d,D as e,x as f,Du as g,Iu as h,Wr as i,ws as j,cn as k,Wc as l,Ki as m,Bu as n,Mu as o,Fs as p,Vu as q,ft as r,ut as s,Yo as t,Ct as u,qu as v};
