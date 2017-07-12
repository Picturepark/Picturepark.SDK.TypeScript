import { Component } from '@angular/core';

import { AuthService, ContentService, ContentSearchRequest } from '../index';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  token = 'n/a';
  data = 'n/a';

  constructor(
    public authService: AuthService,
    public contentService: ContentService) {
  }

  ngOnInit() {
    this.token = this.authService.token;
  }

  login() {
    this.authService.login();
  }

  search() {
    this.token = this.authService.token;

    const request = new ContentSearchRequest();
    request.searchString = 'm';

    this.contentService.search(request).subscribe(response => {
      this.data = response ? JSON.stringify(response) : 'null';
    });
  }
}
