import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// LIBRARIES
import { Schema } from '@picturepark/sdk-v2-angular';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'pp-schema-browser-item',
    templateUrl: './schema-browser-item.component.html',
    styleUrls: ['./schema-browser-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCardModule,
        NgClass,
        MatIconModule,
        NgIf,
        MatButtonModule,
        MatTooltipModule,
        TranslatePipe,
    ],
})
export class SchemaBrowserItemComponent {
  @Input() schema: Schema;
  @Input() selected: boolean;
  @Output() activeSchemaChange = new EventEmitter<Schema>();
  @Output() itemSelected = new EventEmitter<string>();

  setUpActiveSchema() {
    this.activeSchemaChange.emit(this.schema);
  }

  emitItemSelected() {
    this.itemSelected.emit(this.schema.id);
  }
}
