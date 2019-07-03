import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';

const routes: Routes = [
  {
    path: '',
    component: ListItemPickerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
  providers: []
})
export class ListItemPickerRoutingModule { }
