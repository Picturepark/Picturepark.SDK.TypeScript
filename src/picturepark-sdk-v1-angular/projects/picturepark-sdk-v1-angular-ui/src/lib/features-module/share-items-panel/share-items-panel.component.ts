import { Component, EventEmitter, Injector, Input, NgZone, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ShareContentDetail, ShareDetail, ShareFacade, ShareService, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss'],
})
export class ShareItemsPanelComponent extends BaseComponent implements OnInit {
  @Input() view: 'grid' | 'list' = 'grid';
  @Input() shareToken: string;
  @Input() shareDetail: ShareDetail;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  // VARS
  itemsLoading = false;
  pageToken?: string;

  thumbnailSize = ThumbnailSize;

  constructor(
    injector: Injector,
    private contentDownloadDialogService: ContentDownloadDialogService,
    private shareService: ShareService,
    private shareFacade: ShareFacade,
    private ngZone: NgZone
  ) {
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

  ngOnInit() {
    this.pageToken = this.shareDetail.pageToken;

    // Scroll loader
    const elem = document.getElementsByClassName('share-viewer-item-container')[0];
    this.sub = fromEvent(elem, 'scroll')
      .pipe(debounceTime(50))
      .subscribe((scrollable) => {
        if (!scrollable) {
          return;
        }

        const scrollCriteria = elem.scrollTop > elem.scrollHeight - 2 * elem.clientHeight;
        if (
          scrollCriteria &&
          !this.itemsLoading &&
          this.shareDetail.contentSelections.length !== this.shareDetail.contentCount
        ) {
          this.ngZone.run(() => this.onScroll());
        }
      });
  }

  onScroll() {
    console.log('onscroll');
    this.itemsLoading = true;
    this.sub = this.shareFacade.loadNextPageOfContents(this.shareDetail, this.shareToken, 30).subscribe((page) => {
      this.itemsLoading = false;
    });
  }
}
