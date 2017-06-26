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
        .picturepark-widget-gallery-{{id}} {
          float: left;
          position: relative;
          margin-right: -4px;
          margin-bottom: -4px;
        }
        .picturepark-widget-gallery-item-{{id}} {
          background: #cecece;
          margin-right: 4px;
          margin-bottom: 4px;
          position: relative;
        }
        .picturepark-widget-gallery-item-image-{{id}} {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      </style>
      {% endif %}

      <div class="picturepark-widget-gallery picturepark-widget-gallery-{{id}}">
        {% assign width = config.width | plus: -2 %}
        {% assign height = config.height | plus: -1 %}
        {% for selection in share.items %}
          <div class="picturepark-widget-gallery-item picturepark-widget-gallery-item-{{id}}" style="float: left; width: {{ config.width }}px; height: {{ config.height }}px">
            {% if selection.isMovie and config.showPlayers != 'no' and config.showPlayers != 'false' %}
            <div id="player_{{ forloop.index0 }}_{{ id }}">
            </div>
            {% else %}
            <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
              <img class="picturepark-widget-gallery-item-image picturepark-widget-gallery-item-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
            </a>
            {% endif %}
          </div>
        {% endfor %}
    </div>`;
  }

  private static getCard(): string {
    return `
      {% if config.renderStyles %}
      <style>
        .picturepark-widget-{{id}} {
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
              {% if selection.isMovie %}
              <div id="player_{{ forloop.index0 }}_{{ id }}">
              </div>
              {% else %}
              <a href="javascript:void(0)" onclick="javascript:pictureparkWidgets.players.showDetail('{{ config.token }}', '{{ selection.id }}', '{{ id }}')">
                <img class="picturepark-widget-card-gallery-image picturepark-widget-card-gallery-image-{{id}}" src="{% resizeById selection.id 'Preview' width height %}" />
              </a>
              {% endif %}
              
              {% if config.showLogo != 'false' and config.showLogo != 'no' %}
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
              {% endif %}
            </div>
            {% endfor %}
          </div>

          {% if config.showOverlay == 'true' or config.showOverlay == 'yes' %}
            <div class="picturepark-widget-card-overlay picturepark-widget-card-overlay-{{id}}">
              <div class="picturepark-widget-card-overlay-title picturepark-widget-card-overlay-title-{{id}}">{{ share.name }}</div>
              {% if share.description %}
                <div class="picturepark-widget-card-overlay-description picturepark-widget-card-overlay-description-{{id}}">{{ share.description }}</div>
              {% endif %}
            </div>
          {% endif %}

          {% if config.showNavigation != 'false' and config.showNavigation != 'no' and share.items.length > 1 %}
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

        {% if config.showFooter != 'false' and config.showFooter != 'no' %}
        <div class="picturepark-widget-card-footer-content picturepark-widget-card-footer-content-{{id}}">
          <div class="picturepark-widget-card-footer-title picturepark-widget-card-footer-title-{{id}}">{{ share.name }}</div>
          {% if share.description %}
            <div class="picturepark-widget-card-footer-description picturepark-widget-card-footer-description-{{id}}">{{ share.description }}</div>
          {% endif %}
          <hr class="picturepark-widget-card-footer-hr picturepark-widget-card-footer-hr-{{id}}">
          <div class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}">
            <img src="//www.gravatar.com/avatar/{{ share.audit.CreatedByUser.EmailAddress | md5 }}?m=dd&size=32" class="picturepark-widget-card-footer-gravatar picturepark-widget-card-footer-gravatar-{{id}}" />
            Shared by: {{ share.audit.CreatedByUser.FirstName }} {{ share.audit.CreatedByUser.LastName }}
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
            <a href="{{ config.server }}/Embed/{{ config.token }}">{% translate 'List.ButtonDownloadAll' %}</a>
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
              <strong>{{ selection.displayValues.List }}</strong><br />
              TBD
            </span>
          </li>
        {% endfor %}
        </ul>
      </div>`;
  }
}