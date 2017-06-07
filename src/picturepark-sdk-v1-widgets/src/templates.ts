export class PictureparkTemplates {
  // TODO: Create template factory with css injection outside of template

  static getTemplate(templateId: string): string {
    if (templateId === "basic") {
      return this.getBasic();
    } else if (templateId === "card") {
      return this.getCard();
    } else if (templateId === "list") {
      return this.getList();
    } else {
      return "Template '" + templateId + "' not found.";
    }
  }

  private static getBasic(): string {
    return `
      {% if config.renderStyles %}
      <style>
        .picturepark-widget-share-inner-{{id}} {
          float: left;
          position: relative;
          border: 1px solid gray;
          border-radius: 1px;
        }
        .picturepark-widget-share-legend-{{id}} {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0px;
          background: gray;
          padding: 4px;
        }
        .picturepark-widget-share-{{id}}:hover
        .picturepark-widget-share-legend-{{id}} {
          opacity: 0.8;
        }
        .picturepark-widget-share-title-{{id}} {
          font-weight: bold;
          color: white;
        }
        .picturepark-widget-share-description-{{id}} {
          color: white;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-share-inner picturepark-widget-share-inner-{{id}}" style="width: {{ config.width }}px">
        <div class="picturepark-widget-share-legend picturepark-widget-share-legend-{{id}}">
          <div class="picturepark-widget-share-title picturepark-widget-share-title-{{id}}">{{ share.Name }}</div>
          {% if share.Description %}
            <div class="picturepark-widget-share-description picturepark-widget-share-description-{{id}}">{{ share.Description }}</div>
          {% endif %}
        </div>
        {% assign selection = share.ContentSelections[0] %}
        <div class="picturepark-widget-share-media picturepark-widget-share-media-{{id}}">
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.Id }}')">
            {% assign width = config.width | plus: -2 %}
            <img src="{% resizeById selection.Id 'Preview' width config.height %}" />
          </a>
        </div>
      </div>`;
  }

  private static getCard(): string {
    return `
      {% if config.renderStyles %}
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
      {% endif %}

      <div class="picturepark-widget-card-inner" style="width: {{ config.width }}px">
        {% assign selection = share.ContentSelections[0] %}
        <div class="picturepark-widget-card-media">
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.Id }}')">
            {% assign width = config.width | plus: -2 %}
            <img class="picturepark-widget-card-img" src="{% resizeById selection.Id 'Preview' width config.height %}" />
          </a>
          <div style="position: absolute; bottom: 4px; right: 8px;">
            <svg style="width: 120px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 690.93 75.96">
              <defs>
                <style>.cls-1{fill:#5b7d89;}.cls-2{fill:#818181;}.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-4,.cls-5{filter:url(#AI_Shadow_1);}.cls-4{font-size:67.44px;font-family:Roboto-Regular, Roboto;}.cls-5{font-size:46.07px;font-family:Roboto-Light, Roboto;letter-spacing:-0.01em;}.cls-6{letter-spacing:0em;}</style>
                <filter id="AI_Shadow_1" name="AI_Shadow_1"><feGaussianBlur result="blur" stdDeviation="2" in="SourceAlpha"/>
                  <feOffset result="offsetBlurredAlpha" dx="4" dy="4" in="blur"/><feMerge><feMergeNode in="offsetBlurredAlpha"/>
                  <feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <title>powered-by-pp</title>
              <path class="cls-1" d="M344.17,152.27V117.83a4.58,4.58,0,0,0-4.28-4.83h-53.6a4.58,4.58,0,0,0-4.29,4.83v34.44Z" transform="translate(-19.07 -110.92)"/>
              <path class="cls-2" d="M282,161.87v11.31a4.58,4.58,0,0,0,4.28,4.82h53.6a4.57,4.57,0,0,0,4.28-4.82V161.87Z" transform="translate(-19.07 -110.92)"/>
              <polygon class="cls-3" points="325.09 50.95 262.93 50.95 262.93 41.35 325.09 41.35 325.09 50.95 325.09 50.95"/>
              <text class="cls-4" transform="translate(347.46 57.69)">Picturepark</text>
              <text class="cls-5" transform="translate(0 57.66)">P<tspan class="cls-6" x="28.07" y="0">owered by</tspan></text>
            </svg>
          </div>
        </div>
        <div class="picturepark-widget-card-content">
          <div class="picturepark-widget-card-title">{{ share.Name }}</div>
          {% if share.Description %}
            <div class="picturepark-widget-card-description">{{ share.Description }}</div>
          {% endif %}
          <hr class="picturepark-widget-card-hr">
          <div class="picturepark-widget-card-sharedby">
            <img src="//www.gravatar.com/avatar/{{ share.Audit.CreatedByUser.EmailAddress | md5 }}?m=dd&size=32" class="picturepark-widget-card-gravatar" />
            Shared by: {{ share.Audit.CreatedByUser.FirstName }} {{ share.Audit.CreatedByUser.LastName }}
            </div>
        </div>
      </div>`;
  }

  private static getList(): string {
    return `
      {% if config.renderStyles %}
      <style>
        .picturepark-widget-share {
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
        }
        .picturepark-widget-list {
          padding: 0px 12px 0px 12px;
          position: relative;
          border: 1px solid lightgray;
          border-radius: 4px;
        }
        .picturepark-widget-list-header {
          font-weight: bold;
          font-size: 16px;
          border-bottom: 2px solid #DCDCDC; 
          margin: 12px 0 16px 0; 
          padding: 0 0 12px 0; 
        }
        .picturepark-widget-list-header-download {
          font-size: 10pt; 
          padding-top: 3px; 
        }
        .picturepark-widget-list-body {
          list-style-type: none;
          margin: 0 0 8px 0; 
          padding: 0;
        }
        .picturepark-widget-list-body li {
          margin-bottom: 8px;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-list" style="width: {{ config.width }}px">
        <h1 class="picturepark-widget-list-header">
          {% translate 'List.HeaderDownloads' %}
          <span style="float:right" class="picturepark-widget-list-header-download">
            <a href="{{ config.server }}/Embed/{{ config.token }}">{% translate 'List.ButtonDownloadAll' %}</a>
          </span>
        </h1>
        <ul class="picturepark-widget-list-body">
        {% for selection in share.ContentSelections %}
          <li>
            <span style="float:right">
              <a href="{{selection.Url}}">
                <svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg" 
                     xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title/><desc/><defs/>
                  <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
                    <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">
                      <g id="file-download" transform="translate(383.000000, 213.500000)">
                        <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </span>
            <span>
              <strong>{{ selection.DisplayValues.List }}</strong><br />
              TBD
            </span>
          </li>
        {% endfor %}
        </ul>
      </div>`;
  }
}