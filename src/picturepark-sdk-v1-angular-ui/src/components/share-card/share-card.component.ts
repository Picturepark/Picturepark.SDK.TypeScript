import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { PublicAccessService, ShareBaseDetail, EntityType } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-share-card',
  templateUrl: './share-card.component.html'
})
export class ShareCardComponent implements OnChanges {
  isLoading = true;

  @Input()
  @InputConverter(StringConverter)
  token = '';

  share: ShareBaseDetail | null;

  constructor(public publicAccessService: PublicAccessService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['token'] !== undefined) {
      this.refresh();
    }
  }

  private refresh() {
    this.isLoading = true;
    this.publicAccessService.getShare(this.token).toPromise().then(share => {
      this.share = share;
      this.isLoading = false;
    }).catch(() => {
      this.share = null;
      this.isLoading = false;
    });
  }
}
