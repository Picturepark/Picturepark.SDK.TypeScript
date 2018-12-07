/// <reference path="./typings/pdfjs.d.ts" />
/// <reference path="../../picturepark-sdk-v1-fetch/dist/picturepark.d.ts" />

import * as picturepark from 'picturepark';

function log(message: string) {
  if (console) {
    console.log(message);
  }
}

export class PictureparkPlayers {
  static loading = false;
  static scriptsPath = undefined;

  static imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  static videoExtensions = ['.mov', '.mp4', '.mp3'];

  static showPrevious(token: string, elementId: string) {
    let share = (<any>document).pictureparkShareCache[token];
    let gallery = PictureparkPlayers.getGallery(elementId);

    if (share.player)
      share.player.stop();

    let newIndex = gallery.index - 1;
    if (newIndex < 0)
      newIndex = gallery.children.length - 1;

    PictureparkPlayers.showGalleryItem(gallery, newIndex);
  }

  static showNext(token: string, elementId: string) {
    let share = (<any>document).pictureparkShareCache[token];
    let gallery = PictureparkPlayers.getGallery(elementId);

    if (share.player)
      share.player.stop();

    let newIndex = gallery.index + 1;
    if (newIndex === gallery.children.length)
      newIndex = 0;

    PictureparkPlayers.showGalleryItem(gallery, newIndex);
  }

  private static showGalleryItem(gallery: any, newIndex: number) {
    if (gallery.index !== newIndex) {
      gallery.children[gallery.index].element.style.display = 'none';
      gallery.children[newIndex].element.style.display = '';
    }
  }

  private static getGallery(elementId: string) {
    let children = [];
    let visibleIndex = -1;

    let element = document.getElementById(elementId);
    if (element) {
      for (var i = 0; i < element.children.length; i++) {
        let child = element.children[i] as HTMLDivElement;
        let isVisible = child.style.display !== "none";
        children.push({ index: i, visible: isVisible, element: child });
        if (isVisible) {
          visibleIndex = i;
        }
      }
      return { children: children, index: visibleIndex };
    } else {
      // no website gallery found (e.g. not available in the gallery template)
      return null;
    }
  }

  static showDetail(token: string, shareItemId: string, widgetId: string) {
    if (PictureparkPlayers.loading) return;
    PictureparkPlayers.loading = true;

    let share = (<any>document).pictureparkShareCache[token];
    PictureparkPlayers.showDetailById(shareItemId, share.items, widgetId);
  }

  static showDetailById(shareItemId: string, shareItems: IShareItem[], widgetId?: string) {
    let shareItem = shareItems.filter(i => i.id === shareItemId)[0];
    if (shareItem.isPdf && shareItems.length === 1) {
      this.showPdfJsItem(shareItem);
      PictureparkPlayers.loading = false;
    } else if (shareItem.isImage || shareItem.isMovie || shareItem.isPdf || !shareItem.isBinary) {
      let savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.showPhotoSwipeItem(shareItem, shareItems, widgetId ? 'gallery_' + widgetId : undefined).then(() => {
        PictureparkPlayers.loading = false;
        document.body.style.overflow = savedOverflow;
      });
    } else {
      // download file
      var link = document.createElement("a");
      link.href = shareItem.originalUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      PictureparkPlayers.loading = false;
    }
  }

  private static loadedPlayers: any[] = [];

  static disposeVideoPlayer(player: any) {
    let existingPlayer = PictureparkPlayers.loadedPlayers.filter(p => p.element === player.id_)[0];
    if (existingPlayer) {
      log('Picturepark Widgets > Disposed videojs player');
      player.dispose();
      PictureparkPlayers.loadedPlayers = PictureparkPlayers.loadedPlayers
        .filter(p => p.player !== player);
    } else {
      log('Picturepark Widgets > Player could not be disposed' + player);
    }
  }

