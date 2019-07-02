import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

// LIBRARIES
import { ContentDownloadLinkCreateRequest, ContentService } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';
import { OutputSelection } from './components/output-selection';

// SERVICES
import { DownloadFallbackService } from '../../../../shared-module/services/download-fallback/download-fallback.service';
import { NotificationService } from '../../../../shared-module/services/notification/notification.service';
import { TranslationService } from '../../../../shared-module/services/translations/translation.service';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './content-download-dialog.component.scss']
})
export class ContentDownloadDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBERS
  downloadContentSubscriber: Subscription;

  public fileSize = 0;
  public enableAdvanced = false;
  public advancedMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contentService: ContentService,
    protected dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    private downloadFallbackService: DownloadFallbackService,
    protected notificationService: NotificationService,
    private translationService: TranslationService,
  ) {
    super(data, dialogRef, notificationService);

    this.downloadFallbackService.download(this.data.filter(i => i.isSelected).map(i => i.item));

  }


  async getTranslations() {

    const translations = await this.translationService.getOutputFormatTranslations();
    const selection = new OutputSelection(outputs, contents, translations, this.translationService);
    // Preselect logic with fallback
    selection.getFileFormats().forEach(fileFormat => {
      const fileFormatOutputs = selection.getOutputs(fileFormat);
      const fileFormatContents = selection.flatMap(fileFormatOutputs, i => i.values);
      if (fileFormat.contents.length === 0) {
          return;
      }

      const fallbackOutputs = fileFormat.contents
          .map(content => this.getOutput(
              content,
              fileFormatContents.filter(j => j.content.id === content.id).map(i => i.output))
          )
          .filter(i => i);

      if (fallbackOutputs.length === 0) {
          return;
      }

      const grouped = this.groupBy(fallbackOutputs, i => i.outputFormatId);
      fileFormatOutputs.forEach(output => {
          const fallback = grouped.get(output.id);
          if (!fallback) {
              return;
          }
          if (fallback && fallback.length === fileFormat.contents.length) {
              output.selected = true;
          }
      });
    });
    
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

  // CLOSE DIALOG
  public closeDialog(): void {
    super.closeDialog();
  }

  ngOnInit() {
    super.ngOnInit();

    // DOWNLOAD CONTENT SUBSCRIBER
    this.downloadContentSubscriber = this.downloadFallbackService.downloadContentSubscriber().subscribe(outputs => {

      // OPEN DOWNLOAD CONTENT DIALOG
      this.openDownloadContentDialog(this.items.filter(i => i.isSelected).map(i => i.item), outputs);

    });

    // ADD SUBSCRIBER TO SUBSCRIPTIONS ON BASE COMPONENT
    this.subscription.add(this.downloadContentSubscriber);

  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
