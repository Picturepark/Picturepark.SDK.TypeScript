import { Component, Input, OnInit } from '@angular/core';
import { ShareUser, UserDetail, UserService } from '@picturepark/sdk-v1-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pp-share-owner-panel',
  templateUrl: './share-owner-panel.component.html',
  styleUrls: ['../../shared-module/components/panel/panel.component.scss', './share-owner-panel.component.scss'],
})
export class ShareOwnerPanelComponent implements OnInit {
  @Input() userId: string;
  @Input() shareUser: ShareUser;

  // VARS
  userAvatar: string;
  user: UserDetail;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.shareUser) {
      return;
    }

    this.userService
      .get(this.userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.user = data;
      });
  }
}
