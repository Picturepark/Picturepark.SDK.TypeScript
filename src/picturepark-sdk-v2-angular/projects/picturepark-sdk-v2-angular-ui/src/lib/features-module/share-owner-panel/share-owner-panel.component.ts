import { Component, Input, OnInit } from '@angular/core';
import { ShareUser, UserDetail, UserService } from '@picturepark/sdk-v2-angular';
import { take } from 'rxjs/operators';
import { AvatarPipe, AvatarHashedPipe } from '../../shared-module/pipes/avatar.pipe';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { NgIf } from '@angular/common';
import { PanelComponent } from '../../shared-module/components/panel/panel.component';

@Component({
    selector: 'pp-share-owner-panel',
    templateUrl: './share-owner-panel.component.html',
    styleUrls: ['./share-owner-panel.component.scss'],
    standalone: true,
    imports: [
        PanelComponent,
        NgIf,
        TranslatePipe,
        AvatarPipe,
        AvatarHashedPipe,
    ],
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
      .subscribe(data => {
        this.user = data;
      });
  }
}
