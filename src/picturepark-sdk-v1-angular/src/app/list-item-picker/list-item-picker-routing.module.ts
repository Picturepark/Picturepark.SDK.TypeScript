import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';
import { ListItemsPickerComponent } from './components/list-items-picker/list-items-picker.component';
import { ListItemBrowserComponent } from './components/list-item-browser/list-item-browser.component';

const routes: Routes = [
  {
    path: '',
    component: ListItemPickerComponent,
    children: [
      {
        path: '',
        component: ListItemsPickerComponent,
      },
      {
        path: ':id',
        component: ListItemBrowserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListItemPickerRoutingModule {}
