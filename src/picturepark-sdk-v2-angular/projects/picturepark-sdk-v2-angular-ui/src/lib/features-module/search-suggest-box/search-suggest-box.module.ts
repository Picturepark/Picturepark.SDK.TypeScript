import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SearchSuggestBoxComponent } from './search-suggest-box.component';

@NgModule({
    imports: [CommonModule, SharedModule, SearchSuggestBoxComponent],
    exports: [SearchSuggestBoxComponent],
})
export class SearchSuggestBoxModule {}
