import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { LocalStorageService } from "projects/picturepark-sdk-v2-angular/src/lib/services/local-storage.service";
import { StorageKey } from "projects/picturepark-sdk-v2-angular/src/lib/utilities/storage-key.enum";

@Component({
  selector: 'cp-landing-dialog',
  templateUrl: './landing-dialog.component.html',
  styleUrls: ['../../shared-module/components/dialog-base/dialog-base.component.scss', './landing-dialog.component.scss']
})
export class LandingDialogComponent {
  termsAccepted = false;

  constructor(private matDialogRef: MatDialogRef<any>, private localStorageService: LocalStorageService) {
  }

  accept() {
    this.localStorageService.set(StorageKey.Terms, 'true');
    this.matDialogRef.close();
  }
}
