import { translate } from './translations';

declare var Liquid;

export class PictureparkRenderEngine {
  static create() {
    let engine = Liquid();
    engine.registerTag('translate', {
      parse: function (token) {
        this.token = token;
      },
      render: function (scope, hash) {
        let args = this.token.args.split(' ');
        let key = Liquid.evalExp(args[0], scope);
        let locale = navigator.language || (<any>navigator).userLanguage;
        return translate(key, locale);
      }
    });

    engine.registerTag('resizeById', {
      parse: function (token) {
        this.token = token;
      },
      render: function (scope, hash) {
        let args = this.token.args.split(' ');

        let share = scope.scopes[0].share;
        let id = Liquid.evalExp(args[0], scope);
        let outputFormatId = Liquid.evalExp(args[1], scope);
        let width = Liquid.evalExp(args[2], scope);
        let height = Liquid.evalExp(args[3], scope);

        try {
          let item = share.items.filter(i => i.id === id)[0];
          if (outputFormatId === "Preview" && item.previewUrl) {
            return item.previewUrl + `/${width}/${height}`;
          } else {
            return item.originalUrl + `/${width}/${height}`;
          }
        } catch (ex) {
          console.log(ex);
          return "";
        }
      }
    });

    return engine;
  }
}