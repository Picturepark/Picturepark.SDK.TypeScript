import {
  ContentItemSelectionService,
  BasketService
} from '@picturepark/sdk-v1-angular-ui';
import { DetailsDialogComponent } from './../details-dialog/details-dialog.component';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AggregationResult, AuthService, Channel, FilterBase } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { MatDialog } from '@angular/material/dialog';
import { EmbedService } from '../embed.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './content-picker.component.html',
  styleUrls: ['./content-picker.component.scss']
})
export class ContentPickerComponent implements OnInit, OnDestroy {
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

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private embedService: EmbedService,
    private basketService: BasketService,
    private contentItemSelectionService: ContentItemSelectionService,
    @Inject(AuthService) public authService: OidcAuthService) {

    const basketSubscription = this.basketService.basketChange.subscribe(items => this.basketItemsCount = items.length);
    this.subscription.add(basketSubscription);

    const itemsSubscription = this.contentItemSelectionService.selectedItems.subscribe(items => this.selectedItems = items);
    this.subscription.add(itemsSubscription);
  }

  public openDetails(itemId: string) {
    this.dialog.open(DetailsDialogComponent, { data: itemId });
  }


  public onWindowUnload = () => {
    // What is this?
    if (this.authService.isAuthenticated && !this.messagePosted && window.opener) {
      window.opener.postMessage('undefined', '*');
    }
  }

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

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
