var pictureparkWidgets = (function () {
  var main = null;
  var modules = {
      "require": {
          factory: undefined,
          dependencies: [],
          exports: function (args, callback) { return require(args, callback); },
          resolved: true
      }
  };
  function define(id, dependencies, factory) {
      return main = modules[id] = {
          dependencies: dependencies,
          factory: factory,
          exports: {},
          resolved: false
      };
  }
  function resolve(definition) {
      if (definition.resolved === true)
          return;
      definition.resolved = true;
      var dependencies = definition.dependencies.map(function (id) {
          return (id === "exports")
              ? definition.exports
              : (function () {
                  if(modules[id] !== undefined) {
                    resolve(modules[id]);
                    return modules[id].exports;
                  } else {
                    try {
                      return require(id);
                    } catch(e) {
                      throw Error("module '" + id + "' not found.");
                    }
                  }
              })();
      });
      definition.factory.apply(null, dependencies);
  }
  function collect() {
      Object.keys(modules).map(function (key) { return modules[key]; }).forEach(resolve);
      return (main !== null) 
        ? main.exports
        : undefined
  }

  !function (e) { function n() { } function t(e, n) { return function () { e.apply(n, arguments); }; } function o(e) { if ("object" != typeof this)
      throw new TypeError("Promises must be constructed via new"); if ("function" != typeof e)
      throw new TypeError("not a function"); this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], s(e, this); } function i(e, n) { for (; 3 === e._state;)
      e = e._value; return 0 === e._state ? void e._deferreds.push(n) : (e._handled = !0, void o._immediateFn(function () { var t = 1 === e._state ? n.onFulfilled : n.onRejected; if (null === t)
      return void (1 === e._state ? r : u)(n.promise, e._value); var o; try {
      o = t(e._value);
  }
  catch (i) {
      return void u(n.promise, i);
  } r(n.promise, o); })); } function r(e, n) { try {
      if (n === e)
          throw new TypeError("A promise cannot be resolved with itself.");
      if (n && ("object" == typeof n || "function" == typeof n)) {
          var i = n.then;
          if (n instanceof o)
              return e._state = 3, e._value = n, void f(e);
          if ("function" == typeof i)
              return void s(t(i, n), e);
      }
      e._state = 1, e._value = n, f(e);
  }
  catch (r) {
      u(e, r);
  } } function u(e, n) { e._state = 2, e._value = n, f(e); } function f(e) { 2 === e._state && 0 === e._deferreds.length && o._immediateFn(function () { e._handled || o._unhandledRejectionFn(e._value); }); for (var n = 0, t = e._deferreds.length; n < t; n++)
      i(e, e._deferreds[n]); e._deferreds = null; } function c(e, n, t) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t; } function s(e, n) { var t = !1; try {
      e(function (e) { t || (t = !0, r(n, e)); }, function (e) { t || (t = !0, u(n, e)); });
  }
  catch (o) {
      if (t)
          return;
      t = !0, u(n, o);
  } } var a = setTimeout; o.prototype["catch"] = function (e) { return this.then(null, e); }, o.prototype.then = function (e, t) { var o = new this.constructor(n); return i(this, new c(e, t, o)), o; }, o.all = function (e) { var n = Array.prototype.slice.call(e); return new o(function (e, t) { function o(r, u) { try {
      if (u && ("object" == typeof u || "function" == typeof u)) {
          var f = u.then;
          if ("function" == typeof f)
              return void f.call(u, function (e) { o(r, e); }, t);
      }
      n[r] = u, 0 === --i && e(n);
  }
  catch (c) {
      t(c);
  } } if (0 === n.length)
      return e([]); for (var i = n.length, r = 0; r < n.length; r++)
      o(r, n[r]); }); }, o.resolve = function (e) { return e && "object" == typeof e && e.constructor === o ? e : new o(function (n) { n(e); }); }, o.reject = function (e) { return new o(function (n, t) { t(e); }); }, o.race = function (e) { return new o(function (n, t) { for (var o = 0, i = e.length; o < i; o++)
      e[o].then(n, t); }); }, o._immediateFn = "function" == typeof setImmediate && function (e) { setImmediate(e); } || function (e) { a(e, 0); }, o._unhandledRejectionFn = function (e) { "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e); }, o._setImmediateFn = function (e) { o._immediateFn = e; }, o._setUnhandledRejectionFn = function (e) { o._unhandledRejectionFn = e; }, "undefined" != typeof module && module.exports ? module.exports = o : e.Promise || (e.Promise = o); }(this);
  !function (e) { if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = e();
  else if ("function" == typeof define && define.amd)
      define([], e);
  else {
      var r;
      r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.Liquid = e();
  } }(function () {
      return function e(r, t, n) { function s(o, u) { if (!t[o]) {
          if (!r[o]) {
              var a = "function" == typeof require && require;
              if (!u && a)
                  return a(o, !0);
              if (i)
                  return i(o, !0);
              var c = new Error("Cannot find module '" + o + "'");
              throw c.code = "MODULE_NOT_FOUND", c;
          }
          var l = t[o] = { exports: {} };
          r[o][0].call(l.exports, function (e) { var t = r[o][1][e]; return s(t ? t : e); }, l, l.exports, e, r, t, n);
      } return t[o].exports; } for (var i = "function" == typeof require && require, o = 0; o < n.length; o++)
          s(n[o]); return s; }({ 1: [function (e, r) {
                  "use strict";
                  function t(e) { return o(e).replace(/&|<|>|"|'/g, function (e) { return p[e]; }); }
                  function n(e) { return o(e).replace(/&(amp|lt|gt|#34|#39);/g, function (e) { return h[e]; }); }
                  function s(e) { var r = (e + "").split("."); return r.length > 1 ? r[1].length : 0; }
                  function i(e, r) { return Math.max(s(e), s(r)); }
                  function o(e) { return e = e || "", e + ""; }
                  function u(e) { return function (r, t) { var n = i(r, t); return e(r, t).toFixed(n); }; }
                  function a(e) { return l.forOwn(g, function (r, t) { return e.registerFilter(t, r); }); }
                  var c = e("./src/util/strftime.js"), l = e("./src/util/underscore.js"), f = e("./src/syntax.js").isTruthy, p = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" }, h = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#34;": '"', "&#39;": "'" }, g = { abs: function (e) { return Math.abs(e); }, append: function (e, r) { return e + r; }, capitalize: function (e) { return o(e).charAt(0).toUpperCase() + e.slice(1); }, ceil: function (e) { return Math.ceil(e); }, date: function (e, r) { return "now" === e && (e = new Date), e instanceof Date ? c(e, r) : ""; }, "default": function (e, r) { return f(e) ? e : r; }, divided_by: function (e, r) { return Math.floor(e / r); }, downcase: function (e) { return e.toLowerCase(); }, escape: t, escape_once: function (e) { return t(n(e)); }, first: function (e) { return e[0]; }, floor: function (e) { return Math.floor(e); }, join: function (e, r) { return e.join(r); }, last: function (e) { return e[e.length - 1]; }, lstrip: function (e) { return o(e).replace(/^\s+/, ""); }, map: function (e, r) { return e.map(function (e) { return e[r]; }); }, minus: u(function (e, r) { return e - r; }), modulo: u(function (e, r) { return e % r; }), newline_to_br: function (e) { return e.replace(/\n/g, "<br />"); }, plus: u(function (e, r) { return Number(e) + Number(r); }), prepend: function (e, r) { return r + e; }, remove: function (e, r) { return e.split(r).join(""); }, remove_first: function (e, r) { return e.replace(r, ""); }, replace: function (e, r, t) { return o(e).split(r).join(t); }, replace_first: function (e, r, t) { return o(e).replace(r, t); }, reverse: function (e) { return e.reverse(); }, round: function (e, r) { var t = Math.pow(10, r || 0); return Math.round(e * t, r) / t; }, rstrip: function (e) { return o(e).replace(/\s+$/, ""); }, size: function (e) { return e.length; }, slice: function (e, r, t) { return e.substr(r, void 0 === t ? 1 : t); }, sort: function (e, r) { return e.sort(r); }, split: function (e, r) { return o(e).split(r); }, strip: function (e) { return o(e).trim(); }, strip_html: function (e) { return o(e).replace(/<\/?\s*\w+\s*\/?>/g, ""); }, strip_newlines: function (e) { return o(e).replace(/\n/g, ""); }, times: function (e, r) { return e * r; }, truncate: function (e, r, t) { return e = o(e), t = void 0 === t ? "..." : t, r = r || 16, e.length <= r ? e : e.substr(0, r - t.length) + t; }, truncatewords: function (e, r, t) { void 0 === t && (t = "..."); var n = e.split(" "), s = n.slice(0, r).join(" "); return n.length > r && (s += t), s; }, uniq: function (e) { var r = {}; return (e || []).filter(function (e) { return r.hasOwnProperty(e) ? !1 : (r[e] = !0, !0); }); }, upcase: function (e) { return o(e).toUpperCase(); }, url_encode: encodeURIComponent };
                  a.filters = g, r.exports = a;
              }, { "./src/syntax.js": 13, "./src/util/strftime.js": 20, "./src/util/underscore.js": 21 }], 2: [function (e, r) {
                  "use strict";
                  function t(e) { e = i.assign({ root: ["."], cache: !1, extname: ".liquid", trim_right: !1, trim_left: !1, strict_filters: !1, strict_variables: !1 }, e), e.root = n(e.root); var r = Object.create(b); return r.init(h(), g(e), e), r; }
                  function n(e) { return i.isArray(e) ? e : i.isString(e) ? [e] : []; }
                  var s = e("./src/scope"), i = e("./src/util/underscore.js"), o = e("./src/util/assert.js"), u = e("./src/tokenizer.js"), a = e("./src/util/fs.js").statFileAsync, c = e("./src/util/fs.js").readFileAsync, l = e("path"), f = e("./src/render.js"), p = e("./src/lexical.js"), h = e("./src/tag.js"), g = e("./src/filter.js"), d = e("./src/parser"), v = e("./src/syntax.js"), m = e("./tags"), y = e("./filters"), j = e("any-promise"), w = e("./src/util/promise.js").anySeries, x = e("./src/util/error.js"), b = { init: function (e, r, t) { return t.cache && (this.cache = {}), this.options = t, this.tag = e, this.filter = r, this.parser = d(e, r), this.renderer = f(), m(this), y(this), this; }, parse: function (e, r) { var t = u.parse(e, r, this.options); return this.parser.parse(t); }, render: function (e, r, t) { t = i.assign({}, this.options, t); var n = s.factory(r, t); return this.renderer.renderTemplates(e, n); }, parseAndRender: function (e, r, t) { var n = this; return j.resolve().then(function () { return n.parse(e); }).then(function (e) { return n.render(e, r, t); })["catch"](function (e) { if (e instanceof x.RenderBreakError)
                          return e.html; throw e; }); }, renderFile: function (e, r, t) { var n = this; return t = i.assign({}, t), this.getTemplate(e, t.root).then(function (e) { return n.render(e, r, t); }); }, evalOutput: function (e, r) { var t = this.parser.parseOutput(e.trim()); return this.renderer.evalOutput(t, r); }, registerFilter: function (e, r) { return this.filter.register(e, r); }, registerTag: function (e, r) { return this.tag.register(e, r); }, lookup: function (e, r) { r = this.options.root.concat(r || []), r = i.uniq(r); var t = r.map(function (r) { return l.resolve(r, e); }); return w(t, function (e) { return a(e).then(function () { return e; }); })["catch"](function (t) { throw "ENOENT" === t.code && (t.message = "Failed to lookup " + e + " in: " + r), t; }); }, getTemplate: function (e, r) { var t = this; return l.extname(e) || (e += this.options.extname), this.lookup(e, r).then(function (e) { if (t.options.cache) {
                          var r = t.cache[e];
                          return r ? j.resolve(r) : c(e).then(function (e) { return t.parse(e); }).then(function (r) { return t.cache[e] = r; });
                      } return c(e).then(function (r) { return t.parse(r, e); }); }); }, express: function (e) { e = e || {}; var r = this; return function (t, n, s) { o(i.isArray(this.root) || i.isString(this.root), "illegal views root, are you using express.js?"), e.root = this.root, r.renderFile(t, n, e).then(function (e) { return s(null, e); })["catch"](function (e) { return s(e); }); }; } };
                  t.lexical = p, t.isTruthy = v.isTruthy, t.isFalsy = v.isFalsy, t.evalExp = v.evalExp, t.evalValue = v.evalValue, t.Types = { ParseError: x.ParseError, TokenizationEroor: x.TokenizationError, RenderBreakError: x.RenderBreakError, AssertionError: x.AssertionError }, r.exports = t;
              }, { "./filters": 1, "./src/filter.js": 7, "./src/lexical.js": 8, "./src/parser": 10, "./src/render.js": 11, "./src/scope": 12, "./src/syntax.js": 13, "./src/tag.js": 14, "./src/tokenizer.js": 15, "./src/util/assert.js": 16, "./src/util/error.js": 17, "./src/util/fs.js": 18, "./src/util/promise.js": 19, "./src/util/underscore.js": 21, "./tags": 32, "any-promise": 3, path: 6 }], 3: [function (e, r) {
                  "use strict";
                  r.exports = e("./register")().Promise;
              }, { "./register": 5 }], 4: [function (e, r) {
                  "use strict";
                  var t = "@@any-promise/REGISTRATION", n = null;
                  r.exports = function (e, r) { return function (s, i) { s = s || null, i = i || {}; var o = i.global !== !1; if (null === n && o && (n = e[t] || null), null !== n && null !== s && n.implementation !== s)
                      throw new Error('any-promise already defined as "' + n.implementation + '".  You can only register an implementation before the first  call to require("any-promise") and an implementation cannot be changed'); return null === n && (n = null !== s && "undefined" != typeof i.Promise ? { Promise: i.Promise, implementation: s } : r(s), o && (e[t] = n)), n; }; };
              }, {}], 5: [function (e, r) {
                  "use strict";
                  function t() { if ("undefined" == typeof window.Promise)
                      throw new Error("any-promise browser requires a polyfill or explicit registration e.g: require('any-promise/register/bluebird')"); return { Promise: window.Promise, implementation: "window.Promise" }; }
                  r.exports = e("./loader")(window, t);
              }, { "./loader": 4 }], 6: [function () {
                  "use strict";
              }, {}], 7: [function (e, r) {
                  "use strict";
                  var t = e("./lexical.js"), n = e("./syntax.js"), s = e("./util/assert.js"), i = e("./util/underscore.js"), o = new RegExp("" + t.value.source, "g");
                  r.exports = function (e) { function r(e) { var r = Object.create(l); return r.parse(e); } function u(e, r) { c[e] = r; } function a() { c = {}; } e = i.assign({}, e); var c = {}, l = { render: function (e, r) { var t = this.args.map(function (e) { return n.evalValue(e, r); }); return t.unshift(e), this.filter.apply(null, t); }, parse: function (r) { var n = t.filterLine.exec(r); s(n, "illegal filter: " + r); var i = n[1], u = n[2] || "", a = c[i]; if ("function" != typeof a) {
                          if (e.strict_filters)
                              throw new TypeError("undefined filter: " + i);
                          return this.name = i, this.filter = function (e) { return e; }, this.args = [], this;
                      } for (var l = []; n = o.exec(u.trim());) {
                          var f = n[0], p = new RegExp(f + "\\s*:", "g");
                          l.push(p.test(n.input) ? "'" + f + "'" : f);
                      } return this.name = i, this.filter = a, this.args = l, this; } }; return { construct: r, register: u, clear: a }; };
              }, { "./lexical.js": 8, "./syntax.js": 13, "./util/assert.js": 16, "./util/underscore.js": 21 }], 8: [function (e, r) {
                  "use strict";
                  function t(e) { return q.test(e); }
                  function n(e) { return S.test(e); }
                  function s(e) { return P.test(e); }
                  function i(e) { return R.test(e); }
                  function o(e) { return b.exec(e); }
                  function u(e) { var r = e.match(O); return r ? Number(e) : (r = e.match(M)) ? "true" === e.toLowerCase() : (r = e.match(A), r ? e.slice(1, -1) : void 0); }
                  var a = /'[^']*'/, c = /"[^"]*"/, l = new RegExp(a.source + "|" + c.source), f = new RegExp("(?:" + l.source + "|[^'\"])*"), p = /-?\d+/, h = /-?\d+\.?\d*|\.?\d+/, g = /true|false/, d = /[\w-]+/, v = new RegExp("\\[(?:" + l.source + "|[\\w-\\.]+)\\]"), m = new RegExp("(?:" + l.source + "|" + g.source + "|" + h.source + ")"), y = new RegExp(d.source + "(?:\\." + d.source + "|" + v.source + ")*"), j = new RegExp("(?:" + y.source + "|" + h.source + ")"), w = new RegExp("\\(" + j.source + "\\.\\." + j.source + "\\)"), x = new RegExp("\\((" + j.source + ")\\.\\.(" + j.source + ")\\)"), b = new RegExp("(?:" + y.source + "|" + m.source + "|" + w.source + ")"), E = new RegExp("(?:" + d.source + ")\\s*:\\s*(?:" + b.source + ")"), T = new RegExp("(" + d.source + ")\\s*:\\s*(" + b.source + ")", "g"), k = new RegExp("^\\s*(" + d.source + ")\\s*([\\s\\S]*)\\s*$"), S = new RegExp("^" + m.source + "$", "i"), R = new RegExp("^" + y.source + "$"), O = new RegExp("^" + h.source + "$"), M = new RegExp("^" + g.source + "$", "i"), A = new RegExp("^" + l.source + "$"), P = new RegExp("^" + x.source + "$"), q = new RegExp("^" + p.source + "$"), L = new RegExp("(?:" + d.source + "\\s*:\\s*)?" + b.source), F = new RegExp(L.source + "(\\s*,\\s*" + L.source + ")*"), _ = new RegExp(d.source + "(?:\\s*:\\s*" + F.source + ")?", "g"), D = new RegExp("(" + d.source + ")(?:\\s*:\\s*(" + F.source + "))?"), I = new RegExp("^" + D.source + "$"), $ = [/\s+or\s+/, /\s+and\s+/, /==|!=|<=|>=|<|>|\s+contains\s+/];
                  r.exports = { quoted: l, number: h, bool: g, literal: m, filter: _, integer: p, hash: E, hashCapture: T, range: w, rangeCapture: x, identifier: d, value: b, quoteBalanced: f, operators: $, quotedLine: A, numberLine: O, boolLine: M, rangeLine: P, literalLine: S, filterLine: I, tagLine: k, isLiteral: n, isVariable: i, parseLiteral: u, isRange: s, matchValue: o, isInteger: t };
              }, {}], 9: [function (e, r) {
                  "use strict";
                  var t = { "==": function (e, r) { return e === r; }, "!=": function (e, r) { return e !== r; }, ">": function (e, r) { return null !== e && null !== r && e > r; }, "<": function (e, r) { return null !== e && null !== r && r > e; }, ">=": function (e, r) { return null !== e && null !== r && e >= r; }, "<=": function (e, r) { return null !== e && null !== r && r >= e; }, contains: function (e, r) { return e ? "function" != typeof e.indexOf ? !1 : e.indexOf(r) > -1 : !1; }, and: function (e, r) { return e && r; }, or: function (e, r) { return e || r; } };
                  r.exports = t;
              }, {}], 10: [function (e, r) {
                  "use strict";
                  var t = e("./lexical.js"), n = e("./util/error.js").ParseError, s = e("./util/assert.js");
                  r.exports = function (e, r) { function i(e) { for (var r, t = []; r = e.shift();)
                      t.push(o(r, e)); return t; } function o(e, r) { try {
                      var t = null;
                      return t = "tag" === e.type ? u(e, r) : "output" === e.type ? a(e.value) : e, t.token = e, t;
                  }
                  catch (s) {
                      throw new n(s, e);
                  } } function u(r, t) { return "continue" === r.name || "break" === r.name ? r : e.construct(r, t); } function a(e) { var n = t.matchValue(e); s(n, "illegal output string: " + e); var i = n[0]; e = e.substr(n.index + n[0].length); for (var o = []; n = t.filter.exec(e);)
                      o.push([n[0].trim()]); return { type: "output", initial: i, filters: o.map(function (e) { return r.construct(e); }) }; } function c(e) { var r = Object.create(l); return r.init(e); } var l = { init: function (e) { return this.tokens = e, this.handlers = {}, this; }, on: function (e, r) { return this.handlers[e] = r, this; }, trigger: function (e, r) { var t = this.handlers[e]; return "function" == typeof t ? (t(r), !0) : void 0; }, start: function () { this.trigger("start"); for (var e; !this.stopRequested && (e = this.tokens.shift());)
                          if (!(this.trigger("token", e) || "tag" === e.type && this.trigger("tag:" + e.name, e))) {
                              var r = o(e, this.tokens);
                              this.trigger("template", r);
                          } return this.stopRequested || this.trigger("end"), this; }, stop: function () { return this.stopRequested = !0, this; } }; return { parse: i, parseTag: u, parseStream: c, parseOutput: a }; };
              }, { "./lexical.js": 8, "./util/assert.js": 16, "./util/error.js": 17 }], 11: [function (e, r) {
                  "use strict";
                  function t() { var e = Object.create(l); return e; }
                  function n(e) { return "string" == typeof e ? e : JSON.stringify(e); }
                  var s = e("./syntax.js"), i = e("any-promise"), o = e("./util/promise.js").mapSeries, u = e("./util/error.js").RenderBreakError, a = e("./util/error.js").RenderError, c = e("./util/assert.js"), l = { renderTemplates: function (e, r) { function t(e) { var t = this; return "tag" === e.type ? this.renderTag(e, r).then(function (e) { return void 0 === e ? "" : e; }) : "output" === e.type ? i.resolve().then(function () { return t.evalOutput(e, r); }).then(function (e) { return void 0 === e ? "" : n(e); }) : i.resolve(e.value); } var s = this; c(r, "unable to evalTemplates: scope undefined"); var l = ""; return o(e, function (e) { return t.call(s, e).then(function (e) { return l += e; })["catch"](function (r) { if (r instanceof u)
                          throw r.resolvedHTML = l, r; throw new a(r, e); }); }).then(function () { return l; }); }, renderTag: function (e, r) { return "continue" === e.name ? i.reject(new u("continue")) : "break" === e.name ? i.reject(new u("break")) : e.render(r); }, evalOutput: function (e, r) { return c(r, "unable to evalOutput: scope undefined"), e.filters.reduce(function (e, t) { return t.render(e, r); }, s.evalExp(e.initial, r)); } };
                  r.exports = t;
              }, { "./syntax.js": 13, "./util/assert.js": 16, "./util/error.js": 17, "./util/promise.js": 19, "any-promise": 3 }], 12: [function (e, r, t) {
                  "use strict";
                  function n(e, r) { for (var t = 1, n = r; n < e.length; n++)
                      if ("[" === e[n] && t++, "]" === e[n] && (t--, 0 === t))
                          return n; return -1; }
                  var s = e("./util/underscore.js"), i = e("./lexical.js"), o = e("./util/assert.js"), u = Object.prototype.toString, a = { getAll: function () { for (var e = {}, r = this.scopes.length - 1; r >= 0; r--)
                          s.assign(e, this.scopes[r]); return e; }, get: function (e) { for (var r = this.scopes.length - 1; r >= 0; r--)
                          try {
                              return this.getPropertyByPath(this.scopes[r], e);
                          }
                          catch (t) {
                              if (/undefined variable/.test(t.message))
                                  continue;
                              if (/Cannot read property/.test(t.message)) {
                                  if (this.opts.strict_variables)
                                      throw t.message += ": " + e, t;
                                  continue;
                              }
                              throw t.message += ": " + e, t;
                          } if (this.opts.strict_variables)
                          throw new TypeError("undefined variable: " + e); }, set: function (e, r) { return this.setPropertyByPath(this.scopes[this.scopes.length - 1], e, r), this; }, push: function (e) { return o(e, "trying to push " + e + " into scopes"), this.scopes.push(e); }, pop: function () { return this.scopes.pop(); }, unshift: function (e) { return o(e, "trying to push " + e + " into scopes"), this.scopes.unshift(e); }, shift: function () { return this.scopes.shift(); }, setPropertyByPath: function (e, r, t) { if (s.isString(r))
                          for (var n = r.replace(/\[/g, ".").replace(/\]/g, "").split("."), i = 0; i < n.length; i++) {
                              var o = n[i];
                              if (i === n.length - 1)
                                  return e[o] = t;
                              void 0 === e[o] && (e[o] = {}), e = e[o] || {};
                          } }, getPropertyByPath: function (e, r) { var t = this.propertyAccessSeq(r + ""), n = t.shift(); if (!e.hasOwnProperty(n))
                          throw new TypeError("undefined variable"); var s = e[n], i = t.pop(); if (t.forEach(function (e) { return s = s[e]; }), void 0 !== i) {
                          if ("size" === i && ("[object Array]" === u.call(s) || "[object String]" === u.call(s)))
                              return s.length;
                          s = s[i];
                      } return s; }, propertyAccessSeq: function (e) { for (var r = [], t = "", s = 0; s < e.length; s++)
                          if ("[" === e[s]) {
                              r.push(t), t = "";
                              var u = e[s + 1];
                              if ("'" !== u && '"' !== u) {
                                  var a = n(e, s + 1);
                                  o(-1 !== a, "unbalanced []: " + e), t = e.slice(s + 1, a), r.push(i.isInteger(t) ? t : this.get(t)), t = "", s = a;
                              }
                              else
                                  a = e.indexOf(u, s + 2), o(-1 !== a, "unbalanced " + u + ": " + e), t = e.slice(s + 2, a), r.push(t), t = "", s = a + 2;
                          }
                          else
                              "." === e[s] ? (r.push(t), t = "") : t += e[s]; return t.length && r.push(t), r; } };
                  t.factory = function (e, r) { r = s.assign({ strict_variables: !1, strict_filters: !1, blocks: {}, root: [] }, r), e = s.assign(e, { liquid: r }); var t = Object.create(a); return t.opts = r, t.scopes = [e], t; };
              }, { "./lexical.js": 8, "./util/assert.js": 16, "./util/underscore.js": 21 }], 13: [function (e, r) {
                  "use strict";
                  function t(e, r) { a(r, "unable to evalExp: scope undefined"); for (var s, i = u.operators, c = 0; c < i.length; c++) {
                      var l = i[c], f = new RegExp("^(" + u.quoteBalanced.source + ")(" + l.source + ")(" + u.quoteBalanced.source + ")$");
                      if (s = e.match(f)) {
                          var p = t(s[1], r), h = o[s[2].trim()], g = t(s[3], r);
                          return h(p, g);
                      }
                  } if (s = e.match(u.rangeLine)) {
                      for (var d = n(s[1], r), v = n(s[2], r), m = [], y = d; v >= y; y++)
                          m.push(y);
                      return m;
                  } return n(e, r); }
                  function n(e, r) { return e = e && e.trim(), e ? u.isLiteral(e) ? u.parseLiteral(e) : u.isVariable(e) ? r.get(e) : void 0 : void 0; }
                  function s(e) { return !i(e); }
                  function i(e) { return e === !1 || void 0 === e || null === e; }
                  var o = e("./operators.js"), u = e("./lexical.js"), a = e("../src/util/assert.js");
                  r.exports = { evalExp: t, evalValue: n, isTruthy: s, isFalsy: i };
              }, { "../src/util/assert.js": 16, "./lexical.js": 8, "./operators.js": 9 }], 14: [function (e, r) {
                  "use strict";
                  function t(e, r) { var t, s = {}; for (n.hashCapture.lastIndex = 0; t = n.hashCapture.exec(e);) {
                      var i = t[1], u = t[2];
                      s[i] = o.evalValue(u, r);
                  } return s; }
                  var n = e("./lexical.js"), s = e("./util/underscore.js"), i = e("any-promise"), o = e("./syntax.js"), u = e("./util/assert.js");
                  r.exports = function () { function e(e, r) { o[e] = r; } function r(e, r) { var t = Object.create(a); return t.parse(e, r), t; } function n() { o = {}; } var o = {}, a = { render: function (e) { var r = t(this.token.args, e), n = this.tagImpl; return "function" != typeof n.render ? i.resolve("") : i.resolve().then(function () { return "function" == typeof n.render ? n.render(e, r) : ""; })["catch"](function (e) { if (s.isError(e))
                          throw e; var r = "Please reject with an Error in " + n.render + ", got " + e; throw new Error(r); }); }, parse: function (e, r) { this.type = "tag", this.token = e, this.name = e.name; var t = o[this.name]; u(t, "tag " + this.name + " not found"), this.tagImpl = Object.create(t), this.tagImpl.parse && this.tagImpl.parse(e, r); } }; return { construct: r, register: e, clear: n }; };
              }, { "./lexical.js": 8, "./syntax.js": 13, "./util/assert.js": 16, "./util/underscore.js": 21, "any-promise": 3 }], 15: [function (e, r, t) {
                  "use strict";
                  function n(e, r, t) { function n(t, n, s) { return { type: t, raw: s[n], value: s[n + 1].trim(), line: c(s), input: e, file: r }; } function c(e) { var r = e.input.slice(v + 1, e.index).split("\n"); return m += r.length - 1, v = e.index, m + 1; } a(u.isString(e), "illegal input type"), e = s(e, t); for (var l, f, p, h = [], g = /({%-?([\s\S]*?)-?%})|({{([\s\S]*?)}})/g, d = 0, v = -1, m = 0; null !== (l = g.exec(e));) {
                      if (l.index > d && (f = e.slice(d, l.index), h.push({ type: "html", raw: f, value: f })), l[1]) {
                          p = n("tag", 1, l);
                          var y = p.value.match(i.tagLine);
                          if (!y)
                              throw new o("illegal tag syntax", p);
                          p.name = y[1], p.args = y[2], h.push(p);
                      }
                      else
                          p = n("output", 3, l), h.push(p);
                      d = g.lastIndex;
                  } return e.length > d && (f = e.slice(d, e.length), h.push({ type: "html", raw: f, value: f })), h; }
                  function s(e, r) { r = r || {}, r.trim_left && (e = e.replace(/{%-?/g, "{%-")), r.trim_right && (e = e.replace(/-?%}/g, "-%}")); var t = r.greedy ? /\s+({%-)/g : /[\t\r ]*({%-)/g, n = r.greedy ? /(-%})\s+/g : /(-%})[\t\r ]*\n?/g; return e.replace(t, "$1").replace(n, "$1"); }
                  var i = e("./lexical.js"), o = e("./util/error.js").TokenizationError, u = e("./util/underscore.js"), a = e("../src/util/assert.js");
                  t.parse = n, t.whiteSpaceCtrl = s;
              }, { "../src/util/assert.js": 16, "./lexical.js": 8, "./util/error.js": 17, "./util/underscore.js": 21 }], 16: [function (e, r) {
                  "use strict";
                  function t(e, r) { if (!e) {
                      if (r instanceof Error)
                          throw r;
                      throw r = r || "expect " + e + " to be true", new n(r);
                  } }
                  var n = e("./error.js").AssertionError;
                  r.exports = t;
              }, { "./error.js": 17 }], 17: [function (e, r) {
                  "use strict";
                  function t(e, r) { Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.input = r.input, this.line = r.line, this.file = r.file; var t = u(r.input, r.line); this.message = c(e, r), this.stack = t + "\n" + (this.stack || ""); }
                  function n(e, r) { l.assign(this, e), this.originalError = e, this.name = this.constructor.name, this.input = r.input, this.line = r.line, this.file = r.file; var t = u(r.input, r.line); this.message = c(e.message || "Unkown Error", r), this.stack = t + "\n" + (e.stack || ""); }
                  function s(e, r) { if (e instanceof s)
                      return e; l.assign(this, e), this.originalError = e, this.name = this.constructor.name, this.input = r.token.input, this.line = r.token.line, this.file = r.token.file; var t = u(r.token.input, r.token.line); this.message = c(e.message || "Unkown Error", r.token), this.stack = t + "\n" + (e.stack || ""); }
                  function i(e) { Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.message = e || ""; }
                  function o(e) { Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.message = e; }
                  function u(e, r) { var t = e.split("\n"), n = Math.max(r - 2, 1), s = Math.min(r + 3, t.length), i = l.range(n, s + 1).map(function (e) { return [e === r ? ">> " : "   ", a(e, s), "| ", t[e - 1]].join(""); }).join("\n"); return i; }
                  function a(e, r) { var t = (r + "").length, n = e + "", s = Array(t - n.length).join(" "); return s + n; }
                  function c(e, r) { return e = e || "", r.file && (e += ", file:" + r.file), r.line && (e += ", line:" + r.line), e; }
                  var l = e("./underscore.js");
                  t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, s.prototype = Object.create(Error.prototype), s.prototype.constructor = s, i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, r.exports = { TokenizationError: t, ParseError: n, RenderBreakError: i, AssertionError: o, RenderError: s };
              }, { "./underscore.js": 21 }], 18: [function (e, r) {
                  "use strict";
                  function t(e) { return new Promise(function (r, t) { s.readFile(e, "utf8", function (e, n) { e ? t(e) : r(n); }); }); }
                  function n(e) { return new Promise(function (r, t) { s.stat(e, function (e, n) { return e ? t(e) : r(n); }); }); }
                  var s = e("fs");
                  r.exports = { readFileAsync: t, statFileAsync: n };
              }, { fs: 6 }], 19: [function (e, r, t) {
                  "use strict";
                  function n(e, r) { var t = i.reject(new Error("init")); return e.forEach(function (n, s) { t = t["catch"](function () { return r(n, s, e); }); }), t; }
                  function s(e, r) { var t = i.resolve("init"), n = []; return e.forEach(function (s, i) { t = t.then(function () { return r(s, i, e); }).then(function (e) { return n.push(e); }); }), t.then(function () { return n; }); }
                  var i = e("any-promise");
                  t.anySeries = n, t.mapSeries = s;
              }, { "any-promise": 3 }], 20: [function (e, r) {
                  "use strict";
                  var t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], i = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], o = { 1: "st", 2: "nd", 3: "rd", "default": "th" }, u = { daysInMonth: function (e) { var r = u.isLeapYear(e) ? 29 : 28; return [31, r, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; }, getDayOfYear: function (e) { for (var r = 0, t = 0; t < e.getMonth(); ++t)
                          r += u.daysInMonth(e)[t]; return r + e.getDate(); }, getWeekOfYear: function (e, r) { var t = this.getDayOfYear(e) + (r - e.getDay()), n = new Date(e.getFullYear(), 0, 1), s = 7 - n.getDay() + r; return a.pad(Math.floor((t - s) / 7) + 1, 2); }, isLeapYear: function (e) { var r = e.getFullYear(); return !(0 !== (3 & r) || !(r % 100 || r % 400 === 0 && r)); }, getSuffix: function (e) { var r = e.getDate().toString(), t = parseInt(r.slice(-1)); return o[t] || o["default"]; }, century: function (e) { return parseInt(e.getFullYear().toString().substring(0, 2), 10); } }, a = { pad: function f(e, r, t) { t || (t = "0"); for (var n = e.toString(), f = r - n.length; f-- > 0;)
                          n = t + n; return n; } }, c = { a: function (e) { return i[e.getDay()]; }, A: function (e) { return s[e.getDay()]; }, b: function (e) { return n[e.getMonth()]; }, B: function (e) { return t[e.getMonth()]; }, c: function (e) { return e.toLocaleString(); }, C: function (e) { return u.century(e); }, d: function (e) { return a.pad(e.getDate(), 2); }, e: function (e) { return a.pad(e.getDate(), 2, " "); }, H: function (e) { return a.pad(e.getHours(), 2); }, I: function (e) { return a.pad(e.getHours() % 12 || 12, 2); }, j: function (e) { return a.pad(u.getDayOfYear(e), 3); }, k: function (e) { return a.pad(e.getHours(), 2, " "); }, l: function (e) { return a.pad(e.getHours() % 12 || 12, 2, " "); }, L: function (e) { return a.pad(e.getMilliseconds(), 3); }, m: function (e) { return a.pad(e.getMonth() + 1, 2); }, M: function (e) { return a.pad(e.getMinutes(), 2); }, p: function (e) { return e.getHours() < 12 ? "AM" : "PM"; }, P: function (e) { return e.getHours() < 12 ? "am" : "pm"; }, q: function (e) { return u.getSuffix(e); }, s: function (e) { return Math.round(e.valueOf() / 1e3); }, S: function (e) { return a.pad(e.getSeconds(), 2); }, u: function (e) { return e.getDay() || 7; }, U: function (e) { return u.getWeekOfYear(e, 0); }, w: function (e) { return e.getDay(); }, W: function (e) { return u.getWeekOfYear(e, 1); }, x: function (e) { return e.toLocaleDateString(); }, X: function (e) { return e.toLocaleTimeString(); }, y: function (e) { return e.getFullYear().toString().substring(2, 4); }, Y: function (e) { return e.getFullYear(); }, z: function (e) { var r = e.getTimezoneOffset() / 60 * 100; return (r > 0 ? "-" : "+") + a.pad(Math.abs(r), 4); }, "%": function () { return "%"; } };
                  c.h = c.b, c.N = c.L;
                  var l = function (e, r) { for (var t = "", n = r;;) {
                      var s = /%./g, i = s.exec(n);
                      if (!i)
                          return t + n;
                      t += n.slice(0, s.lastIndex - 2), n = n.slice(s.lastIndex);
                      var o = i[0].charAt(1), u = c[o];
                      t += u ? u.call(this, e) : "%" + o;
                  } };
                  r.exports = l;
              }, {}], 21: [function (e, r, t) {
                  "use strict";
                  function n(e) { return e instanceof String || "string" == typeof e; }
                  function s(e) { var r = Object.prototype.toString.call(e); return "Error" === r.substr(-6, 5) || "string" == typeof e.message && "string" == typeof e.name; }
                  function i(e, r) { e = e || {}; for (var t in e)
                      if (e.hasOwnProperty(t) && r(e[t], t, e) === !1)
                          break; return e; }
                  function o(e) { e = f(e) ? e : {}; var r = Array.prototype.slice.call(arguments, 1); return r.forEach(function (r) { u(e, r); }), e; }
                  function u(e, r) { return e ? (i(r, function (r, t) { e[t] = r; }), e) : e; }
                  function a(e) { return e instanceof Array; }
                  function c(e) { return function (r) { return console.log("[" + e + "]", r), r; }; }
                  function l(e) { for (var r = {}, t = [], n = 0, s = e.length; s > n; ++n)
                      r.hasOwnProperty(e[n]) || (t.push(e[n]), r[e[n]] = 1); return t; }
                  function f(e) { return null !== e && "object" === ("undefined" == typeof e ? "undefined" : h(e)); }
                  function p(e, r, t) { 1 === arguments.length && (r = e, e = 0), t = t || 1; for (var n = [], s = e; r > s; s += t)
                      n.push(s); return n; }
                  var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e; };
                  t.isString = n, t.isArray = a, t.isObject = f, t.isError = s, t.range = p, t.forOwn = i, t.assign = o, t.uniq = l, t.echo = c;
              }, {}], 22: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = t.lexical, s = e("any-promise"), i = new RegExp("(" + n.identifier.source + ")\\s*=(.*)"), o = e("../src/util/assert.js");
                  r.exports = function (e) { e.registerTag("assign", { parse: function (e) { var r = e.args.match(i); o(r, "illegal token " + e.raw), this.key = r[1], this.value = r[2]; }, render: function (r) { return r.set(this.key, e.evalOutput(this.value, r)), s.resolve(""); } }); };
              }, { "..": 2, "../src/util/assert.js": 16, "any-promise": 3 }], 23: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = t.lexical, s = new RegExp("(" + n.identifier.source + ")"), i = e("../src/util/assert.js");
                  r.exports = function (e) { e.registerTag("capture", { parse: function (r, t) { var n = this, o = r.args.match(s); i(o, r.args + " not valid identifier"), this.variable = o[1], this.templates = []; var u = e.parser.parseStream(t); u.on("tag:endcapture", function () { return u.stop(); }).on("template", function (e) { return n.templates.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }), u.start(); }, render: function (r) { var t = this; return e.renderer.renderTemplates(this.templates, r).then(function (e) { r.set(t.variable, e); }); } }); };
              }, { "..": 2, "../src/util/assert.js": 16 }], 24: [function (e, r) {
                  "use strict";
                  {
                      var t = e("..");
                      e("../src/util/assert.js");
                  }
                  r.exports = function (e) { e.registerTag("case", { parse: function (r, t) { var n = this; this.cond = r.args, this.cases = [], this.elseTemplates = []; var s = [], i = e.parser.parseStream(t).on("tag:when", function (e) { n.cases[e.args] || n.cases.push({ val: e.args, templates: s = [] }); }).on("tag:else", function () { return s = n.elseTemplates; }).on("tag:endcase", function () { return i.stop(); }).on("template", function (e) { return s.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); i.start(); }, render: function (r) { for (var n = 0; n < this.cases.length; n++) {
                          var s = this.cases[n], i = t.evalExp(s.val, r), o = t.evalExp(this.cond, r);
                          if (i === o)
                              return e.renderer.renderTemplates(s.templates, r);
                      } return e.renderer.renderTemplates(this.elseTemplates, r); } }); };
              }, { "..": 2, "../src/util/assert.js": 16 }], 25: [function (e, r) {
                  "use strict";
                  r.exports = function (e) { e.registerTag("comment", { parse: function (r, t) { var n = e.parser.parseStream(t); n.on("token", function (e) { "endcomment" === e.name && n.stop(); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }), n.start(); } }); };
              }, {}], 26: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = e("any-promise"), s = t.lexical, i = new RegExp("^(?:(" + s.value.source + ")\\s*:\\s*)?(.*)$"), o = new RegExp(s.value.source, "g"), u = e("../src/util/assert.js");
                  r.exports = function (e) { e.registerTag("cycle", { parse: function (e) { var r = i.exec(e.args); u(r, "illegal tag: " + e.raw), this.group = r[1] || ""; var t = r[2]; for (this.candidates = []; r = o.exec(t);)
                          this.candidates.push(r[0]); u(this.candidates.length, "empty candidates: " + e.raw); }, render: function (e) { var r = t.evalValue(this.group, e), s = "cycle:" + r + ":" + this.candidates.join(","), i = e.get("liquid"), o = i[s]; void 0 === o && (o = i[s] = 0); var u = this.candidates[o]; return o = (o + 1) % this.candidates.length, i[s] = o, n.resolve(t.evalValue(u, e)); } }); };
              }, { "..": 2, "../src/util/assert.js": 16, "any-promise": 3 }], 27: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = t.lexical, s = e("../src/util/assert.js");
                  r.exports = function (e) { e.registerTag("decrement", { parse: function (e) { var r = e.args.match(n.identifier); s(r, "illegal identifier " + e.args), this.variable = r[0]; }, render: function (e) { var r = e.get(this.variable); "number" != typeof r && (r = 0), e.set(this.variable, r - 1); } }); };
              }, { "..": 2, "../src/util/assert.js": 16 }], 28: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = t.lexical, s = e("../src/util/promise.js").mapSeries, i = t.Types.RenderBreakError, o = e("../src/util/assert.js"), u = new RegExp("^(" + n.identifier.source + ")\\s+in\\s+" + ("(" + n.value.source + ")") + ("(?:\\s+" + n.hash.source + ")*") + "(?:\\s+(reversed))?" + ("(?:\\s+" + n.hash.source + ")*$"));
                  r.exports = function (e) { e.registerTag("for", { parse: function (r, t) { var n = this, s = u.exec(r.args); o(s, "illegal tag: " + r.raw), this.variable = s[1], this.collection = s[2], this.reversed = !!s[3], this.templates = [], this.elseTemplates = []; var i, a = e.parser.parseStream(t).on("start", function () { return i = n.templates; }).on("tag:else", function () { return i = n.elseTemplates; }).on("tag:endfor", function () { return a.stop(); }).on("template", function (e) { return i.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); a.start(); }, render: function (r, n) { var o = this, u = t.evalExp(this.collection, r); if (!Array.isArray(u) || Array.isArray(u) && 0 === u.length)
                          return e.renderer.renderTemplates(this.elseTemplates, r); var a = u.length, c = n.offset || 0, l = void 0 === n.limit ? u.length : n.limit; u = u.slice(c, c + l), this.reversed && u.reverse(); var f = u.map(function (e, r) { var t = {}; return t[o.variable] = e, t.forloop = { first: 0 === r, index: r + 1, index0: r, last: r === a - 1, length: a, rindex: a - r, rindex0: a - r - 1, stop: !1, skip: !1 }, t; }), p = ""; return s(f, function (t) { return r.push(t), e.renderer.renderTemplates(o.templates, r).then(function (e) { return p += e; })["catch"](function (e) { if (!(e instanceof i && (p += e.resolvedHTML, "continue" === e.message)))
                          throw e; }).then(function () { return r.pop(); }); })["catch"](function (e) { if (!(e instanceof i && "break" === e.message))
                          throw e; }).then(function () { return p; }); } }); };
              }, { "..": 2, "../src/util/assert.js": 16, "../src/util/promise.js": 19 }], 29: [function (e, r) {
                  "use strict";
                  var t = e("..");
                  r.exports = function (e) { e.registerTag("if", { parse: function (r, t) { var n = this; this.branches = [], this.elseTemplates = []; var s, i = e.parser.parseStream(t).on("start", function () { return n.branches.push({ cond: r.args, templates: s = [] }); }).on("tag:elsif", function (e) { n.branches[e.args] || n.branches.push({ cond: e.args, templates: s = [] }); }).on("tag:else", function () { return s = n.elseTemplates; }).on("tag:endif", function () { return i.stop(); }).on("template", function (e) { return s.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); i.start(); }, render: function (r) { for (var n = 0; n < this.branches.length; n++) {
                          var s = this.branches[n], i = t.evalExp(s.cond, r);
                          if (t.isTruthy(i))
                              return e.renderer.renderTemplates(s.templates, r);
                      } return e.renderer.renderTemplates(this.elseTemplates, r); } }); };
              }, { "..": 2 }], 30: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = t.lexical, s = new RegExp("with\\s+(" + n.value.source + ")"), i = e("../src/util/assert.js");
                  r.exports = function (e) {
                      e.registerTag("include", { parse: function (e) { var r = n.value.exec(e.args); i(r, "illegal token " + e.raw), this.value = r[0], r = s.exec(e.args), r && (this["with"] = r[1]); }, render: function (r, n) {
                              var s = t.evalValue(this.value, r), i = r.get("liquid"), o = i.blocks;
                              return i.blocks = {}, this["with"] && (n[s] = t.evalValue(this["with"], r)), e.getTemplate(s, i.root).then(function (t) { return r.push(n), e.renderer.renderTemplates(t, r); }).then(function (e) { return r.pop(), i.blocks = o, e; });
                          } });
                  };
              }, { "..": 2, "../src/util/assert.js": 16 }], 31: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = e("../src/util/assert.js"), s = t.lexical;
                  r.exports = function (e) { e.registerTag("increment", { parse: function (e) { var r = e.args.match(s.identifier); n(r, "illegal identifier " + e.args), this.variable = r[0]; }, render: function (e) { var r = e.get(this.variable); "number" != typeof r && (r = 0), e.set(this.variable, r + 1); } }); };
              }, { "..": 2, "../src/util/assert.js": 16 }], 32: [function (e, r) {
                  "use strict";
                  r.exports = function (r) { e("./assign.js")(r), e("./capture.js")(r), e("./case.js")(r), e("./comment.js")(r), e("./cycle.js")(r), e("./decrement.js")(r), e("./for.js")(r), e("./if.js")(r), e("./include.js")(r), e("./increment.js")(r), e("./layout.js")(r), e("./raw.js")(r), e("./tablerow.js")(r), e("./unless.js")(r); };
              }, { "./assign.js": 22, "./capture.js": 23, "./case.js": 24, "./comment.js": 25, "./cycle.js": 26, "./decrement.js": 27, "./for.js": 28, "./if.js": 29, "./include.js": 30, "./increment.js": 31, "./layout.js": 33, "./raw.js": 34, "./tablerow.js": 35, "./unless.js": 36 }], 33: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = e("any-promise"), s = t.lexical, i = e("../src/util/assert.js");
                  r.exports = function (e) { e.registerTag("layout", { parse: function (r, t) { var n = s.value.exec(r.args); i(n, "illegal token " + r.raw), this.layout = n[0], this.tpls = e.parser.parse(t); }, render: function (r, n) { var s = t.evalValue(this.layout, r), i = r.get("liquid"); return e.renderer.renderTemplates(this.tpls, r).then(function () { return e.getTemplate(s, i.root); }).then(function (e) { return r.push(n), e; }).then(function (t) { return e.renderer.renderTemplates(t, r); }).then(function (e) { return r.pop(), e; }); } }), e.registerTag("block", { parse: function (r, t) { var n = this, s = /\w+/.exec(r.args); this.block = s ? s[0] : "anonymous", this.tpls = []; var i = e.parser.parseStream(t).on("tag:endblock", function () { return i.stop(); }).on("template", function (e) { return n.tpls.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); i.start(); }, render: function (r) { var t = this, s = r.get("liquid"), i = s.blocks[this.block]; return void 0 === i ? e.renderer.renderTemplates(this.tpls, r).then(function (e) { return s.blocks[t.block] = e, e; }) : (s.blocks[this.block] = i, n.resolve(i)); } }); };
              }, { "..": 2, "../src/util/assert.js": 16, "any-promise": 3 }], 34: [function (e, r) {
                  "use strict";
                  var t = e("any-promise");
                  r.exports = function (e) { e.registerTag("raw", { parse: function (r, t) { var n = this; this.tokens = []; var s = e.parser.parseStream(t); s.on("token", function (e) { "endraw" === e.name ? s.stop() : n.tokens.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }), s.start(); }, render: function () { var e = this.tokens.map(function (e) { return e.raw; }).join(""); return t.resolve(e); } }); };
              }, { "any-promise": 3 }], 35: [function (e, r) {
                  "use strict";
                  var t = e(".."), n = e("any-promise"), s = t.lexical, i = e("../src/util/assert.js"), o = new RegExp("^(" + s.identifier.source + ")\\s+in\\s+" + ("(" + s.value.source + ")") + ("(?:\\s+" + s.hash.source + ")*$"));
                  r.exports = function (e) { e.registerTag("tablerow", { parse: function (r, t) { var n = this, s = o.exec(r.args); i(s, "illegal tag: " + r.raw), this.variable = s[1], this.collection = s[2], this.templates = []; var u, a = e.parser.parseStream(t).on("start", function () { return u = n.templates; }).on("tag:endtablerow", function () { return a.stop(); }).on("template", function (e) { return u.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); a.start(); }, render: function (r, s) { var i, o, u = this, a = t.evalExp(this.collection, r) || [], c = "<table>", l = s.offset || 0, f = void 0 === s.limit ? a.length : s.limit, p = s.cols; if (!p)
                          throw new Error("illegal cols: " + p); a = a.slice(l, l + f); var h = []; a.some(function (e) { var r = {}; r[u.variable] = e, h.push(r); }); var g = h.reduce(function (t, n, s) { return t.then(function () { return i = Math.floor(s / p) + 1, o = s % p + 1, 1 === o && (1 !== i && (c += "</tr>"), c += '<tr class="row' + i + '">'), c += '<td class="col' + o + '">'; }).then(function () { return r.push(n), e.renderer.renderTemplates(u.templates, r); }).then(function (e) { return r.pop(n), c += e, c += "</td>"; }); }, n.resolve("")); return g.then(function () { return i > 0 && (c += "</tr>"), c += "</table>"; })["catch"](function (e) { throw e; }); } }); };
              }, { "..": 2, "../src/util/assert.js": 16, "any-promise": 3 }], 36: [function (e, r) {
                  "use strict";
                  var t = e("..");
                  r.exports = function (e) { e.registerTag("unless", { parse: function (r, t) { var n = this; this.templates = [], this.elseTemplates = []; var s, i = e.parser.parseStream(t).on("start", function () { s = n.templates, n.cond = r.args; }).on("tag:else", function () { return s = n.elseTemplates; }).on("tag:endunless", function () { return i.stop(); }).on("template", function (e) { return s.push(e); }).on("end", function () { throw new Error("tag " + r.raw + " not closed"); }); i.start(); }, render: function (r) { var n = t.evalExp(this.cond, r); return t.isFalsy(n) ? e.renderer.renderTemplates(this.templates, r) : e.renderer.renderTemplates(this.elseTemplates, r); } }); };
              }, { "..": 2 }] }, {}, [2])(2);
  });
  !function (t) {
      "use strict";
      function e(t) { if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
          throw new TypeError("Invalid character in header field name"); return t.toLowerCase(); }
      function r(t) { return "string" != typeof t && (t = String(t)), t; }
      function o(t) { var e = { next: function () { var e = t.shift(); return { done: void 0 === e, value: e }; } }; return m.iterable && (e[Symbol.iterator] = function () { return e; }), e; }
      function n(t) { this.map = {}, t instanceof n ? t.forEach(function (t, e) { this.append(e, t); }, this) : Array.isArray(t) ? t.forEach(function (t) { this.append(t[0], t[1]); }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) { this.append(e, t[e]); }, this); }
      function i(t) { return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0); }
      function s(t) { return new Promise(function (e, r) { t.onload = function () { e(t.result); }, t.onerror = function () { r(t.error); }; }); }
      function a(t) { var e = new FileReader, r = s(e); return e.readAsArrayBuffer(t), r; }
      function u(t) { var e = new FileReader, r = s(e); return e.readAsText(t), r; }
      function h(t) { for (var e = new Uint8Array(t), r = new Array(e.length), o = 0; o < e.length; o++)
          r[o] = String.fromCharCode(e[o]); return r.join(""); }
      function f(t) { if (t.slice)
          return t.slice(0); var e = new Uint8Array(t.byteLength); return e.set(new Uint8Array(t)), e.buffer; }
      function d() { return this.bodyUsed = !1, this._initBody = function (t) { if (this._bodyInit = t, t)
          if ("string" == typeof t)
              this._bodyText = t;
          else if (m.blob && Blob.prototype.isPrototypeOf(t))
              this._bodyBlob = t;
          else if (m.formData && FormData.prototype.isPrototypeOf(t))
              this._bodyFormData = t;
          else if (m.searchParams && URLSearchParams.prototype.isPrototypeOf(t))
              this._bodyText = t.toString();
          else if (m.arrayBuffer && m.blob && v(t))
              this._bodyArrayBuffer = f(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
          else {
              if (!m.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !B(t))
                  throw new Error("unsupported BodyInit type");
              this._bodyArrayBuffer = f(t);
          }
      else
          this._bodyText = ""; this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : m.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8")); }, m.blob && (this.blob = function () { var t = i(this); if (t)
          return t; if (this._bodyBlob)
          return Promise.resolve(this._bodyBlob); if (this._bodyArrayBuffer)
          return Promise.resolve(new Blob([this._bodyArrayBuffer])); if (this._bodyFormData)
          throw new Error("could not read FormData body as blob"); return Promise.resolve(new Blob([this._bodyText])); }, this.arrayBuffer = function () { return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(a); }), this.text = function () { var t = i(this); if (t)
          return t; if (this._bodyBlob)
          return u(this._bodyBlob); if (this._bodyArrayBuffer)
          return Promise.resolve(h(this._bodyArrayBuffer)); if (this._bodyFormData)
          throw new Error("could not read FormData body as text"); return Promise.resolve(this._bodyText); }, m.formData && (this.formData = function () { return this.text().then(p); }), this.json = function () { return this.text().then(JSON.parse); }, this; }
      function y(t) { var e = t.toUpperCase(); return _.indexOf(e) > -1 ? e : t; }
      function l(t, e) { e = e || {}; var r = e.body; if (t instanceof l) {
          if (t.bodyUsed)
              throw new TypeError("Already read");
          this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new n(t.headers)), this.method = t.method, this.mode = t.mode, r || null == t._bodyInit || (r = t._bodyInit, t.bodyUsed = !0);
      }
      else
          this.url = String(t); if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new n(e.headers)), this.method = y(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r)
          throw new TypeError("Body not allowed for GET or HEAD requests"); this._initBody(r); }
      function p(t) { var e = new FormData; return t.trim().split("&").forEach(function (t) { if (t) {
          var r = t.split("="), o = r.shift().replace(/\+/g, " "), n = r.join("=").replace(/\+/g, " ");
          e.append(decodeURIComponent(o), decodeURIComponent(n));
      } }), e; }
      function c(t) { var e = new n; return t.split(/\r?\n/).forEach(function (t) { var r = t.split(":"), o = r.shift().trim(); if (o) {
          var n = r.join(":").trim();
          e.append(o, n);
      } }), e; }
      function b(t, e) { e || (e = {}), this.type = "default", this.status = "status" in e ? e.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new n(e.headers), this.url = e.url || "", this._initBody(t); }
      if (!t.fetch) {
          var m = { searchParams: "URLSearchParams" in t, iterable: "Symbol" in t && "iterator" in Symbol, blob: "FileReader" in t && "Blob" in t && function () { try {
                  return new Blob, !0;
              }
              catch (t) {
                  return !1;
              } }(), formData: "FormData" in t, arrayBuffer: "ArrayBuffer" in t };
          if (m.arrayBuffer)
              var w = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], v = function (t) { return t && DataView.prototype.isPrototypeOf(t); }, B = ArrayBuffer.isView || function (t) { return t && w.indexOf(Object.prototype.toString.call(t)) > -1; };
          n.prototype.append = function (t, o) { t = e(t), o = r(o); var n = this.map[t]; this.map[t] = n ? n + "," + o : o; }, n.prototype["delete"] = function (t) { delete this.map[e(t)]; }, n.prototype.get = function (t) { return t = e(t), this.has(t) ? this.map[t] : null; }, n.prototype.has = function (t) { return this.map.hasOwnProperty(e(t)); }, n.prototype.set = function (t, o) { this.map[e(t)] = r(o); }, n.prototype.forEach = function (t, e) { for (var r in this.map)
              this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this); }, n.prototype.keys = function () { var t = []; return this.forEach(function (e, r) { t.push(r); }), o(t); }, n.prototype.values = function () { var t = []; return this.forEach(function (e) { t.push(e); }), o(t); }, n.prototype.entries = function () { var t = []; return this.forEach(function (e, r) { t.push([r, e]); }), o(t); }, m.iterable && (n.prototype[Symbol.iterator] = n.prototype.entries);
          var _ = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          l.prototype.clone = function () { return new l(this, { body: this._bodyInit }); }, d.call(l.prototype), d.call(b.prototype), b.prototype.clone = function () { return new b(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new n(this.headers), url: this.url }); }, b.error = function () { var t = new b(null, { status: 0, statusText: "" }); return t.type = "error", t; };
          var A = [301, 302, 303, 307, 308];
          b.redirect = function (t, e) { if (A.indexOf(e) === -1)
              throw new RangeError("Invalid status code"); return new b(null, { status: e, headers: { location: t } }); }, t.Headers = n, t.Request = l, t.Response = b, t.fetch = function (t, e) { return new Promise(function (r, o) { var n = new l(t, e), i = new XMLHttpRequest; i.onload = function () { var t = { status: i.status, statusText: i.statusText, headers: c(i.getAllResponseHeaders() || "") }; t.url = "responseURL" in i ? i.responseURL : t.headers.get("X-Request-URL"); var e = "response" in i ? i.response : i.responseText; r(new b(e, t)); }, i.onerror = function () { o(new TypeError("Network request failed")); }, i.ontimeout = function () { o(new TypeError("Network request failed")); }, i.open(n.method, n.url, !0), "include" === n.credentials && (i.withCredentials = !0), "responseType" in i && m.blob && (i.responseType = "blob"), n.headers.forEach(function (t, e) { i.setRequestHeader(e, t); }), i.send("undefined" == typeof n._bodyInit ? null : n._bodyInit); }); }, t.fetch.polyfill = !0;
      }
  }("undefined" != typeof self ? self : this);
  //# sourceMappingURL=fetch.min.js.map 
  define("templates", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var PictureparkTemplates = (function () {
          function PictureparkTemplates() {
          }
          // TODO: Create template factory with css injection outside of template
          PictureparkTemplates.getTemplate = function (templateId) {
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
          };
          PictureparkTemplates.getGallery = function () {
              return "\n      {% if config.renderStyles %}\n      <link href=\"https://vjs.zencdn.net/7.0.3/video-js.css\" rel=\"stylesheet\">\n      <style>\n       .picturepark-widget-content-preview {\n         background-color: white;\n         padding: 40px;\n        }\n        .picturepark-widget-gallery-{{id}} {\n          float: left;\n          width: 100%;\n          position: relative;\n          margin-right: -4px;\n          margin-bottom: -4px;\n        }\n        .picturepark-widget-gallery-item-{{id}} {\n          overflow: hidden;\n          background: #cecece;\n          margin-right: 4px;\n          margin-bottom: 4px;\n          position: relative;\n        }\n        .picturepark-widget-gallery-item-image-{{id}} {\n          position: absolute;\n          margin: auto;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n        }\n        .picturepark-widget-gallery-item-thumbnail-{{id}} {\n          \n        }\n      </style>\n      {% endif %}\n\n      <div class=\"picturepark-widget-gallery picturepark-widget-gallery-{{id}}\">\n        {% assign width = config.width | plus: -2 %}\n        {% assign height = config.height | plus: -1 %}\n        {% for selection in share.items %}\n          <div class=\"picturepark-widget-gallery-item picturepark-widget-gallery-item-{{id}}\" style=\"float: left; width: {{ config.width }}px; height: {{ config.height }}px\">\n            {% if selection.isMovie and config.showPlayers != 'no' and config.showPlayers != 'false' %}\n            <video class=\"video-js\" id=\"vjsplayer_{{ forloop.index0 }}_{{ id }}\">\n            </video>\n            {% else %}\n            <a href=\"javascript:void(0)\" onclick=\"javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')\">\n              {% if selection.isBinary == false %}\n                <div class=\"picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}\">{{ selection.displayValues.thumbnail }}</div>\n              {% else %}\n                <img class=\"picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}\" src=\"{% resizeById selection.id 'Preview' width height %}\" />\n              {% endif %}\n            </a>\n            {% endif %}\n          </div>\n        {% endfor %}\n    </div>\n    <br style=\"clear: both;\" />";
          };
          PictureparkTemplates.getCard = function () {
              return "\n      {% if config.renderStyles %}\n      <link href=\"https://vjs.zencdn.net/7.0.3/video-js.css\" rel=\"stylesheet\">\n      <style>\n       .picturepark-widget-content-preview {\n         background-color: white;\n         padding: 40px;\n        }\n        .picturepark-widget-{{id}} {\n          all: initial;\n          font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\n          font-size: 13px;\n          float: left;\n          margin-right: 4px;\n          margin-bottom: 4px;\n        }\n        .picturepark-widget-card-{{id}} {\n          border: 1px solid lightgray;\n          border-radius: 0 0 4px 4px;\n        }\n\n        /** Footer */\n        .picturepark-widget-card-footer-content-{{id}} {\n          padding: 10px;\n        }\n        .picturepark-widget-card-footer-title-{{id}} {\n          font-weight: bold;\n        }\n        .picturepark-widget-card-footer-description-{{id}} {\n        }\n        .picturepark-widget-card-footer-gravatar-{{id}} {\n          border-radius: 50%;\n          margin-top: 0px;\n        }\n        .picturepark-widget-card-footer-gravatar-{{id}} {\n          vertical-align: middle;\n        }\n        .picturepark-widget-card-footer-hr-{{id}} {\n          color: lightgray;\n          margin-top: 8px;\n          margin-bottom: 8px;\n        }\n\n        /** Gallery */\n        .picturepark-widget-card-gallery-{{id}} {\n          line-height: 0;\n          overflow: hidden;\n          max-height: {{ config.width }};\n        }\n        .picturepark-widget-card-gallery-image-{{id}} {\n          position: absolute;\n          margin: auto;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n        }\n\n        /** Overlay */\n        .picturepark-widget-card-overlay-{{id}} {\n          opacity: 0;\n          position: absolute;\n          width: 100%;\n          bottom: 0px;\n          background: gray;\n          padding: 4px;\n        }\n        .picturepark-widget-{{id}}:hover\n        .picturepark-widget-card-overlay-{{id}} {\n          opacity: 0.8;\n        }\n        .picturepark-widget-card-overlay-title-{{id}} {\n          font-weight: bold;\n          color: white;\n        }\n        .picturepark-widget-card-overlay-description-{{id}} {\n          color: white;\n        }\n\n        /** Navigation */\n        .picturepark-widget-card-navigation-previous-{{id}} {\n          position: absolute; \n          left: 0; \n          top: 0; \n          bottom: 0; \n          width: 30px; \n          margin-top: 50px; \n          margin-bottom: 50px\n        }\n        .picturepark-widget-card-navigation-next-{{id}} {\n          position: absolute; \n          right: 0; \n          top: 0; \n          bottom: 0; \n          width: 30px; \n          margin-top: 50px; \n          margin-bottom: 50px\n        }\n      </style>\n      {% endif %}\n\n      <div class=\"picturepark-widget-card picturepark-widget-card-{{id}}\" style=\"width: {{ config.width }}px\">\n        <div style=\"position: relative\">\n          {% assign width = config.width | plus: -2 %}\n          {% assign height = config.height | plus: -1 %}\n          <div id=\"gallery_{{ id }}\" style=\"height: {{ height }}px; width: {{ width }}px; position: relative\">\n            {% for selection in share.items %}\n            <div class=\"picturepark-widget-card-gallery picturepark-widget-card-gallery-{{id}}\"\n                {% if forloop.first == false %}style=\"display: none\"{% endif %}>\n              {% if selection.isMovie %}\n              <video class=\"video-js\" id=\"vjsplayer_{{ forloop.index0 }}_{{ id }}\">\n              </video>\n              {% else %}\n              <a href=\"javascript:void(0)\" onclick=\"javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')\">\n               {% if selection.isBinary == false %}\n                <div class=\"picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}\">{{ selection.displayValues.thumbnail }}</div>\n              {% else %}\n                <img class=\"picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}\" src=\"{% resizeById selection.id 'Preview' width height %}\" />\n              {% endif %}\n              </a>\n              {% endif %}\n              \n              {% if config.showLogo %}\n              <div style=\"position: absolute; bottom: 4px; right: 8px;\">\n                <svg style=\"width: 120px;\" id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 690.93 75.96\">\n                  <defs>\n                    <style>.cls-1{fill:#5b7d89;}.cls-2{fill:#818181;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4,.cls-5{filter:url(#AI_Shadow_1);}.cls-4{font-size:67.44px;font-family:Roboto-Regular, Roboto;}.cls-5{font-size:46.07px;font-family:Roboto-Light, Roboto;letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}</style>\n                    <filter id=\"AI_Shadow_1\" name=\"AI_Shadow_1\"><feGaussianBlur result=\"blur\" stdDeviation=\"2\" in=\"SourceAlpha\"/>\n                      <feOffset result=\"offsetBlurredAlpha\" dx=\"4\" dy=\"4\" in=\"blur\"/><feMerge><feMergeNode in=\"offsetBlurredAlpha\"/>\n                      <feMergeNode in=\"SourceGraphic\"/></feMerge>\n                    </filter>\n                  </defs>\n                  <title>powered-by-pp</title>\n                  <path class=\"cls-1\" d=\"M344.17,152.27V117.83a4.58,4.58,0,0,0-4.28-4.83h-53.6a4.58,4.58,0,0,0-4.29,4.83v34.44Z\" transform=\"translate(-19.07 -110.92)\"/>\n                  <path class=\"cls-2\" d=\"M282,161.87v11.31a4.58,4.58,0,0,0,4.28,4.82h53.6a4.57,4.57,0,0,0,4.28-4.82V161.87Z\" transform=\"translate(-19.07 -110.92)\"/>\n                  <polygon class=\"cls-3\" points=\"325.09 50.95 262.93 50.95 262.93 41.35 325.09 41.35 325.09 50.95 325.09 50.95\"/>\n                  <text class=\"cls-4\" transform=\"translate(347.46 57.69)\">Picturepark</text>\n                  <text class=\"cls-5\" transform=\"translate(0 57.66)\">P<tspan class=\"cls-6\" x=\"28.07\" y=\"0\">owered by</tspan></text>\n                </svg>\n              </div>\n              {% endif %}\n            </div>\n            {% endfor %}\n          </div>\n\n          {% if config.showOverlay %}\n            <div class=\"picturepark-widget-card-overlay picturepark-widget-card-overlay-{{id}}\">\n              <div class=\"picturepark-widget-card-overlay-title picturepark-widget-card-overlay-title-{{id}}\">{{ share.name }}</div>\n              {% if share.description %}\n                <div class=\"picturepark-widget-card-overlay-description picturepark-widget-card-overlay-description-{{id}}\">{{ share.description }}</div>\n              {% endif %}\n            </div>\n          {% endif %}\n\n          {% if config.showNavigation and share.items.length > 1 %}\n          <a href=\"javascript:void(0)\" onclick=\"javascript:pictureparkWidgets.players.showPrevious('{{ config.token }}', 'gallery_{{ id }}')\"\n            class=\"picturepark-widget-card-navigation-previous picturepark-widget-card-navigation-previous-{{id}}\">\n            <svg style=\"position: absolute; top: 50%; transform: translate(0,-50%);\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 42.8 42.8\"><path d=\"M11 21.7l18 20c0.1 0.1 0.2 0.2 0.4 0.2 0.1 0 0.3 0 0.4-0.1l2.9-2.9c0.2-0.2 0.2-0.5 0-0.7L17.9 21.3 32.7 4.6c0.2-0.2 0.2-0.5 0-0.7L29.7 1c-0.1-0.1-0.2-0.1-0.4-0.1h0c-0.1 0-0.3 0.1-0.4 0.2L11 21c-0.1 0.1-0.1 0.2-0.1 0.3C10.8 21.4 10.8 21.6 11 21.7z\" fill=\"#CCCCCC\"/></svg>\n          </a>\n          <a href=\"javascript:void(0)\" onclick=\"javascript:pictureparkWidgets.players.showNext('{{ config.token }}', 'gallery_{{ id }}')\"\n            class=\"picturepark-widget-card-navigation-next picturepark-widget-card-navigation-next-{{id}}\">\n            <svg style=\"position: absolute; top: 50%; transform: translate(0,-50%);\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 42.8 42.8\"><path d=\"M32.7 21l-18-20c-0.1-0.1-0.2-0.2-0.4-0.2 -0.1 0-0.3 0-0.4 0.1L11 3.9c-0.2 0.2-0.2 0.5 0 0.7l14.8 16.7L11 38.1c-0.2 0.2-0.2 0.5 0 0.7l2.9 2.9c0.1 0.1 0.2 0.1 0.4 0.1h0c0.1 0 0.3-0.1 0.4-0.2l18-20c0.1-0.1 0.1-0.2 0.1-0.3C32.8 21.3 32.8 21.1 32.7 21z\" fill=\"#CCCCCC\"/></svg>\n          </a>\n          {% endif %}\n        </div>\n\n        {% if config.showFooter %}\n        <div class=\"picturepark-widget-card-footer-content picturepark-widget-card-footer-content-{{id}}\">\n          <div class=\"picturepark-widget-card-footer-title picturepark-widget-card-footer-title-{{id}}\">{{ share.name }}</div>\n          {% if share.description %}\n            <div class=\"picturepark-widget-card-footer-description picturepark-widget-card-footer-description-{{id}}\">{{ share.description }}</div>\n          {% endif %}\n          <hr class=\"picturepark-widget-card-footer-hr picturepark-widget-card-footer-hr-{{id}}\">\n          <div class=\"picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}\">\n            <img src=\"//www.gravatar.com/avatar/{{ share.creator.emailHash }}?m=dd&size=32&d=mm\" class=\"picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}\" />\n            Shared by: {{ share.creator.displayName }}\n            </div>\n        </div>\n        {% endif %}\n      </div>";
          };
          PictureparkTemplates.getList = function () {
              return "\n      {% if config.renderStyles %}\n      <link href=\"https://vjs.zencdn.net/7.0.3/video-js.css\" rel=\"stylesheet\">\n      <style>\n        .picturepark-widget-{{id}} {\n          all: initial;\n          font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\n          font-size: 13px;\n          float: left;\n          margin-right: 4px;\n          margin-bottom: 4px;\n        }\n        .picturepark-widget-list-{{id}} {\n          padding: 0px 12px 0px 12px;\n          position: relative;\n          border: 1px solid lightgray;\n          border-radius: 4px;\n        }\n        .picturepark-widget-list-header-{{id}} {\n          font-weight: bold;\n          font-size: 16px;\n          border-bottom: 2px solid #DCDCDC; \n          margin: 12px 0 16px 0; \n          padding: 0 0 12px 0; \n        }\n        .picturepark-widget-list-header-download-{{id}} {\n          font-size: 10pt; \n          padding-top: 3px; \n        }\n        .picturepark-widget-list-body-{{id}} {\n          list-style-type: none;\n          margin: 0 0 8px 0; \n          padding: 0;\n        }\n        .picturepark-widget-list-body-{{id}} li {\n          margin-bottom: 8px;\n        }\n      </style>\n      {% endif %}\n\n      <div class=\"picturepark-widget-list picturepark-widget-list-{{id}}\" style=\"width: {{ config.width }}px\">\n        <h1 class=\"picturepark-widget-list-header picturepark-widget-list-header-{{id}}\">\n          {% translate 'List.HeaderDownloads' %}\n          <span style=\"float:right\" class=\"picturepark-widget-list-header-download picturepark-widget-list-header-download-{{id}}\">\n            <a href=\"{{ share.url }}\">{% translate 'List.ButtonDownloadAll' %}</a>\n          </span>\n        </h1>\n        <ul class=\"picturepark-widget-list-body picturepark-widget-list-body-{{id}}\">\n        {% for selection in share.items %}\n          <li>\n            <span style=\"float:right\">\n              <a href=\"{{selection.originalUrl}}\">\n                <svg height=\"19px\" version=\"1.1\" viewBox=\"0 0 14 19\" width=\"14px\" xmlns=\"http://www.w3.org/2000/svg\" \n                     xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                  <title/><desc/><defs/>\n                  <g fill=\"none\" fill-rule=\"evenodd\" id=\"Page-1\" stroke=\"none\" stroke-width=\"1\">\n                    <g fill=\"#000000\" id=\"Core\" transform=\"translate(-383.000000, -213.000000)\">\n                      <g id=\"file-download\" transform=\"translate(383.000000, 213.500000)\">\n                        <path d=\"M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z\" id=\"Shape\"/>\n                      </g>\n                    </g>\n                  </g>\n                </svg>\n              </a>\n            </span>\n            <span>\n              <strong>{{ selection.displayValues.list }}</strong><br />\n              TBD\n            </span>\n          </li>\n        {% endfor %}\n        </ul>\n      </div>";
          };
          return PictureparkTemplates;
      }());
      exports.PictureparkTemplates = PictureparkTemplates;
  });
  /// <reference path="./typings/pdfjs.d.ts" />
  /// <reference path="../../picturepark-sdk-v1-fetch/dist/picturepark.d.ts" />
  define("players", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var PictureparkPlayers = (function () {
          function PictureparkPlayers() {
          }
          PictureparkPlayers.showPrevious = function (token, elementId) {
              var share = document.pictureparkShareCache[token];
              var gallery = PictureparkPlayers.getGallery(elementId);
              if (share.player)
                  share.player.stop();
              var newIndex = gallery.index - 1;
              if (newIndex < 0)
                  newIndex = gallery.children.length - 1;
              PictureparkPlayers.showGalleryItem(gallery, newIndex);
          };
          PictureparkPlayers.showNext = function (token, elementId) {
              var share = document.pictureparkShareCache[token];
              var gallery = PictureparkPlayers.getGallery(elementId);
              if (share.player)
                  share.player.stop();
              var newIndex = gallery.index + 1;
              if (newIndex === gallery.children.length)
                  newIndex = 0;
              PictureparkPlayers.showGalleryItem(gallery, newIndex);
          };
          PictureparkPlayers.showGalleryItem = function (gallery, newIndex) {
              if (gallery.index !== newIndex) {
                  gallery.children[gallery.index].element.style.display = 'none';
                  gallery.children[newIndex].element.style.display = '';
              }
          };
          PictureparkPlayers.getGallery = function (elementId) {
              var children = [];
              var visibleIndex = -1;
              var element = document.getElementById(elementId);
              if (element) {
                  for (var i = 0; i < element.children.length; i++) {
                      var child = element.children[i];
                      var isVisible = child.style.display !== "none";
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
          };
          PictureparkPlayers.showDetail = function (token, shareItemId, widgetId) {
              if (PictureparkPlayers.loading)
                  return;
              PictureparkPlayers.loading = true;
              var share = document.pictureparkShareCache[token];
              PictureparkPlayers.showDetailById(shareItemId, share.items, widgetId);
          };
          PictureparkPlayers.showDetailById = function (shareItemId, shareItems, widgetId) {
              var shareItem = shareItems.filter(function (i) { return i.id === shareItemId; })[0];
              if (shareItem.isPdf && shareItems.length === 1) {
                  this.showPdfJsItem(shareItem);
                  PictureparkPlayers.loading = false;
              }
              else if (shareItem.isImage || shareItem.isMovie || shareItem.isPdf || !shareItem.isBinary) {
                  var savedOverflow_1 = document.body.style.overflow;
                  document.body.style.overflow = 'hidden';
                  this.showPhotoSwipeItem(shareItem, shareItems, widgetId ? 'gallery_' + widgetId : undefined).then(function () {
                      PictureparkPlayers.loading = false;
                      document.body.style.overflow = savedOverflow_1;
                  });
              }
              else {
                  // download file
                  var link = document.createElement("a");
                  link.href = shareItem.originalUrl;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  PictureparkPlayers.loading = false;
              }
          };
          PictureparkPlayers.renderVideoPlayer = function (item, element, width, height) {
              return this.loadVideoPlayer().then(function (videojs) {
                  return new Promise(function (resolve) {
                      var player = videojs(element, {
                          autoplay: false,
                          controls: true,
                          poster: item.previewUrl,
                          width: width,
                          height: height,
                          preload: 'auto'
                      }, function () {
                          resolve();
                      });
                      player.src({ type: 'video/mp4', src: item.originalUrl });
                      return player;
                  });
              });
          };
          PictureparkPlayers.loadVideoPlayer = function () {
              if (window.videojs)
                  return Promise.resolve(window.videojs);
              return this.loadScript("https://vjs.zencdn.net/7.0.3/video.js", 'videojs');
          };
          PictureparkPlayers.showPdfJsItem = function (item) {
              var iframeElement = document.createElement("iframe");
              iframeElement.style.position = 'fixed';
              iframeElement.style.left = '0';
              iframeElement.style.top = '0';
              iframeElement.style.width = '100%';
              iframeElement.style.height = '100%';
              iframeElement.src = PictureparkPlayers.scriptsPath + '/pdfjs/viewer.html?file=' + item.originalUrl;
              var savedOverflow = document.body.style.overflow;
              var keydownCallback = function (e) {
                  var event = e || window.event;
                  var isEscape = "key" in event ? (event.key == "Escape" || event.key == "Esc") : (event.keyCode == 27);
                  if (isEscape) {
                      closeCallback();
                  }
              };
              var closeCallback = function () {
                  document.body.removeChild(iframeElement);
                  document.body.style.overflow = savedOverflow;
                  document.removeEventListener('keydown', keydownCallback, true);
              };
              var pdfLoaded = false;
              iframeElement.onload = function (e) {
                  document.body.style.overflow = 'hidden';
                  if (pdfLoaded)
                      closeCallback();
                  else
                      pdfLoaded = true;
              };
              document.addEventListener('keydown', keydownCallback, true);
              document.body.appendChild(iframeElement);
          };
          PictureparkPlayers.showPhotoSwipeItem = function (shareItem, shareItems, galleryElementId) {
              return this.loadPhotoSwipe().then(function (result) {
                  if (!shareItems) {
                      shareItems = [shareItem];
                  }
                  var photoSwipeItems = shareItems.map(function (i) {
                      if (i.isImage) {
                          return {
                              src: i.previewUrl,
                              w: i.detail.width,
                              h: i.detail.height
                          };
                      }
                      else if (i.isPdf) {
                          return {
                              html: '<iframe style="position: absolute; left: 0; top: 40px; width: 100%; height: calc(100% - 40px)" ' +
                                  'src="' + PictureparkPlayers.scriptsPath + '/pdfjs/viewer.html?file=' + i.originalUrl + '&closeButton=false" id="pdfjs_' + i.id + '"></iframe>'
                          };
                      }
                      else if (i.isMovie) {
                          return {
                              html: '<video class="video-js" id="vjsplayer_' + i.id + '"></video>'
                          };
                      }
                      else if (!i.isBinary) {
                          return {
                              html: '<br /><br /><br /><br /><div class="picturepark-widget-content-preview"> ' + shareItem.displayValues.detail + '</div>'
                          };
                      }
                      else {
                          return {
                              html: '<br /><br /><br /><br />Not supported.'
                          };
                      }
                  });
                  var photoSwipe = new result.photoSwipe(result.element, result.photoSwipeDefault, photoSwipeItems, { index: shareItems.indexOf(shareItem) });
                  photoSwipe.options.history = false;
                  photoSwipe.init();
                  photoSwipe.listen('afterChange', function () {
                      var gallery = galleryElementId ? PictureparkPlayers.getGallery(galleryElementId) : undefined;
                      if (gallery) {
                          PictureparkPlayers.showGalleryItem(gallery, photoSwipe.getCurrentIndex());
                      }
                  });
                  var players = [];
                  var resizeCallbacks = [];
                  var loadedPlayerElements = [];
                  var loadedPlayers = [];
                  if (shareItems.filter(function (i) { return i.isMovie || i.isPdf; }).length > 0) {
                      var updatePlayers = function () {
                          if (shareItems.filter(function (i) { return i.isMovie; }).length > 0) {
                              PictureparkPlayers.loadVideoPlayer().then(function () {
                                  for (var _i = 0, _a = shareItems.filter(function (i) { return i.isMovie && loadedPlayerElements.indexOf(i.id) === -1; }); _i < _a.length; _i++) {
                                      var i = _a[_i];
                                      loadedPlayerElements.push(i.id);
                                      var elementId = "vjsplayer_" + i.id;
                                      var element = document.getElementById(elementId);
                                      if (element) {
                                          PictureparkPlayers.renderVideoPlayer(i, element, window.innerWidth, window.innerHeight).then(function (player) {
                                              if (player) {
                                                  loadedPlayers.push(player);
                                                  // players.push(player);
                                                  // let resizeCallback = () => player.resize(window.innerWidth, window.innerHeight);
                                                  // resizeCallbacks.push(resizeCallback);
                                                  // window.addEventListener('resize', resizeCallback, false);
                                              }
                                          });
                                      }
                                  }
                              });
                          }
                          var _loop_1 = function (i) {
                              var elementId = 'pdfjs_' + i.id;
                              var element = document.getElementById(elementId);
                              if (element) {
                                  element.onload = function () {
                                      if (element.contentWindow.location.href == 'about:blank')
                                          photoSwipe.close();
                                  };
                              }
                          };
                          // Handle pdfjs iframe close event
                          for (var _i = 0, _a = shareItems.filter(function (i) { return i.isPdf; }); _i < _a.length; _i++) {
                              var i = _a[_i];
                              _loop_1(i);
                          }
                      };
                      photoSwipe.listen('afterChange', function () {
                          updatePlayers();
                          photoSwipe.listen('beforeChange', updatePlayers);
                      });
                      photoSwipe.listen('close', function () {
                          for (var _i = 0, loadedPlayers_1 = loadedPlayers; _i < loadedPlayers_1.length; _i++) {
                              var player = loadedPlayers_1[_i];
                              player.dispose();
                          }
                      });
                  }
                  return new Promise(function (resolve) {
                      photoSwipe.listen('close', function () {
                          for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
                              var player = players_1[_i];
                              player.remove();
                          }
                          for (var _a = 0, resizeCallbacks_1 = resizeCallbacks; _a < resizeCallbacks_1.length; _a++) {
                              var resizeCallback = resizeCallbacks_1[_a];
                              window.removeEventListener('resize', resizeCallback, false);
                          }
                          resolve();
                      });
                  });
              });
          };
          PictureparkPlayers.loadPhotoSwipe = function () {
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
                  ]).then(function (_a) {
                      var css1 = _a[0], css2 = _a[1], photoSwipe = _a[2], photoSwipeDefault = _a[3];
                      return {
                          element: PictureparkPlayers.getPhotoSwipeElement(),
                          photoSwipe: photoSwipe,
                          photoSwipeDefault: photoSwipeDefault
                      };
                  });
              }
          };
          PictureparkPlayers.getPhotoSwipeElement = function () {
              var element = document.querySelectorAll('.pswp')[0];
              if (element)
                  return element;
              else {
                  var markup = "\n        <div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n            <div class=\"pswp__bg\"></div>\n            <div class=\"pswp__scroll-wrap\">\n                <div class=\"pswp__container\">\n                    <div class=\"pswp__item\"></div>\n                    <div class=\"pswp__item\"></div>\n                    <div class=\"pswp__item\"></div>\n                </div>\n                <div class=\"pswp__ui pswp__ui--hidden\">\n                    <div class=\"pswp__top-bar\">\n                        <div class=\"pswp__counter\"></div>\n                        <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n                        <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\n                        <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n                        <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n                        <div class=\"pswp__preloader\">\n                            <div class=\"pswp__preloader__icn\">\n                            <div class=\"pswp__preloader__cut\">\n                                <div class=\"pswp__preloader__donut\"></div>\n                            </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n                        <div class=\"pswp__share-tooltip\"></div> \n                    </div>\n                    <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\"></button>\n                    <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\"></button>\n                    <div class=\"pswp__caption\">\n                        <div class=\"pswp__caption__center\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>";
                  var divElement = document.createElement("div");
                  divElement.id = "photoswipe";
                  divElement.innerHTML = markup;
                  document.body.appendChild(divElement);
                  return document.querySelectorAll('.pswp')[0];
              }
          };
          PictureparkPlayers.loadScript = function (url, globalName) {
              if (window.require) {
                  console.log('Picturepark Widgets > Load external script via require(): ' + url);
                  return new Promise(function (resolve) {
                      window.require([url], function (module) {
                          resolve(module);
                      });
                  });
              }
              else {
                  console.log('Picturepark Widgets > Load external script via tag: ' + url);
                  return new Promise(function (resolve) {
                      var scriptTag = document.createElement('script');
                      scriptTag.src = url;
                      scriptTag.async = true;
                      scriptTag.onload = function () {
                          resolve(window[globalName]);
                      };
                      document.head.appendChild(scriptTag);
                  });
              }
          };
          PictureparkPlayers.loadCss = function (url) {
              return new Promise(function (resolve) {
                  var linkElement = document.createElement("link");
                  linkElement.type = "text/css";
                  linkElement.rel = "stylesheet";
                  linkElement.href = url;
                  linkElement.onload = function () { return resolve(); };
                  document.getElementsByTagName("head")[0].appendChild(linkElement);
              });
          };
          PictureparkPlayers.loading = false;
          PictureparkPlayers.scriptsPath = undefined;
          PictureparkPlayers.imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          PictureparkPlayers.videoExtensions = ['.mov', '.mp4', '.mp3'];
          return PictureparkPlayers;
      }());
      exports.PictureparkPlayers = PictureparkPlayers;
  });
  define("translations", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      exports.TRANSLATIONS = {
          List: {
              HeaderDownloads: {
                  en: "Downloads",
                  de: "Downloads"
              },
              ButtonDownloadAll: {
                  en: "Download all",
                  de: "Alle herunterladen"
              }
          }
      };
      var fallbackLanguage = 'en';
      function translate(key, locale) {
          var language = locale ? locale.split("-")[0].toLowerCase() : "";
          var translations = exports.TRANSLATIONS;
          if (typeof key === 'string') {
              var path = key.split(".");
              if (path.length > 0) {
                  for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                      var segment = path_1[_i];
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
              (language !== fallbackLanguage ? translate(key, fallbackLanguage + '-') : "[!" + key + "]");
      }
      exports.translate = translate;
  });
  define("rendering", ["require", "exports", "translations"], function (require, exports, translations_1) {
      "use strict";
      exports.__esModule = true;
      var PictureparkRenderEngine = (function () {
          function PictureparkRenderEngine() {
          }
          PictureparkRenderEngine.create = function () {
              var engine = Liquid();
              engine.registerTag('translate', {
                  parse: function (token) {
                      this.token = token;
                  },
                  render: function (scope, hash) {
                      var args = this.token.args.split(' ');
                      var key = Liquid.evalExp(args[0], scope);
                      var locale = navigator.language || navigator.userLanguage;
                      return translations_1.translate(key, locale);
                  }
              });
              engine.registerTag('resizeById', {
                  parse: function (token) {
                      this.token = token;
                  },
                  render: function (scope, hash) {
                      var args = this.token.args.split(' ');
                      var share = scope.scopes[0].share;
                      var id = Liquid.evalExp(args[0], scope);
                      var outputFormatId = Liquid.evalExp(args[1], scope);
                      var width = Liquid.evalExp(args[2], scope);
                      var height = Liquid.evalExp(args[3], scope);
                      try {
                          var item = share.items.filter(function (i) { return i.id === id; })[0];
                          if (outputFormatId === "Preview" && item.previewUrl) {
                              return item.previewUrl + ("/" + width + "/" + height);
                          }
                          else {
                              return item.originalUrl + ("/" + width + "/" + height);
                          }
                      }
                      catch (ex) {
                          console.log(ex);
                          return "";
                      }
                  }
              });
              return engine;
          };
          return PictureparkRenderEngine;
      }());
      exports.PictureparkRenderEngine = PictureparkRenderEngine;
  });
  define("config", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var PictureparkConfig = (function () {
          function PictureparkConfig() {
          }
          PictureparkConfig.get = function (element) {
              var configuration = { renderStyles: true };
              for (var i = 0; i < element.attributes.length; i++) {
                  var attribute = element.attributes[i];
                  if (attribute.name === 'data-token')
                      configuration['token'] = attribute.value;
                  else if (attribute.name === 'data-picturepark-server')
                      configuration['server'] = attribute.value;
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
                      var value = void 0;
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
                      configuration[attribute.name.substr(5).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })] = value;
                  }
              }
              return configuration;
          };
          return PictureparkConfig;
      }());
      exports.PictureparkConfig = PictureparkConfig;
  });
  /// <reference path="typings/es6-promise.d.ts" />
  /// <reference path="../../picturepark-sdk-v1-fetch/dist/picturepark.d.ts" />
  define("index", ["require", "exports", "templates", "players", "rendering", "config", "players", "libraries/promise.min", "libraries/liquid.min", "./libraries/fetch.min.js"], function (require, exports, templates_1, players_2, rendering_1, config_1, players_3) {
      "use strict";
      exports.__esModule = true;
      exports.players = players_3.PictureparkPlayers;
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
          var id = Math.random().toString(36).substr(2, 10);
          var elementId = 'picturepark_widget_' + id;
          var initialConfig = config_1.PictureparkConfig.get(scriptTag);
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
          var options = { headers: { 'Accept': 'application/json' } };
          return window.fetch(initialConfig.server + '/service/publicAccess/shares/' + initialConfig.token, options).then(function (response) {
              return response.json();
          }).then(function (shareDetail) {
              // Merge config with config from server
              var config = shareDetail.template;
              switch (config.kind) {
                  case "BasicTemplate":
                      config.template = "gallery";
                      break;
                  case "CardTemplate":
                      config.template = "card";
                      break;
                  case "ListTemplate":
                      config.template = "list";
                      break;
              }
              Object.keys(initialConfig).forEach(function (key) {
                  config[key] = initialConfig[key];
              });
              // Fallback to card templates
              if (contentTemplate === '') {
                  contentTemplate = templates_1.PictureparkTemplates.getTemplate(config.template || "card");
              }
              var index = 0;
              var share = {
                  id: shareDetail.id,
                  url: shareDetail.data.url,
                  name: shareDetail.name,
                  creator: shareDetail.creator,
                  description: shareDetail.description,
                  items: shareDetail.contentSelections.map(function (s) {
                      var outputs = s.outputs.map(function (o) {
                          return {
                              contentId: s.id,
                              outputFormatId: o.outputFormatId,
                              fileExtension: o.detail ? o.detail.fileExtension : null,
                              url: o.url,
                              detail: o.detail
                          };
                      });
                      var previewOutput = outputs.filter(function (o) { return o.outputFormatId === 'Preview'; })[0];
                      // find best original output
                      var originalOutput;
                      var _loop_2 = function (ofi) {
                          originalOutput = outputs.filter(function (o) { return o.outputFormatId === ofi; })[0];
                          if (originalOutput)
                              return "break";
                      };
                      for (var _i = 0, _a = ["Pdf", "VideoLarge", "VideoMedium", "AudioSmall", "Original", "Preview"]; _i < _a.length; _i++) {
                          var ofi = _a[_i];
                          var state_1 = _loop_2(ofi);
                          if (state_1 === "break")
                              break;
                      }
                      // TODO: Use VideoLarge AND VideoMedium
                      return {
                          id: s.id,
                          index: index++,
                          displayValues: s.displayValues,
                          detail: originalOutput ? originalOutput.detail : null,
                          isMovie: originalOutput ? players_2.PictureparkPlayers.videoExtensions.indexOf(originalOutput.fileExtension) !== -1 : false,
                          isImage: originalOutput ? players_2.PictureparkPlayers.imageExtensions.indexOf(originalOutput.fileExtension) !== -1 : false,
                          isPdf: originalOutput ? originalOutput.fileExtension === '.pdf' : false,
                          isBinary: s.contentSchemaId === "ImageMetadata" ||
                              s.contentSchemaId === "VideoMetadata" ||
                              s.contentSchemaId === "AudioMetadata" ||
                              s.contentSchemaId === "FileMetadata" ||
                              s.contentSchemaId === "DocumentMetadata",
                          previewUrl: previewOutput ? previewOutput.url : null,
                          previewContentId: previewOutput ? previewOutput.contentId : null,
                          previewOutputFormatId: previewOutput ? previewOutput.outputFormatId : null,
                          originalUrl: originalOutput ? originalOutput.url : null,
                          originalContentId: originalOutput ? originalOutput.contentId : null,
                          originalOutputFormatId: originalOutput ? originalOutput.outputFormatId : null,
                          originalFileExtension: originalOutput ? originalOutput.fileExtension : null
                      };
                  })
              };
              if (!document.pictureparkShareCache)
                  document.pictureparkShareCache = {};
              document.pictureparkShareCache[config.token] = share;
              var engine = rendering_1.PictureparkRenderEngine.create();
              return engine.parseAndRender(contentTemplate, {
                  id: id,
                  elementId: elementId,
                  share: share,
                  config: config
              }).then(function (html) {
                  html = '<div class="picturepark-widget picturepark-widget-' + id + ' picturepark-widget-loaded">' + html + '</div>';
                  document.getElementById(elementId).outerHTML = html;
                  var _loop_3 = function (item) {
                      if (item.isMovie) {
                          var elementId_1 = 'vjsplayer_' + item.index + "_" + id;
                          setTimeout(function () {
                              if (document.getElementById(elementId_1)) {
                                  players_2.PictureparkPlayers.renderVideoPlayer(item, elementId_1, config.width, config.height).then(function (player) {
                                      share.player = player;
                                  });
                              }
                          });
                      }
                  };
                  // iframe
                  // let frame = document.createElement('iframe');
                  // let elm = document.getElementById(elementId);
                  // elm.appendChild(frame);
                  // frame.contentDocument.write(html + "<script src='http://localhost:8090/dist/picturepark-widgets.js' async />");
                  // Load movie players
                  for (var _i = 0, _a = share.items; _i < _a.length; _i++) {
                      var item = _a[_i];
                      _loop_3(item);
                  }
                  return true;
              });
          })["catch"](function (e) {
              console.error(e);
              document.getElementById(elementId).outerHTML =
                  '<div class="picturepark-widget picturepark-widget-error">' + errorTemplate + '</div>';
              return false;
          });
      }
      exports.processScriptTag = processScriptTag;
      ;
      function getScriptsPath() {
          var scriptFile = 'picturepark-widgets.js';
          var elements = document.getElementsByTagName('script');
          for (var i = 0; i < elements.length; i++) {
              var element = elements[i];
              var index = element.src.indexOf(scriptFile);
              if (index !== -1)
                  return element.src.substring(0, index);
          }
          return undefined;
      }
      if (players_2.PictureparkPlayers.scriptsPath === undefined)
          players_2.PictureparkPlayers.scriptsPath = getScriptsPath();
      // Scan all script tags
      (function () {
          setTimeout(function () {
              var scriptTags = document.getElementsByTagName('script');
              for (var i = 0; i < scriptTags.length; ++i) {
                  var scriptTag = scriptTags[i];
                  if (scriptTag.hasAttribute('data-picturepark-server')) {
                      processScriptTag(scriptTag);
                  }
              }
          });
      })();
  });
  
  return collect(); 
})();