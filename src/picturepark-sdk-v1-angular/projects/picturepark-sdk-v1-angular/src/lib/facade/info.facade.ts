import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CustomerInfo } from '../services/api-services';
import { CustomerInfoService } from '../services/customer-info.service';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  constructor(private infoService: CustomerInfoService) {}

  public getInfo(): Observable<CustomerInfo> {
    return this.infoService.getInfo().pipe(shareReplay(1));
  }
}
