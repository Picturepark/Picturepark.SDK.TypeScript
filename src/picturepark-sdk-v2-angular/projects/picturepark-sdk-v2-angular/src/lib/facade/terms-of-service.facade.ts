import { Injectable } from '@angular/core';
import { TermsOfServiceService } from '../services/frontend-services';

@Injectable({ providedIn: 'root' })
export class TermsOfServiceFacade {
  constructor(private service: TermsOfServiceService) {}

  newest() {
    return this.service.newest();
  }
}
