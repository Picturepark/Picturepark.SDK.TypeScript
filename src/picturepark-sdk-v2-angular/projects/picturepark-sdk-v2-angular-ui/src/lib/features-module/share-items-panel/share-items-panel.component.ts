import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ShareContentDetail, ShareDetail, ThumbnailSize } from '@picturepark/sdk-v2-angular';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss'],
})
export class ShareItemsPanelComponent extends BaseComponent implements OnInit {
  @Input() view: 'grid' | 'list' = 'grid';
  @Input() shareDetail: ShareDetail;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  thumbnailSize = ThumbnailSize;

  constructor(injector: Injector, private contentDownloadDialogService: ContentDownloadDialogService) {
    super(injector);
  }

  openInNewWindow(item: ShareContentDetail): void {
    this.showDetail.emit(item);
  }

  public downloadItem(item: ShareContentDetail) {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [item],
    });
  }

  ngOnInit() {}
}
