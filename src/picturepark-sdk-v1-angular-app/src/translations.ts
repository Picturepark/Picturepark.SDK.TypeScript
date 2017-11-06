export let TRANSLATIONS = {
  ContentPicker: {
    LabelChannel: {
      en: 'Channel',
      de: 'Kanal'
    },
    LabelSearch: {
      en: 'Search',
      de: 'Suche'
    },
    LabelFilters: {
      en: 'Filters',
      de: 'Filter'
    },
    ButtonChoose: {
      en: 'Choose selection',
      de: 'Selektion auswählen'
    },
    ButtonLoading: {
      en: 'Loading...',
      de: 'Wird geladen...'
    },
    ButtonCancel: {
      en: 'Cancel',
      de: 'Abbrechen'
    },
    TextSelectedSingle: {
      en: 'You have selected 1 item.',
      de: 'Sie haben ein Element ausgewählt.'
    },
    TextSelectedMultiple: {
      en: 'You have selected {0} items.',
      de: 'Sie haben {0} Elemente ausgewählt.'
    }
  },

  ContentPickerDetails: {
    ButtonBack: {
      en: 'Go back',
      de: 'Zurück'
    },
    ButtonChoose: {
      en: 'Choose item',
      de: 'Element auswählen'
    },
    LabelFileExtension: {
      en: 'File extension',
      de: 'Dateiendung'
    },
    LabelSize: {
      en: 'Size',
      de: 'Grösse'
    },
  }
}

const fallbackLanguage = 'en';

export function translate(key: any, locale: string) {
  const language = locale ? locale.split('-')[0].toLowerCase() : '';
  let translations: any = TRANSLATIONS;

  if (typeof key === 'string') {
    const path = key.split('.');
    if (path.length > 0) {
      for (const segment of path) {
        if (translations[segment]) {
          translations = translations[segment];
        } else {
          translations = null;
          break;
        }
      }
    } else {
      translations = null;
    }
  } else {
    translations = key;
  }

  return translations && translations[language] ? translations[language] :
    (language !== fallbackLanguage ? translate(key, fallbackLanguage + '-') : `[!${key}]`);
}
