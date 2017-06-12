import { Component } from '@angular/core';

import { AuthService, ContentService, ContentSearchRequest } from '../index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';

  constructor(public authService: AuthService, public contentService: ContentService) {
    this.authService.login(prompt('Username: ')!, prompt('Password: ')!).then(() => {
      this.title = this.authService.token!;

      const request = new ContentSearchRequest();
      request.searchString = 'm';

      this.contentService.search(request).subscribe(response => {
        this.title = response ? JSON.stringify(response) : 'n/a';
      });
    });
  }
}
