import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService, StorageKey, TermsOfServiceFacade } from '@picturepark/sdk-v2-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pp-landing-dialog',
  templateUrl: './landing-dialog.component.html',
  styleUrls: [
    '../../shared-module/components/dialog-base/dialog-base.component.scss',
    './landing-dialog.component.scss',
  ],
})
export class LandingDialogComponent {
  termsAccepted = false;
  terms$ = this.termsOfServiceFacade.newest().pipe(map(t => t.content));

  constructor(
    private matDialogRef: MatDialogRef<any>,
    private localStorageService: LocalStorageService,
    private termsOfServiceFacade: TermsOfServiceFacade
  ) {}

  accept() {
    this.localStorageService.set(StorageKey.Terms, 'true');
    this.matDialogRef.close();
  }
}
