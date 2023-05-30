import { Component, Input } from '@angular/core';
import { IMailRecipient } from '@picturepark/sdk-v2-angular';
import { AvatarPipe } from '../../shared-module/pipes/avatar.pipe';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../shared-module/components/panel/panel.component';

@Component({
  selector: 'pp-share-mail-recipients-panel',
  templateUrl: './share-mail-recipients-panel.component.html',
  styleUrls: ['./share-mail-recipients-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, PanelComponent, MatTooltipModule, TranslatePipe, AvatarPipe],
})
export class ShareMailRecipientsPanelComponent {
  @Input() mailRecipients: IMailRecipient[];

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
