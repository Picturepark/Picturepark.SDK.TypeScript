export interface Configuration {
  server: string;
  token: string;
  width: number;
  height: number;

  [name: string]: any;
}

export class PictureparkConfig {
  static get(element: HTMLElement): Configuration {
    let configuration: any = { renderStyles: true, width: 400, height: 400 };
    for (var i = 0; i < element.attributes.length; i++) {
      var attribute = element.attributes[i];
      if (attribute.name === 'data-picturepark-token')
        configuration['token'] = attribute.value;
      else if (attribute.name === 'data-picturepark-server')
        configuration['server'] = attribute.value;
      else if (attribute.name === 'data-render-styles')
        configuration['renderStyles'] = attribute.value.toLowerCase() !== 'false' && attribute.value.toLowerCase() !== 'no';
      else if (attribute.name === 'data-width')
        configuration['width'] = parseInt(attribute.value);
      else if (attribute.name === 'data-height')
        configuration['height'] = parseInt(attribute.value);
      else if (attribute.name.startsWith('data-'))
        configuration[attribute.name.substr(5).replace(/-([a-z])/g, g => g[1].toUpperCase())] = attribute.value;
    }
    return configuration;
  }
}