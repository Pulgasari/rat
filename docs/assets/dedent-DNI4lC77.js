function s(i){const[r,...n]=String(i??"").replace(/\t/g,"  ").split(`
`),e=n.filter(t=>t.trim()),l=e.length?Math.min(...e.map(t=>t.match(/^ */)[0].length)):0;return[r.trimStart(),...n.map(t=>t.slice(l))].join(`
`).replace(/^\s*\n/,"").trimEnd()}export{s as d};
