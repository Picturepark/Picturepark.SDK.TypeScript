import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShareCardComponent } from './share-card/share-card.component';
import { ContentPickerComponent } from './content-picker/content-picker.component';

import { TranslatePipe } from '../pipes/translate.pipe';

import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '@picturepark/sdk-v1-angular';
import { PictureparkOidcModule } from '@picturepark/sdk-v1-angular';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';

export function LocaleIdFactory() {
  return (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language;
}

export function PictureparkConfigurationFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    stsServer: appRootTag.getAttribute('picturepark-sts-server'),
    customerId: appRootTag.getAttribute('customer-id'),
    customerAlias: appRootTag.getAttribute('customer-alias'),
    clientId: appRootTag.getAttribute('clientId'),
    scope: appRootTag.getAttribute('scope'),
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    ShareCardComponent,
    ContentPickerComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    PictureparkOidcModule,
    PictureparkUiModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'pcpToken/:type?postUrl=:postUrl', redirectTo: '/content-picker?postUrl=:postUrl' }
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: LocaleIdFactory },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
