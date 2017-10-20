import { Component } from '@angular/core';

import {
  AuthService,
  ContentService,
  ContentSearchRequest,
  ShareService,
  AggregationFilter,
  Content,
  ShareEmbedCreateRequest,
  ShareContent,
  ShareEmbedDetail,
  OutputAccess
} from '@picturepark/sdk-v1-angular';

import { SelectionMode } from '../components/content-browser/content-browser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shareToken: string | undefined = '';
  searchText = '';
  selectedChannel = '';
  filters: AggregationFilter[] = [];
  selectedItems: Content[] = [];
  selectionMode = SelectionMode.Single;

  constructor(
    public contentService: ContentService,
    public authService: AuthService,
    public shareService: ShareService) {
  }

  async embed() {
    if (this.selectedItems.length > 0) {
      const contentItems = this.selectedItems.map(i => new ShareContent({
        contentId: i.id,
        outputFormatIds: ['Original']
      }));

      const result = await this.shareService.create(new ShareEmbedCreateRequest({
        contents: contentItems,
        outputAccess: OutputAccess.Full
      })).toPromise();

      if (result) {
        const share = await this.shareService.get(result.shareId!).toPromise() as ShareEmbedDetail;
        if (share && share.embedContentItems) {
          const tokens = share.embedContentItems.map(i => i.token).reduce((p, i) => p + '\n' + i, '');
          const message = 'Embed share created\n\nID: ' + share.id + '\n\nTokens: ' + tokens;

          this.shareToken = share.embedContentItems[0].token;
          console.log(share);
          console.log(message);
        }
      }
    }
  }

  onLoggedIn() {
    console.log('User has logged in.');
  }
}
