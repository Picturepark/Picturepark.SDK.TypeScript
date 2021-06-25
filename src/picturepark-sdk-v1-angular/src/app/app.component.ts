import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { TranslationService } from '@picturepark/sdk-v1-angular-ui';

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
    if (!location.search) {
      return this.authService.requireLogin(location.pathname);
    }

    const params = location.search.substring(1).split('&');
    const filteredParams = params.filter(
      (p) =>
        p.indexOf('code') !== 0 &&
        p.indexOf('scope') !== 0 &&
        p.indexOf('state') !== 0 &&
        p.indexOf('session_state') !== 0
    );

    const httpParams = new HttpParams({ fromString: filteredParams.join('&') });
    const queryParams = httpParams.toString();
    this.authService.requireLogin(`${location.pathname}?${queryParams}`);
  }
}
