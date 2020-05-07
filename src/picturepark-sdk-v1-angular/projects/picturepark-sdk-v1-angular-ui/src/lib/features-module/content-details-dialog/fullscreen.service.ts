import { Injectable } from '@angular/core';
import { ShareOutputBase } from '@picturepark/sdk-v1-angular';

function log(message: string) {
  if (console) {
    console.log(message);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  loading = false;
  scriptsPath = '/assets/picturepark-sdk-v1-widgets/';

  showDetailById(shareItemId: string, shareItems: IShareItem[]) {
    const shareItem = shareItems.filter((i) => i.id === shareItemId)[0];
    if (shareItem.isPdf && shareItems.length === 1) {
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

  async renderVideoPlayer(element: Element, item, width, height) {
    const IndigoPlayer = await this.loadVideoPlayerLibraries();
    const player = IndigoPlayer.init(element, {
      autoplay: true,
      aspectRatio: width && height ? width / height : 16 / 9,
      ui: {
        image: item.previewUrl,
      },
      sources: [
        {
          type: item.isMovie
            ? 'mp4'
            : 'mp4' /* IndigoPlayer does not support mp3, but playback of mp3 defined as mp4 works */,
          src: item.isMovie ? item.videoUrl : item.audioUrl,
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
      // tslint:disable-next-line: no-use-before-declare
      document.removeEventListener('keydown', keydownCallback, true);
    };

    const keydownCallback = (e: KeyboardEvent) => {
      // tslint:disable-next-line: deprecation
      const event = e || <KeyboardEvent>window.event;
      const isEscape = 'key' in event ? event.key === 'Escape' || event.key === 'Esc' : (<any>event).keyCode === 27;
      if (isEscape) {
        closeCallback();
      }
    };

    let pdfLoaded = false;
    iframeElement.onload = (e) => {
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
    return this.loadPhotoSwipe().then((result) => {
      if (!shareItems) {
        shareItems = [shareItem];
      }

      const photoSwipeItems = shareItems.map((i) => {
        if (i.isImage && i.detail) {
          return {
            src: i.previewUrl,
            w: i.detail.width,
            h: i.detail.height,
            origin: i.originalUrl,
          };
        } else if (i.isPdf) {
          return {
            html:
              '<iframe style="position: absolute; left: 0; top: 40px; width: 100%; height: calc(100% - 40px)" ' +
              'src="' +
              this.scriptsPath +
              'pdfjs/web/viewer.html?file=' +
              i.pdfUrl +
              '&closeButton=false" id="pdfjs_' +
              i.id +
              '"></iframe>',
            origin: i.originalUrl,
          };
        } else if (i.isMovie) {
          return {
            html: '<div id="vjsplayer_' + i.id + '"></div>',
            origin: i.originalUrl,
          };
        } else if (i.isAudio) {
          return {
            html: '<div id="vjsplayer_' + i.id + '"></div>',
            origin: i.originalUrl,
          };
        } else if (!i.isBinary) {
          return {
            html:
              '<br /><br /><br /><br /><div class="picturepark-widget-content-preview"> ' +
              i.displayValues.detail +
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
            console.log(ex);
          }
        });
      };

      if (shareItems.filter((i) => i.isMovie || i.isAudio || i.isPdf).length > 0) {
        const updatePlayers = async () => {
          cleanupPlayers();

          const item = shareItems[photoSwipe.getCurrentIndex()];
          if (item.isMovie || item.isAudio) {
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
          for (const i of shareItems.filter((s) => s.isPdf)) {
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

      return new Promise((resolve) => {
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
        this.loadCss('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.css'),
        this.loadCss('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.css'),
        this.loadScript('https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.min.js', 'PhotoSwipe'),
        this.loadScript(
          'https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe-ui-default.min.js',
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
      log('Picturepark Widgets > Load external script via require(): ' + url);
      return new Promise((resolve) => {
        (<any>window).require([url], (module) => {
          resolve(module);
        });
      });
    } else {
      log('Picturepark Widgets > Load external script via tag: ' + url);
      return new Promise<any>((resolve) => {
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
    return new Promise<void>((resolve) => {
      const linkElement = document.createElement('link');
      linkElement.type = 'text/css';
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      linkElement.onload = () => resolve();

      document.getElementsByTagName('head')[0].appendChild(linkElement);
    });
  }
}

export interface IShareItem {
  id: string;

  isImage: boolean;
  isPdf: boolean;
  isMovie: boolean;
  isAudio: boolean;
  isBinary: boolean;

  displayValues: any;
  previewUrl: string;

  originalUrl: string;
  videoUrl: string;
  audioUrl: string;
  pdfUrl: string;

  detail?: {
    width: number;
    height: number;
  };

  outputs: ShareOutputBase[];
}
