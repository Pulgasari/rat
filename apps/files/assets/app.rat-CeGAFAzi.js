const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-D95qI_I9.js","./preload-helper-Cc2_yIPf.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./index-DJNaec74.css"])))=>i.map(i=>d[i]);
var Ko=Object.defineProperty;var o=(e,t)=>Ko(e,"name",{value:t,configurable:!0});import{i as Jo,g as v,h as Yo,r as Xt,P as Xo,L as Qo,S as H,j as bn,$ as yn,k as M,m as w,o as Nt,q as wn,u as we,s as Zo,t as de,v as ea,w as Dt,x as ta,y as ae,z as Qt}from"./index-D95qI_I9.js";import{p as na,a as oa}from"./keys-CWTtq0D5.js";import{_ as aa}from"./preload-helper-Cc2_yIPf.js";import{r as $,b as kn,g as ra}from"./index-CgHh2HpB.js";import{t as Ne,n as Zt,p as Tn,q as xn,r as ia,u as la,v as Sn,x as sa,y as ca,B as ua,z as En,D as da,E as Rn,F as fa,G as ma,H as pa,I as ha,J as va,K as On,L as De,M as $a,N as ut,h as c,f as k,w as m}from"./withControl-saxu6q3w.js";import{isCheckable as An,isMultiSelect as Nn,isArray as vt,isString as Xe,isObject as Dn,isFn as jn,isElementish as ga,isIterable as ba}from"https://esm.sh/jsr/@pulgasari/is";import{toKebabCase as Cn,toCamelCase as Hn}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";function je(e,t){const n={};for(const a of Object.keys(t)){const r=e?.[a],i=t[a];n[a]=Jo(r)?r:v(()=>e[a]===void 0&&i?i():e[a])}return new Proxy(e??{},{get:o((a,r)=>Object.hasOwn(n,r)?n[r]:a[r],"get")})}o(je,"signalsOf");function p(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const r=t?na(t):null;let i=a;return function(l){if(!(a&&!i)&&!(r&&!oa(l,r))){n&&l.preventDefault(),a&&i--;try{const s=(typeof e=="string"?Yo(e):e).call(this,l);typeof s?.catch=="function"&&s.catch(u=>Xt(this,u))}catch(s){Xt(this,s)}}}}o(p,"listener");function ya(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.add(...a),n}o(ya,"addClass$1");function wa(e,t){const n=$(e);return n?t?n.getAttribute(Cn(t)):Object.fromEntries([...n.attributes].map(a=>[a.name,a.value])):t?null:{}}o(wa,"getAttr");function ka(e,t,{cast:n=!0}={}){const a=$(e);if(!a)return t?null:{};if(t){const i=a.dataset[Hn(t)];return i===void 0?null:n?Zt(i):i}const r={};for(const[i,l]of Object.entries(a.dataset))r[i]=n?Zt(l):l;return r}o(ka,"getData");function Ta(e,{box:t="border"}={}){const n=$(e);if(!n)return null;if(t==="content")return{width:n.clientWidth,height:n.clientHeight};if(t==="scroll")return{width:n.scrollWidth,height:n.scrollHeight};const a=n.getBoundingClientRect();return{width:a.width,height:a.height}}o(Ta,"getElementSize");function xa(e){return $(e)?.innerHTML??null}o(xa,"getHTML");const Sa=o(e=>e.startsWith("--"),"isVar"),Ea=o(e=>Sa(e)?e:Cn(e),"propertyName");function Ra(e,t,n=!1){const a=$(e);if(!a)return null;const r=n?a.style:getComputedStyle(a);return t?r.getPropertyValue(Ea(t)).trim()||null:r}o(Ra,"getStyle");function Oa(e){return $(e)?.textContent??null}o(Oa,"getText");const en={bool:o(e=>!!(vt(e)?e.length:e),"bool"),date:o(e=>xn(e),"date"),number:o(e=>Tn(e)??0,"number"),string:o(e=>vt(e)?e.join(", "):String(e??""),"string")},Aa=new Set(["button","data","input","meter","option","output","progress","select","textarea"]),Na=o(e=>Aa.has(e.localName)||e.localName?.includes("-")&&"value"in e,"hasValue");function Fn(e,t=null){const n=$(e);if(!n)return null;const a=An(n)?n.checked:Nn(n)?[...n.selectedOptions].map(r=>r.value):Na(n)?n.value:n.textContent??"";return t&&en[t]?en[t](a):a}o(Fn,"getValue");function Da(e,t){const n=$(e);if(!n)return!1;const a=Ne(t);return a.length>0&&a.every(r=>n.classList.contains(r))}o(Da,"hasClass$1");function ja(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.remove(...a),n}o(ja,"removeClass$1");function Ca(e,t){const n=$(e);return n?(n.setAttribute("class",Ne(t).join(" ")),n):null}o(Ca,"setClass");const Ha=o(e=>Xe(e)?e:Dn(e)||vt(e)?JSON.stringify(e):String(e),"encode");function Fa(e,t,n){const a=$(e);if(!a)return null;const r=Xe(t)?{[t]:n}:t??{};for(const[i,l]of Object.entries(r)){const s=Hn(i);l==null?delete a.dataset[s]:a.dataset[s]=Ha(l)}return a}o(Fa,"setData");function Ma(e){const t=document.createElement("template");return t.innerHTML=String(e).trim(),t.content}o(Ma,"createHTML");function La(e,t){const n=$(e);return n?(n.replaceChildren(Ma(t??"")),n):null}o(La,"setHTML");function Pa(e,t){const n=$(e);return n?(n.textContent=t==null?"":String(t),n):null}o(Pa,"setText");function Ia(e){e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}o(Ia,"notifyChange");function za(e,t,{notify:n=!1}={}){const a=$(e);if(!a)return null;if(An(a))a.checked=!!t;else if(Nn(a)){const r=ia(t).map(String);for(const i of a.options)i.selected=r.includes(i.value)}else"value"in a?a.value=t instanceof Date&&a.type==="date"?la(t):t??"":a.textContent=t??"";return n&&Ia(a),a}o(za,"setValue");function Ba(e,t,n){const a=$(e);if(!a)return null;if(Dn(t)){for(const[r,i]of Object.entries(t))a.classList.toggle(r,!!i);return a}for(const r of Ne(t))a.classList.toggle(r,n);return a}o(Ba,"toggleClass$1");const Mn=Symbol.for("domina.chain"),Ln=o(e=>t=>typeof t===e,"isTypeOf"),Ua=o(e=>e==null||e==="","isBlank"),Qe=o(e=>e?.[Mn]===!0,"isChain"),fe=Ln("function"),Pn=o(e=>e!==null&&typeof e=="object"&&[Object.prototype,null].includes(Object.getPrototypeOf(e)),"isPlainObject"),_a=Ln("string"),Wa=o(e=>typeof e?.addEventListener=="function","isTarget"),qa=o(e=>typeof e?.[Symbol.iterator]=="function","hasIterator"),In=o(e=>e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),"toCamelCase"),jt=o(e=>e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),"toKebabCase"),zn={};zn.ERROR=e=>{throw new TypeError("[domina] "+e)};const Ze=o((e,t)=>Pn(e)?Object.entries(e):[[e,t]],"entriesOf"),Va={params:{name:"string",value:"string"},read:o((e,t)=>wa(e,t),"read"),write:o((e,t,n)=>{for(const[a,r]of Ze(t,n))jt(a).startsWith("aria-")?Bn(e,a,r):sa(e,a,r)},"write")},$t=o(e=>{const t=jt(e);return t.startsWith("aria-")?t:`aria-${t}`},"ariaName");function Bn(e,t,n){n==null?e.removeAttribute($t(t)):e.setAttribute($t(t),Array.isArray(n)?n.join(" "):String(n))}o(Bn,"writeAria");function Ga(e){const t=e.getAttributeNames().filter(n=>n.startsWith("aria-"));return Object.fromEntries(t.map(n=>[In(n.slice(5)),e.getAttribute(n)]))}o(Ga,"readAria");const Ka={params:{name:"string",value:"string"},read:o((e,t)=>t==null?Ga(e):e.getAttribute($t(t)),"read"),write:o((e,t,n)=>{for(const[a,r]of Ze(t,n))Bn(e,a,r)},"write")},ke=o(e=>{const t=jt(e);return In(t.startsWith("data-")?t.slice(5):t)},"dataKey"),Un=o((e,t)=>{delete e.dataset[ke(t)]},"removeData"),Ja={params:{name:"string",value:"json"},read:o((e,t)=>ka(e,t==null?void 0:ke(t)),"read"),write:o((e,t,n)=>{for(const[a,r]of Ze(t,n))r==null?Un(e,a):Fa(e,ke(a),r)},"write")},Ya={params:{name:"string",value:"string"},read:o((e,t)=>t==null?{...e.dataset}:e.dataset[ke(t)]??null,"read"),write:o((e,t,n)=>{for(const[a,r]of Ze(t,n))r==null?Un(e,a):e.dataset[ke(a)]=r},"write")},Xa={write:ya,params:{names:"string"}},Qa={write:ja,params:{names:"string"}},Za={write:Ba,params:{names:"string",force:"bool"}},er={read:Da,params:{names:"string"}},tr={params:{names:"string"},read:o(e=>[...e.classList],"read"),write:Ca},nr={read:xa,write:La,params:{html:"html"}},or={read:Ra,write:Sn,params:{property:"string",value:"string"}},ar={read:Oa,write:Pa,params:{text:"string"}},rr={read:Fn,write:za,params:{value:"json"},reads:o(e=>e.length===0,"reads")},ir=o(e=>Object.keys(e).every(t=>t==="box"),"onlyBox"),lr={object:!0,params:{w:"number",h:"number",box:"string"},reads:o(([e])=>e==null||ir(e),"reads"),read(e,{box:t}={}){const n=Ta(e,{box:t});return n&&{h:n.height,w:n.width}},write(e,{h:t,w:n}){const a={};n!==void 0&&(a.width=n),t!==void 0&&(a.height=t),Sn(e,a)}},sr=Object.freeze(Object.defineProperty({__proto__:null,addClass:Xa,aria:Ka,attr:Va,class:tr,data:Ja,dataset:Ya,hasClass:er,html:nr,removeClass:Qa,size:lr,style:or,text:ar,toggleClass:Za,value:rr},Symbol.toStringTag,{value:"Module"}));function cr(e,t,n,a,r){const i=$(e),l=ca(t).map(g=>ua[g]??g);if(!i||!l.length||!jn(a))return()=>{};const s=n.includes(":scope"),u=o(g=>{if(!s)return g?.closest?.(n);const b=new Set(i.querySelectorAll(n));for(let S=g;S&&S!==i;S=S.parentNode)if(b.has(S))return S;return null},"matchOf"),h=o(g=>{const b=u(g.target);b&&i.contains(b)&&a.call(b,g,b)},"listener");for(const g of l)i.addEventListener(g,h,r);return()=>{for(const g of l)i.removeEventListener(g,h,r)}}o(cr,"delegateEvent");const gt=new WeakMap,_n=o(e=>String(e??"").split(/[\s,]+/).filter(Boolean),"typesOf");function ur(e){let t=gt.get(e);return t||gt.set(e,t=new Set),t}o(ur,"recordsOf");function dr(e,t,n,a,r,i){const l=ur(e),s={handler:a,selector:n,stop:null,type:t},u=o(()=>{s.stop(),l.delete(s)},"drop"),h=o((g,b)=>{i&&u(),a(g,b)},"call");return s.stop=n?cr(e,t,n,h,r):En(e,t,g=>h(g,e),r),l.add(s),r?.signal?.addEventListener("abort",()=>l.delete(s),{once:!0}),u}o(dr,"add$2");function fr(e,t,n,a,r,{once:i=!1}={}){if(!fe(a))throw new TypeError("[domina] the handler is not a function");if(r?.signal?.aborted)return()=>{};const l=_n(t).map(s=>dr(e,s,n||null,a,r,i));return()=>{for(const s of l)s()}}o(fr,"listen");function mr(e,t,n){const a=gt.get(e);if(!a)return;const r=t?new Set(_n(t)):null;for(const i of a)r&&!r.has(i.type)||n&&i.handler!==n||(i.stop(),a.delete(i))}o(mr,"unlisten");function Wn(e,t,n){const[a,r,i,l]=typeof t[1]=="function"?[t[0],null,...t.slice(1)]:t;for(const s of e.elements)fr(s,a,r,i,l,{once:n});return e}o(Wn,"subscribe");const pr={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Wn(this,e,!1)}},hr={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Wn(this,e,!0)}},vr={kind:"event",params:{types:"string",handler:"function"},method(e,t){for(const n of this.elements)mr(n,e,t);return this}},$r={kind:"event",params:{type:"string",detail:"json"},write:o((e,t,n,a)=>da(e,t,n,a),"write")},gr=Object.freeze(Object.defineProperty({__proto__:null,emit:$r,off:vr,on:pr,once:hr},Symbol.toStringTag,{value:"Module"}));function br(e){return $(e)?.replaceChildren()??null}o(br,"clearElement");function yr(e,t=!0){return $(e)?.cloneNode(t)??null}o(yr,"cloneElement");function wr(e,t,...n){const a=$(e);if(!a)return null;const r=Rn(n);if(!r.length)return a;const i=a.children,l=t<0?i.length+t:t,s=i[Math.max(0,Math.min(l,i.length))]??null;return s?s.before(...r):a.append(...r),a}o(wr,"insertAt");function kr(...e){const t=[];for(const n of e.flat(1/0)){const a=$(n);a&&(a.remove(),t.push(a))}return t}o(kr,"removeElement");function Tr(e,...t){const n=$(e);if(!n?.parentNode)return null;const a=Rn(t);return n.replaceWith(...a),a}o(Tr,"replaceElement");const xr="auto-asc",Sr=/[̀-ͯ]/g,Er=/\d+/g,Rr=/^[\x00-\x7f]*$/,tn=o(e=>{let t=String(e);return Rr.test(t)||(t=t.normalize("NFD").replace(Sr,"")),t.toLowerCase().replace(Er,n=>n.padStart(16,"0"))},"textKey"),nn=o(e=>xn(e)?.getTime()??null,"dateKey"),on={date:o(e=>e.map(nn),"date"),num:o(e=>e.map(Tn),"num"),regular:o(e=>e.map(tn),"regular"),auto:o(e=>{const t=e.map(nn);return t.every((n,a)=>n!==null||e[a]==="")&&t.some(n=>n!==null)?t:e.map(tn)},"auto")},Or=o((e,t,n)=>e===null&&t===null?0:e===null?1:t===null?-1:e<t?-n:e>t?n:0,"compareKeys");function Ar({selector:e,order:t},n){const a=e?kn(e):null,r=n.map(s=>Fn(a?s.querySelector(a):s)??"");if(jn(t))return{values:r,order:t};const[i,l]=t.includes("-")?t.split("-"):["auto",t];return{keys:(on[i]??on.auto)(r),dir:l==="desc"?-1:1}}o(Ar,"column");function Nr({container:e,item:t,indicators:n}){const a=fa("sortElements",e,t);if(!a)return[];const{$container:r,items:i}=a,l=ma(n,ha(xr));if(l.some(s=>s.order==="random"))pa(i);else{const s=l.map(g=>Ar(g,i)),u=i.map((g,b)=>b);u.sort((g,b)=>{for(const{dir:S,keys:d,order:y,values:A}of s){const V=y?y(A[g],A[b],i[g],i[b]):Or(d[g],d[b],S);if(V)return V}return 0});const h=u.map(g=>i[g]);i.splice(0,i.length,...h)}return r.append(...i),i}o(Nr,"sortElements");function Dr(e){const t=$(e);if(!t?.parentNode)return null;const n=[...t.childNodes];return t.replaceWith(...n),n}o(Dr,"unwrapElement");function jr(e,t="div",n={}){const a=$(e);if(!a?.parentNode)return null;const r=Xe(t)?va(t,n):$(t);return r?(a.replaceWith(r),r.append(a),r):null}o(jr,"wrapElement");const Cr=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder$1"),qn=o(e=>e.length<2?e:[...new Set(e)],"unique");function dt(e,t){try{return e.querySelectorAll?Array.from(e.querySelectorAll(t)):[]}catch{return[]}}o(dt,"select");function Hr(e,t){if(t==null)return dt(document,e);const n=me(t);return n.length===1?dt(n[0],e):qn(n.flatMap(a=>dt(a,e))).sort(Cr)}o(Hr,"query");function me(e,t){return Ua(e)?[]:_a(e)?Hr(e,t):Qe(e)?e.elements:Wa(e)?[e]:qa(e)?qn(Array.from(e,n=>me(n)).flat()):[]}o(me,"collect");class N{static{o(this,"Chain")}constructor(t,n=!1){this.elements=t,this.many=n}get[Mn](){return!0}get length(){return this.elements.length}get el(){return this.elements[0]??null}get all(){return this.many?this:new N(this.elements,!0)}[Symbol.iterator](){return this.elements[Symbol.iterator]()}each(t){return this.elements.forEach(t),this}map(t){return this.elements.map(t)}}const Vn=o(e=>e?.nodeType===1,"isElement");function Ct(e,t,n){return e.flatMap(o(function a(r){return fe(r)?a(r(t,n)):r==null||r===!1?[]:Array.isArray(r)?r.flatMap(a):Qe(r)?r.elements:[r]},"resolve"))}o(Ct,"contentFor");function Ht(e,t,n){t.length<2||n.some(a=>Qe(a)||a?.nodeType)&&zn.ERROR(`${e}(): one node cannot go to ${t.length} places. pass a string, or a function (element, index) -> node`)}o(Ht,"assertPlaceable");const et=o(e=>({kind:"structure",params:{content:"string"},method(...t){return Ht(e,this,t),this.elements.forEach((n,a)=>n[e](...Ct(t,n,a))),this}}),"placing"),Fr=et("append"),Mr=et("prepend"),Lr=et("before"),Pr=et("after"),Ir={kind:"structure",params:{index:"number",content:"string"},method(e,...t){return Ht("insert",this,t),this.elements.forEach((n,a)=>wr(n,e,...Ct(t,n,a))),this}},Gn=o(e=>({kind:"structure",params:{target:"string"},method(t){const[n]=me(t);return n&&n[e](...this.elements),this}}),"moving"),zr=Gn("append"),Br=Gn("prepend"),Ur={kind:"structure",params:{content:"string"},method(...e){Ht("replace",this,e);const t=this.elements.flatMap((n,a)=>Tr(n,...Ct(e,n,a))??[]);return new N(t.filter(Vn),this.many)}},_r={kind:"structure",params:{tag:"string",props:"json"},method(e="div",t={}){const n=this.elements.map((a,r)=>jr(a,fe(e)?e(a,r):e,t));return new N(n.filter(Boolean),this.many)}},Wr={kind:"structure",params:{},method(){const e=this.elements.flatMap(t=>Dr(t)??[]);return new N(e.filter(Vn),this.many)}},qr={kind:"structure",params:{},write:o(e=>{br(e)},"write")},Vr={kind:"structure",params:{},method(){return kr(this.elements),this}},Gr={kind:"structure",params:{deep:"bool"},method(e=!0){return new N(this.elements.map(t=>yr(t,e)),this.many)}},Kr={kind:"structure",params:{item:"string",by:"string"},method(e,...t){for(const n of this.elements)Nr({container:n,indicators:t.length?t:[{}],item:e});return this}},Jr=Object.freeze(Object.defineProperty({__proto__:null,after:Pr,append:Fr,appendTo:zr,before:Lr,clear:qr,clone:Gr,insert:Ir,prepend:Mr,prependTo:Br,remove:Vr,replace:Ur,sort:Kr,unwrap:Wr,wrap:_r},Symbol.toStringTag,{value:"Module"}));function Yr(e,t){const n=$(e);if(!n)return[];const a=On(t);return[...n.children].filter(a)}o(Yr,"getChildren");function Xr(e,t){return $(e)?.closest(kn(t))??null}o(Xr,"getClosest");function Qr(e){const t=$(e);return t?.parentElement?[...t.parentElement.children].indexOf(t):-1}o(Qr,"getIndex");function Zr(e,t){return De($(e),"nextElementSibling",t,!1)[0]??null}o(Zr,"getNext");function ei(e,t){return De($(e),"nextElementSibling",t,!0)}o(ei,"getNextAll");function ti(e,t){const n=$(e)?.parentElement??null;return n&&$a(n,t)?n:null}o(ti,"getParent");function ni(e,t){return De($(e),"parentElement",t,!0)}o(ni,"getParents");function oi(e,t){return De($(e),"previousElementSibling",t,!1)[0]??null}o(oi,"getPrev");function ai(e,t){return De($(e),"previousElementSibling",t,!0)}o(ai,"getPrevAll");function ri(e,t){const n=$(e);if(!n?.parentElement)return[];const a=On(t);return[...n.parentElement.children].filter(r=>r!==n&&a(r))}o(ri,"getSiblings");const ii=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder");function Ft(e,t){const n=e.elements.flatMap(r=>[].concat(t(r)??[])),a=n.length<2?n:[...new Set(n)].sort(ii);return new N(a,e.many)}o(Ft,"step");const Mt=o((e,t)=>fe(t)?t(e):e.matches?.(t),"matches$1"),Y=o(e=>({kind:"traversal",params:{filter:"string"},method(t){return Ft(this,n=>e(n,t))}}),"walking"),li={kind:"traversal",params:{selector:"string"},method(e){return Ft(this,t=>me(e,t))}},si={kind:"traversal",params:{selector:"string"},method(e){return Ft(this,t=>Xr(t,e))}},ci=Y(Yr),ui=Y(ti),di=Y(ni),fi=Y(ri),mi=Y(Zr),pi=Y(oi),hi=Y(ei),vi=Y(ai),$i={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>fe(e)?e(t,n):Mt(t,e)),this.many)}},gi={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>!(fe(e)?e(t,n):Mt(t,e))),this.many)}},bi={kind:"traversal",params:{selector:"string"},method(e){return new N(this.elements.filter(t=>t.querySelector?.(e)),this.many)}},yi={kind:"traversal",params:{index:"number"},method(e){const t=this.elements.at(e);return new N(t?[t]:[],this.many)}},wi={kind:"traversal",params:{},method(){return this.at(0)}},ki={kind:"traversal",params:{},method(){return this.at(-1)}},Ti={kind:"traversal",params:{start:"number",end:"number"},method(e,t){return new N(this.elements.slice(e,t),this.many)}},xi={kind:"read",params:{selector:"string"},method(e){return this.elements.some(t=>Mt(t,e))}},Si={params:{},read:Qr},Ei=Object.freeze(Object.defineProperty({__proto__:null,at:yi,children:ci,closest:si,filter:$i,find:li,first:wi,has:bi,index:Si,is:xi,last:ki,next:mi,nextAll:hi,not:gi,parent:ui,parents:di,prev:pi,prevAll:vi,siblings:fi,slice:Ti},Symbol.toStringTag,{value:"Module"}));function Ri(e){const t=$(e);if(!t)return null;const n=t.getBoundingClientRect(),a=n.top+window.scrollY,r=n.left+window.scrollX;return{x:a,y:r,left:a,top:r}}o(Ri,"getElementOffset");function Oi(e){const t=$(e);if(!t)return null;const n=t.offsetLeft,a=t.offsetTop;return{x:n,y:a,left:n,top:a}}o(Oi,"getElementPosition");function Ai(e){return $(e)?.getBoundingClientRect()??null}o(Ai,"getElementRect");function Ni(e,{ratio:t=0}={}){const n=$(e);if(!n)return!1;const a=n.getBoundingClientRect(),r=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth,l=Math.min(a.bottom,r)-Math.max(a.top,0),s=Math.min(a.right,i)-Math.max(a.left,0);return l<=0||s<=0?!1:l*s/(a.height*a.width||1)>=t}o(Ni,"isElementInViewport");function Kn(e,t={}){const n=$(e)??window;return n?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest",...t}),n}o(Kn,"scrollTo$1");function Di(e,t={}){return Kn(e,{behavior:"auto",...t})}o(Di,"jumpTo$1");const ji=Symbol.for("domina.node");function Jn(e,t){return e?e[ji]===!0?[e.node].filter(Boolean):Xe(e)?ra(e,t):ga(e)?[e]:ba(e)?[...e].flatMap(n=>Jn(n,t)):[$(e,t)].filter(Boolean):[]}o(Jn,"resolveElements");function Ci(e,{name:t,subtree:n=!1}={}){const a=o(u=>!t||u.animationName===t,"checkName"),r=o(u=>u.finished.catch(()=>null),"checkFinish"),i=o(u=>u.getAnimations({subtree:n}),"getNames"),l=Jn(e),s=l.flatMap(i).filter(a);return Promise.all(s.map(r)).then(()=>l)}o(Ci,"waitForAnimations");function Hi(e,t,n,a){let r;return r=En(e,t,o(l=>{r(),n(l)},"wrapped"),a),r}o(Hi,"onceEvent");function Fi(e,t,{signal:n,timeout:a}={}){return new Promise((r,i)=>{const l=Hi(e,t,u=>{clearTimeout(s),r(u)}),s=a?setTimeout(()=>{l(),i(new Error(`waitForEvent: ${t} timed out`))},a):null;n?.addEventListener("abort",()=>{l(),clearTimeout(s),i(n.reason)})})}o(Fi,"waitForEvent");const Mi={params:{},read:Ri},Li={params:{},read:Oi},Pi={params:{},read:Ai},Ii={params:{ratio:"number"},read:o((e,t=0)=>Ni(e,{ratio:t}),"read")},zi={kind:"view",params:{options:"json"},method(e){return this.el&&Kn(this.el,e),this}},Bi={kind:"view",params:{options:"json"},method(e){return this.el&&Di(this.el,e),this}},Ui={kind:"wait",params:{name:"string"},method(e){return Ci(this.elements,{name:e}).then(()=>this)}},_i={kind:"wait",params:{type:"string",timeout:"number"},method(e,t){return this.el?Fi(this.el,e,{timeout:t}):Promise.reject(new Error("[domina] wait(): the chain is empty"))}},Wi=Object.freeze(Object.defineProperty({__proto__:null,finished:Ui,inView:Ii,jumpTo:Bi,offset:Mi,position:Li,rect:Pi,scrollTo:zi,wait:_i},Symbol.toStringTag,{value:"Module"})),Yn=new Map,qi=o(e=>e.length===0||e.length===1&&!Pn(e[0]),"readsByDefault"),Vi=o(({kind:e,method:t,read:n,write:a})=>e??(t?"method":n&&a?"access":n?"read":"write"),"kindOf");function Gi(e,{method:t,read:n,reads:a=qi,write:r}){return t||function(...i){const{elements:l}=this;if(n&&(!r||a(i)))return this.many?l.map(s=>n(s,...i)):l.length?n(l[0],...i):null;if(n&&i.length>1&&i.at(-1)===void 0)throw new TypeError(`[domina/chain] ${e}(): undefined is not a value, null removes`);if(n&&typeof i[1]=="function"){const[s,u]=i;return l.forEach((h,g)=>r(h,s,u(n(h,s),h,g))),this}for(const s of l)r(s,...i);return this}}o(Gi,"build");function Xn(e,t){if(e in N.prototype)throw new Error(`[domina/chain] "${e}" exists already`);const n=typeof t=="function"?{write:t}:t;Object.defineProperty(N.prototype,e,{configurable:!0,value:Gi(e,n),writable:!0}),Yn.set(e,{...n,kind:Vi(n),name:e,params:n.params??{}})}o(Xn,"define");function Qn(e){for(const[t,n]of Object.entries(e))Xn(t,n)}o(Qn,"extend");Qn({...sr,...gr,...Jr,...Ei,...Wi});function Ce(e,t){return Qe(e)?e:new N(me(e,t))}o(Ce,"d");function Ki(e,t){return new N(me(e,t),!0)}o(Ki,"dd");Ce.all=Ki;Ce.api=Yn;Ce.define=Xn;Ce.extend=Qn;new Proxy(()=>{},{apply:o((e,t,[n,a])=>Ce(n,a),"apply"),get:o((e,t)=>ut[t],"get"),has:o((e,t)=>t in ut,"has"),set:o((e,t,n)=>(ut[t]=n,!0),"set")});function W(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}o(W,"read$1");function q(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}o(q,"write$1");const Ie=o(e=>(t,n)=>Xo.notify(t,{...n,type:e}),"notify"),I=Object.assign(Ie("info"),{error:Ie("error"),info:Ie("info"),success:Ie("success")}),Ji=o((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function _(e,t=[]){let n=e;for(const a of t)n=await n.getDirectoryHandle(a);return n}o(_,"dirAt");async function Yi(e,t=[]){const n=await _(e,t),a=[];for await(const i of n.values())a.push(i);return(await Promise.all(a.map(async i=>{if(i.kind==="directory")return{kind:"directory",name:i.name};const l=await i.peekFile?.()??await i.getFile();return{kind:"file",lastModified:l.lastModified,name:i.name,size:l.size,type:l.type}}))).sort(Ji)}o(Yi,"list$1");async function Lt(e,t,n){return(await(await _(e,t)).getFileHandle(n)).getFile()}o(Lt,"readFile");async function Xi(e,t,n){await(await _(e,t)).getDirectoryHandle(n,{create:!0})}o(Xi,"mkdir");async function Qi(e,t,n){await(await _(e,t)).removeEntry(n,{recursive:!0})}o(Qi,"remove$3");async function Zi(e,t,n,a,r){const i=await _(e,t),l=r==="directory"?await i.getDirectoryHandle(n):await i.getFileHandle(n);if(typeof l.move=="function")try{await l.move(a);return}catch{}r==="directory"?await It(l,i,a):await Pt(l,i,a),await i.removeEntry(n,{recursive:!0})}o(Zi,"rename");async function Pt(e,t,n,a){const r=await e.getFile(),l=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(l instanceof WritableStream)){await l.write(await r.arrayBuffer()),await l.close();return}try{await r.stream().pipeTo(l,{signal:a})}catch(s){throw await l.abort?.().catch(()=>{}),s}}o(Pt,"copyFile");async function It(e,t,n,a,r=()=>{}){const i=await t.getDirectoryHandle(n,{create:!0});for await(const l of e.values()){if(a?.aborted)throw new DOMException("copy aborted","AbortError");l.kind==="directory"?await It(l,i,l.name,a,r):(await Pt(l,i,l.name,a),r())}}o(It,"copyTree");const{folders:Q}=RAT.app,{perms:el,ready:tl,sources:Zn}=je(Q,{perms:null,ready:null,sources:null}),D=v(()=>Zn.value.at(-1)??null),nl=v(()=>D.value?el.value[D.value.id]??null:null),G=v(()=>nl.value==="granted"?Q.handleOf(D.value.id):null),eo=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",ol=o(()=>Q.load(),"load");async function al(){const e=Zn.value.map(n=>n.id),t=await Q.add();if(t)for(const n of e)await Q.remove(n);return t}o(al,"grant");async function rl(){return D.value?Q.reconnect(D.value.id):{granted:!1}}o(rl,"reconnect$1");async function il(){D.value&&await Q.remove(D.value.id)}o(il,"forget$2");const ll={folder:H,name:H,path:Qo(H)},sl={icon:H,label:H},tt=bn(ll).create(W("files:bookmarks",[])),We=yn(H,H).create(W("files:folderTyped",{})),zt=yn(H,sl).create(W("files:folderTypes",{}));M(()=>q("files:bookmarks",tt));M(()=>q("files:folderTyped",We));M(()=>q("files:folderTypes",zt));const Te=v(()=>String(D.value?.id??"")),to=o(e=>`${Te.value}:${e.join("/")}`,"keyOf"),Bt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},no=v(()=>({...Bt,...zt.toJSON()})),oo=o(e=>We.get(to(e))??null,"folderTypeIdOf"),ao=o(e=>no.value[oo(e)]??null,"folderTypeOf");function bt(e,t){const n=to(e);t?We.set(n,t):We.delete(n)}o(bt,"setFolderType");function cl({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return zt.set(n,{icon:e,label:t}),n}o(cl,"addFolderType");function ul(e,t){const n=e.filter(l=>l.kind==="file"),a={};for(const l of n)a[t(l)]=(a[t(l)]??0)+1;const[r,i]=Object.entries(a).sort((l,s)=>s[1]-l[1])[0]??[];return r in Bt&&i/n.length>=.6?r:null}o(ul,"suggestFolderType");const dl=o(()=>tt.where({folder:Te.value}),"bookmarks"),fl=o(e=>tt.has({folder:Te.value,path:e}),"isBookmarked"),ml=o((e,t)=>tt.toggle({folder:Te.value,name:t,path:e},{folder:Te.value,path:e}),"toggleBookmark"),pl=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function hl(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let a=0;a<t.length;a+=32768)n+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(n)}o(hl,"toBase64");const vl=o(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),$l=new Set([101,204,205,304]);async function gl(e,{body:t,headers:n={},method:a="GET",signal:r,timeout:i}={}){const l=pl();if(!l)return fetch(e,{body:t,headers:n,method:a,signal:r});const s=await l.request({body:await hl(t),headers:n,method:a,timeout:i,url:e});return new Response($l.has(s.status)?null:vl(s.data),{headers:s.headers,status:s.status,statusText:s.statusText})}o(gl,"request$2");const bl=o(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),yl=o(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),ro=o(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),oe=o((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function io(e,t="",n=!1){const a=new URL(yl(t),ro(e)).href;return n&&!a.endsWith("/")?a+"/":a}o(io,"urlFor");const wl={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class ft extends Error{static{o(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function pe(e,t,{body:n,headers:a={},isDir:r=!1,method:i="GET"}={}){if(!e)throw new Error("No webdav connection.");let l;try{l=await gl(io(e,t,r),{body:n,headers:{Authorization:bl(e),...a},method:i})}catch(s){throw globalThis.Capacitor?.isNativePlatform?.()?new ft(0,`Connection failed: ${s?.message??s}`):new ft(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!l.ok)throw new ft(l.status,wl[l.status]??`${l.status} ${l.statusText}`);return l}o(pe,"request$1");const kl='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',yt="DAV:",ze=o((e,t)=>e.getElementsByTagNameNS(yt,t)[0]?.textContent??"","firstText");async function lo(e,t,n){const a=await pe(e,t,{body:kl,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),r=new DOMParser().parseFromString(await a.text(),"application/xml"),i=new URL(ro(e)).pathname,l=o(s=>{const u=decodeURIComponent(new URL(s,e.url).pathname);return(u.startsWith(i)?u.slice(i.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...r.getElementsByTagNameNS(yt,"response")].map(s=>{const u=l(ze(s,"href"));return{isDir:s.getElementsByTagNameNS(yt,"collection").length>0,lastModified:Date.parse(ze(s,"getlastmodified"))||0,mime:ze(s,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(ze(s,"getcontentlength"))||0}})}o(lo,"propfind");async function so(e,t=""){const n=oe(t);return(await lo(e,t,1)).filter(r=>r.path!==n).sort((r,i)=>r.isDir===i.isDir?r.name.localeCompare(i.name,void 0,{numeric:!0}):r.isDir?-1:1)}o(so,"list");async function mt(e,t){try{return(await lo(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}o(mt,"stat");const Tl=o(async(e,t)=>(await pe(e,t)).blob(),"read"),co=o((e,t,n)=>pe(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),xl=o((e,t)=>pe(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),Sl=o((e,t,n=!1)=>pe(e,t,{isDir:n,method:"DELETE"}),"remove$2"),El=o((e,t,n)=>({Destination:io(e,t,n),Overwrite:"F"}),"destination"),uo=o((e,t,n,a=!1)=>pe(e,t,{headers:El(e,n,a),isDir:a,method:"MOVE"}),"move"),Rl=o(e=>so(e,""),"test"),pt=o(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),an=o(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class nt{static{o(this,"DavHandle")}constructor(t,n,a){this.connection=t,this.name=a,this.path=n}async isSameEntry(t){return t instanceof nt&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class rn extends nt{static{o(this,"DavFileHandle")}kind="file";constructor(t,n,a,r=null){super(t,n,a),this.meta=r}peekFile(){const{lastModified:t=0,mime:n="",size:a=0}=this.meta??{};return{lastModified:t,name:this.name,size:a,type:n}}async getFile(){const t=await Tl(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:o(async()=>{t.length=0},"abort"),close:o(async()=>{await co(this.connection,this.path,new Blob(t))},"close"),write:o(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof re)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=oe(t.path,n);await uo(this.connection,this.path,a,!1),Object.assign(this,{name:n,path:a})}}class re extends nt{static{o(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await so(this.connection,this.path))yield[t.name,t.isDir?new re(this.connection,t.path,t.name):new rn(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const a=oe(this.path,t),r=await mt(this.connection,a);if(r&&!r.isDir)throw an(t);if(!r){if(!n)throw pt(t);await xl(this.connection,a)}return new re(this.connection,a,t)}async getFileHandle(t,{create:n=!1}={}){const a=oe(this.path,t),r=await mt(this.connection,a);if(r?.isDir)throw an(t);if(!r){if(!n)throw pt(t);await co(this.connection,a,new Blob([]))}return new rn(this.connection,a,t,r)}async removeEntry(t){const n=oe(this.path,t),a=await mt(this.connection,n);if(!a)throw pt(t);await Sl(this.connection,n,a.isDir)}async move(t,n=this.name){if(!(t instanceof re)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=oe(t.path,n);await uo(this.connection,this.path,a,!0),Object.assign(this,{name:n,path:a})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const Ol=o(e=>new re(e,"",e.name||new URL(e.url).host),"davRoot"),{files:fo}=RAT.app,mo="remotes.json",_e=new Map,Al={id:H,name:H,password:H,url:H,username:H},He=bn(Al).create(await fo.read(mo,"json").catch(()=>[]));M(()=>fo.write(mo,JSON.stringify(He)));const qe=v(()=>He.toArray()),po=o(e=>He.one({id:e})??null,"byId");async function Nl({name:e,password:t="",url:n,username:a=""}){const r=String(n??"").trim();if(!/^https?:\/\//i.test(r))throw new Error("The url has to start with http:// or https://");const i={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(r).host,password:t,url:r,username:String(a).trim()};return await Rl(i),He.push(i),i}o(Nl,"add$1");function Dl(e){He.drop({id:e}),_e.delete(e)}o(Dl,"remove$1");function jl(e){const t=po(e);return t?(_e.has(e)||_e.set(e,Ol(t)),_e.get(e)):null}o(jl,"rootOf");const ot=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Cl=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Hl=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,Fl=o(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function ie({name:e,type:t=""}){const n=Fl(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||Cl.test(n)?"documents":Hl.test(n)?"archives":"other"}o(ie,"categoryOf");let R=w(null),K=w(null);const{files:Ut}=RAT.app,Ml=24,Ll=o(e=>e.startsWith(".")||e==="node_modules","SKIP"),_t=o(e=>`index/${e.id}.json`,"pathOf");let $e=null;async function ho(e,t,n,a){const r=[],i=[];for await(const l of e.values()){if(a.aborted)throw new DOMException("scan aborted","AbortError");Ll(l.name)||(l.kind==="directory"?r.push(l):i.push(Promise.resolve(l.peekFile?.()??l.getFile()).then(s=>({lastModified:s.lastModified,name:l.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const l of await Promise.all(i))l&&n.push(l);K.value={files:n.length};for(const l of r)await ho(l,[...t,l.name],n,a)}o(ho,"walk");function Pl(e){const t=Object.fromEntries(ot.map(({id:r})=>[r,{count:0,size:0}]));let n=0;for(const r of e){const i=t[ie(r)];i.count++,i.size+=r.size,n+=r.size}const a=e.toSorted((r,i)=>i.lastModified-r.lastModified).slice(0,Ml);return{categories:t,files:e,recent:a,scannedAt:Date.now(),size:n,total:e.length}}o(Pl,"summarize");async function Il(e){return R.value=e?await Ut.read(_t(e),"json").catch(()=>null):null,R.value}o(Il,"restore");async function zl(e,t){$e?.abort();const n=new AbortController;$e=n;const a=[];K.value={files:0};try{return await ho(e,[],a,n.signal),R.value=Pl(a),await Ut.write(_t(t),JSON.stringify(R.value)),R.value}catch(r){if(r?.name!=="AbortError")throw r;return null}finally{$e===n&&($e=null,K.value=null)}}o(zl,"scan");const vo=o(()=>$e?.abort(),"stop$1");async function Bl(e){vo(),R.value=null,e&&await Ut.remove(_t(e)).catch(()=>{})}o(Bl,"forget$1");function Ul(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const a=[];for(const r of R.value?.files??[])if(r.name.toLowerCase().includes(n)&&a.push(r),a.length>=t)break;return a}o(Ul,"search");const _l=50,$o="files:tasks",at=new Nt,xe=new Nt(W($o,[]));M(()=>q($o,xe));const wt=v(()=>at.toArray()),ln=v(()=>xe.toArray()),sn=v(()=>at.has({state:"running"})),go=new WeakMap,bo=new Map,Wl=o(e=>e?.name==="AbortError","isAbort"),ql=o(e=>(bo.get(e)??Promise.resolve()).catch(()=>{}),"after");function ht(e,t){Object.assign(e,t,{endedAt:Date.now()}),at.remove(e),xe.unshift(e.toJSON()),xe.splice(_l)}o(ht,"finish");function rt({icon:e="lucide:loader",label:t,lane:n="default"},a){const r=new AbortController,{signal:i}=r,l=new wn({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});go.set(l,r),at.push(l);const s=o((h,g)=>{l.progress={done:h,total:g}},"progress"),u=ql(n).then(async()=>{if(i.aborted)return ht(l,{state:"cancelled"}),null;Object.assign(l,{startedAt:Date.now(),state:"running"});try{const h=await a({progress:s,signal:i});return ht(l,{state:i.aborted?"cancelled":"done"}),h}catch(h){throw ht(l,Wl(h)?{state:"cancelled"}:{error:String(h?.message??h),state:"failed"}),h}});return bo.set(n,u),u}o(rt,"run");const Vl=o(e=>go.get(e)?.abort(),"cancel"),Gl=o(()=>xe.clear(),"clearHistory"),{dialogs:Kl}=RAT.app,U=o(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),yo=o(()=>!!U(),"available$1"),wo=["https","http"],kt=53317,ko="files:sync",Tt=W(ko,{});let Se=w(null),xt=w([]),St=w(null),j=w([]),le=w(Array.isArray(Tt.targets)?Tt.targets:[]),Ve=Tt.folderName??"";const Wt=o(()=>q(ko,{folderName:Ve,targets:le.value}),"persist");function Jl(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const i=new URL(n.replace(/^filesync:\/\//,"http://")),l=i.searchParams.get("protocol");return{fingerprint:i.searchParams.get("fingerprint")??"",host:i.hostname,port:Number(i.port)||kt,protocol:wo.includes(l)?l:t}}catch{return null}const[a,r]=n.split(":");return{fingerprint:"",host:a,port:Number(r)||kt,protocol:t}}o(Jl,"parseTarget");const Ge=o(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),Ke=o((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget"),Yl=o(e=>({alias:e.alias,deviceType:e.deviceType,fingerprint:e.fingerprint??"",host:e.ip??e.host,port:e.port??kt,protocol:e.protocol??"https"}),"targetOf");function Xl(e){const t=le.value.filter(n=>!Ke(n,e));le.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),Wt()}o(Xl,"remember");function Ql(e){le.value=le.value.filter(t=>!Ke(t,e)),Wt()}o(Ql,"forget");let cn=!1;async function To(){const e=U();e&&(cn||(cn=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;xt.value=[t,...xt.value.filter(a=>(a.fingerprint||a.ip)!==n)]}),St.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await qt())}o(To,"start");const Zl=o(()=>U()?.stopDiscovery().catch(()=>{}),"stop");function xo(e){const t=new Set(j.value.map(n=>n.uri));j.value=[...j.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}o(xo,"add");async function es(){const{files:e=[]}=await U().pickFiles();xo(e)}o(es,"pickFiles");async function ts(e,t,n){const a=await(await _(e,t)).getFileHandle(n.name),r=a._uri??(a.path?`file://${a.path}`:null);if(!r)throw new Error("only files of the folder on this device can be sent");xo([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:r}])}o(ts,"addEntry");const ns=o(e=>{j.value=j.value.filter(t=>t.uri!==e)},"remove"),os=o(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function as(e,t=j.value,n=""){const a=U();if(!a||!e||!t.length)return Promise.resolve(null);const r=t.length===1?t[0].name:`${t.length} files`;return rt({icon:"lucide:send",label:`Send ${r} to ${Ge(e)}`,lane:"send"},async({progress:i})=>{const l=await a.addListener("progress",s=>i(s.sent,s.total));try{const s=o(u=>a.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await s(n)}catch(u){if(!os(u))throw u;const h=await Kl.prompt({message:`${Ge(e)} wants a pin`,ok:"Send",title:"Pin"});if(!h)throw new Error("no pin given");await s(h)}Xl(e),j.value=j.value.filter(u=>!t.includes(u))}finally{l.remove()}})}o(as,"send");async function qt(){const e=await U()?.getAutoSyncState().catch(()=>null)??null;Se.value=e&&{...e,name:e.tree?Ve:""}}o(qt,"refreshAutoSync");async function rs(){const{name:e,uri:t}=await U().pickFolder();t&&(Ve=e??"",Se.value={...Se.value,name:Ve,tree:t},Wt())}o(rs,"pickSyncFolder");async function is(e,{pin:t="",ssid:n=""}={}){const a=Se.value?.tree;if(!a)throw new Error("pick a folder first");await U().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:a}),await qt()}o(is,"startAutoSync");async function ls(){await U().stopAutoSync(),await qt()}o(ls,"stopAutoSync");const ss=o(()=>U()?.syncNow(),"syncNow");let L=w(null);const So=o((e,t)=>e.join("/")===t.join("/"),"samePath"),cs=o((e,t)=>e.length>=t.length&&So(e.slice(0,t.length),t),"isInside");function us(e,t,n,a){(L.value?.mode!==e||L.value.placed)&&(L.value=new wn({items:new Nt,mode:e,placed:!1})),L.value.items.drop({name:t.name,path:n}),L.value.items.push({kind:t.kind,name:t.name,path:n,root:a})}o(us,"pick$1");const ds=o(()=>{L.value&&(L.value.placed=!0)},"placed"),Eo=o(()=>{L.value=null},"clear");async function un(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}o(un,"exists");async function fs(e,t,n){if(!await un(e,t))return t;const a=n==="file"?t.lastIndexOf("."):-1,r=a>0?t.slice(0,a):t,i=a>0?t.slice(a):"";for(let l=2;;l++){const s=`${r} (${l})${i}`;if(!await un(e,s))return s}}o(fs,"freeName");async function Ro(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await Ro(n);return t}o(Ro,"countFiles");async function ms(e,t){const n=await _(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}o(ms,"handleOf");async function ps(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}o(ps,"moved");async function hs(e,t,n,a,{onProgress:r=o(()=>{},"onProgress"),signal:i}={}){const l=[...t],s=l.find(y=>y.kind==="directory"&&cs(a,[...y.path,y.name]));if(s)throw new Error(`“${s.name}” can not go into itself`);const u=await _(e,a),h=await Promise.all(l.map(y=>ms(y.root??e,y))),g=await Promise.all(h.map(Ro)),b=g.reduce((y,A)=>y+A,0);let S=0;const d=o((y=1)=>r(S+=y,b),"report");r(0,b);for(const[y,A]of l.entries()){i?.throwIfAborted();const V=h[y],Pe=g[y];if(n==="move"&&So(A.path,a)){d(Pe);continue}const ve=await fs(u,A.name,A.kind);if(n==="move"&&await ps(V,u,ve)){d(Pe);continue}A.kind==="directory"?await It(V,u,ve,i,d):(await Pt(V,u,ve,i),d()),n==="move"&&await(await _(A.root??e,A.path)).removeEntry(A.name,{recursive:!0})}}o(hs,"transfer");const{dialogs:Z,router:se}=RAT.app,vs={copy:"lucide:copy",move:"lucide:scissors"},$s=["pattern-bg","pattern-tile"],gs={open:"auto","pattern-bg":"","pattern-tile":"",searchbar:"bottom",tabbar:"bottom",viewmode:"list"};let F=w(Object.fromEntries(Object.entries(gs).map(([e,t])=>[e,W(`files:${e}`,t)])));M(()=>{for(const[e,t]of Object.entries(F.value))q(`files:${e}`,t)});const Oo=o((e,t)=>{F.value={...F.value,[e]:t}},"setting");M(()=>{const e=document.documentElement;for(const t of $s){const n=F.value[t];e.toggleAttribute(`data-${t}`,!!n),n&&aa(async()=>{const{patternStyle:a}=await import("./index-D95qI_I9.js").then(r=>r.A);return{patternStyle:a}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:a})=>a(n,{name:t})).then(a=>{if(!(!a||we(()=>F.value[t])!==n))for(const[r,i]of Object.entries(a))e.style.setProperty(r,i)})}});M(()=>{const{dataset:e}=document.documentElement;e.searchbar=F.value.searchbar,e.tabbar=F.value.tabbar});const bs=o(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Ao=o(()=>F.value.open==="single"||F.value.open==="auto"&&bs(),"opensOnTap");let ne=w(null),Ee=w([]),E=w(null),ge=w(""),Et=w(!1),Rt=w(""),C=w(null),ce=w(null),be=w(null),Re=w(W("files:tabs",{index:0,list:[{path:[]}]}));M(()=>q("files:tabs",Re.value));const z=v(()=>Re.value.list?.length?Re.value.list:[{path:[]}]),P=v(()=>Math.min(Math.max(0,Re.value.index??0),z.value.length-1)),T=v(()=>z.value[P.value].path),he=v(()=>z.value[P.value].source??null),No=new Map,Do=o(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function ee(e,t=P.value){Re.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}o(ee,"setTabs");function J(e,t){ee(z.value.map((n,a)=>a===P.value?{path:e,source:t===void 0?n.source??null:t}:n)),C.value=null,ge.value=""}o(J,"goTo");function jo(e=T.value,t=he.value){const n=[...z.value,{path:e,source:t}];ee(n,n.length-1),C.value=null}o(jo,"openTab");function ys(e){if(z.value.length===1)return J([]);ee(z.value.filter((t,n)=>n!==e),e<P.value?P.value-1:P.value)}o(ys,"closeTab");function ws(e){No.set(P.value,Do()?.scrollTop??0),ee(z.value,e),C.value=null}o(ws,"switchTab");const dn=o(e=>e.path.at(-1)??it(e.source??null),"tabName"),Fe=o(e=>e?jl(e):G.value,"rootOfSource"),it=o(e=>e?po(e)?.name??"remote":D.value?.name??"folder","sourceName"),lt=o(()=>Fe(he.value),"rootHandle"),Oe=o(()=>it(he.value),"folderName"),Me=o(e=>e.source!==void 0?e.source:e.path?null:he.value,"sourceOf");let Be=0;M(()=>{const e=lt(),t=T.value,n=++Be;Ee.value=[],Et.value=!!e,e&&Yi(e,t).then(a=>{n===Be&&(Ee.value=a,requestAnimationFrame(()=>{const r=Do();r&&(r.scrollTop=No.get(we(()=>P.value))??0)}))}).catch(a=>{n===Be&&I.error(a)}).finally(()=>{n===Be&&(Et.value=!1)})});let Ot=null;M(()=>{const e=G.value,t=D.value;!e||!t||Ot===t||(Ot=t,Il(t).then(()=>Co(e,t)))});function Co(e,t){return rt({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:a})=>{a.addEventListener("abort",()=>vo());const r=M(()=>{K.value&&n(K.value.files,null)});return zl(e,t).finally(r)}).catch(n=>console.warn("[files] scan failed",n))}o(Co,"indexFolder");const ks=o(()=>{G.value&&Co(G.value,D.value)},"rescan"),Ts=o((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(a=>a.name.toLowerCase().includes(n)):e},"matches"),fn=v(()=>Ts(Ee.value,ge.value)),At=o(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ho=o((e,t)=>e.kind==="directory"?t&&ao([...t,e.name])?.icon||"lucide:folder":ot.find(n=>n.id===ie(e))?.icon??"lucide:file","iconOf");function ue(e,t=T.value){if(e.kind==="directory")return J([...t,e.name]),se.go("/library");E.value={...e,kind:"file",path:e.path??t,source:Me(e)},se.go("/preview")}o(ue,"open");function Fo(e){J(e.path??[],Me(e)),se.go("/library")}o(Fo,"showInFolder");function xs(e){if(Ao())return ue(e);C.value=e}o(xs,"onEntryClick");function Mo(e){ce.value=null,C.value=e,RAT.app.toggle("context",!0)}o(Mo,"about");function Ss(){C.value=null,ce.value="tasks",RAT.app.toggle("context",!0)}o(Ss,"openTasks");async function st(){const e=lt();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(I.error("No permission to change this folder"),null)}o(st,"writable");function Vt(e,t,n){const a=o(()=>t.join("/")===T.value.join("/"),"same");rt({...e,lane:"write"},n).then(()=>{a()&&J([...t])}).catch(I.error)}o(Vt,"writeTask");async function Lo(){const e=await Z.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await st();if(!t)return;const n=T.value;Vt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>Xi(t,n,e))}o(Lo,"newFolder");async function Es(e){const t=await Z.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await st();if(!n)return;const a=e.path??T.value;C.value=null,Vt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},a,()=>Zi(n,a,e.name,t,e.kind))}o(Es,"renameEntry");async function Rs(e){if(!await Z.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await st();if(!t)return;const n=e.path??T.value;C.value=null,RAT.app.toggle("context",!1),Vt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Qi(t,n,e.name))}o(Rs,"deleteEntry");function mn(e,t){us(e,t,t.path??T.value,Fe(Me(t))),RAT.app.toggle("context",!1)}o(mn,"pick");async function Os(){const e=L.value;if(!e)return;const t=await st();if(!t)return;const n=e.items.toArray(),a=[...T.value],r=n.length===1?n[0].name:`${n.length} items`,i=e.mode==="move"?"move":"copy",l=vs[i];e.mode==="move"?Eo():ds();const s=o(()=>{a.join("/")===T.value.join("/")&&J([...a])},"done");rt({icon:l,label:`${i} ${r} to /${a.join("/")}`,lane:"write"},({progress:u,signal:h})=>hs(t,n,e.mode,a,{onProgress:u,signal:h})).then(s).catch(u=>{u?.name!=="AbortError"&&I.error(u),s()})}o(Os,"paste");async function Po(e){const t=await Lt(Fe(Me(e)),e.path??T.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}o(Po,"download");async function Je(){if(!eo)return I.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await al())return;ee([{path:[]}],0),se.go("/")}catch(e){I.error(e)}}o(Je,"chooseFolder");async function As(){const{granted:e}=await rl();if(!e)return Je()}o(As,"reconnect");async function Ns(){await Z.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:Oe()})&&(await Bl(D.value),Ot=null,await il(),ee([{path:[]}],0))}o(Ns,"closeFolder");function Io(e){jo([],e),se.go("/library")}o(Io,"openRemote");function Ds(){C.value=null,ce.value="remotes",RAT.app.toggle("context",!0)}o(Ds,"manageRemotes");async function js(e){if(!await Z.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await Dl(e.id);const t=z.value.filter(n=>n.source!==e.id);ee(t.length?t:[{path:[]}],0)}o(js,"forgetRemote");function Cs(e){ts(G.value,e.path??T.value,e).then(()=>{RAT.app.toggle("context",!1),se.go("/sync")}).catch(I.error)}o(Cs,"sendEntry");async function Hs(e){const t=await Z.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await Z.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";bt(e,cl({icon:n,label:t}))}o(Hs,"newFolderType");function Fs(e){const t=e.filter(r=>r.kind==="file"),n={};for(const r of t)n[ie(r)]=(n[ie(r)]??0)+1;const a=Object.entries(n).sort((r,i)=>i[1]-r[1])[0];return{files:t.length,folders:e.length-t.length,mostly:a&&a[1]/t.length>=.6?ot.find(r=>r.id===a[0])?.label:null,size:t.reduce((r,i)=>r+i.size,0)}}o(Fs,"factsOf");const Ue=v(()=>Fs(Ee.value)),pn=ot.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),Ms=o((e,t)=>t.lastModified-e.lastModified,"newest"),Ls=v(()=>(R.value?.files??[]).filter(e=>ie(e)===ne.value).toSorted(Ms).slice(0,500)),hn=v(()=>Ul(Rt.value));let ye=null;const Le=Zo(!1),zo=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ps=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!zo;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ye=e,Le.value=!0});addEventListener("appinstalled",()=>{ye=null,Le.value=!1});async function Is(){if(!ye)return!1;const e=ye;return ye=null,Le.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(Is,"install");function zs(e){const t=`${e}:install-hint`,n=o(()=>{W(t)||(q(t,!0),I(`${e} can be installed: see the settings`))},"show");Le.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}o(zs,"hint");const Bs=864e5,Us={day:"numeric",month:"short",year:"numeric"},Gt=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ye=o(e=>{const t=Gt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Us)},"date"),_s=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Bs;return n<0?Ye(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ye(t)},"ago"),Ws=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ye(t)},"since"),qs=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),a=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),r=String(t%60).padStart(2,"0");return n?`${n}:${a}:${r}`:`${a}:${r}`},"duration"),Vs=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),O={ago:_s,bytes:Vs,date:Ye,duration:qs,since:Ws};function x(e,t){return Gs.call({props:e},e,t)}o(x,"ActionRatHtml");function Gs(e,t){return c`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${p(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}o(Gs,"$$ActionRatHtml");function Bo(e,t){return Ks.call({props:e},e,t)}o(Bo,"BookmarkActionRatHtml");function Ks(e,t){const{path:n}=je(e,{path:null}),a=v(()=>fl(n.value));return c`<${x} ...${{get icon(){return a.value?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return a.value?"remove bookmark":"bookmark"},onclick:o(()=>ml(n.value,n.value.at(-1)),"onclick")}} />`}o(Ks,"$$BookmarkActionRatHtml");function ct(e,t){return Js.call({props:e},e,t)}o(ct,"FactsRatHtml");function Js(e,t){const n=o(r=>r==null||r===""||r===!1,"isEmpty"),a=v(()=>Object.entries(e.rows??{}).filter(([,r])=>!n(r)));return c`
    <dl.facts>
      ${k(()=>a.value,r=>r,([r,i])=>c`<dt>${()=>r}</dt><dd>${()=>i}</dd>`)}
    </dl>
  `}o(Js,"$$FactsRatHtml");function Ys(e,t){return Xs.call({props:e},e,t)}o(Ys,"EntryDetailsRatHtml");function Xs(e,t){const{entry:n}=je(e,{entry:null}),a=v(()=>n.value.path??T.value),r=v(()=>n.value.kind==="directory"),i=v(()=>!Me(n.value)),l=o(s=>s.kind==="directory"?"folder":s.type||"file","kindOf");return c`
    <h2>${()=>n.value.name}</h2>
    <${ct} ...${{get rows(){return{name:n.value.name,kind:l(n.value),size:r.value?null:O.bytes(n.value.size),modified:n.value.lastModified&&O.date(n.value.lastModified),in:"/"+a.value.join("/")}}}} />
    <div-x.actions>
      <${x} icon="lucide:arrow-up-right" label="open" ...${{onclick:o(()=>ue(n.value,a.value),"onclick")}} />
      ${m(()=>n.value.path,()=>c`<${x} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>Fo(n.value),"onclick")}} />`)}
      ${m(()=>!r.value,()=>c`<${x} icon="lucide:download" label="download" ...${{onclick:o(()=>Po(n.value),"onclick")}} />`)}
      ${m(()=>!r.value&&i.value&&yo(),()=>c`<${x} icon="lucide:send" label="send" ...${{onclick:o(()=>Cs(n.value),"onclick")}} />`)}
      ${m(()=>r.value&&i.value,()=>c`<${Bo} ...${{get path(){return[...a.value,n.value.name]}}} />`)}
      <${x} icon="lucide:copy" label="copy" ...${{onclick:o(()=>mn("copy",n.value),"onclick")}} />
      <${x} icon="lucide:scissors" label="move" ...${{onclick:o(()=>mn("move",n.value),"onclick")}} />
      <${x} icon="lucide:pencil" label="rename" ...${{onclick:o(()=>Es(n.value),"onclick")}} />
      <${x} icon="lucide:trash-2" label="delete" ...${{onclick:o(()=>Rs(n.value),"onclick")}} />
    </div-x>
  `}o(Xs,"$$EntryDetailsRatHtml");function Qs(e,t){return Zs.call({props:e},e,t)}o(Qs,"FileDetailsRatHtml");function Zs(e,t){return c`
    <h2>Details</h2>
    <${ct} ...${{get rows(){return{name:E.value.name,type:E.value.type||"unknown",size:O.bytes(E.value.size),dimensions:be.value&&`${be.value.width} × ${be.value.height}`,modified:O.date(E.value.lastModified),in:"/"+E.value.path.join("/")}}}} />
    <div-x.actions>
      <${x} icon="lucide:download" label="download" ...${{onclick:o(()=>Po(E.value),"onclick")}} />
      <${x} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>Fo(E.value),"onclick")}} />
    </div-x>
  `}o(Zs,"$$FileDetailsRatHtml");function ec(e,t){return tc.call({props:e},e,t)}o(ec,"FolderDetailsRatHtml");function tc(e,t){const n=v(()=>T.value.length>0&&!he.value),a=v(()=>n.value?oo(T.value):null),r=v(()=>n.value&&!a.value?ul(Ee.value,ie):null),i=o(l=>bt(T.value,a.value===l?null:l),"toggleFolderType");return c`
    <h2>This folder</h2>
    <${ct} ...${{get rows(){return{folder:T.value.at(-1)??Oe(),contains:`${Ue.value.folders} folders, ${Ue.value.files} files`,size:O.bytes(Ue.value.size),mostly:Ue.value.mostly}}}} />
    <div-x.actions>
      <${x} icon="lucide:folder-plus" label="new folder" ...${{onclick:Lo}} />
      ${m(()=>n.value,()=>c`<${Bo} ...${{get path(){return T.value}}} />`)}
    </div-x>
    ${m(()=>n.value,()=>c`
        <h3>Foldertype</h3>
        ${m(()=>r.value,()=>c`<p.hint>Looks like ${()=>Bt[r.value].label}. <button.link type="button" onclick=${p(()=>bt(T.value,r.value))}>Make it one</button></p>`)}
        <div-x.actions>
          ${k(()=>Object.entries(no.value),l=>l,([l,s])=>c`<button.action type="button" aria-pressed=${()=>de(a.value===l)} onclick=${p(()=>i(l))}><svg-icon icon=${()=>s.icon} /> ${()=>s.label}</button>`)}
          <${x} icon="lucide:plus" label="new foldertype" ...${{onclick:o(()=>Hs(T.value),"onclick")}} />
        </div-x>
      `)}
  `}o(tc,"$$FolderDetailsRatHtml");function nc(e,t){return oc.call({props:e},e,t)}o(nc,"RemoteManagerRatHtml");function oc(e,t){let n=w(null),a=w(!1);async function r(i){i.preventDefault();const l=i.target;a.value=!0,n.value=null;try{const s=await Nl(Object.fromEntries(new FormData(l)));l.reset(),Io(s.id),RAT.app.toggle("context",!1)}catch(s){n.value=s.message??String(s)}finally{a.value=!1}}return o(r,"add"),c`
    ${m(()=>qe.value.length,()=>c`
        <ul.tasks>
          ${k(()=>qe.value,i=>i,i=>c`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>i.name}</span><small>${()=>i.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+i.name} onclick=${p(()=>js(i))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${p(r)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${m(()=>n.value,()=>c`<p.error>${()=>n.value}</p>`)}
      <button.action type="submit" disabled=${()=>a.value}><svg-icon icon=${()=>a.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}o(oc,"$$RemoteManagerRatHtml");function Uo(e,t){return ac.call({props:e},e,t)}o(Uo,"StatusRatHtml");function ac(e,t){return c`
    ${m(()=>K.value,()=>c`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>K.value.files} files</p>`,()=>m(()=>R.value,()=>c`<p.status>${()=>R.value.total} files · ${()=>O.bytes(R.value.size)} · read ${()=>O.date(R.value.scannedAt)}</p>`))}
  `}o(ac,"$$StatusRatHtml");function rc(e,t){return ic.call({props:e},e,t)}o(rc,"RootDetailsRatHtml");function ic(e,t){return c`
    <h2>${()=>it(null)}</h2>
    <${Uo} />
    <div-x.actions><${x} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!G.value||!!K.value},onclick:ks}} /></div-x>
  `}o(ic,"$$RootDetailsRatHtml");function lc(e,t){return sc.call({props:e},e,t)}o(lc,"TaskListRatHtml");function sc(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},a=o(s=>s.state==="queued"||s.state==="running","isOpen");function r({progress:s,state:u}){return u!=="running"||s?.done==null?n[u]:s.total?`${Math.round(s.done/s.total*100)}%`:String(s.done)}o(r,"stateOf");function i(s){return s.error?s.error:s.endedAt?`${r(s)} · ${O.date(s.endedAt)}`:r(s)}o(i,"noteOf");function l(s){return c`
      <li class=${()=>`task ${s.state}`}>
        <svg-icon icon=${()=>s.icon} />
        <span.text>
          <span.name>${()=>s.label}</span>
          <small>${()=>i(s)}</small>
          ${m(()=>s.state==="running"&&s.progress?.total,()=>c`<progress max=${()=>s.progress.total} value=${()=>s.progress.done} />`)}
        </span>
        ${m(()=>a(s),()=>c`<btn-icon icon="lucide:x" label=${()=>"cancel "+s.label} onclick=${p(()=>Vl(s))} />`)}
      </li>
    `}return o(l,"row"),c`
    ${m(()=>wt.value.length,()=>c`
        <ul.tasks>
          ${k(()=>wt.value,s=>s,s=>c`${()=>l(s)}`)}
        </ul>
      `,()=>c`<p.empty>nothing to do</p>`)}
    ${m(()=>ln.value.length,()=>c`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${p(Gl)} />
        </div-x>
        <ul.tasks>
          ${k(()=>ln.value,s=>s,s=>c`${()=>l(s)}`)}
        </ul>
      `)}
  `}o(sc,"$$TaskListRatHtml");function cc(e,t){return uc.call({props:e},e,t)}o(cc,"ContextRatHtml");function uc(e,t){const{$path:n}=je(RAT.app.router,{$path:null});return c`
    ${m(()=>ce.value==="tasks",()=>c`<h2>Tasks</h2><${lc} />`,()=>m(()=>ce.value==="remotes",()=>c`<h2>Remote</h2><${nc} />`,()=>m(()=>C.value,()=>c`<${Ys} ...${{get entry(){return C.value}}} />`,()=>m(()=>n.value==="/preview"&&E.value,()=>c`<${Qs} />`,()=>m(()=>n.value==="/library"&&lt(),()=>c`<${ec} />`,()=>c`<${rc} />`)))))}
  `}o(uc,"$$ContextRatHtml");function B(e,t){return dc.call({props:e},e,t)}o(B,"BarRatHtml");function dc(e,t){return c`
    <header.bar>
      ${m(()=>e.back,()=>c`<btn-icon icon="lucide:arrow-left" label="back" onclick=${p(e.back)} />`,()=>c`<btn-icon icon="lucide:menu" label="menu" onclick=${p(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${p(()=>RAT.app.toggle("config"))} />
    </header>
  `}o(dc,"$$BarRatHtml");function Kt(e,t){return fc.call({props:e},e,t)}o(Kt,"ThumbRatHtml");function fc(e,t){const n=e.entry,a=e.at??[],r=e.from??null,i=RAT.app.thumbnails,l=At(n)?u(n):null;let s=w(l?i.peekFile(l):null);function u({lastModified:g,name:b,size:S}){return`${r??we(()=>D.value)?.id}/${a.join("/")}/${b}:${S}:${g}`}o(u,"idOf");function h(g){if(!l||s.value)return;let b=!0;const S=new IntersectionObserver(([d])=>{d.isIntersecting&&(S.disconnect(),i.requestFile(l,()=>Lt(Fe(r),a,n.name)).then(y=>{b&&y&&(s.value=y)}))},{rootMargin:"200px"});return S.observe(g),()=>{b=!1,S.disconnect()}}return o(h,"watch"),c`
    <span.thumb ref=${ea(h)}>
      ${m(()=>s.value,()=>c`<img src=${()=>s.value} alt="" loading="lazy" />`,()=>c`<svg-icon icon=${()=>Ho(n,r?null:e.at)} />`)}
    </span>
  `}o(fc,"$$ThumbRatHtml");function vn(e,t){return mc.call({props:e},e,t)}o(vn,"FileRowRatHtml");function mc(e,t){const n=e.entry,a=`/${n.path.join("/")} · ${O.bytes(n.size)}`;return c`
    <li.row>
      <button.entry type="button" onclick=${p(()=>ue(n))}>
        <${Kt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text><span.name>${()=>n.name}</span><small>${()=>a}</small></span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${p(()=>Mo(n))} />
    </li>
  `}o(mc,"$$FileRowRatHtml");function _o(e,t){return pc.call({props:e},e,t)}o(_o,"SearchbarRatHtml");function pc(e,t){const n=v(()=>wt.value.length),a=v(()=>n.value?`${n.value} tasks`:"tasks");return c`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${p(o(i=>e.onsearch?.(i.detail.query),"search"))} />
      <button.tasks-button type="button" class:busy=${()=>sn.value} aria-label=${()=>de(a.value)} title=${()=>a.value} onclick=${p(Ss)}>
        <svg-icon icon=${()=>sn.value?"lucide:loader":"lucide:list-checks"} />
        ${m(()=>n.value,()=>c`<span.badge>${()=>n.value}</span>`)}
      </button>
    </div>
  `}o(pc,"$$SearchbarRatHtml");function te(e,t){return hc.call({props:e},e,t)}o(te,"TileRatHtml");function hc(e,t){return c`
    <li>
      <button.tile type="button" disabled=${()=>e.disabled} title=${()=>e.title} onclick=${p(e.onclick)}>
        <svg-icon icon=${()=>e.icon} />
        <span.text><span.name>${()=>e.name}</span><small>${()=>e.note}</small></span>
      </button>
    </li>
  `}o(hc,"$$TileRatHtml");const vc=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function $c(e,t){return gc.call({props:e},e,t)}o($c,"LoadingRatHtml");function gc(e,t){return Dt("1tn1js8",vc),c`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>c`<span>${()=>e.text}</span>`)}
    </div>
  `}o(gc,"$$LoadingRatHtml");function Wo(e,t){return bc.call({props:e},e,t)}o(Wo,"WelcomeRatHtml");function bc(e,t){return c`
    ${m(()=>!eo,()=>c`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>m(()=>!tl.value,()=>c`<${$c} />`,()=>m(()=>!D.value,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${p(Je)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>Oe()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${p(As)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}o(bc,"$$WelcomeRatHtml");function yc(e,t){return wc.call({props:e},e,t)}o(yc,"DashboardRatHtml");function wc(e,t){const n=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}],a=v(()=>Rt.value.trim()!==""),r=v(()=>dl()),i=v(()=>pn.find(d=>d.id===ne.value)?.label??ne.value),l=o(()=>it(null),"folderName"),s=o(d=>Rt.value=d,"search"),u=o(d=>R.value?.categories?.[d]??null,"statsOf");function h(d){return d?d>=100?"Found 100+":`Found ${d}`:"Nothing found"}o(h,"foundOf");function g(d){try{return new URL(d).host}catch{return d}}o(g,"hostOf");function b(d){J(d,null),RAT.app.router.go("/library")}o(b,"library");function S(d){return d?`${d.count} · ${O.bytes(d.size)}`:"…"}return o(S,"noteOf"),c`
    <${B} title="Files" />
    <div.scroll>
      ${m(()=>!G.value,()=>c`<${Wo} />`,()=>m(()=>a.value,()=>c`
            <section>
              <h2>${()=>h(hn.value.length)}</h2>
              <ul.rows>
                ${k(()=>hn.value,d=>d,d=>c`<${vn} ...${{get entry(){return d}}} />`)}
              </ul>
            </section>
          `,()=>m(()=>ne.value,()=>c`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${p(()=>ne.value=null)} />
                  <h2>${()=>i.value}</h2>
                </div-x>
                <ul.rows>
                  ${k(()=>Ls.value,d=>d,d=>c`<${vn} ...${{get entry(){return d}}} />`)}
                </ul>
              </section>
            `,()=>c`
              ${m(()=>R.value?.recent.length,()=>c`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${k(()=>R.value.recent,d=>d,d=>c`
                          <button.card type="button" onclick=${p(()=>ue(d))}>
                            <${Kt} ...${{get entry(){return d},get at(){return d.path}}} />
                            <span.name>${()=>d.name}</span>
                            <small>${()=>O.date(d.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${m(()=>r.value.length,()=>c`
                    <ul.tiles>
                      ${k(()=>r.value,d=>d,d=>c`<${te} ...${{get icon(){return ao(d.path)?.icon??"lucide:bookmark"},get name(){return d.name},get note(){return"/"+d.path.join("/")},onclick:o(()=>b(d.path),"onclick")}} />`)}
                    </ul>
                  `,()=>c`<p.hint>Folders you bookmark show up here, from their details below.</p>`)}
              </section>
              <section>
                <h2>Categories</h2>
                <ul.tiles>
                  ${k(()=>pn,d=>d,({icon:d,id:y,label:A})=>c`<${te} ...${{get icon(){return d},get name(){return A},get note(){return S(u(y))},get disabled(){return!u(y)?.count},onclick:o(()=>ne.value=y,"onclick")}} />`)}
                </ul>
              </section>
              <section>
                <h2>Folder</h2>
                <ul.tiles><${te} icon="lucide:folder-open" ...${{get name(){return l()},get note(){return R.value?O.bytes(R.value.size):"the granted folder"},onclick:o(()=>b([]),"onclick")}} /></ul>
                <${Uo} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${k(()=>qe.value,d=>d,d=>c`<${te} icon="lucide:cloud" ...${{get name(){return d.name},get note(){return g(d.url)},onclick:o(()=>Io(d.id),"onclick")}} />`)}
                  <${te} icon="lucide:cloud-cog" name="WebDAV, Nextcloud" ...${{get note(){return qe.value.length?"add or remove":"connect a server"},onclick:Ds}} />
                  ${k(()=>n,d=>d,d=>c`<${te} ...${{get icon(){return d.icon},get name(){return d.label},get note(){return"soon · "+d.note},get title(){return d.note}}} disabled />`)}
                </ul>
              </section>
            `)))}
    </div>
    ${m(()=>G.value,()=>c`<${_o} ...${{get placeholder(){return"Search in "+l()},onsearch:s}} />`)}
  `}o(wc,"$$DashboardRatHtml");function kc(e,t){return Tc.call({props:e},e,t)}o(kc,"EntryRatHtml");function Tc(e,t){const n=e.entry,a=we(()=>T.value),r=we(()=>he.value),i=n.kind==="file"?`${O.date(n.lastModified)} · ${O.bytes(n.size)}`:"folder",l=v(()=>C.value?.name===n.name&&!C.value?.path);function s(u){u.key!=="Enter"||Ao()||(u.preventDefault(),ue(n))}return o(s,"onkeydown"),c`
    <data-item>
      <div.row class:selected=${()=>l.value}>
        <button.entry type="button" aria-pressed=${()=>de(l.value)} onclick=${p(()=>xs(n))} ondblclick=${p(()=>ue(n))} onkeydown=${p(s)}>
          <${Kt} ...${{get entry(){return n},get at(){return a},get from(){return r}}} />
          <span.text><span.name>${()=>n.name}</span><small>${()=>i}</small></span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${p(()=>Mo(n))} />
      </div>
    </data-item>
  `}o(Tc,"$$EntryRatHtml");function xc(e,t){return Sc.call({props:e},e,t)}o(xc,"PasteBarRatHtml");function Sc(e,t){const n=v(()=>L.value?.mode==="move"),a=o(r=>r.length===1?r.at(0).name:`${r.length} items`,"describe");return c`
    ${m(()=>L.value,()=>c`
        <div-x.pastebar>
          <svg-icon icon=${()=>n.value?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>a(L.value.items)}</span>
            <small>${()=>n.value?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${p(Os)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the pickboard" onclick=${p(Eo)} />
        </div-x>
      `)}
  `}o(Sc,"$$PasteBarRatHtml");function Ec(e,t){return Rc.call({props:e},e,t)}o(Ec,"TabsRatHtml");function Rc(e,t){return c`
    <div-x.tabs role="tablist" scrollable>
      ${ta(()=>z.value,(n,a)=>c`
          <div.tab class:active=${()=>a.value===P.value}>
            <button type="button" role="tab" aria-selected=${()=>de(a.value===P.value)} onclick=${p(()=>ws(a.value))}>${()=>dn(n)}</button>
            ${m(()=>z.value.length>1,()=>c`<btn-icon icon="lucide:x" label=${()=>"close "+dn(n)} onclick=${p(()=>ys(a.value))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${p(()=>jo())} />
    </div-x>
  `}o(Rc,"$$TabsRatHtml");function Oc(e,t){return Ac.call({props:e},e,t)}o(Oc,"LibraryRatHtml");function Ac(e,t){const n=v(()=>!!lt()),a=v(()=>F.value.viewmode==="grid"),r=o(u=>J(u.detail.path.split("/").filter(Boolean)),"crumb"),i=o(u=>ge.value=u,"search"),l=o(()=>Oo("viewmode",a.value?"list":"grid"),"toggleView");function s(){T.value.length?J(T.value.slice(0,-1)):RAT.app.router.go("/")}return o(s,"up"),c`
    ${m(()=>!n.value,()=>c`<${B} title="Library" /><div.scroll><${Wo} /></div>`,()=>c`
        <${B} ...${{get title(){return T.value.at(-1)??Oe()},get back(){return s}}}><btn-icon icon=${()=>a.value?"lucide:list":"lucide:layout-grid"} label=${()=>a.value?"show as list":"show as grid"} onclick=${p(l)} /></${B}>
        <nav-crumbs root=${()=>Oe()} path=${()=>"/"+T.value.join("/")} onnav-crumbs=${p(r)} />
        <div.pane>
          <div.listing>
            ${m(()=>Et.value,()=>c`<svg-icon icon="lucide:loader" />`,()=>m(()=>fn.value.length,()=>c`
                  <data-index viewmode=${()=>F.value.viewmode} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>fn.value,u=>u,u=>c`<${kc} ...${{get entry(){return u}}} />`)}
                  </data-index>
                `,()=>c`<p.empty>${()=>ge.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${p(Lo)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${xc} />
        <${_o} placeholder="Filter this folder" ...${{get value(){return ge.value},onsearch:i}} />
        <${Ec} />
      `)}
  `}o(Ac,"$$LibraryRatHtml");const Nc=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function Dc(e,t){return jc.call({props:e},e,t)}o(Dc,"BrandRatHtml");function jc(e,t){return Dt("1npwj96",Nc),c`
    <div.brand data-rat="1npwj96">
      ${m(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}o(jc,"$$BrandRatHtml");function Cc(e,t){return Hc.call({props:e},e,t)}o(Cc,"MenuRatHtml");function Hc(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],a=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:r}=je(RAT.app.router,{$path:null});function i(l){RAT.app.router.go(l);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return o(i,"go"),c`
    <nav.menu>
      <${Dc} name="Files" icon="./app.svg" />
      ${k(()=>n,l=>l,l=>c`<button type="button" aria-current=${()=>de(r.value===l.route?"page":null)} onclick=${p(()=>i(l.route))}><svg-icon icon=${()=>l.icon} /> ${()=>l.label}</button>`)}
      <hr />
      ${k(()=>a,l=>l,l=>c`<button type="button" disabled><svg-icon icon=${()=>l.icon} /> ${()=>l.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${p(()=>RAT.app.toggle("config",!0))}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}o(Hc,"$$MenuRatHtml");function Fc(e,t){return Mc.call({props:e},e,t)}o(Fc,"PreferencesRatHtml");function Mc(e,t){const n={open:{label:"Open with",values:{auto:"auto",single:"a tap",double:"a double click"}},searchbar:{label:"Search bar",values:{bottom:"bottom",top:"top"}},tabbar:{label:"Tabs",values:{bottom:"bottom",top:"top"}}},a={"pattern-bg":"Background","pattern-tile":"Tiles"},r=o(i=>l=>Oo(i,l.target.value),"change");return c`
    <section>
      <h3>files</h3>
      ${k(()=>Object.entries(n),i=>i,([i,{label:l,values:s}])=>c`
          <label>
            <span>${()=>l}</span>
            <input-value look="segments" value=${()=>F.value[i]} onchange=${p(r(i))}>
              ${k(()=>Object.entries(s),u=>u,([u,h])=>c`<input-option value=${()=>u}>${()=>h}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${k(()=>Object.entries(a),i=>i,([i,l])=>c`
          <label>
            <span>${()=>l}</span>
            <input-pattern opacity value=${()=>F.value[i]} onchange=${p(r(i))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${m(()=>D.value,()=>c`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>D.value.name}</p>
          <div-x.actions>
            <${x} icon="lucide:folder-sync" label="change" ...${{onclick:Je}} />
            <${x} icon="lucide:x" label="close" ...${{onclick:Ns}} />
          </div-x>
        `,()=>c`<${x} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Je}} />`)}
    </section>
  `}o(Mc,"$$PreferencesRatHtml");function Lc(e,t){return Pc.call({props:e},e,t)}o(Lc,"PreviewRatHtml");function Pc(e,t){let n=w(null);function a(l){let s=null,u=!0;return Lt(Fe(l.source),l.path,l.name).then(h=>{u&&(s=URL.createObjectURL(h),n.value=s)}),()=>{u=!1,s&&URL.revokeObjectURL(s)}}o(a,"show"),M(()=>{if(be.value=null,n.value=null,E.value&&At(E.value))return a(E.value)});const r=o(l=>be.value={height:l.target.naturalHeight,width:l.target.naturalWidth},"loaded");function i(){C.value=null,RAT.app.toggle("context")}return o(i,"info"),c`
    ${m(()=>!E.value,()=>c`
        <${B} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>c`
        <${B} ...${{get title(){return E.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${p(i)} /></${B}>
        <div.stage>
          ${m(()=>At(E.value),()=>c`
              ${m(()=>n.value,()=>c`<img src=${()=>n.value} alt=${()=>E.value.name} onload=${p(r)} />`)}
            `,()=>c`<svg-icon icon=${()=>Ho(E.value)} />`)}
        </div>
      `)}
  `}o(Pc,"$$PreviewRatHtml");const qo=`appearance:${new URL(".",location.href).pathname}`,$n={density:ae.densities,geometry:ae.geometries,mode:ae.modes},Ae=W(qo,{}),Ic=o(()=>ae.palettes().catch(()=>[]),"palettes");function zc(e,t){return Ae[e]=t||null,q(qo,Ae),ae.set({[e]:t||null})}o(zc,"setAppearance");Object.keys(Ae).length&&ae.set(Ae);const Bc=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function gn(e,t){return Uc.call({props:e},e,t)}o(gn,"SettingsRatHtml");function Uc(e,t){Dt("177zzh1",Bc);let n=w({...Ae}),a=w([]);const r=v(()=>Le.value);Ic().then(s=>{a.value=s});function i(s,u){const h=u.detail?.value??u.target.value;n.value={...n.value,[s]:h},zc(s,h)}o(i,"change");async function l(){await Is()&&I.success(`${e.name??"the app"} is installed`)}return o(l,"installApp"),c`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${p(s=>i("palette",s))}>
            ${k(()=>a.value,s=>s,s=>c`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${k(()=>Object.keys($n),s=>s,s=>c`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${p(u=>i(s,u))}>
                ${k(()=>$n[s],u=>u,u=>c`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!zo,()=>c`
          <section>
            <h3>install</h3>
            ${m(()=>r.value,()=>c`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${p(l)} />`,()=>c`
                ${m(()=>Ps,()=>c`<p.hint>Share, then "Add to Home Screen".</p>`,()=>c`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o(Uc,"$$SettingsRatHtml");function _c(e,t){return Wc.call({props:e},e,t)}o(_c,"SyncRatHtml");function Wc(e,t){let n=w(null),a=w(""),r=w("https"),i=w(""),l=w("");const s=v(()=>xt.value.map(Yl)),u=v(()=>le.value.filter(f=>!s.value.some(X=>Ke(X,f)))),h=v(()=>n.value??Jl(a.value,r.value)),g=v(()=>j.value.reduce((f,X)=>f+Math.max(0,X.size),0)),b=v(()=>Se.value??{}),S=o(f=>!!h.value&&Ke(h.value,f),"isChosen"),d=o(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),y=o(f=>Promise.resolve().then(f).catch(I.error),"run");function A(f){n.value=f,a.value=""}o(A,"choose");function V(f){a.value=f.target.value,n.value=null}o(V,"type");function Pe(f){r.value=f.target.value,n.value&&(n.value={...n.value,protocol:r.value})}o(Pe,"protocol");function ve(f){return f.name?f.name:f.tree?"chosen":"none yet"}o(ve,"folderOf");function Jt(f){return f.enabled?f.lastSync?`on · last ${O.date(f.lastSync)}`:"on":"off"}o(Jt,"stateOf");const Vo=o((f,X)=>f.length?`send ${f.length} · ${O.bytes(X)}`:"send","sendLabel");function Yt(f,X,Go){return c`
      <li.row class:selected=${()=>S(f)}>
        <button.entry type="button" aria-pressed=${()=>de(S(f))} onclick=${p(()=>A(f))}>
          <span.thumb><svg-icon icon=${()=>X} /></span>
          <span.text>
            <span.name>${()=>Ge(f)}</span>
            <small>${()=>f.host}:${()=>f.port} · ${()=>f.protocol}</small>
          </span>
        </button>
        ${m(()=>Go,()=>c`<btn-icon icon="lucide:x" label=${()=>"forget "+Ge(f)} onclick=${p(()=>Ql(f))} />`)}
      </li>
    `}return o(Yt,"receiver"),c`
    ${m(()=>!yo(),()=>c`
        <${B} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>c`
        <${B} title="Send">
          ${m(()=>St.value,()=>c`<small.identity>${()=>St.value.alias}</small>`)}
        </${B}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${p(To)} />
            </div-x>
            ${m(()=>s.value.length||u.value.length,()=>c`
                <ul.rows>
                  ${k(()=>s.value,f=>f,f=>c`${()=>Yt(f,d(f),!1)}`)}
                  ${k(()=>u.value,f=>f,f=>c`${()=>Yt(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>c`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>a.value} oninput=${p(V)} />
              <input-value look="segments" value=${()=>h.value?.protocol??r.value} onchange=${p(Pe)}>
                ${k(()=>wo,f=>f,f=>c`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" ref=${Qt(i,"value")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${m(()=>j.value.length,()=>c`
                <ul.rows>
                  ${k(()=>j.value,f=>f,f=>c`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>f.size>=0?O.bytes(f.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${p(()=>ns(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>c`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${x} icon="lucide:file-plus" label="pick files" ...${{onclick:o(()=>y(es),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!j.value.length||!h.value} onclick=${p(()=>y(()=>as(h.value,j.value,i.value)))}><svg-icon icon="lucide:send" /> ${()=>Vo(j.value,g.value)}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${ct} ...${{get rows(){return{folder:ve(b.value),state:Jt(b.value),to:b.value.enabled&&`${b.value.host}:${b.value.port}`}}}} />
            ${m(()=>!b.value.enabled,()=>c`<input-text placeholder="only on this wi-fi (ssid), optional" ref=${Qt(l,"value")} />`)}
            <div-x.actions>
              <${x} icon="lucide:folder-search" label="folder" ...${{onclick:o(()=>y(rs),"onclick")}} />
              ${m(()=>b.value.enabled,()=>c`
                  <${x} icon="lucide:refresh-cw" label="now" ...${{onclick:o(()=>y(ss),"onclick")}} />
                  <${x} icon="lucide:pause" label="turn off" ...${{onclick:o(()=>y(ls),"onclick")}} />
                `,()=>c`<${x} icon="lucide:play" label="turn on" ...${{get disabled(){return!b.value.tree||!h.value},onclick:o(()=>y(()=>is(h.value,{pin:i.value,ssid:l.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}o(Wc,"$$SyncRatHtml");function tu(e,t){return qc.call({props:e},e,t)}o(tu,"AppRatHtml");function qc(e,t){RAT.app.hold(ol().catch(I.error)),zs("Files");let n=!1;return RAT.app.router.on("change",({path:r})=>{r==="/sync"&&!n&&To(),r!=="/sync"&&n&&Zl(),n=r==="/sync"}),c`
    <rat-area name="menu" dock="start"><${Cc} /></rat-area>
    <rat-view name="dashboard" route="/"><${yc} /></rat-view>
    <rat-view name|route="library"><${Oc} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${Lc} /></rat-view>
    <rat-view name|route="sync"><${_c} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${p(o(r=>{r.detail?.open||(ce.value=null)},"ontoggle"))}><div.context><${cc} /></div></rat-area>
    <rat-area name="config" dock="end"><${gn} name="Files"><${Fc} /></${gn}></rat-area>
  `}o(qc,"$$AppRatHtml");export{tu as default};
