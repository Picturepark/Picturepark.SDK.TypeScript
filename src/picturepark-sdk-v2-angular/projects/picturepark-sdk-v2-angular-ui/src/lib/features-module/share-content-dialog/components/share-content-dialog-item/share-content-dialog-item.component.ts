import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { Content } from '@picturepark/sdk-v2-angular';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ContentItemThumbnailComponent } from '../../../../shared-module/components/content-item-thumbnail/content-item-thumbnail.component';

@Component({
    selector: 'pp-share-content-dialog-item',
    templateUrl: './share-content-dialog-item.component.html',
    styleUrls: ['./share-content-dialog-item.component.scss', './share-content-dialog-item-resp.component.scss'],
    standalone: true,
    imports: [
        ContentItemThumbnailComponent,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        TranslatePipe,
    ],
})
export class ShareContentDialogItemComponent extends BaseComponent implements OnDestroy {
  @Input()
  item: Content;

  @Output() removeDialogContent = new EventEmitter<Content>();

  remove() {
    this.removeDialogContent.emit(this.item);
  }
}
