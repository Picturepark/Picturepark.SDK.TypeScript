import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDownloadData } from './download-data';
import { Output, ContentDownloadLinkCreateRequest, ContentService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['./content-download-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDownloadDialogComponent implements OnInit {
  public fileSize = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDownloadData,
    public dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    private contentService: ContentService) { }

  ngOnInit() {

  }

  public download(): void {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.getSelectedOutputs().map(i => ({ contentId: i.contentId, outputFormatId: i.outputFormatId }))
    });
    const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
        linkSubscription.unsubscribe();
        if (data.downloadUrl) {
            window.location.replace(data.downloadUrl);
        }
    });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public update(): void {
    const outputs = this.getSelectedOutputs();
    if (outputs.length > 0) {
      this.fileSize = outputs.map(i => i.detail!.fileSizeInBytes!).reduce((total, value) => total + value );
    } else {
      this.fileSize = 0;
    }
  }

  private getSelectedOutputs(): Output[] {
    const fileFormats = Object.keys(this.data).map(fileFormat => this.data[fileFormat]);
    const selectedOutputs = fileFormats
      .map(fileFormat => Object.keys(fileFormat).map(outputFormat => fileFormat[outputFormat] ));

    const outputs = this.flatMap(this.flatMap(selectedOutputs, i => i).filter(i => i.selected), i => i.values).map(i => i.output);
    return outputs;
  }

  flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
    return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]> []);
  }
}
