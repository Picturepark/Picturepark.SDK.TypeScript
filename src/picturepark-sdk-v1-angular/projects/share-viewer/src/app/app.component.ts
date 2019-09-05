import { Component } from '@angular/core';
import { ShareDetail, IMailRecipient } from '@picturepark/sdk-v1-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchString: string;
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  updateRoute(searchString: string): void {
    if (searchString) {
      this.router.navigate([searchString], { relativeTo: this.route });
    }
  }
}
