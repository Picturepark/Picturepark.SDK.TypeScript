import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ShareOwnerPanelComponent } from './share-owner-panel.component';

@NgModule({
    imports: [CommonModule, SharedModule, ShareOwnerPanelComponent],
    exports: [ShareOwnerPanelComponent],
})
export class ShareOwnerPanelModule {}
