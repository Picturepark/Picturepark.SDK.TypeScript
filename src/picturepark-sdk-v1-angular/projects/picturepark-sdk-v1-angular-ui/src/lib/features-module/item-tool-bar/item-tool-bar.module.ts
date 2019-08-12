import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ContentDetailsDialogModule } from '../content-details-dialog/content-details-dialog.module';
import { ShareContentDialogModule } from '../share-content-dialog/share-content-dialog.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentDetailsDialogComponent } from '../content-details-dialog/content-details-dialog.component';
import { ItemToolBarComponent } from './item-tool-bar.component';

@NgModule({
  declarations: [
    ItemToolBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemToolBarComponent
  ]
})
export class ItemToolBarModule { }
