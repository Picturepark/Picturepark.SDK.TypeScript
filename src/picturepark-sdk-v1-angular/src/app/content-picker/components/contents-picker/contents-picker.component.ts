import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// LIBRARIES
import { AggregationResult, Channel, FilterBase, Content } from '@picturepark/sdk-v1-angular';
import { ContentItemSelectionService, BasketService } from '@picturepark/sdk-v1-angular-ui';

// COMPONENTS
import { DetailsDialogComponent } from '../../../details-dialog/details-dialog.component';
import { ContentBrowserComponent } from '@picturepark/sdk-v1-angular-ui';

// SERVICES
import { EmbedService } from '../../../embed.service';

@Component({
  templateUrl: './contents-picker.component.html',
  styleUrls: ['./contents-picker.component.scss', './contents-picker-resp.component.scss']
})
export class ContentsPickerComponent implements OnInit, OnDestroy {

  @ViewChild('contentBrowser', { static: true }) contentBrowser: ContentBrowserComponent;

  public expandedContent = false;

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
    public contentItemSelectionService: ContentItemSelectionService<Content>
  ) {}

  public openDetails(item: any) {
    this.dialog.open(DetailsDialogComponent,
      { data: item.item.id, maxWidth: '70vw', maxHeight: '90vh', minWidth: '980px', minHeight: '700px' }
    );
  }

  public ngOnInit() {

    const basketSubscription = this.basketService.basketChange.subscribe(items => this.basketItemsCount = items.length);
    this.subscription.add(basketSubscription);

    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

  }

  public expand(): void {
    if (this.expandedContent) {
      this.expandedContent = false;
    } else {
      this.expandedContent = true;
    }
  }

  public selectionChange(items: string[]): void {
    this.selectedItems = items;
  }

  public async embed() {
    try {
      this.loading = true;
      this.messagePosted = await this.embedService.embed(this.selectedItems, this.postUrl);
    } finally {
      this.loading = false;
    }
  }

  // CLEAR SELECTION
  cancel(): void {
    this.contentBrowser.cancel();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
