import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'pp-field-detail-info-dialog',
    templateUrl: './field-detail-info-dialog.component.html',
    styleUrls: ['./field-detail-info-dialog.component.scss'],
    standalone: true,
})
export class FieldDetailInfoDialogComponent implements OnInit {
  title: string;
  message: string;
  displayMessage: string | null;

  constructor(public dialogRef: MatDialogRef<FieldDetailInfoDialogComponent>, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.displayMessage = this.sanitizer.sanitize(SecurityContext.HTML, this.message);
  }
}
