import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// LIBRARIES
import * as lodash from 'lodash';

// SERVICES
import { ImportMapStepService } from './import-map-step.service';

const tv4 = require('tv4');

@Injectable()
export class BatchService {

  private _batchValid: boolean;
  private _batchValidation: never[] | any;
  private _batchValidationMessageLimit = 10;
  private _batchValidationErrorCount: number;
  private _batchValidationWarnCount: number;

  public batchValidationWarnCount = new BehaviorSubject(0);
  public batchValidationErrorCount = new BehaviorSubject(0);
  public batchValidation = new BehaviorSubject([]);
  public batchValid = new BehaviorSubject(false);

  constructor(private importService: ImportMapStepService,
    private snackBar: MatSnackBar) { }

  public addValidationWarning(row: number, column: string, value: string, fieldType: any): any {

    this._batchValidation = this._batchValidation || [];

    const type = this.importService.getFieldTypeName(fieldType).toLowerCase();
    this.showWarning(`Value ${value} is not a valid ${type}`);

    if (this._batchValidationWarnCount < this._batchValidationMessageLimit) {
      this._batchValidationWarnCount++;
      this.batchValidationWarnCount.next(this._batchValidationWarnCount);

      this._batchValidation.push({
        severity: 'warn',
        row: row,
        column: column,
        message: `Value ${value} is not a valid ${type}`
      });
      this.batchValidation.next(this._batchValidation);
    }
    return null;
  }

  public validateRecords(records: any[], jsonSchema: any): any {
    for (let i = 0, len = records.length; i < len; i++) {
      if (!this.validateRecord(records[i], i, jsonSchema)) {
        this.changeBatchValid(false);
      }
    }
  }

  public validateRecord(data: any, index: number, jsonSchema: any): boolean {

    this._batchValidation = this._batchValidation || [];

    const validation = this.validateMultiple(this.sanitizeContentRecord(data), jsonSchema);

    if (!validation.valid && this._batchValidationErrorCount < this._batchValidationMessageLimit) {
      validation.errors.forEach(error => {
        this._batchValidationErrorCount++;
        this.batchValidationErrorCount.next(this._batchValidationErrorCount);

        this._batchValidation.push({
          severity: 'error',
          row: index,
          column: error.dataPath.substring(1),
          message: error.message
        });
        this.batchValidation.next(this._batchValidation);
      });
    }

    return validation.valid;
  }

  private validateMultiple(record: any, jsonSchema: any): { valid: boolean; errors: any[]; missing: any[] } {
    if (record.id) {
      // prevent id check
      delete record.id;
    }
    const result = tv4.validateMultiple(record, jsonSchema);
    return result;
  }

  private showWarning(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  /**
 * Sanitizes record to prevent validation errors,
 * removed displayValue property from reference types
 * @param record
 */
  public sanitizeContentRecord(record: any): any {
    const newRecord = lodash.cloneDeep(record);

    // tslint:disable-next-line: forin
    for (const prop in newRecord) {
      const fieldData = newRecord[prop];
      if (fieldData) {
        if (lodash.isArray(fieldData)) {
          fieldData.forEach((fieldDataItem: any) => {
            if (fieldDataItem.hasOwnProperty('displayValue')) {
              delete fieldDataItem.displayValue;
            }
          });
        } else if (fieldData.hasOwnProperty('displayValue')) {
          delete fieldData.displayValue;
        }
      }
    }

    return newRecord;
  }

  public reset() {
    this.changeBatchValidation([]);
    this.changeBatchValid(false);
    this._batchValidationErrorCount = 0;
    this.batchValidationErrorCount.next(this._batchValidationErrorCount);
    this._batchValidationWarnCount = 0;
    this.batchValidationWarnCount.next(this._batchValidationWarnCount);
  }

  private changeBatchValid(value: boolean) {
    this._batchValid = value;
    this.batchValid.next(this._batchValid);
  }

  private changeBatchValidation(value: never[]) {
    this._batchValidation = value;
    this.batchValidation.next(value);
  }
}
