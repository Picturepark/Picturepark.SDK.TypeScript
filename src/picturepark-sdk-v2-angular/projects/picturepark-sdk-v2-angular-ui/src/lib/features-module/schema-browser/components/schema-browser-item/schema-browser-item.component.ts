import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// LIBRARIES
import { Schema } from '@picturepark/sdk-v2-angular';

@Component({
  selector: 'pp-schema-browser-item',
  templateUrl: './schema-browser-item.component.html',
  styleUrls: ['./schema-browser-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
