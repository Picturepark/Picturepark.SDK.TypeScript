import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDownloadData } from './download-data';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['./content-download-dialog.component.scss']
})
export class ContentDownloadDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDownloadData,
    public dialogRef: MatDialogRef<ContentDownloadDialogComponent>) { }

  ngOnInit() {

  }

}
