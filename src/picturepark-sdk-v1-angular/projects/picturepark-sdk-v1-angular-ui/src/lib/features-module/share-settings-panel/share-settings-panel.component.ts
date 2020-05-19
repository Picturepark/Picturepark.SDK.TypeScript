import { Component, Input } from '@angular/core';

@Component({
  selector: 'pp-share-settings-panel',
  templateUrl: './share-settings-panel.component.html',
  styleUrls: ['../../shared-module/components/panel/panel.component.scss', './share-settings-panel.component.scss'],
})
export class ShareSettingsPanelComponent {
  @Input() subject: string;
  @Input() accessOriginal: string;
  @Input() creationDate: Date;
  @Input() modificationDate: Date;
}
