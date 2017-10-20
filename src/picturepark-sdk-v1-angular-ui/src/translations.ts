export let TRANSLATIONS = {
  ContentBrowser: {
    TextNoItems: {
      en: 'No content items.',
      de: 'Keine Inhalte gefunden.'
    }
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
    ButtonSearch: {
      en: 'Search',
      de: 'Suchen'
    }
  }
}

const fallbackLanguage = 'en';

export function translate(key: any, locale: string) {
  const language = locale.split('-')[0].toLowerCase();
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
