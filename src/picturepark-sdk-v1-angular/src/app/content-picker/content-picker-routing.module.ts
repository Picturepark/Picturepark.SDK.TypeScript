import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ContentPickerComponent } from './content-picker.component';
import { ContentsPickerComponent } from './components/contents-picker/contents-picker.component';

const routes: Routes = [
  {
    path: '',
    component: ContentPickerComponent,
    children: [{
      path: '',
      component: ContentsPickerComponent
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
  providers: []
})
export class ContentPickerRoutingModule { }
