export let TRANSLATIONS = {
  // TODO: add deutsch translations.
  Basket: {
    RemoveItem: {
      en: 'Remove'
    },
    Download: {
      en: 'Download'
    },
    ClearBasket: {
      en: 'Clear'
    },
    EmptyBasket: {
      en: 'Basket is empty.'
    }
  },
  ChannelPicker: {
    SelectChannel: {
      en: 'Select channel'
    }
  },
  ContentAggregationList: {
    ClearFilters: {
      en: 'Clear filters'
    },
    Search: {
      en: 'Search'
    },
    ShowMoreFilters: {
      en: 'Show more'
    },
    ShowLessFilters: {
      en: 'Show less'
    },
    NoActiveFilters: {
      en: 'No active filters'
    },
    SingleActiveFilter: {
      en: '1 active filter'
    },
    MultipleActiveFilters: {
      en: '{0} active filters'
    },
    ClearAllFilters: {
      en: 'Clear all filters'
    }
  },
  ContentBrowser: {
    NoImageForItem: {
      en: 'There is no image.'
    },
    PreviewItem: {
      en: 'Preview'
    },
    DownloadItem: {
      en: 'Download'
    },
    AddToBasket: {
      en: 'Add to basket'
    },
    RemoveFromBasket: {
      en: 'Remove from basket'
    },
    SelectMenu: {
      en: 'Select'
    },
    SelectFirstItems: {
      en: 'Select first {0}'
    },
    DeselectAll: {
      en: 'Deselect all'
    },
    Preview: {
      en: 'Preview'
    },
    Download: {
      en: 'Download'
    },
    ItemsLength: {
      en: '{0} contents'
    },
    SortingMenu: {
      en: 'Sort'
    },
    SortingAscending: {
      en: 'Ascending'
    },
    SortingDescending: {
      en: 'Descending'
    },
    SortingByRelevance: {
      en: 'Relevance'
    },
    SortingByName: {
      en: 'File name'
    },
    SortingByDateCreated: {
      en: 'Date created'
    },
    SortingByDateModified: {
      en: 'Date modified'
    },
    ViewTypeMenu: {
      en: 'View type'
    },
    ViewTypeThumbnail: {
      en: 'Thumbnail'
    },
    ViewTypeList: {
      en: 'List'
    },
    NoItems: {
      en: 'There is no content found using your search string',
    },
    NoItemsHist: {
      en: 'You may do the following:'
    },
    NoItemsActionChannel: {
      en: 'Switch to another channel'
    },
    NoItemsActionSearchString: {
      en: 'Change your search string'
    },
    Import: {
      en: 'Import'
    },
    Export: {
      en: 'Export'
    }
  },
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
    LabelFileSize: {
      en: 'File size',
      de: 'Dateigrösse'
    },
    LabelSize: {
      en: 'Size',
      de: 'Grösse'
    },
  },
  Login: {
    LabelUsername: {
      en: 'Username',
      de: 'Benutzername'
    },
    LabelPassword: {
      en: 'Password',
      de: 'Passwort'
    },
    LabelRememberPassword: {
      en: 'Remember Passwort',
      de: 'Passwort speichern'
    },
    ButtonLogin: {
      en: 'Login',
      de: 'Anmelden'
    },
    TextWrongUsernameOrPassword: {
      en: 'The entered username or password is wrong.',
      de: 'Der Benutzername oder das Passwort ist falsch.'
    }
  },
  Logout: {
    ButtonLogout: {
      en: 'Logout',
      de: 'Abmelden'
    },
    TextLoggedInAs: {
      en: 'Logged in as',
      de: 'Angemeldet als'
    },
    TextLogoutFailed: {
      en: 'Could not log out, please try again.',
      de: 'Abmeldung ist fehlgeschlagen.'
    }
  },
  SearchBox: {
    Search: {
      en: 'Search',
      de: 'Suchen'
    }
  }
};

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
