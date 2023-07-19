import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ShareDetail, IMailRecipient, StorageKey, LocalStorageService } from '@picturepark/sdk-v2-angular';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { DISABLE_COOKIE_CONSENT, TERMS } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/configuration';
import { MatDialog } from '@angular/material/dialog';
import {
  LandingDialogComponent,
  PanelComponent,
  SearchBoxComponent,
  TranslatePipe,
} from '@picturepark/sdk-v2-angular-ui';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, PanelComponent, RouterOutlet, TranslatePipe, MatButtonModule],
})
export class AppComponent implements OnInit {
  searchString: string;
  shareDetail: ShareDetail;
  mailRecipients: IMailRecipient[];
  showSearchBox = !environment.production;
  showConsent = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    @Optional() @Inject(DISABLE_COOKIE_CONSENT) public disableCookieConsent: boolean,
    @Optional() @Inject(TERMS) public terms: boolean
  ) {}

  ngOnInit() {
    if (this.terms && !this.localStorageService.get(StorageKey.Terms)) {
      this.dialog.open(LandingDialogComponent, {
        disableClose: true,
        autoFocus: false,
        maxHeight: '95vh',
        maxWidth: '99vw',
        minWidth: '33vw',
        panelClass: ['pp-dialog', 'cp-dialog'],
      });
    }
    const getShowConsent = () =>
      !this.disableCookieConsent && !this.localStorageService.get(StorageKey.ShareCookieConsent);
    // Needed because changes to the local storage [edge] are not updated on soft refresh in a tab [PP9-9217]
    this.showConsent = getShowConsent();
    window.addEventListener('storage', e => {
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
