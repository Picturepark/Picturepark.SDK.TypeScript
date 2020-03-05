import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

// LIBRARIES
import { ShareContentDetail, ShareDetail } from '@picturepark/sdk-v1-angular';
import { PanelBaseComponent } from '../panel/components/panel-base/panel-base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';
import { ContentDownloadService } from '../content-download-dialog/components/content-download';

// COMPONENTS

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss']
})
export class ShareItemsPanelComponent extends PanelBaseComponent implements OnInit, OnChanges {

  @Input() view: 'grid' | 'list' = 'grid';
  @Input() items: ShareContentDetail[];
  @Input() shareDetail: ShareDetail;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  // VARS
  loader = false;

  constructor(
    private contentDownloadDialogService: ContentDownloadDialogService,
    private contentDownloadService: ContentDownloadService,
  ) {
    super();
  }

  // OPEN IN NEW WINDOW
  openInNewWindow(item: ShareContentDetail): void {
    this.showDetail.emit(item);
  }

  // DELETE ITEM
  deleteItem(item: ShareContentDetail): void {

  }

  public downloadItem(item: ShareContentDetail) {
    this.contentDownloadDialogService.showDialog({
      mode: 'single',
      contents: [this.contentDownloadService.fromContentDetail(item)]
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
