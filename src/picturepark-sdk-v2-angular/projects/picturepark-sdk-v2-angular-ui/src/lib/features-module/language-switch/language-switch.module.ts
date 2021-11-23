import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { LanguageSwitchComponent } from './language-switch.component';

@NgModule({
  declarations: [LanguageSwitchComponent],
  imports: [CommonModule, SharedModule],
  exports: [LanguageSwitchComponent],
})
export class LanguageSwitchModule {}
