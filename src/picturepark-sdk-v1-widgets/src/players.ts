/// <reference path="./typings/pdfjs.d.ts" />
/// <reference path="../../picturepark-sdk-v1-fetch/dist/picturepark.d.ts" />

import * as picturepark from 'picturepark';

declare var PhotoSwipe;
declare var PhotoSwipeUI_Default;
declare var jwplayer;

export class PictureparkPlayers {
  static loading = false;

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

    gallery.children[gallery.index].element.style.display = 'none';
    gallery.children[newIndex].element.style.display = '';
  }

  static showNext(token: string, elementId: string) {
    let share = (<any>document).pictureparkShareCache[token];
    let gallery = PictureparkPlayers.getGallery(elementId);

    if (share.player)
      share.player.stop();

    let newIndex = gallery.index + 1;
    if (newIndex === gallery.children.length)
      newIndex = 0;

    gallery.children[gallery.index].element.style.display = 'none';
    gallery.children[newIndex].element.style.display = '';
  }

  private static getGallery(elementId: string) {
    let element = document.getElementById(elementId);
    let children = [];
    let visibleIndex = -1;
    for (var i = 0; i < element.children.length; i++) {
      let child = element.children[i] as HTMLDivElement;
      let isVisible = child.style.display !== "none";
      children.push({ index: i, visible: isVisible, element: child });
      if (isVisible) {
        visibleIndex = i;
      }
    }
    return { children: children, index: visibleIndex };
  }

  static showDetail(token: string, id: string) {
    if (PictureparkPlayers.loading) return;
    PictureparkPlayers.loading = true;

    let share = (<any>document).pictureparkShareCache[token];
    let item = share.items.filter(i => i.id === id)[0];

    if (item.originalFileExtension === '.pdf') {
      this.showPdfJsItem(item);
      PictureparkPlayers.loading = false;
    } else if (item.isImage) {
      this.showPhotoSwipeItem(item, share.items).then(() => {
        PictureparkPlayers.loading = false;
      });
    } else {
      var link = document.createElement("a");
      link.href = item.originalUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      PictureparkPlayers.loading = false;
    }
  }

  static renderVideoPlayer(config: any, id: string, elementId: string) {
    let share = (<any>document).pictureparkShareCache[config.token];
    let item = share.items.filter(i => i.id === id)[0];

    this.loadScript("https://content.jwplatform.com/libraries/L7fM8L0h.js").then(() => {
      share.player = jwplayer(elementId).setup({
        autostart: false,
        image: item.previewUrl,
        file: item.originalUrl,
        type: item.originalFileExtension.substr(1),
        width: parseInt(config.width),
        height: parseInt(config.height)
      });
    });
  }

  static getScriptsPath() {
    let scriptFile = 'picturepark-widgets.js';
    let elements = document.getElementsByTagName('script');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.src.indexOf(scriptFile) !== -1)
        return element.src.substring(0, element.src.length - scriptFile.length)
    }
    return undefined;
  }

  static showPdfJsItem(item) {
    let iframeElement = document.createElement("iframe");
    iframeElement.style.position = 'fixed';
    iframeElement.style.left = '0';
    iframeElement.style.top = '0';
    iframeElement.style.width = '100%';
    iframeElement.style.height = '100%';
    iframeElement.src = this.getScriptsPath() + '/pdfjs/viewer.html?file=' + item.originalUrl;

    let prevOverflow = document.body.style.overflow;
    let keydownCallback = (e: KeyboardEvent) => {
      let event = e || <KeyboardEvent>window.event;
      let isEscape = "key" in event ? (event.key == "Escape" || event.key == "Esc") : (event.keyCode == 27);
      if (isEscape) {
        closeCallback();
      }
    };

    let closeCallback = () => {
      document.body.removeChild(iframeElement);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', keydownCallback, true);
    };

    iframeElement.onload = (e) => {
      document.body.style.overflow = 'hidden';
      if (iframeElement.contentWindow.location.href === 'about:blank')
        closeCallback();
    };

    document.addEventListener('keydown', keydownCallback, true);
    document.body.appendChild(iframeElement);
  }

  static showPhotoSwipeItem(item, items: any[]) {
    return this.loadPhotoSwipe().then(element => {
      let hasOnlyImages = items.filter(i => i.isImage).length === items.length;

      let photoSwipeItems = hasOnlyImages ? items.map(i => {
        return {
          src: i.originalUrl,
          w: i.detail.Width,
          h: i.detail.Height
        };
      }) : [{
        src: item.originalUrl,
        w: item.detail.Width,
        h: item.detail.Height
      }];

      var gallery = new PhotoSwipe(element, PhotoSwipeUI_Default, photoSwipeItems, { index: items.indexOf(item) })
      gallery.init();
    });
  }

  static loadPhotoSwipe(): Promise<Element> {
    let element = document.querySelectorAll('.pswp')[0];
    if (element)
      return Promise.resolve(element);

    return Promise.all([
      this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.css"),
      this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.css"),
      this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.min.js"),
      this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe-ui-default.min.js")
    ]).then(() => {
      var markup = `
        <!-- Root element of PhotoSwipe. Must have class pswp. -->
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

            <!-- Background of PhotoSwipe. 
                It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg"></div>

            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">

                <!-- Container that holds slides. 
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>

                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">

                    <div class="pswp__top-bar">

                        <!--  Controls are self-explanatory. Order can be changed. -->

                        <div class="pswp__counter"></div>

                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
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

                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>

                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>

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
    });
  }

  static loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve) => {
      var scriptTag = document.createElement('script');
      scriptTag.src = url;
      scriptTag.async = true;
      scriptTag.onload = () => resolve();
      document.head.appendChild(scriptTag);
    });
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