import { TestBed } from '@angular/core/testing';
import { PictureparkModule } from "picturepark.module";
import { PICTUREPARK_API_URL } from "picturepark.services";

export const testUrl = "https://devnext.preview-picturepark.com";
export const testUsername = "picturepark.admin@acme.xxx";
export const testPassword = "1Kx234ss345XHVE90830s94xS";

export function configureTest(){
    TestBed.configureTestingModule({
      imports: [ PictureparkModule ],
      providers: [
        { provide: PICTUREPARK_API_URL, useValue: testUrl }
      ]
    });
    TestBed.compileComponents();
}
