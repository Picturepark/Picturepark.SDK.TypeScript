import { Component, Input } from '@angular/core';
// LIBRARIES
import { IMailRecipient } from '@picturepark/sdk-v1-angular';
// COMPONENTS
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'pp-mail-recipients-panel',
  templateUrl: './mail-recipients-panel.component.html',
  styleUrls: ['../panel/panel.component.scss', './mail-recipients-panel.component.scss'],
})
export class MailRecipientsPanelComponent extends PanelComponent {
  @Input() mailRecipients: IMailRecipient[];

  constructor() {
    super();
  }

  // COPY TO CLIPBOARD
  public copyToClipboard(event: MouseEvent, recipienturl: string): void {
    const copyBox = document.createElement('textarea');
    copyBox.value = recipienturl;
    document.body.appendChild(copyBox);
    copyBox.select();
    document.execCommand('copy');
    document.body.removeChild(copyBox);

    const element = event.target as HTMLElement;
    element.innerHTML = 'check';
  }
}
