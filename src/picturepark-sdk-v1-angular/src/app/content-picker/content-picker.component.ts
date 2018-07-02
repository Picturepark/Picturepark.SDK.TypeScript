import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmbedService } from '../embed.service';
import { AggregationFilter, Content, AggregationResult, AuthService, Channel, FilterBase } from '../../services/services';
import { SelectionMode, ContentBrowserComponent } from '../../components/content-browser/content-browser.component';
import { OidcAuthService } from '../../auth/oidc-auth.service';

@Component({
  templateUrl: './content-picker.component.html',
  styleUrls: ['./content-picker.component.scss']
})
export class ContentPickerComponent implements OnInit, OnDestroy, AfterViewInit {
  searchText = '';
  selectedChannel: Channel | null = null;
  selectedFilter: FilterBase | null = null;
  selectionMode = SelectionMode.Multiple;

  selectedItems: Content[] = [];
  aggregations: AggregationResult[] = [];

  detailsItemId: string | undefined = undefined;

  loading = false;
  messagePosted = false;
  postUrl = '';

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

  public filterChange(changes: any) {
    this.selectedFilter = changes;
  }


  onWindowUnload = () => {
    if (this.authService.isAuthenticated && !this.messagePosted && window.opener) {
      window.opener.postMessage('undefined', '*');
    }
  };

  onWindowResized = () => {
    this.recalculateSizes();
  };

  ngOnInit() {
    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

    if (!this.authService.isAuthenticated) {
      this.authService.login('/content-picker?postUrl=' + encodeURI(this.postUrl));
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

  closeDetails() {
    this.detailsItemId = undefined;
    this.recalculateSizes();
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
    }
  }

  cancel() {
    window.close();
  }
}
