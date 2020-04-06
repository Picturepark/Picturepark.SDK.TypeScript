import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CustomerInfo, PICTUREPARK_API_URL } from './api-services';
import { PICTUREPARK_CONFIGURATION } from './base.service';
import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';

@Injectable({
  providedIn: 'root',
})
export class CustomerInfoService {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Optional() @Inject(PICTUREPARK_API_URL) private baseUrl: string,
    @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration?: PictureparkOidcAuthConfiguration
    ) {}

  public getInfo(): Observable<CustomerInfo> {
    let url_ = this.pictureparkConfiguration?.apiServer + '/v1/Info/customer';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get<CustomerInfo>(url_).pipe(
      mergeMap((response_: any) => {
        return of(CustomerInfo.fromJS(response_));
      })
    );
  }
}
