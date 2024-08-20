'use strict';

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else {var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.Liquid=e();}}(function(){return function e(r,t,n){function s(o,u){if(!t[o]){if(!r[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=t[o]={exports:{}};r[o][0].call(l.exports,function(e){var t=r[o][1][e];return s(t?t:e)},l,l.exports,e,r,t,n);}return t[o].exports}for(var i="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(e,r){function t(e){return o(e).replace(/&|<|>|"|'/g,function(e){return p[e]})}function n(e){return o(e).replace(/&(amp|lt|gt|#34|#39);/g,function(e){return h[e]})}function s(e){var r=(e+"").split(".");return r.length>1?r[1].length:0}function i(e,r){return Math.max(s(e),s(r))}function o(e){return e=e||"",e+""}function u(e){return function(r,t){var n=i(r,t);return e(r,t).toFixed(n)}}function a(e){return l.forOwn(g,function(r,t){return e.registerFilter(t,r)})}var c=e("./src/util/strftime.js"),l=e("./src/util/underscore.js"),f=e("./src/syntax.js").isTruthy,p={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},h={"&amp;":"&","&lt;":"<","&gt;":">","&#34;":'"',"&#39;":"'"},g={abs:function(e){return Math.abs(e)},append:function(e,r){return e+r},capitalize:function(e){return o(e).charAt(0).toUpperCase()+e.slice(1)},ceil:function(e){return Math.ceil(e)},date:function(e,r){return "now"===e&&(e=new Date),e instanceof Date?c(e,r):""},"default":function(e,r){return f(e)?e:r},divided_by:function(e,r){return Math.floor(e/r)},downcase:function(e){return e.toLowerCase()},escape:t,escape_once:function(e){return t(n(e))},first:function(e){return e[0]},floor:function(e){return Math.floor(e)},join:function(e,r){return e.join(r)},last:function(e){return e[e.length-1]},lstrip:function(e){return o(e).replace(/^\s+/,"")},map:function(e,r){return e.map(function(e){return e[r]})},minus:u(function(e,r){return e-r}),modulo:u(function(e,r){return e%r}),newline_to_br:function(e){return e.replace(/\n/g,"<br />")},plus:u(function(e,r){return Number(e)+Number(r)}),prepend:function(e,r){return r+e},remove:function(e,r){return e.split(r).join("")},remove_first:function(e,r){return e.replace(r,"")},replace:function(e,r,t){return o(e).split(r).join(t)},replace_first:function(e,r,t){return o(e).replace(r,t)},reverse:function(e){return e.reverse()},round:function(e,r){var t=Math.pow(10,r||0);return Math.round(e*t,r)/t},rstrip:function(e){return o(e).replace(/\s+$/,"")},size:function(e){return e.length},slice:function(e,r,t){return e.substr(r,void 0===t?1:t)},sort:function(e,r){return e.sort(r)},split:function(e,r){return o(e).split(r)},strip:function(e){return o(e).trim()},strip_html:function(e){return o(e).replace(/<\/?\s*\w+\s*\/?>/g,"")},strip_newlines:function(e){return o(e).replace(/\n/g,"")},times:function(e,r){return e*r},truncate:function(e,r,t){return e=o(e),t=void 0===t?"...":t,r=r||16,e.length<=r?e:e.substr(0,r-t.length)+t},truncatewords:function(e,r,t){void 0===t&&(t="...");var n=e.split(" "),s=n.slice(0,r).join(" ");return n.length>r&&(s+=t),s},uniq:function(e){var r={};return (e||[]).filter(function(e){return r.hasOwnProperty(e)?!1:(r[e]=!0,!0)})},upcase:function(e){return o(e).toUpperCase()},url_encode:encodeURIComponent};a.filters=g,r.exports=a;},{"./src/syntax.js":13,"./src/util/strftime.js":20,"./src/util/underscore.js":21}],2:[function(e,r){function t(e){e=i.assign({root:["."],cache:!1,extname:".liquid",trim_right:!1,trim_left:!1,strict_filters:!1,strict_variables:!1},e),e.root=n(e.root);var r=Object.create(b);return r.init(h(),g(e),e),r}function n(e){return i.isArray(e)?e:i.isString(e)?[e]:[]}var s=e("./src/scope"),i=e("./src/util/underscore.js"),o=e("./src/util/assert.js"),u=e("./src/tokenizer.js"),a=e("./src/util/fs.js").statFileAsync,c=e("./src/util/fs.js").readFileAsync,l=e("path"),f=e("./src/render.js"),p=e("./src/lexical.js"),h=e("./src/tag.js"),g=e("./src/filter.js"),d=e("./src/parser"),v=e("./src/syntax.js"),m=e("./tags"),y=e("./filters"),j=e("any-promise"),w=e("./src/util/promise.js").anySeries,x=e("./src/util/error.js"),b={init:function(e,r,t){return t.cache&&(this.cache={}),this.options=t,this.tag=e,this.filter=r,this.parser=d(e,r),this.renderer=f(),m(this),y(this),this},parse:function(e,r){var t=u.parse(e,r,this.options);return this.parser.parse(t)},render:function(e,r,t){t=i.assign({},this.options,t);var n=s.factory(r,t);return this.renderer.renderTemplates(e,n)},parseAndRender:function(e,r,t){var n=this;return j.resolve().then(function(){return n.parse(e)}).then(function(e){return n.render(e,r,t)})["catch"](function(e){if(e instanceof x.RenderBreakError)return e.html;throw e})},renderFile:function(e,r,t){var n=this;return t=i.assign({},t),this.getTemplate(e,t.root).then(function(e){return n.render(e,r,t)})},evalOutput:function(e,r){var t=this.parser.parseOutput(e.trim());return this.renderer.evalOutput(t,r)},registerFilter:function(e,r){return this.filter.register(e,r)},registerTag:function(e,r){return this.tag.register(e,r)},lookup:function(e,r){r=this.options.root.concat(r||[]),r=i.uniq(r);var t=r.map(function(r){return l.resolve(r,e)});return w(t,function(e){return a(e).then(function(){return e})})["catch"](function(t){throw "ENOENT"===t.code&&(t.message="Failed to lookup "+e+" in: "+r),t})},getTemplate:function(e,r){var t=this;return l.extname(e)||(e+=this.options.extname),this.lookup(e,r).then(function(e){if(t.options.cache){var r=t.cache[e];return r?j.resolve(r):c(e).then(function(e){return t.parse(e)}).then(function(r){return t.cache[e]=r})}return c(e).then(function(r){return t.parse(r,e)})})},express:function(e){e=e||{};var r=this;return function(t,n,s){o(i.isArray(this.root)||i.isString(this.root),"illegal views root, are you using express.js?"),e.root=this.root,r.renderFile(t,n,e).then(function(e){return s(null,e)})["catch"](function(e){return s(e)});}}};t.lexical=p,t.isTruthy=v.isTruthy,t.isFalsy=v.isFalsy,t.evalExp=v.evalExp,t.evalValue=v.evalValue,t.Types={ParseError:x.ParseError,TokenizationEroor:x.TokenizationError,RenderBreakError:x.RenderBreakError,AssertionError:x.AssertionError},r.exports=t;},{"./filters":1,"./src/filter.js":7,"./src/lexical.js":8,"./src/parser":10,"./src/render.js":11,"./src/scope":12,"./src/syntax.js":13,"./src/tag.js":14,"./src/tokenizer.js":15,"./src/util/assert.js":16,"./src/util/error.js":17,"./src/util/fs.js":18,"./src/util/promise.js":19,"./src/util/underscore.js":21,"./tags":32,"any-promise":3,path:6}],3:[function(e,r){r.exports=e("./register")().Promise;},{"./register":5}],4:[function(e,r){var t="@@any-promise/REGISTRATION",n=null;r.exports=function(e,r){return function(s,i){s=s||null,i=i||{};var o=i.global!==!1;if(null===n&&o&&(n=e[t]||null),null!==n&&null!==s&&n.implementation!==s)throw new Error('any-promise already defined as "'+n.implementation+'".  You can only register an implementation before the first  call to require("any-promise") and an implementation cannot be changed');return null===n&&(n=null!==s&&"undefined"!=typeof i.Promise?{Promise:i.Promise,implementation:s}:r(s),o&&(e[t]=n)),n}};},{}],5:[function(e,r){function t(){if("undefined"==typeof window.Promise)throw new Error("any-promise browser requires a polyfill or explicit registration e.g: require('any-promise/register/bluebird')");return {Promise:window.Promise,implementation:"window.Promise"}}r.exports=e("./loader")(window,t);},{"./loader":4}],6:[function(){},{}],7:[function(e,r){var t=e("./lexical.js"),n=e("./syntax.js"),s=e("./util/assert.js"),i=e("./util/underscore.js"),o=new RegExp(""+t.value.source,"g");r.exports=function(e){function r(e){var r=Object.create(l);return r.parse(e)}function u(e,r){c[e]=r;}function a(){c={};}e=i.assign({},e);var c={},l={render:function(e,r){var t=this.args.map(function(e){return n.evalValue(e,r)});return t.unshift(e),this.filter.apply(null,t)},parse:function(r){var n=t.filterLine.exec(r);s(n,"illegal filter: "+r);var i=n[1],u=n[2]||"",a=c[i];if("function"!=typeof a){if(e.strict_filters)throw new TypeError("undefined filter: "+i);return this.name=i,this.filter=function(e){return e},this.args=[],this}for(var l=[];n=o.exec(u.trim());){var f=n[0],p=new RegExp(f+"\\s*:","g");l.push(p.test(n.input)?"'"+f+"'":f);}return this.name=i,this.filter=a,this.args=l,this}};return {construct:r,register:u,clear:a}};},{"./lexical.js":8,"./syntax.js":13,"./util/assert.js":16,"./util/underscore.js":21}],8:[function(e,r){function t(e){return q.test(e)}function n(e){return S.test(e)}function s(e){return P.test(e)}function i(e){return R.test(e)}function o(e){return b.exec(e)}function u(e){var r=e.match(O);return r?Number(e):(r=e.match(M))?"true"===e.toLowerCase():(r=e.match(A),r?e.slice(1,-1):void 0)}var a=/'[^']*'/,c=/"[^"]*"/,l=new RegExp(a.source+"|"+c.source),f=new RegExp("(?:"+l.source+"|[^'\"])*"),p=/-?\d+/,h=/-?\d+\.?\d*|\.?\d+/,g=/true|false/,d=/[\w-]+/,v=new RegExp("\\[(?:"+l.source+"|[\\w-\\.]+)\\]"),m=new RegExp("(?:"+l.source+"|"+g.source+"|"+h.source+")"),y=new RegExp(d.source+"(?:\\."+d.source+"|"+v.source+")*"),j=new RegExp("(?:"+y.source+"|"+h.source+")"),w=new RegExp("\\("+j.source+"\\.\\."+j.source+"\\)"),x=new RegExp("\\(("+j.source+")\\.\\.("+j.source+")\\)"),b=new RegExp("(?:"+y.source+"|"+m.source+"|"+w.source+")"),E=new RegExp("(?:"+d.source+")\\s*:\\s*(?:"+b.source+")"),T=new RegExp("("+d.source+")\\s*:\\s*("+b.source+")","g"),k=new RegExp("^\\s*("+d.source+")\\s*([\\s\\S]*)\\s*$"),S=new RegExp("^"+m.source+"$","i"),R=new RegExp("^"+y.source+"$"),O=new RegExp("^"+h.source+"$"),M=new RegExp("^"+g.source+"$","i"),A=new RegExp("^"+l.source+"$"),P=new RegExp("^"+x.source+"$"),q=new RegExp("^"+p.source+"$"),L=new RegExp("(?:"+d.source+"\\s*:\\s*)?"+b.source),F=new RegExp(L.source+"(\\s*,\\s*"+L.source+")*"),_=new RegExp(d.source+"(?:\\s*:\\s*"+F.source+")?","g"),D=new RegExp("("+d.source+")(?:\\s*:\\s*("+F.source+"))?"),I=new RegExp("^"+D.source+"$"),$=[/\s+or\s+/,/\s+and\s+/,/==|!=|<=|>=|<|>|\s+contains\s+/];r.exports={quoted:l,number:h,bool:g,literal:m,filter:_,integer:p,hash:E,hashCapture:T,range:w,rangeCapture:x,identifier:d,value:b,quoteBalanced:f,operators:$,quotedLine:A,numberLine:O,boolLine:M,rangeLine:P,literalLine:S,filterLine:I,tagLine:k,isLiteral:n,isVariable:i,parseLiteral:u,isRange:s,matchValue:o,isInteger:t};},{}],9:[function(e,r){var t={"==":function(e,r){return e===r},"!=":function(e,r){return e!==r},">":function(e,r){return null!==e&&null!==r&&e>r},"<":function(e,r){return null!==e&&null!==r&&r>e},">=":function(e,r){return null!==e&&null!==r&&e>=r},"<=":function(e,r){return null!==e&&null!==r&&r>=e},contains:function(e,r){return e?"function"!=typeof e.indexOf?!1:e.indexOf(r)>-1:!1},and:function(e,r){return e&&r},or:function(e,r){return e||r}};r.exports=t;},{}],10:[function(e,r){var t=e("./lexical.js"),n=e("./util/error.js").ParseError,s=e("./util/assert.js");r.exports=function(e,r){function i(e){for(var r,t=[];r=e.shift();)t.push(o(r,e));return t}function o(e,r){try{var t=null;return t="tag"===e.type?u(e,r):"output"===e.type?a(e.value):e,t.token=e,t}catch(s){throw new n(s,e)}}function u(r,t){return "continue"===r.name||"break"===r.name?r:e.construct(r,t)}function a(e){var n=t.matchValue(e);s(n,"illegal output string: "+e);var i=n[0];e=e.substr(n.index+n[0].length);for(var o=[];n=t.filter.exec(e);)o.push([n[0].trim()]);return {type:"output",initial:i,filters:o.map(function(e){return r.construct(e)})}}function c(e){var r=Object.create(l);return r.init(e)}var l={init:function(e){return this.tokens=e,this.handlers={},this},on:function(e,r){return this.handlers[e]=r,this},trigger:function(e,r){var t=this.handlers[e];return "function"==typeof t?(t(r),!0):void 0},start:function(){this.trigger("start");for(var e;!this.stopRequested&&(e=this.tokens.shift());)if(!(this.trigger("token",e)||"tag"===e.type&&this.trigger("tag:"+e.name,e))){var r=o(e,this.tokens);this.trigger("template",r);}return this.stopRequested||this.trigger("end"),this},stop:function(){return this.stopRequested=!0,this}};return {parse:i,parseTag:u,parseStream:c,parseOutput:a}};},{"./lexical.js":8,"./util/assert.js":16,"./util/error.js":17}],11:[function(e,r){function t(){var e=Object.create(l);return e}function n(e){return "string"==typeof e?e:JSON.stringify(e)}var s=e("./syntax.js"),i=e("any-promise"),o=e("./util/promise.js").mapSeries,u=e("./util/error.js").RenderBreakError,a=e("./util/error.js").RenderError,c=e("./util/assert.js"),l={renderTemplates:function(e,r){function t(e){var t=this;return "tag"===e.type?this.renderTag(e,r).then(function(e){return void 0===e?"":e}):"output"===e.type?i.resolve().then(function(){return t.evalOutput(e,r)}).then(function(e){return void 0===e?"":n(e)}):i.resolve(e.value)}var s=this;c(r,"unable to evalTemplates: scope undefined");var l="";return o(e,function(e){return t.call(s,e).then(function(e){return l+=e})["catch"](function(r){if(r instanceof u)throw r.resolvedHTML=l,r;throw new a(r,e)})}).then(function(){return l})},renderTag:function(e,r){return "continue"===e.name?i.reject(new u("continue")):"break"===e.name?i.reject(new u("break")):e.render(r)},evalOutput:function(e,r){return c(r,"unable to evalOutput: scope undefined"),e.filters.reduce(function(e,t){return t.render(e,r)},s.evalExp(e.initial,r))}};r.exports=t;},{"./syntax.js":13,"./util/assert.js":16,"./util/error.js":17,"./util/promise.js":19,"any-promise":3}],12:[function(e,r,t){function n(e,r){for(var t=1,n=r;n<e.length;n++)if("["===e[n]&&t++,"]"===e[n]&&(t--,0===t))return n;return -1}var s=e("./util/underscore.js"),i=e("./lexical.js"),o=e("./util/assert.js"),u=Object.prototype.toString,a={getAll:function(){for(var e={},r=this.scopes.length-1;r>=0;r--)s.assign(e,this.scopes[r]);return e},get:function(e){for(var r=this.scopes.length-1;r>=0;r--)try{return this.getPropertyByPath(this.scopes[r],e)}catch(t){if(/undefined variable/.test(t.message))continue;if(/Cannot read property/.test(t.message)){if(this.opts.strict_variables)throw t.message+=": "+e,t;continue}throw t.message+=": "+e,t}if(this.opts.strict_variables)throw new TypeError("undefined variable: "+e)},set:function(e,r){return this.setPropertyByPath(this.scopes[this.scopes.length-1],e,r),this},push:function(e){return o(e,"trying to push "+e+" into scopes"),this.scopes.push(e)},pop:function(){return this.scopes.pop()},unshift:function(e){return o(e,"trying to push "+e+" into scopes"),this.scopes.unshift(e)},shift:function(){return this.scopes.shift()},setPropertyByPath:function(e,r,t){if(s.isString(r))for(var n=r.replace(/\[/g,".").replace(/\]/g,"").split("."),i=0;i<n.length;i++){var o=n[i];if(i===n.length-1)return e[o]=t;void 0===e[o]&&(e[o]={}),e=e[o]||{};}},getPropertyByPath:function(e,r){var t=this.propertyAccessSeq(r+""),n=t.shift();if(!e.hasOwnProperty(n))throw new TypeError("undefined variable");var s=e[n],i=t.pop();if(t.forEach(function(e){return s=s[e]}),void 0!==i){if("size"===i&&("[object Array]"===u.call(s)||"[object String]"===u.call(s)))return s.length;s=s[i];}return s},propertyAccessSeq:function(e){for(var r=[],t="",s=0;s<e.length;s++)if("["===e[s]){r.push(t),t="";var u=e[s+1];if("'"!==u&&'"'!==u){var a=n(e,s+1);o(-1!==a,"unbalanced []: "+e),t=e.slice(s+1,a),r.push(i.isInteger(t)?t:this.get(t)),t="",s=a;}else a=e.indexOf(u,s+2),o(-1!==a,"unbalanced "+u+": "+e),t=e.slice(s+2,a),r.push(t),t="",s=a+2;}else "."===e[s]?(r.push(t),t=""):t+=e[s];return t.length&&r.push(t),r}};t.factory=function(e,r){r=s.assign({strict_variables:!1,strict_filters:!1,blocks:{},root:[]},r),e=s.assign(e,{liquid:r});var t=Object.create(a);return t.opts=r,t.scopes=[e],t};},{"./lexical.js":8,"./util/assert.js":16,"./util/underscore.js":21}],13:[function(e,r){function t(e,r){a(r,"unable to evalExp: scope undefined");for(var s,i=u.operators,c=0;c<i.length;c++){var l=i[c],f=new RegExp("^("+u.quoteBalanced.source+")("+l.source+")("+u.quoteBalanced.source+")$");if(s=e.match(f)){var p=t(s[1],r),h=o[s[2].trim()],g=t(s[3],r);return h(p,g)}}if(s=e.match(u.rangeLine)){for(var d=n(s[1],r),v=n(s[2],r),m=[],y=d;v>=y;y++)m.push(y);return m}return n(e,r)}function n(e,r){return e=e&&e.trim(),e?u.isLiteral(e)?u.parseLiteral(e):u.isVariable(e)?r.get(e):void 0:void 0}function s(e){return !i(e)}function i(e){return e===!1||void 0===e||null===e}var o=e("./operators.js"),u=e("./lexical.js"),a=e("../src/util/assert.js");r.exports={evalExp:t,evalValue:n,isTruthy:s,isFalsy:i};},{"../src/util/assert.js":16,"./lexical.js":8,"./operators.js":9}],14:[function(e,r){function t(e,r){var t,s={};for(n.hashCapture.lastIndex=0;t=n.hashCapture.exec(e);){var i=t[1],u=t[2];s[i]=o.evalValue(u,r);}return s}var n=e("./lexical.js"),s=e("./util/underscore.js"),i=e("any-promise"),o=e("./syntax.js"),u=e("./util/assert.js");r.exports=function(){function e(e,r){o[e]=r;}function r(e,r){var t=Object.create(a);return t.parse(e,r),t}function n(){o={};}var o={},a={render:function(e){var r=t(this.token.args,e),n=this.tagImpl;return "function"!=typeof n.render?i.resolve(""):i.resolve().then(function(){return "function"==typeof n.render?n.render(e,r):""})["catch"](function(e){if(s.isError(e))throw e;var r="Please reject with an Error in "+n.render+", got "+e;throw new Error(r)})},parse:function(e,r){this.type="tag",this.token=e,this.name=e.name;var t=o[this.name];u(t,"tag "+this.name+" not found"),this.tagImpl=Object.create(t),this.tagImpl.parse&&this.tagImpl.parse(e,r);}};return {construct:r,register:e,clear:n}};},{"./lexical.js":8,"./syntax.js":13,"./util/assert.js":16,"./util/underscore.js":21,"any-promise":3}],15:[function(e,r,t){function n(e,r,t){function n(t,n,s){return {type:t,raw:s[n],value:s[n+1].trim(),line:c(s),input:e,file:r}}function c(e){var r=e.input.slice(v+1,e.index).split("\n");return m+=r.length-1,v=e.index,m+1}a(u.isString(e),"illegal input type"),e=s(e,t);for(var l,f,p,h=[],g=/({%-?([\s\S]*?)-?%})|({{([\s\S]*?)}})/g,d=0,v=-1,m=0;null!==(l=g.exec(e));){if(l.index>d&&(f=e.slice(d,l.index),h.push({type:"html",raw:f,value:f})),l[1]){p=n("tag",1,l);var y=p.value.match(i.tagLine);if(!y)throw new o("illegal tag syntax",p);p.name=y[1],p.args=y[2],h.push(p);}else p=n("output",3,l),h.push(p);d=g.lastIndex;}return e.length>d&&(f=e.slice(d,e.length),h.push({type:"html",raw:f,value:f})),h}function s(e,r){r=r||{},r.trim_left&&(e=e.replace(/{%-?/g,"{%-")),r.trim_right&&(e=e.replace(/-?%}/g,"-%}"));var t=r.greedy?/\s+({%-)/g:/[\t\r ]*({%-)/g,n=r.greedy?/(-%})\s+/g:/(-%})[\t\r ]*\n?/g;return e.replace(t,"$1").replace(n,"$1")}var i=e("./lexical.js"),o=e("./util/error.js").TokenizationError,u=e("./util/underscore.js"),a=e("../src/util/assert.js");t.parse=n,t.whiteSpaceCtrl=s;},{"../src/util/assert.js":16,"./lexical.js":8,"./util/error.js":17,"./util/underscore.js":21}],16:[function(e,r){function t(e,r){if(!e){if(r instanceof Error)throw r;throw r=r||"expect "+e+" to be true",new n(r)}}var n=e("./error.js").AssertionError;r.exports=t;},{"./error.js":17}],17:[function(e,r){function t(e,r){Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.input=r.input,this.line=r.line,this.file=r.file;var t=u(r.input,r.line);this.message=c(e,r),this.stack=t+"\n"+(this.stack||"");}function n(e,r){l.assign(this,e),this.originalError=e,this.name=this.constructor.name,this.input=r.input,this.line=r.line,this.file=r.file;var t=u(r.input,r.line);this.message=c(e.message||"Unkown Error",r),this.stack=t+"\n"+(e.stack||"");}function s(e,r){if(e instanceof s)return e;l.assign(this,e),this.originalError=e,this.name=this.constructor.name,this.input=r.token.input,this.line=r.token.line,this.file=r.token.file;var t=u(r.token.input,r.token.line);this.message=c(e.message||"Unkown Error",r.token),this.stack=t+"\n"+(e.stack||"");}function i(e){Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.message=e||"";}function o(e){Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.message=e;}function u(e,r){var t=e.split("\n"),n=Math.max(r-2,1),s=Math.min(r+3,t.length),i=l.range(n,s+1).map(function(e){return [e===r?">> ":"   ",a(e,s),"| ",t[e-1]].join("")}).join("\n");return i}function a(e,r){var t=(r+"").length,n=e+"",s=Array(t-n.length).join(" ");return s+n}function c(e,r){return e=e||"",r.file&&(e+=", file:"+r.file),r.line&&(e+=", line:"+r.line),e}var l=e("./underscore.js");t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,s.prototype=Object.create(Error.prototype),s.prototype.constructor=s,i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,o.prototype=Object.create(Error.prototype),o.prototype.constructor=o,r.exports={TokenizationError:t,ParseError:n,RenderBreakError:i,AssertionError:o,RenderError:s};},{"./underscore.js":21}],18:[function(e,r){function t(e){return new Promise(function(r,t){s.readFile(e,"utf8",function(e,n){e?t(e):r(n);});})}function n(e){return new Promise(function(r,t){s.stat(e,function(e,n){return e?t(e):r(n)});})}var s=e("fs");r.exports={readFileAsync:t,statFileAsync:n};},{fs:6}],19:[function(e,r,t){function n(e,r){var t=i.reject(new Error("init"));return e.forEach(function(n,s){t=t["catch"](function(){return r(n,s,e)});}),t}function s(e,r){var t=i.resolve("init"),n=[];return e.forEach(function(s,i){t=t.then(function(){return r(s,i,e)}).then(function(e){return n.push(e)});}),t.then(function(){return n})}var i=e("any-promise");t.anySeries=n,t.mapSeries=s;},{"any-promise":3}],20:[function(e,r){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o={1:"st",2:"nd",3:"rd","default":"th"},u={daysInMonth:function(e){var r=u.isLeapYear(e)?29:28;return [31,r,31,30,31,30,31,31,30,31,30,31]},getDayOfYear:function(e){for(var r=0,t=0;t<e.getMonth();++t)r+=u.daysInMonth(e)[t];return r+e.getDate()},getWeekOfYear:function(e,r){var t=this.getDayOfYear(e)+(r-e.getDay()),n=new Date(e.getFullYear(),0,1),s=7-n.getDay()+r;return a.pad(Math.floor((t-s)/7)+1,2)},isLeapYear:function(e){var r=e.getFullYear();return !(0!==(3&r)||!(r%100||r%400===0&&r))},getSuffix:function(e){var r=e.getDate().toString(),t=parseInt(r.slice(-1));return o[t]||o["default"]},century:function(e){return parseInt(e.getFullYear().toString().substring(0,2),10)}},a={pad:function f(e,r,t){t||(t="0");for(var n=e.toString(),f=r-n.length;f-->0;)n=t+n;return n}},c={a:function(e){return i[e.getDay()]},A:function(e){return s[e.getDay()]},b:function(e){return n[e.getMonth()]},B:function(e){return t[e.getMonth()]},c:function(e){return e.toLocaleString()},C:function(e){return u.century(e)},d:function(e){return a.pad(e.getDate(),2)},e:function(e){return a.pad(e.getDate(),2," ")},H:function(e){return a.pad(e.getHours(),2)},I:function(e){return a.pad(e.getHours()%12||12,2)},j:function(e){return a.pad(u.getDayOfYear(e),3)},k:function(e){return a.pad(e.getHours(),2," ")},l:function(e){return a.pad(e.getHours()%12||12,2," ")},L:function(e){return a.pad(e.getMilliseconds(),3)},m:function(e){return a.pad(e.getMonth()+1,2)},M:function(e){return a.pad(e.getMinutes(),2)},p:function(e){return e.getHours()<12?"AM":"PM"},P:function(e){return e.getHours()<12?"am":"pm"},q:function(e){return u.getSuffix(e)},s:function(e){return Math.round(e.valueOf()/1e3)},S:function(e){return a.pad(e.getSeconds(),2)},u:function(e){return e.getDay()||7},U:function(e){return u.getWeekOfYear(e,0)},w:function(e){return e.getDay()},W:function(e){return u.getWeekOfYear(e,1)},x:function(e){return e.toLocaleDateString()},X:function(e){return e.toLocaleTimeString()},y:function(e){return e.getFullYear().toString().substring(2,4)},Y:function(e){return e.getFullYear()},z:function(e){var r=e.getTimezoneOffset()/60*100;return (r>0?"-":"+")+a.pad(Math.abs(r),4)},"%":function(){return "%"}};c.h=c.b,c.N=c.L;var l=function(e,r){for(var t="",n=r;;){var s=/%./g,i=s.exec(n);if(!i)return t+n;t+=n.slice(0,s.lastIndex-2),n=n.slice(s.lastIndex);var o=i[0].charAt(1),u=c[o];t+=u?u.call(this,e):"%"+o;}};r.exports=l;},{}],21:[function(e,r,t){function n(e){return e instanceof String||"string"==typeof e}function s(e){var r=Object.prototype.toString.call(e);return "Error"===r.substr(-6,5)||"string"==typeof e.message&&"string"==typeof e.name}function i(e,r){e=e||{};for(var t in e)if(e.hasOwnProperty(t)&&r(e[t],t,e)===!1)break;return e}function o(e){e=f(e)?e:{};var r=Array.prototype.slice.call(arguments,1);return r.forEach(function(r){u(e,r);}),e}function u(e,r){return e?(i(r,function(r,t){e[t]=r;}),e):e}function a(e){return e instanceof Array}function c(e){return function(r){return console.log("["+e+"]",r),r}}function l(e){for(var r={},t=[],n=0,s=e.length;s>n;++n)r.hasOwnProperty(e[n])||(t.push(e[n]),r[e[n]]=1);return t}function f(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":h(e))}function p(e,r,t){1===arguments.length&&(r=e,e=0),t=t||1;for(var n=[],s=e;r>s;s+=t)n.push(s);return n}var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.isString=n,t.isArray=a,t.isObject=f,t.isError=s,t.range=p,t.forOwn=i,t.assign=o,t.uniq=l,t.echo=c;},{}],22:[function(e,r){var t=e(".."),n=t.lexical,s=e("any-promise"),i=new RegExp("("+n.identifier.source+")\\s*=(.*)"),o=e("../src/util/assert.js");r.exports=function(e){e.registerTag("assign",{parse:function(e){var r=e.args.match(i);o(r,"illegal token "+e.raw),this.key=r[1],this.value=r[2];},render:function(r){return r.set(this.key,e.evalOutput(this.value,r)),s.resolve("")}});};},{"..":2,"../src/util/assert.js":16,"any-promise":3}],23:[function(e,r){var t=e(".."),n=t.lexical,s=new RegExp("("+n.identifier.source+")"),i=e("../src/util/assert.js");r.exports=function(e){e.registerTag("capture",{parse:function(r,t){var n=this,o=r.args.match(s);i(o,r.args+" not valid identifier"),this.variable=o[1],this.templates=[];var u=e.parser.parseStream(t);u.on("tag:endcapture",function(){return u.stop()}).on("template",function(e){return n.templates.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")}),u.start();},render:function(r){var t=this;return e.renderer.renderTemplates(this.templates,r).then(function(e){r.set(t.variable,e);})}});};},{"..":2,"../src/util/assert.js":16}],24:[function(e,r){{var t=e("..");e("../src/util/assert.js");}r.exports=function(e){e.registerTag("case",{parse:function(r,t){var n=this;this.cond=r.args,this.cases=[],this.elseTemplates=[];var s=[],i=e.parser.parseStream(t).on("tag:when",function(e){n.cases[e.args]||n.cases.push({val:e.args,templates:s=[]});}).on("tag:else",function(){return s=n.elseTemplates}).on("tag:endcase",function(){return i.stop()}).on("template",function(e){return s.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});i.start();},render:function(r){for(var n=0;n<this.cases.length;n++){var s=this.cases[n],i=t.evalExp(s.val,r),o=t.evalExp(this.cond,r);if(i===o)return e.renderer.renderTemplates(s.templates,r)}return e.renderer.renderTemplates(this.elseTemplates,r)}});};},{"..":2,"../src/util/assert.js":16}],25:[function(e,r){r.exports=function(e){e.registerTag("comment",{parse:function(r,t){var n=e.parser.parseStream(t);n.on("token",function(e){"endcomment"===e.name&&n.stop();}).on("end",function(){throw new Error("tag "+r.raw+" not closed")}),n.start();}});};},{}],26:[function(e,r){var t=e(".."),n=e("any-promise"),s=t.lexical,i=new RegExp("^(?:("+s.value.source+")\\s*:\\s*)?(.*)$"),o=new RegExp(s.value.source,"g"),u=e("../src/util/assert.js");r.exports=function(e){e.registerTag("cycle",{parse:function(e){var r=i.exec(e.args);u(r,"illegal tag: "+e.raw),this.group=r[1]||"";var t=r[2];for(this.candidates=[];r=o.exec(t);)this.candidates.push(r[0]);u(this.candidates.length,"empty candidates: "+e.raw);},render:function(e){var r=t.evalValue(this.group,e),s="cycle:"+r+":"+this.candidates.join(","),i=e.get("liquid"),o=i[s];void 0===o&&(o=i[s]=0);var u=this.candidates[o];return o=(o+1)%this.candidates.length,i[s]=o,n.resolve(t.evalValue(u,e))}});};},{"..":2,"../src/util/assert.js":16,"any-promise":3}],27:[function(e,r){var t=e(".."),n=t.lexical,s=e("../src/util/assert.js");r.exports=function(e){e.registerTag("decrement",{parse:function(e){var r=e.args.match(n.identifier);s(r,"illegal identifier "+e.args),this.variable=r[0];},render:function(e){var r=e.get(this.variable);"number"!=typeof r&&(r=0),e.set(this.variable,r-1);}});};},{"..":2,"../src/util/assert.js":16}],28:[function(e,r){var t=e(".."),n=t.lexical,s=e("../src/util/promise.js").mapSeries,i=t.Types.RenderBreakError,o=e("../src/util/assert.js"),u=new RegExp("^("+n.identifier.source+")\\s+in\\s+"+("("+n.value.source+")")+("(?:\\s+"+n.hash.source+")*")+"(?:\\s+(reversed))?"+("(?:\\s+"+n.hash.source+")*$"));r.exports=function(e){e.registerTag("for",{parse:function(r,t){var n=this,s=u.exec(r.args);o(s,"illegal tag: "+r.raw),this.variable=s[1],this.collection=s[2],this.reversed=!!s[3],this.templates=[],this.elseTemplates=[];var i,a=e.parser.parseStream(t).on("start",function(){return i=n.templates}).on("tag:else",function(){return i=n.elseTemplates}).on("tag:endfor",function(){return a.stop()}).on("template",function(e){return i.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});a.start();},render:function(r,n){var o=this,u=t.evalExp(this.collection,r);if(!Array.isArray(u)||Array.isArray(u)&&0===u.length)return e.renderer.renderTemplates(this.elseTemplates,r);var a=u.length,c=n.offset||0,l=void 0===n.limit?u.length:n.limit;u=u.slice(c,c+l),this.reversed&&u.reverse();var f=u.map(function(e,r){var t={};return t[o.variable]=e,t.forloop={first:0===r,index:r+1,index0:r,last:r===a-1,length:a,rindex:a-r,rindex0:a-r-1,stop:!1,skip:!1},t}),p="";return s(f,function(t){return r.push(t),e.renderer.renderTemplates(o.templates,r).then(function(e){return p+=e})["catch"](function(e){if(!(e instanceof i&&(p+=e.resolvedHTML,"continue"===e.message)))throw e}).then(function(){return r.pop()})})["catch"](function(e){if(!(e instanceof i&&"break"===e.message))throw e}).then(function(){return p})}});};},{"..":2,"../src/util/assert.js":16,"../src/util/promise.js":19}],29:[function(e,r){var t=e("..");r.exports=function(e){e.registerTag("if",{parse:function(r,t){var n=this;this.branches=[],this.elseTemplates=[];var s,i=e.parser.parseStream(t).on("start",function(){return n.branches.push({cond:r.args,templates:s=[]})}).on("tag:elsif",function(e){n.branches[e.args]||n.branches.push({cond:e.args,templates:s=[]});}).on("tag:else",function(){return s=n.elseTemplates}).on("tag:endif",function(){return i.stop()}).on("template",function(e){return s.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});i.start();},render:function(r){for(var n=0;n<this.branches.length;n++){var s=this.branches[n],i=t.evalExp(s.cond,r);if(t.isTruthy(i))return e.renderer.renderTemplates(s.templates,r)}return e.renderer.renderTemplates(this.elseTemplates,r)}});};},{"..":2}],30:[function(e,r){var t=e(".."),n=t.lexical,s=new RegExp("with\\s+("+n.value.source+")"),i=e("../src/util/assert.js");r.exports=function(e){e.registerTag("include",{parse:function(e){var r=n.value.exec(e.args);i(r,"illegal token "+e.raw),this.value=r[0],r=s.exec(e.args),r&&(this["with"]=r[1]);},render:function(r,n){var s=t.evalValue(this.value,r),i=r.get("liquid"),o=i.blocks;

return i.blocks={},this["with"]&&(n[s]=t.evalValue(this["with"],r)),e.getTemplate(s,i.root).then(function(t){return r.push(n),e.renderer.renderTemplates(t,r)}).then(function(e){return r.pop(),i.blocks=o,e})}});};},{"..":2,"../src/util/assert.js":16}],31:[function(e,r){var t=e(".."),n=e("../src/util/assert.js"),s=t.lexical;r.exports=function(e){e.registerTag("increment",{parse:function(e){var r=e.args.match(s.identifier);n(r,"illegal identifier "+e.args),this.variable=r[0];},render:function(e){var r=e.get(this.variable);"number"!=typeof r&&(r=0),e.set(this.variable,r+1);}});};},{"..":2,"../src/util/assert.js":16}],32:[function(e,r){r.exports=function(r){e("./assign.js")(r),e("./capture.js")(r),e("./case.js")(r),e("./comment.js")(r),e("./cycle.js")(r),e("./decrement.js")(r),e("./for.js")(r),e("./if.js")(r),e("./include.js")(r),e("./increment.js")(r),e("./layout.js")(r),e("./raw.js")(r),e("./tablerow.js")(r),e("./unless.js")(r);};},{"./assign.js":22,"./capture.js":23,"./case.js":24,"./comment.js":25,"./cycle.js":26,"./decrement.js":27,"./for.js":28,"./if.js":29,"./include.js":30,"./increment.js":31,"./layout.js":33,"./raw.js":34,"./tablerow.js":35,"./unless.js":36}],33:[function(e,r){var t=e(".."),n=e("any-promise"),s=t.lexical,i=e("../src/util/assert.js");r.exports=function(e){e.registerTag("layout",{parse:function(r,t){var n=s.value.exec(r.args);i(n,"illegal token "+r.raw),this.layout=n[0],this.tpls=e.parser.parse(t);},render:function(r,n){var s=t.evalValue(this.layout,r),i=r.get("liquid");return e.renderer.renderTemplates(this.tpls,r).then(function(){return e.getTemplate(s,i.root)}).then(function(e){return r.push(n),e}).then(function(t){return e.renderer.renderTemplates(t,r)}).then(function(e){return r.pop(),e})}}),e.registerTag("block",{parse:function(r,t){var n=this,s=/\w+/.exec(r.args);this.block=s?s[0]:"anonymous",this.tpls=[];var i=e.parser.parseStream(t).on("tag:endblock",function(){return i.stop()}).on("template",function(e){return n.tpls.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});i.start();},render:function(r){var t=this,s=r.get("liquid"),i=s.blocks[this.block];return void 0===i?e.renderer.renderTemplates(this.tpls,r).then(function(e){return s.blocks[t.block]=e,e}):(s.blocks[this.block]=i,n.resolve(i))}});};},{"..":2,"../src/util/assert.js":16,"any-promise":3}],34:[function(e,r){var t=e("any-promise");r.exports=function(e){e.registerTag("raw",{parse:function(r,t){var n=this;this.tokens=[];var s=e.parser.parseStream(t);s.on("token",function(e){"endraw"===e.name?s.stop():n.tokens.push(e);}).on("end",function(){throw new Error("tag "+r.raw+" not closed")}),s.start();},render:function(){var e=this.tokens.map(function(e){return e.raw}).join("");return t.resolve(e)}});};},{"any-promise":3}],35:[function(e,r){var t=e(".."),n=e("any-promise"),s=t.lexical,i=e("../src/util/assert.js"),o=new RegExp("^("+s.identifier.source+")\\s+in\\s+"+("("+s.value.source+")")+("(?:\\s+"+s.hash.source+")*$"));r.exports=function(e){e.registerTag("tablerow",{parse:function(r,t){var n=this,s=o.exec(r.args);i(s,"illegal tag: "+r.raw),this.variable=s[1],this.collection=s[2],this.templates=[];var u,a=e.parser.parseStream(t).on("start",function(){return u=n.templates}).on("tag:endtablerow",function(){return a.stop()}).on("template",function(e){return u.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});a.start();},render:function(r,s){var i,o,u=this,a=t.evalExp(this.collection,r)||[],c="<table>",l=s.offset||0,f=void 0===s.limit?a.length:s.limit,p=s.cols;if(!p)throw new Error("illegal cols: "+p);a=a.slice(l,l+f);var h=[];a.some(function(e){var r={};r[u.variable]=e,h.push(r);});var g=h.reduce(function(t,n,s){return t.then(function(){return i=Math.floor(s/p)+1,o=s%p+1,1===o&&(1!==i&&(c+="</tr>"),c+='<tr class="row'+i+'">'),c+='<td class="col'+o+'">'}).then(function(){return r.push(n),e.renderer.renderTemplates(u.templates,r)}).then(function(e){return r.pop(n),c+=e,c+="</td>"})},n.resolve(""));return g.then(function(){return i>0&&(c+="</tr>"),c+="</table>"})["catch"](function(e){throw e})}});};},{"..":2,"../src/util/assert.js":16,"any-promise":3}],36:[function(e,r){var t=e("..");r.exports=function(e){e.registerTag("unless",{parse:function(r,t){var n=this;this.templates=[],this.elseTemplates=[];var s,i=e.parser.parseStream(t).on("start",function(){s=n.templates,n.cond=r.args;}).on("tag:else",function(){return s=n.elseTemplates}).on("tag:endunless",function(){return i.stop()}).on("template",function(e){return s.push(e)}).on("end",function(){throw new Error("tag "+r.raw+" not closed")});i.start();},render:function(r){var n=t.evalExp(this.cond,r);return t.isFalsy(n)?e.renderer.renderTemplates(this.templates,r):e.renderer.renderTemplates(this.elseTemplates,r)}});};},{"..":2}]},{},[2])(2)});

