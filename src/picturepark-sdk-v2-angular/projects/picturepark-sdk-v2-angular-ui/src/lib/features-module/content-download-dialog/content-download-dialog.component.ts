import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom, Subscription } from 'rxjs';

// LIBRARIES
import {
  ContentService,
  Content,
  IShareOutputBase,
  OutputResolveManyRequest,
  DownloadFacade,
  ShareAccessFacade,
  OutputRenderingState,
  InfoFacade,
} from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { DialogBaseComponent } from '../../shared-module/components/dialog-base/dialog-base.component';
import {
  OutputSelection,
  IOutputPerOutputFormatSelection,
  IOutputPerSchemaSelection,
} from './components/output-selection';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

// SERVICES
import { TranslationService } from '../../shared-module/services/translations/translation.service';
import { groupBy, flatMap } from '../../utilities/helper';
import {
  ContentDownloadDialogOptions,
  IContentDownload,
  IContentDownloadOutput,
} from './interfaces/content-download-dialog.interfaces';
import { DialogService } from '../../shared-module/services/dialog/dialog.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FileSizePipe } from '../../shared-module/pipes/filesize.pipe';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationComponent } from '../notification/components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pp-content-download-dialog',
  templateUrl: './content-download-dialog.component.html',
  styleUrls: [
    '../../shared-module/components/dialog-base/dialog-base.component.scss',
    './content-download-dialog.component.scss',
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    NotificationComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    TranslatePipe,
    FileSizePipe,
  ],
})
export class ContentDownloadDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {
  @ViewChild('contentContainer', { static: true }) contentContainer: ElementRef;
  @ViewChild('loaderContainer', { static: true }) loaderContainer: ElementRef;

  // SUBSCRIBERS
  downloadContentSubscriber: Subscription;

  // VARS
  selection: OutputSelection;
  fileSize = 0;
  enableAdvanced = false;
  advancedMode = false;
  filteredData: Content[];
  missingOutputs = { all: false, count: 0 };
  hasDynamicOutputs = false;
  waitingDownload = false;
  tooManyContents = false;

