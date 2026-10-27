const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-D_xAKS-Y.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./preload-helper-Cc2_yIPf.js","./clipboard-Cchpvv6o.js","./drivers-CbbKo6xy.js","./database-eOAtgXtU.js","./store-Tl34HF9Y.js","./dialogs-CeESi8qB.js","./external-CtiLJhCU.js","./files-kOB2vqK9.js","./files-DMvaay4a.js","./folders-C8Ts7u1c.js","./web-C6RvE3Ks.js","./hotkeys-BJvr6jvX.js","./keys-CWTtq0D5.js","./notifications-CvGh3jJb.js","./offline-DTwHCC90.js","./store-D0z7RPEv.js","./thumbnails-DKoIDbkk.js","./pop-over-CIhSPDgF.js","./widget-calculator-OQu15u75.js","./index-f1CGb_xX.js","./app.rat-CwvQfpak.js"])))=>i.map(i=>d[i]);
var ti=Object.defineProperty;var s=(e,t)=>ti(e,"name",{value:t,configurable:!0});import{_ as v}from"./preload-helper-Cc2_yIPf.js";import{O as ei,P as ni,a as C,h as f,e as ri,A as si,x as In,c as ii}from"./withControl-saxu6q3w.js";import{isFn as Ce,isString as Vt,isArray as Fe,isPlainObject as He,predicates as oi}from"https://esm.sh/jsr/@pulgasari/is";import{toCamelCase as ai}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";import"./index-CgHh2HpB.js";s(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}s(n,"getFetchOpts");function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}s(r,"processPreload")},"polyfill")();let k=class{static{s(this,"Schema")}constructor({checks:t=[],describe:n={},initial:r,kind:i,make:o=null,nullable:a=!1,parts:c=null,run:l,transform:u=null}){Object.assign(this,{checks:t,describe:{kind:i,...n},initial:r,kind:i,make:o,nullable:a,parts:c,run:l,transform:u}),Object.freeze(this)}derive(t){return new this.constructor({...this,...t,describe:{...this.describe,...t.describe}})}check(t,n="check failed",r={}){return this.derive({checks:[...this.checks,[t,n]],describe:r})}default(t){return this.derive({describe:{initial:t},initial:t})}optional(){return this.derive({describe:{optional:!0},nullable:!0})}validate(t,n=[]){if(t==null&&this.nullable)return{value:t};const r=this.run(t,n);if(r.issues)return r;const i=this.checks.filter(([o])=>!o(r.value)).map(([,o])=>({message:o,path:n}));return i.length?{issues:i}:r}is(t){return!this.validate(t).issues}create(t){if(!this.make)throw new TypeError(`[rat] ${this.kind} is no data type, there is nothing to create: its values are plain js`);return this.make(this,t)}from(t){if(!this.transform)throw new TypeError(`[rat] ${this.kind} has no transform, nothing can be made into it`);return this.transform(t)}to(t){return this.derive({checks:[],run:s((n,r)=>{const i=this.validate(n,r);return i.issues?i:t.validate(t.from(i.value),r)},"run")})}parse(t){const n=this.validate(t);if(n.issues)throw new TypeError(`[rat] ${n.issues.map(r=>(r.path.length?r.path.join(".")+": ":"")+r.message).join(", ")}`);return n.value}get"~standard"(){return{validate:s(t=>this.validate(t),"validate"),vendor:"rat",version:1}}};const Yt=s((e,t,n=r=>r)=>(r,i)=>{const o=n(r);return t(o)?{value:o}:{issues:[{message:`expected ${e}`,path:i}]}},"scalar");class ci extends k{static{s(this,"NumSchema")}min(t){return this.check(n=>n>=t,`at least ${t}`,{min:t})}max(t){return this.check(n=>n<=t,`at most ${t}`,{max:t})}range(t,n){return this.min(t).max(n).derive({initial:this.initial<t||this.initial>n?t:this.initial})}get int(){return this.check(Number.isInteger,"an integer",{int:!0})}}const Dn={false:!1,no:!1,off:!1,on:!0,true:!0,yes:!0},li=s(e=>typeof e=="string"&&e.toLowerCase()in Dn?Dn[e.toLowerCase()]:e,"toBool"),ui=s(e=>typeof e=="string"&&e.trim()!==""&&!isNaN(e)?Number(e):e,"toNum"),vr=new k({initial:!1,kind:"bool",run:Yt("a boolean",e=>typeof e=="boolean",li)}),wr=new ci({initial:0,kind:"num",run:Yt("a number",e=>typeof e=="number"&&Number.isFinite(e),ui)}),kr=s(e=>e instanceof k,"isSchema$2"),di=s((e,t,n)=>new e(t,n),"byConstructor");function z(e,t,n=di){const r=new Proxy(e,{apply:s((i,o,a)=>t(...a).derive({make:s((c,l)=>n(r,c,l),"make")}),"apply")});return r}s(z,"typed");const Bt=s(e=>e!==null&&typeof e=="object"&&!Array.isArray(e),"isObject");class pi extends k{static{s(this,"StrSchema")}min(t){return this.check(n=>n.length>=t,`at least ${t} characters`,{min:t})}max(t){return this.check(n=>n.length<=t,`at most ${t} characters`,{max:t})}pattern(t,n=`matching ${t}`){return this.check(r=>t.test(r),n,{pattern:t.source})}get email(){return this.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"an email address")}get uuid(){return this.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,"a uuid")}case({regex:t=null,transform:n}){return this.derive({describe:{regex:t?.source??null},transform:n,run:s((r,i)=>{const o=this.run(r,i);return o.issues||n(o.value)===o.value?o:{issues:[{message:`expected ${t??"this case"}`,path:i}]}},"run")})}}const _=new pi({initial:"",kind:"str",run:Yt("a string",e=>typeof e=="string")}),dt=s(e=>String(e??"").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/[\s\-_.]+/g," ").trim().toLowerCase().split(" ").filter(Boolean),"toWords"),Je=s(e=>e.charAt(0).toUpperCase()+e.slice(1),"upperFirst"),hi=_.case({regex:/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/,transform:s(e=>dt(e).map((t,n)=>n?Je(t):t).join(""),"transform")}),fi=_.case({regex:/^[A-Z0-9]+(_[A-Z0-9]+)*$/,transform:s(e=>dt(e).join("_").toUpperCase(),"transform")}),xr=_.case({regex:/^[a-z0-9]+(-[a-z0-9]+)*$/,transform:s(e=>dt(e).join("-"),"transform")}),mi=_.case({transform:s(e=>String(e??"").toLowerCase(),"transform")}),gi=_.case({transform:s(e=>[...String(e??"")].map((t,n)=>n%2?t.toUpperCase():t.toLowerCase()).join(""),"transform")}),bi=_.case({regex:/^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/,transform:s(e=>dt(e).map(Je).join(""),"transform")}),yi=_.case({regex:/^[a-z0-9]+(_[a-z0-9]+)*$/,transform:s(e=>dt(e).join("_"),"transform")}),vi=_.case({regex:/^[A-Z][a-z0-9]*(\s[A-Z][a-z0-9]*)*$/,transform:s(e=>dt(e).map(Je).join(" "),"transform")}),wi=_.case({transform:s(e=>String(e??"").toUpperCase(),"transform")}),Sr=new k({initial:void 0,kind:"fn",run:Yt("a function",e=>typeof e=="function")});function ki({update:e,notify:t,unwatched:n}){return{link:r,unlink:i,propagate:o,checkDirty:a,shallowPropagate:c};function r(u,p,d){const h=p.depsTail;if(h!==void 0&&h.dep===u)return;const g=h!==void 0?h.nextDep:p.deps;if(g!==void 0&&g.dep===u){g.version=d,p.depsTail=g;return}const b=u.subsTail;if(b!==void 0&&b.version===d&&b.sub===p)return;const w=p.depsTail=u.subsTail={version:d,dep:u,sub:p,prevDep:h,nextDep:g,prevSub:b,nextSub:void 0};g!==void 0&&(g.prevDep=w),h!==void 0?h.nextDep=w:p.deps=w,b!==void 0?b.nextSub=w:u.subs=w}function i(u,p=u.sub){const{dep:d,prevDep:h,nextDep:g,nextSub:b,prevSub:w}=u;return g!==void 0?g.prevDep=h:p.depsTail=h,h!==void 0?h.nextDep=g:p.deps=g,b!==void 0?b.prevSub=w:d.subsTail=w,w!==void 0?w.nextSub=b:(d.subs=b)===void 0&&n(d),g}function o(u,p){let d=u.nextSub,h;t:do{const g=u.sub;let b=g.flags;if(b&60?b&12?b&4?!(b&48)&&l(u,g)?(g.flags=b|40,b&=1):b=0:g.flags=b&-9|32:b=0:(g.flags=b|32,p&&(g.flags|=8)),b&2&&t(g),b&1){const w=g.subs;if(w!==void 0){const E=(u=w).nextSub;E!==void 0&&(h={value:d,prev:h},d=E);continue}}if((u=d)!==void 0){d=u.nextSub;continue}for(;h!==void 0;)if(u=h.value,h=h.prev,u!==void 0){d=u.nextSub;continue t}break}while(!0)}function a(u,p){let d,h=0,g=!1;t:do{const b=u.dep,w=b.flags;if(p.flags&16)g=!0;else if((w&17)===17){const E=b.subs;e(b)&&(E.nextSub!==void 0&&c(E),g=!0)}else if((w&33)===33){d={value:u,prev:d},u=b.deps,p=b,++h;continue}if(!g){const E=u.nextDep;if(E!==void 0){u=E;continue}}for(;h--;){if(u=d.value,d=d.prev,g){const it=p.subs;if(e(p)){it.nextSub!==void 0&&c(it),p=u.sub;continue}g=!1}else p.flags&=-33;p=u.sub;const E=u.nextDep;if(E!==void 0){u=E;continue t}}return g&&!!p.flags}while(!0)}function c(u){do{const p=u.sub,d=p.flags;(d&48)===32&&(p.flags=d|16,(d&6)===2&&t(p))}while((u=u.nextSub)!==void 0)}function l(u,p){let d=p.depsTail;for(;d!==void 0;){if(d===u)return!0;d=d.prevDep}return!1}}s(ki,"createReactiveSystem");const J=1,at=2,tt=4,xi=8,bt=16,Ne=32,Ut=64;let S,U=null,Le=0,je=0,Xt=0;const V=[];let ft=0,K=0;class Qt{static{s(this,"Node")}deps=void 0;depsTail=void 0;subs=void 0;subsTail=void 0;flags=0}class nt extends Qt{static{s(this,"Signal")}flags=J;schema;currentValue;pendingValue;constructor(t){super(),Rr(t)&&(this.schema=t,t=t.initial),this.currentValue=this.pendingValue=t}get value(){return this.flags&bt&&Ar(this)&&this.subs&&Or(this.subs),S&&Ge(this,S,Xt),this.currentValue}set value(t){if(this.schema){const n=Oi(this.schema,t);if(!n.ok)return;t=n.value}Object.is(this.pendingValue,t)||(this.pendingValue=t,this.flags=J|bt,this.subs&&(Si(this.subs,je>0),Le||_r()))}peek(){return $t(()=>this.value)}toString(){return String(this.value)}}class qt extends Qt{static{s(this,"Computed")}getter;current=void 0;constructor(t){super(),this.getter=t}get value(){const t=this.flags;if(t&bt||t&Ne&&($r(this.deps,this)||(this.flags=t&~Ne,!1)))Er(this)&&this.subs&&Or(this.subs);else if(!t){this.flags=J|tt;const n=S;S=this;try{this.current=this.getter()}finally{S=n,this.flags&=~tt}}return S&&Ge(this,S,Xt),this.current}peek(){return $t(()=>this.value)}toString(){return String(this.value)}}class We extends Qt{static{s(this,"Effect")}fn;cleanups=[];flags=at|tt;constructor(t){super(),this.fn=t}}class Ke extends Qt{static{s(this,"Scope")}cleanups=[];flags=J}const{link:Ge,unlink:te,propagate:Si,checkDirty:$r,shallowPropagate:Or}=ki({update(e){return e instanceof qt?Er(e):e instanceof nt?Ar(e):(e.flags=J,!0)},notify(e){let t=ft;const n=t;do V[t++]=e,e.flags&=~at,e=e.subs?.sub;while(e!==void 0&&e.flags&at);ft=t;for(let r=n,i=t-1;r<i;r++,i--)[V[r],V[i]]=[V[i],V[r]]},unwatched(e){e instanceof qt?e.depsTail!==void 0&&(e.flags=J|bt,Lr(e)):(e instanceof We||e instanceof Ke)&&Ze(e)}});function Ar(e){e.flags=J;const t=!Object.is(e.currentValue,e.pendingValue);return e.currentValue=e.pendingValue,t}s(Ar,"commit");function Er(e){e.flags&Ut&&Cr(e),e.depsTail=void 0,e.flags=J|tt;const t=S;S=e;try{Xt++;const n=e.current;return e.current=e.getter(n),!Object.is(n,e.current)}finally{S=t,e.flags&=~tt,Nr(e)}}s(Er,"recompute");function $i(e){const t=e.flags;if(t&bt||t&Ne&&$r(e.deps,e)){if(t&Ut&&Cr(e),jr(e),!e.flags)return;e.depsTail=void 0,e.flags=at|tt,Tr(e),Nr(e)}else e.deps!==void 0&&(e.flags=at|t&Ut)}s($i,"run");function Tr(e){const t=S,n=U;S=e,U=e;try{Xt++,je++;const r=e.fn();typeof r=="function"&&e.cleanups.push(r)}finally{je--,S=t,U=n,e.flags&=~tt}}s(Tr,"execute");function _r(){try{for(;K<ft;){const e=V[K];V[K++]=void 0,$i(e)}}finally{for(;K<ft;){const e=V[K];V[K++]=void 0,e.flags|=at|xi}K=0,ft=0}}s(_r,"flush");function zr(e,t){t&&(Ge(e,t,0),t.flags|=Ut)}s(zr,"adopt");function Cr(e){for(let t=e.depsTail;t!==void 0;){const n=t.prevDep;(t.dep instanceof We||t.dep instanceof Ke)&&te(t,e),t=n}}s(Cr,"dropChildren");function Nr(e){for(let t=e.depsTail!==void 0?e.depsTail.nextDep:e.deps;t!==void 0;)t=te(t,e)}s(Nr,"purge");function Lr(e){for(let t=e.depsTail;t!==void 0;){const n=t.prevDep;te(t,e),t=n}}s(Lr,"unlinkAll");function jr(e){if(!e.cleanups.length)return;const t=S;S=void 0;try{for(const n of e.cleanups.splice(0))n()}finally{S=t}}s(jr,"runCleanups");function Ze(e){!e.flags&&!e.deps&&!e.subs||(e.flags=0,Lr(e),e.subs!==void 0&&te(e.subs),jr(e))}s(Ze,"dispose");const Rr=s(e=>typeof e?.["~standard"]?.validate=="function","isSchema$1");function Oi(e,t){const n=e["~standard"].validate(t);return typeof n?.then=="function"?(console.warn("[rat] an async schema can not check a signal write, the value is taken as it is"),{ok:!0,value:t}):n.issues?(console.warn(`[rat] ${JSON.stringify(t)} rejected: ${n.issues.map(r=>r.message).join(", ")}`),{ok:!1}):{ok:!0,value:n.value}}s(Oi,"check");const Ai=s(e=>new nt(e),"signal"),gu=s(e=>new qt(e),"computed"),Pr=s(e=>e instanceof nt||e instanceof qt,"isSignal");function Ye(e,t=U){const n=new We(e);return zr(n,t),Tr(n),()=>Ze(n)}s(Ye,"effect");function Re(e,t=U){const n=new Ke;zr(n,t);const r=S,i=U;S=void 0,U=n;try{return[e(),()=>Ze(n)]}finally{S=r,U=i}}s(Re,"scope");function Ei(e){Le++;try{return e()}finally{--Le||_r()}}s(Ei,"batch");function $t(e){const t=S;S=void 0;try{return e()}finally{S=t}}s($t,"untrack");function Ti(e){U?.cleanups.push(e)}s(Ti,"onCleanup");const Ot=Symbol.for("rat.reactive"),Mn=new WeakMap,Ir=s(e=>Mn.get(e)??Mn.set(e,new nt(0)).get(e),"versionOf"),Vn=s(e=>{Ir(e).value},"track"),_i=s(e=>{Ir(e).value++},"bump"),zi=s(e=>Pr(e)||e?.[Ot]===!0,"isReactive");function ge(e,t){for(let n=e;n;n=Object.getPrototypeOf(n)){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r}return null}s(ge,"descriptorOf");const Ci=s(e=>Array.isArray(e)?e.map(t=>[t,!0]):Reflect.ownKeys(e).map(t=>[t,e[t]]),"entriesOf");function j(e,{reads:t=[],writes:n=[]}={}){const r=class extends e{static{s(this,"Reactive")}};Object.defineProperty(r,"name",{value:`$${e.name}`}),Object.defineProperty(r.prototype,Ot,{value:!0});for(const i of t){const o=ge(e.prototype,i);if(!o)throw new TypeError(`[rat] ${e.name} has no ${String(i)} to read`);if(o.get){const a=o.get;Object.defineProperty(r.prototype,i,{configurable:!0,get(){return Vn(this),a.call(this)},set:o.set})}else{const a=o.value;Object.defineProperty(r.prototype,i,{configurable:!0,writable:!0,value:s(function(...c){return Vn(this),a.apply(this,c)},"value")})}}for(const[i,o]of Ci(n)){const a=ge(e.prototype,i),c=a?.value??a?.set;if(typeof c!="function")throw new TypeError(`[rat] ${e.name} has no method or setter ${String(i)} to write with`);const l=s(function(...u){return o!==!0&&!$t(()=>o(this,...u))?c.apply(this,u):Ei(()=>{const p=c.apply(this,u);return _i(this),p})},"write");a.set?Object.defineProperty(r.prototype,i,{configurable:!0,get:ge(r.prototype,i).get,set:l}):Object.defineProperty(r.prototype,i,{configurable:!0,writable:!0,value:l})}return r}s(j,"reactive");const Dr=[];function D(e,t){const n=e.prototype?i=>i instanceof e:e,r=t.prototype?.[Ot]?i=>new t(i):t;Dr.unshift([n,r])}s(D,"register");function Bn(e){if(e==null||typeof e!="object"||zi(e))return e;for(const[t,n]of Dr)if(t(e))return n(e);return e}s(Bn,"wrap");class Ni extends nt{static{s(this,"Holder")}constructor(t){super(Bn(t))}get value(){return super.value}set value(t){super.value=Bn(t)}}function Li(e){return Pr(e)?e:Rr(e)?new nt(e):new Ni(e)}s(Li,"$");Li.register=D;const L=Symbol("rat.scalar.get"),X=Symbol("rat.scalar.set");class Xe{static{s(this,"Scalar")}#t;constructor(t,n,r){t instanceof k&&([t,n]=[void 0,t]),this.schema=n??r,this.#t=this.schema.parse(t===void 0?this.schema.initial:t)}[L](){return this.#t}[X](t){return this.#t=this.schema.parse(t),this.#t}get value(){return this[L]()}set value(t){this[X](t)}toJSON(){return this[L]()}toString(){return String(this[L]())}valueOf(){return this[L]()}}class Mr extends Xe{static{s(this,"BoolType")}constructor(t,n){super(t,n,vr)}off(){return this[X](!1)}on(){return this[X](!0)}toggle(){return this[X](!this[L]())}}class Vr extends Xe{static{s(this,"NumType")}constructor(t,n){super(t,n,wr)}dec(t=1){return this.inc(-t)}inc(t=1){const{max:n=1/0,min:r=-1/0}=this.schema.describe;return this[X](Math.min(n,Math.max(r,this[L]()+t)))}}class Br extends Xe{static{s(this,"StrType")}constructor(t,n){super(t,n,_)}clear(){return this[X]("")}}for(const[e,t]of[[Mr,"Bool"],[Vr,"Num"],[Br,"Str"]])Object.defineProperty(e,"name",{value:t});const Qe=["value","toJSON","toString","valueOf"],tn=s((e,t)=>!Object.is(e[L](),t),"changes"),ji=j(Mr,{reads:Qe,writes:{off:s(e=>e[L]()!==!1,"off"),on:s(e=>e[L]()!==!0,"on"),toggle:!0,value:tn}}),Ri=j(Vr,{reads:Qe,writes:{dec:!0,inc:!0,value:tn}}),Pi=j(Br,{reads:Qe,writes:{clear:s(e=>e[L]()!=="","clear"),value:tn}}),Un={copyWithin:s(()=>!0,"copyWithin"),fill:s(()=>!0,"fill"),pop:s((e,t,n)=>n.length!==e,"pop"),push:s((e,t,n)=>n.length!==e,"push"),reverse:s(()=>!0,"reverse"),shift:s((e,t,n)=>n.length!==e,"shift"),sort:s(()=>!0,"sort"),splice:s((e,t,n,r)=>t.length>0||r.length>2,"splice"),unshift:s((e,t,n)=>n.length!==e,"unshift")},Ii=new Set(["copyWithin","fill","reverse","sort"]);function en(e=[]){const t=[...e],n=new nt(0),r=new Map,i=s(()=>{n.value},"track"),o=s(()=>{n.value=$t(()=>n.value)+1},"bump"),a=s(p=>(...d)=>(i(),p.apply(t,d)),"tracking"),c=s((p,d)=>(...h)=>{const g=t.length,b=d.apply(t,h);return Un[p](g,b,t,h)&&o(),Ii.has(p)?u:b},"notifying"),l=s((p,d)=>(r.has(p)||r.set(p,Object.hasOwn(Un,p)?c(p,d):a(d)),r.get(p)),"methodOf"),u=new Proxy(t,{get(p,d){if(d===Ot)return!0;const h=p[d];return typeof h=="function"&&d!=="constructor"&&h===Array.prototype[d]?l(d,h):(i(),h)},set(p,d,h){const g=!Object.is(p[d],h);return p[d]=h,g&&o(),!0},deleteProperty(p,d){const h=Object.hasOwn(p,d);return delete p[d],h&&o(),!0},has(p,d){return i(),d in p},ownKeys(p){return i(),Reflect.ownKeys(p)}});return u}s(en,"$Array");Object.defineProperty(en,Symbol.hasInstance,{value:s(e=>Array.isArray(e)&&e[Ot]===!0,"value")});D(Array,en);const Ur=j(Map,{reads:["get","has","size","keys","values","entries","forEach",Symbol.iterator],writes:{clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete"),set:s((e,t,n)=>!e.has(t)||!Object.is(e.get(t),n),"set")}});D(Map,Ur);const Ft=Symbol("rat.record.get"),Pe=Symbol("rat.record.set"),Di=new Set(["assign","schema","toJSON"]),Mi=s(e=>Object.fromEntries(Object.entries(e).map(([t,n])=>t.startsWith("?")?[t.slice(1),n.optional()]:[t,n])),"shapeOf");function qr(e){const t=Mi(e),n=Object.keys(t);return new k({describe:{fields:Object.fromEntries(n.map(r=>[r,t[r].describe]))},initial:Object.fromEntries(n.map(r=>[r,t[r].initial])),kind:"record",parts:t,run:s((r,i)=>{if(!Bt(r))return{issues:[{message:"expected a record",path:i}]};const o=[],a={};for(const c of n){const l=t[c].validate(r[c],[...i,c]);l.issues?o.push(...l.issues):l.value!==r[c]&&(a[c]=l.value)}return o.length?{issues:o}:{value:Object.keys(a).length?{...r,...a}:r}},"run")})}s(qr,"recordOf");class ee{static{s(this,"RecordType")}#t;constructor(t,n={}){const r=t instanceof ee,i=r?t.schema:t instanceof k?t:null;if(i&&i.kind!=="record")throw new TypeError("[rat] a Record needs fields or a Record schema");const o=r?t.toJSON():i?i.parse({...i.initial,...n}):t,a=Object.keys(i?i.parts:o);Object.defineProperty(this,"schema",{value:i}),this.#t=Object.fromEntries(a.map(c=>[c,o[c]]));for(const c of a){if(Di.has(c))throw new TypeError(`[rat] ${c} can not be a Record field`);Object.defineProperty(this,c,{enumerable:!0,get:s(()=>this[Ft](c),"get"),set:s(l=>this[Pe](c,l),"set")})}Object.seal(this)}[Ft](t){return this.#t[t]}[Pe](t,n){this.#t[t]=this.schema?this.schema.parts[t].parse(n):n}assign(t){for(const n of Object.keys(t))this[n]=t[n];return this}toJSON(){return{...this.#t}}}Object.defineProperty(ee,"name",{value:"Record"});const At=z(ee,qr),Fr=z(j(At,{reads:[Ft,"toJSON"],writes:{[Pe]:(e,t,n)=>!Object.is(e[Ft](t),n),assign:!0}}),qr);D(At,Fr);const Vi=s(e=>e instanceof k?e:At(e),"valueOf$1");function Hr(e,t){const n=Vi(t);return new k({describe:{key:e.describe,value:n.describe},initial:{},kind:"dict",parts:{key:e,value:n},run:s((r,i)=>{if(!(r instanceof Map)&&!Bt(r))return{issues:[{message:"expected a dict",path:i}]};const o=[],a=new Map;for(const[c,l]of r instanceof Map?r:Object.entries(r)){const u=e.validate(c,[...i,c]),p=n.validate(l,[...i,c]);u.issues&&o.push(...u.issues),p.issues&&o.push(...p.issues),!u.issues&&!p.issues&&a.set(u.value,p.value)}return o.length?{issues:o}:{value:a}},"run")})}s(Hr,"dictOf");const be=new WeakMap;function Bi(e,t,n,r){be.has(e)||be.set(e,new Map);const i=be.get(e);return i.has(t)||i.set(t,(...o)=>{const a=n.apply(e,o);return a===e?r:a}),i.get(t)}s(Bi,"boundOf");const Tt=s((e,t)=>typeof t=="symbol"||t in e,"isMember"),qn=s(e=>new TypeError(`[rat] ${String(e)} is a member of the Dict: an entry of that name goes through set() and delete()`),"member"),Ui={deleteProperty(e,t){if(Tt(e,t))throw qn(t);return e.delete(t)},has(e,t){return Tt(e,t)||e.has(t)},set(e,t,n){if(Tt(e,t))throw qn(t);return e.set(t,n),!0},get(e,t,n){if(!Tt(e,t))return e.read(e.get(t));const r=Reflect.get(e,t,e);return typeof r=="function"&&t!=="constructor"?Bi(e,t,r,n):r}};class ne extends Map{static{s(this,"DictType")}constructor(t,n=[]){super();const r=t instanceof ne,i=r?t.schema:t;if(!(i instanceof k)||i.kind!=="dict")throw new TypeError("[rat] a Dict needs a Dict schema: new Dict(Dict(Key, Value))");Object.defineProperty(this,"schema",{value:i});for(const[o,a]of r?t:n instanceof Map?n:Object.entries(n))this.set(o,a);return new Proxy(this,Ui)}read(t){return t}keyOf(t){const n=this.schema.parts.key.validate(t);return n.issues?void 0:n.value}set(t,n){return super.set(this.schema.parts.key.parse(t),this.schema.parts.value.parse(n))}get(t){const n=this.keyOf(t);return n===void 0?void 0:super.get(n)}has(t){const n=this.keyOf(t);return n!==void 0&&super.has(n)}delete(t){const n=this.keyOf(t);return n!==void 0&&super.delete(n)}toJSON(){return Object.fromEntries(this)}}Object.defineProperty(ne,"name",{value:"Dict"});const re=z(ne,Hr),nn=z(j(re,{reads:["get","has","size","keys","values","entries","forEach","toJSON",Symbol.iterator],writes:{clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete"),set:!0}}),Hr);D(re,nn);const rn=s((...e)=>new k({describe:{values:e},initial:e[0],kind:"enum",run:s((t,n)=>e.includes(t)?{value:t}:{issues:[{message:`one of ${e.map(String).join(", ")}`,path:n}]},"run")}),"enumOf");class se{static{s(this,"EnumType")}#t;constructor(...t){const[n]=t,r=t.length===1&&n instanceof se,i=r?n.schema:t.length===1&&n instanceof k?n:rn(...t);if(i.kind!=="enum"||!i.describe.values.length)throw new TypeError("[rat] an Enum needs values or an Enum schema");this.schema=i,this.values=Object.freeze([...i.describe.values]),this.#t=Math.max(0,this.values.indexOf(r?n.value:i.initial))}get value(){return this.values[this.#t]}set value(t){this.#t=this.values.indexOf(this.schema.parse(t))}cycle(t=1){const n=this.values.length;return this.#t=((this.#t+t)%n+n)%n,this.value}is(t){return this.value===t}toJSON(){return this.value}toString(){return String(this.value)}valueOf(){return this.value}}Object.defineProperty(se,"name",{value:"Enum"});const Jr=s((e,t,n)=>{const r=new e(t);return n!==void 0&&(r.value=n),r},"atValue"),ie=z(se,rn,Jr),Wr=z(j(ie,{reads:["value","is","toJSON","toString","valueOf"],writes:{cycle:s(e=>e.values.length>1,"cycle"),value:s((e,t)=>!e.is(t),"value")}}),rn,Jr);D(ie,Wr);const qi=s(e=>/^[A-Z]/.test(e.name)&&typeof e.prototype=="object","isClass"),yt=s(e=>typeof e=="function","isFn$1"),Fi=s(e=>yt(e?.["~standard"]?.validate),"isSchema"),$=Symbol("rat.none"),Fn=new Map([[BigInt,"bigint"],[Boolean,"boolean"],[Function,"function"],[Number,"number"],[Object,"object"],[String,"string"],[Symbol,"symbol"]]);class Kr{static{s(this,"Either")}constructor(t){this.tests=t}}class Gr{static{s(this,"Part")}constructor(t,n){this.name=t,this.test=n}}class Zr{static{s(this,"Pattern")}constructor(t,n){this.guard=n,this.test=t}}class Yr{static{s(this,"Rest")}constructor(t){this.name=t}}const sn=Object.freeze({}),Hi=s((...e)=>new Kr(e),"either"),Ji=s((e,t=sn)=>new Gr(e,t),"part"),Wi=s((e,t=null)=>new Zr(e,t),"pattern$3"),Ki=s((e=null)=>new Yr(e),"rest");function B(e,t,n){if(t===sn)return e;if(t instanceof Gr){const r=B(e,t.test,n);return r!==$&&(n[t.name]=r),r}if(t instanceof Kr){for(const r of t.tests){const i={},o=B(e,r,i);if(o!==$)return Object.assign(n,i),o}return $}if(t instanceof Zr){const r={},i=B(e,t.test,r);return i===$||t.guard&&!t.guard(i,r)?$:(Object.assign(n,r),i)}if(Fi(t)){const r=t["~standard"].validate(e);if(yt(r?.then))throw new TypeError("[rat] an async schema can not be a test");return r.issues?$:r.value}if(Fn.has(t))return typeof e===Fn.get(t)&&e!==null?e:$;if(yt(t))return(qi(t)?e instanceof t:t(e))?e:$;if(t instanceof RegExp)return typeof e=="string"&&t.test(e)?e:$;if(Array.isArray(t)){if(!Array.isArray(e))return $;const r=t.at(-1)instanceof Yr?t.at(-1):null,i=r?t.length-1:t.length;if(r?e.length<i:e.length!==i)return $;for(let o=0;o<i;o++)if(B(e[o],t[o],n)===$)return $;return r?.name&&(n[r.name]=e.slice(i)),e}if(t!==null&&typeof t=="object"){if(e==null)return $;for(const r of Object.keys(t))if(B(e[r],t[r],n)===$)return $;return e}return Object.is(e,t)?e:$}s(B,"walk");const Gi=s((e,t)=>B(e,t,{}),"pass"),Xr=s((e,t)=>B(e,t,{})!==$,"is");function Zi(e,t){for(let n=0;n<t.length;n++){const r={};if(B(e,t[n],r)!==$)return{index:n,parts:r}}return{index:-1,parts:null}}s(Zi,"which");function Yi(e,t,n){for(const[r,i]of t){const o={},a=B(e,r,o);if(a!==$)return yt(i)?i(a,o):i}return yt(n)?n(e):n}s(Yi,"match");const rt=s(e=>Array.isArray(e)?e:[...e],"arrayOf"),on=s(e=>typeof e=="function"?e:t=>t?.[e],"getterOf"),Xi=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),Qi=s((e,t)=>typeof e=="string"&&typeof t=="string"?Xi.compare(e,t):e<t?-1:e>t?1:0,"compare");function vt(...e){const t=[];for(const n of e){if(n==="asc"||n==="desc"){t.length&&(t.at(-1).sign=n==="desc"?-1:1);continue}t.push({get:on(n),sign:1})}return(n,r)=>{for(const{get:i,sign:o}of t){const a=i(n),c=i(r);if(a==null||c==null){if(a==null&&c==null)continue;return a==null?1:-1}const l=Qi(a,c);if(l)return o*l}return 0}}s(vt,"by");const oe=s(e=>t=>Xr(t,e),"tester"),Qr=s(e=>t=>rt(t).filter(oe(e)),"where"),ts=s(e=>{const t=oe(e);return n=>rt(n).filter(r=>!t(r))},"without"),es=s(e=>t=>rt(t).find(oe(e)),"one"),ns=s(e=>t=>rt(t).some(oe(e)),"has"),rs=s(e=>t=>rt(t).map(on(e)),"pluck"),ss=s(e=>{const t=on(e);return n=>Object.fromEntries(rt(n).map(r=>[t(r),r]))},"keyBy"),to=s((...e)=>t=>t.sort(vt(...e)),"sortBy"),eo=s((...e)=>t=>rt(t).toSorted(vt(...e)),"toSortedBy");class T{static{s(this,"ListType")}#t;constructor(t=[]){this.#t=[...t]}static from(t){return new this(t)}static of(...t){return new this(t)}get length(){return this.#t.length}at(t){return this.#t.at(t)}includes(t){return this.#t.includes(t)}indexOf(t){return this.#t.indexOf(t)}every(t){return this.#t.every(t)}filter(t){return new T(this.#t.filter(t))}find(t){return this.#t.find(t)}findIndex(t){return this.#t.findIndex(t)}flatMap(t){return new T(this.#t.flatMap(t))}forEach(t){this.#t.forEach(t)}join(t){return this.#t.join(t)}map(t){return new T(this.#t.map(t))}reduce(...t){return this.#t.reduce(...t)}slice(t,n){return new T(this.#t.slice(t,n))}some(t){return this.#t.some(t)}toArray(){return[...this.#t]}toJSON(){return this.toArray()}has(t){return ns(t)(this.#t)}keyBy(t){return ss(t)(this.#t)}one(t){return es(t)(this.#t)}pluck(t){return new T(rs(t)(this.#t))}where(t){return new T(Qr(t)(this.#t))}without(t){return new T(ts(t)(this.#t))}toReversed(){return new T(this.#t.toReversed())}toSorted(t){return new T(this.#t.toSorted(t))}toSortedBy(...t){return new T(this.#t.toSorted(vt(...t)))}toSpliced(...t){return new T(this.#t.toSpliced(...t))}with(t,n){return new T(this.#t.with(t,n))}[Symbol.iterator](){return this.#t[Symbol.iterator]()}push(...t){return this.#t.push(...t)}pop(){return this.#t.pop()}shift(){return this.#t.shift()}unshift(...t){return this.#t.unshift(...t)}splice(...t){return this.#t.splice(...t)}sort(t){return this.#t.sort(t),this}sortBy(...t){return this.#t.sort(vt(...t)),this}reverse(){return this.#t.reverse(),this}set(t,n){return this.#t[t<0?this.#t.length+t:t]=n,this}remove(t){const n=this.#t.indexOf(t);return n>-1&&this.#t.splice(n,1),n>-1}replace(t){return this.#t=[...t],this}clear(){return this.#t.length=0,this}}Object.defineProperty(T,"name",{value:"List"});class no extends k{static{s(this,"ListSchema")}min(t){return this.check(n=>n.length>=t,`at least ${t} items`,{min:t})}max(t){return this.check(n=>n.length<=t,`at most ${t} items`,{max:t})}}const is=s(e=>new no({describe:{item:e.describe},initial:[],kind:"list",run:s((t,n)=>{const r=t instanceof T;if(!r&&!Array.isArray(t))return{issues:[{message:"expected a list",path:n}]};const i=r?t.toArray():t,o=[],a=i.map((c,l)=>{const u=e.validate(c,[...n,l]);return u.issues&&o.push(...u.issues),u.value});return o.length?{issues:o}:a.some((c,l)=>c!==i[l])?{value:r?new t.constructor(a):a}:{value:t}},"run")}),"listOf$1"),os=["length","at","includes","indexOf","every","filter","find","findIndex","flatMap","forEach","join","map","reduce","slice","some","toArray","toJSON",Symbol.iterator,"has","keyBy","one","pluck","where","without","toReversed","toSorted","toSortedBy","toSpliced","with"],as={clear:s(e=>e.length>0,"clear"),pop:s(e=>e.length>0,"pop"),push:s((e,...t)=>t.length>0,"push"),remove:s((e,t)=>e.includes(t),"remove"),replace:!0,reverse:s(e=>e.length>1,"reverse"),set:s((e,t,n)=>!Object.is(e.at(t),n),"set"),shift:s(e=>e.length>0,"shift"),sort:s(e=>e.length>1,"sort"),sortBy:s(e=>e.length>1,"sortBy"),splice:!0,unshift:s((e,...t)=>t.length>0,"unshift")},cs=s((e,t,n=[])=>new e(t.parse(n)),"ofItems"),ae=z(T,is,cs),ls=z(j(ae,{reads:os,writes:as}),is,cs);D(ae,ls);const ro=s(e=>e instanceof k?e:At(e),"rowOf");function an(e){const t=ro(e);if(t.kind!=="record")throw new TypeError("[rat] a Table needs fields or a Record schema");return new k({describe:{row:t.describe},initial:[],kind:"table",parts:{row:t},run:s((n,r)=>{const i=n instanceof Et;if(!i&&!Array.isArray(n))return{issues:[{message:"expected a table",path:r}]};const o=i?n.toArray():n,a=[];return o.forEach((c,l)=>{const u=t.validate({...t.initial,...c},[...r,l]);u.issues&&a.push(...u.issues)}),a.length?{issues:a}:{value:n}},"run")})}s(an,"tableOf");class Et extends ae{static{s(this,"TableType")}constructor(t,n=[]){const r=t instanceof Et,i=r?t.schema:t instanceof k&&t.kind==="table"?t:t instanceof k?an(t):null;if(!i)throw new TypeError("[rat] a Table needs a Table schema or a Record schema");const o=i.parts.row,a=Object.keys(o.parts),c=s(l=>{const u=o.parse({...o.initial,...l});return Object.freeze(Object.fromEntries(a.map(p=>[p,u[p]])))},"parse");super((r?t.toArray():n).map(c)),Object.defineProperty(this,"schema",{value:i}),Object.defineProperty(this,"parse",{value:c})}get columns(){return Object.keys(this.schema.parts.row.parts)}column(t){return this.map(n=>n[t])}push(...t){return super.push(...t.map(this.parse))}unshift(...t){return super.unshift(...t.map(this.parse))}set(t,n){return super.set(t,this.parse(n))}replace(t){return super.replace([...t].map(this.parse))}update(t,n){return super.set(t,this.parse({...this.at(t),...n}))}splice(t,n,...r){return arguments.length<2?super.splice(t):super.splice(t,n,...r.map(this.parse))}toJSON(){return this.toArray()}}Object.defineProperty(Et,"name",{value:"Table"});const cn=z(Et,an),us=z(j(cn,{reads:[...os,"column","columns"],writes:{...as,update:!0}}),an);D(cn,us);const ds=j(Set,{reads:["has","size","keys","values","entries","forEach",Symbol.iterator],writes:{add:s((e,t)=>!e.has(t),"add"),clear:s(e=>e.size>0,"clear"),delete:s((e,t)=>e.has(t),"delete")}});D(Set,ds);const so=s((...e)=>new k({describe:{items:e.map(t=>t.describe)},initial:e.map(t=>t.initial),kind:"tuple",parts:e,run:s((t,n)=>{const r=t instanceof ct;if(!r&&!Array.isArray(t))return{issues:[{message:"expected a tuple",path:n}]};if(t.length!==e.length)return{issues:[{message:`expected ${e.length} items`,path:n}]};const i=[],o=e.map((a,c)=>{const l=a.validate(t[c],[...n,c]);return l.issues&&i.push(...l.issues),l.value});return i.length?{issues:i}:o.some((a,c)=>a!==t[c])?{value:r?new ct(...o):o}:{value:t}},"run")}),"tupleOf");class ct{static{s(this,"TupleType")}constructor(...t){t.forEach((n,r)=>{this[r]=n}),Object.defineProperty(this,"length",{value:t.length}),Object.freeze(this)}static from(t){return new this(...t)}at(t){return this[t<0?this.length+t:t]}equals(t){if(!(t instanceof ct)||t.length!==this.length)return!1;for(let n=0;n<this.length;n++)if(!Object.is(this[n],t[n]))return!1;return!0}with(t,n){const r=[...this];return r[t<0?this.length+t:t]=n,new this.constructor(...r)}toArray(){return[...this]}toJSON(){return this.toArray()}*[Symbol.iterator](){for(let t=0;t<this.length;t++)yield this[t]}}Object.defineProperty(ct,"name",{value:"Tuple"});const io=z(ct,so,(e,t,n=t.initial)=>new e(...t.parse(n)));class oo extends k{static{s(this,"UnionSchema")}which(t){for(const[n,r]of this.parts)if(r.is(t))return n;return null}}function ao(...e){const t=e.length===1&&!kr(e[0]),n=t?Object.entries(e[0]):e.map((r,i)=>[i,r]);if(!n.length)throw new TypeError("[rat] a Union needs at least one case");return new oo({describe:{cases:n.map(([r,i])=>({name:r,...i.describe}))},initial:n[0][1].initial,kind:"union",parts:n,run:s((r,i)=>{for(const[,o]of n){const a=o.validate(r,i);if(!a.issues)return a}return{issues:[{message:`none of ${n.map(([o,a])=>t?o:a.kind).join(", ")}`,path:i}]}},"run")})}s(ao,"Union");const R=s((e,t,n)=>Math.min(n,Math.max(t,e)),"clamp"),ps=s(e=>(e%360+360)%360,"turn");function ln(e,t,n){t/=100,n/=100;const r=s(a=>(a+ps(e)/30)%12,"k"),i=t*Math.min(n,1-n),o=s(a=>(n-i*Math.max(-1,Math.min(r(a)-3,9-r(a),1)))*255,"f");return[o(0),o(8),o(4)]}s(ln,"hslToRgb");function co(e,t,n){e/=255,t/=255,n/=255;const r=Math.max(e,t,n),i=Math.min(e,t,n),o=(r+i)/2,a=r-i;if(!a)return[0,0,o*100];const c=r===e?(t-n)/a%6:r===t?(n-e)/a+2:(e-t)/a+4;return[ps(c*60),a/(1-Math.abs(2*o-1))*100,o*100]}s(co,"rgbToHsl");const lo=/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,uo=/^(rgba?|hsla?)\((.*)\)$/i,po=s(e=>e.endsWith("%")?parseFloat(e)*2.55:parseFloat(e),"channel"),Hn=s(e=>e===void 0?1:e.endsWith("%")?parseFloat(e)/100:parseFloat(e),"alpha");function ho(e){e=e.trim();const t=lo.exec(e)?.[1];if(t){const o=t.length<5?[...t].map(p=>p+p).join(""):t,[a,c,l,u=255]=o.match(/../g).map(p=>parseInt(p,16));return[a,c,l,u/255]}const[,n,r]=uo.exec(e)??[];if(!n)return null;const i=r.trim().split(/[\s,/]+/).filter(Boolean);return i.length<3||i.length>4?null:n[0].toLowerCase()==="r"?[...i.slice(0,3).map(po),Hn(i[3])]:[...ln(parseFloat(i[0]),parseFloat(i[1]),parseFloat(i[2])),Hn(i[3])]}s(ho,"fromString");function Pt(e){let t=null;return e instanceof un?t=e.toArray():typeof e=="string"?t=ho(e):Array.isArray(e)?t=[e[0],e[1],e[2],e[3]??1]:Bt(e)&&"r"in e?t=[e.r,e.g,e.b,e.a??1]:Bt(e)&&"h"in e&&(t=[...ln(e.h,e.s,e.l),e.a??1]),t?.every(Number.isFinite)?t:null}s(Pt,"rgba");const hs=s((...e)=>{if(e.length)throw new TypeError("[rat] Color() is the schema and takes nothing, a color is new Color(…)");return new k({initial:"#000000",kind:"color",run:s((t,n)=>Pt(t)?{value:t}:{issues:[{message:"expected a color",path:n}]},"run")})},"colorOf$1");class un{static{s(this,"ColorType")}#t;#n;#r;#e;constructor(t="#000000"){this.set(t)}set(t){const n=Pt(t);if(!n)throw new TypeError(`[rat] not a color: ${t}`);return[this.#t,this.#n,this.#r,this.#e]=[R(n[0],0,255),R(n[1],0,255),R(n[2],0,255),R(n[3],0,1)],this}get r(){return Math.round(this.#t)}get g(){return Math.round(this.#n)}get b(){return Math.round(this.#r)}get a(){return Math.round(this.#e*1e3)/1e3}set r(t){this.#t=R(t,0,255)}set g(t){this.#n=R(t,0,255)}set b(t){this.#r=R(t,0,255)}set a(t){this.#e=R(t,0,1)}get h(){return Math.round(this.toHsl()[0])}get s(){return Math.round(this.toHsl()[1])}get l(){return Math.round(this.toHsl()[2])}set h(t){const[,n,r]=this.toHsl();this.#s(t,n,r)}set s(t){const[n,,r]=this.toHsl();this.#s(n,R(t,0,100),r)}set l(t){const[n,r]=this.toHsl();this.#s(n,r,R(t,0,100))}#s(t,n,r){[this.#t,this.#n,this.#r]=ln(t,n,r)}get hex(){return"#"+[this.#t,this.#n,this.#r,...this.#e<1?[this.#e*255]:[]].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}set hex(t){this.set(t)}mix(t,n=.5){const r=Pt(t);if(!r)throw new TypeError(`[rat] not a color: ${t}`);return new this.constructor(this.toArray().map((i,o)=>i+(r[o]-i)*n))}equals(t){const n=Pt(t);return!!n&&this.toArray().every((r,i)=>Math.abs(r-n[i])<1e-6)}toArray(){return[this.#t,this.#n,this.#r,this.#e]}toHsl(){return[...co(this.#t,this.#n,this.#r),this.#e]}toJSON(){return this.hex}toString(){return this.hex}}Object.defineProperty(un,"name",{value:"Color"});const H=s(e=>(t,n)=>!Object.is(t[e],n),"differs"),fs=s((e,t,n=t.initial)=>new e(t.parse(n)),"ofValue"),dn=z(un,hs,fs),ms=z(j(dn,{reads:["r","g","b","a","h","s","l","hex","equals","mix","toArray","toHsl","toJSON","toString"],writes:{a:H("a"),b:H("b"),g:H("g"),h:H("h"),hex:H("hex"),l:H("l"),r:H("r"),s:H("s"),set:s((e,t)=>!e.equals(t),"set")}}),hs,fs);D(dn,ms);const fo=s(e=>typeof e=="string"&&e!==""||Number.isInteger(e),"isKey"),gs=s((e,t)=>n=>fo(n)?{value:n}:{issues:[{message:e,path:t}]},"key");class mo extends k{static{s(this,"IdSchema")}get counter(){return this.derive({describe:{counter:!0}})}make(t=[]){return this.describe.counter?t.reduce((n,r)=>Number.isInteger(r)&&r>n?r:n,0)+1:crypto.randomUUID()}}const go=new mo({initial:null,kind:"id",nullable:!0,run:s((e,t)=>gs("a key",t)(e),"run")}),bo=s(e=>new k({describe:{table:e},initial:null,kind:"ref",run:s((t,n)=>gs(`a key of ${e}`,n)(t),"run")}),"Ref"),yo=Object.freeze(Object.defineProperty({__proto__:null,$Array:en,$Bool:ji,$Color:ms,$Dict:nn,$Enum:Wr,$List:ls,$Map:Ur,$Num:Ri,$Record:Fr,$Set:ds,$Str:Pi,$Table:us,Bool:vr,CamelCase:hi,Color:dn,ConstantCase:fi,Dict:re,Enum:ie,Fn:Sr,Id:go,KebabCase:xr,List:ae,LowerCase:mi,MockingCase:gi,NONE:$,Num:wr,PascalCase:bi,Record:At,Ref:bo,Schema:k,SnakeCase:yi,Str:_,Table:cn,TitleCase:vi,Tuple:io,Union:ao,UpperCase:wi,any:sn,by:vt,either:Hi,has:ns,is:Xr,isSchema:kr,keyBy:ss,match:Yi,one:es,part:Ji,pass:Gi,pattern:Wi,pluck:rs,rest:Ki,sortBy:to,toSortedBy:eo,where:Qr,which:Zi,without:ts},Symbol.toStringTag,{value:"Module"})),bs="https://code.pulgasari.dev/gestalt/packages/css",vo=["compact","normal","comfortable","touch"],wo=["sharp","soft","round","pill"],ko=["landing","mobile-basic","three-panels"],xo=["flat","rounded"],So=["auto","dark","light"],$o=["andromeda","monochrome"],Oo=["layout"],It={density:"density",geometry:"geometry",mode:"scheme",palette:"palette",skin:"skin"},pn={look:"looks"},Ht={},Ao=s(async e=>(await v(async()=>{const{setSkin:t}=await import("./index-D_xAKS-Y.js");return{setSkin:t}},__vite__mapDeps([0,1,2,3]),import.meta.url)).setSkin(e||null),"setSkin"),Jn=s(e=>v(()=>import(`@domina/verbs/${e}.js`),[],import.meta.url).then(t=>t[e]??t.default),"domina"),Eo=s(e=>getComputedStyle(document.documentElement).getPropertyValue(`--${e}`).trim()||null,"readToken"),To=s(e=>new RegExp(`style\\(\\s*--${e}\\s*:\\s*([\\w-]+)\\s*\\)`),"presetPattern");function _o(e,t){const n=document.documentElement,r=e.replace(/-(\w)/g,(i,o)=>o.toUpperCase());if(t==null||t===!1){n.style.removeProperty(`--${e}`),delete n.dataset[r];return}n.style.setProperty(`--${e}`,t),n.dataset[r]=t}s(_o,"setToken");async function zo(e,t){const n=`gestalt:${e}`;return t?(await Jn("adoptStyleSheet"))(`${bs}/${pn[e]}/${t}.css`,{key:n,replace:!0}):(await Jn("releaseStyleSheet"))(n)}s(zo,"setSheet");function ys(e,t,n=[]){for(const r of e){const i=r instanceof CSSContainerRule&&r.conditionText.match(t);i?n.push(i[1]):(r.cssRules??r.styleSheet?.cssRules)&&ys(r.cssRules??r.styleSheet.cssRules,t,n)}return n}s(ys,"presetsOf");async function Co(e){try{return(await import(e,{with:{type:"css"}})).default}catch{const t=await fetch(e);if(!t.ok)throw new Error(`[@gestalt/core] ${t.status} ${t.statusText} - ${e}`);return new CSSStyleSheet().replace(await t.text())}}s(Co,"loadSheet");const _t=new Map;function No(e,t){return _t.has(t)||_t.set(t,Co(`${bs}/${e}`).then(n=>[...new Set(ys(n.cssRules,To(t)))]).catch(n=>{throw _t.delete(t),n})),_t.get(t)}s(No,"presetNames");const Lo=s(()=>No("palettes.css","palette"),"palettes");async function jo(e={}){const t=document.querySelector("rat-app, app-root")??document.querySelector("#app");for(const n of Oo)!t||!(n in e)||(e[n]===!1||e[n]==null?delete t.dataset[n]:t.dataset[n]=e[n]);for(const[n,r]of Object.entries(It))n in e&&_o(r,e[n]);return await Promise.all([...Object.keys(pn).filter(n=>n in e).map(n=>zo(n,e[n])),"skin"in e&&Ao(e.skin)]),Object.assign(Ht,e),{...Ht}}s(jo,"set");const Ro=s(e=>{const t=s(n=>n in It?Ht[n]??Eo(It[n]):Ht[n]??null,"read");return e?t(e):Object.fromEntries([...Object.keys(It),...Object.keys(pn)].map(n=>[n,t(n)]))},"get"),Po=s((e=document.body)=>{const t=getComputedStyle(e);return Object.fromEntries(["bg","fg","ink"].map(n=>[n,t.getPropertyValue(`--color-${n}`).trim()]))},"colors"),Io={colors:Po,get:Ro,palettes:Lo,set:jo,densities:vo,geometries:wo,layouts:ko,looks:xo,modes:So,skins:$o},vs={...yo};globalThis.RAT=vs;const ws=s(e=>t=>typeof t===e,"isTypeOf"),Dt=ws("function"),Do=ws("string"),Ie="rat:command",Wn={false:!1,null:null,true:!0},Mo=s(e=>e in Wn?Wn[e]:/^-?\d+(\.\d+)?$/.test(e)?Number(e):e,"argumentOf"),ye=new Map;function ks(e){if(!ye.has(e)){const[,t=e,n=""]=/^([^[\]]+)\[(.*)\]$/.exec(String(e).trim())??[];ye.set(e,{args:n.trim()?n.split(",").map(r=>Mo(r.trim())):[],name:t.trim()})}return ye.get(e)}s(ks,"parseCommand");function Vo(e,t,n=null,r=[]){const{args:i,name:o}=ks(t),a=o.includes(":")?o:Ie;return e.dispatchEvent(new CustomEvent(a,{bubbles:!0,cancelable:!0,composed:!0,detail:{args:[...i,...r],event:n,name:o}}))}s(Vo,"command");const bu=s(e=>t=>Vo(t.currentTarget,e,t),"commandListener"),De="rat:error";function lt(e,t){const n=new CustomEvent(De,{bubbles:!0,cancelable:!0,composed:!0,detail:{boundary:null,error:t}});return(!e?.isConnected||e.dispatchEvent(n))&&(globalThis.reportError??console.error)(t),n.detail.boundary}s(lt,"raise");const Kn=s((e,t=null)=>function(...n){try{const r=e.apply(this,n);return Dt(r?.catch)&&r.catch(i=>lt(t??this,i)),r}catch(r){lt(t??this,r)}},"guard"),Gn={effect:s(e=>Ye(e,null),"effect"),scope:s(e=>Re(e,null),"scope")};function Bo(e,t,n){const r=n?{...Gn,...n}:Gn;return ni(e,t,r)}s(Bo,"render");function hn(e,t,n={}){const r=Do(t)?document.querySelector(t):t,i={effect:s(a=>Ye(Kn(a,r),null),"effect"),scope:s(a=>Re(Kn(a,r),null),"scope")},[,o]=Re(()=>Bo(r,e(n),i),null);return()=>{ei(r),o()}}s(hn,"mount");function yu(e,t,n){if(!Dt(e))throw new TypeError(`[rat] @ needs a function, got ${typeof e}`);return r=>{let i=null,o=null;Ti(()=>o?.()),Ye(()=>{const a=t?.();$t(()=>{if(i&&Dt(i.update)){i.update(a);return}o?.(),i=e(r,a,n)??null,o=Dt(i)?i:i?.destroy?()=>i.destroy():null})})}}s(yu,"use");const Zn=new Map;function vu(e,t){if(Zn.has(e))return;const n=new CSSStyleSheet;n.replaceSync(t),Zn.set(e,n),document.adoptedStyleSheets=[...document.adoptedStyleSheets,n]}s(vu,"style");const Uo={"?description":_,exec:Sr,"?title":_},qo=re(_.to(xr),Uo);class Fo extends nn{static{s(this,"Commands")}constructor(t={}){super(qo,t)}read(t){return t?.exec}set(t,n){return super.set(t,typeof n=="function"?{exec:n}:n)}assign(t){for(const[n,r]of Object.entries(t))this.set(n,r);return this}run(t,...n){const{args:r,name:i}=ks(t);return this.get(i)?.exec(...r,...n)}listen(t=document){const n=s(r=>{const{args:i=[],event:o,name:a}=r.detail??{},c=this.get(a);if(!c)return;r.stopPropagation();const l=r.composedPath()[0];try{c.exec(...i,o)?.catch?.(u=>lt(l,u))}catch(u){lt(l,u)}},"handle");return t.addEventListener(Ie,n),()=>t.removeEventListener(Ie,n)}}const Ho=s((e,t)=>typeof e=="string"?Ko[e]?.(t)??null:e,"modeOf"),fn=s(e=>Object.fromEntries(new URLSearchParams(e)),"queryOf"),ce=s(e=>String(e??"").split("/").filter(Boolean),"segmentsOf"),Jo=s((...e)=>"/"+e.flatMap(ce).join("/"),"join"),Wo=s((e,t)=>JSON.stringify(e)===JSON.stringify(t),"sameQuery"),Ko={hash:Zo,memory:Qo,path:Yo,query:Xo},ve=new Map,le=s(e=>{const t=e.indexOf("?");return t<0?{path:e||"/",query:{}}:{path:e.slice(0,t)||"/",query:fn(e.slice(t+1))}},"split"),Go=s((e,t)=>{for(const n of e)addEventListener(n,t);return()=>{for(const n of e)removeEventListener(n,t)}},"onWindow");function mn(){let e=history.state?.ratIndex??0;return history.state?.ratIndex===void 0&&history.replaceState({...history.state,ratIndex:e},""),{listen:s(t=>Go(["popstate"],t),"listen"),moved:s(()=>{e=history.state?.ratIndex??e},"moved"),push:s((t,n)=>n?history.replaceState({ratIndex:e},"",t):history.pushState({ratIndex:++e},"",t),"push"),undo:s(()=>{const t=(history.state?.ratIndex??e)-e;return t&&history.go(-t),t!==0},"undo")}}s(mn,"historyOf");function Zo(){const e=mn();return{...e,read:s(()=>le(decodeURI(location.hash.slice(1))),"read"),write:s((t,{replace:n}={})=>e.push(`#${t}`,n),"write")}}s(Zo,"hash");function Yo({base:e=""}={}){const t=mn(),n=e.replace(/\/$/,"");return{...t,base:n,read:s(()=>({path:decodeURI(location.pathname.startsWith(n)?location.pathname.slice(n.length):location.pathname)||"/",query:fn(location.search)}),"read"),write:s((r,{replace:i}={})=>t.push(n+r,i),"write")}}s(Yo,"path");function Xo({key:e="route"}={}){const t=mn();return{...t,read:s(()=>{const{[e]:n="/",...r}=fn(location.search);return{path:n,query:r}},"read"),write:s((n,{replace:r}={})=>{const{path:i,query:o}=le(n),a=new URLSearchParams({[e]:i,...o});t.push(`${location.pathname}?${a}${location.hash}`,r)},"write")}}s(Xo,"query");function Qo({initial:e="/"}={}){const t=[e],n=new Set;return{back:s(()=>{if(t.length>1){t.pop();for(const r of n)r()}},"back"),listen:s(r=>(n.add(r),()=>n.delete(r)),"listen"),read:s(()=>le(t.at(-1)),"read"),write:s((r,{replace:i}={})=>{i?t[t.length-1]=r:t.push(r)},"write")}}s(Qo,"memory");function xs(e){return ve.has(e)||ve.set(e,ce(e).map(t=>t==="*"?{kind:"rest"}:t.startsWith(":")?{kind:"param",name:t.slice(1).replace(/\?$/,""),optional:t.endsWith("?")}:{kind:"literal",value:decodeURIComponent(t)})),ve.get(e)}s(xs,"compile");function mt(e,t,{exact:n=!1}={}){const r=xs(e),i=ce(t),o={};let a=0;for(const l of r){if(l.kind==="rest")return o["*"]=i.slice(a).map(decodeURIComponent).join("/"),{params:o,rest:""};const u=i[a];if(l.kind==="literal"){if(u===void 0||decodeURIComponent(u)!==l.value)return null;a++}else if(u===void 0){if(!l.optional)return null}else o[l.name]=decodeURIComponent(u),a++}const c=a<i.length?"/"+i.slice(a).join("/"):"";return n&&c?null:{params:o,rest:c}}s(mt,"matchRoute");const ta=s((e,t={})=>"/"+xs(e).map(n=>n.kind==="literal"?encodeURIComponent(n.value):n.kind==="rest"?t["*"]??"":t[n.name]==null?"":encodeURIComponent(t[n.name])).filter(Boolean).join("/"),"fill$1"),we=s((e,t)=>{const n=new URLSearchParams(t).toString();return n?`${e}?${n}`:e},"toFull");function ea({base:e="",initial:t="/",key:n="route",mode:r="hash",resolve:i=null,root:o=null}={}){const a=Ho(r==="none"?"memory":r,{base:e,initial:t,key:n});if(!a)throw new TypeError(`[rat] router: no mode "${r}"`);const c={change:new Set,leave:new Set},l=new Set,u=new Set,p=Ai("/"),d={params:{},path:"/",query:{}};let h=0,g=null;const b=s((m,y)=>{for(const x of c[m])x(y)},"emit");function w({path:m,query:y}){Object.assign(d,{path:m,query:y}),p.value=m;for(const{fn:x,pattern:A}of l){const W=mt(A,m,{exact:!0});W&&x(W.params,M)}b("change",{path:m,query:y,router:M})}s(w,"apply");async function E(m){const y={defaultPrevented:!1,from:d.path,to:m,preventDefault(){this.defaultPrevented=!0}};for(const x of c.leave)await x(y);return!y.defaultPrevented}s(E,"guarded");function it(m,y={}){if(g?.full===m)return g.promise;const x=Xs(m,y).finally(()=>{g?.promise===x&&(g=null)});return g={full:m,promise:x},x}s(it,"navigate");async function Xs(m,{outside:y=!1,replace:x=!1}={}){const A=le(m);if(A.path===d.path&&Wo(A.query,d.query))return!0;const W=++h,me=c.leave.size===0||await E(A.path);return W!==h?!1:me?(y?a.moved?.():a.write(we(A.path,A.query),{replace:x}),w(A),!0):(y&&!a.undo?.()&&a.write(we(d.path,d.query),{replace:!0}),!1)}s(Xs,"run");const Qs=s(m=>String(m).startsWith("/")?String(m):i?.(String(m))??`/${m}`,"pathOf");function jn(m){if(m.defaultPrevented||m.button!==0||m.altKey||m.ctrlKey||m.metaKey||m.shiftKey)return;const y=m.composedPath().find(A=>A.localName==="a"&&A.href);if(!y||y.target&&y.target!=="_self"||y.hasAttribute("download")||y.hasAttribute("data-native"))return;const x=new URL(y.href);x.origin!==location.origin||!x.pathname.startsWith(a.base??"")||(m.preventDefault(),it(x.pathname.slice((a.base??"").length)+x.search))}s(jn,"onClick");const M={$path:p,mode:r,get params(){return d.params},get path(){return d.path},get query(){return d.query},set params(m){d.params=m??{}},back(){return a.back?a.back():history.back()},go(m,y){return it(Qs(m),y)},match(m,y){const x={fn:y,pattern:m};l.add(x);const A=mt(m,d.path,{exact:!0});return A&&y(A.params,M),()=>l.delete(x)},on(m,y,{unload:x=!1}={}){c[m].add(y);let A=s(()=>c[m].delete(y),"off");if(m==="leave"&&x){const W=s(Rn=>{const Pn={defaultPrevented:!1,from:d.path,to:null,unload:!0,preventDefault(){this.defaultPrevented=!0}};y(Pn),Pn.defaultPrevented&&(Rn.preventDefault(),Rn.returnValue="")},"ask");addEventListener("beforeunload",W);const me=A;A=s(()=>{me(),removeEventListener("beforeunload",W)},"off")}return A},bind(m){return m.set("go",(y,x)=>typeof y=="string"?M.go(y):void 0),m.set("back",()=>M.back()),M},start(){if(u.add(a.listen(()=>it(we(a.read().path,a.read().query),{outside:!0}))),r==="path"){const m=o??document;m.addEventListener("click",jn),u.add(()=>m.removeEventListener("click",jn))}return w(a.read()),M},stop(){for(const m of u)m();return u.clear(),M}};return M}s(ea,"createRouter");const Yn=s((e,t,n)=>{const r=Object.assign(document.createElement(e),{textContent:n});return r.setAttribute("part",t),r},"create");function gn(e,t,n=null){console.error(t),e.toggleAttribute("error",!0);const r=[Yn("pre","error",t?.message??String(t))];if(n){const i=Yn("button","retry","retry");i.type="button",i.addEventListener("click",n),r.push(i)}e.replaceChildren(...r)}s(gn,"showError");function bn(e,t){const n=s(r=>{r.defaultPrevented||(r.preventDefault(),r.detail.boundary=e,t(r.detail.error))},"take");return e.addEventListener(De,n),()=>e.removeEventListener(De,n)}s(bn,"catchErrors");const na=/\.html?$/,ra=/\.htx$/,sa=/\.rat(\.js|\.html)?$/,ia=/^(\.{1,2}\/|\/)/,oa=import.meta.url,zt=new Map,aa="rat:compiled",ca=6,la=[".rat.html",".rat",".rat.js"];let Jt=[];const Mt=new Map;function ua(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0).toString(36)}s(ua,"hashOf");async function yn(e){const{parse:t}=await v(async()=>{const{parse:i}=await import("https://esm.sh/acorn@8.14.0");return{parse:i}},[],import.meta.url),n=[],r=s(i=>{if(!(!i||!Vt(i.type))){/^(Import|ExportNamed|ExportAll)Declaration$/.test(i.type)&&i.source&&n.push({dynamic:!1,end:i.source.end,start:i.source.start,value:i.source.value}),i.type==="ImportExpression"&&i.source.type==="Literal"&&typeof i.source.value=="string"&&n.push({dynamic:!0,end:i.end,start:i.start,value:i.source.value}),i.type==="MemberExpression"&&i.object.type==="MetaProperty"&&i.object.meta.name==="import"&&i.property.name==="url"&&n.push({end:i.end,meta:!0,start:i.start});for(const o in i){const a=i[o];Fe(a)?a.forEach(r):a&&Vt(a.type)&&r(a)}}},"visit");return r(t(e,{ecmaVersion:"latest",sourceType:"module"})),n}s(yn,"specifiers");const Ss=s(e=>{const t=new URL(e).pathname;return sa.test(t)?"rat":ra.test(t)?"htx":na.test(t)?"html":null},"kindOf"),da=s(e=>ia.test(e)||/^[a-z][\w+.-]*:/i.test(e),"isUrl");function pa({dynamic:e,meta:t,value:n},r,i){if(t)return JSON.stringify(r);const o=new URL(n,r).href;return Ss(o)?e?`import(${JSON.stringify(oa)}).then(app => app.load(${JSON.stringify(o)}))`:vn(o,i).then(a=>JSON.stringify(a)):e?`import(${JSON.stringify(o)})`:JSON.stringify(o)}s(pa,"replacement");async function $s({code:e,found:t},n,r){const i=t.filter(({meta:a,value:c})=>a||da(c)).sort((a,c)=>a.start-c.start),o=await Promise.all(i.map(a=>pa(a,n,r)));for(let a=i.length-1;a>=0;a--){const{end:c,start:l}=i[a];e=e.slice(0,l)+o[a]+e.slice(c)}return e}s($s,"rewrite");function ha(e,t){const n=s(i=>new URL(i.endsWith("/")?i:`${i}/`,t).href,"dir");Jt=e===!0?[{dir:new URL("./",t).href,names:null}]:[e].flat().flatMap(i=>Vt(i)?[{dir:n(i),names:null}]:Object.entries(i).map(([o,a])=>({dir:n(o),names:a}))),Mt.clear()}s(ha,"autoImport");const fa=s(e=>fetch(e,{cache:"no-cache"}).then(t=>t.ok,()=>!1),"exists");function ma(e){return Mt.has(e)||Mt.set(e,(async()=>{for(const{dir:t,names:n}of Jt)if(!(n&&!n.includes(e))){for(const r of la)if(await fa(t+e+r))return t+e+r}return null})()),Mt.get(e)}s(ma,"locate");async function ga(e=[],t,n){return!e.length||!Jt.length?"":(await Promise.all(e.map(async i=>{const o=await ma(i);if(!o)throw new Error(`[rat] ${t}: <${i}> is not imported and not found in ${Jt.map(({dir:a})=>a).join(", ")}`);return`import ${i} from ${JSON.stringify(await vn(o,n))};`}))).join(`
`)}s(ga,"importsOf");async function ba(e,t){const n=await fetch(e,{cache:"no-cache"});if(!n.ok)throw new Error(`[rat] ${e}: ${n.status} ${n.statusText}`);const r=await n.text(),i=new URL(e).pathname.split("/").pop(),o=n.headers.get("x-rat-compiled")?{code:r,found:await yn(r),unresolved:(n.headers.get("x-rat-unresolved")??"").split(",").filter(Boolean)}:await ya(r,e,i,t),a=await $s(o,e,t),c=await ga(o.unresolved,e,t);return URL.createObjectURL(new Blob([`${a}
${c}
//# sourceURL=${e}.js
`],{type:"text/javascript"}))}s(ba,"build");async function ya(e,t,n,r){const i=globalThis.caches?await caches.open(aa).catch(()=>null):null,o=`${t}${t.includes("?")?"&":"?"}rat-compiled=${ca}.${ua(e)}`,a=await i?.match(o);if(a)return a.json();document.dispatchEvent(new CustomEvent("rat:compile",{detail:{name:n,url:t}}));const{code:c,comptime:l,inlined:u,unresolved:p=[]}=await wa(e,t,n,r),d={code:c,found:await yn(c),unresolved:p};return i&&!u&&!l&&(await i.delete(t,{ignoreSearch:!0}),await i.put(o,new Response(JSON.stringify(d),{headers:{"content-type":"application/json"}}))),d}s(ya,"compiledOf");const va=s((e,t)=>async(n,{read:r})=>{const i=URL.createObjectURL(new Blob([`${await $s({code:n,found:await yn(n)},e,t)}
//# sourceURL=${e}.comptime.js
`],{type:"text/javascript"}));try{return await(await import(i)).default({read:r})}finally{URL.revokeObjectURL(i)}},"comptimeOf");async function wa(e,t,n,r){const i=Ss(t);if(i==="html")return{code:`import { raw } from '@rat/runtime';
const source = ${JSON.stringify(e)};
export default () => raw(source);
`};try{if(i==="htx")return{code:(await v(async()=>{const{compile:d}=await import("./index-rAOEOiax.js");return{compile:d}},[],import.meta.url)).compile(e,{adapter:"@rat/runtime",filename:n}).code};let o=!1;const a=s(d=>(o=!0,fetch(new URL(d,t),{cache:"no-cache"}).then(h=>h.ok?h.text():Promise.reject(new Error(`[rat] ${new URL(d,t).href}: ${h.status}`)))),"read"),{compileAsync:c}=await v(async()=>{const{compileAsync:d}=await import("./index-DbWIHkrG.js");return{compileAsync:d}},[],import.meta.url),{code:l,comptime:u,unresolved:p}=await c(e,{base:t,comptime:va(t,r),filename:n,read:a});return{code:l,comptime:u,inlined:o,unresolved:p}}catch(o){throw o.message=`${t}
${o.message}`,o}}s(wa,"compileSource");function vn(e,t=[]){if(e=new URL(e,document.baseURI).href,t.includes(e))throw new Error(`[rat] circular import: ${[...t,e].join(" -> ")}`);if(!zt.has(e)){const n=ba(e,[...t,e]);n.catch(()=>zt.delete(e)),zt.set(e,n)}return zt.get(e)}s(vn,"compileFile");const Wt=s(async e=>import(await vn(e)),"load$1"),wn=s(e=>e.default??Object.values(e).find(t=>Ce(t))??null,"componentOf"),Xn={clipboard:s(()=>v(()=>import("./clipboard-Cchpvv6o.js"),__vite__mapDeps([4,5,3,1,2]),import.meta.url),"clipboard"),database:s(()=>v(()=>import("./database-eOAtgXtU.js"),__vite__mapDeps([6,7,5,3,1,2]),import.meta.url),"database"),dialogs:s(()=>v(()=>import("./dialogs-CeESi8qB.js"),__vite__mapDeps([8,5,3,1,2]),import.meta.url),"dialogs"),external:s(()=>v(()=>import("./external-CtiLJhCU.js"),__vite__mapDeps([9,5,3,1,2]),import.meta.url),"external"),files:s(()=>v(()=>import("./files-kOB2vqK9.js"),__vite__mapDeps([10,11,5,3,1,2]),import.meta.url),"files"),folders:s(()=>v(()=>import("./folders-C8Ts7u1c.js"),__vite__mapDeps([12,11,5,3,13,1,2]),import.meta.url),"folders"),hotkeys:s(()=>v(()=>import("./hotkeys-BJvr6jvX.js"),__vite__mapDeps([14,15,3,1,2]),import.meta.url),"hotkeys"),notifications:s(()=>v(()=>import("./notifications-CvGh3jJb.js"),__vite__mapDeps([16,5,3,1,2]),import.meta.url),"notifications"),offline:s(()=>v(()=>import("./offline-DTwHCC90.js"),__vite__mapDeps([17,3,1,2]),import.meta.url),"offline"),store:s(()=>v(()=>import("./store-D0z7RPEv.js"),__vite__mapDeps([18,7,5,3,1,2]),import.meta.url),"store"),thumbnails:s(()=>v(()=>import("./thumbnails-DKoIDbkk.js"),__vite__mapDeps([19,11,5,3,1,2]),import.meta.url),"thumbnails")};async function ka(e,t){for(const[n,r]of Object.entries(t)){if(!Object.hasOwn(Xn,n)||r===!1||r==null)continue;if(n in e){console.warn(`[rat] mod "${n}": the app has a ${n} already, left out`);continue}const{default:i}=await Xn[n](),o=await i(r===!0?{}:r,{app:e,config:t});Object.defineProperty(e,n,{configurable:!0,enumerable:!0,value:o})}}s(ka,"useMods");const wu=typeof __RAT_TARGET__=="string"?__RAT_TARGET__:null,xa=s(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.getPlatform():null,"capacitor"),Sa=s(()=>globalThis.bindings&&typeof globalThis.bindings=="object"?"desktop":null,"deno"),kn=xa()??Sa()??"web",ku=kn!=="web",$a={android:"capacitor",desktop:"deno",ios:"capacitor",web:"web"},xu=$a[kn],Oa={fit:"viewport-fit"},Aa=s(e=>Oa[e]??e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),"kebab");function Ea(e){const t=typeof e=="string"?e:Object.entries(e).map(([r,i])=>`${Aa(r)}=${i}`).join(", ");let n=document.head.querySelector('meta[name="viewport"]');return n||(n=document.head.appendChild(Object.assign(document.createElement("meta"),{name:"viewport"}))),n.content=t,t}s(Ea,"viewport");const Qn=64;class Ta extends C{static{s(this,"RatArea")}static shadow=!0;static props={breakpoint:{type:String,default:"48rem",reflect:!1},dock:{type:String,default:"none",values:["bottom","end","none","start"]},expanded:Boolean,name:String,open:Boolean,overlay:{type:String,default:"auto",values:["always","auto","never"]},peek:Boolean};static styles(){return`
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
    `}get app(){return this.closest("rat-app")}get docked(){return this.dock!=="none"}get isOverlay(){return this.states.has("overlay")}show(){return this.toggle(!0)}hide(){return this.toggle(!1)}toggle(t=!this.open){return!this.docked||!!t===this.open?this:(t&&this.closeOtherDrawers(),this.open=!!t,t||(this.expanded=!1),this)}expand(t=!this.expanded){return this.docked?(t&&!this.open&&this.closeOtherDrawers(),this.expanded=!!t,t&&(this.open=!0),this):this}onConnected(){this.watchBreakpoint(),this.part("scrim").onClick(()=>this.hide()),this.parts("handle").onPointerDown(t=>this.drag(t)),this.$(document).onKeyDown(t=>{t.key==="Escape"&&this.isOverlay&&this.open&&!t.defaultPrevented&&(t.preventDefault(),this.hide())})}onDisconnected(){this.setOthersInert(!1)}onAttributeChanged(t){(t==="breakpoint"||t==="dock"||t==="overlay")&&this.watchBreakpoint()}sync(){const t=this.open,n=this.shadowRoot.querySelector('[part="content"]');n&&(n.inert=this.docked&&!t);const r=`${t}:${this.expanded}`;this._state!=null&&this._state!==r&&this.emit("toggle",{expanded:this.expanded,open:t}),this._state=r,this.setOthersInert(this.isOverlay&&t)}watchBreakpoint(){this._breakpoint?.();const t=this.overlay,n=s(a=>{this.states.toggle("overlay",a&&this.docked),this.update()},"set");if(t!=="auto"){this._breakpoint=null,n(t==="always");return}const r=globalThis.matchMedia?.(`(width < ${this.breakpoint})`),i=s(()=>n(!!r?.matches),"change"),o=s(()=>r?.removeEventListener("change",i),"stop");r?.addEventListener("change",i),this.track(o),this._breakpoint=o,n(!!r?.matches)}closeOtherDrawers(){if(this.isOverlay)for(const t of this.app?.areas??[])t!==this&&t.isOverlay&&t.open&&t.hide()}setOthersInert(t){const n=this.app;if(n){if(t&&!this._inerted){this._inerted=[...n.children].filter(r=>r!==this&&!r.inert);for(const r of this._inerted)r.inert=!0}else if(!t&&this._inerted){for(const r of this._inerted)r.inert=r.localName==="rat-view"&&!r.active;this._inerted=null}}}drag(t){const n=this.shadowRoot.querySelector('[part="sheet"]'),r=this.dock,i=r==="bottom"?"y":"x",o=r==="start"?-1:1,a=t.target,c=i==="y"?t.clientY:t.clientX;let l=0;const u=i==="y"?n.offsetHeight:n.offsetWidth,p=r==="bottom"&&this.peek?a.offsetHeight:0,d=(u-p)*o,h=this.open?0:d;a.setPointerCapture(t.pointerId),this.states.add("dragging");const g=s(w=>{if(l=(i==="y"?w.clientY:w.clientX)-c,!this.isOverlay)return;const E=Math.min(Math.max(h+l,Math.min(0,d)),Math.max(0,d));n.style.translate=i==="y"?`0 ${E}px`:`${E}px 0`},"move"),b=s(()=>{a.removeEventListener("pointermove",g),a.removeEventListener("pointerup",b),a.removeEventListener("pointercancel",b),this.states.delete("dragging"),n.style.translate="";const w=l*o;Math.abs(l)<4?this.toggle():w>Qn?this.expanded?this.expand(!1):this.hide():w<-Qn&&(this.open&&r==="bottom"?this.expand(!0):this.show())},"end");a.addEventListener("pointermove",g),a.addEventListener("pointerup",b),a.addEventListener("pointercancel",b)}}Ta.init("rat-area");const _a=s((e,t)=>JSON.stringify(e)===JSON.stringify(t),"sameParams");class za extends C{static{s(this,"RatView")}static props={active:Boolean,name:String,route:String,src:String,transition:String};static styles(){return`rat-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }`}#t=null;#n=new Set;#r=!1;#e=null;#s=0;get app(){return this.closest("rat-app")}get loaded(){return!this.src||this.#r}onConnected(){this.inert=!this.active,this.track(bn(this,t=>this.fail(t)))}on(t,n,r={}){if(t!=="leave")return super.on(t,n,r);const i={fn:n,unload:!!r.unload};return this.#n.add(i),()=>this.#n.delete(i)}async ask(t){for(const{fn:n,unload:r}of this.#n)if(!(t.unload&&!r)&&(t.unload?n.call(this,t):await n.call(this,t),t.defaultPrevented))return!1;return!0}enter(t={}){this.active||(this.active=!0,this.inert=!1,this.emit("rat:enter",{params:t})),this.src&&!_a(t,this.#e)&&this.fill(t)}leave(){this.active&&(this.active=!1,this.inert=!0,this.emit("rat:leave"))}async fill(t){const n=++this.#s;this.#e=t,this.toggleAttribute("loading",!0),this.removeAttribute("error");try{const r=wn(await Wt(new URL(this.src,this.baseURI).href));if(n!==this.#s)return;if(!r)throw new Error(`[rat] ${this.src} exports no component`);this.#t?.(),this.replaceChildren(),this.#t=hn(r,this,{...t,view:this}),this.emit("rat:mount")}catch(r){n===this.#s&&lt(this,r)}finally{n===this.#s&&(this.#r=!0,this.removeAttribute("loading"))}}fail(t){this.#t?.(),this.#t=null,gn(this,t,this.src?()=>this.retry():null)}retry(){return this.removeAttribute("error"),this.fill(this.#e??{})}onAttributeChanged(t){t!=="src"||this.#e===null||(this.#r=!1,this.active?this.fill(this.#e):this.#e=null)}}za.init("rat-view");const ke="rat-view-in",xe="rat-view-out",G=s(e=>({type:String,onChange(t,n){t==null&&n===void 0||Io.set({[e]:t??null})}}),"gestaltProp"),Se=s(e=>e.route.includes("*"),"isWild"),Ca=/^\.{1,2}\//,Na=s((e=[],t)=>Promise.all([e].flat().map(n=>Ca.test(n)?new URL(n,t).href:n).map(n=>import(n))),"imports");let N=null;class La extends C{static{s(this,"RatApp")}static props={base:String,configSrc:String,loading:Boolean,routing:ie("hash","path","query","memory","none"),src:String,transition:{default:"fade",type:String},density:G("density"),geometry:G("geometry"),layout:G("layout"),look:G("look"),mode:G("mode"),palette:G("palette"),skin:G("skin")};static styles(){return`
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

      &::view-transition-group(${ke}),
      &::view-transition-group(${xe}) { animation-duration: var(--rat-view-duration, 0.25s); }

      &::view-transition-new(${ke})  { animation: var(--rat-view-in)  var(--rat-view-duration, 0.25s) ease both; }
      &::view-transition-old(${xe}) { animation: var(--rat-view-out) var(--rat-view-duration, 0.25s) ease both reverse; }
    }`}#t=new Fo;#n=null;#r=null;#e=null;#s=new Set;#o=!1;#a=!1;#i=null;#c=!1;get commands(){return this.#t}get config(){return this.#n??{}}get router(){return this.#i}get areas(){return this.dom.getListOfElements("rat-area")}get view(){return this.views.findLast({active:!0})??null}get views(){return this.dom.getListOfElements("rat-view")}area(t){return this.areas.find({name:t})??null}toggle(t,n){const r=this.area(t);return r?.toggle(n),r}onConnected(){if(N&&N!==this&&N.isConnected){console.warn("[rat] one <rat-app> per page, this one stays out of it",this);return}N=this,this.src?this.hold(this.start()):this.configSrc&&this.hold(this.configure()),this.#i??=ea({base:this.base??"",mode:this.routing,resolve:s(t=>this.resolve(t),"resolve")}).bind(this.#t),this.track(this.#t.listen(this)),this.track(this.#i.on("change",()=>this.schedule())),this.track(this.#i.on("leave",t=>this.ask(t),{unload:!0})),this.#i.start(),this.track(()=>this.#i.stop()),this.observe.added("rat-view",()=>this.schedule()),this.observe.removed("rat-view",()=>this.schedule()),this.track(bn(this,t=>this.report(t))),this.on("rat:toggle",({detail:t})=>this.toggle(...t.args))}onDisconnected(){N===this&&(N=null)}onAttributeChanged(t){t==="src"&&N===this&&this.start()}run(t,n={}){return this.hold(this.start(t,n))}async start(t,n){const{src:r}=this;if(!r&&!t)return;const i=s(({detail:o})=>{this.dataset.status=`compiling ${o.name}`},"status");this.#o=!0,this.loading=!0,this.dataset.status=`loading ${r??"the app"}`,document.addEventListener("rat:compile",i);try{await this.configure(n);const o=wn(t?await t():await Wt(new URL(r,this.baseURI).href));if(!o)throw new Error(`[rat] ${r} exports no component`);this.#r?.(),this.replaceChildren(),this.#e=null,this.#r=hn(o,this,{app:this}),this.emit("rat:mount")}catch(o){this.loading=!1,gn(this,o,()=>{this.removeAttribute("error"),this.start(t,n)})}finally{document.removeEventListener("rat:compile",i),delete this.dataset.status,this.#o=!1,this.#c=!1,this.schedule()}}async configure(t){if(this.#n)return this.#n;if(t)return this.#n=await this.#l(t);const n=this.configSrc,r=n?new URL(n,this.baseURI).href:new URL("config.rat.js",new URL(this.src,this.baseURI)).href;if(!n&&!await fetch(r,{cache:"no-cache"}).then(a=>a.ok,()=>!1))return this.#n={};const i=await Wt(r),o=i.default??{...i};return o.autoImport&&ha(o.autoImport,r),await Na(o.import,r),this.#n=await this.#l(o)}async#l(t){return t.viewport&&Ea(t.viewport),await ka(this,t),t}levelOf(t){return[...t.querySelectorAll("rat-view[route]")].filter(n=>n.parentElement.closest("rat-view, rat-app")===t)}pick(t,n){const r=t.filter(i=>!Se(i));for(const i of r){const o=mt(i.route,n,{exact:!0});if(o)return{...o,view:i}}for(const i of r){if(!ce(i.route).length||i.loaded&&!this.levelOf(i).length)continue;const o=mt(i.route,n);if(o)return{...o,view:i}}for(const i of t.filter(Se)){const o=mt(i.route,n);if(o)return{...o,view:i}}return null}match(t){const n={},r=[];let i=this.levelOf(this),o=t;for(;i.length;){const a=this.pick(i,o);if(!a)break;Object.assign(n,a.params),r.push(a.view),o=a.rest||"/",i=this.levelOf(a.view)}return{params:n,views:r}}routeOf(t){const n=[];for(let r=t;r&&r!==this;r=r.parentElement.closest("rat-view, rat-app"))n.unshift(r.route??"");return ta(Jo(...n),this.#i.params)}resolve(t){const n=`/${t}`,{views:r}=this.match(n);if(r.length&&!r.some(Se))return n;const i=this.views.find({name:t});return i?.route==null?null:this.routeOf(i)}schedule(){this.#a||this.#o||N!==this||(this.#a=!0,queueMicrotask(()=>{this.#a=!1,this.follow()}))}follow(){const{path:t}=this.#i,{params:n,views:r}=this.match(t),i=new Set(r),o=this.views.filter(l=>l.active&&!i.has(l)),a=r.filter(l=>!l.active),c=s(()=>{for(const l of o)l.leave();for(const l of r)l.enter(n)},"swap");if(this.#i.params=n,!this.#c){this.#c=!0,c(),this.settle();return}return!o.length&&!a.length?c():(this.emit("rat:navigate",{from:o[0]?.name??null,params:n,path:t,to:a[0]?.name??null}),this.transit({from:o[0],swap:c,to:a[0]}))}transit({from:t,swap:n,to:r}){const i=s((u,p)=>{const d=u?.transition??p;return d==="fade"||d==="slide"?`rat-view-${d}`:d},"name"),o=i(r,this.transition),a=i(t,this.transition);if(!document.startViewTransition||this.a11y.reducedMotion||o==="none"&&a==="none"||this.loading)return Promise.resolve(n());const c=document.documentElement;return c.style.setProperty("--rat-view-in",o),c.style.setProperty("--rat-view-out",a),t&&(t.style.viewTransitionName=xe),document.startViewTransition({types:["rat-view"],update:s(()=>{t&&(t.style.viewTransitionName=""),r&&(r.style.viewTransitionName=ke),n()},"update")}).finished.finally(()=>{r&&(r.style.viewTransitionName=""),c.style.removeProperty("--rat-view-in"),c.style.removeProperty("--rat-view-out")})}ask(t){if(t.unload){for(const r of this.views.filter({active:!0}))r.ask(t);return}const n=new Set(this.match(t.to).views);return this.views.filter(r=>r.active&&!n.has(r)).reverse().reduce((r,i)=>r.then(o=>o&&i.ask(t)),Promise.resolve(!0))}report(t){if(console.error(t),!this.#e){this.#e=Object.assign(document.createElement("div"),{popover:"manual"}),this.#e.dataset.ratErrors="";const n=Object.assign(document.createElement("button"),{popoverTargetAction:"hide",popoverTargetElement:this.#e,textContent:"close",type:"button"});this.#e.append(document.createElement("pre"),n),this.append(this.#e)}this.#e.querySelector("pre").textContent=t?.message??String(t),this.#e.showPopover?.()}hold(t){return this.#s.add(t),t}async settle(){if(!this.loading)return;const t=s(n=>n.loaded||new Promise(r=>{n.addEventListener("rat:mount",r,{once:!0}),n.addEventListener("rat:error",r,{once:!0})}),"mounted");return await Promise.allSettled([...this.views.filter({active:!0}).map(t),...this.#s]),this.ready()}ready(){if(!this.loading)return Promise.resolve();const t=s(()=>{this.loading=!1,this.emit("rat:ready")},"done");return!document.startViewTransition||this.a11y.reducedMotion?Promise.resolve(t()):document.startViewTransition(t).finished}}La.init("rat-app");Object.defineProperties(vs,{app:{configurable:!0,enumerable:!0,get:s(()=>N,"get")},config:{configurable:!0,enumerable:!0,get:s(()=>N?.config??null,"get")},platform:{configurable:!0,enumerable:!0,value:kn},toggle:{configurable:!0,enumerable:!0,value:s((e,t)=>N?.toggle(e,t)??null,"value")}});const ja=s(e=>globalThis.requestIdleCallback?requestIdleCallback(e):setTimeout(e,1),"idle");class Ra extends HTMLElement{static{s(this,"RatPart")}static observedAttributes=["src"];#t=null;#n=null;#r=0;#e=null;props={};get mode(){return this.getAttribute("load")??"eager"}connectedCallback(){this.#e??=bn(this,t=>this.#o(t)),this.#s()}disconnectedCallback(){this.#e?.(),this.#e=null,this.stop()}attributeChangedCallback(t,n,r){this.isConnected&&n!==null&&n!==r&&this.start()}#s(){if(this.mode==="visible"&&globalThis.IntersectionObserver){const t=new IntersectionObserver(n=>{n.some(r=>r.isIntersecting)&&(t.disconnect(),this.start())});t.observe(this),this.#t=()=>t.disconnect()}else if(this.mode==="idle"){let t=!1;ja(()=>{t||this.start()}),this.#t=()=>{t=!0}}else this.start()}async start(){this.stop();const t=this.getAttribute("src");if(!t)return;const n=this.#r,r=s(({detail:i})=>{n===this.#r&&(this.dataset.status=`compiling ${i.name}`)},"status");this.toggleAttribute("loading",!0),this.removeAttribute("error"),this.dataset.status=`loading ${t}`,document.addEventListener("rat:compile",r);try{const i=wn(await Wt(new URL(t,this.baseURI).href));if(document.removeEventListener("rat:compile",r),n!==this.#r)return;if(!i)throw new Error(`[rat] ${t} exports no component`);this.replaceChildren(),this.#n=hn(i,this,this.props),this.removeAttribute("loading"),delete this.dataset.status,this.dispatchEvent(new CustomEvent("rat:mount",{bubbles:!0}))}catch(i){if(document.removeEventListener("rat:compile",r),n!==this.#r)return;lt(this,i)}}stop(){this.#r++,this.#t?.(),this.#n?.(),this.#t=this.#n=null}#o(t){this.#n?.(),this.#n=null,this.removeAttribute("loading"),delete this.dataset.status,gn(this,t,()=>this.start())}}customElements.get("rat-part")??customElements.define("rat-part",Ra);const Pa="https://api.iconify.design",$e="@aufbau/svg/aliases.js",tr="material-symbols:help",er={aufbau:"@aufbau/svg/icons/"},Os=new Map,As=new Map,nr=new Set;let Ia=null,rr=!1;const Es=s(e=>/^(\.{0,2}\/|https?:|data:)/.test(e),"isFile"),Me=s((e,t)=>{nr.has(e)||(nr.add(e),console.warn(`[svg-icon] ${t}`))},"warnOnce");function Da(e){if(!e)return null;if(Es(e))return e;const t=String(e).trim().replace("/",":");return t.includes(":")?t:Os.get(t)??null}s(Da,"resolveIcon");function Ma(e,t){try{return import.meta.resolve(`${e}${t}.svg`)}catch{return Me(e,`"${e}" could not be resolved, add it to the importmap.`),null}}s(Ma,"localUrl");function Va(e){if(Es(e))return e;const t=As.get(e);if(t)return`data:image/svg+xml,${encodeURIComponent(t)}`;const[n,...r]=e.split(":"),i=r.join(":");return!n||!i?null:er[n]?Ma(er[n],i):`${Pa}/${encodeURIComponent(n)}/${encodeURIComponent(i)}.svg`}s(Va,"iconUrl");class xn extends C{static{s(this,"SvgIcon")}static attr={color:String,icon:String,label:String,mode:{type:String,default:"mask",values:["mask","image"]},size:String};static styles=`svg-icon {
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
  }`;static register(t){for(const[n,r]of Object.entries(t??{}))Os.set(n,r);return this}static provide(t){for(const[n,r]of Object.entries(t??{}))As.set(n,r);return this}static loadDefaults(){return Ia??=import($e).then(t=>{this.register(t.default)}).catch(t=>Me($e,`default aliases unavailable, "${$e}" could not be imported: ${t?.message??t}`)).finally(()=>{rr=!0})}sync(){const{color:t,icon:n,label:r,size:i}=this.getAttr();let o=Da(n);if(n&&!o&&!rr){xn.loadDefaults().then(()=>this.update());return}n&&!o&&(Me(n,`unknown icon "${n}", showing ${tr}.`),o=tr);const a=o?Va(o):null;this.setVar({"--icon-color":t,"--icon-size":i,"--icon-url":a&&`url("${a}")`}),this.internals&&(this.internals.role=r?"img":null,this.internals.ariaLabel=r||null,this.internals.ariaHidden=r?null:"true")}}xn.init();const I=s(e=>Object.fromEntries(Object.entries(e??{}).filter(([,t])=>t!==!1&&t!=null&&t!=="")),"attrs"),Sn=s(e=>e.kind==="bool","fits"),Ts=s(e=>{const{icon:t,iconChecked:n}=e.getAttr();return t||n?{off:t||n,on:n||t}:null},"iconsOf");function $n(e,t,n){const r=e.getAttr("label");return f`
    <button type="button" part="control" ...${I({role:n})}>
      ${t}
      ${Ts(e)&&f`<svg-icon part="icon"></svg-icon>`}
      ${r&&f`<span part="label">${r}</span>`}
    </button>
  `}s($n,"control");const On=s((e,t)=>t.on("click",'[part~="control"]',()=>e.toggle()),"events");function An(e){const t=e.part("control").node,n=e.checked;t.setAttribute(e.look==="button"?"aria-pressed":"aria-checked",String(n)),t.part.toggle("checked",n);const r=Ts(e);r&&t.querySelector("svg-icon").setAttribute("icon",n?r.on:r.off)}s(An,"update");const Ba={fits:Sn,events:On,update:An,css:`
    [part~="control"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(normal);
    }

    [part~="checked"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
  `,render:s(e=>$n(e,"",null),"render"),focus:s(e=>e.part("control").node,"focus")},Ua={fits:Sn,events:On,update:An,css:`
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
  `,render:s(e=>$n(e,f`<span part="check"><svg-icon part="mark" icon="lucide:check"></svg-icon></span>`,"checkbox"),"render"),focus:s(e=>e.part("control").node,"focus")},pt=`
  [part~="box"] {
    border         : var(--input-line);
    border-radius  : --radius();
    min-block-size : --space(9);
    padding-inline : --space(small);

    &:focus-within { border-color: var(--color-ink, Highlight); }
  }

  [part~="icon"], [part~="action"] { opacity: 0.65; }
  [part~="action"]:hover          { opacity: 1; }
`,ue=s(e=>e.iconName&&f`<svg-icon part="icon" icon="${e.iconName}"></svg-icon>`,"icon$1");function wt(e,t=0,n={}){const{autocomplete:r,max:i,maxlength:o,min:a,minlength:c,pattern:l,step:u}=e.getAttr(),p=e.placeholder;return f`<input part="input" data-index="${t}" ...${{...I({autocomplete:r,max:i,maxlength:o,min:a,minlength:c,pattern:l,placeholder:p,step:u,type:e.valueType.input}),...n}} />`}s(wt,"field$1");function de(e,t){t.on("input","input[data-index]",(n,r)=>e.setPart(Number(r.dataset.index),r.value)),t.on("change","input[data-index]",(n,r)=>e.setPart(Number(r.dataset.index),r.value,{final:!0}))}s(de,"fieldEvents");function pe(e){const t=e.values,n=!!e.getAttr("readonly");for(const r of e.root.querySelectorAll("input[data-index]")){if(r.readOnly=n,r===e.focused)continue;const i=t[Number(r.dataset.index)]??"";r.value!==i&&(r.value=i)}}s(pe,"updateFields");const En=s(e=>e.root.querySelector("input[data-index]"),"firstField"),qa=s(e=>f`${(e.suggestionList??[]).map(t=>f`<option value="${t}"></option>`)}`,"options"),sr=s(e=>queueMicrotask(()=>e.part("input").focus()),"refocus"),Fa={fits:s(e=>e.kind==="free"&&e.count==="multiple","fits"),css:`
    ${pt}
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
  `,render:s(e=>f`
    ${ue(e)}
    ${e.values.map((t,n)=>f`
      <span part="chip">
        <span part="label">${t}</span>
        <button type="button" part="remove" data-index="${n}" aria-label="${`remove ${t}`}" tabindex="-1"><svg-icon icon="lucide:x"></svg-icon></button>
      </span>
    `)}
    <input part="input" type="${e.valueType.input}" placeholder="${e.placeholder||"add…"}" enterkeyhint="done" ...${I({list:"suggestionList"in e&&"suggestions"})} />
    ${"suggestionList"in e?f`<datalist id="suggestions">${qa(e)}</datalist>`:""}
  `,"render"),events(e,t){const n=s(r=>{r.value.trim()&&(e.add(r.value),sr(e))},"add");t.on("click",'[part~="remove"]',(r,i)=>e.removeAt(Number(i.dataset.index))),t.$(e.root).on("input",async r=>{const i=e.part("input").node;if(r.target!==i||(i.setCustomValidity(""),typeof e.suggest!="function"))return;const o=i.value,a=await e.suggest(o);i.value===o&&(e.suggested=Array.isArray(a)?a.map(String):[],e.update())}),t.$(e.root).on("change",r=>{r.target===e.part("input").node&&n(r.target)}),t.$(e.root).on("keydown",r=>{const i=e.part("input").node;r.target===i&&(r.key==="Enter"||r.key===","?(r.preventDefault(),n(i)):r.key==="Backspace"&&!i.value&&e.values.length&&(e.removeAt(e.values.length-1),sr(e)))})},update(e){const t=e.part("input").node;t&&(t.readOnly=!!e.getAttr("readonly"))},focus:s(e=>e.part("input").node,"focus")},Ha={ArrowLeft:-1,ArrowRight:1},Ja={ArrowDown:1,ArrowUp:-1};function _s(e,t,n,{sideways:r=!0}={}){if(e==="Home")return 0;if(e==="End")return n-1;const i=Ja[e]??(r?Ha[e]:void 0);return i?t<0?0:(t+i+n)%n:null}s(_s,"nextIndex");const ut=s(e=>e.hidden||e.matches(':disabled, [aria-disabled="true"]'),"isInactive"),zs=s(e=>e.icon&&f`<svg-icon part="icon" icon="${e.icon}"></svg-icon>`,"optionIcon"),he=s(e=>e.label||e.value,"labelOf$1");function Tn(e,t,{iconsOnly:n=e.getAttr("iconsOnly"),mark:r=!1}={}){const i=e.count==="multiple"?"checkbox":"radio";return f`${e.options.map(o=>{const a=he(o),c=!(n&&o.icon);return f`
      <button type="button" part="${t}" role="${i}" data-value="${o.value}" tabindex="-1" aria-checked="false"
              ...${I({"aria-label":!c&&a,disabled:o.disabled,title:!c&&a})}>
        ${r&&f`<span part="mark"></span>`}
        ${zs(o)}
        ${c&&f`<span part="label">${a}</span>`}
      </button>
    `})}`}s(Tn,"optionButtons");function fe(e){const t=e.selected,n=[...e.root.querySelectorAll("[data-value]")];for(const r of n){const i=t.has(r.dataset.value);r.setAttribute(r.getAttribute("role")==="option"?"aria-selected":"aria-checked",String(i)),r.part.toggle("selected",i)}return n}s(fe,"updateSelected");function Cs(e,t){const n=e.selected,r=t.find(i=>n.has(i.dataset.value)&&!ut(i))??t.find(i=>!ut(i));for(const i of t)i.tabIndex=i===r?0:-1}s(Cs,"updateTabStop");function Ns(e,t){t.on("click","[data-value]",(n,r)=>{ut(r)||e.select(r.dataset.value)}),t.$(e.root).on("keydown",n=>{if(n.target.localName==="input")return;const r=[...e.root.querySelectorAll("[data-value]")].filter(c=>!ut(c)),i=r.indexOf(n.target.closest?.("[data-value]")),o=_s(n.key,i,r.length);if(o===null||!r.length)return;n.preventDefault();const a=r[o];a.focus(),e.count!=="multiple"&&e.select(a.dataset.value)})}s(Ns,"groupEvents");const _n={events:Ns,focus:s(e=>e.root.querySelector('[data-value][tabindex="0"]'),"focus"),role:s(e=>e.count==="multiple"?"group":"radiogroup","role"),update:s(e=>Cs(e,fe(e)),"update")},ir=8,Ct=4;function Ls(e,t,{matchWidth:n=!0,maxSize:r=240,placement:i="bottom-start"}={}){const o=t.getBoundingClientRect(),a={height:window.innerHeight,width:window.innerWidth},c=Math.min(e.scrollHeight||r,r),l=a.height-o.bottom,u=o.top,d=i.startsWith("top")?u<c&&l>u?"bottom":"top":l<c&&u>l?"top":"bottom",h=e.style;h.position="fixed",h.margin="0",h.minInlineSize=n?`${o.width}px`:"";const g=e.offsetWidth,b=i.endsWith("end")?o.right-g:o.left;return h.left=`${Math.max(ir,Math.min(b,a.width-g-ir))}px`,h.right="auto",d==="top"?(h.top="auto",h.bottom=`${a.height-o.top+Ct}px`,h.maxBlockSize=`${Math.min(u-3*Ct,r)}px`):(h.bottom="auto",h.top=`${o.bottom+Ct}px`,h.maxBlockSize=`${Math.min(l-3*Ct,r)}px`),d}s(Ls,"place");const q=s(e=>e.root.querySelector("[aria-haspopup]"),"triggerOf"),et=s(e=>e.part("listbox").matches(":popover-open"),"isOpen"),js=s(e=>f`
  <div part="listbox" role="listbox" popover="manual" ...${I({"aria-multiselectable":e.count==="multiple"&&"true"})}>
    ${e.options.map(t=>f`
      <div part="option" role="option" data-value="${t.value}" tabindex="-1" aria-selected="false" ...${I({"aria-disabled":t.disabled&&"true"})}>
        ${zs(t)}
        <span part="label">${he(t)}</span>
      </div>
    `)}
  </div>
`,"listbox"),Rs=`
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
`;function Ps(e,t){const n=e.part("listbox").node;n&&et(e)&&(e.dataset.placement=Ls(n,t))}s(Ps,"reposition");function Q(e,t,n){const r=e.part("listbox").node;if(!r||e.disabled||t===et(e))return;const i=r.contains(e.focused);r[t?"showPopover":"hidePopover"](),q(e)?.setAttribute("aria-expanded",String(t)),t?(Ps(e,n),r.querySelector('[part~="selected"]')?.scrollIntoView({block:"nearest"})):(Is(e,""),i&&q(e)?.focus())}s(Q,"setOpen");function Is(e,t){const n=String(t??"").trim().toLowerCase();for(const r of e.part("listbox").$$('[role="option"]'))r.hidden=!!n&&!r.textContent.toLowerCase().includes(n)}s(Is,"filter$1");const Wa=s(e=>e.part("listbox").$$("[data-value]").filter(t=>!ut(t)).nodes,"enabledItems");function Ds(e,t,n){const r=s(()=>Q(e,!1,n()),"close");t.on("click",'[role="option"]',(o,a)=>{ut(a)||(e.select(a.dataset.value),e.count!=="multiple"&&r())}),t.$(document).on("pointerdown",o=>{o.composedPath().includes(e)||r()});const i=s(()=>Ps(e,n()),"follow");t.$(window).on("resize",i,{passive:!0}),t.$(window).on("scroll",i,{capture:!0,passive:!0}),t.$(e.root).on("keydown",o=>{const{key:a}=o,c=o.target.closest?.("[data-value]");if(a==="Escape"&&et(e)){o.preventDefault(),r();return}if((a==="Enter"||a===" ")&&c){o.preventDefault(),c.click();return}const l=Wa(e),u=l.findIndex(h=>e.selected.has(h.dataset.value)),p=c?l.indexOf(c):u,d=_s(a,p,l.length,{sideways:!1});d!==null&&(o.preventDefault(),et(e)||Q(e,!0,n()),l[d]?.focus())})}s(Ds,"popoverEvents");function or(e){const t=q(e);if(!t||t===e.focused)return;const n=e.selected;t.value=e.options.filter(r=>n.has(r.value)).map(he).join(", ")}s(or,"showSelection");const Ka={fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
    ${pt}
    ${Rs}
    [part~="box"] { cursor: pointer; }

    [part~="input"] {
      cursor        : inherit;
      flex          : 1 1 auto;
      inline-size   : 100%;
      text-overflow : ellipsis;

      &[aria-expanded="true"] ~ [part~="caret"] { rotate: 180deg; }
    }

    [part~="caret"] { opacity: 0.65; transition: rotate 0.15s ease; }
  `,render:s(e=>f`
    ${ue(e)}
    <input type="text" part="input" role="combobox" aria-haspopup="listbox" aria-expanded="false"
           ...${I({placeholder:e.placeholder||"select…",readonly:!e.getAttr("searchable")})} />
    <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
    ${js(e)}
  `,"render"),events(e,t){Ds(e,t,()=>e),t.on("click",n=>{n.composedPath().includes(e.part("listbox").node)||Q(e,!et(e),e)}),t.$(e.root).on("input",n=>{n.target===q(e)&&(Q(e,!0,e),Is(e,n.target.value))}),t.$(e.root).on("focusout",n=>{n.target===q(e)&&!et(e)&&or(e)})},update(e){fe(e),or(e)},focus:q},Ga=500,Za={fits:s(e=>e.kind==="list"&&e.count==="single","fits"),css:`
    ${Rs}

    [part~="button"] {
      -webkit-touch-callout : none;
      border                : var(--input-line);
      border-radius         : --radius();
      min-block-size        : --space(9);
      padding-inline        : --space(normal);
      user-select           : none;
    }
  `,render:s(e=>f`
    <button type="button" part="button" aria-haspopup="listbox" aria-expanded="false">
      <svg-icon part="icon" hidden></svg-icon>
      <span part="label"></span>
    </button>
    ${js(e)}
  `,"render"),events(e,t){const n=s(()=>q(e),"button");Ds(e,t,n);let r=null,i=!1;t.on("pointerdown","[aria-haspopup]",a=>{a.button===0&&(i=!1,clearTimeout(r),r=setTimeout(()=>{i=!0,Q(e,!0,n())},Ga))});const o=s(()=>{clearTimeout(r),i&&setTimeout(()=>{i=!1})},"release");t.$(window).on("pointerup pointercancel",o),t.on("click","[aria-haspopup]",()=>{i||(et(e)?Q(e,!1,n()):e.cycle(1))}),t.on("contextmenu","[aria-haspopup]",a=>{a.preventDefault(),Q(e,!0,n())})},update(e){fe(e);const t=q(e),n=e.options.find(a=>a.value===e.value),r=n?he(n):e.placeholder||"select…",i=t.querySelector("svg-icon"),o=t.querySelector('[part~="label"]');i.hidden=!n?.icon,n?.icon&&i.setAttribute("icon",n.icon),o.textContent=r,o.hidden=!!(e.getAttr("iconsOnly")&&n?.icon),t.title=r,t.setAttribute("aria-label",r)},focus:q},Ya=["copy","paste","clear","reveal","calculator"],ot={calculator:"lucide:calculator",clear:"lucide:eraser",copy:"lucide:copy",done:"lucide:check",fail:"lucide:x",paste:"lucide:clipboard-paste",reveal:"lucide:eye",veil:"lucide:eye-off"},Xa=s(e=>{const t=new Set(String(e??"").split(/[\s,]+/));return Ya.filter(n=>t.has(n))},"parseActions"),Qa=s(e=>f`${e.map(t=>f`
  <button type="button" part="action ${t}" data-action="${t}" aria-label="${t}" title="${t}">
    <svg-icon icon="${ot[t]}"></svg-icon>
  </button>
`)}`,"actionButtons"),Nt=s((e,t)=>{const n=e.querySelector("svg-icon");n&&(n.setAttribute("icon",t?ot.done:ot.fail),clearTimeout(e._flash),e._flash=setTimeout(()=>n.setAttribute("icon",ot[e.dataset.action]),1500))},"flash"),tc=s(e=>{if("select"in e)return e.select();const t=document.createRange();t.selectNodeContents(e);const n=getSelection();n.removeAllRanges(),n.addRange(t)},"selectAll"),Ms=s((e,t)=>{if("setRangeText"in e)e.setRangeText(t,e.selectionStart,e.selectionEnd,"end");else{const n=getSelection().getRangeAt(0);n.deleteContents(),n.insertNode(document.createTextNode(t)),n.collapse(!1)}e.dispatchEvent(new Event("input",{bubbles:!0}))},"fallback"),ec=s((e,t)=>{if(e.focus(),!("setRangeText"in e)){const n=getSelection();if(!e.contains(n.anchorNode)){const r=document.createRange();r.selectNodeContents(e),r.collapse(!1),n.removeAllRanges(),n.addRange(r)}}document.execCommand("insertText",!1,t)||Ms(e,t)},"insert");let P=null;async function nc(e){if(await Promise.all([v(()=>import("./pop-over-CIhSPDgF.js"),__vite__mapDeps([20,1,2,3]),import.meta.url),v(()=>import("./widget-calculator-OQu15u75.js"),__vite__mapDeps([21,3,1,2]),import.meta.url)]),!P){const n=document.createElement("pop-over"),r=document.createElement("widget-calculator");n.append(r),document.body.append(n),r.addEventListener("widget-calculator",({detail:i})=>{i.action==="done"&&i.value!=null&&P.host?.setValue(String(i.value)),n.hide()}),n.addEventListener("pop-over",({detail:i})=>{i.open||(P.host=null)}),Object.defineProperty(n,"anchorElement",{get:s(()=>P.host,"get")}),P={host:null,pop:n,widget:r}}const t=e.value??"";P.host=e,P.widget.setAttribute("value",t),P.widget.setExpression(t),P.pop.show(),P.widget.display?.focus()}s(nc,"openCalculator");const rc={calculator(e){return nc(e)},async copy(e,t){try{await navigator.clipboard.writeText(e.actionText()),Nt(t,!0),e.emit("aufbau-copy",{text:e.actionText()})}catch(n){Nt(t,!1),console.warn(`[${e.localName}] copy failed:`,n)}},async paste(e,t){const n=e.actionTarget();if(n)try{ec(n,await navigator.clipboard.readText()),Nt(t,!0)}catch(r){Nt(t,!1),console.warn(`[${e.localName}] paste failed:`,r)}},clear(e){const t=e.actionTarget();t&&(t.focus(),tc(t),document.execCommand("delete")||Ms(t,""))},reveal(e,t){const n=e.revealTarget?.()??e.actionTarget();if(!n||!("type"in n))return;const r=n.type==="password";n.type=r?"text":"password",t.setAttribute("aria-pressed",String(r)),t.querySelector("svg-icon")?.setAttribute("icon",r?ot.veil:ot.reveal)}};function sc(e,t=e){t.on("pointerdown","[data-action]",n=>n.preventDefault()),t.on("click","[data-action]",(n,r)=>rc[r.dataset.action]?.(e,r))}s(sc,"bindActions");const ic={fits:s(e=>e.kind==="free"&&e.count==="single","fits"),css:`
    ${pt}
    [part~="input"] { flex: 1 1 auto; inline-size: 100%; }
  `,render:s(e=>f`
    ${ue(e)}
    ${wt(e)}
    ${Qa(Xa(e.actions))}
  `,"render"),events(e,t){de(e,t),sc(e,t)},update(e){pe(e);const t=e.root.querySelector('[data-action="clear"]');t&&(t.hidden=!e.value)},focus:En},oc={fits:s(e=>e.kind==="free"&&e.count==="range","fits"),css:`
    ${pt}
    [part~="input"]     { flex: 1 1 auto; inline-size: 100%; }
    [part~="separator"] { flex: none; opacity: 0.65; }
  `,render:s(e=>f`
    ${ue(e)}
    ${wt(e,0,{"aria-label":"from"})}
    <span part="separator">–</span>
    ${wt(e,1,{"aria-label":"to"})}
  `,"render"),events:de,update:pe,focus:En},Vs=s((e,t=100)=>{let n=null;const r=s((...i)=>{clearTimeout(n),n=setTimeout(()=>{n=null,e(...i)},t)},"debounced");return r.cancel=()=>{clearTimeout(n),n=null},r},"debounce"),ac=250,cc=s(e=>!!(e.valueType.list?.query||e.getAttr("searchable")),"hasSearch");function ar(e,t){const n=t.trim().toLowerCase();for(const r of e.part("options").$$("[data-value]")){const i=(r.title||r.textContent).toLowerCase();r.hidden=!!n&&!i.includes(n)}}s(ar,"filter");const lc={fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
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
  `,render(e){const t=cc(e)&&f`<input type="search" part="search" placeholder="${e.placeholder||"search…"}" />`;return f`${t}<div part="options">${Tn(e,"option",{iconsOnly:!0})}</div>`},events(e,t){Ns(e,t);const n=Vs(r=>e.source.search(r),ac);e.track(n.cancel),t.$(e.root).on("input",r=>{r.target===e.part("search").node&&(e.valueType.list?.query?n(r.target.value):ar(e,r.target.value))})},update(e){const t=e.part("options").node,n=e.options.map(r=>r.value).join(`
`);if(t.dataset.signature!==n){t.dataset.signature=n;const r=e.part("search").node;r?.value&&!e.valueType.list?.query&&ar(e,r.value)}Cs(e,fe(e))},role:_n.role,focus:s(e=>e.part("search").node??e.root.querySelector('[data-value][tabindex="0"]'),"focus")},O={icon:null,input:"text",look:"field",parse:s(e=>e==null?"":String(e),"parse"),format:s(e=>e==null?"":String(e),"format")},uc=/^(\d+(?:\.\d+)?)%$/;function Kt(e=""){const t=String(e??"").trim().split(/\s+/).filter(Boolean),n=t.shift()??"",r={bg:null,fg:null,id:n==="none"?"":n,opacity:null};for(const i of t){const o=i.match(uc);o?r.opacity=Math.min(1,Number(o[1])/100):r.fg?r.bg||(r.bg=i):r.fg=i}return r}s(Kt,"parsePattern");function Bs({bg:e,fg:t,id:n,opacity:r}={}){if(!n)return"";const i=[n];return r!=null&&i.push(`${Math.round(r*100)}%`),e?i.push(t??"#000000",e):t&&i.push(t),i.join(" ")}s(Bs,"formatPattern");async function dc(e,{name:t="pattern",opacity:n=1}={}){const r=Kt(e);if(!r.id)return null;const i={};r.fg&&(i.fg=r.fg),r.bg&&(i.bg=r.bg);try{const{use:o}=await v(async()=>{const{use:c}=await import("./index-f1CGb_xX.js").then(l=>l.i);return{use:c}},__vite__mapDeps([22,3]),import.meta.url),a=await o(r.id,i).image();return{[`--${t}-image`]:a,[`--${t}-opacity`]:String(r.opacity??n)}}catch{return null}}s(dc,"patternStyle");const Us={...O,attributes:["colors","opacity","patterns"],icon:"lucide:grid-3x3",look:"pattern"},Su=Object.freeze(Object.defineProperty({__proto__:null,default:Us,formatPattern:Bs,parsePattern:Kt,patternStyle:dc},Symbol.toStringTag,{value:"Module"})),Gt=s((e,t)=>e.root.querySelector(`[data-color="${t}"]`),"colorOf"),Oe=s(e=>[...e.root.querySelectorAll('[part~="patterns"] [data-pattern]')],"swatchesOf"),Y=s(e=>e.dataset.pattern==="none"?"":e.dataset.pattern,"idOf"),cr=s((e,t,n="swatch")=>f`
  <button type="button" part="${n}" data-pattern="${e}" ...${I({"aria-label":t,title:t})}><span></span></button>
`,"swatch$1");function pc(e,t){const n=t.map(i=>i.id),r=e.getAttribute("patterns")?.trim();return r?r.split(/\s+/).filter(i=>n.includes(i)):n}s(pc,"idsOf");async function hc(e){const{use:t}=await v(async()=>{const{use:n}=await import("./index-f1CGb_xX.js").then(r=>r.i);return{use:n}},__vite__mapDeps([22,3]),import.meta.url);for(const n of e.root.querySelectorAll("[data-pattern] > span")){const r=Y(n.parentElement);!r||n.dataset.painted===r||(n.dataset.painted=r,t(r).image().then(i=>{Y(n.parentElement)===r&&n.style.setProperty("--swatch",i)}).catch(()=>{}))}}s(hc,"paint");function Ae(e,t){const n=e.part("opacity").node,r=e.hasAttribute("colors");e.setValue(Bs({bg:r?Gt(e,"bg").value:null,fg:r?Gt(e,"fg").value:null,id:t,opacity:n?Number(n.value)/100:null}))}s(Ae,"pick");function fc(e){e._swatches||(e._swatches=[],v(async()=>{const{list:t}=await import("./index-f1CGb_xX.js").then(n=>n.i);return{list:t}},__vite__mapDeps([22,3]),import.meta.url).then(({list:t})=>{const n=t(),r=Object.fromEntries(n.map(o=>[o.id,o.name])),i=e.hasAttribute("required")?[]:[["none","none"]];e._swatches=[...i,...pc(e,n).map(o=>[o,r[o]??o])],e.update()}))}s(fc,"fill");function lr(e,t){const n=e.part("patterns").node;t?(n.showPopover(),Ls(n,e.part("current").node),n.querySelector('[tabindex="0"]')?.focus()):n.hidePopover()}s(lr,"toggle$1");const mc={fits:s(e=>e.type==="pattern","fits"),css:`
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
  `,render(e){const t=e.hasAttribute("opacity"),n=e.hasAttribute("colors");return f`
      ${cr("none","pattern","current")}
      ${t&&f`<input type="range" part="opacity" min="0" max="100" step="1" aria-label="opacity" />`}
      ${n&&f`
        <span part="colors">
          <input type="color" part="color" data-color="fg" aria-label="pattern color" />
          <input type="color" part="color" data-color="bg" aria-label="background color" />
        </span>`}
      <div part="patterns" popover="auto" role="radiogroup" aria-label="patterns">${(e._swatches??[]).map(([r,i])=>cr(r,i))}</div>
    `},events(e,t){t.on("click",'[part~="current"]',()=>lr(e,!e.part("patterns").matches(":popover-open"))),t.on("click",'[part~="patterns"] [data-pattern]',(r,i)=>{Ae(e,Y(i)),lr(e,!1),e.part("current").focus()}),t.$(e.root).on("keydown",r=>{const o={ArrowDown:1,ArrowLeft:-1,ArrowRight:1,ArrowUp:-1}[r.key],a=Oe(e),c=a.indexOf(r.target);if(!o||c<0)return;r.preventDefault();const l=a[(c+o+a.length)%a.length];l.focus(),Ae(e,Y(l))});const n=s(()=>{const r=Oe(e).map(Y).find(Boolean)??"";Ae(e,Kt(e.value).id||r)},"keep");t.$(e.root).on("change",r=>{r.target.matches('[part~="opacity"], [part~="color"]')&&n()})},update(e){fc(e);const t=Kt(e.value),n=e.part("current").node;n.dataset.pattern=t.id||"none";const r=e.part("opacity").node;r&&r!==e.focused&&(r.value=String(Math.round((t.opacity??.1)*100))),e.hasAttribute("colors")&&(Gt(e,"fg").value=t.fg??"#000000",Gt(e,"bg").value=t.bg??"#ffffff");const i=Oe(e),o=i.find(a=>Y(a)===t.id)??i[0];for(const a of i)a.setAttribute("aria-checked",String(Y(a)===t.id)),a.tabIndex=a===o?0:-1;n.title=o?.title??"",hc(e)},focus:s(e=>e.part("current").node,"focus")},gc={..._n,fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
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
  `,render:s(e=>Tn(e,"option",{mark:!0}),"render")},bc={..._n,fits:s(e=>e.kind==="list"&&e.count!=="range","fits"),css:`
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
  `,render:s(e=>Tn(e,"segment"),"render")},Ee=s((e,[t,n])=>(e-t)/(n-t||1)*100,"percent");function yc(e){const[t,n]=e.bounds;return e.values.map((r,i)=>r===""?i===1?n:t:Math.min(n,Math.max(t,e.toNumber(r))))}s(yc,"positionsOf");const vc={fits:s(e=>e.kind==="free"&&e.axis&&e.count!=="multiple","fits"),css:`
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
  `,render(e){const t=e.count==="range",[n,r]=e.bounds,i=e.stepSize,o=e.getAttr("unit"),a=s(c=>f`
      <span part="thumb" data-thumb="${c}"></span>
      <input type="range" part="input" data-index="${c}" ...${I({"aria-label":t&&(c?"to":"from"),max:r,min:n,step:i})} />
    `,"handle");return f`
      <span part="${e.typeName==="color"?"track hue":"track"}">
        <span part="fill"></span>
        ${a(0)}
        ${t&&a(1)}
      </span>
      ${e.getAttr("readout")&&f`<output part="output"></output>`}
      ${o&&f`<small part="unit">${o}</small>`}
    `},events(e,t){t.on("input",'input[type="range"]',(n,r)=>e.setNumber(Number(r.dataset.index),Number(r.value),{track:!0}))},update(e){const t=e.bounds,n=yc(e),r=e.values,i=e.count==="range";for(const l of e.root.querySelectorAll('input[type="range"]'))l.disabled=e.isLocked,l!==e.focused&&(l.value=String(n[Number(l.dataset.index)]));for(const l of e.root.querySelectorAll("[data-thumb]"))l.style.setProperty("--at",Ee(n[Number(l.dataset.thumb)],t));const o=e.part("track").node;o.style.setProperty("--from",i?Ee(n[0],t):0),o.style.setProperty("--to",Ee(n[i?1:0],t));const a=n.map((l,u)=>r[u]||e.fromNumber(l)),c=e.part("output").node;c&&(c.textContent=i?a.join(" – "):a[0]),e.setVar("--slider-color",e.typeName==="color"&&a[0])},focus:s(e=>e.root.querySelector('input[type="range"]'),"focus")},wc={fits:s(e=>e.kind==="free"&&e.count==="single"&&e.steppable,"fits"),css:`
    ${pt}
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
  `,render:s(e=>f`
    <button type="button" part="button decrement" data-step="-1" aria-label="less" tabindex="-1"><svg-icon icon="lucide:minus"></svg-icon></button>
    ${wt(e)}
    <button type="button" part="button increment" data-step="1" aria-label="more" tabindex="-1"><svg-icon icon="lucide:plus"></svg-icon></button>
  `,"render"),events(e,t){de(e,t),t.on("click","[data-step]",(n,r)=>e.step(Number(r.dataset.step))),t.$(e.root).on("keydown",n=>{n.key!=="ArrowUp"&&n.key!=="ArrowDown"||(n.preventDefault(),e.step(n.key==="ArrowUp"?1:-1))})},update:pe,focus:En},kc={fits:s(e=>e.kind==="free"&&e.count==="single"&&e.type==="color","fits"),css:`
    ${pt}
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
  `,render:s(e=>f`
    <span part="swatch"><input type="color" data-index="0" aria-label="pick a color" /></span>
    ${wt(e,0,{spellcheck:!1,type:"text"})}
  `,"render"),events:de,update(e){pe(e),e.setVar("--swatch",e.valueType.format(e.value))},focus:s(e=>e.part("input").node,"focus")},xc={fits:Sn,events:On,update:An,css:`
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
  `,render:s(e=>$n(e,f`<span part="track"><span part="thumb"></span></span>`,"switch"),"render"),focus:s(e=>e.part("control").node,"focus")},zn={button:Ba,checkbox:Ua,chips:Fa,combobox:Ka,cycle:Za,field:ic,fields:oc,grid:lc,pattern:mc,radio:gc,segments:bc,slider:vc,stepper:wc,swatch:kc,switch:xc},Sc=["field","fields","chips","combobox","switch"];function $c(e,...t){for(const n of[...t,...Sc])if(n&&zn[n]?.fits(e))return n;return"field"}s($c,"lookFor");const Te=new Map;function Oc(e){if(!Te.has(e)){const t=new CSSStyleSheet;t.replaceSync(ri(zn[e].css)),t.isLookSheet=!0,Te.set(e,t)}return Te.get(e)}s(Oc,"sheetOf");const ur="https://esm.sh/",dr={marked:"marked@11.1.1",papaparse:"papaparse@5.4.1",yaml:"yaml@2.3.4"},Lt=new Map,jt=new Map;function Ve(e){if(!Lt.has(e)){let t=ur+dr[e];try{t=import.meta.resolve?.(e)??t}catch{}const n=import(t).catch(()=>import(ur+dr[e]));n.catch(()=>Lt.delete(e)),Lt.set(e,n)}return Lt.get(e)}s(Ve,"vendor");const Ac=/"(?:[^"\\]|\\.)*"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|,(?=\s*[}\]])/g,qs=s(e=>/\.([a-z0-9]+)$/i.exec(new URL(e,document.baseURI).pathname)?.[1].toLowerCase()??"","extensionOf");async function Ec(e){return(await Ve("marked")).marked.parse(e)}s(Ec,"renderMD");const Tc={csv:s(async(e,t)=>(await Ve("papaparse")).default.parse(e,{delimiter:qs(t)==="tsv"?"	":void 0,dynamicTyping:!0,header:!0,skipEmptyLines:!0}).data,"csv"),json:s(e=>JSON.parse(e),"json"),jsonc:s(e=>JSON.parse(e.replace(Ac,t=>t[0]==='"'?t:"")),"jsonc"),md:s(e=>Ec(e),"md"),yaml:s(async e=>(await Ve("yaml")).default.parse(e),"yaml")},_c={tsv:"csv",yml:"yaml"};async function zc(e){const t=await fetch(e);if(!t.ok)throw new Error(`[@aufbau/elements] ${e}: ${t.status} ${t.statusText}`);const n=await t.text(),r=qs(e),i=Tc[_c[r]??r];return i?i(n,e):n}s(zc,"load");function Cc(e){const t=new URL(e,document.baseURI).href;if(!jt.has(t)){const n=zc(t);n.catch(()=>jt.delete(t)),jt.set(t,n)}return jt.get(t)}s(Cc,"importFile");const Nc=s(e=>e.closest("[lang]")?.lang||document.documentElement.lang||navigator.language,"localeOf");function kt(e,t,n={}){try{return new Intl.DisplayNames([e],{fallback:"code",type:t,...n})}catch{return null}}s(kt,"displayNames");function xt(e,t){try{return e?.of(t)??t}catch{return t}}s(xt,"nameOf");const Lc="input-option, option";function jc(e){return Fe(e)?e:He(e)?e.items??e.data??e.results??Object.values(e):[]}s(jc,"unwrap");function Rc(e,{key:t="value",labelKey:n="label"}={}){if(!He(e)){const o=e==null?"":String(e);return{disabled:!1,icon:null,label:o,value:o}}const r=e[t]??e.value??e.name??Object.values(e)[0]??"",i=e[n]??e.label??e.name??r;return{disabled:!!e.disabled,icon:e.icon??null,label:String(i),value:String(r)}}s(Rc,"toOption");function Pc(e,t){return jc(e).map(n=>Rc(n,t))}s(Pc,"normalizeOptions");function Ic(e){const t=[];for(const n of e.querySelectorAll(Lc)){const r=n.getAttribute("label")??n.textContent.trim();t.push({disabled:n.hasAttribute("disabled"),icon:n.getAttribute("icon"),label:r,selected:n.hasAttribute("selected"),value:n.getAttribute("value")??r})}return t}s(Ic,"readOptions");class Dc{static{s(this,"OptionSource")}constructor(t,n){this.host=t,this.onChange=n,this.query="",this.fetched=[],this.listed=[]}get all(){return[...Ic(this.host),...this.fetched,...this.listed]}refresh(){this.refreshSrc(),this.refreshList()}search(t){this.query=String(t??"").trim(),this.refreshList()}refreshSrc(){const t=this.host.getAttribute("src");if(t===this.src||(this.src=t,this.fetched=[],!t))return;const n=s(r=>{this.src===t&&(this.fetched=r,this.onChange())},"done");Cc(t).then(r=>n(Pc(r))).catch(r=>{console.warn(`[${this.host.localName}] could not load options from "${t}":`,r),n([])})}refreshList(){const t=this.host,n=t.valueType;if(!n.list){this.key="",this.listed=[];return}const r=Nc(t),i=[t.typeName,r,this.query];for(const c of n.attributes??[])i.push(t.getAttribute(c));const o=i.join("|");if(o===this.key)return;this.key=o;const a=s(c=>{this.key===o&&(this.listed=c,this.onChange())},"done");Promise.resolve(n.list.entries(t,r,this.query)).then(a).catch(c=>{console.warn(`[${t.localName}] could not build the ${t.typeName} list:`,c),a([])})}}const Mc={...O,input:"checkbox",look:"switch",parse:s(e=>e==="true","parse"),format:s(e=>e===!0||e==="true"?"true":"","format")},Vc=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i,Be=s(e=>{const t=String(e??"").trim().match(Vc);if(!t)return null;const n=t[1];return"#"+(n.length===3?[...n].map(r=>r+r).join(""):n).toLowerCase()},"toHex"),Bc=s(e=>{const t=Be(e)??"#000000";return[1,3,5].map(n=>parseInt(t.slice(n,n+2),16))},"channels");function Fs(e){const[t,n,r]=Bc(e).map(u=>u/255),i=Math.max(t,n,r),o=Math.min(t,n,r),a=(i+o)/2,c=i-o;return c?[((i===t?(n-r)/c%6:i===n?(r-t)/c+2:(t-n)/c+4)*60+360)%360,c/(1-Math.abs(2*a-1)),a]:[0,0,a]}s(Fs,"hslOf");function Uc(e,t,n){const r=(1-Math.abs(2*n-1))*t,i=(e%360+360)%360/60,o=r*(1-Math.abs(i%2-1)),a=n-r/2,[c,l,u]=i<1?[r,o,0]:i<2?[o,r,0]:i<3?[0,r,o]:i<4?[0,o,r]:i<5?[o,0,r]:[r,0,o];return"#"+[c,l,u].map(p=>Math.round((p+a)*255).toString(16).padStart(2,"0")).join("")}s(Uc,"fromHsl");const qc=s(e=>Fs(e)[0],"hueOf"),Fc=s((e,t)=>{const[,n,r]=t?Fs(t):[0,1,.5];return Uc(e,n||1,r||.5)},"fromHue"),Hc={...O,icon:"lucide:palette",input:"color",look:"swatch",parse:s(e=>Be(e)??"#000000","parse"),format:s(e=>Be(e)??"#000000","format"),steppable:!1,axis:{bounds:[0,360],fromNumber:Fc,step:1,toNumber:qc}},st=s((e,t)=>e?.trim()?e.trim().split(/\s+/):t,"listOf"),Zt=s((e,t)=>e.getAttribute(t)!=="false","enabled"),ht=s(e=>(t,n)=>t.label.localeCompare(n.label,e),"byLabel"),F=s(({attributes:e=[],entries:t,icon:n=null,look:r="combobox",placeholder:i,query:o=!1})=>({...O,attributes:e,icon:n,list:{entries:t,query:o},look:r,placeholder:i}),"listType");function Ue(e,t,n){const r=e.value;if(!r)return t;const i=t.filter(o=>o.value!==r);return[n(r),...i]}s(Ue,"withCurrent");const Jc=F({attributes:["countries","flags"],icon:"lucide:map-pin",placeholder:"country…",async entries(e,t){const{REGIONS:n}=await v(async()=>{const{REGIONS:o}=await import("./regions-wXqKeTwC.js");return{REGIONS:o}},[],import.meta.url),r=kt(t,"region"),i=Zt(e,"flags");return st(e.getAttribute("countries"),n).map(o=>o.toUpperCase()).map(o=>({icon:i&&`circle-flags:${o.toLowerCase()}`,label:xt(r,o),value:o})).sort(ht(t))}}),Wc=Intl.supportedValuesOf?.("currency")??[],Kc=F({attributes:["currencies"],icon:"lucide:coins",placeholder:"currency…",entries(e,t){const n=kt(t,"currency");return st(e.getAttribute("currencies"),Wc).map(r=>r.toUpperCase()).map(r=>{const i=xt(n,r);return{label:i===r?r:`${i} (${r})`,value:r}}).sort(ht(t))}}),St=6e4,gt=864e5,pr=s(e=>String(e).padStart(2,"0"),"pad$1"),Gc=s(e=>{if(e==null||e==="")return null;const[t=0,n=0,r=0]=String(e).split(":").map(Number),i=(t*60+n)*St+r*1e3;return Number.isFinite(i)?i:null},"parseClock"),Zc=s(e=>{const t=(e%gt+gt)%gt;return`${pr(Math.floor(t/36e5))}:${pr(Math.floor(t/St)%60)}`},"formatClock"),Yc={...O,icon:"lucide:clock",input:"time",parse:Gc,format:s(e=>e==null?"":Zc(e),"format"),axis:{bounds:[0,gt-St],fromNumber:s(e=>e,"fromNumber"),step:St,toNumber:s(e=>e??0,"toNumber")}},Hs=s(e=>{if(e==null||e==="")return null;const t=e instanceof Date?e:new Date(String(e));return Number.isNaN(t.getTime())?null:t.getTime()},"parseStamp"),Xc={...O,icon:"lucide:calendar",input:"date",parse:Hs,format:s(e=>e==null?"":new Date(e).toISOString().slice(0,10),"format"),axis:{bounds:null,fromNumber:s(e=>e,"fromNumber"),step:gt,toNumber:s(e=>e??0,"toNumber")}},Rt=s(e=>String(e).padStart(2,"0"),"pad"),Qc=s(e=>{const t=new Date(e);return`${t.getFullYear()}-${Rt(t.getMonth()+1)}-${Rt(t.getDate())}T${Rt(t.getHours())}:${Rt(t.getMinutes())}`},"formatStamp"),tl={...O,icon:"lucide:calendar-clock",input:"datetime-local",parse:Hs,format:s(e=>e==null?"":Qc(e),"format"),axis:{bounds:null,fromNumber:s(e=>e,"fromNumber"),step:St,toNumber:s(e=>e??0,"toNumber")}},Js=/^\s*(-?\d*\.?\d+)\s*([a-z]*)\s*$/i,el=s(e=>{const t=Js.exec(String(e??""));return t?Number(t[1]):null},"amountOf"),nl=s(e=>Js.exec(String(e??""))?.[2]||"s","unitOf"),rl={...O,icon:"lucide:timer",parse:el,format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[0,10],fromNumber:s((e,t)=>`${e}${nl(t)}`,"fromNumber"),step:.1,toNumber:s(e=>e??0,"toNumber")}},sl={...O,icon:"lucide:mail",input:"email"};function il(e,t){const n=e.split(/[\s-]+/);return t.every(r=>n.some(i=>i.startsWith(r)))}s(il,"matches");const hr=s(e=>({label:e,value:e}),"entryOf$1"),ol=F({attributes:["limit"],icon:"lucide:smile",look:"grid",placeholder:"search emoji…",query:!0,async entries(e,t,n){const{EMOJI:r}=await v(async()=>{const{EMOJI:c}=await import("./emoji-DfQ28uUz.js");return{EMOJI:c}},[],import.meta.url),i=n.toLowerCase().split(/\s+/).filter(Boolean),o=Number(e.getAttribute("limit")??120),a=[];for(const{emoji:c,name:l}of r){if(a.length>=o)break;il(l,i)&&a.push(hr(c))}return Ue(e,a,hr)}}),al=F({attributes:["categories"],icon:"lucide:type",placeholder:"font…",async entries(e,t){const{fonts:n}=await v(async()=>{const{fonts:i}=await import("./index-UEOQAGj5.js");return{fonts:i}},[],import.meta.url),r=st(e.getAttribute("categories"),null);return n.filter(i=>!r||r.includes(i.category)).map(i=>({label:i.name,value:i.id})).sort(ht(t))}}),cl=["Control","Alt","Shift","Meta"],ll={" ":"Space",Escape:"Esc"};function ul(e){if(/^Key[A-Z]$/.test(e.code))return e.code.slice(3);if(/^Digit\d$/.test(e.code))return e.code.slice(5);const t=ll[e.key]??e.key;return t.length===1?t.toUpperCase():t}s(ul,"keyOf");function dl(e){return cl.includes(e.key)?null:[e.ctrlKey&&"Ctrl",e.altKey&&"Alt",e.shiftKey&&"Shift",e.metaKey&&"Meta",ul(e)].filter(Boolean).join("+")}s(dl,"hotkeyOf");const fr=s(e=>!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey,"bare"),pl={...O,icon:"lucide:keyboard",placeholder:"press a key…",setup(e,t){t.$(e.root).on("beforeinput",n=>n.preventDefault(),{capture:!0}),t.$(e.root).on("keydown",n=>{if(e.isLocked||n.target.localName!=="input"||n.key==="Tab"&&fr(n))return;if(n.preventDefault(),(n.key==="Backspace"||n.key==="Delete")&&fr(n))return e.setValue("");const r=dl(n);r&&e.setValue(r)})}},hl="https://api.iconify.design/search",_e=s(e=>({icon:e,label:e,value:e}),"entryOf");async function fl(e,{limit:t,prefixes:n}){const r=new URLSearchParams({limit:String(t),query:e});n?.trim()&&r.set("prefixes",n.trim().split(/\s+/).join(","));const i=await fetch(`${hl}?${r}`);if(!i.ok)throw new Error(`${i.status} ${i.statusText}`);const{icons:o=[]}=await i.json();return o}s(fl,"search$1");const ml=F({attributes:["limit","prefixes"],icon:"lucide:shapes",look:"grid",placeholder:"search icons…",query:!0,async entries(e,t,n){if(!n)return Ue(e,[],_e);const r=Number(e.getAttribute("limit")??64),i=e.getAttribute("prefixes"),o=await fl(n,{limit:r,prefixes:i});return Ue(e,o.map(_e),_e)}}),gl=F({attributes:["flags","languages","native"],icon:"lucide:languages",placeholder:"language…",async entries(e,t){const{LANGUAGES:n}=await v(async()=>{const{LANGUAGES:a}=await import("./languages-DOQNiPjJ.js");return{LANGUAGES:a}},[],import.meta.url),r=kt(t,"language"),i=Zt(e,"flags"),o=Zt(e,"native");return st(e.getAttribute("languages"),n).map(a=>{const c=xt(r,a),l=o?xt(kt(a,"language"),a):null;return{icon:i&&`circle-flags:lang-${a.split("-")[0].toLowerCase()}`,label:l&&l!==c?`${c} (${l})`:c,value:a}}).sort(ht(t))}}),bl=s(e=>{try{return new Intl.Locale(e).region??null}catch{return null}},"regionOf"),yl=F({attributes:["flags","locales"],icon:"lucide:globe",placeholder:"locale…",async entries(e,t){const{LOCALES:n}=await v(async()=>{const{LOCALES:o}=await import("./locales-DO6ndLPH.js");return{LOCALES:o}},[],import.meta.url),r=kt(t,"language",{languageDisplay:"standard"}),i=Zt(e,"flags");return st(e.getAttribute("locales"),n).map(o=>{const a=bl(o);return{icon:i&&a&&`circle-flags:${a.toLowerCase()}`,label:xt(r,o),value:o}}).sort(ht(t))}}),vl={...O,input:"number",parse:s(e=>{const t=parseFloat(e);return Number.isNaN(t)?null:t},"parse"),format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[0,100],fromNumber:s(e=>e,"fromNumber"),step:1,toNumber:s(e=>e??0,"toNumber")}},wl={...O,actions:"reveal",icon:"lucide:lock",input:"password"},kl={...O,icon:"lucide:phone",input:"tel"},xl={...O,actions:"clear",attributes:["debounce"],icon:"lucide:search",input:"search",placeholder:"search…",setup(e,t){const n=Vs(()=>e.emit("search",{query:e.value}),Number(e.getAttribute("debounce")??250));e.track(n.cancel),t.on("input",n)}},Sl={ä:"ae",ö:"oe",ß:"ss",ü:"ue"},mr=s(e=>String(e??"").toLowerCase().replace(/[äöüß]/g,t=>Sl[t]).normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),"slugify");function $l(e){const t=e.getAttribute("source");return t?(e.closest("form")??document).querySelector(t)??document.querySelector(t):null}s($l,"sourceOf");const Ol={...O,attributes:["source"],icon:"lucide:link-2",normalize:mr,setup(e,t){let n=!1;t.$(e.root).on("keydown",i=>{i.key!=="Tab"&&(n=!0)});const r=$l(e);r&&t.$(r).on("input",()=>{n||e.setValue(mr(r.value))})}},Al=Intl.supportedValuesOf?.("timeZone")??[];function El(e,t){try{return new Intl.DateTimeFormat(t,{timeZone:e,timeZoneName:"shortOffset"}).formatToParts(new Date).find(r=>r.type==="timeZoneName")?.value??""}catch{return""}}s(El,"offsetOf");const Tl=F({attributes:["zones"],icon:"lucide:earth",placeholder:"time zone…",entries(e,t){return st(e.getAttribute("zones"),Al).map(n=>{const r=El(n,t),i=n.replaceAll("_"," ");return{label:r?`${i} (${r})`:i,value:n}})}}),_l=Intl.supportedValuesOf?.("unit")??[];function zl(e,t){const n=s(o=>{try{return new Intl.NumberFormat(t,{style:"unit",unit:e,unitDisplay:o}).formatToParts(2).filter(c=>c.type==="unit").map(c=>c.value).join(" ").trim()}catch{return""}},"name"),r=n("long")||e,i=n("short");return i&&i!==r?`${r} (${i})`:r}s(zl,"labelOf");const Cl=F({attributes:["units"],icon:"lucide:ruler",placeholder:"unit…",entries(e,t){return st(e.getAttribute("units"),_l).map(n=>({label:zl(n,t),value:n})).sort(ht(t))}}),Nl=/^[a-z][a-z0-9+.-]*:/i,Ll=s(e=>{const t=String(e??"").trim();return!t||Nl.test(t)?t:`https://${t.replace(/^\/+/,"")}`},"normalizeUrl"),jl={...O,icon:"lucide:link",input:"url",normalize:Ll},Rl={...O,icon:"lucide:calendar",input:"number",look:"stepper",parse:s(e=>{const t=parseInt(e,10);return Number.isNaN(t)?null:t},"parse"),format:s(e=>e==null?"":String(e),"format"),axis:{bounds:[1900,2100],fromNumber:s(e=>Math.round(e),"fromNumber"),step:1,toNumber:s(e=>e??0,"toNumber")}},Ws={bool:Mc,color:Hc,country:Jc,currency:Kc,date:Xc,datetime:tl,duration:rl,email:sl,emoji:ol,font:al,hotkey:pl,icon:ml,language:gl,locale:yl,number:vl,password:wl,pattern:Us,phone:kl,search:xl,slug:Ol,text:O,time:Yc,timezone:Tl,unit:Cl,url:jl,year:Rl},Pl=Object.fromEntries(Object.values(Ws).flatMap(e=>e.attributes??[]).map(e=>[e,String])),Il=s(e=>Ws[e]??O,"typeOf"),qe={multiple:",",range:".."};function Dl(e,t){const n=e??"";if(t==="single")return[n];const r=n?n.split(qe[t]).map(i=>i.trim()):[];return t==="range"?[r[0]??"",r[1]??""]:r.filter(Boolean)}s(Dl,"splitValue");function Ml(e,t){return t==="single"?e[0]??"":t==="range"?e.some(Boolean)?e.map(n=>n??"").join(qe.range):"":e.filter(Boolean).join(qe.multiple)}s(Ml,"joinValue");const Vl=`
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
`;class Cn extends si{static{s(this,"Input")}static shadow={delegatesFocus:!0};static attr={...Pl,actions:String,autocomplete:String,icon:String,iconChecked:String,iconsOnly:Boolean,look:String,max:String,maxlength:Number,min:String,minlength:Number,multiple:Boolean,pattern:String,placeholder:String,range:Boolean,readout:{type:Boolean,default:!0},searchable:Boolean,src:String,step:Number,type:String,unit:String};static styles=Vl;static type=null;constructor(){super(),this.source=new Dc(this,()=>this.update())}get typeName(){return this.constructor.type??this.getAttr("type")??"text"}get valueType(){return Il(this.typeName)}get type(){return this.typeName==="bool"?"checkbox":this.typeName}get count(){return this.typeName==="bool"?"single":this.getAttr("multiple")?"multiple":this.getAttr("range")&&!this.isList?"range":"single"}get options(){return this.source.all}get isList(){return!!(this.valueType.list||this.getAttr("src")||this.options.length)}get kind(){return this.typeName==="bool"?"bool":this.isList?"list":"free"}get shape(){const t=this.valueType;return{axis:!!t.axis,count:this.count,kind:this.kind,steppable:!!t.axis&&t.steppable!==!1,type:this.typeName}}get askedLook(){return this._ownLook?null:this.getAttribute("look")}get look(){return $c(this.shape,this.askedLook,this.valueType.look)}get lookModule(){return zn[this.look]}reflectAttrs(){if(super.reflectAttrs(),this.getAttribute("look")!==null&&!this._ownLook)return this;const t=this.look;if(this._ownLook=!0,this.getAttribute("look")===t)return this;this._reflecting=!0;try{this.setAttribute("look",t)}finally{this._reflecting=!1}return this}onAttributeChanged(t){t==="look"&&(this._ownLook=!1)}adoptLook(){const t=Oc(this.look),n=this.shadowRoot;n.adoptedStyleSheets.includes(t)||(n.adoptedStyleSheets=[...n.adoptedStyleSheets.filter(r=>!r.isLookSheet),t])}bindWhile(t,n,r){const i=this._bound??={};if(i[t]?.key===n)return;i[t]?.controller.abort();const o=new AbortController;i[t]={key:n,controller:o},r?.(this.self.until(o.signal))}get values(){return Dl(this.getAttribute("value"),this.count)}parseValue(t){return t==null?"":String(t)}formatValue(t){return Fe(t)?Ml(t,this.count):t==null?"":String(t)}get typedValue(){const t=this.valueType,n=this.values.map(r=>r===""?null:t.parse(r));return this.count==="single"?n[0]:n}get formValue(){if(this.count!=="multiple")return super.formValue;const t=this.getAttr("name"),n=this.values;if(!n.length)return null;if(!t)return this.value;const r=new FormData;for(const i of n)r.append(t,i);return r}get isLocked(){return this.disabled||!!this.getAttr("readonly")}setValue(t){return this.isLocked?this:this.commit(t)}setPart(t,n,{final:r=!1}={}){const i=this.values;return i[t]=r?this.normalize(n):String(n??""),this.setValue(r&&this.count==="range"?this.order(i):i)}normalize(t){const n=String(t??"").trim();return this.valueType.normalize?.(n)??n}order(t){const[n,r]=t;return n&&r&&this.toNumber(n)>this.toNumber(r)?[r,n]:t}add(t){const n=this.normalize(String(t??"").replaceAll(","," "));return n&&!this.values.includes(n)?this.setValue([...this.values,n]):this}removeAt(t){return this.setValue(this.values.filter((n,r)=>r!==t))}toNumber(t){const n=this.valueType;return n.axis.toNumber(n.parse(t))}fromNumber(t,n){const r=this.valueType;return r.format(r.axis.fromNumber(t,n))}get limits(){const{max:t,min:n}=this.getAttr();return[n===void 0?-1/0:this.toNumber(n),t===void 0?1/0:this.toNumber(t)]}get bounds(){const[t,n]=this.valueType.axis?.bounds??[0,100],{max:r,min:i}=this.getAttr();return[i===void 0?t:this.toNumber(i),r===void 0?n:this.toNumber(r)]}get stepSize(){return this.getAttr("step")||this.valueType.axis?.step||1}setNumber(t,n,{track:r=!1}={}){const[i,o]=r?this.bounds:this.limits,a=this.values;return a[t]=this.fromNumber(Math.min(o,Math.max(i,Number(n)||0)),a[t]),this.count==="range"&&(a[0]||=this.fromNumber(this.bounds[0]),a[1]||=this.fromNumber(this.bounds[1])),this.setValue(this.count==="range"?this.order(a):a)}step(t,n=0){const r=this.values[n]??"",[i]=this.limits,o=r===""?Number.isFinite(i)?i:0:this.toNumber(r);return this.setNumber(n,o+t*this.stepSize)}get selected(){return new Set(this.values.filter(Boolean))}select(t){if(this.count!=="multiple")return this.setValue(t);const n=this.selected;return n.has(t)?n.delete(t):n.add(t),this.setValue([...n])}cycle(t=1){const n=this.options.filter(o=>!o.disabled);if(!n.length)return this;const r=n.findIndex(o=>o.value===this.value),i=r<0?t>0?-1:0:r;return this.select(n[((i+t)%n.length+n.length)%n.length].value)}get checked(){return this.getAttribute("value")==="true"}set checked(t){this.commit(t?"true":"",{notify:!1})}toggle(){return this.setValue(this.checked?"":"true")}get actions(){return this.getAttr("actions")??this.valueType.actions??""}get placeholder(){return this.getAttr("placeholder")??this.valueType.placeholder??""}get iconName(){const t=this.getAttr("icon");return t==="false"?null:t||this.valueType.icon||null}actionText(){return this.value}actionTarget(){return this.isLocked?null:this.focusTarget}revealTarget(){return this.focusTarget}get focusTarget(){return this.lookModule?.focus?.(this)??this.root.querySelector("input, button")}captureDefaults(){return this.typeName==="bool"&&this.hasAttribute("checked")&&!this.hasAttribute("value")&&this.setAttribute("value","true"),super.captureDefaults()}onConnected(){this.$(this.root).on("input beforeinput",n=>n.stopPropagation());const t=new MutationObserver(n=>{n.some(r=>r.target!==this)&&this.update()});if(t.observe(this,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["value","label","icon","disabled","selected"]}),this.track(()=>t.disconnect()),!this.hasAttribute("value")){const n=this.options.filter(r=>r.selected).map(r=>r.value);n.length&&(this.commit(this.count==="multiple"?n:n[0],{notify:!1}),this._defaultValue=this.getAttribute("value")??"")}}onDisconnected(){this._bound=null}update(){return this._mounted&&this.source.refresh(),super.update()}render(){return f`<div part="box">${this.lookModule.render(this)}</div>`}sync(){super.sync();const t=this.lookModule;this.adoptLook(),this.bindWhile("look",this.look,n=>t.events?.(this,n)),this.bindWhile("type",this.typeName,n=>this.valueType.setup?.(this,n)),this.internals&&(this.internals.role=t.role?.(this)??null),t.update?.(this)}}const Bl={"input-bool":"bool","input-color":"color","input-country":"country","input-currency":"currency","input-date":"date","input-datetime":"datetime","input-duration":"duration","input-email":"email","input-emoji":"emoji","input-font":"font","input-hotkey":"hotkey","input-icon":"icon","input-language":"language","input-locale":"locale","input-number":"number","input-password":"password","input-pattern":"pattern","input-phone":"phone","input-search":"search","input-slug":"slug","input-text":"text","input-time":"time","input-timezone":"timezone","input-unit":"unit","input-url":"url","input-year":"year"},Nn={"input-value":Cn};for(const[e,t]of Object.entries(Bl))Nn[e]=class extends Cn{static type=t};Nn["input-chips"]=class extends Cn{static attr={multiple:{type:Boolean,default:!0},suggestions:String};static type="text";accept=null;suggest=null;transform=null;suggested=[];get suggestionList(){const e=String(this.getAttr("suggestions")??"").split(",").map(t=>t.trim()).filter(Boolean);return[...new Set([...e,...this.suggested])].filter(t=>!this.values.includes(t))}verdict(e){const t=this.getAttr("pattern");if(t&&!new RegExp(`^(?:${t})$`,"u").test(e))return"does not match the pattern";const n=this.accept?.(e)??!0;return n===!1?"not accepted":n}add(e){const t=String(e??"").replaceAll(","," ").trim(),n=this.normalize(this.transform?this.transform(t):t);if(!n)return this;const r=this.verdict(n);if(r!==!0){const i=this.part("input").node;return i?.setCustomValidity(String(r)),i?.reportValidity(),this.emit("input-chips-refused",{reason:r,text:n}),this}return super.add(n)}};for(const[e,t]of Object.entries(Nn))t.init(e);const Ul={add:{icon:"add",label:"add"},back:{icon:"arrow-left",label:"back"},bookmark:{icon:"bookmark",label:"bookmark"},cancel:{icon:"close",label:"cancel"},close:{icon:"close",label:"close"},collapse:{icon:"chevron-up",label:"collapse"},copy:{icon:"copy",label:"copy"},cut:{icon:"cut",label:"cut"},delete:{icon:"delete",label:"delete"},edit:{icon:"edit",label:"edit"},expand:{icon:"chevron-down",label:"expand"},export:{icon:"export",label:"export"},heart:{icon:"heart",label:"heart"},import:{icon:"import",label:"import"},menu:{icon:"menu",label:"menu"},more:{icon:"more",label:"more"},reset:{icon:"reset",label:"reset"},save:{icon:"save",label:"save"},search:{icon:"search",label:"search"},share:{icon:"share",label:"share"}};class Ks extends C{static{s(this,"Btn")}static commands=Ul;static formAssociated=!0;static internals={role:"button"};static shadow=!0;static attr={command:String,commandfor:String,disabled:Boolean,icon:String,label:String,type:{default:"button",values:["button","reset","submit"]}};static styles=`
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
  `;get form(){return this.internals?.form??null}get preset(){return this.constructor.commands[this.getAttr("command")]??{}}get iconName(){return this.getAttr("icon")??this.preset.icon}get labelText(){return this.getAttr("label")??this.preset.label??""}get method(){return ai(this.getAttr("command")?.replace(/^--/,"")??"")}get commandTarget(){const t=this.getAttr("commandfor");if(t)return document.getElementById(t)??this.getRootNode().querySelector?.(t)??document.querySelector(t);for(let n=this.parentElement??this.getRootNode().host;n;n=n.parentElement??n.getRootNode().host)if(Ce(n[this.method]))return n;return null}run(){const t=this.getAttr("command"),n=t&&this.commandTarget;if(!n)return;if(Ce(n[this.method]))return n[this.method]();const r=typeof CommandEvent=="function"?new CommandEvent("command",{cancelable:!0,command:t,source:this}):new CustomEvent("command",{cancelable:!0,detail:{command:t,source:this}});n.dispatchEvent(r)}onConnected(){this.on("click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},{capture:!0}),this.on("click",t=>{if(t.defaultPrevented)return;const n=this.getAttr("type");n==="submit"&&this.form?.requestSubmit(),n==="reset"&&this.form?.reset(),this.run()}),this.on("keydown",t=>{t.target===this&&(t.key==="Enter"&&(t.preventDefault(),this.click()),t.key===" "&&t.preventDefault())}),this.on("keyup",t=>{t.target===this&&t.key===" "&&this.click()})}render(){const t=this.iconName;return f`
      ${t&&f`<svg-icon part="icon" icon="${t}"></svg-icon>`}
      <span part="label"><slot>${this.labelText}</slot></span>
    `}sync(){this.internals&&(this.internals.ariaDisabled=String(this.disabled)),this.tabIndex=this.disabled?-1:0}}class ql extends Ks{static{s(this,"BtnIcon")}static styles=`
    :host {
      aspect-ratio : 1;
      font-size    : var(--btn-icon-size, 1.15em);
      padding      : var(--btn-padding, --space(tiny));
    }

    [part="label"] { display: none; }
  `;render(){return f`<svg-icon part="icon" icon="${this.iconName??""}"></svg-icon><span part="label"><slot></slot></span>`}sync(){super.sync(),this.internals&&(this.internals.ariaLabel=this.getAttr("label")??(this.textContent.trim()||this.preset.label)??null)}}ql.init();class Fl extends Ks{static{s(this,"BtnPush")}static reflect=["variant"];static attr={variant:"default"};static styles=`
    :host {
      --btn-background : color-mix(in oklab, currentColor 12%, transparent);

      background-color : var(--btn-background);
      padding          : var(--btn-padding, --space(small));
    }
  `}Fl.init();const Hl={circle:"50%",square:"0px",rounded:"12px",squircle:"24% / 50%"},Gs=s(e=>e?Hl[e]??e:"","resolveShape"),Jl=s(e=>/^[\d.]/.test(e)||/(px|rem|em|%|vw|vh|vmin|vmax|ch|fr|pt|cm|mm|in)$/.test(e),"isSize");function Zs(e){const t={size:"",shape:""};if(!e)return t;for(const n of String(e).trim().split(/\s+/))n&&(Jl(n)?t.size=n:t.shape=n);return t}s(Zs,"parseLook");const ze=s(e=>{const t=parseFloat(e);return Number.isFinite(t)?t:null},"parsePx"),Wl=new Set(["item-look","item-shape","item-size","viewmode"]);class Kl extends C{static{s(this,"DataIndex")}static reflect=["viewmode"];static attr={gap:{type:String,var:"--index-gap"},itemIntrinsicSize:String,itemLook:String,itemShape:String,itemSize:String,itemSizeMax:String,itemSizeMin:String,viewmode:{type:String,default:"grid",values:["grid","list","gallery","masonry"]}};static styles=`data-index {
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
  }`;constructor(){super(),this._samples={count:0,total:0}}render(){return null}onConnected(){this.syncResize(),this.on("contentvisibilityautostatechange",t=>{t.skipped||this.sample(t.target)},{capture:!0})}onDisconnected(){this._resize?.destroy(),this._resize=null}onAttributeChanged(t){(t==="item-size-min"||t==="item-size-max")&&this.syncResize(),(t==="item-size"||t==="item-look")&&(this._resizeValue=null),Wl.has(t)&&this.relayout()}get learns(){return!this.getAttr("itemIntrinsicSize")}sample(t){!this.learns||t.localName!=="data-item"||t.hasAttribute("intrinsic-size")||t.parentElement?.closest("data-index")===this&&((this._pending??=new Set).add(t),!this._frame&&(this._frame=requestAnimationFrame(()=>{this._frame=null;for(const n of this._pending){const r=n.getBoundingClientRect().height;r>0&&(this._samples.count+=1,this._samples.total+=r)}this._pending.clear(),this.applyEstimate()})))}applyEstimate(){const{count:t,total:n}=this._samples;if(!t)return;const r=Math.round(n/t);Math.abs(r-(this._estimate??0))<1||(this._estimate=r,this.setVar("--item-intrinsic-size",`${r}px`))}relayout(){this._samples={count:0,total:0},this._estimate=null,this.learns&&this.setVar("--item-intrinsic-size",null),this.states.add("relayout"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.states.delete("relayout")))}async syncResize(){this._resize?.destroy(),this._resize=null;const t=ze(this.getAttr("itemSizeMin")),n=ze(this.getAttr("itemSizeMax")),r=this.getAttr("gestures")!=="false"&&t!=null&&n!=null&&n>t,i=this._resizeToken=(this._resizeToken??0)+1;if(!r){this._resizeValue=null;return}const{adjustable:o}=await v(async()=>{const{adjustable:c}=await import("./index-DIlYw3RB.js");return{adjustable:c}},[],import.meta.url);if(i!==this._resizeToken||!this._mounted)return;const a=this._resizeValue??ze(this.getAttr("itemSize"))??(t+n)/2;this._resize=o(this,{maximum:n,minimum:t,onChange:s(c=>{this._resizeValue=Math.round(c),this.setVar("--item-size",`${this._resizeValue}px`)},"onChange"),value:a}),this._resizeValue=this._resize.get(),this.setVar("--item-size",`${this._resizeValue}px`)}sync(){const{itemIntrinsicSize:t,itemLook:n,itemShape:r,itemSize:i}=this.getAttr(),o=Zs(n),a=this._resizeValue!=null?`${this._resizeValue}px`:i||o.size;this.setVar({"--item-shape":Gs(r||o.shape),"--item-size":a}),t?this.setVar("--item-intrinsic-size",t):this._estimate==null&&this.setVar("--item-intrinsic-size",null)}}Kl.init();class Gl extends C{static{s(this,"DataItem")}static attr={eager:Boolean,intrinsicSize:String,look:String,shape:String};static styles=`data-item {
    border-radius : var(--item-current-shape, var(--item-shape, 0px));
    box-sizing    : border-box;
    display       : block;
    overflow      : hidden;

    content-visibility           : auto;
    contain-intrinsic-block-size : auto var(--item-intrinsic-size, var(--item-size, 200px));

    transition-behavior : allow-discrete;

    &:is([shape="circle"], [shape="square"], [look~="circle"], [look~="square"]) { aspect-ratio: 1 / 1; }

    &[eager] { content-visibility: visible; }
  }`;render(){return null}sync(){const{intrinsicSize:t,look:n,shape:r}=this.getAttr();this.setVar({"--item-current-shape":Gs(r||Zs(n).shape),"--item-intrinsic-size":t})}}Gl.init();class Zl extends C{static{s(this,"DivX")}static attr={scrollable:Boolean};static styles(){return`div-x {
      display        : flex;
      flex-direction : row;

      &[scrollable] {
        min-inline-size : 0;
        overflow-x      : auto;
      }
    }`}}Zl.init("div-x");class Yl extends C{static{s(this,"DivY")}static attr={scrollable:Boolean};static styles(){return`div-y {
      display        : flex;
      flex-direction : column;
      min-height     : stretch;
      place-content  : safe center;

      &[scrollable] {
        min-block-size : 0;
        overflow-y     : auto;
      }
    }`}}Yl.init("div-y");class Xl extends C{static{s(this,"InputOption")}static attr={disabled:Boolean,icon:String,label:String,selected:Boolean,value:String};static styles="input-option { display: none; }";get label(){return this.getAttr("label")||this.textContent.trim()}get value(){return this.getAttribute("value")??this.label}render(){return null}}Xl.init("input-option");class Ql extends C{static{s(this,"NavCrumbs")}static internals={role:"navigation"};static attr={href:String,label:"breadcrumb",max:Number,path:String,root:String,separator:"/"};static styles=`nav-crumbs {
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
  }`;get crumbs(){const{path:t,root:n,separator:r}=this.getAttr();if(t==null)return[];const i=String(t).split(r).filter(Boolean),o=String(t).startsWith(r)?r:"",a=i.map((c,l)=>({label:c,path:o+i.slice(0,l+1).join(r)}));return n?[{label:n,path:o||r},...a]:a}onConnected(){this.on("click","button[data-path]",(n,r)=>{const i=Number(r.dataset.index);this.emit("nav-crumbs",{index:i,path:r.dataset.path})}),this.on("click","button[data-expand]",()=>{this._expanded=!0,this.update()});const t=new MutationObserver(()=>this.sync());t.observe(this,{childList:!0}),this.track(()=>t.disconnect())}onAttributeChanged(t){t==="path"&&(this._expanded=!1)}render(){if(this.getAttr("path")==null)return null;const{href:t,max:n}=this.getAttr(),r=this.crumbs,i=r.length-1,a=n>1&&r.length>n&&!this._expanded?[r[0],null,...r.slice(r.length-(n-1))]:r,c=s(l=>{if(!l)return f`<button type="button" data-expand aria-label="show full path">…</button>`;const u=r.indexOf(l);return u===i?f`<span aria-current="page">${l.label}</span>`:t?f`<a href="${t.replaceAll("{path}",encodeURIComponent(l.path))}">${l.label}</a>`:f`<button type="button" ...${I({"data-index":u,"data-path":l.path})}>${l.label}</button>`},"crumb");return f`${a.map(c)}`}sync(){if(this.internals&&(this.internals.ariaLabel=this.getAttr("label")),this.getAttr("path")!=null)return;const t=[...this.children];t.forEach((n,r)=>{r===t.length-1?n.hasAttribute("aria-current")||n.setAttribute("aria-current","page"):n.getAttribute("aria-current")==="page"&&n.removeAttribute("aria-current")})}}Ql.init();const gr="fallback",br=s((e,t)=>typeof e=="function"?e(t):e,"valueOf");function Ln(e={}){const t=new Map;function n(i){if(t.has(i))return t.get(i);const o="is"+i.charAt(0).toUpperCase()+i.slice(1);if(t.has(o))return t.get(o);throw new TypeError(`unknown predicate: ${i}`)}s(n,"predicateOf");function r(...i){const o=i.length<2?i[0]:i[1],a=[];for(const[l,u]of Object.entries(o))l!==gr&&a.push([n(l),u]);const c=s(l=>{for(const[u,p]of a)if(u(l))return br(p,l);return br(o[gr],l)},"run");return i.length<2?c:c(i[0])}return s(r,"shift"),r.with=i=>{for(const[o,a]of Object.entries(i)){if(typeof a!="function")throw new TypeError(`not a predicate: ${o}`);t.set(o,a)}return r},Object.defineProperty(r,"predicates",{get:s(()=>Object.fromEntries(t),"get")}),r.with(e)}s(Ln,"createShift");const tu=Ln(oi);Ln();const yr={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},eu=["error","warning","warn","success","info"],nu=.35,Ys=s(e=>e instanceof Error||e!=null&&typeof e=="object"&&Vt(e.message)&&("stack"in e||"name"in e),"isErrorLike"),ru=Ln(tu.predicates).with({isErrorLike:Ys})({nullish:"",string:s(e=>e,"string"),errorLike:s(e=>e.message,"errorLike"),fallback:String});function su(e,t={}){let n;if(Ys(e))n={type:"error",message:e,...t};else if(!He(e))n={message:e,...t};else{const r=eu.find(i=>i in e);if(r){const{[r]:i,...o}=e;n={type:r,message:i,...o,...t}}else n={...e,...t}}return n.message=ru(n.message),n.type==="warn"&&(n.type="warning"),n}s(su,"toToastOptions");const iu=`
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
`;class Z extends C{static{s(this,"PopToast")}static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
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
  `;static get stack(){let t=document.querySelector("[data-pop-toasts]");return t||(t=document.createElement("section"),In(t,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(t)),t}static notify(t,n){const{dismissible:r=!0,duration:i,heading:o,icon:a,message:c,title:l,type:u}=su(t,n),p=document.createElement("pop-toast"),d=this.stack;return In(p,{dismissible:r,duration:i,heading:o??l,icon:a,message:c,type:u}),d.append(p),d.showPopover&&(d.matches(":popover-open")&&d.hidePopover(),d.showPopover()),p}static error(t,n){return this.notify(t,{...n,type:"error"})}static info(t,n){return this.notify(t,{...n,type:"info"})}static success(t,n){return this.notify(t,{...n,type:"success"})}static warning(t,n){return this.notify(t,{...n,type:"warning"})}static warn(t,n){return this.warning(t,n)}onConnected(){ii("pop-toast-stack",iu),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(t=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const n=s(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return n(),this;const r=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:r},{opacity:0,translate:`${t*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(n,n),this}onSwipe(){let t=null,n=0;this.on("pointerdown",i=>{!this.getAttr("dismissible")||i.pointerType==="mouse"||i.composedPath().some(o=>o.localName==="button")||this.getAttr("gestures")!=="false"&&(t=i.clientX,n=0,this.stopTimer())}),this.$(window).on("pointermove",i=>{t!=null&&(n=i.clientX-t,this.style.translate=`${n}px 0`,this.style.opacity=String(1-Math.min(Math.abs(n)/this.offsetWidth,1)*.6))},{passive:!0});const r=s(()=>{if(t!=null){if(t=null,this.style.opacity="",Math.abs(n)>this.offsetWidth*nu){this.dismiss(Math.sign(n));return}this.style.translate="",this.animate?.([{translate:`${n}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",r)}render(){const{dismissible:t,heading:n,icon:r,message:i,type:o}=this.getAttr();return f`
      <svg-icon part="icon" icon="${r||yr[o]||yr.info}"></svg-icon>
      ${n&&f`<strong part="heading">${n}</strong>`}
      <div part="message">${i||f`<slot></slot>`}</div>
      ${t&&f`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const t=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=t:this.setAttribute("role",t)}}Object.assign((e,t)=>Z.notify(e,t),{error:s((e,t)=>Z.error(e,t),"error"),info:s((e,t)=>Z.info(e,t),"info"),success:s((e,t)=>Z.success(e,t),"success"),warn:s((e,t)=>Z.warning(e,t),"warn"),warning:s((e,t)=>Z.warning(e,t),"warning")});Z.init();const ou={dir:"ltr",display:"standalone",lang:"en",orientation:"any",viewport:{width:"device-width",initialScale:1,maximumScale:1,userScalable:"no",fit:"cover"},autoImport:["../.shared/components/"],aufbau:{elements:{mode:"auto"}},gestalt:{palette:"zombie"}},au={...ou,name:"Files",import:["@aufbau/elements/webcomponents/input/tags.js","@aufbau/elements/webcomponents/btn-icon.js","@aufbau/elements/webcomponents/btn-push.js","@aufbau/elements/webcomponents/data-index.js","@aufbau/elements/webcomponents/data-item.js","@aufbau/elements/webcomponents/div-x.js","@aufbau/elements/webcomponents/div-y.js","@aufbau/elements/webcomponents/input-option.js","@aufbau/elements/webcomponents/nav-crumbs.js","@aufbau/elements/webcomponents/pop-toast.js","@aufbau/elements/webcomponents/svg-icon.js"],autoImport:[{"./components/":["Action","Bar","Context","Dashboard","Entry","Facts","FileRow","Library","Menu","PasteBar","Preferences","Preview","RemoteManager","Searchbar","Status","Sync","TaskList","Tabs","Thumb","Welcome"]},"../.shared/components/"],database:{schema:{root:null}},dialogs:!0,files:!0,offline:!0,thumbnails:{maxBytes:128*1024*1024,width:256},android:{id:"dev.pulgasari.files",name:"Files",plugins:["filesync"]},build:{emptyOutDir:!0,outDir:"../../../apps/files"}};document.querySelector("rat-app").run(()=>v(()=>import("./app.rat-CwvQfpak.js"),__vite__mapDeps([23,15,3,2,1,5]),import.meta.url),au);export{nn as $,vr as B,re as D,Sr as F,go as I,wr as N,Z as P,At as R,_ as S,wu as T,ao as U,xu as a,I as b,Vo as c,k as d,gu as e,bu as f,Li as g,Ye as h,Pr as i,yu as j,vu as k,Nc as l,Io as m,ku as n,Su as o,Ls as p,lt as r,Ai as s,$t as u};
