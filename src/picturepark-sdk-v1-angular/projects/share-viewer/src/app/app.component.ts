import { Component, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient } from '@picturepark/sdk-v1-angular';
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
  public showConsent = !window.localStorage.getItem('Picturepark.ShareCookieConsent');

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Needed because changes to the local storage [edge] are not updated on soft refresh in a tab [PP9-9217]
    window.addEventListener('storage', (e) => {
      if (e.key && e.newValue) {
        window.localStorage.setItem(e.key, e.newValue);
        this.showConsent = !window.localStorage.getItem('Picturepark.ShareCookieConsent');
      }
    });
  }

  updateRoute(searchString: string): void {
    if (searchString) {
      this.router.navigate([searchString], { relativeTo: this.route });
    }
  }

  confirmConsent(): void {
    window.localStorage.setItem('Picturepark.ShareCookieConsent', 'true');
    this.showConsent = false;
  }
}
