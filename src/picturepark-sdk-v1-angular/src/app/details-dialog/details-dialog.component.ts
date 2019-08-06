import {
  Component, OnInit, OnDestroy, Inject, Injector
} from '@angular/core';

import {
  ContentService, ContentDetail, ContentResolveBehavior, SchemaDetail, SchemaService
} from '@picturepark/sdk-v1-angular';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LiquidRenderingService } from '@picturepark/sdk-v1-angular-ui';
// tslint:disable-next-line:max-line-length
import { DialogBaseComponent } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/features-module/dialog/components/dialog-base/dialog-base.component';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: [
    '../../../projects/picturepark-sdk-v1-angular-ui/src/lib/features-module/dialog/components/dialog-base/dialog-base.component.scss',
    './details-dialog.component.scss'
  ]
})
export class DetailsDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  content: ContentDetail;

  contentId: string;
  public schemas: SchemaDetail[];

  constructor(
    private contentService: ContentService,
    private liquidRenderingService: LiquidRenderingService,
    private schemaService: SchemaService,
    protected dialogRef: MatDialogRef<DetailsDialogComponent>,
    protected injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
      super(data, dialogRef, injector);

      if (!data) {
        return;
      }

      this.contentId = data;
      const contentGetSubscription = this.contentService.get(this.contentId, [
        ContentResolveBehavior.Content,
        ContentResolveBehavior.Metadata,
        ContentResolveBehavior.LinkedListItems,
        ContentResolveBehavior.InnerDisplayValueName,
        ContentResolveBehavior.OuterDisplayValueName,
        ContentResolveBehavior.OuterDisplayValueDetail,
        ContentResolveBehavior.Outputs
      ]).subscribe(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        this.content = content;

        this.schemas = await this.schemaService.getMany(this.content.layerSchemaIds.concat(this.content.contentSchemaId)).toPromise();
      });

      this.subscription.add(contentGetSubscription);
  }

  ngOnInit() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.onKeyDown, false);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
    /* tslint:disable-next-line */
    if (e.target instanceof HTMLBodyElement && e.keyCode === 27) {
      e.cancelBubble = true;
      e.preventDefault();

      // Close
    }
  }
}
