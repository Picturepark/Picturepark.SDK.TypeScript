import { Component, AfterViewInit, Inject } from '@angular/core';
import { AuthService, PublicAccessService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  output: string;

  token = '';
  currentToken = '';

  constructor(public publicAccessService: PublicAccessService) {
  }

  async load() {
    this.output = 'Loading...';
    this.currentToken = this.token;
    if (this.currentToken) {
      this.publicAccessService.getShare(this.currentToken).subscribe(response => {
        this.output = JSON.stringify(response, null, 4);
      }, error => {
        this.output = error.toString();
      });
    } else {
      this.output = '';
    }
  }
}
