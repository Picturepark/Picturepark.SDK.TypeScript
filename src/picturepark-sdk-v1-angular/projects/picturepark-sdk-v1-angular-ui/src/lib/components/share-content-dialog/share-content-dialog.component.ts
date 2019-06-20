import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pp-share-content-dialog',
  templateUrl: './share-content-dialog.component.html',
  styleUrls: ['./share-content-dialog.component.scss']
})
export class ShareContentDialogComponent {

  contentItemSelectionSubscription: Subscription;
  downloadThumbnailSubscription: Subscription;

  selectedContent: Array<any> = [];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  sharedContentForm: FormGroup;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareContentDialogComponent>,
  ) {

    this.selectedContent = data;

    this.sharedContentForm = new FormGroup({
      share_name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      recipients: new FormControl([], [
        Validators.required,
      ]),
      expire_date: new FormControl('', [
        Validators.required,
        // USE VALIDATION FUNCTION
      ])
    });

  }

  // CLOSE DIALOG WHEN PRESSING ON THE CROSS
  public closeDialog(): void {
    this.dialogRef.close();
  } 

  // REMOVE CONTENT FROM DIALOG
  public removeContent(event): void {
    this.selectedContent.map((item, index) => {
      if(event === item) this.selectedContent.splice(index,1);
    });
    // CLOSE DIALOG IF NOT SELECTED IMAGES
    if(this.selectedContent.length === 0) this.closeDialog();
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  // SHARE CONTENT SUBMIT BUTTON ACTION
  public onFormSubmit(): void {
  
  }

}