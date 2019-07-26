import { Component, Inject } from '@angular/core';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(@Inject(AuthService) public authService: OidcAuthService) {
  }

  login() {
    this.authService.login();
  }
}
