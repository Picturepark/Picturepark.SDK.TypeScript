import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// LIBRARIES
import { ListItemCreateManyRequest, ListItemUpdateManyRequest } from '@picturepark/sdk-v1-angular';

import { ImportResult } from '../../../../infrastructure/components/import/import-result';
import { ProxyAuthService } from '../../../../../../shared-module/services/proxy-auth/proxy-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListItemsImportService {

  constructor(private http: HttpClient, private auth: ProxyAuthService) {
  }

  public importListItems(
    createManyRequest: ListItemCreateManyRequest,
    updateManyRequest: ListItemUpdateManyRequest
  ): Observable<ImportResult> {
    const options = { headers: new HttpHeaders() };
    this.auth.transformHttpRequestOptionsSync(options);

    return this.http.post<ImportResult>(`import/list-items`, { createManyRequest, updateManyRequest }, options);
  }
}
