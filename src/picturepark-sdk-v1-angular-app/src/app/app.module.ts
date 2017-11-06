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
import { ContentPickerDetailsComponent } from './content-picker-details/content-picker-details.component';

import { TranslatePipe } from '../pipes/translate.pipe';

import { PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { PictureparkOidcModule, PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';
import { EmbedService } from './embed.service';

export function LocaleIdFactory() {
  return (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language;
}

export function PictureparkConfigurationFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkOidcAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    stsServer: appRootTag.getAttribute('picturepark-sts-server'),
    customerId: appRootTag.getAttribute('picturepark-customer-id'),
    redirectServer: appRootTag.getAttribute('picturepark-redirect-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    clientId: appRootTag.getAttribute('picturepark-client-id'),
    scope: appRootTag.getAttribute('picturepark-scope'),
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    ShareCardComponent,
    ContentPickerComponent,
    ContentPickerDetailsComponent,
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
      { path: 'details', component: AppComponent },
      { path: 'pcpToken/:type?postUrl=:postUrl', redirectTo: '/content-picker?postUrl=:postUrl' }
    ])
  ],
  providers: [
    EmbedService,
    { provide: LOCALE_ID, useFactory: LocaleIdFactory },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
