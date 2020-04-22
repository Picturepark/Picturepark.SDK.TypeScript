import { Component, Input, OnInit } from '@angular/core';
// LIBRARIES
import { ShareUser, UserDetail, UserService } from '@picturepark/sdk-v1-angular';
// COMPONENTS
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'pp-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['../panel/panel.component.scss', './owner-panel.component.scss'],
})
export class OwnerPanelComponent extends PanelComponent implements OnInit {
  @Input() userId: string;
  @Input() shareUser: ShareUser;

  // VARS
  userAvatar: string;
  user: UserDetail;

  constructor(private userService: UserService) {
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
