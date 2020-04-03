import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CustomerInfo, CustomerInfoService } from './services/api-services';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  constructor(private infoService: CustomerInfoService) {}

  public getInfo(): Observable<CustomerInfo> {
    return this.infoService.getInfo().pipe(shareReplay(1));
  }
}
