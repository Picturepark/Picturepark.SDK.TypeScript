import { Component, OnInit, Input } from '@angular/core';

// LIBRARIES
import { UserService, UserDetail } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './owner-panel.component.scss'],
})
export class OwnerPanelComponent extends PanelBaseComponent implements OnInit {

  @Input() userId: string;

  // VARS
  user: UserDetail;
  userAvatar: string;

  constructor(
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {

    // USER SUBSCRIBER
    const userSubscriber = this.userService.get(this.userId).subscribe(data => {
      this.user = data;
    });

    // ADD SUBSCRIBERS
    this.subscription.add(userSubscriber);

  }

}
