import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PictureparkConfiguration } from '../models/configuration';
import { CustomerInfo } from './api-services';
import { PICTUREPARK_CONFIGURATION } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerInfoService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(PICTUREPARK_CONFIGURATION) private config: PictureparkConfiguration
  ) {}

  public getInfo(cdnUrl?: string): Observable<CustomerInfo> {
    let url_: string;
    if (cdnUrl) {
      url_ = cdnUrl + '/service/Info/customer';
    } else {
      url_ = this.config.apiServer + '/v1/Info/customer';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    if (this.config.customerAlias) {
      options_.headers = options_.headers.append('Picturepark-CustomerAlias', this.config.customerAlias);
    }

    return this.http.get<CustomerInfo>(url_, options_).pipe(
      mergeMap((response_: any) => {
        return of(CustomerInfo.fromJS(response_));
      })
    );
  }
}
