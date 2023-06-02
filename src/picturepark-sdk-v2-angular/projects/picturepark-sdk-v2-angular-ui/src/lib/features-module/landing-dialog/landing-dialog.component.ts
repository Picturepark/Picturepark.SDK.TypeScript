import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { LocalStorageService, StorageKey, TermsOfServiceFacade } from '@picturepark/sdk-v2-angular';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'pp-landing-dialog',
    templateUrl: './landing-dialog.component.html',
    styleUrls: [
        '../../shared-module/components/dialog-base/dialog-base.component.scss',
        './landing-dialog.component.scss',
    ],
    standalone: true,
    imports: [
        MatDividerModule,
        MatDialogModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        AsyncPipe,
        TranslatePipe,
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
