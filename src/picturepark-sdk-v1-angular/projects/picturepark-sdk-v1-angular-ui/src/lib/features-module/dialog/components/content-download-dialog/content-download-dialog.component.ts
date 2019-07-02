import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// LIBRARIES
import { ContentDownloadLinkCreateRequest, ContentService } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';

// SERVICES
import { NotificationService } from '../../../../shared-module/services/notification/notification.service';
import { OutputSelection } from './components/output-selection';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './content-download-dialog.component.scss']
})
export class ContentDownloadDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  public fileSize = 0;
  public enableAdvanced = false;
  public advancedMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OutputSelection,
    private contentService: ContentService,
    protected dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    protected notificationService: NotificationService,
  ) {
    super(data, dialogRef, notificationService);
  }

  // DOWNLOAD SELECTED CONTENT
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

  // TOGGLE ADVANCED
  public toggleAdvanced(): void {
    this.data.toggleThumbnails();
    this.update();
  }

  // UPDATE
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
