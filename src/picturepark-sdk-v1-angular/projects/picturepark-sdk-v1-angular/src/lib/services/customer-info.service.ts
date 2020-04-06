import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CustomerInfo, PICTUREPARK_API_URL } from './api-services';

@Injectable({
  providedIn: 'root',
})
export class CustomerInfoService {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(PICTUREPARK_API_URL) private baseUrl: string) {}

  public getInfo(): Observable<CustomerInfo> {
    let url_ = this.baseUrl + '/v1/Info/customer';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get<CustomerInfo>(url_).pipe(
      mergeMap((response_: any) => {
        return of(CustomerInfo.fromJS(response_));
      })
    );
  }
}
