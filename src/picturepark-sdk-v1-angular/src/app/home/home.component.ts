import { Component, Inject, Optional } from '@angular/core';

import { AuthService } from '../../services/services';
import { OidcAuthService } from '../../auth/oidc-auth.service';


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
