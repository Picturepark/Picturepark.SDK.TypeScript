import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'content-picker',
    loadChildren: './content-picker/content-picker.module#ContentPickerModule'
  },
  {
    path: 'list-browser',
    loadChildren: './list-browser/list-browser.module#ListBrowserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
