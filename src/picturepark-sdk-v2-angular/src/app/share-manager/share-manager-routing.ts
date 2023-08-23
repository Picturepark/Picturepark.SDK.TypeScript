import { Routes } from '@angular/router';
import { ShareManagerComponent } from './share-manager.component';
import { SharesManagerComponent } from './components/shares-manager/shares-manager.component';
import { ShareManagerItemComponent } from './components/share-manager-item/share-manager-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShareManagerComponent,
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
export default routes;
