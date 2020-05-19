import { Injectable } from '@angular/core';
import {
  ShareService,
  ShareEmbedCreateRequest,
  OutputAccess,
  ShareContent,
  Content,
  BusinessProcessService,
} from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class EmbedService {
  constructor(private shareService: ShareService, private businessProcessService: BusinessProcessService) {}

  async embed(selectedItems: Content[], postUrl: string) {
    if (selectedItems.length > 0) {
      const contentItems = selectedItems.map(
        (i) =>
          new ShareContent({
            contentId: i.id,
            outputFormatIds: ['Original'],
          })
      );

      try {
        const result = await this.shareService
          .create(
            new ShareEmbedCreateRequest({
              name: 'Embed',
              contents: contentItems,
              outputAccess: OutputAccess.Full,
            })
          )
          .toPromise();

        if (result) {
          await this.businessProcessService.waitForCompletion(result.id, '02:00:00', true).toPromise();
          const share = await this.shareService.get(result.referenceId!).toPromise();
          const postMessage = JSON.stringify(share);

          if (window.opener) {
            window.opener.postMessage(postMessage, postUrl);
            return true;
          } else {
            console.log(
              'Post message (either no postUrl has been specified or window.opener is not defined): \n' + postMessage
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  }
}
