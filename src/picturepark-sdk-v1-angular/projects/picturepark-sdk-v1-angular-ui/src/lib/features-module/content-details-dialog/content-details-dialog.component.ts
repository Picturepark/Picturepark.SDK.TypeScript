import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  ContentDetail,
  ContentResolveBehavior,
  ContentService,
  SchemaDetail,
  SchemaService,
} from '@picturepark/sdk-v1-angular';

import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { DialogBaseComponent } from '../../shared-module/components/dialog-base/dialog-base.component';
import { ContentDetailDialogOptions } from './ContentDetailDialogOptions';

// SERVICES
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';

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
  content: ContentDetail;

  contentId: string;
  schemas: SchemaDetail[];
  playing = false;

  constructor(
    private contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: ContentDetailDialogOptions,
    protected dialogRef: MatDialogRef<ContentDetailsDialogComponent>,
    protected injector: Injector,
    private schemaService: SchemaService,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super(data, dialogRef, injector);

    const shareContent = this.data.shareContent;
    if (shareContent) {
      this.content = shareContent as any;
      return;
    }

    this.loadContent(data.id);
  }

  loadSchemas(): void {
    this.schemaService
      .getMany(this.content.layerSchemaIds!.concat(this.content.contentSchemaId))
      .subscribe((schemas) => {
        this.schemas = schemas;
      });
  }

  tabChange(event: MatTabChangeEvent): void {
    // Load schemas if we change to metadata tab
    if (event.index === 1 && !this.schemas) {
      this.loadSchemas();
    }
  }

  public downloadItem() {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [this.content],
    });
  }

  public async next(): Promise<void> {
    this.setContent(this.data.next() as any);
  }

  public async previous(): Promise<void> {
    this.setContent(this.data.previous() as any);
  }

  setContent(detail: ContentDetail | string) {
    this.content = null as any;
    this.playing = false;
    setTimeout(() => {
      if (typeof detail === 'string') {
        this.loadContent(detail);
      } else {
        this.content = detail;
      }
    });
  }

  loadContent(id: string) {
    this.contentId = id;
    const contentGetSubscription = this.contentService
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

    this.subscription.add(contentGetSubscription);
  }
}
