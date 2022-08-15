import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { CustomerInfoService } from '../services/customer-info.service';

@Injectable({
  providedIn: 'root',
})
export class InfoFacade {
  constructor(private infoService: CustomerInfoService) {}

  getInfo(cdnUrl?: string) {
    return this.infoService.getInfo(cdnUrl).pipe(shareReplay(1));
  }
}
