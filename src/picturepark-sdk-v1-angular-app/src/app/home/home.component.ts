import { Component, Inject, Optional } from '@angular/core';
import { PICTUREPARK_API_URL } from '@picturepark/sdk-v1-angular';
import { AuthService } from "@picturepark/sdk-v1-angular";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(@Inject(AuthService) private authService: AuthService, @Optional() @Inject(PICTUREPARK_API_URL) public url?: string) {
  }
}