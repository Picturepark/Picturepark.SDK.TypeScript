import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ShareService, OutputAccess, ShareContent, ShareEmbedCreateRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-share-content-dialog',
  templateUrl: './share-content-dialog.component.html',
  styleUrls: ['./share-content-dialog.component.scss']
})
export class ShareContentDialogComponent {

  contentItemSelectionSubscription: Subscription;
  downloadThumbnailSubscription: Subscription;

  selectedContent: Array<any> = [];
  sharedContentForm: FormGroup;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareContentDialogComponent>,
    private formBuilder: FormBuilder,
    private shareService: ShareService,
  ) {

    this.selectedContent = data;

    this.sharedContentForm = this.formBuilder.group({
      share_name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      recipients: this.formBuilder.array([]),
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

    if(this.sharedContentForm.valid && this.selectedContent.length > 0) {

      const selectedContent = <FormArray>this.sharedContentForm.get('recipients');

      // CONTENT ITEMS
      const contentItems = selectedContent.value.map(i => new ShareContent({
        contentId: i,
        outputFormatIds: ['Original']
      }));

      // CREATE NEW SHARE
      this.shareService.create(new ShareEmbedCreateRequest({
        name: 'Embed',
        contents: contentItems,
        outputAccess: OutputAccess.Full
      }));

    }
  }

}