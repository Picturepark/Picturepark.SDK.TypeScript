import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { CustomerInfo } from '../services/api-services';
import { CustomerInfoService } from '../services/customer-info.service';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  constructor(private infoService: CustomerInfoService) {}

  customerInfo: CustomerInfo;

  getInfo(cdnUrl?: string) {
    if (this.customerInfo) return of(this.customerInfo);

    return this.infoService.getInfo(cdnUrl).pipe(
      tap(customerInfo => (this.customerInfo = customerInfo)),
      shareReplay(1)
    );
  }
}
