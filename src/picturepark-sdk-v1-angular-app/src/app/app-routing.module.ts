import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShareCardComponent } from './share-card/share-card.component';
import { ContentPickerComponent } from './content-picker/content-picker.component';
import { ContentPickerDetailsComponent } from './content-picker-details/content-picker-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'share-card/:token',
    component: ShareCardComponent
  },
  {
    path: 'content-picker',
    component: ContentPickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
