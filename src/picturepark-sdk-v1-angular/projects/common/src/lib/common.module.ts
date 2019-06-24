import { NgModule } from '@angular/core';
import { SharedModule } from './shared-module/shared-module.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule.forRoot(),
  ],
  exports: []
})
export class CommonModule { }
