import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  AggregationFilter,
  Content,
  AuthService,
  ShareService,
  ShareContent,
  ShareEmbedCreateRequest,
  ShareEmbedDetail,
  AggregationResult,
  OutputAccess
} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

import { ContentBrowserComponent, SelectionMode } from '@picturepark/sdk-v1-angular-ui';

@Component({
  templateUrl: './content-picker.component.html'
})
export class ContentPickerComponent implements OnInit, OnDestroy, AfterViewInit {
  searchText = '';
  selectedChannel = '';
  selectedFilters: AggregationFilter[] = [];
  selectionMode = SelectionMode.Multiple;

  selectedItems: Content[] = [];
  aggregations: AggregationResult[] = [];

  loading = false;
  messagePosted = false;
  postUrl: string;

  @ViewChild('contentBrowser')
  private contentBrowser: ContentBrowserComponent;

  contentBrowserColumns = 3;
  contentBrowserHeight = '500px';
  aggregationFilterHeight = '0px';

  constructor(private route: ActivatedRoute,
    private shareService: ShareService,
    @Inject(AuthService) public authService: OidcAuthService) {
  }

  onWindowUnload = () => {
    if (this.authService.isAuthorized && !this.messagePosted && window.opener) {
      window.opener.postMessage('undefined', '*');
    }
  };

  onWindowResized = () => {
    this.recalculateSizes();
  };

  ngOnInit() {
    if (this.authService.isAuthorizing === false) {
      this.authService.login();
    }

    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

    window.addEventListener('unload', this.onWindowUnload, false);
    window.addEventListener('resize', this.onWindowResized, false);

    this.recalculateSizes();
  }

  ngAfterViewInit() {
    this.recalculateSizes();
  }

  ngOnDestroy(): void {
    window.removeEventListener('unload', this.onWindowUnload, false);
    window.removeEventListener('resize', this.onWindowResized, false);
  }

  async embed() {
    if (this.selectedItems.length > 0) {
      const contentItems = this.selectedItems.map(i => new ShareContent({
        contentId: i.id,
        outputFormatIds: ['Original']
      }));

      try {
        this.loading = true;

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

          this.messagePosted = true;
          if (window.opener) {
            window.opener.postMessage(postMessage, this.postUrl);
          } else {
            console.log('Post message (either no postUrl has been specified or window.opener is not defined): \n' + postMessage);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }

  recalculateSizes() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    this.contentBrowserHeight = (windowHeight - 160 + 20) + 'px';
    this.contentBrowserColumns = Math.floor(windowWidth / 250) - 1;
    this.aggregationFilterHeight = (windowHeight - 190 + 20) + 'px';

    if (this.contentBrowser) {
      this.contentBrowser.refresh();
    }
  }

  cancel() {
    window.close();
  }
}

export interface ContentPickerResult {
  shareId: string,
  items: { token: string, url: string }[]
}
