import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ContentService,
  FieldBase,
  FieldBoolean,
  FieldDate,
  FieldDateTime,
  FieldDateTimeArray,
  FieldDictionary,
  FieldDictionaryArray,
  FieldGeoPoint,
  FieldLong,
  FieldLongArray,
  FieldMultiFieldset,
  FieldMultiRelation,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleRelation,
  FieldSingleTagbox,
  FieldString,
  FieldStringArray,
  FieldTranslatedString,
  SchemaDetail,
  ThumbnailSize,
  ContentResolveBehavior,
  TranslatedStringDictionary,
} from '@picturepark/sdk-v1-angular';
import * as moment_ from 'moment';
import { map, switchMap } from 'rxjs/operators';

import { LayerField } from '../models/layer-field';
import { RelationFieldInfo } from '../models/relation-field-info';
import { forkJoin } from 'rxjs';
import { TranslatePipe } from '../../../shared-module/pipes/translate.pipe';

const moment = moment_;

@Injectable({
  providedIn: 'root',
})
export class LayerFieldService {
  constructor(
    private sanitizer: DomSanitizer,
    private contentService: ContentService,
    private translatePipe: TranslatePipe
  ) {}

  public generate(field: FieldBase, schemaMetadata: any, allSchemas: SchemaDetail[]): LayerField | null {
    const fieldValue = schemaMetadata[field.id];
    let layerField: LayerField | null = new LayerField(field, fieldValue);

    switch (field.constructor) {
      case FieldMultiTagbox:
        layerField.tagboxFields = fieldValue.map((i: any) => {
          return {
            value: i._displayValues.name,
            tooltip: i._displayValues.thumbnail,
          };
        });
        break;

      case FieldSingleTagbox:
        layerField.tagboxFields = [
          {
            value: fieldValue._displayValues.name,
            tooltip: fieldValue._displayValues.thumbnail,
          },
        ];
        break;

      case FieldSingleFieldset:
        const referencedToSingleFieldset: SchemaDetail | undefined = allSchemas.find(
          (i) => i.id === (field as FieldSingleFieldset).schemaId
        );

        const layerFieldSingleFieldset = new LayerField(field, fieldValue);
        if (referencedToSingleFieldset && referencedToSingleFieldset.fields) {
          referencedToSingleFieldset.fields.forEach((rf) => {
            if (fieldValue[rf.id]) {
              const referencedField = this.generate(rf, fieldValue, allSchemas);
              if (referencedField) {
                layerFieldSingleFieldset.fieldsetFields.push(referencedField);
              }
            }
          });
        }
        layerField.fieldsetFields = [layerFieldSingleFieldset];
        break;

      case FieldMultiFieldset:
        const referencedToMultiFieldset: SchemaDetail | undefined = allSchemas.find(
          (i) => i.id === (field as FieldMultiFieldset).schemaId
        );

        layerField.fieldsetFields = fieldValue.map((value: any) => {
          const lf = new LayerField(field, value);
          if (referencedToMultiFieldset && referencedToMultiFieldset.fields) {
            referencedToMultiFieldset.fields.forEach((rf) => {
              if (value[rf.id]) {
                const referencedField = this.generate(rf, value, allSchemas);
                if (referencedField) {
                  lf.fieldsetFields.push(referencedField);
                }
              }
            });
          }
          return lf;
        });
        break;

      case FieldSingleRelation:
        const targetSingleFieldId = fieldValue['_targetId'];
        const targetSingleFielDocType = fieldValue['_targetDocType'];

        if (targetSingleFieldId && targetSingleFielDocType && targetSingleFielDocType === 'Content') {
          const referencedToSingleRelation: SchemaDetail | undefined = allSchemas.find(
            (i) => i.id === (field as FieldSingleRelation).schemaId
          );
          if (referencedToSingleRelation) {
            layerField.relationFields = [
              this.getRelationField(targetSingleFieldId, fieldValue, referencedToSingleRelation, allSchemas),
            ];
          }
        }
        break;

      case FieldMultiRelation:
        const referencedToMultiRelation: SchemaDetail | undefined = allSchemas.find(
          (i) => i.id === (field as FieldMultiRelation).schemaId
        );

        const relationsFields = fieldValue
          .map((v: any) => {
            const targetMultiRelationId = v['_targetId'];
            const targetMultiRelationDocType = v['_targetDocType'];

            if (targetMultiRelationId && targetMultiRelationDocType && targetMultiRelationDocType === 'Content') {
              return this.getRelationField(targetMultiRelationId, v, referencedToMultiRelation, allSchemas);
            }
          })
          .filter((x: LayerField) => x);

        layerField.relationFields = relationsFields;

        break;

      case FieldBoolean:
        layerField.value = fieldValue ? 'Yes' : 'No';
        break;

      case FieldString:
        layerField.value = fieldValue;
        break;

      case FieldStringArray:
        layerField.value = fieldValue.join(', ');
        break;

      case FieldDictionary:
        layerField.value = Object.values(fieldValue).join(', ');
        break;

      case FieldDictionaryArray:
        layerField.value = fieldValue.map((v: any) => Object.values(v).join(', ')).join(', ');
        break;

      case FieldTranslatedString:
        layerField.value = this.translatePipe.transform(TranslatedStringDictionary.fromJS(fieldValue));
        break;

      case FieldDateTimeArray:
        layerField.value = fieldValue
          .map((f: any) => (f ? moment(f).format((field as FieldDateTime).format || 'LLL') : ''))
          .join(', ');
        break;

      case FieldDateTime:
        layerField.value = fieldValue ? moment(fieldValue).format((field as FieldDateTime).format || 'LLL') : '';
        break;

      case FieldDate:
        layerField.value = fieldValue ? moment(fieldValue).format((field as FieldDateTime).format || 'll') : '';
        break;

      case FieldLong:
        layerField.value = fieldValue;
        break;

      case FieldLongArray:
        layerField.value = fieldValue.join(', ');
        break;

      case FieldGeoPoint:
        layerField.value = fieldValue ? `${fieldValue['lat']}, ${fieldValue['lon']}` : '';
        break;

      default: {
        layerField = null;
        break;
      }
    }

    if (field.names && layerField) {
      layerField.name = this.translatePipe.transform(field.names);
    }

    return layerField;
  }

  private getRelationField(
    targetId: string,
    fieldValue: any,
    referencedSchema: SchemaDetail | undefined,
    allSchemas: SchemaDetail[]
  ) {
    let relationfields;
    if (referencedSchema && referencedSchema.fields) {
      relationfields = referencedSchema.fields
        .map((rf) => {
          if (fieldValue[rf.id]) {
            const referencedField = this.generate(rf, fieldValue, allSchemas);
            if (referencedField) {
              return referencedField;
            }
          }
        })
        .filter((x) => x);
    }

    const thumbnailDownload = this.contentService.downloadThumbnail(targetId, ThumbnailSize.Small, null, null);
    const contentDetail = this.contentService.get(targetId, [
      ContentResolveBehavior.OuterDisplayValueName,
      ContentResolveBehavior.OuterDisplayValueList,
    ]);

    const relationFieldInfo = forkJoin([thumbnailDownload, contentDetail]).pipe(
      map((response) => {
        return new RelationFieldInfo(
          targetId,
          response[1].displayValues!['name'],
          response[1].displayValues!['list'],
          this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response[0].data))
        );
      })
    );

    return { fields: relationfields, info: relationFieldInfo };
  }
}
