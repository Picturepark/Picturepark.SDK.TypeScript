import { Component, OnInit, Input } from '@angular/core';

// LIBRARIES
import { UserService, UserDetail, ShareUser } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './owner-panel.component.scss'],
})
export class OwnerPanelComponent extends PanelBaseComponent implements OnInit {

  @Input() userId: string;
  @Input() shareUser: ShareUser;

  // VARS
  userAvatar: string;
  user: UserDetail;

  constructor(
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {

    if (this.shareUser) {
      return;
    }

    const userSubscriber = this.userService.get(this.userId).subscribe(data => {
      this.user = data;
    });
    this.subscription.add(userSubscriber);

  }

}
