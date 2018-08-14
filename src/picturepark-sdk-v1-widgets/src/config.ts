export interface Configuration {
  server: string;
  token: string;
  width: number;
  height: number;

  // "card" template
  showNavigation?: boolean;
  showOverlay?: boolean;
  showLogo?: boolean;
  showFooter?: boolean;

  [name: string]: any;
}

export class PictureparkConfig {
  static get(element: HTMLElement): Configuration {
    let configuration: any = { renderStyles: true };
    for (var i = 0; i < element.attributes.length; i++) {
      var attribute = element.attributes[i];
      if (attribute.name === 'data-token')
        configuration['token'] = attribute.value;
      else if (attribute.name === 'data-template')
        configuration['template'] = attribute.value;
      else if (attribute.name === 'data-picturepark-server')
        configuration['server'] = attribute.value;
      else if (attribute.name === 'data-render-styles')
        configuration['renderStyles'] = attribute.value.toLowerCase() !== 'false' && attribute.value.toLowerCase() !== 'no';
      else if (attribute.name === 'data-width') {
        configuration.width = parseInt(attribute.value);
        if (configuration.height === undefined)
          configuration.height = configuration.width * 3 / 4;
      }
      else if (attribute.name === 'data-height') {
        configuration.height = parseInt(attribute.value);
        if (configuration.width === undefined)
          configuration.width = configuration.height * 4 / 3;
      }
      else if (attribute.name.indexOf('data-') === 0) {
        let value;
        switch(attribute.value) {
            case "false":
              value = false;
              break;
            case "true":
              value = true;
              break;
            default:
              value = attribute.value;
              break;
        }
        configuration[attribute.name.substr(5).replace(/-([a-z])/g, g => g[1].toUpperCase())] = value;
      }
    }
    return configuration;
  }
}