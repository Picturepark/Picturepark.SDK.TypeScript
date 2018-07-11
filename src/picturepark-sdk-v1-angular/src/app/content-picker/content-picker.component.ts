import { BasketService } from './../../services/basket.service';
import { DetailsDialogComponent } from './../details-dialog/details-dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Content, AggregationResult, AuthService, Channel, FilterBase } from '../../services/services';
import { OidcAuthService } from '../../auth/oidc-auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './content-picker.component.html',
  styleUrls: ['./content-picker.component.scss']
})
export class ContentPickerComponent implements OnInit {
  public basketItemsCount = 0;

  searchText = '';
  selectedChannel: Channel | null = null;
  selectedFilter: FilterBase | null = null;

  selectedItems: Content[] = [];
  aggregations: AggregationResult[] = [];

  detailsItemId: string | undefined = undefined;

  loading = false;
  messagePosted = false;
  postUrl = '';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private basketService: BasketService,
    @Inject(AuthService) public authService: OidcAuthService) {
    this.basketService.basketChange.subscribe(items => this.basketItemsCount = items.length);
  }

  public openDetails(itemId: string) {

    this.dialog.open(DetailsDialogComponent, { data: itemId })
    console.log('open item' + itemId);
  }


  onWindowUnload = () => {
    // What is this?
    if (this.authService.isAuthenticated && !this.messagePosted && window.opener) {
      window.opener.postMessage('undefined', '*');
    }
  };

  ngOnInit() {
    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

    if (!this.authService.isAuthenticated) {
      this.authService.login('/content-picker?postUrl=' + encodeURI(this.postUrl));
    }

  }
}
