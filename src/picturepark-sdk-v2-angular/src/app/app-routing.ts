import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'content-picker',
    loadChildren: () => import('./content-picker/content-picker-routing'),
  },
  {
    path: 'list-item-browser',
    loadChildren: () => import('./list-item-picker/list-item-picker-routing'),
  },
  {
    path: 'share-manager',
    loadChildren: () => import('./share-manager/share-manager-routing'),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
