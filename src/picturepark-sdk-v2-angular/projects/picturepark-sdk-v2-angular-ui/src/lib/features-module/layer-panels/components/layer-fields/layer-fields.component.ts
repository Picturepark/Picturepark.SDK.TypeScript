import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { LayerField } from '../../models/layer-field';
import { FieldDetailInfoDialogComponent } from '../field-detail-info-dialog/field-detail-info-dialog.component';
import { RelationFieldInfo } from '../../models/relation-field-info';

@Component({
  selector: 'pp-layer-fields',
  templateUrl: './layer-fields.component.html',
  styleUrls: ['./layer-fields.component.scss'],
})
export class LayerFieldsComponent {
  @Input() field: LayerField;
  @Input() noname = false;

  @Output()
  relationClick = new EventEmitter<RelationFieldInfo>();

  constructor(private dialog: MatDialog) {}

  showItem(item: any, event: any) {
    const dialogRef = this.dialog.open(FieldDetailInfoDialogComponent, {
      width: '450px',
    });
    dialogRef.componentInstance.title = item.value;
    dialogRef.componentInstance.message = item.tooltip;
  }

  relationClickHandler(relationInfo: RelationFieldInfo): void {
    this.relationClick.emit(relationInfo);
  }
}
