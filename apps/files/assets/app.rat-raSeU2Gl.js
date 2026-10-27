const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CF9kS3O3.js","./preload-helper-Cc2_yIPf.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./index-LJN-aEqT.css"])))=>i.map(i=>d[i]);
var qo=Object.defineProperty;var o=(e,t)=>qo(e,"name",{value:t,configurable:!0});import{i as Vo,g as b,h as Go,r as Jt,P as Ko,L as Jo,S as L,j as wn,$ as kn,k as I,m as k,o as At,q as xn,u as we,s as Yo,t as Xo,v as Nt,w as ae}from"./index-CF9kS3O3.js";import{p as Qo,a as Zo}from"./keys-CWTtq0D5.js";import{_ as ea}from"./preload-helper-Cc2_yIPf.js";import{r as $,b as Tn,g as ta}from"./index-CgHh2HpB.js";import{t as Ne,n as Yt,p as Sn,q as En,r as na,u as oa,v as Rn,x as aa,y as la,B as ra,z as On,D as ia,E as An,F as sa,G as ca,H as ua,I as da,J as fa,K as Nn,L as Ce,M as pa,N as dt,h as c,f as x,w as p}from"./withControl-saxu6q3w.js";import{isCheckable as Cn,isMultiSelect as jn,isArray as gt,isString as Qe,isObject as Dn,isFn as Mn,isElementish as ma,isIterable as ha}from"https://esm.sh/jsr/@pulgasari/is";import{toKebabCase as Fn,toCamelCase as Hn}from"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";function Ct(e,t){const n={};for(const a of Object.keys(t)){const l=e?.[a],r=t[a];n[a]=Vo(l)?l:b(()=>e[a]===void 0&&r?r():e[a])}return new Proxy(e??{},{get:o((a,l)=>Object.hasOwn(n,l)?n[l]:a[l],"get")})}o(Ct,"signalsOf");function m(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const l=t?Qo(t):null;let r=a;return function(i){if(!(a&&!r)&&!(l&&!Zo(i,l))){n&&i.preventDefault(),a&&r--;try{const s=(typeof e=="string"?Go(e):e).call(this,i);typeof s?.catch=="function"&&s.catch(u=>Jt(this,u))}catch(s){Jt(this,s)}}}}o(m,"listener");function va(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.add(...a),n}o(va,"addClass$1");function ga(e,t){const n=$(e);return n?t?n.getAttribute(Fn(t)):Object.fromEntries([...n.attributes].map(a=>[a.name,a.value])):t?null:{}}o(ga,"getAttr");function $a(e,t,{cast:n=!0}={}){const a=$(e);if(!a)return t?null:{};if(t){const r=a.dataset[Hn(t)];return r===void 0?null:n?Yt(r):r}const l={};for(const[r,i]of Object.entries(a.dataset))l[r]=n?Yt(i):i;return l}o($a,"getData");function ba(e,{box:t="border"}={}){const n=$(e);if(!n)return null;if(t==="content")return{width:n.clientWidth,height:n.clientHeight};if(t==="scroll")return{width:n.scrollWidth,height:n.scrollHeight};const a=n.getBoundingClientRect();return{width:a.width,height:a.height}}o(ba,"getElementSize");function ya(e){return $(e)?.innerHTML??null}o(ya,"getHTML");const wa=o(e=>e.startsWith("--"),"isVar"),ka=o(e=>wa(e)?e:Fn(e),"propertyName");function xa(e,t,n=!1){const a=$(e);if(!a)return null;const l=n?a.style:getComputedStyle(a);return t?l.getPropertyValue(ka(t)).trim()||null:l}o(xa,"getStyle");function Ta(e){return $(e)?.textContent??null}o(Ta,"getText");const Xt={bool:o(e=>!!(gt(e)?e.length:e),"bool"),date:o(e=>En(e),"date"),number:o(e=>Sn(e)??0,"number"),string:o(e=>gt(e)?e.join(", "):String(e??""),"string")},Sa=new Set(["button","data","input","meter","option","output","progress","select","textarea"]),Ea=o(e=>Sa.has(e.localName)||e.localName?.includes("-")&&"value"in e,"hasValue");function Ln(e,t=null){const n=$(e);if(!n)return null;const a=Cn(n)?n.checked:jn(n)?[...n.selectedOptions].map(l=>l.value):Ea(n)?n.value:n.textContent??"";return t&&Xt[t]?Xt[t](a):a}o(Ln,"getValue");function Ra(e,t){const n=$(e);if(!n)return!1;const a=Ne(t);return a.length>0&&a.every(l=>n.classList.contains(l))}o(Ra,"hasClass$1");function Oa(e,...t){const n=$(e);if(!n)return null;const a=Ne(t);return a.length&&n.classList.remove(...a),n}o(Oa,"removeClass$1");function Aa(e,t){const n=$(e);return n?(n.setAttribute("class",Ne(t).join(" ")),n):null}o(Aa,"setClass");const Na=o(e=>Qe(e)?e:Dn(e)||gt(e)?JSON.stringify(e):String(e),"encode");function Ca(e,t,n){const a=$(e);if(!a)return null;const l=Qe(t)?{[t]:n}:t??{};for(const[r,i]of Object.entries(l)){const s=Hn(r);i==null?delete a.dataset[s]:a.dataset[s]=Na(i)}return a}o(Ca,"setData");function ja(e){const t=document.createElement("template");return t.innerHTML=String(e).trim(),t.content}o(ja,"createHTML");function Da(e,t){const n=$(e);return n?(n.replaceChildren(ja(t??"")),n):null}o(Da,"setHTML");function Ma(e,t){const n=$(e);return n?(n.textContent=t==null?"":String(t),n):null}o(Ma,"setText");function Fa(e){e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}o(Fa,"notifyChange");function Ha(e,t,{notify:n=!1}={}){const a=$(e);if(!a)return null;if(Cn(a))a.checked=!!t;else if(jn(a)){const l=na(t).map(String);for(const r of a.options)r.selected=l.includes(r.value)}else"value"in a?a.value=t instanceof Date&&a.type==="date"?oa(t):t??"":a.textContent=t??"";return n&&Fa(a),a}o(Ha,"setValue");function La(e,t,n){const a=$(e);if(!a)return null;if(Dn(t)){for(const[l,r]of Object.entries(t))a.classList.toggle(l,!!r);return a}for(const l of Ne(t))a.classList.toggle(l,n);return a}o(La,"toggleClass$1");const Pn=Symbol.for("domina.chain"),In=o(e=>t=>typeof t===e,"isTypeOf"),Pa=o(e=>e==null||e==="","isBlank"),Ze=o(e=>e?.[Pn]===!0,"isChain"),fe=In("function"),zn=o(e=>e!==null&&typeof e=="object"&&[Object.prototype,null].includes(Object.getPrototypeOf(e)),"isPlainObject"),Ia=In("string"),za=o(e=>typeof e?.addEventListener=="function","isTarget"),Ba=o(e=>typeof e?.[Symbol.iterator]=="function","hasIterator"),Bn=o(e=>e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),"toCamelCase"),jt=o(e=>e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),"toKebabCase"),Un={};Un.ERROR=e=>{throw new TypeError("[domina] "+e)};const et=o((e,t)=>zn(e)?Object.entries(e):[[e,t]],"entriesOf"),Ua={params:{name:"string",value:"string"},read:o((e,t)=>ga(e,t),"read"),write:o((e,t,n)=>{for(const[a,l]of et(t,n))jt(a).startsWith("aria-")?_n(e,a,l):aa(e,a,l)},"write")},$t=o(e=>{const t=jt(e);return t.startsWith("aria-")?t:`aria-${t}`},"ariaName");function _n(e,t,n){n==null?e.removeAttribute($t(t)):e.setAttribute($t(t),Array.isArray(n)?n.join(" "):String(n))}o(_n,"writeAria");function _a(e){const t=e.getAttributeNames().filter(n=>n.startsWith("aria-"));return Object.fromEntries(t.map(n=>[Bn(n.slice(5)),e.getAttribute(n)]))}o(_a,"readAria");const Wa={params:{name:"string",value:"string"},read:o((e,t)=>t==null?_a(e):e.getAttribute($t(t)),"read"),write:o((e,t,n)=>{for(const[a,l]of et(t,n))_n(e,a,l)},"write")},ke=o(e=>{const t=jt(e);return Bn(t.startsWith("data-")?t.slice(5):t)},"dataKey"),Wn=o((e,t)=>{delete e.dataset[ke(t)]},"removeData"),qa={params:{name:"string",value:"json"},read:o((e,t)=>$a(e,t==null?void 0:ke(t)),"read"),write:o((e,t,n)=>{for(const[a,l]of et(t,n))l==null?Wn(e,a):Ca(e,ke(a),l)},"write")},Va={params:{name:"string",value:"string"},read:o((e,t)=>t==null?{...e.dataset}:e.dataset[ke(t)]??null,"read"),write:o((e,t,n)=>{for(const[a,l]of et(t,n))l==null?Wn(e,a):e.dataset[ke(a)]=l},"write")},Ga={write:va,params:{names:"string"}},Ka={write:Oa,params:{names:"string"}},Ja={write:La,params:{names:"string",force:"bool"}},Ya={read:Ra,params:{names:"string"}},Xa={params:{names:"string"},read:o(e=>[...e.classList],"read"),write:Aa},Qa={read:ya,write:Da,params:{html:"html"}},Za={read:xa,write:Rn,params:{property:"string",value:"string"}},el={read:Ta,write:Ma,params:{text:"string"}},tl={read:Ln,write:Ha,params:{value:"json"},reads:o(e=>e.length===0,"reads")},nl=o(e=>Object.keys(e).every(t=>t==="box"),"onlyBox"),ol={object:!0,params:{w:"number",h:"number",box:"string"},reads:o(([e])=>e==null||nl(e),"reads"),read(e,{box:t}={}){const n=ba(e,{box:t});return n&&{h:n.height,w:n.width}},write(e,{h:t,w:n}){const a={};n!==void 0&&(a.width=n),t!==void 0&&(a.height=t),Rn(e,a)}},al=Object.freeze(Object.defineProperty({__proto__:null,addClass:Ga,aria:Wa,attr:Ua,class:Xa,data:qa,dataset:Va,hasClass:Ya,html:Qa,removeClass:Ka,size:ol,style:Za,text:el,toggleClass:Ja,value:tl},Symbol.toStringTag,{value:"Module"}));function ll(e,t,n,a,l){const r=$(e),i=la(t).map(h=>ra[h]??h);if(!r||!i.length||!Mn(a))return()=>{};const s=n.includes(":scope"),u=o(h=>{if(!s)return h?.closest?.(n);const y=new Set(r.querySelectorAll(n));for(let d=h;d&&d!==r;d=d.parentNode)if(y.has(d))return d;return null},"matchOf"),v=o(h=>{const y=u(h.target);y&&r.contains(y)&&a.call(y,h,y)},"listener");for(const h of i)r.addEventListener(h,v,l);return()=>{for(const h of i)r.removeEventListener(h,v,l)}}o(ll,"delegateEvent");const bt=new WeakMap,qn=o(e=>String(e??"").split(/[\s,]+/).filter(Boolean),"typesOf");function rl(e){let t=bt.get(e);return t||bt.set(e,t=new Set),t}o(rl,"recordsOf");function il(e,t,n,a,l,r){const i=rl(e),s={handler:a,selector:n,stop:null,type:t},u=o(()=>{s.stop(),i.delete(s)},"drop"),v=o((h,y)=>{r&&u(),a(h,y)},"call");return s.stop=n?ll(e,t,n,v,l):On(e,t,h=>v(h,e),l),i.add(s),l?.signal?.addEventListener("abort",()=>i.delete(s),{once:!0}),u}o(il,"add$2");function sl(e,t,n,a,l,{once:r=!1}={}){if(!fe(a))throw new TypeError("[domina] the handler is not a function");if(l?.signal?.aborted)return()=>{};const i=qn(t).map(s=>il(e,s,n||null,a,l,r));return()=>{for(const s of i)s()}}o(sl,"listen");function cl(e,t,n){const a=bt.get(e);if(!a)return;const l=t?new Set(qn(t)):null;for(const r of a)l&&!l.has(r.type)||n&&r.handler!==n||(r.stop(),a.delete(r))}o(cl,"unlisten");function Vn(e,t,n){const[a,l,r,i]=typeof t[1]=="function"?[t[0],null,...t.slice(1)]:t;for(const s of e.elements)sl(s,a,l,r,i,{once:n});return e}o(Vn,"subscribe");const ul={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Vn(this,e,!1)}},dl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Vn(this,e,!0)}},fl={kind:"event",params:{types:"string",handler:"function"},method(e,t){for(const n of this.elements)cl(n,e,t);return this}},pl={kind:"event",params:{type:"string",detail:"json"},write:o((e,t,n,a)=>ia(e,t,n,a),"write")},ml=Object.freeze(Object.defineProperty({__proto__:null,emit:pl,off:fl,on:ul,once:dl},Symbol.toStringTag,{value:"Module"}));function hl(e){return $(e)?.replaceChildren()??null}o(hl,"clearElement");function vl(e,t=!0){return $(e)?.cloneNode(t)??null}o(vl,"cloneElement");function gl(e,t,...n){const a=$(e);if(!a)return null;const l=An(n);if(!l.length)return a;const r=a.children,i=t<0?r.length+t:t,s=r[Math.max(0,Math.min(i,r.length))]??null;return s?s.before(...l):a.append(...l),a}o(gl,"insertAt");function $l(...e){const t=[];for(const n of e.flat(1/0)){const a=$(n);a&&(a.remove(),t.push(a))}return t}o($l,"removeElement");function bl(e,...t){const n=$(e);if(!n?.parentNode)return null;const a=An(t);return n.replaceWith(...a),a}o(bl,"replaceElement");const yl="auto-asc",wl=/[̀-ͯ]/g,kl=/\d+/g,xl=/^[\x00-\x7f]*$/,Qt=o(e=>{let t=String(e);return xl.test(t)||(t=t.normalize("NFD").replace(wl,"")),t.toLowerCase().replace(kl,n=>n.padStart(16,"0"))},"textKey"),Zt=o(e=>En(e)?.getTime()??null,"dateKey"),en={date:o(e=>e.map(Zt),"date"),num:o(e=>e.map(Sn),"num"),regular:o(e=>e.map(Qt),"regular"),auto:o(e=>{const t=e.map(Zt);return t.every((n,a)=>n!==null||e[a]==="")&&t.some(n=>n!==null)?t:e.map(Qt)},"auto")},Tl=o((e,t,n)=>e===null&&t===null?0:e===null?1:t===null?-1:e<t?-n:e>t?n:0,"compareKeys");function Sl({selector:e,order:t},n){const a=e?Tn(e):null,l=n.map(s=>Ln(a?s.querySelector(a):s)??"");if(Mn(t))return{values:l,order:t};const[r,i]=t.includes("-")?t.split("-"):["auto",t];return{keys:(en[r]??en.auto)(l),dir:i==="desc"?-1:1}}o(Sl,"column");function El({container:e,item:t,indicators:n}){const a=sa("sortElements",e,t);if(!a)return[];const{$container:l,items:r}=a,i=ca(n,da(yl));if(i.some(s=>s.order==="random"))ua(r);else{const s=i.map(h=>Sl(h,r)),u=r.map((h,y)=>y);u.sort((h,y)=>{for(const{dir:d,keys:O,order:E,values:F}of s){const H=E?E(F[h],F[y],r[h],r[y]):Tl(O[h],O[y],d);if(H)return H}return 0});const v=u.map(h=>r[h]);r.splice(0,r.length,...v)}return l.append(...r),r}o(El,"sortElements");function Rl(e){const t=$(e);if(!t?.parentNode)return null;const n=[...t.childNodes];return t.replaceWith(...n),n}o(Rl,"unwrapElement");function Ol(e,t="div",n={}){const a=$(e);if(!a?.parentNode)return null;const l=Qe(t)?fa(t,n):$(t);return l?(a.replaceWith(l),l.append(a),l):null}o(Ol,"wrapElement");const Al=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder$1"),Gn=o(e=>e.length<2?e:[...new Set(e)],"unique");function ft(e,t){try{return e.querySelectorAll?Array.from(e.querySelectorAll(t)):[]}catch{return[]}}o(ft,"select");function Nl(e,t){if(t==null)return ft(document,e);const n=pe(t);return n.length===1?ft(n[0],e):Gn(n.flatMap(a=>ft(a,e))).sort(Al)}o(Nl,"query");function pe(e,t){return Pa(e)?[]:Ia(e)?Nl(e,t):Ze(e)?e.elements:za(e)?[e]:Ba(e)?Gn(Array.from(e,n=>pe(n)).flat()):[]}o(pe,"collect");class N{static{o(this,"Chain")}constructor(t,n=!1){this.elements=t,this.many=n}get[Pn](){return!0}get length(){return this.elements.length}get el(){return this.elements[0]??null}get all(){return this.many?this:new N(this.elements,!0)}[Symbol.iterator](){return this.elements[Symbol.iterator]()}each(t){return this.elements.forEach(t),this}map(t){return this.elements.map(t)}}const Kn=o(e=>e?.nodeType===1,"isElement");function Dt(e,t,n){return e.flatMap(o(function a(l){return fe(l)?a(l(t,n)):l==null||l===!1?[]:Array.isArray(l)?l.flatMap(a):Ze(l)?l.elements:[l]},"resolve"))}o(Dt,"contentFor");function Mt(e,t,n){t.length<2||n.some(a=>Ze(a)||a?.nodeType)&&Un.ERROR(`${e}(): one node cannot go to ${t.length} places. pass a string, or a function (element, index) -> node`)}o(Mt,"assertPlaceable");const tt=o(e=>({kind:"structure",params:{content:"string"},method(...t){return Mt(e,this,t),this.elements.forEach((n,a)=>n[e](...Dt(t,n,a))),this}}),"placing"),Cl=tt("append"),jl=tt("prepend"),Dl=tt("before"),Ml=tt("after"),Fl={kind:"structure",params:{index:"number",content:"string"},method(e,...t){return Mt("insert",this,t),this.elements.forEach((n,a)=>gl(n,e,...Dt(t,n,a))),this}},Jn=o(e=>({kind:"structure",params:{target:"string"},method(t){const[n]=pe(t);return n&&n[e](...this.elements),this}}),"moving"),Hl=Jn("append"),Ll=Jn("prepend"),Pl={kind:"structure",params:{content:"string"},method(...e){Mt("replace",this,e);const t=this.elements.flatMap((n,a)=>bl(n,...Dt(e,n,a))??[]);return new N(t.filter(Kn),this.many)}},Il={kind:"structure",params:{tag:"string",props:"json"},method(e="div",t={}){const n=this.elements.map((a,l)=>Ol(a,fe(e)?e(a,l):e,t));return new N(n.filter(Boolean),this.many)}},zl={kind:"structure",params:{},method(){const e=this.elements.flatMap(t=>Rl(t)??[]);return new N(e.filter(Kn),this.many)}},Bl={kind:"structure",params:{},write:o(e=>{hl(e)},"write")},Ul={kind:"structure",params:{},method(){return $l(this.elements),this}},_l={kind:"structure",params:{deep:"bool"},method(e=!0){return new N(this.elements.map(t=>vl(t,e)),this.many)}},Wl={kind:"structure",params:{item:"string",by:"string"},method(e,...t){for(const n of this.elements)El({container:n,indicators:t.length?t:[{}],item:e});return this}},ql=Object.freeze(Object.defineProperty({__proto__:null,after:Ml,append:Cl,appendTo:Hl,before:Dl,clear:Bl,clone:_l,insert:Fl,prepend:jl,prependTo:Ll,remove:Ul,replace:Pl,sort:Wl,unwrap:zl,wrap:Il},Symbol.toStringTag,{value:"Module"}));function Vl(e,t){const n=$(e);if(!n)return[];const a=Nn(t);return[...n.children].filter(a)}o(Vl,"getChildren");function Gl(e,t){return $(e)?.closest(Tn(t))??null}o(Gl,"getClosest");function Kl(e){const t=$(e);return t?.parentElement?[...t.parentElement.children].indexOf(t):-1}o(Kl,"getIndex");function Jl(e,t){return Ce($(e),"nextElementSibling",t,!1)[0]??null}o(Jl,"getNext");function Yl(e,t){return Ce($(e),"nextElementSibling",t,!0)}o(Yl,"getNextAll");function Xl(e,t){const n=$(e)?.parentElement??null;return n&&pa(n,t)?n:null}o(Xl,"getParent");function Ql(e,t){return Ce($(e),"parentElement",t,!0)}o(Ql,"getParents");function Zl(e,t){return Ce($(e),"previousElementSibling",t,!1)[0]??null}o(Zl,"getPrev");function er(e,t){return Ce($(e),"previousElementSibling",t,!0)}o(er,"getPrevAll");function tr(e,t){const n=$(e);if(!n?.parentElement)return[];const a=Nn(t);return[...n.parentElement.children].filter(l=>l!==n&&a(l))}o(tr,"getSiblings");const nr=o((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder");function Ft(e,t){const n=e.elements.flatMap(l=>[].concat(t(l)??[])),a=n.length<2?n:[...new Set(n)].sort(nr);return new N(a,e.many)}o(Ft,"step");const Ht=o((e,t)=>fe(t)?t(e):e.matches?.(t),"matches$1"),J=o(e=>({kind:"traversal",params:{filter:"string"},method(t){return Ft(this,n=>e(n,t))}}),"walking"),or={kind:"traversal",params:{selector:"string"},method(e){return Ft(this,t=>pe(e,t))}},ar={kind:"traversal",params:{selector:"string"},method(e){return Ft(this,t=>Gl(t,e))}},lr=J(Vl),rr=J(Xl),ir=J(Ql),sr=J(tr),cr=J(Jl),ur=J(Zl),dr=J(Yl),fr=J(er),pr={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>fe(e)?e(t,n):Ht(t,e)),this.many)}},mr={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>!(fe(e)?e(t,n):Ht(t,e))),this.many)}},hr={kind:"traversal",params:{selector:"string"},method(e){return new N(this.elements.filter(t=>t.querySelector?.(e)),this.many)}},vr={kind:"traversal",params:{index:"number"},method(e){const t=this.elements.at(e);return new N(t?[t]:[],this.many)}},gr={kind:"traversal",params:{},method(){return this.at(0)}},$r={kind:"traversal",params:{},method(){return this.at(-1)}},br={kind:"traversal",params:{start:"number",end:"number"},method(e,t){return new N(this.elements.slice(e,t),this.many)}},yr={kind:"read",params:{selector:"string"},method(e){return this.elements.some(t=>Ht(t,e))}},wr={params:{},read:Kl},kr=Object.freeze(Object.defineProperty({__proto__:null,at:vr,children:lr,closest:ar,filter:pr,find:or,first:gr,has:hr,index:wr,is:yr,last:$r,next:cr,nextAll:dr,not:mr,parent:rr,parents:ir,prev:ur,prevAll:fr,siblings:sr,slice:br},Symbol.toStringTag,{value:"Module"}));function xr(e){const t=$(e);if(!t)return null;const n=t.getBoundingClientRect(),a=n.top+window.scrollY,l=n.left+window.scrollX;return{x:a,y:l,left:a,top:l}}o(xr,"getElementOffset");function Tr(e){const t=$(e);if(!t)return null;const n=t.offsetLeft,a=t.offsetTop;return{x:n,y:a,left:n,top:a}}o(Tr,"getElementPosition");function Sr(e){return $(e)?.getBoundingClientRect()??null}o(Sr,"getElementRect");function Er(e,{ratio:t=0}={}){const n=$(e);if(!n)return!1;const a=n.getBoundingClientRect(),l=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth,i=Math.min(a.bottom,l)-Math.max(a.top,0),s=Math.min(a.right,r)-Math.max(a.left,0);return i<=0||s<=0?!1:i*s/(a.height*a.width||1)>=t}o(Er,"isElementInViewport");function Yn(e,t={}){const n=$(e)??window;return n?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest",...t}),n}o(Yn,"scrollTo$1");function Rr(e,t={}){return Yn(e,{behavior:"auto",...t})}o(Rr,"jumpTo$1");const Or=Symbol.for("domina.node");function Xn(e,t){return e?e[Or]===!0?[e.node].filter(Boolean):Qe(e)?ta(e,t):ma(e)?[e]:ha(e)?[...e].flatMap(n=>Xn(n,t)):[$(e,t)].filter(Boolean):[]}o(Xn,"resolveElements");function Ar(e,{name:t,subtree:n=!1}={}){const a=o(u=>!t||u.animationName===t,"checkName"),l=o(u=>u.finished.catch(()=>null),"checkFinish"),r=o(u=>u.getAnimations({subtree:n}),"getNames"),i=Xn(e),s=i.flatMap(r).filter(a);return Promise.all(s.map(l)).then(()=>i)}o(Ar,"waitForAnimations");function Nr(e,t,n,a){let l;return l=On(e,t,o(i=>{l(),n(i)},"wrapped"),a),l}o(Nr,"onceEvent");function Cr(e,t,{signal:n,timeout:a}={}){return new Promise((l,r)=>{const i=Nr(e,t,u=>{clearTimeout(s),l(u)}),s=a?setTimeout(()=>{i(),r(new Error(`waitForEvent: ${t} timed out`))},a):null;n?.addEventListener("abort",()=>{i(),clearTimeout(s),r(n.reason)})})}o(Cr,"waitForEvent");const jr={params:{},read:xr},Dr={params:{},read:Tr},Mr={params:{},read:Sr},Fr={params:{ratio:"number"},read:o((e,t=0)=>Er(e,{ratio:t}),"read")},Hr={kind:"view",params:{options:"json"},method(e){return this.el&&Yn(this.el,e),this}},Lr={kind:"view",params:{options:"json"},method(e){return this.el&&Rr(this.el,e),this}},Pr={kind:"wait",params:{name:"string"},method(e){return Ar(this.elements,{name:e}).then(()=>this)}},Ir={kind:"wait",params:{type:"string",timeout:"number"},method(e,t){return this.el?Cr(this.el,e,{timeout:t}):Promise.reject(new Error("[domina] wait(): the chain is empty"))}},zr=Object.freeze(Object.defineProperty({__proto__:null,finished:Pr,inView:Fr,jumpTo:Lr,offset:jr,position:Dr,rect:Mr,scrollTo:Hr,wait:Ir},Symbol.toStringTag,{value:"Module"})),Qn=new Map,Br=o(e=>e.length===0||e.length===1&&!zn(e[0]),"readsByDefault"),Ur=o(({kind:e,method:t,read:n,write:a})=>e??(t?"method":n&&a?"access":n?"read":"write"),"kindOf");function _r(e,{method:t,read:n,reads:a=Br,write:l}){return t||function(...r){const{elements:i}=this;if(n&&(!l||a(r)))return this.many?i.map(s=>n(s,...r)):i.length?n(i[0],...r):null;if(n&&r.length>1&&r.at(-1)===void 0)throw new TypeError(`[domina/chain] ${e}(): undefined is not a value, null removes`);if(n&&typeof r[1]=="function"){const[s,u]=r;return i.forEach((v,h)=>l(v,s,u(n(v,s),v,h))),this}for(const s of i)l(s,...r);return this}}o(_r,"build");function Zn(e,t){if(e in N.prototype)throw new Error(`[domina/chain] "${e}" exists already`);const n=typeof t=="function"?{write:t}:t;Object.defineProperty(N.prototype,e,{configurable:!0,value:_r(e,n),writable:!0}),Qn.set(e,{...n,kind:Ur(n),name:e,params:n.params??{}})}o(Zn,"define");function eo(e){for(const[t,n]of Object.entries(e))Zn(t,n)}o(eo,"extend");eo({...al,...ml,...ql,...kr,...zr});function je(e,t){return Ze(e)?e:new N(pe(e,t))}o(je,"d");function Wr(e,t){return new N(pe(e,t),!0)}o(Wr,"dd");je.all=Wr;je.api=Qn;je.define=Zn;je.extend=eo;new Proxy(()=>{},{apply:o((e,t,[n,a])=>je(n,a),"apply"),get:o((e,t)=>dt[t],"get"),has:o((e,t)=>t in dt,"has"),set:o((e,t,n)=>(dt[t]=n,!0),"set")});function q(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}o(q,"read$1");function V(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}o(V,"write$1");const Le=o(e=>(t,n)=>Ko.notify(t,{...n,type:e}),"notify"),B=Object.assign(Le("info"),{error:Le("error"),info:Le("info"),success:Le("success")}),qr=o((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function W(e,t=[]){let n=e;for(const a of t)n=await n.getDirectoryHandle(a);return n}o(W,"dirAt");async function Vr(e,t=[]){const n=await W(e,t),a=[];for await(const r of n.values())a.push(r);return(await Promise.all(a.map(async r=>{if(r.kind==="directory")return{kind:"directory",name:r.name};const i=await r.peekFile?.()??await r.getFile();return{kind:"file",lastModified:i.lastModified,name:r.name,size:i.size,type:i.type}}))).sort(qr)}o(Vr,"list$1");async function Lt(e,t,n){return(await(await W(e,t)).getFileHandle(n)).getFile()}o(Lt,"readFile");async function Gr(e,t,n){await(await W(e,t)).getDirectoryHandle(n,{create:!0})}o(Gr,"mkdir");async function Kr(e,t,n){await(await W(e,t)).removeEntry(n,{recursive:!0})}o(Kr,"remove$3");async function Jr(e,t,n,a,l){const r=await W(e,t),i=l==="directory"?await r.getDirectoryHandle(n):await r.getFileHandle(n);if(typeof i.move=="function")try{await i.move(a);return}catch{}l==="directory"?await It(i,r,a):await Pt(i,r,a),await r.removeEntry(n,{recursive:!0})}o(Jr,"rename");async function Pt(e,t,n,a){const l=await e.getFile(),i=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(i instanceof WritableStream)){await i.write(await l.arrayBuffer()),await i.close();return}try{await l.stream().pipeTo(i,{signal:a})}catch(s){throw await i.abort?.().catch(()=>{}),s}}o(Pt,"copyFile");async function It(e,t,n,a,l=()=>{}){const r=await t.getDirectoryHandle(n,{create:!0});for await(const i of e.values()){if(a?.aborted)throw new DOMException("copy aborted","AbortError");i.kind==="directory"?await It(i,r,i.name,a,l):(await Pt(i,r,i.name,a),l())}}o(It,"copyTree");const{folders:Y}=RAT.app,{perms:Yr,ready:Xr,sources:to}=Ct(Y,{perms:null,ready:null,sources:null}),C=b(()=>to.value.at(-1)??null),Qr=b(()=>C.value?Yr.value[C.value.id]??null:null),X=b(()=>Qr.value==="granted"?Y.handleOf(C.value.id):null),no=RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function",Zr=o(()=>Y.load(),"load");async function ei(){const e=to.value.map(n=>n.id),t=await Y.add();if(t)for(const n of e)await Y.remove(n);return t}o(ei,"grant");async function ti(){return C.value?Y.reconnect(C.value.id):{granted:!1}}o(ti,"reconnect$1");async function ni(){C.value&&await Y.remove(C.value.id)}o(ni,"forget$2");const oi={folder:L,name:L,path:Jo(L)},ai={icon:L,label:L},nt=wn(oi).create(q("files:bookmarks",[])),Ve=kn(L,L).create(q("files:folderTyped",{})),zt=kn(L,ai).create(q("files:folderTypes",{}));I(()=>V("files:bookmarks",nt));I(()=>V("files:folderTyped",Ve));I(()=>V("files:folderTypes",zt));const xe=b(()=>String(C.value?.id??"")),oo=o(e=>`${xe.value}:${e.join("/")}`,"keyOf"),Bt={audio:{icon:"lucide:music",label:"Audio"},documents:{icon:"lucide:file-text",label:"Documents"},images:{icon:"lucide:image",label:"Images"},video:{icon:"lucide:film",label:"Videos"}},_e=b(()=>({...Bt,...zt.toJSON()})),ao=o(e=>Ve.get(oo(e))??null,"folderTypeIdOf"),lo=o(e=>_e.value[ao(e)]??null,"folderTypeOf");function yt(e,t){const n=oo(e);t?Ve.set(n,t):Ve.delete(n)}o(yt,"setFolderType");function li({icon:e="lucide:folder",label:t}){const n=crypto.randomUUID();return zt.set(n,{icon:e,label:t}),n}o(li,"addFolderType");function ri(e,t){const n=e.filter(i=>i.kind==="file"),a={};for(const i of n)a[t(i)]=(a[t(i)]??0)+1;const[l,r]=Object.entries(a).sort((i,s)=>s[1]-i[1])[0]??[];return l in Bt&&r/n.length>=.6?l:null}o(ri,"suggestFolderType");const ii=o(()=>nt.where({folder:xe.value}),"bookmarks"),Pe=o(e=>nt.has({folder:xe.value,path:e}),"isBookmarked"),tn=o((e,t)=>nt.toggle({folder:xe.value,name:t,path:e},{folder:xe.value,path:e}),"toggleBookmark"),si=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ci(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let a=0;a<t.length;a+=32768)n+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(n)}o(ci,"toBase64");const ui=o(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),di=new Set([101,204,205,304]);async function fi(e,{body:t,headers:n={},method:a="GET",signal:l,timeout:r}={}){const i=si();if(!i)return fetch(e,{body:t,headers:n,method:a,signal:l});const s=await i.request({body:await ci(t),headers:n,method:a,timeout:r,url:e});return new Response(di.has(s.status)?null:ui(s.data),{headers:s.headers,status:s.status,statusText:s.statusText})}o(fi,"request$2");const pi=o(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),mi=o(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),ro=o(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),ne=o((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function io(e,t="",n=!1){const a=new URL(mi(t),ro(e)).href;return n&&!a.endsWith("/")?a+"/":a}o(io,"urlFor");const hi={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class pt extends Error{static{o(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function me(e,t,{body:n,headers:a={},isDir:l=!1,method:r="GET"}={}){if(!e)throw new Error("No webdav connection.");let i;try{i=await fi(io(e,t,l),{body:n,headers:{Authorization:pi(e),...a},method:r})}catch(s){throw globalThis.Capacitor?.isNativePlatform?.()?new pt(0,`Connection failed: ${s?.message??s}`):new pt(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!i.ok)throw new pt(i.status,hi[i.status]??`${i.status} ${i.statusText}`);return i}o(me,"request$1");const vi='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',wt="DAV:",Ie=o((e,t)=>e.getElementsByTagNameNS(wt,t)[0]?.textContent??"","firstText");async function so(e,t,n){const a=await me(e,t,{body:vi,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await a.text(),"application/xml"),r=new URL(ro(e)).pathname,i=o(s=>{const u=decodeURIComponent(new URL(s,e.url).pathname);return(u.startsWith(r)?u.slice(r.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS(wt,"response")].map(s=>{const u=i(Ie(s,"href"));return{isDir:s.getElementsByTagNameNS(wt,"collection").length>0,lastModified:Date.parse(Ie(s,"getlastmodified"))||0,mime:Ie(s,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(Ie(s,"getcontentlength"))||0}})}o(so,"propfind");async function co(e,t=""){const n=ne(t);return(await so(e,t,1)).filter(l=>l.path!==n).sort((l,r)=>l.isDir===r.isDir?l.name.localeCompare(r.name,void 0,{numeric:!0}):l.isDir?-1:1)}o(co,"list");async function mt(e,t){try{return(await so(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}o(mt,"stat");const gi=o(async(e,t)=>(await me(e,t)).blob(),"read"),uo=o((e,t,n)=>me(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),$i=o((e,t)=>me(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),bi=o((e,t,n=!1)=>me(e,t,{isDir:n,method:"DELETE"}),"remove$2"),yi=o((e,t,n)=>({Destination:io(e,t,n),Overwrite:"F"}),"destination"),fo=o((e,t,n,a=!1)=>me(e,t,{headers:yi(e,n,a),isDir:a,method:"MOVE"}),"move"),wi=o(e=>co(e,""),"test"),ht=o(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),nn=o(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class ot{static{o(this,"DavHandle")}constructor(t,n,a){this.connection=t,this.name=a,this.path=n}async isSameEntry(t){return t instanceof ot&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class on extends ot{static{o(this,"DavFileHandle")}kind="file";constructor(t,n,a,l=null){super(t,n,a),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:a=0}=this.meta??{};return{lastModified:t,name:this.name,size:a,type:n}}async getFile(){const t=await gi(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:o(async()=>{t.length=0},"abort"),close:o(async()=>{await uo(this.connection,this.path,new Blob(t))},"close"),write:o(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof le)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=ne(t.path,n);await fo(this.connection,this.path,a,!1),Object.assign(this,{name:n,path:a})}}class le extends ot{static{o(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await co(this.connection,this.path))yield[t.name,t.isDir?new le(this.connection,t.path,t.name):new on(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const a=ne(this.path,t),l=await mt(this.connection,a);if(l&&!l.isDir)throw nn(t);if(!l){if(!n)throw ht(t);await $i(this.connection,a)}return new le(this.connection,a,t)}async getFileHandle(t,{create:n=!1}={}){const a=ne(this.path,t),l=await mt(this.connection,a);if(l?.isDir)throw nn(t);if(!l){if(!n)throw ht(t);await uo(this.connection,a,new Blob([]))}return new on(this.connection,a,t,l)}async removeEntry(t){const n=ne(this.path,t),a=await mt(this.connection,n);if(!a)throw ht(t);await bi(this.connection,n,a.isDir)}async move(t,n=this.name){if(!(t instanceof le)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const a=ne(t.path,n);await fo(this.connection,this.path,a,!0),Object.assign(this,{name:n,path:a})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const ki=o(e=>new le(e,"",e.name||new URL(e.url).host),"davRoot"),{files:po}=RAT.app,mo="remotes.json",We=new Map,xi={id:L,name:L,password:L,url:L,username:L},De=wn(xi).create(await po.read(mo,"json").catch(()=>[]));I(()=>po.write(mo,JSON.stringify(De)));const Ge=b(()=>De.toArray()),ho=o(e=>De.one({id:e})??null,"byId");async function Ti({name:e,password:t="",url:n,username:a=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const r={id:crypto.randomUUID(),name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(a).trim()};return await wi(r),De.push(r),r}o(Ti,"add$1");function Si(e){De.drop({id:e}),We.delete(e)}o(Si,"remove$1");function Ei(e){const t=ho(e);return t?(We.has(e)||We.set(e,ki(t)),We.get(e)):null}o(Ei,"rootOf");const at=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Ri=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Oi=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,Ai=o(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function re({name:e,type:t=""}){const n=Ai(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||Ri.test(n)?"documents":Oi.test(n)?"archives":"other"}o(re,"categoryOf");let S=k(null),G=k(null);const{files:Ut}=RAT.app,Ni=24,Ci=o(e=>e.startsWith(".")||e==="node_modules","SKIP"),_t=o(e=>`index/${e.id}.json`,"pathOf");let ge=null;async function vo(e,t,n,a){const l=[],r=[];for await(const i of e.values()){if(a.aborted)throw new DOMException("scan aborted","AbortError");Ci(i.name)||(i.kind==="directory"?l.push(i):r.push(Promise.resolve(i.peekFile?.()??i.getFile()).then(s=>({lastModified:s.lastModified,name:i.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const i of await Promise.all(r))i&&n.push(i);G.value={files:n.length};for(const i of l)await vo(i,[...t,i.name],n,a)}o(vo,"walk");function ji(e){const t=Object.fromEntries(at.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const r=t[re(l)];r.count++,r.size+=l.size,n+=l.size}const a=e.toSorted((l,r)=>r.lastModified-l.lastModified).slice(0,Ni);return{categories:t,files:e,recent:a,scannedAt:Date.now(),size:n,total:e.length}}o(ji,"summarize");async function Di(e){return S.value=e?await Ut.read(_t(e),"json").catch(()=>null):null,S.value}o(Di,"restore");async function Mi(e,t){ge?.abort();const n=new AbortController;ge=n;const a=[];G.value={files:0};try{return await vo(e,[],a,n.signal),S.value=ji(a),await Ut.write(_t(t),JSON.stringify(S.value)),S.value}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{ge===n&&(ge=null,G.value=null)}}o(Mi,"scan");const go=o(()=>ge?.abort(),"stop$1");async function Fi(e){go(),S.value=null,e&&await Ut.remove(_t(e)).catch(()=>{})}o(Fi,"forget$1");function Hi(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const a=[];for(const l of S.value?.files??[])if(l.name.toLowerCase().includes(n)&&a.push(l),a.length>=t)break;return a}o(Hi,"search");const Li=50,$o="files:tasks",lt=new At,Te=new At(q($o,[]));I(()=>V($o,Te));const kt=b(()=>lt.toArray()),an=b(()=>Te.toArray()),ln=b(()=>lt.has({state:"running"})),bo=new WeakMap,yo=new Map,Pi=o(e=>e?.name==="AbortError","isAbort"),Ii=o(e=>(yo.get(e)??Promise.resolve()).catch(()=>{}),"after");function vt(e,t){Object.assign(e,t,{endedAt:Date.now()}),lt.remove(e),Te.unshift(e.toJSON()),Te.splice(Li)}o(vt,"finish");function rt({icon:e="lucide:loader",label:t,lane:n="default"},a){const l=new AbortController,{signal:r}=l,i=new xn({endedAt:null,error:null,icon:e,id:crypto.randomUUID(),label:t,lane:n,progress:null,queuedAt:Date.now(),startedAt:null,state:"queued"});bo.set(i,l),lt.push(i);const s=o((v,h)=>{i.progress={done:v,total:h}},"progress"),u=Ii(n).then(async()=>{if(r.aborted)return vt(i,{state:"cancelled"}),null;Object.assign(i,{startedAt:Date.now(),state:"running"});try{const v=await a({progress:s,signal:r});return vt(i,{state:r.aborted?"cancelled":"done"}),v}catch(v){throw vt(i,Pi(v)?{state:"cancelled"}:{error:String(v?.message??v),state:"failed"}),v}});return yo.set(n,u),u}o(rt,"run");const zi=o(e=>bo.get(e)?.abort(),"cancel"),Bi=o(()=>Te.clear(),"clearHistory"),{dialogs:Ui}=RAT.app,_=o(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),wo=o(()=>!!_(),"available$1"),ko=["https","http"],rn=53317,xo="files:sync",xt=q(xo,{});let Se=k(null),$e=k([]),Tt=k(null),D=k([]),ie=k(Array.isArray(xt.targets)?xt.targets:[]),Ke=xt.folderName??"";const Wt=o(()=>V(xo,{folderName:Ke,targets:ie.value}),"persist");function _i(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const r=new URL(n.replace(/^filesync:\/\//,"http://")),i=r.searchParams.get("protocol");return{fingerprint:r.searchParams.get("fingerprint")??"",host:r.hostname,port:Number(r.port)||rn,protocol:ko.includes(i)?i:t}}catch{return null}const[a,l]=n.split(":");return{fingerprint:"",host:a,port:Number(l)||rn,protocol:t}}o(_i,"parseTarget");const sn=o(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),To=o((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget");function Wi(e){const t=ie.value.filter(n=>!To(n,e));ie.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),Wt()}o(Wi,"remember");function qi(e){ie.value=ie.value.filter(t=>!To(t,e)),Wt()}o(qi,"forget");let cn=!1;async function So(){const e=_();e&&(cn||(cn=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;$e.value=[t,...$e.value.filter(a=>(a.fingerprint||a.ip)!==n)]}),Tt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await qt())}o(So,"start");const Vi=o(()=>_()?.stopDiscovery().catch(()=>{}),"stop");function Eo(e){const t=new Set(D.value.map(n=>n.uri));D.value=[...D.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}o(Eo,"add");async function Gi(){const{files:e=[]}=await _().pickFiles();Eo(e)}o(Gi,"pickFiles");async function Ki(e,t,n){const a=await(await W(e,t)).getFileHandle(n.name),l=a._uri??(a.path?`file://${a.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");Eo([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}o(Ki,"addEntry");const Ji=o(e=>{D.value=D.value.filter(t=>t.uri!==e)},"remove"),Yi=o(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Xi(e,t=D.value,n=""){const a=_();if(!a||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return rt({icon:"lucide:send",label:`Send ${l} to ${sn(e)}`,lane:"send"},async({progress:r})=>{const i=await a.addListener("progress",s=>r(s.sent,s.total));try{const s=o(u=>a.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await s(n)}catch(u){if(!Yi(u))throw u;const v=await Ui.prompt({message:`${sn(e)} wants a pin`,ok:"Send",title:"Pin"});if(!v)throw new Error("no pin given");await s(v)}Wi(e),D.value=D.value.filter(u=>!t.includes(u))}finally{i.remove()}})}o(Xi,"send");async function qt(){const e=await _()?.getAutoSyncState().catch(()=>null)??null;Se.value=e&&{...e,name:e.tree?Ke:""}}o(qt,"refreshAutoSync");async function Qi(){const{name:e,uri:t}=await _().pickFolder();t&&(Ke=e??"",Se.value={...Se.value,name:Ke,tree:t},Wt())}o(Qi,"pickSyncFolder");async function Zi(e,{pin:t="",ssid:n=""}={}){const a=Se.value?.tree;if(!a)throw new Error("pick a folder first");await _().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:a}),await qt()}o(Zi,"startAutoSync");async function es(){await _().stopAutoSync(),await qt()}o(es,"stopAutoSync");const ts=o(()=>_()?.syncNow(),"syncNow");let A=k(null);const Ro=o((e,t)=>e.join("/")===t.join("/"),"samePath"),ns=o((e,t)=>e.length>=t.length&&Ro(e.slice(0,t.length),t),"isInside");function os(e,t,n,a){(A.value?.mode!==e||A.value.placed)&&(A.value=new xn({items:new At,mode:e,placed:!1})),A.value.items.drop({name:t.name,path:n}),A.value.items.push({kind:t.kind,name:t.name,path:n,root:a})}o(os,"pick$1");const as=o(()=>{A.value&&(A.value.placed=!0)},"placed"),Oo=o(()=>{A.value=null},"clear");async function un(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}o(un,"exists");async function ls(e,t,n){if(!await un(e,t))return t;const a=n==="file"?t.lastIndexOf("."):-1,l=a>0?t.slice(0,a):t,r=a>0?t.slice(a):"";for(let i=2;;i++){const s=`${l} (${i})${r}`;if(!await un(e,s))return s}}o(ls,"freeName");async function Ao(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await Ao(n);return t}o(Ao,"countFiles");async function rs(e,t){const n=await W(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)}o(rs,"handleOf");async function is(e,t,n){if(typeof e.move!="function")return!1;try{return await e.move(t,n),!0}catch{return!1}}o(is,"moved");async function ss(e,t,n,a,{onProgress:l=o(()=>{},"onProgress"),signal:r}={}){const i=[...t],s=i.find(E=>E.kind==="directory"&&ns(a,[...E.path,E.name]));if(s)throw new Error(`“${s.name}” can not go into itself`);const u=await W(e,a),v=await Promise.all(i.map(E=>rs(E.root??e,E))),h=await Promise.all(v.map(Ao)),y=h.reduce((E,F)=>E+F,0);let d=0;const O=o((E=1)=>l(d+=E,y),"report");l(0,y);for(const[E,F]of i.entries()){r?.throwIfAborted();const H=v[E],He=h[E];if(n==="move"&&Ro(F.path,a)){O(He);continue}const ve=await ls(u,F.name,F.kind);if(n==="move"&&await is(H,u,ve)){O(He);continue}F.kind==="directory"?await It(H,u,ve,r,O):(await Pt(H,u,ve,r),O()),n==="move"&&await(await W(F.root??e,F.path)).removeEntry(F.name,{recursive:!0})}}o(ss,"transfer");const{dialogs:Q,router:se}=RAT.app,cs={copy:"lucide:copy",move:"lucide:scissors"},us=["pattern-bg","pattern-tile"],ds={open:"auto","pattern-bg":"","pattern-tile":"",searchbar:"bottom",tabbar:"bottom",viewmode:"list"};let P=k(Object.fromEntries(Object.entries(ds).map(([e,t])=>[e,q(`files:${e}`,t)])));I(()=>{for(const[e,t]of Object.entries(P.value))V(`files:${e}`,t)});const No=o((e,t)=>{P.value={...P.value,[e]:t}},"setting");I(()=>{const e=document.documentElement;for(const t of us){const n=P.value[t];e.toggleAttribute(`data-${t}`,!!n),n&&ea(async()=>{const{patternStyle:a}=await import("./index-CF9kS3O3.js").then(l=>l.x);return{patternStyle:a}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:a})=>a(n,{name:t})).then(a=>{if(!(!a||we(()=>P.value[t])!==n))for(const[l,r]of Object.entries(a))e.style.setProperty(l,r)})}});const fs=o(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Co=o(()=>P.value.open==="single"||P.value.open==="auto"&&fs(),"opensOnTap");let te=k(null),Ee=k([]),j=k(null),oe=k(""),St=k(!1),Et=k(""),g=k(null),ce=k(null),be=k(null),Re=k(q("files:tabs",{index:0,list:[{path:[]}]}));I(()=>V("files:tabs",Re.value));const M=b(()=>Re.value.list?.length?Re.value.list:[{path:[]}]),z=b(()=>Math.min(Math.max(0,Re.value.index??0),M.value.length-1)),w=b(()=>M.value[z.value].path),he=b(()=>M.value[z.value].source??null),jo=new Map,Do=o(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function Z(e,t=z.value){Re.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}o(Z,"setTabs");function K(e,t){Z(M.value.map((n,a)=>a===z.value?{path:e,source:t===void 0?n.source??null:t}:n)),g.value=null,oe.value=""}o(K,"goTo");function Mo(e=w.value,t=he.value){const n=[...M.value,{path:e,source:t}];Z(n,n.length-1),g.value=null}o(Mo,"openTab");function ps(e){if(M.value.length===1)return K([]);Z(M.value.filter((t,n)=>n!==e),e<z.value?z.value-1:z.value)}o(ps,"closeTab");function ms(e){jo.set(z.value,Do()?.scrollTop??0),Z(M.value,e),g.value=null}o(ms,"switchTab");const dn=o(e=>e.path.at(-1)??it(e.source??null),"tabName"),Me=o(e=>e?Ei(e):X.value,"rootOfSource"),it=o(e=>e?ho(e)?.name??"remote":C.value?.name??"folder","sourceName"),st=o(()=>Me(he.value),"rootHandle"),Oe=o(()=>it(he.value),"folderName"),ue=o(e=>e.source!==void 0?e.source:e.path?null:he.value,"sourceOf");let ze=0;I(()=>{const e=st(),t=w.value,n=++ze;Ee.value=[],St.value=!!e,e&&Vr(e,t).then(a=>{n===ze&&(Ee.value=a,requestAnimationFrame(()=>{const l=Do();l&&(l.scrollTop=jo.get(we(()=>z.value))??0)}))}).catch(a=>{n===ze&&B.error(a)}).finally(()=>{n===ze&&(St.value=!1)})});let Rt=null;I(()=>{const e=X.value,t=C.value;!e||!t||Rt===t||(Rt=t,Di(t).then(()=>Fo(e,t)))});function Fo(e,t){return rt({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:a})=>{a.addEventListener("abort",()=>go());const l=I(()=>{G.value&&n(G.value.files,null)});return Mi(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}o(Fo,"indexFolder");const hs=o(()=>{X.value&&Fo(X.value,C.value)},"rescan"),vs=o((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(a=>a.name.toLowerCase().includes(n)):e},"matches"),fn=b(()=>vs(Ee.value,oe.value)),Ot=o(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ho=o((e,t)=>e.kind==="directory"?t&&lo([...t,e.name])?.icon||"lucide:folder":at.find(n=>n.id===re(e))?.icon??"lucide:file","iconOf");function de(e,t=w.value){if(e.kind==="directory")return K([...t,e.name]),se.go("/library");j.value={...e,kind:"file",path:e.path??t,source:ue(e)},se.go("/preview")}o(de,"open");function pn(e){K(e.path??[],ue(e)),se.go("/library")}o(pn,"showInFolder");function gs(e){if(Co())return de(e);g.value=e}o(gs,"onEntryClick");function Lo(e){ce.value=null,g.value=e,RAT.app.toggle("context",!0)}o(Lo,"about");function $s(){g.value=null,ce.value="tasks",RAT.app.toggle("context",!0)}o($s,"openTasks");async function ct(){const e=st();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(B.error("No permission to change this folder"),null)}o(ct,"writable");function Vt(e,t,n){const a=o(()=>t.join("/")===w.value.join("/"),"same");rt({...e,lane:"write"},n).then(()=>{a()&&K([...t])}).catch(B.error)}o(Vt,"writeTask");async function Po(){const e=await Q.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await ct();if(!t)return;const n=w.value;Vt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>Gr(t,n,e))}o(Po,"newFolder");async function bs(e){const t=await Q.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await ct();if(!n)return;const a=e.path??w.value;g.value=null,Vt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},a,()=>Jr(n,a,e.name,t,e.kind))}o(bs,"renameEntry");async function ys(e){if(!await Q.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await ct();if(!t)return;const n=e.path??w.value;g.value=null,RAT.app.toggle("context",!1),Vt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Kr(t,n,e.name))}o(ys,"deleteEntry");function mn(e,t){os(e,t,t.path??w.value,Me(ue(t))),RAT.app.toggle("context",!1)}o(mn,"pick");async function ws(){const e=A.value;if(!e)return;const t=await ct();if(!t)return;const n=e.items.toArray(),a=[...w.value],l=n.length===1?n[0].name:`${n.length} items`,r=e.mode==="move"?"move":"copy",i=cs[r];e.mode==="move"?Oo():as();const s=o(()=>{a.join("/")===w.value.join("/")&&K([...a])},"done");rt({icon:i,label:`${r} ${l} to /${a.join("/")}`,lane:"write"},({progress:u,signal:v})=>ss(t,n,e.mode,a,{onProgress:u,signal:v})).then(s).catch(u=>{u?.name!=="AbortError"&&B.error(u),s()})}o(ws,"paste");async function hn(e){const t=await Lt(Me(ue(e)),e.path??w.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}o(hn,"download");async function Je(){if(!no)return B.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await ei())return;Z([{path:[]}],0),se.go("/")}catch(e){B.error(e)}}o(Je,"chooseFolder");async function ks(){const{granted:e}=await ti();if(!e)return Je()}o(ks,"reconnect");async function xs(){await Q.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:Oe()})&&(await Fi(C.value),Rt=null,await ni(),Z([{path:[]}],0))}o(xs,"closeFolder");function Io(e){Mo([],e),se.go("/library")}o(Io,"openRemote");function Ts(){g.value=null,ce.value="remotes",RAT.app.toggle("context",!0)}o(Ts,"manageRemotes");async function Ss(e){if(!await Q.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await Si(e.id);const t=M.value.filter(n=>n.source!==e.id);Z(t.length?t:[{path:[]}],0)}o(Ss,"forgetRemote");function Es(e){Ki(X.value,e.path??w.value,e).then(()=>{RAT.app.toggle("context",!1),se.go("/sync")}).catch(B.error)}o(Es,"sendEntry");async function Rs(e){const t=await Q.prompt({message:"Name of the new foldertype",ok:"Next",title:"Foldertype"});if(!t)return;const n=await Q.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";yt(e,li({icon:n,label:t}))}o(Rs,"newFolderType");function Os(e){const t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[re(l)]=(n[re(l)]??0)+1;const a=Object.entries(n).sort((l,r)=>r[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:a&&a[1]/t.length>=.6?at.find(l=>l.id===a[0])?.label:null,size:t.reduce((l,r)=>l+r.size,0)}}o(Os,"factsOf");const Be=b(()=>Os(Ee.value)),vn=at.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),As=o((e,t)=>t.lastModified-e.lastModified,"newest"),Ns=b(()=>(S.value?.files??[]).filter(e=>re(e)===te.value).toSorted(As).slice(0,500)),Ue=b(()=>Hi(Et.value));let ye=null;const Fe=Yo(!1),zo=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Cs=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!zo;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ye=e,Fe.value=!0});addEventListener("appinstalled",()=>{ye=null,Fe.value=!1});async function js(){if(!ye)return!1;const e=ye;return ye=null,Fe.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(js,"install");function Ds(e){const t=`${e}:install-hint`,n=o(()=>{q(t)||(V(t,!0),B(`${e} can be installed: see the settings`))},"show");Fe.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}o(Ds,"hint");const Ms=864e5,Fs={day:"numeric",month:"short",year:"numeric"},Gt=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ye=o(e=>{const t=Gt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Fs)},"date"),Hs=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Ms;return n<0?Ye(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ye(t)},"ago"),Ls=o(e=>{const t=Gt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ye(t)},"since"),Ps=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),a=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${a}:${l}`:`${a}:${l}`},"duration"),Is=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),R={ago:Hs,bytes:Is,date:Ye,duration:Ps,since:Ls};function T(e,t){return zs.call({props:e},e,t)}o(T,"ActionRatHtml");function zs(e,t){return c`<button class="action" type="button" disabled=${()=>e.disabled} icon=${()=>e.icon} label=${()=>e.label} onclick=${m(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}o(zs,"$$ActionRatHtml");function qe(e,t){return Bs.call({props:e},e,t)}o(qe,"FactsRatHtml");function Bs(e,t){const n=b(()=>(e.rows??[]).filter(([,a])=>a!=null&&a!==""));return c`
    <dl.facts>
      ${x(()=>n.value,a=>a,a=>c`<dt>${()=>a[0]}</dt><dd>${()=>a[1]}</dd>`)}
    </dl>
  `}o(Bs,"$$FactsRatHtml");function Us(e,t){return _s.call({props:e},e,t)}o(Us,"RemoteManagerRatHtml");function _s(e,t){let n=k(null),a=k(!1);async function l(r){r.preventDefault();const i=r.target,s=o(u=>i.querySelector(`[name="${u}"]`)?.value??"","field");a.value=!0,n.value=null;try{const u=await Ti({name:s("name"),password:s("password"),url:s("url"),username:s("username")});i.reset?.(),Io(u.id),RAT.app.toggle("context",!1)}catch(u){n.value=u.message??String(u)}finally{a.value=!1}}return o(l,"add"),c`
    ${p(()=>Ge.value.length,()=>c`
        <ul.tasks>
          ${x(()=>Ge.value,r=>r,r=>c`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>r.name}</span><small>${()=>r.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+r.name} onclick=${m(()=>Ss(r))} />
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
  `}o(_s,"$$RemoteManagerRatHtml");function Bo(e,t){return Ws.call({props:e},e,t)}o(Bo,"StatusRatHtml");function Ws(e,t){return c`
    ${p(()=>G.value,()=>c`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>G.value.files} files</p>`,()=>p(()=>S.value,()=>c`<p.status>${()=>S.value.total} files · ${()=>R.bytes(S.value.size)} · read ${()=>R.date(S.value.scannedAt)}</p>`))}
  `}o(Ws,"$$StatusRatHtml");function qs(e,t){return Vs.call({props:e},e,t)}o(qs,"TaskListRatHtml");function Vs(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},a=o(s=>s.state==="queued"||s.state==="running","isOpen"),l=o(s=>{const{done:u,total:v}=s.progress??{};return s.state==="running"&&u!=null?v?`${Math.round(u/v*100)}%`:`${u}`:n[s.state]},"stateOf"),r=o(s=>s.error??[l(s),s.endedAt&&R.date(s.endedAt)].filter(Boolean).join(" · "),"noteOf");function i(s){return c`
      <li class=${()=>"task "+s.state}>
        <svg-icon icon=${()=>s.icon} />
        <span.text>
          <span.name>${()=>s.label}</span>
          <small>${()=>r(s)}</small>
          ${p(()=>s.state==="running"&&s.progress?.total,()=>c`<progress max=${()=>s.progress.total} value=${()=>s.progress.done} />`)}
        </span>
        ${p(()=>a(s),()=>c`<btn-icon icon="lucide:x" label=${()=>"cancel "+s.label} onclick=${m(()=>zi(s))} />`)}
      </li>
    `}return o(i,"row"),c`
    ${p(()=>kt.value.length,()=>c`
        <ul.tasks>
          ${x(()=>kt.value,s=>s,s=>c`${()=>i(s)}`)}
        </ul>
      `,()=>c`<p.empty>nothing to do</p>`)}
    ${p(()=>an.value.length,()=>c`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${m(Bi)} />
        </div-x>
        <ul.tasks>
          ${x(()=>an.value,s=>s,s=>c`${()=>i(s)}`)}
        </ul>
      `)}
  `}o(Vs,"$$TaskListRatHtml");function Gs(e,t){return Ks.call({props:e},e,t)}o(Gs,"ContextRatHtml");function Ks(e,t){const{$path:n}=Ct(RAT.app.router,{$path:null}),a=b(()=>!he.value),l=b(()=>w.value.length?ao(w.value):null),r=b(()=>w.value.length&&!l.value?ri(Ee.value,re):null),i=o(u=>yt(w.value,l.value===u?null:u),"toggleFolderType"),s=o(u=>"/"+(u.path??w.value).join("/"),"where");return c`
    ${p(()=>ce.value==="tasks",()=>c`<h2>Tasks</h2><${qs} />`,()=>p(()=>ce.value==="remotes",()=>c`<h2>Remote</h2><${Us} />`,()=>p(()=>g.value,()=>c`
            <h2>${()=>g.value.name}</h2>
            <${qe} ...${{get rows(){return[["name",g.value.name],["kind",g.value.kind==="directory"?"folder":g.value.type||"file"],["size",g.value.kind==="file"?R.bytes(g.value.size):null],["modified",g.value.lastModified?R.date(g.value.lastModified):null],["in",s(g.value)]]}}} />
            <div-x.actions>
              <${T} icon="lucide:arrow-up-right" label="open" ...${{onclick:o(()=>de(g.value,g.value.path??w.value),"onclick")}} />
              ${p(()=>g.value.path,()=>c`<${T} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>pn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file",()=>c`<${T} icon="lucide:download" label="download" ...${{onclick:o(()=>hn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file"&&!ue(g.value)&&wo(),()=>c`<${T} icon="lucide:send" label="send" ...${{onclick:o(()=>Es(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="directory"&&!ue(g.value),()=>c`<${T} ...${{get icon(){return Pe([...w.value,g.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return Pe([...w.value,g.value.name])?"remove bookmark":"bookmark"},onclick:o(()=>tn([...w.value,g.value.name],g.value.name),"onclick")}} />`)}
              <${T} icon="lucide:copy" label="copy" ...${{onclick:o(()=>mn("copy",g.value),"onclick")}} />
              <${T} icon="lucide:scissors" label="move" ...${{onclick:o(()=>mn("move",g.value),"onclick")}} />
              <${T} icon="lucide:pencil" label="rename" ...${{onclick:o(()=>bs(g.value),"onclick")}} />
              <${T} icon="lucide:trash-2" label="delete" ...${{onclick:o(()=>ys(g.value),"onclick")}} />
            </div-x>
          `,()=>p(()=>n.value==="/preview"&&j.value,()=>c`
              <h2>Details</h2>
              <${qe} ...${{get rows(){return[["name",j.value.name],["type",j.value.type||"unknown"],["size",R.bytes(j.value.size)],["dimensions",be.value?be.value.width+" × "+be.value.height:null],["modified",R.date(j.value.lastModified)],["in","/"+j.value.path.join("/")]]}}} />
              <div-x.actions>
                <${T} icon="lucide:download" label="download" ...${{onclick:o(()=>hn(j.value),"onclick")}} />
                <${T} icon="lucide:folder" label="show in folder" ...${{onclick:o(()=>pn(j.value),"onclick")}} />
              </div-x>
            `,()=>p(()=>n.value==="/library"&&st(),()=>c`
                <h2>This folder</h2>
                <${qe} ...${{get rows(){return[["folder",w.value.at(-1)??Oe()],["contains",Be.value.folders+" folders, "+Be.value.files+" files"],["size",R.bytes(Be.value.size)],["mostly",Be.value.mostly]]}}} />
                <div-x.actions>
                  <${T} icon="lucide:folder-plus" label="new folder" ...${{onclick:Po}} />
                  ${p(()=>w.value.length&&a.value,()=>c`<${T} ...${{get icon(){return Pe(w.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return Pe(w.value)?"remove bookmark":"bookmark"},onclick:o(()=>tn(w.value,w.value.at(-1)),"onclick")}} />`)}
                </div-x>
                ${p(()=>w.value.length&&a.value,()=>c`
                    <h3>Foldertype</h3>
                    ${p(()=>r.value,()=>c`<p.hint>Looks like ${()=>Bt[r.value].label}. <button.link type="button" onclick=${m(()=>yt(w.value,r.value))}>Make it one</button></p>`)}
                    <div-x.actions>
                      ${x(()=>Object.keys(_e.value),u=>u,u=>c`<button.action type="button" aria-pressed=${()=>String(l.value===u)} onclick=${m(()=>i(u))}><svg-icon icon=${()=>_e.value[u].icon} /> ${()=>_e.value[u].label}</button>`)}
                      <${T} icon="lucide:plus" label="new foldertype" ...${{onclick:o(()=>Rs(w.value),"onclick")}} />
                    </div-x>
                  `)}
              `,()=>c`
                <h2>${()=>it(null)}</h2>
                <${Bo} />
                <div-x.actions><${T} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!X.value||!!G.value},onclick:hs}} /></div-x>
              `)))))}
  `}o(Ks,"$$ContextRatHtml");function U(e,t){return Js.call({props:e},e,t)}o(U,"BarRatHtml");function Js(e,t){return c`
    <header.bar>
      ${p(()=>e.back,()=>c`<btn-icon icon="lucide:arrow-left" label="back" onclick=${m(e.back)} />`,()=>c`<btn-icon icon="lucide:menu" label="menu" onclick=${m(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${m(()=>RAT.app.toggle("config"))} />
    </header>
  `}o(Js,"$$BarRatHtml");function Kt(e,t){return Ys.call({props:e},e,t)}o(Kt,"ThumbRatHtml");function Ys(e,t){const n=e.entry,a=e.at??[],l=e.from??null,r=RAT.app.thumbnails,i=Ot(n)?`${l??we(()=>C.value)?.id}/${a.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let s=k(i?r.peekFile(i):null);function u(v){if(!i||s.value)return;let h=!0;const y=new IntersectionObserver(([d])=>{d.isIntersecting&&(y.disconnect(),r.requestFile(i,()=>Lt(Me(l),a,n.name)).then(O=>{h&&O&&(s.value=O)}))},{rootMargin:"200px"});return y.observe(v),()=>{h=!1,y.disconnect()}}return o(u,"watch"),c`
    <span.thumb ref=${Xo(u)}>
      ${p(()=>s.value,()=>c`<img src=${()=>s.value} alt="" loading="lazy" />`,()=>c`<svg-icon icon=${()=>Ho(n,l?null:e.at)} />`)}
    </span>
  `}o(Ys,"$$ThumbRatHtml");function gn(e,t){return Xs.call({props:e},e,t)}o(gn,"FileRowRatHtml");function Xs(e,t){const n=e.entry;return c`
    <li.row>
      <button.entry type="button" onclick=${m(()=>de(n))}>
        <${Kt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+R.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Lo({...n,kind:"file"}))} />
    </li>
  `}o(Xs,"$$FileRowRatHtml");function Xe(e,t){return Qs.call({props:e},e,t)}o(Xe,"SearchbarRatHtml");function Qs(e,t){const n=b(()=>kt.value.length);return c`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${m(a=>e.onsearch?.(a.detail.query))} />
      <button type="button" class=${()=>ln.value?"tasks-button busy":"tasks-button"} aria-label=${()=>n.value?`${n.value} tasks`:"tasks"} title=${()=>n.value?`${n.value} tasks`:"tasks"} onclick=${m($s)}>
        <svg-icon icon=${()=>ln.value?"lucide:loader":"lucide:list-checks"} />
        ${p(()=>n.value,()=>c`<span.badge>${()=>n.value}</span>`)}
      </button>
    </div>
  `}o(Qs,"$$SearchbarRatHtml");const Zs=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function ec(e,t){return tc.call({props:e},e,t)}o(ec,"LoadingRatHtml");function tc(e,t){return Nt("1tn1js8",Zs),c`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${p(()=>e.text,()=>c`<span>${()=>e.text}</span>`)}
    </div>
  `}o(tc,"$$LoadingRatHtml");function Uo(e,t){return nc.call({props:e},e,t)}o(Uo,"WelcomeRatHtml");function nc(e,t){return c`
    ${p(()=>!no,()=>c`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>p(()=>!Xr.value,()=>c`<${ec} />`,()=>p(()=>!C.value,()=>c`
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
              <button.action type="button" onclick=${m(ks)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}o(nc,"$$WelcomeRatHtml");function oc(e,t){return ac.call({props:e},e,t)}o(oc,"DashboardRatHtml");function ac(e,t){const n=o(d=>{K(d,null),RAT.app.router.go("/library")},"library"),a=o(()=>it(null),"folderName"),l=o(d=>Et.value=d,"search"),r=b(()=>!!X.value),i=b(()=>P.value.searchbar==="top"),s=b(()=>!!Et.value.trim()),u=b(()=>ii()),v=b(()=>vn.find(d=>d.id===te.value)?.label??te.value),h=o(d=>{try{return new URL(d).host}catch{return d}},"hostOf"),y=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return c`
    <${U} title="Files" />
    ${p(()=>r.value&&i.value,()=>c`<${Xe} ...${{get placeholder(){return"Search in "+a()},onsearch:l}} />`)}
    <div.scroll>
      ${p(()=>!r.value,()=>c`<${Uo} />`,()=>p(()=>s.value,()=>c`
            <section>
              <h2>${()=>Ue.value.length?"Found "+(Ue.value.length>=100?"100+":Ue.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${x(()=>Ue.value,d=>d,d=>c`<${gn} ...${{get entry(){return d}}} />`)}
              </ul>
            </section>
          `,()=>p(()=>te.value,()=>c`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${m(()=>te.value=null)} />
                  <h2>${()=>v.value}</h2>
                </div-x>
                <ul.rows>
                  ${x(()=>Ns.value,d=>d,d=>c`<${gn} ...${{get entry(){return d}}} />`)}
                </ul>
              </section>
            `,()=>c`
              ${p(()=>S.value?.recent?.length,()=>c`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${x(()=>S.value.recent,d=>d,d=>c`
                          <button.card type="button" onclick=${m(()=>de(d))}>
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
                              <svg-icon icon=${()=>lo(d.path)?.icon??"lucide:bookmark"} />
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
                  ${x(()=>vn,d=>d,d=>c`
                      <li>
                        <button.tile type="button" disabled=${()=>!S.value?.categories?.[d.id]?.count} onclick=${m(()=>te.value=d.id)}>
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
                <${Bo} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${x(()=>Ge.value,d=>d,d=>c`
                      <li>
                        <button.tile type="button" onclick=${m(()=>Io(d.id))}>
                          <svg-icon icon="lucide:cloud" />
                          <span.text>
                            <span.name>${()=>d.name}</span>
                            <small>${()=>h(d.url)}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                  <li>
                    <button.tile type="button" onclick=${m(Ts)}>
                      <svg-icon icon="lucide:cloud-cog" />
                      <span.text>
                        <span.name>WebDAV, Nextcloud</span>
                        <small>${()=>Ge.value.length?"add or remove":"connect a server"}</small>
                      </span>
                    </button>
                  </li>
                  ${x(()=>y,d=>d,d=>c`
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
    ${p(()=>r.value&&!i.value,()=>c`<${Xe} ...${{get placeholder(){return"Search in "+a()},onsearch:l}} />`)}
  `}o(ac,"$$DashboardRatHtml");function lc(e,t){return rc.call({props:e},e,t)}o(lc,"EntryRatHtml");function rc(e,t){const n=e.entry,a=we(()=>w.value),l=we(()=>he.value),r=b(()=>g.value?.name===n.name&&!g.value?.path),i=o(s=>{s.key==="Enter"&&!Co()&&(s.preventDefault(),de(n))},"onkeydown");return c`
    <data-item>
      <div.row class:selected=${()=>r.value}>
        <button.entry type="button" aria-pressed=${()=>r.value?"true":null} onclick=${m(()=>gs(n))} ondblclick=${m(()=>de(n))} onkeydown=${m(i)}>
          <${Kt} ...${{get entry(){return n},get at(){return a},get from(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?R.date(n.lastModified)+" · "+R.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Lo(n))} />
      </div>
    </data-item>
  `}o(rc,"$$EntryRatHtml");function ic(e,t){return sc.call({props:e},e,t)}o(ic,"PasteBarRatHtml");function sc(e,t){const n=b(()=>A.value?A.value.items.length===1?A.value.items.at(0).name:`${A.value.items.length} items`:"");return c`
    ${p(()=>A.value,()=>c`
        <div-x.pastebar>
          <svg-icon icon=${()=>A.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>n.value}</span>
            <small>${()=>A.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${m(ws)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the pickboard" onclick=${m(Oo)} />
        </div-x>
      `)}
  `}o(sc,"$$PasteBarRatHtml");function $n(e,t){return cc.call({props:e},e,t)}o($n,"TabsRatHtml");function cc(e,t){return c`
    <div-x.tabs role="tablist" scrollable>
      ${x(()=>M.value,n=>n,n=>c`
          <div class=${()=>M.value.indexOf(n)===z.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(M.value.indexOf(n)===z.value)} onclick=${m(()=>ms(M.value.indexOf(n)))}>${()=>dn(n)}</button>
            ${p(()=>M.value.length>1,()=>c`<btn-icon icon="lucide:x" label=${()=>"close "+dn(n)} onclick=${m(()=>ps(M.value.indexOf(n)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${m(()=>Mo())} />
    </div-x>
  `}o(cc,"$$TabsRatHtml");function uc(e,t){return dc.call({props:e},e,t)}o(uc,"LibraryRatHtml");function dc(e,t){const n=b(()=>!!st()),a=b(()=>P.value.viewmode),l=b(()=>P.value.tabbar==="top"),r=b(()=>P.value.searchbar==="top"),i=o(()=>w.value.length?K(w.value.slice(0,-1)):RAT.app.router.go("/"),"up"),s=o(()=>No("viewmode",a.value==="grid"?"list":"grid"),"toggle"),u=o(h=>K(h.detail.path.split("/").filter(Boolean)),"crumb"),v=o(h=>oe.value=h,"search");return c`
    ${p(()=>!n.value,()=>c`<${U} title="Library" /><div.scroll><${Uo} /></div>`,()=>c`
        <${U} ...${{get title(){return w.value.at(-1)??Oe()},get back(){return i}}}><btn-icon icon=${()=>a.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>a.value==="grid"?"show as list":"show as grid"} onclick=${m(s)} /></${U}>
        ${p(()=>l.value,()=>c`<${$n} />`)}
        ${p(()=>r.value,()=>c`<${Xe} placeholder="Filter this folder" ...${{get value(){return oe.value},onsearch:v}} />`)}
        <nav-crumbs root=${()=>Oe()} path=${()=>"/"+w.value.join("/")} onnav-crumbs=${m(u)} />
        <div.pane>
          <div.listing>
            ${p(()=>St.value,()=>c`<svg-icon icon="lucide:loader" />`,()=>p(()=>fn.value.length,()=>c`
                  <data-index viewmode=${()=>a.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${x(()=>fn.value,h=>h,h=>c`<${lc} ...${{get entry(){return h}}} />`)}
                  </data-index>
                `,()=>c`<p.empty>${()=>oe.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label|title="new folder" onclick=${m(Po)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${ic} />
        ${p(()=>!r.value,()=>c`<${Xe} placeholder="Filter this folder" ...${{get value(){return oe.value},onsearch:v}} />`)}
        ${p(()=>!l.value,()=>c`<${$n} />`)}
      `)}
  `}o(dc,"$$LibraryRatHtml");const fc=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function pc(e,t){return mc.call({props:e},e,t)}o(pc,"BrandRatHtml");function mc(e,t){return Nt("1npwj96",fc),c`
    <div.brand data-rat="1npwj96">
      ${p(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}o(mc,"$$BrandRatHtml");function hc(e,t){return vc.call({props:e},e,t)}o(hc,"MenuRatHtml");function vc(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],a=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:l}=Ct(RAT.app.router,{$path:null});function r(i){RAT.app.router.go(i);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return o(r,"go"),c`
    <nav.menu>
      <${pc} name="Files" icon="./app.svg" />
      ${x(()=>n,i=>i,i=>c`<button type="button" aria-current=${()=>l.value===i.route?"page":null} onclick=${m(()=>r(i.route))}><svg-icon icon=${()=>i.icon} /> ${()=>i.label}</button>`)}
      <hr />
      ${x(()=>a,i=>i,i=>c`<button type="button" disabled><svg-icon icon=${()=>i.icon} /> ${()=>i.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${m(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}o(vc,"$$MenuRatHtml");function gc(e,t){return $c.call({props:e},e,t)}o(gc,"PreferencesRatHtml");function $c(e,t){const n={"pattern-bg":"Background","pattern-tile":"Tiles"},a={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=o((r,i)=>No(r,i.detail?.value??i.target.value),"change");return c`
    <section>
      <h3>files</h3>
      ${x(()=>Object.keys(a),r=>r,r=>c`
          <label>
            <span>${()=>a[r].label}</span>
            <input-value look="segments" value=${()=>P.value[r]} onchange=${m(i=>l(r,i))}>
              ${x(()=>a[r].values,i=>i,i=>c`<input-option value=${()=>i[0]}>${()=>i[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${x(()=>Object.keys(n),r=>r,r=>c`
          <label>
            <span>${()=>n[r]}</span>
            <input-pattern opacity value=${()=>P.value[r]} onchange=${m(i=>l(r,i))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${p(()=>C.value,()=>c`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>C.value.name}</p>
          <div-x.actions>
            <${T} icon="lucide:folder-sync" label="change" ...${{onclick:Je}} />
            <${T} icon="lucide:x" label="close" ...${{onclick:xs}} />
          </div-x>
        `,()=>c`<${T} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Je}} />`)}
    </section>
  `}o($c,"$$PreferencesRatHtml");function bc(e,t){return yc.call({props:e},e,t)}o(bc,"PreviewRatHtml");function yc(e,t){let n=k(null);I(()=>{const r=j.value;if(be.value=null,n.value=null,!r||!Ot(r))return;let i=null,s=!0;return Lt(Me(r.source),r.path,r.name).then(u=>{s&&(n.value=i=URL.createObjectURL(u))}),()=>{s=!1,i&&URL.revokeObjectURL(i)}});const a=o(r=>be.value={height:r.target.naturalHeight,width:r.target.naturalWidth},"loaded"),l=o(()=>{g.value=null,RAT.app.toggle("context")},"info");return c`
    ${p(()=>!j.value,()=>c`
        <${U} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>c`
        <${U} ...${{get title(){return j.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${m(l)} /></${U}>
        <div.stage>
          ${p(()=>Ot(j.value),()=>c`
              ${p(()=>n.value,()=>c`<img src=${()=>n.value} alt=${()=>j.value.name} onload=${m(a)} />`)}
            `,()=>c`<svg-icon icon=${()=>Ho(j.value)} />`)}
        </div>
      `)}
  `}o(yc,"$$PreviewRatHtml");const _o=`appearance:${new URL(".",location.href).pathname}`,bn={density:ae.densities,geometry:ae.geometries,mode:ae.modes},Ae=q(_o,{}),wc=o(()=>ae.palettes().catch(()=>[]),"palettes");function kc(e,t){return Ae[e]=t||null,V(_o,Ae),ae.set({[e]:t||null})}o(kc,"setAppearance");Object.keys(Ae).length&&ae.set(Ae);const xc=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function yn(e,t){return Tc.call({props:e},e,t)}o(yn,"SettingsRatHtml");function Tc(e,t){Nt("177zzh1",xc);let n=k({...Ae}),a=k([]);const l=b(()=>Fe.value);wc().then(s=>{a.value=s});function r(s,u){const v=u.detail?.value??u.target.value;n.value={...n.value,[s]:v},kc(s,v)}o(r,"change");async function i(){await js()&&B.success(`${e.name??"the app"} is installed`)}return o(i,"installApp"),c`
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
        ${x(()=>Object.keys(bn),s=>s,s=>c`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${m(u=>r(s,u))}>
                ${x(()=>bn[s],u=>u,u=>c`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${p(()=>!zo,()=>c`
          <section>
            <h3>install</h3>
            ${p(()=>l.value,()=>c`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${m(i)} />`,()=>c`
                ${p(()=>Cs,()=>c`<p.hint>Share, then "Add to Home Screen".</p>`,()=>c`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o(Tc,"$$SettingsRatHtml");function Sc(e,t){return Ec.call({props:e},e,t)}o(Sc,"SyncRatHtml");function Ec(e,t){let n=k(null),a=k(""),l=k("https"),r=k(""),i=k("");const s=o(f=>`${f.host}:${f.port}`,"keyOf"),u=o(()=>n.value??_i(a.value,l.value),"target"),v=b(()=>ie.value.filter(f=>!$e.value.some(ee=>s({host:ee.ip,port:ee.port})===s(f)))),h=b(()=>D.value.reduce((f,ee)=>f+Math.max(0,ee.size),0)),y=b(()=>Se.value??{}),d=b(()=>u()),O=o(f=>f.ip??f.host,"hostOf"),E=o(f=>!!d.value&&s(d.value)===s({host:O(f),port:f.port??53317}),"isChosen"),F=o(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),H=o(f=>Promise.resolve().then(f).catch(B.error),"run");function He(f){n.value={alias:f.alias,fingerprint:f.fingerprint??"",host:O(f),port:f.port??53317,protocol:f.protocol??"https"},a.value=""}o(He,"choose");function ve(f){l.value=f.detail?.value??f.target.value,n.value&&(n.value={...n.value,protocol:l.value})}o(ve,"protocol");function ut(f,ee,Wo){return c`
      <li class=${()=>E(f)?"row selected":"row"}>
        <button.entry type="button" aria-pressed=${()=>String(E(f))} onclick=${m(()=>He(f))}>
          <span.thumb><svg-icon icon=${()=>ee} /></span>
          <span.text>
            <span.name>${()=>f.alias??O(f)}</span>
            <small>${()=>O(f)}:${()=>f.port??53317} · ${()=>f.protocol??"https"}</small>
          </span>
        </button>
        ${p(()=>Wo,()=>c`<btn-icon icon="lucide:x" label=${()=>"forget "+(f.alias??O(f))} onclick=${m(()=>qi(f))} />`)}
      </li>
    `}return o(ut,"receiver"),c`
    ${p(()=>!wo(),()=>c`
        <${U} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>c`
        <${U} title="Send">
          ${p(()=>Tt.value,()=>c`<small.identity>${()=>Tt.value.alias}</small>`)}
        </${U}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${m(So)} />
            </div-x>
            ${p(()=>$e.value.length||v.value.length,()=>c`
                <ul.rows>
                  ${x(()=>$e.value,f=>f,f=>c`${()=>ut(f,F(f),!1)}`)}
                  ${x(()=>v.value,f=>f,f=>c`${()=>ut(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>c`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>a.value} oninput=${m(f=>{a.value=f.target.value??"",n.value=null})} />
              <input-value look="segments" value=${()=>d.value?.protocol??l.value} onchange=${m(ve)}>
                ${x(()=>ko,f=>f,f=>c`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" value=${()=>r.value} oninput=${m(f=>r.value=f.target.value??"")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${p(()=>D.value.length,()=>c`
                <ul.rows>
                  ${x(()=>D.value,f=>f,f=>c`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>f.size>=0?R.bytes(f.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${m(()=>Ji(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>c`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${T} icon="lucide:file-plus" label="pick files" ...${{onclick:o(()=>H(Gi),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!D.value.length||!d.value} onclick=${m(()=>H(()=>Xi(u(),D.value,r.value)))}><svg-icon icon="lucide:send" /> send${()=>D.value.length?` ${D.value.length} · ${R.bytes(h.value)}`:""}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${qe} ...${{get rows(){return[["folder",y.value.name||(y.value.tree?"chosen":"none yet")],["state",y.value.enabled?"on"+(y.value.lastSync?" · last "+R.date(y.value.lastSync):""):"off"],["to",y.value.enabled?y.value.host+":"+y.value.port:null]]}}} />
            ${p(()=>!y.value.enabled,()=>c`<input-text placeholder="only on this wi-fi (ssid), optional" value=${()=>i.value} oninput=${m(f=>i.value=f.target.value??"")} />`)}
            <div-x.actions>
              <${T} icon="lucide:folder-search" label="folder" ...${{onclick:o(()=>H(Qi),"onclick")}} />
              ${p(()=>y.value.enabled,()=>c`
                  <${T} icon="lucide:refresh-cw" label="now" ...${{onclick:o(()=>H(ts),"onclick")}} />
                  <${T} icon="lucide:pause" label="turn off" ...${{onclick:o(()=>H(es),"onclick")}} />
                `,()=>c`<${T} icon="lucide:play" label="turn on" ...${{get disabled(){return!y.value.tree||!d.value},onclick:o(()=>H(()=>Zi(u(),{pin:r.value,ssid:i.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}o(Ec,"$$SyncRatHtml");function Lc(e,t){return Rc.call({props:e},e,t)}o(Lc,"AppRatHtml");function Rc(e,t){RAT.app.hold(Zr().catch(B.error)),Ds("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&So(),l!=="/sync"&&n&&Vi(),n=l==="/sync"}),c`
    <rat-area name="menu" dock="start"><${hc} /></rat-area>
    <rat-view name="dashboard" route="/"><${oc} /></rat-view>
    <rat-view name|route="library"><${uc} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${bc} /></rat-view>
    <rat-view name|route="sync"><${Sc} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${m(o(l=>{l.detail?.open||(ce.value=null)},"ontoggle"))}><div.context><${Gs} /></div></rat-area>
    <rat-area name="config" dock="end"><${yn} name="Files"><${gc} /></${yn}></rat-area>
  `}o(Rc,"$$AppRatHtml");export{Lc as default};
