import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  ContentDetail,
  ContentResolveBehavior,
  ContentService,
  SchemaDetail,
  SchemaService,
  ShareContentDetail,
} from '@picturepark/sdk-v1-angular';

import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { DialogBaseComponent } from '../../shared-module/components/dialog-base/dialog-base.component';
import { ContentDetailsDialogOptions } from './content-details-dialog-options';

// SERVICES
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'pp-content-details-dialog',
  templateUrl: './content-details-dialog.component.html',
  styleUrls: [
    '../../shared-module/components/dialog-base/dialog-base.component.scss',
    './content-details-dialog.component.scss',
  ],
  providers: [TranslatePipe],
})
export class ContentDetailsDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {
  content: ContentDetail | ShareContentDetail;

  contentId: string;
  schemas: SchemaDetail[];
  playing = false;

  constructor(
    private contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: ContentDetailsDialogOptions,
    protected dialogRef: MatDialogRef<ContentDetailsDialogComponent>,
    protected injector: Injector,
    private schemaService: SchemaService,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super(data, dialogRef, injector);

    const shareDetail = this.data.shareDetail;
    if (shareDetail?.schemas) {
      this.schemas = shareDetail.schemas;
    }

    const shareContent = this.data.shareContent;
    if (shareContent) {
      this.content = shareContent as any;
      return;
    }

    this.loadContent(data.id);
  }

  loadSchemas(): void {
    this.schemaService.getMany([this.content.contentSchemaId]).subscribe((schemas) => {
      this.schemas = schemas;
    });
  }

  tabChange(event: MatTabChangeEvent): void {
    // Load schemas if we change to metadata tab and selected content schema does not exist
    if (
      event.index === 1 &&
      (!this.schemas || !this.schemas.find((schema) => schema.id === this.content.contentSchemaId))
    ) {
      this.loadSchemas();
    }
  }

  public downloadItem() {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [this.content],
    });
  }

  public next(): void {
    this.setContent(this.data.next());
  }

  public previous(): void {
    this.setContent(this.data.previous());
  }

  setContentId(id: string) {
    this.setContent(of(id));
  }

  setContent(detail: Observable<ShareContentDetail | ContentDetail | string>) {
    this.content = null as any;
    this.playing = false;

    // setTimeout required, otherwise the UI will not correctly refresh on prev/next
    setTimeout(() => {
      this.sub = detail.subscribe((content) => {
        if (typeof content === 'string') {
          this.loadContent(content);
        } else {
          this.content = content;
        }
      });
    });
  }

  loadContent(id: string) {
    this.contentId = id;
    this.sub = this.contentService
      .get(this.contentId, [
        ContentResolveBehavior.Content,
        ContentResolveBehavior.Metadata,
        ContentResolveBehavior.InnerDisplayValueName,
        ContentResolveBehavior.InnerDisplayValueList,
        ContentResolveBehavior.InnerDisplayValueThumbnail,
        ContentResolveBehavior.OuterDisplayValueName,
        ContentResolveBehavior.OuterDisplayValueDetail,
        ContentResolveBehavior.OuterDisplayValueThumbnail,
        ContentResolveBehavior.Outputs,
      ])
      .subscribe(async (content) => {
        if (content) {
          this.content = content;
        }
      });
  }
}
