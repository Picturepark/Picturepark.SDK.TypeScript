declare var PhotoSwipe;
declare var PhotoSwipeUI_Default;

export class PictureparkPlayers {
    static showDetail(cacheToken: string, contentId: string) {
        let share = (<any>document).pictureparkShareCache[cacheToken];
        let embedItem: any = share.EmbedContentItems.filter(i => i.ContentId === contentId && i.OutputFormatId === "Preview")[0];
        if (!embedItem)
            embedItem = share.EmbedContentItems.filter(i => i.ContentId === contentId && i.OutputFormatId === "Original")[0];

        let selection: any = share.ContentSelections
            .reduce((c, s) => c.concat(s.Outputs), [])
            .filter(i => i.ContentId === contentId && i.OutputFormatId === embedItem.OutputFormatId)[0];

        // TODO: Support more players
        let element = document.querySelectorAll('.pswp')[0];
        if (!element) {
            this.loadImagePlayer(() => {
                element = document.querySelectorAll('.pswp')[0];
                this.showItem(element, embedItem, selection);
            });
        } else {
            this.showItem(element, embedItem, selection);
        }
    }

    static showItem(element, embedItem, selection) {
        var items = [{
            src: embedItem.Url,
            w: selection.Detail.Width,
            h: selection.Detail.Height
        }];
        
        var gallery = new PhotoSwipe(element, PhotoSwipeUI_Default, items, { index: 0 })
        gallery.init();
    }

    static loadScript(url: string, loaded: any): void {
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.async = true;
        if (loaded)
            scriptTag.onload = loaded;

        document.head.appendChild(scriptTag);
    }

    static loadCss(url): void {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    static loadImagePlayer(loaded: any) {
        this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.css");
        this.loadCss("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/default-skin/default-skin.css");

        this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe.min.js", () => {
            this.loadScript("https://cdn.rawgit.com/dimsemenov/PhotoSwipe/master/dist/photoswipe-ui-default.min.js", () => {
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

                var para = document.createElement("div");
                para.id = "photoswipe";
                para.innerHTML = markup;

                document.body.appendChild(para);

                loaded();
            });
        })
    }
}