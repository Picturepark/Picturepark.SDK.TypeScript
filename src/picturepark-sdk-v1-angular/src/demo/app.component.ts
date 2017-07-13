import { Component } from '@angular/core';

import { AuthService, ContentService, ContentSearchRequest } from '../picturepark.services';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = 'n/a';

  constructor(
    public authService: AuthService,
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
