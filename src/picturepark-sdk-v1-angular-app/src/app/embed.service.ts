import { Injectable } from '@angular/core';
import {
  Content, ShareContent, ShareService,
  ShareEmbedCreateRequest, OutputAccess, ShareEmbedDetail
} from '@picturepark/sdk-v1-angular';

@Injectable()
export class EmbedService {
  constructor(private shareService: ShareService) {
  }

  async embed(selectedItems: Content[], postUrl: string) {
    if (selectedItems.length > 0) {
      const contentItems = selectedItems.map(i => new ShareContent({
        contentId: i.id,
        outputFormatIds: ['Original']
      }));

      try {
        const result = await this.shareService.create(new ShareEmbedCreateRequest({
          contents: contentItems,
          outputAccess: OutputAccess.Full
        })).toPromise();

        if (result) {
          const share = await this.shareService.get(result.shareId!).toPromise() as ShareEmbedDetail;
          const postMessage = JSON.stringify({
            token: share.token,
            shareId: share.id!,
            items: share.embedContentItems!.map(i => { return { token: i.token, url: i.url }; })
          } as ContentPickerResult);

          if (window.opener) {
            window.opener.postMessage(postMessage, postUrl);
            return true;
          } else {
            console.log('Post message (either no postUrl has been specified or window.opener is not defined): \n' + postMessage);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }
}

export interface ContentPickerResult {
  shareId: string,
  items: { token: string, url: string }[]
}
