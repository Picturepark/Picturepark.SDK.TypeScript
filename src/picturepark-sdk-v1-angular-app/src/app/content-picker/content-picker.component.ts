import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AggregationFilter,
  Content,
  AuthService,
  ShareService,
  ShareContent,
  AggregationResult,
  OutputAccess
} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

import { ContentBrowserComponent, SelectionMode } from '@picturepark/sdk-v1-angular-ui';
import { EmbedService } from '../embed.service';

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

  detailsItemId: string | undefined = undefined;

  loading = false;
  messagePosted = false;
  postUrl: string;

  @ViewChild('contentBrowser')
  private contentBrowser: ContentBrowserComponent;

  contentBrowserColumns = 3;
  contentBrowserHeight = '500px';
  aggregationFilterHeight = '0px';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private embedService: EmbedService,
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
    if (!this.authService.isAuthorized) {
      this.authService.login('/content-picker');
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

  showDetails(item: Content) {
    this.detailsItemId = item.id;
  }

  async embed(items: Content[]) {
    try {
      this.loading = true;
      this.messagePosted = await this.embedService.embed(items, this.postUrl);
    } finally {
      this.loading = false;
    }
  }

  recalculateSizes() {
    if (this.detailsItemId === undefined) {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      this.contentBrowserHeight = (windowHeight - 160 + 20) + 'px';
      this.contentBrowserColumns = Math.floor(windowWidth / 250) - 1;
      this.aggregationFilterHeight = (windowHeight - 188 + 20) + 'px';

      if (this.contentBrowser) {
        this.contentBrowser.refresh();
      }
    }
  }

  cancel() {
    window.close();
  }
}
