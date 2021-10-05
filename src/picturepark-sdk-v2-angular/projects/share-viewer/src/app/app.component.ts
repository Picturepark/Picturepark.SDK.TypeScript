import { Component, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient, StorageKey, LocalStorageService } from '@picturepark/sdk-v2-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';

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
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    // Needed because changes to the local storage [edge] are not updated on soft refresh in a tab [PP9-9217]
    this.showConsent = !this.localStorageService.get(StorageKey.ShareCookieConsent);
    window.addEventListener('storage', (e) => {
      if (e.key && e.newValue) {
        this.localStorageService.set(e.key as StorageKey, e.newValue);
        this.showConsent = !this.localStorageService.get(StorageKey.ShareCookieConsent);
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
