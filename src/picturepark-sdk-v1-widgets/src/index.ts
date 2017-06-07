/// <reference path="typings/es6-promise.d.ts" />
/// <reference path="../../picturepark-sdk-v1-fetch/dist/picturepark.d.ts" />

import './libraries/promise.min.js';
import './libraries/liquid.min.js';
import './libraries/fetch.min.js';

import * as picturepark from 'picturepark';

import { PictureparkTemplates } from './templates';
import { PictureparkPlayers } from './players';
import { PictureparkRenderEngine } from './rendering';
import { PictureparkConfig } from './config';

export let players = PictureparkPlayers;

/**
 * Processes a script tag.
 * @param scriptTag The script tag to process.
 */
export function processScriptTag(scriptTag: HTMLElement): Promise<boolean> {
  if (scriptTag["isPictureparkProcessing"]) return;
  scriptTag["isPictureparkProcessing"] = true;

  var loadingTemplate = 'Loading...';
  var errorTemplate = 'Failed to load data.';
  var contentTemplate = '';

  let id = Math.random().toString(36).substr(2, 10);
  var elementId = 'picturepark_widget_' + id;
  let config = PictureparkConfig.get(scriptTag);

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

  // Fallback to basic templates
  if (contentTemplate === '') {
    contentTemplate = PictureparkTemplates.getTemplate(config.template || "basic");
  }

  // Apply loading template
  scriptTag.outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-loading" id=' + elementId + '>' + loadingTemplate + '</div>';

  return window.fetch(config.server + '/Service/PublicAccess/GetShare?token=' + config.token).then(function (response) {
    return response.json();
  }).then((share: picturepark.ShareEmbedDetailViewItem) => {
    // Add download urls to content selections and outputs
    for (let s of share.ContentSelections) {
      for (let o of s.Outputs) {
        let embedItems = share.EmbedContentItems.filter(e => e.ContentId === o.ContentId && e.OutputFormatId === o.OutputFormatId);
        if (embedItems && embedItems.length > 0)
          (<any>o).Url = embedItems[0].Url;
      }

      let embedItems = s.Outputs.filter(e => e.OutputFormatId === "Original");
      if (embedItems && embedItems.length > 0)
        (<any>s).Url = (<any>embedItems[0]).Url;
    }

    if (!(<any>document).pictureparkShareCache)
      (<any>document).pictureparkShareCache = {};
    (<any>document).pictureparkShareCache[config.token] = share;

    let engine = PictureparkRenderEngine.create();
    return engine.parseAndRender(contentTemplate, {
      id: id,
      elementId: elementId, 
      share: share,
      config: config
    });
  }).then(html => {
    document.getElementById(elementId).outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-' + id + ' picturepark-widget-share-loaded">' + html + '</div>';
    return true;
  }).catch((e) => {
    console.error(e);
    document.getElementById(elementId).outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-error">' + errorTemplate + '</div>';
    return false;
  });
};

// Scan all script tags
(function () {
  var scriptTags = document.getElementsByTagName('script');
  for (var i = 0; i < scriptTags.length; ++i) {
    var scriptTag = scriptTags[i];
    if (scriptTag.hasAttribute('data-picturepark-token'))
      processScriptTag(scriptTag);
  }
})();