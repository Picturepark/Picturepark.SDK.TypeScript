import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ProfileService, UserRight, UserProfile, LANGUAGES_LOADED } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface ConfigActions {
  [key: string]: boolean;
}

export interface PictureparkUIConfiguration {
  ContentBrowserComponent: ConfigActions;
  BasketComponent: ConfigActions;
  BrowserToolbarComponent: ConfigActions;
  ListBrowserComponent: ConfigActions;
}

export const PICTUREPARK_UI_CONFIGURATION = new InjectionToken<string>('PICTUREPARK_UI_CONFIGURATION');
export const PICTUREPARK_UI_SCRIPTPATH = new InjectionToken<string>('PICTUREPARK_UI_SCRIPTPATH');

@Injectable()
export class ConfigService {
  hasManageSharings: boolean;

  constructor(
    private profileService: ProfileService,
    @Inject(LANGUAGES_LOADED) private languagesLoaded$: BehaviorSubject<boolean>
  ) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) =>
      this.languagesLoaded$
        .pipe(
          filter((loaded) => loaded),
          mergeMap(() =>
            this.profileService.get().pipe(map((profile) => !this.hasRight(profile, UserRight.ManageSharings)))
          )
        )
        .subscribe(
          (response) => {
            this.hasManageSharings = response;
            resolve(response);
          },
          (error) => reject(error)
        )
    );
  }

  private hasRight(profile: UserProfile, userRight: UserRight) {
    return profile?.userRights?.some((ur) => ur === userRight) ?? false;
  }
}

export function initConfigurationFactory(service: ConfigService, authService: OidcAuthService): Function {
  return () =>
    combineLatest([authService.requireLogin(`${location.pathname}${location.search}`)])
      .pipe(filter(([loggedIn]) => !!loggedIn))
      .subscribe(() => service.load());
}

export function PictureparkUIConfigurationFactory(service: ConfigService) {
  return <PictureparkUIConfiguration>{
    ContentBrowserComponent: {
      download: true,
      select: true,
      share: service.hasManageSharings ? true : undefined,
      preview: true,
      basket: true,
    },
    BasketComponent: {
      download: true,
      select: false,
      share: service.hasManageSharings ? true : undefined,
    },
    BrowserToolbarComponent: {
      select: true,
    },
    ListBrowserComponent: {
      download: true,
      select: true,
      share: service.hasManageSharings ? true : undefined,
    },
  };
}
