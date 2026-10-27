const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-iOv4fdFf.js","./index-LJN-aEqT.css"])))=>i.map(i=>d[i]);
var Ga=Object.defineProperty;var a=(e,t)=>Ga(e,"name",{value:t,configurable:!0});import{E as Ka,G as Xt,H as b,J as Ee,K as Qt,L as kn,M as xn,O as Ya,P as Ja,Q as Sn,V as Xa,W as Qa,X as Za,Y as Tn,Z as eo,a0 as En,a1 as to,a2 as no,a3 as ao,a4 as oo,a5 as Rn,a6 as lo,a7 as An,a8 as Re,a9 as io,aa as ro,ab as lt,ac as so,n as x,ad as J,ae as v,_ as co,h as c,f as k,af as M,w as h,ag as uo,ah as Tt,ai as ne}from"./index-iOv4fdFf.js";import{p as fo,a as po}from"./keys-CWTtq0D5.js";import{isCheckable as On,isMultiSelect as Cn,isArray as dt,isString as Je,isObject as Nn,isFn as Mn,isElementish as ho,isIterable as mo}from"https://esm.sh/jsr/@pulgasari/is";import{toKebabCase as jn,toCamelCase as Dn}from"https://esm.sh/jsr/@pulgasari/str";import{d as vo}from"./drivers-boxMR0T-.js";import"https://esm.sh/jsr/@pulgasari/logger";function g(e,{keys:t=null,prevent:n=!1,times:o=0}={}){const l=t?fo(t):null;let r=o;return function(i){if(!(o&&!r)&&!(l&&!po(i,l))){n&&i.preventDefault(),o&&r--;try{const s=(typeof e=="string"?Ka(e):e).call(this,i);typeof s?.catch=="function"&&s.catch(u=>Xt(this,u))}catch(s){Xt(this,s)}}}}a(g,"listener");function go(e,...t){const n=b(e);if(!n)return null;const o=Ee(t);return o.length&&n.classList.add(...o),n}a(go,"addClass$1");function $o(e,t){const n=b(e);return n?t?n.getAttribute(jn(t)):Object.fromEntries([...n.attributes].map(o=>[o.name,o.value])):t?null:{}}a($o,"getAttr");function bo(e,t,{cast:n=!0}={}){const o=b(e);if(!o)return t?null:{};if(t){const r=o.dataset[Dn(t)];return r===void 0?null:n?Qt(r):r}const l={};for(const[r,i]of Object.entries(o.dataset))l[r]=n?Qt(i):i;return l}a(bo,"getData");function wo(e,{box:t="border"}={}){const n=b(e);if(!n)return null;if(t==="content")return{width:n.clientWidth,height:n.clientHeight};if(t==="scroll")return{width:n.scrollWidth,height:n.scrollHeight};const o=n.getBoundingClientRect();return{width:o.width,height:o.height}}a(wo,"getElementSize");function yo(e){return b(e)?.innerHTML??null}a(yo,"getHTML");const ko=a(e=>e.startsWith("--"),"isVar"),xo=a(e=>ko(e)?e:jn(e),"propertyName");function So(e,t,n=!1){const o=b(e);if(!o)return null;const l=n?o.style:getComputedStyle(o);return t?l.getPropertyValue(xo(t)).trim()||null:l}a(So,"getStyle");function To(e){return b(e)?.textContent??null}a(To,"getText");const Zt={bool:a(e=>!!(dt(e)?e.length:e),"bool"),date:a(e=>xn(e),"date"),number:a(e=>kn(e)??0,"number"),string:a(e=>dt(e)?e.join(", "):String(e??""),"string")},Eo=new Set(["button","data","input","meter","option","output","progress","select","textarea"]),Ro=a(e=>Eo.has(e.localName)||e.localName?.includes("-")&&"value"in e,"hasValue");function Hn(e,t=null){const n=b(e);if(!n)return null;const o=On(n)?n.checked:Cn(n)?[...n.selectedOptions].map(l=>l.value):Ro(n)?n.value:n.textContent??"";return t&&Zt[t]?Zt[t](o):o}a(Hn,"getValue");function Ao(e,t){const n=b(e);if(!n)return!1;const o=Ee(t);return o.length>0&&o.every(l=>n.classList.contains(l))}a(Ao,"hasClass$1");function Oo(e,...t){const n=b(e);if(!n)return null;const o=Ee(t);return o.length&&n.classList.remove(...o),n}a(Oo,"removeClass$1");function Co(e,t){const n=b(e);return n?(n.setAttribute("class",Ee(t).join(" ")),n):null}a(Co,"setClass");const No=a(e=>Je(e)?e:Nn(e)||dt(e)?JSON.stringify(e):String(e),"encode");function Mo(e,t,n){const o=b(e);if(!o)return null;const l=Je(t)?{[t]:n}:t??{};for(const[r,i]of Object.entries(l)){const s=Dn(r);i==null?delete o.dataset[s]:o.dataset[s]=No(i)}return o}a(Mo,"setData");function jo(e){const t=document.createElement("template");return t.innerHTML=String(e).trim(),t.content}a(jo,"createHTML");function Do(e,t){const n=b(e);return n?(n.replaceChildren(jo(t??"")),n):null}a(Do,"setHTML");function Ho(e,t){const n=b(e);return n?(n.textContent=t==null?"":String(t),n):null}a(Ho,"setText");function Po(e){e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}a(Po,"notifyChange");function Fo(e,t,{notify:n=!1}={}){const o=b(e);if(!o)return null;if(On(o))o.checked=!!t;else if(Cn(o)){const l=Ya(t).map(String);for(const r of o.options)r.selected=l.includes(r.value)}else"value"in o?o.value=t instanceof Date&&o.type==="date"?Ja(t):t??"":o.textContent=t??"";return n&&Po(o),o}a(Fo,"setValue");function Lo(e,t,n){const o=b(e);if(!o)return null;if(Nn(t)){for(const[l,r]of Object.entries(t))o.classList.toggle(l,!!r);return o}for(const l of Ee(t))o.classList.toggle(l,n);return o}a(Lo,"toggleClass$1");const Pn=Symbol.for("domina.chain"),Fn=a(e=>t=>typeof t===e,"isTypeOf"),zo=a(e=>e==null||e==="","isBlank"),Xe=a(e=>e?.[Pn]===!0,"isChain"),ue=Fn("function"),Ln=a(e=>e!==null&&typeof e=="object"&&[Object.prototype,null].includes(Object.getPrototypeOf(e)),"isPlainObject"),Io=Fn("string"),Bo=a(e=>typeof e?.addEventListener=="function","isTarget"),_o=a(e=>typeof e?.[Symbol.iterator]=="function","hasIterator"),zn=a(e=>e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase()),"toCamelCase"),Et=a(e=>e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),"toKebabCase"),In={};In.ERROR=e=>{throw new TypeError("[domina] "+e)};const Qe=a((e,t)=>Ln(e)?Object.entries(e):[[e,t]],"entriesOf"),Wo={params:{name:"string",value:"string"},read:a((e,t)=>$o(e,t),"read"),write:a((e,t,n)=>{for(const[o,l]of Qe(t,n))Et(o).startsWith("aria-")?Bn(e,o,l):Xa(e,o,l)},"write")},ft=a(e=>{const t=Et(e);return t.startsWith("aria-")?t:`aria-${t}`},"ariaName");function Bn(e,t,n){n==null?e.removeAttribute(ft(t)):e.setAttribute(ft(t),Array.isArray(n)?n.join(" "):String(n))}a(Bn,"writeAria");function Uo(e){const t=e.getAttributeNames().filter(n=>n.startsWith("aria-"));return Object.fromEntries(t.map(n=>[zn(n.slice(5)),e.getAttribute(n)]))}a(Uo,"readAria");const qo={params:{name:"string",value:"string"},read:a((e,t)=>t==null?Uo(e):e.getAttribute(ft(t)),"read"),write:a((e,t,n)=>{for(const[o,l]of Qe(t,n))Bn(e,o,l)},"write")},ke=a(e=>{const t=Et(e);return zn(t.startsWith("data-")?t.slice(5):t)},"dataKey"),_n=a((e,t)=>{delete e.dataset[ke(t)]},"removeData"),Vo={params:{name:"string",value:"json"},read:a((e,t)=>bo(e,t==null?void 0:ke(t)),"read"),write:a((e,t,n)=>{for(const[o,l]of Qe(t,n))l==null?_n(e,o):Mo(e,ke(o),l)},"write")},Go={params:{name:"string",value:"string"},read:a((e,t)=>t==null?{...e.dataset}:e.dataset[ke(t)]??null,"read"),write:a((e,t,n)=>{for(const[o,l]of Qe(t,n))l==null?_n(e,o):e.dataset[ke(o)]=l},"write")},Ko={write:go,params:{names:"string"}},Yo={write:Oo,params:{names:"string"}},Jo={write:Lo,params:{names:"string",force:"bool"}},Xo={read:Ao,params:{names:"string"}},Qo={params:{names:"string"},read:a(e=>[...e.classList],"read"),write:Co},Zo={read:yo,write:Do,params:{html:"html"}},el={read:So,write:Sn,params:{property:"string",value:"string"}},tl={read:To,write:Ho,params:{text:"string"}},nl={read:Hn,write:Fo,params:{value:"json"},reads:a(e=>e.length===0,"reads")},al=a(e=>Object.keys(e).every(t=>t==="box"),"onlyBox"),ol={object:!0,params:{w:"number",h:"number",box:"string"},reads:a(([e])=>e==null||al(e),"reads"),read(e,{box:t}={}){const n=wo(e,{box:t});return n&&{h:n.height,w:n.width}},write(e,{h:t,w:n}){const o={};n!==void 0&&(o.width=n),t!==void 0&&(o.height=t),Sn(e,o)}},ll=Object.freeze(Object.defineProperty({__proto__:null,addClass:Ko,aria:qo,attr:Wo,class:Qo,data:Vo,dataset:Go,hasClass:Xo,html:Zo,removeClass:Yo,size:ol,style:el,text:tl,toggleClass:Jo,value:nl},Symbol.toStringTag,{value:"Module"}));function il(e,t,n,o,l){const r=b(e),i=Qa(t).map(m=>Za[m]??m);if(!r||!i.length||!Mn(o))return()=>{};const s=n.includes(":scope"),u=a(m=>{if(!s)return m?.closest?.(n);const $=new Set(r.querySelectorAll(n));for(let y=m;y&&y!==r;y=y.parentNode)if($.has(y))return y;return null},"matchOf"),d=a(m=>{const $=u(m.target);$&&r.contains($)&&o.call($,m,$)},"listener");for(const m of i)r.addEventListener(m,d,l);return()=>{for(const m of i)r.removeEventListener(m,d,l)}}a(il,"delegateEvent");const pt=new WeakMap,Wn=a(e=>String(e??"").split(/[\s,]+/).filter(Boolean),"typesOf");function rl(e){let t=pt.get(e);return t||pt.set(e,t=new Set),t}a(rl,"recordsOf");function sl(e,t,n,o,l,r){const i=rl(e),s={handler:o,selector:n,stop:null,type:t},u=a(()=>{s.stop(),i.delete(s)},"drop"),d=a((m,$)=>{r&&u(),o(m,$)},"call");return s.stop=n?il(e,t,n,d,l):Tn(e,t,m=>d(m,e),l),i.add(s),l?.signal?.addEventListener("abort",()=>i.delete(s),{once:!0}),u}a(sl,"add$2");function cl(e,t,n,o,l,{once:r=!1}={}){if(!ue(o))throw new TypeError("[domina] the handler is not a function");if(l?.signal?.aborted)return()=>{};const i=Wn(t).map(s=>sl(e,s,n||null,o,l,r));return()=>{for(const s of i)s()}}a(cl,"listen");function ul(e,t,n){const o=pt.get(e);if(!o)return;const l=t?new Set(Wn(t)):null;for(const r of o)l&&!l.has(r.type)||n&&r.handler!==n||(r.stop(),o.delete(r))}a(ul,"unlisten");function Un(e,t,n){const[o,l,r,i]=typeof t[1]=="function"?[t[0],null,...t.slice(1)]:t;for(const s of e.elements)cl(s,o,l,r,i,{once:n});return e}a(Un,"subscribe");const dl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Un(this,e,!1)}},fl={kind:"event",params:{types:"string",selector:"string",handler:"function"},method(...e){return Un(this,e,!0)}},pl={kind:"event",params:{types:"string",handler:"function"},method(e,t){for(const n of this.elements)ul(n,e,t);return this}},hl={kind:"event",params:{type:"string",detail:"json"},write:a((e,t,n,o)=>eo(e,t,n,o),"write")},ml=Object.freeze(Object.defineProperty({__proto__:null,emit:hl,off:pl,on:dl,once:fl},Symbol.toStringTag,{value:"Module"}));function vl(e){return b(e)?.replaceChildren()??null}a(vl,"clearElement");function gl(e,t=!0){return b(e)?.cloneNode(t)??null}a(gl,"cloneElement");function $l(e,t,...n){const o=b(e);if(!o)return null;const l=En(n);if(!l.length)return o;const r=o.children,i=t<0?r.length+t:t,s=r[Math.max(0,Math.min(i,r.length))]??null;return s?s.before(...l):o.append(...l),o}a($l,"insertAt");function bl(...e){const t=[];for(const n of e.flat(1/0)){const o=b(n);o&&(o.remove(),t.push(o))}return t}a(bl,"removeElement");function wl(e,...t){const n=b(e);if(!n?.parentNode)return null;const o=En(t);return n.replaceWith(...o),o}a(wl,"replaceElement");const yl="auto-asc",kl=/[̀-ͯ]/g,xl=/\d+/g,Sl=/^[\x00-\x7f]*$/,en=a(e=>{let t=String(e);return Sl.test(t)||(t=t.normalize("NFD").replace(kl,"")),t.toLowerCase().replace(xl,n=>n.padStart(16,"0"))},"textKey"),tn=a(e=>xn(e)?.getTime()??null,"dateKey"),nn={date:a(e=>e.map(tn),"date"),num:a(e=>e.map(kn),"num"),regular:a(e=>e.map(en),"regular"),auto:a(e=>{const t=e.map(tn);return t.every((n,o)=>n!==null||e[o]==="")&&t.some(n=>n!==null)?t:e.map(en)},"auto")},Tl=a((e,t,n)=>e===null&&t===null?0:e===null?1:t===null?-1:e<t?-n:e>t?n:0,"compareKeys");function El({selector:e,order:t},n){const o=e?Rn(e):null,l=n.map(s=>Hn(o?s.querySelector(o):s)??"");if(Mn(t))return{values:l,order:t};const[r,i]=t.includes("-")?t.split("-"):["auto",t];return{keys:(nn[r]??nn.auto)(l),dir:i==="desc"?-1:1}}a(El,"column");function Rl({container:e,item:t,indicators:n}){const o=to("sortElements",e,t);if(!o)return[];const{$container:l,items:r}=o,i=no(n,oo(yl));if(i.some(s=>s.order==="random"))ao(r);else{const s=i.map(m=>El(m,r)),u=r.map((m,$)=>$);u.sort((m,$)=>{for(const{dir:y,keys:w,order:f,values:O}of s){const ge=f?f(O[m],O[$],r[m],r[$]):Tl(w[m],w[$],y);if(ge)return ge}return 0});const d=u.map(m=>r[m]);r.splice(0,r.length,...d)}return l.append(...r),r}a(Rl,"sortElements");function Al(e){const t=b(e);if(!t?.parentNode)return null;const n=[...t.childNodes];return t.replaceWith(...n),n}a(Al,"unwrapElement");function Ol(e,t="div",n={}){const o=b(e);if(!o?.parentNode)return null;const l=Je(t)?lo(t,n):b(t);return l?(o.replaceWith(l),l.append(o),l):null}a(Ol,"wrapElement");const Cl=a((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder$1"),qn=a(e=>e.length<2?e:[...new Set(e)],"unique");function it(e,t){try{return e.querySelectorAll?Array.from(e.querySelectorAll(t)):[]}catch{return[]}}a(it,"select");function Nl(e,t){if(t==null)return it(document,e);const n=de(t);return n.length===1?it(n[0],e):qn(n.flatMap(o=>it(o,e))).sort(Cl)}a(Nl,"query$1");function de(e,t){return zo(e)?[]:Io(e)?Nl(e,t):Xe(e)?e.elements:Bo(e)?[e]:_o(e)?qn(Array.from(e,n=>de(n)).flat()):[]}a(de,"collect");class E{static{a(this,"Chain")}constructor(t,n=!1){this.elements=t,this.many=n}get[Pn](){return!0}get length(){return this.elements.length}get el(){return this.elements[0]??null}get all(){return this.many?this:new E(this.elements,!0)}[Symbol.iterator](){return this.elements[Symbol.iterator]()}each(t){return this.elements.forEach(t),this}map(t){return this.elements.map(t)}}const Vn=a(e=>e?.nodeType===1,"isElement");function Rt(e,t,n){return e.flatMap(a(function o(l){return ue(l)?o(l(t,n)):l==null||l===!1?[]:Array.isArray(l)?l.flatMap(o):Xe(l)?l.elements:[l]},"resolve"))}a(Rt,"contentFor");function At(e,t,n){t.length<2||n.some(o=>Xe(o)||o?.nodeType)&&In.ERROR(`${e}(): one node cannot go to ${t.length} places. pass a string, or a function (element, index) -> node`)}a(At,"assertPlaceable");const Ze=a(e=>({kind:"structure",params:{content:"string"},method(...t){return At(e,this,t),this.elements.forEach((n,o)=>n[e](...Rt(t,n,o))),this}}),"placing"),Ml=Ze("append"),jl=Ze("prepend"),Dl=Ze("before"),Hl=Ze("after"),Pl={kind:"structure",params:{index:"number",content:"string"},method(e,...t){return At("insert",this,t),this.elements.forEach((n,o)=>$l(n,e,...Rt(t,n,o))),this}},Gn=a(e=>({kind:"structure",params:{target:"string"},method(t){const[n]=de(t);return n&&n[e](...this.elements),this}}),"moving"),Fl=Gn("append"),Ll=Gn("prepend"),zl={kind:"structure",params:{content:"string"},method(...e){At("replace",this,e);const t=this.elements.flatMap((n,o)=>wl(n,...Rt(e,n,o))??[]);return new E(t.filter(Vn),this.many)}},Il={kind:"structure",params:{tag:"string",props:"json"},method(e="div",t={}){const n=this.elements.map((o,l)=>Ol(o,ue(e)?e(o,l):e,t));return new E(n.filter(Boolean),this.many)}},Bl={kind:"structure",params:{},method(){const e=this.elements.flatMap(t=>Al(t)??[]);return new E(e.filter(Vn),this.many)}},_l={kind:"structure",params:{},write:a(e=>{vl(e)},"write")},Wl={kind:"structure",params:{},method(){return bl(this.elements),this}},Ul={kind:"structure",params:{deep:"bool"},method(e=!0){return new E(this.elements.map(t=>gl(t,e)),this.many)}},ql={kind:"structure",params:{item:"string",by:"string"},method(e,...t){for(const n of this.elements)Rl({container:n,indicators:t.length?t:[{}],item:e});return this}},Vl=Object.freeze(Object.defineProperty({__proto__:null,after:Hl,append:Ml,appendTo:Fl,before:Dl,clear:_l,clone:Ul,insert:Pl,prepend:jl,prependTo:Ll,remove:Wl,replace:zl,sort:ql,unwrap:Bl,wrap:Il},Symbol.toStringTag,{value:"Module"}));function Gl(e,t){const n=b(e);if(!n)return[];const o=An(t);return[...n.children].filter(o)}a(Gl,"getChildren");function Kl(e,t){return b(e)?.closest(Rn(t))??null}a(Kl,"getClosest");function Yl(e){const t=b(e);return t?.parentElement?[...t.parentElement.children].indexOf(t):-1}a(Yl,"getIndex");function Jl(e,t){return Re(b(e),"nextElementSibling",t,!1)[0]??null}a(Jl,"getNext");function Xl(e,t){return Re(b(e),"nextElementSibling",t,!0)}a(Xl,"getNextAll");function Ql(e,t){const n=b(e)?.parentElement??null;return n&&io(n,t)?n:null}a(Ql,"getParent");function Zl(e,t){return Re(b(e),"parentElement",t,!0)}a(Zl,"getParents");function ei(e,t){return Re(b(e),"previousElementSibling",t,!1)[0]??null}a(ei,"getPrev");function ti(e,t){return Re(b(e),"previousElementSibling",t,!0)}a(ti,"getPrevAll");function ni(e,t){const n=b(e);if(!n?.parentElement)return[];const o=An(t);return[...n.parentElement.children].filter(l=>l!==n&&o(l))}a(ni,"getSiblings");const ai=a((e,t)=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1,"byDocumentOrder");function Ot(e,t){const n=e.elements.flatMap(l=>[].concat(t(l)??[])),o=n.length<2?n:[...new Set(n)].sort(ai);return new E(o,e.many)}a(Ot,"step");const Ct=a((e,t)=>ue(t)?t(e):e.matches?.(t),"matches"),q=a(e=>({kind:"traversal",params:{filter:"string"},method(t){return Ot(this,n=>e(n,t))}}),"walking"),oi={kind:"traversal",params:{selector:"string"},method(e){return Ot(this,t=>de(e,t))}},li={kind:"traversal",params:{selector:"string"},method(e){return Ot(this,t=>Kl(t,e))}},ii=q(Gl),ri=q(Ql),si=q(Zl),ci=q(ni),ui=q(Jl),di=q(ei),fi=q(Xl),pi=q(ti),hi={kind:"traversal",params:{test:"string"},method(e){return new E(this.elements.filter((t,n)=>ue(e)?e(t,n):Ct(t,e)),this.many)}},mi={kind:"traversal",params:{test:"string"},method(e){return new E(this.elements.filter((t,n)=>!(ue(e)?e(t,n):Ct(t,e))),this.many)}},vi={kind:"traversal",params:{selector:"string"},method(e){return new E(this.elements.filter(t=>t.querySelector?.(e)),this.many)}},gi={kind:"traversal",params:{index:"number"},method(e){const t=this.elements.at(e);return new E(t?[t]:[],this.many)}},$i={kind:"traversal",params:{},method(){return this.at(0)}},bi={kind:"traversal",params:{},method(){return this.at(-1)}},wi={kind:"traversal",params:{start:"number",end:"number"},method(e,t){return new E(this.elements.slice(e,t),this.many)}},yi={kind:"read",params:{selector:"string"},method(e){return this.elements.some(t=>Ct(t,e))}},ki={params:{},read:Yl},xi=Object.freeze(Object.defineProperty({__proto__:null,at:gi,children:ii,closest:li,filter:hi,find:oi,first:$i,has:vi,index:ki,is:yi,last:bi,next:ui,nextAll:fi,not:mi,parent:ri,parents:si,prev:di,prevAll:pi,siblings:ci,slice:wi},Symbol.toStringTag,{value:"Module"}));function Si(e){const t=b(e);if(!t)return null;const n=t.getBoundingClientRect(),o=n.top+window.scrollY,l=n.left+window.scrollX;return{x:o,y:l,left:o,top:l}}a(Si,"getElementOffset");function Ti(e){const t=b(e);if(!t)return null;const n=t.offsetLeft,o=t.offsetTop;return{x:n,y:o,left:n,top:o}}a(Ti,"getElementPosition");function Ei(e){return b(e)?.getBoundingClientRect()??null}a(Ei,"getElementRect");function Ri(e,{ratio:t=0}={}){const n=b(e);if(!n)return!1;const o=n.getBoundingClientRect(),l=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth,i=Math.min(o.bottom,l)-Math.max(o.top,0),s=Math.min(o.right,r)-Math.max(o.left,0);return i<=0||s<=0?!1:i*s/(o.height*o.width||1)>=t}a(Ri,"isElementInViewport");function Kn(e,t={}){const n=b(e)??window;return n?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest",...t}),n}a(Kn,"scrollTo$1");function Ai(e,t={}){return Kn(e,{behavior:"auto",...t})}a(Ai,"jumpTo$1");const Oi=Symbol.for("domina.node");function Yn(e,t){return e?e[Oi]===!0?[e.node].filter(Boolean):Je(e)?ro(e,t):ho(e)?[e]:mo(e)?[...e].flatMap(n=>Yn(n,t)):[b(e,t)].filter(Boolean):[]}a(Yn,"resolveElements");function Ci(e,{name:t,subtree:n=!1}={}){const o=a(u=>!t||u.animationName===t,"checkName"),l=a(u=>u.finished.catch(()=>null),"checkFinish"),r=a(u=>u.getAnimations({subtree:n}),"getNames"),i=Yn(e),s=i.flatMap(r).filter(o);return Promise.all(s.map(l)).then(()=>i)}a(Ci,"waitForAnimations");function Ni(e,t,n,o){let l;return l=Tn(e,t,a(i=>{l(),n(i)},"wrapped"),o),l}a(Ni,"onceEvent");function Mi(e,t,{signal:n,timeout:o}={}){return new Promise((l,r)=>{const i=Ni(e,t,u=>{clearTimeout(s),l(u)}),s=o?setTimeout(()=>{i(),r(new Error(`waitForEvent: ${t} timed out`))},o):null;n?.addEventListener("abort",()=>{i(),clearTimeout(s),r(n.reason)})})}a(Mi,"waitForEvent");const ji={params:{},read:Si},Di={params:{},read:Ti},Hi={params:{},read:Ei},Pi={params:{ratio:"number"},read:a((e,t=0)=>Ri(e,{ratio:t}),"read")},Fi={kind:"view",params:{options:"json"},method(e){return this.el&&Kn(this.el,e),this}},Li={kind:"view",params:{options:"json"},method(e){return this.el&&Ai(this.el,e),this}},zi={kind:"wait",params:{name:"string"},method(e){return Ci(this.elements,{name:e}).then(()=>this)}},Ii={kind:"wait",params:{type:"string",timeout:"number"},method(e,t){return this.el?Mi(this.el,e,{timeout:t}):Promise.reject(new Error("[domina] wait(): the chain is empty"))}},Bi=Object.freeze(Object.defineProperty({__proto__:null,finished:zi,inView:Pi,jumpTo:Li,offset:ji,position:Di,rect:Hi,scrollTo:Fi,wait:Ii},Symbol.toStringTag,{value:"Module"})),Jn=new Map,_i=a(e=>e.length===0||e.length===1&&!Ln(e[0]),"readsByDefault"),Wi=a(({kind:e,method:t,read:n,write:o})=>e??(t?"method":n&&o?"access":n?"read":"write"),"kindOf");function Ui(e,{method:t,read:n,reads:o=_i,write:l}){return t||function(...r){const{elements:i}=this;if(n&&(!l||o(r)))return this.many?i.map(s=>n(s,...r)):i.length?n(i[0],...r):null;if(n&&r.length>1&&r.at(-1)===void 0)throw new TypeError(`[domina/chain] ${e}(): undefined is not a value, null removes`);if(n&&typeof r[1]=="function"){const[s,u]=r;return i.forEach((d,m)=>l(d,s,u(n(d,s),d,m))),this}for(const s of i)l(s,...r);return this}}a(Ui,"build");function Xn(e,t){if(e in E.prototype)throw new Error(`[domina/chain] "${e}" exists already`);const n=typeof t=="function"?{write:t}:t;Object.defineProperty(E.prototype,e,{configurable:!0,value:Ui(e,n),writable:!0}),Jn.set(e,{...n,kind:Wi(n),name:e,params:n.params??{}})}a(Xn,"define");function Qn(e){for(const[t,n]of Object.entries(e))Xn(t,n)}a(Qn,"extend");Qn({...ll,...ml,...Vl,...xi,...Bi});function Ae(e,t){return Xe(e)?e:new E(de(e,t))}a(Ae,"d");function qi(e,t){return new E(de(e,t),!0)}a(qi,"dd");Ae.all=qi;Ae.api=Jn;Ae.define=Xn;Ae.extend=Qn;new Proxy(()=>{},{apply:a((e,t,[n,o])=>Ae(n,o),"apply"),get:a((e,t)=>lt[t],"get"),has:a((e,t)=>t in lt,"has"),set:a((e,t,n)=>(lt[t]=n,!0),"set")});function fe(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}a(fe,"read$1");function X(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}a(X,"write$1");const Me=a(e=>(t,n)=>so.notify(t,{...n,type:e}),"notify"),j=Object.assign(Me("info"),{error:Me("error"),info:Me("info"),success:Me("success")}),Vi=a((e,t)=>e.kind!==t.kind?e.kind==="directory"?-1:1:e.name.localeCompare(t.name,void 0,{numeric:!0,sensitivity:"base"}),"byName");async function I(e,t=[]){let n=e;for(const o of t)n=await n.getDirectoryHandle(o);return n}a(I,"dirAt");async function Gi(e,t=[]){const n=await I(e,t),o=[];for await(const r of n.values())o.push(r);return(await Promise.all(o.map(async r=>{if(r.kind==="directory")return{kind:"directory",name:r.name};const i=await r.peekFile?.()??await r.getFile();return{kind:"file",lastModified:i.lastModified,name:r.name,size:i.size,type:i.type}}))).sort(Vi)}a(Gi,"list$1");async function Nt(e,t,n){return(await(await I(e,t)).getFileHandle(n)).getFile()}a(Nt,"readFile");async function Ki(e,t,n){await(await I(e,t)).getDirectoryHandle(n,{create:!0})}a(Ki,"mkdir");async function Yi(e,t,n){await(await I(e,t)).removeEntry(n,{recursive:!0})}a(Yi,"remove$3");async function Ji(e,t,n,o,l){const r=await I(e,t),i=l==="directory"?await r.getDirectoryHandle(n):await r.getFileHandle(n);if(typeof i.move=="function")try{await i.move(o);return}catch{}l==="directory"?await jt(i,r,o):await Mt(i,r,o),await r.removeEntry(n,{recursive:!0})}a(Ji,"rename");async function Mt(e,t,n,o){const l=await e.getFile(),i=await(await t.getFileHandle(n,{create:!0})).createWritable();if(typeof WritableStream>"u"||!(i instanceof WritableStream)){await i.write(await l.arrayBuffer()),await i.close();return}try{await l.stream().pipeTo(i,{signal:o})}catch(s){throw await i.abort?.().catch(()=>{}),s}}a(Mt,"copyFile");async function jt(e,t,n,o,l=()=>{}){const r=await t.getDirectoryHandle(n,{create:!0});for await(const i of e.values()){if(o?.aborted)throw new DOMException("copy aborted","AbortError");i.kind==="directory"?await jt(i,r,i.name,o,l):(await Mt(i,r,i.name,o),l())}}a(jt,"copyTree");const Dt="root",R=x(null),oe=x(null),Zn=x(!1),Ht=a(()=>RAT.app.database.root,"table");let Xi=null;const ea=a(async()=>Xi??=await vo("folders"),"folders"),ta=a(async(e,t,n)=>{try{return e[t]?await e[t]({mode:n}):"granted"}catch{return"denied"}},"ask"),na=a(()=>RAT.platform!=="web"||typeof globalThis.showDirectoryPicker=="function","supported");async function Qi(){const e=await Ht().get(Dt);if(e){const t=(await ea()).revive(e.handle);R.value={addedAt:e.addedAt,handle:t,name:e.name},oe.value=await ta(t,"queryPermission","read")}Zn.value=!0}a(Qi,"load$1");async function Zi(){const{keep:e,pick:t}=await ea(),n=await t({id:"files"});if(!n)return null;const o={addedAt:Date.now(),handle:e(n),name:n.name};return await Ht().set(Dt,o),R.value={addedAt:o.addedAt,handle:n,name:o.name},oe.value="granted",R.value}a(Zi,"grant");async function er(){const e=R.value?.handle;return e?(oe.value=await ta(e,"requestPermission","read"),{granted:oe.value==="granted"}):{granted:!1}}a(er,"reconnect$1");async function tr(){await Ht().delete(Dt),R.value=null,oe.value=null}a(tr,"forget$2");const Pt=a((e,t)=>{const n=x(fe(e,t));return J(()=>X(e,n.value)),n},"stored$2"),Pe=Pt("files:bookmarks",[]),ht=Pt("files:folderTyped",{}),mt=Pt("files:folderTypes",[]),aa=[{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:film",id:"video",label:"Videos"}],_e=a(()=>R.value?.addedAt??R.value?.name??"","folderId"),vt=a(e=>`${_e()}:${e.join("/")}`,"keyOf"),oa=a((e,t)=>e.join("/")===t.join("/"),"samePath$1"),la=a(()=>[...aa,...mt.value],"types");function Ft(e){const t=ht.value[vt(e)];return t?la().find(n=>n.id===t)??null:null}a(Ft,"typeOf");function gt(e,t){const n={...ht.value};t?n[vt(e)]=t:delete n[vt(e)],ht.value=n}a(gt,"setType");function nr({icon:e="lucide:folder",label:t}){const n=`custom-${Date.now().toString(36)}`;return mt.value=[...mt.value,{icon:e,id:n,label:t}],n}a(nr,"addType");function ar(e,t){const n=e.filter(i=>i.kind==="file"),o={};for(const i of n)o[t(i)]=(o[t(i)]??0)+1;const[l,r]=Object.entries(o).sort((i,s)=>s[1]-i[1])[0]??[];return l&&r/n.length>=.6?aa.find(i=>i.id===l)??null:null}a(ar,"suggest");const ia=a(()=>Pe.value.filter(e=>e.folder===_e()),"bookmarks"),ra=a(e=>ia().some(t=>oa(t.path,e)),"isBookmarked");function or(e,t){Pe.value=ra(e)?Pe.value.filter(n=>!(n.folder===_e()&&oa(n.path,e))):[...Pe.value,{folder:_e(),name:t,path:e}]}a(or,"toggleBookmark");const lr=a(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.NativeHttp??null:null,"nativeRaw");async function ir(e){if(e==null)return null;const t=new Uint8Array(e instanceof ArrayBuffer?e:ArrayBuffer.isView(e)?e.buffer:await new Blob([e]).arrayBuffer());let n="";for(let o=0;o<t.length;o+=32768)n+=String.fromCharCode(...t.subarray(o,o+32768));return btoa(n)}a(ir,"toBase64");const rr=a(e=>Uint8Array.from(atob(e??""),t=>t.charCodeAt(0)),"fromBase64"),sr=new Set([101,204,205,304]);async function cr(e,{body:t,headers:n={},method:o="GET",signal:l,timeout:r}={}){const i=lr();if(!i)return fetch(e,{body:t,headers:n,method:o,signal:l});const s=await i.request({body:await ir(t),headers:n,method:o,timeout:r,url:e});return new Response(sr.has(s.status)?null:rr(s.data),{headers:s.headers,status:s.status,statusText:s.statusText})}a(cr,"request$2");const ur=a(e=>"Basic "+btoa(unescape(encodeURIComponent(`${e.username||""}:${e.password||""}`))),"authHeader"),dr=a(e=>e.split("/").filter(Boolean).map(encodeURIComponent).join("/"),"encodePath"),sa=a(e=>e.url.endsWith("/")?e.url:e.url+"/","baseUrl"),te=a((...e)=>e.flatMap(t=>String(t??"").split("/")).filter(Boolean).join("/"),"join");function ca(e,t="",n=!1){const o=new URL(dr(t),sa(e)).href;return n&&!o.endsWith("/")?o+"/":o}a(ca,"urlFor");const fr={401:"Authentication failed, check the username and password.",403:"Forbidden, the account may lack permission here.",404:"Not found on the server.",405:"The server rejected the method, webdav may be off at this path.",412:"The target exists already."};class rt extends Error{static{a(this,"DavError")}constructor(t,n){super(n),this.status=t,this.name=t===404?"NotFoundError":"DavError"}}async function pe(e,t,{body:n,headers:o={},isDir:l=!1,method:r="GET"}={}){if(!e)throw new Error("No webdav connection.");let i;try{i=await cr(ca(e,t,l),{body:n,headers:{Authorization:ur(e),...o},method:r})}catch(s){throw globalThis.Capacitor?.isNativePlatform?.()?new rt(0,`Connection failed: ${s?.message??s}`):new rt(0,"Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.")}if(!i.ok)throw new rt(i.status,fr[i.status]??`${i.status} ${i.statusText}`);return i}a(pe,"request$1");const pr='<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/></d:prop></d:propfind>',$t="DAV:",je=a((e,t)=>e.getElementsByTagNameNS($t,t)[0]?.textContent??"","firstText");async function ua(e,t,n){const o=await pe(e,t,{body:pr,headers:{"Content-Type":"application/xml; charset=utf-8",Depth:String(n)},isDir:n>0,method:"PROPFIND"}),l=new DOMParser().parseFromString(await o.text(),"application/xml"),r=new URL(sa(e)).pathname,i=a(s=>{const u=decodeURIComponent(new URL(s,e.url).pathname);return(u.startsWith(r)?u.slice(r.length):u).replace(/^\/+|\/+$/g,"")},"relative");return[...l.getElementsByTagNameNS($t,"response")].map(s=>{const u=i(je(s,"href"));return{isDir:s.getElementsByTagNameNS($t,"collection").length>0,lastModified:Date.parse(je(s,"getlastmodified"))||0,mime:je(s,"getcontenttype"),name:u.split("/").pop(),path:u,size:Number(je(s,"getcontentlength"))||0}})}a(ua,"propfind");async function da(e,t=""){const n=te(t);return(await ua(e,t,1)).filter(l=>l.path!==n).sort((l,r)=>l.isDir===r.isDir?l.name.localeCompare(r.name,void 0,{numeric:!0}):l.isDir?-1:1)}a(da,"list");async function st(e,t){try{return(await ua(e,t,0))[0]??null}catch(n){if(n.status===404)return null;throw n}}a(st,"stat");const hr=a(async(e,t)=>(await pe(e,t)).blob(),"read"),fa=a((e,t,n)=>pe(e,t,{body:n,headers:{"Content-Type":"application/octet-stream"},method:"PUT"}),"write"),mr=a((e,t)=>pe(e,t,{isDir:!0,method:"MKCOL"}),"mkcol"),vr=a((e,t,n=!1)=>pe(e,t,{isDir:n,method:"DELETE"}),"remove$2"),gr=a((e,t,n)=>({Destination:ca(e,t,n),Overwrite:"F"}),"destination"),pa=a((e,t,n,o=!1)=>pe(e,t,{headers:gr(e,n,o),isDir:o,method:"MOVE"}),"move"),$r=a(e=>da(e,""),"test"),ct=a(e=>new DOMException(`“${e}” not found`,"NotFoundError"),"notFound"),an=a(e=>new DOMException(`“${e}” is of the other kind`,"TypeMismatchError"),"mismatch");class et{static{a(this,"DavHandle")}constructor(t,n,o){this.connection=t,this.name=o,this.path=n}async isSameEntry(t){return t instanceof et&&t.kind===this.kind&&t.connection===this.connection&&t.path===this.path}}class on extends et{static{a(this,"DavFileHandle")}kind="file";constructor(t,n,o,l=null){super(t,n,o),this.meta=l}peekFile(){const{lastModified:t=0,mime:n="",size:o=0}=this.meta??{};return{lastModified:t,name:this.name,size:o,type:n}}async getFile(){const t=await hr(this.connection,this.path);return new File([t],this.name,{lastModified:this.meta?.lastModified||Date.now(),type:this.meta?.mime||t.type})}async createWritable(){const t=[];return{abort:a(async()=>{t.length=0},"abort"),close:a(async()=>{await fa(this.connection,this.path,new Blob(t))},"close"),write:a(async n=>{t.push(n?.type==="write"?n.data:n)},"write")}}async move(t,n=this.name){if(!(t instanceof ae)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=te(t.path,n);await pa(this.connection,this.path,o,!1),Object.assign(this,{name:n,path:o})}}class ae extends et{static{a(this,"DavDirectoryHandle")}kind="directory";async*entries(){for(const t of await da(this.connection,this.path))yield[t.name,t.isDir?new ae(this.connection,t.path,t.name):new on(this.connection,t.path,t.name,t)]}async*keys(){for await(const[t]of this.entries())yield t}async*values(){for await(const[,t]of this.entries())yield t}[Symbol.asyncIterator](){return this.entries()}async getDirectoryHandle(t,{create:n=!1}={}){const o=te(this.path,t),l=await st(this.connection,o);if(l&&!l.isDir)throw an(t);if(!l){if(!n)throw ct(t);await mr(this.connection,o)}return new ae(this.connection,o,t)}async getFileHandle(t,{create:n=!1}={}){const o=te(this.path,t),l=await st(this.connection,o);if(l?.isDir)throw an(t);if(!l){if(!n)throw ct(t);await fa(this.connection,o,new Blob([]))}return new on(this.connection,o,t,l)}async removeEntry(t){const n=te(this.path,t),o=await st(this.connection,n);if(!o)throw ct(t);await vr(this.connection,n,o.isDir)}async move(t,n=this.name){if(!(t instanceof ae)||t.connection!==this.connection)throw new DOMException("move across connections","NotSupportedError");const o=te(t.path,n);await pa(this.connection,this.path,o,!0),Object.assign(this,{name:n,path:o})}async queryPermission(){return"granted"}async requestPermission(){return"granted"}}const br=a(e=>new ae(e,"",e.name||new URL(e.url).host),"davRoot"),ha="remotes.json",Fe=new Map,B=x([]);async function wr(){B.value=await RAT.app.files.read(ha,"json").catch(()=>[])}a(wr,"load");const ma=a(()=>RAT.app.files.write(ha,JSON.stringify(B.value)),"persist$1"),va=a(e=>B.value.find(t=>t.id===e)??null,"byId");async function yr({name:e,password:t="",url:n,username:o=""}){const l=String(n??"").trim();if(!/^https?:\/\//i.test(l))throw new Error("The url has to start with http:// or https://");const r={id:`dav-${Date.now().toString(36)}`,name:String(e??"").trim()||new URL(l).host,password:t,url:l,username:String(o).trim()};return await $r(r),B.value=[...B.value,r],await ma(),r}a(yr,"add$1");async function kr(e){B.value=B.value.filter(t=>t.id!==e),Fe.delete(e),await ma()}a(kr,"remove$1");function xr(e){const t=va(e);return t?(Fe.has(e)||Fe.set(e,br(t)),Fe.get(e)):null}a(xr,"rootOf");const ga=[{icon:"lucide:image",id:"images",label:"Images"},{icon:"lucide:music",id:"audio",label:"Audio"},{icon:"lucide:film",id:"video",label:"Videos"},{icon:"lucide:file-text",id:"documents",label:"Documents"},{icon:"lucide:file-archive",id:"archives",label:"Archives"},{icon:"lucide:file",id:"other",label:"Other"}],Sr=/^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/,Tr=/^(zip|rar|7z|tar|gz|bz2|xz|zst)$/,Er=a(e=>{const t=e.lastIndexOf(".");return t>0?e.slice(t+1).toLowerCase():""},"extOf");function Lt({name:e,type:t=""}){const n=Er(e);return t.startsWith("image/")?"images":t.startsWith("audio/")?"audio":t.startsWith("video/")?"video":t.startsWith("text/")||Sr.test(n)?"documents":Tr.test(n)?"archives":"other"}a(Lt,"categoryOf$1");const _=x(null),K=x(null),Rr=24,Ar=a(e=>e.startsWith(".")||e==="node_modules","SKIP"),zt=a(e=>`index/${e.addedAt??e.name}.json`,"pathOf");let $e=null;async function $a(e,t,n,o){const l=[],r=[];for await(const i of e.values()){if(o.aborted)throw new DOMException("scan aborted","AbortError");Ar(i.name)||(i.kind==="directory"?l.push(i):r.push(Promise.resolve(i.peekFile?.()??i.getFile()).then(s=>({lastModified:s.lastModified,name:i.name,path:t,size:s.size,type:s.type}),()=>null)))}for(const i of await Promise.all(r))i&&n.push(i);K.value={files:n.length};for(const i of l)await $a(i,[...t,i.name],n,o)}a($a,"walk");function Or(e){const t=Object.fromEntries(ga.map(({id:l})=>[l,{count:0,size:0}]));let n=0;for(const l of e){const r=t[Lt(l)];r.count++,r.size+=l.size,n+=l.size}const o=e.toSorted((l,r)=>r.lastModified-l.lastModified).slice(0,Rr);return{categories:t,files:e,recent:o,scannedAt:Date.now(),size:n,total:e.length}}a(Or,"summarize");async function ba(e){if(!e)return _.value=null,null;const t=await RAT.app.files.read(zt(e),"json").catch(()=>null);return _.value=t,t}a(ba,"restore");async function wa(e,t){$e?.abort();const n=new AbortController;$e=n;const o=[];K.value={files:0};try{await $a(e,[],o,n.signal);const l=Or(o);return _.value=l,await RAT.app.files.write(zt(t),JSON.stringify(l)),l}catch(l){if(l?.name!=="AbortError")throw l;return null}finally{$e===n&&($e=null,K.value=null)}}a(wa,"scan");const It=a(()=>$e?.abort(),"stop$1");async function ya(e){It(),_.value=null,e&&await RAT.app.files.remove(zt(e)).catch(()=>{})}a(ya,"forget$1");function ka(e,t=100){const n=e.trim().toLowerCase();if(!n)return[];const o=[];for(const l of _.value?.files??[])if(l.name.toLowerCase().includes(n)&&o.push(l),o.length>=t)break;return o}a(ka,"search");const Cr=Object.freeze(Object.defineProperty({__proto__:null,CATEGORIES:ga,categoryOf:Lt,forget:ya,index:_,restore:ba,scan:wa,scanning:K,search:ka,stop:It},Symbol.toStringTag,{value:"Module"})),Nr=50,Bt="files:tasks",D=x([]),be=x(fe(Bt,[])),Mr=v(()=>D.value.some(e=>e.state==="running")),_t=new Map,ln=new Map;let jr=0;function rn(e,t){D.value=D.peek().map(n=>n.id===e?{...n,...t}:n)}a(rn,"patch");function ut(e,t){const n={...D.peek().find(o=>o.id===e),...t,endedAt:Date.now()};D.value=D.peek().filter(o=>o.id!==e),be.value=[n,...be.peek()].slice(0,Nr),_t.delete(e),X(Bt,be.peek())}a(ut,"finish");function tt({icon:e="lucide:loader",label:t,lane:n="default"},o){const l=`task-${Date.now().toString(36)}-${++jr}`,r=new AbortController;_t.set(l,r),D.value=[...D.peek(),{error:null,icon:e,id:l,label:t,lane:n,progress:null,queuedAt:Date.now(),state:"queued"}];const i=(ln.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{if(r.signal.aborted)return ut(l,{state:"cancelled"}),null;rn(l,{startedAt:Date.now(),state:"running"});const s=a((u,d)=>rn(l,{progress:{done:u,total:d}}),"progress");try{const u=await o({progress:s,signal:r.signal});return ut(l,{state:r.signal.aborted?"cancelled":"done"}),u}catch(u){throw ut(l,u?.name==="AbortError"?{state:"cancelled"}:{error:String(u?.message??u),state:"failed"}),u}});return ln.set(n,i),i}a(tt,"run");const Dr=a(e=>_t.get(e)?.abort(),"cancel");function Hr(){be.value=[],X(Bt,[])}a(Hr,"clearHistory");const L=a(()=>globalThis.Capacitor?.Plugins?.FileSync??null,"plugin"),xa=a(()=>!!L(),"available$1"),Sa=["https","http"],sn=53317,Ta="files:sync",bt=fe(Ta,{}),wt=x([]),le=x(Array.isArray(bt.targets)?bt.targets:[]),z=x([]),yt=x(null),xe=x(null);let We=bt.folderName??"";const Wt=a(()=>X(Ta,{folderName:We,targets:le.value}),"persist");function Pr(e,t="https"){const n=String(e??"").trim();if(!n)return null;if(n.includes("://"))try{const r=new URL(n.replace(/^filesync:\/\//,"http://")),i=r.searchParams.get("protocol");return{fingerprint:r.searchParams.get("fingerprint")??"",host:r.hostname,port:Number(r.port)||sn,protocol:Sa.includes(i)?i:t}}catch{return null}const[o,l]=n.split(":");return{fingerprint:"",host:o,port:Number(l)||sn,protocol:t}}a(Pr,"parseTarget");const cn=a(e=>e.alias??`${e.host}:${e.port}`,"labelOf"),Ea=a((e,t)=>e.host===t.host&&e.port===t.port,"sameTarget");function Fr(e){const t=le.value.filter(n=>!Ea(n,e));le.value=[{alias:e.alias,fingerprint:e.fingerprint,host:e.host,port:e.port,protocol:e.protocol},...t].slice(0,8),Wt()}a(Fr,"remember");function Lr(e){le.value=le.value.filter(t=>!Ea(t,e)),Wt()}a(Lr,"forget");let un=!1;async function Ra(){const e=L();e&&(un||(un=!0,e.addListener("device",t=>{if(!t?.ip)return;const n=t.fingerprint||t.ip;wt.value=[t,...wt.value.filter(o=>(o.fingerprint||o.ip)!==n)]}),yt.value=await e.getIdentity().catch(()=>null)),await e.startDiscovery().catch(t=>console.warn("[files] discovery failed",t)),await Ut())}a(Ra,"start");const zr=a(()=>L()?.stopDiscovery().catch(()=>{}),"stop");function Aa(e){const t=new Set(z.value.map(n=>n.uri));z.value=[...z.value,...e.filter(n=>n.uri&&!t.has(n.uri))]}a(Aa,"add");async function Ir(){const{files:e=[]}=await L().pickFiles();Aa(e)}a(Ir,"pickFiles");async function Br(e,t,n){const o=await(await I(e,t)).getFileHandle(n.name),l=o._uri??(o.path?`file://${o.path}`:null);if(!l)throw new Error("only files of the folder on this device can be sent");Aa([{mime:n.type||"application/octet-stream",name:n.name,size:n.size??-1,uri:l}])}a(Br,"addEntry");const _r=a(e=>{z.value=z.value.filter(t=>t.uri!==e)},"remove"),Wr=a(e=>e?.code==="PIN_REQUIRED"||/\bpin\b/i.test(e?.message??""),"isPinError");function Ur(e,t=z.value,n=""){const o=L();if(!o||!e||!t.length)return Promise.resolve(null);const l=t.length===1?t[0].name:`${t.length} files`;return tt({icon:"lucide:send",label:`Send ${l} to ${cn(e)}`,lane:"send"},async({progress:r})=>{const i=await o.addListener("progress",s=>r(s.sent,s.total));try{const s=a(u=>o.send({files:t,fingerprint:e.fingerprint??"",host:e.host,pin:u,port:e.port,protocol:e.protocol}),"attempt");try{await s(n)}catch(u){if(!Wr(u))throw u;const d=await RAT.app.dialogs.prompt({message:`${cn(e)} wants a pin`,ok:"Send",title:"Pin"});if(!d)throw new Error("no pin given");await s(d)}Fr(e),z.value=z.value.filter(u=>!t.includes(u))}finally{i.remove()}})}a(Ur,"send");async function Ut(){const e=await L()?.getAutoSyncState().catch(()=>null)??null;xe.value=e&&{...e,name:e.tree?We:""}}a(Ut,"refreshAutoSync");async function qr(){const{name:e,uri:t}=await L().pickFolder();t&&(We=e??"",xe.value={...xe.value,name:We,tree:t},Wt())}a(qr,"pickSyncFolder");async function Vr(e,{pin:t="",ssid:n=""}={}){const o=xe.value?.tree;if(!o)throw new Error("pick a folder first");await L().startAutoSync({fingerprint:e.fingerprint??"",host:e.host,pin:t,port:e.port,protocol:e.protocol,ssid:n,tree:o}),await Ut()}a(Vr,"startAutoSync");async function Gr(){await L().stopAutoSync(),await Ut()}a(Gr,"stopAutoSync");const Kr=a(()=>L()?.syncNow(),"syncNow"),W=x(null),qt=a((e,t)=>e.join("/")===t.join("/"),"samePath"),Yr=a((e,t)=>e.length>=t.length&&qt(e.slice(0,t.length),t),"isInside");function Jr(e,t,n,o){const l={kind:t.kind,name:t.name,path:t.path??n,root:o},r=W.value,i=r?.mode===e&&!r.pasted?r.items.filter(s=>!(s.name===l.name&&qt(s.path,l.path))):[];W.value={items:[...i,l],mode:e}}a(Jr,"pick$1");const Xr=a(()=>{W.value&&(W.value={...W.value,pasted:!0})},"pasted"),Oa=a(()=>{W.value=null},"clear");async function dn(e,t){try{return await e.getFileHandle(t),!0}catch{}try{return await e.getDirectoryHandle(t),!0}catch{}return!1}a(dn,"exists");async function Qr(e,t,n){if(!await dn(e,t))return t;const o=n==="file"?t.lastIndexOf("."):-1,l=o>0?t.slice(0,o):t,r=o>0?t.slice(o):"";for(let i=2;;i++){const s=`${l} (${i})${r}`;if(!await dn(e,s))return s}}a(Qr,"freeName");async function Le(e){if(e.kind==="file")return 1;let t=0;for await(const n of e.values())t+=await Le(n);return t}a(Le,"countFiles");const Zr=a(async(e,t)=>{const n=await I(e,t.path);return t.kind==="directory"?n.getDirectoryHandle(t.name):n.getFileHandle(t.name)},"handleOf");async function es(e,t,n,o,{onProgress:l=a(()=>{},"onProgress"),signal:r}={}){for(const $ of t)if($.kind==="directory"&&Yr(o,[...$.path,$.name]))throw new Error(`“${$.name}” can not go into itself`);const i=await I(e,o),s=await Promise.all(t.map($=>Zr($.root??e,$))),u=(await Promise.all(s.map(Le))).reduce(($,y)=>$+y,0);let d=0;const m=a(()=>l(++d,u),"onFile");l(0,u);for(const[$,y]of t.entries()){if(r?.aborted)throw new DOMException("transfer aborted","AbortError");const w=s[$],f=await I(y.root??e,y.path);if(n==="move"&&qt(y.path,o)){d+=await Le(w),l(d,u);continue}const O=await Qr(i,y.name,y.kind);if(n==="move"&&typeof w.move=="function")try{await w.move(i,O),d+=await Le(w),l(d,u);continue}catch{}y.kind==="directory"?await jt(w,i,O,r,m):(await Mt(w,i,O,r),m()),n==="move"&&await f.removeEntry(y.name,{recursive:!0})}}a(es,"transfer");const{CATEGORIES:Vt,categoryOf:Ue}=Cr,Y=a(()=>RAT.app.dialogs,"dialogs"),he=a(e=>RAT.app.area(e),"area"),ie=a(e=>RAT.app.router.go(e),"go"),ts={copy:"lucide:copy",move:"lucide:scissors"},V=a((e,t)=>{const n=x(fe(`files:${e}`,t));return J(()=>X(`files:${e}`,n.value)),n},"stored"),N={open:V("open","auto"),"pattern-bg":V("pattern-bg",""),"pattern-tile":V("pattern-tile",""),searchbar:V("searchbar","bottom"),tabbar:V("tabbar","bottom"),viewmode:V("viewmode","list")},ns=["pattern-bg","pattern-tile"];J(()=>{const e=document.documentElement;for(const t of ns){const n=N[t].value;e.toggleAttribute(`data-${t}`,!!n),n&&co(async()=>{const{patternStyle:o}=await import("./index-iOv4fdFf.js").then(l=>l.aj);return{patternStyle:o}},__vite__mapDeps([0,1]),import.meta.url).then(({patternStyle:o})=>o(n,{name:t})).then(o=>{if(!(!o||N[t].peek()!==n))for(const[l,r]of Object.entries(o))e.style.setProperty(l,r)})}});const as=a(()=>globalThis.matchMedia?.("(pointer: coarse)").matches,"touch"),Ca=a(()=>N.open.value==="single"||N.open.value==="auto"&&as(),"opensOnTap"),re=x([]),kt=x(!1),G=x(""),ze=x(""),Ie=x(null),C=x(null),qe=x(null),Oe=x(null),we=x(null),Ve=V("tabs",{index:0,list:[{path:[]}]}),F=v(()=>Ve.value.list?.length?Ve.value.list:[{path:[]}]),H=v(()=>Math.min(Math.max(0,Ve.value.index??0),F.value.length-1)),A=v(()=>F.value[H.value].path),me=v(()=>F.value[H.value].source??null),Na=new Map,Ma=a(()=>document.querySelector('rat-view[name="library"] .listing'),"scroller");function Q(e,t=H.value){Ve.value={index:Math.min(Math.max(0,t),e.length-1),list:e}}a(Q,"setTabs");function U(e,t){Q(F.value.map((n,o)=>o===H.value?{path:e,source:t===void 0?n.source??null:t}:n)),C.value=null,G.value=""}a(U,"goTo");function ja(e=A.value,t=me.value){const n=[...F.value,{path:e,source:t}];Q(n,n.length-1),C.value=null}a(ja,"openTab");function os(e){if(F.value.length===1)return U([]);Q(F.value.filter((t,n)=>n!==e),e<H.value?H.value-1:H.value)}a(os,"closeTab");function ls(e){Na.set(H.value,Ma()?.scrollTop??0),Q(F.value,e),C.value=null}a(ls,"switchTab");const fn=a(e=>e.path.at(-1)??nt(e.source??null),"tabName"),ve=a(()=>oe.value==="granted"?R.value?.handle??null:null,"localRoot"),Ce=a(e=>e?xr(e):ve(),"rootOfSource"),nt=a(e=>e?va(e)?.name??"remote":R.value?.name??"folder","sourceName"),at=a(()=>Ce(me.value),"rootHandle"),Se=a(()=>nt(me.value),"folderName"),se=a(e=>e.source!==void 0?e.source:e.path?null:me.value,"sourceOf");let De=0;J(()=>{const e=at(),t=A.value,n=++De;re.value=[],kt.value=!!e,e&&Gi(e,t).then(o=>{n===De&&(re.value=o,requestAnimationFrame(()=>{const l=Ma();l&&(l.scrollTop=Na.get(H.peek())??0)}))}).catch(o=>{n===De&&j.error(o)}).finally(()=>{n===De&&(kt.value=!1)})});let xt=null;J(()=>{const e=ve(),t=R.value;!e||!t||xt===t||(xt=t,ba(t).then(()=>Da(e,t)))});function Da(e,t){return tt({icon:"lucide:scan-search",label:`Read ${t.name}`,lane:"index"},({progress:n,signal:o})=>{o.addEventListener("abort",()=>It());const l=J(()=>{const r=K.value;r&&n(r.files,null)});return wa(e,t).finally(l)}).catch(n=>console.warn("[files] scan failed",n))}a(Da,"indexFolder");const is=a(()=>{const e=ve();e&&Da(e,R.value)},"rescan"),pn=v(()=>{const e=G.value.trim().toLowerCase();return e?re.value.filter(t=>t.name.toLowerCase().includes(e)):re.value}),St=a(e=>e.kind!=="directory"&&!!e.type?.startsWith("image/"),"isImage"),Ha=a((e,t)=>e.kind==="directory"?t&&Ft([...t,e.name])?.icon||"lucide:folder":Vt.find(n=>n.id===Ue(e))?.icon??"lucide:file","iconOf");function ce(e,t=A.value){if(e.kind==="directory")return U([...t,e.name]),ie("/library");qe.value={...e,kind:"file",path:e.path??t,source:se(e)},ie("/preview")}a(ce,"open");function hn(e){U(e.path??[],se(e)),ie("/library")}a(hn,"showInFolder");function rs(e){if(Ca())return ce(e);C.value=e}a(rs,"onEntryClick");function Pa(e){Oe.value=null,C.value=e,he("context")?.show()}a(Pa,"about");function ss(){C.value=null,Oe.value="tasks",he("context")?.show()}a(ss,"openTasks");async function ot(){const e=at();return(e?.requestPermission?await e.requestPermission({mode:"readwrite"}).catch(()=>"denied"):e?"granted":"denied")==="granted"?e:(j.error("No permission to change this folder"),null)}a(ot,"writable");function Gt(e,t,n){const o=a(()=>t.join("/")===A.value.join("/"),"same");tt({...e,lane:"write"},n).then(()=>{o()&&U([...t])}).catch(j.error)}a(Gt,"writeTask");async function Fa(){const e=await Y().prompt({message:"Name of the new folder",ok:"Create",title:"New folder"});if(!e)return;const t=await ot();if(!t)return;const n=A.value;Gt({icon:"lucide:folder-plus",label:`New folder ${e}`},n,()=>Ki(t,n,e))}a(Fa,"newFolder");async function cs(e){const t=await Y().prompt({message:"New name",ok:"Rename",title:e.name,value:e.name});if(!t||t===e.name)return;const n=await ot();if(!n)return;const o=e.path??A.value;C.value=null,Gt({icon:"lucide:pencil",label:`Rename ${e.name} to ${t}`},o,()=>Ji(n,o,e.name,t,e.kind))}a(cs,"renameEntry");async function us(e){if(!await Y().confirm({message:`Delete “${e.name}”? This removes it from your disk.`,ok:"Delete",title:"Delete"}))return;const t=await ot();if(!t)return;const n=e.path??A.value;C.value=null,he("context")?.hide(),Gt({icon:"lucide:trash-2",label:`Delete ${e.name}`},n,()=>Yi(t,n,e.name))}a(us,"deleteEntry");function mn(e,t){Jr(e,t,t.path??A.value,Ce(se(t))),he("context")?.hide()}a(mn,"pick");async function ds(){const e=W.value;if(!e)return;const t=await ot();if(!t)return;const n=[...A.value],o=e.items.length,l=o===1?e.items[0].name:`${o} items`,r=e.mode==="move"?"move":"copy",i=ts[r];e.mode==="move"?Oa():Xr();const s=a(()=>{n.join("/")===A.value.join("/")&&U([...n])},"done");tt({icon:i,label:`${r} ${l} to /${n.join("/")}`,lane:"write"},({progress:u,signal:d})=>es(t,e.items,e.mode,n,{onProgress:u,signal:d})).then(s).catch(u=>{u?.name!=="AbortError"&&j.error(u),s()})}a(ds,"paste");async function vn(e){const t=await Nt(Ce(se(e)),e.path??A.value,e.name),n=Object.assign(document.createElement("a"),{download:e.name,href:URL.createObjectURL(t)});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}a(vn,"download");async function Ge(){if(!na())return j.error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");try{if(!await Zi())return;Q([{path:[]}],0),ie("/")}catch(e){j.error(e)}}a(Ge,"chooseFolder");async function fs(){const{granted:e}=await er();if(!e)return Ge()}a(fs,"reconnect");async function ps(){await Y().confirm({message:"Close this folder? Your files are untouched, only the app forgets it.",ok:"Close",title:Se()})&&(await ya(R.value),xt=null,await tr(),Q([{path:[]}],0))}a(ps,"closeFolder");function La(e){ja([],e),ie("/library")}a(La,"openRemote");function hs(){C.value=null,Oe.value="remotes",he("context")?.show()}a(hs,"manageRemotes");async function ms(e){if(!await Y().confirm({message:`Forget “${e.name}”? The files on the server stay.`,ok:"Forget",title:e.name}))return;await kr(e.id);const t=F.value.filter(n=>n.source!==e.id);Q(t.length?t:[{path:[]}],0)}a(ms,"forgetRemote");function vs(e){Br(ve(),e.path??A.value,e).then(()=>{he("context")?.hide(),ie("/sync")}).catch(j.error)}a(vs,"sendEntry");async function gs(e){const t=await Y().prompt({message:"Name of the new folder type",ok:"Next",title:"Folder type"});if(!t)return;const n=await Y().prompt({message:"Its icon (an iconify id)",ok:"Create",title:t,value:"lucide:folder"})||"lucide:folder";gt(e,nr({icon:n,label:t}))}a(gs,"newType");const $s=v(()=>{const e=re.value,t=e.filter(l=>l.kind==="file"),n={};for(const l of t)n[Ue(l)]=(n[Ue(l)]??0)+1;const o=Object.entries(n).sort((l,r)=>r[1]-l[1])[0];return{files:t.length,folders:e.length-t.length,mostly:o&&o[1]/t.length>=.6?Vt.find(l=>l.id===o[0])?.label:null,size:t.reduce((l,r)=>l+r.size,0)}}),gn=Vt.toSorted((e,t)=>e.id==="other"?1:t.id==="other"?-1:e.label.localeCompare(t.label)),bs=v(()=>(_.value?.files??[]).filter(e=>Ue(e)===Ie.value).toSorted((e,t)=>t.lastModified-e.lastModified).slice(0,500)),He=v(()=>ka(ze.value));let ye=null;const Ne=x(!1),za=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ws=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!za;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ye=e,Ne.value=!0});addEventListener("appinstalled",()=>{ye=null,Ne.value=!1});async function ys(){if(!ye)return!1;const e=ye;return ye=null,Ne.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(ys,"install");function ks(e){const t=`${e}:install-hint`,n=a(()=>{fe(t)||(X(t,!0),j(`${e} can be installed: see the settings`))},"show");Ne.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}a(ks,"hint");const xs=864e5,Ss={day:"numeric",month:"short",year:"numeric"},Kt=a(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),Ke=a(e=>{const t=Kt(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Ss)},"date"),Ts=a(e=>{const t=Kt(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/xs;return n<0?Ke(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:Ke(t)},"ago"),Es=a(e=>{const t=Kt(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:Ke(t)},"since"),Rs=a(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),o=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),l=String(t%60).padStart(2,"0");return n?`${n}:${o}:${l}`:`${o}:${l}`},"duration"),As=a(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),T={ago:Ts,bytes:As,date:Ke,duration:Rs,since:Es};function S(e,t){return Os.call({props:e},e,t)}a(S,"ActionRatHtml");function Os(e,t){return c`<button.action type="button" disabled=${()=>e.disabled} onclick=${g(e.onclick)}><svg-icon icon=${()=>e.icon} /> ${()=>e.label}</button>`}a(Os,"$$ActionRatHtml");function Be(e,t){return Cs.call({props:e},e,t)}a(Be,"FactsRatHtml");function Cs(e,t){const n=(e.rows??[]).filter(([,o])=>o!=null&&o!=="");return c`
    <dl.facts>
      ${k(()=>n,o=>o,o=>c`<dt>${()=>o[0]}</dt><dd>${()=>o[1]}</dd>`)}
    </dl>
  `}a(Cs,"$$FactsRatHtml");function Ns(e,t){return Ms.call({props:e},e,t)}a(Ns,"RemoteManagerRatHtml");function Ms(e,t){let n=M(null),o=M(!1);const l=v(()=>B.value);async function r(i){i.preventDefault();const s=i.target,u=a(d=>s.querySelector(`[name="${d}"]`)?.value??"","field");o.value=!0,n.value=null;try{const d=await yr({name:u("name"),password:u("password"),url:u("url"),username:u("username")});s.reset?.(),La(d.id),RAT.app.area("context")?.hide()}catch(d){n.value=d.message??String(d)}finally{o.value=!1}}return a(r,"add"),c`
    ${h(()=>l.value.length,()=>c`
        <ul.tasks>
          ${k(()=>l.value,i=>i,i=>c`
              <li.task>
                <svg-icon icon="lucide:cloud" />
                <span.text><span.name>${()=>i.name}</span><small>${()=>i.url}</small></span>
                <btn-icon icon="lucide:trash-2" label=${()=>"forget "+i.name} onclick=${g(()=>ms(i))} />
              </li>
            `)}
        </ul>
      `)}
    <h3>Connect</h3>
    <form.remote-form onsubmit=${g(r)}>
      <input-url name="url" placeholder="https://cloud.example/remote.php/dav/files/me/" required />
      <input-text name="username" placeholder="username" autocomplete="username" />
      <input-password name="password" placeholder="password or app password" autocomplete="current-password" />
      <input-text name="name" placeholder="name (optional)" />
      ${h(()=>n.value,()=>c`<p.error>${()=>n.value}</p>`)}
      <button.action type="submit" disabled=${()=>o.value}><svg-icon icon=${()=>o.value?"lucide:loader":"lucide:plug"} /> connect</button>
    </form>
    <p.hint>In a browser the server has to allow this app (cors), the android app needs nothing of the kind. Nextcloud: the url ends in /remote.php/dav/files/&lt;user&gt;/, best with an app password. The password stays on this device.</p>
  `}a(Ms,"$$RemoteManagerRatHtml");function Ia(e,t){return js.call({props:e},e,t)}a(Ia,"StatusRatHtml");function js(e,t){const n=v(()=>K.value),o=v(()=>_.value);return c`
    ${h(()=>n.value,()=>c`<p.status><svg-icon icon="lucide:loader" /> Reading the folder … ${()=>n.value.files} files</p>`,()=>h(()=>o.value,()=>c`<p.status>${()=>o.value.total} files · ${()=>T.bytes(o.value.size)} · read ${()=>T.date(o.value.scannedAt)}</p>`))}
  `}a(js,"$$StatusRatHtml");function Ds(e,t){return Hs.call({props:e},e,t)}a(Ds,"TaskListRatHtml");function Hs(e,t){const n={cancelled:"cancelled",done:"done",failed:"failed",queued:"waiting",running:"running"},o=v(()=>D.value),l=v(()=>be.value),r=a(d=>d.state==="queued"||d.state==="running","isOpen"),i=a(d=>{const{done:m,total:$}=d.progress??{};return d.state==="running"&&m!=null?$?`${Math.round(m/$*100)}%`:`${m}`:n[d.state]},"stateOf"),s=a(d=>d.error??[i(d),d.endedAt&&T.date(d.endedAt)].filter(Boolean).join(" · "),"noteOf");function u(d){return c`
      <li class=${()=>"task "+d.state}>
        <svg-icon icon=${()=>d.icon} />
        <span.text>
          <span.name>${()=>d.label}</span>
          <small>${()=>s(d)}</small>
          ${h(()=>d.state==="running"&&d.progress?.total,()=>c`<progress max=${()=>d.progress.total} value=${()=>d.progress.done} />`)}
        </span>
        ${h(()=>r(d),()=>c`<btn-icon icon="lucide:x" label=${()=>"cancel "+d.label} onclick=${g(()=>Dr(d.id))} />`)}
      </li>
    `}return a(u,"row"),c`
    ${h(()=>o.value.length,()=>c`
        <ul.tasks>
          ${k(()=>o.value,d=>d,d=>c`${()=>u(d)}`)}
        </ul>
      `,()=>c`<p.empty>nothing to do</p>`)}
    ${h(()=>l.value.length,()=>c`
        <div-x.section-head>
          <h3>History</h3>
          <btn-icon icon="lucide:trash" label="clear the history" onclick=${g(Hr)} />
        </div-x>
        <ul.tasks>
          ${k(()=>l.value,d=>d,d=>c`${()=>u(d)}`)}
        </ul>
      `)}
  `}a(Hs,"$$TaskListRatHtml");function Ps(e,t){return Fs.call({props:e},e,t)}a(Ps,"ContextRatHtml");function Fs(e,t){const n=v(()=>Oe.value),o=v(()=>C.value),l=v(()=>qe.value),r=v(()=>RAT.app.router.$path.value),i=v(()=>A.value),s=v(()=>$s.value),u=v(()=>!me.value),d=a(f=>"/"+(f.path??i.value).join("/"),"where"),m=a(f=>ra(f),"isMarked"),$=a((f,O)=>or(f,O),"bookmark"),y=v(()=>i.value.length?Ft(i.value):null),w=v(()=>i.value.length&&!y.value?ar(re.value,Lt):null);return c`
    ${h(()=>n.value==="tasks",()=>c`<h2>Tasks</h2><${Ds} />`,()=>h(()=>n.value==="remotes",()=>c`<h2>Remote</h2><${Ns} />`,()=>h(()=>o.value,()=>c`
            <h2>${()=>o.value.name}</h2>
            <${Be} ...${{get rows(){return[["name",o.value.name],["kind",o.value.kind==="directory"?"folder":o.value.type||"file"],["size",o.value.kind==="file"?T.bytes(o.value.size):null],["modified",o.value.lastModified?T.date(o.value.lastModified):null],["in",d(o.value)]]}}} />
            <div-x.actions>
              <${S} icon="lucide:arrow-up-right" label="open" ...${{onclick:a(()=>ce(o.value,o.value.path??i.value),"onclick")}} />
              ${h(()=>o.value.path,()=>c`<${S} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>hn(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="file",()=>c`<${S} icon="lucide:download" label="download" ...${{onclick:a(()=>vn(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="file"&&!se(o.value)&&xa(),()=>c`<${S} icon="lucide:send" label="send" ...${{onclick:a(()=>vs(o.value),"onclick")}} />`)}
              ${h(()=>o.value.kind==="directory"&&!se(o.value),()=>c`<${S} ...${{get icon(){return m([...i.value,o.value.name])?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return m([...i.value,o.value.name])?"remove bookmark":"bookmark"},onclick:a(()=>$([...i.value,o.value.name],o.value.name),"onclick")}} />`)}
              <${S} icon="lucide:copy" label="copy" ...${{onclick:a(()=>mn("copy",o.value),"onclick")}} />
              <${S} icon="lucide:scissors" label="move" ...${{onclick:a(()=>mn("move",o.value),"onclick")}} />
              <${S} icon="lucide:pencil" label="rename" ...${{onclick:a(()=>cs(o.value),"onclick")}} />
              <${S} icon="lucide:trash-2" label="delete" ...${{onclick:a(()=>us(o.value),"onclick")}} />
            </div-x>
          `,()=>h(()=>r.value==="/preview"&&l.value,()=>c`
              <h2>Details</h2>
              <${Be} ...${{get rows(){return[["name",l.value.name],["type",l.value.type||"unknown"],["size",T.bytes(l.value.size)],["dimensions",we.value?we.value.width+" × "+we.value.height:null],["modified",T.date(l.value.lastModified)],["in","/"+l.value.path.join("/")]]}}} />
              <div-x.actions>
                <${S} icon="lucide:download" label="download" ...${{onclick:a(()=>vn(l.value),"onclick")}} />
                <${S} icon="lucide:folder" label="show in folder" ...${{onclick:a(()=>hn(l.value),"onclick")}} />
              </div-x>
            `,()=>h(()=>r.value==="/library"&&at(),()=>c`
                <h2>This folder</h2>
                <${Be} ...${{get rows(){return[["folder",i.value.at(-1)??Se()],["contains",s.value.folders+" folders, "+s.value.files+" files"],["size",T.bytes(s.value.size)],["mostly",s.value.mostly]]}}} />
                <div-x.actions>
                  <${S} icon="lucide:folder-plus" label="new folder" ...${{onclick:Fa}} />
                  ${h(()=>i.value.length&&u.value,()=>c`<${S} ...${{get icon(){return m(i.value)?"lucide:bookmark-minus":"lucide:bookmark-plus"},get label(){return m(i.value)?"remove bookmark":"bookmark"},onclick:a(()=>$(i.value,i.value.at(-1)),"onclick")}} />`)}
                </div-x>
                ${h(()=>i.value.length&&u.value,()=>c`
                    <h3>Type</h3>
                    ${h(()=>w.value,()=>c`<p.hint>Looks like ${()=>w.value.label}. <button.link type="button" onclick=${g(()=>gt(i.value,w.value.id))}>Make it one</button></p>`)}
                    <div-x.actions>
                      ${k(()=>la(),f=>f,f=>c`<button.action type="button" aria-pressed=${()=>String(y.value?.id===f.id)} onclick=${g(()=>gt(i.value,y.value?.id===f.id?null:f.id))}><svg-icon icon=${()=>f.icon} /> ${()=>f.label}</button>`)}
                      <${S} icon="lucide:plus" label="new type" ...${{onclick:a(()=>gs(i.value),"onclick")}} />
                    </div-x>
                  `)}
              `,()=>c`
                <h2>${()=>nt(null)}</h2>
                <${Ia} />
                <div-x.actions><${S} icon="lucide:refresh-cw" label="read again" ...${{get disabled(){return!ve()||!!K.value},onclick:is}} /></div-x>
              `)))))}
  `}a(Fs,"$$ContextRatHtml");function P(e,t){return Ls.call({props:e},e,t)}a(P,"BarRatHtml");function Ls(e,t){return c`
    <header.bar>
      ${h(()=>e.back,()=>c`<btn-icon icon="lucide:arrow-left" label="back" onclick=${g(e.back)} />`,()=>c`<btn-icon icon="lucide:menu" label="menu" onclick=${g(()=>RAT.app.toggle("menu"))} />`)}
      <h1>${()=>e.title}</h1>
      ${t}
      <btn-icon icon="lucide:settings" label="settings" onclick=${g(()=>RAT.app.toggle("config"))} />
    </header>
  `}a(Ls,"$$BarRatHtml");function Yt(e,t){return zs.call({props:e},e,t)}a(Yt,"ThumbRatHtml");function zs(e,t){const n=e.entry,o=e.at??[],l=e.from??null,r=RAT.app.thumbnails,i=St(n)?`${l??R.value?.addedAt}/${o.join("/")}/${n.name}:${n.size}:${n.lastModified}`:null;let s=M(i?r.peekFile(i):null);function u(d){if(!i||s.value)return;let m=!0;const $=new IntersectionObserver(([y])=>{y.isIntersecting&&($.disconnect(),r.requestFile(i,()=>Nt(Ce(l),o,n.name)).then(w=>{m&&w&&(s.value=w)}))},{rootMargin:"200px"});return $.observe(d),()=>{m=!1,$.disconnect()}}return a(u,"watch"),c`
    <span.thumb ref=${uo(u)}>
      ${h(()=>s.value,()=>c`<img src=${()=>s.value} alt="" loading="lazy" />`,()=>c`<svg-icon icon=${()=>Ha(n,l?null:e.at)} />`)}
    </span>
  `}a(zs,"$$ThumbRatHtml");function $n(e,t){return Is.call({props:e},e,t)}a($n,"FileRowRatHtml");function Is(e,t){const n=e.entry;return c`
    <li.row>
      <button.entry type="button" onclick=${g(()=>ce(n))}>
        <${Yt} ...${{get entry(){return n},get at(){return n.path}}} />
        <span.text>
          <span.name>${()=>n.name}</span>
          <small>${()=>"/"+n.path.join("/")+" · "+T.bytes(n.size)}</small>
        </span>
      </button>
      <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${g(()=>Pa({...n,kind:"file"}))} />
    </li>
  `}a(Is,"$$FileRowRatHtml");function Ye(e,t){return Bs.call({props:e},e,t)}a(Ye,"SearchbarRatHtml");function Bs(e,t){const n=v(()=>Mr.value),o=v(()=>D.value.length);return c`
    <div.searchbar>
      <input-search placeholder=${()=>e.placeholder} value=${()=>e.value??""} onsearch=${g(l=>e.onsearch?.(l.detail.query))} />
      <button type="button" class=${()=>n.value?"tasks-button busy":"tasks-button"} aria-label=${()=>o.value?`${o.value} tasks`:"tasks"} title=${()=>o.value?`${o.value} tasks`:"tasks"} onclick=${g(ss)}>
        <svg-icon icon=${()=>n.value?"lucide:loader":"lucide:list-checks"} />
        ${h(()=>o.value,()=>c`<span.badge>${()=>o.value}</span>`)}
      </button>
    </div>
  `}a(Bs,"$$SearchbarRatHtml");const _s=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Ws(e,t){return Us.call({props:e},e,t)}a(Ws,"LoadingRatHtml");function Us(e,t){return Tt("1tn1js8",_s),c`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${h(()=>e.text,()=>c`<span>${()=>e.text}</span>`)}
    </div>
  `}a(Us,"$$LoadingRatHtml");function Ba(e,t){return qs.call({props:e},e,t)}a(Ba,"WelcomeRatHtml");function qs(e,t){const n=v(()=>Zn.value),o=v(()=>R.value);return c`
    ${h(()=>!na(),()=>c`
        <div-y.hero>
          <svg-icon icon="lucide:triangle-alert" />
          <h2>Can't open folders here</h2>
          <p>This browser has no File System Access API. Try a recent Chromium based browser.</p>
        </div-y>
      `,()=>h(()=>!n.value,()=>c`<${Ws} />`,()=>h(()=>!o.value,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-open" />
              <h2>Browse a folder</h2>
              <p>Pick a folder of your device, it becomes the root. Nothing is uploaded or copied.</p>
              <button.action type="button" onclick=${g(Ge)}><svg-icon icon="lucide:folder-plus" /> Open a folder</button>
            </div-y>
          `,()=>c`
            <div-y.hero>
              <svg-icon icon="lucide:folder-key" />
              <h2>Reconnect “${()=>Se()}”</h2>
              <p>This folder needs permission again for this visit.</p>
              <button.action type="button" onclick=${g(fs)}><svg-icon icon="lucide:folder-key" /> Reconnect</button>
            </div-y>
          `)))}
  `}a(qs,"$$WelcomeRatHtml");function Vs(e,t){return Gs.call({props:e},e,t)}a(Vs,"DashboardRatHtml");function Gs(e,t){const n=a(f=>{U(f,null),RAT.app.router.go("/library")},"library"),o=a(()=>nt(null),"folderName"),l=v(()=>!!ve()),r=v(()=>N.searchbar.value==="top"),i=v(()=>ze.value.trim()),s=v(()=>Ie.value),u=v(()=>_.value),d=v(()=>ia()),m=v(()=>gn.find(f=>f.id===s.value)?.label??s.value),$=v(()=>B.value),y=a(f=>{try{return new URL(f).host}catch{return f}},"hostOf"),w=[{icon:"lucide:hard-drive",label:"Google Drive",note:"its own api, sign in with oauth"},{icon:"lucide:terminal",label:"(S)FTP",note:"not from a browser, only in the android app"},{icon:"lucide:network",label:"LAN",note:"smb shares, only in the android app"}];return c`
    <${P} title="Files" />
    ${h(()=>l.value&&r.value,()=>c`<${Ye} ...${{get placeholder(){return"Search in "+o()},onsearch:a(f=>ze.value=f,"onsearch")}} />`)}
    <div.scroll>
      ${h(()=>!l.value,()=>c`<${Ba} />`,()=>h(()=>i.value,()=>c`
            <section>
              <h2>${()=>He.value.length?"Found "+(He.value.length>=100?"100+":He.value.length):"Nothing found"}</h2>
              <ul.rows>
                ${k(()=>He.value,f=>f,f=>c`<${$n} ...${{get entry(){return f}}} />`)}
              </ul>
            </section>
          `,()=>h(()=>s.value,()=>c`
              <section>
                <div-x.section-head>
                  <btn-icon icon="lucide:arrow-left" label="back" onclick=${g(()=>Ie.value=null)} />
                  <h2>${()=>m.value}</h2>
                </div-x>
                <ul.rows>
                  ${k(()=>bs.value,f=>f,f=>c`<${$n} ...${{get entry(){return f}}} />`)}
                </ul>
              </section>
            `,()=>c`
              ${h(()=>u.value?.recent?.length,()=>c`
                  <section>
                    <h2>Recent</h2>
                    <div-x.cards scrollable>
                      ${k(()=>u.value.recent,f=>f,f=>c`
                          <button.card type="button" onclick=${g(()=>ce(f))}>
                            <${Yt} ...${{get entry(){return f},get at(){return f.path}}} />
                            <span.name>${()=>f.name}</span>
                            <small>${()=>T.date(f.lastModified)}</small>
                          </button>
                        `)}
                    </div-x>
                  </section>
                `)}
              <section>
                <h2>Bookmarks</h2>
                ${h(()=>d.value.length,()=>c`
                    <ul.tiles>
                      ${k(()=>d.value,f=>f,f=>c`
                          <li>
                            <button.tile type="button" onclick=${g(()=>n(f.path))}>
                              <svg-icon icon=${()=>Ft(f.path)?.icon??"lucide:bookmark"} />
                              <span.text>
                                <span.name>${()=>f.name}</span>
                                <small>/${()=>f.path.join("/")}</small>
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
                  ${k(()=>gn,f=>f,f=>c`
                      <li>
                        <button.tile type="button" disabled=${()=>!u.value?.categories?.[f.id]?.count} onclick=${g(()=>Ie.value=f.id)}>
                          <svg-icon icon=${()=>f.icon} />
                          <span.text>
                            <span.name>${()=>f.label}</span>
                            <small>${()=>u.value?.categories?.[f.id]?u.value.categories[f.id].count+" · "+T.bytes(u.value.categories[f.id].size):"…"}</small>
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
                    <button.tile type="button" onclick=${g(()=>n([]))}>
                      <svg-icon icon="lucide:folder-open" />
                      <span.text>
                        <span.name>${()=>o()}</span>
                        <small>${()=>u.value?T.bytes(u.value.size):"the granted folder"}</small>
                      </span>
                    </button>
                  </li>
                </ul>
                <${Ia} />
              </section>
              <section>
                <h2>Remote</h2>
                <ul.tiles>
                  ${k(()=>$.value,f=>f,f=>c`
                      <li>
                        <button.tile type="button" onclick=${g(()=>La(f.id))}>
                          <svg-icon icon="lucide:cloud" />
                          <span.text>
                            <span.name>${()=>f.name}</span>
                            <small>${()=>y(f.url)}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                  <li>
                    <button.tile type="button" onclick=${g(hs)}>
                      <svg-icon icon="lucide:cloud-cog" />
                      <span.text>
                        <span.name>WebDAV, Nextcloud</span>
                        <small>${()=>$.value.length?"add or remove":"connect a server"}</small>
                      </span>
                    </button>
                  </li>
                  ${k(()=>w,f=>f,f=>c`
                      <li>
                        <button.tile type="button" disabled title=${()=>f.note}>
                          <svg-icon icon=${()=>f.icon} />
                          <span.text>
                            <span.name>${()=>f.label}</span>
                            <small>soon · ${()=>f.note}</small>
                          </span>
                        </button>
                      </li>
                    `)}
                </ul>
              </section>
            `)))}
    </div>
    ${h(()=>l.value&&!r.value,()=>c`<${Ye} ...${{get placeholder(){return"Search in "+o()},onsearch:a(f=>ze.value=f,"onsearch")}} />`)}
  `}a(Gs,"$$DashboardRatHtml");function Ks(e,t){return Ys.call({props:e},e,t)}a(Ks,"EntryRatHtml");function Ys(e,t){const n=e.entry,o=A.peek(),l=me.peek(),r=v(()=>C.value?.name===n.name&&!C.value?.path),i=a(s=>{s.key==="Enter"&&!Ca()&&(s.preventDefault(),ce(n))},"onkeydown");return c`
    <data-item>
      <div.row class:selected=${()=>r.value}>
        <button.entry type="button" aria-pressed=${()=>r.value?"true":null} onclick=${g(()=>rs(n))} ondblclick=${g(()=>ce(n))} onkeydown=${g(i)}>
          <${Yt} ...${{get entry(){return n},get at(){return o},get from(){return l}}} />
          <span.text>
            <span.name>${()=>n.name}</span>
            <small>${()=>n.kind==="file"?T.date(n.lastModified)+" · "+T.bytes(n.size):"folder"}</small>
          </span>
        </button>
        <btn-icon icon="lucide:ellipsis-vertical" label="more" onclick=${g(()=>Pa(n))} />
      </div>
    </data-item>
  `}a(Ys,"$$EntryRatHtml");function Js(e,t){return Xs.call({props:e},e,t)}a(Js,"PasteBarRatHtml");function Xs(e,t){const n=v(()=>W.value),o=v(()=>n.value?n.value.items.length===1?n.value.items[0].name:`${n.value.items.length} items`:"");return c`
    ${h(()=>n.value,()=>c`
        <div-x.pastebar>
          <svg-icon icon=${()=>n.value.mode==="move"?"lucide:scissors":"lucide:copy"} />
          <span.text>
            <span.name>${()=>o.value}</span>
            <small>${()=>n.value.mode==="move"?"to move":"to copy"}</small>
          </span>
          <button.action type="button" onclick=${g(ds)}><svg-icon icon="lucide:clipboard-paste" /> here</button>
          <btn-icon icon="lucide:x" label="empty the clipboard" onclick=${g(Oa)} />
        </div-x>
      `)}
  `}a(Xs,"$$PasteBarRatHtml");function bn(e,t){return Qs.call({props:e},e,t)}a(bn,"TabsRatHtml");function Qs(e,t){const n=v(()=>F.value),o=v(()=>H.value);return c`
    <div-x.tabs role="tablist" scrollable>
      ${k(()=>n.value,l=>l,l=>c`
          <div class=${()=>n.value.indexOf(l)===o.value?"tab active":"tab"}>
            <button type="button" role="tab" aria-selected=${()=>String(n.value.indexOf(l)===o.value)} onclick=${g(()=>ls(n.value.indexOf(l)))}>${()=>fn(l)}</button>
            ${h(()=>n.value.length>1,()=>c`<btn-icon icon="lucide:x" label=${()=>"close "+fn(l)} onclick=${g(()=>os(n.value.indexOf(l)))} />`)}
          </div>
        `)}
      <btn-icon icon="lucide:plus" label="new tab" onclick=${g(()=>ja())} />
    </div-x>
  `}a(Qs,"$$TabsRatHtml");function Zs(e,t){return ec.call({props:e},e,t)}a(Zs,"LibraryRatHtml");function ec(e,t){const n=v(()=>!!at()),o=v(()=>A.value),l=v(()=>N.viewmode.value),r=v(()=>N.tabbar.value==="top"),i=v(()=>N.searchbar.value==="top"),s=a(()=>o.value.length?U(o.value.slice(0,-1)):RAT.app.router.go("/"),"up"),u=a(()=>N.viewmode.value=l.value==="grid"?"list":"grid","toggle"),d=a(m=>U(m.detail.path.split("/").filter(Boolean)),"crumb");return c`
    ${h(()=>!n.value,()=>c`<${P} title="Library" /><div.scroll><${Ba} /></div>`,()=>c`
        <${P} ...${{get title(){return o.value.at(-1)??Se()},get back(){return s}}}><btn-icon icon=${()=>l.value==="grid"?"lucide:list":"lucide:layout-grid"} label=${()=>l.value==="grid"?"show as list":"show as grid"} onclick=${g(u)} /></${P}>
        ${h(()=>r.value,()=>c`<${bn} />`)}
        ${h(()=>i.value,()=>c`<${Ye} placeholder="Filter this folder" ...${{get value(){return G.value},onsearch:a(m=>G.value=m,"onsearch")}} />`)}
        <nav-crumbs root=${()=>Se()} path=${()=>"/"+o.value.join("/")} onnav-crumbs=${g(d)} />
        <div.pane>
          <div.listing>
            ${h(()=>kt.value,()=>c`<svg-icon icon="lucide:loader" />`,()=>h(()=>pn.value.length,()=>c`
                  <data-index viewmode=${()=>l.value} item-size="128px" item-size-min="80px" item-size-max="320px">
                    ${k(()=>pn.value,m=>m,m=>c`<${Ks} ...${{get entry(){return m}}} />`)}
                  </data-index>
                `,()=>c`<p.empty>${()=>G.value?"nothing matches the filter":"this folder is empty"}</p>`))}
          </div>
          <button.fab type="button" aria-label="new folder" title="new folder" onclick=${g(Fa)}><svg-icon icon="lucide:folder-plus" /></button>
        </div>
        <${Js} />
        ${h(()=>!i.value,()=>c`<${Ye} placeholder="Filter this folder" ...${{get value(){return G.value},onsearch:a(m=>G.value=m,"onsearch")}} />`)}
        ${h(()=>!r.value,()=>c`<${bn} />`)}
      `)}
  `}a(ec,"$$LibraryRatHtml");const tc=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function nc(e,t){return ac.call({props:e},e,t)}a(nc,"BrandRatHtml");function ac(e,t){return Tt("1npwj96",tc),c`
    <div.brand data-rat="1npwj96">
      ${h(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}a(ac,"$$BrandRatHtml");function oc(e,t){return lc.call({props:e},e,t)}a(oc,"MenuRatHtml");function lc(e,t){const n=[{icon:"lucide:layout-dashboard",label:"Dashboard",route:"/"},{icon:"lucide:folder",label:"Library",route:"/library"},{icon:"lucide:send",label:"Send",route:"/sync"}],o=[{icon:"lucide:image",label:"Image editor"},{icon:"lucide:file-pen",label:"Text editor"}],l=v(()=>RAT.app.router.$path.value);function r(i){RAT.app.router.go(i);const s=RAT.app.area("menu");s?.isOverlay&&s.hide()}return a(r,"go"),c`
    <nav.menu>
      <${nc} name="Files" icon="./app.svg" />
      ${k(()=>n,i=>i,i=>c`<button type="button" aria-current=${()=>l.value===i.route?"page":null} onclick=${g(()=>r(i.route))}><svg-icon icon=${()=>i.icon} /> ${()=>i.label}</button>`)}
      <hr />
      ${k(()=>o,i=>i,i=>c`<button type="button" disabled><svg-icon icon=${()=>i.icon} /> ${()=>i.label} <small>soon</small></button>`)}
      <hr />
      <button type="button" onclick=${g(()=>RAT.app.area("config")?.show())}><svg-icon icon="lucide:settings" /> Settings</button>
    </nav>
  `}a(lc,"$$MenuRatHtml");function ic(e,t){return rc.call({props:e},e,t)}a(ic,"PreferencesRatHtml");function rc(e,t){const n={"pattern-bg":"Background","pattern-tile":"Tiles"},o={open:{label:"Open with",values:[["auto","auto"],["single","a tap"],["double","a double click"]]},searchbar:{label:"Search bar",values:[["bottom","bottom"],["top","top"]]},tabbar:{label:"Tabs",values:[["bottom","bottom"],["top","top"]]}},l=v(()=>R.value),r=a((i,s)=>N[i].value=s.detail?.value??s.target.value,"change");return c`
    <section>
      <h3>files</h3>
      ${k(()=>Object.keys(o),i=>i,i=>c`
          <label>
            <span>${()=>o[i].label}</span>
            <input-value look="segments" value=${()=>N[i].value} onchange=${g(s=>r(i,s))}>
              ${k(()=>o[i].values,s=>s,s=>c`<input-option value=${()=>s[0]}>${()=>s[1]}</input-option>`)}
            </input-value>
          </label>
        `)}
      ${k(()=>Object.keys(n),i=>i,i=>c`
          <label>
            <span>${()=>n[i]}</span>
            <input-pattern opacity value=${()=>N[i].value} onchange=${g(s=>r(i,s))} />
          </label>
        `)}
    </section>
    <section>
      <h3>folder</h3>
      ${h(()=>l.value,()=>c`
          <p.folder><svg-icon icon="lucide:folder-open" /> ${()=>l.value.name}</p>
          <div-x.actions>
            <${S} icon="lucide:folder-sync" label="change" ...${{onclick:Ge}} />
            <${S} icon="lucide:x" label="close" ...${{onclick:ps}} />
          </div-x>
        `,()=>c`<${S} icon="lucide:folder-plus" label="Open a folder" ...${{onclick:Ge}} />`)}
    </section>
  `}a(rc,"$$PreferencesRatHtml");function sc(e,t){return cc.call({props:e},e,t)}a(sc,"PreviewRatHtml");function cc(e,t){const n=v(()=>qe.value);let o=M(null);J(()=>{const i=qe.value;if(we.value=null,o.value=null,!i||!St(i))return;let s=null,u=!0;return Nt(Ce(i.source),i.path,i.name).then(d=>{u&&(o.value=s=URL.createObjectURL(d))}),()=>{u=!1,s&&URL.revokeObjectURL(s)}});const l=a(i=>we.value={height:i.target.naturalHeight,width:i.target.naturalWidth},"loaded"),r=a(()=>{C.value=null,RAT.app.toggle("context")},"info");return c`
    ${h(()=>!n.value,()=>c`
        <${P} title="Preview" ...${{get back(){return()=>history.back()}}} />
        <p.empty>no file open</p>
      `,()=>c`
        <${P} ...${{get title(){return n.value.name},get back(){return()=>history.back()}}}><btn-icon icon="lucide:info" label="details" onclick=${g(r)} /></${P}>
        <div.stage>
          ${h(()=>St(n.value),()=>c`
              ${h(()=>o.value,()=>c`<img src=${()=>o.value} alt=${()=>n.value.name} onload=${g(l)} />`)}
            `,()=>c`<svg-icon icon=${()=>Ha(n.value)} />`)}
        </div>
      `)}
  `}a(cc,"$$PreviewRatHtml");const _a=`appearance:${new URL(".",location.href).pathname}`,wn={density:ne.densities,geometry:ne.geometries,mode:ne.modes},Te=fe(_a,{}),uc=a(()=>ne.palettes().catch(()=>[]),"palettes");function dc(e,t){return Te[e]=t||null,X(_a,Te),ne.set({[e]:t||null})}a(dc,"setAppearance");Object.keys(Te).length&&ne.set(Te);const fc=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function yn(e,t){return pc.call({props:e},e,t)}a(yn,"SettingsRatHtml");function pc(e,t){Tt("177zzh1",fc);let n=M({...Te}),o=M([]);const l=v(()=>Ne.value);uc().then(s=>{o.value=s});function r(s,u){const d=u.detail?.value??u.target.value;n.value={...n.value,[s]:d},dc(s,d)}a(r,"change");async function i(){await ys()&&j.success(`${e.name??"the app"} is installed`)}return a(i,"installApp"),c`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${g(s=>r("palette",s))}>
            ${k(()=>o.value,s=>s,s=>c`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${k(()=>Object.keys(wn),s=>s,s=>c`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${g(u=>r(s,u))}>
                ${k(()=>wn[s],u=>u,u=>c`<input-option value=${()=>u}>${()=>u}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${h(()=>!za,()=>c`
          <section>
            <h3>install</h3>
            ${h(()=>l.value,()=>c`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${g(i)} />`,()=>c`
                ${h(()=>ws,()=>c`<p.hint>Share, then "Add to Home Screen".</p>`,()=>c`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(pc,"$$SettingsRatHtml");function hc(e,t){return mc.call({props:e},e,t)}a(hc,"SyncRatHtml");function mc(e,t){let n=M(null),o=M(""),l=M("https"),r=M(""),i=M("");const s=a(p=>`${p.host}:${p.port}`,"keyOf"),u=a(()=>n.value??Pr(o.value,l.value),"target"),d=v(()=>wt.value),m=v(()=>le.value.filter(p=>!d.value.some(ee=>s({host:ee.ip,port:ee.port})===s(p)))),$=v(()=>z.value),y=v(()=>$.value.reduce((p,ee)=>p+Math.max(0,ee.size),0)),w=v(()=>xe.value??{}),f=v(()=>u()),O=a(p=>p.ip??p.host,"hostOf"),ge=a(p=>!!f.value&&s(f.value)===s({host:O(p),port:p.port??53317}),"isChosen"),Wa=a(p=>p.deviceType==="mobile"?"lucide:smartphone":"lucide:monitor","iconOf"),Z=a(p=>Promise.resolve().then(p).catch(j.error),"run");function Ua(p){n.value={alias:p.alias,fingerprint:p.fingerprint??"",host:O(p),port:p.port??53317,protocol:p.protocol??"https"},o.value=""}a(Ua,"choose");function qa(p){l.value=p.detail?.value??p.target.value,n.value&&(n.value={...n.value,protocol:l.value})}a(qa,"protocol");function Jt(p,ee,Va){return c`
      <li class=${()=>ge(p)?"row selected":"row"}>
        <button.entry type="button" aria-pressed=${()=>String(ge(p))} onclick=${g(()=>Ua(p))}>
          <span.thumb><svg-icon icon=${()=>ee} /></span>
          <span.text>
            <span.name>${()=>p.alias??O(p)}</span>
            <small>${()=>O(p)}:${()=>p.port??53317} · ${()=>p.protocol??"https"}</small>
          </span>
        </button>
        ${h(()=>Va,()=>c`<btn-icon icon="lucide:x" label=${()=>"forget "+(p.alias??O(p))} onclick=${g(()=>Lr(p))} />`)}
      </li>
    `}return a(Jt,"receiver"),c`
    ${h(()=>!xa(),()=>c`
        <${P} title="Send" />
        <div.scroll>
          <div-y.hero>
            <svg-icon icon="lucide:send" />
            <h2>Only in the android app</h2>
            <p>Sending to devices on your network needs the app: a web page may not search the network or talk to a device by its address.</p>
          </div-y>
        </div>
      `,()=>c`
        <${P} title="Send">
          ${h(()=>yt.value,()=>c`<small.identity>${()=>yt.value.alias}</small>`)}
        </${P}>
        <div.scroll>
          <section>
            <div-x.section-head>
              <h2>Send to</h2>
              <btn-icon icon="lucide:radar" label="search again" onclick=${g(Ra)} />
            </div-x>
            ${h(()=>d.value.length||m.value.length,()=>c`
                <ul.rows>
                  ${k(()=>d.value,p=>p,p=>c`${()=>Jt(p,Wa(p),!1)}`)}
                  ${k(()=>m.value,p=>p,p=>c`${()=>Jt(p,"lucide:history",!0)}`)}
                </ul>
              `,()=>c`<p.hint>Looking for devices on this network. A LocalSend app on the other side is enough.</p>`)}
            <div.address>
              <input-text placeholder="address, ip:port or filesync://…" value=${()=>o.value} oninput=${g(p=>{o.value=p.target.value??"",n.value=null})} />
              <input-value look="segments" value=${()=>f.value?.protocol??l.value} onchange=${g(qa)}>
                ${k(()=>Sa,p=>p,p=>c`<input-option value=${()=>p}>${()=>p}</input-option>`)}
              </input-value>
              <input-password placeholder="pin, if the receiver wants one" value=${()=>r.value} oninput=${g(p=>r.value=p.target.value??"")} />
            </div>
          </section>
          <section>
            <h2>Files</h2>
            ${h(()=>$.value.length,()=>c`
                <ul.rows>
                  ${k(()=>$.value,p=>p,p=>c`
                      <li.row>
                        <span.entry>
                          <span.thumb><svg-icon icon="lucide:file" /></span>
                          <span.text>
                            <span.name>${()=>p.name}</span>
                            <small>${()=>p.size>=0?T.bytes(p.size):""}</small>
                          </span>
                        </span>
                        <btn-icon icon="lucide:x" label=${()=>"remove "+p.name} onclick=${g(()=>_r(p.uri))} />
                      </li>
                    `)}
                </ul>
              `,()=>c`<p.hint>Pick files, or send them from the library: their details have a "send" button.</p>`)}
            <div-x.actions>
              <${S} icon="lucide:file-plus" label="pick files" ...${{onclick:a(()=>Z(Ir),"onclick")}} />
              <button.action.primary type="button" disabled=${()=>!$.value.length||!f.value} onclick=${g(()=>Z(()=>Ur(u(),$.value,r.value)))}><svg-icon icon="lucide:send" /> send${()=>$.value.length?` ${$.value.length} · ${T.bytes(y.value)}`:""}</button>
            </div-x>
          </section>
          <section>
            <h2>Auto sync</h2>
            <p.hint>A folder of this device goes to the receiver above on its own, whenever new files show up and the phone is on wi-fi. Subfolders included.</p>
            <${Be} ...${{get rows(){return[["folder",w.value.name||(w.value.tree?"chosen":"none yet")],["state",w.value.enabled?"on"+(w.value.lastSync?" · last "+T.date(w.value.lastSync):""):"off"],["to",w.value.enabled?w.value.host+":"+w.value.port:null]]}}} />
            ${h(()=>!w.value.enabled,()=>c`<input-text placeholder="only on this wi-fi (ssid), optional" value=${()=>i.value} oninput=${g(p=>i.value=p.target.value??"")} />`)}
            <div-x.actions>
              <${S} icon="lucide:folder-search" label="folder" ...${{onclick:a(()=>Z(qr),"onclick")}} />
              ${h(()=>w.value.enabled,()=>c`
                  <${S} icon="lucide:refresh-cw" label="now" ...${{onclick:a(()=>Z(Kr),"onclick")}} />
                  <${S} icon="lucide:pause" label="turn off" ...${{onclick:a(()=>Z(Gr),"onclick")}} />
                `,()=>c`<${S} icon="lucide:play" label="turn on" ...${{get disabled(){return!w.value.tree||!f.value},onclick:a(()=>Z(()=>Vr(u(),{pin:r.value,ssid:i.value})),"onclick")}} />`)}
            </div-x>
          </section>
        </div>
      `)}
  `}a(mc,"$$SyncRatHtml");function Sc(e,t){return vc.call({props:e},e,t)}a(Sc,"AppRatHtml");function vc(e,t){RAT.app.hold(Promise.all([Qi(),wr()]).catch(j.error)),ks("Files");let n=!1;return RAT.app.router.on("change",({path:l})=>{l==="/sync"&&!n&&Ra(),l!=="/sync"&&n&&zr(),n=l==="/sync"}),c`
    <rat-area name="menu" dock="start"><${oc} /></rat-area>
    <rat-view name="dashboard" route="/"><${Vs} /></rat-view>
    <rat-view name|route="library"><${Zs} /></rat-view>
    <rat-view name|route="preview" transition="slide"><${sc} /></rat-view>
    <rat-view name|route="sync"><${hc} /></rat-view>
    <rat-area name="context" dock="bottom" peek ontoggle=${g(a(l=>{l.detail?.open||(Oe.value=null)},"ontoggle"))}><div.context><${Ps} /></div></rat-area>
    <rat-area name="config" dock="end"><${yn} name="Files"><${ic} /></${yn}></rat-area>
  `}a(vc,"$$AppRatHtml");export{Sc as default};
