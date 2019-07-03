import { Injectable } from '@angular/core';

import UtilsHelper from '../../../../infrastructure/utils-helper';

@Injectable({
  providedIn: 'root'
})
export class ImportPreviewStepService {

  public validateMappedData(mappedData: any[]) {
    // this.batchService.validateRecords(this.batchImportData);

    // filter out records with all fields undefined
    return mappedData.filter((item: any) => {
      let valid = false;
      // used for loop because we can escape iteration
      for (const key in item) {
        if (!UtilsHelper.isNullOrUndefinedOrWhiteSpace(item[key])) {
          valid = true;
          break;
        }
      }
      return valid;
    });
  }
}
