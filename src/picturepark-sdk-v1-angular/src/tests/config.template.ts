import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import {
  PICTUREPARK_API_URL,
  PICTUREPARK_CONFIGURATION,
  PictureparkConfiguration,
  AuthService,
  AccessTokenAuthService
} from '@picturepark/sdk-v1-angular';

export const testUrl = '{Server}';
export const testAccessToken = '{AccessToken}';
export const testCustomerAlias = '{CustomerAlias}';

export function configureTest() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      { provide: AuthService, useClass: AccessTokenAuthService },
      { provide: PICTUREPARK_API_URL, useValue: testUrl },
      {
        provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
          customerAlias: testCustomerAlias,
          accessToken: testAccessToken
        }
      }
    ]
  });
  TestBed.compileComponents();
}
