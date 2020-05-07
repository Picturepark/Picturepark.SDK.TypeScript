import { FieldBase } from '@picturepark/sdk-v1-angular';
import { Observable } from 'rxjs';

import { RelationFieldInfo } from './relation-field-info';

export class LayerField {
  public name: string;
  public title: string;
  public isOpened: boolean;
  public value?: string;
  public relatedField: FieldBase;

  public tagboxFields: {
    value: string;
    tooltip: string;
  }[];
  public fieldsetFields: LayerField[];
  public relationFields: {
    info: Observable<RelationFieldInfo>;
    fields: LayerField[];
  }[];
  constructor(field: FieldBase, metadata: any) {
    this.fieldsetFields = [];
    this.relatedField = field;
    this.title = (metadata._displayValues && metadata._displayValues.list) || '';
  }
}
