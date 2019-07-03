import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  AndFilter,
  BrokenDependenciesFilter,
  CustomerInfo,
  FieldBase,
  FieldMultiFieldset,
  FieldMultiRelation,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleRelation,
  FieldSingleTagbox,
  FieldTranslatedString,
  FilterBase,
  InfoService,
  LifeCycleFilter,
  ListItem,
  ListItemSearchRequest,
  OrFilter,
  SchemaDetail,
  SchemaService,
  TermsFilter,
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import {
  ImportValidationReportService,
} from '../../../../infrastructure/components/import/import-validation-report/import-validation-report.service';
import { ParsedData } from '../../../../infrastructure/components/import/parsed-data';
import { SchemaMapData } from '../../../../infrastructure/components/import/schema-map-data';
import { BatchService } from '../../../../infrastructure/components/import/services/batch.service';
import { ImportMapStepService } from '../../../../infrastructure/components/import/services/import-map-step.service';
import { ItemSearchData } from '../../../../infrastructure/components/import/services/item-search-data';
import FieldHelper from '../../../../infrastructure/field-helper';
import { ProgressBarService } from '../../../../infrastructure/services/progress-bar.service';
import UtilsHelper from '../../../../infrastructure/utils-helper';
import { ListItemsImportDataService } from '../list-items-import-data.service';

