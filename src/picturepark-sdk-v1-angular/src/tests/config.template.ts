import { TestBed } from '@angular/core/testing';

import {
  PICTUREPARK_API_URL,
  PICTUREPARK_CONFIGURATION,
  PictureparkConfiguration,
  AccessTokenAuthService
} from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'projects/picturepark-sdk-v1-angular/src/public_api';

export const testUrl = '{Server}';
export const testAccessToken = '{AccessToken}';
export const testCustomerAlias = '{CustomerAlias}';

export function configureTest() {
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
