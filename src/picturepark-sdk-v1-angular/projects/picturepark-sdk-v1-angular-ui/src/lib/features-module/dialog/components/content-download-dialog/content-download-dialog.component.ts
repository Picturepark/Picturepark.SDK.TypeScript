import { Component, OnInit, Inject, OnDestroy, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

// LIBRARIES
import {
  ContentDownloadLinkCreateRequest, ContentService, Content, Output as IOutPut
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';
import { OutputSelection } from './components/output-selection';

// SERVICES
import { DownloadFallbackService } from '../../../../shared-module/services/download-fallback/download-fallback.service';
import { TranslationService } from '../../../../shared-module/services/translations/translation.service';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './content-download-dialog.component.scss']
})
export class ContentDownloadDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBERS
  downloadContentSubscriber: Subscription;

  // VARS
  public selection: OutputSelection;
  public fileSize = 0;
  public enableAdvanced = false;
  public advancedMode = false;
  public filteredData: Content[];

  public loader = false;

  public outputFormatFallback = [
    { fileSchemaId: 'ImageMetadata', outputFormatId: 'Preview' },
    { fileSchemaId: 'DocumentMetadata', outputFormatId: 'Pdf' },
    { fileSchemaId: 'AudioMetadata', outputFormatId: 'AudioSmall' },
    { fileSchemaId: 'VideoMetadata', outputFormatId: 'VideoLarge' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Content[],
    private contentService: ContentService,
    protected dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    private downloadFallbackService: DownloadFallbackService,
    protected injector: Injector,
    private translationService: TranslationService,
  ) {
    super(data, dialogRef, injector);

    // DISPLAY LOADER
    this.loader = true;

    // DOWNLOAD SELECTED CONTENT INFO
    this.downloadFallbackService.download(this.data);

  }

  async getSelection(outputs: IOutPut[], contents: Content[]) {

    const translations = await this.translationService.getOutputFormatTranslations();
    const selection = new OutputSelection(outputs, contents, translations, this.translationService);
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

    this.loader = false;
    this.selection = selection;

  }

  // DOWNLOAD SELECTED CONTENT
  public download(): void {

    const request = new ContentDownloadLinkCreateRequest({
      contents: this.selection.getSelectedOutputs().map(i => ({ contentId: i.contentId, outputFormatId: i.outputFormatId }))
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
    this.selection.toggleThumbnails();
    this.update();
  }

  // UPDATE
  public update(): void {
    this.enableAdvanced = this.selection.hasThumbnails;
    this.advancedMode = !this.selection.hasHiddenThumbnails;
    const outputs = this.selection.getSelectedOutputs();
    if (outputs.length > 0) {
      this.fileSize = outputs.map(i => i.detail!.fileSizeInBytes!).reduce((total, value) => total + value );
    } else {
      this.fileSize = 0;
    }
  }

  // GROUP BY CATEGORIES
  public groupBy<T, K>(list: T[], getKey: (item: T) => K): Map<K, T[]> {
    const map = new Map<K, T[]>();
    list.forEach((item) => {
        const key = getKey(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }

  // GET OUTPUT
  public getOutput(content: Content, outputs: IOutPut[]): IOutPut {

    // Try to use Original
    let output = outputs.find(i => i.outputFormatId === 'Original');
    if (output) {
        return output;
    }

    // Fallback to configured output formats
    this.outputFormatFallback.filter(i => i.fileSchemaId === content.contentSchemaId).forEach(fallback => {
        output = outputs.find(i => i.outputFormatId === fallback.outputFormatId);
    });

    // If still no output, fallback to Preview
    if (!output) {
        output = outputs.find(i => i.outputFormatId === 'Preview');
    }

    return output!;
  }

  ngOnInit() {

    super.ngOnInit();

    // DOWNLOAD CONTENT SUBSCRIBER
    this.downloadContentSubscriber = this.downloadFallbackService.downloadContentSubscriber().subscribe(outputs => {
      this.getSelection(outputs, this.data);
    });

    // UNSUBSCRIBE
    this.subscription.add(this.downloadContentSubscriber);

  }

}
