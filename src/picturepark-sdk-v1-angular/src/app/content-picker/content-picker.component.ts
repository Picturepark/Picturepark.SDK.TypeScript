import { ContentItemSelectionService } from '../../services/content-item-selection.service';
import { BasketService } from './../../services/basket.service';
import { DetailsDialogComponent } from './../details-dialog/details-dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AggregationResult, AuthService, Channel, FilterBase } from '../../services/services';
import { OidcAuthService } from '../../auth/oidc-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EmbedService } from '../embed.service';

@Component({
  templateUrl: './content-picker.component.html',
  styleUrls: ['./content-picker.component.scss']
})
export class ContentPickerComponent implements OnInit {
  public basketItemsCount = 0;

  public selectedItems: string[] = [];

  public searchText = '';
  public selectedChannel: Channel | null = null;
  public selectedFilter: FilterBase | null = null;

  public aggregations: AggregationResult[] = [];

  public detailsItemId: string | undefined = undefined;

  public loading = false;
  public messagePosted = false;
  public postUrl = '';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private embedService: EmbedService,
    private basketService: BasketService,
    private contentItemSelectionService: ContentItemSelectionService,
    @Inject(AuthService) public authService: OidcAuthService) {

    this.basketService.basketChange.subscribe(items => this.basketItemsCount = items.length);
    this.contentItemSelectionService.selectedItems.subscribe(items => this.selectedItems = items);
  }

  public openDetails(itemId: string) {

    this.dialog.open(DetailsDialogComponent, { data: itemId })
    console.log('open item' + itemId);
  }


  public onWindowUnload = () => {
    // What is this?
    if (this.authService.isAuthenticated && !this.messagePosted && window.opener) {
      window.opener.postMessage('undefined', '*');
    }
  };

  public ngOnInit() {
    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

    if (!this.authService.isAuthenticated) {
      this.authService.login('/content-picker?postUrl=' + encodeURI(this.postUrl));
    }

    window.addEventListener('unload', this.onWindowUnload, false);
  }

  public async embed() {
    try {
      this.loading = true;
      this.messagePosted = await this.embedService.embed(this.selectedItems, this.postUrl);
    } finally {
      this.loading = false;
    }
  }

  public cancel() {
    window.close();
  }
}
