import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LayerField } from '../../models/layer-field';
import { FieldDetailInfoDialogComponent } from '../field-detail-info-dialog/field-detail-info-dialog.component';

@Component({
  selector: 'pp-layer-fields',
  templateUrl: './layer-fields.component.html',
  styleUrls: ['./layer-fields.component.scss']
})
export class LayerFieldsComponent {
  @Input() field: LayerField;
  @Input() noname = false;

  constructor(private dialog: MatDialog) { }

  showItem(item: any, event: any) {
    let dialogRef: MatDialogRef<FieldDetailInfoDialogComponent>;
    dialogRef = this.dialog.open(FieldDetailInfoDialogComponent, {
      width: '450px'
    });
    dialogRef.componentInstance.title = item.value;
    dialogRef.componentInstance.message = item.tooltip;
  }
}
