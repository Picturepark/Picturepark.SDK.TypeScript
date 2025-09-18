export class PictureparkTemplates {
  // TODO: Create template factory with css injection outside of template

  static getTemplate(templateId: string): string {
    if (templateId === "card") {
      return this.getCard();
    } else if (templateId === "gallery") {
      return this.getGallery();
    } else if (templateId === "list") {
      return this.getList();
    } else {
      return "Template '" + templateId + "' not found.";
    }
  }

  private static getGallery(): string {
    return `
      {% if config.renderStyles %}
      <style>
        * {
          box-sizing: border-box;
        }

       .picturepark-widget-content-preview {
         background-color: white;
         padding: 40px;
        }
        .picturepark-widget-gallery-{{id}} {
          float: left;
          width: 100%;
          position: relative;
          margin-right: -4px;
          margin-bottom: -4px;
        }
        .picturepark-widget-gallery-item-{{id}} {
          overflow: hidden;
          background: #eeeeee;
          margin-right: 4px;
          margin-bottom: 4px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .picturepark-widget-gallery-item-image-{{id}} {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .picturepark-widget-gallery-item-thumbnail-{{id}} {
          
        }

        .picturepark-widget-gallery-item-title-{{id}} {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0px;
          background: gray;
          padding: 4px;
          color: white;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-title-{{id}} {
          opacity: .8;
        }

        .picturepark-widget-gallery-item-preview-{{id}} {
          opacity: 0;
          position: absolute;
          left: 43%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: gray;
          border-radius: 50%;
          color: white;
          padding: 10px;
          cursor: pointer;
          display: flex;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-preview-{{id}} {
          opacity: .8;
        }

       .picturepark-widget-gallery-item-outputs-{{id}} {
          opacity: 0;
          position: absolute;
          left: 57%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: gray;
          border-radius: 50%;
          color: white;
          padding: 10px;
          cursor: pointer;
          display: flex;
        }
        .picturepark-widget-gallery-item-{{id}}:hover 
        .picturepark-widget-gallery-item-outputs-{{id}} {
          opacity: .8;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} {
          position: absolute;
          display: none;
          background-color: #f1f1f1;
          min-width: 160px;
          max-height: 340px;
          overflow: auto;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}}.show {
          display: block;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        .picturepark-widget-gallery-item-outputs-dropdown-{{id}} a:hover {
          background-color: #ddd;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-gallery picturepark-widget-gallery-{{id}}">
        {% assign width = config.width | plus: -2 %}
        {% assign height = config.height | plus: -1 %}
        {% for selection in share.items %}
          <div class="picturepark-widget-gallery-item picturepark-widget-gallery-item-{{id}}" style="float: left; width: {{ config.width }}px; height: {{ config.height }}px">
            {% if selection.isMovie and config.showPlayers == true %}
              <video class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></video>
            {% elsif selection.isAudio and config.showPlayers == true %}
              <audio class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></audio>
            {% else %}
              {% if selection.isBinary == false %}
                <div class="picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}">{{ selection.displayValues.thumbnail }}</div>
              {% else %}
                <img class="picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
                <div class="picturepark-widget-gallery-item-title picturepark-widget-gallery-item-title-{{id}}">{{selection.displayValues.name}}</div>
              {% endif %}
              <div class="picturepark-widget-gallery-item-preview picturepark-widget-gallery-item-preview-{{id}}" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
                </svg>
              </div>
              <div class="picturepark-widget-gallery-item-outputs-{{id}}">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
	            </svg>
              </div>
              <div class="picturepark-widget-gallery-item-outputs-dropdown-{{id}}">
                {% for output in selection.outputs %}
                  <a href="{{ output.downloadUrl }}" target="_blank" download>{% translate output.outputFormatId %}</a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        {% endfor %}
    </div>
    <br style="clear: both;" />`;
  }

  private static getCard(): string {
    return `
      {% if config.renderStyles %}
      <style>
       .picturepark-widget-content-preview {
         background-color: white;
         padding: 40px;
        }
        .picturepark-widget-{{id}} {
          all: initial;
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          font-size: 13px;
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
        }
        .picturepark-widget-card-{{id}} {
          border: 1px solid lightgray;
          border-radius: 0 0 4px 4px;
        }

        /** Footer */
        .picturepark-widget-card-footer-content-{{id}} {
          padding: 10px;
        }
        .picturepark-widget-card-footer-title-{{id}} {
          font-weight: bold;
        }
        .picturepark-widget-card-footer-description-{{id}} {
        }
        .picturepark-widget-card-footer-gravatar-{{id}} {
          border-radius: 50%;
          margin-top: 0px;
        }
        .picturepark-widget-card-footer-gravatar-{{id}} {
          vertical-align: middle;
        }
        .picturepark-widget-card-footer-hr-{{id}} {
          color: lightgray;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        /** Gallery */
        .picturepark-widget-card-gallery-{{id}} {
          line-height: 0;
          overflow: hidden;
          max-height: {{ config.width }};
        }
        .picturepark-widget-card-gallery-image-{{id}} {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        /** Overlay */
        .picturepark-widget-card-overlay-{{id}} {
          opacity: 0;
          position: absolute;
          width: 100%;
          bottom: 0px;
          background: gray;
          padding: 4px;
        }
        .picturepark-widget-{{id}}:hover
        .picturepark-widget-card-overlay-{{id}} {
          opacity: 0.8;
        }
        .picturepark-widget-card-overlay-title-{{id}} {
          font-weight: bold;
          color: white;
        }
        .picturepark-widget-card-overlay-description-{{id}} {
          color: white;
        }

        /** Navigation */
        .picturepark-widget-card-navigation-previous-{{id}} {
          position: absolute; 
          left: 0; 
          top: 0; 
          bottom: 0; 
          width: 30px; 
          margin-top: 50px; 
          margin-bottom: 50px
        }
        .picturepark-widget-card-navigation-next-{{id}} {
          position: absolute; 
          right: 0; 
          top: 0; 
          bottom: 0; 
          width: 30px; 
          margin-top: 50px; 
          margin-bottom: 50px
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-card picturepark-widget-card-{{id}}" style="width: {{ config.width }}px">
        <div style="position: relative">
          {% assign width = config.width | plus: -2 %}
          {% assign height = config.height | plus: -1 %}
          <div id="gallery_{{ id }}" style="height: {{ height }}px; width: {{ width }}px; position: relative">
            {% for selection in share.items %}
            <div class="picturepark-widget-card-gallery picturepark-widget-card-gallery-{{id}}"
            {% if forloop.first == false %}style="display: none"{% endif %}>
            {% if selection.isMovie and config.showPlayers != false %}
              <video class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></video>
            {% elsif selection.isAudio and config.showPlayers != false %}
              <audio class="video-js" id="vjsplayer_{{ forloop.index0 }}_{{ id }}"></audio>
            {% else %}
              <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
              {% if selection.isBinary == false %}
                <div class="picturepark-widget-gallery-item-thumbnail picturepark-widget-gallery-item-thumbnail-{{id}}">{{ selection.displayValues.thumbnail }}</div>
              {% else %}
                <img class="picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
              {% endif %}
              </a>
              {% endif %}
              
              {% if config.showLogo %}
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
                  <text class="cls-4" transform="translate(347.46 57.69)">Fotoware Alto</text>
                  <text class="cls-5" transform="translate(0 57.66)">P<tspan class="cls-6" x="28.07" y="0">owered by</tspan></text>
                </svg>
              </div>
              {% endif %}
            </div>
            {% endfor %}
          </div>

          {% if config.showOverlay %}
            <div class="picturepark-widget-card-overlay picturepark-widget-card-overlay-{{id}}">
              <div class="picturepark-widget-card-overlay-title picturepark-widget-card-overlay-title-{{id}}">{{ share.name }}</div>
              {% if share.description %}
                <div class="picturepark-widget-card-overlay-description picturepark-widget-card-overlay-description-{{id}}">{{ share.description }}</div>
              {% endif %}
            </div>
          {% endif %}

          {% if config.showNavigation and share.items.length > 1 %}
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showPrevious('{{ config.token }}', 'gallery_{{ id }}')"
            class="picturepark-widget-card-navigation-previous picturepark-widget-card-navigation-previous-{{id}}">
            <svg style="position: absolute; top: 50%; transform: translate(0,-50%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.8 42.8"><path d="M11 21.7l18 20c0.1 0.1 0.2 0.2 0.4 0.2 0.1 0 0.3 0 0.4-0.1l2.9-2.9c0.2-0.2 0.2-0.5 0-0.7L17.9 21.3 32.7 4.6c0.2-0.2 0.2-0.5 0-0.7L29.7 1c-0.1-0.1-0.2-0.1-0.4-0.1h0c-0.1 0-0.3 0.1-0.4 0.2L11 21c-0.1 0.1-0.1 0.2-0.1 0.3C10.8 21.4 10.8 21.6 11 21.7z" fill="#CCCCCC"/></svg>
          </a>
          <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showNext('{{ config.token }}', 'gallery_{{ id }}')"
            class="picturepark-widget-card-navigation-next picturepark-widget-card-navigation-next-{{id}}">
            <svg style="position: absolute; top: 50%; transform: translate(0,-50%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.8 42.8"><path d="M32.7 21l-18-20c-0.1-0.1-0.2-0.2-0.4-0.2 -0.1 0-0.3 0-0.4 0.1L11 3.9c-0.2 0.2-0.2 0.5 0 0.7l14.8 16.7L11 38.1c-0.2 0.2-0.2 0.5 0 0.7l2.9 2.9c0.1 0.1 0.2 0.1 0.4 0.1h0c0.1 0 0.3-0.1 0.4-0.2l18-20c0.1-0.1 0.1-0.2 0.1-0.3C32.8 21.3 32.8 21.1 32.7 21z" fill="#CCCCCC"/></svg>
          </a>
          {% endif %}
        </div>

        {% if config.showFooter %}
        <div class="picturepark-widget-card-footer-content picturepark-widget-card-footer-content-{{id}}">
          <div class="picturepark-widget-card-footer-title picturepark-widget-card-footer-title-{{id}}">{{ share.name }}</div>
          {% if share.description %}
            <div class="picturepark-widget-card-footer-description picturepark-widget-card-footer-description-{{id}}">{{ share.description }}</div>
          {% endif %}
          <hr class="picturepark-widget-card-footer-hr picturepark-widget-card-footer-hr-{{id}}">
          <div class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}">
            <img src="//www.gravatar.com/avatar/{{ share.creator.emailHash }}?m=dd&size=32&d=mm" class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}" />
            Shared by: {{ share.creator.displayName }}
            </div>
        </div>
        {% endif %}
      </div>`;
  }

  private static getList(): string {
    return `
      {% if config.renderStyles %}
      <style>
        .picturepark-widget-{{id}} {
          all: initial;
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          font-size: 13px;
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
        }
        .picturepark-widget-list-{{id}} {
          padding: 0px 12px 0px 12px;
          position: relative;
          border: 1px solid lightgray;
          border-radius: 4px;
        }
        .picturepark-widget-list-header-{{id}} {
          font-weight: bold;
          font-size: 16px;
          border-bottom: 2px solid #DCDCDC; 
          margin: 12px 0 16px 0; 
          padding: 0 0 12px 0; 
        }
        .picturepark-widget-list-header-download-{{id}} {
          font-size: 10pt; 
          padding-top: 3px; 
        }
        .picturepark-widget-list-body-{{id}} {
          list-style-type: none;
          margin: 0 0 8px 0; 
          padding: 0;
        }
        .picturepark-widget-list-body-{{id}} li {
          margin-bottom: 8px;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-list picturepark-widget-list-{{id}}" style="width: {{ config.width }}px">
        <h1 class="picturepark-widget-list-header picturepark-widget-list-header-{{id}}">
          {% translate 'List.HeaderDownloads' %}
          <span style="float:right" class="picturepark-widget-list-header-download picturepark-widget-list-header-download-{{id}}">
            <a href="{{ share.url }}">{% translate 'List.ButtonDownloadAll' %}</a>
          </span>
        </h1>
        <ul class="picturepark-widget-list-body picturepark-widget-list-body-{{id}}">
        {% for selection in share.items %}
          <li>
            <span style="float:right">
              <a href="{{selection.originalUrl}}">
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
              <strong>{{ selection.displayValues.list }}</strong><br />
              TBD
            </span>
          </li>
        {% endfor %}
        </ul>
      </div>`;
  }
}