import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import { AuthService, AccessTokenAuthService, PICTUREPARK_CONFIGURATION, PictureparkAccessTokenAuthConfiguration } from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';

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
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkAccessTokenAuthConfiguration>{
        apiServer: 'https://api.08.qa-picturepark.com',
        customerAlias: 'localtest',
        accessToken: ''
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
