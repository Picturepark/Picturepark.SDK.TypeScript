import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import { AuthService, AccessTokenAuthService, PICTUREPARK_CONFIGURATION, PictureparkAccessTokenAuthConfiguration } from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';
import { environment } from '../environments/environment';

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    return <PictureparkAccessTokenAuthConfiguration>{
      apiServer: 'http://localhost:8085',
      customerAlias: 'bro',
      accessToken: ''
    };
  }

  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkAccessTokenAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    accessToken: ''
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareDetailModule,
    HttpClientModule,

    // Picturepark
    SearchBoxModule,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
