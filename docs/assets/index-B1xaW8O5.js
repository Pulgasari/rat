const c=(t,n=100)=>{let e=null;const l=(...u)=>{clearTimeout(e),e=setTimeout(()=>{e=null,t(...u)},n)};return l.cancel=()=>{clearTimeout(e),e=null},l};export{c as d};
