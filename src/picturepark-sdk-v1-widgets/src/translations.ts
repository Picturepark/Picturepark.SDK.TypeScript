export var TRANSLATIONS = {
  List: {
    HeaderDownloads: {
      en: "Downloads", 
      de: "Downloads"
    },
    ButtonDownloadAll: {
      en: "Download all",
      de: "Alle herunterladen"
    }
  }
}

var fallbackLanguage = 'en';

export function translate(key: any, locale: string) {
  let language = locale ? locale.split("-")[0].toLowerCase() : "";
  let translations: any = TRANSLATIONS;

  if (typeof key === 'string') {
    let path = key.split(".");
    if (path.length > 0) {
      for (let segment of path) {
        if (translations[segment])
          translations = translations[segment];
        else {
          translations = null;
          break;
        }
      }
    }
    else
      translations = null;
  } else
    translations = key;

  return translations && translations[language] ? translations[language] :
    (language !== fallbackLanguage ? translate(key, fallbackLanguage + '-') : `[!${key}]`);
}