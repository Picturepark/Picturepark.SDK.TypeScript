import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

// LIBRARIES
import { SchemaDetail } from '@picturepark/sdk-v1-angular';

// service for sharing data between components
@Injectable()
export class ListItemsImportDataService {

  private _mappedData = new BehaviorSubject([]);
  private _columnsDef: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _schema = new Subject<SchemaDetail>();
  private _schemaId = new BehaviorSubject('');

  mappedData = this._mappedData.asObservable();
  columnsDef = this._columnsDef.asObservable();
  schema = this._schema.asObservable();
  schemaId = this._schemaId.asObservable();

  changeMappedData(data: []): void {
    this._mappedData.next(data);
  }

  changeColumnsDef(data: string[]): void {
    this._columnsDef.next(data);
  }

  changeSchema(data: SchemaDetail): void {
    this._schema.next(data);
  }

  changeSchemaId(data: string): void {
    this._schemaId.next(data);
  }

  reset(): void {
    this.changeMappedData([]);
    this.changeColumnsDef([]);
  }
}
