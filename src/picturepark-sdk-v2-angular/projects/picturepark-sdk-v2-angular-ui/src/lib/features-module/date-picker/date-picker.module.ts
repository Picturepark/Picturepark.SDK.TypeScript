import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    imports: [CommonModule, SharedModule, DatePickerComponent],
    exports: [DatePickerComponent],
})
export class DatePickerModule {}
