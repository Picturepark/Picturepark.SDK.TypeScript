import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// LIBRARIES
import { AggregationResult, AuthService, Channel, FilterBase, Content } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { ContentItemSelectionService, BasketService } from '@picturepark/sdk-v1-angular-ui';

// COMPONENTS
import { DetailsDialogComponent } from '../../../details-dialog/details-dialog.component';

// SERVICES
import { EmbedService } from '../../../embed.service';

@Component({
  templateUrl: './contents-picker.component.html',
  styleUrls: ['./contents-picker.component.scss', './contents-picker-resp.component.scss']
})
export class ContentsPickerComponent implements OnInit, OnDestroy {

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
    private contentItemSelectionService: ContentItemSelectionService<Content>,
    @Inject(AuthService) public authService: OidcAuthService
  ) {

    const basketSubscription = this.basketService.basketChange.subscribe(items => this.basketItemsCount = items.length);
    this.subscription.add(basketSubscription);

    const itemsSubscription = this.contentItemSelectionService.selectedItems.subscribe(items => this.selectedItems = items.map(i => i.id));
    this.subscription.add(itemsSubscription);
  }

  public openDetails(item: any) {
    this.dialog.open(DetailsDialogComponent,
      { data: item.item.id, maxWidth: '70vw', maxHeight: '90vh', minWidth: '980px', minHeight: '700px' }
    );
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
