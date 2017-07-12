import { Component, Inject } from '@angular/core';
import { PICTUREPARK_API_URL } from '@picturepark/sdk-v1-angular';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor( @Inject(PICTUREPARK_API_URL) public url: string) {
  }
}