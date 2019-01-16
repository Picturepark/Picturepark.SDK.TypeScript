import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';

import { BasketService } from './../../../services/basket.service';
import { ContentService, ThumbnailSize, ContentDownloadLinkCreateRequest } from '@picturepark/sdk-v1-angular';
import { ContentModel } from '../models/content-model';
import { Subscription, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: ['./content-browser-item.component.scss']
})
export class ContentBrowserItemComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public itemModel: ContentModel;

  @Input()
  thumbnailSize: ThumbnailSize | null;

  @Input()
  isListView: boolean;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  public thumbnailSizes = ThumbnailSize;

  public isLoading = true;

  public thumbnailUrl: SafeUrl | null = null;

  public virtualItemHtml: SafeHtml | null = null;

  private nonVirtualContentSchemasIds = ['AudioMetadata', 'DocumentMetadata', 'FileMetadata', 'ImageMetadata', 'VideoMetadata'];

  private isVisible = false;
  private loadItem = new Subject<void>();
  private subscription: Subscription = new Subscription();

  constructor(private basketService: BasketService, private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    const downloadSubscription = this.loadItem
      .pipe(switchMap(() => {
        return this.contentService.downloadThumbnail(
          this.itemModel.item.id,
          this.isListView ? ThumbnailSize.Small : this.thumbnailSize as ThumbnailSize,
          null,
          null)
      }))
      .subscribe(response => {
        if (response) {
          this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
          this.isLoading = false;
        }
      }, () => {
        this.thumbnailUrl = null;
        this.isLoading = false;
      });

    this.subscription.add(downloadSubscription);
  }

  public markAsVisible() {
    this.isVisible = true;
    this.loadItem.next();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemModel'] && changes['itemModel'].firstChange) {
      if (this.itemModel.item.contentSchemaId && this.nonVirtualContentSchemasIds.indexOf(this.itemModel.item.contentSchemaId) === -1) {
        if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['thumbnail']) {
          this.virtualItemHtml = this.sanitizer.bypassSecurityTrustHtml(this.itemModel.item.displayValues['thumbnail']);
        }
      }
    }

    if (changes['thumbnailSize'] && this.virtualItemHtml === null && this.isVisible) {
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

  public downloadItem() {
    const request = new ContentDownloadLinkCreateRequest({
      contents: [{ contentId: this.itemModel.item.id, outputFormatId: 'Original' }]
    });

    const createDownloadSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl);
      }
    });

    this.subscription.add(createDownloadSubscription);
  }

  public toggleInBasket() {
    if (!this.itemModel.item.id) {
      return;
    }

    if (this.itemModel.isInBasket === true) {
      this.basketService.removeItem(this.itemModel.item.id);
    } else {
      this.basketService.addItem(this.itemModel.item.id);
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
