import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SearchBoxComponent } from './search-box.component';

@NgModule({
    imports: [CommonModule, SharedModule, SearchBoxComponent],
    exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
