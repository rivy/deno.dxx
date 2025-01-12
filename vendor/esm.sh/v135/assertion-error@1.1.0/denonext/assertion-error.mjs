/* esm.sh - esbuild bundle(assertion-error@1.1.0) denonext production */
var k=Object.create;var u=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var y=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),S=(r,t)=>{for(var e in t)u(r,e,{get:t[e],enumerable:!0})},p=(r,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of O(t))!v.call(r,o)&&o!==e&&u(r,o,{get:()=>t[o],enumerable:!(s=g(t,o))||s.enumerable});return r},n=(r,t,e)=>(p(r,t,"default"),e&&p(e,t,"default")),l=(r,t,e)=>(e=r!=null?k(_(r)):{},p(t||!r||!r.__esModule?u(e,"default",{value:r,enumerable:!0}):e,r));var f=y((T,h)=>{function d(){var r=[].slice.call(arguments);function t(e,s){Object.keys(s).forEach(function(o){~r.indexOf(o)||(e[o]=s[o])})}return function(){for(var s=[].slice.call(arguments),o=0,i={};o<s.length;o++)t(i,s[o]);return i}}h.exports=a;function a(r,t,e){var s=d("name","message","stack","constructor","toJSON"),o=s(t||{});this.message=r||"Unspecified AssertionError",this.showDiff=!1;for(var i in o)this[i]=o[i];if(e=e||a,Error.captureStackTrace)Error.captureStackTrace(this,e);else try{throw new Error}catch(E){this.stack=E.stack}}a.prototype=Object.create(Error.prototype);a.prototype.name="AssertionError";a.prototype.constructor=a;a.prototype.toJSON=function(r){var t=d("constructor","toJSON","stack"),e=t({name:this.name},this);return r!==!1&&this.stack&&(e.stack=this.stack),e}});var c={};S(c,{default:()=>J,prototype:()=>w});var x=l(f());n(c,l(f()));var{prototype:w}=x,{default:m,...A}=x,J=m!==void 0?m:A;export{J as default,w as prototype};
/*! Bundled license information:

assertion-error/index.js:
  (*!
   * assertion-error
   * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
   * MIT Licensed
   *)
  (*!
   * Return a function that will copy properties from
   * one object to another excluding any originally
   * listed. Returned function will create a new `{}`.
   *
   * @param {String} excluded properties ...
   * @return {Function}
   *)
  (*!
   * Primary Exports
   *)
  (*!
   * Inherit from Error.prototype
   *)
  (*!
   * Statically set name
   *)
  (*!
   * Ensure correct constructor
   *)
*/
//# sourceMappingURL=assertion-error.mjs.map