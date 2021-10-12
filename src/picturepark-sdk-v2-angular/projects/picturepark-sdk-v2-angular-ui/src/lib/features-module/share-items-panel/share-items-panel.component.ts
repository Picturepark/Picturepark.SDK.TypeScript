import { Component, EventEmitter, Inject, Injector, Input, Optional, Output } from '@angular/core';
import { LocalStorageService, ShareContentDetail, ShareDetail, StorageKey, ThumbnailSize } from '@picturepark/sdk-v2-angular';
import { VIEW_MODE } from '../../configuration';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss'],
})
export class ShareItemsPanelComponent extends BaseComponent {
  @Input() shareDetail: ShareDetail;
  @Input() isShareViewer: boolean;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  thumbnailSize = ThumbnailSize;

  constructor(injector: Injector,
    private contentDownloadDialogService: ContentDownloadDialogService,
    private localStorageService: LocalStorageService,
    @Optional() @Inject(VIEW_MODE) public viewMode: 'grid' | 'list') {
    super(injector);
  }

  openInNewWindow(item: ShareContentDetail): void {
    this.showDetail.emit(item);
  }

  public downloadItem(item: ShareContentDetail) {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [item],
      isShareViewer: this.isShareViewer
    });
  }

  onViewChange(view: 'grid' | 'list'): void {
    this.viewMode = view;
  }
}
