import { TestBed } from '@angular/core/testing';

import { PictureparkModule } from '../picturepark.module';
import { PICTUREPARK_API_URL } from '../picturepark.services';
import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '../../index';

export const testUrl = 'https://devnext.preview-picturepark.com';
export const testUsername = 'picturepark.admin@acme.xxx';
export const testPassword = '1Kx234ss345XHVE90830s94xS';
export const testAccessToken = 'foo';
export const testCustomerAlias = 'bar';

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
