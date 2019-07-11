import { Component, OnInit, Inject } from '@angular/core';

// LIBRARIES
import { AuthService, Channel, FilterBase, AggregatorBase, TermsAggregator } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

@Component({
  selector: 'app-shares-manager',
  templateUrl: './shares-manager.component.html',
  styleUrls: ['./shares-manager.component.scss']
})
export class SharesManagerComponent implements OnInit {

  public searchText = '';
  public selectedChannel: Channel | null = null;
  public selectedFilter: FilterBase | null = null;
  public aggregators: AggregatorBase[] = [];

  constructor(
    @Inject(AuthService) public authService: OidcAuthService
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.authService.login('/share-manager');
    }

    this.aggregators = [
      new TermsAggregator({
        field: 'data.mailRecipients.userEmail.emailAddress',
        name: 'email',
        names: {
          'x-default': 'Recipients'
        },
        size: 10
      })
    ];
  }

}
