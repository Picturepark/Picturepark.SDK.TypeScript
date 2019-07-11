import { Component, OnInit, Input } from '@angular/core';

// LIBRARIES
import { UserService, UserDetail } from '@picturepark/sdk-v1-angular';

// MD5 HASH
import { Md5 } from 'ts-md5/dist/md5';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './owner-panel.component.scss']
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
      this.userAvatar = `https://www.gravatar.com/avatar/${Md5.hashStr(data.emailAddress)}?d=mm&s=48`;
    });

    // ADD SUBSCRIBERS
    this.subscription.add(userSubscriber);

  }

}
