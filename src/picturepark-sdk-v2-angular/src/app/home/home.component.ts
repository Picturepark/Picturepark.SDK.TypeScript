import { Component, Inject } from '@angular/core';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v2-angular';
import { OidcAuthService } from '@picturepark/sdk-v2-angular-oidc';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        RouterLink,
    ],
})
export class HomeComponent {
  constructor(@Inject(AuthService) public authService: OidcAuthService) {}
}
