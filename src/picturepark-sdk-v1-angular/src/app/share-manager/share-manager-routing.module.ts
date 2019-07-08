import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ShareBrowserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
  providers: []
})
export class ShareManagerRoutingModule { }
