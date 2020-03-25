import { Component, Inject } from '@angular/core';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(@Inject(AuthService) public authService: OidcAuthService) {}
}
