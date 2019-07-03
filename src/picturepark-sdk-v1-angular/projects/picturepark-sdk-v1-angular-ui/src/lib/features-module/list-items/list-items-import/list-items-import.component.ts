import { ChangeDetectionStrategy, Component } from '@angular/core';

// COMPONENTS
import { ImportBaseComponent } from './components/import-base/import-base.component';

// SERVICES
import { BatchService } from '../../../shared-module/services/import/batch.service';

@Component({
selector: 'pp-list-items-import',
  templateUrl: './list-items-import.component.ts',
  styleUrls: ['./components/import-base/import-base.component.scss', './list-items-import.component.scss'],
  providers: [ BatchService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListItemsImportComponent extends ImportBaseComponent {}