import { Inject, Injectable, Optional } from '@angular/core';
import {
  ContentDetail,
  LoggerService,
  Output,
  OutputRenderingState,
  ShareContentDetail,
  ShareOutputBase,
  ShareOutputDisplayContent,
} from '@picturepark/sdk-v2-angular';
import { PICTUREPARK_UI_SCRIPTPATH } from '../../configuration';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  constructor(
    @Optional() @Inject(PICTUREPARK_UI_SCRIPTPATH) private uiScriptPath: string,
    private logger: LoggerService
  ) {}

  loading = false;

  protected get scriptsPath() {
    return `${this.uiScriptPath ?? ''}/assets/picturepark-sdk-v1-widgets/`;
  }

  showDetailById(shareItemId: string, shareItems: IShareItem[]) {
    const shareItem = shareItems.filter(i => i.id === shareItemId)[0];
    if (shareItem.viewerType === ContentViewerType.Document && shareItems.length === 1) {
      this.showPdfJsItem(shareItem);
      this.loading = false;
    } else {
      const savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.showPhotoSwipeItem(shareItem, shareItems).then(() => {
        this.loading = false;
        document.body.style.overflow = savedOverflow;
      });
    }
  }

  async renderVideoPlayer(element: Element, item: IShareItem, width?: number, height?: number) {
    const IndigoPlayer = await this.loadVideoPlayerLibraries();
    const player = IndigoPlayer.init(element, {
      autoplay: true,
      aspectRatio: width && height ? width / height : 16 / 9,
      ui: {
        image: item.previewUrl,
      },
      sources: [
        {
          type:
            item.viewerType === ContentViewerType.Video
              ? 'mp4'
              : 'mp4' /* IndigoPlayer does not support mp3, but playback of mp3 defined as mp4 works */,
          src: item.playerUrl,
        },
      ],
    });
    return player;
  }

  loadVideoPlayerLibraries() {
    if ((<any>window).IndigoPlayer) {
      return Promise.resolve((<any>window).IndigoPlayer);
    }

    return Promise.all([
      this.loadScript('https://cdn.jsdelivr.net/npm/indigo-player@1/lib/indigo-player.js', 'IndigoPlayer'),
    ]).then(([IndigoPlayer]) => {
      return IndigoPlayer;
    });
  }

  showPdfJsItem(item) {
    const iframeElement = document.createElement('iframe');
    iframeElement.style.position = 'fixed';
    iframeElement.style.left = '0';
    iframeElement.style.top = '0';
    iframeElement.style.width = '100%';
    iframeElement.style.height = '100%';
    iframeElement.src = this.scriptsPath + 'pdfjs/web/viewer.html?file=' + item.pdfUrl;

    const savedOverflow = document.body.style.overflow;
    const closeCallback = () => {
      document.body.removeChild(iframeElement);
      document.body.style.overflow = savedOverflow;
      document.removeEventListener('keydown', keydownCallback, true);
    };

    const keydownCallback = (e: KeyboardEvent) => {
      const event = e || <KeyboardEvent>window.event;
      const isEscape = 'key' in event ? event.key === 'Escape' || event.key === 'Esc' : (<any>event).keyCode === 27;
      if (isEscape) {
        closeCallback();
      }
    };

    let pdfLoaded = false;
    iframeElement.onload = e => {
      document.body.style.overflow = 'hidden';
      if (pdfLoaded) {
        closeCallback();
      } else {
        pdfLoaded = true;
      }
    };

    document.addEventListener('keydown', keydownCallback, true);
    document.body.appendChild(iframeElement);
  }

  showPhotoSwipeItem(shareItem: IShareItem, shareItems: IShareItem[]) {
    return this.loadPhotoSwipe().then(result => {
      if (!shareItems) {
        shareItems = [shareItem];
      }

      const photoSwipeItems = shareItems.map(i => {
        if (i.viewerType === ContentViewerType.Image && i.detail) {
          return {
            src: i.previewUrl,
            w: i.detail.width,
            h: i.detail.height,
            origin: i.originalUrl,
          };
        } else if (i.viewerType === ContentViewerType.Document) {
          return {
            html:
              '<iframe style="position: absolute; left: 0; top: 40px; width: 100%; height: calc(100% - 40px)" ' +
              'src="' +
              this.scriptsPath +
              'pdfjs/web/viewer.html?file=' +
              i.playerUrl +
              '&closeButton=false" id="pdfjs_' +
              i.id +
              '"></iframe>',
            origin: i.originalUrl,
          };
        } else if (i.viewerType === ContentViewerType.Video) {
          return {
            html: '<div id="vjsplayer_' + i.id + '"></div>',
            origin: i.originalUrl,
          };
        } else if (i.viewerType === ContentViewerType.Audio) {
          return {
            html: '<div id="vjsplayer_' + i.id + '"></div>',
            origin: i.originalUrl,
          };
        } else if (i.isIcon) {
          return {
            src: i.previewUrl,
            w: 800,
            h: 800,
            origin: i.originalUrl,
          };
        } else if (i.viewerType === ContentViewerType.Html) {
          return {
            html:
              '<br /><br /><br /><br /><div class="picturepark-widget-content-preview" style="color: white; padding: 24px"> ' +
              i.displayValues.thumbnail +
              '</div>',
            origin: i.originalUrl,
          };
        } else {
          // Fallback to preview image
          return {
            src: i.previewUrl + '?width=800&height=800',
            w: 800,
            h: 800,
            origin: i.originalUrl,
          };
        }
      });

      const photoSwipe = new result.photoSwipe(result.element, result.photoSwipeDefault, photoSwipeItems, {
        index: shareItems.indexOf(shareItem),
      });
      photoSwipe.options.history = false;
      photoSwipe.options.shareButtons = [
        { id: 'download', label: 'Download', url: '{{raw_image_url}}', download: true },
      ];
      photoSwipe.options.getImageURLForShare = (shareButtonData: any) => {
        return photoSwipe.currItem.origin || photoSwipe.currItem.src || '';
      };
      photoSwipe.init();
      photoSwipe.listen('afterChange', function () {
        // TODO: Emit event
      });

      const resizeCallbacks = [];
      const loadedPlayers: any[] = [];

      const cleanupPlayers = () => {
        // stop and destroy existing players
        loadedPlayers.forEach((loadedPlayer, index) => {
          try {
            loadedPlayer.destroy();
            loadedPlayers.splice(index, 1);
          } catch (ex) {
            this.logger.error(ex);
          }
        });
      };

      if (
        shareItems.filter(
          i =>
            i.viewerType === ContentViewerType.Video ||
            i.viewerType === ContentViewerType.Audio ||
            i.viewerType === ContentViewerType.Document
        ).length > 0
      ) {
        const updatePlayers = async () => {
          cleanupPlayers();

          const item = shareItems[photoSwipe.getCurrentIndex()];
          if (item.viewerType === ContentViewerType.Video || item.viewerType === ContentViewerType.Audio) {
            await this.loadVideoPlayerLibraries();
            const elementId = 'vjsplayer_' + item.id;
            const element = document.getElementById(elementId);
            if (element) {
              const player = await this.renderVideoPlayer(element, item, window.innerWidth, window.innerHeight);
              if (player) {
                loadedPlayers.push(player);
              }
            }
          }

          // Handle pdfjs iframe close event
          for (const i of shareItems.filter(s => s.viewerType === ContentViewerType.Document)) {
            const elementId = 'pdfjs_' + i.id;
            const element: any = document.getElementById(elementId);
            if (element) {
              element.onload = () => {
                if (element.contentWindow.location.href === 'about:blank') {
                  photoSwipe.close();
                }
              };
            }
          }
        };

        photoSwipe.listen('afterChange', () => {
          updatePlayers();
        });

        updatePlayers();
      }

      return new Promise<void>(resolve => {
        photoSwipe.listen('close', () => {
          cleanupPlayers();
          for (const resizeCallback of resizeCallbacks) {
            window.removeEventListener('resize', resizeCallback, false);
          }
          resolve();
        });
      });
    });
  }

  loadPhotoSwipe(): Promise<{ element: Element; photoSwipe: any; photoSwipeDefault: any }> {
    if ((<any>window).PhotoSwipe) {
      return Promise.resolve({
        element: this.getPhotoSwipeElement(),
        photoSwipe: (<any>window).PhotoSwipe,
        photoSwipeDefault: (<any>window).PhotoSwipeUI_Default,
      });
    } else {
      return Promise.all([
        this.loadCss('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/4.1.3/dist/photoswipe.css'),
        this.loadCss('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/4.1.3/dist/default-skin/default-skin.css'),
        this.loadScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/4.1.3/dist/photoswipe.min.js', 'PhotoSwipe'),
        this.loadScript(
          'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/4.1.3/dist/photoswipe-ui-default.min.js',
          'PhotoSwipeUI_Default'
        ),
      ]).then(([css1, css2, photoSwipe, photoSwipeDefault]) => {
        return {
          element: this.getPhotoSwipeElement(),
          photoSwipe: photoSwipe,
          photoSwipeDefault: photoSwipeDefault,
        };
      });
    }
  }

  getPhotoSwipeElement() {
    const element = document.querySelectorAll('.pswp')[0];
    if (element) {
      return element;
    } else {
      const markup = `
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

      const divElement = document.createElement('div');
      divElement.id = 'photoswipe';
      divElement.innerHTML = markup;

      document.body.appendChild(divElement);
      return document.querySelectorAll('.pswp')[0];
    }
  }

  loadScript(url: string, globalName: string): Promise<any> {
    if ((<any>window).require) {
      this.logger.debug('Picturepark Widgets > Load external script via require(): ' + url);
      return new Promise(resolve => {
        (<any>window).require([url], module => {
          resolve(module);
        });
      });
    } else {
      this.logger.debug('Picturepark Widgets > Load external script via tag: ' + url);
      return new Promise<any>(resolve => {
        const scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.async = true;
        scriptTag.onload = () => {
          resolve((<any>window)[globalName]);
        };
        document.head.appendChild(scriptTag);
      });
    }
  }

  loadCss(url): Promise<void> {
    return new Promise<void>(resolve => {
      const linkElement = document.createElement('link');
      linkElement.type = 'text/css';
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      linkElement.onload = () => resolve();

      document.getElementsByTagName('head')[0].appendChild(linkElement);
    });
  }

  getContentViewerType(content: ContentDetail | ShareContentDetail) {
    if (this.getOutput(content, ['Pdf'])) {
      return ContentViewerType.Document;
    } else if (this.getOutput(content, ['AudioSmall'])) {
      return ContentViewerType.Audio;
    } else if (this.getOutput(content, ['VideoLarge', 'VideoSmall'])) {
      return ContentViewerType.Video;
    } else if (content.isVirtual()) {
      return ContentViewerType.Html;
    } else if (this.getOutput(content, ['Preview'])) {
      return ContentViewerType.Image;
    }

    return ContentViewerType.None;
  }

  getViewerOutput(content: ContentDetail | ShareContentDetail, type: ContentViewerType) {
    switch (type) {
      case ContentViewerType.Document:
        return this.getOutput(content, ['Pdf']);
      case ContentViewerType.Audio:
        return this.getOutput(content, ['AudioSmall']);
      case ContentViewerType.Video:
        return this.getOutput(content, ['VideoLarge', 'VideoSmall']);
      case ContentViewerType.Image:
        return this.getOutput(content, ['Preview']);
    }
  }

  getOutput(content: ContentDetail | ShareContentDetail, outputFormatIds: string[]) {
    if (content instanceof ContentDetail) {
      return this.getContentOutput(content, outputFormatIds);
    }
    return this.getShareContentOutput(content, outputFormatIds);
  }

  private getContentOutput(content: ContentDetail, outputFormatIds: string[]) {
    const find = (output: Output) =>
      outputFormatIds.includes(output.outputFormatId) && output.renderingState === OutputRenderingState.Completed;
    return content.displayContentOutputs?.find(find) ?? content.outputs?.find(find);
  }

  private getShareContentOutput(content: ShareContentDetail, outputFormatIds: string[]) {
    const find = (output: ShareOutputBase) =>
      outputFormatIds.includes(output.outputFormatId) && output.renderingState === OutputRenderingState.Completed;
    return (
      content.outputs.filter(i => i instanceof ShareOutputDisplayContent).find(find) ?? content.outputs?.find(find)
    );
  }
}

export interface IShareItem {
  id: string;

  viewerType: ContentViewerType;
  isIcon: boolean;

  displayValues: any;
  previewUrl: string;
  originalUrl: string;
  playerUrl: string;

  detail?: {
    width: number;
    height: number;
  };
}

export enum ContentViewerType {
  Document = 'document',
  Audio = 'audio',
  Video = 'video',
  Image = 'image',
  Html = 'html',
  None = 'None',
}
