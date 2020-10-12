import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
// LIBRARIES
import { ShareContentDetail, ShareDetail, ShareService, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';

@Component({
  selector: 'pp-share-items-panel',
  templateUrl: './share-items-panel.component.html',
  styleUrls: ['./share-items-panel.component.scss'],
})
export class ShareItemsPanelComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() view: 'grid' | 'list' = 'grid';
  @Input() shareToken: string;
  @Input() shareDetail: ShareDetail;

  @Output() showDetail: EventEmitter<ShareContentDetail> = new EventEmitter();

  // VARS
  loader = false;
  itemsLoading = false;
  pageToken?: string;

  thumbnailSize = ThumbnailSize;
  items: ShareContentDetail[];

  constructor(
    injector: Injector,
    private contentDownloadDialogService: ContentDownloadDialogService,
    private scrollDispatcher: ScrollDispatcher,
    private shareService: ShareService,
    private ngZone: NgZone
  ) {
    super(injector);
  }

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
    this.items = this.shareDetail.contentSelections;

    // Scroll loader
    this.sub = this.scrollDispatcher
      .scrolled()
      .pipe(debounceTime(50))
      .subscribe((scrollable) => {
        if (!scrollable) {
          return;
        }

        const nativeElement = scrollable.getElementRef().nativeElement;
        console.log(nativeElement);

        const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - 2 * nativeElement.clientHeight;

        if (scrollCriteria && !this.itemsLoading && this.items.length !== this.shareDetail.contentCount) {
          this.ngZone.run(() => this.onScroll());
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = changes.items && changes.items.currentValue;

    if (this.items) {
      this.loader = false;
    }
  }

  onScroll() {
    console.log('onscroll');
    this.itemsLoading = true;
    this.sub = this.shareService
      .getShareContents(this.shareToken, undefined, 30, this.pageToken)
      .subscribe((contents) => {
        this.pageToken = contents.pageToken;
        this.items = [...this.items, ...contents.results];
      });
    this.itemsLoading = false;
  }
}
