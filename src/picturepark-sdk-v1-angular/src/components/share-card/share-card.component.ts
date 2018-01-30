import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { PublicAccessService, ShareDetail, ShareDataEmbed, ShareOutputEmbed } from '../../services/services';

@Component({
  selector: 'pp-share-card',
  templateUrl: './share-card.component.html'
})
export class ShareCardComponent implements OnChanges {
  isLoading = true;

  @Input()
  @InputConverter(StringConverter)
  token = '';

  share: ShareDetail | null;
  imageUrls: string[];

  constructor(public publicAccessService: PublicAccessService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['token'] !== undefined) {
      this.refresh();
    }
  }

  private refresh() {
    this.isLoading = true;
    this.publicAccessService.getShare(this.token).toPromise().then((share: ShareDetail) => {
      this.share = share;

      this.imageUrls = share.contentSelections!
        .map(s => s.outputs!.filter(o => o.outputFormatId === 'Preview'))
        .filter(s => s.length > 0 && s[0].url)
        .map(o => o[0].url!);

      this.isLoading = false;
    }).catch(() => {
      this.share = null;
      this.isLoading = false;
    });
  }
}
