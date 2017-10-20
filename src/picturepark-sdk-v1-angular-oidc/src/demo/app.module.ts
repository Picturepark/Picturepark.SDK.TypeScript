import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PictureparkConfiguration, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { PictureparkOidcModule } from '../picturepark.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PictureparkOidcModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'pcpToken/:type?postUrl=:postUrl', redirectTo: '/content-picker?postUrl=:postUrl' }
    ])
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: 'https://devnext-api.preview-picturepark.com',
        stsServer: 'https://devnext-identity.preview-picturepark.com',
        scope: 'openid profile picturepark_api all_scopes',
        clientId: 'TestBRO',
        redirectUrl: 'http://localhost:4200',
        customerId: 'ca554a7744694843a89a8bbbaadf5185',
        customerAlias: 'dev'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
