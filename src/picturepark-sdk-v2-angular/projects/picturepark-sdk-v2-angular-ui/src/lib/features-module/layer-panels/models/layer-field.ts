import { FieldBase, FieldString, FieldTranslatedString, StringRenderingType } from '@picturepark/sdk-v2-angular';
import { Observable } from 'rxjs';

import { RelationFieldInfo } from './relation-field-info';

export class LayerField {
  name: string;
  title: string;
  isOpened: boolean;
  value?: string;
  relatedField: FieldBase;
  markdown: boolean;

  tagboxFields: {
    value: string;
    tooltip: string;
  }[];
  fieldsetFields: LayerField[];
  relationFields: {
    info: Observable<RelationFieldInfo>;
    fields: LayerField[];
  }[];
  constructor(field: FieldBase, metadata: any) {
    this.fieldsetFields = [];
    this.relatedField = field;
    this.title = (metadata._displayValues && metadata._displayValues.list) || '';
    this.markdown =
      (field instanceof FieldString && field.renderingType === StringRenderingType.Markdown) ||
      (field instanceof FieldTranslatedString && field.renderingType === StringRenderingType.Markdown) ||
      false;
  }
}
