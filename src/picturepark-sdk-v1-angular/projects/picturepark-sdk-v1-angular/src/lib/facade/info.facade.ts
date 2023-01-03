import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { CustomerInfo } from '../services/api-services';
import { CustomerInfoService } from '../services/customer-info.service';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  customerInfo: CustomerInfo;

  constructor(private infoService: CustomerInfoService) {}

  public getInfo(cdnUrl?: string): Observable<CustomerInfo> {
    if (this.customerInfo) {
      return of(this.customerInfo);
    }

    return this.infoService.getInfo(cdnUrl).pipe(
      tap((customerInfo) => (this.customerInfo = customerInfo)),
      shareReplay(1)
    );
  }
}
