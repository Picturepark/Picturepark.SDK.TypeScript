import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import {
  ContentDetail,
  ContentResolveBehavior,
  ContentService,
  SchemaDetail,
  SchemaService,
  ShareContentDetail,
} from '@picturepark/sdk-v1-angular';

import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { LiquidRenderingService } from '../../shared-module/services/liquid-rendering/liquid-rendering.service';
import { DialogBaseComponent } from '../dialog/components/dialog-base/dialog-base.component';
import { ContentDetailDialogOptions } from './ContentDetailDialogOptions';
import { FullscreenService } from './fullscreen.service';

@Component({
  selector: 'pp-content-details-dialog',
  templateUrl: './content-details-dialog.component.html',
  styleUrls: ['../dialog/components/dialog-base/dialog-base.component.scss', './content-details-dialog.component.scss'],
  providers: [ TranslatePipe ]
})
export class ContentDetailsDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  content: ContentDetail;

  contentId: string;
  schemas: SchemaDetail[];

  constructor(
    private contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: ContentDetailDialogOptions,
    protected dialogRef: MatDialogRef<ContentDetailsDialogComponent>,
    private liquidRenderingService: LiquidRenderingService,
    protected injector: Injector,
    private schemaService: SchemaService
  ) {
    super(data, dialogRef, injector);

    const shareContent = this.data.shareContent;
    if (shareContent) {
      this.liquidRenderingService.renderNestedDisplayValues(shareContent);
      this.content = shareContent as any;
      return;
    }

    this.contentId = data.id;
    const contentGetSubscription = this.contentService.get(this.contentId, [
      ContentResolveBehavior.Content,
      ContentResolveBehavior.Metadata,
      ContentResolveBehavior.LinkedListItems,
      ContentResolveBehavior.InnerDisplayValueName,
      ContentResolveBehavior.InnerDisplayValueList,
      ContentResolveBehavior.OuterDisplayValueName,
      ContentResolveBehavior.OuterDisplayValueDetail,
      ContentResolveBehavior.Outputs
    ]).subscribe(async content => {
      await this.liquidRenderingService.renderNestedDisplayValues(content);
      if (content) {
        this.content = content;
      }
    });

    this.subscription.add(contentGetSubscription);

  }

  loadSchemas(): void {
    this.schemaService.getMany(this.content.layerSchemaIds.concat(this.content.contentSchemaId)).subscribe(schemas => {
      this.schemas = schemas;
    });
  }

  tabChange(event: MatTabChangeEvent): void {
    // Load schemas if we change to metadata tab
    if (event.index === 1 && !this.schemas) {
      this.loadSchemas();
    }
  }
}
