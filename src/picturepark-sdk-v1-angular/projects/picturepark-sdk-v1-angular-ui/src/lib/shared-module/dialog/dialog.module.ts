import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';
import { ShareContentDialogComponent } from './components/share-dialog-component/share-dialog-component.component';

@NgModule({
  declarations: [
    DialogBaseComponent,
    ShareContentDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DialogBaseComponent,
    ShareContentDialogComponent
  ],
  entryComponents: [
    ShareContentDialogComponent,
  ]
})
export class DialogModule {}
