import { Component, OnInit, Inject, OnDestroy, Injector, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// LIBRARIES
import {
  ContentDownloadLinkCreateRequest,
  ContentService,
  Content,
  fetchAll,
  OutputRenderingState,
  OutputService,
  OutputSearchRequest,
  ContentResolveBehavior,
  IShareOutputBase,
  BusinessProcessService,
  PICTUREPARK_CONFIGURATION,
  PictureparkConfiguration,
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { DialogBaseComponent } from '../dialog/components/dialog-base/dialog-base.component';
import {
  OutputSelection,
  IOutputPerOutputFormatSelection,
  IOutputPerSchemaSelection,
} from './components/output-selection';
import { MatSnackBar } from '@angular/material/snack-bar';

// SERVICES
import { TranslationService } from '../../shared-module/services/translations/translation.service';
import { groupBy, flatMap } from '../../utilities/helper';
import {
  ContentDownloadDialogOptions,
  IContentDownload,
  IContentDownloadOutput,
} from './content-download-dialog.interfaces';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: [
    '../dialog/components/dialog-base/dialog-base.component.scss',
    './content-download-dialog.component.scss',
  ],
})
export class ContentDownloadDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {
  @ViewChild('contentContainer', { static: true }) contentContainer: ElementRef;
  @ViewChild('loaderContainer', { static: true }) loaderContainer: ElementRef;

  // SUBSCRIBERS
  downloadContentSubscriber: Subscription;

  // VARS
  public selection: OutputSelection;
  public fileSize = 0;
  public enableAdvanced = false;
  public advancedMode = false;
  public filteredData: Content[];
  public noOutputs = false;
  public hasDynamicOutputs = false;
  public singleItem = false;
  public waintingDownload = false;

  public loader = false;

