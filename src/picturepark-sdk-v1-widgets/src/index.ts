/// <reference path="es6-promise.d.ts" />

import './liquid.min.js';
import './promise.min.js';
import './fetch.min.js';

import { PictureparkTemplates } from './templates';
import { PictureparkPlayers } from './players';

export let players = PictureparkPlayers;

declare var Liquid;

// TODO: Get hashed email address from backend (exclude email from Audit)
let MD5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };

let engine = Liquid();

engine.registerTag('resize', {
  parse: function (token) {
    this.token = token;
  },
  render: function (scope, hash) {
    let args = this.token.args.split(' ');

    let embedItem = Liquid.evalExp(args[0], scope);
    let width = Liquid.evalExp(args[1], scope);
    let height = Liquid.evalExp(args[2], scope);

    try {
      let out: string = embedItem.Url;
      out = out.replace("/Embed/", "/Go/");
      out += `/V/${embedItem.ContentId}/${embedItem.OutputFormatId}/${width}/${height}`;
      return out;
    }
    catch (ex) {
      console.log(ex);
      return "";
    }
  }
});

engine.registerTag('resizeById', {
  parse: function (token) {
    this.token = token;
  },
  render: function (scope, hash) {
    let args = this.token.args.split(' ');

    let share = scope.scopes[0];
    let contentId = Liquid.evalExp(args[0], scope);
    let outputFormatId = Liquid.evalExp(args[1], scope);
    let width = Liquid.evalExp(args[2], scope);
    let height = Liquid.evalExp(args[3], scope);

    try {
      let embedItem: any = share.EmbedContentItems.filter(i => i.ContentId === contentId && i.OutputFormatId === outputFormatId)[0];
      if (!embedItem) {
        // Fallback to original
        embedItem = share.EmbedContentItems.filter(i => i.ContentId === contentId && i.OutputFormatId === 'Original')[0];
      }

      let out: string = embedItem.Url;
      out = out.replace("/Embed/", "/Go/");
      out += `/V/${embedItem.ContentId}/${embedItem.OutputFormatId}/${width}/${height}`;
      return out;
    } catch (ex) {
      console.log(ex);
      return "";
    }
  }
});

engine.registerFilter('md5', function (context) {
  let hash = MD5(context);
  return hash;
});

/**
 * Processes a script tag.
 * @param scriptTag The script tag to process.
 */
export function processScriptTag(scriptTag: HTMLElement): Promise<boolean> {
  if (scriptTag["isPictureparkProcessing"]) return;
  scriptTag["isPictureparkProcessing"] = true;

  var loadTemplate = 'Loading...';
  var failTemplate = 'Failed to load data.';
  var contentTemplate = '';

  var token = scriptTag.getAttribute('data-picturepark-token');
  var serverUrl = scriptTag.getAttribute('data-picturepark-server');

  var elementId = 'picturepark_widget_' + Math.random().toString(36).substr(2, 10);

  // Load custom templates
  if (scriptTag.innerHTML) {
    var temp = document.createElement("div");
    temp.innerHTML = scriptTag.innerHTML;
    var children = temp.children;

    if (children['load'])
      loadTemplate = children['load'].innerHTML;
    if (children['content'])
      contentTemplate = children['content'].innerHTML;
    if (children['error'])
      failTemplate = children['error'].innerHTML;

    if (!children['load'] && children['content'] && children['error'])
      contentTemplate = scriptTag.innerHTML;
  }

  // Fallback to basic templates
  if (contentTemplate === '') {
    let width: number = undefined;
    let height: number = undefined;

    var widthAttribute = scriptTag.getAttribute('data-width');
    if (widthAttribute)
      width = parseInt(widthAttribute);

    var heightAttribute = scriptTag.getAttribute('data-height');
    if (heightAttribute)
      height = parseInt(heightAttribute);

    var templateAttribute = scriptTag.getAttribute('data-template');
    contentTemplate = PictureparkTemplates.getTemplate(templateAttribute || "basic", width, height, token, serverUrl);
  }

  // Apply loading template
  scriptTag.outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-loading" id=' +
    elementId + '>' + loadTemplate + '</div>';

  return window.fetch(serverUrl + '/Service/PublicAccess/GetShare?token=' + token).then(function (response) {
    return response.json();
  }).then((json) => {
    json['CacheToken'] = token;

    // Add download urls to content selections and outputs
    for (let s of json.ContentSelections) {
      for (let o of s.Outputs) {
        let embedItems = json.EmbedContentItems.filter(e => e.ContentId === o.ContentId && e.OutputFormatId === o.OutputFormatId);
        if (embedItems && embedItems.length > 0)
          o.Url = embedItems[0].Url;
      }

      let embedItems = s.Outputs.filter(e => e.OutputFormatId === "Original");
      if (embedItems && embedItems.length > 0)
        s.Url = embedItems[0].Url;
    }

    if (!(<any>document).pictureparkShareCache)
      (<any>document).pictureparkShareCache = {};
    (<any>document).pictureparkShareCache[token] = json;

    return engine.parseAndRender(contentTemplate, json);
  }).then(html => {
    document.getElementById(elementId).outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-load">' + html + '</div>';
    return true;
  }).catch(() => {
    document.getElementById(elementId).outerHTML =
      '<div class="picturepark-widget-share picturepark-widget-share-fail">' +
      failTemplate + '</div>';
    return false;
  });
};

(function () {
  function loadScript(url: string, loaded: any) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.async = true;
    if (loaded)
      scriptTag.onload = loaded;

    document.head.appendChild(scriptTag);
  }

  var scriptTags = document.getElementsByTagName('script');
  for (var i = 0; i < scriptTags.length; ++i) {
    var scriptTag = scriptTags[i];
    if (scriptTag.hasAttribute('data-picturepark-token'))
      processScriptTag(scriptTag);
  }
})();