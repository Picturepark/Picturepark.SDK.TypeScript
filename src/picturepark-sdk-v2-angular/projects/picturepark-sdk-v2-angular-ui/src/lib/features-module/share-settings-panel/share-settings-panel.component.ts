import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { DatePipe } from '@angular/common';
import { PanelComponent } from '../../shared-module/components/panel/panel.component';

@Component({
    selector: 'pp-share-settings-panel',
    templateUrl: './share-settings-panel.component.html',
    styleUrls: ['./share-settings-panel.component.scss'],
    standalone: true,
    imports: [
        PanelComponent,
        DatePipe,
        TranslatePipe,
    ],
})
export class ShareSettingsPanelComponent {
  @Input() subject: string;
  @Input() accessOriginal: string;
  @Input() creationDate: Date;
  @Input() modificationDate: Date;
}
