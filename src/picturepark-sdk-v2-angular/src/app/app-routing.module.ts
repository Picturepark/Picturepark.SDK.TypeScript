import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'content-picker',
    loadComponent: () => import('./content-picker/content-picker.component').then(m => m.ContentPickerComponent),
  },
  {
    path: 'list-item-browser',
    loadComponent: () => import('./list-item-picker/list-item-picker.component').then(m => m.ListItemPickerComponent),
  },
  {
    path: 'share-manager',
    loadComponent: () => import('./share-manager/share-manager.component').then(m => m.ShareBrowserComponent),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
