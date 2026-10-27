const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Cx62zEvC.js","./preload-helper-Cc2_yIPf.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./index-LJN-aEqT.css"])))=>i.map(i=>d[i]);
var _o=Object.defineProperty;var o=(e,t)=>_o(e,"name",{value:t,configurable:!0});import{i as Wo,g as y,h as qo,r as Jt,P as Vo,L as Go,S as M,j as xn,$ as Tn,k as P,m as k,u as X,s as Ko,o as Yo,q as Rt,t as re}from"./index-Cx62zEvC.js";import{p as Jo,a as Xo}from"./keys-CWTtq0D5.js";import{_ as Qo}from"./preload-helper-Cc2_yIPf.js";import{r as $,b as Sn,g as Zo}from"./index-CgHh2HpB.js";import{t as Ne,n as Xt,p as En,q as Rn,r as ea,u as ta,v as On,x as na,y as oa,B as aa,z as An,D as la,E as Nn,F as ra,G as ia,H as sa,I as ca,J as ua,K as Cn,L as Ce,M as da,N as ut,h as c,f as x,w as p}from"./withControl-saxu6q3w.js";import{isCheckable as jn,isMultiSelect as Dn,isArray as vt,isString as Ze,isObject as Mn,isFn as Fn,isElementish as fa,isIterable as pa}from"https://esm.sh/jsr/@pulgasari/is";import{toKebabCase as Hn,toCamelCase as Ln}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";function Ot(e,t){const n={};for(const a of Object.keys(t)){const l=e?.[a],r=t[a];n[a]=Wo(l)?l:y(()=>e[a]===void 0&&r?r():e[a])}return new Proxy(e??{},{get:o((a,l)=>Object.hasOwn(n,l)?n[l]:a[l],"get")})}o(Ot,"signalsOf");function m(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const l=t?Jo(t):null;let r=a;return function(i){if(!(a&&!r)&&!(l&&!Xo(i,l))){n&&i.preventDefault(),a&&r--;try{const s=(typeof e=="string"?qo(e):e).call(this,i);typeof s?.catch=="function"&&s.catch(u=>Jt(this,u))}catch(s){Jt(this,s)}}}}o(m,"listener");function ma(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.add(...a),n}o(ma,"addClass$1");function ha(e,t){const n=$(e);return n?t?n.getAttribute(Hn(t)):Object.fromEntries([...n.attributes].map(a=>[a.name,a.value])):t?null:{}}o(ha,"getAttr");function va(e,t,{cast:n=!0}={}){const a=$(e);if(!a)return t?null:{};if(t){const r=a.dataset[Ln(t)];return r===void 0?null:n?Xt(r):r}const l={};for(const[r,i]of Object.entries(a.dataset))l[r]=n?Xt(i):i;return l}o(va,"getData");function ga(e,{box:t="border"}={}){const n=$(e);if(!n)return null;if(t==="content")return{width:n.clientWidth,height:n.clientHeight};if(t==="scroll")return{width:n.scrollWidth,height:n.scrollHeight};const a=n.getBoundingClientRect();return{width:a.width,height:a.height}}o(ga,"getElementSize");function $a(e){return $(e)?.innerHTML??null}o($a,"getHTML");const ba=o(e=>e.startsWith("--"),"isVar"),ya=o(e=>ba(e)?e:Hn(e),"propertyName");function wa(e,t,n=!1){const a=$(e);if(!a)return null;const l=n?a.style:getComputedStyle(a);return t?l.getPropertyValue(ya(t)).trim()||null:l}o(wa,"getStyle");function ka(e){return $(e)?.textContent??null}o(ka,"getText");const Qt={bool:o(e=>!!(vt(e)?e.length:e),"bool"),date:o(e=>Rn(e),"date"),number:o(e=>En(e)??0,"number"),string:o(e=>vt(e)?e.join(", "):String(e??""),"string")},xa=new Set(["button","data","input","meter","option","output","progress","select","textarea"]),Ta=o(e=>xa.has(e.localName)||e.localName?.includes("-")&&"value"in e,"hasValue");function Pn(e,t=null){const n=$(e);if(!n)return null;const a=jn(n)?n.checked:Dn(n)?[...n.selectedOptions].map(l=>l.value):Ta(n)?n.value:n.textContent??"";return t&&Qt[t]?Qt[t](a):a}o(Pn,"getValue");function Sa(e,t){const n=$(e);if(!n)return!1;const a=Ne(t);return a.length>0&&a.every(l=>n.classList.contains(l))}o(Sa,"hasClass$1");function Ea(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.remove(...a),n}o(Ea,"removeClass$1");function Ra(e,t){const n=$(e);return n?(n.setAttribute("class",Ne(t).join(" ")),n):null}o(Ra,"setClass");const Oa=o(e=>Ze(e)?e:Mn(e)||vt(e)?JSON.stringify(e):String(e),"encode");function Aa(e,t,n){const a=$(e);if(!a)return null;const l=Ze(t)?{[t]:n}:t??{};for(const[r,i]of Object.entries(l)){const s=Ln(r);i==null?delete a.dataset[s]:a.dataset[s]=Oa(i)}return a}o(Aa,"setData");function Na(e){const t=document.createElement("template");return t.innerHTML=String(e).trim(),t.content}o(Na,"createHTML");function Ca(e,t){const n=$(e);return n?(n.replaceChildren(Na(t??"")),n):null}o(Ca,"setHTML");function ja(e,t){const n=$(e);return n?(n.textContent=t==null?"":String(t),n):null}o(ja,"setText");function Da(e){e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}o(Da,"notifyChange");function Ma(e,t,{notify:n=!1}={}){const a=$(e);if(!a)return null;if(jn(a))a.checked=!!t;else if(Dn(a)){const l=ea(t).map(String);for(const r of a.options)r.selected=l.includes(r.value)}else"value"in a?a.value=t instanceof Date&&a.type==="date"?ta(t):t??"":a.textContent=t??"";return n&&Da(a),a}o(Ma,"setValue");function Fa(e,t,n){const a=$(e);if(!a)return null;if(Mn(t)){for(const[l,r]of Object.entries(t))a.classList.toggle(l,!!r);return a}for(const l of Ne(t))a.classList.toggle(l,n);return a}o(Fa,"toggleClass$1");const In=Symbol.for("domina.chain"),zn=o(e=>t=>typeof t===e,"isTypeOf"),Ha=o(e=>e==null||e==="","isBlank"),et=o(e=>e?.[In]===!0,"isChain"),me=zn("function"),Bn=o(e=>e!==null&&typeof e=="object"&&[Object.prototype,null].includes(Object.getPrototypeOf(e)),"isPlainObject"),La=zn("string"),Pa=o(e=>typeof e?.addEventListener=="function","isTarget"),Ia=o(e=>typeof e?.[Symbol.iterator]=="function","hasIterator"),Un=o(e=>e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),"toCamelCase"),At=o(e=>e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),"toKebabCase"),_n={};_n.ERROR=e=>{throw new TypeError("[domina] "+e)};const tt=o((e,t)=>Bn(e)?Object.entries(e):[[e,t]],"entriesOf"),za={params:{name:"string",value:"string"},read:o((e,t)=>ha(e,t),"read"),write:o((e,t,n)=>{for(const[a,l]of tt(t,n))At(a).startsWith("aria-")?Wn(e,a,l):na(e,a,l)},"write")},gt=o(e=>{const t=At(e);return t.startsWith("aria-")?t:`aria-${t}`},"ariaName");function Wn(e,t,n){n==null?e.removeAttribute(gt(t)):e.setAttribute(gt(t),Array.isArray(n)?n.join(" "):String(n))}o(Wn,"writeAria");function Ba(e){const t=e.getAttributeNames().filter(n=>n.startsWith("aria-"));return Object.fromEntries(t.map(n=>[Un(n.slice(5)),e.getAttribute(n)]))}o(Ba,"readAria");const Ua={params:{name:"string",value:"string"},read:o((e,t)=>t==null?Ba(e):e.getAttribute(gt(t)),"read"),write:o((e,t,n)=>{for(const[a,l]of tt(t,n))Wn(e,a,l)},"write")},ke=o(e=>{const t=At(e);return Un(t.startsWith("data-")?t.slice(5):t)},"dataKey"),qn=o((e,t)=>{delete e.dataset[ke(t)]},"removeData"),_a={params:{name:"string",value:"json"},read:o((e,t)=>va(e,t==null?void 0:ke(t)),"read"),write:o((e,t,n)=>{for(const[a,l]of tt(t,n))l==null?qn(e,a):Aa(e,ke(a),l)},"write")},Wa={params:{name:"string",value:"string"},read:o((e,t)=>t==null?{...e.dataset}:e.dataset[ke(t)]??null,"read"),write:o((e,t,n)=>{for(const[a,l]of tt(t,n))l==null?qn(e,a):e.dataset[ke(a)]=l},"write")},qa={write:ma,params:{names:"string"}},Va={write:Ea,params:{names:"string"}},Ga={write:Fa,params:{names:"string",force:"bool"}},Ka={read:Sa,params:{names:"string"}},Ya={params:{names:"string"},read:o(e=>[...e.classList],"read"),write:Ra},Ja={read:$a,write:Ca,params:{html:"html"}},Xa={read:wa,write:On,params:{property:"string",value:"string"}},Qa={read:ka,write:ja,params:{text:"string"}},Za={read:Pn,write:Ma,params:{value:"json"},reads:o(e=>e.length===0,"reads")},el=o(e=>Object.keys(e).every(t=>t==="box"),"onlyBox"),tl={object:!0,params:{w:"number",h:"number",box:"string"},reads:o(([e])=>e==null||el(e),"reads"),read(e,{box:t}={}){const n=ga(e,{box:t});return n&&{h:n.height,w:n.width}},write(e,{h:t,w:n}){const a={};n!==void 0&&(a.width=n),t!==void 0&&(a.height=t),On(e,a)}},nl=Object.freeze(Object.defineProperty({__proto__:null,addClass:qa,aria:Ua,attr:za,class:Ya,data:_a,dataset:Wa,hasClass:Ka,html:Ja,removeClass:Va,size:tl,style:Xa,text:Qa,toggleClass:Ga,value:Za},Symbol.toStringTag,{value:"Module"}));function ol(e,t,n,a,l){const r=$(e),i=oa(t).map(h=>aa[h]??h);if(!r||!i.length||!Fn(a))return()=>{};const s=n.includes(":scope"),u=o(h=>{if(!s)return h?.closest?.(n);const v=new Set(r.querySelectorAll(n));for(let d=h;d&&d!==r;d=d.parentNode)if(v.has(d))return d;return null},"matchOf"),b=o(h=>{const v=u(h.target);v&&r.contains(v)&&a.call(v,h,v)},"listener");for(const h of i)r.addEventListener(h,b,l);return()=>{for(const h of i)r.removeEventListener(h,b,l)}}o(ol,"delegateEvent");const $t=new WeakMap,Vn=o(e=>String(e??"").split(/[\s,]+/).filter(Boolean),"typesOf");function al(e){let t=$t.get(e);return t||$t.set(e,t=new Set),t}o(al,"recordsOf");function ll(e,t,n,a,l,r){const i=al(e),s={handler:a,selector:n,stop:null,type:t},u=o(()=>{s.stop(),i.delete(s)},"drop"),b=o((h,v)=>{r&&u(),a(h,v)},"call");return s.stop=n?ol(e,t,n,b,l):An(e,t,h=>b(h,e),l),i.add(s),l?.signal?.addEventListener("abort",()=>i.delete(s),{once:!0}),u}o(ll,"add$2");function rl(e,t,n,a,l,{once:r=!1}={}){if(!me(a))throw new TypeError("[domina] the handler is not a function");if(l?.signal?.aborted)return()=>{};const i=Vn(t).map(s=>ll(e,s,n||null,a,l,r));return()=>{for(const s of i)s()}}o(rl,"listen");function il(e,t,n){const a=$t.get(e);if(!a)return;const l=t?new Set(Vn(t)):null;for(const r of a)l&&!l.has(r.type)||n&&r.handler!==n||(r.stop(),a.delete(r))}o(il,"unlisten");function Gn(e,t,n){const[a,l,r,i]=typeof t[1]=="function"?[t[0],null,...t.slice(1)]:t;for(const s of e.elements)rl(s,a,l,r,i,{once:n});return e}o(Gn,"subscribe");const sl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Gn(this,e,!1)}},cl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Gn(this,e,!0)}},ul={kind:"event",params:{types:"string",handler:"function"},method(e,t){for(const n of this.elements)il(n,e,t);return this}},dl={kind:"event",params:{type:"string",detail:"json"},write:o((e,t,n,a)=>la(e,t,n,a),"write")},fl=Object.freeze(Object.defineProperty({__proto__:null,emit:dl,off:ul,on:sl,once:cl},Symbol.toStringTag,{value:"Module"}));function pl(e){return $(e)?.replaceChildren()??null}o(pl,"clearElement");function ml(e,t=!0){return $(e)?.cloneNode(t)??null}o(ml,"cloneElement");function hl(e,t,...n){const a=$(e);if(!a)return null;const l=Nn(n);if(!l.length)return a;const r=a.children,i=t<0?r.length+t:t,s=r[Math.max(0,Math.min(i,r.length))]??null;return s?s.before(...l):a.append(...l),a}o(hl,"insertAt");function vl(...e){const t=[];for(const n of e.flat(1/0)){const a=$(n);a&&(a.remove(),t.push(a))}return t}o(vl,"removeElement");function gl(e,...t){const n=$(e);if(!n?.parentNode)return null;const a=Nn(t);return n.replaceWith(...a),a}o(gl,"replaceElement");const $l="auto-asc",bl=/[̀-ͯ]/g,yl=/\d+/g,wl=/^[\x00-\x7f]*$/,Zt=o(e=>{let t=String(e);return wl.test(t)||(t=t.normalize("NFD").replace(bl,"")),t.toLowerCase().replace(yl,n=>n.padStart(16,"0"))},"textKey"),en=o(e=>Rn(e)?.getTime()??null,"dateKey"),tn={date:o(e=>e.map(en),"date"),num:o(e=>e.map(En),"num"),regular:o(e=>e.map(Zt),"regular"),auto:o(e=>{const t=e.map(en);return t.every((n,a)=>n!==null||e[a]==="")&&t.some(n=>n!==null)?t:e.map(Zt)},"auto")},kl=o((e,t,n)=>e===null&&t===null?0:e===null?1:t===null?-1:e<t?-n:e>t?n:0,"compareKeys");function xl({selector:e,order:t},n){const a=e?Sn(e):null,l=n.map(s=>Pn(a?s.querySelector(a):s)??"");if(Fn(t))return{values:l,order:t};const[r,i]=t.includes("-")?t.split("-"):["auto",t];return{keys:(tn[r]??tn.auto)(l),dir:i==="desc"?-1:1}}o(xl,"column");function Tl({container:e,item:t,indicators:n}){const a=ra("sortElements",e,t);if(!a)return[];const{$container:l,items:r}=a,i=ia(n,ca($l));if(i.some(s=>s.order==="random"))sa(r);else{const s=i.map(h=>xl(h,r)),u=r.map((h,v)=>v);u.sort((h,v)=>{for(const{dir:d,keys:E,order:J,values:q}of s){const U=J?J(q[h],q[v],r[h],r[v]):kl(E[h],E[v],d);if(U)return U}return 0});const b=u.map(h=>r[h]);r.splice(0,r.length,...b)}return l.append(...r),r}o(Tl,"sortElements");function Sl(e){const t=$(e);if(!t?.parentNode)return null;const n=[...t.childNodes];return t.replaceWith(...n),n}o(Sl,"unwrapElement");function El(e,t="div",n={}){const a=$(e);if(!a?.parentNode)return null;const l=Ze(t)?ua(t,n):$(t);return l?(a.replaceWith(l),l.append(a),l):null}o(El,"wrapElement");const Rl=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder$1"),Kn=o(e=>e.length<2?e:[...new Set(e)],"unique");function dt(e,t){try{return e.querySelectorAll?Array.from(e.querySelectorAll(t)):[]}catch{return[]}}o(dt,"select");function Ol(e,t){if(t==null)return dt(document,e);const n=he(t);return n.length===1?dt(n[0],e):Kn(n.flatMap(a=>dt(a,e))).sort(Rl)}o(Ol,"query");function he(e,t){return Ha(e)?[]:La(e)?Ol(e,t):et(e)?e.elements:Pa(e)?[e]:Ia(e)?Kn(Array.from(e,n=>he(n)).flat()):[]}o(he,"collect");class A{static{o(this,"Chain")}constructor(t,n=!1){this.elements=t,this.many=n}get[In](){return!0}get length(){return this.elements.length}get el(){return this.elements[0]??null}get all(){return this.many?this:new A(this.elements,!0)}[Symbol.iterator](){return this.elements[Symbol.iterator]()}each(t){return this.elements.forEach(t),this}map(t){return this.elements.map(t)}}const Yn=o(e=>e?.nodeType===1,"isElement");function Nt(e,t,n){return e.flatMap(o(function a(l){return me(l)?a(l(t,n)):l==null||l===!1?[]:Array.isArray(l)?l.flatMap(a):et(l)?l.elements:[l]},"resolve"))}o(Nt,"contentFor");function Ct(e,t,n){t.length<2||n.some(a=>et(a)||a?.nodeType)&&_n.ERROR(`${e}(): one node cannot go to ${t.length} places. pass a string, or a function (element, index) -> node`)}o(Ct,"assertPlaceable");const nt=o(e=>({kind:"structure",params:{content:"string"},method(...t){return Ct(e,this,t),this.elements.forEach((n,a)=>n[e](...Nt(t,n,a))),this}}),"placing"),Al=nt("append"),Nl=nt("prepend"),Cl=nt("before"),jl=nt("after"),Dl={kind:"structure",params:{index:"number",content:"string"},method(e,...t){return Ct("insert",this,t),this.elements.forEach((n,a)=>hl(n,e,...Nt(t,n,a))),this}},Jn=o(e=>({kind:"structure",params:{target:"string"},method(t){const[n]=he(t);return n&&n[e](...this.elements),this}}),"moving"),Ml=Jn("append"),Fl=Jn("prepend"),Hl={kind:"structure",params:{content:"string"},method(...e){Ct("replace",this,e);const t=this.elements.flatMap((n,a)=>gl(n,...Nt(e,n,a))??[]);return new A(t.filter(Yn),this.many)}},Ll={kind:"structure",params:{tag:"string",props:"json"},method(e="div",t={}){const n=this.elements.map((a,l)=>El(a,me(e)?e(a,l):e,t));return new A(n.filter(Boolean),this.many)}},Pl={kind:"structure",params:{},method(){const e=this.elements.flatMap(t=>Sl(t)??[]);return new A(e.filter(Yn),this.many)}},Il={kind:"structure",params:{},write:o(e=>{pl(e)},"write")},zl={kind:"structure",params:{},method(){return vl(this.elements),this}},Bl={kind:"structure",params:{deep:"bool"},method(e=!0){return new A(this.elements.map(t=>ml(t,e)),this.many)}},Ul={kind:"structure",params:{item:"string",by:"string"},method(e,...t){for(const n of this.elements)Tl({container:n,indicators:t.length?t:[{}],item:e});return this}},_l=Object.freeze(Object.defineProperty({__proto__:null,after:jl,append:Al,appendTo:Ml,before:Cl,clear:Il,clone:Bl,insert:Dl,prepend:Nl,prependTo:Fl,remove:zl,replace:Hl,sort:Ul,unwrap:Pl,wrap:Ll},Symbol.toStringTag,{value:"Module"}));function Wl(e,t){const n=$(e);if(!n)return[];const a=Cn(t);return[...n.children].filter(a)}o(Wl,"getChildren");function ql(e,t){return $(e)?.closest(Sn(t))??null}o(ql,"getClosest");function Vl(e){const t=$(e);return t?.parentElement?[...t.parentElement.children].indexOf(t):-1}o(Vl,"getIndex");function Gl(e,t){return Ce($(e),"nextElementSibling",t,!1)[0]??null}o(Gl,"getNext");function Kl(e,t){return Ce($(e),"nextElementSibling",t,!0)}o(Kl,"getNextAll");function Yl(e,t){const n=$(e)?.parentElement??null;return n&&da(n,t)?n:null}o(Yl,"getParent");function Jl(e,t){return Ce($(e),"parentElement",t,!0)}o(Jl,"getParents");function Xl(e,t){return Ce($(e),"previousElementSibling",t,!1)[0]??null}o(Xl,"getPrev");function Ql(e,t){return Ce($(e),"previousElementSibling",t,!0)}o(Ql,"getPrevAll");function Zl(e,t){const n=$(e);if(!n?.parentElement)return[];const a=Cn(t);return[...n.parentElement.children].filter(l=>l!==n&&a(l))}o(Zl,"getSiblings");const er=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder");function jt(e,t){const n=e.elements.flatMap(l=>[].concat(t(l)??[])),a=n.length<2?n:[...new Set(n)].sort(er);return new A(a,e.many)}o(jt,"step");const Dt=o((e,t)=>me(t)?t(e):e.matches?.(t),"matches$1"),Y=o(e=>({kind:"traversal",params:{filter:"string"},method(t){return jt(this,n=>e(n,t))}}),"walking"),tr={kind:"traversal",params:{selector:"string"},method(e){return jt(this,t=>he(e,t))}},nr={kind:"traversal",params:{selector:"string"},method(e){return jt(this,t=>ql(t,e))}},or=Y(Wl),ar=Y(Yl),lr=Y(Jl),rr=Y(Zl),ir=Y(Gl),sr=Y(Xl),cr=Y(Kl),ur=Y(Ql),dr={kind:"traversal",params:{test:"string"},method(e){return new A(this.elements.filter((t,n)=>me(e)?e(t,n):Dt(t,e)),this.many)}},fr={kind:"traversal",params:{test:"string"},method(e){return new A(this.elements.filter((t,n)=>!(me(e)?e(t,n):Dt(t,e))),this.many)}},pr={kind:"traversal",params:{selector:"string"},method(e){return new A(this.elements.filter(t=>t.querySelector?.(e)),this.many)}},mr={kind:"traversal",params:{index:"number"},method(e){const t=this.elements.at(e);return new A(t?[t]:[],this.many)}},hr={kind:"traversal",params:{},method(){return this.at(0)}},vr={kind:"traversal",params:{},method(){return this.at(-1)}},gr={kind:"traversal",params:{start:"number",end:"number"},method(e,t){return new A(this.elements.slice(e,t),this.many)}},$r={kind:"read",params:{selector:"string"},method(e){return this.elements.some(t=>Dt(t,e))}},br={params:{},read:Vl},yr=Object.freeze(Object.defineProperty({__proto__:null,at:mr,children:or,closest:nr,filter:dr,find:tr,first:hr,has:pr,index:br,is:$r,last:vr,next:ir,nextAll:cr,not:fr,parent:ar,parents:lr,prev:sr,prevAll:ur,siblings:rr,slice:gr},Symbol.toStringTag,{value:"Module"}));function wr(e){const t=$(e);if(!t)return null;const n=t.getBoundingClientRect(),a=n.top+window.scrollY,l=n.left+window.scrollX;return{x:a,y:l,left:a,top:l}}o(wr,"getElementOffset");function kr(e){const t=$(e);if(!t)return null;const n=t.offsetLeft,a=t.offsetTop;return{x:n,y:a,left:n,top:a}}o(kr,"getElementPosition");function xr(e){return $(e)?.getBoundingClientRect()??null}o(xr,"getElementRect");function Tr(e,{ratio:t=0}={}){const n=$(e);if(!n)return!1;const a=n.getBoundingClientRect(),l=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth,i=Math.min(a.bottom,l)-Math.max(a.top,0),s=Math.min(a.right,r)-Math.max(a.left,0);return i<=0||s<=0?!1:i*s/(a.height*a.width||1)>=t}o(Tr,"isElementInViewport");function Xn(e,t={}){const n=$(e)??window;return n?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest",...t}),n}o(Xn,"scrollTo$1");function Sr(e,t={}){return Xn(e,{behavior:"auto",...t})}o(Sr,"jumpTo$1");const Er=Symbol.for("domina.node");function Qn(e,t){return e?e[Er]===!0?[e.node].filter(Boolean):Ze(e)?Zo(e,t):fa(e)?[e]:pa(e)?[...e].flatMap(n=>Qn(n,t)):[$(e,t)].filter(Boolean):[]}o(Qn,"resolveElements");function Rr(e,{name:t,subtree:n=!1}={}){const a=o(u=>!t||u.animationName===t,"checkName"),l=o(u=>u.finished.catch(()=>null),"checkFinish"),r=o(u=>u.getAnimations({subtree:n}),"getNames"),i=Qn(e),s=i.flatMap(r).filter(a);return Promise.all(s.map(l)).then(()=>i)}o(Rr,"waitForAnimations");function Or(e,t,n,a){let l;return l=An(e,t,o(i=>{l(),n(i)},"wrapped"),a),l}o(Or,"onceEvent");function Ar(e,t,{signal:n,timeout:a}={}){return new Promise((l,r)=>{const i=Or(e,t,u=>{clearTimeout(s),l(u)}),s=a?setTimeout(()=>{i(),r(new Error(`waitForEvent: ${t} timed out`))},a):null;n?.addEventListener("abort",()=>{i(),clearTimeout(s),r(n.reason)})})}o(Ar,"waitForEvent");const Nr={params:{},read:wr},Cr={params:{},read:kr},jr={params:{},read:xr},Dr={params:{ratio:"number"},read:o((e,t=0)=>Tr(e,{ratio:t}),"read")},Mr={kind:"view",params:{options:"json"},method(e){return this.el&&Xn(this.el,e),this}},Fr={kind:"view",params:{options:"json"},method(e){return this.el&&Sr(this.el,e),this}},Hr={kind:"wait",params:{name:"string"},method(e){return Rr(this.elements,{name:e}).then(()=>this)}},Lr={kind:"wait",params:{type:"string",timeout:"number"},method(e,t){return this.el?Ar(this.el,e,{timeout:t}):Promise.reject(new Error("[domina] wait(): the chain is empty"))}},Pr=Object.freeze(Object.defineProperty({__proto__:null,finished:Hr,inView:Dr,jumpTo:Fr,offset:Nr,position:Cr,rect:jr,scrollTo:Mr,wait:Lr},Symbol.toStringTag,{value:"Module"})),Zn=new Map,Ir=o(e=>e.length===0||e.length===1&&!Bn(e[0]),"readsByDefault"),zr=o(({kind:e,method:t,read:n,write:a})=>e??(t?"method":n&&a?"access":n?"read":"write"),"kindOf");function Br(e,{method:t,read:n,reads:a=Ir,write:l}){return t||function(...r){const{elements:i}=this;if(n&&(!l||a(r)))return this.many?i.map(s=>n(s,...r)):i.length?n(i[0],...r):null;if(n&&r.length>1&&r.at(-1)===void 0)throw new TypeError(`[domina/chain] ${e}(): undefined is not a value, null removes`);if(n&&typeof r[1]=="function"){const[s,u]=r;return i.forEach((b,h)=>l(b,s,u(n(b,s),b,h))),this}for(const s of i)l(s,...r);return this}}o(Br,"build");function eo(e,t){if(e in A.prototype)throw new Error(`[domina/chain] "${e}" exists already`);const n=typeof t=="function"?{write:t}:t;Object.defineProperty(A.prototype,e,{configurable:!0,value:Br(e,n),writable:!0}),Zn.set(e,{...n,kind:zr(n),name:e,params:n.params??{}})}o(eo,"define");function to(e){for(const[t,n]of Object.entries(e))eo(t,n)}o(to,"extend");to({...nl,...fl,..._l,...yr,...Pr});function je(e,t){return et(e)?e:new A(he(e,t))}o(je,"d");function Ur(e,t){return new A(he(e,t),!0)}o(Ur,"dd");je.all=Ur;je.api=Zn;je.define=eo;je.extend=to;new Proxy(()=>{},{apply:o((e,t,[n,a])=>je(n,a),"apply"),get:o((e,t)=>ut[t],"get"),has:o((e,t)=>t in ut,"has"),set:o((e,t,n)=>(ut[t]=n,!0),"set")});function W(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}o(W,"read$1");function z(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}o(z,"write$1");const He=o(e=>(t,n)=>Vo.notify(t,{...n,type:e}),"notify"),L=Object.assign(He("info"),{error:He("error"),info:He("info"),success:He("success")}),_r=o((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function _(e,t=[]){let n=e;for(const a of t)n=await n.getDirectoryHandle(a);return n}o(_,"dirAt");async function Wr(e,t=[]){const n=await _(e,t),a=[];for await(const r of n.values())a.push(r);return(await Promise.all(a.map(async r=>{if(r.kind==="directory")return{kind:"directory",name:r.name};const i=await r.peekFile?.()??await r.getFile();return{kind:"file",lastModified:i.lastModified,name:r.name,size:i.size,type:i.type}}))).sort(_r)}o(Wr,"list$1");async function Mt(e,t,n){return(await(await _(e,t)).getFileHandle(n)).getFile()}o(Mt,"readFile");async function qr(e,t,n){await(await _(e,t)).getDirectoryHandle(n,{create:!0})}o(qr,"mkdir");async function Vr(e,t,n){await(await _(e,t)).removeEntry(n,{recursive:!0})}o(Vr,"remove$3");async function Gr(e,t,n,a,l){const r=await _(e,t),i=l==="directory"?await r.getDirectoryHandle(n):await r.getFileHandle(n);if(typeof i.move=="function")try{await i.move(a);return}catch{}l==="directory"?await Ht(i,r,a):await Ft(i,r,a),await r.removeEntry(n,{recursive:!0})}o(Gr,"rename");async function Ft(e,t,n,a){const l=await e.getFile(),i=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(i instanceof WritableStream)){await i.write(await l.arrayBuffer()),await i.close();return}try{await l.stream().pipeTo(i,{signal:a})}catch(s){throw await i.abort?.().catch(()=>{}),s}}o(Ft,"copyFile");async function Ht(e,t,n,a,l=()=>{}){const r=await t.getDirectoryHandle(n,{create:!0});for await(const i of e.values()){if(a?.aborted)throw new DOMException("copy aborted","AbortError");i.kind==="directory"?await Ht(i,r,i.name,a,l):(await Ft(i,r,i.name,a),l())}}o(Ht,"copyTree");const{folders:Q}=RAT.app,{perms:Kr,ready:Yr,sources:no}=Ot(Q,{perms:null,ready:null,sources:null}),N=y(()=>no.value.at(-1)??null),Jr=y(()=>N.value?Kr.value[N.value.id]??null:null),Z=y(()=>Jr.value==="granted"?Q.handleOf(N.value.id):null),oo=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",Xr=o(()=>Q.load(),"load");async function Qr(){const e=no.value.map(n=>n.id),t=await Q.add();if(t)for(const n of e)await Q.remove(n);return t}o(Qr,"grant");async function Zr(){return N.value?Q.reconnect(N.value.id):{granted:!1}}o(Zr,"reconnect$1");async function ei(){N.value&&await Q.remove(N.value.id)}o(ei,"forget$2");const ti={folder:M,name:M,path:Go(M)},ni={icon:M,label:M},ot=xn(ti).create(W("files:bookmarks",[])),Ve=Tn(M,M).create(W("files:folderTyped",{})),Lt=Tn(M,ni).create(W("files:folderTypes",{}));P(()=>z("files:bookmarks",ot));P(()=>z("files:folderTyped",Ve));P(()=>z("files:folderTypes",Lt));const xe=y(()=>String(N.value?.id??"")),ao=o(e=>`${xe.value}:${e.join("/")}`,"keyOf"),Pt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},Ue=y(()=>({...Pt,...Lt.toJSON()})),lo=o(e=>Ve.get(ao(e))??null,"folderTypeIdOf"),ro=o(e=>Ue.value[lo(e)]??null,"folderTypeOf");function bt(e,t){const n=ao(e);t?Ve.set(n,t):Ve.delete(n)}o(bt,"setFolderType");function oi({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return Lt.set(n,{icon:e,label:t}),n}o(oi,"addFolderType");function ai(e,t){const n=e.filter(i=>i.kind==="file"),a={};for(const i of n)a[t(i)]=(a[t(i)]??0)+1;const[l,r]=Object.entries(a).sort((i,s)=>s[1]-i[1])[0]??[];return l in Pt&&r/n.length>=.6?l:null}o(ai,"suggestFolderType");const li=o(()=>ot.where({folder:xe.value}),"bookmarks"),Le=o(e=>ot.has({folder:xe.value,path:e}),"isBookmarked"),nn=o((e,t)=>ot.toggle({folder:xe.value,name:t,path:e},{folder:xe.value,path:e}),"toggleBookmark"),ri=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ii(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let a=0;a<t.length;a+=32768)n+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(n)}o(ii,"toBase64");const si=o(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),ci=new Set([101,204,205,304]);async function ui(e,{body:t,headers:n={},method:a="GET",signal:l,timeout:r}={}){const i=ri();if(!i)return fetch(e,{body:t,headers:n,method:a,signal:l});const s=await i.request({body:await ii(t),headers:n,method:a,timeout:r,url:e});return new Response(ci.has(s.status)?null:si(s.data),{headers:s.headers,status:s.status,statusText:s.statusText})}o(ui,"request$2");const di=o(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),fi=o(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),io=o(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),ae=o((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function so(e,t="",n=!1){const a=new URL(fi(t),io(e)).href;return n&&!a.endsWith("/")?a+"/":a}o(so,"urlFor");const pi={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class ft extends Error{static{o(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function ve(e,t,{body:n,headers:a={},isDir:l=!1,method:r="GET"}={}){if(!e)throw new Error("No webdav connection.");let i;try{i=await ui(so(e,t,l),{body:n,headers:{Authorization:di(e),...a},method:r})}catch(s){throw globalThis.Capacitor?.isNativePlatform?.()?new ft(0,`Connection failed: ${s?.message??s}`):new ft(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!i.ok)throw new ft(i.status,pi[i.status]??`${i.status} ${i.statusText}`);return i}o(ve,"request$1");const mi='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',yt="DAV:",Pe=o((e,t)=>e.getElementsByTagNameNS(yt,t)[0]?.textContent??"","firstText");async function co(e,t,n){const a=await ve(e,t,{body:mi,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await a.text(),"application/xml"),r=new URL(io(e)).pathname,i=o(s=>{const u=decodeURIComponent(new URL(s,e.url).pathname);return(u.startsWith(r)?u.slice(r.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS(yt,"response")].map(s=>{const u=i(Pe(s,"href"));return{isDir:s.getElementsByTagNameNS(yt,"collection").length>0,lastModified:Date.parse(Pe(s,"getlastmodified"))||0,mime:Pe(s,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(Pe(s,"getcontentlength"))||0}})}o(co,"propfind");async function uo(e,t=""){const n=ae(t);return(await co(e,t,1)).filter(l=>l.path!==n).sort((l,r)=>l.isDir===r.isDir?l.name.localeCompare(r.name,void 0,{numeric:!0}):l.isDir?-1:1)}o(uo,"list");async function pt(e,t){try{return(await co(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}o(pt,"stat");const hi=o(async(e,t)=>(await ve(e,t)).blob(),"read"),fo=o((e,t,n)=>ve(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),vi=o((e,t)=>ve(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),gi=o((e,t,n=!1)=>ve(e,t,{isDir:n,method:"DELETE"}),"remove$2"),$i=o((e,t,n)=>({Destination:so(e,t,n),Overwrite:"F"}),"destination"),po=o((e,t,n,a=!1)=>ve(e,t,{headers:$i(e,n,a),isDir:a,method:"MOVE"}),"move"),bi=o(e=>uo(e,""),"test"),mt=o(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),on=o(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class at{static{o(this,"DavHandle")}constructor(t,n,a){this.connection=t,this.name=a,this.path=n}async isSameEntry(t){return t instanceof at&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class an extends at{static{o(this,"DavFileHandle")}kind="file";constructor(t,n,a,l=null){super(t,n,a),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:a=0}=this.meta??{};return{lastModified:t,name:this.name,size:a,type:n}}async getFile(){const t=await hi(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:o(async()=>{t.length=0},"abort"),close:o(async()=>{await fo(this.connection,this.path,new Blob(t))},"close"),write:o(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ie)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=ae(t.path,n);await po(this.connection,this.path,a,!1),Object.assign(this,{name:n,path:a})}}class ie extends at{static{o(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await uo(this.connection,this.path))yield[t.name,t.isDir?new ie(this.connection,t.path,t.name):new an(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const a=ae(this.path,t),l=await pt(this.connection,a);if(l&&!l.isDir)throw on(t);if(!l){if(!n)throw mt(t);await vi(this.connection,a)}return new ie(this.connection,a,t)}async getFileHandle(t,{create:n=!1}={}){const a=ae(this.path,t),l=await pt(this.connection,a);if(l?.isDir)throw on(t);if(!l){if(!n)throw mt(t);await fo(this.connection,a,new Blob([]))}return new an(this.connection,a,t,l)}async removeEntry(t){const n=ae(this.path,t),a=await pt(this.connection,n);if(!a)throw mt(t);await gi(this.connection,n,a.isDir)}async move(t,n=this.name){if(!(t instanceof ie)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=ae(t.path,n);await po(this.connection,this.path,a,!0),Object.assign(this,{name:n,path:a})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const yi=o(e=>new ie(e,"",e.name||new URL(e.url).host),"davRoot"),mo="remotes.json",_e=new Map,{files:ho}=RAT.app,wi={id:M,name:M,password:M,url:M,username:M},De=xn(wi).create(await ho.read(mo,"json").catch(()=>[]));P(()=>ho.write(mo,JSON.stringify(De)));const Ge=y(()=>De.toArray()),vo=o(e=>De.one({id:e})??null,"byId");async function ki({name:e,password:t="",url:n,username:a=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const r={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(a).trim()};return await bi(r),De.push(r),r}o(ki,"add$1");function xi(e){De.drop({id:e}),_e.delete(e)}o(xi,"remove$1");function Ti(e){const t=vo(e);return t?(_e.has(e)||_e.set(e,yi(t)),_e.get(e)):null}o(Ti,"rootOf");const lt=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Si=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Ei=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,Ri=o(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function se({name:e,type:t=""}){const n=Ri(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||Si.test(n)?"documents":Ei.test(n)?"archives":"other"}o(se,"categoryOf");let S=k(null),V=k(null);const{files:It}=RAT.app,Oi=24,Ai=o(e=>e.startsWith(".")||e==="node_modules","SKIP"),zt=o(e=>`index/${e.id}.json`,"pathOf");let $e=null;async function go(e,t,n,a){const l=[],r=[];for await(const i of e.values()){if(a.aborted)throw new DOMException("scan aborted","AbortError");Ai(i.name)||(i.kind==="directory"?l.push(i):r.push(Promise.resolve(i.peekFile?.()??i.getFile()).then(s=>({lastModified:s.lastModified,name:i.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const i of await Promise.all(r))i&&n.push(i);V.value={files:n.length};for(const i of l)await go(i,[...t,i.name],n,a)}o(go,"walk");function Ni(e){const t=Object.fromEntries(lt.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const r=t[se(l)];r.count++,r.size+=l.size,n+=l.size}const a=e.toSorted((l,r)=>r.lastModified-l.lastModified).slice(0,Oi);return{categories:t,files:e,recent:a,scannedAt:Date.now(),size:n,total:e.length}}o(Ni,"summarize");async function Ci(e){return S.value=e?await It.read(zt(e),"json").catch(()=>null):null,S.value}o(Ci,"restore");async function ji(e,t){$e?.abort();const n=new AbortController;$e=n;const a=[];V.value={files:0};try{return await go(e,[],a,n.signal),S.value=Ni(a),await It.write(zt(t),JSON.stringify(S.value)),S.value}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{$e===n&&($e=null,V.value=null)}}o(ji,"scan");const $o=o(()=>$e?.abort(),"stop$1");async function Di(e){$o(),S.value=null,e&&await It.remove(zt(e)).catch(()=>{})}o(Di,"forget$1");function Mi(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const a=[];for(const l of S.value?.files??[])if(l.name.toLowerCase().includes(n)&&a.push(l),a.length>=t)break;return a}o(Mi,"search");const Fi=50,Bt="files:tasks";let G=k([]),Te=k(W(Bt,[]));const ln=y(()=>G.value.some(e=>e.state==="running")),Ut=new Map,rn=new Map;let Hi=0;const Ke=o(()=>X(()=>G.value),"tasks");function sn(e,t){G.value=Ke().map(n=>n.id===e?{...n,...t}:n)}o(sn,"patch");function ht(e,t){const a=[{...Ke().find(l=>l.id===e),...t,endedAt:Date.now()},...X(()=>Te.value)].slice(0,Fi);G.value=Ke().filter(l=>l.id!==e),Te.value=a,Ut.delete(e),z(Bt,a)}o(ht,"finish");function rt({icon:e="lucide:loader",label:t,lane:n="default"},a){const l=`task-${Date.now().toString(36)}-${++Hi}`,r=new AbortController;Ut.set(l,r),G.value=[...Ke(),{error:null,icon:e,id:l,label:t,lane:n,progress:null,queuedAt:Date.now(),state:"queued"}];const i=(rn.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{if(r.signal.aborted)return ht(l,{state:"cancelled"}),null;sn(l,{startedAt:Date.now(),state:"running"});const s=o((u,b)=>sn(l,{progress:{done:u,total:b}}),"progress");try{const u=await a({progress:s,signal:r.signal});return ht(l,{state:r.signal.aborted?"cancelled":"done"}),u}catch(u){throw ht(l,u?.name==="AbortError"?{state:"cancelled"}:{error:String(u?.message??u),state:"failed"}),u}});return rn.set(n,i),i}o(rt,"run");const Li=o(e=>Ut.get(e)?.abort(),"cancel");function Pi(){Te.value=[],z(Bt,[])}o(Pi,"clearHistory");const{dialogs:Ii}=RAT.app,B=o(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),bo=o(()=>!!B(),"available$1"),yo=["https","http"],cn=53317,wo="files:sync",wt=W(wo,{});let Se=k(null),be=k([]),kt=k(null),j=k([]),ce=k(Array.isArray(wt.targets)?wt.targets:[]),Ye=wt.folderName??"";const _t=o(()=>z(wo,{folderName:Ye,targets:ce.value}),"persist");function zi(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const r=new URL(n.replace(/^filesync:\/\//,"http://")),i=r.searchParams.get("protocol");return{fingerprint:r.searchParams.get("fingerprint")??"",host:r.hostname,port:Number(r.port)||cn,protocol:yo.includes(i)?i:t}}catch{return null}const[a,l]=n.split(":");return{fingerprint:"",host:a,port:Number(l)||cn,protocol:t}}o(zi,"parseTarget");const un=o(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),ko=o((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget");function Bi(e){const t=ce.value.filter(n=>!ko(n,e));ce.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),_t()}o(Bi,"remember");function Ui(e){ce.value=ce.value.filter(t=>!ko(t,e)),_t()}o(Ui,"forget");let dn=!1;async function xo(){const e=B();e&&(dn||(dn=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;be.value=[t,...be.value.filter(a=>(a.fingerprint||a.ip)!==n)]}),kt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await Wt())}o(xo,"start");const _i=o(()=>B()?.stopDiscovery().catch(()=>{}),"stop");function To(e){const t=new Set(j.value.map(n=>n.uri));j.value=[...j.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}o(To,"add");async function Wi(){const{files:e=[]}=await B().pickFiles();To(e)}o(Wi,"pickFiles");async function qi(e,t,n){const a=await(await _(e,t)).getFileHandle(n.name),l=a._uri??(a.path?`file://${a.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");To([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}o(qi,"addEntry");const Vi=o(e=>{j.value=j.value.filter(t=>t.uri!==e)},"remove"),Gi=o(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Ki(e,t=j.value,n=""){const a=B();if(!a||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return rt({icon:"lucide:send",label:`Send ${l} to ${un(e)}`,lane:"send"},async({progress:r})=>{const i=await a.addListener("progress",s=>r(s.sent,s.total));try{const s=o(u=>a.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await s(n)}catch(u){if(!Gi(u))throw u;const b=await Ii.prompt({message:`${un(e)} wants a pin`,ok:"Send",title:"Pin"});if(!b)throw new Error("no pin given");await s(b)}Bi(e),j.value=j.value.filter(u=>!t.includes(u))}finally{i.remove()}})}o(Ki,"send");async function Wt(){const e=await B()?.getAutoSyncState().catch(()=>null)??null;Se.value=e&&{...e,name:e.tree?Ye:""}}o(Wt,"refreshAutoSync");async function Yi(){const{name:e,uri:t}=await B().pickFolder();t&&(Ye=e??"",Se.value={...Se.value,name:Ye,tree:t},_t())}o(Yi,"pickSyncFolder");async function Ji(e,{pin:t="",ssid:n=""}={}){const a=Se.value?.tree;if(!a)throw new Error("pick a folder first");await B().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:a}),await Wt()}o(Ji,"startAutoSync");async function Xi(){await B().stopAutoSync(),await Wt()}o(Xi,"stopAutoSync");const Qi=o(()=>B()?.syncNow(),"syncNow");let O=k(null);const qt=o((e,t)=>e.join("/")===t.join("/"),"samePath"),Zi=o((e,t)=>e.length>=t.length&&qt(e.slice(0,t.length),t),"isInside");function es(e,t,n,a){const l={kind:t.kind,name:t.name,path:t.path??n,root:a},r=O.value?.mode===e&&!O.value.pasted?O.value.items.filter(i=>!(i.name===l.name&&qt(i.path,l.path))):[];O.value={items:[...r,l],mode:e}}o(es,"pick$1");const ts=o(()=>{O.value&&(O.value={...O.value,pasted:!0})},"pasted"),So=o(()=>{O.value=null},"clear");async function fn(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}o(fn,"exists");async function ns(e,t,n){if(!await fn(e,t))return t;const a=n==="file"?t.lastIndexOf("."):-1,l=a>0?t.slice(0,a):t,r=a>0?t.slice(a):"";for(let i=2;;i++){const s=`${l} (${i})${r}`;if(!await fn(e,s))return s}}o(ns,"freeName");async function We(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await We(n);return t}o(We,"countFiles");const os=o(async(e,t)=>{const n=await _(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)},"handleOf");async function as(e,t,n,a,{onProgress:l=o(()=>{},"onProgress"),signal:r}={}){for(const v of t)if(v.kind==="directory"&&Zi(a,[...v.path,v.name]))throw new Error(`“${v.name}” can not go into itself`);const i=await _(e,a),s=await Promise.all(t.map(v=>os(v.root??e,v))),u=(await Promise.all(s.map(We))).reduce((v,d)=>v+d,0);let b=0;const h=o(()=>l(++b,u),"onFile");l(0,u);for(const[v,d]of t.entries()){if(r?.aborted)throw new DOMException("transfer aborted","AbortError");const E=s[v],J=await _(d.root??e,d.path);if(n==="move"&&qt(d.path,a)){b+=await We(E),l(b,u);continue}const q=await ns(i,d.name,d.kind);if(n==="move"&&typeof E.move=="function")try{await E.move(i,q),b+=await We(E),l(b,u);continue}catch{}d.kind==="directory"?await Ht(E,i,q,r,h):(await Ft(E,i,q,r),h()),n==="move"&&await J.removeEntry(d.name,{recursive:!0})}}o(as,"transfer");const{dialogs:ee,router:ue}=RAT.app,ls={copy:"lucide:copy",move:"lucide:scissors"},rs=["pattern-bg","pattern-tile"],is={open:"auto","pattern-bg":"","pattern-tile":"",searchbar:"bottom",tabbar:"bottom",viewmode:"list"};let F=k(Object.fromEntries(Object.entries(is).map(([e,t])=>[e,W(`files:${e}`,t)])));P(()=>{for(const[e,t]of Object.entries(F.value))z(`files:${e}`,t)});const Eo=o((e,t)=>{F.value={...F.value,[e]:t}},"setting");P(()=>{const e=document.documentElement;for(const t of rs){const n=F.value[t];e.toggleAttribute(`data-${t}`,!!n),n&&Qo(async()=>{const{patternStyle:a}=await import("./index-Cx62zEvC.js").then(l=>l.v);return{patternStyle:a}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:a})=>a(n,{name:t})).then(a=>{if(!(!a||X(()=>F.value[t])!==n))for(const[l,r]of Object.entries(a))e.style.setProperty(l,r)})}});const ss=o(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Ro=o(()=>F.value.open==="single"||F.value.open==="auto"&&ss(),"opensOnTap");let oe=k(null),Ee=k([]),C=k(null),le=k(""),xt=k(!1),Tt=k(""),g=k(null),de=k(null),ye=k(null),Re=k(W("files:tabs",{index:0,list:[{path:[]}]}));P(()=>z("files:tabs",Re.value));const D=y(()=>Re.value.list?.length?Re.value.list:[{path:[]}]),H=y(()=>Math.min(Math.max(0,Re.value.index??0),D.value.length-1)),w=y(()=>D.value[H.value].path),ge=y(()=>D.value[H.value].source??null),Oo=new Map,Ao=o(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function te(e,t=H.value){Re.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}o(te,"setTabs");function K(e,t){te(D.value.map((n,a)=>a===H.value?{path:e,source:t===void 0?n.source??null:t}:n)),g.value=null,le.value=""}o(K,"goTo");function No(e=w.value,t=ge.value){const n=[...D.value,{path:e,source:t}];te(n,n.length-1),g.value=null}o(No,"openTab");function cs(e){if(D.value.length===1)return K([]);te(D.value.filter((t,n)=>n!==e),e<H.value?H.value-1:H.value)}o(cs,"closeTab");function us(e){Oo.set(H.value,Ao()?.scrollTop??0),te(D.value,e),g.value=null}o(us,"switchTab");const pn=o(e=>e.path.at(-1)??it(e.source??null),"tabName"),Me=o(e=>e?Ti(e):Z.value,"rootOfSource"),it=o(e=>e?vo(e)?.name??"remote":N.value?.name??"folder","sourceName"),st=o(()=>Me(ge.value),"rootHandle"),Oe=o(()=>it(ge.value),"folderName"),fe=o(e=>e.source!==void 0?e.source:e.path?null:ge.value,"sourceOf");let Ie=0;P(()=>{const e=st(),t=w.value,n=++Ie;Ee.value=[],xt.value=!!e,e&&Wr(e,t).then(a=>{n===Ie&&(Ee.value=a,requestAnimationFrame(()=>{const l=Ao();l&&(l.scrollTop=Oo.get(X(()=>H.value))??0)}))}).catch(a=>{n===Ie&&L.error(a)}).finally(()=>{n===Ie&&(xt.value=!1)})});let St=null;P(()=>{const e=Z.value,t=N.value;!e||!t||St===t||(St=t,Ci(t).then(()=>Co(e,t)))});function Co(e,t){return rt({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:a})=>{a.addEventListener("abort",()=>$o());const l=P(()=>{V.value&&n(V.value.files,null)});return ji(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}o(Co,"indexFolder");const ds=o(()=>{Z.value&&Co(Z.value,N.value)},"rescan"),fs=o((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(a=>a.name.toLowerCase().includes(n)):e},"matches"),mn=y(()=>fs(Ee.value,le.value)),Et=o(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),jo=o((e,t)=>e.kind==="directory"?t&&ro([...t,e.name])?.icon||"lucide:folder":lt.find(n=>n.id===se(e))?.icon??"lucide:file","iconOf");function pe(e,t=w.value){if(e.kind==="directory")return K([...t,e.name]),ue.go("/library");C.value={...e,kind:"file",path:e.path??t,source:fe(e)},ue.go("/preview")}o(pe,"open");function hn(e){K(e.path??[],fe(e)),ue.go("/library")}o(hn,"showInFolder");function ps(e){if(Ro())return pe(e);g.value=e}o(ps,"onEntryClick");function Do(e){de.value=null,g.value=e,RAT.app.toggle("context",!0)}o(Do,"about");function ms(){g.value=null,de.value="tasks",RAT.app.toggle("context",!0)}o(ms,"openTasks");async function ct(){const e=st();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(L.error("No permission to change this folder"),null)}o(ct,"writable");function Vt(e,t,n){const a=o(()=>t.join("/")===w.value.join("/"),"same");rt({...e,lane:"write"},n).then(()=>{a()&&K([...t])}).catch(L.error)}o(Vt,"writeTask");async function Mo(){const e=await ee.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await ct();if(!t)return;const n=w.value;Vt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>qr(t,n,e))}o(Mo,"newFolder");async function hs(e){const t=await ee.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await ct();if(!n)return;const a=e.path??w.value;g.value=null,Vt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},a,()=>Gr(n,a,e.name,t,e.kind))}o(hs,"renameEntry");async function vs(e){if(!await ee.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await ct();if(!t)return;const n=e.path??w.value;g.value=null,RAT.app.toggle("context",!1),Vt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Vr(t,n,e.name))}o(vs,"deleteEntry");function vn(e,t){es(e,t,t.path??w.value,Me(fe(t))),RAT.app.toggle("context",!1)}o(vn,"pick");async function gs(){const e=O.value;if(!e)return;const t=await ct();if(!t)return;const n=[...w.value],a=e.items.length,l=a===1?e.items[0].name:`${a} items`,r=e.mode==="move"?"move":"copy",i=ls[r];e.mode==="move"?So():ts();const s=o(()=>{n.join("/")===w.value.join("/")&&K([...n])},"done");rt({icon:i,label:`${r} ${l} to /${n.join("/")}`,lane:"write"},({progress:u,signal:b})=>as(t,e.items,e.mode,n,{onProgress:u,signal:b})).then(s).catch(u=>{u?.name!=="AbortError"&&L.error(u),s()})}o(gs,"paste");async function gn(e){const t=await Mt(Me(fe(e)),e.path??w.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}o(gn,"download");async function Je(){if(!oo)return L.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await Qr())return;te([{path:[]}],0),ue.go("/")}catch(e){L.error(e)}}o(Je,"chooseFolder");async function $s(){const{granted:e}=await Zr();if(!e)return Je()}o($s,"reconnect");async function bs(){await ee.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:Oe()})&&(await Di(N.value),St=null,await ei(),te([{path:[]}],0))}o(bs,"closeFolder");function Fo(e){No([],e),ue.go("/library")}o(Fo,"openRemote");function ys(){g.value=null,de.value="remotes",RAT.app.toggle("context",!0)}o(ys,"manageRemotes");async function ws(e){if(!await ee.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await xi(e.id);const t=D.value.filter(n=>n.source!==e.id);te(t.length?t:[{path:[]}],0)}o(ws,"forgetRemote");function ks(e){qi(Z.value,e.path??w.value,e).then(()=>{RAT.app.toggle("context",!1),ue.go("/sync")}).catch(L.error)}o(ks,"sendEntry");async function xs(e){const t=await ee.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await ee.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";bt(e,oi({icon:n,label:t}))}o(xs,"newFolderType");function Ts(e){const t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[se(l)]=(n[se(l)]??0)+1;const a=Object.entries(n).sort((l,r)=>r[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:a&&a[1]/t.length>=.6?lt.find(l=>l.id===a[0])?.label:null,size:t.reduce((l,r)=>l+r.size,0)}}o(Ts,"factsOf");const ze=y(()=>Ts(Ee.value)),$n=lt.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),Ss=o((e,t)=>t.lastModified-e.lastModified,"newest"),Es=y(()=>(S.value?.files??[]).filter(e=>se(e)===oe.value).toSorted(Ss).slice(0,500)),Be=y(()=>Mi(Tt.value));let we=null;const Fe=Ko(!1),Ho=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Rs=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Ho;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),we=e,Fe.value=!0});addEventListener("appinstalled",()=>{we=null,Fe.value=!1});async function Os(){if(!we)return!1;const e=we;return we=null,Fe.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(Os,"install");function As(e){const t=`${e}:install-hint`,n=o(()=>{W(t)||(z(t,!0),L(`${e} can be installed: see the settings`))},"show");Fe.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}o(As,"hint");const Ns=864e5,Cs={day:"numeric",month:"short",year:"numeric"},Gt=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Xe=o(e=>{const t=Gt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Cs)},"date"),js=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Ns;return n<0?Xe(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Xe(t)},"ago"),Ds=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Xe(t)},"since"),Ms=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),a=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${a}:${l}`:`${a}:${l}`},"duration"),Fs=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),R={ago:js,bytes:Fs,date:Xe,duration:Ms,since:Ds};function T(e,t){return Hs.call({props:e},e,t)}o(T,"ActionRatHtml");function Hs(e,t){return c`<button.action type="button" disabled=${()=>e.disabled} onclick=${m(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}o(Hs,"$$ActionRatHtml");function qe(e,t){return Ls.call({props:e},e,t)}o(qe,"FactsRatHtml");function Ls(e,t){const n=y(()=>(e.rows??[]).filter(([,a])=>a!=null&&a!==""));return c`
    <dl.facts>
      ${x(()=>n.value,a=>a,a=>c`<dt>${()=>a[0]}</dt><dd>${()=>a[1]}</dd>`)}
    </dl>
  `}o(Ls,"$$FactsRatHtml");function Ps(e,t){return Is.call({props:e},e,t)}o(Ps,"RemoteManagerRatHtml");function Is(e,t){let n=k(null),a=k(!1);async function l(r){r.preventDefault();const i=r.target,s=o(u=>i.querySelector(`[name="${u}"]`)?.value??"","field");a.value=!0,n.value=null;try{const u=await ki({name:s("name"),password:s("password"),url:s("url"),username:s("username")});i.reset?.(),Fo(u.id),RAT.app.toggle("context",!1)}catch(u){n.value=u.message??String(u)}finally{a.value=!1}}return o(l,"add"),c`
    ${p(()=>Ge.value.length,()=>c`
        <ul.tasks>
          ${x(()=>Ge.value,r=>r,r=>c`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+r.name} onclick=${m(()=>ws(r))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${m(l)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${p(()=>n.value,()=>c`<p.error>${()=>n.value}</p>`)}
      <button.action type="submit" disabled=${()=>a.value}><svg-icon icon=${()=>a.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}o(Is,"$$RemoteManagerRatHtml");function Lo(e,t){return zs.call({props:e},e,t)}o(Lo,"StatusRatHtml");function zs(e,t){return c`
    ${p(()=>V.value,()=>c`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>V.value.files} files</p>`,()=>p(()=>S.value,()=>c`<p.status>${()=>S.value.total} files · ${()=>R.bytes(S.value.size)} · read ${()=>R.date(S.value.scannedAt)}</p>`))}
  `}o(zs,"$$StatusRatHtml");function Bs(e,t){return Us.call({props:e},e,t)}o(Bs,"TaskListRatHtml");function Us(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},a=o(s=>s.state==="queued"||s.state==="running","isOpen"),l=o(s=>{const{done:u,total:b}=s.progress??{};return s.state==="running"&&u!=null?b?`${Math.round(u/b*100)}%`:`${u}`:n[s.state]},"stateOf"),r=o(s=>s.error??[l(s),s.endedAt&&R.date(s.endedAt)].filter(Boolean).join(" · "),"noteOf");function i(s){return c`
      <li class=${()=>"task "+s.state}>
        <svg-icon icon=${()=>s.icon} />
        <span.text>
          <span.name>${()=>s.label}</span>
          <small>${()=>r(s)}</small>
          ${p(()=>s.state==="running"&&s.progress?.total,()=>c`<progress max=${()=>s.progress.total} value=${()=>s.progress.done} />`)}
        </span>
        ${p(()=>a(s),()=>c`<btn-icon icon="lucide:x" label=${()=>"cancel "+s.label} onclick=${m(()=>Li(s.id))} />`)}
      </li>
    `}return o(i,"row"),c`
    ${p(()=>G.value.length,()=>c`
        <ul.tasks>
          ${x(()=>G.value,s=>s,s=>c`${()=>i(s)}`)}
        </ul>
      `,()=>c`<p.empty>nothing to do</p>`)}
    ${p(()=>Te.value.length,()=>c`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${m(Pi)} />
        </div-x>
        <ul.tasks>
          ${x(()=>Te.value,s=>s,s=>c`${()=>i(s)}`)}
        </ul>
      `)}
  `}o(Us,"$$TaskListRatHtml");function _s(e,t){return Ws.call({props:e},e,t)}o(_s,"ContextRatHtml");function Ws(e,t){const{$path:n}=Ot(RAT.app.router,{$path:null}),a=y(()=>!ge.value),l=y(()=>w.value.length?lo(w.value):null),r=y(()=>w.value.length&&!l.value?ai(Ee.value,se):null),i=o(u=>bt(w.value,l.value===u?null:u),"toggleFolderType"),s=o(u=>"/"+(u.path??w.value).join("/"),"where");return c`
    ${p(()=>de.value==="tasks",()=>c`<h2>Tasks</h2><${Bs} />`,()=>p(()=>de.value==="remotes",()=>c`<h2>Remote</h2><${Ps} />`,()=>p(()=>g.value,()=>c`
            <h2>${()=>g.value.name}</h2>
            <${qe} ...${{get rows(){return[["name",g.value.name],["kind",g.value.kind==="directory"?"folder":g.value.type||"file"],["size",g.value.kind==="file"?R.bytes(g.value.size):null],["modified",g.value.lastModified?R.date(g.value.lastModified):null],["in",s(g.value)]]}}} />
            <div-x.actions>
              <${T} icon="lucide:arrow-up-right" label="open" ...${{onclick:o(()=>pe(g.value,g.value.path??w.value),"onclick")}} />
              ${p(()=>g.value.path,()=>c`<${T} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>hn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file",()=>c`<${T} icon="lucide:download" label="download" ...${{onclick:o(()=>gn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file"&&!fe(g.value)&&bo(),()=>c`<${T} icon="lucide:send" label="send" ...${{onclick:o(()=>ks(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="directory"&&!fe(g.value),()=>c`<${T} ...${{get icon(){return Le([...w.value,g.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return Le([...w.value,g.value.name])?"remove bookmark":"bookmark"},onclick:o(()=>nn([...w.value,g.value.name],g.value.name),"onclick")}} />`)}
              <${T} icon="lucide:copy" label="copy" ...${{onclick:o(()=>vn("copy",g.value),"onclick")}} />
              <${T} icon="lucide:scissors" label="move" ...${{onclick:o(()=>vn("move",g.value),"onclick")}} />
              <${T} icon="lucide:pencil" label="rename" ...${{onclick:o(()=>hs(g.value),"onclick")}} />
              <${T} icon="lucide:trash-2" label="delete" ...${{onclick:o(()=>vs(g.value),"onclick")}} />
            </div-x>
          `,()=>p(()=>n.value==="/preview"&&C.value,()=>c`
              <h2>Details</h2>
              <${qe} ...${{get rows(){return[["name",C.value.name],["type",C.value.type||"unknown"],["size",R.bytes(C.value.size)],["dimensions",ye.value?ye.value.width+" × "+ye.value.height:null],["modified",R.date(C.value.lastModified)],["in","/"+C.value.path.join("/")]]}}} />
              <div-x.actions>
                <${T} icon="lucide:download" label="download" ...${{onclick:o(()=>gn(C.value),"onclick")}} />
                <${T} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>hn(C.value),"onclick")}} />
              </div-x>
            `,()=>p(()=>n.value==="/library"&&st(),()=>c`
                <h2>This folder</h2>
                <${qe} ...${{get rows(){return[["folder",w.value.at(-1)??Oe()],["contains",ze.value.folders+" folders, "+ze.value.files+" files"],["size",R.bytes(ze.value.size)],["mostly",ze.value.mostly]]}}} />
                <div-x.actions>
                  <${T} icon="lucide:folder-plus" label="new folder" ...${{onclick:Mo}} />
                  ${p(()=>w.value.length&&a.value,()=>c`<${T} ...${{get icon(){return Le(w.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return Le(w.value)?"remove bookmark":"bookmark"},onclick:o(()=>nn(w.value,w.value.at(-1)),"onclick")}} />`)}
                </div-x>
                ${p(()=>w.value.length&&a.value,()=>c`
                    <h3>Foldertype</h3>
                    ${p(()=>r.value,()=>c`<p.hint>Looks like ${()=>Pt[r.value].label}. <button.link type="button" onclick=${m(()=>bt(w.value,r.value))}>Make it one</button></p>`)}
                    <div-x.actions>
                      ${x(()=>Object.keys(Ue.value),u=>u,u=>c`<button.action type="button" aria-pressed=${()=>String(l.value===u)} onclick=${m(()=>i(u))}><svg-icon icon=${()=>Ue.value[u].icon} /> ${()=>Ue.value[u].label}</button>`)}
                      <${T} icon="lucide:plus" label="new foldertype" ...${{onclick:o(()=>xs(w.value),"onclick")}} />
                    </div-x>
                  `)}
              `,()=>c`
                <h2>${()=>it(null)}</h2>
                <${Lo} />
                <div-x.actions><${T} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!Z.value||!!V.value},onclick:ds}} /></div-x>
              `)))))}
  `}o(Ws,"$$ContextRatHtml");function I(e,t){return qs.call({props:e},e,t)}o(I,"BarRatHtml");function qs(e,t){return c`
    <header.bar>
      ${p(()=>e.back,()=>c`<btn-icon icon="lucide:arrow-left" label="back" onclick=${m(e.back)} />`,()=>c`<btn-icon icon="lucide:menu" label="menu" onclick=${m(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${m(()=>RAT.app.toggle("config"))} />
    </header>
  `}o(qs,"$$BarRatHtml");function Kt(e,t){return Vs.call({props:e},e,t)}o(Kt,"ThumbRatHtml");function Vs(e,t){const n=e.entry,a=e.at??[],l=e.from??null,r=RAT.app.thumbnails,i=Et(n)?`${l??X(()=>N.value)?.id}/${a.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let s=k(i?r.peekFile(i):null);function u(b){if(!i||s.value)return;let h=!0;const v=new IntersectionObserver(([d])=>{d.isIntersecting&&(v.disconnect(),r.requestFile(i,()=>Mt(Me(l),a,n.name)).then(E=>{h&&E&&(s.value=E)}))},{rootMargin:"200px"});return v.observe(b),()=>{h=!1,v.disconnect()}}return o(u,"watch"),c`
    <span.thumb ref=${Yo(u)}>
      ${p(()=>s.value,()=>c`<img src=${()=>s.value} alt="" loading="lazy" />`,()=>c`<svg-icon icon=${()=>jo(n,l?null:e.at)} />`)}
    </span>
  `}o(Vs,"$$ThumbRatHtml");function bn(e,t){return Gs.call({props:e},e,t)}o(bn,"FileRowRatHtml");function Gs(e,t){const n=e.entry;return c`
    <li.row>
      <button.entry type="button" onclick=${m(()=>pe(n))}>
        <${Kt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+R.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Do({...n,kind:"file"}))} />
    </li>
  `}o(Gs,"$$FileRowRatHtml");function Qe(e,t){return Ks.call({props:e},e,t)}o(Qe,"SearchbarRatHtml");function Ks(e,t){const n=y(()=>G.value.length);return c`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${m(a=>e.onsearch?.(a.detail.query))} />
      <button type="button" class=${()=>ln.value?"tasks-button busy":"tasks-button"} aria-label=${()=>n.value?`${n.value} tasks`:"tasks"} title=${()=>n.value?`${n.value} tasks`:"tasks"} onclick=${m(ms)}>
        <svg-icon icon=${()=>ln.value?"lucide:loader":"lucide:list-checks"} />
        ${p(()=>n.value,()=>c`<span.badge>${()=>n.value}</span>`)}
      </button>
    </div>
  `}o(Ks,"$$SearchbarRatHtml");const Ys=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Js(e,t){return Xs.call({props:e},e,t)}o(Js,"LoadingRatHtml");function Xs(e,t){return Rt("1tn1js8",Ys),c`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${p(()=>e.text,()=>c`<span>${()=>e.text}</span>`)}
    </div>
  `}o(Xs,"$$LoadingRatHtml");function Po(e,t){return Qs.call({props:e},e,t)}o(Po,"WelcomeRatHtml");function Qs(e,t){return c`
    ${p(()=>!oo,()=>c`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>p(()=>!Yr.value,()=>c`<${Js} />`,()=>p(()=>!N.value,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${m(Je)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>Oe()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${m($s)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}o(Qs,"$$WelcomeRatHtml");function Zs(e,t){return ec.call({props:e},e,t)}o(Zs,"DashboardRatHtml");function ec(e,t){const n=o(d=>{K(d,null),RAT.app.router.go("/library")},"library"),a=o(()=>it(null),"folderName"),l=o(d=>Tt.value=d,"search"),r=y(()=>!!Z.value),i=y(()=>F.value.searchbar==="top"),s=y(()=>!!Tt.value.trim()),u=y(()=>li()),b=y(()=>$n.find(d=>d.id===oe.value)?.label??oe.value),h=o(d=>{try{return new URL(d).host}catch{return d}},"hostOf"),v=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return c`
    <${I} title="Files" />
    ${p(()=>r.value&&i.value,()=>c`<${Qe} ...${{get placeholder(){return"Search in "+a()},onsearch:l}} />`)}
    <div.scroll>
      ${p(()=>!r.value,()=>c`<${Po} />`,()=>p(()=>s.value,()=>c`
            <section>
              <h2>${()=>Be.value.length?"Found "+(Be.value.length>=100?"100+":Be.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${x(()=>Be.value,d=>d,d=>c`<${bn} ...${{get entry(){return d}}} />`)}
              </ul>
            </section>
          `,()=>p(()=>oe.value,()=>c`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${m(()=>oe.value=null)} />
                  <h2>${()=>b.value}</h2>
                </div-x>
                <ul.rows>
                  ${x(()=>Es.value,d=>d,d=>c`<${bn} ...${{get entry(){return d}}} />`)}
                </ul>
              </section>
            `,()=>c`
              ${p(()=>S.value?.recent?.length,()=>c`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${x(()=>S.value.recent,d=>d,d=>c`
                          <button.card type="button" onclick=${m(()=>pe(d))}>
                            <${Kt} ...${{get entry(){return d},get at(){return d.path}}} />
                            <span.name>${()=>d.name}</span>
                            <small>${()=>R.date(d.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${p(()=>u.value.length,()=>c`
                    <ul.tiles>
                      ${x(()=>u.value,d=>d,d=>c`
                          <li>
                            <button.tile type="button" onclick=${m(()=>n(d.path))}>
                              <svg-icon icon=${()=>ro(d.path)?.icon??"lucide:bookmark"} />
                              <span.text>
                                <span.name>${()=>d.name}</span>
                                <small>/${()=>d.path.join("/")}</small>
                              </span>
                            </button>
                          </li>
                        `)}
                    </ul>
                  `,()=>c`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${x(()=>$n,d=>d,d=>c`
                      <li>
                        <button.tile type="button" disabled=${()=>!S.value?.categories?.[d.id]?.count} onclick=${m(()=>oe.value=d.id)}>
                          <svg-icon icon=${()=>d.icon} />
                          <span.text>
                            <span.name>${()=>d.label}</span>
                            <small>${()=>S.value?.categories?.[d.id]?S.value.categories[d.id].count+" · "+R.bytes(S.value.categories[d.id].size):"…"}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles>
                  <li>
                    <button.tile type="button" onclick=${m(()=>n([]))}>
                      <svg-icon icon="lucide:folder-open" />
                      <span.text>
                        <span.name>${()=>a()}</span>
                        <small>${()=>S.value?R.bytes(S.value.size):"the granted folder"}</small>
                      </span>
                    </button>
                  </li>
                </ul>
                <${Lo} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${x(()=>Ge.value,d=>d,d=>c`
                      <li>
                        <button.tile type="button" onclick=${m(()=>Fo(d.id))}>
                          <svg-icon icon="lucide:cloud" />
                          <span.text>
                            <span.name>${()=>d.name}</span>
                            <small>${()=>h(d.url)}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                  <li>
                    <button.tile type="button" onclick=${m(ys)}>
                      <svg-icon icon="lucide:cloud-cog" />
                      <span.text>
                        <span.name>WebDAV, Nextcloud</span>
                        <small>${()=>Ge.value.length?"add or remove":"connect a server"}</small>
                      </span>
                    </button>
                  </li>
                  ${x(()=>v,d=>d,d=>c`
                      <li>
                        <button.tile type="button" disabled title=${()=>d.note}>
                          <svg-icon icon=${()=>d.icon} />
                          <span.text>
                            <span.name>${()=>d.label}</span>
                            <small>soon · ${()=>d.note}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                </ul>
              </section>
            `)))}
    </div>
    ${p(()=>r.value&&!i.value,()=>c`<${Qe} ...${{get placeholder(){return"Search in "+a()},onsearch:l}} />`)}
  `}o(ec,"$$DashboardRatHtml");function tc(e,t){return nc.call({props:e},e,t)}o(tc,"EntryRatHtml");function nc(e,t){const n=e.entry,a=X(()=>w.value),l=X(()=>ge.value),r=y(()=>g.value?.name===n.name&&!g.value?.path),i=o(s=>{s.key==="Enter"&&!Ro()&&(s.preventDefault(),pe(n))},"onkeydown");return c`
    <data-item>
      <div.row class:selected=${()=>r.value}>
        <button.entry type="button" aria-pressed=${()=>r.value?"true":null} onclick=${m(()=>ps(n))} ondblclick=${m(()=>pe(n))} onkeydown=${m(i)}>
          <${Kt} ...${{get entry(){return n},get at(){return a},get from(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?R.date(n.lastModified)+" · "+R.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Do(n))} />
      </div>
    </data-item>
  `}o(nc,"$$EntryRatHtml");function oc(e,t){return ac.call({props:e},e,t)}o(oc,"PasteBarRatHtml");function ac(e,t){const n=y(()=>O.value?O.value.items.length===1?O.value.items[0].name:`${O.value.items.length} items`:"");return c`
    ${p(()=>O.value,()=>c`
        <div-x.pastebar>
          <svg-icon icon=${()=>O.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>n.value}</span>
            <small>${()=>O.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${m(gs)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the clipboard" onclick=${m(So)} />
        </div-x>
      `)}
  `}o(ac,"$$PasteBarRatHtml");function yn(e,t){return lc.call({props:e},e,t)}o(yn,"TabsRatHtml");function lc(e,t){return c`
    <div-x.tabs role="tablist" scrollable>
      ${x(()=>D.value,n=>n,n=>c`
          <div class=${()=>D.value.indexOf(n)===H.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(D.value.indexOf(n)===H.value)} onclick=${m(()=>us(D.value.indexOf(n)))}>${()=>pn(n)}</button>
            ${p(()=>D.value.length>1,()=>c`<btn-icon icon="lucide:x" label=${()=>"close "+pn(n)} onclick=${m(()=>cs(D.value.indexOf(n)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${m(()=>No())} />
    </div-x>
  `}o(lc,"$$TabsRatHtml");function rc(e,t){return ic.call({props:e},e,t)}o(rc,"LibraryRatHtml");function ic(e,t){const n=y(()=>!!st()),a=y(()=>F.value.viewmode),l=y(()=>F.value.tabbar==="top"),r=y(()=>F.value.searchbar==="top"),i=o(()=>w.value.length?K(w.value.slice(0,-1)):RAT.app.router.go("/"),"up"),s=o(()=>Eo("viewmode",a.value==="grid"?"list":"grid"),"toggle"),u=o(h=>K(h.detail.path.split("/").filter(Boolean)),"crumb"),b=o(h=>le.value=h,"search");return c`
    ${p(()=>!n.value,()=>c`<${I} title="Library" /><div.scroll><${Po} /></div>`,()=>c`
        <${I} ...${{get title(){return w.value.at(-1)??Oe()},get back(){return i}}}><btn-icon icon=${()=>a.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>a.value==="grid"?"show as list":"show as grid"} onclick=${m(s)} /></${I}>
        ${p(()=>l.value,()=>c`<${yn} />`)}
        ${p(()=>r.value,()=>c`<${Qe} placeholder="Filter this folder" ...${{get value(){return le.value},onsearch:b}} />`)}
        <nav-crumbs root=${()=>Oe()} path=${()=>"/"+w.value.join("/")} onnav-crumbs=${m(u)} />
        <div.pane>
          <div.listing>
            ${p(()=>xt.value,()=>c`<svg-icon icon="lucide:loader" />`,()=>p(()=>mn.value.length,()=>c`
                  <data-index viewmode=${()=>a.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${x(()=>mn.value,h=>h,h=>c`<${tc} ...${{get entry(){return h}}} />`)}
                  </data-index>
                `,()=>c`<p.empty>${()=>le.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label="new folder" title="new folder" onclick=${m(Mo)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${oc} />
        ${p(()=>!r.value,()=>c`<${Qe} placeholder="Filter this folder" ...${{get value(){return le.value},onsearch:b}} />`)}
        ${p(()=>!l.value,()=>c`<${yn} />`)}
      `)}
  `}o(ic,"$$LibraryRatHtml");const sc=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function cc(e,t){return uc.call({props:e},e,t)}o(cc,"BrandRatHtml");function uc(e,t){return Rt("1npwj96",sc),c`
    <div.brand data-rat="1npwj96">
      ${p(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}o(uc,"$$BrandRatHtml");function dc(e,t){return fc.call({props:e},e,t)}o(dc,"MenuRatHtml");function fc(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],a=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:l}=Ot(RAT.app.router,{$path:null});function r(i){RAT.app.router.go(i);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return o(r,"go"),c`
    <nav.menu>
      <${cc} name="Files" icon="./app.svg" />
      ${x(()=>n,i=>i,i=>c`<button type="button" aria-current=${()=>l.value===i.route?"page":null} onclick=${m(()=>r(i.route))}><svg-icon icon=${()=>i.icon} /> ${()=>i.label}</button>`)}
      <hr />
      ${x(()=>a,i=>i,i=>c`<button type="button" disabled><svg-icon icon=${()=>i.icon} /> ${()=>i.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${m(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}o(fc,"$$MenuRatHtml");function pc(e,t){return mc.call({props:e},e,t)}o(pc,"PreferencesRatHtml");function mc(e,t){const n={"pattern-bg":"Background","pattern-tile":"Tiles"},a={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=o((r,i)=>Eo(r,i.detail?.value??i.target.value),"change");return c`
    <section>
      <h3>files</h3>
      ${x(()=>Object.keys(a),r=>r,r=>c`
          <label>
            <span>${()=>a[r].label}</span>
            <input-value look="segments" value=${()=>F.value[r]} onchange=${m(i=>l(r,i))}>
              ${x(()=>a[r].values,i=>i,i=>c`<input-option value=${()=>i[0]}>${()=>i[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${x(()=>Object.keys(n),r=>r,r=>c`
          <label>
            <span>${()=>n[r]}</span>
            <input-pattern opacity value=${()=>F.value[r]} onchange=${m(i=>l(r,i))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${p(()=>N.value,()=>c`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>N.value.name}</p>
          <div-x.actions>
            <${T} icon="lucide:folder-sync" label="change" ...${{onclick:Je}} />
            <${T} icon="lucide:x" label="close" ...${{onclick:bs}} />
          </div-x>
        `,()=>c`<${T} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Je}} />`)}
    </section>
  `}o(mc,"$$PreferencesRatHtml");function hc(e,t){return vc.call({props:e},e,t)}o(hc,"PreviewRatHtml");function vc(e,t){let n=k(null);P(()=>{const r=C.value;if(ye.value=null,n.value=null,!r||!Et(r))return;let i=null,s=!0;return Mt(Me(r.source),r.path,r.name).then(u=>{s&&(n.value=i=URL.createObjectURL(u))}),()=>{s=!1,i&&URL.revokeObjectURL(i)}});const a=o(r=>ye.value={height:r.target.naturalHeight,width:r.target.naturalWidth},"loaded"),l=o(()=>{g.value=null,RAT.app.toggle("context")},"info");return c`
    ${p(()=>!C.value,()=>c`
        <${I} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>c`
        <${I} ...${{get title(){return C.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${m(l)} /></${I}>
        <div.stage>
          ${p(()=>Et(C.value),()=>c`
              ${p(()=>n.value,()=>c`<img src=${()=>n.value} alt=${()=>C.value.name} onload=${m(a)} />`)}
            `,()=>c`<svg-icon icon=${()=>jo(C.value)} />`)}
        </div>
      `)}
  `}o(vc,"$$PreviewRatHtml");const Io=`appearance:${new URL(".",location.href).pathname}`,wn={density:re.densities,geometry:re.geometries,mode:re.modes},Ae=W(Io,{}),gc=o(()=>re.palettes().catch(()=>[]),"palettes");function $c(e,t){return Ae[e]=t||null,z(Io,Ae),re.set({[e]:t||null})}o($c,"setAppearance");Object.keys(Ae).length&&re.set(Ae);const bc=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function kn(e,t){return yc.call({props:e},e,t)}o(kn,"SettingsRatHtml");function yc(e,t){Rt("177zzh1",bc);let n=k({...Ae}),a=k([]);const l=y(()=>Fe.value);gc().then(s=>{a.value=s});function r(s,u){const b=u.detail?.value??u.target.value;n.value={...n.value,[s]:b},$c(s,b)}o(r,"change");async function i(){await Os()&&L.success(`${e.name??"the app"} is installed`)}return o(i,"installApp"),c`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${m(s=>r("palette",s))}>
            ${x(()=>a.value,s=>s,s=>c`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(wn),s=>s,s=>c`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${m(u=>r(s,u))}>
                ${x(()=>wn[s],u=>u,u=>c`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${p(()=>!Ho,()=>c`
          <section>
            <h3>install</h3>
            ${p(()=>l.value,()=>c`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${m(i)} />`,()=>c`
                ${p(()=>Rs,()=>c`<p.hint>Share, then "Add to Home Screen".</p>`,()=>c`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o(yc,"$$SettingsRatHtml");function wc(e,t){return kc.call({props:e},e,t)}o(wc,"SyncRatHtml");function kc(e,t){let n=k(null),a=k(""),l=k("https"),r=k(""),i=k("");const s=o(f=>`${f.host}:${f.port}`,"keyOf"),u=o(()=>n.value??zi(a.value,l.value),"target"),b=y(()=>ce.value.filter(f=>!be.value.some(ne=>s({host:ne.ip,port:ne.port})===s(f)))),h=y(()=>j.value.reduce((f,ne)=>f+Math.max(0,ne.size),0)),v=y(()=>Se.value??{}),d=y(()=>u()),E=o(f=>f.ip??f.host,"hostOf"),J=o(f=>!!d.value&&s(d.value)===s({host:E(f),port:f.port??53317}),"isChosen"),q=o(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),U=o(f=>Promise.resolve().then(f).catch(L.error),"run");function zo(f){n.value={alias:f.alias,fingerprint:f.fingerprint??"",host:E(f),port:f.port??53317,protocol:f.protocol??"https"},a.value=""}o(zo,"choose");function Bo(f){l.value=f.detail?.value??f.target.value,n.value&&(n.value={...n.value,protocol:l.value})}o(Bo,"protocol");function Yt(f,ne,Uo){return c`
      <li class=${()=>J(f)?"row selected":"row"}>
        <button.entry type="button" aria-pressed=${()=>String(J(f))} onclick=${m(()=>zo(f))}>
          <span.thumb><svg-icon icon=${()=>ne} /></span>
          <span.text>
            <span.name>${()=>f.alias??E(f)}</span>
            <small>${()=>E(f)}:${()=>f.port??53317} · ${()=>f.protocol??"https"}</small>
          </span>
        </button>
        ${p(()=>Uo,()=>c`<btn-icon icon="lucide:x" label=${()=>"forget "+(f.alias??E(f))} onclick=${m(()=>Ui(f))} />`)}
      </li>
    `}return o(Yt,"receiver"),c`
    ${p(()=>!bo(),()=>c`
        <${I} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>c`
        <${I} title="Send">
          ${p(()=>kt.value,()=>c`<small.identity>${()=>kt.value.alias}</small>`)}
        </${I}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${m(xo)} />
            </div-x>
            ${p(()=>be.value.length||b.value.length,()=>c`
                <ul.rows>
                  ${x(()=>be.value,f=>f,f=>c`${()=>Yt(f,q(f),!1)}`)}
                  ${x(()=>b.value,f=>f,f=>c`${()=>Yt(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>c`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>a.value} oninput=${m(f=>{a.value=f.target.value??"",n.value=null})} />
              <input-value look="segments" value=${()=>d.value?.protocol??l.value} onchange=${m(Bo)}>
                ${x(()=>yo,f=>f,f=>c`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" value=${()=>r.value} oninput=${m(f=>r.value=f.target.value??"")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${p(()=>j.value.length,()=>c`
                <ul.rows>
                  ${x(()=>j.value,f=>f,f=>c`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>f.size>=0?R.bytes(f.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${m(()=>Vi(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>c`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${T} icon="lucide:file-plus" label="pick files" ...${{onclick:o(()=>U(Wi),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!j.value.length||!d.value} onclick=${m(()=>U(()=>Ki(u(),j.value,r.value)))}><svg-icon icon="lucide:send" /> send${()=>j.value.length?` ${j.value.length} · ${R.bytes(h.value)}`:""}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${qe} ...${{get rows(){return[["folder",v.value.name||(v.value.tree?"chosen":"none yet")],["state",v.value.enabled?"on"+(v.value.lastSync?" · last "+R.date(v.value.lastSync):""):"off"],["to",v.value.enabled?v.value.host+":"+v.value.port:null]]}}} />
            ${p(()=>!v.value.enabled,()=>c`<input-text placeholder="only on this wi-fi (ssid), optional" value=${()=>i.value} oninput=${m(f=>i.value=f.target.value??"")} />`)}
            <div-x.actions>
              <${T} icon="lucide:folder-search" label="folder" ...${{onclick:o(()=>U(Yi),"onclick")}} />
              ${p(()=>v.value.enabled,()=>c`
                  <${T} icon="lucide:refresh-cw" label="now" ...${{onclick:o(()=>U(Qi),"onclick")}} />
                  <${T} icon="lucide:pause" label="turn off" ...${{onclick:o(()=>U(Xi),"onclick")}} />
                `,()=>c`<${T} icon="lucide:play" label="turn on" ...${{get disabled(){return!v.value.tree||!d.value},onclick:o(()=>U(()=>Ji(u(),{pin:r.value,ssid:i.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}o(kc,"$$SyncRatHtml");function Dc(e,t){return xc.call({props:e},e,t)}o(Dc,"AppRatHtml");function xc(e,t){RAT.app.hold(Xr().catch(L.error)),As("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&xo(),l!=="/sync"&&n&&_i(),n=l==="/sync"}),c`
    <rat-area name="menu" dock="start"><${dc} /></rat-area>
    <rat-view name="dashboard" route="/"><${Zs} /></rat-view>
    <rat-view name|route="library"><${rc} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${hc} /></rat-view>
    <rat-view name|route="sync"><${wc} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${m(o(l=>{l.detail?.open||(de.value=null)},"ontoggle"))}><div.context><${_s} /></div></rat-area>
    <rat-area name="config" dock="end"><${kn} name="Files"><${pc} /></${kn}></rat-area>
  `}o(xc,"$$AppRatHtml");export{Dc as default};
