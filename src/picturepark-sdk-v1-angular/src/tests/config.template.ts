import { TestBed } from '@angular/core/testing';
import { PICTUREPARK_API_URL, PictureparkModule } from '../index';

export const testUrl = "{Server}";
export const testUsername = "{Username}";
export const testPassword = "{Password}";

export function configureTest(){
    TestBed.configureTestingModule({
      imports: [ PictureparkModule ],
      providers: [
        { provide: PICTUREPARK_API_URL, useValue: testUrl }
      ]
    });
    TestBed.compileComponents();
}
