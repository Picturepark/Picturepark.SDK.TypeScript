import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { InfoService, CustomerInfo } from '@picturepark/sdk-v1-angular';

export interface IOutputFormatTranslations {
    [outputFormatId: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private customerInfo: CustomerInfo;

  constructor(@Inject(LOCALE_ID) private locale: string, private infoService: InfoService) {
  }


  public async getOutputFormatTranslations(): Promise<IOutputFormatTranslations> {
    if (!this.customerInfo) {
        this.customerInfo = await this.infoService.getInfo().toPromise();
    }

    const outputTranslations: {[outputFormatId: string]: string} = {};
    this.customerInfo.outputFormats.forEach(i => {
        outputTranslations[i.id] = i.names.translate(this.locale);
    });

    return outputTranslations;
  }
}
