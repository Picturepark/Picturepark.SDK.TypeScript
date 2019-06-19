import { Component, EventEmitter, Inject, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pp-share-images-dialog',
  templateUrl: './share-images-dialog.component.html',
  styleUrls: ['./share-images-dialog.component.scss']
})
export class ShareImagesDialogComponent implements OnInit, OnDestroy {

  contentItemSelectionSubscription: Subscription;
  downloadThumbnailSubscription: Subscription;

  selectedImages: Array<any> = [];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  sharedImagesForm: FormGroup;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareImagesDialogComponent>,

  ) {

    this.selectedImages = data;

    this.sharedImagesForm = new FormGroup({
      share_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      recipients: new FormControl([], [
        Validators.required,
        Validators.pattern(this.reg),
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

  // DELETE IMAGE FROM DIALOG
  public deleteImage(event): void {
    this.selectedImages.map((item, index) => {
      if(event === item) this.selectedImages.splice(index,1);
    });
    // CLOSE DIALOG IF NOT SELECTED IMAGES
    if(this.selectedImages.length === 0) this.closeDialog();
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  // SHARE IMAGES SUBMIT BUTTON ACTION
  public onFormSubmit(): void {
    console.log(this.sharedImagesForm)
  }

  ngOnInit() {
    
    

  }

  ngOnDestroy() {

    //if(this.downloadThumbnailSubscription) this.downloadThumbnailSubscription.unsubscribe();
    
  }

}