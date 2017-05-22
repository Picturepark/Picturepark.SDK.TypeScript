import { Component, Inject } from '@angular/core';
import { PICTUREPARK_URL } from 'picturepark-sdk-v1-ng2';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor( @Inject(PICTUREPARK_URL) public url: string) {
  }
}