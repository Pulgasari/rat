const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-L3zh7JKz.js","./preload-helper-Cc2_yIPf.js","./withControl-saxu6q3w.js","./index-CgHh2HpB.js","./index-LJN-aEqT.css"])))=>i.map(i=>d[i]);
var Wa=Object.defineProperty;var a=(e,t)=>Wa(e,"name",{value:t,configurable:!0});import{i as qa,e as k,f as Va,r as Jt,P as Ka,g as w,h as z,u as X,s as Ga,j as Ya,k as Rt,m as oe}from"./index-L3zh7JKz.js";import{p as Ja,a as Xa}from"./keys-CWTtq0D5.js";import{_ as Qa}from"./preload-helper-Cc2_yIPf.js";import{r as $,b as xn,g as Za}from"./index-CgHh2HpB.js";import{t as Ce,n as Xt,p as Sn,q as Tn,r as eo,u as to,v as En,x as no,y as ao,B as oo,z as Rn,D as lo,E as An,F as io,G as ro,H as so,I as co,J as uo,K as On,L as je,M as fo,N as st,h as c,f as x,w as p}from"./withControl-saxu6q3w.js";import{isCheckable as Nn,isMultiSelect as Cn,isArray as mt,isString as Qe,isObject as jn,isFn as Dn,isElementish as po,isIterable as mo}from"https://esm.sh/jsr/@pulgasari/is";import{toKebabCase as Mn,toCamelCase as Hn}from"https://esm.sh/jsr/@pulgasari/str";import{d as ho}from"./drivers-BlkDI-PG.js";import"https://esm.sh/jsr/@pulgasari/logger";function Pn(e,t){const n={};for(const o of Object.keys(t)){const l=e?.[o],i=t[o];n[o]=qa(l)?l:k(()=>e[o]===void 0&&i?i():e[o])}return new Proxy(e??{},{get:a((o,l)=>Object.hasOwn(n,l)?n[l]:o[l],"get")})}a(Pn,"signalsOf");function m(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const l=t?Ja(t):null;let i=o;return function(r){if(!(o&&!i)&&!(l&&!Xa(r,l))){n&&r.preventDefault(),o&&i--;try{const s=(typeof e=="string"?Va(e):e).call(this,r);typeof s?.catch=="function"&&s.catch(u=>Jt(this,u))}catch(s){Jt(this,s)}}}}a(m,"listener");function vo(e,...t){const n=$(e);if(!n)return null;const o=Ce(t);return o.length&&n.classList.add(...o),n}a(vo,"addClass$1");function go(e,t){const n=$(e);return n?t?n.getAttribute(Mn(t)):Object.fromEntries([...n.attributes].map(o=>[o.name,o.value])):t?null:{}}a(go,"getAttr");function $o(e,t,{cast:n=!0}={}){const o=$(e);if(!o)return t?null:{};if(t){const i=o.dataset[Hn(t)];return i===void 0?null:n?Xt(i):i}const l={};for(const[i,r]of Object.entries(o.dataset))l[i]=n?Xt(r):r;return l}a($o,"getData");function bo(e,{box:t="border"}={}){const n=$(e);if(!n)return null;if(t==="content")return{width:n.clientWidth,height:n.clientHeight};if(t==="scroll")return{width:n.scrollWidth,height:n.scrollHeight};const o=n.getBoundingClientRect();return{width:o.width,height:o.height}}a(bo,"getElementSize");function wo(e){return $(e)?.innerHTML??null}a(wo,"getHTML");const yo=a(e=>e.startsWith("--"),"isVar"),ko=a(e=>yo(e)?e:Mn(e),"propertyName");function xo(e,t,n=!1){const o=$(e);if(!o)return null;const l=n?o.style:getComputedStyle(o);return t?l.getPropertyValue(ko(t)).trim()||null:l}a(xo,"getStyle");function So(e){return $(e)?.textContent??null}a(So,"getText");const Qt={bool:a(e=>!!(mt(e)?e.length:e),"bool"),date:a(e=>Tn(e),"date"),number:a(e=>Sn(e)??0,"number"),string:a(e=>mt(e)?e.join(", "):String(e??""),"string")},To=new Set(["button","data","input","meter","option","output","progress","select","textarea"]),Eo=a(e=>To.has(e.localName)||e.localName?.includes("-")&&"value"in e,"hasValue");function Fn(e,t=null){const n=$(e);if(!n)return null;const o=Nn(n)?n.checked:Cn(n)?[...n.selectedOptions].map(l=>l.value):Eo(n)?n.value:n.textContent??"";return t&&Qt[t]?Qt[t](o):o}a(Fn,"getValue");function Ro(e,t){const n=$(e);if(!n)return!1;const o=Ce(t);return o.length>0&&o.every(l=>n.classList.contains(l))}a(Ro,"hasClass$1");function Ao(e,...t){const n=$(e);if(!n)return null;const o=Ce(t);return o.length&&n.classList.remove(...o),n}a(Ao,"removeClass$1");function Oo(e,t){const n=$(e);return n?(n.setAttribute("class",Ce(t).join(" ")),n):null}a(Oo,"setClass");const No=a(e=>Qe(e)?e:jn(e)||mt(e)?JSON.stringify(e):String(e),"encode");function Co(e,t,n){const o=$(e);if(!o)return null;const l=Qe(t)?{[t]:n}:t??{};for(const[i,r]of Object.entries(l)){const s=Hn(i);r==null?delete o.dataset[s]:o.dataset[s]=No(r)}return o}a(Co,"setData");function jo(e){const t=document.createElement("template");return t.innerHTML=String(e).trim(),t.content}a(jo,"createHTML");function Do(e,t){const n=$(e);return n?(n.replaceChildren(jo(t??"")),n):null}a(Do,"setHTML");function Mo(e,t){const n=$(e);return n?(n.textContent=t==null?"":String(t),n):null}a(Mo,"setText");function Ho(e){e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}a(Ho,"notifyChange");function Po(e,t,{notify:n=!1}={}){const o=$(e);if(!o)return null;if(Nn(o))o.checked=!!t;else if(Cn(o)){const l=eo(t).map(String);for(const i of o.options)i.selected=l.includes(i.value)}else"value"in o?o.value=t instanceof Date&&o.type==="date"?to(t):t??"":o.textContent=t??"";return n&&Ho(o),o}a(Po,"setValue");function Fo(e,t,n){const o=$(e);if(!o)return null;if(jn(t)){for(const[l,i]of Object.entries(t))o.classList.toggle(l,!!i);return o}for(const l of Ce(t))o.classList.toggle(l,n);return o}a(Fo,"toggleClass$1");const Ln=Symbol.for("domina.chain"),zn=a(e=>t=>typeof t===e,"isTypeOf"),Lo=a(e=>e==null||e==="","isBlank"),Ze=a(e=>e?.[Ln]===!0,"isChain"),pe=zn("function"),Bn=a(e=>e!==null&&typeof e=="object"&&[Object.prototype,null].includes(Object.getPrototypeOf(e)),"isPlainObject"),zo=zn("string"),Bo=a(e=>typeof e?.addEventListener=="function","isTarget"),Io=a(e=>typeof e?.[Symbol.iterator]=="function","hasIterator"),In=a(e=>e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),"toCamelCase"),At=a(e=>e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),"toKebabCase"),_n={};_n.ERROR=e=>{throw new TypeError("[domina] "+e)};const et=a((e,t)=>Bn(e)?Object.entries(e):[[e,t]],"entriesOf"),_o={params:{name:"string",value:"string"},read:a((e,t)=>go(e,t),"read"),write:a((e,t,n)=>{for(const[o,l]of et(t,n))At(o).startsWith("aria-")?Un(e,o,l):no(e,o,l)},"write")},ht=a(e=>{const t=At(e);return t.startsWith("aria-")?t:`aria-${t}`},"ariaName");function Un(e,t,n){n==null?e.removeAttribute(ht(t)):e.setAttribute(ht(t),Array.isArray(n)?n.join(" "):String(n))}a(Un,"writeAria");function Uo(e){const t=e.getAttributeNames().filter(n=>n.startsWith("aria-"));return Object.fromEntries(t.map(n=>[In(n.slice(5)),e.getAttribute(n)]))}a(Uo,"readAria");const Wo={params:{name:"string",value:"string"},read:a((e,t)=>t==null?Uo(e):e.getAttribute(ht(t)),"read"),write:a((e,t,n)=>{for(const[o,l]of et(t,n))Un(e,o,l)},"write")},Se=a(e=>{const t=At(e);return In(t.startsWith("data-")?t.slice(5):t)},"dataKey"),Wn=a((e,t)=>{delete e.dataset[Se(t)]},"removeData"),qo={params:{name:"string",value:"json"},read:a((e,t)=>$o(e,t==null?void 0:Se(t)),"read"),write:a((e,t,n)=>{for(const[o,l]of et(t,n))l==null?Wn(e,o):Co(e,Se(o),l)},"write")},Vo={params:{name:"string",value:"string"},read:a((e,t)=>t==null?{...e.dataset}:e.dataset[Se(t)]??null,"read"),write:a((e,t,n)=>{for(const[o,l]of et(t,n))l==null?Wn(e,o):e.dataset[Se(o)]=l},"write")},Ko={write:vo,params:{names:"string"}},Go={write:Ao,params:{names:"string"}},Yo={write:Fo,params:{names:"string",force:"bool"}},Jo={read:Ro,params:{names:"string"}},Xo={params:{names:"string"},read:a(e=>[...e.classList],"read"),write:Oo},Qo={read:wo,write:Do,params:{html:"html"}},Zo={read:xo,write:En,params:{property:"string",value:"string"}},el={read:So,write:Mo,params:{text:"string"}},tl={read:Fn,write:Po,params:{value:"json"},reads:a(e=>e.length===0,"reads")},nl=a(e=>Object.keys(e).every(t=>t==="box"),"onlyBox"),al={object:!0,params:{w:"number",h:"number",box:"string"},reads:a(([e])=>e==null||nl(e),"reads"),read(e,{box:t}={}){const n=bo(e,{box:t});return n&&{h:n.height,w:n.width}},write(e,{h:t,w:n}){const o={};n!==void 0&&(o.width=n),t!==void 0&&(o.height=t),En(e,o)}},ol=Object.freeze(Object.defineProperty({__proto__:null,addClass:Ko,aria:Wo,attr:_o,class:Xo,data:qo,dataset:Vo,hasClass:Jo,html:Qo,removeClass:Go,size:al,style:Zo,text:el,toggleClass:Yo,value:tl},Symbol.toStringTag,{value:"Module"}));function ll(e,t,n,o,l){const i=$(e),r=ao(t).map(h=>oo[h]??h);if(!i||!r.length||!Dn(o))return()=>{};const s=n.includes(":scope"),u=a(h=>{if(!s)return h?.closest?.(n);const v=new Set(i.querySelectorAll(n));for(let d=h;d&&d!==i;d=d.parentNode)if(v.has(d))return d;return null},"matchOf"),b=a(h=>{const v=u(h.target);v&&i.contains(v)&&o.call(v,h,v)},"listener");for(const h of r)i.addEventListener(h,b,l);return()=>{for(const h of r)i.removeEventListener(h,b,l)}}a(ll,"delegateEvent");const vt=new WeakMap,qn=a(e=>String(e??"").split(/[\s,]+/).filter(Boolean),"typesOf");function il(e){let t=vt.get(e);return t||vt.set(e,t=new Set),t}a(il,"recordsOf");function rl(e,t,n,o,l,i){const r=il(e),s={handler:o,selector:n,stop:null,type:t},u=a(()=>{s.stop(),r.delete(s)},"drop"),b=a((h,v)=>{i&&u(),o(h,v)},"call");return s.stop=n?ll(e,t,n,b,l):Rn(e,t,h=>b(h,e),l),r.add(s),l?.signal?.addEventListener("abort",()=>r.delete(s),{once:!0}),u}a(rl,"add$2");function sl(e,t,n,o,l,{once:i=!1}={}){if(!pe(o))throw new TypeError("[domina] the handler is not a function");if(l?.signal?.aborted)return()=>{};const r=qn(t).map(s=>rl(e,s,n||null,o,l,i));return()=>{for(const s of r)s()}}a(sl,"listen");function cl(e,t,n){const o=vt.get(e);if(!o)return;const l=t?new Set(qn(t)):null;for(const i of o)l&&!l.has(i.type)||n&&i.handler!==n||(i.stop(),o.delete(i))}a(cl,"unlisten");function Vn(e,t,n){const[o,l,i,r]=typeof t[1]=="function"?[t[0],null,...t.slice(1)]:t;for(const s of e.elements)sl(s,o,l,i,r,{once:n});return e}a(Vn,"subscribe");const ul={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Vn(this,e,!1)}},dl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Vn(this,e,!0)}},fl={kind:"event",params:{types:"string",handler:"function"},method(e,t){for(const n of this.elements)cl(n,e,t);return this}},pl={kind:"event",params:{type:"string",detail:"json"},write:a((e,t,n,o)=>lo(e,t,n,o),"write")},ml=Object.freeze(Object.defineProperty({__proto__:null,emit:pl,off:fl,on:ul,once:dl},Symbol.toStringTag,{value:"Module"}));function hl(e){return $(e)?.replaceChildren()??null}a(hl,"clearElement");function vl(e,t=!0){return $(e)?.cloneNode(t)??null}a(vl,"cloneElement");function gl(e,t,...n){const o=$(e);if(!o)return null;const l=An(n);if(!l.length)return o;const i=o.children,r=t<0?i.length+t:t,s=i[Math.max(0,Math.min(r,i.length))]??null;return s?s.before(...l):o.append(...l),o}a(gl,"insertAt");function $l(...e){const t=[];for(const n of e.flat(1/0)){const o=$(n);o&&(o.remove(),t.push(o))}return t}a($l,"removeElement");function bl(e,...t){const n=$(e);if(!n?.parentNode)return null;const o=An(t);return n.replaceWith(...o),o}a(bl,"replaceElement");const wl="auto-asc",yl=/[̀-ͯ]/g,kl=/\d+/g,xl=/^[\x00-\x7f]*$/,Zt=a(e=>{let t=String(e);return xl.test(t)||(t=t.normalize("NFD").replace(yl,"")),t.toLowerCase().replace(kl,n=>n.padStart(16,"0"))},"textKey"),en=a(e=>Tn(e)?.getTime()??null,"dateKey"),tn={date:a(e=>e.map(en),"date"),num:a(e=>e.map(Sn),"num"),regular:a(e=>e.map(Zt),"regular"),auto:a(e=>{const t=e.map(en);return t.every((n,o)=>n!==null||e[o]==="")&&t.some(n=>n!==null)?t:e.map(Zt)},"auto")},Sl=a((e,t,n)=>e===null&&t===null?0:e===null?1:t===null?-1:e<t?-n:e>t?n:0,"compareKeys");function Tl({selector:e,order:t},n){const o=e?xn(e):null,l=n.map(s=>Fn(o?s.querySelector(o):s)??"");if(Dn(t))return{values:l,order:t};const[i,r]=t.includes("-")?t.split("-"):["auto",t];return{keys:(tn[i]??tn.auto)(l),dir:r==="desc"?-1:1}}a(Tl,"column");function El({container:e,item:t,indicators:n}){const o=io("sortElements",e,t);if(!o)return[];const{$container:l,items:i}=o,r=ro(n,co(wl));if(r.some(s=>s.order==="random"))so(i);else{const s=r.map(h=>Tl(h,i)),u=i.map((h,v)=>v);u.sort((h,v)=>{for(const{dir:d,keys:E,order:J,values:q}of s){const _=J?J(q[h],q[v],i[h],i[v]):Sl(E[h],E[v],d);if(_)return _}return 0});const b=u.map(h=>i[h]);i.splice(0,i.length,...b)}return l.append(...i),i}a(El,"sortElements");function Rl(e){const t=$(e);if(!t?.parentNode)return null;const n=[...t.childNodes];return t.replaceWith(...n),n}a(Rl,"unwrapElement");function Al(e,t="div",n={}){const o=$(e);if(!o?.parentNode)return null;const l=Qe(t)?uo(t,n):$(t);return l?(o.replaceWith(l),l.append(o),l):null}a(Al,"wrapElement");const Ol=a((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder$1"),Kn=a(e=>e.length<2?e:[...new Set(e)],"unique");function ct(e,t){try{return e.querySelectorAll?Array.from(e.querySelectorAll(t)):[]}catch{return[]}}a(ct,"select");function Nl(e,t){if(t==null)return ct(document,e);const n=me(t);return n.length===1?ct(n[0],e):Kn(n.flatMap(o=>ct(o,e))).sort(Ol)}a(Nl,"query");function me(e,t){return Lo(e)?[]:zo(e)?Nl(e,t):Ze(e)?e.elements:Bo(e)?[e]:Io(e)?Kn(Array.from(e,n=>me(n)).flat()):[]}a(me,"collect");class N{static{a(this,"Chain")}constructor(t,n=!1){this.elements=t,this.many=n}get[Ln](){return!0}get length(){return this.elements.length}get el(){return this.elements[0]??null}get all(){return this.many?this:new N(this.elements,!0)}[Symbol.iterator](){return this.elements[Symbol.iterator]()}each(t){return this.elements.forEach(t),this}map(t){return this.elements.map(t)}}const Gn=a(e=>e?.nodeType===1,"isElement");function Ot(e,t,n){return e.flatMap(a(function o(l){return pe(l)?o(l(t,n)):l==null||l===!1?[]:Array.isArray(l)?l.flatMap(o):Ze(l)?l.elements:[l]},"resolve"))}a(Ot,"contentFor");function Nt(e,t,n){t.length<2||n.some(o=>Ze(o)||o?.nodeType)&&_n.ERROR(`${e}(): one node cannot go to ${t.length} places. pass a string, or a function (element, index) -> node`)}a(Nt,"assertPlaceable");const tt=a(e=>({kind:"structure",params:{content:"string"},method(...t){return Nt(e,this,t),this.elements.forEach((n,o)=>n[e](...Ot(t,n,o))),this}}),"placing"),Cl=tt("append"),jl=tt("prepend"),Dl=tt("before"),Ml=tt("after"),Hl={kind:"structure",params:{index:"number",content:"string"},method(e,...t){return Nt("insert",this,t),this.elements.forEach((n,o)=>gl(n,e,...Ot(t,n,o))),this}},Yn=a(e=>({kind:"structure",params:{target:"string"},method(t){const[n]=me(t);return n&&n[e](...this.elements),this}}),"moving"),Pl=Yn("append"),Fl=Yn("prepend"),Ll={kind:"structure",params:{content:"string"},method(...e){Nt("replace",this,e);const t=this.elements.flatMap((n,o)=>bl(n,...Ot(e,n,o))??[]);return new N(t.filter(Gn),this.many)}},zl={kind:"structure",params:{tag:"string",props:"json"},method(e="div",t={}){const n=this.elements.map((o,l)=>Al(o,pe(e)?e(o,l):e,t));return new N(n.filter(Boolean),this.many)}},Bl={kind:"structure",params:{},method(){const e=this.elements.flatMap(t=>Rl(t)??[]);return new N(e.filter(Gn),this.many)}},Il={kind:"structure",params:{},write:a(e=>{hl(e)},"write")},_l={kind:"structure",params:{},method(){return $l(this.elements),this}},Ul={kind:"structure",params:{deep:"bool"},method(e=!0){return new N(this.elements.map(t=>vl(t,e)),this.many)}},Wl={kind:"structure",params:{item:"string",by:"string"},method(e,...t){for(const n of this.elements)El({container:n,indicators:t.length?t:[{}],item:e});return this}},ql=Object.freeze(Object.defineProperty({__proto__:null,after:Ml,append:Cl,appendTo:Pl,before:Dl,clear:Il,clone:Ul,insert:Hl,prepend:jl,prependTo:Fl,remove:_l,replace:Ll,sort:Wl,unwrap:Bl,wrap:zl},Symbol.toStringTag,{value:"Module"}));function Vl(e,t){const n=$(e);if(!n)return[];const o=On(t);return[...n.children].filter(o)}a(Vl,"getChildren");function Kl(e,t){return $(e)?.closest(xn(t))??null}a(Kl,"getClosest");function Gl(e){const t=$(e);return t?.parentElement?[...t.parentElement.children].indexOf(t):-1}a(Gl,"getIndex");function Yl(e,t){return je($(e),"nextElementSibling",t,!1)[0]??null}a(Yl,"getNext");function Jl(e,t){return je($(e),"nextElementSibling",t,!0)}a(Jl,"getNextAll");function Xl(e,t){const n=$(e)?.parentElement??null;return n&&fo(n,t)?n:null}a(Xl,"getParent");function Ql(e,t){return je($(e),"parentElement",t,!0)}a(Ql,"getParents");function Zl(e,t){return je($(e),"previousElementSibling",t,!1)[0]??null}a(Zl,"getPrev");function ei(e,t){return je($(e),"previousElementSibling",t,!0)}a(ei,"getPrevAll");function ti(e,t){const n=$(e);if(!n?.parentElement)return[];const o=On(t);return[...n.parentElement.children].filter(l=>l!==n&&o(l))}a(ti,"getSiblings");const ni=a((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder");function Ct(e,t){const n=e.elements.flatMap(l=>[].concat(t(l)??[])),o=n.length<2?n:[...new Set(n)].sort(ni);return new N(o,e.many)}a(Ct,"step");const jt=a((e,t)=>pe(t)?t(e):e.matches?.(t),"matches$1"),Y=a(e=>({kind:"traversal",params:{filter:"string"},method(t){return Ct(this,n=>e(n,t))}}),"walking"),ai={kind:"traversal",params:{selector:"string"},method(e){return Ct(this,t=>me(e,t))}},oi={kind:"traversal",params:{selector:"string"},method(e){return Ct(this,t=>Kl(t,e))}},li=Y(Vl),ii=Y(Xl),ri=Y(Ql),si=Y(ti),ci=Y(Yl),ui=Y(Zl),di=Y(Jl),fi=Y(ei),pi={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>pe(e)?e(t,n):jt(t,e)),this.many)}},mi={kind:"traversal",params:{test:"string"},method(e){return new N(this.elements.filter((t,n)=>!(pe(e)?e(t,n):jt(t,e))),this.many)}},hi={kind:"traversal",params:{selector:"string"},method(e){return new N(this.elements.filter(t=>t.querySelector?.(e)),this.many)}},vi={kind:"traversal",params:{index:"number"},method(e){const t=this.elements.at(e);return new N(t?[t]:[],this.many)}},gi={kind:"traversal",params:{},method(){return this.at(0)}},$i={kind:"traversal",params:{},method(){return this.at(-1)}},bi={kind:"traversal",params:{start:"number",end:"number"},method(e,t){return new N(this.elements.slice(e,t),this.many)}},wi={kind:"read",params:{selector:"string"},method(e){return this.elements.some(t=>jt(t,e))}},yi={params:{},read:Gl},ki=Object.freeze(Object.defineProperty({__proto__:null,at:vi,children:li,closest:oi,filter:pi,find:ai,first:gi,has:hi,index:yi,is:wi,last:$i,next:ci,nextAll:di,not:mi,parent:ii,parents:ri,prev:ui,prevAll:fi,siblings:si,slice:bi},Symbol.toStringTag,{value:"Module"}));function xi(e){const t=$(e);if(!t)return null;const n=t.getBoundingClientRect(),o=n.top+window.scrollY,l=n.left+window.scrollX;return{x:o,y:l,left:o,top:l}}a(xi,"getElementOffset");function Si(e){const t=$(e);if(!t)return null;const n=t.offsetLeft,o=t.offsetTop;return{x:n,y:o,left:n,top:o}}a(Si,"getElementPosition");function Ti(e){return $(e)?.getBoundingClientRect()??null}a(Ti,"getElementRect");function Ei(e,{ratio:t=0}={}){const n=$(e);if(!n)return!1;const o=n.getBoundingClientRect(),l=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth,r=Math.min(o.bottom,l)-Math.max(o.top,0),s=Math.min(o.right,i)-Math.max(o.left,0);return r<=0||s<=0?!1:r*s/(o.height*o.width||1)>=t}a(Ei,"isElementInViewport");function Jn(e,t={}){const n=$(e)??window;return n?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest",...t}),n}a(Jn,"scrollTo$1");function Ri(e,t={}){return Jn(e,{behavior:"auto",...t})}a(Ri,"jumpTo$1");const Ai=Symbol.for("domina.node");function Xn(e,t){return e?e[Ai]===!0?[e.node].filter(Boolean):Qe(e)?Za(e,t):po(e)?[e]:mo(e)?[...e].flatMap(n=>Xn(n,t)):[$(e,t)].filter(Boolean):[]}a(Xn,"resolveElements");function Oi(e,{name:t,subtree:n=!1}={}){const o=a(u=>!t||u.animationName===t,"checkName"),l=a(u=>u.finished.catch(()=>null),"checkFinish"),i=a(u=>u.getAnimations({subtree:n}),"getNames"),r=Xn(e),s=r.flatMap(i).filter(o);return Promise.all(s.map(l)).then(()=>r)}a(Oi,"waitForAnimations");function Ni(e,t,n,o){let l;return l=Rn(e,t,a(r=>{l(),n(r)},"wrapped"),o),l}a(Ni,"onceEvent");function Ci(e,t,{signal:n,timeout:o}={}){return new Promise((l,i)=>{const r=Ni(e,t,u=>{clearTimeout(s),l(u)}),s=o?setTimeout(()=>{r(),i(new Error(`waitForEvent: ${t} timed out`))},o):null;n?.addEventListener("abort",()=>{r(),clearTimeout(s),i(n.reason)})})}a(Ci,"waitForEvent");const ji={params:{},read:xi},Di={params:{},read:Si},Mi={params:{},read:Ti},Hi={params:{ratio:"number"},read:a((e,t=0)=>Ei(e,{ratio:t}),"read")},Pi={kind:"view",params:{options:"json"},method(e){return this.el&&Jn(this.el,e),this}},Fi={kind:"view",params:{options:"json"},method(e){return this.el&&Ri(this.el,e),this}},Li={kind:"wait",params:{name:"string"},method(e){return Oi(this.elements,{name:e}).then(()=>this)}},zi={kind:"wait",params:{type:"string",timeout:"number"},method(e,t){return this.el?Ci(this.el,e,{timeout:t}):Promise.reject(new Error("[domina] wait(): the chain is empty"))}},Bi=Object.freeze(Object.defineProperty({__proto__:null,finished:Li,inView:Hi,jumpTo:Fi,offset:ji,position:Di,rect:Mi,scrollTo:Pi,wait:zi},Symbol.toStringTag,{value:"Module"})),Qn=new Map,Ii=a(e=>e.length===0||e.length===1&&!Bn(e[0]),"readsByDefault"),_i=a(({kind:e,method:t,read:n,write:o})=>e??(t?"method":n&&o?"access":n?"read":"write"),"kindOf");function Ui(e,{method:t,read:n,reads:o=Ii,write:l}){return t||function(...i){const{elements:r}=this;if(n&&(!l||o(i)))return this.many?r.map(s=>n(s,...i)):r.length?n(r[0],...i):null;if(n&&i.length>1&&i.at(-1)===void 0)throw new TypeError(`[domina/chain] ${e}(): undefined is not a value, null removes`);if(n&&typeof i[1]=="function"){const[s,u]=i;return r.forEach((b,h)=>l(b,s,u(n(b,s),b,h))),this}for(const s of r)l(s,...i);return this}}a(Ui,"build");function Zn(e,t){if(e in N.prototype)throw new Error(`[domina/chain] "${e}" exists already`);const n=typeof t=="function"?{write:t}:t;Object.defineProperty(N.prototype,e,{configurable:!0,value:Ui(e,n),writable:!0}),Qn.set(e,{...n,kind:_i(n),name:e,params:n.params??{}})}a(Zn,"define");function ea(e){for(const[t,n]of Object.entries(e))Zn(t,n)}a(ea,"extend");ea({...ol,...ml,...ql,...ki,...Bi});function De(e,t){return Ze(e)?e:new N(me(e,t))}a(De,"d");function Wi(e,t){return new N(me(e,t),!0)}a(Wi,"dd");De.all=Wi;De.api=Qn;De.define=Zn;De.extend=ea;new Proxy(()=>{},{apply:a((e,t,[n,o])=>De(n,o),"apply"),get:a((e,t)=>st[t],"get"),has:a((e,t)=>t in st,"has"),set:a((e,t,n)=>(st[t]=n,!0),"set")});function W(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(W,"read$1");function B(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(B,"write$1");const Pe=a(e=>(t,n)=>Ka.notify(t,{...n,type:e}),"notify"),P=Object.assign(Pe("info"),{error:Pe("error"),info:Pe("info"),success:Pe("success")}),qi=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function U(e,t=[]){let n=e;for(const o of t)n=await n.getDirectoryHandle(o);return n}a(U,"dirAt");async function Vi(e,t=[]){const n=await U(e,t),o=[];for await(const i of n.values())o.push(i);return(await Promise.all(o.map(async i=>{if(i.kind==="directory")return{kind:"directory",name:i.name};const r=await i.peekFile?.()??await i.getFile();return{kind:"file",lastModified:r.lastModified,name:i.name,size:r.size,type:r.type}}))).sort(qi)}a(Vi,"list$1");async function Dt(e,t,n){return(await(await U(e,t)).getFileHandle(n)).getFile()}a(Dt,"readFile");async function Ki(e,t,n){await(await U(e,t)).getDirectoryHandle(n,{create:!0})}a(Ki,"mkdir");async function Gi(e,t,n){await(await U(e,t)).removeEntry(n,{recursive:!0})}a(Gi,"remove$3");async function Yi(e,t,n,o,l){const i=await U(e,t),r=l==="directory"?await i.getDirectoryHandle(n):await i.getFileHandle(n);if(typeof r.move=="function")try{await r.move(o);return}catch{}l==="directory"?await Ht(r,i,o):await Mt(r,i,o),await i.removeEntry(n,{recursive:!0})}a(Yi,"rename");async function Mt(e,t,n,o){const l=await e.getFile(),r=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(r instanceof WritableStream)){await r.write(await l.arrayBuffer()),await r.close();return}try{await l.stream().pipeTo(r,{signal:o})}catch(s){throw await r.abort?.().catch(()=>{}),s}}a(Mt,"copyFile");async function Ht(e,t,n,o,l=()=>{}){const i=await t.getDirectoryHandle(n,{create:!0});for await(const r of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");r.kind==="directory"?await Ht(r,i,r.name,o,l):(await Mt(r,i,r.name,o),l())}}a(Ht,"copyTree");const Pt="root",{database:Ft}=RAT.app,gt=await ho("folders");let A=w(null),ie=w(null),ta=w(!1);async function na(e,t,n){try{return e[t]?await e[t]({mode:n}):"granted"}catch{return"denied"}}a(na,"ask");const aa=a(()=>RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function","supported");async function Ji(){const e=await Ft.root.get(Pt);if(e){const t=gt.revive(e.handle);A.value={addedAt:e.addedAt,handle:t,name:e.name},ie.value=await na(t,"queryPermission","read")}ta.value=!0}a(Ji,"load$1");async function Xi(){const e=await gt.pick({id:"files"});if(!e)return null;const t={addedAt:Date.now(),handle:gt.keep(e),name:e.name};return await Ft.root.set(Pt,t),A.value={addedAt:t.addedAt,handle:e,name:t.name},ie.value="granted",A.value}a(Xi,"grant");async function Qi(){return A.value?(ie.value=await na(A.value.handle,"requestPermission","read"),{granted:ie.value==="granted"}):{granted:!1}}a(Qi,"reconnect$1");async function Zi(){await Ft.root.delete(Pt),A.value=null,ie.value=null}a(Zi,"forget$2");let we=w(W("files:bookmarks",[])),We=w(W("files:folderTyped",{})),qe=w(W("files:folderTypes",[]));z(()=>B("files:bookmarks",we.value));z(()=>B("files:folderTyped",We.value));z(()=>B("files:folderTypes",qe.value));const oa=[{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:film",id:"video",label:"Videos"}],Ve=a(()=>A.value?.addedAt??A.value?.name??"","folderId"),$t=a(e=>`${Ve()}:${e.join("/")}`,"keyOf"),la=a((e,t)=>e.join("/")===t.join("/"),"samePath$1"),ia=a(()=>[...oa,...qe.value],"types");function Lt(e){const t=We.value[$t(e)];return t?ia().find(n=>n.id===t)??null:null}a(Lt,"typeOf");function bt(e,t){const n={...We.value};t?n[$t(e)]=t:delete n[$t(e)],We.value=n}a(bt,"setType");function er({icon:e="lucide:folder",label:t}){const n=`custom-${Date.now().toString(36)}`;return qe.value=[...qe.value,{icon:e,id:n,label:t}],n}a(er,"addType");function tr(e,t){const n=e.filter(r=>r.kind==="file"),o={};for(const r of n)o[t(r)]=(o[t(r)]??0)+1;const[l,i]=Object.entries(o).sort((r,s)=>s[1]-r[1])[0]??[];return l&&i/n.length>=.6?oa.find(r=>r.id===l)??null:null}a(tr,"suggest");const ra=a(()=>we.value.filter(e=>e.folder===Ve()),"bookmarks"),$e=a(e=>ra().some(t=>la(t.path,e)),"isBookmarked");function nn(e,t){we.value=$e(e)?we.value.filter(n=>!(n.folder===Ve()&&la(n.path,e))):[...we.value,{folder:Ve(),name:t,path:e}]}a(nn,"toggleBookmark");const nr=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ar(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(ar,"toBase64");const or=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),lr=new Set([101,204,205,304]);async function ir(e,{body:t,headers:n={},method:o="GET",signal:l,timeout:i}={}){const r=nr();if(!r)return fetch(e,{body:t,headers:n,method:o,signal:l});const s=await r.request({body:await ar(t),headers:n,method:o,timeout:i,url:e});return new Response(lr.has(s.status)?null:or(s.data),{headers:s.headers,status:s.status,statusText:s.statusText})}a(ir,"request$2");const rr=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),sr=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),sa=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),ne=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function ca(e,t="",n=!1){const o=new URL(sr(t),sa(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(ca,"urlFor");const cr={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class ut extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function he(e,t,{body:n,headers:o={},isDir:l=!1,method:i="GET"}={}){if(!e)throw new Error("No webdav connection.");let r;try{r=await ir(ca(e,t,l),{body:n,headers:{Authorization:rr(e),...o},method:i})}catch(s){throw globalThis.Capacitor?.isNativePlatform?.()?new ut(0,`Connection failed: ${s?.message??s}`):new ut(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!r.ok)throw new ut(r.status,cr[r.status]??`${r.status} ${r.statusText}`);return r}a(he,"request$1");const ur='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',wt="DAV:",Fe=a((e,t)=>e.getElementsByTagNameNS(wt,t)[0]?.textContent??"","firstText");async function ua(e,t,n){const o=await he(e,t,{body:ur,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await o.text(),"application/xml"),i=new URL(sa(e)).pathname,r=a(s=>{const u=decodeURIComponent(new URL(s,e.url).pathname);return(u.startsWith(i)?u.slice(i.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS(wt,"response")].map(s=>{const u=r(Fe(s,"href"));return{isDir:s.getElementsByTagNameNS(wt,"collection").length>0,lastModified:Date.parse(Fe(s,"getlastmodified"))||0,mime:Fe(s,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(Fe(s,"getcontentlength"))||0}})}a(ua,"propfind");async function da(e,t=""){const n=ne(t);return(await ua(e,t,1)).filter(l=>l.path!==n).sort((l,i)=>l.isDir===i.isDir?l.name.localeCompare(i.name,void 0,{numeric:!0}):l.isDir?-1:1)}a(da,"list");async function dt(e,t){try{return(await ua(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(dt,"stat");const dr=a(async(e,t)=>(await he(e,t)).blob(),"read"),fa=a((e,t,n)=>he(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),fr=a((e,t)=>he(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),pr=a((e,t,n=!1)=>he(e,t,{isDir:n,method:"DELETE"}),"remove$2"),mr=a((e,t,n)=>({Destination:ca(e,t,n),Overwrite:"F"}),"destination"),pa=a((e,t,n,o=!1)=>he(e,t,{headers:mr(e,n,o),isDir:o,method:"MOVE"}),"move"),hr=a(e=>da(e,""),"test"),ft=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),an=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class nt{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof nt&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class on extends nt{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,l=null){super(t,n,o),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await dr(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await fa(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof le)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ne(t.path,n);await pa(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class le extends nt{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await da(this.connection,this.path))yield[t.name,t.isDir?new le(this.connection,t.path,t.name):new on(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=ne(this.path,t),l=await dt(this.connection,o);if(l&&!l.isDir)throw an(t);if(!l){if(!n)throw ft(t);await fr(this.connection,o)}return new le(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=ne(this.path,t),l=await dt(this.connection,o);if(l?.isDir)throw an(t);if(!l){if(!n)throw ft(t);await fa(this.connection,o,new Blob([]))}return new on(this.connection,o,t,l)}async removeEntry(t){const n=ne(this.path,t),o=await dt(this.connection,n);if(!o)throw ft(t);await pr(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof le)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=ne(t.path,n);await pa(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const vr=a(e=>new le(e,"",e.name||new URL(e.url).host),"davRoot"),ma="remotes.json",Ie=new Map,{files:ha}=RAT.app;let F=w([]);async function gr(){F.value=await ha.read(ma,"json").catch(()=>[])}a(gr,"load");const va=a(()=>ha.write(ma,JSON.stringify(F.value)),"persist$1"),ga=a(e=>F.value.find(t=>t.id===e)??null,"byId");async function $r({name:e,password:t="",url:n,username:o=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const i={id:`dav-${Date.now().toString(36)}`,name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(o).trim()};return await hr(i),F.value=[...F.value,i],await va(),i}a($r,"add$1");async function br(e){F.value=F.value.filter(t=>t.id!==e),Ie.delete(e),await va()}a(br,"remove$1");function wr(e){const t=ga(e);return t?(Ie.has(e)||Ie.set(e,vr(t)),Ie.get(e)):null}a(wr,"rootOf");const at=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],yr=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,kr=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,xr=a(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function re({name:e,type:t=""}){const n=xr(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||yr.test(n)?"documents":kr.test(n)?"archives":"other"}a(re,"categoryOf");let T=w(null),V=w(null);const{files:zt}=RAT.app,Sr=24,Tr=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),Bt=a(e=>`index/${e.addedAt??e.name}.json`,"pathOf");let be=null;async function $a(e,t,n,o){const l=[],i=[];for await(const r of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");Tr(r.name)||(r.kind==="directory"?l.push(r):i.push(Promise.resolve(r.peekFile?.()??r.getFile()).then(s=>({lastModified:s.lastModified,name:r.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const r of await Promise.all(i))r&&n.push(r);V.value={files:n.length};for(const r of l)await $a(r,[...t,r.name],n,o)}a($a,"walk");function Er(e){const t=Object.fromEntries(at.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const i=t[re(l)];i.count++,i.size+=l.size,n+=l.size}const o=e.toSorted((l,i)=>i.lastModified-l.lastModified).slice(0,Sr);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(Er,"summarize");async function Rr(e){return T.value=e?await zt.read(Bt(e),"json").catch(()=>null):null,T.value}a(Rr,"restore");async function Ar(e,t){be?.abort();const n=new AbortController;be=n;const o=[];V.value={files:0};try{return await $a(e,[],o,n.signal),T.value=Er(o),await zt.write(Bt(t),JSON.stringify(T.value)),T.value}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{be===n&&(be=null,V.value=null)}}a(Ar,"scan");const ba=a(()=>be?.abort(),"stop$1");async function Or(e){ba(),T.value=null,e&&await zt.remove(Bt(e)).catch(()=>{})}a(Or,"forget$1");function Nr(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const l of T.value?.files??[])if(l.name.toLowerCase().includes(n)&&o.push(l),o.length>=t)break;return o}a(Nr,"search");const Cr=50,It="files:tasks";let K=w([]),Te=w(W(It,[]));const ln=k(()=>K.value.some(e=>e.state==="running")),_t=new Map,rn=new Map;let jr=0;const Ke=a(()=>X(()=>K.value),"tasks");function sn(e,t){K.value=Ke().map(n=>n.id===e?{...n,...t}:n)}a(sn,"patch");function pt(e,t){const o=[{...Ke().find(l=>l.id===e),...t,endedAt:Date.now()},...X(()=>Te.value)].slice(0,Cr);K.value=Ke().filter(l=>l.id!==e),Te.value=o,_t.delete(e),B(It,o)}a(pt,"finish");function ot({icon:e="lucide:loader",label:t,lane:n="default"},o){const l=`task-${Date.now().toString(36)}-${++jr}`,i=new AbortController;_t.set(l,i),K.value=[...Ke(),{error:null,icon:e,id:l,label:t,lane:n,progress:null,queuedAt:Date.now(),state:"queued"}];const r=(rn.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{if(i.signal.aborted)return pt(l,{state:"cancelled"}),null;sn(l,{startedAt:Date.now(),state:"running"});const s=a((u,b)=>sn(l,{progress:{done:u,total:b}}),"progress");try{const u=await o({progress:s,signal:i.signal});return pt(l,{state:i.signal.aborted?"cancelled":"done"}),u}catch(u){throw pt(l,u?.name==="AbortError"?{state:"cancelled"}:{error:String(u?.message??u),state:"failed"}),u}});return rn.set(n,r),r}a(ot,"run");const Dr=a(e=>_t.get(e)?.abort(),"cancel");function Mr(){Te.value=[],B(It,[])}a(Mr,"clearHistory");const{dialogs:Hr}=RAT.app,I=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),wa=a(()=>!!I(),"available$1"),ya=["https","http"],cn=53317,ka="files:sync",yt=W(ka,{});let Ee=w(null),ye=w([]),kt=w(null),j=w([]),se=w(Array.isArray(yt.targets)?yt.targets:[]),Ge=yt.folderName??"";const Ut=a(()=>B(ka,{folderName:Ge,targets:se.value}),"persist");function Pr(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const i=new URL(n.replace(/^filesync:\/\//,"http://")),r=i.searchParams.get("protocol");return{fingerprint:i.searchParams.get("fingerprint")??"",host:i.hostname,port:Number(i.port)||cn,protocol:ya.includes(r)?r:t}}catch{return null}const[o,l]=n.split(":");return{fingerprint:"",host:o,port:Number(l)||cn,protocol:t}}a(Pr,"parseTarget");const un=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),xa=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget");function Fr(e){const t=se.value.filter(n=>!xa(n,e));se.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),Ut()}a(Fr,"remember");function Lr(e){se.value=se.value.filter(t=>!xa(t,e)),Ut()}a(Lr,"forget");let dn=!1;async function Sa(){const e=I();e&&(dn||(dn=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;ye.value=[t,...ye.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),kt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await Wt())}a(Sa,"start");const zr=a(()=>I()?.stopDiscovery().catch(()=>{}),"stop");function Ta(e){const t=new Set(j.value.map(n=>n.uri));j.value=[...j.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(Ta,"add");async function Br(){const{files:e=[]}=await I().pickFiles();Ta(e)}a(Br,"pickFiles");async function Ir(e,t,n){const o=await(await U(e,t)).getFileHandle(n.name),l=o._uri??(o.path?`file://${o.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");Ta([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}a(Ir,"addEntry");const _r=a(e=>{j.value=j.value.filter(t=>t.uri!==e)},"remove"),Ur=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Wr(e,t=j.value,n=""){const o=I();if(!o||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return ot({icon:"lucide:send",label:`Send ${l} to ${un(e)}`,lane:"send"},async({progress:i})=>{const r=await o.addListener("progress",s=>i(s.sent,s.total));try{const s=a(u=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await s(n)}catch(u){if(!Ur(u))throw u;const b=await Hr.prompt({message:`${un(e)} wants a pin`,ok:"Send",title:"Pin"});if(!b)throw new Error("no pin given");await s(b)}Fr(e),j.value=j.value.filter(u=>!t.includes(u))}finally{r.remove()}})}a(Wr,"send");async function Wt(){const e=await I()?.getAutoSyncState().catch(()=>null)??null;Ee.value=e&&{...e,name:e.tree?Ge:""}}a(Wt,"refreshAutoSync");async function qr(){const{name:e,uri:t}=await I().pickFolder();t&&(Ge=e??"",Ee.value={...Ee.value,name:Ge,tree:t},Ut())}a(qr,"pickSyncFolder");async function Vr(e,{pin:t="",ssid:n=""}={}){const o=Ee.value?.tree;if(!o)throw new Error("pick a folder first");await I().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await Wt()}a(Vr,"startAutoSync");async function Kr(){await I().stopAutoSync(),await Wt()}a(Kr,"stopAutoSync");const Gr=a(()=>I()?.syncNow(),"syncNow");let O=w(null);const qt=a((e,t)=>e.join("/")===t.join("/"),"samePath"),Yr=a((e,t)=>e.length>=t.length&&qt(e.slice(0,t.length),t),"isInside");function Jr(e,t,n,o){const l={kind:t.kind,name:t.name,path:t.path??n,root:o},i=O.value?.mode===e&&!O.value.pasted?O.value.items.filter(r=>!(r.name===l.name&&qt(r.path,l.path))):[];O.value={items:[...i,l],mode:e}}a(Jr,"pick$1");const Xr=a(()=>{O.value&&(O.value={...O.value,pasted:!0})},"pasted"),Ea=a(()=>{O.value=null},"clear");async function fn(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(fn,"exists");async function Qr(e,t,n){if(!await fn(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,l=o>0?t.slice(0,o):t,i=o>0?t.slice(o):"";for(let r=2;;r++){const s=`${l} (${r})${i}`;if(!await fn(e,s))return s}}a(Qr,"freeName");async function _e(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await _e(n);return t}a(_e,"countFiles");const Zr=a(async(e,t)=>{const n=await U(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)},"handleOf");async function es(e,t,n,o,{onProgress:l=a(()=>{},"onProgress"),signal:i}={}){for(const v of t)if(v.kind==="directory"&&Yr(o,[...v.path,v.name]))throw new Error(`“${v.name}” can not go into itself`);const r=await U(e,o),s=await Promise.all(t.map(v=>Zr(v.root??e,v))),u=(await Promise.all(s.map(_e))).reduce((v,d)=>v+d,0);let b=0;const h=a(()=>l(++b,u),"onFile");l(0,u);for(const[v,d]of t.entries()){if(i?.aborted)throw new DOMException("transfer aborted","AbortError");const E=s[v],J=await U(d.root??e,d.path);if(n==="move"&&qt(d.path,o)){b+=await _e(E),l(b,u);continue}const q=await Qr(r,d.name,d.kind);if(n==="move"&&typeof E.move=="function")try{await E.move(r,q),b+=await _e(E),l(b,u);continue}catch{}d.kind==="directory"?await Ht(E,r,q,i,h):(await Mt(E,r,q,i),h()),n==="move"&&await J.removeEntry(d.name,{recursive:!0})}}a(es,"transfer");const{dialogs:Q,router:ce}=RAT.app,ts={copy:"lucide:copy",move:"lucide:scissors"},ns=["pattern-bg","pattern-tile"],as={open:"auto","pattern-bg":"","pattern-tile":"",searchbar:"bottom",tabbar:"bottom",viewmode:"list"};let M=w(Object.fromEntries(Object.entries(as).map(([e,t])=>[e,W(`files:${e}`,t)])));z(()=>{for(const[e,t]of Object.entries(M.value))B(`files:${e}`,t)});const Ra=a((e,t)=>{M.value={...M.value,[e]:t}},"setting");z(()=>{const e=document.documentElement;for(const t of ns){const n=M.value[t];e.toggleAttribute(`data-${t}`,!!n),n&&Qa(async()=>{const{patternStyle:o}=await import("./index-L3zh7JKz.js").then(l=>l.o);return{patternStyle:o}},__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||X(()=>M.value[t])!==n))for(const[l,i]of Object.entries(o))e.style.setProperty(l,i)})}});const os=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Aa=a(()=>M.value.open==="single"||M.value.open==="auto"&&os(),"opensOnTap");let te=w(null),Re=w([]),C=w(null),ae=w(""),xt=w(!1),St=w(""),g=w(null),ue=w(null),ke=w(null),Ae=w(W("files:tabs",{index:0,list:[{path:[]}]}));z(()=>B("files:tabs",Ae.value));const D=k(()=>Ae.value.list?.length?Ae.value.list:[{path:[]}]),H=k(()=>Math.min(Math.max(0,Ae.value.index??0),D.value.length-1)),y=k(()=>D.value[H.value].path),ve=k(()=>D.value[H.value].source??null),Oa=new Map,Na=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function Z(e,t=H.value){Ae.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}a(Z,"setTabs");function G(e,t){Z(D.value.map((n,o)=>o===H.value?{path:e,source:t===void 0?n.source??null:t}:n)),g.value=null,ae.value=""}a(G,"goTo");function Ca(e=y.value,t=ve.value){const n=[...D.value,{path:e,source:t}];Z(n,n.length-1),g.value=null}a(Ca,"openTab");function ls(e){if(D.value.length===1)return G([]);Z(D.value.filter((t,n)=>n!==e),e<H.value?H.value-1:H.value)}a(ls,"closeTab");function is(e){Oa.set(H.value,Na()?.scrollTop??0),Z(D.value,e),g.value=null}a(is,"switchTab");const pn=a(e=>e.path.at(-1)??lt(e.source??null),"tabName"),ge=a(()=>ie.value==="granted"?A.value?.handle??null:null,"localRoot"),Me=a(e=>e?wr(e):ge(),"rootOfSource"),lt=a(e=>e?ga(e)?.name??"remote":A.value?.name??"folder","sourceName"),it=a(()=>Me(ve.value),"rootHandle"),Oe=a(()=>lt(ve.value),"folderName"),de=a(e=>e.source!==void 0?e.source:e.path?null:ve.value,"sourceOf");let Le=0;z(()=>{const e=it(),t=y.value,n=++Le;Re.value=[],xt.value=!!e,e&&Vi(e,t).then(o=>{n===Le&&(Re.value=o,requestAnimationFrame(()=>{const l=Na();l&&(l.scrollTop=Oa.get(X(()=>H.value))??0)}))}).catch(o=>{n===Le&&P.error(o)}).finally(()=>{n===Le&&(xt.value=!1)})});let Tt=null;z(()=>{const e=ge(),t=A.value;!e||!t||Tt===t||(Tt=t,Rr(t).then(()=>ja(e,t)))});function ja(e,t){return ot({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>ba());const l=z(()=>{V.value&&n(V.value.files,null)});return Ar(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}a(ja,"indexFolder");const rs=a(()=>{const e=ge();e&&ja(e,A.value)},"rescan"),ss=a((e,t)=>{const n=t.trim().toLowerCase();return n?e.filter(o=>o.name.toLowerCase().includes(n)):e},"matches"),mn=k(()=>ss(Re.value,ae.value)),Et=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Da=a((e,t)=>e.kind==="directory"?t&&Lt([...t,e.name])?.icon||"lucide:folder":at.find(n=>n.id===re(e))?.icon??"lucide:file","iconOf");function fe(e,t=y.value){if(e.kind==="directory")return G([...t,e.name]),ce.go("/library");C.value={...e,kind:"file",path:e.path??t,source:de(e)},ce.go("/preview")}a(fe,"open");function hn(e){G(e.path??[],de(e)),ce.go("/library")}a(hn,"showInFolder");function cs(e){if(Aa())return fe(e);g.value=e}a(cs,"onEntryClick");function Ma(e){ue.value=null,g.value=e,RAT.app.toggle("context",!0)}a(Ma,"about");function us(){g.value=null,ue.value="tasks",RAT.app.toggle("context",!0)}a(us,"openTasks");async function rt(){const e=it();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(P.error("No permission to change this folder"),null)}a(rt,"writable");function Vt(e,t,n){const o=a(()=>t.join("/")===y.value.join("/"),"same");ot({...e,lane:"write"},n).then(()=>{o()&&G([...t])}).catch(P.error)}a(Vt,"writeTask");async function Ha(){const e=await Q.prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await rt();if(!t)return;const n=y.value;Vt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>Ki(t,n,e))}a(Ha,"newFolder");async function ds(e){const t=await Q.prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await rt();if(!n)return;const o=e.path??y.value;g.value=null,Vt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>Yi(n,o,e.name,t,e.kind))}a(ds,"renameEntry");async function fs(e){if(!await Q.confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await rt();if(!t)return;const n=e.path??y.value;g.value=null,RAT.app.toggle("context",!1),Vt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Gi(t,n,e.name))}a(fs,"deleteEntry");function vn(e,t){Jr(e,t,t.path??y.value,Me(de(t))),RAT.app.toggle("context",!1)}a(vn,"pick");async function ps(){const e=O.value;if(!e)return;const t=await rt();if(!t)return;const n=[...y.value],o=e.items.length,l=o===1?e.items[0].name:`${o} items`,i=e.mode==="move"?"move":"copy",r=ts[i];e.mode==="move"?Ea():Xr();const s=a(()=>{n.join("/")===y.value.join("/")&&G([...n])},"done");ot({icon:r,label:`${i} ${l} to /${n.join("/")}`,lane:"write"},({progress:u,signal:b})=>es(t,e.items,e.mode,n,{onProgress:u,signal:b})).then(s).catch(u=>{u?.name!=="AbortError"&&P.error(u),s()})}a(ps,"paste");async function gn(e){const t=await Dt(Me(de(e)),e.path??y.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(gn,"download");async function Ye(){if(!aa())return P.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await Xi())return;Z([{path:[]}],0),ce.go("/")}catch(e){P.error(e)}}a(Ye,"chooseFolder");async function ms(){const{granted:e}=await Qi();if(!e)return Ye()}a(ms,"reconnect");async function hs(){await Q.confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:Oe()})&&(await Or(A.value),Tt=null,await Zi(),Z([{path:[]}],0))}a(hs,"closeFolder");function Pa(e){Ca([],e),ce.go("/library")}a(Pa,"openRemote");function vs(){g.value=null,ue.value="remotes",RAT.app.toggle("context",!0)}a(vs,"manageRemotes");async function gs(e){if(!await Q.confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await br(e.id);const t=D.value.filter(n=>n.source!==e.id);Z(t.length?t:[{path:[]}],0)}a(gs,"forgetRemote");function $s(e){Ir(ge(),e.path??y.value,e).then(()=>{RAT.app.toggle("context",!1),ce.go("/sync")}).catch(P.error)}a($s,"sendEntry");async function bs(e){const t=await Q.prompt({message:"Name of the new folder type",ok:"Next",title:"Folder type"});if(!t)return;const n=await Q.prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";bt(e,er({icon:n,label:t}))}a(bs,"newType");function ws(e){const t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[re(l)]=(n[re(l)]??0)+1;const o=Object.entries(n).sort((l,i)=>i[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?at.find(l=>l.id===o[0])?.label:null,size:t.reduce((l,i)=>l+i.size,0)}}a(ws,"factsOf");const ze=k(()=>ws(Re.value)),$n=at.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),ys=a((e,t)=>t.lastModified-e.lastModified,"newest"),ks=k(()=>(T.value?.files??[]).filter(e=>re(e)===te.value).toSorted(ys).slice(0,500)),Be=k(()=>Nr(St.value));let xe=null;const He=Ga(!1),Fa=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,xs=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Fa;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),xe=e,He.value=!0});addEventListener("appinstalled",()=>{xe=null,He.value=!1});async function Ss(){if(!xe)return!1;const e=xe;return xe=null,He.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(Ss,"install");function Ts(e){const t=`${e}:install-hint`,n=a(()=>{W(t)||(B(t,!0),P(`${e} can be installed: see the settings`))},"show");He.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(Ts,"hint");const Es=864e5,Rs={day:"numeric",month:"short",year:"numeric"},Kt=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Je=a(e=>{const t=Kt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Rs)},"date"),As=a(e=>{const t=Kt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Es;return n<0?Je(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Je(t)},"ago"),Os=a(e=>{const t=Kt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Je(t)},"since"),Ns=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${o}:${l}`:`${o}:${l}`},"duration"),Cs=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),R={ago:As,bytes:Cs,date:Je,duration:Ns,since:Os};function S(e,t){return js.call({props:e},e,t)}a(S,"ActionRatHtml");function js(e,t){return c`<button.action type="button" disabled=${()=>e.disabled} onclick=${m(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(js,"$$ActionRatHtml");function Ue(e,t){return Ds.call({props:e},e,t)}a(Ue,"FactsRatHtml");function Ds(e,t){const n=(e.rows??[]).filter(([,o])=>o!=null&&o!=="");return c`
    <dl.facts>
      ${x(()=>n,o=>o,o=>c`<dt>${()=>o[0]}</dt><dd>${()=>o[1]}</dd>`)}
    </dl>
  `}a(Ds,"$$FactsRatHtml");function Ms(e,t){return Hs.call({props:e},e,t)}a(Ms,"RemoteManagerRatHtml");function Hs(e,t){let n=w(null),o=w(!1);async function l(i){i.preventDefault();const r=i.target,s=a(u=>r.querySelector(`[name="${u}"]`)?.value??"","field");o.value=!0,n.value=null;try{const u=await $r({name:s("name"),password:s("password"),url:s("url"),username:s("username")});r.reset?.(),Pa(u.id),RAT.app.toggle("context",!1)}catch(u){n.value=u.message??String(u)}finally{o.value=!1}}return a(l,"add"),c`
    ${p(()=>F.value.length,()=>c`
        <ul.tasks>
          ${x(()=>F.value,i=>i,i=>c`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>i.name}</span><small>${()=>i.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+i.name} onclick=${m(()=>gs(i))} />
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
      <button.action type="submit" disabled=${()=>o.value}><svg-icon icon=${()=>o.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(Hs,"$$RemoteManagerRatHtml");function La(e,t){return Ps.call({props:e},e,t)}a(La,"StatusRatHtml");function Ps(e,t){return c`
    ${p(()=>V.value,()=>c`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>V.value.files} files</p>`,()=>p(()=>T.value,()=>c`<p.status>${()=>T.value.total} files · ${()=>R.bytes(T.value.size)} · read ${()=>R.date(T.value.scannedAt)}</p>`))}
  `}a(Ps,"$$StatusRatHtml");function Fs(e,t){return Ls.call({props:e},e,t)}a(Fs,"TaskListRatHtml");function Ls(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},o=a(s=>s.state==="queued"||s.state==="running","isOpen"),l=a(s=>{const{done:u,total:b}=s.progress??{};return s.state==="running"&&u!=null?b?`${Math.round(u/b*100)}%`:`${u}`:n[s.state]},"stateOf"),i=a(s=>s.error??[l(s),s.endedAt&&R.date(s.endedAt)].filter(Boolean).join(" · "),"noteOf");function r(s){return c`
      <li class=${()=>"task "+s.state}>
        <svg-icon icon=${()=>s.icon} />
        <span.text>
          <span.name>${()=>s.label}</span>
          <small>${()=>i(s)}</small>
          ${p(()=>s.state==="running"&&s.progress?.total,()=>c`<progress max=${()=>s.progress.total} value=${()=>s.progress.done} />`)}
        </span>
        ${p(()=>o(s),()=>c`<btn-icon icon="lucide:x" label=${()=>"cancel "+s.label} onclick=${m(()=>Dr(s.id))} />`)}
      </li>
    `}return a(r,"row"),c`
    ${p(()=>K.value.length,()=>c`
        <ul.tasks>
          ${x(()=>K.value,s=>s,s=>c`${()=>r(s)}`)}
        </ul>
      `,()=>c`<p.empty>nothing to do</p>`)}
    ${p(()=>Te.value.length,()=>c`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${m(Mr)} />
        </div-x>
        <ul.tasks>
          ${x(()=>Te.value,s=>s,s=>c`${()=>r(s)}`)}
        </ul>
      `)}
  `}a(Ls,"$$TaskListRatHtml");function zs(e,t){return Bs.call({props:e},e,t)}a(zs,"ContextRatHtml");function Bs(e,t){const{$path:n}=Pn(RAT.app.router,{$path:null}),o=k(()=>!ve.value),l=k(()=>y.value.length?Lt(y.value):null),i=k(()=>y.value.length&&!l.value?tr(Re.value,re):null),r=a(s=>"/"+(s.path??y.value).join("/"),"where");return c`
    ${p(()=>ue.value==="tasks",()=>c`<h2>Tasks</h2><${Fs} />`,()=>p(()=>ue.value==="remotes",()=>c`<h2>Remote</h2><${Ms} />`,()=>p(()=>g.value,()=>c`
            <h2>${()=>g.value.name}</h2>
            <${Ue} ...${{get rows(){return[["name",g.value.name],["kind",g.value.kind==="directory"?"folder":g.value.type||"file"],["size",g.value.kind==="file"?R.bytes(g.value.size):null],["modified",g.value.lastModified?R.date(g.value.lastModified):null],["in",r(g.value)]]}}} />
            <div-x.actions>
              <${S} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>fe(g.value,g.value.path??y.value),"onclick")}} />
              ${p(()=>g.value.path,()=>c`<${S} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>hn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file",()=>c`<${S} icon="lucide:download" label="download" ...${{onclick:a(()=>gn(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="file"&&!de(g.value)&&wa(),()=>c`<${S} icon="lucide:send" label="send" ...${{onclick:a(()=>$s(g.value),"onclick")}} />`)}
              ${p(()=>g.value.kind==="directory"&&!de(g.value),()=>c`<${S} ...${{get icon(){return $e([...y.value,g.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return $e([...y.value,g.value.name])?"remove bookmark":"bookmark"},onclick:a(()=>nn([...y.value,g.value.name],g.value.name),"onclick")}} />`)}
              <${S} icon="lucide:copy" label="copy" ...${{onclick:a(()=>vn("copy",g.value),"onclick")}} />
              <${S} icon="lucide:scissors" label="move" ...${{onclick:a(()=>vn("move",g.value),"onclick")}} />
              <${S} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>ds(g.value),"onclick")}} />
              <${S} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>fs(g.value),"onclick")}} />
            </div-x>
          `,()=>p(()=>n.value==="/preview"&&C.value,()=>c`
              <h2>Details</h2>
              <${Ue} ...${{get rows(){return[["name",C.value.name],["type",C.value.type||"unknown"],["size",R.bytes(C.value.size)],["dimensions",ke.value?ke.value.width+" × "+ke.value.height:null],["modified",R.date(C.value.lastModified)],["in","/"+C.value.path.join("/")]]}}} />
              <div-x.actions>
                <${S} icon="lucide:download" label="download" ...${{onclick:a(()=>gn(C.value),"onclick")}} />
                <${S} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>hn(C.value),"onclick")}} />
              </div-x>
            `,()=>p(()=>n.value==="/library"&&it(),()=>c`
                <h2>This folder</h2>
                <${Ue} ...${{get rows(){return[["folder",y.value.at(-1)??Oe()],["contains",ze.value.folders+" folders, "+ze.value.files+" files"],["size",R.bytes(ze.value.size)],["mostly",ze.value.mostly]]}}} />
                <div-x.actions>
                  <${S} icon="lucide:folder-plus" label="new folder" ...${{onclick:Ha}} />
                  ${p(()=>y.value.length&&o.value,()=>c`<${S} ...${{get icon(){return $e(y.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return $e(y.value)?"remove bookmark":"bookmark"},onclick:a(()=>nn(y.value,y.value.at(-1)),"onclick")}} />`)}
                </div-x>
                ${p(()=>y.value.length&&o.value,()=>c`
                    <h3>Type</h3>
                    ${p(()=>i.value,()=>c`<p.hint>Looks like ${()=>i.value.label}. <button.link type="button" onclick=${m(()=>bt(y.value,i.value.id))}>Make it one</button></p>`)}
                    <div-x.actions>
                      ${x(()=>ia(),s=>s,s=>c`<button.action type="button" aria-pressed=${()=>String(l.value?.id===s.id)} onclick=${m(()=>bt(y.value,l.value?.id===s.id?null:s.id))}><svg-icon icon=${()=>s.icon} /> ${()=>s.label}</button>`)}
                      <${S} icon="lucide:plus" label="new type" ...${{onclick:a(()=>bs(y.value),"onclick")}} />
                    </div-x>
                  `)}
              `,()=>c`
                <h2>${()=>lt(null)}</h2>
                <${La} />
                <div-x.actions><${S} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!ge()||!!V.value},onclick:rs}} /></div-x>
              `)))))}
  `}a(Bs,"$$ContextRatHtml");function L(e,t){return Is.call({props:e},e,t)}a(L,"BarRatHtml");function Is(e,t){return c`
    <header.bar>
      ${p(()=>e.back,()=>c`<btn-icon icon="lucide:arrow-left" label="back" onclick=${m(e.back)} />`,()=>c`<btn-icon icon="lucide:menu" label="menu" onclick=${m(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${m(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Is,"$$BarRatHtml");function Gt(e,t){return _s.call({props:e},e,t)}a(Gt,"ThumbRatHtml");function _s(e,t){const n=e.entry,o=e.at??[],l=e.from??null,i=RAT.app.thumbnails,r=Et(n)?`${l??X(()=>A.value)?.addedAt}/${o.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let s=w(r?i.peekFile(r):null);function u(b){if(!r||s.value)return;let h=!0;const v=new IntersectionObserver(([d])=>{d.isIntersecting&&(v.disconnect(),i.requestFile(r,()=>Dt(Me(l),o,n.name)).then(E=>{h&&E&&(s.value=E)}))},{rootMargin:"200px"});return v.observe(b),()=>{h=!1,v.disconnect()}}return a(u,"watch"),c`
    <span.thumb ref=${Ya(u)}>
      ${p(()=>s.value,()=>c`<img src=${()=>s.value} alt="" loading="lazy" />`,()=>c`<svg-icon icon=${()=>Da(n,l?null:e.at)} />`)}
    </span>
  `}a(_s,"$$ThumbRatHtml");function bn(e,t){return Us.call({props:e},e,t)}a(bn,"FileRowRatHtml");function Us(e,t){const n=e.entry;return c`
    <li.row>
      <button.entry type="button" onclick=${m(()=>fe(n))}>
        <${Gt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+R.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Ma({...n,kind:"file"}))} />
    </li>
  `}a(Us,"$$FileRowRatHtml");function Xe(e,t){return Ws.call({props:e},e,t)}a(Xe,"SearchbarRatHtml");function Ws(e,t){const n=k(()=>K.value.length);return c`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${m(o=>e.onsearch?.(o.detail.query))} />
      <button type="button" class=${()=>ln.value?"tasks-button busy":"tasks-button"} aria-label=${()=>n.value?`${n.value} tasks`:"tasks"} title=${()=>n.value?`${n.value} tasks`:"tasks"} onclick=${m(us)}>
        <svg-icon icon=${()=>ln.value?"lucide:loader":"lucide:list-checks"} />
        ${p(()=>n.value,()=>c`<span.badge>${()=>n.value}</span>`)}
      </button>
    </div>
  `}a(Ws,"$$SearchbarRatHtml");const qs=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Vs(e,t){return Ks.call({props:e},e,t)}a(Vs,"LoadingRatHtml");function Ks(e,t){return Rt("1tn1js8",qs),c`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${p(()=>e.text,()=>c`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Ks,"$$LoadingRatHtml");function za(e,t){return Gs.call({props:e},e,t)}a(za,"WelcomeRatHtml");function Gs(e,t){return c`
    ${p(()=>!aa(),()=>c`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>p(()=>!ta.value,()=>c`<${Vs} />`,()=>p(()=>!A.value,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${m(Ye)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>Oe()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${m(ms)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(Gs,"$$WelcomeRatHtml");function Ys(e,t){return Js.call({props:e},e,t)}a(Ys,"DashboardRatHtml");function Js(e,t){const n=a(d=>{G(d,null),RAT.app.router.go("/library")},"library"),o=a(()=>lt(null),"folderName"),l=a(d=>St.value=d,"search"),i=k(()=>!!ge()),r=k(()=>M.value.searchbar==="top"),s=k(()=>!!St.value.trim()),u=k(()=>ra()),b=k(()=>$n.find(d=>d.id===te.value)?.label??te.value),h=a(d=>{try{return new URL(d).host}catch{return d}},"hostOf"),v=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return c`
    <${L} title="Files" />
    ${p(()=>i.value&&r.value,()=>c`<${Xe} ...${{get placeholder(){return"Search in "+o()},onsearch:l}} />`)}
    <div.scroll>
      ${p(()=>!i.value,()=>c`<${za} />`,()=>p(()=>s.value,()=>c`
            <section>
              <h2>${()=>Be.value.length?"Found "+(Be.value.length>=100?"100+":Be.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${x(()=>Be.value,d=>d,d=>c`<${bn} ...${{get entry(){return d}}} />`)}
              </ul>
            </section>
          `,()=>p(()=>te.value,()=>c`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${m(()=>te.value=null)} />
                  <h2>${()=>b.value}</h2>
                </div-x>
                <ul.rows>
                  ${x(()=>ks.value,d=>d,d=>c`<${bn} ...${{get entry(){return d}}} />`)}
                </ul>
              </section>
            `,()=>c`
              ${p(()=>T.value?.recent?.length,()=>c`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${x(()=>T.value.recent,d=>d,d=>c`
                          <button.card type="button" onclick=${m(()=>fe(d))}>
                            <${Gt} ...${{get entry(){return d},get at(){return d.path}}} />
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
                              <svg-icon icon=${()=>Lt(d.path)?.icon??"lucide:bookmark"} />
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
                        <button.tile type="button" disabled=${()=>!T.value?.categories?.[d.id]?.count} onclick=${m(()=>te.value=d.id)}>
                          <svg-icon icon=${()=>d.icon} />
                          <span.text>
                            <span.name>${()=>d.label}</span>
                            <small>${()=>T.value?.categories?.[d.id]?T.value.categories[d.id].count+" · "+R.bytes(T.value.categories[d.id].size):"…"}</small>
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
                        <span.name>${()=>o()}</span>
                        <small>${()=>T.value?R.bytes(T.value.size):"the granted folder"}</small>
                      </span>
                    </button>
                  </li>
                </ul>
                <${La} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${x(()=>F.value,d=>d,d=>c`
                      <li>
                        <button.tile type="button" onclick=${m(()=>Pa(d.id))}>
                          <svg-icon icon="lucide:cloud" />
                          <span.text>
                            <span.name>${()=>d.name}</span>
                            <small>${()=>h(d.url)}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                  <li>
                    <button.tile type="button" onclick=${m(vs)}>
                      <svg-icon icon="lucide:cloud-cog" />
                      <span.text>
                        <span.name>WebDAV, Nextcloud</span>
                        <small>${()=>F.value.length?"add or remove":"connect a server"}</small>
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
    ${p(()=>i.value&&!r.value,()=>c`<${Xe} ...${{get placeholder(){return"Search in "+o()},onsearch:l}} />`)}
  `}a(Js,"$$DashboardRatHtml");function Xs(e,t){return Qs.call({props:e},e,t)}a(Xs,"EntryRatHtml");function Qs(e,t){const n=e.entry,o=X(()=>y.value),l=X(()=>ve.value),i=k(()=>g.value?.name===n.name&&!g.value?.path),r=a(s=>{s.key==="Enter"&&!Aa()&&(s.preventDefault(),fe(n))},"onkeydown");return c`
    <data-item>
      <div.row class:selected=${()=>i.value}>
        <button.entry type="button" aria-pressed=${()=>i.value?"true":null} onclick=${m(()=>cs(n))} ondblclick=${m(()=>fe(n))} onkeydown=${m(r)}>
          <${Gt} ...${{get entry(){return n},get at(){return o},get from(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?R.date(n.lastModified)+" · "+R.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${m(()=>Ma(n))} />
      </div>
    </data-item>
  `}a(Qs,"$$EntryRatHtml");function Zs(e,t){return ec.call({props:e},e,t)}a(Zs,"PasteBarRatHtml");function ec(e,t){const n=k(()=>O.value?O.value.items.length===1?O.value.items[0].name:`${O.value.items.length} items`:"");return c`
    ${p(()=>O.value,()=>c`
        <div-x.pastebar>
          <svg-icon icon=${()=>O.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>n.value}</span>
            <small>${()=>O.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${m(ps)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the clipboard" onclick=${m(Ea)} />
        </div-x>
      `)}
  `}a(ec,"$$PasteBarRatHtml");function wn(e,t){return tc.call({props:e},e,t)}a(wn,"TabsRatHtml");function tc(e,t){return c`
    <div-x.tabs role="tablist" scrollable>
      ${x(()=>D.value,n=>n,n=>c`
          <div class=${()=>D.value.indexOf(n)===H.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(D.value.indexOf(n)===H.value)} onclick=${m(()=>is(D.value.indexOf(n)))}>${()=>pn(n)}</button>
            ${p(()=>D.value.length>1,()=>c`<btn-icon icon="lucide:x" label=${()=>"close "+pn(n)} onclick=${m(()=>ls(D.value.indexOf(n)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${m(()=>Ca())} />
    </div-x>
  `}a(tc,"$$TabsRatHtml");function nc(e,t){return ac.call({props:e},e,t)}a(nc,"LibraryRatHtml");function ac(e,t){const n=k(()=>!!it()),o=k(()=>M.value.viewmode),l=k(()=>M.value.tabbar==="top"),i=k(()=>M.value.searchbar==="top"),r=a(()=>y.value.length?G(y.value.slice(0,-1)):RAT.app.router.go("/"),"up"),s=a(()=>Ra("viewmode",o.value==="grid"?"list":"grid"),"toggle"),u=a(h=>G(h.detail.path.split("/").filter(Boolean)),"crumb"),b=a(h=>ae.value=h,"search");return c`
    ${p(()=>!n.value,()=>c`<${L} title="Library" /><div.scroll><${za} /></div>`,()=>c`
        <${L} ...${{get title(){return y.value.at(-1)??Oe()},get back(){return r}}}><btn-icon icon=${()=>o.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>o.value==="grid"?"show as list":"show as grid"} onclick=${m(s)} /></${L}>
        ${p(()=>l.value,()=>c`<${wn} />`)}
        ${p(()=>i.value,()=>c`<${Xe} placeholder="Filter this folder" ...${{get value(){return ae.value},onsearch:b}} />`)}
        <nav-crumbs root=${()=>Oe()} path=${()=>"/"+y.value.join("/")} onnav-crumbs=${m(u)} />
        <div.pane>
          <div.listing>
            ${p(()=>xt.value,()=>c`<svg-icon icon="lucide:loader" />`,()=>p(()=>mn.value.length,()=>c`
                  <data-index viewmode=${()=>o.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${x(()=>mn.value,h=>h,h=>c`<${Xs} ...${{get entry(){return h}}} />`)}
                  </data-index>
                `,()=>c`<p.empty>${()=>ae.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label="new folder" title="new folder" onclick=${m(Ha)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${Zs} />
        ${p(()=>!i.value,()=>c`<${Xe} placeholder="Filter this folder" ...${{get value(){return ae.value},onsearch:b}} />`)}
        ${p(()=>!l.value,()=>c`<${wn} />`)}
      `)}
  `}a(ac,"$$LibraryRatHtml");const oc=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function lc(e,t){return ic.call({props:e},e,t)}a(lc,"BrandRatHtml");function ic(e,t){return Rt("1npwj96",oc),c`
    <div.brand data-rat="1npwj96">
      ${p(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(ic,"$$BrandRatHtml");function rc(e,t){return sc.call({props:e},e,t)}a(rc,"MenuRatHtml");function sc(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],{$path:l}=Pn(RAT.app.router,{$path:null});function i(r){RAT.app.router.go(r);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return a(i,"go"),c`
    <nav.menu>
      <${lc} name="Files" icon="./app.svg" />
      ${x(()=>n,r=>r,r=>c`<button type="button" aria-current=${()=>l.value===r.route?"page":null} onclick=${m(()=>i(r.route))}><svg-icon icon=${()=>r.icon} /> ${()=>r.label}</button>`)}
      <hr />
      ${x(()=>o,r=>r,r=>c`<button type="button" disabled><svg-icon icon=${()=>r.icon} /> ${()=>r.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${m(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(sc,"$$MenuRatHtml");function cc(e,t){return uc.call({props:e},e,t)}a(cc,"PreferencesRatHtml");function uc(e,t){const n={"pattern-bg":"Background","pattern-tile":"Tiles"},o={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=a((i,r)=>Ra(i,r.detail?.value??r.target.value),"change");return c`
    <section>
      <h3>files</h3>
      ${x(()=>Object.keys(o),i=>i,i=>c`
          <label>
            <span>${()=>o[i].label}</span>
            <input-value look="segments" value=${()=>M.value[i]} onchange=${m(r=>l(i,r))}>
              ${x(()=>o[i].values,r=>r,r=>c`<input-option value=${()=>r[0]}>${()=>r[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${x(()=>Object.keys(n),i=>i,i=>c`
          <label>
            <span>${()=>n[i]}</span>
            <input-pattern opacity value=${()=>M.value[i]} onchange=${m(r=>l(i,r))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${p(()=>A.value,()=>c`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>A.value.name}</p>
          <div-x.actions>
            <${S} icon="lucide:folder-sync" label="change" ...${{onclick:Ye}} />
            <${S} icon="lucide:x" label="close" ...${{onclick:hs}} />
          </div-x>
        `,()=>c`<${S} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Ye}} />`)}
    </section>
  `}a(uc,"$$PreferencesRatHtml");function dc(e,t){return fc.call({props:e},e,t)}a(dc,"PreviewRatHtml");function fc(e,t){let n=w(null);z(()=>{const i=C.value;if(ke.value=null,n.value=null,!i||!Et(i))return;let r=null,s=!0;return Dt(Me(i.source),i.path,i.name).then(u=>{s&&(n.value=r=URL.createObjectURL(u))}),()=>{s=!1,r&&URL.revokeObjectURL(r)}});const o=a(i=>ke.value={height:i.target.naturalHeight,width:i.target.naturalWidth},"loaded"),l=a(()=>{g.value=null,RAT.app.toggle("context")},"info");return c`
    ${p(()=>!C.value,()=>c`
        <${L} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>c`
        <${L} ...${{get title(){return C.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${m(l)} /></${L}>
        <div.stage>
          ${p(()=>Et(C.value),()=>c`
              ${p(()=>n.value,()=>c`<img src=${()=>n.value} alt=${()=>C.value.name} onload=${m(o)} />`)}
            `,()=>c`<svg-icon icon=${()=>Da(C.value)} />`)}
        </div>
      `)}
  `}a(fc,"$$PreviewRatHtml");const Ba=`appearance:${new URL(".",location.href).pathname}`,yn={density:oe.densities,geometry:oe.geometries,mode:oe.modes},Ne=W(Ba,{}),pc=a(()=>oe.palettes().catch(()=>[]),"palettes");function mc(e,t){return Ne[e]=t||null,B(Ba,Ne),oe.set({[e]:t||null})}a(mc,"setAppearance");Object.keys(Ne).length&&oe.set(Ne);const hc=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function kn(e,t){return vc.call({props:e},e,t)}a(kn,"SettingsRatHtml");function vc(e,t){Rt("177zzh1",hc);let n=w({...Ne}),o=w([]);const l=k(()=>He.value);pc().then(s=>{o.value=s});function i(s,u){const b=u.detail?.value??u.target.value;n.value={...n.value,[s]:b},mc(s,b)}a(i,"change");async function r(){await Ss()&&P.success(`${e.name??"the app"} is installed`)}return a(r,"installApp"),c`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${m(s=>i("palette",s))}>
            ${x(()=>o.value,s=>s,s=>c`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(yn),s=>s,s=>c`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${m(u=>i(s,u))}>
                ${x(()=>yn[s],u=>u,u=>c`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${p(()=>!Fa,()=>c`
          <section>
            <h3>install</h3>
            ${p(()=>l.value,()=>c`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${m(r)} />`,()=>c`
                ${p(()=>xs,()=>c`<p.hint>Share, then "Add to Home Screen".</p>`,()=>c`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(vc,"$$SettingsRatHtml");function gc(e,t){return $c.call({props:e},e,t)}a(gc,"SyncRatHtml");function $c(e,t){let n=w(null),o=w(""),l=w("https"),i=w(""),r=w("");const s=a(f=>`${f.host}:${f.port}`,"keyOf"),u=a(()=>n.value??Pr(o.value,l.value),"target"),b=k(()=>se.value.filter(f=>!ye.value.some(ee=>s({host:ee.ip,port:ee.port})===s(f)))),h=k(()=>j.value.reduce((f,ee)=>f+Math.max(0,ee.size),0)),v=k(()=>Ee.value??{}),d=k(()=>u()),E=a(f=>f.ip??f.host,"hostOf"),J=a(f=>!!d.value&&s(d.value)===s({host:E(f),port:f.port??53317}),"isChosen"),q=a(f=>f.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),_=a(f=>Promise.resolve().then(f).catch(P.error),"run");function Ia(f){n.value={alias:f.alias,fingerprint:f.fingerprint??"",host:E(f),port:f.port??53317,protocol:f.protocol??"https"},o.value=""}a(Ia,"choose");function _a(f){l.value=f.detail?.value??f.target.value,n.value&&(n.value={...n.value,protocol:l.value})}a(_a,"protocol");function Yt(f,ee,Ua){return c`
      <li class=${()=>J(f)?"row selected":"row"}>
        <button.entry type="button" aria-pressed=${()=>String(J(f))} onclick=${m(()=>Ia(f))}>
          <span.thumb><svg-icon icon=${()=>ee} /></span>
          <span.text>
            <span.name>${()=>f.alias??E(f)}</span>
            <small>${()=>E(f)}:${()=>f.port??53317} · ${()=>f.protocol??"https"}</small>
          </span>
        </button>
        ${p(()=>Ua,()=>c`<btn-icon icon="lucide:x" label=${()=>"forget "+(f.alias??E(f))} onclick=${m(()=>Lr(f))} />`)}
      </li>
    `}return a(Yt,"receiver"),c`
    ${p(()=>!wa(),()=>c`
        <${L} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>c`
        <${L} title="Send">
          ${p(()=>kt.value,()=>c`<small.identity>${()=>kt.value.alias}</small>`)}
        </${L}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${m(Sa)} />
            </div-x>
            ${p(()=>ye.value.length||b.value.length,()=>c`
                <ul.rows>
                  ${x(()=>ye.value,f=>f,f=>c`${()=>Yt(f,q(f),!1)}`)}
                  ${x(()=>b.value,f=>f,f=>c`${()=>Yt(f,"lucide:history",!0)}`)}
                </ul>
              `,()=>c`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>o.value} oninput=${m(f=>{o.value=f.target.value??"",n.value=null})} />
              <input-value look="segments" value=${()=>d.value?.protocol??l.value} onchange=${m(_a)}>
                ${x(()=>ya,f=>f,f=>c`<input-option value=${()=>f}>${()=>f}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" value=${()=>i.value} oninput=${m(f=>i.value=f.target.value??"")} />
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
                        <btn-icon icon="lucide:x" label=${()=>"remove "+f.name} onclick=${m(()=>_r(f.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>c`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${S} icon="lucide:file-plus" label="pick files" ...${{onclick:a(()=>_(Br),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!j.value.length||!d.value} onclick=${m(()=>_(()=>Wr(u(),j.value,i.value)))}><svg-icon icon="lucide:send" /> send${()=>j.value.length?` ${j.value.length} · ${R.bytes(h.value)}`:""}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${Ue} ...${{get rows(){return[["folder",v.value.name||(v.value.tree?"chosen":"none yet")],["state",v.value.enabled?"on"+(v.value.lastSync?" · last "+R.date(v.value.lastSync):""):"off"],["to",v.value.enabled?v.value.host+":"+v.value.port:null]]}}} />
            ${p(()=>!v.value.enabled,()=>c`<input-text placeholder="only on this wi-fi (ssid), optional" value=${()=>r.value} oninput=${m(f=>r.value=f.target.value??"")} />`)}
            <div-x.actions>
              <${S} icon="lucide:folder-search" label="folder" ...${{onclick:a(()=>_(qr),"onclick")}} />
              ${p(()=>v.value.enabled,()=>c`
                  <${S} icon="lucide:refresh-cw" label="now" ...${{onclick:a(()=>_(Gr),"onclick")}} />
                  <${S} icon="lucide:pause" label="turn off" ...${{onclick:a(()=>_(Kr),"onclick")}} />
                `,()=>c`<${S} icon="lucide:play" label="turn on" ...${{get disabled(){return!v.value.tree||!d.value},onclick:a(()=>_(()=>Vr(u(),{pin:i.value,ssid:r.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a($c,"$$SyncRatHtml");function Nc(e,t){return bc.call({props:e},e,t)}a(Nc,"AppRatHtml");function bc(e,t){RAT.app.hold(Promise.all([Ji(),gr()]).catch(P.error)),Ts("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&Sa(),l!=="/sync"&&n&&zr(),n=l==="/sync"}),c`
    <rat-area name="menu" dock="start"><${rc} /></rat-area>
    <rat-view name="dashboard" route="/"><${Ys} /></rat-view>
    <rat-view name|route="library"><${nc} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${dc} /></rat-view>
    <rat-view name|route="sync"><${gc} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${m(a(l=>{l.detail?.open||(ue.value=null)},"ontoggle"))}><div.context><${zs} /></div></rat-area>
    <rat-area name="config" dock="end"><${kn} name="Files"><${cc} /></${kn}></rat-area>
  `}a(bc,"$$AppRatHtml");export{Nc as default};
