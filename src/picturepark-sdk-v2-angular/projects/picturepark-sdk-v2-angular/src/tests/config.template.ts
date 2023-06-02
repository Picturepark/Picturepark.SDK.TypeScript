import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { AuthService } from '../lib/services/auth.service';
import { AccessTokenAuthService } from '../lib/services/access-token-auth.service';
import { PictureparkConfiguration } from '../lib/models/configuration';
import { PICTUREPARK_API_URL } from '../lib/services/api-services';
import { RouterTestingModule } from '@angular/router/testing';
import { PICTUREPARK_CONFIGURATION } from '../lib/services/picturepark-configuration';

export const testUrl = '{Server}';
export const testAccessToken = '{AccessToken}';
export const testCustomerAlias = '{CustomerAlias}';

export function configureTest() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
  TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule],
    providers: [
      { provide: AuthService, useClass: AccessTokenAuthService },
      { provide: PICTUREPARK_API_URL, useValue: testUrl },
      {
        provide: PICTUREPARK_CONFIGURATION,
        useValue: <PictureparkConfiguration>{
          customerAlias: testCustomerAlias,
          accessToken: testAccessToken,
        },
      },
    ],
    teardown: { destroyAfterEach: false },
  });
  TestBed.compileComponents();
}
