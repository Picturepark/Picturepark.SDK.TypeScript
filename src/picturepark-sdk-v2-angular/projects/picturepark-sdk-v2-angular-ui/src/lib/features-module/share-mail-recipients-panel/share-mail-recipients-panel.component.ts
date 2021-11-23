import { Component, Input } from '@angular/core';
import { IMailRecipient } from '@picturepark/sdk-v2-angular';

@Component({
  selector: 'pp-share-mail-recipients-panel',
  templateUrl: './share-mail-recipients-panel.component.html',
  styleUrls: ['./share-mail-recipients-panel.component.scss'],
})
export class ShareMailRecipientsPanelComponent {
  @Input() mailRecipients: IMailRecipient[];

  // COPY TO CLIPBOARD
  copyToClipboard(event: MouseEvent, recipienturl: string): void {
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
