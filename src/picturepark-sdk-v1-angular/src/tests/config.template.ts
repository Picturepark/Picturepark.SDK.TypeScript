import { TestBed } from '@angular/core/testing';

import { PictureparkModule } from '../picturepark.module';
import { PICTUREPARK_API_URL } from '../picturepark.services';
import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '../../index';

export const testUrl = '{Server}';
export const testUsername = '{Username}';
export const testPassword = '{Password}';
export const testAccessToken = '{AccessToken}';
export const testCustomerAlias = '{CustomerAlias}';

export function configureTest() {
  TestBed.configureTestingModule({
    imports: [PictureparkModule],
    providers: [
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
