import { Component, AfterViewInit } from '@angular/core';
import { AuthService, ContentService, ContentSearchRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  output: string;
  searchText = '';

  constructor(
    public authService: AuthService,
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
