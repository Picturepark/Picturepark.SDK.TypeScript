import { OnDestroy, Injector, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyGetter } from 'lazy-get-decorator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProfileService, UserProfile, UserRight } from '@picturepark/sdk-v1-angular';
import { PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../configuration';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseComponent implements OnDestroy {
  @LazyGetter()
  protected get breakpointObserver(): BreakpointObserver {
    return this.injector.get(BreakpointObserver);
  }

  @LazyGetter()
  protected get profileService(): ProfileService {
    return this.injector.get(ProfileService);
  }

  protected subscription = new Subscription();

  public get deviceBreakpoint(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  @LazyGetter()
  public get isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  public set sub(value: Subscription) {
    this.subscription.add(value);
  }

  protected pictureParkUIConfig: PictureparkUIConfiguration;
  profile: UserProfile;

  constructor(protected injector: Injector) {
    this.pictureParkUIConfig = injector.get<PictureparkUIConfiguration>(PICTUREPARK_UI_CONFIGURATION);
    this.sub = this.profileService.get().subscribe((profile) => {
      this.profile = profile;
      this.checkUserPermissions();
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasRight(userRight: UserRight) {
    return this.profile?.userRights?.some((ur) => ur === userRight) ?? false;
  }

  private checkUserPermissions() {
    if (!this.hasRight(UserRight.ManageSharings)) {
      delete this.pictureParkUIConfig.BasketComponent['share'];
      delete this.pictureParkUIConfig.BrowserToolbarComponent['share'];
      delete this.pictureParkUIConfig.ContentBrowserComponent['share'];
      delete this.pictureParkUIConfig.ListBrowserComponent['share'];
    }
  }
}
