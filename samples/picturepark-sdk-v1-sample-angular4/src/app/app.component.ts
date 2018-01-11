import { Component, AfterViewInit, Inject } from '@angular/core';
import { OidcAuthService, AuthService, ContentService, ContentSearchRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  output: string;
  searchText = '';

  constructor(
    @Inject(AuthService) public authService: OidcAuthService,
    public contentService: ContentService) {
  }

  async search() {
    const request = new ContentSearchRequest();
    request.searchString = this.searchText;

    this.output = 'Loading...';
    this.contentService.search(request).subscribe(response => {
      this.output = JSON.stringify(response, null, 4);
    }, error => {
      this.output = error.toString();
    });
  }
}
