import { Inject, Injectable } from '@angular/core';
import { AuthService, ProfileService, UserRight } from '@picturepark/sdk-v2-angular';
import { OidcAuthService } from '@picturepark/sdk-v2-angular-oidc';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private userRights: UserRight[] | undefined;
  initialized$ = from(this.authService.requireLogin(`${location.pathname}${location.search}`)).pipe(
    filter(() => this.authService.isAuthenticated),
    switchMap(() => this.profileService.get()),
    map(p => {
      this.userRights = p.userRights;
      return true;
    })
  );

  constructor(@Inject(AuthService) private authService: OidcAuthService, private profileService: ProfileService) {}

  hasRight(userRight: UserRight) {
    return this.userRights?.some(ur => ur === userRight) ?? false;
  }
}
