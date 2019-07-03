import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// LIBRARIES
import { FilterBase } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import SchemaField from '../../../../shared-module/components/export/schema-field';

// SERVICES
import { ProxyAuthService } from '../../../../shared-module/services/proxy-auth/proxy-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListItemsExportService {

  constructor(
    private http: HttpClient,
    private auth: ProxyAuthService
  ) {}

  public exportListItems(
    schemaId: string,
    selectedFields: SchemaField[],
    filter: FilterBase,
    searchString: string,
    selectedItems: string[]): Observable<Blob> {

      const options = { headers: new HttpHeaders() };
      const body = { selectedFields: selectedFields, filter: filter, searchString: searchString, selectedItems: selectedItems };

      this.auth.transformHttpRequestOptionsSync(options);

      return this.http.post(`export/list-items/${schemaId}`, body, { responseType: 'blob', headers: options.headers });

  }
}
