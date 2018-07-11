import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { BasketService } from './../../../services/basket.service';
import { ContentService, ThumbnailSize } from '../../../services/services';
import { ContentModel } from '../../content-browser/content-browser.component';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: ['./content-browser-item.component.scss']
})
export class ContentBrowserItemComponent implements OnInit {
  @Input()
  public itemModel: ContentModel;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  public isLoading = true;

  // TODO: no thumbnail, alternative image.
  public thumbnailUrl: SafeStyle | null = null;

  constructor(private basketService: BasketService, private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    // TODO: possible api bug. Adds width and height with null values.
    this.contentService.downloadThumbnail(this.itemModel.item.id!, ThumbnailSize.Large).subscribe(response => {
      if (response) {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustStyle(`url('${URL.createObjectURL(response.data)}')`);
      }
    }, () => {
      this.thumbnailUrl = null;
    }, () => {
      this.isLoading = false;
    }
    );
  }

  public previewItem() {
    if (this.itemModel.item.id) {
      this.previewItemChange.emit(this.itemModel.item.id);
    }
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
}
