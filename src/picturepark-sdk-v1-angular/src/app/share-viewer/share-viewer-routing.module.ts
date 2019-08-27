import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ShareViewerComponent } from './share-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: ShareViewerComponent,
    /*
    children: [
      {
        path: '',
        component: SharesManagerComponent
      },
      {
        path: ':token',
        component: ShareManagerItemComponent
      }
    ]*/
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
  providers: []
})
export class ShareViewerRoutingModule { }