  outputFormatFallback = [
    { fileSchemaId: 'ImageMetadata', outputFormatId: 'Preview' },
    { fileSchemaId: 'VectorMetadata', outputFormatId: 'Pdf' },
    { fileSchemaId: 'DocumentMetadata', outputFormatId: 'Pdf' },
    { fileSchemaId: 'AudioMetadata', outputFormatId: 'AudioSmall' },
    { fileSchemaId: 'VideoMetadata', outputFormatId: 'VideoLarge' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContentDownloadDialogOptions,
    private contentService: ContentService,
    private shareAccessFacade: ShareAccessFacade,
    protected dialogRef: MatDialogRef<ContentDownloadDialogComponent>,
    private translationService: TranslationService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private downloadFacade: DownloadFacade,
    private infoFacade: InfoFacade
  ) {
    super(dialogRef);
  }

  async ngOnInit() {
    super.init();

    if (this.data.contents.length > 1000) {
      this.tooManyContents = true;
    } else if (this.data.contents.length === 1) {
      const outputs = this.data.contents[0]?.outputs;
      if (outputs) {
        await this.setSelection(outputs);
        return;
      }

      this.sub = this.contentService
        .getOutputs(this.data.contents[0].id)
        .subscribe(output => this.setSelection(output));
    } else {
      if (this.data.contents.every(content => content.outputs)) {
        const outputs = flatMap(this.data.contents, content => content.outputs ?? []);
        await this.setSelection(outputs);
        return;
      }

      this.fetchOutputs();
    }
  }

  async getSelection(outputs: IContentDownloadOutput[], contents: IContentDownload[]) {
    const translations = await this.translationService.getOutputFormatTranslations();
    const customerInfo = await firstValueFrom(this.infoFacade.getInfo());

    const ignoreStates = [OutputRenderingState.Failed, OutputRenderingState.Skipped];
    const selection = new OutputSelection(
      outputs.filter(
        o =>
          (o.dynamicRendering && (o.renderingState !== OutputRenderingState.Failed || contents.length > 1)) ||
          !ignoreStates.includes(o.renderingState as any)
      ),
      contents,
      translations,
      this.translationService,
      customerInfo.outputFormats
    );

    selection.fileFormats.forEach(fileFormat => {
      const fileFormatOutputs = selection.outputs[fileFormat.id];
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

      const grouped = groupBy(fallbackOutputs, i => i?.outputFormatId);
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

    this.missingOutputs.all = !selection.fileFormats.some(i => selection.outputs[i.id].length > 0);
    this.missingOutputs.count = selection.fileFormats
      .filter(i => selection.outputs[i.id].length === 0)
      .map(f => f.contents.length)
      .reduce((a, b) => a + b, 0);
  }

  download(): void {
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

    this.waitingDownload = true;
    let snackBar: MatSnackBarRef<SnackbarComponent>;
    const downloadTimmer = setTimeout(() => {
      this.waitingDownload = false;
      this.dialogRef.close();
      snackBar = this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          displayText: this.translationService.translate('ContentDownloadDialog.DownloadPending'),
          showLoader: true,
        },
      });
    }, 8000);

    const contents = data.map(i => ({ contentId: i.contentId, outputFormatId: i.outputFormatId }));
    (this.data.shareToken
      ? this.shareAccessFacade.createShareSelectionDownloadLink(this.data.shareToken, contents)
      : this.downloadFacade.getDownloadLink(contents)
    ).subscribe(
      downloadLink => {
        clearTimeout(downloadTimmer);
        if (this.waitingDownload) {
          window.location.replace(downloadLink.downloadUrl);
          this.dialogRef.close();
        } else {
          snackBar.dismiss();
          this.dialogService
            .confirm(
              {
                title: this.translationService.translate('ContentDownloadDialog.ConfirmDownloadTitle'),
                message: this.translationService.translate('ContentDownloadDialog.ConfirmDownloadMessage'),
                options: {
                  okText: this.translationService.translate('ContentDownloadDialog.Download'),
                  cancelText: this.translationService.translate('ContentDownloadDialog.Cancel'),
                },
                isShareViewer: this.data.isShareViewer,
              },
              { disableClose: true }
            )
            .afterClosed()
            .subscribe(confirmDialogResult => {
              if (confirmDialogResult) {
                window.location.replace(downloadLink.downloadUrl);
              }
            });
        }
      },
      () => {
        clearTimeout(downloadTimmer);
        this.snackBar.open(this.translationService.translate('ContentDownloadDialog.DownloadError'), undefined, {
          duration: 5000,
        });
        this.dialogRef.close();
      }
    );
  }

  toggleAdvanced(): void {
    this.selection.toggleShowMore();
    this.update();
  }

  radioChange(output: IOutputPerOutputFormatSelection, fileType: IOutputPerSchemaSelection): void {
    this.selection.getOutputs(fileType).forEach(i => (i.selected = false));
    output.selected = true;
    this.update();
  }

  update(): void {
    this.enableAdvanced = this.selection.hasThumbnails;
    this.advancedMode = !this.selection.hasHiddenOutputFormats;
    const outputs = this.selection.getSelectedOutputs();
    this.hasDynamicOutputs = outputs.some(i => i.dynamicRendering);
    if (outputs.length > 0) {
      this.fileSize = outputs
        .map(i => {
          return i.detail?.fileSizeInBytes || i.fileSize || 0;
        })
        .reduce((total, value) => total + value);
    } else {
      this.fileSize = 0;
    }
  }

  getOutput(content: IContentDownload, outputs: IContentDownloadOutput[]) {
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

    return output;
  }

  private async setSelection(outputs: IContentDownloadOutput[]) {
    await this.getSelection(outputs, this.data.contents);
    this.update();
  }

  private fetchOutputs(): void {
    this.sub =
      this.data.contents.length === 1
        ? this.contentService.getOutputs(this.data.contents[0].id).subscribe(result => this.setSelection(result))
        : this.contentService
            .getOutputsMany(new OutputResolveManyRequest({ contentIds: this.data.contents.map(i => i.id) }))
            .subscribe(outputs => this.setSelection(outputs));
  }
}
