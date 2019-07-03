import { Injectable } from '@angular/core';
import {
  FieldBoolean,
  FieldDate,
  FieldDateTime,
  FieldDecimal,
  FieldGeoPoint,
  FieldLong,
  FieldMultiFieldset,
  FieldMultiRelation,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleRelation,
  FieldSingleTagbox,
  FieldString,
  FieldTranslatedString,
  IFieldBase,
  IFieldString,
  IFieldTranslatedString,
  SchemaDetail,
  SchemaService,
  ListItemService,
  ListItemSearchResult,
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';
import * as moment from 'moment';
import * as momentOADate from 'moment-msdate';
import { empty, Observable, of, zip } from 'rxjs';
import { expand, flatMap, map, reduce, switchMap } from 'rxjs/operators';

import UtilsHelper from '../../../utils-helper';
import { SchemaMapData } from '../schema-map-data';
import { LocalizationService } from './localization.service';
import { ItemSearchData } from './item-search-data';

@Injectable({
  providedIn: 'root'
})
export class ImportMapStepService {

  constructor(private schemaService: SchemaService,
    private listItemsService: ListItemService,
    private localizationService: LocalizationService) { }

  /**
  * Converts value to domain value.
  * @return {any} The dynamic value.
  */
  public convertValue(
    fieldType: any,
    value: any,
    id: any,
    row: number,
    column: string,
    addValidationWarning: (row: number, column: string, value: string, fieldType: any) => any): any {
    // null values will be passed to backend
    if (fieldType === FieldBoolean
      || fieldType === FieldLong
      || fieldType === FieldDecimal
      || fieldType === FieldDate
      || fieldType === FieldDateTime
      || fieldType === FieldString
      || fieldType === FieldGeoPoint) {
      if (UtilsHelper.isNull(value[id])) {
        return null;
      } else if (typeof value[id] === 'undefined' || value[id] === '') {
        return undefined;
      }
    }

    switch (fieldType) {
      case FieldBoolean:
        return (/^(true|1)$/i).test(value[id]) ? true : (/^(false|0)$/i).test(value[id]) ? false
          : addValidationWarning(row, column, value[id], fieldType);

      case FieldLong:
        const int = parseInt(value[id], 10);
        return !Number.isNaN(int) ? int
          : addValidationWarning(row, column, value[id], fieldType);

      case FieldDecimal:
        const dec = parseFloat(value[id]);
        return !Number.isNaN(dec) ? dec
          : addValidationWarning(row, column, value[id], fieldType);

      case FieldDate:
        const oaDate = momentOADate.fromOADate(value[id]);
        const date = moment(oaDate, 'DD.MM.YYYY');
        return date.isValid() ? date.format('YYYY-MM-DD').toString()
          : addValidationWarning(row, column, value[id], fieldType);

      case FieldDateTime:
        const oaDateTime = momentOADate.fromOADate(value[id]);
        const dateTime = moment(oaDateTime, 'DD.MM.YYYY HH:mm:ss');
        return dateTime.isValid() ? dateTime.toJSON()
          : addValidationWarning(row, column, value[id], fieldType);

      case FieldString:
        return this.getSanitizedStringValue(value[id]);

      case FieldTranslatedString:
        const translatedTextValue = {};
        let nullCount = 0;
        for (const key in id) {
          if (UtilsHelper.isNull(value[id[key]])) {
            nullCount++;
          } else if (value[id[key]]) {
            translatedTextValue[key] = this.getSanitizedStringValue(value[id[key]]);
          }
        }
        if (nullCount === 0 && lodash.isEmpty(translatedTextValue)) {
          return undefined;
        }
        else {
          return lodash.isEmpty(translatedTextValue) ? null : translatedTextValue;
        }

      case FieldGeoPoint:
        const gpParts = value[id] && lodash.isString(value[id]) ? value[id].split(',').map((m: any) => m.trim()) : null;
        if (gpParts && gpParts.length === 2) {
          const lat = parseFloat(gpParts[0]);
          const lon = parseFloat(gpParts[1]);
          if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
            return {
              lat: lat,
              lon: lon
            };
          }
        }
        return addValidationWarning(row, column, value[id], fieldType);

      case FieldSingleTagbox:
        // TODO get list item by referencedSchemaId and value[id]
        const stListItem: any = {};
        return { '_refId': stListItem.id };

      case FieldMultiTagbox:
        const mtParts = value[id] ? value[id].split('|').map((m: any) => m.trim()) : null;

        if (mtParts) {
          return mtParts.map((valueItem: any) => {
            // TODO get list item by referencedSchemaId and value[id]
            const mtListItem: any = {};
            return { '_refId': mtListItem.id };
          });
        }
        return undefined;

      case FieldMultiFieldset:
      case FieldMultiRelation:
      case FieldSingleFieldset:
      case FieldSingleRelation:
      default:
        return undefined;
    }
  }

  public getItemSearchData(itemSearchData: Observable<ItemSearchData>): Observable<ItemSearchData> {
    return itemSearchData.pipe(
      expand((itemSearchData) => {

        if (!itemSearchData.listItemSearchRequest.pageToken) {
          return empty();
        }

        if (itemSearchData.listItemSearchRequest.pageToken == 'default') {
          itemSearchData.listItemSearchRequest.pageToken = undefined;
        }

        return of(itemSearchData).pipe(
          flatMap((itemSearchData) => {
            return zip(of(itemSearchData), this.listItemsService.search(itemSearchData.listItemSearchRequest));
          }),
          map(data => {
            const itemSearchData = data[0] as ItemSearchData;
            const searchObjectsResponse = data[1] as ListItemSearchResult;

            itemSearchData.listItemSearchRequest.pageToken = searchObjectsResponse.pageToken;

            itemSearchData.results.push(...searchObjectsResponse.results);
            return itemSearchData;
          }));
      }), reduce((itemSearchData: ItemSearchData) => {
        return itemSearchData;
      })
    );
  }

  public getSchemasByIdsWithReferencedSchemas(schemaMapData: Observable<SchemaMapData>): Observable<SchemaMapData> {
    return schemaMapData.pipe(
      flatMap((schemaMapData) => {
        const newSchemaIds: string[] = lodash.difference(schemaMapData.schemaIds, Object.keys(schemaMapData.schemaMap));
        return zip(of(schemaMapData), this.schemaService.getMany(newSchemaIds));
      }),
      map(data => {
        const schemaMapData = data[0] as SchemaMapData;
        const schemaDetails = data[1] as SchemaDetail[];

        const referencedSchemasIds: string[] = [];

        const addReferencedSchema = (schemaId: string): void => {
          if (Object.keys(schemaMapData.schemaMap).indexOf(schemaId) === -1 && referencedSchemasIds.indexOf(schemaId) === -1) {
            referencedSchemasIds.push(schemaId);
          }
        };

        schemaDetails.forEach(schema => schemaMapData.schemaMap[schema.id] = schema);
        schemaMapData.schemaIds.forEach(schemaId => {

          if (schemaMapData.schemaMap[schemaId]) {
            schemaMapData.schemaMap[schemaId].fields.forEach(field => {
              // extend schema fields with icon property
              field.icon = this.getFieldIcon(field.constructor);
              switch (field.constructor) {
                case FieldSingleTagbox:
                case FieldMultiTagbox:
                case FieldSingleFieldset:
                case FieldMultiFieldset:
                case FieldSingleRelation:
                case FieldMultiRelation:
                  addReferencedSchema((field as any).schemaId);
              }
            });
            lodash.union(schemaMapData.schemaMap[schemaId].layerSchemaIds,
              schemaMapData.schemaMap[schemaId].descendantSchemaIds).forEach(refSchemaId => addReferencedSchema(refSchemaId));
          }
        });
        if (referencedSchemasIds && referencedSchemasIds.length > 0) {
          schemaMapData.schemaIds = referencedSchemasIds;
        } else {
          schemaMapData.schemaIds = null;
        }

        return schemaMapData;
      }),
      // recursive call of getSchemasByIdsWithReferencedSchemas using expand and reduce operators
      expand(schemaMap => {
        return of(null)
          .pipe(switchMap(() => {
            return schemaMap.schemaIds && schemaMap.schemaIds.length > 0 ?
              this.getSchemasByIdsWithReferencedSchemas(of(schemaMap))
              : empty();
          }));
      }),
      reduce((allSchemaMaps: SchemaMapData) => {
        return allSchemaMaps;
      })
    );
  }

  public getFormFields(schemaMap: any, schemaId: string, customerInfo: any, fieldPath?: string, forceNonRequired: boolean = false): IFieldBase[] {
    // schemaId is empty string in case of translation languages
    const schema = schemaMap[schemaId];
    const formFields: IFieldBase[] = [];

    schema.fields
      .filter(field => field instanceof FieldString || field instanceof FieldTranslatedString)
      .forEach(field => {
        const fieldType = field.constructor;

        const formField = {
          id: field.id,
          fieldType: fieldType,
          index: field.index,
          // EBNF: <schemaId|"">{.<fieldsetId>}.<fieldId>
          // used in field change listeners to uniquely identify updating field
          fieldPath: `${fieldPath ? fieldPath : schemaId}.${field.id}`,
          names: field.names,
          isRequired: !forceNonRequired && field.required,
          isCalculated: (fieldType === FieldString || fieldType === FieldTranslatedString) &&
            !UtilsHelper.isNullOrUndefinedOrWhiteSpace((field as FieldString).template),
          isBatchable: ![FieldMultiFieldset, FieldSingleRelation, FieldMultiRelation, FieldGeoPoint]
            .some(f => f === fieldType)
        } as any;

        // Skip editing of calculated value fields
        if (formField.isCalculated) {
          return;
        }

        if (field instanceof FieldString) {
          const stringField = field as FieldString;
          const stringFormField = formField as IFieldString;
          stringFormField.multiLine = stringField.multiLine;
          stringFormField.minimumLength = stringField.minimumLength;
          stringFormField.maximumLength = stringField.maximumLength;
          stringFormField.pattern = stringField.pattern;
          // stringFormField.isDefault = field.id === this.customerInfo.languageConfiguration.defaultLanguage;
          formField.uiType = stringField.multiLine ? 'string-multiline' : 'string';
        } else if (field instanceof FieldTranslatedString) {

          const translationField = field as FieldTranslatedString;
          const translatedStringFormField = formField as IFieldTranslatedString;
          translatedStringFormField.multiLine = translationField.multiLine;
          translatedStringFormField.minimumLength = translationField.minimumLength;
          translatedStringFormField.maximumLength = translationField.maximumLength;
          translatedStringFormField.pattern = translationField.pattern;
          const traslationMap = { '': this.getTranslation(translationField, customerInfo) };
          // create sub form fields for translated string
          formField.items = this.getFormFields(traslationMap, '', customerInfo, formField.fieldPath, forceNonRequired);
          formField.uiType = 'translation';
        }

        formFields.push(formField);
      });

    return formFields;
  }

  private getTranslation(translationField: FieldTranslatedString, customerInfo: any): SchemaDetail {
    const defaultLanguage = customerInfo.languageConfiguration.defaultLanguage;

    const isRequired = (lang: string) => lang === defaultLanguage || translationField.requiredMetadataLanguages.some(sl => sl === lang);
    const translation: any = {};

    translation.fields = customerInfo.languages
      .filter(l => isRequired(l.ietf))
      .sort((a, b) => a.ietf === defaultLanguage ? -1
        : b.ietf === defaultLanguage ? 1
          : this.localizationService.localize(a.name, customerInfo) < this.localizationService.localize(b.name, customerInfo) ? -1 : 1)
      .map(l => {
        return new FieldString({
          id: l.ietf,
          names: l.name,
          multiLine: translationField.multiLine,
          minimumLength: translationField.minimumLength,
          maximumLength: translationField.maximumLength,
          pattern: translationField.pattern,
          required: translationField.required && isRequired(l.ietf),
          index: true,
          fixed: false,
          simpleSearch: true,
          sortable: true,
          boost: 1
        });
      });
    return translation;
  }

  public getFieldTypeName(fieldType: any): string {
    switch (fieldType) {
      case FieldBoolean:
        return 'Checkbox';
      case FieldDate:
        return 'Date';
      case FieldDateTime:
        return 'Date time';
      case FieldDecimal:
        return 'Decimal';
      case FieldGeoPoint:
        return 'Geo point';
      case FieldLong:
        return 'Number';
      case FieldSingleFieldset:
        return 'Fieldset single';
      case FieldMultiFieldset:
        return 'Fieldset multi';
      case FieldSingleTagbox:
        return 'Tagbox single';
      case FieldMultiTagbox:
        return 'Tagbox multi';
      case FieldString:
        return 'Text';
      case FieldTranslatedString:
        return 'Translated text';
      case FieldSingleRelation:
        return 'Relationship single';
      case FieldMultiRelation:
        return 'Relationship multi';
    }
    return null;
  }

  private getFieldIcon(fieldType: any): string {
    switch (fieldType) {
      case FieldBoolean:
        return 'checkbox-marked-circle-outline';
      case FieldDate:
        return 'calendar-blank';
      case FieldDateTime:
        return 'calendar-blank';
      case FieldDecimal:
        return 'numeric';
      case FieldGeoPoint:
        return 'pin';
      case FieldLong:
        return 'numeric';
      case FieldSingleFieldset:
        return 'format-list-bulleted';
      case FieldMultiFieldset:
        return 'format-list-bulleted';
      case FieldSingleTagbox:
        return 'tag';
      case FieldMultiTagbox:
        return 'tag';
      case FieldString:
        return 'pencil-box-outline';
      case FieldTranslatedString:
        return 'pencil-box-outline';
      case FieldSingleRelation:
        return 'repeat';
      case FieldMultiRelation:
        return 'repeat';
    }
    return undefined;
  }

  private getSanitizedStringValue(value: any): string {
    return !lodash.isNil(value) && lodash.isString(value) ? value.trim() : '';
  }
}