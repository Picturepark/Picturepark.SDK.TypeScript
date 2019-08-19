import { Injectable } from '@angular/core';
import {
  FieldBase,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleTagbox,
  SchemaDetail,
  SchemaService,
} from '@picturepark/sdk-v1-angular';
import { EMPTY, Observable, of, zip } from 'rxjs';
import { expand, flatMap, map, reduce, switchMap } from 'rxjs/operators';

import { ReferencedSchemas } from '../models/referenced-schemas';

@Injectable({
  providedIn: 'root'
})
export class ReferencedSchemaService {

  constructor(private schemaService: SchemaService) { }

  public getReferencedSchemas(referencedSchemasStorage: Observable<ReferencedSchemas>, referencedTypes: (typeof FieldBase)[]): Observable<ReferencedSchemas> {
    return referencedSchemasStorage.pipe(
      flatMap((referencedSchemas) => {
        return zip(of(referencedSchemas), this.schemaService.getMany(referencedSchemas.schemaIds));
      }),
      map((data) => {
        const referencedSchemas: ReferencedSchemas = data[0];
        const schemas: SchemaDetail[] = data[1];

        referencedSchemas.schemaDetails.push(...schemas);
        const schemaIds = new Set<string>();

        schemas.forEach(s => {
          s.fields.filter(f => referencedTypes.some(x => f.constructor === x))
            .filter((f: (FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox)) => {
              return !referencedSchemas.schemaDetails.some(x => x.id === f.schemaId);
            })
            .forEach((f: (FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox)) =>
              schemaIds.add(f.schemaId));
        });

        referencedSchemas.schemaIds = Array.from(schemaIds);
        return referencedSchemas;
      }),
      // recursive call of getReferencedSchemas using expand and reduce operators
      expand((referencedSchemas: ReferencedSchemas) => {
        return of(null)
          .pipe(switchMap(() => {
            return referencedSchemas.schemaIds && referencedSchemas.schemaIds.length > 0 ?
              this.getReferencedSchemas(of(referencedSchemas), referencedTypes)
              : EMPTY;
          }));
      }),
      reduce((referencedSchemas: ReferencedSchemas) => {
        return referencedSchemas;
      })
    );
  }

}
