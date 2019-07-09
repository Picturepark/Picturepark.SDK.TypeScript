import { Component, OnInit, Inject } from '@angular/core';

// LIBRARIES
import { AuthService, Channel, FilterBase } from '@picturepark/sdk-v1-angular';
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

  constructor(
    @Inject(AuthService) public authService: OidcAuthService
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.authService.login('/share-manager');
    }
  }

}
