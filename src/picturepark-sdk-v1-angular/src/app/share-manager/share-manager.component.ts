import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

@Component({
  selector: 'app-share-manager',
  templateUrl: './share-manager.component.html',
  styleUrls: ['./share-manager.component.scss']
})
export class ShareBrowserComponent implements OnInit {

  constructor(
    @Inject(AuthService) public authService: OidcAuthService
  ) { }

  public ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.authService.login('/share-manager');
    }
  }
}
