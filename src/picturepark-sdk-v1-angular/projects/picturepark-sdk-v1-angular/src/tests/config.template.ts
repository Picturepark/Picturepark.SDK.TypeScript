import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { } from 'jasmine';
import { AuthService } from '../lib/auth.service';
import { AccessTokenAuthService } from '../lib/access-token-auth.service';
import { PICTUREPARK_CONFIGURATION } from '../lib/base.service';
import { PictureparkConfiguration } from '../lib/configuration';
import { PICTUREPARK_API_URL } from '../lib/api-services';

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
