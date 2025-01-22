/* esm.sh - esbuild bundle(is-number@7.0.0) denonext production */
var l=Object.create;var n=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var m=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),y=(e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})},s=(e,t,r,d)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of c(t))!F.call(e,o)&&o!==r&&n(e,o,{get:()=>t[o],enumerable:!(d=b(t,o))||d.enumerable});return e},f=(e,t,r)=>(s(e,t,"default"),r&&s(r,t,"default")),p=(e,t,r)=>(r=e!=null?l(x(e)):{},s(t||!e||!e.__esModule?n(r,"default",{value:e,enumerable:!0}):r,e));var u=m((k,_)=>{"use strict";_.exports=function(e){return typeof e=="number"?e-e===0:typeof e=="string"&&e.trim()!==""?Number.isFinite?Number.isFinite(+e):isFinite(+e):!1}});var i={};y(i,{default:()=>h});var N=p(u());f(i,p(u()));var{default:a,...g}=N,h=a!==void 0?a:g;export{h as default};
/*! Bundled license information:

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=is-number.mjs.map