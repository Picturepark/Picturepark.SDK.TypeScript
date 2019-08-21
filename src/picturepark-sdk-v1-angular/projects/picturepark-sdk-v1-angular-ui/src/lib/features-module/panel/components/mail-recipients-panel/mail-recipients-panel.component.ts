import { Component, Input, OnInit } from '@angular/core';

// LIBRARIES
import { IMailRecipient } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-mail-recipients-panel',
  templateUrl: './mail-recipients-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './mail-recipients-panel.component.scss']
})
export class MailRecipientsPanelComponent extends PanelBaseComponent implements OnInit {

  @Input() mailRecipients: IMailRecipient[];

  constructor() {
    super();
  }

  // COPY TO CLIPBOARD
  public copyToClipboard(recipienturl: string): void {
    const copyBox = document.createElement('textarea');
          copyBox.value = recipienturl;
          document.body.appendChild(copyBox);
          document.execCommand('copy');
          document.body.removeChild(copyBox);
  }

  ngOnInit() {
  }

}
