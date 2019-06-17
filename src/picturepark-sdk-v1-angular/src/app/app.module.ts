import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContentPickerComponent } from './content-picker/content-picker.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FileSizePipe } from './pipes/filesize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  PictureparkOidcAuthConfiguration,
  PictureparkOidcModule
} from '@picturepark/sdk-v1-angular-oidc';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';
import { PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';

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
    scope: appRootTag.getAttribute('picturepark-scope')
  };
}

@NgModule({
  entryComponents: [DetailsDialogComponent],
  declarations: [
    FileSizePipe,
    AppComponent,
    HomeComponent,
    ContentPickerComponent,
    DetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    LayoutModule,

    PictureparkUiModule,
    PictureparkOidcModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'details', component: AppComponent },
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
