import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// LIBRARIES
import { ShareContentDetail, ShareDetail, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss'],
})
export class ShareItemsPanelComponent implements OnInit, OnChanges {
  @Input() view: 'grid' | 'list' = 'grid';
  @Input() items: ShareContentDetail[];
  @Input() shareDetail: ShareDetail;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  // VARS
  loader = false;

  public thumbnailSize = ThumbnailSize;

  constructor(private contentDownloadDialogService: ContentDownloadDialogService) {}

  // OPEN IN NEW WINDOW
  openInNewWindow(item: ShareContentDetail): void {
    this.showDetail.emit(item);
  }

  // DELETE ITEM
  deleteItem(item: ShareContentDetail): void {}

  public downloadItem(item: ShareContentDetail) {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [item],
    });
  }

  ngOnInit() {
    this.loader = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = changes.items && changes.items.currentValue;

    if (this.items) {
      this.loader = false;
    }
  }
}
