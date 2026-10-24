var a=Object.defineProperty;var l=(n,e)=>a(n,"name",{value:e,configurable:!0});function m(n){const[e,...i]=String(n??"").replace(/\t/g,"  ").split(`
`),r=i.filter(t=>t.trim()),s=r.length?Math.min(...r.map(t=>t.match(/^ */)[0].length)):0;return[e.trimStart(),...i.map(t=>t.slice(s))].join(`
`).replace(/^\s*\n/,"").trimEnd()}l(m,"dedent");export{m as d};