  static renderVideoPlayerIfNeeded(item: { previewUrl: string, originalUrl: string, originalFileExtension: string }, element: any, width: any, height: any) {
    let playerInfo = PictureparkPlayers.loadedPlayers.filter(p => p.element === element.id_)[0];
    if (playerInfo) {
      return playerInfo.promise.then(player => {
        let element = document.getElementById(playerInfo.element);
        if (!element || !element.tagName || element.tagName.toLowerCase() === 'video') {
          if (player) {
            PictureparkPlayers.disposeVideoPlayer(player);
          }
          return PictureparkPlayers.renderVideoPlayer(element, item, width, height).then((player) => {
            playerInfo.player = player;
            log('Picturepark Widgets > Reloaded videojs player: ' + element.id);
            return player;
          });
        } else {
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
      return new Promise<any>((resolve) => {
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

        player.src({ type: 'video/mp4', src: item.originalUrl });
        return player;
      });
    });
  }

  static loadVideoPlayerLibraries() {
    if ((<any>window).videojs)
      return Promise.resolve((<any>window).videojs);

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
    iframeElement.src = PictureparkPlayers.scriptsPath + 'pdfjs-dist/web/viewer.html?file=' + item.originalUrl;

    let savedOverflow = document.body.style.overflow;
    let keydownCallback = (e: KeyboardEvent) => {
      let event = e || <KeyboardEvent>window.event;
      let isEscape = "key" in event ? (event.key == "Escape" || event.key == "Esc") : ((<any>event).keyCode == 27);
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

  static showPhotoSwipeItem(shareItem: IShareItem, shareItems?: IShareItem[], galleryElementId?: string) {
    return this.loadPhotoSwipe().then(result => {
      if (!shareItems) {
        shareItems = [shareItem];
      }

      let photoSwipeItems = shareItems.map(i => {
        if (i.isImage) {
          return {
            src: i.previewUrl,
            w: i.detail.width,
            h: i.detail.height,
            origin: i.originalUrl
          };
        } else if (i.isPdf) {
          return {
            html: '<iframe style="position: absolute; left: 0; top: 40px; width: 100%; height: calc(100% - 40px)" ' +
              'src="' + PictureparkPlayers.scriptsPath + 'pdfjs-dist/web/viewer.html?file=' + i.originalUrl + '&closeButton=false" id="pdfjs_' + i.id + '"></iframe>',
            origin: i.originalUrl
          };
        } else if (i.isMovie) {
          return {
            html: '<video class="video-js vjs-big-play-centered" id="vjsplayer_' + i.id + '"></video>',
            origin: i.originalUrl
          };
        } else if (!i.isBinary) {
          return {
            html: '<br /><br /><br /><br /><div class="picturepark-widget-content-preview"> ' + shareItem.displayValues.detail + '</div>',
            origin: i.originalUrl
          };
        } else {
          return {
            html: '<br /><br /><br /><br />Not supported.',
            origin: i.originalUrl
          };
        }
      });

      var photoSwipe = new result.photoSwipe(result.element, result.photoSwipeDefault, photoSwipeItems, { index: shareItems.indexOf(shareItem) });
      photoSwipe.options.history = false;
      photoSwipe.options.shareButtons = [{ id: 'download', label: 'Download', url: '{{raw_image_url}}', download: true }];
      photoSwipe.options.getImageURLForShare = (shareButtonData: any) => {
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

      if (shareItems.filter(i => i.isMovie || i.isPdf).length > 0) {
        var updatePlayers = () => {
          if (shareItems.filter(i => i.isMovie).length > 0) {
            PictureparkPlayers.loadVideoPlayerLibraries().then(() => {
              for (let item of shareItems.filter(i => i.isMovie)) {
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
            let element: any = document.getElementById(elementId);
            if (element) {
              element.onload = () => {
                if (element.contentWindow.location.href === 'about:blank')
                  photoSwipe.close();
              }
            }
          }
        };

        photoSwipe.listen('afterChange', () => {
          updatePlayers();
          photoSwipe.listen('beforeChange', updatePlayers);
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

  static loadPhotoSwipe(): Promise<{ element: Element, photoSwipe: any, photoSwipeDefault: any }> {
    if ((<any>window).PhotoSwipe)
      return Promise.resolve({
        element: PictureparkPlayers.getPhotoSwipeElement(),
        photoSwipe: (<any>window).PhotoSwipe,
        photoSwipeDefault: (<any>window).PhotoSwipeUI_Default
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

  static loadScript(url: string, globalName: string): Promise<any> {
    if ((<any>window).require) {
      log('Picturepark Widgets > Load external script via require(): ' + url);
      return new Promise(resolve => {
        (<any>window).require([url], (module) => {
          resolve(module);
        });
      });
    } else {
      log('Picturepark Widgets > Load external script via tag: ' + url);
      return new Promise<any>((resolve) => {
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.async = true;
        scriptTag.onload = () => {
          resolve((<any>window)[globalName]);
        };
        document.head.appendChild(scriptTag);
      });
    }
  }

  static loadCss(url): Promise<void> {
    return new Promise<void>((resolve) => {
      var linkElement = document.createElement("link");
      linkElement.type = "text/css";
      linkElement.rel = "stylesheet";
      linkElement.href = url;
      linkElement.onload = () => resolve();

      document.getElementsByTagName("head")[0].appendChild(linkElement);
    });
  }
}

interface IShareItem {
  id: string;

  isImage: boolean;
  isPdf: boolean;
  isMovie: boolean;
  isBinary: boolean;

  displayValues: any;
  previewUrl: string;

  originalUrl: string;
  originalFileExtension: string;

  detail: {
    width: number;
    height: number;
  }
}