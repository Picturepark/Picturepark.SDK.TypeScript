import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
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

  public getInfo(): Observable<CustomerInfo> {
    let url_ = this.config.apiServer + '/v1/Info/customer';
    url_ = url_.replace(/[?&]$/, '');

    return this.http
      .get<CustomerInfo>(url_, { headers: { 'Picturepark-CustomerAlias': this.config.customerAlias! } })
      .pipe(
        mergeMap((response_: any) => {
          return of(CustomerInfo.fromJS(response_));
        })
      );
  }
}