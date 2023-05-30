import { Routes } from '@angular/router';
import { ShareDetailComponent } from './share-detail/share-detail.component';

export const APP_ROUTES: Routes = [
  {
    path: ':token',
    component: ShareDetailComponent,
  },
];
