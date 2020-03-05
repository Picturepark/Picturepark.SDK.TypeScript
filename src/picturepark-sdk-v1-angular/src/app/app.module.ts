import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// LIBRARIES
import { PictureparkOidcAuthConfiguration, PictureparkOidcModule } from '@picturepark/sdk-v1-angular-oidc';
import { PictureparkUiModule, LayerPanelsModule } from '@picturepark/sdk-v1-angular-ui';
import { PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';

// MODULES
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/utilities/translations';
import { environment } from '../environments/environment';
import { PictureparkAppSetting } from 'src/config';

export function LocaleIdFactory() {
  const translations = TRANSLATIONS;
  translations['ShareManager'] = {
    DeleteShare: {
      en: 'Delete share',
      de: 'Share löschen'
    },
    ConfirmDelete: {
      en: 'Are you sure?',
      de: 'Sind sie sicher?'
    },
    Delete: {
      en: 'Delete',
      de: 'Löschen'
    },
    Cancel: {
      en: 'Cancel',
      de: 'Abbrechen'
    }
  };

  return (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language;
}


// CLIENT CONFIG
export function PictureparkConfigurationFactory() {
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
    scope: appRootTag.getAttribute('picturepark-scope')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PictureparkUiModule,
    PictureparkOidcModule,
    LayerPanelsModule,
    HammerModule
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: LocaleIdFactory },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
