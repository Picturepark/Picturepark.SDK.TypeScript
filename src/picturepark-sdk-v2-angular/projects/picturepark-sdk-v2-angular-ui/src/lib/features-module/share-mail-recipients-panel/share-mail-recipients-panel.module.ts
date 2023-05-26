import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ShareMailRecipientsPanelComponent } from './share-mail-recipients-panel.component';

@NgModule({
    imports: [CommonModule, SharedModule, ShareMailRecipientsPanelComponent],
    exports: [ShareMailRecipientsPanelComponent],
})
export class ShareMailRecipientsPanelModule {}