  public outputFormatFallback = [
    { fileSchemaId: 'ImageMetadata', outputFormatId: 'Preview' },
    { fileSchemaId: 'VectorMetadata', outputFormatId: 'Pdf' },
    { fileSchemaId: 'DocumentMetadata', outputFormatId: 'Pdf' },
    { fileSchemaId: 'AudioMetadata', outputFormatId: 'AudioSmall' },
    { fileSchemaId: 'VideoMetadata', outputFormatId: 'VideoLarge' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContentDownloadDialogOptions,
    @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration: PictureparkConfiguration,
    private contentService: ContentService,
    protected dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    protected injector: Injector,
    private renderer: Renderer2,
    private translationService: TranslationService,
    private businessProcessService: BusinessProcessService,
    private snackBar: MatSnackBar,
    private outputService: OutputService,
    private dialogService: DialogService
  ) {
    super(data, dialogRef, injector);

    this.loader = true;
  }

  async getSelection(outputs: IContentDownloadOutput[], contents: IContentDownload[]) {
    const translations = await this.translationService.getOutputFormatTranslations();
    const selection = new OutputSelection(outputs, contents, translations, this.translationService);
    const fileFormats = selection.getFileFormats();

    fileFormats.forEach(fileFormat => {
      const fileFormatOutputs = selection.getOutputs(fileFormat);
      const fileFormatContents = flatMap(fileFormatOutputs, i => i.values);
      if (fileFormat.contents.length === 0) {
        return;
      }

      const fallbackOutputs = fileFormat.contents
        .map(content =>
          this.getOutput(
            content,
            fileFormatContents.filter(j => j.content.id === content.id).map(i => i.output)
          )
        )
        .filter(i => i);

      if (fallbackOutputs.length === 0) {
        return;
      }

      const grouped = groupBy(fallbackOutputs, i => i.outputFormatId);
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

    this.selection = selection;
    this.noOutputs = !fileFormats.some(i => selection.getOutputs(i).length > 0);
    this.singleItem = fileFormats.length === 1 && fileFormats[0].contents.length === 1;
  }

  public download(): void {
    const data = this.selection.getSelectedOutputs();

    // Single share download
    if (data.length === 1) {
      const shareOutput = data[0] as IShareOutputBase;
      if (shareOutput.downloadUrl) {
        window.location.replace(shareOutput.downloadUrl);
        this.dialogRef.close(true);
        return;
      }
    }

    const request = new ContentDownloadLinkCreateRequest({
      contents: data.map(i => ({ contentId: i.contentId, outputFormatId: i.outputFormatId })),
      notifyProgress: true,
    });
    this.waintingDownload = true;
    this.sub = this.contentService.createDownloadLink(request).subscribe(businessProcess => {
      let isTimmerRunning = true;
      const downloadTimmer = setTimeout(() => {
        isTimmerRunning = false;
        this.dialogRef.close();
        this.snackBar.open(this.translationService.translate('ContentDownloadDialog.DownloadPending'), undefined, {
          duration: 3000,
        });
      }, 8000);

      this.businessProcessService.waitForCompletion(businessProcess.id, null, false).subscribe(
        businessProcessResult => {
          // TODO build the download URL with the referenceID
          clearTimeout(downloadTimmer);
          if (!isTimmerRunning) {
            // download immedeatly
            // window.location.replace(downloadUrl);
            this.dialogRef.close();
          } else {
            this.dialogService
              .confirm(
                {
                  title: this.translationService.translate('ContentDownloadDialog.ConfirmDownloadTitle'),
                  message: this.translationService.translate('ContentDownloadDialog.ConfirmDownloadMessage'),
                  options: {
                    okText: this.translationService.translate('ContentDownloadDialog.Download'),
                    cancelText: this.translationService.translate('ContentDownloadDialog.ConfirmDownloadTitle'),
                  },
                },
                { disableClose: true }
              )
              .afterClosed()
              .subscribe(confirmDialogResult => {
                // TODO check different results from here
                debugger;
                if (confirmDialogResult) {
                  //  download
                  // window.location.replace(downloadUrl);
                }
              });
          }
        },
        error => {
          this.snackBar.open(this.translationService.translate('ContentDownloadDialog.DownloadError'), undefined, {
            duration: 3000,
          });
        }
      );
    });
  }

  public toggleAdvanced(): void {
    this.selection.toggleThumbnails();
    this.update();
  }

  public radioChange(output: IOutputPerOutputFormatSelection, fileType: IOutputPerSchemaSelection): void {
    this.selection.getOutputs(fileType).forEach(i => (i.selected = false));
    output.selected = true;
    this.update();
  }

  public update(): void {
    this.enableAdvanced = this.selection.hasThumbnails;
    this.advancedMode = !this.selection.hasHiddenThumbnails;
    const outputs = this.selection.getSelectedOutputs();
    this.hasDynamicOutputs = outputs.some(i => i.dynamicRendering && !i.detail!.fileSizeInBytes);
    if (outputs.length > 0 && false) {
      // TODO SAN get the filesize from somewhere else
      this.fileSize = outputs.map(i => i.detail!.fileSizeInBytes || 0).reduce((total, value) => total + value);
    } else {
      this.fileSize = 0;
    }
  }

  // GET OUTPUT
  public getOutput(content: IContentDownload, outputs: IContentDownloadOutput[]): IContentDownloadOutput {
    // Try to use Original
    let output = outputs.find(i => i.outputFormatId === 'Original');
    if (output) {
      return output;
    }

    // Fallback to configured output formats
    this.outputFormatFallback
      .filter(i => i.fileSchemaId === content.contentSchemaId)
      .forEach(fallback => {
        output = outputs.find(i => i.outputFormatId === fallback.outputFormatId);
      });

    // If still no output, fallback to Preview
    if (!output) {
      output = outputs.find(i => i.outputFormatId === 'Preview');
    }

    return output!;
  }

  async ngOnInit() {
    super.init();

    // SET LOADER HEIGHT DYNAMIC
    const containerHeight = this.contentContainer.nativeElement.offsetHeight;
    this.renderer.setStyle(this.loaderContainer.nativeElement, 'height', `${containerHeight + 56}px`);

    if (this.data.contents.length === 1) {
      const outputs = this.data.contents[0]?.outputs;
      if (outputs) {
        await this.setSelection(outputs);
        return;
      }

      // this.sub = this.contentService.getOutputs(this.data.contents[0].id).subscribe(output => {
      //   this.setSelection(output);
      // });

      // TODO SAN to remove
      this.sub = this.contentService
        .get(this.data.contents[0].id, [ContentResolveBehavior.Outputs])
        .subscribe(content => {
          this.setSelection(content.outputs!);
        });
    } else {
      if (this.data.contents.every(content => content.outputs)) {
        const outputs = flatMap(this.data.contents, content => content.outputs!);
        await this.setSelection(outputs);
        return;
      }

      this.fetchOutputs();
    }
  }

  private async setSelection(outputs: IContentDownloadOutput[]): Promise<void> {
    await this.getSelection(outputs, this.data.contents);
    this.update();
    this.loader = false;
  }

  private fetchOutputs(): void {
    // this.openSnackbar();
    // if (this.data.contents.length <= 1000) {
    //   const request = new OutputResolveManyRequest({ contentIds: this.data.contents.map(i => i.id) });
    //   this.sub = this.contentService.getOutputsMany(request).subscribe(async outputs => {
    //     await this.getSelection(outputs, this.data.contents);
    //     this.update();
    //     this.loader = false;
    //   });
    // } else {
    //   // TODO SAN handle with the case of more than 1000 contents
    // }
    this.sub = fetchAll(
      req => this.outputService.search(req),
      new OutputSearchRequest({
        contentIds: this.data.contents.map(i => i.id),
        renderingStates: [OutputRenderingState.Completed],
        limit: 1000,
      })
    ).subscribe(async outputs => {
      await this.getSelection(outputs.results, this.data.contents);
      this.update();
      this.loader = false;
    });
  }

  // openSnackbar() {
  //   const sheetRef = this.matBottomSheet.open(SnackbarComponent, {
  //     data: { test: 'am a test' },
  //     disableClose: true,
  //   });
  //   sheetRef.afterDismissed().subscribe(data => {
  //     debugger;
  //   });
  // }
}
