import { Component, Inject } from '@angular/core';

import { AuthService, ContentService, ContentSearchRequest } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '../oidc-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = 'n/a';

  constructor(
    @Inject(AuthService) public authService: OidcAuthService,
    public contentService: ContentService) {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  search() {
    const request = new ContentSearchRequest();
    request.searchString = 'm';

    this.contentService.search(request).subscribe(response => {
      this.data = response ? JSON.stringify(response) : 'null';
    });
  }
}
