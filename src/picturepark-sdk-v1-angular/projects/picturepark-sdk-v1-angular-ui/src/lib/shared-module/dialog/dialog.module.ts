import { NgModule } from '@angular/core';

// COMPONENTS
import { DialogComponent } from './components/dialog/dialog.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [DialogComponent, HeaderComponent],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
