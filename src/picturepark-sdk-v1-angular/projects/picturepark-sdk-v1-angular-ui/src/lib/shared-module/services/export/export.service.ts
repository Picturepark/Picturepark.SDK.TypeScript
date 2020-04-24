import { Injectable } from '@angular/core';
import { Observable, of, zip, EMPTY } from 'rxjs';
import { expand, flatMap, map, reduce, switchMap } from 'rxjs/operators';

// LIBRARIES
import {
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleTagbox,
  SchemaDetail,
  SchemaService,
} from '@picturepark/sdk-v1-angular';

// INTERFACES
import FieldHelper from '../../components/field-helper';
import ReferencedData from '../../components/export/reference-data';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private schemaService: SchemaService) {}

  public getReferencedData(referencedData: Observable<ReferencedData>): Observable<ReferencedData> {
    return referencedData.pipe(
      flatMap((referenced) => {
        return zip(of(referenced), this.schemaService.getMany(referenced.schemaIds));
      }),
      map((data) => {
        const newReferencedData: ReferencedData = data[0];
        const schemas: SchemaDetail[] = data[1];

        newReferencedData.schemaDetails.push(...schemas);
        const schemaIds = new Set<string>();

        schemas.forEach((s) => {
          s.fields!.filter((f) => FieldHelper.isReferencedField(f))
            .filter((f: FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox) => {
              return !newReferencedData.schemaDetails.some((x) => x.id === f.schemaId);
            })
            .forEach((f: FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox) => schemaIds.add(f.schemaId));
        });

        newReferencedData.schemaIds = Array.from(schemaIds);
        return newReferencedData;
      }),
      // recursive call of getSchemasByIdsWithReferencedSchemas using expand and reduce operators
      expand((referencedDataExp: ReferencedData) => {
        return of(null).pipe(
          switchMap(() => {
            return referencedDataExp.schemaIds && referencedDataExp.schemaIds.length > 0
              ? this.getReferencedData(of(referencedDataExp))
              : EMPTY;
          })
        );
      }),
      reduce((referencedDataRed: ReferencedData) => {
        return referencedDataRed;
      })
    );
  }
}
