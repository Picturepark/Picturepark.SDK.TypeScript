import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  ContentDetail,
  ContentResolveBehavior,
  ContentService,
  SchemaDetail,
  SchemaService,
} from '@picturepark/sdk-v1-angular';

import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { LiquidRenderingService } from '../../shared-module/services/liquid-rendering/liquid-rendering.service';
import { DialogBaseComponent } from '../dialog/components/dialog-base/dialog-base.component';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<ContentDetailsDialogComponent>,
    private liquidRenderingService: LiquidRenderingService,
    protected injector: Injector,
    private schemaService: SchemaService,
  ) {
    super(data, dialogRef, injector);

    this.contentId = data;
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
        this.schemas = await this.schemaService.getMany(this.content.layerSchemaIds.concat(this.content.contentSchemaId)).toPromise();
      }
    });

    this.subscription.add(contentGetSubscription);
  }
}
