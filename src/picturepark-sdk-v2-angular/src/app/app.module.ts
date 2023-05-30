import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v2-angular-oidc';
import { TRANSLATIONS } from '@picturepark/sdk-v2-angular-ui';

import { environment } from '../environments/environment';
import { PictureparkAppSetting } from 'src/config';

const translations = TRANSLATIONS;
translations['ShareManager'] = {
  DeleteShare: {
    en: 'Delete share',
    de: 'Share löschen',
    fr: 'Supprimer le partage',
    es: 'Eliminar comparte',
    pt: 'Eliminar partilha',
  },
  ConfirmDelete: {
    en: 'Are you sure?',
    de: 'Sind sie sicher?',
    fr: 'Êtes-vous sûr?',
    es: '¿Estas seguro?',
    pt: 'Tem a certeza?',
  },
  Delete: {
    en: 'Delete',
    de: 'Löschen',
    fr: 'Supprimer',
    es: 'Eliminar',
    pt: 'Eliminar',
  },
  Cancel: {
    en: 'Cancel',
    de: 'Abbrechen',
    fr: 'Annuler',
    es: 'Cancelar',
    pt: 'Cancelar',
  },
  Download: {
    en: 'Download all contents',
    de: 'Alle Inhalte herunterladen',
    fr: 'Téléchargez tout le contenu',
    es: 'Descargar todos los contenidos',
    pt: 'Descarregar todos os conteúdos',
  },
};

// OIDC CONFIG
export function oidcConfigFactory() {
  if (!environment.production) {
    return PictureparkAppSetting();
  }
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkOidcAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    stsServer: appRootTag.getAttribute('picturepark-sts-server'),
    customerId: appRootTag.getAttribute('picturepark-customer-id'),
    redirectServer: appRootTag.getAttribute('picturepark-redirect-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    clientId: appRootTag.getAttribute('picturepark-client-id'),
    scope: appRootTag.getAttribute('picturepark-scope'),
  };
}

export function getAttribute(attribute: string) {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute(attribute);
}

export function getViewModeFactory(): 'grid' | 'list' {
  return getAttribute('view-mode') === 'list' ? 'list' : 'grid';
}
