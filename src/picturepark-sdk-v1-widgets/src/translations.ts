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
  },
  AudioPreview: {
    en: "Audio waveform preview",
    de: "Audio-Wellenform Voransicht"
  },
  AudioSmall: {
    en: "Audio",
    de: "Audio"
  },
  DocumentPreview: {
    en: "Document preview",
    de: "Dokument Voransicht"
  },
  Original: {
    en: "Original",
    de: "Original"
  },
  Pdf: {
    en: "PDF",
    de: "PDF"
  },
  Preview: {
    en: "Preview",
    de: "Voransicht"
  },
  ThumbnailLarge: {
    en: "Large thumbnail",
    de: "Vorschau gross"
  },
  ThumbnailMedium: {
    en: "Medium thumbnail",
    de: "Vorschau mittel"
  },
  ThumbnailSmall: {
    en: "Small thumbnail",
    de: "Vorschau klein"
  },
  VideoKeyframes: {
    en: "Video keyframes",
    de: "Video-Keyframes"
  },
  VideoLarge: {
    en: "Large video",
    de: "Video gross"
  },
  VideoPreview: {
    en: "Video preview",
   de: "Video Voransicht"
  },
  VideoSmall: {
    en: "Small video",
    de: "Video klein"
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