class PictureparkTemplates {
    // TODO: Create template factory with css injection outside of template
    static getTemplate(templateId) {
        if (templateId === "card") {
            return this.getCard();
        }
        else if (templateId === "gallery") {
            return this.getGallery();
        }
        else if (templateId === "list") {
            return this.getList();
        }
        else {
            return "Template '" + templateId + "' not found.";
        }
    }
    static getGallery() {
        return `
      {% if config.renderStyles %}
      <style>
        * {
          box-sizing: border-box;
        }

       .picturepark-widget-content-preview {
         background-color: white;
         padding: 40px;
        }
        .picturepark-widget-gallery-{{id}} {
          float: left;
          width: 100%;
          position: relative;
          margin-right: -4px;
          margin-bottom: -4px;
        }
        .picturepark-widget-gallery-item-{{id}} {
          overflow: hidden;
          background: #eeeeee;
          margin-right: 4px;
          margin-bottom: 4px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .picturepark-widget-gallery-item-image-{{id}} {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .picturepark-widget-gallery-item-thumbnail-{{id}} {
          
        }

        .picturepark-widget-gallery-item-title-{{id}} {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0px;
          background: gray;
          padding: 4px;
          color: white;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-title-{{id}} {
          opacity: .8;
        }

        .picturepark-widget-gallery-item-preview-{{id}} {
          opacity: 0;
          position: absolute;
          left: 43%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: gray;
          border-radius: 50%;
          color: white;
          padding: 10px;
          cursor: pointer;
          display: flex;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-preview-{{id}} {
          opacity: .8;
        }

       .picturepark-widget-gallery-item-outputs-{{id}} {
          opacity: 0;
          position: absolute;
          left: 57%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: gray;
          border-radius: 50%;
          color: white;
          padding: 10px;
          cursor: pointer;
          display: flex;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-outputs-{{id}} {
          opacity: .8;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} {
          position: absolute;
          display: none;
          background-color: #f1f1f1;
          min-width: 160px;
          max-height: 340px;
          overflow: auto;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}}.show {
          display: block;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} a:hover {
          background-color: #ddd;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-gallery picturepark-widget-gallery-{{id}}">
        {% assign width = config.width | plus: -2 %}
        {% assign height = config.height | plus: -1 %}
        {% for selection in share.items %}
          <div class="picturepark-widget-gallery-item picturepark-widget-gallery-item-{{id}}" style="float: left; width: {{ config.width }}px; height: {{ config.height }}px">
            {% if selection.isMovie and config.showPlayers == true %}
              <video class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></video>
            {% elsif selection.isAudio and config.showPlayers == true %}
              <audio class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></audio>
            {% else %}
              {% if selection.isBinary == false %}
                <div class="picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}">{{ selection.displayValues.thumbnail }}</div>
              {% else %}
                <img class="picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
                <div class="picturepark-widget-gallery-item-title picturepark-widget-gallery-item-title-{{id}}">{{selection.displayValues.name}}</div>
              {% endif %}
              <div class="picturepark-widget-gallery-item-preview picturepark-widget-gallery-item-preview-{{id}}" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
                </svg>
              </div>
              <div class="picturepark-widget-gallery-item-outputs-{{id}}">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
	            </svg>
              </div>
              <div class="picturepark-widget-gallery-item-outputs-dropdown-{{id}}">
                {% for output in selection.outputs %}
                  <a href="{{ output.downloadUrl }}" target="_blank" download>{% translate output.outputFormatId %}</a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        {% endfor %}
    </div>
    <br style="clear: both;" />`;
    }
    static getCard() {
        return `
      {% if config.renderStyles %}
      <style>
       .picturepark-widget-content-preview {
         background-color: white;
         padding: 40px;
        }
        .picturepark-widget-{{id}} {
          all: initial;
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          font-size: 13px;
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
        }
        .picturepark-widget-card-{{id}} {
          border: 1px solid lightgray;
          border-radius: 0 0 4px 4px;
        }

        /** Footer */
        .picturepark-widget-card-footer-content-{{id}} {
          padding: 10px;
        }
        .picturepark-widget-card-footer-title-{{id}} {
          font-weight: bold;
        }
        .picturepark-widget-card-footer-description-{{id}} {
        }
        .picturepark-widget-card-footer-gravatar-{{id}} {
          border-radius: 50%;
          margin-top: 0px;
        }
        .picturepark-widget-card-footer-gravatar-{{id}} {
          vertical-align: middle;
        }
        .picturepark-widget-card-footer-hr-{{id}} {
          color: lightgray;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        /** Gallery */
        .picturepark-widget-card-gallery-{{id}} {
          line-height: 0;
          overflow: hidden;
          max-height: {{ config.width }};
        }
        .picturepark-widget-card-gallery-image-{{id}} {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        /** Overlay */
        .picturepark-widget-card-overlay-{{id}} {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0px;
          background: gray;
          padding: 4px;
        }
        .picturepark-widget-{{id}}:hover
        .picturepark-widget-card-overlay-{{id}} {
          opacity: 0.8;
        }
        .picturepark-widget-card-overlay-title-{{id}} {
          font-weight: bold;
          color: white;
        }
        .picturepark-widget-card-overlay-description-{{id}} {
          color: white;
        }

        /** Navigation */
        .picturepark-widget-card-navigation-previous-{{id}} {
          position: absolute; 
          left: 0; 
          top: 0; 
          bottom: 0; 
          width: 30px; 
          margin-top: 50px; 
          margin-bottom: 50px
        }
        .picturepark-widget-card-navigation-next-{{id}} {
          position: absolute; 
          right: 0; 
          top: 0; 
          bottom: 0; 
          width: 30px; 
          margin-top: 50px; 
          margin-bottom: 50px
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-card picturepark-widget-card-{{id}}" style="width: {{ config.width }}px">
        <div style="position: relative">
          {% assign width = config.width | plus: -2 %}
          {% assign height = config.height | plus: -1 %}
          <div id="gallery_{{ id }}" style="height: {{ height }}px; width: {{ width }}px; position: relative">
            {% for selection in share.items %}
            <div class="picturepark-widget-card-gallery picturepark-widget-card-gallery-{{id}}"
            {% if forloop.first == false %}style="display: none"{% endif %}>
            {% if selection.isMovie and config.showPlayers != false %}
              <video class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></video>
            {% elsif selection.isAudio and config.showPlayers != false %}
              <audio class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></audio>
            {% else %}
              <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
              {% if selection.isBinary == false %}
                <div class="picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}">{{ selection.displayValues.thumbnail }}</div>
              {% else %}
                <img class="picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
              {% endif %}
              </a>
              {% endif %}
              
              {% if config.showLogo %}
              <div style="position: absolute; bottom: 4px; right: 8px;">
                <svg style="width: 120px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 690.93 75.96">
                  <defs>
                    <style>.cls-1{fill:#5b7d89;}.cls-2{fill:#818181;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4,.cls-5{filter:url(#AI_Shadow_1);}.cls-4{font-size:67.44px;font-family:Roboto-Regular, Roboto;}.cls-5{font-size:46.07px;font-family:Roboto-Light, Roboto;letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}</style>
                    <filter id="AI_Shadow_1" name="AI_Shadow_1"><feGaussianBlur result="blur" stdDeviation="2" in="SourceAlpha"/>
                      <feOffset result="offsetBlurredAlpha" dx="4" dy="4" in="blur"/><feMerge><feMergeNode in="offsetBlurredAlpha"/>
                      <feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <title>powered-by-pp</title>
                  <path class="cls-1" d="M344.17,152.27V117.83a4.58,4.58,0,0,0-4.28-4.83h-53.6a4.58,4.58,0,0,0-4.29,4.83v34.44Z" transform="translate(-19.07 -110.92)"/>
                  <path class="cls-2" d="M282,161.87v11.31a4.58,4.58,0,0,0,4.28,4.82h53.6a4.57,4.57,0,0,0,4.28-4.82V161.87Z" transform="translate(-19.07 -110.92)"/>
                  <polygon class="cls-3" points="325.09 50.95 262.93 50.95 262.93 41.35 325.09 41.35 325.09 50.95 325.09 50.95"/>
                  <text class="cls-4" transform="translate(347.46 57.69)">Picturepark</text>
                  <text class="cls-5" transform="translate(0 57.66)">P<tspan class="cls-6" x="28.07" y="0">owered by</tspan></text>
                </svg>
              </div>
              {% endif %}
            </div>
            {% endfor %}
          </div>

          {% if config.showOverlay %}
            <div class="picturepark-widget-card-overlay picturepark-widget-card-overlay-{{id}}">
              <div class="picturepark-widget-card-overlay-title picturepark-widget-card-overlay-title-{{id}}">{{ share.name }}</div>
              {% if share.description %}
                <div class="picturepark-widget-card-overlay-description picturepark-widget-card-overlay-description-{{id}}">{{ share.description }}</div>
              {% endif %}
            </div>
          {% endif %}

          {% if config.showNavigation and share.items.length > 1 %}
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showPrevious('{{ config.token }}', 'gallery_{{ id }}')"
            class="picturepark-widget-card-navigation-previous picturepark-widget-card-navigation-previous-{{id}}">
            <svg style="position: absolute; top: 50%; transform: translate(0,-50%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.8 42.8"><path d="M11 21.7l18 20c0.1 0.1 0.2 0.2 0.4 0.2 0.1 0 0.3 0 0.4-0.1l2.9-2.9c0.2-0.2 0.2-0.5 0-0.7L17.9 21.3 32.7 4.6c0.2-0.2 0.2-0.5 0-0.7L29.7 1c-0.1-0.1-0.2-0.1-0.4-0.1h0c-0.1 0-0.3 0.1-0.4 0.2L11 21c-0.1 0.1-0.1 0.2-0.1 0.3C10.8 21.4 10.8 21.6 11 21.7z" fill="#CCCCCC"/></svg>
          </a>
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showNext('{{ config.token }}', 'gallery_{{ id }}')"
            class="picturepark-widget-card-navigation-next picturepark-widget-card-navigation-next-{{id}}">
            <svg style="position: absolute; top: 50%; transform: translate(0,-50%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.8 42.8"><path d="M32.7 21l-18-20c-0.1-0.1-0.2-0.2-0.4-0.2 -0.1 0-0.3 0-0.4 0.1L11 3.9c-0.2 0.2-0.2 0.5 0 0.7l14.8 16.7L11 38.1c-0.2 0.2-0.2 0.5 0 0.7l2.9 2.9c0.1 0.1 0.2 0.1 0.4 0.1h0c0.1 0 0.3-0.1 0.4-0.2l18-20c0.1-0.1 0.1-0.2 0.1-0.3C32.8 21.3 32.8 21.1 32.7 21z" fill="#CCCCCC"/></svg>
          </a>
          {% endif %}
        </div>

        {% if config.showFooter %}
        <div class="picturepark-widget-card-footer-content picturepark-widget-card-footer-content-{{id}}">
          <div class="picturepark-widget-card-footer-title picturepark-widget-card-footer-title-{{id}}">{{ share.name }}</div>
          {% if share.description %}
            <div class="picturepark-widget-card-footer-description picturepark-widget-card-footer-description-{{id}}">{{ share.description }}</div>
          {% endif %}
          <hr class="picturepark-widget-card-footer-hr picturepark-widget-card-footer-hr-{{id}}">
          <div class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}">
            <img src="//www.gravatar.com/avatar/{{ share.creator.emailHash }}?m=dd&size=32&d=mm" class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}" />
            Shared by: {{ share.creator.displayName }}
            </div>
        </div>
        {% endif %}
      </div>`;
    }
    static getList() {
        return `
      {% if config.renderStyles %}
      <style>
        .picturepark-widget-{{id}} {
          all: initial;
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          font-size: 13px;
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
        }
        .picturepark-widget-list-{{id}} {
          padding: 0px 12px 0px 12px;
          position: relative;
          border: 1px solid lightgray;
          border-radius: 4px;
        }
        .picturepark-widget-list-header-{{id}} {
          font-weight: bold;
          font-size: 16px;
          border-bottom: 2px solid #DCDCDC; 
          margin: 12px 0 16px 0; 
          padding: 0 0 12px 0; 
        }
        .picturepark-widget-list-header-download-{{id}} {
          font-size: 10pt; 
          padding-top: 3px; 
        }
        .picturepark-widget-list-body-{{id}} {
          list-style-type: none;
          margin: 0 0 8px 0; 
          padding: 0;
        }
        .picturepark-widget-list-body-{{id}} li {
          margin-bottom: 8px;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-list picturepark-widget-list-{{id}}" style="width: {{ config.width }}px">
        <h1 class="picturepark-widget-list-header picturepark-widget-list-header-{{id}}">
          {% translate 'List.HeaderDownloads' %}
          <span style="float:right" class="picturepark-widget-list-header-download picturepark-widget-list-header-download-{{id}}">
            <a href="{{ share.url }}">{% translate 'List.ButtonDownloadAll' %}</a>
          </span>
        </h1>
        <ul class="picturepark-widget-list-body picturepark-widget-list-body-{{id}}">
        {% for selection in share.items %}
          <li>
            <span style="float:right">
              <a href="{{selection.originalUrl}}">
                <svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg" 
                     xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title/><desc/><defs/>
                  <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
                    <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">
                      <g id="file-download" transform="translate(383.000000, 213.500000)">
                        <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </span>
            <span>
              <strong>{{ selection.displayValues.list }}</strong><br />
              TBD
            </span>
          </li>
        {% endfor %}
        </ul>
      </div>`;
    }
}

