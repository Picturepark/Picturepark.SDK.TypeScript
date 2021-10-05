import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v2-angular';
import { OidcAuthService } from '@picturepark/sdk-v2-angular-oidc';
import { TranslationService } from '@picturepark/sdk-v2-angular-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(AuthService) public authService: OidcAuthService,
    private translationService: TranslationService,
    private titleService: Title
  ) {}

  public ngOnInit() {
    this.titleService.setTitle(this.translationService.translate('ApplicationTitle.demoApp'));
    this.authService.requireLogin(`${location.pathname}${location.search}`);
  }
}
