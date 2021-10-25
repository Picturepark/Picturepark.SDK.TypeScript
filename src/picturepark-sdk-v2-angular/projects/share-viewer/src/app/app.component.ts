import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ShareDetail, IMailRecipient, StorageKey, LocalStorageService } from '@picturepark/sdk-v2-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { COOKIE_CONSENT, TERMS } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/configuration';
import { MatDialog } from '@angular/material/dialog';
import { LandingDialogComponent } from '@picturepark/sdk-v2-angular-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public searchString: string;
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];
  public showSearchBox = !environment.production;
  public showConsent = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    @Optional() @Inject(COOKIE_CONSENT) public cookieConsent: boolean,
    @Optional() @Inject(TERMS) public terms: boolean
  ) {}

  ngOnInit() {
    if(this.terms && !this.localStorageService.get(StorageKey.Terms)) {
      this.dialog.open(LandingDialogComponent, {
        disableClose: true,
        autoFocus: false,
        maxHeight: '95vh',
        maxWidth: '99vw',
        minWidth: '33vw',
        panelClass: ['pp-dialog', 'cp-dialog'],
      });
    }
    const getShowConsent = () => this.cookieConsent && !this.localStorageService.get(StorageKey.ShareCookieConsent);
    // Needed because changes to the local storage [edge] are not updated on soft refresh in a tab [PP9-9217]
    this.showConsent = getShowConsent();
    window.addEventListener('storage', (e) => {
      if (e.key && e.newValue) {
        this.localStorageService.set(e.key as StorageKey, e.newValue);
        this.showConsent = getShowConsent();
      }
    });
  }

  updateRoute(searchString: string): void {
    if (searchString) {
      this.router.navigate([searchString], { relativeTo: this.route });
    }
  }

  confirmConsent(): void {
    this.localStorageService.set(StorageKey.ShareCookieConsent, 'true');
    this.showConsent = false;
  }
}