import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';

// LIBRARIES
import { ThumbnailSize, Share, ShareService } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// INTERFACES
import { ContentModel } from '../../../../shared-module/models/content-model';

@Component({
  selector: 'pp-share-browser-item',
  templateUrl: './share-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './share-browser-item.component.scss'
  ]
})
export class ShareBrowserItemComponent extends BaseComponent implements OnChanges, OnInit {

  // INPUTS
  @Input() public itemModel: ContentModel<Share>;
  @Input() thumbnailSize: ThumbnailSize | null;
  @Input() isListView: boolean;

  // OUTPUTS
  @Output() public previewItemChange = new EventEmitter<string>();

  // VARS
  public thumbnailSizes = ThumbnailSize;

  public isLoading = true;

  public thumbnailUrl: SafeUrl | null = null;

  private isVisible = false;
  private loadItem = new Subject<void>();

  constructor(
    private shareService: ShareService,
    private sanitizer: DomSanitizer
  ) {

    super();

  }

  public ngOnInit(): void {

    /*
    const downloadSubscription = this.shareService.downloadWithContentId(
      this.itemModel.item.,
      this.isListView ? ThumbnailSize.Small : this.thumbnailSize as ThumbnailSize,
      null,
      null
    ).subscribe(response => {
      if (response) {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
        this.isLoading = false;
      }
    }, () => {
      this.thumbnailUrl = null;
      this.isLoading = false;
    });

    this.subscription.add(downloadSubscription);
    */
  }

  public markAsVisible() {
    this.isVisible = true;
    this.loadItem.next();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnailSize'] && this.isVisible) {
      const updateImage =
        (changes['thumbnailSize'].firstChange) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {

        this.isLoading = true;
        this.thumbnailUrl = null;
        this.loadItem.next();
      }
    }
  }

  public previewItem() {
    if (this.itemModel.item.id) {
      this.previewItemChange.emit(this.itemModel.item.id);
    }
  }
}
