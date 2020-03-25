import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ContentPickerComponent } from './content-picker.component';

const routes: Routes = [
  {
    path: '',
    component: ContentPickerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ContentPickerRoutingModule {}
