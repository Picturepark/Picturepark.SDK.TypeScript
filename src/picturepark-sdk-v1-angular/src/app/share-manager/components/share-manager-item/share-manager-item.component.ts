import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// SERVICES
import { ShareService, AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss']
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {

  susbcription = new Subscription();

  // VARS
  toolBarOptions: any[];

  constructor(
    @Inject(AuthService) public authService: OidcAuthService,
    private activatedRoute: ActivatedRoute,
    private shareService: ShareService
  ) {}

  // GET SHARE INFO
  getShareInfo(shareId: string): void {
    this.shareService.get(shareId).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {

    if (!this.authService.isAuthenticated) {
      this.authService.login('/share-manager');
    }

    this.toolBarOptions = [{
      name: 'Download all contents',
      icon: 'file_download'
    },
    {
      name: 'Share all contents',
      icon: 'share'
    },
    {
      name: 'Embed all contents',
      icon: 'code'
    },
    {
      name: 'Expire',
      icon: 'schedule'
    },
    {
      name: 'Delete',
      icon: 'delete'
    }];

    // ROUTE SUBSCRIBER
    const activatedRoute = this.activatedRoute.params.subscribe(params => {
      this.getShareInfo(params.shareId);
    });

    // ADD TO SUBSCRIBERS
    this.susbcription.add(activatedRoute);

  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }

  }

}
