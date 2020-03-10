import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { HelpWrapperComponent } from './help-wrapper.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpWrapperComponent,
    children: [
      {
        path: '',
        component: HelpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HelpRoutingModule {}
