import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from '../../../services/basket.service';
import { ThumbnailSize, ContentService } from '../../../services/services';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {
  @Input()
  public itemId: string;

  public imageUrl: SafeUrl;

  constructor(private basketService: BasketService, private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.contentService.downloadThumbnail(this.itemId, ThumbnailSize.Small).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
  }

  public remove() {
    this.basketService.removeItem(this.itemId);
  }
}
