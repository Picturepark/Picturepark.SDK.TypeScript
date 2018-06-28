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
  }).then((shareDetail: picturepark.ShareDetail) => {
    // Merge config with config from server
    var config = shareDetail.template as any;
    switch(config.kind) {
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

    Object.keys(initialConfig).forEach(key => {
      config[key] = initialConfig[key];
    });
    
    // Fallback to card templates
    if (contentTemplate === '') {
      contentTemplate = PictureparkTemplates.getTemplate(config.template || "card");
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
            url: o.url,
            detail: o.detail
          }
        });
        let previewOutput = outputs.filter(o => o.outputFormatId === 'Preview')[0];

        // find best original output
        let originalOutput: {
          contentId: string;
          outputFormatId: string;
          fileExtension: string;
          url: string;
          detail: picturepark.OutputDataBase;
        };

        for (let ofi of ["Pdf", "VideoLarge", "VideoMedium", "AudioSmall", "Original", "Preview"]) {
          originalOutput = outputs.filter(o => o.outputFormatId === ofi)[0];
          if (originalOutput)
            break;
        }
        // TODO: Use VideoLarge AND VideoMedium

        return {
          id: s.id,
          index: index++,
          displayValues: s.displayValues,
          detail: originalOutput ? originalOutput.detail : null,

          isMovie: originalOutput ? PictureparkPlayers.videoExtensions.indexOf(originalOutput.fileExtension) !== -1 : false,
          isImage: originalOutput ? PictureparkPlayers.imageExtensions.indexOf(originalOutput.fileExtension) !== -1 : false,
          isPdf: originalOutput ? originalOutput.fileExtension === '.pdf' : false,
          isBinary: 
            s.contentSchemaId === "ImageMetadata" || 
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
      html = '<div class="picturepark-widget picturepark-widget-' + id + ' picturepark-widget-loaded">' + html + '</div>';
      document.getElementById(elementId).outerHTML = html;

      // iframe
      // let frame = document.createElement('iframe');
      // let elm = document.getElementById(elementId);
      // elm.appendChild(frame);
      // frame.contentDocument.write(html + "<script src='http://localhost:8090/dist/picturepark-widgets.js' async />");

      // Load movie players
      for (let item of share.items) {
        if (item.isMovie) {
          let elementId = 'player_' + item.index + "_" + id;
          setTimeout(() => {
            if (document.getElementById(elementId)) {
              PictureparkPlayers.renderVideoPlayer(item, elementId, config.width, config.height).then(player => {
                (<any>share).player = player;
              });
            }
          });
        }
      }
      return true;
    });
  }).catch((e) => {
    console.error(e);
    document.getElementById(elementId).outerHTML =
      '<div class="picturepark-widget picturepark-widget-error">' + errorTemplate + '</div>';
    return false;
  });
};

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