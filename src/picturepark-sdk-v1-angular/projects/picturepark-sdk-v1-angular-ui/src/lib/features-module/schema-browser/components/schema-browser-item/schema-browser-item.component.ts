import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// LIBRARIES
import { Schema } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-schema-browser-item',
  templateUrl: './schema-browser-item.component.html',
  styleUrls: ['./schema-browser-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaBrowserItemComponent {
  @Input() public schema: Schema;
  @Input() public selected: boolean;
  @Output() public activeSchemaChange = new EventEmitter<Schema>();
  @Output() public itemSelected = new EventEmitter<string>();

  public setUpActiveSchema() {
    this.activeSchemaChange.emit(this.schema);
  }

  public emitItemSelected() {
    this.itemSelected.emit(this.schema.id);
  }
}