@Component({
  selector: 'pp-import-map-step',
  templateUrl: './list-items-import-map-step.component.html',
  styleUrls: ['./list-items-import-map-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsImportMapStepComponent implements OnInit, OnDestroy {

  @Input() public stepper: MatStepper;
  @Input() public parsedData: Observable<ParsedData>;

  public fields: FieldBase[];
  public schema: SchemaDetail;
  public mappings: any;
  public nextPageToken: string | undefined;
  public isVisible: Observable<boolean>;
  public importColumns: string[];
  public referenceMappings: any;
  public referenceMappingStatus: any;
  public customerInfo: CustomerInfo;
  public schemaMap: {
    [index: string]: SchemaDetail
  };
  public isMapping = new BehaviorSubject<number>(0);

  private mappingRequestCount = 0;
  private columnIdName = 'id';
  private _mappedData: any[];
  private data: any[];
  private subscription = new Subscription();

  public get hasImportedData() {
    return this.data && this.data.length > 0;
  }

  constructor(private progressBarService: ProgressBarService,
    private schemaService: SchemaService,
    private infoService: InfoService,
    private batchService: BatchService,
    private importValidationReportService: ImportValidationReportService,
    private importDataService: ListItemsImportDataService,
    private importService: ImportMapStepService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.importValidationReportService.clear();
    this.isVisible = this.progressBarService.isVisible;
    const dataSubscription = this.importDataService.schemaId
      .pipe(flatMap((schemaId: string) => {
        return combineLatest(
          this.schemaService.get(schemaId),
          this.importService.getSchemasByIdsWithReferencedSchemas(of(new SchemaMapData([schemaId], {}))),
          this.infoService.getInfo(),
          this.parsedData);
      }))
      .subscribe((data) => {
        let schema: SchemaDetail = data[0];
        let schemaMapData: SchemaMapData = data[1];
        let info: CustomerInfo = data[2];
        let parsedData: ParsedData = data[3];

        this.reset();

        this.customerInfo = info;
        this.data = parsedData.data;
        this.importColumns = parsedData.columns.map((column: any) => column.field);
        this.schema = schema;
        this.schemaMap = schemaMapData.schemaMap;
        this.fields = schema.fields;

        this.handleTranslatedStrings(schema.id);
        this.getSheetMapping();
        this.readSheetData();
        this.handleReferencedFields();

        // data for preview step
        const columnsDef = this.fields.filter(f => this.isValueMappable(f) || this.isTranslation(f) || this.isReferencedField(f)).map(x => x.id);

        this.importDataService.changeColumnsDef(columnsDef);
        this.importDataService.changeSchema(schema);

        this.cdr.detectChanges();
        // hide progress bar
        this.progressBarService.hide();
      });

    this.subscription.add(dataSubscription);
  }

  private handleReferencedFields() {
    this.fields.filter(this.isReferencedField).forEach((field: (FieldMultiTagbox | FieldSingleTagbox | FieldSingleFieldset)) => {
      const referencedFields = this.schemaMap[field.schemaId].fields
        .filter(f => ![FieldSingleFieldset, FieldMultiFieldset, FieldSingleRelation, FieldMultiRelation].some(t => t === f.constructor));

      let mappingField: FieldBase;

      const mappingColumn = this.mappings[field.id];
      if (mappingColumn) {
        mappingField = referencedFields.filter(x => mappingColumn.indexOf(x.id) !== -1)[0];
      }

      mappingField = mappingField || referencedFields[0];

      if (mappingField) {
        this.referenceMappings[field.id] = mappingField.id;
        this.onChangeMapping(field);
      }
    });
  }

  private handleTranslatedStrings(schemaId: string) {
    const formDefinition = this.importService.getFormFields(this.schemaMap, schemaId, this.customerInfo);

    // set up property for field with type FieldTranslatedString
    this.fields.filter(field => field instanceof FieldTranslatedString).forEach(field => {
      const translatedStringFormField = formDefinition.filter(i => i.id === field.id)[0];
      (field as any).property = translatedStringFormField;
    });
  }

  public changeMapping(field: any) {
    this.onChangeMapping(field);
  }

  public onTranslationChange(mapping: any, field) {
    this.mappings[field.id] = mapping;
    this.onChangeMapping(field);
  }

  onChangeMapping(field: FieldBase) {
    let requiredFieldsWithoutData: { [key: string]: { row: number, column: string, id: string } } = {};
    delete this.importValidationReportService.requiredFieldsWithoutData[field.id];

    if (this.isReferencedField(field)) {
      // For fields with referenced values, we need to search for existing records and map them
      const mappedFieldId = this.referenceMappings[field.id];
      const mappingColumn = this.mappings[field.id];

      if (mappedFieldId && mappingColumn) {
        const referencedSchema = (<FieldSingleTagbox>field).schemaId;
        const referencedField = lodash.lowerFirst(referencedSchema) + '.' + mappedFieldId;

        let terms = this.data.map((v: any, i: number) => {
          let cellValue = this.data[i][mappingColumn];
          if (cellValue && !UtilsHelper.isNull(cellValue)) {
            cellValue = lodash.isString(cellValue) ? cellValue : `${cellValue}`;
            const values = cellValue.split('|').map((m: any) => m.trim());
            return values;
          }
          return [];

        });
        terms = lodash.uniq(lodash.flatten(terms));

        const mappingStatus = {
          matches: 0, terms: terms.length, notMatched: 0
        };
        this.referenceMappingStatus[field.id] = {
          [mappedFieldId]: mappingStatus
        };

        let filter: FilterBase;
        const keyField: FieldBase = this.schemaMap[referencedSchema].fields.find(f => f.id === mappedFieldId);
        if (keyField && this.isTranslation(keyField)) {
          const translatedField: FieldTranslatedString = <FieldTranslatedString>keyField;
          const languages = ['x-default'].concat(translatedField.requiredMetadataLanguages);

          filter = new OrFilter({
            filters: languages.map(language => {
              return new TermsFilter({
                field: referencedField + '.' + language,
                terms: terms
              });
            })
          });
        } else if (mappedFieldId === '_refId') {
          filter = new TermsFilter({
            field: 'id',
            terms: terms
          });
        } else {
          filter = new TermsFilter({
            field: referencedField,
            terms: terms
          });
        }

        if ((field as FieldSingleTagbox).filter) {
          filter = new AndFilter({
            filters: [(field as FieldSingleTagbox).filter, filter]
          });
        }
        const request = new ListItemSearchRequest({
          searchString: '',
          filter: filter,
          lifeCycleFilter: LifeCycleFilter.ActiveOnly,
          brokenDependenciesFilter: BrokenDependenciesFilter.All,
          sort: null,
          pageToken: 'default',
          limit: 10000,
          schemaIds: [referencedSchema],
          searchLanguages: undefined,
          displayPatternIds: ['Name'],
          includeAllSchemaChildren: true,
          includeContentData: true,
          searchBehaviors: [],
          debugMode: false
        });

        const itemSearchData = new ItemSearchData(request)

        let matches = 0;
        let notMatchedTags: {
          [key: string]: { tags: string[], row: number, column: string, id: string }
        } = {};
        this.mappingRequestCount++;
        this.isMapping.next(this.mappingRequestCount);

        const itemsSearchDataSubscription = this.importService.getItemSearchData(of(itemSearchData))
          .subscribe((itemSearchData) => {
            const property = mappedFieldId;

            // if keyField and translation - prepare collection key - indexes
            let listItemMap: {
              [index: string]: number[]
            };

            if (keyField && this.isTranslation(keyField)) {
              listItemMap = {};

              for (var i = 0; i < itemSearchData.results.length; i++) {
                let listItem = itemSearchData.results[i];
                let values = Object.values(listItem.content[property]);

                for (var j = 0; j < values.length; j++) {
                  let value = values[j] as string;

                  if (!listItemMap[value]) {
                    listItemMap[value] = [];
                  }
                  // where i is listItems index
                  listItemMap[value].push(i);
                }
              }
            }
            // start from 1 as first one is busy by column name
            let excelRow = 1;
            this._mappedData.forEach((v: any, i: number) => {
              excelRow++;
              let cellValue: string = this.data[i][mappingColumn];

              if (cellValue && !UtilsHelper.isNull(cellValue)) {

                cellValue = lodash.isString(cellValue) ? cellValue : `${cellValue}`;

                const cellValues: string[] = cellValue.split('|').map((m: any) => m.trim());

                let filteredListItems: ListItem[];

                if (keyField && this.isTranslation(keyField)) {
                  filteredListItems = []
                  let listItemsIndex = [];
                  cellValues.forEach((cellValue) => {
                    // check if listItem collection has data for cellValue
                    if (listItemMap[cellValue]) {
                      listItemsIndex.push(...listItemMap[cellValue]);
                    }
                  });

                  if (listItemsIndex.length > 0) {
                    listItemsIndex = lodash.uniq(listItemsIndex);
                    listItemsIndex.forEach(index => {
                      // get list items according to listItemsIndex collection
                      filteredListItems.push(itemSearchData.results[index]);
                    })
                  }
                } else {
                  filteredListItems = itemSearchData.results.filter(schemaValue => {
                    return cellValues.indexOf(schemaValue.content[property]) !== -1;
                  });
                }

                // define not matched tags
                if (cellValues.length !== filteredListItems.length) {
                  const listItems = itemSearchData.results.map(x => x.content[property]);
                  const diff = cellValues.filter((cellValue) => {
                    return listItems.indexOf(cellValue) === -1;
                  });

                  const key: string = `row-${excelRow}-column-${mappingColumn}`;

                  notMatchedTags[key] = { tags: diff, column: mappingColumn, row: excelRow, id: v.id };
                }

                let records = filteredListItems.map((schemaValue: ListItem) => {
                  return { _refId: schemaValue.content._refId, displayValue: schemaValue.displayValues };
                });

                records = lodash.uniq(records);
                if (field instanceof FieldSingleTagbox || field instanceof FieldSingleFieldset) {
                  if (records.length > 0) {
                    v[field.id] = records[0];
                    matches += 1;
                  }
                } else if (field instanceof FieldMultiTagbox) {
                  v[field.id] = records;
                  matches += records.length;
                }
              } else if (UtilsHelper.isNull(cellValue)) {
                v[field.id] = null;
              }

              if (UtilsHelper.isUndefinedOrWhiteSpace(cellValue) && field.required) {
                const key: string = `row-${excelRow}-column-${mappingColumn}`;
                requiredFieldsWithoutData[key] = { column: mappingColumn, row: excelRow, id: v.id };
              }
            });

            this.importDataService.changeMappedData(this._mappedData);

            mappingStatus.matches = matches;

            delete this.importValidationReportService.notMatchedTags[field.id];
            mappingStatus.notMatched = Object.keys(notMatchedTags).length;
            if (mappingStatus.notMatched) {
              this.importValidationReportService.notMatchedTags[field.id] = notMatchedTags;
            }

            this.cdr.detectChanges();

            if (!itemSearchData.listItemSearchRequest.pageToken) {
              this.mappingRequestCount--;
              this.isMapping.next(this.mappingRequestCount);
            }

            if (Object.keys(requiredFieldsWithoutData).length) {
              this.importValidationReportService.requiredFieldsWithoutData[field.id] = requiredFieldsWithoutData;
            }
          });

        this.subscription.add(itemsSearchDataSubscription);

      } else {
        // Cleanup if mapping is removed
        delete this.referenceMappingStatus[field.id];
        delete this.importValidationReportService.notMatchedTags[field.id];
        this._mappedData.forEach(v => delete v[field.id]);
        this.importDataService.changeMappedData(this._mappedData);
      }

    } else {
      let excelRow = 1;
      this._mappedData.forEach((v: any, i: number) => {
        excelRow++;
        if (this.mappings[field.id]) {
          const convertedValue = this.importService.convertValue(field.constructor, this.data[i], this.mappings[field.id], i, field.id, this.batchService.addValidationWarning.bind(this.batchService));
          if (!UtilsHelper.isUndefined(convertedValue) || convertedValue === null) {
            v[field.id] = convertedValue;
          } else {
            v[field.id] = null;
            delete v[field.id];
            v = JSON.parse(JSON.stringify(v));
          }

          // if field is required and there is no data
          if (UtilsHelper.isUndefinedOrWhiteSpace(convertedValue) && field.required) {
            const key: string = `row-${excelRow}-column-${this.mappings[field.id]}`;
            requiredFieldsWithoutData[key] = { column: this.mappings[field.id], row: excelRow, id: v.id };
          }

        } else {
          v[field.id] = null;
          delete v[field.id];
          // Workaround to remove undefined object properties
          v = JSON.parse(JSON.stringify(v));
        }
      });

      if (Object.keys(requiredFieldsWithoutData).length) {
        this.importValidationReportService.requiredFieldsWithoutData[field.id] = requiredFieldsWithoutData;
      }

      this.importDataService.changeMappedData(this._mappedData);
    }
  }

  public moreDetails() {
    this.stepper.next();
  }

  /**
   * Parse schema types and create import structure
   */
  private getSheetMapping() {
    const mappedColumns: string[] = [];
    const mappedFields: string[] = [];

    [   // first map only equal items
      (a: string, b: string): boolean => a === b,
      // second map different first letter casings e.g. TestField to testField
      (a: string, b: string): boolean => lodash.lowerFirst(a) === b,
      // third map with removed spaces and different first letter casings e.g. Test Field to testField
      (a: string, b: string): boolean => lodash.lowerFirst(a.replace(/\s+/g, '')) === b,
      // fourth map with removed spaces and lowered e.g. test field or TEST FIELD to testField
      (a: string, b: string): boolean => a.replace(/\s+/g, '').toLowerCase() === b.toLowerCase()
    ].map(f => this.match(mappedColumns, mappedFields, f));
  }

  private match(mappedColumns: string[], mappedFields: string[], matchFn: (a: string, b: string) => boolean): void {
    if (lodash.isEqual(this.fields.map(f => f.id), mappedFields) || lodash.isEqual(this.importColumns, mappedColumns)) {
      return; // escape if all fields or all columns are mapped
    }

    this.fields.filter(x => !(this.isTranslation(x)) && !(this.isReferencedField(x))).forEach(field => {
      // find column name which can be mapped to the field
      const mappingColumn = this.importColumns.filter(columnName =>
        !mappedFields.some(mappedField => mappedField === field.id) // field is not already mapped
        && !mappedColumns.some(mappedColumn => mappedColumn === columnName) // column name is not already mapped
        && matchFn(columnName, field.id))[0]; // match field and column name

      if (mappingColumn) {
        mappedFields.push(field.id);
        mappedColumns.push(mappingColumn);
        this.mappings[field.id] = mappingColumn;
      }
    });

    // match translated string fields
    this.fields.filter(this.isTranslation).forEach(field => {
      // check all supported languages
      const languages = this.customerInfo.languageConfiguration.metadataLanguages;
      languages.forEach(language => {
        // find column name which can be mapped to the field
        const mappingColumn = this.importColumns.filter(columnName =>
          !mappedColumns.some(mappedColumn => mappedColumn === columnName) // column name is not already mapped
          && columnName.toLowerCase() === (`${field.id}[${language}]`.toLowerCase()))[0]; // match field and column name

        if (mappingColumn) {
          mappedColumns.push(mappingColumn);
          if (this.mappings[field.id]) {
            (this.mappings[field.id])[language] = mappingColumn;
          } else {
            this.mappings[field.id] = { [language]: mappingColumn };
          }
        }
      });
    });

    // match tagbox fields
    this.fields.filter(this.isReferencedField).forEach(field => {
      // find column name which can be mapped to the field
      const mappingColumn = this.importColumns.filter(columnName => {
        const pointIndex = columnName.indexOf('.');
        const tagboxFieldName = columnName.substring(0, pointIndex);
        return !mappedColumns.some(mappedColumn => mappedColumn === tagboxFieldName) &&
          tagboxFieldName.toLowerCase() === (`${field.id}`.toLowerCase());
      })[0];     // column name is not already mapped


      if (mappingColumn) {
        mappedFields.push(field.id);
        mappedColumns.push(mappingColumn);
        this.mappings[field.id] = mappingColumn;
      }
    });
  }

  /**
  * Parse schema data
  */
  private readSheetData(): void {
    const values: any[] = [];
    let excelRow = 1;

    this.data.forEach((data: any, index: number) => {
      excelRow++;
      const value: any = {};

      // handle item id
      if (data[this.columnIdName]) {
        value[this.columnIdName] = data[this.columnIdName];
      }

      this.fields.forEach(field => {

        if (this.mappings[field.id]
          && !(this.isReferencedField(field))) {
          const fieldType = field.constructor;
          const convertedValue = this.importService.convertValue(fieldType, data, this.mappings[field.id], index, field.id, this.batchService.addValidationWarning.bind(this.batchService));
          if (!UtilsHelper.isUndefined(convertedValue) || convertedValue === null) {
            value[field.id] = convertedValue;
          }
          // if field is required and there is no data
          if (UtilsHelper.isUndefinedOrWhiteSpace(convertedValue) && field.required) {
            // value is undefined
            const key = `row-${excelRow}-column-${this.mappings[field.id]}`;
            let requiredFieldsWithoutData: { [key: string]: { row: number, column: string, id: string } } = {};
            requiredFieldsWithoutData[key] = { column: this.mappings[field.id], row: excelRow, id: data.id };
            this.importValidationReportService.requiredFieldsWithoutData[field.id] = this.importValidationReportService.requiredFieldsWithoutData[field.id] || {};
            this.importValidationReportService.requiredFieldsWithoutData[field.id] = Object.assign(this.importValidationReportService.requiredFieldsWithoutData[field.id], requiredFieldsWithoutData);

          }
        }
      });

      values.push(value);
    });

    this._mappedData = values;
    this.importDataService.changeMappedData(this._mappedData);
  }

  public isValueMappable(field: FieldBase) {
    return FieldHelper.isMappable(field);
  }

  public isReferencedField(field: FieldBase) {
    return FieldHelper.isTagBox(field);
    // do not support FieldSingleFieldset
    // return FieldHelper.isReferencedField(field);
  }

  public isTagBox(field: FieldBase) {
    return FieldHelper.isTagBox(field);
  }

  public isTranslation(field: FieldBase) {
    return FieldHelper.isTranslation(field);
  }

  reset(): void {
    this.batchService.reset();
    this.importDataService.reset();
    this.data = null;
    this.importColumns = [];
    this.mappings = {};
    this.referenceMappings = {};
    this.referenceMappingStatus = {};
    this._mappedData = [];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}