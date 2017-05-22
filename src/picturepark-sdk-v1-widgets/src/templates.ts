export class PictureparkTemplates
{
    // TODO: Create template factory with css injection outside of template
    
    static getTemplate(templateId: string, width: number, height: number): string {
      if (templateId === "basic") {
        return this.getBasic(width, height);
      } else if(templateId === "card") {
        return this.getCard(width, height);
      } else {
        return "Template not found";
      }
    }

    private static getBasic(width: number, height: number): string {
      width = width || 400;
      height = height || 400;
        var embedMarkup = `
            <style>
              .picturepark-widget-share-inner {
                float: left;
                position: relative;
                border: 1px solid gray;
                border-radius: 1px;
              }
              .picturepark-widget-share-legend {
                opacity: 0;
                position: absolute;
                width: 100%;
                bottom: 0px;
                background: gray;
                padding: 4px;
              }
              .picturepark-widget-share:hover .picturepark-widget-share-legend {
                opacity: 0.8;
              }
              .picturepark-widget-share-title {
                font-weight: bold;
                color: white;
              }
              .picturepark-widget-share-description {
                color: white;
              }
            </style>
            <div class="picturepark-widget-share-inner" style="width: ${ width }px">
              <div class="picturepark-widget-share-legend">
                <div class="picturepark-widget-share-title">{{ Name }}</div>
                <div class="picturepark-widget-share-description">{{ Description }}</div>
              </div>
              {% for selection in ContentSelections %}
                <div class="picturepark-widget-share-media">
                  <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ CacheToken }}', '{{ selection.Id }}')">
                    <img src="{% resizeById selection.Id 'Preview' ${ width } ${ height } %}" />
                  </a>
                </div>
              {% endfor %}
            </div>
        `;
        return embedMarkup;
    }

    private static getCard(width: number, height: number): string {
      width = width || 400;
      height = height || 400;

        var embedMarkup = `
            <style>
              .picturepark-widget-share {
                float: left;
                margin-right: 4px;
                margin-bottom: 4px;
              }
              .picturepark-widget-card-inner {
                position: relative;
                border: 1px solid lightgray;
                border-radius: 0 0 4px 4px;
              }
              .picturepark-widget-card-content {
                padding: 10px;
              }
              .picturepark-widget-card-title {
                font-weight: bold;
              }
              .picturepark-widget-card-description {
              }
              .picturepark-widget-card-media {
                position: relative;
                line-height: 0;
              }
              .picturepark-widget-card-img {
                margin: 0;
              }
              .picturepark-widget-card-hr {
                color:lightgray;
                margin-top: 8px;
                margin-bottom: 8px;
              }
              .picturepark-widget-card-gravatar {
                border-radius: 50%;
                margin-top: 0px;
              }
              .picturepark-widget-card-sharedby {
                vertical-align: middle;
              }
            </style>
            <div class="picturepark-widget-card-inner" style="width: ${ width }px">
              {% for selection in ContentSelections %}
                <div class="picturepark-widget-card-media">
                  <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ CacheToken }}', '{{ selection.Id }}')">
                    <img class="picturepark-widget-card-img" src="{% resizeById selection.Id 'Preview' ${ width - 2 } ${ height } %}" />
                  </a>
                  <div style="position: absolute; bottom: 4px; right: 8px;">
                    <svg style="width: 120px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 690.93 75.96"><defs><style>.cls-1{fill:#5b7d89;}.cls-2{fill:#818181;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4,.cls-5{filter:url(#AI_Shadow_1);}.cls-4{font-size:67.44px;font-family:Roboto-Regular, Roboto;}.cls-5{font-size:46.07px;font-family:Roboto-Light, Roboto;letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}</style><filter id="AI_Shadow_1" name="AI_Shadow_1"><feGaussianBlur result="blur" stdDeviation="2" in="SourceAlpha"/><feOffset result="offsetBlurredAlpha" dx="4" dy="4" in="blur"/><feMerge><feMergeNode in="offsetBlurredAlpha"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><title>powered-by-pp</title><path class="cls-1" d="M344.17,152.27V117.83a4.58,4.58,0,0,0-4.28-4.83h-53.6a4.58,4.58,0,0,0-4.29,4.83v34.44Z" transform="translate(-19.07 -110.92)"/><path class="cls-2" d="M282,161.87v11.31a4.58,4.58,0,0,0,4.28,4.82h53.6a4.57,4.57,0,0,0,4.28-4.82V161.87Z" transform="translate(-19.07 -110.92)"/><polygon class="cls-3" points="325.09 50.95 262.93 50.95 262.93 41.35 325.09 41.35 325.09 50.95 325.09 50.95"/><text class="cls-4" transform="translate(347.46 57.69)">Picturepark</text><text class="cls-5" transform="translate(0 57.66)">P<tspan class="cls-6" x="28.07" y="0">owered by</tspan></text></svg>
                  </div>
                </div>
              {% endfor %}
              <div class="picturepark-widget-card-content">
                <div class="picturepark-widget-card-title">{{ Name }}</div>
                <div class="picturepark-widget-card-description">{{ Description }}</div>
                <hr class="picturepark-widget-card-hr">
                <div class="picturepark-widget-card-sharedby">
                  <img src="//www.gravatar.com/avatar/{{ Audit.CreatedByUser.EmailAddress | md5 }}?m=dd&size=32" class="picturepark-widget-card-gravatar" />
                  Shared by: {{ Audit.CreatedByUser.FirstName }} {{ Audit.CreatedByUser.LastName }}
                  </div>
              </div>
            </div>
        `;
        return embedMarkup;
    }
}