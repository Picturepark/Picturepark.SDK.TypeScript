import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// LIBRARIES
import { LocaleModule } from '@picturepark/sdk-v1-angular';
import { PictureparkOidcAuthConfiguration, PictureparkOidcModule } from '@picturepark/sdk-v1-angular-oidc';
import { PictureparkUiModule, LayerPanelsModule, TRANSLATIONS } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { PictureparkAppSetting } from 'src/config';
import { ApplicationMenuModule } from './components/application-menu/application-menu.module';

const translations = TRANSLATIONS;
translations['ShareManager'] = {
  DeleteShare: {
    en: 'Delete share',
    de: 'Share löschen',
    fr: 'Supprimer le partage',
    es: 'Eliminar comparte',
    pt: 'Excluir partilha',
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

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PictureparkUiModule,
    PictureparkOidcModule.forRoot(oidcConfigFactory),
    LayerPanelsModule,
    HammerModule,
    ApplicationMenuModule,
    LocaleModule.forRoot('system'),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
