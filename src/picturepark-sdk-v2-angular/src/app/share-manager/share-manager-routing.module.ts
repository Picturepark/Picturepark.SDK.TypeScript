import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';
import { SharesManagerComponent } from './components/shares-manager/shares-manager.component';
import { ShareManagerItemComponent } from './components/share-manager-item/share-manager-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShareBrowserComponent,
    children: [
      {
        path: '',
        component: SharesManagerComponent,
      },
      {
        path: ':shareId',
        component: ShareManagerItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ShareManagerRoutingModule {}
