!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const s=document.getElementById("spinner");function o(){s.style.display="none"}function r(){s.style.display="block"}function i(e,t,n){const s=new XMLHttpRequest;s.addEventListener("load",e=>t({event:e,index:n})),s.open("GET","https://hacker-news.firebaseio.com/v0/item/"+e+".json"),s.send()}const c=function(e){return function(e){const t=Math.floor((new Date-e)/1e3);let n=t/31536e3;if(n>1)return Math.floor(n)+" years ago";if(n=t/2592e3,n>1)return Math.floor(n)+" months ago";if(n=t/86400,n>1)return Math.floor(n)+" days ago";if(n=t/3600,n>1)return Math.floor(n)+" hours ago";if(n=t/60,n>1)return Math.floor(n)+" minutes ago";return Math.floor(t)+" seconds ago"}(new Date(1e3*e))};function l(e,t){r();const n=[];e.forEach((e,t)=>{const s=new Promise(n=>{i(e,n,t)});n.push(s)});const s=document.getElementById("item-"+t).getElementsByClassName("comment-list")[0];Promise.all(n).then(e=>{e.forEach(({event:e})=>{const t=function(e){const t=JSON.parse(e.replace(/<[^>]+>/g,"")),n=document.createElement("div");n.setAttribute("class","comment"),n.setAttribute("id","item-"+t.id),n.innerHTML=function({by:e,kids:t,text:n,time:s}){return`<div class="comment-header small-text">\n<span class="comment-by">${e}</span>\n<span class="comment-time">${c(s)}</span>\n</div>\n<div class="comment-text">${n}</div>\n${t?`<a class="small-link comments">${t.length} comments</a>`:""}\n<div class="comment-list"></div>\n`}(t);const s=n.getElementsByClassName("comments");if(s.length){const e=()=>{s[0].removeEventListener("click",e),l(t.kids,t.id)};s[0].addEventListener("click",e)}return n}(e.currentTarget.response);s.appendChild(t)}),o()})}function a({event:e,index:t}){const n=JSON.parse(e.currentTarget.response.replace(/<[^>]+>/g,""));document.querySelector("#items-list").appendChild(function(e,t){const n=document.createElement("div");n.setAttribute("id","item-"+e.id),n.setAttribute("class","story-row"),n.innerHTML=function({by:e,descendants:t,id:n,kids:s,score:o,time:r,title:i,type:l,url:a},d){let u=null;try{u=new URL(a)}catch(e){console.log("bad url")}return`<div class="title">\n  <span class="rank">${d+1}.</span>\n  <a ${u?"href="+u.href:""} target="_blank" class="story-link">${i}</a> ${u?`<a class="small-link" target="_blank" href="https://${u.hostname}">(${u.hostname})</a>`:""}\n  </div>\n          <div class="container-substory small-text">\n          <div class="score">${o} points</div>\n          <div class="by"> by ${e}</div>\n          <div class="since">${c(r)}</div>\n          ${t>0?`| <a class="small-link comments">${t} comments</a>`:""}\n  </div>\n<div class="comment-list"></div>`}(e,t);const s=n.getElementsByClassName("comments");if(s.length){const t=()=>{s[0].removeEventListener("click",t),function(e){l(e.kids,e.id)}(e)};s[0].addEventListener("click",t)}return n}(n,t))}let d,u=[];function m(e){u=JSON.parse(e.currentTarget.response),p(!1)}!function(e){const t=new XMLHttpRequest;t.addEventListener("load",e),t.open("GET","https://hacker-news.firebaseio.com/v0/topstories.json"),t.send()}(m),d=document.getElementById("more-button"),d.addEventListener("click",()=>p(!0));let f=0;function p(e=!1){r();const t=[];for(let e=0;e<15&&f+e<u.length;e++){const n=new Promise(t=>{i(u[f+e],t,f+e)});t.push(n)}Promise.all(t).then(t=>{t.forEach(a),o(),e&&window.scrollTo(0,document.body.scrollHeight)}),f+=15,f>=u.length&&(d.disabled=!0,d.innerText="no more top stories")}}]);