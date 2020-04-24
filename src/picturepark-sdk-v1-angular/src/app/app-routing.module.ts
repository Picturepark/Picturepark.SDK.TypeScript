import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'content-picker',
    loadChildren: () => import('./content-picker/content-picker.module').then((m) => m.ContentPickerModule),
  },
  {
    path: 'list-item-picker',
    loadChildren: () => import('./list-item-picker/list-item-picker.module').then((m) => m.ListItemPickerModule),
  },
  {
    path: 'share-manager',
    loadChildren: () => import('./share-manager/share-manager.module').then((m) => m.ShareManagerModule),
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
