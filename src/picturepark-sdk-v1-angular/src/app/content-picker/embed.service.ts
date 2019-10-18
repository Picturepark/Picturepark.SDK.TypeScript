import { Injectable } from '@angular/core';
import {
  ShareService,
  ShareEmbedCreateRequest,
  OutputAccess,
  ShareDetail,
  ShareContent,
  Content
} from '@picturepark/sdk-v1-angular';
import { ContentModel } from '@picturepark/sdk-v1-angular-ui';

@Injectable({
  providedIn: 'root'
})
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
          name: 'Embed',
          contents: contentItems,
          outputAccess: OutputAccess.Full
        })).toPromise();

        if (result) {
          const share = await this.shareService.get(result.shareId!).toPromise() as ShareDetail;
          const postMessage = JSON.stringify(share);

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
