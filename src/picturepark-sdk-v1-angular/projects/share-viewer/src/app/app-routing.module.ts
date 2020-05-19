import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareDetailComponent } from './share-detail/share-detail.component';

const routes: Routes = [
  {
    path: ':token',
    component: ShareDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
