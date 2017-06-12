import { TestBed } from '@angular/core/testing';
import { PICTUREPARK_URL, PictureparkModule } from '../index';
import { PICTUREPARK_REFRESH_TOKEN } from '../picturepark.servicebase';

export const testUrl = "{Server}";
export const testUsername = "{Username}";
export const testPassword = "{Password}";

export function configureTest(){
    TestBed.configureTestingModule({
      imports: [ PictureparkModule ],
      providers: [
        { provide: PICTUREPARK_URL, useValue: testUrl }, 
        { provide: PICTUREPARK_REFRESH_TOKEN, useValue: false }
      ]
    });
    TestBed.compileComponents();
}
