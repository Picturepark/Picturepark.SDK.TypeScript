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

export { PictureparkPlayers as players } from './players';

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
  scriptTag.outerHTML = '<div class="picturepark-widget-share picturepark-widget-share-loading" id=' +
    elementId + '>' + loadingTemplate + '</div>';

  return window.fetch(config.server + '/Service/PublicAccess/GetShare?token=' + config.token).then(function (response) {
    return response.json();
  }).then((rawShare: picturepark.ShareEmbedDetailViewItem) => {
    let index = 0;
    let share = {
      id: rawShare.Id,
      url: rawShare.Url,
      name: rawShare.Name,
      audit: rawShare.Audit,
      description: rawShare.Description,
      items: rawShare.ContentSelections.map(s => {
        let outputs = s.Outputs.map(o => {
          let embedItem = rawShare.EmbedContentItems.filter(e => e.ContentId === o.ContentId && e.OutputFormatId === o.OutputFormatId)[0];
          return {
            contentId: embedItem ? embedItem.ContentId : null,
            outputFormatId: o.OutputFormatId,
            fileExtension: o.Detail.FileExtension,
            url: embedItem ? embedItem.Url : null,
            detail: o.Detail
          }
        });

        let previewOutput = outputs.filter(o => o.outputFormatId === 'Preview')[0];

        // find best original output
        let originalOutput: any;
        for (let ofi of ["Pdf", "VideoLarge", "VideoMedium", "AudioSmall", "Original"]) {
          originalOutput = outputs.filter(o => o.outputFormatId === ofi)[0];
          if (originalOutput)
            break;
        }
        // TODO: Use VideoLarge AND VideoMedium

        return {
          id: s.Id,
          index: index++,
          displayValues: s.DisplayValues,
          detail: originalOutput.detail,

          isMovie: originalOutput ? PictureparkPlayers.videoExtensions.indexOf(originalOutput.fileExtension) !== -1 : null,
          isImage: originalOutput ? PictureparkPlayers.imageExtensions.indexOf(originalOutput.fileExtension) !== -1 : null,
          isPdf: originalOutput ? originalOutput.fileExtension === '.pdf' : null,

          previewUrl: previewOutput ? previewOutput.url : null,
          previewContentId: previewOutput ? previewOutput.contentId : null,
          previewOutputFormatId: previewOutput ? previewOutput.outputFormatId : null,

          originalUrl: originalOutput ? originalOutput.url : null,
          originalContentId: originalOutput ? originalOutput.contentId : null,
          originalOutputFormatId: originalOutput ? originalOutput.outputFormatId : null,
          originalFileExtension: originalOutput ? originalOutput.fileExtension : null,
        };
      })
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
    }).then(html => {
      document.getElementById(elementId).outerHTML =
        '<div class="picturepark-widget-share picturepark-widget-share-' + id +
        ' picturepark-widget-share-loaded">' + html + '</div>';

      // Load movie players
      for (let item of share.items) {
        if (item.isMovie) {
          let itemId = item.id;
          let elementId = 'player_' + item.index + "_" + id;
          setTimeout(() => {
            if (document.getElementById(elementId)) {
              PictureparkPlayers.renderVideoPlayer(config.token, itemId, elementId, config.width, config.height);
            }
          });
        }
      }
      return true;
    });
  }).catch((e) => {
    console.error(e);
    document.getElementById(elementId).outerHTML =
      '<div class="picturepark-widget-share picturepark-widget-share-error">' +
      errorTemplate + '</div>';
    return false;
  });
};

function getScriptsPath() {
  let scriptFile = 'picturepark-widgets.js';
  let elements = document.getElementsByTagName('script');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.src.indexOf(scriptFile) !== -1)
      return element.src.substring(0, element.src.length - scriptFile.length)
  }
  return undefined;
}

if (PictureparkPlayers.scriptsPath === undefined)
  PictureparkPlayers.scriptsPath = getScriptsPath();

// Scan all script tags
(function () {
  var scriptTags = document.getElementsByTagName('script');
  for (var i = 0; i < scriptTags.length; ++i) {
    var scriptTag = scriptTags[i];
    if (scriptTag.hasAttribute('data-picturepark-server'))
      processScriptTag(scriptTag);
  }
})();