/// <reference path="./typings/pdfjs.d.ts" />
/// <reference path="../../picturepark-sdk-v1-fetch/dist/index.d.ts" />
function log(message) {
    if (console) {
        console.log(message);
    }
}
class PictureparkPlayers {
    static showPrevious(token, elementId) {
        let share = document.pictureparkShareCache[token];
        let gallery = PictureparkPlayers.getGallery(elementId);
        if (share.player)
            share.player.stop();
        let newIndex = gallery.index - 1;
        if (newIndex < 0)
            newIndex = gallery.children.length - 1;
        PictureparkPlayers.showGalleryItem(gallery, newIndex);
    }
    static showNext(token, elementId) {
        let share = document.pictureparkShareCache[token];
        let gallery = PictureparkPlayers.getGallery(elementId);
        if (share.player)
            share.player.stop();
        let newIndex = gallery.index + 1;
        if (newIndex === gallery.children.length)
            newIndex = 0;
        PictureparkPlayers.showGalleryItem(gallery, newIndex);
    }
    static showGalleryItem(gallery, newIndex) {
        if (gallery.index !== newIndex) {
            gallery.children[gallery.index].element.style.display = 'none';
            gallery.children[newIndex].element.style.display = '';
        }
    }
    static getGallery(elementId) {
        let children = [];
        let visibleIndex = -1;
        let element = document.getElementById(elementId);
        if (element) {
            for (var i = 0; i < element.children.length; i++) {
                let child = element.children[i];
                let isVisible = child.style.display !== "none";
                children.push({ index: i, visible: isVisible, element: child });
                if (isVisible) {
                    visibleIndex = i;
                }
            }
            return { children: children, index: visibleIndex };
        }
        else {
            // no website gallery found (e.g. not available in the gallery template)
            return null;
        }
    }
    static showDetail(token, shareItemId, widgetId) {
        if (PictureparkPlayers.loading)
            return;
        PictureparkPlayers.loading = true;
        let share = document.pictureparkShareCache[token];
        PictureparkPlayers.showDetailById(shareItemId, share.items, widgetId);
    }
    static showDetailById(shareItemId, shareItems, widgetId) {
        let shareItem = shareItems.filter(i => i.id === shareItemId)[0];
        if (shareItem.isPdf && shareItems.length === 1) {
            this.showPdfJsItem(shareItem);
            PictureparkPlayers.loading = false;
        }
        else {
            let savedOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            this.showPhotoSwipeItem(shareItem, shareItems, widgetId ? 'gallery_' + widgetId : undefined).then(() => {
                PictureparkPlayers.loading = false;
                document.body.style.overflow = savedOverflow;
            });
        }
    }
    static disposeVideoPlayer(player) {
        let existingPlayer = PictureparkPlayers.loadedPlayers.filter(p => p.element === player.id_)[0];
        if (existingPlayer) {
            log('Picturepark Widgets > Disposed videojs player');
            try {
                player.dispose();
            }
            catch (_a) {
            }
            PictureparkPlayers.loadedPlayers = PictureparkPlayers.loadedPlayers
                .filter(p => p.player !== player);
        }
        else {
            log('Picturepark Widgets > Player could not be disposed' + player);
        }
    }
    static renderVideoPlayerIfNeeded(item, element, width, height) {
        let playerInfo = PictureparkPlayers.loadedPlayers.filter(p => p.element === element.id)[0];
        if (playerInfo) {
            return playerInfo.promise.then(player => {
                let element = document.getElementById(playerInfo.element);
                if (!element || !element.tagName || element.tagName.toLowerCase() === 'video' || element.tagName.toLowerCase() === 'audio') {
                    if (player) {
                        PictureparkPlayers.disposeVideoPlayer(player);
                    }
                    return PictureparkPlayers.renderVideoPlayer(element, item, width, height).then((player) => {
                        playerInfo.player = player;
                        log('Picturepark Widgets > Reloaded videojs player: ' + element.id);
                        return player;
                    });
                }
                else {
                    log('Picturepark Widgets > Reused videojs player: ' + element.id);
                    return player;
                }
            });
        }
        PictureparkPlayers.loadedPlayers = PictureparkPlayers.loadedPlayers.filter(p => p.element !== element.id_);
        playerInfo = {
            element: element.id,
            promise: PictureparkPlayers.renderVideoPlayer(element, item, width, height).then(player => {
                log('Picturepark Widgets > Created videojs player: ' + element.id);
                return player;
            })
        };
        PictureparkPlayers.loadedPlayers.push(playerInfo);
        return playerInfo.promise;
    }
    static renderVideoPlayer(element, item, width, height) {
        return this.loadVideoPlayerLibraries().then((videojs) => {
            return new Promise((resolve) => {
                var player = videojs(element, {
                    autoplay: false,
                    controls: true,
                    poster: item.previewUrl,
                    width: width,
                    height: height,
                    preload: 'auto'
                }, () => {
                    resolve(player);
                });
                player.src({
                    type: item.isMovie ? 'video/mp4' : 'audio/mp3',
                    src: item.isMovie ? item.videoUrl : item.audioUrl
                });
                return player;
            });
        });
    }
    static loadVideoPlayerLibraries() {
        if (window.videojs)
            return Promise.resolve(window.videojs);
        return Promise.all([
            this.loadCss("https://vjs.zencdn.net/7.0.3/video-js.css"),
            this.loadScript("https://vjs.zencdn.net/7.0.3/video.js", "videojs")
        ]).then(([_, videojs]) => {
            return videojs;
        });
    }
    static showPdfJsItem(item) {
        let iframeElement = document.createElement("iframe");
        iframeElement.style.position = 'fixed';
        iframeElement.style.left = '0';
        iframeElement.style.top = '0';
        iframeElement.style.width = '100%';
        iframeElement.style.height = '100%';
        iframeElement.src = PictureparkPlayers.scriptsPath + 'pdfjs-dist/web/viewer.html?file=' + item.pdfUrl;
        let savedOverflow = document.body.style.overflow;
        let keydownCallback = (e) => {
            let event = e || window.event;
            let isEscape = "key" in event ? (event.key == "Escape" || event.key == "Esc") : (event.keyCode == 27);
            if (isEscape) {
                closeCallback();
            }
        };
        let closeCallback = () => {
            document.body.removeChild(iframeElement);
            document.body.style.overflow = savedOverflow;
            document.removeEventListener('keydown', keydownCallback, true);
        };
        let pdfLoaded = false;
        iframeElement.onload = (e) => {
            document.body.style.overflow = 'hidden';
            if (pdfLoaded)
                closeCallback();
            else
                pdfLoaded = true;
        };
        document.addEventListener('keydown', keydownCallback, true);
        document.body.appendChild(iframeElement);
    }
    static showPhotoSwipeItem(shareItem, shareItems, galleryElementId) {
        return this.loadPhotoSwipe().then(result => {
            if (!shareItems) {
                shareItems = [shareItem];
            }
            let photoSwipeItems = shareItems.map(i => {
                if (i.isImage && i.detail) {
                    return {
                        src: i.previewUrl,
                        w: i.detail.width,
                        h: i.detail.height,
                        origin: i.originalUrl
                    };
                }
                else if (i.isPdf) {
                    return {
                        html: '<iframe style="position: absolute; left: 0; top: 40px; width: 100%; height: calc(100% - 40px)" ' +
                            'src="' + PictureparkPlayers.scriptsPath + 'pdfjs-dist/web/viewer.html?file=' + i.pdfUrl + '&closeButton=false" id="pdfjs_' + i.id + '"></iframe>',
                        origin: i.originalUrl
                    };
                }
                else if (i.isMovie) {
                    return {
                        html: '<video class="video-js vjs-big-play-centered" id="vjsplayer_' + i.id + '"></video>',
                        origin: i.originalUrl
                    };
                }
                else if (i.isAudio) {
                    return {
                        html: '<audio class="video-js vjs-big-play-centered" id="vjsplayer_' + i.id + '"></audio>',
                        origin: i.originalUrl
                    };
                }
                else if (!i.isBinary) {
                    return {
                        html: '<br /><br /><br /><br /><div class="picturepark-widget-content-preview"> ' + i.displayValues.detail + '</div>',
                        origin: i.originalUrl
                    };
                }
                else {
                    // Fallback to preview image
                    return {
                        src: i.previewUrl + "?width=800&height=800",
                        w: 800,
                        h: 800,
                        origin: i.originalUrl
                    };
                }
            });
            var photoSwipe = new result.photoSwipe(result.element, result.photoSwipeDefault, photoSwipeItems, { index: shareItems.indexOf(shareItem) });
            photoSwipe.options.history = false;
            photoSwipe.options.shareButtons = [{ id: 'download', label: 'Download', url: '{{raw_image_url}}', download: true }];
            photoSwipe.options.getImageURLForShare = (shareButtonData) => {
                return photoSwipe.currItem.origin || photoSwipe.currItem.src || '';
            },
                photoSwipe.init();
            photoSwipe.listen('afterChange', function () {
                let gallery = galleryElementId ? PictureparkPlayers.getGallery(galleryElementId) : undefined;
                if (gallery) {
                    PictureparkPlayers.showGalleryItem(gallery, photoSwipe.getCurrentIndex());
                }
            });
            var resizeCallbacks = [];
            var loadedPlayers = [];
            if (shareItems.filter(i => i.isMovie || i.isAudio || i.isPdf).length > 0) {
                var updatePlayers = () => {
                    if (shareItems.filter(i => i.isMovie || i.isAudio).length > 0) {
                        PictureparkPlayers.loadVideoPlayerLibraries().then(() => {
                            for (let item of shareItems.filter(i => i.isMovie || i.isAudio)) {
                                let elementId = "vjsplayer_" + item.id;
                                let element = document.getElementById(elementId);
                                if (element) {
                                    PictureparkPlayers.renderVideoPlayerIfNeeded(item, element, window.innerWidth, window.innerHeight).then(player => {
                                        if (player) {
                                            loadedPlayers.push(player);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    // Handle pdfjs iframe close event
                    for (let i of shareItems.filter(i => i.isPdf)) {
                        let elementId = 'pdfjs_' + i.id;
                        let element = document.getElementById(elementId);
                        if (element) {
                            element.onload = () => {
                                if (element.contentWindow.location.href === 'about:blank')
                                    photoSwipe.close();
                            };
                        }
                    }
                };
                photoSwipe.listen('afterChange', () => {
                    updatePlayers();
                    photoSwipe.listen('beforeChange', () => {
                        updatePlayers();
                    });
                });
                updatePlayers();
            }
            return new Promise((resolve) => {
                photoSwipe.listen('close', () => {
                    for (let player of loadedPlayers) {
                        this.disposeVideoPlayer(player);
                    }
                    for (let resizeCallback of resizeCallbacks) {
                        window.removeEventListener('resize', resizeCallback, false);
                    }
                    resolve();
                });
            });
        });
    }
    static loadPhotoSwipe() {
        if (window.PhotoSwipe)
            return Promise.resolve({
                element: PictureparkPlayers.getPhotoSwipeElement(),
                photoSwipe: window.PhotoSwipe,
                photoSwipeDefault: window.PhotoSwipeUI_Default
            });
        else {
            return Promise.all([
                this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.css"),
                this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.css"),
                this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.min.js", "PhotoSwipe"),
                this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe-ui-default.min.js", "PhotoSwipeUI_Default")
            ]).then(([css1, css2, photoSwipe, photoSwipeDefault]) => {
                return {
                    element: PictureparkPlayers.getPhotoSwipeElement(),
                    photoSwipe: photoSwipe,
                    photoSwipeDefault: photoSwipeDefault
                };
            });
        }
    }
    static getPhotoSwipeElement() {
        let element = document.querySelectorAll('.pswp')[0];
        if (element)
            return element;
        else {
            var markup = `
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div> 
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>`;
            var divElement = document.createElement("div");
            divElement.id = "photoswipe";
            divElement.innerHTML = markup;
            document.body.appendChild(divElement);
            return document.querySelectorAll('.pswp')[0];
        }
    }
    static loadScript(url, globalName) {
        if (window.require) {
            log('Picturepark Widgets > Load external script via require(): ' + url);
            return new Promise(resolve => {
                window.require([url], (module) => {
                    resolve(module);
                });
            });
        }
        else {
            log('Picturepark Widgets > Load external script via tag: ' + url);
            return new Promise((resolve) => {
                var scriptTag = document.createElement('script');
                scriptTag.src = url;
                scriptTag.async = true;
                scriptTag.onload = () => {
                    resolve(window[globalName]);
                };
                document.head.appendChild(scriptTag);
            });
        }
    }
    static loadCss(url) {
        return new Promise((resolve) => {
            var linkElement = document.createElement("link");
            linkElement.type = "text/css";
            linkElement.rel = "stylesheet";
            linkElement.href = url;
            linkElement.onload = () => resolve();
            document.getElementsByTagName("head")[0].appendChild(linkElement);
        });
    }
}
PictureparkPlayers.loading = false;
PictureparkPlayers.scriptsPath = undefined;
PictureparkPlayers.loadedPlayers = [];

var TRANSLATIONS = {
    List: {
        HeaderDownloads: {
            en: "Downloads",
            de: "Downloads"
        },
        ButtonDownloadAll: {
            en: "Download all",
            de: "Alle herunterladen"
        }
    },
    AudioPreview: {
        en: "Audio waveform preview",
        de: "Audio-Wellenform Voransicht"
    },
    AudioSmall: {
        en: "Audio",
        de: "Audio"
    },
    DocumentPreview: {
        en: "Document preview",
        de: "Dokument Voransicht"
    },
    Original: {
        en: "Original",
        de: "Original"
    },
    Pdf: {
        en: "PDF",
        de: "PDF"
    },
    Preview: {
        en: "Preview",
        de: "Voransicht"
    },
    ThumbnailLarge: {
        en: "Large thumbnail",
        de: "Vorschau gross"
    },
    ThumbnailMedium: {
        en: "Medium thumbnail",
        de: "Vorschau mittel"
    },
    ThumbnailSmall: {
        en: "Small thumbnail",
        de: "Vorschau klein"
    },
    VideoKeyframes: {
        en: "Video keyframes",
        de: "Video-Keyframes"
    },
    VideoLarge: {
        en: "Large video",
        de: "Video gross"
    },
    VideoPreview: {
        en: "Video preview",
        de: "Video Voransicht"
    },
    VideoSmall: {
        en: "Small video",
        de: "Video klein"
    }
};
var fallbackLanguage = 'en';
function translate(key, locale) {
    let language = locale ? locale.split("-")[0].toLowerCase() : "";
    let translations = TRANSLATIONS;
    if (typeof key === 'string') {
        let path = key.split(".");
        if (path.length > 0) {
            for (let segment of path) {
                if (translations[segment])
                    translations = translations[segment];
                else {
                    translations = null;
                    break;
                }
            }
        }
        else
            translations = null;
    }
    else
        translations = key;
    return translations && translations[language] ? translations[language] :
        (language !== fallbackLanguage ? translate(key, fallbackLanguage + '-') : `[!${key}]`);
}

class PictureparkRenderEngine {
    static create() {
        let engine = Liquid();
        engine.registerTag('translate', {
            parse: function (token) {
                this.token = token;
            },
            render: function (scope, hash) {
                let args = this.token.args.split(' ');
                let key = Liquid.evalExp(args[0], scope);
                let locale = navigator.language || navigator.userLanguage;
                return translate(key, locale);
            }
        });
        engine.registerTag('resizeById', {
            parse: function (token) {
                this.token = token;
            },
            render: function (scope, hash) {
                let args = this.token.args.split(' ');
                let share = scope.scopes[0].share;
                let id = Liquid.evalExp(args[0], scope);
                let outputFormatId = Liquid.evalExp(args[1], scope);
                let width = Liquid.evalExp(args[2], scope);
                let height = Liquid.evalExp(args[3], scope);
                try {
                    let item = share.items.filter(i => i.id === id)[0];
                    if (outputFormatId === "Preview" && item.previewUrl) {
                        return item.previewUrl + `?width=${width}&height=${height}`;
                    }
                    else {
                        // Fallback to original output view url
                        let output = item.outputs.find(i => i.outputFormatId === "Original");
                        if (output) {
                            return output.viewUrl + `?width=${width}&height=${height}`;
                        }
                        else {
                            return item.originalUrl + `?width=${width}&height=${height}`;
                        }
                    }
                }
                catch (ex) {
                    return "";
                }
            }
        });
        return engine;
    }
}

class PictureparkConfig {
    static get(element) {
        let configuration = { renderStyles: true };
        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            if (attribute.name === 'data-token')
                configuration['token'] = attribute.value;
            else if (attribute.name === 'data-template')
                configuration['template'] = attribute.value;
            else if (attribute.name === 'data-picturepark-server')
                configuration['server'] = attribute.value;
            else if (attribute.name === 'data-show-players')
                configuration['showPlayers'] = attribute.value.toLowerCase() === 'true' || attribute.value.toLowerCase() === 'yes';
            else if (attribute.name === 'data-render-styles')
                configuration['renderStyles'] = attribute.value.toLowerCase() !== 'false' && attribute.value.toLowerCase() !== 'no';
            else if (attribute.name === 'data-width') {
                configuration.width = parseInt(attribute.value);
                if (configuration.height === undefined)
                    configuration.height = configuration.width * 3 / 4;
            }
            else if (attribute.name === 'data-height') {
                configuration.height = parseInt(attribute.value);
                if (configuration.width === undefined)
                    configuration.width = configuration.height * 4 / 3;
            }
            else if (attribute.name.indexOf('data-') === 0) {
                let value;
                switch (attribute.value) {
                    case "false":
                        value = false;
                        break;
                    case "true":
                        value = true;
                        break;
                    default:
                        value = attribute.value;
                        break;
                }
                configuration[attribute.name.substr(5).replace(/-([a-z])/g, g => g[1].toUpperCase())] = value;
            }
        }
        return configuration;
    }
}

/// <reference path="../../picturepark-sdk-v1-fetch/dist/index.d.ts" />
/**
 * Processes a script tag.
 * @param scriptTag The script tag to process.
 */
function processScriptTag(scriptTag) {
    if (scriptTag["isPictureparkProcessing"])
        return;
    scriptTag["isPictureparkProcessing"] = true;
    var loadingTemplate = 'Loading...';
    var errorTemplate = 'Failed to load data.';
    var contentTemplate = '';
    let id = Math.random().toString(36).substr(2, 10);
    var elementId = 'picturepark_widget_' + id;
    let initialConfig = PictureparkConfig.get(scriptTag);
    // Load custom templates
    if (scriptTag.innerHTML) {
        var temp = document.createElement("div");
        temp.innerHTML = scriptTag.innerHTML;
        var children = temp.children;
        if (children['loading'])
            loadingTemplate = children['loading'].innerHTML;
        if (children['content'])
            contentTemplate = children['content'].innerHTML;
        if (children['error'])
            errorTemplate = children['error'].innerHTML;
        if (!children['loading'] && children['content'] && children['error'])
            contentTemplate = scriptTag.innerHTML;
    }
    // Apply loading template
    scriptTag.outerHTML = '<div class="picturepark-widget picturepark-widget-loading" id=' +
        elementId + '>' + loadingTemplate + '</div>';
    return window.fetch(initialConfig.server + '/json/' + initialConfig.token).then(response => {
        return response.json();
    }).then((shareDetail) => {
        // Merge config with config from server
        let config = {
            template: 'gallery',
            token: '',
            width: undefined,
            height: undefined
        };
        Object.keys(initialConfig).forEach(key => {
            config[key] = initialConfig[key];
        });
        // Fallback to card templates
        if (contentTemplate === '') {
            contentTemplate = PictureparkTemplates.getTemplate("card");
        }
        let index = 0;
        let share = {
            id: shareDetail.id,
            url: shareDetail.data.url,
            name: shareDetail.name,
            creator: shareDetail.creator,
            description: shareDetail.description,
            items: shareDetail.contentSelections.map(s => {
                let outputs = s.outputs.map(o => {
                    return {
                        contentId: s.id,
                        outputFormatId: o.outputFormatId,
                        fileExtension: o.detail ? o.detail.fileExtension : null,
                        viewUrl: o.viewUrl,
                        downloadUrl: o.downloadUrl,
                        detail: o.detail
                    };
                });
                let previewOutput = outputs.find(o => o.outputFormatId === 'Preview');
                // find best original output
                let originalOutput;
                originalOutput = outputs.find(o => o.outputFormatId === "Original");
                var pdfOutput = s.outputs.find(i => i.outputFormatId === "Pdf");
                return {
                    id: s.id,
                    index: index++,
                    displayValues: s.displayValues,
                    detail: originalOutput ? originalOutput.detail : null,
                    isMovie: s.contentSchemaId === "VideoMetadata",
                    isAudio: s.contentSchemaId === "AudioMetadata",
                    isImage: s.contentSchemaId === "ImageMetadata",
                    isPdf: pdfOutput !== undefined,
                    isBinary: s.contentType !== "ContentItem",
                    previewUrl: previewOutput ? previewOutput.viewUrl : originalOutput && s.contentSchemaId === "ImageMetadata" ? originalOutput.viewUrl : s.iconUrl,
                    previewOutputFormatId: previewOutput ? previewOutput.outputFormatId : null,
                    originalUrl: originalOutput ? originalOutput.downloadUrl : null,
                    originalOutputFormatId: originalOutput ? originalOutput.outputFormatId : null,
                    pdfUrl: pdfOutput ? pdfOutput.downloadUrl : null,
                    videoUrl: s.outputs.find(i => i.outputFormatId === "VideoLarge") ? s.outputs.find(i => i.outputFormatId === "VideoLarge").downloadUrl :
                        s.outputs.find(i => i.outputFormatId === "VideoSmall") ? s.outputs.find(i => i.outputFormatId === "VideoSmall").downloadUrl : null,
                    audioUrl: s.outputs.find(i => i.outputFormatId === "AudioSmall") ? s.outputs.find(i => i.outputFormatId === "AudioSmall").downloadUrl : null,
                    outputs: outputs
                };
            })
        };
        if (!document.pictureparkShareCache)
            document.pictureparkShareCache = {};
        document.pictureparkShareCache[config.token] = share;
        let engine = PictureparkRenderEngine.create();
        return engine.parseAndRender(contentTemplate, {
            id: id,
            elementId: elementId,
            share: share,
            config: config
        }).then(html => {
            html = '<div class="picturepark-widget picturepark-widget-' + id + ' picturepark-widget-loaded">' + html + '</div>';
            document.getElementById(elementId).outerHTML = html;
            // iframe
            // let frame = document.createElement('iframe');
            // let elm = document.getElementById(elementId);
            // elm.appendChild(frame);
            // frame.contentDocument.write(html + "<script src='http://localhost:8090/dist/picturepark-widgets.js' async />");
            // Load movie players
            for (let item of share.items) {
                if (item.isMovie || item.isAudio) {
                    let elementId = 'vjsplayer_' + item.index + "_" + id;
                    setTimeout(() => {
                        let element = document.getElementById(elementId);
                        if (element) {
                            PictureparkPlayers.renderVideoPlayerIfNeeded(item, element, config.width, config.height).then(player => {
                                share.player = player;
                            });
                        }
                    });
                }
            }
            if (config.template === "gallery") {
                // Set document events for all items
                setTimeout(() => {
                    const menuButtons = document.getElementsByClassName("picturepark-widget-gallery-item-outputs-" + id);
                    const resetDropdowns = function (currentDropdown) {
                        const dropdowns = document.getElementsByClassName("picturepark-widget-gallery-item-outputs-dropdown-" + id);
                        for (let i = 0; i < dropdowns.length; i++) {
                            const dropdown = dropdowns[i];
                            if (dropdown.classList.contains("show") && dropdown !== currentDropdown) {
                                dropdown.classList.remove("show");
                            }
                        }
                    };
                    for (let i = 0; i < menuButtons.length; i++) {
                        // When the user clicks on the outputs, toggle between hiding and showing the dropdown
                        menuButtons[i].addEventListener("click", function (event) {
                            event.stopPropagation();
                            const dropdown = menuButtons[i].nextElementSibling;
                            resetDropdowns(dropdown);
                            dropdown.classList.toggle("show");
                        }.bind(this));
                    }
                    // Close the dropdown if the user clicks outside of it
                    window.onclick = function (event) {
                        if (!event.target.matches(".picturepark-widget-gallery-item-outputs-" + id)) {
                            resetDropdowns();
                        }
                    };
                });
            }
            return true;
        });
    }).catch((e) => {
        console.error(e);
        document.getElementById(elementId).outerHTML =
            '<div class="picturepark-widget picturepark-widget-error">' + errorTemplate + '</div>';
        return false;
    });
}
function getScriptsPath() {
    let scriptFile = 'picturepark-widgets.js';
    let elements = document.getElementsByTagName('script');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var index = element.src.indexOf(scriptFile);
        if (index !== -1)
            return element.src.substring(0, index);
    }
    return undefined;
}
if (PictureparkPlayers.scriptsPath === undefined)
    PictureparkPlayers.scriptsPath = getScriptsPath();
// Scan all script tags
(function () {
    setTimeout(() => {
        var scriptTags = document.getElementsByTagName('script');
        for (var i = 0; i < scriptTags.length; ++i) {
            var scriptTag = scriptTags[i];
            if (scriptTag.hasAttribute('data-picturepark-server')) {
                processScriptTag(scriptTag);
            }
        }
    });
})();

exports.players = PictureparkPlayers;
exports.processScriptTag = processScriptTag;
