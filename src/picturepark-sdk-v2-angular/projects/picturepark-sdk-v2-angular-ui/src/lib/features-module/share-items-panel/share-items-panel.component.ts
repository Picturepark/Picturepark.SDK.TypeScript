import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { ShareContentDetail, ShareDetail, ThumbnailSize } from '@picturepark/sdk-v2-angular';
import { VIEW_MODE } from '../../configuration';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentItemThumbnailComponent } from '../../shared-module/components/content-item-thumbnail/content-item-thumbnail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { PanelComponent } from '../../shared-module/components/panel/panel.component';

@Component({
    selector: 'pp-share-items-panel',
    templateUrl: './share-items-panel.component.html',
    styleUrls: ['./share-items-panel.component.scss'],
    standalone: true,
    imports: [
        PanelComponent,
        NgIf,
        MatButtonModule,
        MatIconModule,
        NgClass,
        NgFor,
        ContentItemThumbnailComponent,
        MatTooltipModule,
        TranslatePipe,
    ],
})
export class ShareItemsPanelComponent extends BaseComponent {
  @Input() shareDetail: ShareDetail;
  @Input() isShareViewer: boolean;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  thumbnailSize = ThumbnailSize;

  constructor(
    private contentDownloadDialogService: ContentDownloadDialogService,
    @Optional() @Inject(VIEW_MODE) public viewMode: 'grid' | 'list'
  ) {
    super();
  }

  openInNewWindow(item: ShareContentDetail) {
    this.showDetail.emit(item);
  }

  downloadItem(item: ShareContentDetail) {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [item],
      isShareViewer: this.isShareViewer,
    });
  }

  onViewChange(view: 'grid' | 'list') {
    this.viewMode = view;
  }
}
