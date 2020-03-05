import { Component } from '@angular/core';
import { ShareService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  output: string;

  token = '';
  currentToken = '';

  constructor(public shareAccessService: ShareService) {
  }

  async load() {
    this.output = 'Loading...';
    this.currentToken = this.token;
    if (this.currentToken) {
      this.shareAccessService.getShareJson(this.currentToken).subscribe(response => {
        this.output = JSON.stringify(response, null, 4);
      }, error => {
        this.output = error.toString();
      });
    } else {
      this.output = '';
    }
  }
}
