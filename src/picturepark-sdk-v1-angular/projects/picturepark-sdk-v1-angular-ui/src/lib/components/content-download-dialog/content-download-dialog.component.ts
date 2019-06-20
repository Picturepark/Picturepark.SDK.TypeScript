import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OutputSelection } from './output-selection';
import { Output, ContentDownloadLinkCreateRequest, ContentService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['./content-download-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDownloadDialogComponent implements OnInit {
  public fileSize = 0;
  public enableAdvanced = false;
  public advancedMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OutputSelection,
    public dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    private contentService: ContentService) { }

  ngOnInit() {
    this.update();
  }

  public download(): void {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.data.getSelectedOutputs().map(i => ({ contentId: i.contentId, outputFormatId: i.outputFormatId }))
    });
    const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
        linkSubscription.unsubscribe();
        if (data.downloadUrl) {
            window.location.replace(data.downloadUrl);
            this.dialogRef.close(true);
        }
    });
  }

  public toggleAdvanced(): void {
    this.data.toggleThumbnails();
    this.update();
  }

  public update(): void {
    this.enableAdvanced = this.data.hasThumbnails;
    this.advancedMode = !this.data.hasHiddenThumbnails;
    const outputs = this.data.getSelectedOutputs();
    if (outputs.length > 0) {
      this.fileSize = outputs.map(i => i.detail!.fileSizeInBytes!).reduce((total, value) => total + value );
    } else {
      this.fileSize = 0;
    }
  }
}
