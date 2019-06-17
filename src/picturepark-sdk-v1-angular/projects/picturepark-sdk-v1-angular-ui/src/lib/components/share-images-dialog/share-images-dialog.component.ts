import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'pp-share-images-dialog',
  templateUrl: './share-images-dialog.component.html',
  styleUrls: ['./share-images-dialog.component.scss']
})
export class ShareImagesDialogComponent {

  constructor(public dialogRef: MatDialogRef<ShareImagesDialogComponent>,) {}

  public closeDialog() {
    this.dialogRef.close();
  }

} 
