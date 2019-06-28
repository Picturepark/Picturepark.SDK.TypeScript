import { NgModule } from '@angular/core';

// COMPONENTS
import { DialogBaseComponent } from './components/dialog/dialog.component';
import { ShareDialogComponentComponent } from './components/share-dialog-component/share-dialog-component.component';

@NgModule({
  declarations: [DialogBaseComponent, ShareDialogComponentComponent],
  exports: [
    DialogBaseComponent,
    ShareDialogComponentComponent
  ]
})
export class DialogModule { }
